'use client';

import { IqroLogo } from './IqroLogo';
import { LangToggle } from './LangToggle';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-2xl mx-auto px-4 h-14 flex items-center justify-between">
        <IqroLogo size="sm" />
        <LangToggle />
      </div>
    </header>
  );
}
