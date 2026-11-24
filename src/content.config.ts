import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import {
  blogCategories,
  categoryNames,
  labCategories,
  measurementCategories,
  projectStatuses,
} from './config/taxonomy';

/**
 * Content collections.
 * Every .md / .mdx file under src/content/<collection>/ becomes an entry.
 * The file path (without extension) is the URL slug:
 *   src/content/blog/understanding-bgp.md  →  /blog/understanding-bgp/
 */

const pattern = '**/[^_]*.{md,mdx}'; // files starting with "_" are ignored

const basePost = {
  title: z.string(),
  description: z.string(),
  date: z.coerce.date(),
  updated: z.coerce.date().optional(),
  tags: z.array(z.string()).default([]),
  language: z.enum(['en', 'ko']).default('en'),
  draft: z.boolean().default(false),
  /** Optional id of a project in src/content/projects this entry belongs to. */
  project: z.string().optional(),
  /** Optional cover / topology image, path under public/ (e.g. /diagrams/lab-01.svg). */
  cover: z.string().optional(),
};

const blog = defineCollection({
  loader: glob({ pattern, base: './src/content/blog' }),
  schema: z.object({
    ...basePost,
    category: z.enum(categoryNames(blogCategories)),
  }),
});

const labs = defineCollection({
  loader: glob({ pattern, base: './src/content/labs' }),
  schema: z.object({
    ...basePost,
    category: z.enum(categoryNames(labCategories)),
    /** e.g. 'Containerlab + FRRouting 10.x on Ubuntu 24.04' */
    environment: z.string().optional(),
    repo: z.string().optional(),
  }),
});

const measurements = defineCollection({
  loader: glob({ pattern, base: './src/content/measurements' }),
  schema: z.object({
    ...basePost,
    category: z.enum(categoryNames(measurementCategories)),
    /** Measurement period, e.g. '2026-11-01 — 2026-11-14' */
    period: z.string().optional(),
    /** Vantage points / platforms used, e.g. ['Starlink @ KAIST', 'RIPE Atlas'] */
    vantagePoints: z.array(z.string()).default([]),
    /** Path under public/ to the dataset, e.g. /datasets/starlink-rtt-2026-11.csv */
    dataset: z.string().optional(),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern, base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    status: z.enum(projectStatuses),
    /** Display order (1 = first). */
    order: z.number().default(99),
    /** Featured project is shown large on the landing page. */
    featured: z.boolean().default(false),
    keywords: z.array(z.string()).default([]),
    /** Only set once the repository actually exists. */
    repo: z.string().optional(),
    started: z.coerce.date().optional(),
    updated: z.coerce.date().optional(),
    draft: z.boolean().default(false),
    /** Ids of related entries (file names without extension). */
    relatedBlog: z.array(z.string()).default([]),
    relatedLabs: z.array(z.string()).default([]),
    relatedMeasurements: z.array(z.string()).default([]),
  }),
});

export const collections = { blog, labs, measurements, projects };
