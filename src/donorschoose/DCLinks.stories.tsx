import type { CSSProperties, ReactNode } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import './tokens.css';
import './dc-links.css';

/**
 * # Links
 *
 * How links are styled across DonorsChoose. Values resolved from
 * `donorschoose-web` (`general.scss`, `base/form-elements/_buttons.scss`).
 *
 * - **Default link** — every `<a>`: blue, no underline at rest, underline +
 *   slight darken on hover, purple focus ring.
 * - **`.text-link`** — a `<button>` or `<a>` that reads as an inline blue link
 *   (no border/background). Used for inline actions like "Learn more", "Cancel".
 * - **`.link-discreet`** — a muted grey link with a dotted, half-opacity
 *   underline that turns solid black on hover. For quiet, low-emphasis links.
 * - **`.subtle-link`** — near-black dotted underline that turns blue on hover.
 *
 * > Note: there is no `discreet-link` class in the codebase — the real class is
 * > **`link-discreet`** (shown below).
 */
const meta = {
  title: 'Components/Buttons and Links/Links',
  tags: ['!autodocs'],
  parameters: { layout: 'fullscreen' },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const wrap: CSSProperties = {
  fontFamily: 'var(--dc-font-body)',
  color: 'var(--dc-black)',
  padding: '2.5rem',
  maxWidth: 860,
  lineHeight: 1.6,
};
const h2: CSSProperties = {
  fontFamily: 'var(--dc-font-headline)',
  fontWeight: 900,
  fontSize: 'var(--dc-font-size-xlarge)',
  margin: '2.5rem 0 0.25rem',
};
const mono: CSSProperties = {
  fontFamily: 'ui-monospace, Consolas, monospace',
  fontSize: '0.8rem',
  color: 'var(--dc-grey)',
};
const sample: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '1.5rem',
  flexWrap: 'wrap',
  padding: '1.25rem',
  margin: '0.75rem 0 0.25rem',
  background: 'var(--dc-vlgrey)',
  border: '1px solid var(--dc-grey-stroke)',
  borderRadius: 'var(--dc-radius-standard)',
};

function Row({ children, note }: { children: ReactNode; note: string }) {
  return (
    <>
      <div style={sample}>{children}</div>
      <p style={mono}>{note}</p>
    </>
  );
}

const noop = (e: React.MouseEvent) => e.preventDefault();

export const Links: Story = {
  render: () => (
    <div style={wrap}>
      <h1 style={{ ...h2, marginTop: 0, fontSize: 'var(--dc-font-size-xxlarge)' }}>Links</h1>
      <p style={{ color: 'var(--dc-grey)' }}>
        The link treatments used across the site. Hover and tab to each to see the
        interaction and focus states.
      </p>

      <h2 style={h2}>Default link</h2>
      <p style={{ color: 'var(--dc-grey)', margin: 0 }}>
        Every <code>&lt;a&gt;</code> — blue, underlines and darkens on hover.
      </p>
      <Row note="<a> (base) — general.scss">
        <a className="dc-link" href="#" onClick={noop}>
          Find a classroom to support
        </a>
        <a className="dc-link" href="#" onClick={noop}>
          Learn more
        </a>
      </Row>

      <h2 style={h2}>
        <code>.text-link</code>
      </h2>
      <p style={{ color: 'var(--dc-grey)', margin: 0 }}>
        Inline blue link styling on a real <code>&lt;button&gt;</code> (no border or
        background) — used for inline actions.
      </p>
      <Row note='<button class="text-link"> / <a class="text-link">'>
        <button type="button" className="dc-text-link">
          Cancel
        </button>
        <a className="dc-text-link" href="#" onClick={noop}>
          How is my gift used?
        </a>
      </Row>

      <h2 style={h2}>
        <code>.link-discreet</code>
      </h2>
      <p style={{ color: 'var(--dc-grey)', margin: 0 }}>
        Muted grey with a dotted half-opacity underline → solid black on hover.
        This is the class often mis-remembered as "discreet-link".
      </p>
      <Row note="a.link-discreet — general.scss">
        <span>
          Schools in{' '}
          <a className="dc-link-discreet" href="#" onClick={noop}>
            New York City, NY
          </a>
        </span>
        <a className="dc-link-discreet" href="#" onClick={noop}>
          Leave a message
        </a>
      </Row>

      <h2 style={h2}>
        <code>.subtle-link</code>
      </h2>
      <p style={{ color: 'var(--dc-grey)', margin: 0 }}>
        Near-black dotted underline → blue on hover. A close sibling of
        <code> link-discreet</code>.
      </p>
      <Row note=".subtle-link — _buttons.scss">
        <a className="dc-subtle-link" href="#" onClick={noop}>
          How is my gift used?
        </a>
      </Row>

      <table
        style={{
          width: '100%',
          borderCollapse: 'collapse',
          marginTop: '2.5rem',
          fontSize: 'var(--dc-font-size-discreet)',
        }}
      >
        <thead>
          <tr style={{ textAlign: 'left', borderBottom: '2px solid var(--dc-grey-stroke)' }}>
            <th style={{ padding: '0.5rem' }}>Class</th>
            <th style={{ padding: '0.5rem' }}>Rest</th>
            <th style={{ padding: '0.5rem' }}>Hover</th>
            <th style={{ padding: '0.5rem' }}>Use for</th>
          </tr>
        </thead>
        <tbody>
          {[
            ['a (base)', 'Blue #0062fd, no underline', 'Underline + darken', 'Standard links'],
            ['.text-link', 'Blue, no underline, no chrome', 'Underline', 'Inline button-as-link actions'],
            ['.link-discreet', 'Grey #414142, dotted underline', 'Solid black underline', 'Quiet, low-emphasis links'],
            ['.subtle-link', 'Near-black, dotted underline', 'Turns blue', 'De-emphasized inline links'],
          ].map((r) => (
            <tr key={r[0]} style={{ borderBottom: '1px solid var(--dc-grey-stroke)' }}>
              <td style={{ padding: '0.5rem', ...mono }}>{r[0]}</td>
              <td style={{ padding: '0.5rem' }}>{r[1]}</td>
              <td style={{ padding: '0.5rem' }}>{r[2]}</td>
              <td style={{ padding: '0.5rem' }}>{r[3]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ),
};
