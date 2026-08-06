import type { CSSProperties } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import '../tokens.css';

/**
 * # Color & type
 *
 * The core DonorsChoose palette and the color + typography combinations used
 * for text on different backgrounds. The full `globalConstants.scss` color list
 * is below. Responsive breakpoint variables live on the Tokens → Breakpoints
 * page. Values resolved from `donorschoose-web`.
 */
const meta = {
  title: 'Tokens/Colors',
  tags: ['!autodocs'],
  parameters: { layout: 'fullscreen' },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const wrap: CSSProperties = {
  fontFamily: 'var(--dc-font-body)',
  color: 'var(--dc-black)',
  padding: '2.5rem',
  maxWidth: 960,
};
const mono: CSSProperties = {
  fontFamily: 'ui-monospace, Consolas, monospace',
  fontSize: '0.75rem',
};

/* [name, css token, hex, usage, scss var] */

/* Primary brand palette — the eight core brand colors. */
const primary = [
  ['Brand blue', '--dc-blue', '#3804c1', 'Headings, matched projects', '$blue'],
  ['Link blue', '--dc-blue-link', '#0062fd', 'Primary CTAs, links', '$blue-link'],
  ['Blue lighter', '--dc-blue-lighter', '#3da9f3', 'Progress fill', '$blue-lighter'],
  ['Aqua', '--dc-blue-highlighter', '#77eeef', 'Highlights, accents', '$blue-highlighter'],
  ['Magenta', '--dc-magenta', '#d020b8', 'Professional development', '$color-pd'],
  ['Yellow', '--dc-yellow', '#f9d524', 'Inspire cards, trust banner', '$yellow'],
  ['Beige', '--dc-beige', '#ede7df', 'Warm neutral backgrounds', '$darker-beige'],
  ['White', '--dc-white', '#ffffff', 'Surfaces', '$white'],
] as const;

/* Secondary palette — supporting neutrals and status colors. */
const secondary = [
  ['Black', '--dc-black', '#212121', 'Body & heading text', '$black'],
  ['Grey', '--dc-grey', '#414142', 'Secondary text', '$grey'],
  ['Very light grey', '--dc-vlgrey', '#fafafa', 'Backgrounds', '$vlgrey'],
  ['Green', '--dc-green', '#6ea217', 'Success, fully funded', '$green'],
  ['Red', '--dc-red-error', '#cd2929', 'Errors, warnings', '$red-error'],
  ['Purple', '--dc-purple', '#8152ff', 'Focus outline', '$purple'],
] as const;

const combos = [
  ['var(--dc-white)', 'var(--dc-black)', 'Black on white — body copy'],
  ['var(--dc-white)', 'var(--dc-grey)', 'Grey on white — secondary'],
  ['var(--dc-white)', 'var(--dc-blue-link)', 'Link blue on white — links & CTAs'],
  ['var(--dc-blue-link)', 'var(--dc-white)', 'White on link blue — primary button'],
  ['var(--dc-blue)', 'var(--dc-white)', 'White on brand blue — headers'],
  ['var(--dc-black)', 'var(--dc-white)', 'White on black — overlays'],
  ['var(--dc-vlgrey)', 'var(--dc-black)', 'Black on light grey — panels'],
  ['var(--dc-green)', 'var(--dc-white)', 'White on green — success'],
] as const;

/* Full globalConstants.scss color list (deprecated colors excluded).
   [scss var, display value (as written), resolved css value] */
const ALL_COLORS: [string, string, string, string][] = [
  ['Layout', '$donateButtonBgColor', '#BDDE64', '#BDDE64'],
  ['Essentials', '$essentials-purple-outline', '#CCB8FF', '#CCB8FF'],
  ['Essentials', '$essentials-light-purple', '#EEE8FF', '#EEE8FF'],
  ['Essentials', '$essentials-purple', '#7C49FF', '#7C49FF'],
  ['Essentials', '$essentials-type', '#4413c7', '#4413c7'],
  ['Social', '$facebook-color', '#1877F2', '#1877F2'],
  ['Social', '$twitter-color', '#00aced', '#00aced'],
  ['Social', '$nextdoor-color', '#1B8751', '#1B8751'],
  ['Social', '$instagram-color', '#E1306C', '#E1306C'],
  ['Social', '$linkedin-color', '#0A66C2', '#0A66C2'],
  ['Core', '$black', '#212121', '#212121'],
  ['Core', '$blue-dark', '#1b0260', '#1b0260'],
  ['Core', '$blue', '#3804c1', '#3804c1'],
  ['Core', '$blue-link', '#0062fd', '#0062fd'],
  ['Core', '$blue-lighter', '#3da9f3', '#3da9f3'],
  ['Core', '$blue-highlighter', '#77EEEF', '#77EEEF'],
  ['Core', '$soft-blue', '#e6efff', '#e6efff'],
  ['Core', '$yellow', '#f9d524', '#f9d524'],
  ['Core', '$orange', '#ff7a07', '#ff7a07'],
  ['Core', '$favOrange', '#ff5500', '#ff5500'],
  ['Core', '$green', '#6EA217', '#6EA217'],
  ['Core', '$cream', '#EDE7DF', '#EDE7DF'],
  ['Core', '$green-highlighter', '#CAFFD1', '#CAFFD1'],
  ['Core', '$green-dark', '#01695E', '#01695E'],
  ['Core', '$color-pd', '#D020B8', '#D020B8'],
  ['Core', '$color-distance-learning', '#b12c2c', '#b12c2c'],
  ['Core', '$white', '#fff', '#ffffff'],
  ['Core', '$white-overlay', 'rgba(255,255,255,.8)', 'rgba(255,255,255,.8)'],
  ['Core', '$white-overlay-stroke', 'rgba(255,255,255,.5)', 'rgba(255,255,255,.5)'],
  ['Core', '$grey', '#414142', '#414142'],
  ['Core', '$grey-stroke', 'rgba($grey,.2)', 'rgba(65,65,66,.2)'],
  ['Core', '$subtle-stroke', 'rgba($grey,.05)', 'rgba(65,65,66,.05)'],
  ['Core', '$icon-color', 'rgba($black,.2)', 'rgba(33,33,33,.2)'],
  ['Core', '$vlgrey', '#fafafa', '#fafafa'],
  ['Core', '$midgrey', '#707070', '#707070'],
  ['Core', '$purple', '#8152FF', '#8152FF'],
  ['Core', '$vlpurple', '#EFEEF2', '#EFEEF2'],
  ['Core', '$beige', '#FFF6EF', '#FFF6EF'],
  ['Core', '$darker-beige', '#EDE7DF', '#EDE7DF'],
  ['Error', '$red-error', '#CD2929', '#CD2929'],
  ['Error', '$red-error-dark-bg', '#FF6565', '#FF6565'],
  ['Error', '$red-error-background', 'rgba($red-error,.2)', 'rgba(205,41,41,.2)'],
  ['Error', '$red-error-opaque', '#F5D4D4', '#F5D4D4'],
  ['Error', '$red-error-border', '#EBC3C3', '#EBC3C3'],
  ['Error', '$raspberry-red', '#ED0038', '#ED0038'],
];

const th: CSSProperties = {
  textAlign: 'left',
  fontSize: '0.75rem',
  textTransform: 'uppercase',
  letterSpacing: '0.06em',
  color: 'var(--dc-grey)',
  fontWeight: 700,
  padding: '0.5rem 0.75rem',
  borderBottom: '1px solid var(--dc-grey-stroke)',
};
const td: CSSProperties = {
  padding: '0.6rem 0.75rem',
  borderBottom: '1px solid var(--dc-grey-stroke)',
  fontSize: '0.85rem',
  verticalAlign: 'middle',
};

/* Swatch card grid shared by the primary and secondary palettes. */
function SwatchGrid({ items }: { items: readonly (readonly [string, string, string, string, string])[] }) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(210px, 1fr))',
        gap: '1rem',
      }}
    >
      {items.map(([name, token, hex, use, scss]) => (
        <div
          key={token}
          style={{
            border: '1px solid var(--dc-grey-stroke)',
            borderRadius: 'var(--dc-radius-inner)',
            overflow: 'hidden',
          }}
        >
          <div style={{ height: 72, background: `var(${token})`, borderBottom: '1px solid var(--dc-grey-stroke)' }} />
          <div style={{ padding: '0.6rem 0.75rem' }}>
            <div style={{ fontFamily: 'var(--dc-font-headline)', fontWeight: 700, fontSize: '0.9rem' }}>{name}</div>
            <div style={{ ...mono, color: 'var(--dc-grey)', marginTop: 2 }}>
              {hex} · <span style={{ color: 'var(--dc-blue-link)' }}>{scss}</span>
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--dc-grey)', marginTop: 4 }}>{use}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

export const Palette: Story = {
  render: () => (
    <div style={wrap}>
      <h1>Color &amp; type</h1>

      <h2>Primary brand colors</h2>
      <SwatchGrid items={primary} />

      <h2 style={{ marginTop: '2.5rem' }}>Secondary colors</h2>
      <p style={{ maxWidth: 620, marginBottom: '1rem', color: 'var(--dc-grey)' }}>
        Supporting neutrals and status colors used alongside the primary brand palette.
      </p>
      <SwatchGrid items={secondary} />

      <h2 style={{ marginTop: '2.5rem' }}>Type on color</h2>
      <p style={{ maxWidth: 620, marginBottom: '1.25rem' }}>
        Approved text/background pairings. Headline is Sharp Sans; body is the DC body stack.
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem' }}>
        {combos.map(([bg, fg, label]) => (
          <div
            key={label}
            style={{
              background: bg,
              color: fg,
              border: '1px solid var(--dc-grey-stroke)',
              borderRadius: 'var(--dc-radius-inner)',
              padding: '1.25rem',
            }}
          >
            <div style={{ fontFamily: 'var(--dc-font-headline)', fontWeight: 700, fontSize: '1.25rem', marginBottom: 6 }}>
              Give today
            </div>
            <div style={{ fontSize: '0.9rem', lineHeight: 1.4 }}>{label}</div>
          </div>
        ))}
      </div>

      {/* Full globalConstants color list */}
      <h2 style={{ marginTop: '3rem' }}>All colors — globalConstants.scss</h2>
      <p style={{ maxWidth: 620, marginBottom: '1rem', color: 'var(--dc-grey)' }}>
        Every non-deprecated color variable in <span style={mono}>globalConstants.scss</span>.
      </p>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={th}>Swatch</th>
            <th style={th}>SCSS variable</th>
            <th style={th}>Value</th>
            <th style={th}>Group</th>
          </tr>
        </thead>
        <tbody>
          {ALL_COLORS.map(([group, scss, display, value]) => (
            <tr key={scss}>
              <td style={td}>
                <span
                  style={{
                    display: 'inline-block',
                    width: 40,
                    height: 24,
                    borderRadius: 4,
                    background: value,
                    border: '1px solid var(--dc-grey-stroke)',
                    verticalAlign: 'middle',
                  }}
                />
              </td>
              <td style={{ ...td, ...mono, color: 'var(--dc-blue-link)' }}>{scss}</td>
              <td style={{ ...td, ...mono, color: 'var(--dc-grey)' }}>{display}</td>
              <td style={{ ...td, color: 'var(--dc-grey)' }}>{group}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ),
};
