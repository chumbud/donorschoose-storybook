import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState, type CSSProperties, type ReactNode } from 'react';
import '../tokens.css';
import './animations.css';
// Real feature stylesheets + components — demos reuse production code so this
// page is a faithful reference, not a re-implementation.
import '../dc-button.css';
import '../dc-give-widget.css';
import '../dc-tooltip.css';
import '../pages/dc-search-page.css';
import '../pages/dc-project-page.css';
import '../pages/dc-fund-page.css';
import { DCProjectCard } from '../DCProjectCard';
import { DCEssentialCard } from '../DCEssentialCard';
import { DCMap, DCMapPin, DCSchoolMarker } from '../DCMap';

/**
 * # Animations — Reference
 *
 * Every motion in the DonorsChoose library, grouped by how it behaves. Looping
 * animations can be paused and played; entrance, progress, and stagger
 * animations replay on demand; hover / state transitions play on hover or with
 * a per-card Play button. All motion is CSS on the `--dc-ease` curve.
 */
const meta = {
  title: 'Foundations/Tokens/Animations',
  tags: ['!autodocs'],
  parameters: { layout: 'fullscreen' },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

/* ----------------------------------------------------------------- styles -- */
const page: CSSProperties = { fontFamily: 'var(--dc-font-body)', color: 'var(--dc-black)', padding: '2.5rem' };
const mono: CSSProperties = { fontFamily: 'ui-monospace, Consolas, monospace', fontSize: '0.8rem' };
const grid: CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
  gap: '1rem',
};
const gridWide: CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
  gap: '1rem',
};
const cardBox: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  border: '1px solid var(--dc-grey-stroke)',
  borderRadius: 'var(--dc-radius-standard)',
  background: '#fff',
  overflow: 'hidden',
};
const stageBox: CSSProperties = {
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: 140,
  padding: '1.5rem 1.25rem',
  background: 'repeating-conic-gradient(var(--dc-vlgrey) 0% 25%, #fff 0% 50%) 50% / 22px 22px',
};
const metaBox: CSSProperties = { padding: '0.85rem 1rem 1rem', borderTop: '1px solid var(--dc-grey-stroke)' };
const codeChip: CSSProperties = {
  ...mono,
  display: 'block',
  marginTop: '0.6rem',
  padding: '0.5rem 0.6rem',
  background: 'var(--dc-vlgrey)',
  borderRadius: 6,
  color: 'var(--dc-black)',
  lineHeight: 1.5,
  whiteSpace: 'pre-wrap',
};

function pillBtn(active = false): CSSProperties {
  return {
    fontFamily: 'var(--dc-font-headline)',
    fontWeight: 700,
    fontSize: '0.8rem',
    color: active ? '#fff' : 'var(--dc-blue-link)',
    background: active ? 'var(--dc-blue-link)' : 'transparent',
    border: '1px solid var(--dc-blue-link)',
    borderRadius: 'var(--dc-radius-button)',
    padding: '0.4em 1em',
    cursor: 'pointer',
  };
}

/* --------------------------------------------------------------- card meta -- */
function CardMeta({
  name,
  timing,
  source,
  desc,
  code,
  control,
}: {
  name: string;
  timing: string;
  source: string;
  desc: string;
  code: string;
  control?: ReactNode;
}) {
  return (
    <div style={metaBox}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 8 }}>
        <span style={{ ...mono, fontWeight: 700, color: 'var(--dc-blue-link)' }}>{name}</span>
        <span style={{ ...mono, color: 'var(--dc-grey)' }}>{timing}</span>
      </div>
      <p style={{ fontSize: '0.85rem', color: 'var(--dc-black)', margin: '0.4rem 0 0' }}>{desc}</p>
      <div style={{ ...mono, color: 'var(--dc-grey)', fontSize: '0.72rem', marginTop: 4 }}>{source}</div>
      <code style={codeChip}>{code}</code>
      {control && <div style={{ marginTop: '0.7rem' }}>{control}</div>}
    </div>
  );
}

type Def = { name: string; timing: string; source: string; desc: string; code: string };

function StageCard({ def, stage, control }: { def: Def; stage: ReactNode; control?: ReactNode }) {
  return (
    <div style={cardBox}>
      <div style={stageBox}>{stage}</div>
      <CardMeta {...def} control={control} />
    </div>
  );
}

/* ============================================================ LOOPING ==== */
const LOOPS: (Def & { stage: ReactNode })[] = [
  {
    name: 'dc-button-spin',
    timing: '0.6s · linear · infinite',
    source: 'dc-button.css',
    desc: 'Loading spinner inside buttons while an action is in flight.',
    code: 'animation: dc-button-spin 0.6s linear infinite;',
    stage: (
      <span className="dc-button--loading" style={{ color: 'var(--dc-blue-link)', fontSize: '2.25rem' }}>
        <span className="dc-button__spinner" style={{ marginRight: 0 }} />
      </span>
    ),
  },
  {
    name: 'dc-pin-pulse',
    timing: '1.4s · --dc-ease · infinite',
    source: 'dc-map.css',
    desc: 'Locator ring around an active map pin so it reads as “you are here”.',
    code: 'animation: dc-pin-pulse 1.4s var(--dc-ease) infinite;',
    stage: (
      <span
        className="dc-map__pin dc-map__pin--active dc-map__pin--pulse"
        style={{ position: 'relative', transform: 'none' }}
      />
    ),
  },
  {
    name: 'dc-fund-pulse',
    timing: '1.5s · --dc-ease · infinite',
    source: 'dc-fund-page.css',
    desc: 'Red beacon on the newest item in a fund’s live activity feed.',
    code: 'animation: dc-fund-pulse 1.5s var(--dc-ease) infinite;',
    stage: (
      <span
        style={{
          width: 14,
          height: 14,
          borderRadius: '50%',
          background: '#ed0038',
          boxShadow: '0 0 0 0 rgba(237, 0, 56, 0.5)',
          animation: 'dc-fund-pulse 1.5s var(--dc-ease) infinite',
        }}
      />
    ),
  },
  {
    name: 'dc-dot-pulse',
    timing: '1.25s · --dc-ease · infinite',
    source: 'animations.css',
    desc: 'Generic expanding-ring beacon for drawing attention to a point.',
    code: 'animation: dc-dot-pulse 1.25s var(--dc-ease) infinite;',
    stage: (
      <span
        className="dc-kf dc-kf--dot-pulse"
        style={{ width: 16, height: 16, borderRadius: '50%', background: 'var(--dc-blue-link)' }}
      />
    ),
  },
  {
    name: 'dc-bounce',
    timing: '1s · --dc-ease · infinite',
    source: 'animations.css',
    desc: 'Subtle upward nudge at 90% — a gentle “look here” without a full loop.',
    code: 'animation: dc-bounce 1s var(--dc-ease) infinite;',
    stage: (
      <span
        className="dc-kf dc-kf--bounce"
        style={{ width: 40, height: 40, borderRadius: 12, background: 'var(--dc-blue-link)' }}
      />
    ),
  },
  {
    name: 'dc-dot-loader',
    timing: '1.2s · --dc-ease · infinite',
    source: 'animations.css',
    desc: 'Three bouncing dots — an inline “working…” loader for async content.',
    code: 'animation: dc-dot-loader 1.2s var(--dc-ease) infinite;\n/* dots 2 & 3 delayed 0.15s / 0.3s */',
    stage: (
      <span className="dc-dot-loader" style={{ transform: 'scale(1.6)' }}>
        <span className="dc-dot-loader__dot" />
        <span className="dc-dot-loader__dot" />
        <span className="dc-dot-loader__dot" />
      </span>
    ),
  },
];

/* ==================================================== LOADING PLACEHOLDER == */
const SKELETONS: (Def & { stage: ReactNode })[] = [
  {
    name: 'dc-skeleton-shimmer',
    timing: '1.4s · ease-in-out · infinite',
    source: 'dc-project-card.css · horizontal',
    desc: 'Shimmering placeholder for a project card while search results stream in.',
    code: 'animation: dc-skeleton-shimmer 1.4s ease-in-out infinite;',
    stage: (
      <div style={{ width: '100%' }}>
        <DCProjectCard loading title="" teacher="" school="" location="" goal={1} raised={0} donors={0} />
      </div>
    ),
  },
  {
    name: 'dc-skeleton-shimmer',
    timing: '1.4s · ease-in-out · infinite',
    source: 'dc-project-card.css · vertical',
    desc: 'Same skeleton state on the vertical grid card (photo-on-top layout).',
    code: '<DCProjectCard layout="vertical" loading />',
    stage: (
      <div style={{ width: 240 }}>
        <DCProjectCard loading layout="vertical" title="" teacher="" school="" location="" goal={1} raised={0} donors={0} />
      </div>
    ),
  },
];

/* ============================================================ HOVER ======= */
const clsHover = (base: string, on: boolean) => (on ? `${base} is-demo-hover` : base);

type HoverDef = Def & { render: (on: boolean) => ReactNode };

const HOVERS: HoverDef[] = [
  {
    name: 'Button',
    timing: 'all · 0.15s',
    source: 'dc-button.css',
    desc: 'Background + text color shift on hover / focus.',
    code: 'transition: all 0.15s var(--dc-ease);',
    render: (on) => <span className={clsHover('dc-button dc-button--primary dc-button--small', on)}>Give</span>,
  },
  {
    name: 'Project card',
    timing: 'border + glow · 0.15s',
    source: 'dc-project-card.css',
    desc: 'Border turns blue, a soft glow fades in, and the title recolors.',
    code: 'transition: border-color var(--dc-duration-fast);\n/* ::after glow → opacity 1 */',
    render: (on) => (
      <div className={clsHover('dc-project-card', on)} style={{ minHeight: 0, maxWidth: 200, padding: '1rem', gap: '0.5rem' }}>
        <div className="dc-project-card__main">
          <h3 className="dc-project-card__title" style={{ margin: 0 }}>Books for our library</h3>
        </div>
      </div>
    ),
  },
  {
    name: 'Essential card',
    timing: 'border-color · 0.15s',
    source: 'dc-essential-card.css',
    desc: 'Border tints blue on hover to signal the tile is selectable.',
    code: 'transition: border-color var(--dc-duration-fast) var(--dc-ease);',
    render: (on) => (
      <div className={clsHover('dc-essential', on)} style={{ width: 150 }}>
        <div className="dc-essential__price">$42</div>
        <div className="dc-essential__name">Watercolor set</div>
        <div className="dc-essential__for">for 30 students</div>
      </div>
    ),
  },
  {
    name: 'Give amount',
    timing: 'all · 0.15s',
    source: 'dc-give-widget.css',
    desc: 'Donation-amount chip outlines blue on hover before selection.',
    code: 'transition: all var(--dc-duration-fast) var(--dc-ease);',
    render: (on) => (
      <button className={clsHover('dc-give__amount', on)} type="button" style={{ pointerEvents: 'none' }}>$50</button>
    ),
  },
  {
    name: 'Map pin',
    timing: 'background + transform · 0.15s',
    source: 'dc-map.css',
    desc: 'Pin darkens on hover to confirm it’s the pointer target.',
    code: 'transition: transform .15s, background .15s;',
    render: (on) => <span className={clsHover('dc-map__pin', on)} style={{ position: 'relative', transform: 'none' }} />,
  },
  {
    name: 'School marker',
    timing: 'transform + filter · 0.15s',
    source: 'dc-map.css',
    desc: 'Need-level marker scales up 8% and dims slightly when active.',
    code: 'transform: scale(1.08); filter: brightness(0.94);',
    render: (on) => (
      <span className={clsHover('dc-school-marker', on)} style={{ position: 'relative', transform: on ? 'scale(1.08)' : 'none' }}>
        3 schools
      </span>
    ),
  },
  {
    name: 'Search result row',
    timing: 'border + title · 0.15s',
    source: 'dc-search-page.css',
    desc: 'List row highlights its border and title on hover.',
    code: 'transition: border-color var(--dc-duration-fast) var(--dc-ease);',
    render: (on) => (
      <div className={clsHover('dc-sp__row', on)} style={{ padding: '0.9rem 1rem', width: 190 }}>
        <div className="dc-sp__row-title" style={{ fontWeight: 700 }}>Art supplies for 3rd grade</div>
      </div>
    ),
  },
  {
    name: 'Tooltip',
    timing: 'opacity + scale · 0.15s',
    source: 'dc-tooltip.css',
    desc: 'Bubble fades and scales from 0.96 → 1 on hover, focus, or open.',
    code: 'transform: scale(0.96) → scale(1);\ntransition: opacity .15s, transform .15s;',
    render: (on) => (
      <span className={`dc-tooltip dc-tooltip--top${on ? ' is-open' : ''}`}>
        <span className="dc-button dc-button--secondary dc-button--small" style={{ pointerEvents: 'none' }}>
          Hover me
        </span>
        <span className="dc-tooltip__bubble" role="tooltip">Give today</span>
      </span>
    ),
  },
];

/* -------------------------------------------------------- card wrappers --- */
function HoverCard({ def }: { def: HoverDef }) {
  const [on, setOn] = useState(false);
  return (
    <div style={cardBox}>
      <div style={stageBox} onMouseEnter={() => setOn(true)} onMouseLeave={() => setOn(false)}>
        {def.render(on)}
      </div>
      <CardMeta
        {...def}
        control={
          <button style={pillBtn(on)} onClick={() => setOn((v) => !v)}>
            {on ? '↺ Reset' : '▶ Play'}
          </button>
        }
      />
    </div>
  );
}

function SectionHead({ title, sub, action }: { title: string; sub: string; action?: ReactNode }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '1rem', margin: '2.5rem 0 1rem' }}>
      <div>
        <h2 style={{ margin: 0 }}>{title}</h2>
        <p style={{ margin: '0.25rem 0 0', color: 'var(--dc-grey)', maxWidth: 620 }}>{sub}</p>
      </div>
      {action}
    </div>
  );
}

/* -------------------------------------------------------------- catalog --- */
function Catalog() {
  const [playing, setPlaying] = useState(true);
  const [cycle, setCycle] = useState(0);
  const replay = () => setCycle((c) => c + 1);
  const pausedCls = playing ? undefined : 'dc-anim-paused';

  return (
    <div style={page}>
      <h1 style={{ marginBottom: '0.25rem' }}>Animation reference</h1>
      <p style={{ fontSize: '1.05rem', color: 'var(--dc-grey)', maxWidth: 660, marginTop: 0 }}>
        Every animation in the library, grouped by how it behaves. All motion is CSS on the{' '}
        <code style={mono}>--dc-ease</code> curve.
      </p>

      {/* sticky global controls */}
      <div
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 5,
          display: 'flex',
          gap: '0.75rem',
          alignItems: 'center',
          padding: '0.85rem 0',
          background: 'rgba(255,255,255,0.92)',
          backdropFilter: 'blur(4px)',
          borderBottom: '1px solid var(--dc-grey-stroke)',
        }}
      >
        <button style={pillBtn(playing)} onClick={() => setPlaying((p) => !p)}>
          {playing ? '⏸ Pause loops' : '▶ Play loops'}
        </button>
        <button style={pillBtn(false)} onClick={replay}>↻ Replay animations</button>
        <span style={{ color: 'var(--dc-grey)', fontSize: '0.85rem' }}>Loops are {playing ? 'running' : 'paused'}.</span>
      </div>

      {/* 1 — Looping */}
      <SectionHead
        title="Looping & attention"
        sub="Run continuously until dismissed. Use Pause / Play (above) to freeze them."
      />
      <div style={grid} className={pausedCls}>
        {LOOPS.map((d) => (
          <StageCard key={d.name} def={d} stage={d.stage} />
        ))}
      </div>

      {/* 2 — Loading placeholders */}
      <SectionHead
        title="Loading placeholders"
        sub="The project card’s skeleton state — a shimmering placeholder shown while data loads, in both layouts."
      />
      <div style={gridWide} className={pausedCls}>
        {SKELETONS.map((d, i) => (
          <StageCard key={i} def={d} stage={d.stage} />
        ))}
      </div>

      {/* 3 — Progress bars */}
      <SectionHead
        title="Progress bars"
        sub="Funding bars grow to their raised amount on load; the fund bar also marches its stripes."
        action={<button style={pillBtn(false)} onClick={replay}>↻ Replay</button>}
      />
      <div style={grid} className={pausedCls}>
        <StageCard
          def={{
            name: 'dc-fundbar-fill',
            timing: '0.9s · --dc-ease',
            source: 'dc-project-page.css',
            desc: 'Project page bar fills from 0 to the funded width via scaleX.',
            code: 'animation: dc-fundbar-fill 0.9s var(--dc-ease) both;\n/* keyframes: scaleX(0) → scaleX(1) */',
          }}
          stage={
            <div key={cycle} className="dc-pp__fundbar-progress" style={{ width: '90%' }}>
              <div className="dc-pp__fundbar-fill" style={{ width: '62%' }} />
            </div>
          }
        />
        <StageCard
          def={{
            name: 'dc-fund-stripes',
            timing: 'fill 0.9s + stripes 0.8s loop',
            source: 'dc-fund-page.css',
            desc: 'Fund page bar fills in, then the barber-pole stripes keep marching.',
            code: 'animation:\n  dc-fundbar-fill 0.9s var(--dc-ease) both,\n  dc-fund-stripes 0.8s linear infinite;',
          }}
          stage={
            <div key={cycle} className="dc-fund__bar" style={{ width: '90%' }}>
              <span style={{ width: '70%' }} />
            </div>
          }
        />
      </div>

      {/* 4 — Entrance & stagger */}
      <SectionHead
        title="Entrance & stagger"
        sub="Play once as elements enter. Use the section’s Replay button to watch them again."
        action={<button style={pillBtn(false)} onClick={replay}>↻ Replay entrances</button>}
      />
      <div style={gridWide}>
        <StageCard
          def={{
            name: 'dc-appearUp',
            timing: '0.3s · --dc-ease',
            source: 'animations.css',
            desc: 'Quick 5px rise + fade for small elements entering the view.',
            code: 'animation: dc-appearUp 0.3s var(--dc-ease) both;',
          }}
          stage={
            <span
              key={cycle}
              className="dc-kf dc-kf--appearUp"
              style={{ width: 44, height: 44, borderRadius: 12, background: 'var(--dc-blue-link)' }}
            />
          }
        />
        <StageCard
          def={{
            name: 'dc-fadeInUp',
            timing: '0.5s · --dc-ease',
            source: 'animations.css',
            desc: 'Larger 1rem rise + fade for sections and cards on scroll-in.',
            code: 'animation: dc-fadeInUp 0.5s var(--dc-ease) both;',
          }}
          stage={
            <span
              key={cycle}
              className="dc-kf dc-kf--fadeInUp"
              style={{ width: 44, height: 44, borderRadius: 12, background: 'var(--dc-blue-link)' }}
            />
          }
        />
        <StageCard
          def={{
            name: 'dc-marker-in',
            timing: '0.45s · staggered 0.07s',
            source: 'dc-map.css',
            desc: 'Map pins & markers pop in one after another when the map mounts.',
            code: '<DCMap animateChildren>\n/* scale: 0 → 1.15 → 1, staggered by child */',
          }}
          stage={
            <div style={{ width: '100%' }}>
              <DCMap key={cycle} height={130} animateChildren>
                <DCMapPin x={20} y={40} />
                <DCMapPin x={44} y={65} count={3} active />
                <DCMapPin x={68} y={30} />
                <DCSchoolMarker x={82} y={72} need="fourth" count={5} />
                <DCMapPin x={34} y={82} visited />
              </DCMap>
            </div>
          }
        />
      </div>

      {/* 5 — On action */}
      <SectionHead
        title="Feedback on action"
        sub="Micro-interactions triggered by a click. Press “Add to cart” to play the cart pop."
      />
      <div style={gridWide}>
        <StageCard
          def={{
            name: 'dc-cart-pop',
            timing: '0.45s · --dc-ease',
            source: 'dc-essential-card.css',
            desc: 'Cart icon pops (0.8 → 1.25 → 1) and the label flips to “Added!” on add.',
            code: 'animation: dc-cart-pop 0.45s var(--dc-ease);',
          }}
          stage={
            <div style={{ width: 190 }}>
              <DCEssentialCard name="Watercolor set" price={42} forWho="for Ms. Rivera · Avon, MS" />
            </div>
          }
        />
      </div>

      {/* 6 — Hover & state */}
      <SectionHead
        title="Hover & state transitions"
        sub="Property tweens triggered by interaction. Hover a card, or use its Play / Reset button to hold the end state."
      />
      <div style={grid}>
        {HOVERS.map((d) => (
          <HoverCard key={d.name} def={d} />
        ))}
      </div>
    </div>
  );
}

export const Reference: Story = { render: () => <Catalog /> };
