'use client';

import { use, useState } from 'react';
import { notFound } from 'next/navigation';
import { useLang } from '@/lib/i18n-context';
import { DarkHeader } from '@/components/shared/Header';
import { BottomNav } from '@/components/shared/BottomNav';
import { courses } from '@/lib/mock-data';

export default function CourseDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { t, lang } = useLang();
  const [enrolled, setEnrolled] = useState(false);

  const course = courses.find((c) => c.id === id);
  if (!course) notFound();

  const completedCount = course.lessons.filter((l) => l.status === 'completed').length;
  const progressPct = Math.round((completedCount / course.lessons.length) * 100);

  return (
    <div className="min-h-screen bg-[#F4F4F6] pb-24">

      {/* ── DARK TOP ── */}
      <div className="bg-[#111111]">
        <DarkHeader left="back" />

        <div className="max-w-2xl mx-auto px-4 pt-2 pb-8 animate-fade-in">
          {/* Breadcrumb */}
          <p className="text-[10px] font-semibold tracking-widest mb-3">
            <span className="text-white/40">KURSLAR</span>
            <span className="text-white/25 mx-1">›</span>
            <span className="text-[#C0181B]">
              {lang === 'ru' ? course.nameRu.toUpperCase() : course.nameUz.toUpperCase()}
            </span>
          </p>

          {/* Icon + title */}
          <div className="flex items-center gap-4">
            <div className={`w-14 h-14 ${course.colorClass} rounded-2xl flex items-center justify-center text-3xl flex-shrink-0`}>
              {course.icon}
            </div>
            <div>
              <h1 className="text-xl font-bold text-white leading-tight">
                {lang === 'ru' ? course.nameRu : course.nameUz}
              </h1>
              <p className="text-white/50 text-sm mt-0.5">{course.teacher}</p>
            </div>
          </div>

          {/* 3 quick stats */}
          <div className="grid grid-cols-3 gap-3 mt-6">
            {[
              {
                icon: '👤',
                labelUz: 'YOSH',
                labelRu: 'ВОЗРАСТ',
                value: lang === 'ru' ? course.ageRangeRu : course.ageRangeUz,
              },
              {
                icon: '📅',
                labelUz: 'JADVAL',
                labelRu: 'РАСПИСАНИЕ',
                value: lang === 'ru' ? course.scheduleRu : course.scheduleUz,
              },
              {
                icon: '💳',
                labelUz: "TO'LOV",
                labelRu: 'ОПЛАТА',
                value: `${(course.priceUzs / 1000).toFixed(0)} 000`,
              },
            ].map((item, i) => (
              <div key={i} className="bg-white/10 border border-white/10 rounded-2xl p-3 text-center">
                <p className="text-white/50 text-[10px] font-semibold uppercase tracking-widest mb-1">
                  {lang === 'ru' ? item.labelRu : item.labelUz}
                </p>
                <p className="text-white text-xs font-bold leading-tight">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── WHITE BODY ── */}
      <div className="bg-[#F4F4F6] rounded-t-3xl -mt-4 relative z-10">
        <div className="max-w-2xl mx-auto px-4 pt-6 space-y-4 animate-fade-in">

          {/* Description */}
          <div>
            <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest px-1 mb-2">
              {lang === 'ru' ? 'O\'KURS HAQIDA' : "KURS HAQIDA"}
            </p>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 px-5 py-4">
              <p className="text-sm text-gray-600 leading-relaxed">
                {lang === 'ru' ? course.descriptionRu : course.descriptionUz}
              </p>
            </div>
          </div>

          {/* Lessons */}
          <div>
            <div className="flex items-center justify-between px-1 mb-2">
              <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest">
                {lang === 'ru' ? 'DARSLAR' : 'DARSLAR'}
              </p>
              {/* Progress */}
              <div className="flex items-center gap-2">
                <div className="w-16 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${course.colorClass} rounded-full`}
                    style={{ width: `${progressPct}%` }}
                  />
                </div>
                <span className="text-[10px] font-bold text-gray-500">{progressPct}%</span>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden divide-y divide-gray-50">
              {course.lessons.map((lesson, idx) => (
                <div key={lesson.id} className="flex items-center gap-3 px-4 py-3.5">
                  {/* Number */}
                  <span className="w-5 text-[10px] font-bold text-gray-300 flex-shrink-0 text-center">
                    {String(idx + 1).padStart(2, '0')}
                  </span>

                  {/* Check circle */}
                  <div className={`w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center border-2 ${
                    lesson.status === 'completed'
                      ? `${course.colorClass} border-transparent`
                      : 'border-gray-200'
                  }`}>
                    {lesson.status === 'completed' && (
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>

                  {/* Title */}
                  <p className={`flex-1 text-sm leading-snug ${
                    lesson.status === 'completed'
                      ? 'text-[#1C1C2E] font-medium'
                      : 'text-gray-400'
                  }`}>
                    {lang === 'ru' ? lesson.titleRu : lesson.titleUz}
                  </p>

                  {/* Status pill */}
                  {lesson.status === 'completed' ? (
                    <span className="bg-green-100 text-green-700 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wide flex-shrink-0">
                      {lang === 'ru' ? 'YAKUNLANGAN' : 'YAKUNLANGAN'}
                    </span>
                  ) : (
                    <span className="bg-gray-100 text-gray-400 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wide flex-shrink-0">
                      {lang === 'ru' ? 'KUTILMOQDA' : 'KUTILMOQDA'}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Enroll button */}
          <button
            id={`enroll-btn-${course.id}`}
            onClick={() => setEnrolled(true)}
            className={`w-full py-4 rounded-2xl font-bold text-base transition-all duration-300 ${
              enrolled
                ? 'bg-green-500 text-white'
                : 'bg-[#C0181B] text-white hover:bg-[#a01416] active:scale-[0.98]'
            }`}
          >
            {enrolled
              ? `✓ ${lang === 'ru' ? 'Zapisan' : "Ro'yxatdan o'tilgan"}`
              : lang === 'ru' ? "Zapisatsya" : "Ro'yxatdan o'tish"}
          </button>

        </div>
      </div>

      <BottomNav />
    </div>
  );
}
