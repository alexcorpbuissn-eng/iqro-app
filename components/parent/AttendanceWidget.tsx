'use client';

import { useLang } from '@/lib/i18n-context';
import { weekAttendance, todayAttendanceStatus, AttendanceStatus } from '@/lib/mock-data';

function statusConfig(status: AttendanceStatus, lang: string) {
  const configs = {
    present: {
      icon: '✅',
      labelUz: 'Keldi',
      labelRu: 'Присутствует',
      bg: 'bg-green-50',
      border: 'border-green-200',
      text: 'text-green-700',
      dot: 'bg-green-500',
    },
    absent: {
      icon: '❌',
      labelUz: 'Kelmadi',
      labelRu: 'Отсутствует',
      bg: 'bg-red-50',
      border: 'border-red-200',
      text: 'text-red-700',
      dot: 'bg-red-500',
    },
    excused: {
      icon: '⚠️',
      labelUz: 'Sababli',
      labelRu: 'Уважительная',
      bg: 'bg-amber-50',
      border: 'border-amber-200',
      text: 'text-amber-700',
      dot: 'bg-amber-500',
    },
    future: {
      icon: '—',
      labelUz: 'Kutilmoqda',
      labelRu: 'Ожидается',
      bg: 'bg-gray-50',
      border: 'border-gray-200',
      text: 'text-gray-400',
      dot: 'bg-gray-300',
    },
  };
  const c = configs[status];
  return { ...c, label: lang === 'ru' ? c.labelRu : c.labelUz };
}

export function AttendanceWidget() {
  const { t, lang } = useLang();
  const today = statusConfig(todayAttendanceStatus, lang);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
      <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">
        {t('attendance')}
      </h3>

      {/* Today's large status */}
      <div className={`rounded-xl border-2 ${today.bg} ${today.border} p-4 flex items-center gap-4 mb-5`}>
        <span className="text-3xl">{today.icon}</span>
        <div>
          <p className="text-xs text-gray-500 font-medium">{t('todayStatus')}</p>
          <p className={`text-xl font-bold ${today.text} mt-0.5`}>{today.label}</p>
        </div>
      </div>

      {/* Week history */}
      <p className="text-xs font-medium text-gray-400 mb-3">{t('weekHistory')}</p>
      <div className="flex gap-2">
        {weekAttendance.map((day) => {
          const cfg = statusConfig(day.status, lang);
          const dayLabel = lang === 'ru'
            ? day.dayRu
            : day.day.slice(0, 4);

          return (
            <div key={day.date} className="flex-1 flex flex-col items-center gap-1.5">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${cfg.bg} border ${cfg.border}`}>
                <span className="text-base leading-none">{cfg.icon}</span>
              </div>
              <span className="text-[10px] font-medium text-gray-500 text-center leading-tight">{dayLabel}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
