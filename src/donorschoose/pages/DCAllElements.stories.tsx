import type { Meta, StoryObj } from '@storybook/react-vite';
import { DCAllElements } from './DCAllElements';

/**
 * Kitchen-sink page — every DonorsChoose component composed together, including
 * project cards in all states, the map, inputs, and a modal.
 */
const meta = {
  title: 'Pages/All Elements',
  component: DCAllElements,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof DCAllElements>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
