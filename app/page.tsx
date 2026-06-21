'use client';

import Link from 'next/link';
import { IqroLogo } from '@/components/shared/IqroLogo';
import { LangToggle } from '@/components/shared/LangToggle';
import { useLang } from '@/lib/i18n-context';

export default function LandingPage() {
  const { t } = useLang();

  return (
    <div className="min-h-screen bg-[#F7F7F9] flex flex-col">
      {/* Top bar - lang toggle only */}
      <div className="w-full flex justify-end px-6 pt-6">
        <LangToggle />
      </div>

      {/* Main content */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 pb-16 animate-fade-in">
        {/* Logo — large, centered */}
        <div className="mb-8">
          <IqroLogo size="lg" />
        </div>

        {/* Tagline */}
        <p className="text-[#1C1C2E] text-xl font-bold text-center leading-tight max-w-xs mb-2">
          {t('landingHeadline')}
        </p>
        <p className="text-gray-500 text-sm text-center max-w-xs mb-12">
          {t('landingSubtitle')}
        </p>

        {/* CTA Buttons */}
        <div className="w-full max-w-xs space-y-4">
          {/* Parent portal — primary */}
          <Link
            href="/parent"
            id="cta-parent-portal"
            className="block w-full bg-[#C0181B] hover:bg-[#8B1114] active:scale-[0.98] text-white text-center font-bold text-lg py-4 rounded-2xl shadow-lg shadow-red-200 transition-all duration-200"
          >
            {t('parentPortal')}
          </Link>

          {/* Admin panel — secondary */}
          <Link
            href="/admin"
            id="cta-admin-panel"
            className="block w-full bg-white hover:bg-gray-50 active:scale-[0.98] text-[#1C1C2E] text-center font-bold text-lg py-4 rounded-2xl shadow-sm border border-gray-200 transition-all duration-200"
          >
            {t('adminPanel')}
          </Link>
        </div>

        {/* Branches indicator */}
        <div className="mt-12 flex items-center gap-2">
          <div className="flex -space-x-1">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="w-6 h-6 rounded-full bg-[#C0181B] border-2 border-white flex items-center justify-center"
              >
                <span className="text-[9px] font-bold text-white">{i}</span>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-400">3 ta filial — Yangihayot</p>
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center pb-8">
        <p className="text-xs text-gray-300">© 2026 IQRO Academy</p>
      </footer>
    </div>
  );
}
