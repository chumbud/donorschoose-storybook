import type { CSSProperties, ReactNode } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import '../tokens.css';

/**
 * # Accessibility
 *
 * How these components meet accessibility requirements. The approach follows
 * [Base UI's accessibility guidance](https://base-ui.com/react/overview/accessibility)
 * and the WAI-ARIA Authoring Practices: manage focus, keep everything operable
 * by keyboard, expose the right roles/states, label every control, and meet
 * color-contrast minimums.
 */
const meta = {
  title: 'Foundations/Accessibility',
  tags: ['!autodocs'],
  parameters: { layout: 'fullscreen' },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const wrap: CSSProperties = {
  fontFamily: 'var(--dc-font-body)',
  color: 'var(--dc-black)',
  padding: '2.5rem',
  maxWidth: 900,
  lineHeight: 1.6,
};
const h2: CSSProperties = {
  fontFamily: 'var(--dc-font-headline)',
  fontWeight: 900,
  fontSize: 'var(--dc-font-size-xlarge)',
  margin: '2.5rem 0 0.25rem',
};
const lead: CSSProperties = { color: 'var(--dc-grey)', margin: '0 0 0.5rem' };
const mono: CSSProperties = {
  fontFamily: 'ui-monospace, Consolas, monospace',
  fontSize: '0.8rem',
  color: 'var(--dc-grey)',
};
const cell: CSSProperties = {
  padding: '0.6rem 0.5rem',
  borderBottom: '1px solid var(--dc-grey-stroke)',
  verticalAlign: 'top',
  textAlign: 'left',
};

function Principle({ title, children }: { title: string; children: ReactNode }) {
  return (
    <>
      <h2 style={h2}>{title}</h2>
      <div style={lead}>{children}</div>
    </>
  );
}

/* [component, what it implements] */
const MATRIX: [string, ReactNode][] = [
  [
    'Modal',
    <>
      <code>role="dialog"</code> + <code>aria-modal</code>, named by its title via{' '}
      <code>aria-labelledby</code>. Focus moves into the dialog on open and returns to the
      trigger on close; <b>Tab / Shift+Tab are trapped</b> inside; <b>Escape</b> closes.
    </>,
  ],
  [
    'Toast',
    <>
      <code>role="status"</code> / <code>aria-live="polite"</code> for feedback, escalating to{' '}
      <code>role="alert"</code> / <code>assertive</code> for the error tone; <code>aria-atomic</code>.
      Hovering pauses the auto-dismiss. Close button has an <code>aria-label</code>.
    </>,
  ],
  [
    'FAQ (collapsible)',
    <>
      Disclosure pattern: each trigger is a <code>&lt;button&gt;</code> with{' '}
      <code>aria-expanded</code> + <code>aria-controls</code>; the answer is a labelled{' '}
      <code>role="region"</code> that is <code>hidden</code> when collapsed.
    </>,
  ],
  [
    'Checkbox / Radio',
    <>
      Built on a native <code>&lt;input&gt;</code> inside a <code>&lt;label&gt;</code>, so it's
      focusable, toggles on Space, and is announced with its label and checked state.
    </>,
  ],
  [
    'Give Widget',
    <>
      Amount and frequency options expose selected state with <code>aria-pressed</code>, grouped
      under a labelled <code>role="group"</code>. The custom amount uses a real labelled input.
    </>,
  ],
  [
    'Pagination',
    <>
      <code>&lt;nav aria-label="Pagination"&gt;</code>; the current page carries{' '}
      <code>aria-current="page"</code>; disabled prev/next get <code>aria-disabled</code> and leave
      the tab order.
    </>,
  ],
  [
    'Buttons, links & icon buttons',
    <>
      Icon-only controls (share, bookmark, close, map markers) always have an{' '}
      <code>aria-label</code>; decorative icons are <code>aria-hidden</code>. Links darken and
      underline on hover.
    </>,
  ],
  [
    'Inputs & search',
    <>
      Every field has an associated <code>&lt;label&gt;</code> or <code>aria-label</code>; help and
      error text is linked to the input.
    </>,
  ],
];

export const Accessibility: Story = {
  render: () => (
    <div style={wrap}>
      <h1 style={{ ...h2, marginTop: 0, fontSize: 'var(--dc-font-size-xxlarge)' }}>Accessibility</h1>
      <p style={{ color: 'var(--dc-grey)' }}>
        Every component here is built to be usable with a keyboard and a screen reader, following{' '}
        Base UI's accessibility guidance and the WAI-ARIA Authoring Practices. The requirements we
        hold each component to:
      </p>

      <Principle title="Visible focus">
        Every interactive element shows a clear keyboard-focus indicator — a 3px purple{' '}
        <code>--dc-purple</code> ring via <code>:focus-visible</code> (so it only appears for
        keyboard users, not on mouse click). Components may style their own focus, and a global{' '}
        low-specificity fallback covers anything that doesn't.
      </Principle>

      <Principle title="Focus management">
        Overlays move focus to where the user needs it and restore it afterward. The Modal focuses
        the dialog on open, traps Tab within it, and returns focus to the trigger on close.
      </Principle>

      <Principle title="Keyboard operability">
        Nothing is pointer-only. Controls follow the expected keys for their pattern — Space/Enter to
        activate, Escape to dismiss overlays, Tab to move, and arrow keys where a widget groups
        options — per the WAI-ARIA Authoring Practices.
      </Principle>

      <Principle title="Roles, states & names">
        Custom controls expose the correct ARIA role and state (<code>aria-expanded</code>,{' '}
        <code>aria-pressed</code>, <code>aria-current</code>, <code>aria-disabled</code>,{' '}
        <code>aria-live</code>) and always have an accessible name from a native{' '}
        <code>&lt;label&gt;</code>, <code>aria-label</code>, or <code>aria-labelledby</code>.
      </Principle>

      <Principle title="Color & contrast">
        Text and UI meet WCAG AA contrast. Status is never conveyed by color alone — the funded,
        matched, error, success, and warning states also carry text, icons, or labels. See{' '}
        <b>Foundations → Tokens → Colors</b> for the palette and its usages.
      </Principle>

      <Principle title="Reduced motion">
        Entrance and countdown animations (Toast, Give amounts, map pins) respect{' '}
        <code>prefers-reduced-motion: reduce</code>, falling back to no motion without hiding
        content.
      </Principle>

      <h2 style={h2}>What each component implements</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '0.5rem', fontSize: 'var(--dc-font-size-discreet)' }}>
        <thead>
          <tr>
            <th style={{ ...cell, borderBottom: '2px solid var(--dc-grey-stroke)', width: 200 }}>Component</th>
            <th style={{ ...cell, borderBottom: '2px solid var(--dc-grey-stroke)' }}>Accessibility features</th>
          </tr>
        </thead>
        <tbody>
          {MATRIX.map(([name, desc]) => (
            <tr key={name}>
              <td style={{ ...cell, fontWeight: 700 }}>{name}</td>
              <td style={cell}>{desc}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <p style={{ ...mono, marginTop: '2rem' }}>
        Verify with the Accessibility addon (the "Accessibility" tab) on any story, plus manual
        keyboard and screen-reader passes.
      </p>
    </div>
  ),
};
