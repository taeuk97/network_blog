/**
 * About page content.
 * ----------------------------------------------------------------
 * Only confirmed facts belong here. Empty arrays render as
 * "To be added." so the page structure stays visible until filled in.
 */

export interface TimelineItem {
  title: string; // e.g. 'M.S. in Electrical Engineering'
  org: string; // e.g. 'KAIST'
  period?: string; // e.g. '2025 — Present'
  detail?: string;
}

export interface Publication {
  title: string;
  authors: string;
  venue: string;
  year: number | string;
  url?: string;
}

export const about = {
  biography: [
    'I’m Taeuk Im, an M.S. student in Aerospace Engineering at KAIST, where I research satellite communications and networks in the ACAI Lab.',
    'Alongside research, I’m building my foundation as a network engineer — studying protocols and service provider technologies, building virtual networks, and measuring how real Internet paths behave over both Starlink and terrestrial access.',
    'This site is where that work is documented: study notes, hands-on labs, real-world measurements, and the projects that tie them together.',
  ],
  education: [
    {
      title: 'M.S. in Aerospace Engineering',
      org: 'KAIST',
      period: 'Sep 2025 — Sep 2027 (expected)',
      detail: 'ACAI Lab · Advisor: Prof. Jihwan Choi',
    },
    {
      title: 'B.S. in Astronomy',
      org: 'Yonsei University',
      period: 'Graduated 2025',
    },
    {
      title: 'High School Diploma',
      org: 'Sangsan High School',
    },
  ] as TimelineItem[],
  researchInterests: ['Satellite networks', 'Starlink & LEO satellite Internet', 'Internet measurement'],
  engineeringInterests: [
    'IP & service provider networks',
    'Internet measurement',
    'Network systems & infrastructure',
    'Network automation',
  ],
  /** e.g. { group: 'Routing', items: ['OSPF', 'BGP'] } — add once you decide how to present them. */
  technicalSkills: [] as { group: string; items: string[] }[],
  researchExperience: [] as TimelineItem[],
  publications: [] as Publication[],
};
