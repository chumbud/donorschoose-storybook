import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { DCMapEssentialsCard } from './DCMapEssentialsCard';

const IMG = '/images/essentials';

/**
 * The **essentials version of the map card** — a single Essentials-list item as
 * it appears in the "Discover local need" map sidebar. See the full panel on
 * [Map → Sidebar](/?path=/story/components-map-sidebar--default).
 */
const meta = {
  title: 'Components/Cards/Map Essentials Card',
  component: DCMapEssentialsCard,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
  args: {
    name: 'Tissues',
    teacher: 'Ms. Bri',
    price: 18,
    imageUrl: `${IMG}/tissues.jpg`,
    onAdd: fn(),
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 560 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof DCMapEssentialsCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

/** A stack of essentials requests, as they appear below the project cards. */
export const Stack: Story = {
  decorators: [],
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: 560 }}>
      <DCMapEssentialsCard name="Tissues" teacher="Ms. Bri" price={18} imageUrl={`${IMG}/tissues.jpg`} onAdd={args.onAdd} />
      <DCMapEssentialsCard name="Crackers" teacher="Mrs. Shaolin" price={24} imageUrl={`${IMG}/crackers.jpg`} onAdd={args.onAdd} />
      <DCMapEssentialsCard name="Pens" teacher="Ms. Madeehah" price={10} imageUrl={`${IMG}/pens-felttip.jpg`} onAdd={args.onAdd} />
      <DCMapEssentialsCard name="Play-Doh" teacher="Ms. Destinee" price={10} imageUrl={`${IMG}/playdoh.jpg`} onAdd={args.onAdd} />
    </div>
  ),
};
