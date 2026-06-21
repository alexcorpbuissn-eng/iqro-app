interface StatCardProps {
  value: string;
  label: string;
  sublabel?: string;
  trend?: 'up' | 'down' | 'neutral';
  accent?: 'red' | 'green' | 'amber';
}

export function StatCard({ value, label, sublabel, trend, accent = 'red' }: StatCardProps) {
  const accentColors = {
    red:   { bar: 'bg-[#C0181B]', value: 'text-[#1C1C2E]' },
    green: { bar: 'bg-[#27AE60]', value: 'text-[#1C1C2E]' },
    amber: { bar: 'bg-amber-500', value: 'text-[#1C1C2E]' },
  };

  const trendIcon = {
    up:      { icon: '↑', cls: 'text-green-500' },
    down:    { icon: '↓', cls: 'text-red-500' },
    neutral: { icon: '→', cls: 'text-gray-400' },
  };

  const colors = accentColors[accent];

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex-1">
      <div className={`h-1 ${colors.bar}`} />
      <div className="p-4">
        <div className="flex items-start justify-between">
          <p className={`text-2xl font-bold ${colors.value} leading-none`}>{value}</p>
          {trend && (
            <span className={`text-sm font-bold ${trendIcon[trend].cls}`}>
              {trendIcon[trend].icon}
            </span>
          )}
        </div>
        <p className="text-xs font-semibold text-gray-500 mt-2 leading-snug">{label}</p>
        {sublabel && (
          <p className="text-xs text-gray-400 mt-0.5">{sublabel}</p>
        )}
      </div>
    </div>
  );
}
