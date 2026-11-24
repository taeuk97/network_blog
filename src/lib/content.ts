import { getCollection, type CollectionEntry } from 'astro:content';
import { collectionMeta, type PostCollection } from '@/config/taxonomy';
import { url } from './url';

/**
 * Drafts (draft: true) are never published.
 * Run `npm run dev:drafts` to preview them locally.
 */
export const showDrafts = import.meta.env.DEV && process.env.SHOW_DRAFTS === 'true';
const visible = (e: { data: { draft?: boolean } }) => showDrafts || !e.data.draft;

export type PostEntry = CollectionEntry<'blog'> | CollectionEntry<'labs'> | CollectionEntry<'measurements'>;

/** A post from any of the three writing collections, normalised for lists. */
export interface PostItem {
  collection: PostCollection;
  id: string;
  href: string;
  title: string;
  description: string;
  date: Date;
  updated?: Date;
  category: string;
  tags: string[];
  draft: boolean;
  readingTime: number;
  project?: string;
}

export function readingTime(body = ''): number {
  const text = body
    .replace(/```[\s\S]*?```/g, (block) => block.split(/\s+/).slice(0, 60).join(' ')) // code counts, but less
    .replace(/<[^>]+>/g, ' ')
    .replace(/[#*_>`\-[\]()!]/g, ' ');
  const words = text.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 220));
}

export const postHref = (collection: PostCollection, id: string) => url(`${collectionMeta[collection].href}${id}/`);

export function toItem(collection: PostCollection, e: PostEntry): PostItem {
  return {
    collection,
    id: e.id,
    href: postHref(collection, e.id),
    title: e.data.title,
    description: e.data.description,
    date: e.data.date,
    updated: e.data.updated,
    category: e.data.category,
    tags: e.data.tags,
    draft: e.data.draft,
    readingTime: readingTime(e.body),
    project: e.data.project,
  };
}

const byDateDesc = (a: { date: Date }, b: { date: Date }) => b.date.getTime() - a.date.getTime();

export async function getEntries<C extends PostCollection>(collection: C) {
  const entries = (await getCollection(collection, visible)) as PostEntry[];
  return entries.sort((a, b) => byDateDesc(a.data, b.data));
}

export async function getPosts(collection: PostCollection): Promise<PostItem[]> {
  return (await getEntries(collection)).map((e) => toItem(collection, e));
}

export async function getAllPosts(): Promise<PostItem[]> {
  const all = await Promise.all((Object.keys(collectionMeta) as PostCollection[]).map(getPosts));
  return all.flat().sort(byDateDesc);
}

export async function getProjects() {
  const projects = await getCollection('projects', visible);
  return projects.sort((a, b) => a.data.order - b.data.order);
}

/** Related posts: shared tags weigh 2, same category 1, same project 3. */
export function relatedPosts(current: PostItem, pool: PostItem[], limit = 3): PostItem[] {
  const tags = new Set(current.tags.map((t) => t.toLowerCase()));
  return pool
    .filter((p) => !(p.collection === current.collection && p.id === current.id))
    .map((p) => {
      let score = p.tags.reduce((s, t) => s + (tags.has(t.toLowerCase()) ? 2 : 0), 0);
      if (p.category === current.category) score += 1;
      if (current.project && p.project === current.project) score += 3;
      return { p, score };
    })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score || byDateDesc(a.p, b.p))
    .slice(0, limit)
    .map((x) => x.p);
}

/** Tag → count, sorted by frequency then name. */
export function tagCounts(items: { tags: string[] }[]) {
  const counts = new Map<string, number>();
  for (const item of items) for (const t of item.tags) counts.set(t, (counts.get(t) ?? 0) + 1);
  return [...counts.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
}

export const formatDate = (d: Date) =>
  d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric', timeZone: 'UTC' });

export const isoDate = (d: Date) => d.toISOString().slice(0, 10);
