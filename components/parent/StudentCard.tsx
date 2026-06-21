'use client';

import Image from 'next/image';
import { demoStudent } from '@/lib/mock-data';
import { useLang } from '@/lib/i18n-context';

export function StudentCard() {
  const { t } = useLang();

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Red accent bar */}
      <div className="h-1.5 bg-[#C0181B]" />

      <div className="p-5">
        <div className="flex items-center gap-4">
          {/* Avatar */}
          <div className="relative w-16 h-16 rounded-2xl overflow-hidden bg-gray-100 flex-shrink-0 shadow-sm">
            <Image
              src={demoStudent.photoUrl}
              alt={demoStudent.fullName}
              fill
              className="object-cover"
              unoptimized
            />
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <h2 className="font-bold text-[#1C1C2E] text-lg leading-tight truncate">
              {demoStudent.fullName}
            </h2>
            <p className="text-sm text-gray-500 mt-0.5 truncate">{demoStudent.age} {t('age')}</p>
            <div className="mt-2 flex flex-wrap gap-1.5">
              <span className="inline-flex items-center text-xs bg-red-50 text-[#C0181B] font-medium px-2.5 py-0.5 rounded-full border border-red-100">
                {demoStudent.branchShort}
              </span>
            </div>
          </div>
        </div>

        {/* Details */}
        <div className="mt-4 pt-4 border-t border-gray-50 grid grid-cols-2 gap-3">
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-wide font-medium">{t('group')}</p>
            <p className="text-sm font-semibold text-[#1C1C2E] mt-0.5 leading-snug">{demoStudent.group}</p>
          </div>
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-wide font-medium">{t('teacher')}</p>
            <p className="text-sm font-semibold text-[#1C1C2E] mt-0.5">{demoStudent.teacher}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
