import type { Meta, StoryObj } from '@storybook/react-vite';
import { DCCheckbox } from './DCCheckbox';

/**
 * DonorsChoose Checkbox (and radio). Blue accent, keyboard focus ring, plus
 * indeterminate and disabled states.
 */
const meta = {
  title: 'Components/Checkbox',
  component: DCCheckbox,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
  args: { label: 'Make it monthly' },
  argTypes: {
    type: { control: 'inline-radio', options: ['checkbox', 'radio'] },
    indeterminate: { control: 'boolean' },
    disabled: { control: 'boolean' },
    checked: { control: 'boolean' },
  },
} satisfies Meta<typeof DCCheckbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { defaultChecked: false } };
export const Checked: Story = { args: { defaultChecked: true } };
export const Indeterminate: Story = { args: { indeterminate: true, label: 'Select all' } };
export const Disabled: Story = { args: { disabled: true, label: 'Unavailable' } };

export const States: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: '0.75rem' }}>
      <DCCheckbox label="Unchecked" />
      <DCCheckbox label="Checked" defaultChecked />
      <DCCheckbox label="Indeterminate" indeterminate />
      <DCCheckbox label="Disabled" disabled />
      <DCCheckbox label="Disabled + checked" disabled defaultChecked />
    </div>
  ),
};

export const RadioGroup: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1.5rem' }}>
      <DCCheckbox type="radio" name="freq" label="One-time" defaultChecked />
      <DCCheckbox type="radio" name="freq" label="Monthly" />
    </div>
  ),
};
