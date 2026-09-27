# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
npm run dev      # development server at localhost:3000
npm run build    # production build
npm run lint     # ESLint
```

No test suite is configured.

## Architecture

### Page structure

Single-page site. `src/app/page.tsx` renders all sections sequentially: `Nav → Hero → Work → Services → Clients → About → Contact`. Each section is a standalone component in `src/components/`. The only additional route is `/work/[slug]` for case study detail pages.

### Project and case study data

`src/data/projects.ts` — the authoritative list powering the Work section grid. Each project has a `slug`, `featured` flag (featured = large card, non-featured = wall), `hasCaseStudy` boolean, and `builtByMe` flag. `thumbnail` paths are checked at build time via `src/lib/image-exists.ts` — `thumbnailExists` is passed as a prop rather than checked client-side.

`src/data/case-studies.ts` — detailed data for case study pages at `/work/[slug]`. Slugs must match `projects.ts`. Each case study has typed `phases`, `gallery` (items typed as `"wide"`, `"pair"`, or `"mobile"`), and per-project theming (`from`, `to`, `accent`, `gridColor`) for the hero gradient. `[TODO]` markers in data fields are placeholders the client hasn't provided yet.

### Contact panel

The contact section opens via the `?contact=open` search param. `ContactSearchParamsBridge` (wrapped in `<Suspense>` on the home page) reads this param and signals `Contact` to open. This avoids blocking the page render on `useSearchParams`.

### UI components

`@base-ui/react` for accessible primitives. shadcn/ui components in `src/components/ui/` (configured via `components.json` at the repo root). `src/lib/utils.ts` exports `cn()` (clsx + tailwind-merge).

### Fonts and motion

Three font variables: `--font-geist-sans` (body), `--font-geist-mono`, `--font-dm-serif` (display/italic accents). Framer Motion for animations. Custom cursor managed globally by `CustomCursor` (mounts in the root layout). `EasterEggs` is a client component also mounted globally for interaction surprises.
