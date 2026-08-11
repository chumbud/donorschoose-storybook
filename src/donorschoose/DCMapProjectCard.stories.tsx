import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { DCMapProjectCard } from './DCMapProjectCard';

/**
 * The **map card** — a classroom project as it appears in the "Discover local
 * need" map sidebar. See the full panel on
 * [Map → Sidebar](/?path=/story/components-map-sidebar--default).
 */
const meta = {
  title: 'Components/Cards/Map Card',
  component: DCMapProjectCard,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  args: {
    title: 'Building a Space Made for Science',
    description:
      'Help me give my students a collaborative learning environment where they can work together as scientists.',
    teacher: 'Mrs. Shaolin',
    pct: 32,
    stillNeeded: 670,
    onFollow: fn(),
  },
  argTypes: {
    pct: { control: { type: 'range', min: 0, max: 100 } },
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 560 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof DCMapProjectCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

/** Nearly funded — just a little left to go. */
export const AlmostFunded: Story = {
  args: {
    title: 'Small Tools, Big Achievements!',
    description:
      'Help me give my students the basic fine motor and sensory items needed to participate meaningfully in the classroom.',
    teacher: 'Ms. Olivia',
    pct: 88,
    stillNeeded: 42,
  },
};
