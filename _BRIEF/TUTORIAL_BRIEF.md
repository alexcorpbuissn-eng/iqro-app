# IQRO App — Tutorial Feature Brief
**For: Worker (Developer)**
**From: Project Manager**
**Date: June 21, 2026**
**Depends on: REDESIGN_BRIEF.md (already complete — read that first)**

---

## 1. WHAT YOU ARE BUILDING

Two things, both in one pass:

1. **Onboarding flow** — full-screen swipeable slides shown the very first time someone opens the app. After finishing or skipping, they never see it again (uses `localStorage`). Lands the user on `/parent` when done.

2. **Guide page** (`/guide`) — a scrollable reference screen inside the app listing every feature with a short explanation. Linked from the Profile → Sozlamalar tab so the owner or any user can revisit it at any time.

Both are **bilingual** (Uzbek default, Russian toggle — same `useLang()` hook as everywhere else).

---

## 2. ONBOARDING SLIDES

### 2.1 Trigger logic

In `app/layout.tsx` (or a new `components/shared/OnboardingGate.tsx` client component), wrap the app content:

```tsx
'use client';
import { useState, useEffect } from 'react';
import { OnboardingSlides } from '@/components/onboarding/OnboardingSlides';

export function OnboardingGate({ children }: { children: React.ReactNode }) {
  const [done, setDone] = useState(true); // default true = don't flash

  useEffect(() => {
    const seen = localStorage.getItem('iqro_onboarding_done');
    if (!seen) setDone(false);
  }, []);

  if (!done) {
    return (
      <OnboardingSlides
        onFinish={() => {
          localStorage.setItem('iqro_onboarding_done', '1');
          setDone(true);
        }}
      />
    );
  }
  return <>{children}</>;
}
```

Wrap `{children}` in `app/layout.tsx` inside `<LangProvider><OnboardingGate>{children}</OnboardingGate></LangProvider>`.

> **Dev tip:** To re-test the onboarding, run `localStorage.removeItem('iqro_onboarding_done')` in the browser console.

### 2.2 Slide content — 5 slides

Each slide is full-screen. Dark background (`#111111`) with a large emoji/icon, title, subtitle, and the Iqro red accent.

---

**Slide 1 — Welcome**
- Background: `#C0181B` (solid red — only this slide is fully red)
- Icon: IQRO wordmark (Cormorant Garamond, white, `text-6xl`) centered
- Title UZ: `"Xush kelibsiz!"`
- Title RU: `"Добро пожаловать!"`
- Body UZ: `"IQRO o'quv markazining raqamli kabineti — ota-onalar va ma'muriyat uchun."`
- Body RU: `"Цифровой кабинет учебного центра IQRO — для родителей и администрации."`
- No skip on this slide — just "Keyingi →" / "Далее →"

---

**Slide 2 — Parent Portal**
- Background: `#111111`
- Icon: `📱` (`text-7xl`)
- Accent pill (top): `OTA-ONA KABINETI` / `ЛИЧНЫЙ КАБИНЕТ` in red pill
- Title UZ: `"Bolangiz haqida hamma narsa"`
- Title RU: `"Всё о вашем ребёнке"`
- Body UZ: `"Davomat, uy vazifasi, to'lov muddati va dars jadvali — bir ekranda, har kuni yangilanadi."`
- Body RU: `"Посещаемость, домашние задания, срок оплаты и расписание — на одном экране, обновляется ежедневно."`
- Feature bullets (small, white/60, with ✅ prefix):
  - UZ: `✅ Bugungi davomat holati`, `✅ Uy vazifasi muddatlari`, `✅ Keyingi to'lov sanasi`, `✅ Haftalik dars jadvali`
  - RU: `✅ Статус посещаемости сегодня`, `✅ Дедлайны домашних заданий`, `✅ Дата следующей оплаты`, `✅ Расписание на неделю`

---

**Slide 3 — Admin Dashboard**
- Background: `#111111`
- Icon: `📊` (`text-7xl`)
- Accent pill: `ADMIN PANEL` in red pill
- Title UZ: `"Ma'muriyat uchun to'liq nazorat"`
- Title RU: `"Полный контроль для администрации"`
- Body UZ: `"Barcha 3 filial bo'yicha o'quvchilar soni, davomat foizi va to'lov holati — bir joyda."`
- Body RU: `"Количество учеников, процент посещаемости и статус оплат по всем 3 филиалам — в одном месте."`
- Feature bullets:
  - UZ: `✅ 3 filial statistikasi`, `✅ Haftalik davomat grafigi`, `✅ To'lov holati jadvali`
  - RU: `✅ Статистика по 3 филиалам`, `✅ График посещаемости за неделю`, `✅ Таблица статусов оплат`

---

**Slide 4 — Courses & Schedule**
- Background: `#111111`
- Icon: `📚` (`text-7xl`)
- Accent pill: `KURSLAR & JADVAL` / `КУРСЫ & РАСПИСАНИЕ` in red pill
- Title UZ: `"Kurslar va jadval — har doim qo'lingizda"`
- Title RU: `"Курсы и расписание — всегда под рукой"`
- Body UZ: `"To'rtta kurs katalogi, narxlar, o'qituvchilar va haftalik dars jadvali grafik ko'rinishida."`
- Body RU: `"Каталог четырёх курсов, цены, учителя и недельное расписание в графическом виде."`
- Feature bullets:
  - UZ: `✅ Matematika, English, Robototexnika, Tayyorlov`, `✅ Har bir kurs uchun darslar ro'yxati`, `✅ Interaktiv haftalik jadval`
  - RU: `✅ Математика, English, Робототехника, Подготовка`, `✅ Список уроков для каждого курса`, `✅ Интерактивное недельное расписание`

---

**Slide 5 — Get Started**
- Background: `#111111`
- Icon: `🚀` (`text-7xl`)
- Title UZ: `"Boshlashga tayyormisiz?"`
- Title RU: `"Готовы начать?"`
- Body UZ: `"Ilovani telefoningizga qo'shib, istalgan vaqt kirish imkoniga ega bo'ling."`
- Body RU: `"Добавьте приложение на телефон и получите доступ в любое время."`
- PWA install tip box (rounded-2xl, white/10 bg):
  - Icon: `📲`
  - UZ: `"Brauzerda '3 nuqta' → 'Bosh ekranga qo'shish' tugmasini bosing"`
  - RU: `"В браузере нажмите '⋮' → 'Добавить на главный экран'"`
- Button: `"Boshlash"` / `"Начать"` → calls `onFinish()` (navigates to `/parent`)
- No "Next" button — only the big CTA button

---

### 2.3 Slide shell component

File: `components/onboarding/OnboardingSlides.tsx`

```tsx
'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLang } from '@/lib/i18n-context';

const SLIDES = [...]; // array of slide configs from section 2.2

export function OnboardingSlides({ onFinish }: { onFinish: () => void }) {
  const [current, setCurrent] = useState(0);
  const { lang } = useLang();
  const router = useRouter();

  const isLast = current === SLIDES.length - 1;

  const handleFinish = () => {
    onFinish();
    router.push('/parent');
  };

  return (
    <div className="fixed inset-0 z-[100] bg-[#111111] flex flex-col">
      
      {/* Skip button — top right, hidden on last slide */}
      {!isLast && (
        <button
          onClick={handleFinish}
          className="absolute top-4 right-4 text-white/40 text-sm font-semibold z-10 px-3 py-2"
        >
          {lang === 'ru' ? 'Пропустить' : 'Oʻtkazib yuborish'}
        </button>
      )}

      {/* Slide content — takes full height minus bottom controls */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 text-center animate-fade-in">
        {/* Render current slide content */}
      </div>

      {/* Bottom controls */}
      <div className="px-6 pb-12 space-y-4">
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
            className="w-full py-4 bg-[#C0181B] text-white font-bold text-base rounded-2xl shadow-lg shadow-red-900/30"
          >
            {lang === 'ru' ? 'Начать' : 'Boshlash'}
          </button>
        ) : (
          <button
            onClick={() => setCurrent((c) => c + 1)}
            className="w-full py-4 bg-white/10 border border-white/20 text-white font-bold text-base rounded-2xl"
          >
            {lang === 'ru' ? 'Далее →' : 'Keyingi →'}
          </button>
        )}
      </div>
    </div>
  );
}
```

### 2.4 Swipe support (optional but nice)

Add touch swipe detection so swiping left advances the slide:

```tsx
// Inside OnboardingSlides, track touch start/end:
const touchStartX = useRef(0);

onTouchStart={(e) => { touchStartX.current = e.touches[0].clientX; }}
onTouchEnd={(e) => {
  const diff = touchStartX.current - e.changedTouches[0].clientX;
  if (diff > 50 && !isLast) setCurrent(c => c + 1);  // swipe left → next
  if (diff < -50 && current > 0) setCurrent(c => c - 1); // swipe right → prev
}}
```

---

## 3. GUIDE PAGE (`/guide`)

### 3.1 Entry point

Add a row to the Profile page Sozlamalar tab (in `app/profile/page.tsx`):

```tsx
import Link from 'next/link';

<SettingRow
  icon="📖"
  label={lang === 'ru' ? "Qo'llanma" : "Qo'llanma"}
  right={
    <Link href="/guide" className="text-[#C0181B] text-sm font-semibold">
      {lang === 'ru' ? 'Ochish →' : 'Ochish →'}
    </Link>
  }
/>
```

### 3.2 Page structure

File: `app/guide/page.tsx`

Layout: `DarkHeader` with back button → white body with sections.

```
┌─────────────────────────────┐
│ [←]         QO'LLANMA      │  ← dark header
├─────────────────────────────┤
│ IQRO ilovasi haqida         │  ← intro paragraph
│                             │
│ OTA-ONA KABINETI            │  ← ALL CAPS section label
│ [Feature card]              │
│                             │
│ ADMIN PANEL                 │
│ [Feature card]              │
│                             │
│ KURSLAR                     │
│ [Feature card]              │
│                             │
│ JADVAL                      │
│ [Feature card]              │
│                             │
│ ILOVANI O'RNATISH           │
│ [Install card]              │
│                             │
│ TIL SOZLAMALARI             │
│ [Language card]             │
└─────────────────────────────┘
```

### 3.3 Feature card component

Each section uses a `GuideCard` with:
- White bg, `rounded-2xl`, `shadow-sm`, `border border-gray-100`
- Top: emoji icon (large, `text-3xl`) + section title (bold) + 1-line description
- Below divider: list of feature rows, each with a colored dot + short feature name + explanation

```tsx
function GuideCard({
  icon, title, description, features
}: {
  icon: string;
  title: string;
  description: string;
  features: { dot: string; name: string; detail: string }[];
}) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-4 flex items-center gap-3 border-b border-gray-50">
        <span className="text-3xl">{icon}</span>
        <div>
          <h3 className="font-bold text-[#1C1C2E] text-sm">{title}</h3>
          <p className="text-xs text-gray-400 mt-0.5">{description}</p>
        </div>
      </div>
      <div className="divide-y divide-gray-50">
        {features.map((f, i) => (
          <div key={i} className="flex items-start gap-3 px-4 py-3">
            <div className={`w-2 h-2 rounded-full ${f.dot} mt-1.5 flex-shrink-0`} />
            <div>
              <p className="text-sm font-semibold text-[#1C1C2E]">{f.name}</p>
              <p className="text-xs text-gray-400 mt-0.5 leading-relaxed">{f.detail}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
```

### 3.4 Content — all sections (Uzbek / Russian)

#### Section 1 — OTA-ONA KABINETI / ЛИЧНЫЙ КАБИНЕТ
- Icon: `📱`
- Title UZ: `"Ota-ona kabineti"` / RU: `"Личный кабинет"`
- Desc UZ: `"Farzandingizning o'quv hayoti — bir ekranda"` / RU: `"Учёба вашего ребёнка — на одном экране"`
- Features:
  - Dot: `bg-green-500` | Name UZ: `"Davomat"` RU: `"Посещаемость"` | Detail UZ: `"Bugungi davomat holati va oxirgi 5 kunlik tarix. Keldi ✅ yoki Kelmadi ❌."` RU: `"Статус посещаемости сегодня и история за 5 дней."`
  - Dot: `bg-amber-500` | Name UZ: `"Uy vazifasi"` RU: `"Домашнее задание"` | Detail UZ: `"Barcha topshiriqlar va topshirish muddatlari. Topshirilgan / Baholangan holati."` RU: `"Все задания и дедлайны. Статус сдачи и оценки."`
  - Dot: `bg-red-500` | Name UZ: `"To'lov"` RU: `"Оплата"` | Detail UZ: `"Keyingi to'lov sanasi va miqdori. Muddati o'tgan bo'lsa, qizil rang bilan ko'rsatiladi."` RU: `"Дата и сумма следующего платежа. Просрочка выделяется красным."`
  - Dot: `bg-blue-500` | Name UZ: `"Jadval"` RU: `"Расписание"` | Detail UZ: `"Bu haftaning dars jadvali — kun va vaqt bilan."` RU: `"Расписание уроков на эту неделю с днём и временем."`

#### Section 2 — ADMIN PANEL / ПАНЕЛЬ АДМИНИСТРАТОРА
- Icon: `📊`
- Title UZ: `"Admin panel"` / RU: `"Панель администратора"`
- Desc UZ: `"3 filial bo'yicha to'liq nazorat"` / RU: `"Полный контроль по 3 филиалам"`
- Features:
  - Dot: `bg-red-500` | Name UZ: `"Filiallar"` RU: `"Филиалы"` | Detail UZ: `"Yangihayot, Qoraqamish va Sergeli filiallari orasida almashish. Har biri uchun alohida statistika."` RU: `"Переключение между Янгихайот, Каракамыш и Сергели. Отдельная статистика для каждого."`
  - Dot: `bg-green-500` | Name UZ: `"Kunlik davomat"` RU: `"Дневная посещаемость"` | Detail UZ: `"Bugun nechta o'quvchi kelgani va foiz ko'rsatkichi."` RU: `"Сколько учеников пришло сегодня и процентный показатель."`
  - Dot: `bg-blue-500` | Name UZ: `"Haftalik grafik"` RU: `"Недельный график"` | Detail UZ: `"Oxirgi 5 kunlik davomat foizi ustun diagrammada."` RU: `"Процент посещаемости за последние 5 дней в виде столбчатой диаграммы."`
  - Dot: `bg-amber-500` | Name UZ: `"To'lovlar jadvali"` RU: `"Таблица оплат"` | Detail UZ: `"O'quvchilar bo'yicha to'lov holati: To'langan, Kutilmoqda, Muddati o'tgan."` RU: `"Статус оплаты по ученикам: Оплачено, Ожидается, Просрочено."`

#### Section 3 — KURSLAR / КУРСЫ
- Icon: `📚`
- Title UZ: `"Kurslar katalogi"` / RU: `"Каталог курсов"`
- Desc UZ: `"To'rtta kurs — batafsil ma'lumot bilan"` / RU: `"Четыре курса — с подробной информацией"`
- Features:
  - Dot: `bg-blue-500` | Name UZ: `"Matematika (Mental Arifmetika)"` RU: same | Detail UZ: `"7–12 yosh. Usmon Xolmatov. Du/Chor/Jum 09:00–10:00. 350 000 so'm/oy."` RU: `"7–12 лет. Usmon Xolmatov. Пн/Ср/Пт 09:00–10:00. 350 000 сум/мес."`
  - Dot: `bg-red-500` | Name UZ: `"English (General & IELTS)"` RU: same | Detail UZ: `"10–18 yosh. Mr. Jasur. Du/Chor/Jum 15:00–17:00. 450 000 so'm/oy."` RU: `"10–18 лет. Mr. Jasur. Пн/Ср/Пт 15:00–17:00. 450 000 сум/мес."`
  - Dot: `bg-purple-500` | Name UZ: `"Robototexnika"` RU: `"Робототехника"` | Detail UZ: `"9–15 yosh. Dilshod Nazarov. Sesh/Pays 14:00–16:00. 500 000 so'm/oy."` RU: `"9–15 лет. Dilshod Nazarov. Вт/Чт 14:00–16:00. 500 000 сум/мес."`
  - Dot: `bg-amber-500` | Name UZ: `"Tayyorlov guruhi"` RU: `"Подготовительная группа"` | Detail UZ: `"5–7 yosh. Nargiza Yusupova. Har kuni 10:00–11:30. 300 000 so'm/oy."` RU: `"5–7 лет. Nargiza Yusupova. Ежедневно 10:00–11:30. 300 000 сум/мес."`

#### Section 4 — JADVAL / РАСПИСАНИЕ
- Icon: `📅`
- Title UZ: `"Dars jadvali"` / RU: `"Расписание занятий"`
- Desc UZ: `"Haftalik interaktiv jadval"` / RU: `"Интерактивное недельное расписание"`
- Features:
  - Dot: `bg-gray-400` | Name UZ: `"Haftalik ko'rinish"` RU: `"Недельный вид"` | Detail UZ: `"Dushanba–Juma, 08:00–19:00 oralig'idagi barcha darslar bir ko'rinishda."` RU: `"Все занятия пн–пт, 08:00–19:00 в одном виде."`
  - Dot: `bg-red-500` | Name UZ: `"Dars tafsiloti"` RU: `"Детали урока"` | Detail UZ: `"Istalgan dars blokiga bosing — o'qituvchi ismi va vaqtni ko'ring."` RU: `"Нажмите на любой блок урока — увидите имя учителя и точное время."`

#### Section 5 — ILOVANI O'RNATISH / УСТАНОВКА ПРИЛОЖЕНИЯ
- Icon: `📲`
- Title UZ: `"Ilovani telefoningizga o'rnating"` / RU: `"Установите приложение на телефон"`
- Desc UZ: `"App Store yoki Play Store siz kerak emas"` / RU: `"App Store и Play Store не нужны"`
- Features:
  - Dot: `bg-green-500` | Name UZ: `"Android (Chrome)"` RU: same | Detail UZ: `"Saytni oching → brauzer menyusi (⋮) → 'Bosh ekranga qo'shish' → 'Qo'shish'."` RU: `"Откройте сайт → меню браузера (⋮) → 'Добавить на главный экран' → 'Добавить'."`
  - Dot: `bg-blue-500` | Name UZ: `"iPhone (Safari)"` RU: same | Detail UZ: `"Saytni oching → ulashish tugmasi (□↑) → 'Bosh ekranga qo'shish'."` RU: `"Откройте сайт → кнопка поделиться (□↑) → 'На экран Домой'."`

#### Section 6 — TIL SOZLAMALARI / ЯЗЫКОВЫЕ НАСТРОЙКИ
- Icon: `🌐`
- Title UZ: `"Til almashish"` / RU: `"Переключение языка"`
- Desc UZ: `"O'zbek va Rus tillari qo'llab-quvvatlanadi"` / RU: `"Поддерживаются узбекский и русский языки"`
- Features:
  - Dot: `bg-red-500` | Name UZ: `"Har bir sahifada"` RU: `"На каждой странице"` | Detail UZ: `"Yuqori o'ng burchakdagi UZ / RU tugmasi orqali istalgan vaqt tilni o'zgartiring."` RU: `"Переключайте язык в любое время кнопкой UZ / RU в правом верхнем углу."`
  - Dot: `bg-gray-400` | Name UZ: `"Profil sahifasida"` RU: `"В профиле"` | Detail UZ: `"Profil → Sozlamalar bo'limida ham til tugmasi mavjud."` RU: `"Кнопка языка также доступна в Профиль → Настройки."`

---

## 4. NEW FILES & CHANGED FILES SUMMARY

| File | Action |
|------|--------|
| `components/onboarding/OnboardingSlides.tsx` | CREATE — 5-slide onboarding component |
| `components/shared/OnboardingGate.tsx` | CREATE — localStorage check wrapper |
| `app/layout.tsx` | EDIT — wrap children in `<OnboardingGate>` |
| `app/guide/page.tsx` | CREATE — full guide/tutorial page |
| `app/profile/page.tsx` | EDIT — add Qo'llanma row in Sozlamalar tab |

---

## 5. DO NOT BUILD IN THIS PASS

- Animated slide transitions (CSS fade is enough — no libraries)
- Video or image embeds in the guide
- A search function on the guide page
- Any new i18n keys in `lib/i18n.ts` — hardcode the tutorial strings inline (there are too few to justify adding keys)
- A "reset onboarding" button in the UI (devs can clear via console if needed)

---

## 6. BUILD ORDER

1. `components/onboarding/OnboardingSlides.tsx` — build and test slides in isolation first
2. `components/shared/OnboardingGate.tsx` — wrap logic
3. `app/layout.tsx` — wire the gate
4. `app/guide/page.tsx` — guide page
5. `app/profile/page.tsx` — add the Qo'llanma link row
6. `npm run build` — confirm 0 errors
7. Commit and push

---

## 7. DEFINITION OF DONE

- [ ] First visit to the app shows onboarding slides (5 slides, skip works, finish navigates to `/parent`)
- [ ] Returning visits skip onboarding entirely
- [ ] Language toggle works on slide 1 (the lang is already set before onboarding appears — no special handling needed, `useLang()` works)
- [ ] `/guide` page loads, all 6 sections visible, bilingual
- [ ] Profile → Sozlamalar tab has a `Qo'llanma / Руководство` row that links to `/guide`
- [ ] `npm run build` — 0 TypeScript errors
- [ ] No new npm packages added
