import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, HelpCircle, Phone } from 'lucide-react';
import { siteData } from '../data';
import { getWhatsAppLink } from '../utils';

export const FaqAccordion: React.FC = () => {
  // Index 0 open by default for immediate preview
  const [openIndexes, setOpenIndexes] = useState<number[]>([0]);

  const toggleFaq = (index: number) => {
    setOpenIndexes((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const waLink = getWhatsAppLink(
    "Hello TPaths Learning, I have a specific question about the UNILAG Foundation Programme entrance exam.",
    siteData.contact.whatsappNumber
  );

  return (
    <section id="faq" className="py-24 bg-slate-50 border-t border-slate-200">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 text-[#0066cc] font-semibold text-xs uppercase tracking-wider mb-3 border border-blue-100">
            <HelpCircle className="w-4 h-4 text-[#0066cc]" />
            <span>Got Questions?</span>
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            FREQUENTLY ASKED QUESTIONS
          </h2>
          <p className="text-slate-600 mt-2 text-sm">
            Everything you need to know about the UNILAG Foundation Entrance Lesson Programme.
          </p>
        </div>

        <div className="space-y-3">
          {siteData.faqs.map((faq, idx) => {
            const isOpen = openIndexes.includes(idx);
            return (
              <div
                key={idx}
                className={`bg-white rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? 'border-[#0066cc]/40 shadow-md ring-1 ring-[#0066cc]/10'
                    : 'border-slate-200/90 shadow-xs hover:border-slate-300'
                }`}
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full text-left p-5 md:p-6 flex items-start justify-between gap-4 cursor-pointer focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="font-bold text-slate-900 text-base md:text-lg flex items-start gap-3">
                    <HelpCircle className={`w-5 h-5 flex-shrink-0 mt-0.5 transition-colors ${isOpen ? 'text-[#0066cc]' : 'text-slate-400'}`} />
                    <span>{faq.question}</span>
                  </span>
                  <div className={`p-1.5 rounded-full transition-all duration-200 ${isOpen ? 'bg-blue-50 text-[#0066cc] rotate-180' : 'bg-slate-100 text-slate-500'}`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                    >
                      <div className="px-5 pb-6 pt-0 md:px-6 ml-8 border-t border-slate-100 text-slate-600 text-sm md:text-base leading-relaxed pt-4">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Direct WhatsApp Prompt below FAQs */}
        <div className="mt-10 bg-blue-50/80 border border-blue-100 p-6 rounded-2xl text-center">
          <p className="text-slate-700 font-semibold text-sm mb-3">
            Still have an unanswered question about UNILAG Foundation entrance requirements?
          </p>
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20b958] text-white px-6 py-3 rounded-xl font-bold text-sm shadow-md transition-all"
          >
            <Phone className="w-4 h-4" />
            Ask Directly on WhatsApp ({siteData.contact.displayPhone})
          </a>
        </div>
      </div>
    </section>
  );
};
