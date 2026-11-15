// Invented data for the application page stories. No ticket, service, product or package here is real.
import type { Slice, TraceStep } from '../organisms';
import type { ChartSeries } from '../tokens/series';
import type { Tone } from '../tokens/tone';

/* Tickets */

export type TicketStatus = 'Open' | 'Pending' | 'Solved';
export type TicketPriority = 'Urgent' | 'High' | 'Normal' | 'Low';

export interface Ticket {
  id: string;
  subject: string;
  requester: string;
  assignee: string;
  status: TicketStatus;
  priority: TicketPriority;
  category: string;
  /** Minutes left before the response target is missed; negative once breached. */
  sla: number;
  updated: string;
  body: string;
}

export const tickets: Ticket[] = [
  { id: 'T-4821', subject: 'Publish fails with checksum mismatch', requester: 'Ines Carvalho', assignee: 'M. Okafor', status: 'Open', priority: 'Urgent', category: 'Publishing', sla: -18, updated: '09:42', body: 'Every publish of tessera 4.2.1 is rejected with a checksum mismatch, from two different machines. 4.2.0 went through last week with the same pipeline.' },
  { id: 'T-4819', subject: 'Token rotated but old one still works', requester: 'Jonas Whit', assignee: 'L. Brandt', status: 'Open', priority: 'High', category: 'Access', sla: 24, updated: '09:31', body: 'We rotated our automation token an hour ago. The revoked token still authenticates against the registry.' },
  { id: 'T-4816', subject: 'Invoice shows the wrong seat count', requester: 'Amara Diallo', assignee: 'Unassigned', status: 'Open', priority: 'Normal', category: 'Billing', sla: 96, updated: '09:10', body: 'November invoice bills 42 seats. We removed 6 members on the 3rd and expected 36.' },
  { id: 'T-4812', subject: 'Search misses scoped packages', requester: 'Pavel Hroch', assignee: 'M. Okafor', status: 'Pending', priority: 'Normal', category: 'Search', sla: 180, updated: '08:55', body: 'Searching for a scoped name returns nothing unless the scope prefix is typed in full.' },
  { id: 'T-4809', subject: 'Download counts flat since Monday', requester: 'Sofia Lindqvist', assignee: 'R. Imai', status: 'Open', priority: 'High', category: 'Metrics', sla: 41, updated: '08:47', body: 'Weekly installs for quillmark have not moved since Monday although our own mirrors show normal traffic.' },
  { id: 'T-4803', subject: 'Request to transfer package ownership', requester: 'Tomas Reyes', assignee: 'L. Brandt', status: 'Pending', priority: 'Low', category: 'Access', sla: 420, updated: '08:12', body: 'The previous maintainer left the company. We would like ownership of harrow moved to our organisation.' },
  { id: 'T-4798', subject: 'Webhook retries arrive out of order', requester: 'Hana Sato', assignee: 'R. Imai', status: 'Open', priority: 'Normal', category: 'Publishing', sla: 132, updated: 'Yesterday', body: 'Publish webhooks that are retried arrive after later events, which breaks our deploy ordering.' },
  { id: 'T-4791', subject: 'Two-factor reset for a locked account', requester: 'Leo Marchetti', assignee: 'Unassigned', status: 'Open', priority: 'High', category: 'Access', sla: 12, updated: 'Yesterday', body: 'Lost the device holding my one-time codes and the recovery codes do not work.' },
  { id: 'T-4785', subject: 'Deprecation notice not shown on install', requester: 'Nadia Farouk', assignee: 'M. Okafor', status: 'Solved', priority: 'Low', category: 'Publishing', sla: 600, updated: 'Nov 12', body: 'We deprecated 2.x but installs print no warning.' },
  { id: 'T-4779', subject: 'Refund for duplicate subscription', requester: 'Oskar Nyberg', assignee: 'L. Brandt', status: 'Solved', priority: 'Normal', category: 'Billing', sla: 600, updated: 'Nov 12', body: 'Two subscriptions were created for the same organisation during checkout.' },
];

export const ticketFlowSeries: ChartSeries[] = [{ key: 'opened', label: 'Opened' }, { key: 'solved', label: 'Solved', color: 3 }];

export const ticketFlow = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => ({
  day,
  opened: [42, 38, 51, 47, 44, 12, 9][i],
  solved: [36, 41, 43, 49, 46, 15, 8][i],
}));

export const ticketCategories: Slice[] = [
  { key: 'publishing', label: 'Publishing', value: 46 },
  { key: 'access', label: 'Access', value: 34 },
  { key: 'billing', label: 'Billing', value: 22 },
  { key: 'search', label: 'Search', value: 15 },
  { key: 'metrics', label: 'Metrics', value: 11, color: 8 },
];

export const ticketActivity: TraceStep[] = [
  { id: 'a', title: 'Ticket opened by requester', meta: '09:02', status: 'done' },
  { id: 'b', title: 'Assigned to M. Okafor', meta: '09:05', status: 'done' },
  { id: 'c', title: 'Priority raised to urgent', meta: '09:20', status: 'done' },
  { id: 'd', title: 'Response target missed', meta: '09:24', status: 'error' },
  { id: 'e', title: 'Waiting on first reply', meta: 'now', status: 'running' },
];

/* Monitoring */

export interface Service {
  name: string;
  region: string;
  status: 'Operational' | 'Degraded' | 'Down';
  latency: number;
  errors: number;
  cpu: number;
  uptime: number;
}

export const services: Service[] = [
  { name: 'registry-api', region: 'eu-west', status: 'Degraded', latency: 412, errors: 1.84, cpu: 86, uptime: 99.91 },
  { name: 'registry-api', region: 'us-east', status: 'Operational', latency: 118, errors: 0.12, cpu: 54, uptime: 99.99 },
  { name: 'tarball-cdn', region: 'global', status: 'Operational', latency: 31, errors: 0.02, cpu: 22, uptime: 100 },
  { name: 'search-index', region: 'eu-west', status: 'Operational', latency: 96, errors: 0.21, cpu: 61, uptime: 99.98 },
  { name: 'auth', region: 'us-east', status: 'Operational', latency: 74, errors: 0.08, cpu: 37, uptime: 99.99 },
  { name: 'webhooks', region: 'eu-west', status: 'Degraded', latency: 268, errors: 0.96, cpu: 72, uptime: 99.87 },
  { name: 'build-runner', region: 'us-east', status: 'Operational', latency: 142, errors: 0.3, cpu: 68, uptime: 99.95 },
  { name: 'billing', region: 'eu-west', status: 'Down', latency: 0, errors: 100, cpu: 3, uptime: 98.72 },
];

export const serviceTone: Record<Service['status'], Tone> = { Operational: 'pos', Degraded: 'warn', Down: 'neg' };

export const latencySeries: ChartSeries[] = [{ key: 'p50', label: 'p50', color: 3 }, { key: 'p95', label: 'p95', color: 4 }, { key: 'p99', label: 'p99', color: 2 }];

export const latency = ['08:00', '08:10', '08:20', '08:30', '08:40', '08:50', '09:00', '09:10', '09:20', '09:30', '09:40', '09:50'].map((time, i) => ({
  time,
  p50: [62, 64, 61, 66, 63, 65, 70, 84, 96, 104, 98, 92][i],
  p95: [140, 146, 138, 152, 149, 151, 178, 246, 312, 338, 296, 264][i],
  p99: [210, 224, 206, 238, 231, 236, 290, 420, 548, 602, 512, 448][i],
}));

export const regionSeries: ChartSeries[] = [{ key: 'eu', label: 'eu-west' }, { key: 'us', label: 'us-east' }, { key: 'ap', label: 'ap-south', color: 6 }];

export const requests = latency.map((row, i) => ({
  time: row.time,
  eu: [6.1, 6.4, 6.2, 6.8, 7.1, 7.4, 7.9, 8.6, 8.2, 7.4, 7.6, 7.8][i],
  us: [5.2, 5.1, 5.4, 5.6, 5.9, 6.3, 6.8, 7.2, 7.5, 7.7, 7.6, 7.9][i],
  ap: [2.1, 2.0, 1.9, 1.8, 1.8, 1.7, 1.9, 2.2, 2.4, 2.6, 2.7, 2.7][i],
}));

export const errorSeries: ChartSeries[] = [{ key: 'client', label: '4xx', color: 4 }, { key: 'server', label: '5xx', color: 2 }];

export const errors = latency.map((row, i) => ({
  time: row.time,
  client: [18, 21, 17, 22, 19, 24, 26, 31, 29, 27, 25, 23][i],
  server: [2, 1, 3, 2, 2, 4, 9, 38, 64, 71, 42, 28][i],
}));

export const capacity = [
  { name: 'eu-west-1a', value: 86 },
  { name: 'eu-west-1b', value: 79 },
  { name: 'us-east-2a', value: 54 },
  { name: 'us-east-2b', value: 61 },
  { name: 'ap-south-1a', value: 33 },
];

export const incidents: TraceStep[] = [
  { id: 'i1', title: 'billing eu-west is down', meta: '09:41', status: 'error', detail: 'Health checks failing on all three instances. Paged the on-call engineer.' },
  { id: 'i2', title: 'Latency above target on registry-api', meta: '09:12', status: 'running', detail: 'p95 at 338 ms against a 250 ms target. Scaling eu-west from 6 to 9 instances.' },
  { id: 'i3', title: 'Webhook queue draining', meta: '09:05', status: 'running' },
  { id: 'i4', title: 'Deploy registry-api 2026.11.3', meta: '08:58', status: 'done' },
  { id: 'i5', title: 'Certificate renewed for tarball-cdn', meta: '07:30', status: 'done' },
  { id: 'i6', title: 'Nightly index rebuild', meta: '03:00', status: 'done' },
];

/* Products */

export interface Product {
  id: string;
  name: string;
  kind: string;
  description: string;
  price: number;
  rating: number;
  reviews: number;
  stock: number;
  tag?: { label: string; tone: Tone };
  glyph: string;
}

export const products: Product[] = [
  { id: 'k75', name: 'Meridian 75', kind: 'Keyboard', description: 'Aluminium 75% board, hot-swap sockets, gasket mount.', price: 189, rating: 4.7, reviews: 312, stock: 48, tag: { label: 'New', tone: 'info' }, glyph: '⌨' },
  { id: 'k60', name: 'Meridian 60', kind: 'Keyboard', description: 'Compact 60% layout with a polycarbonate plate.', price: 139, rating: 4.5, reviews: 508, stock: 112, glyph: '⌨' },
  { id: 'tkl', name: 'Parallel TKL', kind: 'Keyboard', description: 'Tenkeyless, low-profile switches, wireless on three channels.', price: 164, rating: 4.3, reviews: 221, stock: 6, tag: { label: 'Low stock', tone: 'warn' }, glyph: '⌨' },
  { id: 'pad', name: 'Tally Numpad', kind: 'Keyboard', description: 'A 21-key number pad with a rotary encoder.', price: 69, rating: 4.4, reviews: 96, stock: 73, glyph: '▦' },
  { id: 'sw-l', name: 'Linear 45 g', kind: 'Switches', description: 'Factory-lubed linear switches. Pack of 90.', price: 42, rating: 4.8, reviews: 1204, stock: 340, tag: { label: 'Best seller', tone: 'pos' }, glyph: '◇' },
  { id: 'sw-t', name: 'Tactile 55 g', kind: 'Switches', description: 'A rounded tactile bump near the top of travel. Pack of 90.', price: 46, rating: 4.6, reviews: 842, stock: 215, glyph: '◆' },
  { id: 'sw-s', name: 'Silent 40 g', kind: 'Switches', description: 'Dampened stems for shared rooms. Pack of 90.', price: 52, rating: 4.2, reviews: 377, stock: 0, tag: { label: 'Sold out', tone: 'neg' }, glyph: '○' },
  { id: 'kc-m', name: 'Monochrome set', kind: 'Keycaps', description: 'Double-shot PBT, 142 keys, uppercase mono legends.', price: 79, rating: 4.7, reviews: 265, stock: 58, glyph: '■' },
  { id: 'kc-b', name: 'Blueprint set', kind: 'Keycaps', description: 'Dye-sublimated PBT in drafting blue and white.', price: 89, rating: 4.5, reviews: 143, stock: 21, tag: { label: 'New', tone: 'info' }, glyph: '□' },
  { id: 'cab', name: 'Coiled cable', kind: 'Accessories', description: 'Braided USB-C cable with an aviator connector.', price: 34, rating: 4.1, reviews: 188, stock: 96, glyph: '∿' },
  { id: 'rest', name: 'Walnut wrist rest', kind: 'Accessories', description: 'Oiled walnut, cut to 75% and TKL widths.', price: 48, rating: 4.6, reviews: 74, stock: 14, glyph: '▭' },
  { id: 'case', name: 'Carry case', kind: 'Accessories', description: 'Hard shell with a moulded insert for boards up to TKL.', price: 39, rating: 4.4, reviews: 131, stock: 67, glyph: '▣' },
];

export const productKinds = ['All', 'Keyboard', 'Switches', 'Keycaps', 'Accessories'];

/* Search */

export interface SearchResult {
  name: string;
  version: string;
  category: string;
  licence: string;
  status: 'Stable' | 'Beta' | 'Deprecated';
  score: number;
  installs: string;
  updated: string;
  /** Days since the last release. */
  age: number;
  typed: boolean;
  description: string;
}

export const searchResults: SearchResult[] = [
  { name: 'tessera', version: '4.2.0', category: 'Parsing', licence: 'MIT', status: 'Stable', score: 71, installs: '1.2M', updated: 'Nov 12, 2026', age: 3, typed: true, description: 'An incremental parser toolkit with error recovery and a compact syntax tree.' },
  { name: 'tessera-cli', version: '4.2.0', category: 'Tooling', licence: 'MIT', status: 'Stable', score: 64, installs: '310k', updated: 'Nov 12, 2026', age: 3, typed: true, description: 'Command-line front end for tessera: parse, print and diff syntax trees.' },
  { name: 'quillmark', version: '1.9.3', category: 'Parsing', licence: 'Apache-2.0', status: 'Beta', score: 63, installs: '84k', updated: 'Nov 09, 2026', age: 6, typed: true, description: 'A Markdown parser that keeps source positions for every node.' },
  { name: 'lumen-fmt', version: '3.0.1', category: 'Formatting', licence: 'MIT', status: 'Beta', score: 61, installs: '226k', updated: 'Oct 29, 2026', age: 17, typed: true, description: 'An opinionated formatter that preserves comments and keeps diffs small.' },
  { name: 'castor', version: '2.7.0', category: 'Parsing', licence: 'ISC', status: 'Stable', score: 70, installs: '540k', updated: 'Oct 28, 2026', age: 18, typed: false, description: 'A parser combinator library with zero-copy input slices.' },
  { name: 'bramble', version: '5.1.2', category: 'Testing', licence: 'MIT', status: 'Beta', score: 60, installs: '48k', updated: 'Oct 23, 2026', age: 23, typed: true, description: 'Property-based testing for parsers: generates inputs from a grammar.' },
  { name: 'fennel-io', version: '1.2.0', category: 'Input / output', licence: 'MIT', status: 'Stable', score: 57, installs: '172k', updated: 'Oct 19, 2026', age: 27, typed: true, description: 'Streaming file and network primitives with backpressure built in.' },
  { name: 'marlin', version: '6.0.0', category: 'Formatting', licence: 'Apache-2.0', status: 'Stable', score: 67, installs: '392k', updated: 'Oct 16, 2026', age: 30, typed: true, description: 'A pretty-printer engine: describe a layout, let it choose the line breaks.' },
  { name: 'sextant', version: '2.3.4', category: 'Tooling', licence: 'MIT', status: 'Stable', score: 65, installs: '129k', updated: 'Oct 15, 2026', age: 31, typed: false, description: 'Project navigation: symbol index, references, and a fast fuzzy finder.' },
  { name: 'harrow', version: '0.14.0', category: 'Testing', licence: 'MIT', status: 'Deprecated', score: 43, installs: '21k', updated: 'Jun 05, 2026', age: 163, typed: false, description: 'A snapshot test runner. Superseded by the built-in runner; kept for migration.' },
  { name: 'ostinato', version: '0.8.5', category: 'Input / output', licence: 'ISC', status: 'Stable', score: 59, installs: '37k', updated: 'Aug 21, 2026', age: 86, typed: true, description: 'Retry and rate-limit policies for anything that returns a promise.' },
  { name: 'juniper', version: '0.3.0', category: 'Parsing', licence: 'GPL-3.0', status: 'Beta', score: 30, installs: '2k', updated: 'Feb 02, 2026', age: 286, typed: false, description: 'An experimental GLR parser generator. Slow builds, complete ambiguity reports.' },
];

export const searchCategories = ['Parsing', 'Formatting', 'Testing', 'Tooling', 'Input / output'];
export const searchLicences = ['MIT', 'Apache-2.0', 'ISC', 'GPL-3.0'];
