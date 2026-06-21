'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { LangToggle } from './LangToggle';

interface HeaderProps {
  /** 'back' shows ← arrow navigating back, 'menu' shows ≡ (non-functional), 'none' hides left control */
  left?: 'back' | 'menu' | 'none';
  /** Right slot — default is LangToggle */
  right?: React.ReactNode;
}

import { useSidebar } from '@/lib/sidebar-context';

export function DarkHeader({ left = 'menu', right }: HeaderProps) {
  const router = useRouter();
  const { open } = useSidebar();

  return (
    <div className="bg-[#111111] px-4 pt-4 pb-0">
      <div className="max-w-2xl mx-auto flex items-center justify-between h-12">
        {/* Left */}
        <div className="w-10 flex items-center">
          {left === 'back' && (
            <button
              onClick={() => router.back()}
              className="w-9 h-9 flex items-center justify-center rounded-xl bg-white/10 text-white hover:bg-white/20 transition-colors"
              aria-label="Back"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}
          {left === 'menu' && (
            <button
              onClick={open}
              className="w-9 h-9 flex items-center justify-center rounded-xl bg-white/10 text-white hover:bg-white/20 transition-colors"
              aria-label="Menu"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          )}
        </div>

        {/* Right */}
        <div>
          {right !== undefined ? right : <LangToggle variant="dark" />}
        </div>
      </div>
    </div>
  );
}

// Legacy light header (kept for any page that still uses it)
export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-2xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link href="/" className="inline-block">
          <span
            className="text-xl font-semibold text-[#C0181B] tracking-widest"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            IQRO
          </span>
        </Link>
        <LangToggle variant="light" />
      </div>
    </header>
  );
}
