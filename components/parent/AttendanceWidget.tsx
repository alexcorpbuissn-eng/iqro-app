'use client';

import { useLang } from '@/lib/i18n-context';
import { weekAttendance, todayAttendanceStatus } from '@/lib/mock-data';

const statusConfig = {
  present: { dot: 'bg-green-400', pill: 'bg-green-100 text-green-700', label: { uz: 'KELDI', ru: 'ПРИШЁЛ' } },
  absent:  { dot: 'bg-red-400',   pill: 'bg-red-100 text-red-700',     label: { uz: 'KELMADI', ru: 'НЕ ПРИШЁЛ' } },
  excused: { dot: 'bg-amber-400', pill: 'bg-amber-100 text-amber-700', label: { uz: "SABABLI", ru: 'УВАЖИТ.' } },
  future:  { dot: 'bg-gray-300',  pill: 'bg-gray-100 text-gray-400',   label: { uz: 'KUTILMOQDA', ru: 'ОЖИДАЕТСЯ' } },
};

export function AttendanceWidget() {
  const { lang } = useLang();
  const today = todayAttendanceStatus;
  const todayCfg = statusConfig[today];

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Day pills row */}
      <div className="flex divide-x divide-gray-50 border-b border-gray-50">
        {weekAttendance.map((day) => {
          const cfg = statusConfig[day.status];
          return (
            <div key={day.day} className="flex-1 flex flex-col items-center py-3 gap-1.5">
              <span className="text-[10px] font-bold text-gray-400 uppercase">
                {lang === 'ru' ? day.dayRu : day.day.slice(0, 2).toUpperCase()}
              </span>
              <div className={`w-2 h-2 rounded-full ${cfg.dot}`} />
            </div>
          );
        })}
      </div>

      {/* Today status */}
      <div className="px-4 py-3.5 flex items-center justify-between">
        <div>
          <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest">
            {lang === 'ru' ? 'СЕГОДНЯ' : 'BUGUN'}
          </p>
          <p className="text-sm font-bold text-[#1C1C2E] mt-0.5">
            {lang === 'ru' ? 'Payshanba' : 'Payshanba'}
          </p>
        </div>
        <span className={`${todayCfg.pill} text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wide`}>
          {todayCfg.label[lang]}
        </span>
      </div>
    </div>
  );
}
