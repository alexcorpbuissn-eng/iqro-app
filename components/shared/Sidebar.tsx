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
    { href: '/', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6', labelUz: 'Bosh sahifa', labelRu: 'Главная' },
    { href: '/parent', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z', labelUz: 'Ota-ona Kabineti', labelRu: 'Личный кабинет' },
    { href: '/admin', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z', labelUz: 'Admin Panel', labelRu: 'Панель администратора' },
    { href: '/courses', icon: 'M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222', labelUz: 'Kurslar', labelRu: 'Курсы' },
    { href: '/schedule', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z', labelUz: 'Jadval', labelRu: 'Расписание' },
    { href: '/profile', icon: 'M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z', labelUz: 'Profil', labelRu: 'Профиль' },
    { href: '/guide', icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253', labelUz: "Qo'llanma", labelRu: 'Руководство' },
  ];

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100]" 
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
                    active ? 'bg-white/10 text-white' : 'text-white/60 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <div className="w-6 flex items-center justify-center">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d={link.icon} />
                    </svg>
                  </div>
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
