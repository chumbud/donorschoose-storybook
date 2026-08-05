import type { Meta, StoryObj } from '@storybook/react-vite';
import { DCHeading, DCSubheader, DCText } from './DCText';

/**
 * Text primitives — `DCHeading`, `DCSubheader`, and `DCText` — synced with
 * `_typography.scss`. Use these for headers and paragraph copy.
 */
const meta = {
  title: 'Components/Text',
  component: DCHeading,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
} satisfies Meta<typeof DCHeading>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Heading: Story = {
  args: { level: 1, children: 'Support a classroom today' },
};

export const Paragraph: Story = {
  render: () => (
    <div style={{ maxWidth: 640 }}>
      <DCText>
        Teachers across the country submit classroom project requests, and donors give any amount
        to fund the materials and experiences students need to learn.
      </DCText>
      <DCText variant="discreet">
        Discreet text — used for captions, metadata, and fine print.
      </DCText>
    </div>
  ),
};

export const Composed: Story = {
  render: () => (
    <div style={{ maxWidth: 680 }}>
      <DCHeading level={1}>Bring learning to life</DCHeading>
      <DCSubheader>Every gift goes directly to a public school classroom.</DCSubheader>
      <DCText variant="large">
        Choose a project that speaks to you and fund exactly what a teacher and their students need.
      </DCText>
      <DCHeading level={3}>How it works</DCHeading>
      <DCText>
        Browse thousands of teacher-submitted projects, give any amount, and get a thank-you and
        photos once the classroom is funded.
      </DCText>
      <DCHeading level={4}>Fine print</DCHeading>
      <DCText variant="discreet">
        Gifts are tax-deductible to the fullest extent allowed by law.
      </DCText>
    </div>
  ),
};

export const ThickDisplay: Story = {
  render: () => (
    <DCHeading level={1} thick>
      100% of your donation reaches the classroom
    </DCHeading>
  ),
};
