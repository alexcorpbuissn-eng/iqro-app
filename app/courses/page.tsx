'use client';

import Link from 'next/link';
import { useLang } from '@/lib/i18n-context';
import { LangToggle } from '@/components/shared/LangToggle';
import { BottomNav } from '@/components/shared/BottomNav';
import { Badge } from '@/components/ui/badge';
import { courses } from '@/lib/mock-data';

export default function CoursesPage() {
  const { t, lang } = useLang();

  return (
    <div className="min-h-screen bg-[#F7F7F9] pb-24">
      {/* ── Header ── */}
      <div className="sticky top-0 z-30 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-2xl mx-auto px-4 h-14 flex items-center justify-between">
          <h1 className="text-lg font-bold text-[#1C1C2E]">{t('courseCatalog')}</h1>
          <LangToggle />
        </div>
      </div>

      <main className="max-w-2xl mx-auto px-4 pt-5 animate-fade-in">
        {/* ── Subtitle ── */}
        <p className="text-sm text-gray-500 mb-5">
          {lang === 'uz' ? `${courses.length} ta kurs mavjud` : `Доступно ${courses.length} курса`}
        </p>

        {/* ── Course cards grid ── */}
        <div className="grid grid-cols-1 gap-4">
          {courses.map((course) => (
            <Link
              key={course.id}
              href={`/courses/${course.id}`}
              id={`course-card-${course.id}`}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:border-red-100 hover:shadow-md active:scale-[0.98] transition-all duration-200"
            >
              <div className="flex items-stretch">
                {/* Left color accent + icon */}
                <div className={`${course.colorClass} w-20 flex-shrink-0 flex flex-col items-center justify-center gap-1 py-5`}>
                  <span className="text-3xl">{course.icon}</span>
                </div>

                {/* Content */}
                <div className="flex-1 p-4">
                  <div className="flex items-start justify-between gap-2">
                    <h2 className="font-bold text-[#1C1C2E] text-base leading-tight">
                      {lang === 'ru' ? course.nameRu : course.nameUz}
                    </h2>
                    <Badge variant="secondary" className="flex-shrink-0 text-xs whitespace-nowrap">
                      {lang === 'ru' ? course.ageRangeRu : course.ageRangeUz}
                    </Badge>
                  </div>

                  <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                    <svg className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    {course.teacher}
                  </p>

                  <div className="flex items-center justify-between mt-3">
                    {/* Price */}
                    <div className="flex items-baseline gap-1">
                      <span className="text-lg font-bold text-[#1C1C2E]">
                        {course.priceUzs.toLocaleString('uz-UZ')}
                      </span>
                      <span className="text-xs text-gray-400">
                        {t('currency')} / {t('courseMonth')}
                      </span>
                    </div>

                    {/* Arrow */}
                    <div className="w-8 h-8 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>

      <BottomNav />
    </div>
  );
}
