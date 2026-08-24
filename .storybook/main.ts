import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  // Glob order sets index order, which is what the sidebar falls back to. Stories
  // come first so a group's position stays tied to its component files: with the
  // .mdx glob first, adding one standalone page (Cards → Overview) hoisted the
  // whole Cards group above Avatar. Ordering *within* a group is handled by
  // storySort in preview.tsx.
  "stories": [
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)",
    "../src/**/*.mdx"
  ],
  "addons": [
    "@chromatic-com/storybook",
    "@storybook/addon-vitest",
    "@storybook/addon-a11y",
    "@storybook/addon-docs",
    "@storybook/addon-mcp",
    "@geometricpanda/storybook-addon-badges"
  ],
  "framework": "@storybook/react-vite",
  // Serves .storybook/assets at the server root (e.g. /donorschoose-logo.png),
  // reachable by both the manager (sidebar logo) and the preview.
  "staticDirs": ["./assets"],
  // Sidebar logo sizing: default renders at 150px wide; scale to 84.375px (−44%,
  // i.e. two successive 25% reductions).
  managerHead: (head) => `${head}
    <style>
      img[alt="DonorsChoose"] { width: 84.375px !important; height: auto !important; }

      /* Sidebar: drop the per-item type glyphs (story / docs / component /
         folder) — pure noise once the tree is one flat list. The whole icon slot
         goes, not just the svg inside it: an empty slot still contributed the
         row's flex gap, which left component labels 6px right of the section
         titles. The 🚧 / ⚠️ status emoji live in the label text (see manager.tsx
         renderLabel), so they stay. */
      #storybook-explorer-menu .sidebar-item div:has(> svg[type]),
      #storybook-explorer-menu svg[type="story"],
      #storybook-explorer-menu svg[type="docs"],
      #storybook-explorer-menu svg[type="document"],
      #storybook-explorer-menu svg[type="component"],
      #storybook-explorer-menu svg[type="group"] {
        display: none !important;
      }

      /* Section headers (Foundations / Components / Pages) — always-open roots
         (manager.tsx showRoots). Storybook styles them as 11px uppercase with
         wide tracking; these read as plain component rows at .66 opacity, with
         1rem of air above. */
      #storybook-explorer-tree .sidebar-subheading[data-nodetype="root"] {
        margin-top: 1rem !important;
        opacity: 0.66;
      }
      #storybook-explorer-tree .sidebar-subheading[data-nodetype="root"] button {
        font-size: 14px !important;
        font-weight: 400 !important;
        text-transform: none !important;
        letter-spacing: normal !important;
        color: #212121 !important;
      }

      /* Flat hierarchy — no depth indent, since the sections are the only nesting
         left in the tree. */
      #storybook-explorer-tree .sidebar-item > a,
      #storybook-explorer-tree .sidebar-item > button,
      #storybook-explorer-tree .sidebar-subheading > button {
        padding-left: 8px !important;
      }

      /* Every expand/collapse chevron goes: with stories in their own column,
         nothing in the tree expands. That's the arrows on component rows, the one
         on each section header, and the expand-all control beside it. */
      #storybook-explorer-tree div:has(> svg[width="8"]) {
        display: none !important;
      }
      #storybook-explorer-tree button[data-action="expand-all"] {
        display: none !important;
      }

      /* No settings (gear) toggle. */
      button[aria-label="Settings"] { display: none !important; }

      /* No canvas toolbar (backgrounds, grid, outline, measure, zoom, share).
         Matched by the tools it holds so the addon panel's own .sb-bar — the
         Controls / Actions / Accessibility tabs — is left alone. */
      section.sb-bar:has([aria-label="Preview background"]),
      section.sb-bar:has([aria-label="Enter full screen"]) {
        display: none !important;
      }

      /* No divider between the sidebar and the canvas. */
      div:has(> * > .sidebar-container) { border-right: 0 !important; }

      /* The whole app — sidebar included — capped and centered in the window.
         Positioned so the story rail can sit on its right edge. */
      #root {
        max-width: 1328px;
        margin-inline: auto;
        position: relative;
      }

      /* ---- Story rail ----
         The sidebar lists components; the selected component's stories render in
         .dc-story-column, a rail on the manager's right edge (built in
         manager.tsx). Sidebar width itself is set through api.setSizes, never
         CSS: forcing --nav-width left Storybook's resize handle sized from its
         own stale state, which became a wide invisible drag strip. */
      :root { --dc-story-column-width: 180px; }

      /* The tree keeps only what sits directly under a section (depth 1) — nested
         components, their stories, and docs pages all live in the rail. Depth is
         tagged onto each row by manager.tsx (markSidebar); the nodetype rules
         cover the moment before a freshly rendered row gets tagged. */
      #storybook-explorer-tree .sidebar-item[data-dc-depth]:not([data-dc-depth="1"]),
      #storybook-explorer-tree .sidebar-item[data-nodetype="story"]:not([data-item-id^="overview"]),
      #storybook-explorer-tree .sidebar-item[data-nodetype="document"]:not([data-item-id^="overview"]) {
        display: none !important;
      }

      /* The section child whose subtree is open in the rail. Storybook's own
         selected styling lands on the story row, which no longer shows — except
         when the row *is* the open page (a root-level story like Overview). There
         Storybook paints the row solid blue with white text, so this lighter
         treatment has to stay out of the way or it renders blue on blue. */
      #storybook-explorer-tree .sidebar-item.is-dc-current:not([data-selected="true"]) > a,
      #storybook-explorer-tree .sidebar-item.is-dc-current:not([data-selected="true"]) > button {
        background: rgba(0, 98, 253, 0.1) !important;
        color: #0062fd !important;
        font-weight: 700 !important;
        border-radius: 4px;
      }

      /* Narrow the app's grid so the story rail on the right isn't overlapping
         the canvas or the addon panel. */
      #root > div:has(.sidebar-container) {
        width: calc(100% - var(--dc-story-column-width)) !important;
      }

      .dc-story-column {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        z-index: 2; /* above the sidebar region (z-index: 1) */
        width: var(--dc-story-column-width);
        display: none;
        flex-direction: column;
        gap: 0.25rem;
        padding: 1rem 0.75rem;
        overflow-y: auto;
        box-sizing: border-box;
        background: #ffffff;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      }
      .dc-story-column.is-open { display: flex; }

      /* ---- Pages: full-bleed canvas ----
         A page story is a whole composition, so it gets the canvas to itself:
         manager.tsx collapses the sidebar and keeps the rail shut, and these
         rules drop the 1328px app cap and the rail's reserved column so the
         preview spans the window. Both sidebars are taken out of the layout
         flow while a page is open, so reopening the sidebar (the S shortcut)
         overlays the page instead of squeezing it. The pages themselves keep
         their own 980px content containers. */
      #root.dc-full-bleed { max-width: none; }
      #root.dc-full-bleed > div:has(.sidebar-container) {
        width: 100% !important;
      }
      /* Both sidebars leave the layout flow while a page is open, so bringing
         one back overlays the page rather than squeezing it. Scoped to the
         full-bleed state: elsewhere the rail is positioned against the
         centred, capped #root, which fixed positioning would break. */
      #root.dc-full-bleed div:has(> div > .sidebar-container),
      #root.dc-full-bleed .dc-story-column {
        position: fixed;
      }

      /* ---- Collapsed nav ----
         On a page the sidebar collapses to this button rather than vanishing:
         a rounded square in the top-left corner that expands into the full
         sidebar (manager.tsx owns the toggle). Hidden everywhere else, where
         the sidebar is already on screen. */
      .dc-nav-toggle { display: none; }
      #root.dc-full-bleed .dc-nav-toggle {
        position: fixed;
        top: 1rem;
        left: 1rem;
        z-index: 12;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 36px;
        height: 36px;
        padding: 0;
        border: 1px solid rgba(65, 65, 66, 0.2);
        border-radius: 10px;
        background: #ffffff;
        color: #212121;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
        cursor: pointer;
      }
      #root.dc-full-bleed .dc-nav-toggle:hover {
        color: #0062fd;
        border-color: rgba(0, 98, 253, 0.4);
      }
      #root.dc-full-bleed .dc-nav-toggle:focus-visible {
        outline: 2px solid #8152ff;
        outline-offset: 2px;
      }

      /* Expanded: the button grows into a floating sidebar panel anchored to the
         same corner. The canvas keeps its full width — the nav column is forced
         back to 0 so the panel overlays the page instead of squeezing it (the
         nav column only exists in this state, so the three tracks are safe to
         name here). */
      #root.dc-full-bleed.dc-nav-open > div:has(.sidebar-container) {
        grid-template-columns: 0 1fr 0 !important;
      }
      #root.dc-full-bleed.dc-nav-open div:has(> div > .sidebar-container) {
        top: 1rem;
        left: 1rem;
        bottom: 1rem;
        /* Above the canvas, just under the toggle that closes it. */
        z-index: 11;
        width: var(--dc-nav-panel-width, 220px);
        border-radius: 12px;
        background: #ffffff;
        box-shadow: 0 8px 28px rgba(0, 0, 0, 0.14);
        overflow: hidden;
      }
      /* The toggle stays parked in the corner as the close control, so the
         sidebar's own header clears it. */
      #root.dc-full-bleed.dc-nav-open .sidebar-container {
        padding-top: 2.75rem;
        box-sizing: border-box;
      }

      /* Same treatment as the sidebar's section headers. */
      .dc-story-column__title {
        margin: 0 0 0.25rem;
        padding: 0.35rem 0.5rem;
        font-size: 14px;
        font-weight: 400;
        letter-spacing: normal;
        text-transform: none;
        color: #212121;
        opacity: 0.66;
      }

      .dc-story-column__list { display: flex; flex-direction: column; }

      /* Nested components inside a group get a heading of their own, with their
         stories indented under it — the hierarchy the tree used to unfurl. */
      .dc-story-column__subhead {
        appearance: none;
        border: 0;
        background: transparent;
        text-align: left;
        margin-top: 0.5rem;
        padding: 0.35rem 0.5rem;
        padding-left: calc(0.5rem + var(--dc-rail-level, 0) * 0.75rem);
        border-radius: 4px;
        font-size: 13px;
        line-height: 1.3;
        color: #212121;
        opacity: 0.66;
        cursor: pointer;
      }
      .dc-story-column__subhead:first-child { margin-top: 0; }
      .dc-story-column__subhead:hover { opacity: 1; color: #0062fd; }

      .dc-story-column__item {
        appearance: none;
        border: 0;
        background: transparent;
        text-align: left;
        padding: 0.35rem 0.5rem;
        padding-left: calc(0.5rem + var(--dc-rail-level, 0) * 0.75rem);
        border-radius: 4px;
        font-size: 13px;
        line-height: 1.3;
        color: #212121;
        cursor: pointer;
      }
      .dc-story-column__item:hover { background: rgba(0, 98, 253, 0.08); }
      .dc-story-column__item.is-selected {
        background: #0062fd;
        color: #fff;
        font-weight: 700;
      }
      .dc-story-column__item:focus-visible {
        outline: 2px solid #8152ff;
        outline-offset: 1px;
      }
    </style>`
};
export default config;