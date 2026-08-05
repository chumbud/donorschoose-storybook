import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { DCGiveWidget } from './DCGiveWidget';

/**
 * DonorsChoose Give Widget — the donation module. Fully customizable: title /
 * subtitle / fine-print copy, preset amounts, an optional Monthly ↔ One-time
 * toggle, and "Give another amount". The CTA label updates automatically.
 */
const meta = {
  title: 'Components/Give Widget',
  component: DCGiveWidget,
  parameters: { layout: 'centered', backgrounds: { default: 'grey' } },
  tags: ['autodocs'],
  args: {
    title: "Donate to Ms. Mitzy Diaz's classroom",
    subtitle: 'Every donation goes towards supplies this classroom needs',
    amounts: [15, 25, 50, 100],
    defaultAmount: 50,
    allowMonthly: true,
    defaultFrequency: 'monthly',
    allowCustomAmount: true,
    onGive: fn(),
  },
  argTypes: {
    defaultFrequency: { control: 'inline-radio', options: ['monthly', 'one-time'] },
    allowMonthly: { control: 'boolean' },
    allowCustomAmount: { control: 'boolean' },
  },
} satisfies Meta<typeof DCGiveWidget>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const OneTimeOnly: Story = {
  args: { allowMonthly: false, subtitle: 'Give a one-time gift to this classroom' },
};

export const CustomAmounts: Story = {
  args: { amounts: [50, 100, 250, 500], defaultAmount: 100, allowMonthly: false, title: 'Support this fund' },
};

export const CustomCopy: Story = {
  args: {
    title: 'Fuel a field trip',
    subtitle: 'Help these students explore the world beyond the classroom.',
    amounts: [20, 40, 60, 80],
    defaultAmount: 40,
    monthlyNote: 'Cancel your monthly gift anytime from your account.',
  },
};
