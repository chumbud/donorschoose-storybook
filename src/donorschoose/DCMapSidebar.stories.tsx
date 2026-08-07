import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { DCMapSidebar } from './DCMapSidebar';

const IMG = '/images/essentials';

/**
 * The **map sidebar** — the school-detail panel that overlays the "Discover
 * local need" map when a marker is selected. It stacks the school name and
 * need-level subhead, a chip row, "Give to this school", the "N requests at this
 * school" [Map Cards](/?path=/docs/components-cards-map-card--docs), and
 * [Essentials cards](/?path=/docs/components-cards-map-essentials-card--docs).
 */
const meta = {
  title: 'Components/Map/Sidebar',
  component: DCMapSidebar,
  parameters: { layout: 'centered', badges: ['wip'] },
  tags: ['autodocs', 'wip'],
  args: {
    schoolName: 'PS 1 Alfred E Smith',
    needDescription: 'Nearly all students from low-income households',
    city: 'New York',
    state: 'NY',
    grades: 'Grades Pre-K - 6',
    numTeachers: 33,
    equityFocus: true,
    onGive: fn(),
    onClose: fn(),
    projects: [
      {
        title: 'Building a Space Made for Science',
        description:
          'Help me give my students a collaborative learning environment where they can work together as scientists.',
        teacher: 'Mrs. Shaolin',
        pct: 32,
        stillNeeded: 670,
      },
    ],
    essentials: [
      { name: 'Tissues', teacher: 'Ms. Bri', price: 18, imageUrl: `${IMG}/tissues.jpg` },
      { name: 'Crackers', teacher: 'Mrs. Shaolin', price: 24, imageUrl: `${IMG}/crackers.jpg` },
      { name: 'Pens', teacher: 'Ms. Madeehah', price: 10, imageUrl: `${IMG}/pens-felttip.jpg` },
    ],
  },
  decorators: [
    (Story) => (
      <div style={{ background: '#e9eef2', padding: '2rem', borderRadius: 12 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof DCMapSidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

/** School-level giving only — no open teacher requests. */
export const NoRequests: Story = {
  args: {
    needDescription: 'At least a third of students from low-income households',
    equityFocus: false,
    projects: [],
    essentials: [],
  },
};
