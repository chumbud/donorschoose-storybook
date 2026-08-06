import type { Decorator } from '@storybook/react-vite';
import type { CSSProperties } from 'react';

/**
 * Mark a component page as incomplete / under construction.
 *
 * Add both of these to the component's `meta` (they work together — the tag
 * makes it filterable in the sidebar's "Tag filters", the decorator stamps a
 * visible banner on every story):
 *
 * ```ts
 * import { underConstruction } from '../underConstruction';
 *
 * const meta = {
 *   title: 'Components/Foo',
 *   component: Foo,
 *   tags: ['autodocs', 'wip'], // NOTE: must be the literal string 'wip' — the
 *                              // CSF indexer can't read an imported constant here
 *   decorators: [underConstruction],
 * } satisfies Meta<typeof Foo>;
 * ```
 *
 * To un-mark it, remove the `'wip'` tag and the decorator.
 */
export const WIP = 'wip';

const banner: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
  marginBottom: '1.25rem',
  padding: '0.6rem 1rem',
  borderRadius: '8px',
  border: '1px solid #e6c34d',
  background:
    'repeating-linear-gradient(45deg, #fff6da, #fff6da 14px, #ffe9ad 14px, #ffe9ad 28px)',
  color: '#7a5b00',
  fontFamily: 'var(--dc-font-headline, sans-serif)',
  fontWeight: 700,
  fontSize: '0.9rem',
  lineHeight: 1.3,
};

/** Decorator that stamps an "under construction" banner above a story. */
export const underConstruction: Decorator = (Story) => (
  <div>
    <div style={banner} role="note" aria-label="Under construction">
      <span aria-hidden="true">🚧</span>
      <span>
        Under construction — this component is incomplete and may change.
      </span>
    </div>
    <Story />
  </div>
);

/**
 * Mark a component that's slated to be replaced/redesigned soon. Same pattern as
 * {@link underConstruction} — pair the `'deprecated'` tag with this decorator:
 *
 * ```ts
 * tags: ['autodocs', 'deprecated'],
 * decorators: [deprecatedSoon],
 * ```
 */
export const DEPRECATED = 'deprecated';

const deprecatedBanner: CSSProperties = {
  ...banner,
  background: '#fde4d0',
  border: '1px solid #e8935a',
  color: '#8a3b12',
};

/** Decorator that stamps a "redesign coming" banner above a story. */
export const deprecatedSoon: Decorator = (Story) => (
  <div>
    <div style={deprecatedBanner} role="note" aria-label="Redesign coming">
      <span aria-hidden="true">⚠️</span>
      <span>
        Redesign coming — this component will be revamped soon; new designs are in the works.
      </span>
    </div>
    <Story />
  </div>
);
