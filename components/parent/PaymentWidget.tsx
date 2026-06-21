'use client';

import { useLang } from '@/lib/i18n-context';
import { demoPayment } from '@/lib/mock-data';

export function PaymentWidget() {
  const { t, lang } = useLang();

  const formattedAmount = demoPayment.amountUzs.toLocaleString('uz-UZ');

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Amber accent for pending */}
      <div className="h-1.5 bg-amber-400" />

      <div className="p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-widest">
            {t('nextPayment')}
          </h3>
          <span className="bg-amber-100 text-amber-700 text-xs font-semibold px-2.5 py-1 rounded-full border border-amber-200">
            {t('paymentPending')}
          </span>
        </div>

        <div className="flex items-end justify-between">
          {/* Amount */}
          <div>
            <p className="text-3xl font-bold text-[#1C1C2E] tracking-tight">
              {formattedAmount}
            </p>
            <p className="text-sm text-gray-500 mt-0.5">{t('currency')}</p>
          </div>

          {/* Due date */}
          <div className="text-right">
            <p className="text-xs text-gray-400 font-medium">{t('due')}</p>
            <p className="text-sm font-bold text-[#1C1C2E] mt-0.5">
              {lang === 'ru' ? demoPayment.dueDateLabelRu : demoPayment.dueDateLabel}
            </p>
          </div>
        </div>

        {/* Month label */}
        <div className="mt-4 pt-4 border-t border-gray-50">
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <span className="text-xs text-gray-500">
              {lang === 'ru' ? demoPayment.monthLabelRu : demoPayment.monthLabel}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
