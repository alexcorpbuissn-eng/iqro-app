'use client';

import { useLang } from '@/lib/i18n-context';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Cell,
} from 'recharts';

interface ChartEntry {
  day: string;
  dayRu: string;
  pct: number | null;
}

interface AttendanceChartProps {
  data: ChartEntry[];
}

export function AttendanceChart({ data }: AttendanceChartProps) {
  const { lang } = useLang();

  const chartData = data.map((d) => ({
    day: lang === 'ru' ? d.dayRu : d.day,
    pct: d.pct,
  }));

  const CustomTooltip = ({
    active, payload, label,
  }: { active?: boolean; payload?: { value: number }[]; label?: string }) => {
    if (active && payload && payload.length && payload[0].value != null) {
      return (
        <div className="bg-[#1C1C2E] text-white text-xs px-3 py-2 rounded-lg shadow-lg">
          <p className="font-semibold">{label}</p>
          <p className="text-gray-300">{payload[0].value}%</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
      <div className="h-40">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 0, right: 4, left: -20, bottom: 0 }} barSize={28}>
            <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" vertical={false} />
            <XAxis
              dataKey="day"
              tick={{ fontSize: 11, fill: '#9CA3AF', fontWeight: 600 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              domain={[0, 100]}
              tick={{ fontSize: 11, fill: '#9CA3AF' }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => `${v}%`}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: '#F9FAFB' }} />
            <Bar dataKey="pct" radius={[6, 6, 0, 0]}>
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.pct == null ? '#E5E7EB' : '#C0181B'}
                  opacity={entry.pct == null ? 0.4 : 1}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
