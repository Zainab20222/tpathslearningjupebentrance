import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, GraduationCap, BookOpen, Laptop, FileText, Target, ChevronRight, Phone, Instagram, Youtube, Facebook, HelpCircle, Plus, Menu, X, FileCheck, Info, Tag, MessageCircle } from 'lucide-react';
import { siteData } from './data';
import { getWhatsAppLink } from './utils';
import { CountdownTimer } from './components/CountdownTimer';
import { StatsSection } from './components/StatsSection';
import { TrustBar } from './components/TrustBar';
import { FaqAccordion } from './components/FaqAccordion';
import { InquiryModal } from './components/InquiryModal';
import { AddSuccessStoryModal, TestimonialData } from './components/AddSuccessStoryModal';
import { TPathsLogo } from './components/TPathsLogo';
import { NewsletterForm } from './components/NewsletterForm';
import { PastQuestionsSection } from './components/PastQuestionsSection';
import { useCMS } from './context/CMSContext';
import { AdminPanel } from './components/AdminPanel';

// Icons mapping for features
const iconMap: Record<string, React.ReactNode> = {
  'graduation-cap': <GraduationCap className="w-8 h-8 text-[#0066cc]" />,
  'book-open': <BookOpen className="w-8 h-8 text-[#0066cc]" />,
  'laptop': <Laptop className="w-8 h-8 text-[#0066cc]" />,
  'file-text': <FileText className="w-8 h-8 text-[#0066cc]" />,
  'check-circle': <CheckCircle2 className="w-8 h-8 text-[#0066cc]" />,
  'target': <Target className="w-8 h-8 text-[#0066cc]" />
};

export default function App() {
  const { data, addTestimonial } = useCMS();
  const [isStoryModalOpen, setIsStoryModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleAddStory = (newStory: TestimonialData) => {
    addTestimonial({
      name: newStory.name,
      programme: newStory.programme,
      message: newStory.message,
      image: newStory.image
    });
  };

  const waLink = getWhatsAppLink(siteData.contact.whatsappMessage);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* Navigation */}
      <nav className="sticky top-0 z-40 bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <TPathsLogo size="md" />
            <div>
              <div className="font-extrabold text-xl tracking-tight text-slate-900">{siteData.brand.name}</div>
              <div className="text-xs font-medium text-slate-500">{siteData.brand.motto}</div>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-6">
            <a href="#about" className="text-sm font-semibold text-slate-600 hover:text-[#0066cc] transition-colors">About</a>
            <a href="#programme" className="text-sm font-semibold text-slate-600 hover:text-[#0066cc] transition-colors">Programme</a>
            <a href="#past-questions" className="text-sm font-semibold text-slate-600 hover:text-[#0066cc] transition-colors flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse"></span>
              Past Questions 2026
            </a>
            <a href="#pricing" className="text-sm font-semibold text-slate-600 hover:text-[#0066cc] transition-colors">Pricing</a>
            <a href="#faq" className="text-sm font-semibold text-slate-600 hover:text-[#0066cc] transition-colors">FAQ</a>
            <a href={waLink} target="_blank" rel="noopener noreferrer" className="bg-[#25D366] hover:bg-[#20b958] text-white px-5 py-2.5 rounded-full font-semibold transition-all shadow-md hover:shadow-lg flex items-center gap-2">
              <Phone className="w-4 h-4" />
              Chat on {siteData.contact.displayPhone}
            </a>
          </div>

          {/* Mobile Hamburger Menu Toggle Button */}
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="md:hidden p-2.5 text-slate-700 hover:text-[#0066cc] hover:bg-slate-100 rounded-xl transition-colors focus:outline-none"
            aria-label="Open Navigation Menu"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </nav>

      {/* Slide-out Mobile Menu Navigation Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-50 md:hidden flex justify-end">
            {/* Dark Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
            />

            {/* Slide-out Content Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="relative w-full max-w-xs bg-slate-900 h-full text-white shadow-2xl flex flex-col justify-between overflow-y-auto border-l border-slate-800"
            >
              <div>
                {/* Menu Drawer Header */}
                <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950">
                  <div className="flex items-center gap-2.5">
                    <TPathsLogo size="sm" />
                    <div>
                      <div className="font-extrabold text-base text-white">{siteData.brand.name}</div>
                      <div className="text-[10px] text-slate-400">{siteData.brand.motto}</div>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-colors"
                    aria-label="Close Menu"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Navigation Links */}
                <div className="p-4 space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 px-3 block mb-1">
                    Navigation Menu
                  </span>

                  <a
                    href="#about"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-slate-200 hover:bg-slate-800 hover:text-white transition-all"
                  >
                    <Info className="w-4 h-4 text-blue-400" />
                    <span>About TPaths</span>
                  </a>

                  <a
                    href="#programme"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-slate-200 hover:bg-slate-800 hover:text-white transition-all"
                  >
                    <BookOpen className="w-4 h-4 text-green-400" />
                    <span>Programme Details</span>
                  </a>

                  <a
                    href="#past-questions"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-slate-200 hover:bg-slate-800 hover:text-white transition-all bg-purple-500/10 border border-purple-500/20"
                  >
                    <FileCheck className="w-4 h-4 text-purple-400" />
                    <span className="flex-1">Past Questions 2026</span>
                    <span className="text-[10px] bg-purple-500 text-white font-extrabold px-2 py-0.5 rounded-full">
                      NEW
                    </span>
                  </a>

                  <a
                    href="#pricing"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-slate-200 hover:bg-slate-800 hover:text-white transition-all"
                  >
                    <Tag className="w-4 h-4 text-amber-400" />
                    <span>Pricing & Registration</span>
                  </a>

                  <a
                    href="#faq"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-slate-200 hover:bg-slate-800 hover:text-white transition-all"
                  >
                    <HelpCircle className="w-4 h-4 text-cyan-400" />
                    <span>Frequently Asked Questions</span>
                  </a>
                </div>
              </div>

              {/* Menu Drawer Bottom Actions */}
              <div className="p-4 border-t border-slate-800 bg-slate-950 space-y-3">
                <a
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20b958] text-white py-3.5 px-4 rounded-xl font-extrabold text-sm transition-all shadow-lg shadow-green-950/50"
                >
                  <Phone className="w-4 h-4 fill-current" />
                  <span>Chat on {siteData.contact.displayPhone}</span>
                </a>

                <p className="text-[11px] text-slate-500 text-center font-medium">
                  UNILAG Foundation Examination Centre
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Floating WhatsApp Button */}
      <a 
        href={waLink}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-[#25D366] hover:bg-[#20b958] text-white p-4 rounded-full shadow-xl hover:shadow-2xl transition-all transform hover:scale-105 flex items-center justify-center group"
        aria-label={`Chat with us on WhatsApp (${siteData.contact.displayPhone})`}
      >
        <Phone className="w-7 h-7" />
        <span className="absolute right-full mr-4 bg-white text-slate-800 px-4 py-2 rounded-lg text-sm font-semibold shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          WhatsApp: {siteData.contact.displayPhone}
        </span>
      </a>

      {/* Hero Section */}
      <section className="relative bg-white pt-16 pb-24 lg:pt-24 lg:pb-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-2xl"
            >
              <div className="inline-block mb-4 px-4 py-1.5 rounded-full bg-blue-50 text-[#0066cc] font-semibold text-sm tracking-wide border border-blue-100">
                {data.texts.heroHighlight}
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-tight mb-6 tracking-tight">
                {data.texts.heroHeadline}
              </h1>
              <p className="text-lg md:text-xl text-slate-600 mb-6 leading-relaxed">
                {data.texts.heroSubheadline}
              </p>
              
              <div className="mb-8">
                <CountdownTimer 
                  daysFromNow={siteData.hero.deadlineDaysFromNow} 
                  deadlineText={data.texts.heroDeadlineText} 
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <a 
                  href={waLink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex justify-center items-center gap-2 bg-[#25D366] hover:bg-[#20b958] text-white px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-lg shadow-green-200"
                >
                  <Phone className="w-5 h-5" />
                  Register Now on WhatsApp ({siteData.contact.displayPhone})
                </a>
                <a 
                  href="#about"
                  className="inline-flex justify-center items-center gap-2 bg-white border-2 border-slate-200 hover:border-slate-300 text-slate-700 px-8 py-4 rounded-xl font-bold text-lg transition-all"
                >
                  Learn More
                  <ChevronRight className="w-5 h-5" />
                </a>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative lg:ml-auto"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-100 to-transparent rounded-3xl transform translate-x-4 translate-y-4"></div>
              <img 
                src={data.images.heroImage} 
                alt="Motivated Nigerian student learning" 
                className="relative rounded-3xl shadow-2xl object-cover w-full h-[500px] lg:h-[600px] z-10 border-4 border-white"
              />
              
              {/* Floating badge */}
              <div className="absolute -left-6 bottom-12 z-20 bg-white p-4 rounded-2xl shadow-xl flex items-center gap-4 animate-bounce">
                <div className="bg-green-100 p-3 rounded-full">
                  <CheckCircle2 className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="font-bold text-slate-900">Proven Success</p>
                  <p className="text-xs text-slate-500 font-medium">Expert Preparation</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trust Bar Section */}
      <TrustBar />

      {/* Success Statistics Section */}
      <StatsSection />

      {/* About Section */}
      <section id="about" className="py-24 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1 relative">
               <img 
                src={data.images.aboutImage} 
                alt="Student attending online lessons" 
                className="rounded-3xl shadow-xl object-cover w-full h-[450px]"
              />
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-3xl font-bold text-slate-900 mb-6 tracking-tight">ABOUT TPATHS LEARNING</h2>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                {data.texts.aboutText}
              </p>
              <blockquote className="border-l-4 border-[#0066cc] pl-6 py-2">
                <p className="text-xl font-medium text-slate-800 italic leading-relaxed">
                  "{data.texts.aboutQuote}"
                </p>
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* Programme Section */}
      <section id="programme" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-6 tracking-tight">{data.texts.programmeTitle}</h2>
            <p className="text-lg text-slate-600 leading-relaxed">
              {data.texts.programmeDescription}
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center bg-slate-50 rounded-3xl p-8 md:p-12 border border-slate-100">
            <div>
              <h3 className="text-2xl font-bold text-slate-900 mb-6">What Students Need to Succeed:</h3>
              <ul className="space-y-4">
                {siteData.programmeInfo.needs.map((need, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    <CheckCircle2 className="w-6 h-6 text-[#0066cc] flex-shrink-0" />
                    <span className="text-lg font-medium text-slate-700">{need}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative">
              <img 
                src={data.images.successImage} 
                alt="Students celebrating success" 
                className="rounded-2xl shadow-lg object-cover w-full h-[350px]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 tracking-tight">WHY CHOOSE TPATHS LEARNING?</h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">Our programme is designed with everything you need to achieve admission success.</p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {siteData.whyChooseUs.map((feature, idx) => (
              <div key={idx} className="bg-slate-800 p-8 rounded-2xl border border-slate-700 hover:border-slate-600 transition-colors">
                <div className="bg-slate-700/50 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                  {iconMap[feature.icon]}
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-slate-400 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works & Subjects */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Subjects */}
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-8 tracking-tight">SUBJECTS COVERED</h2>
              <div className="grid grid-cols-2 gap-4">
                {siteData.subjects.map((subject, idx) => (
                  <div key={idx} className="bg-white px-6 py-4 rounded-xl shadow-sm border border-slate-100 flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-[#0066cc]"></div>
                    <span className="font-semibold text-slate-700">{subject}</span>
                  </div>
                ))}
              </div>
              
              <div className="mt-12">
                <h3 className="text-xl font-bold text-slate-900 mb-6">Learning Resources Included:</h3>
                <div className="flex flex-wrap gap-3">
                  {siteData.resources.map((res, idx) => (
                    <span key={idx} className="bg-blue-50 text-[#0066cc] px-4 py-2 rounded-full text-sm font-semibold border border-blue-100">
                      {res.title}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            
            {/* How it works */}
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-8 tracking-tight">HOW THE PROGRAMME WORKS</h2>
              <div className="space-y-6">
                {siteData.howItWorks.map((step) => (
                  <div key={step.step} className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#0066cc] text-white flex items-center justify-center font-bold text-lg shadow-md">
                      {step.step}
                    </div>
                    <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex-1 flex items-center">
                      <span className="font-bold text-slate-800 text-lg">{step.title}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* UNILAG Foundation Past Questions & Solutions Section */}
      <PastQuestionsSection />

      {/* Pricing / Registration CTA */}
      <section id="pricing" className="py-24 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[#0066cc]/5 -skew-y-3 transform origin-top-left"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden">
            <div className="bg-[#0066cc] p-10 text-center text-white">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">{data.texts.pricingTitle}</h2>
              <div className="text-5xl font-extrabold tracking-tight mb-2">{data.texts.pricingPrice}</div>
              <p className="text-blue-100 font-medium text-lg">Complete Preparation Investment</p>
            </div>
            <div className="p-10 md:p-12">
              <div className="grid md:grid-cols-2 gap-y-4 gap-x-8 mb-10">
                {siteData.pricing.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="font-medium text-slate-700">{feature}</span>
                  </div>
                ))}
              </div>
              <div className="text-center">
                <a 
                  href={waLink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex justify-center items-center gap-2 bg-[#25D366] hover:bg-[#20b958] text-white px-10 py-5 rounded-xl font-bold text-xl transition-all shadow-lg shadow-green-200 w-full md:w-auto"
                >
                  <Phone className="w-6 h-6" />
                  {data.texts.pricingCtaText}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between mb-16 gap-6 text-center md:text-left">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 tracking-tight">WHAT OUR STUDENTS SAY</h2>
              <p className="text-slate-600 mt-2 text-sm">Real stories from students prepared by TPaths Learning</p>
            </div>
            <button
              onClick={() => setIsStoryModalOpen(true)}
              className="inline-flex items-center gap-2 bg-white hover:bg-blue-50 text-[#0066cc] border-2 border-[#0066cc] font-bold px-5 py-2.5 rounded-xl text-sm transition-all shadow-sm hover:shadow-md cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              Add Your Success Story
            </button>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {data.testimonials.map((test) => (
              <div key={test.id} className="bg-white p-8 rounded-2xl shadow-md border border-slate-100 relative">
                <div className="text-[#0066cc] opacity-20 absolute top-6 right-6">
                  <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 32 32">
                    <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                  </svg>
                </div>
                <p className="text-lg text-slate-700 italic mb-8 relative z-10 leading-relaxed">
                  "{test.message}"
                </p>
                <div className="flex items-center gap-4 relative z-10">
                  <img src={test.image} alt={test.name} className="w-14 h-14 rounded-full object-cover shadow-sm border-2 border-white" />
                  <div>
                    <h4 className="font-bold text-slate-900">{test.name}</h4>
                    <p className="text-sm font-medium text-[#0066cc]">{test.programme}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Parent Trust */}
      <section className="py-20 bg-blue-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-10 tracking-tight">{siteData.parentTrust.title}</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {siteData.parentTrust.points.map((point, idx) => (
              <div key={idx} className="bg-white px-6 py-3 rounded-full shadow-sm border border-blue-100 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-[#0066cc]" />
                <span className="font-bold text-slate-700">{point}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Visual Break / Gallery */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="grid md:grid-cols-3 gap-8">
             <img src={data.images.galleryCafeImage} alt="Learning comfortably at a cafe" className="w-full h-64 object-cover rounded-2xl shadow-md transition-transform hover:scale-105 duration-300" />
             <img src={data.images.galleryParkImage} alt="Flexible outdoor learning" className="w-full h-64 object-cover rounded-2xl shadow-md transition-transform hover:scale-105 duration-300" />
             <img src={data.images.galleryTutorImage} alt="Expert Tutors online" className="w-full h-64 object-cover rounded-2xl shadow-md transition-transform hover:scale-105 duration-300" />
           </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FaqAccordion />

      {/* Final CTA */}
      <section className="py-24 bg-[#0066cc] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6 tracking-tight">{siteData.finalRegistration.headline}</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto leading-relaxed">
            {siteData.finalRegistration.text}
          </p>
          <div className="inline-block mb-10 px-6 py-2 rounded-full bg-blue-800/50 font-bold text-lg border border-blue-400">
            {siteData.finalRegistration.highlight}
          </div>
          <div>
            <a 
              href={waLink} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex justify-center items-center gap-2 bg-[#25D366] hover:bg-[#20b958] text-white px-10 py-5 rounded-xl font-bold text-xl transition-all shadow-xl shadow-blue-900/50"
            >
              <Phone className="w-6 h-6" />
              Register Now on WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300 py-16 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-10">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <TPathsLogo size="md" />
                <span className="font-extrabold text-xl text-white tracking-tight">{siteData.brand.name}</span>
              </div>
              <p className="text-slate-400 font-medium italic mb-4 text-xs">"{siteData.brand.motto}"</p>
              <p className="text-xs text-slate-500 max-w-sm leading-relaxed">
                Professional academic preparation centre helping Nigerian students successfully prepare for university admission.
              </p>
            </div>

            <div>
              <NewsletterForm />
            </div>
            
            <div className="md:text-right">
              <h3 className="text-white font-bold mb-3 text-sm">Follow TPaths Learning</h3>
              <p className="text-xs text-slate-400 mb-5 max-w-sm md:ml-auto leading-relaxed">
                Stay connected with TPaths Learning for admission updates, educational tips, student success stories, and important announcements.
              </p>
              <div className="flex items-center md:justify-end gap-3">
                <a href={siteData.brand.socials.tiktok} target="_blank" rel="noopener noreferrer" className="bg-slate-800 hover:bg-[#0066cc] p-2.5 rounded-full transition-colors group" title="TikTok">
                  <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 15.68a6.34 6.34 0 0 0 6.26 6.32 6.32 6.32 0 0 0 6.26-6.32V10.7a8.55 8.55 0 0 0 4.48 1.25V8.5a4.7 4.7 0 0 1-2.41-1.81z"/>
                  </svg>
                </a>
                <a href={siteData.brand.socials.facebook} target="_blank" rel="noopener noreferrer" className="bg-slate-800 hover:bg-[#0066cc] p-2.5 rounded-full transition-colors group" title="Facebook">
                  <Facebook className="w-4 h-4 text-white" />
                </a>
                <a href={siteData.brand.socials.instagram} target="_blank" rel="noopener noreferrer" className="bg-slate-800 hover:bg-[#0066cc] p-2.5 rounded-full transition-colors group" title="Instagram">
                  <Instagram className="w-4 h-4 text-white" />
                </a>
                <a href={siteData.brand.socials.youtube} target="_blank" rel="noopener noreferrer" className="bg-slate-800 hover:bg-[#0066cc] p-2.5 rounded-full transition-colors group" title="YouTube">
                  <Youtube className="w-4 h-4 text-white" />
                </a>
                <a href={waLink} target="_blank" rel="noopener noreferrer" className="bg-[#25D366] hover:bg-[#20b958] p-2.5 rounded-full transition-colors shadow-lg" title="WhatsApp">
                  <Phone className="w-4 h-4 text-white" />
                </a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
            <p>&copy; {new Date().getFullYear()} {siteData.brand.name}. All rights reserved.</p>
            <p>Designed for Academic Success</p>
          </div>
        </div>
      </footer>

      {/* Slide-up Inquiry Modal */}
      <InquiryModal />

      {/* Admin Panel */}
      <AdminPanel />

      {/* Add Success Story Modal */}
      <AddSuccessStoryModal
        isOpen={isStoryModalOpen}
        onClose={() => setIsStoryModalOpen(false)}
        onAddSuccessStory={handleAddStory}
      />
    </div>
  );
}
