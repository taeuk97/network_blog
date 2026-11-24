import type { APIRoute } from 'astro';
import { getAllPosts, getProjects, isoDate } from '@/lib/content';
import { url } from '@/lib/url';

/**
 * Site-wide search index, regenerated on every build: /search-index.json
 * Contains every published post and project (no drafts).
 */
export const GET: APIRoute = async () => {
  const posts = await getAllPosts();
  const projects = await getProjects();

  const index = [
    ...posts.map((p) => ({
      type: p.collection,
      title: p.title,
      description: p.description,
      category: p.category,
      tags: p.tags,
      date: isoDate(p.date),
      url: p.href,
    })),
    ...projects.map((p) => ({
      type: 'projects',
      title: p.data.title,
      description: p.data.description,
      category: p.data.status,
      tags: p.data.keywords,
      date: null,
      url: url(`/projects/${p.id}/`),
    })),
  ];

  return new Response(JSON.stringify({ generated: new Date().toISOString(), entries: index }, null, 2), {
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
};
