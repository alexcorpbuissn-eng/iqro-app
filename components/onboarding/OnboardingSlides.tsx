'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useLang } from '@/lib/i18n-context';

const SLIDES = [
  {
    id: 1,
    bg: 'bg-[#C0181B]',
    icon: (
      <h1 className="text-6xl font-semibold text-white tracking-widest" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
        IQRO
      </h1>
    ),
    titleUz: "Xush kelibsiz!",
    titleRu: "Добро пожаловать!",
    bodyUz: "IQRO o'quv markazining raqamli kabineti — ota-onalar va ma'muriyat uchun.",
    bodyRu: "Цифровой кабинет учебного центра IQRO — для родителей и администрации.",
    isFirst: true,
  },
  {
    id: 2,
    bg: 'bg-[#111111]',
    icon: <span className="text-7xl">📱</span>,
    pillUz: 'OTA-ONA KABINETI',
    pillRu: 'ЛИЧНЫЙ КАБИНЕТ',
    titleUz: "Bolangiz haqida hamma narsa",
    titleRu: "Всё о вашем ребёнке",
    bodyUz: "Davomat, uy vazifasi, to'lov muddati va dars jadvali — bir ekranda, har kuni yangilanadi.",
    bodyRu: "Посещаемость, домашние задания, срок оплаты и расписание — на одном экране, обновляется ежедневно.",
    bulletsUz: [
      "✅ Bugungi davomat holati",
      "✅ Uy vazifasi muddatlari",
      "✅ Keyingi to'lov sanasi",
      "✅ Haftalik dars jadvali"
    ],
    bulletsRu: [
      "✅ Статус посещаемости сегодня",
      "✅ Дедлайны домашних заданий",
      "✅ Дата следующей оплаты",
      "✅ Расписание на неделю"
    ]
  },
  {
    id: 3,
    bg: 'bg-[#111111]',
    icon: <span className="text-7xl">📊</span>,
    pillUz: 'ADMIN PANEL',
    pillRu: 'ПАНЕЛЬ АДМИНИСТРАТОРА',
    titleUz: "Ma'muriyat uchun to'liq nazorat",
    titleRu: "Полный контроль для администрации",
    bodyUz: "Barcha 3 filial bo'yicha o'quvchilar soni, davomat foizi va to'lov holati — bir joyda.",
    bodyRu: "Количество учеников, процент посещаемости и статус оплат по всем 3 филиалам — в одном месте.",
    bulletsUz: [
      "✅ 3 filial statistikasi",
      "✅ Haftalik davomat grafigi",
      "✅ To'lov holati jadvali"
    ],
    bulletsRu: [
      "✅ Статистика по 3 филиалам",
      "✅ График посещаемости за неделю",
      "✅ Таблица статусов оплат"
    ]
  },
  {
    id: 4,
    bg: 'bg-[#111111]',
    icon: <span className="text-7xl">📚</span>,
    pillUz: 'KURSLAR & JADVAL',
    pillRu: 'КУРСЫ & РАСПИСАНИЕ',
    titleUz: "Kurslar va jadval — har doim qo'lingizda",
    titleRu: "Курсы и расписание — всегда под рукой",
    bodyUz: "To'rtta kurs katalogi, narxlar, o'qituvchilar va haftalik dars jadvali grafik ko'rinishida.",
    bodyRu: "Каталог четырёх курсов, цены, учителя и недельное расписание в графическом виде.",
    bulletsUz: [
      "✅ Matematika, English, Robototexnika, Tayyorlov",
      "✅ Har bir kurs uchun darslar ro'yxati",
      "✅ Interaktiv haftalik jadval"
    ],
    bulletsRu: [
      "✅ Математика, English, Робототехника, Подготовка",
      "✅ Список уроков для каждого курса",
      "✅ Интерактивное недельное расписание"
    ]
  },
  {
    id: 5,
    bg: 'bg-[#111111]',
    icon: <span className="text-7xl">🚀</span>,
    titleUz: "Boshlashga tayyormisiz?",
    titleRu: "Готовы начать?",
    bodyUz: "Ilovani telefoningizga qo'shib, istalgan vaqt kirish imkoniga ega bo'ling.",
    bodyRu: "Добавьте приложение на телефон и получите доступ в любое время.",
    isLast: true,
    pwaTipUz: "Brauzerda '3 nuqta' → 'Bosh ekranga qo'shish' tugmasini bosing",
    pwaTipRu: "В браузере нажмите '⋮' → 'Добавить на главный экран'"
  }
];

export function OnboardingSlides({ onFinish }: { onFinish: () => void }) {
  const [current, setCurrent] = useState(0);
  const { lang } = useLang();
  const router = useRouter();
  const touchStartX = useRef(0);

  const isLast = current === SLIDES.length - 1;
  const slide = SLIDES[current];

  const handleFinish = () => {
    onFinish();
    router.push('/parent');
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (diff > 50 && !isLast) setCurrent((c) => c + 1); // swipe left → next
    if (diff < -50 && current > 0) setCurrent((c) => c - 1); // swipe right → prev
  };

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col transition-colors duration-500 ${slide.bg}`}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Skip button — top right, hidden on last slide and first slide */}
      {!isLast && !slide.isFirst && (
        <button
          onClick={handleFinish}
          className="absolute top-4 right-4 text-white/40 text-sm font-semibold z-10 px-3 py-2"
        >
          {lang === 'ru' ? 'Пропустить' : 'Oʻtkazib yuborish'}
        </button>
      )}

      {/* Slide content */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 text-center animate-fade-in" key={current}>
        <div className="mb-6">{slide.icon}</div>
        
        {(slide.pillUz || slide.pillRu) && (
          <div className="bg-[#C0181B] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest mb-4">
            {lang === 'ru' ? slide.pillRu : slide.pillUz}
          </div>
        )}

        <h2 className="text-2xl font-bold text-white mb-3 leading-tight">
          {lang === 'ru' ? slide.titleRu : slide.titleUz}
        </h2>
        
        <p className="text-white/70 text-sm leading-relaxed mb-6">
          {lang === 'ru' ? slide.bodyRu : slide.bodyUz}
        </p>

        {(slide.bulletsUz || slide.bulletsRu) && (
          <div className="flex flex-col gap-2 text-left w-full max-w-xs mx-auto">
            {(lang === 'ru' ? slide.bulletsRu : slide.bulletsUz)?.map((bullet, idx) => (
              <p key={idx} className="text-white/60 text-sm">
                {bullet}
              </p>
            ))}
          </div>
        )}

        {slide.isLast && (
          <div className="bg-white/10 rounded-2xl p-4 mt-2 max-w-xs mx-auto flex items-center gap-3">
            <span className="text-3xl">📲</span>
            <p className="text-left text-white/80 text-xs font-medium leading-relaxed">
              {lang === 'ru' ? slide.pwaTipRu : slide.pwaTipUz}
            </p>
          </div>
        )}
      </div>

      {/* Bottom controls */}
      <div className="px-6 pb-12 space-y-6">
        {/* Dot indicators */}
        <div className="flex justify-center gap-2">
          {SLIDES.map((_, i) => (
            <div
              key={i}
              className={`rounded-full transition-all duration-300 ${
                i === current
                  ? 'w-6 h-2 bg-[#C0181B]'
                  : 'w-2 h-2 bg-white/20'
              }`}
            />
          ))}
        </div>

        {/* Next / Finish button */}
        {isLast ? (
          <button
            onClick={handleFinish}
            className="w-full py-4 bg-[#C0181B] text-white font-bold text-base rounded-2xl shadow-lg shadow-red-900/30 active:scale-[0.98] transition-transform"
          >
            {lang === 'ru' ? 'Начать' : 'Boshlash'}
          </button>
        ) : (
          <button
            onClick={() => setCurrent((c) => c + 1)}
            className={`w-full py-4 font-bold text-base rounded-2xl active:scale-[0.98] transition-transform ${
              slide.isFirst
                ? 'bg-white text-[#C0181B]'
                : 'bg-white/10 border border-white/20 text-white'
            }`}
          >
            {lang === 'ru' ? 'Далее →' : 'Keyingi →'}
          </button>
        )}
      </div>
    </div>
  );
}
