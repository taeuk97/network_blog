# CLAUDE.md — rules for working on this site

Personal network engineering portfolio & technical blog of **Taeuk Im** (KAIST, satellite communications & networks).
Stack: **Astro 7 + TypeScript + Markdown/MDX**, static output for **GitHub Pages**. No server, no database.

## Non-negotiable content rules

1. **Never invent facts.** No made-up projects, results, certifications, job titles, employers, education, publications,
   repositories, URLs, email addresses or measurement numbers. If information is missing, leave the field empty — the UI
   hides empty values or shows "To be added."
2. **No fabricated data.** Measurement charts, tables and statistics may only come from data Taeuk provides. Example
   charts must be clearly labelled as synthetic and stay in drafts.
3. **Honest status.** Projects are `Planned`, `In Progress` or `Completed`. Never mark work completed that isn't.
4. **No senior titles.** Do not use "Senior Network Engineer", "Network Architect" or similar.
5. **Interests ≠ skills.** Topics on the landing page are areas being studied/explored, not claimed expertise.
6. Site language is **English** (individual posts may set `language: "ko"`).

## Actions that need explicit approval from Taeuk first

- `git commit`, `git push`
- Creating/deleting a GitHub repository, enabling or triggering GitHub Pages deployment
- Replacing an existing homepage
- Deleting important files

## Design system (do not drift)

Reference: danielfonque.com — dark, minimal, engineering-oriented. Keep it restrained.

| Token | Value | Use |
|---|---|---|
| `--bg` | `#0a0e1a` | page background |
| `--surface` | `#101626` | cards |
| `--text` / `--muted` / `--subtle` | `#e2e8f0` / `#a6b2c7` / `#7a879e` | text hierarchy |
| `--primary` | `#a193ff` (violet) | names, numbers, highlights, primary buttons (`#7563c9`) |
| `--accent` | `#61c5ff` (cyan) | eyebrows, links, "In Progress" |
| `--border` | `rgba(157,176,216,.16)` | all hairlines |

- Fonts: **Space Grotesk** (headings), **Inter** (body), **JetBrains Mono** (numbers, paths, meta). Self-hosted via @fontsource.
- Section heading pattern: eyebrow `NN / Label` → large H2 with one highlighted phrase (`*phrase*` in `SectionHeading`/`PageHero` titles).
- Buttons: pill shape — `.button-primary` (violet), `.button-secondary` (outline), `.button-ghost` (contact links).
- Cards: 12px radius, 1px border, hover = cyan border + slight lift. No glows, no gradients beyond the existing subtle ones.
- Motion: reveal-on-scroll (`data-reveal`), hero stagger, background mesh. All respect `prefers-reduced-motion`.
- Avoid: neon, heavy gradients, decorative icons, emoji, stock imagery, "AI-template" hero blobs.
- All tokens live in `src/styles/global.css`; long-form styles in `src/styles/prose.css`.

## Code conventions

- Internal links **must** go through `url()` from `src/lib/url.ts` (base-path safe for GitHub Pages project sites).
  Root-relative links inside Markdown are prefixed automatically by `src/lib/rehype-base-links.mjs`.
- Site identity, nav and contact links: `src/config/site.ts`. Categories/metrics: `src/config/taxonomy.ts`.
  About-page facts: `src/config/about.ts`.
- Content schema: `src/content.config.ts`. Category values are validated against `taxonomy.ts` — a typo fails the build.
- Reusable UI in `src/components/`, landing sections in `src/components/home/`, MDX components in `src/components/mdx/`
  (auto-available in .mdx: `<Figure>`, `<Callout>`, `<PlotlyChart>`, `<Download>`).
- Keep pages static. Client JS only for progressive enhancement (filters, copy buttons, Mermaid, Plotly — lazy loaded).
- Accessibility: semantic landmarks, visible focus, `aria-current` in nav, alt text required on `<Figure>`.

## Content workflow

1. Copy a file from `templates/` into `src/content/<blog|labs|measurements|projects>/`.
2. File name = URL slug. Keep `draft: true` while writing; preview with `npm run dev:drafts`.
3. Assets: `public/images/`, `public/diagrams/<slug>/`, `public/datasets/<slug>/`, `public/documents/`.
4. Set `draft: false` to publish. Lists, recent posts, categories, tags, related posts and `/search-index.json` update automatically.

## Commands

- `npm run dev` — local dev server (http://localhost:4321)
- `npm run dev:drafts` — dev server including drafts
- `npm run build` — production build into `dist/` (must pass before any deploy)
- `npm run preview` — serve the built site
- `npm run check` — type-check

Note: Astro allows only one dev server per project; stop one before starting another.
Warnings like `The collection "labs" does not exist or is empty` are expected until the first entry is added.
