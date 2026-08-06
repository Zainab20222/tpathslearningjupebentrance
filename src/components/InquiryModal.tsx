import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, X, Phone, HelpCircle, CheckCircle2 } from 'lucide-react';
import { getWhatsAppLink } from '../utils';
import { siteData } from '../data';

export const InquiryModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasBeenDismissed, setHasBeenDismissed] = useState(false);

  useEffect(() => {
    // Check if dismissed in this session
    const dismissed = sessionStorage.getItem('tpaths_inquiry_modal_dismissed');
    if (dismissed === 'true') {
      setHasBeenDismissed(true);
      return;
    }

    // Trigger after a 30-second delay on the page
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 30000); // 30 seconds

    return () => {
      clearTimeout(timer);
    };
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    setHasBeenDismissed(true);
    sessionStorage.setItem('tpaths_inquiry_modal_dismissed', 'true');
  };

  const customMessage = "Hello TPaths Learning, I have a question about the UNILAG Foundation Entrance Lesson Programme.";
  const waLink = getWhatsAppLink(customMessage, "08062128656");

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="bg-white rounded-3xl shadow-2xl border border-slate-100 max-w-md w-full overflow-hidden relative"
            >
              {/* Top Accent Bar */}
              <div className="bg-gradient-to-r from-[#0066cc] to-blue-700 h-2.5 w-full"></div>
              
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-2 rounded-full hover:bg-slate-100 transition-colors z-10"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="p-6 md:p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-green-100 text-green-600 p-3 rounded-2xl flex items-center justify-center">
                    <MessageCircle className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl text-slate-900">Have Questions?</h3>
                    <p className="text-xs text-[#0066cc] font-semibold">We're Online & Ready to Assist</p>
                  </div>
                </div>

                <p className="text-slate-600 text-sm leading-relaxed mb-5">
                  Need clarity on the <strong>UNILAG Foundation Entrance Lesson Programme</strong>, subject combinations, or registration steps? Speak directly with our admissions advisor.
                </p>

                <div className="bg-slate-50 border border-slate-100 rounded-2xl p-3.5 mb-6 space-y-2">
                  <div className="flex items-center gap-2 text-xs text-slate-700 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                    <span>Instant WhatsApp response</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-700 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                    <span>Direct WhatsApp contact: <strong>08062128656</strong></span>
                  </div>
                </div>

                <div className="space-y-3">
                  <a
                    href={waLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={handleClose}
                    className="w-full inline-flex justify-center items-center gap-2.5 bg-[#25D366] hover:bg-[#20b958] text-white px-6 py-3.5 rounded-xl font-bold text-base transition-all shadow-lg shadow-green-200"
                  >
                    <Phone className="w-5 h-5" />
                    Chat on WhatsApp (08062128656)
                  </a>
                  <button
                    onClick={handleClose}
                    className="w-full text-center text-xs font-semibold text-slate-400 hover:text-slate-600 py-2 transition-colors"
                  >
                    Continue Browsing
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Manual trigger button near bottom-left so user can re-open if desired */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 left-6 z-40 bg-white border border-slate-200 text-slate-700 px-4 py-2.5 rounded-full shadow-lg hover:shadow-xl transition-all flex items-center gap-2 text-xs font-bold hover:bg-slate-50"
          aria-label="Ask a Question"
        >
          <HelpCircle className="w-4 h-4 text-[#0066cc]" />
          <span>Have Questions?</span>
        </button>
      )}
    </>
  );
};
