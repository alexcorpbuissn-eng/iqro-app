'use client';

import { useState } from 'react';
import Link from 'next/link';
import { DarkHeader } from '@/components/shared/Header';
import { BottomNav } from '@/components/shared/BottomNav';
import { LangToggle } from '@/components/shared/LangToggle';
import { useLang } from '@/lib/i18n-context';
import { demoParent, demoStudent } from '@/lib/mock-data';

type ProfileTab = 'info' | 'settings';

// ── Info Row ────────────────────────────────────────────────────────────────
function InfoRow({ icon, label, value, last }: { icon: React.ReactNode; label: string; value: string; last?: boolean }) {
  return (
    <div className={`flex items-center gap-3 px-4 py-3.5 ${last ? '' : 'border-b border-gray-50'}`}>
      <div className="w-9 h-9 bg-gray-50 rounded-xl flex items-center justify-center flex-shrink-0 text-lg">
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest">{label}</p>
        <p className="text-sm font-semibold text-[#1C1C2E] mt-0.5 truncate">{value}</p>
      </div>
    </div>
  );
}

// ── Setting Row ─────────────────────────────────────────────────────────────
function SettingRow({ icon, label, right, last }: { icon: React.ReactNode; label: string; right: React.ReactNode; last?: boolean }) {
  return (
    <div className={`flex items-center gap-3 px-4 py-3.5 ${last ? '' : 'border-b border-gray-50'}`}>
      <div className="w-9 h-9 bg-gray-50 rounded-xl flex items-center justify-center flex-shrink-0 text-lg">
        {icon}
      </div>
      <p className="flex-1 text-sm font-semibold text-[#1C1C2E]">{label}</p>
      <div className="flex-shrink-0">{right}</div>
    </div>
  );
}

export default function ProfilePage() {
  const { t, lang } = useLang();
  const [activeTab, setActiveTab] = useState<ProfileTab>('info');

  const initials = demoParent.fullName
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  const tabLabels: Record<ProfileTab, string> = {
    info:     lang === 'ru' ? 'Мои данные'  : "Ma'lumotlar",
    settings: lang === 'ru' ? 'Настройки'   : 'Sozlamalar',
  };

  return (
    <div className="min-h-screen bg-[#F4F4F6] pb-24">
      {/* ── Dark hero ── */}
      <div className="bg-[#111111]">
        <DarkHeader left="menu" />

        <div className="max-w-2xl mx-auto px-4 pt-6 pb-8 flex flex-col items-center text-center animate-fade-in">
          {/* Avatar */}
          <div className="w-20 h-20 rounded-full bg-white/20 border-2 border-white/30 flex items-center justify-center mb-4">
            <span className="text-white text-2xl font-bold">{initials}</span>
          </div>

          {/* Name */}
          <h1 className="text-xl font-bold text-white">{demoParent.fullName}</h1>

          {/* Role */}
          <div className="flex items-center gap-1.5 mt-1.5">
            <div className="w-2 h-2 rounded-full bg-green-400" />
            <p className="text-white/60 text-sm">
              {lang === 'ru' ? 'Родитель' : "Ota-ona"}
            </p>
          </div>
        </div>
      </div>

      {/* ── White body ── */}
      <div className="bg-[#F4F4F6] rounded-t-3xl -mt-4 relative z-10 min-h-screen">
        <div className="max-w-2xl mx-auto px-4 pt-5 space-y-4 animate-fade-in">

          {/* ── Tab switcher ── */}
          <div className="bg-gray-100 rounded-2xl p-1 flex gap-1">
            {(['info', 'settings'] as ProfileTab[]).map((tab) => (
              <button
                key={tab}
                id={`profile-tab-${tab}`}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                  activeTab === tab
                    ? 'bg-white text-[#1C1C2E] shadow-sm'
                    : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                {tabLabels[tab]}
              </button>
            ))}
          </div>

          {/* ── MA'LUMOTLAR tab ── */}
          {activeTab === 'info' && (
            <div className="animate-fade-in">
              <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest px-1 mb-2">
                {lang === 'ru' ? 'ЛИЧНЫЕ ДАННЫЕ' : "SHAXSIY MA'LUMOTLAR"}
              </p>
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <InfoRow icon={<svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>} label={lang === 'ru' ? 'TELEFON' : 'TELEFON'}         value={demoParent.phone}         />
                <InfoRow icon={<svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>} label={lang === 'ru' ? "O'QUVCHI" : "O'QUVCHI"}      value={demoStudent.fullName}     />
                <InfoRow icon={<svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>} label={lang === 'ru' ? 'GURUH' : 'GURUH'}             value={demoStudent.group}        />
                <InfoRow icon={<svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-2 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>} label={lang === 'ru' ? 'FILIAL' : 'FILIAL'}           value={demoStudent.branch}  last />
              </div>

              <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest px-1 mb-2 mt-4">
                {lang === 'ru' ? 'O\'QITUVCHI' : "O'QITUVCHI"}
              </p>
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <InfoRow icon={<svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" /></svg>} label={lang === 'ru' ? 'ISM' : 'ISM'}                 value={demoStudent.teacher} last />
              </div>
            </div>
          )}

          {/* ── SOZLAMALAR tab ── */}
          {activeTab === 'settings' && (
            <div className="animate-fade-in">
              <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest px-1 mb-2">
                {lang === 'ru' ? 'НАСТРОЙКИ' : 'SOZLAMALAR'}
              </p>
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <SettingRow
                  icon={<svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /></svg>}
                  label={lang === 'ru' ? 'Til / Язык' : "Til / Язык"}
                  right={<LangToggle variant="light" />}
                />
                <SettingRow
                  icon={<svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>}
                  label={lang === 'ru' ? "Руководство" : "Qo'llanma"}
                  right={
                    <Link href="/guide" className="text-[#C0181B] text-sm font-semibold">
                      {lang === 'ru' ? 'Открыть →' : 'Ochish →'}
                    </Link>
                  }
                />
                <SettingRow
                  icon={<svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
                  label={lang === 'ru' ? 'Версия приложения' : 'Ilova versiyasi'}
                  right={<span className="text-sm text-gray-400 font-medium">1.0.0</span>}
                  last
                />
              </div>
            </div>
          )}

        </div>
      </div>

      <BottomNav />
    </div>
  );
}
