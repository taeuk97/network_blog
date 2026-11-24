/**
 * Categories for each content collection.
 * ----------------------------------------------------------------
 * The `name` value is what you write in a post's front matter `category:` field.
 * The content schema (src/content.config.ts) only accepts names listed here,
 * so a typo fails the build instead of silently creating a new category.
 */

export interface Category {
  name: string;
  slug: string;
  topics?: readonly string[];
  description?: string;
}

export const blogCategories = [
  { name: 'Network Fundamentals', slug: 'fundamentals', topics: ['OSI', 'TCP/IP', 'ARP', 'DNS', 'NAT', 'Subnetting'] },
  { name: 'Routing & Switching', slug: 'routing-switching', topics: ['BGP', 'OSPF', 'IS-IS', 'VLAN', 'STP'] },
  { name: 'Service Provider Networks', slug: 'service-provider', topics: ['MPLS', 'Peering', 'Transit', 'IXP', 'PoP'] },
  { name: 'Transport Protocols', slug: 'transport', topics: ['TCP', 'UDP', 'QUIC', 'Congestion Control'] },
  { name: 'Mobile & Satellite Networks', slug: 'mobile-satellite', topics: ['LTE', '5G', 'NTN', 'Starlink'] },
  { name: 'Systems & Automation', slug: 'systems-automation', topics: ['Linux', 'Docker', 'AWS', 'Python', 'Ansible'] },
] as const satisfies readonly Category[];

export const labCategories = [
  { name: 'Linux & Network Infrastructure', slug: 'linux-infra', description: 'Hosts, namespaces, bridges, services and the plumbing underneath.' },
  { name: 'Routing & Switching', slug: 'routing-switching', description: 'IGPs, BGP, VLANs and L2/L3 behaviour verified on working topologies.' },
  { name: 'Service Provider Networks', slug: 'service-provider', description: 'MPLS, VPNs, peering and transit in a virtual ISP.' },
  { name: 'Transport Protocols', slug: 'transport', description: 'TCP, UDP and QUIC behaviour under controlled conditions.' },
  { name: 'Troubleshooting & Automation', slug: 'troubleshooting-automation', description: 'Failure analysis, packet captures and scripted operations.' },
] as const satisfies readonly Category[];

export const measurementCategories = [
  { name: 'Satellite Internet', slug: 'satellite', description: 'Starlink and LEO satellite access.' },
  { name: 'Terrestrial Internet', slug: 'terrestrial', description: 'Wired and mobile access as a baseline.' },
  { name: 'Internet Routing & Topology', slug: 'routing-topology', description: 'Paths, autonomous systems and how traffic actually travels.' },
  { name: 'Network Performance Analysis', slug: 'performance', description: 'Latency, loss, jitter and throughput analysis.' },
  { name: 'Datasets & Tools', slug: 'datasets-tools', description: 'Collection tooling and published datasets.' },
] as const satisfies readonly Category[];

export const projectStatuses = ['Planned', 'In Progress', 'Completed'] as const;
export type ProjectStatus = (typeof projectStatuses)[number];

/** Metrics the Measurements section intends to cover. */
export const measurementMetrics = [
  'Round-Trip Time',
  'Packet Loss',
  'Jitter',
  'Throughput',
  'Traceroute',
  'Autonomous Systems',
  'TCP Performance',
  'Network Congestion',
  'Internet Routing Paths',
] as const;

/** Measurement environment as currently set up. */
export const measurementEnvironment = [
  { name: 'Starlink', detail: 'Satellite access via the Starlink terminal at KAIST' },
  { name: 'Terrestrial', detail: 'Terrestrial Internet access at KAIST' },
  { name: 'RIPE Atlas', detail: 'Distributed probes and anchors' },
  { name: 'AWS', detail: 'Cloud servers as measurement endpoints' },
] as const;

/** Standard structure every lab write-up follows (see templates/lab-template.md). */
export const labStructure = [
  'Objective',
  'Background',
  'Network Topology',
  'Equipment & Environment',
  'Configuration',
  'Verification',
  'Experimental Results',
  'Troubleshooting',
  'Lessons Learned',
  'References & Source Code',
] as const;

export const collectionMeta = {
  blog: { label: 'Technical Blog', short: 'Blog', href: '/blog/', categories: blogCategories },
  labs: { label: 'Network Labs', short: 'Lab', href: '/labs/', categories: labCategories },
  measurements: { label: 'Internet Measurements', short: 'Measurement', href: '/measurements/', categories: measurementCategories },
} as const;

export type PostCollection = keyof typeof collectionMeta;

export function categoryNames<T extends readonly { name: string }[]>(list: T) {
  return list.map((c) => c.name) as unknown as [T[number]['name'], ...T[number]['name'][]];
}
