import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { DCSubnav } from './DCSubnav';

/**
 * The **school-page sub-navigation** — a sticky secondary bar of in-page links
 * with a sliding active indicator and a "Give to this school" CTA. Click a link
 * to move the active bar; in production it also scrolls to the section and stays
 * in sync via a scrollspy.
 */
const meta = {
  title: 'Components/Subnav',
  component: DCSubnav,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
  args: {
    items: [
      { id: 'about', label: 'About' },
      { id: 'impact', label: 'Impact' },
      { id: 'projects', label: 'Projects' },
      { id: 'teachers', label: 'Teachers' },
      { id: 'students', label: 'Students' },
      { id: 'donations', label: 'Donations' },
    ],
    defaultActive: 'about',
    giveLabel: 'Give to this school',
    sticky: true,
    onGive: fn(),
    onNavigate: fn(),
  },
} satisfies Meta<typeof DCSubnav>;

export default meta;
type Story = StoryObj<typeof meta>;

/** The sticky bar with the CTA and sliding active indicator. Click the links. */
export const Default: Story = {};

/** The non-sticky (in-page) state — no CTA or active bar, per the source. */
export const NotSticky: Story = { args: { sticky: false } };

/** A school with fewer sections (no DonorsChoose activity yet). */
export const Minimal: Story = {
  args: {
    items: [
      { id: 'about', label: 'About' },
      { id: 'teachers', label: 'Teachers' },
      { id: 'students', label: 'Students' },
    ],
  },
};
