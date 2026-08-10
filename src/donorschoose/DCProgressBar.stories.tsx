import type { Meta, StoryObj } from '@storybook/react-vite';
import { DCProgressBar } from './DCProgressBar';
import { deprecatedSoon } from './underConstruction';

/**
 * The classic project **progress bar** from `proposal.jsp`. Use the controls as
 * a playground — total, funded, donor count, matched, and fully-funded.
 *
 * ⚠️ **Deprecated** — being replaced by the
 * [Proposed](/?path=/story/components-progress-bar-proposed--playground) bar.
 */
const meta = {
  title: 'Components/Progress Bar',
  component: DCProgressBar,
  parameters: { layout: 'centered', badges: ['deprecated'] },
  tags: ['autodocs', 'deprecated'],
  decorators: [deprecatedSoon],
  args: {
    total: 748,
    funded: 372,
    donors: 9,
    matched: false,
    fullyFunded: false,
    showStats: true,
  },
  argTypes: {
    total: { control: { type: 'range', min: 100, max: 5000, step: 50 } },
    funded: { control: { type: 'range', min: 0, max: 5000, step: 25 } },
    donors: { control: { type: 'number', min: 0 } },
  },
} satisfies Meta<typeof DCProgressBar>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Drag the controls to explore total / funded / donors / matched / fully-funded. */
export const Playground: Story = {};

/** Matched project — brand-blue track and fill. */
export const Matched: Story = { args: { matched: true } };

/** Fully funded — 100%. */
export const FullyFunded: Story = { args: { fullyFunded: true, donors: 24 } };
