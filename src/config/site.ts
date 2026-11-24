/**
 * Site identity & links.
 * ----------------------------------------------------------------
 * Fill in the empty strings below when the information is ready.
 * Empty values are hidden automatically — nothing is shown until set.
 */
export const site = {
  name: 'Taeuk Im',
  logo: 'taeuk',
  title: 'Taeuk Im — Network Engineering',
  description:
    'Study. Build. Measure. Understand. A network engineering portfolio and technical blog — from networking fundamentals to real-world engineering.',
  slogan: 'Study. Build. Measure. Understand.',
  supportingSlogan: 'From networking fundamentals to real-world engineering.',
  lang: 'en',
  locale: 'en_US',
  /** Year the site was started (footer copyright range). */
  since: 2026,
} as const;

export const navigation = [
  { label: 'About', href: '/about/' },
  { label: 'Blog', href: '/blog/' },
  { label: 'Labs', href: '/labs/' },
  { label: 'Measurements', href: '/measurements/' },
  { label: 'Projects', href: '/projects/' },
] as const;

/**
 * Contact & profile links.
 * - cv:    put the PDF in public/documents/ and set e.g. '/documents/cv.pdf'
 * - emails: plain addresses with a label (mailto: is added automatically). Shown in this order.
 */
export const links = {
  github: 'https://github.com/taeuk97',
  linkedin: '',
  emails: [
    { label: 'KAIST Email', address: 'luckylife236@kaist.ac.kr' },
    { label: 'Email', address: 'luckylife236@gmail.com' },
  ],
  cv: '',
} as const;

/** External services that pages can link to once they exist. */
export const integrations = {
  /** KAIST–ACAI Starlink Monitor (Measurements page). Leave empty until public. */
  starlinkMonitorUrl: '',
} as const;
