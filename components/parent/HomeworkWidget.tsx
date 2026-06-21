'use client';

import { useLang } from '@/lib/i18n-context';
import { homeworkItems } from '@/lib/mock-data';

export function HomeworkWidget() {
  const { t, lang } = useLang();

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-widest">
          {t('homework')}
        </h3>
        <span className="bg-amber-100 text-amber-700 text-xs font-semibold px-2 py-0.5 rounded-full">
          {homeworkItems.length}
        </span>
      </div>

      <div className="space-y-3">
        {homeworkItems.map((item) => (
          <div
            key={item.id}
            className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100"
          >
            {/* Status dot */}
            <div className="mt-0.5 flex-shrink-0">
              <div className="w-3 h-3 rounded-full bg-amber-400 ring-2 ring-amber-200" />
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-[#1C1C2E] leading-snug">
                {lang === 'ru' ? item.titleRu : item.title}
              </p>
              <div className="flex items-center gap-1.5 mt-1.5">
                <svg className="w-3 h-3 text-gray-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className="text-xs text-gray-500">
                  {lang === 'ru' ? item.dueLabelRu : item.dueLabel}
                </span>
              </div>
            </div>

            {/* Pending badge */}
            <span className="flex-shrink-0 text-xs bg-amber-50 text-amber-600 border border-amber-200 px-2 py-0.5 rounded-full font-medium">
              {t('pending')}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
