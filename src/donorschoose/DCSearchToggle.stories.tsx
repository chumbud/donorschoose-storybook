import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { DCSearchToggle } from './DCSearchToggle';

/**
 * The **search toggle** — the pill segmented control that switches search
 * results between list and map.
 *
 * Ported from `.search-toggle` in donorschoose-web
 * (`components/searchTools/_floatingSearch.scss`). The selected segment carries
 * its own white pill, so it hugs that label's width; hovering darkens the
 * control, brings the unselected glyph to full opacity, and nudges the pill
 * toward the segment you're heading for.
 */
const meta = {
  title: 'Components/Map/Search Toggle',
  component: DCSearchToggle,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  args: {
    value: 'list',
    onChange: fn(),
    options: [
      { value: 'list', label: 'List', icon: 'list' },
      { value: 'map', label: 'Map', icon: 'location' },
    ],
  },
} satisfies Meta<typeof DCSearchToggle>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Named so the hook lives in a real component, not a bare render callback. */
function ToggleDemo(args: React.ComponentProps<typeof DCSearchToggle>) {
  const [view, setView] = useState(args.value);
  return (
    <DCSearchToggle
      {...args}
      value={view}
      onChange={(v) => {
        setView(v);
        args.onChange?.(v);
      }}
    />
  );
}

export const List: Story = {};

/** Map selected — the pill has moved to the second segment. */
export const Map: Story = { args: { value: 'map' } };

/** Click between the two to watch the pill move. */
export const Interactive: Story = {
  render: (args) => <ToggleDemo {...args} />,
};

/** Without icons, and with a third segment — each pill hugs its own label. */
export const ThreeUp: Story = {
  args: {
    value: 'all',
    options: [
      { value: 'all', label: 'All' },
      { value: 'nearby', label: 'Nearby' },
      { value: 'saved', label: 'Saved' },
    ],
  },
  render: (args) => <ToggleDemo {...args} />,
};
