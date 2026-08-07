import type { Meta, StoryObj } from '@storybook/react-vite';
import { underConstruction } from '../underConstruction';
import { DCSupportASchoolPage } from './DCSupportASchoolPage';

/**
 * The **Support a school** landing page (donorschoose.org/supportaschool) — the
 * school-level giving entry point. Hero with "Support any public school", a
 * school-name search, a grid of nearby [School Cards](/?path=/docs/components-cards-school-card--docs),
 * and a "Fully funded projects at [school]" celebration section.
 */
const meta = {
  title: 'Pages/Support a School',
  tags: ['!autodocs', 'wip'], // live previews (no Docs), marked under construction
  decorators: [underConstruction],
  component: DCSupportASchoolPage,
  parameters: { layout: 'fullscreen', badges: ['wip'] },
} satisfies Meta<typeof DCSupportASchoolPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

/** Location with no fully-funded projects to celebrate yet. */
export const NoFundedProjects: Story = {
  args: { funded: { school: '', projects: [] } },
};
