import type { Meta, StoryObj } from '@storybook/react-vite';
import { DCSchoolCard } from './DCSchoolCard';

/**
 * The **school card** used on the "Support a school" page
 * (donorschoose.org/supportaschool). A cream tile with a location pill and the
 * school name, showing either the teachers who use DonorsChoose there or a
 * "Become a Founding Supporter" prompt when none are active yet.
 */
const meta = {
  title: 'Components/Cards/School Card',
  component: DCSchoolCard,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
  args: {
    schoolName: 'South Bronx Classical Charter School III',
    city: 'New York',
    state: 'NY',
    numTeachers: 1,
    teachers: [{ name: 'Ms. Rivera' }],
  },
  argTypes: {
    foundingSupporter: { control: 'boolean' },
    numTeachers: { control: { type: 'number', min: 0 } },
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 340 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof DCSchoolCard>;

export default meta;
type Story = StoryObj<typeof meta>;

/** One teacher uses DonorsChoose at this school. */
export const OneTeacher: Story = {};

/** Several teachers — photos stack and the count reads "N teachers use…". */
export const ManyTeachers: Story = {
  args: {
    schoolName: 'District 2 Pre-K Center Reade Street',
    numTeachers: 6,
    teachers: [
      { name: 'Ms. Gao' },
      { name: 'Mr. Ellis' },
      { name: 'Ms. Park' },
      { name: 'Ms. Chang' },
    ],
  },
};

/** No active teachers yet — the "Become a Founding Supporter" call to action. */
export const FoundingSupporter: Story = {
  args: {
    schoolName: 'District 2 Pre-K Center at 52 Chambers Street',
    foundingSupporter: true,
    teachers: [],
  },
};

/** The 3-up responsive grid as it appears under "Schools in [city]". */
export const Grid: Story = {
  parameters: { layout: 'fullscreen' },
  decorators: [],
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: '1rem',
        padding: '2rem',
        background: 'var(--dc-vlgrey)',
      }}
    >
      <DCSchoolCard
        schoolName="District 2 Pre-K Center at 52 Chambers Street"
        city="New York"
        state="NY"
        foundingSupporter
      />
      <DCSchoolCard
        schoolName="South Bronx Classical Charter School III"
        city="New York"
        state="NY"
        numTeachers={1}
        teachers={[{ name: 'Ms. Rivera' }]}
      />
      <DCSchoolCard
        schoolName="District 2 Pre-K Center Reade Street"
        city="New York"
        state="NY"
        numTeachers={3}
        teachers={[{ name: 'Ms. Gao' }, { name: 'Mr. Ellis' }, { name: 'Ms. Park' }]}
      />
    </div>
  ),
};
