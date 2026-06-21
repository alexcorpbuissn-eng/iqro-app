'use client';

import Link from 'next/link';
import { useLang } from '@/lib/i18n-context';
import { LangToggle } from '@/components/shared/LangToggle';
import { BottomNav } from '@/components/shared/BottomNav';
import { courses } from '@/lib/mock-data';

export default function HomePage() {
  const { t } = useLang();

  const stats = [
    { value: '120+', labelUz: "O'quvchilar", labelRu: 'Учеников' },
    { value: '3',    labelUz: 'Filial',      labelRu: 'Филиала'  },
    { value: '95%',  labelUz: 'IELTS natija', labelRu: 'IELTS успех' },
  ];

  return (
    <div className="min-h-screen bg-[#F7F7F9] pb-20">
      {/* ── Top bar ── */}
      <div className="sticky top-0 z-30 bg-[#F7F7F9]/90 backdrop-blur-sm border-b border-transparent">
        <div className="max-w-2xl mx-auto px-4 h-14 flex items-center justify-between">
          <span
            className="text-2xl font-semibold text-[#C0181B] tracking-widest"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            IQRO
          </span>
          <LangToggle />
        </div>
      </div>

      <main className="max-w-2xl mx-auto px-4 space-y-6 pt-4 animate-fade-in">

        {/* ── Hero card ── */}
        <div className="relative rounded-3xl bg-[#C0181B] overflow-hidden px-6 pt-8 pb-10 shadow-lg shadow-red-200">
          {/* Decorative circles */}
          <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full bg-white/5" />
          <div className="absolute -bottom-12 -left-8 w-40 h-40 rounded-full bg-white/5" />

          <div className="relative z-10">
            <p className="text-white/70 text-sm font-medium mb-1">{t('heroTagline')}</p>
            <h1
              className="text-5xl font-semibold text-white tracking-widest mb-3"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              {t('heroTitle')}
            </h1>
            <p className="text-white/80 text-sm leading-relaxed mb-8 max-w-xs">
              {t('heroSub')}
            </p>

            {/* CTA */}
            <Link
              href="/courses"
              id="cta-view-courses"
              className="inline-flex items-center gap-2 bg-white text-[#C0181B] font-bold text-sm px-6 py-3 rounded-2xl shadow-sm hover:bg-gray-50 active:scale-[0.97] transition-all duration-200"
            >
              {t('viewCourses')}
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>

        {/* ── Stats row ── */}
        <div className="grid grid-cols-3 gap-3">
          {stats.map((s, i) => (
            <div key={i} className="bg-white rounded-2xl p-4 text-center shadow-sm border border-gray-100">
              <p className="text-2xl font-bold text-[#1C1C2E]">{s.value}</p>
              <p className="text-xs text-gray-500 mt-1 leading-tight">
                {/* useLang not directly available here — render both and hide */}
                <UseLangLabel uz={s.labelUz} ru={s.labelRu} />
              </p>
            </div>
          ))}
        </div>

        {/* ── Course preview ── */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-base font-bold text-[#1C1C2E]">{t('courseCatalog')}</h2>
            <Link href="/courses" className="text-xs font-semibold text-[#C0181B]">
              {t('viewCourses')} →
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {courses.map((course) => (
              <Link
                key={course.id}
                href={`/courses/${course.id}`}
                id={`home-course-${course.id}`}
                className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 hover:border-red-200 active:scale-[0.97] transition-all duration-200 flex flex-col gap-2"
              >
                <div className={`w-10 h-10 ${course.colorClass} rounded-xl flex items-center justify-center text-xl`}>
                  {course.icon}
                </div>
                <p className="font-bold text-sm text-[#1C1C2E] leading-tight mt-1">
                  <CourseName course={course} />
                </p>
                <p className="text-xs text-gray-400">{course.teacher}</p>
              </Link>
            ))}
          </div>
        </div>

        {/* ── Bottom padding for nav ── */}
      </main>

      <BottomNav />
    </div>
  );
}

// ── Small helpers that read lang context inline ────────────────────────────────
function UseLangLabel({ uz, ru }: { uz: string; ru: string }) {
  const { lang } = useLang();
  return <>{lang === 'ru' ? ru : uz}</>;
}

function CourseName({ course }: { course: (typeof courses)[0] }) {
  const { lang } = useLang();
  return <>{lang === 'ru' ? course.nameRu : course.nameUz}</>;
}
