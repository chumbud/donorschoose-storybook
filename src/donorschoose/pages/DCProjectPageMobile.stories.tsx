import type { Meta, StoryObj } from '@storybook/react-vite';
import { underConstruction } from '../underConstruction';
import { DCProjectPageMobile } from './DCProjectPageMobile';
import './dc-project-page-mobile.css';

/**
 * The DonorsChoose **project page on mobile** — a single-column layout matching
 * production: blue title band, classroom hero with the teacher, "My students
 * need…" essay with read-more, stats, a "Where your donation goes" accordion,
 * similar projects, and a **fixed bottom donation bar** that expands to
 * suggested amounts ($25 / $50 / $100 / $200 + complete-this-project).
 *
 * Shown inside a phone frame; tap **Give** to expand the amounts.
 */
const meta = {
  title: 'Pages/Project (Mobile)',
  tags: ['!autodocs', 'wip'], // live previews (no Docs), marked under construction
  decorators: [
    underConstruction,
    (Story) => (
      <div className="dc-pm-phone">
        <Story />
      </div>
    ),
  ],
  component: DCProjectPageMobile,
  parameters: { layout: 'centered', badges: ['wip'] },
} satisfies Meta<typeof DCProjectPageMobile>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
