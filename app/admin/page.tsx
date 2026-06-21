'use client';

import { useState } from 'react';
import { DarkHeader } from '@/components/shared/Header';
import { BottomNav } from '@/components/shared/BottomNav';
import { AttendanceChart } from '@/components/admin/AttendanceChart';
import { PaymentsTable } from '@/components/admin/PaymentsTable';
import { useLang } from '@/lib/i18n-context';
import { branches, branchStats, weeklyChartData, paymentsTableData } from '@/lib/mock-data';

export default function AdminPage() {
  const { t, lang } = useLang();
  const [activeBranch, setActiveBranch] = useState(1);

  const stats = branchStats[activeBranch];
  const attendancePct = Math.round((stats.todayPresent / stats.todayTotal) * 100);

  return (
    <div className="min-h-screen bg-[#F4F4F6] pb-24">

      {/* ── DARK HERO ── */}
      <div className="bg-[#111111]">
        <DarkHeader left="menu" />

        <div className="max-w-2xl mx-auto px-4 pt-4 pb-8 animate-fade-in">
          <p className="text-white/60 text-sm mb-1">
            {lang === 'ru' ? 'Панель администратора' : 'Admin Panel'}
          </p>
          <h1 className="text-xl font-bold text-white mb-1">
            {branches.find(b => b.id === activeBranch)?.name ?? ''}
          </h1>
          <p className="text-white/40 text-xs mb-6">
            {lang === 'ru' ? 'Обзор показателей' : "Ko'rsatkichlar sharhi"}
          </p>

          {/* 3 stat boxes */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { value: stats.totalStudents, labelUz: "O'QUVCHI", labelRu: 'УЧЕНИКОВ' },
              { value: `${attendancePct}%`, labelUz: 'DAVOMAT',  labelRu: 'ПОСЕЩ.'  },
              { value: stats.overdueCount,  labelUz: 'MUDDATI',  labelRu: 'ПРОСРОЧ.' },
            ].map((s, i) => (
              <div key={i} className="bg-white/10 border border-white/10 rounded-2xl p-3 text-center">
                <p className="text-white text-xl font-bold">{s.value}</p>
                <p className="text-white/50 text-[10px] font-semibold uppercase tracking-wide mt-0.5">
                  {lang === 'ru' ? s.labelRu : s.labelUz}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── WHITE BODY ── */}
      <div className="bg-[#F4F4F6] rounded-t-3xl -mt-4 relative z-10">
        <div className="max-w-2xl mx-auto px-4 pt-6 space-y-5 animate-fade-in">

          {/* Branch pill tabs */}
          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
            {branches.map((branch) => (
              <button
                key={branch.id}
                id={`branch-tab-${branch.id}`}
                onClick={() => setActiveBranch(branch.id)}
                className={`flex-shrink-0 px-4 py-2 rounded-full text-xs font-bold transition-all duration-200 ${
                  activeBranch === branch.id
                    ? 'bg-[#C0181B] text-white shadow-sm shadow-red-200'
                    : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                }`}
              >
                {lang === 'ru'
                  ? `Филиал ${branch.id}`
                  : `Filial ${branch.id}`}
              </button>
            ))}
          </div>

          {/* Attendance chart */}
          <div>
            <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest px-1 mb-2">
              {t('weeklyAttendance')}
            </p>
            <AttendanceChart data={weeklyChartData[activeBranch]} />
          </div>

          {/* Payments table */}
          <div>
            <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest px-1 mb-2">
              {lang === 'ru' ? "TO'LOVLAR" : "TO'LOVLAR"}
            </p>
            <PaymentsTable rows={paymentsTableData[activeBranch]} />
          </div>

        </div>
      </div>

      <BottomNav />
    </div>
  );
}
