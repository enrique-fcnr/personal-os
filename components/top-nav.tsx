import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

const NAV_LINKS = [
  { label: "Home",        href: "#", active: false },
  { label: "Performance", href: "#", active: true  },
  { label: "Wealth",      href: "#", active: false },
  { label: "Systems",     href: "#", active: false },
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

      {/* Hamburger */}
      <Button
        variant="ghost"
        size="icon"
        className="glass-effect text-white hover:text-brand-orange hover:bg-transparent rounded-lg"
      >
        <Menu className="w-5 h-5" />
      </Button>
    </header>
  );
}
