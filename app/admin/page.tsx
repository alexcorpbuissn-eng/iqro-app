'use client';

import { useState } from 'react';
import { Header } from '@/components/shared/Header';
import { BranchTabs } from '@/components/admin/BranchTabs';
import { StatCard } from '@/components/admin/StatCard';
import { AttendanceChart } from '@/components/admin/AttendanceChart';
import { PaymentsTable } from '@/components/admin/PaymentsTable';
import { branchStats, branches } from '@/lib/mock-data';
import { useLang } from '@/lib/i18n-context';

export default function AdminDashboardPage() {
  const [activeBranch, setActiveBranch] = useState(1);
  const { t } = useLang();

  const stats = branchStats[activeBranch];
  const attendancePct = Math.round((stats.todayPresent / stats.todayTotal) * 100);
  const currentBranch = branches.find(b => b.id === activeBranch);

  return (
    <div className="min-h-screen bg-[#F7F7F9]">
      <Header />

      <main className="max-w-2xl mx-auto px-4 py-6 space-y-4 pb-12 animate-fade-in">
        {/* Page title */}
        <div className="px-1">
          <h1 className="text-xl font-bold text-[#1C1C2E]">{t('adminDashboard')}</h1>
          {currentBranch && (
            <p className="text-xs text-gray-400 mt-0.5">{currentBranch.address}</p>
          )}
        </div>

        {/* Branch tabs */}
        <BranchTabs activeBranch={activeBranch} onBranchChange={setActiveBranch} />

        {/* Stat cards row */}
        <div className="flex gap-3">
          <StatCard
            value={String(stats.totalStudents)}
            label={t('totalStudents')}
            accent="red"
          />
          <StatCard
            value={`${attendancePct}%`}
            label={t('todayAttendance')}
            sublabel={`${stats.todayPresent}/${stats.todayTotal}`}
            accent="green"
            trend={attendancePct >= 80 ? 'up' : 'down'}
          />
          <StatCard
            value={String(stats.overdueCount)}
            label={t('overduePayments')}
            accent="amber"
            trend={stats.overdueCount > 2 ? 'down' : 'neutral'}
          />
        </div>

        {/* Attendance chart */}
        <AttendanceChart branchId={activeBranch} />

        {/* Payments table */}
        <PaymentsTable branchId={activeBranch} />
      </main>
    </div>
  );
}
