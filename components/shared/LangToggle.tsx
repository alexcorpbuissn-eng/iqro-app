'use client';

import { useLang } from '@/lib/i18n-context';
import { Lang } from '@/lib/i18n';

interface LangToggleProps {
  variant?: 'light' | 'dark';
}

export function LangToggle({ variant = 'light' }: LangToggleProps) {
  const { lang, setLang } = useLang();

  if (variant === 'dark') {
    return (
      <div className="flex items-center gap-0.5 bg-white/10 border border-white/20 rounded-xl px-1 py-1">
        {(['uz', 'ru'] as Lang[]).map((l) => (
          <button
            key={l}
            onClick={() => setLang(l)}
            className={`px-2.5 py-0.5 text-xs font-bold rounded-lg transition-all duration-150 ${
              lang === l
                ? 'bg-white text-[#111111]'
                : 'text-white/70 hover:text-white'
            }`}
            aria-pressed={lang === l}
          >
            {l.toUpperCase()}
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
      {(['uz', 'ru'] as Lang[]).map((l) => (
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
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
