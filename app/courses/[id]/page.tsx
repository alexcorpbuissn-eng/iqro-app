'use client';

import { use } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { useState } from 'react';
import { useLang } from '@/lib/i18n-context';
import { LangToggle } from '@/components/shared/LangToggle';
import { BottomNav } from '@/components/shared/BottomNav';
import { Badge } from '@/components/ui/badge';
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
    <div className="min-h-screen bg-[#F7F7F9] pb-24">
      {/* ── Header ── */}
      <div className="sticky top-0 z-30 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-2xl mx-auto px-4 h-14 flex items-center justify-between gap-3">
          <Link
            href="/courses"
            id="back-to-courses"
            className="flex items-center gap-1.5 text-sm font-semibold text-[#C0181B]"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            {t('backToCourses')}
          </Link>
          <LangToggle />
        </div>
      </div>

      <main className="max-w-2xl mx-auto px-4 pt-5 space-y-4 animate-fade-in">

        {/* ── Hero banner ── */}
        <div className={`${course.colorClass} rounded-3xl px-6 py-8 relative overflow-hidden`}>
          <div className="absolute -top-8 -right-8 w-36 h-36 rounded-full bg-white/10" />
          <div className="absolute -bottom-10 -left-6 w-28 h-28 rounded-full bg-white/10" />
          <div className="relative z-10">
            <span className="text-5xl mb-3 block">{course.icon}</span>
            <h1 className="text-2xl font-bold text-white leading-tight">
              {lang === 'ru' ? course.nameRu : course.nameUz}
            </h1>
            <p className="text-white/70 text-sm mt-1">{course.teacher}</p>
          </div>
        </div>

        {/* ── Meta info cards ── */}
        <div className="grid grid-cols-3 gap-3">
          {[
            {
              label: t('ageRange'),
              value: lang === 'ru' ? course.ageRangeRu : course.ageRangeUz,
              icon: '👤',
            },
            {
              label: t('courseScheduleLabel'),
              value: lang === 'ru' ? course.scheduleRu : course.scheduleUz,
              icon: '📅',
            },
            {
              label: t('coursePrice'),
              value: `${course.priceUzs.toLocaleString('uz-UZ')} ${t('currency')}`,
              icon: '💳',
            },
          ].map((item, i) => (
            <div key={i} className="bg-white rounded-2xl p-3 shadow-sm border border-gray-100 flex flex-col items-center text-center gap-1">
              <span className="text-xl">{item.icon}</span>
              <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wide">{item.label}</p>
              <p className="text-xs font-bold text-[#1C1C2E] leading-tight">{item.value}</p>
            </div>
          ))}
        </div>

        {/* ── Description ── */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">
            {t('courseDetail')}
          </h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            {lang === 'ru' ? course.descriptionRu : course.descriptionUz}
          </p>
        </div>

        {/* ── Lessons list ── */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-5 pt-5 pb-3 border-b border-gray-50 flex items-center justify-between">
            <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-widest">
              {t('lessons')}
            </h2>
            <div className="flex items-center gap-2">
              <div className="w-20 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className={`h-full ${course.colorClass} rounded-full transition-all`}
                  style={{ width: `${progressPct}%` }}
                />
              </div>
              <span className="text-xs font-semibold text-gray-500">{progressPct}%</span>
            </div>
          </div>

          <div className="divide-y divide-gray-50">
            {course.lessons.map((lesson, idx) => (
              <div key={lesson.id} className="flex items-center gap-4 px-5 py-3.5">
                {/* Number */}
                <span className="w-6 text-xs font-bold text-gray-300 flex-shrink-0 text-center">
                  {String(idx + 1).padStart(2, '0')}
                </span>

                {/* Check or dot */}
                <div className={`w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center border-2 ${
                  lesson.status === 'completed'
                    ? `${course.colorClass} border-transparent`
                    : 'border-gray-200 bg-transparent'
                }`}>
                  {lesson.status === 'completed' && (
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>

                {/* Title */}
                <p className={`flex-1 text-sm leading-snug ${
                  lesson.status === 'completed' ? 'text-[#1C1C2E] font-medium' : 'text-gray-400'
                }`}>
                  {lang === 'ru' ? lesson.titleRu : lesson.titleUz}
                </p>

                {/* Status badge */}
                <Badge
                  variant={lesson.status === 'completed' ? 'success' : 'secondary'}
                  className="flex-shrink-0 text-[10px]"
                >
                  {lesson.status === 'completed' ? t('lessonCompleted') : t('lessonPending')}
                </Badge>
              </div>
            ))}
          </div>
        </div>

        {/* ── Enroll button ── */}
        <button
          id={`enroll-btn-${course.id}`}
          onClick={() => setEnrolled(true)}
          className={`w-full py-4 rounded-2xl font-bold text-base transition-all duration-300 shadow-sm ${
            enrolled
              ? 'bg-green-500 text-white shadow-green-200'
              : `${course.colorClass} text-white hover:opacity-90 active:scale-[0.98]`
          }`}
        >
          {enrolled ? `✓ ${t('enrolled')}` : t('enroll')}
        </button>

      </main>

      <BottomNav />
    </div>
  );
}
