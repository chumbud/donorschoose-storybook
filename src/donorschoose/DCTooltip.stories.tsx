import type { Meta, StoryObj } from '@storybook/react-vite';
import { DCTooltip } from './DCTooltip';

/**
 * The DonorsChoose Tooltip. Shows on **hover** and **keyboard focus** (Tab to
 * the trigger), or force it open with the `open` prop. On mobile it can render
 * as a fixed bottom sheet.
 *
 * The legacy site tooltips are image-sprite based; this is a modern rebuild on
 * DC design tokens.
 */
const meta = {
  title: 'Components/Tooltip',
  component: DCTooltip,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    placement: { control: 'inline-radio', options: ['top', 'bottom', 'left', 'right'] },
    variant: { control: 'inline-radio', options: ['dark', 'blue'] },
    open: { control: 'boolean' },
    mobileSheet: { control: 'boolean' },
    content: { control: 'text' },
  },
  args: {
    content: 'Funds go directly to the classroom.',
    placement: 'top',
    variant: 'dark',
  },
} satisfies Meta<typeof DCTooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

/* A neutral demo trigger. */
const InfoBadge = () => (
  <span
    style={{
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: 24,
      height: 24,
      borderRadius: '50%',
      background: 'var(--dc-grey-stroke)',
      color: 'var(--dc-grey)',
      fontFamily: 'var(--dc-font-headline)',
      fontWeight: 700,
      fontSize: 14,
      cursor: 'default',
    }}
  >
    ?
  </span>
);

/* ---- Default (hover / focus) ---- */
export const Default: Story = {
  render: (args) => (
    <DCTooltip {...args}>
      <InfoBadge />
    </DCTooltip>
  ),
};

/* ---- Forced-open state ---- */
export const Open: Story = {
  args: { open: true },
  render: (args) => (
    <DCTooltip {...args}>
      <InfoBadge />
    </DCTooltip>
  ),
};

/* ---- Blue variant ---- */
export const Blue: Story = {
  args: { open: true, variant: 'blue', content: 'Your gift is tax-deductible.' },
  render: (args) => (
    <DCTooltip {...args}>
      <InfoBadge />
    </DCTooltip>
  ),
};

/* ---- All four placements (forced open) ---- */
export const Placements: Story = {
  parameters: { layout: 'fullscreen' },
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '5rem 4rem',
        placeItems: 'center',
        padding: '6rem 4rem',
        fontFamily: 'var(--dc-font-body)',
      }}
    >
      {(['top', 'bottom', 'left', 'right'] as const).map((p) => (
        <DCTooltip key={p} open placement={p} content={`Placement: ${p}`}>
          <span
            style={{
              fontFamily: 'var(--dc-font-headline)',
              fontWeight: 700,
              fontSize: '0.9rem',
              color: '#fff',
              background: 'var(--dc-blue-link)',
              borderRadius: 'var(--dc-radius-button)',
              padding: '0.6em 1.2em',
            }}
          >
            {p}
          </span>
        </DCTooltip>
      ))}
    </div>
  ),
};

/* ---- States overview ---- */
export const States: Story = {
  parameters: { layout: 'fullscreen' },
  render: () => (
    <div
      style={{
        display: 'flex',
        gap: '4rem',
        alignItems: 'center',
        padding: '5rem 4rem',
        fontFamily: 'var(--dc-font-body)',
      }}
    >
      <div style={{ textAlign: 'center' }}>
        <DCTooltip content="Hover or focus me">
          <InfoBadge />
        </DCTooltip>
        <div style={{ marginTop: '1rem', fontSize: '0.8rem', color: 'var(--dc-grey)' }}>
          Resting → hover / focus
        </div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <DCTooltip open content="Always visible">
          <InfoBadge />
        </DCTooltip>
        <div style={{ marginTop: '1rem', fontSize: '0.8rem', color: 'var(--dc-grey)' }}>
          Open (forced)
        </div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <DCTooltip open variant="blue" content="Brand blue">
          <InfoBadge />
        </DCTooltip>
        <div style={{ marginTop: '1rem', fontSize: '0.8rem', color: 'var(--dc-grey)' }}>
          Blue variant
        </div>
      </div>
    </div>
  ),
};

/* ---- Mobile bottom sheet ---- */
export const MobileSheet: Story = {
  args: {
    open: true,
    mobileSheet: true,
    content: 'On mobile, the tooltip anchors to the bottom of the screen like a toast.',
  },
  parameters: {
    viewport: { defaultViewport: 'mobile1' },
    docs: {
      description: {
        story:
          'At ≤46em the bubble becomes a fixed bottom sheet (mirrors the site `.toast`). If it renders inline, narrow the preview to a phone width to trigger the breakpoint.',
      },
    },
  },
  render: (args) => (
    <div style={{ padding: '2rem', fontFamily: 'var(--dc-font-body)' }}>
      <DCTooltip {...args}>
        <InfoBadge />
      </DCTooltip>
    </div>
  ),
};
