/**
 * Prefix an internal path with the configured base path so links keep
 * working when the site is deployed under a sub-path on GitHub Pages
 * (e.g. https://taeuk97.github.io/portfolio/).
 *
 * External URLs, mailto:, tel: and in-page anchors are returned unchanged.
 */
export function url(path = '/'): string {
  if (/^(https?:|mailto:|tel:|#)/.test(path)) return path;
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const clean = path.startsWith('/') ? path : `/${path}`;
  return `${base}${clean}` || '/';
}

/** Strip the base path from a pathname (used for active-nav detection). */
export function stripBase(pathname: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const p = base && pathname.startsWith(base) ? pathname.slice(base.length) : pathname;
  return p || '/';
}

export const isExternal = (href: string) => /^https?:/.test(href);
