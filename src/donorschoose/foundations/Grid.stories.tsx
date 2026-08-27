import type { CSSProperties, ReactNode } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import '../tokens.css';
import '../dc-grid.css';

/**
 * # Grid
 *
 * The page container and the 12-column `.col` system every DonorsChoose layout
 * sits on: a **980px** container and a float grid with **28px** gutters,
 * collapsing to a single stacked column at the 46em mobile breakpoint.
 *
 * Ported from `base/layout/_grid.scss`.
 */
const meta = {
  title: 'Foundations/Tokens/Grid',
  tags: ['!autodocs'],
  parameters: { layout: 'fullscreen' },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

/* ------------------------------------------------------------- page chrome -- */

/* Wider than the other foundations pages so the 980px container demo below has
   room to actually hit its cap; the copy blocks stay narrow on their own. */
const wrap: CSSProperties = {
  fontFamily: 'var(--dc-font-body)',
  color: 'var(--dc-black)',
  padding: '2.5rem',
  maxWidth: 1180,
};
/* Column demos render at the true container width, not the wider page. */
const atContainerWidth: CSSProperties = {
  maxWidth: 980,
};
const mono: CSSProperties = {
  fontFamily: 'ui-monospace, Consolas, monospace',
  fontSize: '0.75rem',
};
const lead: CSSProperties = {
  maxWidth: 620,
  marginBottom: '1rem',
  color: 'var(--dc-grey)',
  fontSize: '0.875rem',
  lineHeight: 1.5,
};
const h2: CSSProperties = {
  fontFamily: 'var(--dc-font-headline)',
  fontWeight: 900,
  letterSpacing: '-0.02em',
  fontSize: '1.5rem',
  color: 'var(--dc-blue)',
  margin: '2.5rem 0 0.5rem',
};
const h3: CSSProperties = {
  fontFamily: 'var(--dc-font-headline)',
  fontWeight: 700,
  fontSize: '0.875rem',
  textTransform: 'uppercase',
  letterSpacing: '0.06em',
  color: 'var(--dc-grey)',
  margin: '1.75rem 0 0.6rem',
};
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
const code: CSSProperties = {
  display: 'block',
  fontFamily: 'ui-monospace, Consolas, monospace',
  fontSize: '0.75rem',
  lineHeight: 1.6,
  background: 'var(--dc-vlgrey)',
  border: '1px solid var(--dc-grey-stroke)',
  borderRadius: 'var(--dc-radius-inner)',
  padding: '0.9rem 1rem',
  whiteSpace: 'pre',
  overflowX: 'auto',
  color: 'var(--dc-black)',
};
const note: CSSProperties = {
  maxWidth: 620,
  fontSize: '0.8rem',
  lineHeight: 1.55,
  color: 'var(--dc-grey)',
  borderLeft: '3px solid var(--dc-grey-stroke)',
  paddingLeft: '0.9rem',
  margin: '1rem 0 0',
};

/** A filled block standing in for column content, so the grid is visible. */
function Cell({ children, tone = 'blue' }: { children: ReactNode; tone?: 'blue' | 'grey' }) {
  return (
    <div
      style={{
        background: tone === 'blue' ? 'rgba(56, 4, 193, 0.08)' : 'var(--dc-vlgrey)',
        border: `1px solid ${tone === 'blue' ? 'rgba(56, 4, 193, 0.25)' : 'var(--dc-grey-stroke)'}`,
        borderRadius: 'var(--dc-radius-inner)',
        padding: '0.7rem 0.5rem',
        textAlign: 'center',
        fontFamily: 'ui-monospace, Consolas, monospace',
        fontSize: '0.7rem',
        color: tone === 'blue' ? 'var(--dc-blue)' : 'var(--dc-grey)',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
      }}
    >
      {children}
    </div>
  );
}

/** Renders one `.fluid-container` of `.col colN` cells, labelled with the split. */
function Split({ cols }: { cols: number[] }) {
  return (
    <div style={{ marginBottom: '0.5rem' }}>
      <div style={{ ...mono, color: 'var(--dc-grey)', marginBottom: '0.3rem' }}>
        {cols.map((c) => `.col${c}`).join(' + ')}
      </div>
      <div className="fluid-container">
        {cols.map((c, i) => (
          <div className={`col col${c}`} key={i}>
            <Cell>{c}</Cell>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ story -- */

export const Grid: Story = {
  render: () => (
    <div style={wrap}>
      <h1>Grid</h1>
      <p style={lead}>
        Every DonorsChoose page is a <strong>980px</strong> container holding rows of{' '}
        <span style={mono}>.col</span> columns, twelve to a row, separated by{' '}
        <strong>28px</strong> gutters. Below 46em the columns stop dividing the row and stack
        full-width.
      </p>

      <p style={note}>
        Columns <strong>float left</strong> inside a{' '}
        <span style={mono}>.fluid-container</span>, which pulls its own 14px of column padding back
        out with a negative margin so the outer edges stay flush with the container. The container
        clears its floats itself. Ported from{' '}
        <span style={mono}>base/layout/_grid.scss</span>.
      </p>

      {/* ---------------------------------------------------------- Container -- */}
      <h2 style={h2}>The 980px container</h2>
      <p style={lead}>
        <span style={mono}>.dc-container</span> centres content at a maximum of 980px and adds
        1.5rem of side padding, so text never runs to the window edge on a narrow screen. It is the
        width the header, footer, project page, school page and search page all share — which is
        what makes those bands line up as you scroll.
      </p>

      <table style={{ borderCollapse: 'collapse', width: '100%', maxWidth: 720 }}>
        <thead>
          <tr>
            <th style={th}>Token</th>
            <th style={th}>Value</th>
            <th style={th}>Role</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ ...td, ...mono }}>--dc-container-width</td>
            <td style={{ ...td, ...mono }}>980px</td>
            <td style={td}>Maximum content width ($defaultPageWidth)</td>
          </tr>
          <tr>
            <td style={{ ...td, ...mono }}>--dc-container-padding</td>
            <td style={{ ...td, ...mono }}>1.5rem</td>
            <td style={td}>Side padding inside the container</td>
          </tr>
          <tr>
            <td style={{ ...td, ...mono }}>--dc-gutter</td>
            <td style={{ ...td, ...mono }}>28px</td>
            <td style={td}>Space between columns (14px each side)</td>
          </tr>
        </tbody>
      </table>

      <h3 style={h3}>At full width</h3>
      <div
        style={{
          background:
            'repeating-linear-gradient(45deg, var(--dc-vlgrey) 0 6px, transparent 6px 12px)',
          border: '1px solid var(--dc-grey-stroke)',
          borderRadius: 'var(--dc-radius-inner)',
          padding: '1rem 0',
        }}
      >
        <div className="dc-container">
          <Cell>.dc-container — max-width 980px, centred</Cell>
        </div>
      </div>
      <p style={{ ...lead, marginTop: '0.5rem' }}>
        The hatched area is the viewport; the filled block is the container. Widen or narrow this
        preview and the block stops growing at 980px.
      </p>

      <div style={{ marginTop: '1rem' }}>
        <span style={code}>
          {`<div class="dc-container">
  …page content…
</div>

/* Bands that paint their own background go edge to edge,
   with an inner container for the content. */
<div class="dc-pp__fundbar">
  <div class="dc-container"> … </div>
</div>`}
        </span>
      </div>

      {/* ----------------------------------------------------------- Columns -- */}
      <h2 style={h2}>The 12-column .col grid</h2>
      <p style={lead}>
        Every column carries <span style={mono}>.col</span> plus a width class —{' '}
        <span style={mono}>.col1</span> through <span style={mono}>.col12</span>, for N twelfths.
        Each gets 14px of padding either side; the <span style={mono}>.fluid-container</span>{' '}
        cancels the outermost 14px with a negative margin.
      </p>

      <h3 style={h3}>Twelve columns</h3>
      <div style={atContainerWidth}>
        <div className="fluid-container">
          {Array.from({ length: 12 }, (_, i) => (
            <div className="col col1" key={i}>
              <Cell tone="grey">{i + 1}</Cell>
            </div>
          ))}
        </div>
      </div>

      <h3 style={h3}>Common splits</h3>
      <div style={atContainerWidth}>
        <Split cols={[6, 6]} />
        <Split cols={[4, 4, 4]} />
        <Split cols={[3, 3, 3, 3]} />
        <Split cols={[8, 4]} />
        <Split cols={[9, 3]} />
      </div>

      <h3 style={h3}>Offsets</h3>
      <p style={lead}>
        <span style={mono}>.col-offsetN</span> pushes a column N twelfths to the right, for
        indenting a block without an empty column beside it.
      </p>
      <div style={atContainerWidth}>
        <div className="fluid-container">
          <div className="col col4 col-offset4">
            <Cell>.col4 .col-offset4</Cell>
          </div>
        </div>
        <div className="fluid-container">
          <div className="col col6 col-offset6">
            <Cell>.col6 .col-offset6</Cell>
          </div>
        </div>
      </div>

      <div style={{ marginTop: '1rem' }}>
        <span style={code}>
          {`<div class="dc-container">
  <div class="fluid-container">
    <div class="col col8">Essay</div>
    <div class="col col4">Sidebar</div>
  </div>

  <div class="fluid-container">
    <div class="col col4 col-offset4">Indented</div>
  </div>
</div>`}
        </span>
      </div>

      {/* ------------------------------------------------------------ Mobile -- */}
      <h2 style={h2}>Below 46em</h2>
      <p style={lead}>
        At the <span style={mono}>$breakpoint-mobile-width</span> (46em ≈ 736px — see{' '}
        <span style={mono}>Foundations/Breakpoints</span>) the columns stop floating, drop their
        side padding, and go full width; the container drops its negative margin and every offset
        resets to zero. No per-column mobile classes are needed.
      </p>
      <p style={lead}>
        Resize this preview under 736px and the splits above will collapse into a single column.
      </p>
    </div>
  ),
};
