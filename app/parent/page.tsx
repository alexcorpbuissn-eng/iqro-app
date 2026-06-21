'use client';

import { Header } from '@/components/shared/Header';
import { StudentCard } from '@/components/parent/StudentCard';
import { AttendanceWidget } from '@/components/parent/AttendanceWidget';
import { HomeworkWidget } from '@/components/parent/HomeworkWidget';
import { PaymentWidget } from '@/components/parent/PaymentWidget';
import { ScheduleWidget } from '@/components/parent/ScheduleWidget';
import { InstallPrompt } from '@/components/shared/InstallPrompt';

export default function ParentPortalPage() {
  return (
    <div className="min-h-screen bg-[#F7F7F9]">
      <Header />

      <main className="max-w-2xl mx-auto px-4 py-6 space-y-4 pb-28 animate-fade-in">
        {/* Greeting */}
        <div className="px-1 mb-2">
          <p className="text-xs text-gray-400 font-medium">Xush kelibsiz 👋</p>
        </div>

        <StudentCard />
        <AttendanceWidget />
        <HomeworkWidget />
        <PaymentWidget />
        <ScheduleWidget />
      </main>

      {/* PWA install banner (Android Chrome) */}
      <InstallPrompt />
    </div>
  );
}
