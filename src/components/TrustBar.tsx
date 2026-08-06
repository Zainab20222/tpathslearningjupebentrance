import React from 'react';
import { ShieldCheck, UserCheck, Award, FileCheck, CheckCircle2 } from 'lucide-react';
import { siteData } from '../data';

const badgeIconMap: Record<string, React.ReactNode> = {
  'shield-check': <ShieldCheck className="w-5 h-5 text-slate-700 group-hover:text-[#0066cc] transition-colors" />,
  'user-check': <UserCheck className="w-5 h-5 text-slate-700 group-hover:text-[#0066cc] transition-colors" />,
  'award': <Award className="w-5 h-5 text-slate-700 group-hover:text-[#0066cc] transition-colors" />,
  'file-check': <FileCheck className="w-5 h-5 text-slate-700 group-hover:text-[#0066cc] transition-colors" />,
  'check-circle': <CheckCircle2 className="w-5 h-5 text-slate-700 group-hover:text-[#0066cc] transition-colors" />
};

export const TrustBar: React.FC = () => {
  return (
    <section className="bg-slate-100/80 border-y border-slate-200/90 py-6 px-4">
      <div className="max-w-7xl mx-auto">
        <p className="text-center text-[11px] font-bold uppercase tracking-widest text-slate-500 mb-4">
          Trusted Educational Standards • Built for UNILAG Entrance Candidates & Parents
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8">
          {siteData.trustBadges.map((badge, idx) => (
            <div
              key={idx}
              className="flex items-center gap-3 bg-white px-4 py-2.5 rounded-xl border border-slate-200/80 shadow-xs hover:border-blue-200 transition-all group"
            >
              <div className="p-1.5 bg-slate-100 rounded-lg group-hover:bg-blue-50 transition-colors">
                {badgeIconMap[badge.icon]}
              </div>
              <div className="text-left">
                <span className="block text-xs font-bold text-slate-800 tracking-tight">
                  {badge.label}
                </span>
                <span className="block text-[10px] text-slate-500 font-medium">
                  {badge.detail}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
