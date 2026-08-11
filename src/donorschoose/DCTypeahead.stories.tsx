import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { DCTypeahead } from './DCTypeahead';

/**
 * Search **type-ahead** — the autocomplete dropdown from the site search field.
 * Shows a query completion, then TEACHERS and SCHOOLS result groups (with a
 * "View all matching teachers" link). Matches are bolded in every result.
 */
const meta = {
  title: 'Components/Inputs',
  component: DCTypeahead,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  args: { onChange: fn(), onViewAllTeachers: fn() },
} satisfies Meta<typeof DCTypeahead>;

export default meta;
type Story = StoryObj<typeof meta>;

const teachers = [
  { name: 'Mrs. K', school: 'Arbor Park Middle School', location: 'Oak Forest, IL', avatar: 'teacher-3' },
  { name: 'Mrs. K', school: 'Newton Falls Elementary Middle School', location: 'Newton Falls, OH', avatar: 'teacher-6' },
  { name: 'Ms. K', school: 'Highpoint Virtual Academy of Michigan', location: 'Grand Rapids, MI', avatar: 'teacher-9' },
];
const schools = [
  { name: 'Lathers Pre K-K Campus', address: '28351 Marquette St, Garden City, MI' },
  { name: 'Kingsford High School', address: '201 Hamilton Ave, Kingsford, MI' },
];

/** The type-ahead open on the query "k" — as it appears mid-search. */
export const Typeahead: Story = {
  name: 'Search Type-ahead',
  args: {
    value: 'k',
    completion: 'kindergarten',
    open: true,
    teachers,
    schools,
  },
  render: (args) => (
    <div style={{ height: 620 }}>
      <DCTypeahead {...args} />
    </div>
  ),
};
