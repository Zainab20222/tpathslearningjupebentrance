import heroStudent from './assets/images/hero_student_1785711083487.jpg';
import learningHome from './assets/images/learning_home_1785711097629.jpg';
import learningCafe from './assets/images/learning_cafe_1785711109620.jpg';
import tutorTeaching from './assets/images/tutor_teaching_1785711122075.jpg';
import successCelebration from './assets/images/success_celebration_1785711132861.jpg';
import avatar1 from './assets/images/avatar_1_1785711143418.jpg';
import avatar2 from './assets/images/avatar_2_1785711154721.jpg';
import learningPark from './assets/images/learning_park_1785711181729.jpg';
import tpathsLogo from './assets/images/tpaths_logo_official_1785723779596.jpg';
import unilagPastQuestionsBooklet from './assets/images/unilag_past_questions_booklet_1785726499343.jpg';
import unilagSolutionsPack from './assets/images/unilag_solutions_pack_1785726515360.jpg';

export const siteData = {
  brand: {
    name: "TPATHS LEARNING",
    logo: tpathsLogo,
    motto: "A Simple Path to Success",
    socials: {
      tiktok: "https://www.tiktok.com/@tpaths",
      youtube: "https://www.youtube.com/@TPaths",
      instagram: "https://www.instagram.com/transcendencepaths/",
      facebook: "https://www.facebook.com/share/1UceQ7kkGe/",
    }
  },
  contact: {
    whatsappNumber: "08062128656",
    displayPhone: "08062128656",
    whatsappMessage: "Hello TPaths Learning, I am interested in registering for the UNILAG Foundation Entrance Lesson Programme.",
    pastQuestionsMessage: "Hello TPaths Learning, I would like to get the UNILAG Foundation Entrance Past Questions & Solutions."
  },
  pastQuestions: [
    {
      id: "pq-1",
      title: "UNILAG Foundation Entrance Past Questions & Solutions",
      description: "Authentic multi-subject questions with step-by-step worked mathematical & reasoning solutions.",
      image: unilagPastQuestionsBooklet,
      category: "Complete Booklet",
      badge: "Verified 2024/2025"
    },
    {
      id: "pq-2",
      title: "UNILAG Post-UTME & Foundation CBT Drill Pack",
      description: "Subject-by-subject CBT practice drills covering Mathematics, English & General Studies.",
      image: unilagSolutionsPack,
      category: "CBT Practice",
      badge: "Updated Drill"
    }
  ],
  hero: {
    headline: "PREPARE FOR UNILAG FOUNDATION SUCCESS WITH TPATHS LEARNING",
    subheadline: "Get expert preparation for the University of Lagos Foundation Programme entrance examination through structured lessons, experienced tutors, past question practice, and proven examination strategies.",
    highlight: "Complete Preparation Programme — ₦35,000",
    registrationDeadlineText: "Next Entrance Lesson Batch Closes In:",
    // Target date set to 5 days from now for urgency
    deadlineDaysFromNow: 5,
    image: heroStudent
  },
  trustBadges: [
    { label: "100% UNILAG Exam Aligned", detail: "Curriculum verified for UNILAG entrance pattern", icon: "shield-check" },
    { label: "Verified Nigerian Tutors", detail: "Experienced subject matter specialists", icon: "user-check" },
    { label: "94% Admission Pass Rate", detail: "High success track record across cohorts", icon: "award" },
    { label: "Past Questions Included", detail: "Comprehensive CBT & written drill sets", icon: "file-check" },
    { label: "Parent-Approved Quality", detail: "Transparent student progress monitoring", icon: "check-circle" }
  ],
  about: {
    text: "TPaths Learning is an educational platform dedicated to helping students achieve academic success through quality teaching, structured preparation, and effective examination strategies.",
    quote: "The TPaths Learning UNILAG Foundation Entrance Lesson Programme helps students develop the knowledge, confidence, and examination skills needed to succeed in their entrance examination.",
    image: learningHome
  },
  stats: [
    {
      label: "Students Enrolled",
      value: "1,500+",
      description: "Prepared for UNILAG Foundation Exam",
      icon: "users"
    },
    {
      label: "Success Rate",
      value: "94%",
      description: "Secured Admission Pass Score",
      icon: "award"
    },
    {
      label: "Years of Experience",
      value: "7+ Years",
      description: "Dedicated Academic Excellence",
      icon: "calendar"
    }
  ],
  programmeInfo: {
    title: "WHAT IS UNILAG FOUNDATION PROGRAMME?",
    description: "The UNILAG Foundation Programme offers a direct entry pathway into the University of Lagos. Proper preparation is essential to secure your admission opportunities in this highly competitive programme.",
    needs: [
      "Strong subject knowledge",
      "Examination techniques",
      "Past question practice",
      "Time management skills",
      "Confidence"
    ],
    image: successCelebration
  },
  whyChooseUs: [
    {
      title: "Experienced Tutors",
      description: "Professional guidance from knowledgeable tutors.",
      icon: "graduation-cap"
    },
    {
      title: "Structured Lessons",
      description: "Organised lessons designed for examination success.",
      icon: "book-open"
    },
    {
      title: "Flexible Online Learning",
      description: "Learn from home, café, park, or any convenient location.",
      icon: "laptop"
    },
    {
      title: "Past Questions Practice",
      description: "Understand examination patterns.",
      icon: "file-text"
    },
    {
      title: "Mock Examinations",
      description: "Measure improvement.",
      icon: "check-circle"
    },
    {
      title: "Examination Strategies",
      description: "Improve speed and accuracy.",
      icon: "target"
    }
  ],
  pricing: {
    title: "UNILAG FOUNDATION ENTRANCE LESSON PROGRAMME",
    price: "₦35,000",
    features: [
      "Experienced tutor guidance",
      "Structured entrance examination preparation",
      "Learning materials",
      "Past questions practice",
      "Mock assessments",
      "Revision support",
      "Examination strategies",
      "Academic guidance"
    ]
  },
  testimonials: [
    {
      id: 1,
      name: "Chiamaka O.",
      programme: "UNILAG Foundation Programme",
      message: "Before joining TPaths Learning, I was not confident about my preparation. The structured lessons and past question practice helped me understand what to expect and prepare better.",
      image: avatar1
    },
    {
      id: 2,
      name: "Oluwaseun A.",
      programme: "UNILAG Foundation Programme",
      message: "The tutors are exceptional. They broke down complex topics and the mock exams really helped improve my speed. Highly recommended for anyone serious about admission.",
      image: avatar2
    }
  ],
  subjects: [
    "English Language",
    "Mathematics",
    "Biology",
    "Chemistry",
    "Physics",
    "Economics",
    "Government",
    "Literature"
  ],
  howItWorks: [
    { step: 1, title: "Register for ₦35,000 programme" },
    { step: 2, title: "Receive lesson schedule" },
    { step: 3, title: "Attend structured lessons" },
    { step: 4, title: "Practice with materials and assessments" },
    { step: 5, title: "Write entrance examination confidently" }
  ],
  resources: [
    { title: "Past questions" },
    { title: "Revision materials" },
    { title: "Practice exercises" },
    { title: "Lesson resources" }
  ],
  parentTrust: {
    title: "WHY PARENTS TRUST TPATHS LEARNING",
    points: [
      "Quality teaching",
      "Structured preparation",
      "Student support",
      "Regular assessment",
      "Transparent communication"
    ]
  },
  finalRegistration: {
    headline: "START YOUR UNILAG FOUNDATION JOURNEY TODAY",
    text: "Join TPaths Learning and receive professional preparation designed to help you approach your entrance examination confidently.",
    highlight: "Programme Fee: ₦35,000"
  },
  faqs: [
    {
      question: "What is the UNILAG Foundation Programme?",
      answer: "The UNILAG Foundation Programme is a one-year pre-degree course that qualifies successful candidates for direct entry admission into 200 level degree programmes at the University of Lagos."
    },
    {
      question: "Who can register?",
      answer: "Any student seeking admission into the University of Lagos who possesses the required O'Level credits and wishes to undergo the Foundation Programme."
    },
    {
      question: "How much is the programme?",
      answer: "The complete TPaths Learning UNILAG Foundation Entrance Lesson Programme costs ₦35,000."
    },
    {
      question: "Are classes online?",
      answer: "Yes, our programme offers flexible online learning, allowing students to learn from home, a café, or any convenient location."
    },
    {
      question: "What subjects are covered?",
      answer: "We cover core subjects including English Language, Mathematics, Biology, Chemistry, Physics, Economics, Government, and Literature."
    },
    {
      question: "How do I register?",
      answer: "Simply click the 'Register Now on WhatsApp' button to chat with our team and secure your place."
    }
  ],
  galleryImages: {
    learningCafe,
    tutorTeaching,
    learningPark
  }
};
