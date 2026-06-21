'use client';

import { useLang } from '@/lib/i18n-context';
import { PaymentStatus } from '@/lib/mock-data';

interface PaymentRow {
  id: number;
  studentName: string;
  amountUzs: number;
  dueDateLabel: string;
  status: PaymentStatus;
}

interface PaymentsTableProps {
  rows: PaymentRow[];
}

function StatusBadge({ status }: { status: PaymentStatus }) {
  const { lang } = useLang();

  const config: Record<PaymentStatus, { cls: string; uz: string; ru: string }> = {
    paid:    { cls: 'bg-green-100 text-green-700', uz: "TO'LANGAN",     ru: 'ОПЛАЧЕНО'  },
    pending: { cls: 'bg-amber-100 text-amber-700', uz: 'KUTILMOQDA',    ru: 'ОЖИДАЕТСЯ' },
    overdue: { cls: 'bg-red-100 text-red-700',     uz: "MUDDATI O'TGAN", ru: 'ПРОСРОЧЕН' },
  };

  const { cls, uz, ru } = config[status];

  return (
    <span className={`${cls} text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wide whitespace-nowrap`}>
      {lang === 'ru' ? ru : uz}
    </span>
  );
}

export function PaymentsTable({ rows }: PaymentsTableProps) {
  const { t, lang } = useLang();

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              <th className="text-left text-[10px] font-semibold text-gray-400 uppercase tracking-widest px-4 py-3">
                {t('studentName')}
              </th>
              <th className="text-right text-[10px] font-semibold text-gray-400 uppercase tracking-widest px-3 py-3">
                {t('amount')}
              </th>
              <th className="text-right text-[10px] font-semibold text-gray-400 uppercase tracking-widest px-4 py-3">
                {t('status')}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {rows.map((row) => (
              <tr key={row.id} className="hover:bg-gray-50/50 transition-colors">
                <td className="px-4 py-3.5">
                  <p className="text-sm font-semibold text-[#1C1C2E] leading-tight">{row.studentName}</p>
                  <p className="text-[10px] text-gray-400 mt-0.5">{row.dueDateLabel}</p>
                </td>
                <td className="px-3 py-3.5 text-right">
                  <span className="text-sm font-bold text-[#1C1C2E] tabular-nums">
                    {row.amountUzs.toLocaleString('uz-UZ')}
                  </span>
                  <p className="text-[10px] text-gray-400">{lang === 'ru' ? 'сум' : "so'm"}</p>
                </td>
                <td className="px-4 py-3.5 text-right">
                  <StatusBadge status={row.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
