'use client';

import { useLang } from '@/lib/i18n-context';
import { Lang } from '@/lib/i18n';

export function LangToggle() {
  const { lang, setLang } = useLang();

  const btn = (l: Lang, label: string) => (
    <button
      key={l}
      onClick={() => setLang(l)}
      className={`px-3 py-1 text-sm font-semibold rounded-md transition-all duration-200 ${
        lang === l
          ? 'bg-[#C0181B] text-white shadow-sm'
          : 'text-gray-500 hover:text-[#C0181B]'
      }`}
      aria-pressed={lang === l}
    >
      {label}
    </button>
  );

  return (
    <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
      {btn('uz', 'UZ')}
      {btn('ru', 'RU')}
    </div>
  );
}
