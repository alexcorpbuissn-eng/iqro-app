'use client';

import { useEffect, useState } from 'react';
import { useLang } from '@/lib/i18n-context';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export function InstallPrompt() {
  const { t } = useLang();
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const dismissed = localStorage.getItem('iqro_pwa_dismissed');
    if (dismissed) return;

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      // Show banner after 3 seconds
      setTimeout(() => setVisible(true), 3000);
    };

    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setVisible(false);
    }
    setDeferredPrompt(null);
  };

  const handleDismiss = () => {
    setVisible(false);
    localStorage.setItem('iqro_pwa_dismissed', '1');
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 animate-slide-up">
      <div className="max-w-2xl mx-auto px-4 pb-4">
        <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-4 flex items-center gap-4">
          {/* Icon */}
          <div className="w-12 h-12 bg-[#C0181B] rounded-xl flex items-center justify-center flex-shrink-0">
            <span className="text-white text-xs font-bold tracking-widest" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              IQ
            </span>
          </div>

          {/* Text */}
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-gray-900 leading-tight">
              {t('addToHomeScreen')}
            </p>
            <p className="text-xs text-gray-500 mt-0.5">IQRO</p>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={handleDismiss}
              className="text-xs text-gray-400 hover:text-gray-600 px-2 py-1 transition-colors"
              id="pwa-dismiss-btn"
            >
              {t('dismiss')}
            </button>
            <button
              onClick={handleInstall}
              className="bg-[#C0181B] hover:bg-[#8B1114] text-white text-sm font-semibold px-4 py-2 rounded-xl transition-colors duration-200"
              id="pwa-install-btn"
            >
              {t('addButton')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
