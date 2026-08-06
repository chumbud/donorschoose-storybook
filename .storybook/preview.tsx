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

const preview: Preview = {
  // Generate an autodocs "Docs" page for every component/page automatically.
  tags: ['autodocs'],
  parameters: {
    options: {
      storySort: {
        order: ['Overview', 'Brand', 'Tokens', 'Components', 'Pages'],
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
        location: [BADGE_LOCATION.TOOLBAR, BADGE_LOCATION.SIDEBAR],
      },
      deprecated: {
        title: '⚠️ Redesign coming',
        styles: { backgroundColor: '#fde4d0', borderColor: '#e8935a', color: '#8a3b12' },
        location: [BADGE_LOCATION.TOOLBAR, BADGE_LOCATION.SIDEBAR],
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
