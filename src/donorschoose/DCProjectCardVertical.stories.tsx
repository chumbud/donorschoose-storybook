import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { DCProjectCard } from './DCProjectCard';
import { projects, byStatus } from './mockProjects';

/**
 * The **vertical project card** — the compact "photo on top, title overlaid"
 * variant of the [Project Card](/?path=/docs/components-cards-project-card--docs)
 * used in "Nearby projects" grids. It's the same `DCProjectCard` component with
 * `layout="vertical"`; this page documents the vertical layout on its own.
 */
const meta = {
  title: 'Components/Cards/Vertical Project Card',
  component: DCProjectCard,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
  args: { ...byStatus('active'), layout: 'vertical', onGive: fn() },
  argTypes: {
    // Fixed to vertical on this page — see Project Card for the horizontal row.
    layout: { table: { disable: true }, control: false },
  },
  decorators: [
    (Story) => (
      <div style={{ width: 300 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof DCProjectCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Active: Story = {};
export const AlmostFunded: Story = { args: byStatus('almost') };
export const Funded: Story = { args: byStatus('funded') };
export const Matched: Story = { args: byStatus('matched') };

/** Shimmering skeleton shown while the card's data loads. */
export const Loading: Story = { args: { loading: true } };

/** A responsive row of vertical cards, as in a "Nearby projects" grid. */
export const Grid: Story = {
  parameters: { layout: 'fullscreen' },
  decorators: [],
  render: (args) => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: '1.5rem',
        padding: '2rem',
      }}
    >
      {projects.slice(0, 4).map((p) => (
        <DCProjectCard key={p.title} {...p} layout="vertical" onGive={args.onGive} />
      ))}
    </div>
  ),
};
