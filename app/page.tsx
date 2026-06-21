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

          {/* ── Role selector card ── */}
          <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100">
            <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-3">
              {lang === 'ru' ? 'КТО ВЫ?' : 'SIZ KIMSIZ?'}
            </p>
            
            <div className="grid grid-cols-2 gap-3">
              {/* Parent role */}
              <Link href="/parent" className="flex flex-col items-center gap-2 bg-[#F7F7F9] rounded-2xl p-4 border-2 border-transparent hover:border-[#C0181B] active:scale-[0.97] transition-all">
                <div className="w-12 h-12 rounded-full bg-[#C0181B]/10 flex items-center justify-center">
                  <svg className="w-6 h-6 text-[#C0181B]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <p className="text-xs font-bold text-[#1C1C2E] text-center leading-tight">
                  {lang === 'ru' ? 'Я родитель' : 'Men ota-onayman'}
                </p>
                <p className="text-[10px] text-gray-400 text-center leading-tight">
                  {lang === 'ru' ? 'Слежу за ребёнком' : 'Farzandimni kuzataman'}
                </p>
              </Link>

              {/* Student role */}
              <Link href="/parent" className="flex flex-col items-center gap-2 bg-[#F7F7F9] rounded-2xl p-4 border-2 border-transparent hover:border-[#C0181B] active:scale-[0.97] transition-all">
                <div className="w-12 h-12 rounded-full bg-[#C0181B]/10 flex items-center justify-center">
                  <svg className="w-6 h-6 text-[#C0181B]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0112 20.055a11.952 11.952 0 01-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                  </svg>
                </div>
                <p className="text-xs font-bold text-[#1C1C2E] text-center leading-tight">
                  {lang === 'ru' ? 'Я ученик' : "Men o'quvchiman"}
                </p>
                <p className="text-[10px] text-gray-400 text-center leading-tight">
                  {lang === 'ru' ? 'Мой личный кабинет' : 'Mening kabinetim'}
                </p>
              </Link>
            </div>

            {/* Admin link — small, below the two main roles */}
            <Link href="/admin" className="mt-3 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gray-50 border border-gray-100 hover:bg-gray-100 transition-colors">
              <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              <span className="text-xs font-semibold text-gray-400">
                {lang === 'ru' ? 'Панель администратора' : 'Admin Panel'}
              </span>
            </Link>
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
