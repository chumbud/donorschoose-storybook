import type { DCProjectCardProps } from './DCProjectCard';
import { classroomPhoto } from './placeholderPhotos';

/**
 * Sample classroom projects, one per state, reused across the project-card
 * stories and the example pages. Photos are an assortment of real classroom
 * placeholders (see placeholderPhotos.ts), seeded so each project keeps a
 * stable image.
 */
const photo = (seed: number) => classroomPhoto(seed);

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
