import type { Meta, StoryObj } from '@storybook/react-vite';
import { DCIcon } from './DCIcon';

/**
 * **SS Junior** — the DonorsChoose icon set (149 glyphs), ported from the
 * `icon-junior.svg` symbol sprite. Icons inherit the current text color.
 *
 * ```tsx
 * <DCIcon name="heart" size={24} title="Favorite" />
 * ```
 */
const meta = {
  title: 'Components/Icons',
  component: DCIcon,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
} satisfies Meta<typeof DCIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Single: Story = {
  args: { name: 'heart', size: 32, title: 'Favorite' },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: '1.5rem', color: 'var(--dc-black)' }}>
      {[16, 24, 32, 48, 64].map((s) => (
        <div key={s} style={{ textAlign: 'center' }}>
          <DCIcon name="rocket" size={s} />
          <div style={{ fontSize: 12, color: 'var(--dc-grey)', marginTop: 4 }}>{s}px</div>
        </div>
      ))}
    </div>
  ),
};

export const Colors: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1.5rem' }}>
      {[
        ['var(--dc-black)', 'heart'],
        ['var(--dc-blue-link)', 'search'],
        ['var(--dc-green)', 'check'],
        ['var(--dc-red-error)', 'alert'],
        ['var(--dc-blue)', 'star'],
      ].map(([color, name]) => (
        <span key={name} style={{ color }}>
          <DCIcon name={name} size={32} />
        </span>
      ))}
    </div>
  ),
};

// The full icon gallery — sprite + brand/map/social, with tinting and
// downloads — lives in SiteIcons.stories.tsx (Components/Icons → Gallery).
