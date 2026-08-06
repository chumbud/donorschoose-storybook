import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ComponentProps } from 'react';
import { fn } from 'storybook/test';

import { DCButton } from './DCButton';
import { DCIcon, ICON_NAMES } from './DCIcon';

/** Button props plus a synthetic `iconName` control used by the icon stories. */
type StoryArgs = ComponentProps<typeof DCButton> & { iconName?: string };

/**
 * The DonorsChoose Button, ported from `donorschoose-web`
 * (`web/war/scss/base/form-elements/_buttons.scss`).
 *
 * Two variants — **primary** (filled blue CTA) and **secondary** (outlined) —
 * each with the states used across the site: hover, focus, active, loading,
 * disabled, small, and full-width.
 */
const meta = {
  title: 'Components/Button',
  component: DCButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'inline-radio',
      options: ['primary', 'secondary'],
    },
    size: {
      control: 'inline-radio',
      options: ['default', 'small'],
    },
    fullWidth: { control: 'boolean' },
    loading: { control: 'boolean' },
    warning: {
      control: 'boolean',
      description: 'Secondary-only destructive tone',
    },
    overlay: {
      control: 'boolean',
      description: 'Secondary-only styling for dark backgrounds',
    },
    disabled: { control: 'boolean' },
    children: { control: 'text' },
    iconPosition: {
      control: 'inline-radio',
      options: ['left', 'right'],
    },
    icon: { control: false },
    // Synthetic control (icon stories only): pick a glyph from the icon library.
    iconName: {
      control: 'select',
      options: ICON_NAMES,
      description: 'Icon from the SS Junior library (icon stories only)',
    },
  },
  args: {
    children: 'Give',
    warning: false,
    onClick: fn(),
  },
} satisfies Meta<StoryArgs>;

export default meta;
type Story = StoryObj<typeof meta>;

/* Render helper for the icon stories: pull the glyph from the icon library. */
const withIcon = ({ iconName, ...args }: StoryArgs) => (
  <DCButton {...args} icon={<DCIcon name={iconName ?? 'heart'} size={18} />} />
);

/* ---- Variants ---- */

export const Primary: Story = {
  args: {
    variant: 'primary',
  },
};

export const Secondary: Story = {
  args: { variant: 'secondary', children: 'Cancel' },
};

/* ---- States ---- */

export const Loading: Story = {
  args: { variant: 'primary', loading: true, children: 'Processing' },
};

export const Disabled: Story = {
  args: { variant: 'primary', disabled: true },
};

export const Small: Story = {
  args: { variant: 'primary', size: 'small' },
};

export const FullWidth: Story = {
  args: { variant: 'primary', fullWidth: true },
  parameters: { layout: 'padded' },
};

/* ---- Icons ---- */

export const IconLeft: Story = {
  args: {
    variant: 'primary',
    iconPosition: 'left',
    children: 'Give',
    iconName: 'heart',
  },
  render: withIcon,
};

export const IconRight: Story = {
  args: {
    variant: 'primary',
    iconPosition: 'right',
    children: 'Continue',
    iconName: 'right',
  },
  render: withIcon,
};

/* ---- Secondary tones ---- */

export const Warning: Story = {
  args: { variant: 'secondary', warning: true, children: 'Delete project' },
};

export const Overlay: Story = {
  args: { variant: 'secondary', overlay: true, children: 'Share' },
  decorators: [
    (Story) => (
      <div style={{ background: '#414142', padding: '2rem', borderRadius: 8 }}>
        <Story />
      </div>
    ),
  ],
};

/* ---- Overview: every variant × state at a glance ---- */

export const AllStates: Story = {
  parameters: { layout: 'padded', controls: { disable: true } },
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(140px, max-content))',
        gap: '1rem',
        alignItems: 'center',
      }}
    >
      <DCButton variant="primary">Primary</DCButton>
      <DCButton variant="primary" loading>
        Loading
      </DCButton>
      <DCButton variant="primary" disabled>
        Disabled
      </DCButton>
      <DCButton variant="primary" size="small">
        Small
      </DCButton>

      <DCButton variant="secondary">Secondary</DCButton>
      <DCButton variant="secondary" loading>
        Loading
      </DCButton>
      <DCButton variant="secondary" disabled>
        Disabled
      </DCButton>
      <DCButton variant="secondary" warning>
        Warning
      </DCButton>
    </div>
  ),
};
