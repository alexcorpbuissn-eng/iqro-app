'use client';

import Link from 'next/link';
import { useLang } from '@/lib/i18n-context';
import { DarkHeader } from '@/components/shared/Header';
import { BottomNav } from '@/components/shared/BottomNav';
import { courses } from '@/lib/mock-data';

export default function CoursesPage() {
  const { lang } = useLang();

  return (
    <div className="min-h-screen bg-[#F4F4F6] pb-24">

      {/* ── DARK TOP ── */}
      <div className="bg-[#111111]">
        <DarkHeader left="menu" />
        <div className="max-w-2xl mx-auto px-4 pt-2 pb-7 animate-fade-in">
          <p className="text-white/50 text-[10px] font-semibold uppercase tracking-widest mb-1">
            IQRO
          </p>
          <h1 className="text-2xl font-bold text-white">
            {lang === 'ru' ? 'Курсы' : 'Kurslar'}
          </h1>
          <p className="text-white/50 text-sm mt-1">
            {lang === 'ru'
              ? `${courses.length} kursa dostupno`
              : `${courses.length} ta kurs mavjud`}
          </p>
        </div>
      </div>

      {/* ── WHITE BODY ── */}
      <div className="bg-[#F4F4F6] rounded-t-3xl -mt-4 relative z-10">
        <div className="max-w-2xl mx-auto px-4 pt-6 space-y-3 animate-fade-in">

          <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest px-1 mb-2">
            {lang === 'ru' ? 'ВСЕ КУРСЫ' : 'BARCHA KURSLAR'}
          </p>

          {courses.map((course) => {
            const categoryUz = course.nameUz.toUpperCase();
            const categoryRu = course.nameRu.toUpperCase();

            return (
              <Link
                key={course.id}
                href={`/courses/${course.id}`}
                id={`course-card-${course.id}`}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex hover:border-red-100 hover:shadow-md active:scale-[0.98] transition-all duration-200"
              >
                {/* Left color accent bar */}
                <div className={`${course.colorClass} w-1.5 flex-shrink-0`} />

                {/* Content */}
                <div className="flex-1 px-4 py-4 min-w-0">
                  {/* Breadcrumb */}
                  <p className="text-[10px] font-semibold tracking-widest mb-1">
                    <span className="text-gray-400">KURSLAR</span>
                    <span className="text-gray-300 mx-1">›</span>
                    <span className="text-[#C0181B]">
                      {lang === 'ru' ? categoryRu : categoryUz}
                    </span>
                  </p>

                  {/* Title + badge row */}
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <h2 className="font-bold text-[#1C1C2E] text-base leading-tight truncate">
                        {lang === 'ru' ? course.nameRu : course.nameUz}
                      </h2>
                      <p className="text-xs text-gray-400 mt-0.5">{course.teacher}</p>
                    </div>
                    <span className="bg-green-100 text-green-700 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wide flex-shrink-0 whitespace-nowrap">
                      {lang === 'ru' ? 'DOSTUPNO' : 'MAVJUD'}
                    </span>
                  </div>

                  {/* Price + age row */}
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-baseline gap-1">
                      <span className="text-base font-bold text-[#1C1C2E]">
                        {course.priceUzs.toLocaleString('uz-UZ')}
                      </span>
                      <span className="text-[10px] text-gray-400">
                        {lang === 'ru' ? "so'm / oy" : "so'm / oy"}
                      </span>
                    </div>
                    <span className="text-[10px] font-semibold text-gray-400">
                      {lang === 'ru' ? course.ageRangeRu : course.ageRangeUz}
                    </span>
                  </div>
                </div>

                {/* Arrow */}
                <div className="flex items-center pr-4">
                  <svg className="w-4 h-4 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
