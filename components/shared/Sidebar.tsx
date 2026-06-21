'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSidebar } from '@/lib/sidebar-context';
import { useLang } from '@/lib/i18n-context';
import { LangToggle } from '@/components/shared/LangToggle';
import { demoParent } from '@/lib/mock-data';

export function Sidebar() {
  const { isOpen, close } = useSidebar();
  const { lang } = useLang();
  const pathname = usePathname();

  if (!isOpen) return null;

  const initials = demoParent.fullName
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  const links = [
    { href: '/', icon: '🏠', labelUz: 'Bosh sahifa', labelRu: 'Главная' },
    { href: '/parent', icon: '📱', labelUz: 'Ota-ona Kabineti', labelRu: 'Личный кабинет' },
    { href: '/admin', icon: '📊', labelUz: 'Admin Panel', labelRu: 'Панель администратора' },
    { href: '/courses', icon: '📚', labelUz: 'Kurslar', labelRu: 'Курсы' },
    { href: '/schedule', icon: '📅', labelUz: 'Jadval', labelRu: 'Расписание' },
    { href: '/profile', icon: '👤', labelUz: 'Profil', labelRu: 'Профиль' },
    { href: '/guide', icon: '📖', labelUz: "Qo'llanma", labelRu: 'Руководство' },
  ];

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 z-[100]" 
        onClick={close}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div className="fixed top-0 left-0 h-full w-72 bg-[#111111] z-[101] flex flex-col animate-slide-in-left shadow-2xl">
        {/* Header */}
        <div className="h-16 flex items-center justify-between px-5 border-b border-white/5 shrink-0">
          <span
            className="text-2xl font-semibold text-white tracking-widest"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            IQRO
          </span>
          <button 
            onClick={close}
            className="w-8 h-8 flex items-center justify-center rounded-lg text-white/50 hover:text-white hover:bg-white/10 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Nav items */}
        <div className="flex-1 overflow-y-auto py-4">
          <div className="flex flex-col space-y-1">
            {links.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={close}
                  className={`flex items-center gap-3 px-5 py-3.5 transition-colors ${
                    active ? 'bg-white/10 text-white' : 'text-white/80 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span className="text-xl w-6 text-center">{link.icon}</span>
                  <span className="flex-1 text-sm font-medium">
                    {lang === 'ru' ? link.labelRu : link.labelUz}
                  </span>
                  <svg className="w-4 h-4 text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Bottom section */}
        <div className="p-5 border-t border-white/5 shrink-0">
          <div className="mb-4">
            <p className="text-[10px] font-semibold text-white/40 uppercase tracking-widest mb-2">
              {lang === 'ru' ? 'ЯЗЫК / TIL' : 'TIL / ЯЗЫК'}
            </p>
            <LangToggle variant="dark" />
          </div>

          {/* User Card */}
          <div className="bg-white/10 rounded-2xl p-3 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
              <span className="text-white text-sm font-bold">{initials}</span>
            </div>
            <div className="min-w-0">
              <p className="text-sm font-bold text-white truncate">{demoParent.fullName}</p>
              <p className="text-xs text-white/50 truncate">
                {lang === 'ru' ? 'Родитель' : 'Ota-ona'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
