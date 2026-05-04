import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

const TABS = ["Network", "Activity", "Security"];
const ACTIVE_TAB = "Activity";

export default function WorkHeader() {
  return (
    <header className="h-16 border-b border-white/10 bg-brand-dark/60 backdrop-blur-3xl flex items-center justify-between px-6 shrink-0 z-50">
      {/* Left */}
      <div className="flex items-center gap-6">
        <div>
          <p className="text-[9px] text-white/30 font-['Space_Grotesk'] uppercase tracking-widest leading-none mb-0.5">
            Personal OS / Work
          </p>
          <h2 className="font-bayon text-lg text-white uppercase leading-tight tracking-wide">
            System Terminal
          </h2>
        </div>
        <div className="hidden md:flex items-center bg-white/5 border border-white/10 rounded-full px-4 py-1.5 w-56 gap-2 focus-within:border-brand-blue/40 transition-all">
          <Search className="w-3.5 h-3.5 text-white/30 shrink-0" />
          <input
            className="bg-transparent border-none focus:ring-0 text-xs text-white/80 placeholder:text-white/20 w-full outline-none"
            placeholder="Search projects..."
          />
        </div>
      </div>

      {/* Center tabs */}
      <nav className="hidden lg:flex items-center h-full">
        {TABS.map((tab) => (
          <a
            key={tab}
            href="#"
            className={cn(
              "px-5 h-full flex items-center font-['Space_Grotesk'] text-sm transition-colors border-b-2",
              tab === ACTIVE_TAB
                ? "text-brand-blue border-brand-blue"
                : "text-white/50 hover:text-white/80 border-transparent"
            )}
          >
            {tab}
          </a>
        ))}
      </nav>

      {/* Right */}
      <div className="flex items-center gap-2">
        <button className="bg-brand-blue text-white font-['Space_Grotesk'] text-xs font-bold px-5 py-1.5 rounded-sm hover:brightness-110 transition-all">
          Deploy
        </button>
        <button className="border border-white/10 text-white/60 font-['Space_Grotesk'] text-xs font-bold px-5 py-1.5 rounded-sm hover:bg-white/5 transition-all">
          Logs
        </button>
      </div>
    </header>
  );
}
