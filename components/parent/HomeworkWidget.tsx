'use client';

import { useLang } from '@/lib/i18n-context';
import { homeworkItems } from '@/lib/mock-data';

const accentColors = ['bg-[#C0181B]', 'bg-blue-500', 'bg-purple-500'];

export function HomeworkWidget() {
  const { lang } = useLang();

  if (homeworkItems.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 px-4 py-5 text-center">
        <p className="text-sm text-gray-400">
          {lang === 'ru' ? 'Uy vazifasi yo\'q' : "Uy vazifasi yo'q"}
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden divide-y divide-gray-50">
      {homeworkItems.map((item, idx) => {
        const isSoon = new Date(item.dueDate) <= new Date(Date.now() + 2 * 86400000);
        const pillCls = isSoon
          ? 'bg-amber-100 text-amber-700'
          : 'bg-gray-100 text-gray-500';
        const dueText = lang === 'ru' ? item.dueLabelRu : item.dueLabel;

        return (
          <div key={item.id} className="flex items-center gap-0">
            {/* Left color accent bar */}
            <div className={`w-1 self-stretch ${accentColors[idx % accentColors.length]} flex-shrink-0`} />

            <div className="flex-1 flex items-center justify-between px-4 py-3.5 gap-3">
              <div className="min-w-0">
                <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-0.5">
                  {lang === 'ru' ? 'UY VAZIFASI' : 'UY VAZIFASI'}
                </p>
                <p className="text-sm font-semibold text-[#1C1C2E] leading-tight truncate">
                  {lang === 'ru' ? item.titleRu : item.title}
                </p>
              </div>
              <span className={`${pillCls} text-[10px] font-bold px-2.5 py-1 rounded-full whitespace-nowrap flex-shrink-0`}>
                {dueText}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
