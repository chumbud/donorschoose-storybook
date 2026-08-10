import type { Meta, StoryObj } from '@storybook/react-vite';
import { DCScrollArea } from './DCScrollArea';

/**
 * The DonorsChoose **styled scrollbar** (grey thumb on a light track), ported
 * from `.projects-box` in map.scss. Add the `dc-scroll` class to any overflowing
 * element, or use this `DCScrollArea` wrapper to also set the axis and max size.
 */
const meta = {
  title: 'Components/Scroll Area',
  component: DCScrollArea,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof DCScrollArea>;

export default meta;
type Story = StoryObj<typeof meta>;

const boxStyle = {
  width: 320,
  padding: '1rem',
  border: '1px solid var(--dc-grey-stroke)',
  borderRadius: 'var(--dc-radius-standard)',
  fontFamily: 'var(--dc-font-body)',
  color: 'var(--dc-black)',
  lineHeight: 1.6,
} as const;

const paragraphs = Array.from({ length: 8 }, (_, i) => (
  <p key={i} style={{ margin: i === 0 ? 0 : '0.75rem 0 0' }}>
    {i + 1}. Materials funded through DonorsChoose are shipped directly to the classroom, and the
    teacher shares photos and thank-you notes once they arrive.
  </p>
));

/** Vertical scroll — the common case (a capped-height list/panel). */
export const Vertical: Story = {
  args: { axis: 'y', maxHeight: 220, style: boxStyle },
  render: (args) => <DCScrollArea {...args}>{paragraphs}</DCScrollArea>,
};

/** Horizontal scroll — a wide row that overflows its container. */
export const Horizontal: Story = {
  args: { axis: 'x', maxWidth: 320, style: { ...boxStyle, whiteSpace: 'nowrap' } },
  render: (args) => (
    <DCScrollArea {...args}>
      <div style={{ display: 'inline-flex', gap: '0.75rem' }}>
        {Array.from({ length: 12 }, (_, i) => (
          <span
            key={i}
            style={{
              flex: 'none',
              width: 90,
              height: 90,
              borderRadius: 12,
              background: 'var(--dc-beige)',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {i + 1}
          </span>
        ))}
      </div>
    </DCScrollArea>
  ),
};
