# DonorsChoose components (sandbox port)

Components ported from [`donorschoose-web`](https://github.com/) into this Storybook sandbox as examples.

## Contents

- **Foundations/Units** — the `1rem = 16px` rule + rem type/radii scales.
- **Foundations/Animations** — DC timings (0.15/0.3/0.5s), easing, keyframes.
- **Foundations/Headings** — h1–h4 synced with `_typography.scss`.
- **Foundations/Typography** — self-hosted Sharp Sans + Roboto specimens.
- **Button** (`DCButton`) and **Tooltip** (`DCTooltip`) components.

Design tokens live in [`tokens.css`](./tokens.css). Storybook itself is themed
DonorsChoose (logo, fonts, light-only) via `.storybook/theme.ts`,
`.storybook/manager.ts`, and `.storybook/donorschoose-ui.css`.

## Conventions

- **`1rem = 16px`.** The root font-size is pinned to `16px` in
  [`src/index.css`](../index.css) (and re-noted in `dc-button.css`). All rem
  values here assume a 16px root, matching donorschoose-web. Don't change the
  root font-size without revisiting these components' dimensions.
- **Fonts are self-hosted** in `/public/fonts` and declared in
  [`fonts.css`](./fonts.css): Sharp Sans (headline, 500/700/900) and Roboto
  (body, 400/500/700).

## `DCButton`

Ported from `web/war/scss/base/form-elements/_buttons.scss`.

| Prop | Values | Notes |
| --- | --- | --- |
| `variant` | `primary` \| `secondary` | Filled blue CTA / outlined |
| `size` | `default` \| `small` | |
| `fullWidth` | boolean | Fills the container, **capped at `550px`** and centered |
| `loading` | boolean | Spinner + locked interaction |
| `warning` | boolean | Secondary-only destructive (red) tone |
| `overlay` | boolean | Secondary-only, for dark/photo backgrounds |
| `icon` | ReactNode | Optional icon (SVG/img) |
| `iconPosition` | `left` \| `right` | Defaults to `left`; hidden while `loading` |

Plus all native `<button>` attributes (`onClick`, `type`, `aria-*`, …).
