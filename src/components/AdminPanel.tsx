import React, { useState, useRef } from 'react';
import { 
  Settings, 
  X, 
  Image as ImageIcon, 
  Lock, 
  LogOut, 
  Upload, 
  Plus, 
  Trash2, 
  Edit3, 
  Check, 
  FileText, 
  MessageSquare, 
  BookOpen, 
  DollarSign, 
  RotateCcw,
  ShieldCheck,
  Eye,
  Clock,
  Play,
  Pause,
  RefreshCw,
  Calendar
} from 'lucide-react';
import { useCMS, TestimonialItem, PastQuestionItem } from '../context/CMSContext';

export const AdminPanel: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'images' | 'text' | 'timer' | 'testimonials' | 'pastQuestions'>('images');
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState('');

  const {
    data,
    isAuthenticated,
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
    resetToDefaults
  } = useCMS();

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(passwordInput)) {
      setAuthError('');
      setPasswordInput('');
    } else {
      setAuthError('Incorrect Password. Access Denied.');
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 left-4 z-50 bg-slate-900 text-white p-3.5 rounded-full shadow-2xl hover:bg-slate-800 transition-all transform hover:scale-110 flex items-center justify-center border border-slate-700 cursor-pointer group"
        aria-label="Open Admin Dashboard"
        title="Admin Settings"
      >
        <Settings className="w-5 h-5 text-purple-400 group-hover:rotate-90 transition-transform duration-300" />
      </button>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-4xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh] text-slate-100">
        
        {/* Dashboard Top Navigation */}
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950">
          <div className="flex items-center gap-3">
            <div className="bg-purple-600/20 p-2 rounded-xl border border-purple-500/30">
              <Settings className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <h2 className="font-extrabold text-base sm:text-lg text-white flex items-center gap-2">
                TPATHS Admin Dashboard
                <span className="text-[10px] font-bold bg-purple-500/20 text-purple-300 px-2.5 py-0.5 rounded-full border border-purple-500/30">
                  Netlify Static CMS
                </span>
              </h2>
              <p className="text-xs text-slate-400">Live Landing Page Control Center</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isAuthenticated && (
              <button
                onClick={() => {
                  logout();
                }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-xl text-xs font-bold border border-red-500/20 transition-colors"
                title="Log Out"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            )}
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-colors"
              title="Close Admin Panel"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        {!isAuthenticated ? (
          /* Password Protection Gate */
          <div className="p-8 sm:p-12 flex flex-col items-center justify-center text-center max-w-md mx-auto my-auto">
            <div className="w-16 h-16 bg-purple-500/10 text-purple-400 rounded-2xl flex items-center justify-center mb-6 border border-purple-500/20 shadow-inner">
              <Lock className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-extrabold text-white mb-2">Admin Security Clearance</h3>
            <p className="text-xs text-slate-400 mb-6 leading-relaxed">
              Enter admin password to access controls for images, text content, testimonials, and past questions.
            </p>

            <form onSubmit={handleLoginSubmit} className="w-full space-y-4">
              <div>
                <input
                  type="password"
                  value={passwordInput}
                  onChange={(e) => {
                    setPasswordInput(e.target.value);
                    setAuthError('');
                  }}
                  placeholder="Enter Admin Password"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 text-center font-mono tracking-widest"
                  autoFocus
                />
                {authError && (
                  <p className="text-red-400 text-xs font-semibold mt-2 animate-bounce">
                    {authError}
                  </p>
                )}
              </div>
              <button
                type="submit"
                className="w-full bg-purple-600 hover:bg-purple-500 text-white font-bold py-3 rounded-xl text-sm transition-all shadow-lg shadow-purple-900/30"
              >
                Unlock Admin Dashboard
              </button>
            </form>
          </div>
        ) : (
          /* Main Authenticated CMS Interface */
          <div className="flex-1 overflow-hidden flex flex-col sm:flex-row">
            
            {/* Sidebar Navigation Tabs */}
            <div className="w-full sm:w-56 bg-slate-950 p-3 border-b sm:border-b-0 sm:border-r border-slate-800 flex sm:flex-col gap-1.5 overflow-x-auto sm:overflow-x-visible">
              <button
                onClick={() => setActiveTab('images')}
                className={`flex items-center gap-2.5 px-4 py-3 rounded-xl text-xs font-bold transition-all text-left whitespace-nowrap flex-shrink-0 ${
                  activeTab === 'images'
                    ? 'bg-purple-600 text-white shadow-lg shadow-purple-900/30'
                    : 'text-slate-400 hover:text-white hover:bg-slate-900'
                }`}
              >
                <ImageIcon className="w-4 h-4" />
                <span>Images (All Sections)</span>
              </button>

              <button
                onClick={() => setActiveTab('text')}
                className={`flex items-center gap-2.5 px-4 py-3 rounded-xl text-xs font-bold transition-all text-left whitespace-nowrap flex-shrink-0 ${
                  activeTab === 'text'
                    ? 'bg-purple-600 text-white shadow-lg shadow-purple-900/30'
                    : 'text-slate-400 hover:text-white hover:bg-slate-900'
                }`}
              >
                <FileText className="w-4 h-4" />
                <span>Text Content</span>
              </button>

              <button
                onClick={() => setActiveTab('timer')}
                className={`flex items-center gap-2.5 px-4 py-3 rounded-xl text-xs font-bold transition-all text-left whitespace-nowrap flex-shrink-0 ${
                  activeTab === 'timer'
                    ? 'bg-purple-600 text-white shadow-lg shadow-purple-900/30'
                    : 'text-slate-400 hover:text-white hover:bg-slate-900'
                }`}
              >
                <Clock className="w-4 h-4" />
                <span>Timer Control</span>
              </button>

              <button
                onClick={() => setActiveTab('testimonials')}
                className={`flex items-center gap-2.5 px-4 py-3 rounded-xl text-xs font-bold transition-all text-left whitespace-nowrap flex-shrink-0 ${
                  activeTab === 'testimonials'
                    ? 'bg-purple-600 text-white shadow-lg shadow-purple-900/30'
                    : 'text-slate-400 hover:text-white hover:bg-slate-900'
                }`}
              >
                <MessageSquare className="w-4 h-4" />
                <span>Testimonials ({data.testimonials.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('pastQuestions')}
                className={`flex items-center gap-2.5 px-4 py-3 rounded-xl text-xs font-bold transition-all text-left whitespace-nowrap flex-shrink-0 ${
                  activeTab === 'pastQuestions'
                    ? 'bg-purple-600 text-white shadow-lg shadow-purple-900/30'
                    : 'text-slate-400 hover:text-white hover:bg-slate-900'
                }`}
              >
                <BookOpen className="w-4 h-4" />
                <span>Past Questions 2026 ({data.pastQuestions.length})</span>
              </button>

              <div className="mt-auto pt-4 hidden sm:block border-t border-slate-800">
                <button
                  onClick={() => {
                    if (window.confirm("Are you sure you want to reset all site content back to default values?")) {
                      resetToDefaults();
                    }
                  }}
                  className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-slate-900 hover:bg-red-900/30 text-slate-400 hover:text-red-300 rounded-xl text-[11px] font-bold border border-slate-800 transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset Defaults</span>
                </button>
              </div>
            </div>

            {/* Main Panel Content Area */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-slate-900 space-y-6">
              
              {/* TAB 1: IMAGES */}
              {activeTab === 'images' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-bold text-white mb-1">Landing Page Image Management</h3>
                    <p className="text-xs text-slate-400">
                      Upload local image files or paste direct URLs to update images across all main page sections instantly.
                    </p>
                  </div>

                  <div className="grid gap-6">
                    <ImageFieldControl
                      label="Hero Section Main Student Image"
                      value={data.images.heroImage}
                      onChange={(url) => updateImage('heroImage', url)}
                    />

                    <ImageFieldControl
                      label="About Section Learning Image"
                      value={data.images.aboutImage}
                      onChange={(url) => updateImage('aboutImage', url)}
                    />

                    <ImageFieldControl
                      label="Programme / Success Celebration Image"
                      value={data.images.successImage}
                      onChange={(url) => updateImage('successImage', url)}
                    />

                    <div className="border-t border-slate-800 pt-4">
                      <h4 className="text-xs font-bold text-purple-400 uppercase tracking-wider mb-4">
                        Gallery Visual Section Images
                      </h4>
                      <div className="grid sm:grid-cols-3 gap-4">
                        <ImageFieldControl
                          label="Gallery: Café Learning"
                          value={data.images.galleryCafeImage}
                          onChange={(url) => updateImage('galleryCafeImage', url)}
                          compact
                        />
                        <ImageFieldControl
                          label="Gallery: Park Learning"
                          value={data.images.galleryParkImage}
                          onChange={(url) => updateImage('galleryParkImage', url)}
                          compact
                        />
                        <ImageFieldControl
                          label="Gallery: Tutor Teaching"
                          value={data.images.galleryTutorImage}
                          onChange={(url) => updateImage('galleryTutorImage', url)}
                          compact
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: TEXT CONTENT */}
              {activeTab === 'text' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-bold text-white mb-1">Headline & Text Content Control</h3>
                    <p className="text-xs text-slate-400">
                      Edit promotional headlines, pricing parameters, and section descriptions.
                    </p>
                  </div>

                  <div className="space-y-5 bg-slate-950 p-5 rounded-2xl border border-slate-800">
                    <h4 className="text-xs font-bold text-purple-400 uppercase tracking-wider flex items-center gap-1.5">
                      <FileText className="w-3.5 h-3.5" /> Hero Section Content
                    </h4>

                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">Hero Badge / Price Banner</label>
                      <input
                        type="text"
                        value={data.texts.heroHighlight}
                        onChange={(e) => updateText('heroHighlight', e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-purple-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">Main Headline</label>
                      <textarea
                        rows={2}
                        value={data.texts.heroHeadline}
                        onChange={(e) => updateText('heroHeadline', e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-purple-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">Subheadline Paragraph</label>
                      <textarea
                        rows={3}
                        value={data.texts.heroSubheadline}
                        onChange={(e) => updateText('heroSubheadline', e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-purple-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">Countdown Timer Label Text</label>
                      <input
                        type="text"
                        value={data.texts.heroDeadlineText}
                        onChange={(e) => updateText('heroDeadlineText', e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-purple-500"
                      />
                    </div>
                  </div>

                  <div className="space-y-5 bg-slate-950 p-5 rounded-2xl border border-slate-800">
                    <h4 className="text-xs font-bold text-purple-400 uppercase tracking-wider flex items-center gap-1.5">
                      <FileText className="w-3.5 h-3.5" /> About Section
                    </h4>

                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">About Text Paragraph</label>
                      <textarea
                        rows={3}
                        value={data.texts.aboutText}
                        onChange={(e) => updateText('aboutText', e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-purple-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">Featured Quote</label>
                      <textarea
                        rows={2}
                        value={data.texts.aboutQuote}
                        onChange={(e) => updateText('aboutQuote', e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-purple-500"
                      />
                    </div>
                  </div>

                  <div className="space-y-5 bg-slate-950 p-5 rounded-2xl border border-slate-800">
                    <h4 className="text-xs font-bold text-purple-400 uppercase tracking-wider flex items-center gap-1.5">
                      <DollarSign className="w-3.5 h-3.5" /> Pricing & Registration CTA Section
                    </h4>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-300 mb-1">Programme Fee / Price Display</label>
                        <input
                          type="text"
                          value={data.texts.pricingPrice}
                          onChange={(e) => updateText('pricingPrice', e.target.value)}
                          className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-purple-500 font-bold"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-300 mb-1">Pricing Title</label>
                        <input
                          type="text"
                          value={data.texts.pricingTitle}
                          onChange={(e) => updateText('pricingTitle', e.target.value)}
                          className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-purple-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">Pricing CTA Button Text</label>
                      <input
                        type="text"
                        value={data.texts.pricingCtaText}
                        onChange={(e) => updateText('pricingCtaText', e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-purple-500"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: TIMER CONTROL */}
              {activeTab === 'timer' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-bold text-white mb-1">Registration Countdown Timer Control</h3>
                    <p className="text-xs text-slate-400">
                      Manage batch registration countdown deadline, pause/resume state, and custom end dates across all devices in real-time.
                    </p>
                  </div>

                  {/* Status Card */}
                  <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className={`w-3 h-3 rounded-full ${data.timerConfig.isActive ? 'bg-green-500 animate-pulse' : 'bg-amber-500'}`} />
                        <span className="text-xs font-bold text-white">
                          Status: {data.timerConfig.isActive ? 'Active & Counting Down' : 'Paused / Standby'}
                        </span>
                      </div>

                      <button
                        onClick={() => updateTimerConfig({ isActive: !data.timerConfig.isActive })}
                        className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer ${
                          data.timerConfig.isActive
                            ? 'bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/30'
                            : 'bg-green-500/20 hover:bg-green-500/30 text-green-300 border border-green-500/30'
                        }`}
                      >
                        {data.timerConfig.isActive ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                        <span>{data.timerConfig.isActive ? 'Pause Timer' : 'Resume Timer'}</span>
                      </button>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-3 pt-2">
                      <div className="bg-slate-900 p-3.5 rounded-xl border border-slate-800">
                        <span className="text-[11px] font-semibold text-slate-400 block mb-1">Current Target Timestamp</span>
                        <span className="text-xs font-mono font-bold text-purple-400">
                          {new Date(data.timerConfig.targetTimestamp).toLocaleString('en-NG', { dateStyle: 'full', timeStyle: 'short' })}
                        </span>
                      </div>
                      <div className="bg-slate-900 p-3.5 rounded-xl border border-slate-800">
                        <span className="text-[11px] font-semibold text-slate-400 block mb-1">Remaining Time</span>
                        <span className="text-xs font-mono font-bold text-emerald-400">
                          {Math.max(0, Math.ceil((data.timerConfig.targetTimestamp - Date.now()) / (1000 * 60 * 60 * 24)))} Days Left
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Quick Reset Options */}
                  <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4">
                    <h4 className="text-xs font-bold text-purple-400 uppercase tracking-wider flex items-center gap-1.5">
                      <RefreshCw className="w-3.5 h-3.5" /> Quick Duration Presets
                    </h4>
                    <div className="grid grid-cols-3 gap-3">
                      <button
                        onClick={() => updateTimerConfig({ targetTimestamp: Date.now() + 3 * 86400000, daysFromNow: 3, isActive: true })}
                        className="bg-slate-900 hover:bg-purple-900/30 border border-slate-800 hover:border-purple-500/40 p-3 rounded-xl text-xs font-bold text-white text-center transition-colors cursor-pointer"
                      >
                        Set +3 Days
                      </button>
                      <button
                        onClick={() => updateTimerConfig({ targetTimestamp: Date.now() + 5 * 86400000, daysFromNow: 5, isActive: true })}
                        className="bg-slate-900 hover:bg-purple-900/30 border border-slate-800 hover:border-purple-500/40 p-3 rounded-xl text-xs font-bold text-white text-center transition-colors cursor-pointer"
                      >
                        Set +5 Days
                      </button>
                      <button
                        onClick={() => updateTimerConfig({ targetTimestamp: Date.now() + 7 * 86400000, daysFromNow: 7, isActive: true })}
                        className="bg-slate-900 hover:bg-purple-900/30 border border-slate-800 hover:border-purple-500/40 p-3 rounded-xl text-xs font-bold text-white text-center transition-colors cursor-pointer"
                      >
                        Set +7 Days
                      </button>
                    </div>
                  </div>

                  {/* Custom Target Date Picker & Deadline Headline */}
                  <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4">
                    <h4 className="text-xs font-bold text-purple-400 uppercase tracking-wider flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" /> Custom Target Date & Headline
                    </h4>

                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">Specific End Date & Time</label>
                      <input
                        type="datetime-local"
                        value={new Date(data.timerConfig.targetTimestamp - (new Date().getTimezoneOffset() * 60000)).toISOString().slice(0, 16)}
                        onChange={(e) => {
                          const val = e.target.value;
                          if (val) {
                            const newTs = new Date(val).getTime();
                            if (!isNaN(newTs)) {
                              updateTimerConfig({ targetTimestamp: newTs, isActive: true });
                            }
                          }
                        }}
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-purple-500 font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">Timer Headline Label</label>
                      <input
                        type="text"
                        value={data.timerConfig.deadlineText || data.texts.heroDeadlineText}
                        onChange={(e) => {
                          updateTimerConfig({ deadlineText: e.target.value });
                          updateText('heroDeadlineText', e.target.value);
                        }}
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-purple-500"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 4: TESTIMONIALS */}
              {activeTab === 'testimonials' && (
                <TestimonialsManager
                  testimonials={data.testimonials}
                  onAdd={addTestimonial}
                  onUpdate={updateTestimonial}
                  onDelete={deleteTestimonial}
                />
              )}

              {/* TAB 4: PAST QUESTIONS 2026 */}
              {activeTab === 'pastQuestions' && (
                <PastQuestionsManager
                  items={data.pastQuestions}
                  onAdd={addPastQuestion}
                  onUpdate={updatePastQuestion}
                  onDelete={deletePastQuestion}
                />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

/* --- SUBCOMPONENTS FOR INPUTS & MANAGERS --- */

const ImageFieldControl: React.FC<{
  label: string;
  value: string;
  onChange: (url: string) => void;
  compact?: boolean;
}> = ({ label, value, onChange, compact }) => {
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (evt) => {
        if (evt.target?.result) {
          onChange(evt.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-2 bg-slate-950 p-4 rounded-2xl border border-slate-800">
      <label className="block text-xs font-bold text-slate-200">{label}</label>
      
      <div className="flex gap-2">
        <div className="relative flex-1">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">
            <ImageIcon className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Paste image URL here..."
            className="w-full pl-9 pr-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-purple-500"
          />
        </div>

        <input
          type="file"
          ref={fileRef}
          onChange={handleFileChange}
          accept="image/*"
          className="hidden"
        />

        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          className="bg-purple-600/20 hover:bg-purple-600/30 text-purple-300 border border-purple-500/30 px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors flex-shrink-0"
          title="Upload image file from device"
        >
          <Upload className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Upload</span>
        </button>
      </div>

      {value && (
        <div className={`mt-2 rounded-xl overflow-hidden border border-slate-800 bg-slate-950 flex items-center justify-center ${compact ? 'h-24' : 'h-36'}`}>
          <img
            src={value}
            alt="Preview"
            className="max-h-full max-w-full object-contain"
            onError={(e) => (e.currentTarget.style.display = 'none')}
            onLoad={(e) => (e.currentTarget.style.display = 'block')}
          />
        </div>
      )}
    </div>
  );
};

/* TESTIMONIALS MANAGER */
const TestimonialsManager: React.FC<{
  testimonials: TestimonialItem[];
  onAdd: (item: Omit<TestimonialItem, 'id'>) => void;
  onUpdate: (id: string | number, item: Partial<TestimonialItem>) => void;
  onDelete: (id: string | number) => void;
}> = ({ testimonials, onAdd, onUpdate, onDelete }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | number | null>(null);

  const [name, setName] = useState('');
  const [programme, setProgramme] = useState('UNILAG Foundation Programme');
  const [message, setMessage] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !message) return;
    onAdd({
      name,
      programme,
      message,
      image: imageUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200'
    });
    setName('');
    setMessage('');
    setImageUrl('');
    setIsAdding(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-white">Student Testimonials Management</h3>
          <p className="text-xs text-slate-400">Add, edit, or remove student success stories.</p>
        </div>
        <button
          onClick={() => setIsAdding(!isAdding)}
          className="bg-purple-600 hover:bg-purple-500 text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors shadow-md"
        >
          {isAdding ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
          <span>{isAdding ? 'Cancel' : 'Add Testimonial'}</span>
        </button>
      </div>

      {isAdding && (
        <form onSubmit={handleAddSubmit} className="bg-slate-950 p-5 rounded-2xl border border-purple-500/40 space-y-4">
          <h4 className="text-xs font-bold text-purple-300 uppercase tracking-wider">New Student Testimonial</h4>
          
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Student Name *</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g., Tunde A."
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Programme Name</label>
              <input
                type="text"
                value={programme}
                onChange={(e) => setProgramme(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1">Student Avatar Image URL</label>
            <input
              type="text"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://..."
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1">Testimonial Review *</label>
            <textarea
              required
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Write student feedback..."
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-500 text-white font-bold py-2.5 rounded-xl text-xs transition-colors"
          >
            Save Testimonial
          </button>
        </form>
      )}

      <div className="grid gap-4">
        {testimonials.map((test) => (
          <div key={test.id} className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex items-start justify-between gap-4">
            <div className="flex gap-3 flex-1">
              <img src={test.image} alt={test.name} className="w-12 h-12 rounded-full object-cover border border-slate-700 flex-shrink-0" />
              <div className="space-y-1 flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-white text-sm">{test.name}</span>
                  <span className="text-[10px] font-bold text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded-full border border-purple-500/20">
                    {test.programme}
                  </span>
                </div>
                <p className="text-xs text-slate-300 italic">"{test.message}"</p>
              </div>
            </div>

            <button
              onClick={() => {
                if (window.confirm(`Delete testimonial from ${test.name}?`)) {
                  onDelete(test.id);
                }
              }}
              className="text-slate-500 hover:text-red-400 p-2 rounded-xl transition-colors"
              title="Delete Testimonial"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

/* PAST QUESTIONS 2026 MANAGER */
const PastQuestionsManager: React.FC<{
  items: PastQuestionItem[];
  onAdd: (item: Omit<PastQuestionItem, 'id'>) => void;
  onUpdate: (id: string, item: Partial<PastQuestionItem>) => void;
  onDelete: (id: string) => void;
}> = ({ items, onAdd, onUpdate, onDelete }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('UNILAG Past Questions 2026');
  const [badge, setBadge] = useState('Verified 2026');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (evt) => {
        if (evt.target?.result) {
          setImageUrl(evt.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !imageUrl) return;

    onAdd({
      title,
      category,
      badge,
      description: description || 'Complete UNILAG Foundation entrance past question drill set.',
      image: imageUrl,
    });

    setTitle('');
    setDescription('');
    setImageUrl('');
    setIsAdding(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            UNILAG Foundation Past Questions 2026 Manager
            <ShieldCheck className="w-4 h-4 text-green-400" />
          </h3>
          <p className="text-xs text-slate-400">
            Admin-controlled database for 2026 past question booklets, science/arts compilations, and worked solutions.
          </p>
        </div>
        <button
          onClick={() => setIsAdding(!isAdding)}
          className="bg-purple-600 hover:bg-purple-500 text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors shadow-md"
        >
          {isAdding ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
          <span>{isAdding ? 'Cancel' : 'Upload 2026 Question'}</span>
        </button>
      </div>

      {isAdding && (
        <form onSubmit={handleAddSubmit} className="bg-slate-950 p-5 rounded-2xl border border-purple-500/40 space-y-4">
          <h4 className="text-xs font-bold text-purple-300 uppercase tracking-wider">
            Upload New 2026 Past Question Booklet / Cover
          </h4>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Booklet Title *</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., UNILAG Foundation Past Questions 2026"
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Category</label>
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="e.g., Science Compilation 2026"
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-300">Booklet Cover Image *</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="Paste image URL..."
                className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
              />
              <input
                type="file"
                ref={fileRef}
                onChange={handleFileUpload}
                accept="image/*"
                className="hidden"
              />
              <button
                type="button"
                onClick={() => fileRef.current?.click()}
                className="bg-purple-600/20 hover:bg-purple-600/30 text-purple-300 border border-purple-500/30 px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1"
              >
                <Upload className="w-3.5 h-3.5" />
                <span>Upload</span>
              </button>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1">Description</label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Short detail regarding subjects covered, CBT drills, and solutions..."
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
            />
          </div>

          <button
            type="submit"
            disabled={!imageUrl || !title}
            className="w-full bg-purple-600 hover:bg-purple-500 disabled:opacity-50 text-white font-bold py-2.5 rounded-xl text-xs transition-colors"
          >
            Add 2026 Past Question Item
          </button>
        </form>
      )}

      <div className="grid sm:grid-cols-2 gap-4">
        {items.map((item) => (
          <div key={item.id} className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex gap-3">
            <img src={item.image} alt={item.title} className="w-20 h-24 object-cover rounded-xl border border-slate-800 bg-slate-900 flex-shrink-0" />
            <div className="flex-1 space-y-1 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded-full border border-purple-500/20 block w-fit mb-1">
                  {item.category || '2026 Past Question'}
                </span>
                <h4 className="font-bold text-white text-xs leading-snug">{item.title}</h4>
                <p className="text-[11px] text-slate-400 line-clamp-2 mt-1">{item.description}</p>
              </div>

              <div className="flex justify-end pt-1">
                <button
                  onClick={() => {
                    if (window.confirm(`Delete past question "${item.title}"?`)) {
                      onDelete(item.id);
                    }
                  }}
                  className="text-slate-500 hover:text-red-400 p-1.5 rounded-lg transition-colors"
                  title="Delete Item"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
