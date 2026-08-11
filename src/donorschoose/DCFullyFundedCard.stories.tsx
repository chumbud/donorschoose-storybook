import type { Meta, StoryObj } from '@storybook/react-vite';
import { DCFullyFundedCard } from './DCFullyFundedCard';

/**
 * The **fully-funded project card** shown under "Fully funded projects at
 * [school]" on a school page. A green "FULLY FUNDED!" pill, funding date, impact
 * blurb, "$X raised by [teacher]", a full green progress bar, and a rosette.
 */
const meta = {
  title: 'Components/Cards/Fully Funded Card',
  component: DCFullyFundedCard,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  args: {
    date: '5/6/2026',
    description:
      'Ms. Hillenbrand and their classroom received a warm, welcoming music space where their voices can be heard, their basic needs met, and learning can happen with joy.',
    raised: 997,
    teacher: 'Ms. Hillenbrand',
  },
} satisfies Meta<typeof DCFullyFundedCard>;

export default meta;
type Story = StoryObj<typeof meta>;

/** A single card, sized as it appears in a column. */
export const Default: Story = {
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 340, paddingTop: '1.5rem' }}>
        <Story />
      </div>
    ),
  ],
};

const funded = [
  {
    date: '5/6/2026',
    raised: 997,
    teacher: 'Ms. Hillenbrand',
    description:
      'Ms. Hillenbrand and their classroom received a warm, welcoming music space where their voices can be heard, their basic needs met, and learning can happen with joy.',
  },
  {
    date: '2/11/2026',
    raised: 498,
    teacher: 'Mrs. Hecht',
    description:
      'Mrs. Hecht and their classroom received the tools and opportunity to lead a school-wide kindness initiative using their voices to support, include, and uplift others.',
  },
  {
    date: '5/6/2026',
    raised: 774,
    teacher: 'Ms. Enriquez',
    description:
      'Ms. Enriquez and their classroom received an iPad, clipboards, and creative supplies to support hands-on learning, classroom projects, and special kindergarten memories.',
  },
];

/** The 3-up "Fully funded projects at [school]" section. */
export const Section: Story = {
  parameters: { layout: 'fullscreen' },
  decorators: [],
  render: () => (
    <div style={{ padding: '2rem', background: 'var(--dc-vlgrey)' }}>
      <h2
        style={{
          textAlign: 'center',
          fontFamily: 'var(--dc-font-headline)',
          fontWeight: 900,
          fontSize: 'var(--dc-font-size-xxlarge)',
          color: 'var(--dc-black)',
          margin: '0.5rem 0 2.5rem',
        }}
      >
        Fully funded projects at La Francis Hardiman Elementary School Annex
      </h2>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
          gap: '1.5rem',
          width: '100%',
          maxWidth: 980,
          margin: '0 auto',
        }}
      >
        {funded.map((p) => (
          <DCFullyFundedCard key={p.teacher} {...p} />
        ))}
      </div>
    </div>
  ),
};
