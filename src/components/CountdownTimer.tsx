import React, { useState, useEffect } from 'react';
import { Clock, Flame, AlertCircle, Pause } from 'lucide-react';
import { useCMS } from '../context/CMSContext';

interface CountdownTimerProps {
  daysFromNow?: number;
  deadlineText?: string;
}

export const CountdownTimer: React.FC<CountdownTimerProps> = ({
  deadlineText
}) => {
  const { data } = useCMS();
  const timerConfig = data.timerConfig;
  const labelText = deadlineText || timerConfig?.deadlineText || data.texts?.heroDeadlineText || "Next Entrance Lesson Batch Registration Closes In:";

  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  }>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    if (!timerConfig || !timerConfig.isActive) {
      setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      return;
    }

    const targetTimestamp = timerConfig.targetTimestamp;

    const updateTimer = () => {
      const now = Date.now();
      const difference = targetTimestamp - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        const d = Math.floor(difference / (1000 * 60 * 60 * 24));
        const h = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((difference % (1000 * 60)) / 1000);
        setTimeLeft({ days: d, hours: h, minutes: m, seconds: s });
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [timerConfig]);

  const pad = (num: number) => String(num).padStart(2, '0');

  const isPaused = timerConfig && !timerConfig.isActive;

  return (
    <div id="registration-countdown" className="bg-gradient-to-r from-red-600 via-rose-600 to-amber-600 p-0.5 rounded-2xl shadow-xl mt-6">
      <div className="bg-slate-900 text-white p-5 md:p-6 rounded-[14px]">
        <div className="flex items-center justify-between flex-wrap gap-2 mb-4 border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2 text-amber-400 font-bold text-sm md:text-base">
            <Flame className="w-5 h-5 text-amber-400 animate-pulse" />
            <span>REGISTRATION DEADLINE</span>
          </div>
          <div className="inline-flex items-center gap-1.5 bg-red-500/20 text-red-300 border border-red-500/40 text-xs font-semibold px-2.5 py-1 rounded-full">
            {isPaused ? <Pause className="w-3.5 h-3.5 text-amber-400" /> : <AlertCircle className="w-3.5 h-3.5" />}
            <span>{isPaused ? 'Batch Enrolment Standby' : 'Limited Seats Remaining'}</span>
          </div>
        </div>

        <p className="text-slate-300 text-xs md:text-sm font-medium mb-4 flex items-center gap-2">
          <Clock className="w-4 h-4 text-rose-400 flex-shrink-0" />
          <span>{labelText}</span>
        </p>

        <div className="grid grid-cols-4 gap-2 md:gap-4 text-center">
          <div className="bg-slate-800/90 border border-slate-700/80 rounded-xl p-2 md:p-3">
            <div className="text-2xl md:text-3xl font-extrabold text-white font-mono">{pad(timeLeft.days)}</div>
            <div className="text-[10px] md:text-xs font-semibold text-slate-400 uppercase tracking-wider mt-1">Days</div>
          </div>
          <div className="bg-slate-800/90 border border-slate-700/80 rounded-xl p-2 md:p-3">
            <div className="text-2xl md:text-3xl font-extrabold text-amber-400 font-mono">{pad(timeLeft.hours)}</div>
            <div className="text-[10px] md:text-xs font-semibold text-slate-400 uppercase tracking-wider mt-1">Hours</div>
          </div>
          <div className="bg-slate-800/90 border border-slate-700/80 rounded-xl p-2 md:p-3">
            <div className="text-2xl md:text-3xl font-extrabold text-rose-400 font-mono">{pad(timeLeft.minutes)}</div>
            <div className="text-[10px] md:text-xs font-semibold text-slate-400 uppercase tracking-wider mt-1">Mins</div>
          </div>
          <div className="bg-slate-800/90 border border-slate-700/80 rounded-xl p-2 md:p-3">
            <div className="text-2xl md:text-3xl font-extrabold text-red-500 font-mono">{pad(timeLeft.seconds)}</div>
            <div className="text-[10px] md:text-xs font-semibold text-slate-400 uppercase tracking-wider mt-1">Secs</div>
          </div>
        </div>
      </div>
    </div>
  );
};
