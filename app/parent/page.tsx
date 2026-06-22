'use client';

import { DarkHeader } from '@/components/shared/Header';
import { BottomNav } from '@/components/shared/BottomNav';
import { LangToggle } from '@/components/shared/LangToggle';
import { NotificationBell } from '@/components/shared/NotificationBell';
import { AttendanceWidget } from '@/components/parent/AttendanceWidget';
import { HomeworkWidget } from '@/components/parent/HomeworkWidget';
import { PaymentWidget } from '@/components/parent/PaymentWidget';
import { ScheduleWidget } from '@/components/parent/ScheduleWidget';
import { useLang } from '@/lib/i18n-context';
import { demoStudent, demoParent, demoPayment, todayAttendanceStatus } from '@/lib/mock-data';

export default function ParentPage() {
  const { t, lang } = useLang();

  const todayLabel = todayAttendanceStatus === 'present'
    ? (lang === 'ru' ? 'КЕЛДИ' : 'KELDI')
    : (lang === 'ru' ? 'КЕЛМАДИ' : 'KELMADI');
  const todayColor = todayAttendanceStatus === 'present' ? 'text-green-400' : 'text-red-400';

  return (
    <div className="min-h-screen bg-[#F4F4F6] pb-24">

      {/* ── DARK HERO ── */}
      <div className="bg-[#111111]">
        <DarkHeader
          left="back"
          right={
            <div className="flex items-center gap-2">
              <NotificationBell />
              <LangToggle variant="dark" />
            </div>
          }
        />

        <div className="max-w-2xl mx-auto px-4 pt-4 pb-8 animate-fade-in">
          {/* Greeting */}
          <p className="text-white/60 text-sm mb-1">
            {lang === 'ru' ? 'Добро пожаловать 👋' : "Xush kelibsiz 👋"}
          </p>
          <h1 className="text-xl font-bold text-white mb-1">{demoParent.fullName}</h1>
          <p className="text-white/60 text-xs mb-6">
            {demoStudent.fullName} · {demoStudent.branchShort}
          </p>

          {/* Stat boxes */}
          <div className="grid grid-cols-2 gap-3">
            {/* Today attendance */}
            <div className="bg-white/10 border border-white/10 rounded-2xl p-4">
              <p className="text-white/50 text-[10px] font-semibold uppercase tracking-widest mb-1">
                {lang === 'ru' ? 'СЕГОДНЯ' : 'BUGUN'}
              </p>
              <p className={`text-lg font-bold ${todayColor}`}>{todayLabel}</p>
            </div>

            {/* Payment */}
            <div className="bg-white/10 border border-white/10 rounded-2xl p-4">
              <p className="text-white/50 text-[10px] font-semibold uppercase tracking-widest mb-1">
                {lang === 'ru' ? "TO'LOV" : "TO'LOV"}
              </p>
              <p className="text-white text-lg font-bold">
                {(demoPayment.amountUzs / 1000).toFixed(0)} 000
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── WHITE BODY ── */}
      <div className="bg-[#F4F4F6] rounded-t-3xl -mt-4 relative z-10">
        <div className="max-w-2xl mx-auto px-4 pt-6 space-y-5 animate-fade-in">

          {/* Attendance */}
          <div>
            <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest px-1 mb-2">
              {t('attendance')}
            </p>
            <AttendanceWidget />
          </div>

          {/* Homework */}
          <div>
            <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest px-1 mb-2">
              {lang === 'ru' ? 'UY VAZIFASI' : 'UY VAZIFASI'}
            </p>
            <HomeworkWidget />
          </div>

          {/* Payment */}
          <div>
            <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest px-1 mb-2">
              {lang === 'ru' ? "TO'LOV" : "TO'LOV"}
            </p>
            <PaymentWidget />
          </div>

          {/* Schedule */}
          <div>
            <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest px-1 mb-2">
              {lang === 'ru' ? 'JADVAL' : 'JADVAL'}
            </p>
            <ScheduleWidget />
          </div>

        </div>
      </div>

      <BottomNav />
    </div>
  );
}
