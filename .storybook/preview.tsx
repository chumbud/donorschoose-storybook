import type { Preview } from '@storybook/react-vite'
// Load the app's global stylesheet so stories render with the same CSS variables
// and base styles that main.tsx applies at runtime.
import '../src/index.css'
// DonorsChoose design tokens (CSS custom properties) for all stories.
import '../src/donorschoose/tokens.css'
// Self-hosted DonorsChoose web fonts (Sharp Sans + Roboto), available to all stories.
import '../src/donorschoose/fonts.css'
// DonorsChoose look & feel + forced light mode. Imported LAST so it wins.
import './donorschoose-ui.css'
import theme from './theme'
import { BADGE_LOCATION } from '@geometricpanda/storybook-addon-badges'

/**
 * Workaround: Docs pages came up blank whenever you navigated to one from a story
 * (a hard reload of the same `?path=/docs/...` URL was fine).
 *
 * Storybook 10.5.6's test instrumentation replaces `HTMLElement.prototype.focus`
 * with an accessor whose getter dereferences `this.ownerDocument` — so *reading*
 * `HTMLElement.prototype.focus` throws `TypeError: Illegal invocation`. React
 * Aria, bundled into the components package that the docs blocks render with,
 * reads exactly that when it installs its global focus listeners. The rejection
 * aborts the docs render and `#storybook-docs` is left empty. A fresh docs load
 * escapes it because the patch is only installed once a story renders.
 *
 * The guard delegates to Storybook's getter for real elements and hands back the
 * native `focus` (captured here, before the patch lands) for a prototype read.
 * Remove once the upstream getter checks its receiver.
 */
const nativeFocus = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'focus')?.value as
  | ((options?: FocusOptions) => void)
  | undefined;

type FocusGetter = (() => unknown) & { dcGuarded?: boolean };

const guardFocusAccessor = () => {
  const descriptor = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'focus');
  const get = descriptor?.get as FocusGetter | undefined;
  if (!get || get.dcGuarded) return;

  const guarded: FocusGetter = function (this: unknown) {
    return this instanceof HTMLElement ? get.call(this) : nativeFocus;
  };
  guarded.dcGuarded = true;
  Object.defineProperty(HTMLElement.prototype, 'focus', { ...descriptor, get: guarded });
};

// The patch is installed by a story loader, so the decorator (which runs after
// loaders) is what actually catches it; this call covers anything earlier.
guardFocusAccessor();


const preview: Preview = {
  decorators: [
    (Story) => {
      guardFocusAccessor();
      return <Story />;
    },
  ],
  // Generate an autodocs "Docs" page for every component/page automatically.
  tags: ['autodocs'],
  parameters: {
    // Center every story in the canvas, vertically and horizontally. Stories
    // that need the full bleed (pages, fixed-position demos) opt out with their
    // own `layout: 'fullscreen'`. Content is capped at the site's 980px page
    // width in donorschoose-ui.css.
    layout: 'centered',
    options: {
      /* Components are listed explicitly so the order is stated rather than
       * inherited from filenames — that's also what keeps `Cards` in place now
       * that it owns a standalone Overview page (`Cards, ['Overview', '*']`
       * orders Cards' children without moving Cards itself). New entries land at
       * the trailing `'*'`; move them into the list to place them.
       *
       * A comparator function would express this more tersely, but Storybook
       * evaluates this parameter as plain JS while indexing, so a typed one can't
       * be used here.
       */
      storySort: {
        order: [
          'Overview',
          'Foundations',
          ['Tokens', 'Brand'],
          'Components',
          [
            'Avatar',
            'Buttons and Links',
            'Cart',
            'Checkbox',
            'Checkout Upsell',
            'Progress Bar',
            'Cards',
            ['Overview', '*'],
            'FAQ',
            'Give Widget',
            'Navigation',
            'Icons',
            'Inputs',
            'Map',
            'Modal',
            'Pagination',
            'Scroll Area',
            'Share Tools',
            'Subnav',
            'Text',
            'Toast',
            'Tooltip',
            '*',
          ],
          'Pages',
        ],
      },
    },
    // Status badges (via @geometricpanda/storybook-addon-badges). Applied to a
    // component's meta with `parameters: { badges: ['wip'] | ['deprecated'] }`.
    // Note: the sidebar badge only renders for the active story (addon quirk);
    // the toolbar badge is always visible.
    badgesConfig: {
      wip: {
        title: '🚧 Under construction',
        styles: { backgroundColor: '#fff6da', borderColor: '#e6c34d', color: '#7a5b00' },
        location: [BADGE_LOCATION.TOOLBAR],
      },
      deprecated: {
        title: '⚠️ Redesign coming',
        styles: { backgroundColor: '#fde4d0', borderColor: '#e8935a', color: '#8a3b12' },
        location: [BADGE_LOCATION.TOOLBAR],
      },
    },
    // Light only — dark mode is disabled.
    docs: {
      theme,
    },
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#ffffff' },
        { name: 'grey', value: '#fafafa' },
      ],
    },
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo'
    }
  },
};

export default preview;
