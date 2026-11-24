import { links } from '@/config/site';
import { url } from './url';

export interface ContactLink {
  key: 'github' | 'linkedin' | 'email' | 'cv';
  label: string;
  href: string;
  /** Shown under the label where there is room (e.g. the email address). */
  detail?: string;
  external: boolean;
  icon: 'github' | 'linkedin' | 'mail' | 'file';
}

/** Only links that have been filled in src/config/site.ts are returned. */
export function contactLinks(): ContactLink[] {
  const out: ContactLink[] = [];
  if (links.github) out.push({ key: 'github', label: 'GitHub', href: links.github, external: true, icon: 'github' });
  if (links.linkedin) out.push({ key: 'linkedin', label: 'LinkedIn', href: links.linkedin, external: true, icon: 'linkedin' });
  for (const e of links.emails) {
    if (e.address) {
      out.push({ key: 'email', label: e.label, href: `mailto:${e.address}`, detail: e.address, external: false, icon: 'mail' });
    }
  }
  if (links.cv) out.push({ key: 'cv', label: 'CV', href: url(links.cv), external: false, icon: 'file' });
  return out;
}
