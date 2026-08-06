import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Send, Award, CheckCircle2, User, BookOpen, MessageSquare } from 'lucide-react';

export interface TestimonialData {
  id: number | string;
  name: string;
  programme: string;
  message: string;
  image: string;
}

interface AddSuccessStoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddSuccessStory: (story: TestimonialData) => void;
}

export const AddSuccessStoryModal: React.FC<AddSuccessStoryModalProps> = ({
  isOpen,
  onClose,
  onAddSuccessStory,
}) => {
  const [name, setName] = useState('');
  const [programme, setProgramme] = useState('UNILAG Foundation Programme');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    const newStory: TestimonialData = {
      id: Date.now(),
      name: name.trim(),
      programme: programme.trim() || 'UNILAG Foundation Programme',
      message: message.trim(),
      // Default placehold avatar for user submitted testimonials
      image: `https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80`
    };

    // Log to console for admin content system integration
    console.log('[TPaths Admin System Integration] New Success Story / Testimonial Submitted:', newStory);

    onAddSuccessStory(newStory);
    setIsSubmitted(true);

    setTimeout(() => {
      setIsSubmitted(false);
      setName('');
      setMessage('');
      onClose();
    }, 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="bg-white rounded-3xl shadow-2xl border border-slate-100 max-w-lg w-full overflow-hidden relative"
          >
            <div className="bg-gradient-to-r from-[#0066cc] to-blue-700 p-6 text-white relative">
              <button
                onClick={onClose}
                className="absolute top-5 right-5 text-white/80 hover:text-white p-1.5 rounded-full hover:bg-white/10 transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-3">
                <div className="bg-white/15 p-3 rounded-2xl backdrop-blur-xs">
                  <Award className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-xl text-white">Add Your Success Story</h3>
                  <p className="text-xs text-blue-100">Share your experience with TPaths Learning</p>
                </div>
              </div>
            </div>

            <div className="p-6 md:p-8">
              {isSubmitted ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h4 className="text-xl font-bold text-slate-900 mb-2">Thank You!</h4>
                  <p className="text-sm text-slate-600">
                    Your success story has been submitted and logged for verification.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5 flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-[#0066cc]" />
                      <span>Student Full Name *</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Adebayo Blessing"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0066cc]/20 focus:border-[#0066cc] text-slate-900 text-sm font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5 flex items-center gap-1.5">
                      <BookOpen className="w-3.5 h-3.5 text-[#0066cc]" />
                      <span>Course / Programme</span>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. UNILAG Foundation Programme"
                      value={programme}
                      onChange={(e) => setProgramme(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0066cc]/20 focus:border-[#0066cc] text-slate-900 text-sm font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5 flex items-center gap-1.5">
                      <MessageSquare className="w-3.5 h-3.5 text-[#0066cc]" />
                      <span>Your Testimonial Message *</span>
                    </label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Share how TPaths Learning helped you prepare for the UNILAG Foundation entrance exam..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0066cc]/20 focus:border-[#0066cc] text-slate-900 text-sm font-medium resize-none"
                    ></textarea>
                  </div>

                  <p className="text-[11px] text-slate-400 italic">
                    Note: Submitted testimonials are logged for admin review before permanent broadcast.
                  </p>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full inline-flex justify-center items-center gap-2 bg-[#0066cc] hover:bg-blue-700 text-white font-bold px-6 py-3.5 rounded-xl text-base transition-all shadow-md shadow-blue-200"
                    >
                      <Send className="w-4 h-4" />
                      Submit Success Story
                    </button>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
