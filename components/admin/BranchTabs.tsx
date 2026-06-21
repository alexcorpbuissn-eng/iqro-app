'use client';

import { useState } from 'react';
import { branches } from '@/lib/mock-data';
import { useLang } from '@/lib/i18n-context';

interface BranchTabsProps {
  activeBranch: number;
  onBranchChange: (id: number) => void;
}

export function BranchTabs({ activeBranch, onBranchChange }: BranchTabsProps) {
  const { t } = useLang();

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-2">
      <div className="flex gap-1">
        {branches.map((branch) => (
          <button
            key={branch.id}
            id={`branch-tab-${branch.id}`}
            onClick={() => onBranchChange(branch.id)}
            className={`flex-1 py-2.5 px-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
              activeBranch === branch.id
                ? 'bg-[#C0181B] text-white shadow-sm'
                : 'text-gray-500 hover:text-[#C0181B] hover:bg-red-50'
            }`}
          >
            {t('branchTab')} {branch.id}
          </button>
        ))}
      </div>
    </div>
  );
}
