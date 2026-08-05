/*
 * Classroom photo placeholders — an assortment of real classroom/student
 * photos (from donorschoose-web) used wherever a project or classroom image is
 * shown. Files live in public/images/classroom/.
 *
 * `classroomPhoto(seed)` maps a stable seed (e.g. a project title) to one of
 * the photos, so a given card always gets the same image — deterministic, so
 * Storybook/Chromatic snapshots don't churn — while the set as a whole reads
 * as an assorted mix.
 */
export const CLASSROOM_PHOTOS = [
  '/images/classroom/classroom-1.jpg',
  '/images/classroom/classroom-2.jpg',
  '/images/classroom/classroom-3.jpg',
  '/images/classroom/classroom-4.jpg',
  '/images/classroom/classroom-5.jpg',
] as const;

export function classroomPhoto(seed: string | number): string {
  const s = String(seed);
  let h = 0;
  for (let i = 0; i < s.length; i++) {
    h = (Math.imul(h, 31) + s.charCodeAt(i)) >>> 0;
  }
  return CLASSROOM_PHOTOS[h % CLASSROOM_PHOTOS.length];
}
