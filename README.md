# taeuk. — Network Engineering Portfolio

**Study. Build. Measure. Understand.**
From networking fundamentals to real-world engineering.

Personal portfolio and technical blog of Taeuk Im, built with [Astro](https://astro.build) and deployed as a static
site to GitHub Pages. All content is written in Markdown/MDX — no HTML editing needed to publish.

---

## Quick start

Requires **Node.js 22+** (installed: Node 26 LTS).

```powershell
npm install        # first time only
npm run dev        # http://localhost:4321
```

| Command | What it does |
|---|---|
| `npm run dev` | Local dev server with hot reload |
| `npm run dev:drafts` | Same, but also shows posts with `draft: true` |
| `npm run build` | Production build into `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run check` | Type-check `.astro` / `.ts` files |

Only one dev server can run per project — stop `dev` before starting `dev:drafts`.

---

## Site structure

| URL | Page | Source |
|---|---|---|
| `/` | Landing page (Hero → 01 Explore → 02 Building → 03 Document → 04 Connect) | `src/pages/index.astro`, `src/components/home/` |
| `/about/` | Biography, education, interests, skills, experience, publications, CV | `src/pages/about.astro` + `src/config/about.ts` |
| `/blog/` | Technical Blog — search, category & tag filters | `src/content/blog/` |
| `/labs/` | Network Labs | `src/content/labs/` |
| `/measurements/` | Internet Measurements | `src/content/measurements/` |
| `/projects/` | Engineering Projects — status filter | `src/content/projects/` |
| `/search-index.json` | Site-wide search index (auto-generated) | `src/pages/search-index.json.ts` |
| `/sitemap-index.xml` | Sitemap (auto-generated) | `@astrojs/sitemap` |

```text
src/
├── components/        Reusable UI (header, footer, cards, lists, TOC …)
│   ├── home/          Landing page sections + network background
│   └── mdx/           Components usable inside .mdx posts
├── config/            site.ts (identity, links) · taxonomy.ts (categories) · about.ts
├── content/           blog/ · labs/ · measurements/ · projects/   ← your writing
├── layouts/           BaseLayout (SEO, header/footer) · PostLayout (articles)
├── lib/               content helpers, URL/base-path helper, Markdown plugins
├── pages/             routes
├── scripts/           client-side code-block & Mermaid enhancement
└── styles/            global.css (design tokens) · prose.css (article typography)
public/
├── images/  diagrams/  datasets/  documents/
templates/             blog · lab · measurement · project templates
```

---

## Adding content

1. **Copy a template** from `templates/` into the matching folder:

   ```powershell
   Copy-Item templates/blog-template.md src/content/blog/understanding-bgp.md
   ```

   The file name becomes the URL: `/blog/understanding-bgp/`. Use `.mdx` if you want components.

2. **Fill in the front matter.** `category` must be one of the names in `src/config/taxonomy.ts`
   (the build fails on a typo, which is intentional).

   ```yaml
   ---
   title: "Understanding BGP"
   description: "An introduction to inter-domain routing."
   date: 2026-11-24
   category: "Routing & Switching"
   tags: [BGP, Routing]
   language: "en"
   draft: true
   ---
   ```

3. **Write and preview** with `npm run dev:drafts`.

4. **Publish** by setting `draft: false`. (List-page search matches title, description, category and tags — write
   descriptions with the keywords readers would search for.) These update automatically: article lists, landing-page *Recent posts*,
   category/tag counts and filters, search index, related posts, sitemap.

### Lab-specific fields
`environment` (shown under the title), `repo` (only once it exists), `cover`.

### Measurement-specific fields
`period`, `vantagePoints`, `dataset` (path under `public/`). **Only publish real, collected data.**

### Projects
`status` (`Planned` | `In Progress` | `Completed`), `order`, `featured` (shown large on the landing page),
`keywords`, `repo`, `relatedBlog` / `relatedLabs` / `relatedMeasurements` (file names without extension).
A post can also link itself to a project with `project: "<project-file-name>"`.

---

## Writing features

| Feature | How |
|---|---|
| Syntax highlighting | Fenced code blocks with a language: ` ```python ` |
| Code title | ` ```yaml title="topology.clab.yml" ` |
| Copy button | Automatic on every code block |
| CLI / terminal output | Use ` ```console ` (rendered as a terminal window) |
| Table of contents | Automatic from `##` / `###` headings (2+ headings) |
| LaTeX | Inline `$C \times RTT$`, display `$$ ... $$` |
| Mermaid | ` ```mermaid ` code block |
| Tables, footnotes | Standard GitHub-flavoured Markdown (`[^1]` creates a reference list) |
| Images | Markdown `![alt](/images/x.png)` or `<Figure src="/diagrams/x.svg" alt="…" caption="…" />` |
| Callouts | `<Callout type="note|tip|warning" title="…">…</Callout>` |
| Downloads | `<Download href="/datasets/x.csv" label="…" meta="CSV · 2 MB" />` |
| Plotly charts | `<PlotlyChart src="/datasets/x/figure.json" title="…" caption="…" />` |

MDX components (`<Figure>`, `<Callout>`, `<Download>`, `<PlotlyChart>`) are available in every `.mdx` file without
imports. Paths starting with `/` refer to `public/`.

**Plotly figures** are JSON files with `{ "data": [...], "layout": {...} }` — for example from Python:

```python
fig.write_json("public/datasets/<slug>/figure.json")
```

The site's colours and fonts are applied automatically. Plotly is only downloaded when a chart scrolls into view.

A private draft, `src/content/blog/markdown-feature-reference.mdx`, demonstrates every feature
(view with `npm run dev:drafts` → `/blog/markdown-feature-reference/`). It is never published.

---

## Personal information & links

Edit `src/config/site.ts`:

```ts
export const links = {
  github: 'https://github.com/taeuk97',
  linkedin: '',            // e.g. 'https://www.linkedin.com/in/…'
  emails: [                // shown in this order; remove an entry to hide it
    { label: 'KAIST Email', address: '…@kaist.ac.kr' },
    { label: 'Email', address: '…@gmail.com' },
  ],
  cv: '',                  // e.g. '/documents/cv.pdf' (put the file in public/documents/)
};
export const integrations = { starlinkMonitorUrl: '' };  // KAIST–ACAI Starlink Monitor
```

Empty values are hidden everywhere (footer, contact section, About page). About-page facts live in `src/config/about.ts`.

---

## Deployment (GitHub Pages)

> Not deployed yet. Deploying requires creating the GitHub repository and pushing — do this only when ready.

1. Create a repository on GitHub:
   - **`taeuk97.github.io`** → site at `https://taeuk97.github.io/` (recommended), or
   - any other name, e.g. `portfolio` → site at `https://taeuk97.github.io/portfolio/`
2. Push this project to the `main` branch.
3. In the repository: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
4. `.github/workflows/deploy.yml` builds and deploys on every push to `main`. It sets `BASE_PATH` automatically
   from the repository name, so all links work in both cases.

To test a sub-path build locally:

```powershell
$env:BASE_PATH="/portfolio"; npm run build; npm run preview
```

---

## Maintenance notes

- Design tokens (colours, fonts, spacing) are in `src/styles/global.css`. See `CLAUDE.md` for design rules.
- Warnings such as `The collection "labs" does not exist or is empty` are expected until the first entry exists.
- Update dependencies with `npm outdated` / `npm update`, then run `npm run build` to verify.
