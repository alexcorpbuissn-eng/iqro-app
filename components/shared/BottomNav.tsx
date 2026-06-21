'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLang } from '@/lib/i18n-context';
import { useSidebar } from '@/lib/sidebar-context';

// ── SVG Icons ────────────────────────────────────────────────────────────────
const HomeIcon = ({ active }: { active: boolean }) => (
  <svg className="w-5 h-5" fill={active ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={active ? 0 : 1.8}>
    {active
      ? <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
      : <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    }
  </svg>
);

const CoursesIcon = ({ active }: { active: boolean }) => (
  <svg className="w-5 h-5" fill={active ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={active ? 0 : 1.8}>
    {active
      ? <><path d="M12 14l9-5-9-5-9 5 9 5z" /><path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" /></>
      : <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
    }
  </svg>
);

const ScheduleIcon = ({ active }: { active: boolean }) => (
  <svg className="w-5 h-5" fill={active ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={active ? 0 : 1.8}>
    {active
      ? <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
      : <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    }
  </svg>
);

const ProfileIcon = ({ active }: { active: boolean }) => (
  <svg className="w-5 h-5" fill={active ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={active ? 0 : 1.8}>
    {active
      ? <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
      : <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    }
  </svg>
);

// ── Nav items ────────────────────────────────────────────────────────────────
interface NavTab {
  href: string;
  labelKey: 'navHome' | 'navCourses' | 'navSchedule' | 'navProfile';
  Icon: (props: { active: boolean }) => React.JSX.Element;
  id: string;
}

const LEFT_TABS: NavTab[] = [
  { href: '/',        labelKey: 'navHome',    Icon: HomeIcon,    id: 'nav-home'    },
  { href: '/courses', labelKey: 'navCourses', Icon: CoursesIcon, id: 'nav-courses' },
];

const RIGHT_TABS: NavTab[] = [
  { href: '/schedule', labelKey: 'navSchedule', Icon: ScheduleIcon, id: 'nav-schedule' },
  { href: '/profile',  labelKey: 'navProfile',  Icon: ProfileIcon,  id: 'nav-profile'  },
];


export function BottomNav() {
  const pathname = usePathname();
  const { t } = useLang();
  const { isOpen } = useSidebar();

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  const TabItem = ({ href, labelKey, Icon, id }: NavTab) => {
    const active = isActive(href);
    return (
      <Link
        href={href}
        id={id}
        className={`flex-1 flex flex-col items-center justify-center gap-0.5 py-2 transition-colors relative ${
          active ? 'text-[#C0181B]' : 'text-gray-400 hover:text-gray-500'
        }`}
      >
        <Icon active={active} />
        <span className="text-[9px] font-semibold leading-none tracking-wide">
          {t(labelKey)}
        </span>
      </Link>
    );
  };

  return (
    <nav className={`fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-100 pb-safe shadow-[0_-2px_16px_rgba(0,0,0,0.06)] ${isOpen ? 'hidden' : ''}`}>
      <div className="max-w-2xl mx-auto flex items-end h-16">

        {/* Left tabs */}
        {LEFT_TABS.map((tab) => (
          <TabItem key={tab.href} {...tab} />
        ))}

        {/* Center decorative IQRO button */}
        <div className="flex-1 flex flex-col items-center justify-end pb-2">
          <div
            className="w-14 h-14 rounded-full bg-[#C0181B] shadow-lg shadow-red-300/50 -mt-5 flex items-center justify-center pointer-events-none select-none"
            aria-hidden="true"
          >
            <span
              className="text-white text-sm font-semibold tracking-widest"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              IQRO
            </span>
          </div>
        </div>

        {/* Right tabs */}
        {RIGHT_TABS.map((tab) => (
          <TabItem key={tab.href} {...tab} />
        ))}

      </div>
    </nav>
  );
}
