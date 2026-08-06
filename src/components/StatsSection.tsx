import React from 'react';
import { motion } from 'motion/react';
import { Users, Award, Calendar, CheckCircle2 } from 'lucide-react';
import { siteData } from '../data';

const iconMap: Record<string, React.ReactNode> = {
  users: <Users className="w-8 h-8 text-[#0066cc]" />,
  award: <Award className="w-8 h-8 text-[#0066cc]" />,
  calendar: <Calendar className="w-8 h-8 text-[#0066cc]" />
};

export const StatsSection: React.FC = () => {
  return (
    <section id="stats-section" className="py-16 bg-gradient-to-b from-white to-slate-50 border-y border-slate-100 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 text-[#0066cc] font-semibold text-xs uppercase tracking-wider mb-3 border border-blue-100">
            <CheckCircle2 className="w-4 h-4 text-[#0066cc]" />
            <span>Proven Track Record</span>
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            OUR SUCCESS IN NUMBERS
          </h2>
          <p className="text-slate-600 mt-2 text-base">
            Empowering Nigerian students to excel in the UNILAG Foundation Entrance Examination year after year.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {siteData.stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              className="bg-white rounded-2xl p-8 border border-slate-200/80 shadow-md hover:shadow-xl transition-all text-center relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50 rounded-bl-full -z-0 group-hover:bg-blue-100 transition-colors"></div>
              
              <div className="relative z-10">
                <div className="w-16 h-16 mx-auto bg-blue-50/80 rounded-2xl flex items-center justify-center mb-5 border border-blue-100 group-hover:scale-110 transition-transform">
                  {iconMap[stat.icon] || <Award className="w-8 h-8 text-[#0066cc]" />}
                </div>

                <div className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-2 font-mono">
                  <span className="bg-gradient-to-r from-[#0066cc] to-blue-800 bg-clip-text text-transparent">
                    {stat.value}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-800 mb-1">
                  {stat.label}
                </h3>

                <p className="text-xs text-slate-500 font-medium">
                  {stat.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
