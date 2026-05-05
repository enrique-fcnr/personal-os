import Link from "next/link";
import { Briefcase, BookOpen, Dumbbell, Heart, Apple, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { icon: Briefcase, label: "Work", href: "/work", active: true },
  { icon: BookOpen, label: "Study", href: "#" },
  { icon: Dumbbell, label: "Peak Performance", href: "#" },
  { icon: TrendingUp, label: "Wealth", href: "#" },
  { icon: Apple, label: "Nutrition", href: "#" },
  { icon: Heart, label: "Relationships", href: "#" },
];

export default function WorkSidebar() {
  return (
    <aside className="w-20 lg:w-64 border-r border-white/10 h-screen sticky top-0 bg-brand-dark/80 backdrop-blur-2xl flex flex-col py-8 shadow-[0_0_20px_rgba(36,113,231,0.1)] shrink-0">
      <Link href="/" className="px-6 mb-10 block hover:opacity-70 transition-opacity">
        <div className="lg:hidden flex items-center justify-center">
          <div className="w-8 h-8 rounded-lg bg-brand-blue/20 border border-brand-blue/30 flex items-center justify-center">
            <span className="text-brand-blue text-xs font-bold font-inter">P</span>
          </div>
        </div>
        <h1 className="hidden lg:block text-xl font-black tracking-tighter text-white font-inter">
          Personal OS
        </h1>
        <p className="hidden lg:block text-[10px] uppercase tracking-wider text-white/40 font-inter">
          V-4.0 Stable
        </p>
      </Link>

      <nav className="flex-1 space-y-1 px-3">
        {NAV_ITEMS.map(({ icon: Icon, label, href, active }) => (
          <Link
            key={label}
            href={href}
            className={cn(
              "flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200 border-l-2",
              active
                ? "border-brand-blue bg-brand-blue/10 text-brand-blue"
                : "border-transparent text-white/40 hover:text-white/80 hover:bg-white/5"
            )}
          >
            <Icon className="w-5 h-5 shrink-0" />
            <span className="hidden lg:block font-inter uppercase tracking-wider text-[10px]">
              {label}
            </span>
          </Link>
        ))}
      </nav>

      <div className="px-4 mb-6 mt-4">
        <button className="w-full bg-brand-orange text-white font-inter text-[10px] uppercase tracking-widest py-3 rounded-sm hover:brightness-110 transition-all active:scale-95">
          <span className="hidden lg:inline">Launch Deep Work</span>
          <span className="lg:hidden text-base">▶</span>
        </button>
      </div>

      <div className="px-3 border-t border-white/5 pt-4">
        <div className="flex items-center gap-3 px-3 py-2">
          <div className="w-8 h-8 rounded-full overflow-hidden border border-white/20 shrink-0">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=64&h=64&fit=crop&crop=face&q=80"
              alt="User"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="hidden lg:block">
            <p className="text-[10px] font-bold text-white leading-tight font-inter">
              Executive Profile
            </p>
            <p className="text-[8px] text-white/40 tracking-wider font-inter">STATUS: ONLINE</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
