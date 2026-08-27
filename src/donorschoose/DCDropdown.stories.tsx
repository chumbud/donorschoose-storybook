import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { DCDropdown } from './DCDropdown';

/**
 * The sort **dropdown** above the search results. The trigger reads as an
 * inline link; opening it reveals a panel that restates the current choice —
 * with the italic parenthetical explaining what it sorts on — above the
 * alternatives. The panel fades and scales in from the trigger's edge.
 */
const meta = {
  title: 'Components/Dropdown',
  component: DCDropdown,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  args: {
    onChange: fn(),
    options: [
      {
        value: 'urgent',
        label: 'most urgent',
        description: 'lowest cost to complete + highest economic need + fewest days left',
      },
      { value: 'cost', label: 'lowest cost to complete' },
      { value: 'need', label: 'highest economic need' },
      { value: 'days', label: 'fewest days left' },
      { value: 'donors', label: 'most donors' },
      { value: 'newest', label: 'newest' },
    ],
  },
  decorators: [
    // The panel drops below the trigger, so leave it somewhere to land.
    (Story) => (
      <div style={{ paddingBottom: 420, fontFamily: 'var(--dc-font-body)' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof DCDropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

/** As it appears on the search page — click the trigger to open the panel. */
export const Default: Story = {
  args: {
    children: (
      <>
        <b>89,213</b> projects sorted by
      </>
    ),
  },
};

/** Hanging from the left edge instead, for triggers on the left of a row. */
export const AlignLeft: Story = {
  args: {
    align: 'left',
    children: (
      <>
        <b>89,213</b> projects sorted by
      </>
    ),
  },
};

/** Options with no description — the panel still restates the current choice. */
export const NoDescriptions: Story = {
  args: {
    children: 'Show',
    options: [
      { value: 'all', label: 'all projects' },
      { value: 'matched', label: 'matched projects' },
      { value: 'funded', label: 'fully funded' },
    ],
  },
};
