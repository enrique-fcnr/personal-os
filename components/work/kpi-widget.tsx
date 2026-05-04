interface KpiWidgetProps {
  label: string;
  value: string;
  color: string;
  barColor: string;
  bars: number[];
}

export default function KpiWidget({ label, value, color, barColor, bars }: KpiWidgetProps) {
  return (
    <div className="glass-card rounded-xl p-4">
      <div className="flex justify-between items-start mb-4">
        <p className="font-['Space_Grotesk'] text-[10px] text-white/40 uppercase tracking-widest leading-tight">
          {label}
        </p>
        <p className={`font-bayon text-xl leading-none ${color}`}>{value}</p>
      </div>
      <div className="flex items-end gap-1 h-10">
        {bars.map((h, i) => (
          <div
            key={i}
            className={`flex-1 rounded-t-sm ${barColor} opacity-70`}
            style={{ height: `${h}%` }}
          />
        ))}
      </div>
    </div>
  );
}
