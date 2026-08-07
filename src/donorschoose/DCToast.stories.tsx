import { useState, type CSSProperties, type ReactNode } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { DCToast } from './DCToast';
import type { DCToastProps } from './DCToast';
import { DCIcon } from './DCIcon';

/**
 * A **toast** — brief, self-dismissing feedback (added to cart, followed a
 * school/teacher/project, an error, or just getting attention). It slides in
 * from the nearest corner, with an icon on the left, the message in the middle,
 * an optional action button on the right, and a countdown bar across the top.
 *
 * **Guidelines**
 * - Keep copy short — ~140 characters (3–4 lines at the 300px max width).
 * - Tone is `black` or DonorsChoose `blue`.
 * - `duration` (seconds) shows the countdown bar and auto-dismisses; hovering
 *   pauses it. `duration={0}` stays until dismissed.
 * - On mobile it docks to the top of the screen and slides down.
 */
const meta = {
  title: 'Components/Toast',
  component: DCToast,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
  args: {
    message: 'Added to your cart!',
    tone: 'black',
    position: 'bottom-right',
    duration: 0,
    showClose: false,
    onDismiss: fn(),
  },
  argTypes: {
    tone: { control: 'inline-radio', options: ['black', 'blue'] },
    position: {
      control: 'select',
      options: ['top-left', 'top-right', 'bottom-left', 'bottom-right'],
    },
    duration: { control: { type: 'number', min: 0, max: 10, step: 1 } },
    icon: {
      control: 'select',
      options: ['none', 'cart', 'heart', 'check', 'alert', 'star'],
      mapping: {
        none: undefined,
        cart: <DCIcon name="cart" size={22} />,
        heart: <DCIcon name="heart" size={22} />,
        check: <DCIcon name="check" size={22} />,
        alert: <DCIcon name="alert" size={22} />,
        star: <DCIcon name="star" size={22} />,
      },
    },
    action: {
      control: 'select',
      options: ['none', 'primary', 'secondary'],
      mapping: {
        none: undefined,
        primary: { label: 'View cart', variant: 'primary', onClick: fn() },
        secondary: { label: 'Undo', variant: 'secondary', onClick: fn() },
      },
    },
  },
} satisfies Meta<typeof DCToast>;

export default meta;
type Story = StoryObj<typeof meta>;

/* A framed stage so the (position-absolute) toast has a corner to sit in. */
const stage: CSSProperties = {
  position: 'relative',
  minHeight: 380,
  padding: '1.5rem',
  borderRadius: 12,
  border: '1px solid var(--dc-grey-stroke)',
  background: 'var(--dc-vlgrey)',
  overflow: 'hidden',
};
const hint: CSSProperties = {
  fontFamily: 'var(--dc-font-body)',
  fontSize: '0.85rem',
  color: 'var(--dc-grey)',
};

/** Interactive stage — tweak the controls, then "Show toast" to replay it. */
function Stage(args: DCToastProps) {
  const [key, setKey] = useState(1);
  const [visible, setVisible] = useState(true);
  return (
    <div style={stage}>
      <button
        type="button"
        className="dc-button dc-button--secondary dc-button--small"
        onClick={() => {
          setKey((k) => k + 1);
          setVisible(true);
        }}
      >
        Show toast
      </button>
      <p style={hint}>
        The toast appears in the <b>{args.position}</b> corner of this frame.
        {args.duration ? ` Auto-dismisses in ${args.duration}s (hover to pause).` : ''}
      </p>
      {visible && (
        <DCToast key={key} {...args} fixed={false} onDismiss={() => setVisible(false)} />
      )}
    </div>
  );
}

export const Playground: Story = {
  args: {
    message: 'Small Tools, Big Achievements! is now in your cart.',
    icon: 'cart' as unknown as ReactNode,
    action: 'primary' as unknown as DCToastProps['action'],
    position: 'top-right',
    duration: 4,
  },
  render: (args) => <Stage {...args} />,
};

/** Both tones: black (#212121) and DonorsChoose blue (#3804c1). */
export const Tones: Story = {
  render: () => (
    <div style={{ ...stage, minHeight: 220, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', background: 'var(--dc-white)' }}>
      <div style={{ position: 'relative', minHeight: 120 }}>
        <DCToast
          fixed={false}
          position="top-left"
          tone="black"
          icon={<DCIcon name="check" size={22} />}
          message="You're now following this classroom. We'll email you when it's funded!"
        />
      </div>
      <div style={{ position: 'relative', minHeight: 120 }}>
        <DCToast
          fixed={false}
          position="top-left"
          tone="blue"
          icon={<DCIcon name="heart" size={22} />}
          message="You're now following this classroom. We'll email you when it's funded!"
        />
      </div>
    </div>
  ),
};

/** All four corners — each slides in from its nearest edge. */
export const Positions: Story = {
  render: () => (
    <div style={{ ...stage, minHeight: 320 }}>
      <p style={hint}>Four corners, four slide-in directions.</p>
      <DCToast fixed={false} position="top-left" tone="black" message="Top-left toast." icon={<DCIcon name="star" size={22} />} />
      <DCToast fixed={false} position="top-right" tone="blue" message="Top-right toast." icon={<DCIcon name="star" size={22} />} />
      <DCToast fixed={false} position="bottom-left" tone="blue" message="Bottom-left toast." icon={<DCIcon name="star" size={22} />} />
      <DCToast fixed={false} position="bottom-right" tone="black" message="Bottom-right toast." icon={<DCIcon name="star" size={22} />} />
    </div>
  ),
};

/** The countdown bar shrinks from full to empty over `duration`. Hover to pause. */
export const Countdown: Story = {
  args: { duration: 3, position: 'top-right', message: 'This will dismiss in 3 seconds — hover to pause.' },
  render: (args) => <Stage {...args} />,
};

/** Real feedback moments — add to cart, follow, and an error. */
export const UseCases: Story = {
  render: () => (
    <div style={{ ...stage, minHeight: 300, display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'flex-start', background: 'var(--dc-white)' }}>
      <div style={{ position: 'relative', width: '100%', minHeight: 68 }}>
        <DCToast
          fixed={false}
          position="top-left"
          tone="black"
          icon={<DCIcon name="cart" size={22} />}
          message="Markers added to your cart."
          action={{ label: 'View cart', variant: 'primary', onClick: fn() }}
        />
      </div>
      <div style={{ position: 'relative', width: '100%', minHeight: 68 }}>
        <DCToast
          fixed={false}
          position="top-left"
          tone="blue"
          icon={<DCIcon name="check" size={22} />}
          message="You're now following Ms. Olivia's classroom."
          action={{ label: 'Undo', variant: 'secondary', onClick: fn() }}
        />
      </div>
      <div style={{ position: 'relative', width: '100%', minHeight: 68 }}>
        <DCToast
          fixed={false}
          position="top-left"
          tone="black"
          icon={<DCIcon name="alert" size={22} />}
          message="Something went wrong adding that gift. Please try again."
          showClose
        />
      </div>
    </div>
  ),
};

/**
 * Fixed to the viewport corner — the real usage. Resize the preview to a mobile
 * width (≤ 46em) to see it dock to the top of the screen and slide down.
 */
export const FixedToViewport: Story = {
  args: {
    message: 'Fixed to the viewport — resize narrow to see the mobile top-dock.',
    position: 'bottom-right',
    icon: 'star' as unknown as ReactNode,
    duration: 0,
    showClose: true,
  },
  render: (args) => (
    <div style={{ minHeight: 420 }}>
      <DCToast {...args} fixed />
    </div>
  ),
};
