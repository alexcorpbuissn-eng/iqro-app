# IQRO App — Visual Redesign Brief
**For: Worker (Developer)**
**From: Project Manager**
**Date: June 21, 2026**
**Status: ACTIVE — Start here before touching any code**

---

## 1. CONTEXT — READ THIS FIRST

You are taking over an existing Next.js app built for IQRO Academy (an o'quv markazi in Tashkent). The app already works — routes, data, bilingual logic, PWA setup are all done. **You are NOT rebuilding the app. You are reskinning it.**

The owner has approved a new visual direction based on a reference app (Caba Misnak ERP). Your job is to redesign every screen to match that visual language while keeping all existing logic, routing, and data untouched.

**What must NOT change:**
- File/folder structure
- Route names (`/`, `/parent`, `/admin`, `/courses`, `/courses/[id]`, `/schedule`)
- Mock data (`lib/mock-data.ts`)
- i18n system (`lib/i18n.ts`, `lib/i18n-context.tsx`)
- DB schema (`lib/db/schema.ts`)
- PWA config (`public/manifest.json`, `next.config.ts`)
- Package.json dependencies (do not add new packages)

**What you ARE changing:**
- Every `.tsx` page file's visual layout and styling
- Shared components (Header, BottomNav, LangToggle, etc.)
- `globals.css` if needed for new animations/utilities

---

## 2. THE NEW DESIGN LANGUAGE

### 2.1 Core Visual Pattern (from reference app)

Every screen follows a split layout:

```
┌─────────────────────────────┐
│  DARK TOP SECTION           │  ← black or dark red hero
│  (header + hero card)       │
├─────────────────────────────┤
│                             │
│  WHITE BODY (cards list)    │  ← white/light gray background
│                             │
├─────────────────────────────┤
│  BOTTOM NAV (5 tabs)        │  ← white bar, elevated center button
└─────────────────────────────┘
```

### 2.2 Color Tokens (keep these exact values)

| Token | Value | Usage |
|-------|-------|-------|
| Primary red | `#C0181B` | Hero cards, active nav, badges, buttons |
| Dark background | `#0F0F0F` or `#111111` | Hero sections, sidebar |
| Card background | `#FFFFFF` | All content cards |
| Page background | `#F4F4F6` | Behind the cards |
| Dark text | `#1C1C2E` | Card titles, primary values |
| Muted text | `#9CA3AF` | Labels, sublabels, ALL CAPS headers |
| Success green | `#22C55E` | KELDI / TO'LANGAN / AVAILABLE badges |
| Warning amber | `#F59E0B` | Pending / upcoming badges |
| Danger red | `#EF4444` | Overdue / absent badges |

### 2.3 Typography Rules

- **Section labels:** ALL CAPS, `text-[10px]` or `text-xs`, `font-semibold`, `tracking-widest`, color `#9CA3AF`
  - Example: `DAVOMAT`, `UY VAZIFASI`, `TO'LOV`, `CARGO TRACKING` style
- **Card titles:** `font-bold`, `text-base` or `text-lg`, `#1C1C2E`
- **Values/numbers:** `font-bold`, large (`text-2xl` or `text-3xl`)
- **Breadcrumb categories:** ALL CAPS, `text-[10px]`, parent in gray `›` child in `#C0181B`
  - Example: `KURSLAR › A2` or `DAVOMAT › BUGUN`
- **Fonts:** Keep existing Inter (body) + Cormorant Garamond (IQRO wordmark only)

### 2.4 Card Style

All cards follow this pattern:
```
bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden
```
- Corner radius: `rounded-2xl` (16px)
- No heavy shadows — `shadow-sm` only
- Inside padding: `p-4` or `p-5`
- Dividers between rows: `divide-y divide-gray-50`

### 2.5 Status Badges

Pill-shaped, bold, uppercase:
```tsx
// KELDI (present/paid/available)
<span className="bg-green-100 text-green-700 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wide">
  KELDI
</span>

// KUTILMOQDA (pending)
<span className="bg-amber-100 text-amber-700 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wide">
  KUTILMOQDA
</span>

// KELMADI / MUDDATI O'TGAN (overdue/absent)
<span className="bg-red-100 text-red-700 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wide">
  KELMADI
</span>
```

### 2.6 Section Label Pattern

Use this before every card group:
```tsx
<p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest px-1 mb-2">
  DAVOMAT
</p>
```

### 2.7 Info Row Pattern (for Profile and detail cards)

```tsx
<div className="flex items-center gap-3 px-4 py-3.5 border-b border-gray-50 last:border-0">
  <div className="w-9 h-9 bg-gray-50 rounded-xl flex items-center justify-center flex-shrink-0">
    {/* SVG icon */}
  </div>
  <div>
    <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest">
      LABEL
    </p>
    <p className="text-sm font-semibold text-[#1C1C2E] mt-0.5">
      Value
    </p>
  </div>
</div>
```

### 2.8 Metric Grid Pattern (2×2 inside cards)

```tsx
<div className="grid grid-cols-2 gap-2 mt-3">
  <div className="bg-gray-50 rounded-xl p-3">
    <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide">DAVOMAT</p>
    <p className="text-xl font-bold text-[#1C1C2E] mt-1">92%</p>
  </div>
  {/* repeat */}
</div>
```

---

## 3. BOTTOM NAVIGATION — NEW SPEC

**5 tabs. Center button is decorative (option B decided by owner).**

```
[ Home ] [ Courses ] [ IQRO ] [ Schedule ] [ Profile ]
            ↑ elevated red circle with IQRO wordmark
```

Center button spec:
- `w-14 h-14` red circle (`bg-[#C0181B]`)
- Elevated: `shadow-lg shadow-red-300 -mt-5` (floats above the nav bar)
- Inside: "IQRO" text in white Cormorant Garamond, or the letter "I" — not a QR icon
- **Non-interactive** — `pointer-events-none` or no `href`
- The 4 functional tabs: Home (`/`), Courses (`/courses`), Schedule (`/schedule`), Profile (`/profile`)

Implementation in `components/shared/BottomNav.tsx`:

```tsx
// Nav structure
<nav className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-100 pb-safe">
  <div className="max-w-2xl mx-auto flex items-end h-16">
    {/* Tab 1: Home */}
    {/* Tab 2: Courses */}
    
    {/* CENTER BUTTON — decorative */}
    <div className="flex-1 flex flex-col items-center justify-end pb-2">
      <div className="w-14 h-14 rounded-full bg-[#C0181B] shadow-lg shadow-red-300 -mt-5 flex items-center justify-center pointer-events-none select-none">
        <span className="text-white text-base font-semibold tracking-widest" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
          IQRO
        </span>
      </div>
    </div>
    
    {/* Tab 4: Schedule */}
    {/* Tab 5: Profile */}
  </div>
</nav>
```

---

## 4. HEADER — NEW SPEC

Replace the current sticky white header on all screens with a **dark header** that bleeds into a dark hero section.

```tsx
// New shared header — dark version
<div className="bg-[#111111] px-4 pt-4 pb-0">
  <div className="max-w-2xl mx-auto flex items-center justify-between h-12">
    {/* Left: hamburger or back button */}
    {/* Center or right: LangToggle (restyled for dark bg) */}
  </div>
</div>
```

**LangToggle on dark background:**
- Pill shape: `bg-white/10 border border-white/20 rounded-xl px-3 py-1`
- Text: `text-white text-xs font-bold`
- Active: `bg-white text-[#111111]`

---

## 5. SCREEN-BY-SCREEN REDESIGN SPEC

### 5.1 Home Page (`app/page.tsx`)

**Current:** Light gray background, red hero card, stats row, course grid.
**New:** Dark top → white body split.

```
┌─────────────────────────────┐
│ [≡]              [UZ | RU]  │  ← dark header, #111111 bg
│                             │
│  IQRO                       │  ← Cormorant Garamond, white, large
│  Bilim — kelajaging kaliti  │  ← white/70, small
│                             │
│  ┌──────────┐ ┌──────────┐  │  ← 2 stat pills, white/10 bg
│  │  120+    │ │  3       │  │
│  │ O'quvchi │ │  Filial  │  │
│  └──────────┘ └──────────┘  │
├─────────────────────────────┤  ← rounded-t-3xl white panel
│ TEZKOR HARAKATLAR           │  ← ALL CAPS gray label
│ [Parent] [Admin] [Courses]  │  ← 3 quick action cards
│                             │
│ KURSLAR                     │  ← ALL CAPS gray label
│ [Course card] [Course card] │  ← 2-col grid
│ [Course card] [Course card] │
└─────────────────────────────┘
```

Quick action cards (3 horizontal, equal width):
- White bg, rounded-2xl, icon (emoji or SVG) + ALL CAPS label
- Tap: navigates to respective route

### 5.2 Parent Portal (`app/parent/page.tsx`)

**Current:** White header, stacked widgets.
**New:** Dark hero → white body.

```
┌─────────────────────────────┐
│ [←]    IQRO     [UZ | RU]  │  ← dark header
│                             │
│  Xush kelibsiz 👋           │  ← white/70 small
│  Karimova Malika            │  ← white bold large
│  ● Karimov Alisher · Fil.1  │  ← green dot + white/60 small
│                             │
│  ┌─────────┐  ┌─────────┐  │  ← 2 stat boxes (white/10 bg)
│  │  KELDI  │  │ 450 000 │  │
│  │  Bugun  │  │  To'lov │  │
│  └─────────┘  └─────────┘  │
├─────────────────────────────┤  ← rounded-t-3xl white panel
│ DAVOMAT                     │
│ [AttendanceWidget]          │
│ UY VAZIFASI                 │
│ [HomeworkWidget]            │
│ TO'LOV                      │
│ [PaymentWidget]             │
│ JADVAL                      │
│ [ScheduleWidget]            │
└─────────────────────────────┘
```

**AttendanceWidget redesign:**
- Remove the current day-chip row
- Replace with a compact horizontal row of 5 day pills (Mon–Fri)
- Each pill: day abbreviation + colored dot (green/red/gray)
- Below: one row showing today's status in a large badge

**HomeworkWidget redesign:**
- Each homework item: left color accent bar + title + due date pill
- Due date pill: amber if due soon, gray if later

**PaymentWidget redesign:**
- Large amount display: `450 000 so'm` in `text-3xl font-bold`
- Below: due date + status badge
- No action button needed (v1)

### 5.3 Admin Dashboard (`app/admin/page.tsx`)

**Current:** White header, branch tabs, stat cards, chart, table.
**New:** Dark hero → white body.

```
┌─────────────────────────────┐
│ [≡]             [UZ | RU]  │  ← dark header
│                             │
│  Admin Panel                │  ← white bold
│  Yangihayot · Filial 1      │  ← white/60
│                             │
│  ┌────┐  ┌────┐  ┌────┐   │  ← 3 stat boxes (white/10 bg)
│  │ 47 │  │81% │  │ 2  │   │
│  │Stud│  │Dav.│  │Mudd│   │
│  └────┘  └────┘  └────┘   │
├─────────────────────────────┤  ← rounded-t-3xl white panel
│ [Fil.1] [Fil.2] [Fil.3]    │  ← branch tabs (pill style)
│                             │
│ HAFTALIK DAVOMAT            │
│ [AttendanceChart]           │
│                             │
│ TO'LOVLAR                   │
│ [PaymentsTable]             │
└─────────────────────────────┘
```

**Branch tabs redesign:**
- Horizontal scroll row of pills
- Inactive: `bg-gray-100 text-gray-500`
- Active: `bg-[#C0181B] text-white`
- No underline style — full filled pill

**StatCard redesign:**
- Dark background version (white/10 on dark hero): label ALL CAPS small, value bold large, optional trend arrow

### 5.4 Courses Page (`app/courses/page.tsx`)

**Current:** White header, full-width cards with color accent bar.
**New:** Dark header → white body. Keep card structure but update styling.

Cards should now show category breadcrumb:
```
KURSLAR › ENGLISH     ← ALL CAPS, gray › red
Ingliz tili           ← bold title
Mr. Jasur             ← muted
450 000 so'm / oy     ← right-aligned
[AVAILABLE badge]     ← top right
```

The color accent bar on the left stays — it works well in this design language.

### 5.5 Course Detail (`app/courses/[id]/page.tsx`)

**Current:** Colored hero banner → meta cards → description → lessons.
**New:** Dark top with colored accent → white body.

Replace the colored hero banner with:
- Dark (`#111111`) background top
- Course emoji + name in white
- Color accent as a thin left border or a small pill badge, not a full banner

Meta cards (age/schedule/price) — keep the 3-column grid, update to info-row style.

Lessons list — keep the progress bar. Update individual lesson rows:
- Completed: green check circle + normal text
- Pending: empty circle + muted text
- Badge: pill style (see section 2.5)

### 5.6 Schedule Page (`app/schedule/page.tsx`)

**Current:** White header, full-height time grid.
**New:** Dark header → white body wrapping the grid.

- Header goes dark
- The time grid card itself stays white (`bg-white rounded-2xl`)
- Day column headers: ALL CAPS, `text-[10px]`, gray
- Hour ruler: keep as-is (already minimal)
- Bottom sheet: already good — keep the color bar header + white body pattern

### 5.7 Profile Page (`app/profile/page.tsx`) — NEW PAGE

This page does not exist yet. Build it in this pass.

```
┌─────────────────────────────┐
│ [←]             [⚙️]       │  ← dark header, settings icon (non-functional)
│                             │
│  [Avatar placeholder]       │  ← circle, initials "KM", gray/white border
│  Karimova Malika            │  ← white bold
│  ● Ota-ona                  │  ← green dot + white/60
│                             │
├─────────────────────────────┤  ← rounded-t-3xl white panel
│  [Ma'lumotlar | Sozlamalar] │  ← segmented tab control (2 tabs)
│                             │
│  MA'LUMOTLAR tab:           │
│  ┌ info row ─────────────┐  │
│  │ 📱 TELEFON            │  │
│  │    +998 90 123 45 67  │  │
│  ├───────────────────────┤  │
│  │ 👤 O'QUVCHI           │  │
│  │    Karimov Alisher    │  │
│  ├───────────────────────┤  │
│  │ 📚 GURUH              │  │
│  │    English A2         │  │
│  ├───────────────────────┤  │
│  │ 🏢 FILIAL             │  │
│  │    Filial 1 — Yangihayot │
│  └───────────────────────┘  │
│                             │
│  SOZLAMALAR tab:            │
│  ┌ setting row ──────────┐  │
│  │ TIL / ЯЗЫК        [toggle UZ|RU] │
│  ├───────────────────────┤  │
│  │ Ilova versiyasi   1.0.0 │ │
│  └───────────────────────┘  │
└─────────────────────────────┘
```

Data source: use `demoParent` and `demoStudent` from `lib/mock-data.ts`.
The language toggle in Sozlamalar tab should call `setLang()` from `useLang()` — same toggle that already works in the header.
No sign-out button needed in v1.

Avatar: since there's no parent photo in mock data, use a circle with initials:
```tsx
<div className="w-20 h-20 rounded-full bg-white/20 border-2 border-white/30 flex items-center justify-center">
  <span className="text-white text-2xl font-bold">KM</span>
</div>
```

---

## 6. SIDEBAR DRAWER (OPTIONAL — build only if time allows)

A left-side drawer triggered by a hamburger `[≡]` button in the dark header.

Contents:
- App name + IQRO logo at top (dark background)
- Nav items: Bosh sahifa, Kurslar, Jadval, Profil
- Language toggle (UZ / RU pills)
- App version at bottom

If time is short, skip the drawer entirely. The hamburger button can be present in the header but non-functional for the demo. The LangToggle in the header already handles language switching.

---

## 7. COMPONENT CHANGES SUMMARY

| File | Change |
|------|--------|
| `components/shared/Header.tsx` | Rewrite to dark version. Accept a `variant` prop: `'dark'` (default) or `'light'`. |
| `components/shared/BottomNav.tsx` | Add center IQRO button (decorative). Restructure to 5-item layout. |
| `components/shared/LangToggle.tsx` | Add `variant` prop: `'dark'` (white text on dark bg) or `'light'` (current). |
| `components/shared/IqroLogo.tsx` | Keep as-is (Cormorant Garamond IQRO wordmark). |
| `components/shared/InstallPrompt.tsx` | Keep as-is. |
| `components/parent/AttendanceWidget.tsx` | Redesign day pills + today status. |
| `components/parent/HomeworkWidget.tsx` | Add left color accent bar, update due date pill. |
| `components/parent/PaymentWidget.tsx` | Large amount display, pill badge. |
| `components/parent/ScheduleWidget.tsx` | Section label + card style update. |
| `components/parent/StudentCard.tsx` | Remove — its content moves into the parent page dark hero. |
| `components/admin/BranchTabs.tsx` | Pill-style tabs (filled, not underline). |
| `components/admin/StatCard.tsx` | Dark variant for hero placement. |
| `components/admin/AttendanceChart.tsx` | Keep Recharts logic, update card wrapper. |
| `components/admin/PaymentsTable.tsx` | Update badge style (see section 2.5). |
| `app/profile/page.tsx` | CREATE NEW — full spec in section 5.7. |

---

## 8. GLOBALS.CSS ADDITIONS

Add these utility classes if not already present:

```css
/* Slide up animation for bottom sheets */
@keyframes slide-up {
  from { transform: translateY(100%); }
  to   { transform: translateY(0); }
}
.animate-slide-up {
  animation: slide-up 0.25s cubic-bezier(0.32, 0.72, 0, 1);
}

/* Fade in for page content */
@keyframes fade-in {
  from { opacity: 0; transform: translateY(8px); }
  to   { opacity: 1; transform: translateY(0); }
}
.animate-fade-in {
  animation: fade-in 0.3s ease-out;
}

/* Safe area for bottom nav */
.pb-safe {
  padding-bottom: env(safe-area-inset-bottom, 0px);
}
```

---

## 9. DO NOT BUILD IN THIS PASS

- Real authentication / login screen
- Push notifications
- QR code scanner functionality (center button is decorative only)
- Real Neon database connection
- Sidebar drawer (unless you finish everything else with time to spare)
- Any new pages beyond `/profile`
- Dark mode toggle (UI only — the app is light mode with a dark header pattern, not a full dark theme)
- Admin student management (add/edit/delete students)
- Payment processing

---

## 10. BUILD ORDER (recommended)

1. `globals.css` — add any missing animation utilities
2. `components/shared/BottomNav.tsx` — new 5-tab layout with center button
3. `components/shared/Header.tsx` — dark variant
4. `components/shared/LangToggle.tsx` — dark variant prop
5. `app/profile/page.tsx` — new page (fixes the 404 on Profile tab)
6. `app/page.tsx` — home page dark hero
7. `app/parent/page.tsx` — parent hero + widget restyling
8. All parent widgets (Attendance, Homework, Payment, Schedule)
9. `app/admin/page.tsx` — admin hero + branch tabs
10. Admin components (BranchTabs, StatCard)
11. `app/courses/page.tsx` and `app/courses/[id]/page.tsx`
12. `app/schedule/page.tsx`

Do a `npm run build` after completing steps 1–5 to catch TypeScript errors early. Then build and check again at the end.

---

## 11. QUICK REFERENCE — KEY PATHS

```
iqro-app/
├── _BRIEF/                   ← you are reading this
│   └── REDESIGN_BRIEF.md
├── app/
│   ├── page.tsx              ← Home
│   ├── parent/page.tsx       ← Parent Portal
│   ├── admin/page.tsx        ← Admin Dashboard
│   ├── courses/page.tsx      ← Course Catalog
│   ├── courses/[id]/page.tsx ← Course Detail
│   ├── schedule/page.tsx     ← Schedule Grid
│   └── profile/page.tsx      ← CREATE THIS
├── components/
│   ├── shared/               ← Header, BottomNav, LangToggle, etc.
│   ├── parent/               ← Attendance, Homework, Payment, Schedule widgets
│   └── admin/                ← BranchTabs, StatCard, Charts, Table
├── lib/
│   ├── mock-data.ts          ← DO NOT MODIFY
│   ├── i18n.ts               ← DO NOT MODIFY
│   └── i18n-context.tsx      ← DO NOT MODIFY
└── public/
    └── manifest.json         ← DO NOT MODIFY
```

---

## 12. DEFINITION OF DONE

The redesign is complete when:
- [ ] All 7 pages use the dark-top / white-body split layout
- [ ] Bottom nav has the 5-tab layout with decorative IQRO center button
- [ ] Profile page exists and doesn't 404
- [ ] Language toggle works on all screens (Uzbek ↔ Russian)
- [ ] ALL CAPS section labels appear before every content group
- [ ] Status badges are pill-shaped and consistent
- [ ] `npm run build` completes with 0 TypeScript errors
- [ ] App is visually tested on a 390px wide viewport (mobile)
