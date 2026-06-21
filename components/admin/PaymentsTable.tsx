'use client';

import { useLang } from '@/lib/i18n-context';
import { paymentsTableData, PaymentStatus } from '@/lib/mock-data';

interface PaymentsTableProps {
  branchId: number;
}

function StatusBadge({ status }: { status: PaymentStatus }) {
  const { t } = useLang();

  const config = {
    paid:    { cls: 'bg-green-100 text-green-700 border-green-200',  label: t('paid') },
    pending: { cls: 'bg-amber-100 text-amber-700 border-amber-200',  label: t('paymentPending') },
    overdue: { cls: 'bg-red-100 text-red-700 border-red-200',        label: t('overdue') },
  };

  const { cls, label } = config[status];

  return (
    <span className={`inline-flex items-center text-xs font-semibold px-2.5 py-0.5 rounded-full border ${cls}`}>
      {label}
    </span>
  );
}

export function PaymentsTable({ branchId }: PaymentsTableProps) {
  const { t } = useLang();
  const rows = paymentsTableData[branchId] ?? paymentsTableData[1];

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="px-5 pt-5 pb-3 border-b border-gray-50">
        <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-widest">
          {t('upcomingPayments')}
        </h3>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="text-left text-xs font-semibold text-gray-400 px-5 py-3 tracking-wide">
                {t('studentName')}
              </th>
              <th className="text-right text-xs font-semibold text-gray-400 px-3 py-3 tracking-wide">
                {t('amount')}
              </th>
              <th className="text-right text-xs font-semibold text-gray-400 px-3 py-3 tracking-wide hidden sm:table-cell">
                {t('dueOn')}
              </th>
              <th className="text-right text-xs font-semibold text-gray-400 px-5 py-3 tracking-wide">
                {t('status')}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {rows.map((row) => (
              <tr key={row.id} className="hover:bg-gray-50/50 transition-colors">
                <td className="px-5 py-3.5">
                  <span className="text-sm font-semibold text-[#1C1C2E]">{row.studentName}</span>
                </td>
                <td className="px-3 py-3.5 text-right">
                  <span className="text-sm font-bold text-[#1C1C2E] tabular-nums">
                    {row.amountUzs.toLocaleString('uz-UZ')}
                  </span>
                </td>
                <td className="px-3 py-3.5 text-right hidden sm:table-cell">
                  <span className="text-xs text-gray-500">{row.dueDateLabel}</span>
                </td>
                <td className="px-5 py-3.5 text-right">
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
