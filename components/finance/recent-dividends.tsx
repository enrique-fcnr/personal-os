const DIVIDENDS = [
  { ticker: "AAPL", name: "Apple Inc.",      type: "Dividendo",  date: "14 Jan", value: "+$ 142,50",   color: "bg-brand-blue"   },
  { ticker: "HGLG", name: "HGLG11",          type: "Rendimento", date: "12 Jan", value: "+R$ 840,00",  color: "bg-brand-orange" },
  { ticker: "VTI",  name: "Vanguard Total",  type: "Dividendo",  date: "08 Jan", value: "+$ 310,22",   color: "bg-brand-sky"    },
];

export default function RecentDividends() {
  return (
    <div className="glass-card rounded-2xl p-5">
      <p className="font-inter uppercase tracking-widest text-[10px] text-white/60 mb-5">
        Proventos Recentes
      </p>

      <div className="flex flex-col gap-4">
        {DIVIDENDS.map((item) => (
          <div key={item.ticker} className="flex items-center gap-3">
            <div
              className={`w-10 h-10 rounded-lg flex items-center justify-center text-white font-inter text-[10px] font-bold shrink-0 ${item.color}`}
            >
              {item.ticker}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-inter text-sm text-white/80">{item.name}</p>
              <p className="font-inter text-[10px] text-white/30 uppercase tracking-wider mt-0.5">
                {item.type} • {item.date}
              </p>
            </div>
            <p className="font-inter text-sm text-green-400 font-medium shrink-0">{item.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
