import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import type { DCMapNeed } from './DCMap';
import { DCMap, DCMapPin, DCMapPopup, DCSchoolMarker, DCMapNeedLegend } from './DCMap';

/**
 * Lightweight, brand-styled **map UI** for composing map layouts — a map
 * surface, pins/markers (with counts + active state), and an anchored popup.
 * This is a styling/layout kit, not a real map engine.
 */
const meta = {
  title: 'Components/Map',
  component: DCMap,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
} satisfies Meta<typeof DCMap>;

export default meta;
type Story = StoryObj<typeof meta>;

const pins = [
  { id: 1, x: 22, y: 34, count: 8 },
  { id: 2, x: 48, y: 52, count: 3 },
  { id: 3, x: 70, y: 30, count: 12 },
  { id: 4, x: 60, y: 70, count: 5 },
  { id: 5, x: 34, y: 66, count: 2 },
];

export const Basic: Story = {
  render: () => (
    <DCMap>
      {pins.map((p) => (
        <DCMapPin key={p.id} x={p.x} y={p.y} count={p.count} title={`${p.count} projects`} />
      ))}
      <span className="dc-map__legend">📍 Projects near you</span>
    </DCMap>
  ),
};

export const WithPopup: Story = {
  render: () => (
    <DCMap>
      {pins.map((p) => (
        <DCMapPin key={p.id} x={p.x} y={p.y} count={p.count} active={p.id === 3} />
      ))}
      <DCMapPopup x={70} y={30}>
        <div style={{ fontFamily: 'var(--dc-font-headline)', fontWeight: 700, marginBottom: 4 }}>
          Brooklyn, NY
        </div>
        <div style={{ fontSize: '0.875rem', color: 'var(--dc-grey)' }}>
          12 classroom projects need funding
        </div>
      </DCMapPopup>
    </DCMap>
  ),
};

/**
 * School markers colored by need level (lower → higher need), using the
 * `school-building.svg` icon and the need-level legend, as on the "Discover
 * local need" map.
 */
const schools: { id: number; x: number; y: number; need: DCMapNeed; count?: number | string }[] = [
  { id: 1, x: 30, y: 20, need: 'third', count: 1 },
  { id: 2, x: 52, y: 16, need: 'fourth', count: 7 },
  { id: 3, x: 20, y: 40, need: 'second' },
  { id: 4, x: 44, y: 38, need: 'third', count: 11 },
  { id: 5, x: 66, y: 30, need: 'fourth', count: 6 },
  { id: 6, x: 74, y: 46, need: 'second', count: 3 },
  { id: 7, x: 38, y: 58, need: 'first' },
  { id: 8, x: 58, y: 62, need: 'fourth', count: 5 },
  { id: 9, x: 28, y: 72, need: 'third', count: 18 },
  { id: 10, x: 50, y: 80, need: 'second', count: 2 },
  { id: 11, x: 70, y: 70, need: 'first', count: 1 },
];

export const SchoolMarkers: Story = {
  render: () => (
    <DCMap height={520}>
      <DCMapNeedLegend />
      {schools.map((s) => (
        <DCSchoolMarker key={s.id} x={s.x} y={s.y} need={s.need} count={s.count} />
      ))}
    </DCMap>
  ),
};

/** Click a pin to open its popup. */
export const Interactive: Story = {
  render: () => {
    const [selected, setSelected] = useState<number | null>(3);
    const sel = pins.find((p) => p.id === selected);
    return (
      <DCMap>
        {pins.map((p) => (
          <DCMapPin
            key={p.id}
            x={p.x}
            y={p.y}
            count={p.count}
            active={p.id === selected}
            onClick={() => setSelected(p.id)}
          />
        ))}
        {sel && (
          <DCMapPopup x={sel.x} y={sel.y}>
            <div style={{ fontFamily: 'var(--dc-font-headline)', fontWeight: 700, marginBottom: 4 }}>
              {sel.count} projects here
            </div>
            <div style={{ fontSize: '0.875rem', color: 'var(--dc-grey)' }}>
              Tap a pin to explore classrooms in that area.
            </div>
          </DCMapPopup>
        )}
      </DCMap>
    );
  },
};
