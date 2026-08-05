import { create } from 'storybook/theming';

/**
 * DonorsChoose Storybook themes.
 * Light uses the blue logo; dark uses the white logo. The manager picks one
 * based on the system color scheme (see manager.ts).
 * Colors/fonts mirror donorschoose-web design tokens.
 */

const brand = {
  brandTitle: 'DonorsChoose',
  brandUrl: 'https://www.donorschoose.org',
  brandTarget: '_blank',
  fontBase:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
  fontCode: 'ui-monospace, Consolas, monospace',
  colorPrimary: '#3804c1', // brand blue
  colorSecondary: '#0062fd', // link blue — selection + active nav
  appBorderRadius: 8,
  inputBorderRadius: 8,
};

export const lightTheme = create({
  ...brand,
  base: 'light',
  brandImage: '/donorschoose-logo-blue.png', // served via staticDirs in main.ts

  appBg: '#fafafa',
  appContentBg: '#ffffff',
  appPreviewBg: '#ffffff',
  appBorderColor: 'rgba(65, 65, 66, 0.2)',

  textColor: '#212121',
  textInverseColor: '#ffffff',
  textMutedColor: '#414142',

  barTextColor: '#414142',
  barSelectedColor: '#0062fd',
  barHoverColor: '#0062fd',
  barBg: '#ffffff',

  inputBg: '#ffffff',
  inputBorder: 'rgba(65, 65, 66, 0.2)',
  inputTextColor: '#212121',
});

export const darkTheme = create({
  ...brand,
  base: 'dark',
  brandImage: '/donorschoose-logo-white.png',

  appBg: '#1b1b1d',
  appContentBg: '#212121',
  appPreviewBg: '#212121',
  appBorderColor: 'rgba(255, 255, 255, 0.15)',

  textColor: '#f5f5f5',
  textInverseColor: '#212121',
  textMutedColor: 'rgba(255, 255, 255, 0.7)',

  barTextColor: 'rgba(255, 255, 255, 0.7)',
  barSelectedColor: '#5b8dff',
  barHoverColor: '#5b8dff',
  barBg: '#212121',

  inputBg: '#2a2a2c',
  inputBorder: 'rgba(255, 255, 255, 0.15)',
  inputTextColor: '#f5f5f5',
});

// Default export = light (used as a static fallback, e.g. docs theme).
export default lightTheme;
