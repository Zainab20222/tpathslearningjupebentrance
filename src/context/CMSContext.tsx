import React, { createContext, useContext, useState, useEffect } from 'react';
import { siteData as defaultSiteData } from '../data';
import {
  collection,
  doc,
  setDoc,
  deleteDoc,
  updateDoc,
  onSnapshot
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import { compressImageDataUrl } from '../utils';

export interface TestimonialItem {
  id: string | number;
  name: string;
  programme: string;
  message: string;
  image: string;
  createdAt?: number;
}

export interface PastQuestionItem {
  id: string;
  title: string;
  description: string;
  image: string;
  category?: string;
  badge?: string;
  isCustom?: boolean;
  createdAt?: number;
}

export interface CMSImages {
  heroImage: string;
  aboutImage: string;
  successImage: string;
  galleryCafeImage: string;
  galleryParkImage: string;
  galleryTutorImage: string;
}

export interface CMSTexts {
  heroHeadline: string;
  heroSubheadline: string;
  heroHighlight: string;
  heroDeadlineText: string;
  aboutText: string;
  aboutQuote: string;
  programmeTitle: string;
  programmeDescription: string;
  pricingTitle: string;
  pricingPrice: string;
  pricingCtaText: string;
}

export interface CMSTimerConfig {
  targetTimestamp: number;
  isActive: boolean;
  daysFromNow: number;
  deadlineText: string;
}

export interface CMSData {
  images: CMSImages;
  texts: CMSTexts;
  timerConfig: CMSTimerConfig;
  testimonials: TestimonialItem[];
  pastQuestions: PastQuestionItem[];
}

interface CMSContextType {
  data: CMSData;
  isAuthenticated: boolean;
  isSyncing: boolean;
  login: (password: string) => boolean;
  logout: () => void;
  updateImage: (key: keyof CMSImages, url: string) => Promise<void>;
  updateText: (key: keyof CMSTexts, value: string) => Promise<void>;
  updateTimerConfig: (config: Partial<CMSTimerConfig>) => Promise<void>;
  addTestimonial: (item: Omit<TestimonialItem, 'id'>) => Promise<void>;
  updateTestimonial: (id: string | number, item: Partial<TestimonialItem>) => Promise<void>;
  deleteTestimonial: (id: string | number) => Promise<void>;
  addPastQuestion: (item: Omit<PastQuestionItem, 'id'>) => Promise<void>;
  updatePastQuestion: (id: string, item: Partial<PastQuestionItem>) => Promise<void>;
  deletePastQuestion: (id: string) => Promise<void>;
  resetToDefaults: () => Promise<void>;
}

const STORAGE_KEY = 'tpaths_cms_state_v4';
const AUTH_KEY = 'tpaths_admin_auth';
const ADMIN_PASSWORD = 'Adeboye@1234';

const defaultImages: CMSImages = {
  heroImage: defaultSiteData.hero.image,
  aboutImage: defaultSiteData.about.image,
  successImage: defaultSiteData.programmeInfo.image,
  galleryCafeImage: defaultSiteData.galleryImages.learningCafe,
  galleryParkImage: defaultSiteData.galleryImages.learningPark,
  galleryTutorImage: defaultSiteData.galleryImages.tutorTeaching,
};

const defaultTexts: CMSTexts = {
  heroHeadline: defaultSiteData.hero.headline,
  heroSubheadline: defaultSiteData.hero.subheadline,
  heroHighlight: defaultSiteData.hero.highlight,
  heroDeadlineText: defaultSiteData.hero.registrationDeadlineText,
  aboutText: defaultSiteData.about.text,
  aboutQuote: defaultSiteData.about.quote,
  programmeTitle: defaultSiteData.programmeInfo.title,
  programmeDescription: defaultSiteData.programmeInfo.description,
  pricingTitle: defaultSiteData.pricing.title,
  pricingPrice: defaultSiteData.pricing.price,
  pricingCtaText: `Enrol Now for ${defaultSiteData.pricing.price}`,
};

const defaultTimerConfig: CMSTimerConfig = {
  targetTimestamp: Date.now() + 5 * 24 * 60 * 60 * 1000,
  isActive: true,
  daysFromNow: 5,
  deadlineText: defaultSiteData.hero.registrationDeadlineText,
};

const defaultData: CMSData = {
  images: defaultImages,
  texts: defaultTexts,
  timerConfig: defaultTimerConfig,
  testimonials: defaultSiteData.testimonials,
  pastQuestions: [
    {
      id: "pq-2026-1",
      title: "UNILAG Foundation Past Questions 2026",
      description: "Authentic multi-subject 2026 entrance questions with step-by-step worked mathematical & reasoning solutions.",
      image: defaultSiteData.pastQuestions[0]?.image || "",
      category: "Complete Booklet 2026",
      badge: "Verified 2026",
      createdAt: 1700000000000
    },
    {
      id: "pq-2026-2",
      title: "Science Compilation 2026",
      description: "Complete Mathematics, Physics, Chemistry & Biology entrance drill package for 2026.",
      image: defaultSiteData.pastQuestions[1]?.image || "",
      category: "Science 2026",
      badge: "Updated 2026",
      createdAt: 1700000000001
    },
    {
      id: "pq-2026-3",
      title: "Arts & Humanities Past Questions 2026",
      description: "Comprehensive English Language, Government, Literature & General Studies 2026 drill.",
      image: defaultSiteData.pastQuestions[0]?.image || "",
      category: "Arts 2026",
      badge: "Revised 2026",
      createdAt: 1700000000002
    }
  ],
};

const CMSContext = createContext<CMSContextType | undefined>(undefined);

export const CMSProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<CMSData>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          images: { ...defaultImages, ...(parsed.images || {}) },
          texts: { ...defaultTexts, ...(parsed.texts || {}) },
          timerConfig: { ...defaultTimerConfig, ...(parsed.timerConfig || {}) },
          testimonials: Array.isArray(parsed.testimonials) && parsed.testimonials.length > 0 ? parsed.testimonials : defaultData.testimonials,
          pastQuestions: Array.isArray(parsed.pastQuestions) && parsed.pastQuestions.length > 0 ? parsed.pastQuestions : defaultData.pastQuestions,
        };
      }
    } catch (e) {
      console.warn("Failed to load CMS state from localStorage", e);
    }
    return defaultData;
  });

  const [isSyncing, setIsSyncing] = useState<boolean>(true);

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    try {
      return localStorage.getItem(AUTH_KEY) === 'true';
    } catch {
      return false;
    }
  });

  // LocalStorage persistence backup
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.warn("Failed to persist CMS state to localStorage", e);
    }
  }, [data]);

  // Cross-tab sync listener
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY && e.newValue) {
        try {
          const parsed = JSON.parse(e.newValue);
          setData((prev) => ({
            ...prev,
            images: { ...defaultImages, ...(parsed.images || {}) },
            texts: { ...defaultTexts, ...(parsed.texts || {}) },
            timerConfig: { ...defaultTimerConfig, ...(parsed.timerConfig || {}) },
            testimonials: Array.isArray(parsed.testimonials) ? parsed.testimonials : prev.testimonials,
            pastQuestions: Array.isArray(parsed.pastQuestions) ? parsed.pastQuestions : prev.pastQuestions,
          }));
        } catch {}
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // REAL-TIME CLOUD FIREBASE SYNC (Firestore)
  useEffect(() => {
    let unsubSettings: (() => void) | null = null;
    let unsubTestimonials: (() => void) | null = null;
    let unsubPastQuestions: (() => void) | null = null;

    try {
      // 1. Settings (Images, Texts, and Timer) listener
      const settingsRef = doc(db, 'cms_config', 'settings');
      unsubSettings = onSnapshot(
        settingsRef,
        (docSnap) => {
          setIsSyncing(false);
          if (docSnap.exists()) {
            const settingsData = docSnap.data();
            setData((prev) => ({
              ...prev,
              images: { ...defaultImages, ...(settingsData.images || {}) },
              texts: { ...defaultTexts, ...(settingsData.texts || {}) },
              timerConfig: { ...defaultTimerConfig, ...(settingsData.timerConfig || {}) },
            }));
          } else {
            // Seed defaults to Firestore if empty
            setDoc(settingsRef, {
              images: defaultImages,
              texts: defaultTexts,
              timerConfig: defaultTimerConfig,
            }).catch(console.error);
          }
        },
        (error) => {
          console.warn("Firestore settings sync fallback to local state:", error);
          setIsSyncing(false);
        }
      );

      // 2. Testimonials Collection listener
      const testimonialsCol = collection(db, 'testimonials');
      unsubTestimonials = onSnapshot(
        testimonialsCol,
        (snapshot) => {
          setIsSyncing(false);
          if (!snapshot.empty) {
            const items: TestimonialItem[] = [];
            snapshot.forEach((docSnap) => {
              const itemData = docSnap.data();
              items.push({
                id: docSnap.id,
                name: itemData.name || '',
                programme: itemData.programme || 'UNILAG Foundation Programme',
                message: itemData.message || '',
                image: itemData.image || '',
                createdAt: itemData.createdAt || 0,
              });
            });
            items.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
            setData((prev) => ({ ...prev, testimonials: items }));
          } else {
            // Seed default testimonials
            defaultData.testimonials.forEach((testItem) => {
              const testDocRef = doc(db, 'testimonials', String(testItem.id));
              setDoc(testDocRef, { ...testItem, createdAt: Date.now() }).catch(console.error);
            });
          }
        },
        (error) => {
          console.warn("Firestore testimonials sync fallback to local state:", error);
          setIsSyncing(false);
        }
      );

      // 3. Past Questions Collection listener
      const pqCol = collection(db, 'past_questions');
      unsubPastQuestions = onSnapshot(
        pqCol,
        (snapshot) => {
          setIsSyncing(false);
          if (!snapshot.empty) {
            const items: PastQuestionItem[] = [];
            snapshot.forEach((docSnap) => {
              const itemData = docSnap.data();
              items.push({
                id: docSnap.id,
                title: itemData.title || 'UNILAG Past Question',
                description: itemData.description || '',
                image: itemData.image || '',
                category: itemData.category || 'UNILAG Foundation Past Questions 2026',
                badge: itemData.badge || 'Verified 2026',
                isCustom: itemData.isCustom || false,
                createdAt: itemData.createdAt || 0,
              });
            });
            // Sort newest first
            items.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
            setData((prev) => ({ ...prev, pastQuestions: items }));
          } else {
            // Seed default past questions
            defaultData.pastQuestions.forEach((pqItem, idx) => {
              const pqDocRef = doc(db, 'past_questions', pqItem.id);
              setDoc(pqDocRef, { ...pqItem, createdAt: Date.now() - idx * 1000 }).catch(console.error);
            });
          }
        },
        (error) => {
          console.warn("Firestore pastQuestions sync fallback to local state:", error);
          setIsSyncing(false);
        }
      );
    } catch (e) {
      console.error("Firestore sync initialization error:", e);
      setIsSyncing(false);
    }

    return () => {
      if (unsubSettings) unsubSettings();
      if (unsubTestimonials) unsubTestimonials();
      if (unsubPastQuestions) unsubPastQuestions();
    };
  }, []);

  const login = (password: string): boolean => {
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      try {
        localStorage.setItem(AUTH_KEY, 'true');
      } catch {}
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    try {
      localStorage.removeItem(AUTH_KEY);
    } catch {}
  };

  const updateImage = async (key: keyof CMSImages, url: string) => {
    const compressedUrl = await compressImageDataUrl(url, 1200, 1200, 0.82);
    // Optimistic UI update
    const updatedImages = { ...data.images, [key]: compressedUrl };
    setData((prev) => ({
      ...prev,
      images: updatedImages,
    }));

    // Firestore update
    try {
      await setDoc(
        doc(db, 'cms_config', 'settings'),
        { images: updatedImages },
        { merge: true }
      );
    } catch (e) {
      console.error("Failed to update image in Firestore", e);
    }
  };

  const updateText = async (key: keyof CMSTexts, value: string) => {
    const updatedTexts = { ...data.texts, [key]: value };
    setData((prev) => ({
      ...prev,
      texts: updatedTexts,
    }));

    try {
      await setDoc(
        doc(db, 'cms_config', 'settings'),
        { texts: updatedTexts },
        { merge: true }
      );
    } catch (e) {
      console.error("Failed to update text in Firestore", e);
    }
  };

  const updateTimerConfig = async (config: Partial<CMSTimerConfig>) => {
    const updatedTimer = { ...data.timerConfig, ...config };
    setData((prev) => ({
      ...prev,
      timerConfig: updatedTimer,
    }));

    try {
      await setDoc(
        doc(db, 'cms_config', 'settings'),
        { timerConfig: updatedTimer },
        { merge: true }
      );
    } catch (e) {
      console.error("Failed to update timer config in Firestore", e);
    }
  };

  const addTestimonial = async (item: Omit<TestimonialItem, 'id'>) => {
    const compressedImage = await compressImageDataUrl(item.image, 800, 800, 0.8);
    const newId = `test-${Date.now()}`;
    const newItem: TestimonialItem = {
      ...item,
      image: compressedImage,
      id: newId,
      createdAt: Date.now(),
    };

    // Optimistic update
    setData((prev) => ({
      ...prev,
      testimonials: [newItem, ...prev.testimonials],
    }));

    try {
      await setDoc(doc(db, 'testimonials', newId), newItem);
    } catch (e) {
      console.error("Failed to add testimonial to Firestore", e);
    }
  };

  const updateTestimonial = async (id: string | number, item: Partial<TestimonialItem>) => {
    let patch = { ...item };
    if (patch.image) {
      patch.image = await compressImageDataUrl(patch.image, 800, 800, 0.8);
    }

    setData((prev) => ({
      ...prev,
      testimonials: prev.testimonials.map((t) => (t.id === id ? { ...t, ...patch } : t)),
    }));

    try {
      await updateDoc(doc(db, 'testimonials', String(id)), patch);
    } catch (e) {
      console.error("Failed to update testimonial in Firestore", e);
    }
  };

  const deleteTestimonial = async (id: string | number) => {
    setData((prev) => ({
      ...prev,
      testimonials: prev.testimonials.filter((t) => String(t.id) !== String(id)),
    }));

    try {
      await deleteDoc(doc(db, 'testimonials', String(id)));
    } catch (e) {
      console.error("Failed to delete testimonial from Firestore", e);
    }
  };

  const addPastQuestion = async (item: Omit<PastQuestionItem, 'id'>) => {
    const compressedImage = await compressImageDataUrl(item.image, 1000, 1000, 0.82);
    const newId = `pq-custom-${Date.now()}`;
    const newItem: PastQuestionItem = {
      ...item,
      image: compressedImage,
      id: newId,
      isCustom: true,
      createdAt: Date.now(),
    };

    // Immediate state update
    setData((prev) => ({
      ...prev,
      pastQuestions: [newItem, ...prev.pastQuestions],
    }));

    try {
      await setDoc(doc(db, 'past_questions', newId), newItem);
    } catch (e) {
      console.error("Failed to add past question to Firestore", e);
    }
  };

  const updatePastQuestion = async (id: string, item: Partial<PastQuestionItem>) => {
    let patch = { ...item };
    if (patch.image) {
      patch.image = await compressImageDataUrl(patch.image, 1000, 1000, 0.82);
    }

    setData((prev) => ({
      ...prev,
      pastQuestions: prev.pastQuestions.map((pq) => (pq.id === id ? { ...pq, ...patch } : pq)),
    }));

    try {
      await updateDoc(doc(db, 'past_questions', id), patch);
    } catch (e) {
      console.error("Failed to update past question in Firestore", e);
    }
  };

  const deletePastQuestion = async (id: string) => {
    // Instant local UI removal
    setData((prev) => ({
      ...prev,
      pastQuestions: prev.pastQuestions.filter((pq) => pq.id !== id),
    }));

    try {
      await deleteDoc(doc(db, 'past_questions', id));
    } catch (e) {
      console.error("Failed to delete past question from Firestore", e);
    }
  };

  const resetToDefaults = async () => {
    setData(defaultData);
    try {
      localStorage.removeItem(STORAGE_KEY);
      
      // Update settings
      await setDoc(doc(db, 'cms_config', 'settings'), {
        images: defaultImages,
        texts: defaultTexts,
        timerConfig: defaultTimerConfig,
      });

      // Clear & re-seed past_questions
      defaultData.pastQuestions.forEach((pq, idx) => {
        setDoc(doc(db, 'past_questions', pq.id), { ...pq, createdAt: Date.now() - idx * 1000 }).catch(console.error);
      });

      // Clear & re-seed testimonials
      defaultData.testimonials.forEach((t) => {
        setDoc(doc(db, 'testimonials', String(t.id)), { ...t, createdAt: Date.now() }).catch(console.error);
      });
    } catch (e) {
      console.error("Error resetting defaults in Firestore:", e);
    }
  };

  return (
    <CMSContext.Provider
      value={{
        data,
        isAuthenticated,
        isSyncing,
        login,
        logout,
        updateImage,
        updateText,
        updateTimerConfig,
        addTestimonial,
        updateTestimonial,
        deleteTestimonial,
        addPastQuestion,
        updatePastQuestion,
        deletePastQuestion,
        resetToDefaults,
      }}
    >
      {children}
    </CMSContext.Provider>
  );
};

export const useCMS = () => {
  const context = useContext(CMSContext);
  if (context === undefined) {
    throw new Error('useCMS must be used within a CMSProvider');
  }
  return context;
};
