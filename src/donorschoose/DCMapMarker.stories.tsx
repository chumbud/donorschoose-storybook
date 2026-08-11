import type { ReactNode } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { DCMapPin } from './DCMap';

/**
 * Map markers (`DCMapPin`) — the pins placed on a `DCMap`. They come in the DC
 * palette colors and several states: default, active/selected, cluster (with a
 * count), pulsing (attention), and visited (dimmed).
 */
const meta = {
  title: 'Components/Map/Marker',
  component: DCMapPin,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  args: { x: 50, y: 78, onClick: fn() },
  argTypes: {
    color: { control: 'color' },
    active: { control: 'boolean' },
    visited: { control: 'boolean' },
    pulse: { control: 'boolean' },
    count: { control: 'text' },
  },
  decorators: [
    (Story) => (
      <div
        style={{
          position: 'relative',
          width: 90,
          height: 84,
          background: '#eef2f6',
          border: '1px solid var(--dc-grey-stroke)',
          borderRadius: 8,
        }}
      >
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof DCMapPin>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Controllable single marker. */
export const Playground: Story = {};

/* ---- Showcase helpers (no decorator; own tiles) ---- */
function Tile({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div style={{ textAlign: 'center', fontFamily: 'var(--dc-font-body)' }}>
      <div
        style={{
          position: 'relative',
          width: 96,
          height: 88,
          background: '#eef2f6',
          border: '1px solid var(--dc-grey-stroke)',
          borderRadius: 8,
        }}
      >
        {children}
      </div>
      <div style={{ fontSize: 12, color: 'var(--dc-grey)', marginTop: 6 }}>{label}</div>
    </div>
  );
}

const COLORS = [
  ['Link blue', '#0062fd', '$blue-link'],
  ['Brand blue', '#3804c1', '$blue'],
  ['Green (funded)', '#6EA217', '$green'],
  ['Raspberry (urgent)', '#ED0038', '$raspberry-red'],
  ['Yellow', '#f9d524', '$yellow'],
  ['Grey', '#414142', '$grey'],
];

export const Colors: Story = {
  decorators: [],
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.25rem' }}>
      {COLORS.map(([label, color, scss]) => (
        <Tile key={color} label={`${label} · ${scss}`}>
          <DCMapPin x={50} y={78} color={color} />
        </Tile>
      ))}
    </div>
  ),
};

export const States: Story = {
  decorators: [],
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.25rem' }}>
      <Tile label="Default">
        <DCMapPin x={50} y={78} />
      </Tile>
      <Tile label="Active / selected">
        <DCMapPin x={50} y={78} active />
      </Tile>
      <Tile label="Cluster (count)">
        <DCMapPin x={50} y={78} count={12} />
      </Tile>
      <Tile label="Pulse (attention)">
        <DCMapPin x={50} y={78} pulse />
      </Tile>
      <Tile label="Visited (dimmed)">
        <DCMapPin x={50} y={78} visited />
      </Tile>
      <Tile label="Funded (green)">
        <DCMapPin x={50} y={78} color="#6EA217" count={4} />
      </Tile>
    </div>
  ),
};
