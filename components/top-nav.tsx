import { Button } from "@/components/ui/button";
import { LogIn } from "lucide-react";

const NAV_LINKS = [
  { label: "Home",    href: "#", active: true  },
  { label: "Monthly", href: "#", active: false },
  { label: "Annual",  href: "#", active: false },
  { label: "Vision",  href: "#", active: false },
];

export default function TopNav() {
  return (
    <header className="w-full px-8 py-5 flex justify-between items-center">
      {/* Logo */}
      <div className="flex items-center gap-3">
        <svg
          className="w-8 h-8 text-brand-orange"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
          viewBox="0 0 24 24"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M12 2v20M2 12h20" strokeLinecap="round" />
        </svg>
        <span className="font-bayon text-xl tracking-[0.25em] text-white uppercase">
          Command Center
        </span>
      </div>

      {/* Desktop nav */}
      <nav className="hidden md:flex items-center gap-10">
        {NAV_LINKS.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className={[
              "text-xs font-inter font-medium tracking-[0.2em] uppercase transition-colors",
              link.active
                ? "text-brand-orange border-b border-brand-orange pb-0.5"
                : "text-white/60 hover:text-white",
            ].join(" ")}
          >
            {link.label}
          </a>
        ))}
      </nav>

      {/* Login */}
      <Button
        variant="ghost"
        className="glass-effect text-white hover:text-brand-orange hover:bg-transparent rounded-lg gap-2 px-4 text-xs font-inter font-medium tracking-[0.2em] uppercase"
      >
        <LogIn className="w-4 h-4" />
        Login
      </Button>
    </header>
  );
}
