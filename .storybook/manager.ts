import { addons } from 'storybook/manager-api';
import { lightTheme, darkTheme } from './theme';

// Theme-aware Storybook chrome: blue DonorsChoose logo on light, white on dark,
// following the system color scheme. The story canvas stays light (see
// donorschoose-ui.css).
const mq =
  typeof window !== 'undefined' && window.matchMedia
    ? window.matchMedia('(prefers-color-scheme: dark)')
    : null;

const applyTheme = (isDark: boolean) => {
  addons.setConfig({ theme: isDark ? darkTheme : lightTheme });
};

applyTheme(!!mq?.matches);

// Re-apply when the system preference flips (a manual refresh guarantees the
// logo/brand image re-renders if Storybook doesn't hot-swap it).
mq?.addEventListener?.('change', (e) => applyTheme(e.matches));
