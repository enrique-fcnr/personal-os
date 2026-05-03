import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        /* shadcn CSS variable tokens */
        background:  "var(--background)",
        foreground:  "var(--foreground)",
        border:      "var(--border)",
        input:       "var(--input)",
        ring:        "var(--ring)",
        card: {
          DEFAULT:    "var(--card)",
          foreground: "var(--card-foreground)",
        },
        popover: {
          DEFAULT:    "var(--popover)",
          foreground: "var(--popover-foreground)",
        },
        primary: {
          DEFAULT:    "var(--primary)",
          foreground: "var(--primary-foreground)",
        },
        secondary: {
          DEFAULT:    "var(--secondary)",
          foreground: "var(--secondary-foreground)",
        },
        muted: {
          DEFAULT:    "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
        accent: {
          DEFAULT:    "var(--accent)",
          foreground: "var(--accent-foreground)",
        },
        destructive: {
          DEFAULT:    "var(--destructive)",
        },
        /* Brand palette */
        brand: {
          orange: "#E6701E",
          blue:   "#2471E7",
          sky:    "#5BB3FD",
          dark:   "#0A1C40",
        },
      },
      fontFamily: {
        bayon: ["var(--font-bayon)", ...fontFamily.sans],
        inter: ["var(--font-inter)", ...fontFamily.sans],
      },
      keyframes: {
        "glow-pulse": {
          "0%, 100%": { boxShadow: "0 0 12px 2px rgba(230,112,30,0.35)" },
          "50%":       { boxShadow: "0 0 28px 8px rgba(230,112,30,0.6)" },
        },
        "fade-in-up": {
          "0%":   { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "glow-pulse": "glow-pulse 2.5s ease-in-out infinite",
        "fade-in-up": "fade-in-up 0.4s ease-out forwards",
      },
    },
  },
  plugins: [],
};

export default config;
