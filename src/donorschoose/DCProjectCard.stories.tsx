import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { DCProjectCard } from './DCProjectCard';
import { projects, byStatus } from './mockProjects';

/**
 * The DonorsChoose classroom **project card** — ported from `ProjectCard.js` +
 * `_projectCard.scss`. Shows the funding progress bar and adapts to each
 * project state: active, almost funded, funded, friends & family, and matched.
 */
const meta = {
  title: 'Components/Project Card',
  component: DCProjectCard,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
  args: { onGive: fn() },
} satisfies Meta<typeof DCProjectCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Active: Story = { args: byStatus('active') };
export const AlmostFunded: Story = { args: byStatus('almost') };
export const Funded: Story = { args: byStatus('funded') };
export const FriendsAndFamily: Story = { args: byStatus('friends-family') };
export const Matched: Story = { args: byStatus('matched') };

/** Shimmering skeleton shown while data loads — horizontal and vertical. */
export const Loading: Story = {
  args: { ...byStatus('active'), loading: true },
  render: (args) => (
    <div style={{ display: 'grid', gap: '1.5rem' }}>
      <DCProjectCard {...args} layout="horizontal" />
      <div style={{ width: 300 }}>
        <DCProjectCard {...args} layout="vertical" />
      </div>
    </div>
  ),
};

/** Vertical/small card for "Nearby projects" grids (photo on top, title overlaid). */
export const Vertical: Story = {
  args: { ...byStatus('active'), layout: 'vertical' },
  render: (args) => (
    <div style={{ width: 300 }}>
      <DCProjectCard {...args} />
    </div>
  ),
};

/** A row of vertical cards. */
export const VerticalGrid: Story = {
  parameters: { layout: 'fullscreen' },
  render: (args) => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', padding: '2rem' }}>
      {projects.slice(0, 3).map((p) => (
        <DCProjectCard key={p.title} {...p} layout="vertical" onGive={args.onGive} />
      ))}
    </div>
  ),
};

/** Every state stacked together. */
export const AllStates: Story = {
  parameters: { layout: 'fullscreen' },
  render: (args) => (
    <div style={{ display: 'grid', gap: '1.5rem', padding: '2rem', maxWidth: 760 }}>
      {projects.map((p) => (
        <DCProjectCard key={p.title} {...p} onGive={args.onGive} />
      ))}
    </div>
  ),
};
