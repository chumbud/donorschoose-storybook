import type { Meta, StoryObj } from '@storybook/react-vite';
import { DCAvatar, DCAvatarGroup, PLACEHOLDER_AVATARS } from './DCAvatar';

/**
 * DonorsChoose Avatar — an illustrated placeholder, a photo, or initials on a
 * brand tint. Use the **placeholder** control to switch between the built-in
 * DonorsChoose placeholder illustrations. Includes a stacked `DCAvatarGroup`.
 */
const meta = {
  title: 'Components/Avatar',
  component: DCAvatar,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    placeholder: {
      control: 'select',
      options: ['', ...PLACEHOLDER_AVATARS],
      description: 'Built-in DonorsChoose placeholder illustration',
    },
    shape: { control: 'inline-radio', options: ['circle', 'rounded'] },
    size: { control: { type: 'range', min: 24, max: 128, step: 4 } },
    ring: { control: 'boolean' },
    src: { control: false },
  },
} satisfies Meta<typeof DCAvatar>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Switch the illustration with the `placeholder` control. */
export const Placeholder: Story = {
  args: { name: 'Ms. Alvarez', placeholder: 'teacher-1', size: 80 },
};

export const Initials: Story = { args: { name: 'Jordan Lee', size: 80 } };

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      {[24, 32, 48, 64, 96].map((s) => (
        <DCAvatar key={s} name="Sam Rivera" placeholder="teacher-4" size={s} />
      ))}
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
      <DCAvatar name="Ms. Alvarez" placeholder="teacher-2" size={64} />
      <DCAvatar name="Alex Kim" size={64} />
      <DCAvatar name="Priya Patel" placeholder="donor-5" size={64} shape="rounded" />
      <DCAvatar name="Ms. Alvarez" placeholder="teacher-7" size={64} ring />
    </div>
  ),
};

/** Every built-in placeholder illustration. */
export const AllPlaceholders: Story = {
  parameters: { layout: 'fullscreen' },
  render: () => (
    <div style={{ padding: '2rem' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(84px, 1fr))', gap: '1rem' }}>
        {PLACEHOLDER_AVATARS.map((p) => (
          <div key={p} style={{ textAlign: 'center' }}>
            <DCAvatar name={p} placeholder={p} size={64} />
            <div style={{ fontSize: 11, color: 'var(--dc-grey)', marginTop: 6 }}>{p}</div>
          </div>
        ))}
      </div>
    </div>
  ),
};

export const Group: Story = {
  render: () => (
    <DCAvatarGroup
      size={44}
      people={[
        { name: 'Ms. Alvarez', placeholder: 'teacher-1' },
        { name: 'Jordan Lee', placeholder: 'donor-2' },
        { name: 'Sam Rivera', placeholder: 'donor-6' },
        { name: 'Priya Patel', placeholder: 'teacher-8' },
        { name: 'Alex Kim' },
        { name: 'Chris Doe' },
      ]}
    />
  ),
};
