import type { DCProjectCardProps } from './DCProjectCard';

/**
 * Sample classroom projects, one per state, reused across the project-card
 * stories and the example pages. Photos are inline SVG data URIs (no network).
 */
const photo = (hue: number) =>
  `data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><rect width='200' height='200' fill='hsl(${hue} 52% 60%)'/><circle cx='100' cy='74' r='32' fill='hsl(${hue} 55% 78%)'/><rect x='34' y='116' width='132' height='72' rx='12' fill='hsl(${hue} 55% 72%)'/></svg>`,
  )}`;

export const projects: DCProjectCardProps[] = [
  {
    title: 'Books to Spark a Love of Reading',
    teacher: 'Ms. Alvarez',
    school: 'PS 145 Bloomingdale',
    location: 'New York, NY',
    description: 'My students need 30 chapter books to build our classroom library.',
    imageUrl: photo(20),
    goal: 640,
    raised: 240,
    donors: 6,
    status: 'active',
  },
  {
    title: 'Hands-On Science Kits for Curious Minds',
    teacher: 'Mr. Okafor',
    school: 'Lincoln Elementary',
    location: 'Chicago, IL',
    description: 'My students need microscopes and lab supplies to explore biology.',
    imageUrl: photo(140),
    goal: 820,
    raised: 700,
    donors: 18,
    status: 'almost',
  },
  {
    title: 'Cozy Flexible Seating for Our Reading Nook',
    teacher: 'Mrs. Chen',
    school: 'Maplewood Academy',
    location: 'Seattle, WA',
    description: 'My students need comfortable seating to make reading time inviting.',
    imageUrl: photo(265),
    goal: 500,
    raised: 500,
    donors: 24,
    status: 'funded',
  },
  {
    title: 'Art Supplies for Every Young Artist',
    teacher: 'Ms. Patel',
    school: 'Riverside K-8',
    location: 'Austin, TX',
    description: 'My students need paint, brushes, and paper to express themselves.',
    imageUrl: photo(330),
    goal: 430,
    raised: 150,
    donors: 4,
    status: 'friends-family',
  },
  {
    title: 'Tablets to Bridge the Digital Divide',
    teacher: 'Mr. Johnson',
    school: 'Eastside High',
    location: 'Atlanta, GA',
    description: 'My students need tablets so every learner can access lessons online.',
    imageUrl: photo(210),
    goal: 1200,
    raised: 540,
    donors: 31,
    status: 'matched',
  },
];

export const byStatus = (s: DCProjectCardProps['status']) =>
  projects.find((p) => p.status === s) as DCProjectCardProps;
