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
  tags: ['!autodocs'],
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

/* ------------------------------------------------------------- downloads -- */
async function downloadFont(path: string) {
  const res = await fetch(path);
  const blob = await res.blob();
  const href = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = href;
  a.download = path.split('/').pop()!;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(href);
}

const fontFiles = [
  { family: 'Sharp Sans', label: 'Semibold (500)', formats: ['woff2', 'woff', 'ttf'], file: 'SharpSans-Semibold' },
  { family: 'Sharp Sans', label: 'Bold (700)', formats: ['woff2', 'woff', 'ttf'], file: 'SharpSans-Bold' },
  { family: 'Sharp Sans', label: 'Extrabold (900)', formats: ['woff2', 'woff', 'ttf'], file: 'SharpSans-Extrabold' },
  { family: 'Roboto', label: 'Regular (400)', formats: ['ttf'], file: 'Roboto-Regular' },
  { family: 'Roboto', label: 'Medium (500)', formats: ['ttf'], file: 'Roboto-Medium' },
  { family: 'Roboto', label: 'Bold (700)', formats: ['ttf'], file: 'Roboto-Bold' },
];

/** Download the self-hosted font files (Sharp Sans + Roboto). */
export const Downloads: Story = {
  render: () => (
    <div style={{ maxWidth: 560, fontFamily: 'var(--dc-font-body)', color: 'var(--dc-black)' }}>
      <h2 style={{ marginTop: 0 }}>Font downloads</h2>
      <p style={{ color: 'var(--dc-grey)' }}>Self-hosted from <code>/public/fonts</code>.</p>
      {['Sharp Sans', 'Roboto'].map((fam) => (
        <section key={fam} style={{ marginBottom: '1.5rem' }}>
          <h3 style={{ margin: '0 0 0.5rem' }}>{fam}</h3>
          {fontFiles.filter((f) => f.family === fam).map((f) => (
            <div
              key={f.file}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem',
                padding: '0.6rem 0', borderBottom: '1px solid var(--dc-grey-stroke)',
              }}
            >
              <span>{f.label}</span>
              <span style={{ display: 'flex', gap: '0.4rem' }}>
                {f.formats.map((ext) => (
                  <button
                    key={ext}
                    type="button"
                    onClick={() => downloadFont(`/fonts/${f.file}.${ext}`)}
                    style={{
                      fontFamily: 'ui-monospace, monospace', fontSize: '0.72rem', cursor: 'pointer',
                      padding: '0.3em 0.7em', borderRadius: 'var(--dc-radius-button)',
                      border: '1px solid var(--dc-blue-link)', color: 'var(--dc-blue-link)', background: 'transparent',
                    }}
                  >
                    ↓ {ext}
                  </button>
                ))}
              </span>
            </div>
          ))}
        </section>
      ))}
    </div>
  ),
};

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
