'use client';

import Link from 'next/link';
import { useLang } from '@/lib/i18n-context';
import { DarkHeader } from '@/components/shared/Header';
import { BottomNav } from '@/components/shared/BottomNav';
import { courses } from '@/lib/mock-data';
import { courseIcons } from '@/lib/course-icons';

// ── Status badge ─────────────────────────────────────────────────────────────
function StatusPill({ children, color }: { children: React.ReactNode; color: 'green' | 'amber' | 'red' }) {
  const cls = {
    green: 'bg-green-100 text-green-700',
    amber: 'bg-amber-100 text-amber-700',
    red:   'bg-red-100 text-red-700',
  }[color];
  return (
    <span className={`${cls} text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wide`}>
      {children}
    </span>
  );
}

export default function HomePage() {
  const { t, lang } = useLang();

  const quickActions = [
    { href: '/parent',  icon: <svg className="w-6 h-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>, labelUz: 'OTA-ONA',  labelRu: 'РОДИТЕЛЬ', id: 'qa-parent'  },
    { href: '/admin',   icon: <svg className="w-6 h-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>, labelUz: 'ADMIN',    labelRu: 'АДМИН',    id: 'qa-admin'   },
    { href: '/courses', icon: <svg className="w-6 h-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" /></svg>, labelUz: 'KURSLAR',  labelRu: 'КУРСЫ',    id: 'qa-courses' },
  ];

  return (
    <div className="min-h-screen bg-[#F4F4F6] pb-24">

      {/* ── DARK TOP SECTION ── */}
      <div className="bg-[#111111]">
        <DarkHeader left="menu" />

        <div className="max-w-2xl mx-auto px-4 pt-4 pb-8 animate-fade-in">
          {/* IQRO wordmark */}
          <h1
            className="text-6xl font-semibold text-white tracking-widest mb-1"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            IQRO
          </h1>
          <p className="text-white/60 text-sm mb-6">
            {lang === 'ru' ? 'Знания — ключ к будущему' : "Bilim — kelajaging kaliti"}
          </p>

          {/* Stat pills */}
          <div className="flex gap-3">
            {[
              { value: '120+', labelUz: "O'quvchi", labelRu: 'Учеников' },
              { value: '3',    labelUz: 'Filial',    labelRu: 'Филиала'  },
              { value: '95%',  labelUz: 'IELTS',     labelRu: 'IELTS'    },
            ].map((s, i) => (
              <div key={i} className="flex-1 bg-white/10 rounded-2xl p-3 text-center border border-white/10">
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
        <div className="max-w-2xl mx-auto px-4 pt-6 space-y-6 animate-fade-in">

          {/* ── Quick actions ── */}
          <div>
            <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest px-1 mb-2">
              {lang === 'ru' ? 'БЫСТРЫЕ ДЕЙСТВИЯ' : 'TEZKOR HARAKATLAR'}
            </p>
            <div className="grid grid-cols-3 gap-3">
              {quickActions.map((qa) => (
                <Link
                  key={qa.href}
                  href={qa.href}
                  id={qa.id}
                  className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex flex-col items-center gap-2 hover:border-red-200 hover:shadow-md active:scale-[0.97] transition-all duration-200"
                >
                  <span className="flex items-center justify-center h-8">{qa.icon}</span>
                  <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                    {lang === 'ru' ? qa.labelRu : qa.labelUz}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* ── Course catalog preview ── */}
          <div>
            <div className="flex items-center justify-between px-1 mb-2">
              <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest">
                {lang === 'ru' ? 'КУРСЫ' : 'KURSLAR'}
              </p>
              <Link href="/courses" className="text-[10px] font-bold text-[#C0181B] uppercase tracking-widest">
                {lang === 'ru' ? 'ВСЕ →' : 'BARCHASI →'}
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {courses.map((course) => (
                <Link
                  key={course.id}
                  href={`/courses/${course.id}`}
                  id={`home-course-${course.id}`}
                  className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:border-red-100 hover:shadow-md active:scale-[0.97] transition-all duration-200"
                >
                  {/* Color top accent */}
                  <div className={`${course.colorClass} h-1.5 w-full`} />
                  <div className="p-3">
                    <div className={`w-10 h-10 rounded-full ${course.colorClass} flex items-center justify-center`}>
                      <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                        <path strokeLinecap="round" strokeLinejoin="round" d={courseIcons[course.id]} />
                      </svg>
                    </div>
                    <p className="text-xs font-bold text-[#1C1C2E] mt-2 leading-tight">
                      {lang === 'ru' ? course.nameRu : course.nameUz}
                    </p>
                    <p className="text-[10px] text-gray-400 mt-0.5">{course.teacher}</p>
                    <div className="mt-2">
                      <StatusPill color="green">
                        {lang === 'ru' ? 'MAVJUD' : 'MAVJUD'}
                      </StatusPill>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

        </div>
      </div>

      <BottomNav />
    </div>
  );
}
