import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  "stories": [
    "../src/**/*.mdx",
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  "addons": [
    "@chromatic-com/storybook",
    "@storybook/addon-vitest",
    "@storybook/addon-a11y",
    "@storybook/addon-docs",
    "@storybook/addon-mcp"
  ],
  "framework": "@storybook/react-vite",
  // Serves .storybook/assets at the server root (e.g. /donorschoose-logo.png),
  // reachable by both the manager (sidebar logo) and the preview.
  "staticDirs": ["./assets"],
  // Sidebar logo sizing: default renders at 150px wide; scale to 112.5px (−25%).
  managerHead: (head) => `${head}
    <style>
      img[alt="DonorsChoose"] { width: 112.5px !important; height: auto !important; }
    </style>`
};
export default config;