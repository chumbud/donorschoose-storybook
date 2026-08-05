import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { DCShareTools, SHARE_PLATFORMS } from './DCShareTools';

/**
 * DonorsChoose Share Tools — the "Give this project a boost!" share bar. White
 * pills with a colored icon disc + dark label, an optional copy-link row, and
 * the boost-card header. Use the **platforms** control to choose which show up.
 */
const meta = {
  title: 'Components/Share Tools',
  component: DCShareTools,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
  args: {
    platforms: ['facebook', 'email', 'nextdoor', 'linkedin'],
    showCopyLink: true,
    layout: 'row',
    onShare: fn(),
    onCopy: fn(),
  },
  argTypes: {
    platforms: { control: 'check', options: [...SHARE_PLATFORMS], description: 'Which platforms/actions show up' },
    layout: { control: 'inline-radio', options: ['row', 'stacked', 'icons'] },
    showCopyLink: { control: 'boolean' },
    heading: { control: 'text' },
    description: { control: 'text' },
  },
} satisfies Meta<typeof DCShareTools>;

export default meta;
type Story = StoryObj<typeof meta>;

/** The full boost card (default). */
export const Boost: Story = {};

/** Just the buttons + copy link, no grey card. */
export const BareButtons: Story = {
  args: { heading: null, description: null },
};

export const IconsOnly: Story = {
  args: { heading: null, description: null, layout: 'icons', showCopyLink: false },
};

export const SelectedPlatforms: Story = {
  args: {
    heading: 'Share this fund',
    platforms: ['facebook', 'email', 'linkedin', 'twitter', 'sms'],
    showCopyLink: false,
  },
};
