import type { Meta, StoryObj } from '@storybook/react-vite';
import './fonts.css';

/**
 * Self-hosted DonorsChoose web fonts.
 *
 * - **Sharp Sans** — headline / display face (weights 500, 700, 900),
 *   ported from `donorschoose-web` (`_sharpsans.scss`).
 * - **Roboto** — body face (weights 400, 500, 700), Apache License 2.0.
 *
 * Font files live in `/public/fonts` and load via `src/donorschoose/fonts.css`.
 */
const meta = {
  title: 'Tokens/Typography',
  parameters: { layout: 'padded' },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const specimens = [
  {
    family: 'Sharp Sans',
    stack: '"sharp-sans", Montserrat, Verdana, sans-serif',
    weights: [
      { weight: 500, label: 'Semibold' },
      { weight: 700, label: 'Bold' },
      { weight: 900, label: 'Extrabold' },
    ],
  },
  {
    family: 'Roboto',
    stack: '"Roboto", Helvetica, Arial, sans-serif',
    weights: [
      { weight: 400, label: 'Regular' },
      { weight: 500, label: 'Medium' },
      { weight: 700, label: 'Bold' },
    ],
  },
];

export const Specimens: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: '2.5rem', maxWidth: 720 }}>
      {specimens.map(({ family, stack, weights }) => (
        <section key={family}>
          <h2
            style={{
              fontFamily: stack,
              fontWeight: 700,
              fontSize: '0.8rem',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: '#414142',
              margin: '0 0 1rem',
            }}
          >
            {family}
          </h2>
          {weights.map(({ weight, label }) => (
            <div
              key={weight}
              style={{
                fontFamily: stack,
                fontWeight: weight,
                fontSize: '2rem',
                lineHeight: 1.3,
                color: '#212121',
              }}
            >
              <span style={{ fontSize: '0.75rem', color: '#9a9a9a', fontWeight: 400 }}>
                {weight} · {label}
              </span>
              <div>Students need your help. Give today.</div>
            </div>
          ))}
        </section>
      ))}
    </div>
  ),
};
