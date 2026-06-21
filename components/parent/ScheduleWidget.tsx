'use client';

import { useLang } from '@/lib/i18n-context';
import { weekSchedule } from '@/lib/mock-data';

export function ScheduleWidget() {
  const { t, lang } = useLang();

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-widest">
          {t('schedule')}
        </h3>
        <span className="text-xs text-gray-400">{t('thisWeek')}</span>
      </div>

      <div className="space-y-2">
        {weekSchedule.map((item, idx) => (
          <div
            key={idx}
            className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100"
          >
            {/* Day dot */}
            <div className="w-2 h-2 rounded-full bg-[#C0181B] flex-shrink-0" />

            {/* Day name */}
            <span className="text-sm font-semibold text-[#1C1C2E] min-w-[90px]">
              {lang === 'ru' ? item.dayRu : item.day}
            </span>

            {/* Time */}
            <div className="flex items-center gap-1.5 flex-1">
              <svg className="w-3.5 h-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-sm text-gray-600 font-medium">{item.time}</span>
            </div>

            {/* Subject */}
            <span className="text-xs text-[#C0181B] font-semibold bg-red-50 px-2 py-0.5 rounded-full border border-red-100">
              {item.subject}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
