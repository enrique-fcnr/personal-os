# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # dev server (auto-selects port if 3000 is busy)
npm run build    # production build
npm run lint     # ESLint
npx tsc --noEmit # type-check without emitting
```

No test runner is configured.

## Architecture

Single-page dashboard (`app/page.tsx`) that owns all state. The active segment ID drives three derived effects simultaneously — no prop drilling beyond one level:

```
lib/data.ts (SEGMENTS array)
    └── app/page.tsx  ← useState(activeId)
            ├── activeSegment.heroBackground → style prop on <main> (CSS gradient swap)
            ├── <SegmentGallery segments activeId onSelect />
            └── <ActiveSegmentDetails segment />   ← receives full Segment object
```

**Adding a new segment:** add one entry to `SEGMENTS` in `lib/data.ts`. The gallery, detail panel, and hero background all update automatically. No other files need changing.

## Design System

**Fonts** — injected as CSS variables via `next/font` in `app/layout.tsx`:
- `--font-bayon` → `font-bayon` Tailwind class (display/headings, weight 400 only)
- `--font-inter` → `font-inter` Tailwind class (UI text)

**Brand palette** (in `tailwind.config.ts` under `colors.brand`):
- `brand-orange` `#E6701E` — active states, CTAs, accent glow
- `brand-blue` `#2471E7` — Work segment accent
- `brand-sky` `#5BB3FD` — Study segment accent, glass border tint
- `brand-dark` `#0A1C40` — base background color

**Glass utilities** (defined in `app/globals.css` `@layer utilities`, not in Tailwind config):
- `.glass-effect` — semi-transparent dark fill + `backdrop-filter: blur(12px)`
- `.glass-card-active` — orange border + multi-layer glow; apply alongside `animate-glow-pulse`

**shadcn/ui notes** — this project uses shadcn v4 (`base-nova` style) with `@base-ui/react` primitives, NOT the traditional Radix-based shadcn/ui. The globals.css uses plain `@tailwind` directives (v3-compatible); the v4-only `@import "shadcn/tailwind.css"` and `@import "tw-animate-css"` have been removed. When adding new shadcn components via `npx shadcn@latest add <component>`, verify the generated file doesn't re-introduce those imports.

**CSS variable color tokens** — `tailwind.config.ts` maps shadcn's oklch CSS variables to Tailwind utilities (`bg-primary`, `text-foreground`, `border-border`, etc.). The `.dark` class on `<html>` (set in `app/layout.tsx`) activates the dark-mode variable set in `globals.css`.

## Key Conventions

- `Segment.heroBackground` is a full CSS gradient string (no image URLs) — it's set directly on `<main style={{ backgroundImage }}>`. A fixed dark gradient overlay (`z-0 absolute inset-0`) always sits above it; content is on `z-10`.
- shadcn `Button` and `Badge` are overridden via `className` prop using `tailwind-merge` (built into `cn()` from `lib/utils.ts`). Never edit `components/ui/` directly.
- `SegmentCard` is a local subcomponent inside `components/segment-gallery.tsx`, not exported separately.
- `@/*` resolves to the project root (not `src/`).
