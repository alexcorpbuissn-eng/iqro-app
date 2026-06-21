'use client';

import { useState } from 'react';
import { useLang } from '@/lib/i18n-context';
import { DarkHeader } from '@/components/shared/Header';
import { BottomNav } from '@/components/shared/BottomNav';
import {
  scheduleGrid, ScheduleLesson,
  GRID_START_HOUR, GRID_END_HOUR, SLOT_HEIGHT_PX,
} from '@/lib/mock-data';

const TOTAL_HOURS = GRID_END_HOUR - GRID_START_HOUR;

function minutesFromStart(hour: number, min: number) {
  return (hour - GRID_START_HOUR) * 60 + min;
}

// ── Bottom sheet ──────────────────────────────────────────────────────────────
function LessonSheet({
  lesson, lang, onClose,
}: { lesson: ScheduleLesson; lang: string; onClose: () => void }) {
  const startLabel = `${String(lesson.startHour).padStart(2, '0')}:${String(lesson.startMin).padStart(2, '0')}`;
  const endTotalMin = lesson.startHour * 60 + lesson.startMin + lesson.durationMins;
  const endLabel = `${String(Math.floor(endTotalMin / 60)).padStart(2, '0')}:${String(endTotalMin % 60).padStart(2, '0')}`;

  return (
    <>
      <div className="fixed inset-0 bg-black/40 z-50 backdrop-blur-[2px]" onClick={onClose} />
      <div className="fixed bottom-0 left-0 right-0 z-50 animate-slide-up">
        <div className="max-w-2xl mx-auto px-4 pb-8">
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            {/* Color header bar */}
            <div className={`${lesson.colorClass} px-5 py-5`}>
              <p className="text-white/70 text-xs font-semibold uppercase tracking-widest">
                {startLabel} – {endLabel}
              </p>
              <h2 className="text-white text-xl font-bold mt-1">
                {lang === 'ru' ? lesson.nameRu : lesson.nameUz}
              </h2>
            </div>

            {/* Info rows */}
            <div className="divide-y divide-gray-50">
              <div className="flex items-center gap-3 px-5 py-3.5">
                <div className="w-9 h-9 bg-gray-50 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div>
                  <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest">
                    {lang === 'uz' ? "O'QITUVCHI" : 'УЧИТЕЛЬ'}
                  </p>
                  <p className="text-sm font-semibold text-[#1C1C2E] mt-0.5">{lesson.teacher}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 px-5 py-3.5">
                <div className="w-9 h-9 bg-gray-50 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest">
                    {lang === 'uz' ? 'VAQT' : 'ВРЕМЯ'}
                  </p>
                  <p className="text-sm font-semibold text-[#1C1C2E] mt-0.5">{startLabel} – {endLabel}</p>
                </div>
              </div>
            </div>

            <div className="px-5 pb-5 pt-2">
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

// ── Main ──────────────────────────────────────────────────────────────────────
export default function SchedulePage() {
  const { t, lang } = useLang();
  const [selectedLesson, setSelectedLesson] = useState<ScheduleLesson | null>(null);

  const totalHeightPx = TOTAL_HOURS * SLOT_HEIGHT_PX;

  const DAY_COLS: Array<{ uz: string; ru: string }> = [
    { uz: 'DU', ru: 'ПН' },
    { uz: 'SE', ru: 'ВТ' },
    { uz: 'CH', ru: 'СР' },
    { uz: 'PA', ru: 'ЧТ' },
    { uz: 'JU', ru: 'ПТ' },
  ];

  const hourLabels: number[] = [];
  for (let h = GRID_START_HOUR; h <= GRID_END_HOUR; h++) hourLabels.push(h);

  return (
    <div className="min-h-screen bg-[#F4F4F6] pb-24">

      {/* ── DARK TOP ── */}
      <div className="bg-[#111111]">
        <DarkHeader left="menu" />
        <div className="max-w-2xl mx-auto px-4 pt-2 pb-7 animate-fade-in">
          <p className="text-white/50 text-[10px] font-semibold uppercase tracking-widest mb-1">IQRO</p>
          <h1 className="text-2xl font-bold text-white">
            {lang === 'ru' ? 'Расписание' : 'Dars jadvali'}
          </h1>
          <p className="text-white/50 text-sm mt-1">
            {lang === 'ru' ? 'Эта неделя' : 'Bu hafta'}
          </p>
        </div>
      </div>

      {/* ── WHITE BODY ── */}
      <div className="bg-[#F4F4F6] rounded-t-3xl -mt-4 relative z-10">
        <div className="max-w-2xl mx-auto px-4 pt-6 animate-fade-in">

          {/* Grid card */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">

            {/* Day headers */}
            <div className="flex border-b border-gray-100">
              <div className="w-10 flex-shrink-0" />
              {DAY_COLS.map((col, i) => (
                <div key={i} className="flex-1 text-center py-3 border-l border-gray-50">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                    {lang === 'ru' ? col.ru : col.uz}
                  </span>
                </div>
              ))}
            </div>

            {/* Time grid */}
            <div className="overflow-y-auto" style={{ maxHeight: '65vh' }}>
              <div className="flex" style={{ height: totalHeightPx }}>

                {/* Hour ruler */}
                <div className="w-10 flex-shrink-0 relative bg-gray-50/50">
                  {hourLabels.map((h) => (
                    <div
                      key={h}
                      className="absolute left-0 right-0 flex justify-center"
                      style={{ top: (h - GRID_START_HOUR) * SLOT_HEIGHT_PX - 6 }}
                    >
                      <span className="text-[9px] font-semibold text-gray-300">
                        {String(h).padStart(2, '0')}
                      </span>
                    </div>
                  ))}
                </div>

                {/* 5 day columns */}
                {[0, 1, 2, 3, 4].map((colIdx) => {
                  const colLessons = scheduleGrid.filter((l) => l.col === colIdx);
                  return (
                    <div
                      key={colIdx}
                      className="flex-1 relative border-l border-gray-50"
                      style={{ height: totalHeightPx }}
                    >
                      {/* Hour lines */}
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

          {/* Legend */}
          <div className="flex flex-wrap gap-3 px-1 mt-4 pb-2">
            {[
              { color: 'bg-blue-500',   uz: 'Matematika',   ru: 'Математика'    },
              { color: 'bg-red-500',    uz: 'English',      ru: 'Английский'    },
              { color: 'bg-purple-500', uz: 'Robototexnika', ru: 'Робототехника' },
              { color: 'bg-amber-500',  uz: 'Tayyorlov',    ru: 'Подготовка'    },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-1.5">
                <div className={`w-2.5 h-2.5 rounded-full ${item.color}`} />
                <span className="text-xs text-gray-500 font-medium">
                  {lang === 'ru' ? item.ru : item.uz}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom sheet */}
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
