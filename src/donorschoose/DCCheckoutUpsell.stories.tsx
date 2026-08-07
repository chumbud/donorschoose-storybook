import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { DCCheckoutUpsell } from './DCCheckoutUpsell';
import { underConstruction } from './underConstruction';

const IMG = '/images/essentials';

/**
 * Checkout **add-on upsell** — invites a donor to add a classroom-essentials
 * item (or a fund) to their gift at checkout. Uses the DonorsChoose purple, the
 * essentials "excite" sparkle marks, and a real supply photo from `war/images`.
 */
const meta = {
  title: 'Components/Checkout Upsell',
  component: DCCheckoutUpsell,
  parameters: { layout: 'centered', badges: ['wip'] },
  tags: ['autodocs', 'wip'],
  decorators: [underConstruction],
  args: {
    kind: 'essentials',
    teacher: 'Ms. Kristen',
    location: 'New York City, NY',
    item: 'markers',
    amount: 2,
    imageUrl: `${IMG}/markers-color.jpg`,
    onAdd: fn(),
  },
} satisfies Meta<typeof DCCheckoutUpsell>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Essentials: Story = {};

export const AnotherItem: Story = {
  args: {
    teacher: 'Mr. Lopez',
    location: 'Dallas, TX',
    item: 'glue sticks',
    amount: 3,
    imageUrl: `${IMG}/gluesticks.jpg`,
  },
};
