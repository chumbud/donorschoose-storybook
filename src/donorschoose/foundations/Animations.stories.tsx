import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState, type CSSProperties } from 'react';
import '../tokens.css';
import './animations.css';

/**
 * # Motion
 *
 * DonorsChoose uses three transition speeds, all on one easing curve
 * (`cubic-bezier(0.2, 0, 0.04, 1)`), plus a small set of entrance keyframes.
 * Ported from `_mixins.scss` (`DCtransition*`) and feature stylesheets.
 */
const meta = {
  title: 'Tokens/Animations',
  parameters: { layout: 'fullscreen' },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const wrap: CSSProperties = {
  fontFamily: 'var(--dc-font-body)',
  color: 'var(--dc-black)',
  padding: '2.5rem',
  maxWidth: 860,
};
const code: CSSProperties = {
  fontFamily: 'ui-monospace, Consolas, monospace',
  fontSize: '0.85rem',
  background: 'var(--dc-vlgrey)',
  padding: '0.15em 0.4em',
  borderRadius: 4,
};

const durations = [
  { label: 'Fast', cls: 'dc-anim-demo--fast', token: '--dc-duration-fast', value: '0.15s', mixin: 'DCtransition', use: 'hover/focus, buttons' },
  { label: 'Medium', cls: 'dc-anim-demo--med', token: '--dc-duration-med', value: '0.3s', mixin: 'DCtransition-med', use: 'reveals, expanders' },
  { label: 'Slow', cls: 'dc-anim-demo--slow', token: '--dc-duration-slow', value: '0.5s', mixin: 'DCtransition-slow', use: 'larger surfaces' },
];

function DurationRow({ d }: { d: (typeof durations)[number] }) {
  const [on, setOn] = useState(false);
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '150px 1fr',
        gap: '1.5rem',
        alignItems: 'center',
        padding: '1rem 0',
        borderBottom: '1px solid var(--dc-grey-stroke)',
      }}
      onMouseEnter={() => setOn(true)}
      onMouseLeave={() => setOn(false)}
    >
      <div>
        <div style={{ fontFamily: 'var(--dc-font-headline)', fontWeight: 700 }}>{d.label}</div>
        <div style={{ fontSize: '0.8rem', color: 'var(--dc-grey)' }}>
          {d.value} · <span style={code}>{d.mixin}</span>
        </div>
        <div style={{ fontSize: '0.75rem', color: 'var(--dc-grey)', marginTop: 2 }}>{d.use}</div>
      </div>
      <div style={{ position: 'relative', height: 40 }}>
        <span
          className={`dc-anim-demo ${d.cls}`}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: 40,
            height: 40,
            borderRadius: 'var(--dc-radius-standard)',
            background: 'var(--dc-blue-link)',
            transform: on ? 'translateX(560px)' : 'translateX(0)',
          }}
        />
      </div>
    </div>
  );
}

export const Durations: Story = {
  render: () => (
    <div style={wrap}>
      <h1>Motion</h1>
      <p style={{ fontSize: '1.125rem', maxWidth: 640 }}>
        One easing curve, three speeds. Hover a row to play it.
      </p>
      <div
        style={{
          margin: '1.25rem 0 2rem',
          padding: '1rem 1.25rem',
          background: 'var(--dc-vlgrey)',
          border: '1px solid var(--dc-grey-stroke)',
          borderRadius: 'var(--dc-radius-standard)',
          maxWidth: 640,
        }}
      >
        Easing (all transitions): <span style={code}>cubic-bezier(0.2, 0, 0.04, 1)</span>{' '}
        <span style={{ color: 'var(--dc-grey)' }}>· token</span>{' '}
        <span style={code}>--dc-ease</span>
      </div>

      <h2>Durations</h2>
      {durations.map((d) => (
        <DurationRow key={d.label} d={d} />
      ))}
    </div>
  ),
};

const keyframes = [
  { label: 'appearUp', cls: 'dc-kf--appearUp', note: 'translateY(5px) + fade · 0.3s' },
  { label: 'fadeInUp', cls: 'dc-kf--fadeInUp', note: 'translateY(1rem) + fade · 0.5s' },
  { label: 'bounce', cls: 'dc-kf--bounce', note: 'nudge at 90% · loops' },
  { label: 'dot-pulse', cls: 'dc-kf--dot-pulse', note: 'expanding ring · loops' },
];

export const Keyframes: Story = {
  render: () => {
    const [key, setKey] = useState(0);
    return (
      <div style={wrap}>
        <h1>Keyframes</h1>
        <p style={{ maxWidth: 640 }}>
          Entrance and attention animations used across the site.
        </p>
        <button
          onClick={() => setKey((k) => k + 1)}
          style={{
            margin: '0.5rem 0 1.5rem',
            fontFamily: 'var(--dc-font-headline)',
            fontWeight: 700,
            fontSize: '0.9rem',
            color: '#fff',
            background: 'var(--dc-blue-link)',
            border: 'none',
            borderRadius: 'var(--dc-radius-button)',
            padding: '0.6em 1.4em',
            cursor: 'pointer',
          }}
        >
          ↻ Replay
        </button>
        <div
          key={key}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
            gap: '1rem',
          }}
        >
          {keyframes.map((k) => (
            <div
              key={k.label}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '1rem',
                padding: '2rem 1rem 1.25rem',
                border: '1px solid var(--dc-grey-stroke)',
                borderRadius: 'var(--dc-radius-standard)',
                background: '#fff',
              }}
            >
              <span
                className={`dc-kf ${k.cls}`}
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 12,
                  background: 'var(--dc-blue-link)',
                }}
              />
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: 'var(--dc-font-headline)', fontWeight: 700 }}>{k.label}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--dc-grey)' }}>{k.note}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  },
};
