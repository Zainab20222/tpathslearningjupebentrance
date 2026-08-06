import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FileCheck, Upload, Phone, ZoomIn, Trash2, X, Image as ImageIcon, CheckCircle, Sparkles, Lock, ShieldCheck } from 'lucide-react';
import { siteData } from '../data';
import { getWhatsAppLink } from '../utils';
import { useCMS, PastQuestionItem } from '../context/CMSContext';

export const PastQuestionsSection: React.FC = () => {
  const { data, addPastQuestion, deletePastQuestion, isAuthenticated } = useCMS();
  const items = data.pastQuestions;

  const [selectedImage, setSelectedImage] = useState<PastQuestionItem | null>(null);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newCategory, setNewCategory] = useState('UNILAG Foundation Past Questions 2026');
  const [previewFile, setPreviewFile] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setPreviewFile(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddPastQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!previewFile || !isAuthenticated) return;

    addPastQuestion({
      title: newTitle.trim() || 'UNILAG Foundation Past Questions 2026',
      description: newDesc.trim() || 'Authentic 2026 entrance exam past question booklet & worked solutions.',
      image: previewFile,
      category: newCategory,
      badge: 'Verified 2026',
      isCustom: true
    });

    // Reset Form
    setNewTitle('');
    setNewDesc('');
    setPreviewFile(null);
    setIsUploadModalOpen(false);
  };

  const handleDeleteItem = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isAuthenticated) return;
    if (window.confirm("Are you sure you want to delete this 2026 past question item?")) {
      deletePastQuestion(id);
    }
  };

  const waLink = getWhatsAppLink(
    siteData.contact.pastQuestionsMessage,
    siteData.contact.whatsappNumber
  );

  return (
    <section id="past-questions" className="py-24 bg-slate-900 text-white relative overflow-hidden">
      {/* Background Subtle Accent */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/10 rounded-full filter blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600/10 rounded-full filter blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 text-xs font-bold uppercase tracking-wider mb-3">
              <FileCheck className="w-4 h-4 text-purple-400" />
              <span>UNILAG Foundation Entrance 2026</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white flex items-center gap-2 flex-wrap">
              UNILAG FOUNDATION PAST QUESTIONS 2026
            </h2>
            <p className="text-slate-400 mt-2 text-sm sm:text-base max-w-2xl leading-relaxed">
              Explore authentic University of Lagos Foundation entrance exam past question booklets, Science/Arts compilations, CBT drills, and worked solutions for 2026.
            </p>
          </div>

          {/* Upload Action Button (Admin Protected) */}
          {isAuthenticated && (
            <button
              onClick={() => setIsUploadModalOpen(true)}
              className="inline-flex items-center justify-center gap-2 bg-[#0066cc] hover:bg-blue-600 text-white font-bold px-5 py-3 rounded-xl text-sm transition-all shadow-lg hover:shadow-blue-500/20 flex-shrink-0 cursor-pointer"
            >
              <Upload className="w-4 h-4" />
              <span>Upload 2026 Past Question</span>
            </button>
          )}
        </div>

        {/* Grid Layout */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {items.map((item) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-slate-800/90 rounded-2xl border border-slate-700/80 overflow-hidden shadow-xl hover:border-purple-500/50 transition-all duration-300 group flex flex-col"
            >
              {/* Image Container */}
              <div
                onClick={() => setSelectedImage(item)}
                className="relative aspect-4/3 overflow-hidden bg-slate-950 cursor-pointer group"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />

                {/* Badge Overlay */}
                {item.badge && (
                  <div className="absolute top-3 left-3 bg-slate-900/90 backdrop-blur-md text-purple-300 text-[11px] font-bold px-3 py-1 rounded-full border border-purple-500/30 shadow-md">
                    {item.badge}
                  </div>
                )}

                {/* Hover Action Overlay */}
                <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                  <div className="bg-white/20 backdrop-blur-md text-white p-3 rounded-full hover:bg-white/30 transition-all transform group-hover:scale-110">
                    <ZoomIn className="w-6 h-6" />
                  </div>
                </div>

                {/* Admin Delete Icon */}
                {isAuthenticated && (
                  <button
                    onClick={(e) => handleDeleteItem(item.id, e)}
                    className="absolute top-3 right-3 bg-red-600/90 hover:bg-red-700 text-white p-2 rounded-xl text-xs transition-all shadow-md z-20"
                    title="Delete Past Question Item"
                    aria-label="Delete Past Question Item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  {item.category && (
                    <span className="text-[11px] font-bold uppercase tracking-wider text-purple-400 mb-1 block">
                      {item.category}
                    </span>
                  )}
                  <h3 className="font-bold text-white text-base leading-snug mb-2 group-hover:text-purple-300 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-slate-400 text-xs leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-700/60 flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-slate-400 flex items-center gap-1">
                    <CheckCircle className="w-3.5 h-3.5 text-green-400" />
                    2026 Exam Aligned
                  </span>
                  <button
                    onClick={() => setSelectedImage(item)}
                    className="text-xs font-bold text-purple-400 hover:text-purple-300 flex items-center gap-1 transition-colors"
                  >
                    <span>Preview</span>
                    <ZoomIn className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mandatory CTA Button */}
        <div className="bg-slate-800/80 border border-slate-700 p-8 rounded-3xl text-center max-w-3xl mx-auto shadow-2xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-green-500/10 text-green-400 text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-4 h-4 text-green-400" />
            <span>Instant Softcopy & Printed Delivery 2026</span>
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">
            Need UNILAG Foundation Past Questions & Solutions 2026?
          </h3>
          <p className="text-slate-300 text-sm mb-6 max-w-xl mx-auto leading-relaxed">
            Get complete 2026 past question study packs with detailed worked solutions delivered directly to your WhatsApp or doorstep.
          </p>

          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#20b958] text-white px-8 py-4 rounded-2xl font-extrabold text-base md:text-lg transition-all shadow-xl shadow-green-900/30 hover:scale-102 cursor-pointer w-full sm:w-auto"
          >
            <Phone className="w-5 h-5 fill-current" />
            <span>Get 2026 Past Questions on WhatsApp</span>
          </a>
        </div>
      </div>

      {/* Lightbox Zoom Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md p-4 flex items-center justify-center"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="bg-slate-900 border border-slate-700 rounded-3xl overflow-hidden max-w-3xl w-full max-h-[90vh] flex flex-col shadow-2xl"
            >
              {/* Modal Header */}
              <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-purple-400 block">
                    {selectedImage.category || '2026 Past Question Preview'}
                  </span>
                  <h4 className="font-extrabold text-white text-base sm:text-lg">
                    {selectedImage.title}
                  </h4>
                </div>
                <button
                  onClick={() => setSelectedImage(null)}
                  className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Image View */}
              <div className="p-4 overflow-auto flex-1 bg-slate-950 flex items-center justify-center">
                <img
                  src={selectedImage.image}
                  alt={selectedImage.title}
                  className="max-h-[60vh] w-auto object-contain rounded-xl shadow-md"
                />
              </div>

              {/* Modal Footer CTA */}
              <div className="p-4 sm:p-5 border-t border-slate-800 bg-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-xs text-slate-400">
                  {selectedImage.description}
                </p>
                <a
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20b958] text-white px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm shadow-md transition-all flex-shrink-0"
                >
                  <Phone className="w-4 h-4" />
                  Get 2026 Past Questions on WhatsApp
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Upload Past Question Image Modal */}
      <AnimatePresence>
        {isUploadModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md p-4 flex items-center justify-center"
          >
            <div className="bg-slate-900 border border-slate-700 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl relative">
              <button
                onClick={() => setIsUploadModalOpen(false)}
                className="absolute top-5 right-5 text-slate-400 hover:text-white p-1"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="mb-6">
                <div className="w-12 h-12 bg-purple-500/20 text-purple-400 rounded-2xl flex items-center justify-center mb-3 border border-purple-500/30">
                  <Upload className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-extrabold text-white">
                  Upload 2026 Past Question Image
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Upload booklet covers, Science/Arts compilations, CBT drills or worked solutions.
                </p>
              </div>

              <form onSubmit={handleAddPastQuestion} className="space-y-4">
                {/* Image Picker Dropzone */}
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5 uppercase tracking-wider">
                    Select Image File *
                  </label>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileUpload}
                    accept="image/*"
                    className="hidden"
                  />

                  {previewFile ? (
                    <div className="relative rounded-2xl overflow-hidden border border-purple-500/50 bg-slate-950 aspect-16/9 flex items-center justify-center">
                      <img
                        src={previewFile}
                        alt="Preview"
                        className="h-full w-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => setPreviewFile(null)}
                        className="absolute top-2 right-2 bg-red-600 text-white p-1.5 rounded-lg text-xs"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="w-full border-2 border-dashed border-slate-700 hover:border-purple-500/60 rounded-2xl p-6 text-center bg-slate-800/50 hover:bg-slate-800 transition-all cursor-pointer group"
                    >
                      <ImageIcon className="w-8 h-8 text-slate-500 group-hover:text-purple-400 mx-auto mb-2 transition-colors" />
                      <span className="block text-xs font-bold text-slate-300">
                        Click to browse image from your device
                      </span>
                      <span className="block text-[10px] text-slate-500 mt-0.5">
                        PNG, JPG, WEBP or GIF supported
                      </span>
                    </button>
                  )}
                </div>

                {/* Title */}
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    Booklet Title / Subject Name
                  </label>
                  <input
                    type="text"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder='e.g., "UNILAG Foundation Past Questions 2026"'
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
                  />
                </div>

                {/* Category */}
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    Category Name
                  </label>
                  <input
                    type="text"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    placeholder='e.g., "Science Compilation 2026"'
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    Description (Optional)
                  </label>
                  <input
                    type="text"
                    value={newDesc}
                    onChange={(e) => setNewDesc(e.target.value)}
                    placeholder="Short description of this 2026 past question pack"
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
                  />
                </div>

                {/* Submit button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={!previewFile}
                    className="w-full bg-purple-600 hover:bg-purple-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3 rounded-xl text-xs sm:text-sm transition-all shadow-md"
                  >
                    Add 2026 Past Question Image
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
