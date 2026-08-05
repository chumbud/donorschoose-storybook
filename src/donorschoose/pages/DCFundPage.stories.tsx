import type { Meta, StoryObj } from '@storybook/react-vite';
import { DCFundPage } from './DCFundPage';

/**
 * A **designated fund** landing page — a themed/sponsored giving page where
 * donations pool toward a goal and flow to classroom projects. Hero with fund
 * title, goal progress, and a give module; fund activity feed; share tools;
 * trust and learn-more sections.
 */
const meta = {
  title: 'Pages/Fund',
  component: DCFundPage,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof DCFundPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
