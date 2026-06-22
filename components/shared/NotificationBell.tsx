'use client';
import { useState } from 'react';
import { useLang } from '@/lib/i18n-context';
import { mockNotifications } from '@/lib/mock-data';

export function NotificationBell() {
  const [open, setOpen] = useState(false);
  const { lang } = useLang();
  const unread = mockNotifications.filter(n => !n.read).length;

  const typeIcon = (type: string) => {
    if (type === 'absent') return (
      <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
        <svg className="w-4 h-4 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </div>
    );
    return (
      <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
        <svg className="w-4 h-4 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
    );
  };

  return (
    <div className="relative">
      {/* Bell button */}
      <button
        onClick={() => setOpen(o => !o)}
        className="relative w-9 h-9 flex items-center justify-center rounded-xl bg-white/10 border border-white/20"
      >
        <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
        {unread > 0 && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#C0181B] rounded-full flex items-center justify-center">
            <span className="text-white text-[9px] font-bold">{unread}</span>
          </span>
        )}
      </button>

      {/* Dropdown */}
      {open && (
        <>
          {/* Backdrop */}
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          
          {/* Panel */}
          <div className="absolute right-0 top-11 w-72 bg-white rounded-2xl shadow-xl border border-gray-100 z-50 overflow-hidden animate-fade-in">
            <div className="px-4 py-3 border-b border-gray-50">
              <p className="text-xs font-bold text-[#1C1C2E]">
                {lang === 'ru' ? 'Уведомления' : 'Bildirishnomalar'}
              </p>
            </div>
            <div className="divide-y divide-gray-50">
              {mockNotifications.map(n => (
                <div key={n.id} className="flex items-start gap-3 px-4 py-3">
                  {typeIcon(n.type)}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-[#1C1C2E] leading-snug">
                      {lang === 'ru' ? n.titleRu : n.titleUz}
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">{n.timeLabel}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
