'use client';

import { useState } from 'react';
import { useLang } from '@/lib/i18n-context';
import { LangToggle } from '@/components/shared/LangToggle';
import { BottomNav } from '@/components/shared/BottomNav';
import {
  scheduleGrid,
  ScheduleLesson,
  GRID_START_HOUR,
  GRID_END_HOUR,
  SLOT_HEIGHT_PX,
} from '@/lib/mock-data';

// ── Time helpers ────────────────────────────────────────────────────────────────
const TOTAL_HOURS = GRID_END_HOUR - GRID_START_HOUR; // 11 hours

function minutesFromStart(hour: number, min: number) {
  return (hour - GRID_START_HOUR) * 60 + min;
}

// ── Bottom sheet ────────────────────────────────────────────────────────────────
function LessonSheet({
  lesson,
  lang,
  onClose,
}: {
  lesson: ScheduleLesson;
  lang: string;
  onClose: () => void;
}) {
  const startLabel = `${String(lesson.startHour).padStart(2, '0')}:${String(lesson.startMin).padStart(2, '0')}`;
  const endTotalMin = lesson.startHour * 60 + lesson.startMin + lesson.durationMins;
  const endH = Math.floor(endTotalMin / 60);
  const endM = endTotalMin % 60;
  const endLabel = `${String(endH).padStart(2, '0')}:${String(endM).padStart(2, '0')}`;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/30 z-50 backdrop-blur-[1px]"
        onClick={onClose}
      />
      {/* Sheet */}
      <div className="fixed bottom-0 left-0 right-0 z-50 animate-slide-up">
        <div className="max-w-2xl mx-auto px-4 pb-8">
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            {/* Color bar */}
            <div className={`${lesson.colorClass} px-5 py-5`}>
              <p className="text-white/70 text-xs font-medium">{startLabel} – {endLabel}</p>
              <h2 className="text-white text-xl font-bold mt-1">
                {lang === 'ru' ? lesson.nameRu : lesson.nameUz}
              </h2>
            </div>

            <div className="px-5 py-5 space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gray-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 uppercase tracking-wide font-medium">
                    {lang === 'uz' ? "O'qituvchi" : 'Учитель'}
                  </p>
                  <p className="text-sm font-semibold text-[#1C1C2E]">{lesson.teacher}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gray-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 uppercase tracking-wide font-medium">
                    {lang === 'uz' ? 'Vaqt' : 'Время'}
                  </p>
                  <p className="text-sm font-semibold text-[#1C1C2E]">{startLabel} – {endLabel}</p>
                </div>
              </div>
            </div>

            <div className="px-5 pb-5">
              <button
                onClick={onClose}
                className="w-full py-3 rounded-2xl bg-gray-100 text-gray-600 font-semibold text-sm hover:bg-gray-200 transition-colors"
              >
                {lang === 'uz' ? 'Yopish' : 'Закрыть'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// ── Main component ──────────────────────────────────────────────────────────────
export default function SchedulePage() {
  const { t, lang } = useLang();
  const [selectedLesson, setSelectedLesson] = useState<ScheduleLesson | null>(null);

  const totalHeightPx = TOTAL_HOURS * SLOT_HEIGHT_PX;

  const dayKeys: Array<'dayMon' | 'dayTue' | 'dayWed' | 'dayThu' | 'dayFri'> = [
    'dayMon', 'dayTue', 'dayWed', 'dayThu', 'dayFri',
  ];

  // Hour labels for the left ruler
  const hourLabels: number[] = [];
  for (let h = GRID_START_HOUR; h <= GRID_END_HOUR; h++) {
    hourLabels.push(h);
  }

  return (
    <div className="min-h-screen bg-[#F7F7F9] pb-24">
      {/* ── Header ── */}
      <div className="sticky top-0 z-30 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-2xl mx-auto px-4 h-14 flex items-center justify-between">
          <h1 className="text-lg font-bold text-[#1C1C2E]">{t('scheduleTitle')}</h1>
          <LangToggle />
        </div>
      </div>

      <main className="max-w-2xl mx-auto pt-4 px-2 animate-fade-in">
        <p className="text-xs text-gray-400 font-medium px-2 mb-3">{t('scheduleThisWeek')}</p>

        {/* ── Grid ── */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">

          {/* ── Day header row ── */}
          <div className="flex border-b border-gray-100">
            {/* Time gutter placeholder */}
            <div className="w-10 flex-shrink-0" />
            {dayKeys.map((key, colIdx) => (
              <div
                key={colIdx}
                className="flex-1 text-center py-2.5 text-xs font-bold text-gray-500 border-l border-gray-50"
              >
                {t(key)}
              </div>
            ))}
          </div>

          {/* ── Scrollable time grid ── */}
          <div className="overflow-y-auto" style={{ maxHeight: '65vh' }}>
            <div className="flex" style={{ height: totalHeightPx }}>

              {/* ── Time ruler (left) ── */}
              <div className="w-10 flex-shrink-0 relative">
                {hourLabels.map((h) => (
                  <div
                    key={h}
                    className="absolute left-0 right-0 flex items-start justify-center"
                    style={{ top: (h - GRID_START_HOUR) * SLOT_HEIGHT_PX - 7 }}
                  >
                    <span className="text-[9px] font-semibold text-gray-300 leading-none">
                      {String(h).padStart(2, '0')}
                    </span>
                  </div>
                ))}
              </div>

              {/* ── 5 day columns ── */}
              {[0, 1, 2, 3, 4].map((colIdx) => {
                const colLessons = scheduleGrid.filter((l) => l.col === colIdx);
                return (
                  <div
                    key={colIdx}
                    className="flex-1 relative border-l border-gray-50"
                    style={{ height: totalHeightPx }}
                  >
                    {/* Hour grid lines */}
                    {hourLabels.map((h) => (
                      <div
                        key={h}
                        className="absolute left-0 right-0 border-t border-gray-50"
                        style={{ top: (h - GRID_START_HOUR) * SLOT_HEIGHT_PX }}
                      />
                    ))}

                    {/* Lesson blocks */}
                    {colLessons.map((lesson) => {
                      const topPx = (minutesFromStart(lesson.startHour, lesson.startMin) / 60) * SLOT_HEIGHT_PX;
                      const heightPx = (lesson.durationMins / 60) * SLOT_HEIGHT_PX;

                      return (
                        <button
                          key={lesson.id}
                          id={`schedule-lesson-${lesson.id}`}
                          onClick={() => setSelectedLesson(lesson)}
                          className={`absolute left-1 right-1 ${lesson.colorClass} rounded-xl px-1.5 py-1.5 text-left overflow-hidden shadow-sm hover:opacity-90 active:scale-[0.97] transition-all`}
                          style={{ top: topPx, height: heightPx }}
                        >
                          <p className="text-white text-[10px] font-bold leading-tight truncate">
                            {lang === 'ru' ? lesson.nameRu : lesson.nameUz}
                          </p>
                          {heightPx >= 40 && (
                            <p className="text-white/70 text-[9px] leading-tight truncate mt-0.5">
                              {lesson.teacher}
                            </p>
                          )}
                        </button>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ── Legend ── */}
        <div className="flex flex-wrap gap-2 px-1 mt-4">
          {[
            { color: 'bg-blue-500',   labelUz: 'Matematika',     labelRu: 'Математика'    },
            { color: 'bg-red-500',    labelUz: 'English',        labelRu: 'Английский'    },
            { color: 'bg-purple-500', labelUz: 'Robototexnika',  labelRu: 'Робототехника' },
            { color: 'bg-amber-500',  labelUz: 'Tayyorlov',      labelRu: 'Подготовка'    },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-1.5">
              <div className={`w-2.5 h-2.5 rounded-full ${item.color} flex-shrink-0`} />
              <span className="text-xs text-gray-500 font-medium">
                {lang === 'ru' ? item.labelRu : item.labelUz}
              </span>
            </div>
          ))}
        </div>
      </main>

      {/* ── Bottom sheet overlay ── */}
      {selectedLesson && (
        <LessonSheet
          lesson={selectedLesson}
          lang={lang}
          onClose={() => setSelectedLesson(null)}
        />
      )}

      <BottomNav />
    </div>
  );
}
