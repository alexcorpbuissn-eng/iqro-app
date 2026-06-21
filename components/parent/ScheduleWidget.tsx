'use client';

import { useLang } from '@/lib/i18n-context';
import { weekSchedule } from '@/lib/mock-data';

export function ScheduleWidget() {
  const { lang } = useLang();

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden divide-y divide-gray-50">
      {weekSchedule.map((item, idx) => (
        <div key={idx} className="flex items-center gap-3 px-4 py-3.5">
          {/* Day badge */}
          <div className="w-9 h-9 bg-[#C0181B]/10 rounded-xl flex items-center justify-center flex-shrink-0">
            <span className="text-[10px] font-bold text-[#C0181B] uppercase">
              {lang === 'ru'
                ? item.dayRu.slice(0, 2).toUpperCase()
                : item.day.slice(0, 2).toUpperCase()}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-[#1C1C2E] truncate">{item.subject}</p>
            <p className="text-[10px] text-gray-400 font-medium">{item.time}</p>
          </div>
          {/* Clock icon */}
          <svg className="w-4 h-4 text-gray-300 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
      ))}
    </div>
  );
}
