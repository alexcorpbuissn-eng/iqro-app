'use client';

import { useState } from 'react';
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
function SettingRow({ icon, label, right, last }: { icon: string; label: string; right: React.ReactNode; last?: boolean }) {
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
    info:     lang === 'ru' ? "Ma'lumotlar" : "Ma'lumotlar",
    settings: lang === 'ru' ? 'Sozlamalar'  : 'Sozlamalar',
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
                <InfoRow icon="📱" label={lang === 'ru' ? 'TELEFON' : 'TELEFON'}         value={demoParent.phone}         />
                <InfoRow icon="👤" label={lang === 'ru' ? "O'QUVCHI" : "O'QUVCHI"}      value={demoStudent.fullName}     />
                <InfoRow icon="📚" label={lang === 'ru' ? 'GURUH' : 'GURUH'}             value={demoStudent.group}        />
                <InfoRow icon="🏢" label={lang === 'ru' ? 'FILIAL' : 'FILIAL'}           value={demoStudent.branch}  last />
              </div>

              <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest px-1 mb-2 mt-4">
                {lang === 'ru' ? 'O\'QITUVCHI' : "O'QITUVCHI"}
              </p>
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <InfoRow icon="🎓" label={lang === 'ru' ? 'ISM' : 'ISM'}                 value={demoStudent.teacher} last />
              </div>
            </div>
          )}

          {/* ── SOZLAMALAR tab ── */}
          {activeTab === 'settings' && (
            <div className="animate-fade-in">
              <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest px-1 mb-2">
                {lang === 'ru' ? 'SOZLAMALAR' : 'SOZLAMALAR'}
              </p>
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <SettingRow
                  icon="🌐"
                  label={lang === 'ru' ? 'Til / Язык' : "Til / Язык"}
                  right={<LangToggle variant="light" />}
                />
                <SettingRow
                  icon="ℹ️"
                  label={lang === 'ru' ? 'Ilova versiyasi' : 'Ilova versiyasi'}
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
