import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';

import { DCButton } from './DCButton';

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
  },
  args: {
    children: 'Give',
    warning: false,
    onClick: fn(),
  },
} satisfies Meta<typeof DCButton>;

export default meta;
type Story = StoryObj<typeof meta>;

/* A couple of inline SVG icons for the icon stories. */
const HeartIcon = () => (
  <svg viewBox="0 0 24 24" role="img" aria-hidden="true">
    <path d="M12 21s-7.5-4.6-10-9.3C.6 8.8 2 5.5 5 4.8c1.9-.4 3.7.4 4.8 2 .3.4.8.7 1.2.7s.9-.3 1.2-.7c1.1-1.6 2.9-2.4 4.8-2 3 .7 4.4 4 3 6.9C19.5 16.4 12 21 12 21z" />
  </svg>
);

const ArrowRightIcon = () => (
  <svg viewBox="0 0 24 24" role="img" aria-hidden="true">
    <path d="M4 11h12.2l-4.6-4.6L13 5l7 7-7 7-1.4-1.4 4.6-4.6H4z" />
  </svg>
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
    icon: <HeartIcon />,
    iconPosition: 'left',
    children: 'Give',
  },
};

export const IconRight: Story = {
  args: {
    variant: 'primary',
    icon: <ArrowRightIcon />,
    iconPosition: 'right',
    children: 'Continue',
  },
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
