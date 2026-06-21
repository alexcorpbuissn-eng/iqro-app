'use client';

import { useLang } from '@/lib/i18n-context';
import { demoPayment } from '@/lib/mock-data';

const statusConfig = {
  pending: { cls: 'bg-amber-100 text-amber-700', uz: 'KUTILMOQDA', ru: 'ОЖИДАЕТСЯ' },
  overdue: { cls: 'bg-red-100 text-red-700',     uz: "MUDDATI O'TGAN", ru: 'ПРОСРОЧЕН' },
  paid:    { cls: 'bg-green-100 text-green-700', uz: "TO'LANGAN",  ru: 'ОПЛАЧЕНО'  },
};

export function PaymentWidget() {
  const { lang } = useLang();
  const cfg = statusConfig[demoPayment.status];

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 px-5 py-5">
      {/* Amount — large */}
      <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-1">
        {lang === 'ru' ? "TO'LOV MIQDORI" : "TO'LOV MIQDORI"}
      </p>
      <p className="text-3xl font-bold text-[#1C1C2E] tracking-tight">
        {demoPayment.amountUzs.toLocaleString('uz-UZ')}
        <span className="text-base font-medium text-gray-400 ml-2">
          {lang === 'ru' ? 'сум' : "so'm"}
        </span>
      </p>

      {/* Divider */}
      <div className="border-t border-gray-50 mt-4 pt-4 flex items-center justify-between">
        <div>
          <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-0.5">
            {lang === 'ru' ? 'MUDDATI' : 'MUDDATI'}
          </p>
          <p className="text-sm font-semibold text-[#1C1C2E]">
            {lang === 'ru' ? demoPayment.dueDateLabelRu : demoPayment.dueDateLabel}
          </p>
        </div>
        <span className={`${cfg.cls} text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wide`}>
          {cfg[lang]}
        </span>
      </div>
    </div>
  );
}
