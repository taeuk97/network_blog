// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { unified } from '@astrojs/markdown-remark';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import { shikiCodeMeta } from './src/lib/shiki-code-meta.mjs';
import { rehypeBaseLinks } from './src/lib/rehype-base-links.mjs';

/**
 * Deployment target (GitHub Pages).
 *
 * - User site  (repo "taeuk97.github.io"): SITE_URL=https://taeuk97.github.io, BASE_PATH=/
 * - Project site (repo "portfolio"):        SITE_URL=https://taeuk97.github.io, BASE_PATH=/portfolio
 *
 * Both can be overridden with environment variables (see .github/workflows/deploy.yml).
 */
const SITE_URL = process.env.SITE_URL ?? 'https://taeuk97.github.io';
const BASE_PATH = process.env.BASE_PATH ?? '/';

export default defineConfig({
  site: SITE_URL,
  base: BASE_PATH,
  trailingSlash: 'ignore',
  integrations: [mdx(), sitemap()],
  vite: {
    // Mermaid and Plotly are large, but they are lazy-loaded only on pages that use them.
    build: { chunkSizeWarningLimit: 4000 },
  },
  markdown: {
    processor: unified({
      remarkPlugins: [remarkMath],
      rehypePlugins: [[rehypeKatex, { strict: false }], [rehypeBaseLinks, { base: BASE_PATH }]],
    }),
    // Mermaid blocks are left un-highlighted and rendered in the browser.
    syntaxHighlight: { type: 'shiki', excludeLangs: ['math', 'mermaid'] },
    shikiConfig: {
      theme: 'github-dark',
      wrap: false,
      transformers: [shikiCodeMeta()],
    },
  },
});
