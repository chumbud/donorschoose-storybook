import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState, type CSSProperties } from 'react';
import { fn } from 'storybook/test';
import { DCProjectCard } from './DCProjectCard';
import { projects, byStatus } from './mockProjects';

/**
 * The DonorsChoose classroom **project card** — ported from `ProjectCard.js` +
 * `_projectCard.scss`. Shows the funding progress bar and adapts to each
 * project state: active, almost funded, funded, and matched.
 */
const meta = {
  title: 'Components/Cards/Project Card',
  component: DCProjectCard,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
  args: { onGive: fn() },
} satisfies Meta<typeof DCProjectCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Active: Story = { args: byStatus('active') };
export const AlmostFunded: Story = { args: byStatus('almost') };
export const Funded: Story = { args: byStatus('funded') };
export const Matched: Story = { args: byStatus('matched') };

/** Give box on — an amount input sits to the left of the Give button. */
export const GiveBox: Story = { args: { ...byStatus('active'), giveBox: true } };

/** Shimmering skeleton shown while data loads — horizontal and vertical. */
export const Loading: Story = {
  args: { ...byStatus('active'), loading: true },
  render: (args) => (
    <div style={{ display: 'grid', gap: '1.5rem' }}>
      <DCProjectCard {...args} layout="horizontal" />
      <div style={{ width: 300 }}>
        <DCProjectCard {...args} layout="vertical" />
      </div>
    </div>
  ),
};

/** Every state stacked together. */
export const AllStates: Story = {
  parameters: { layout: 'fullscreen' },
  render: (args) => (
    <div style={{ display: 'grid', gap: '1.5rem', padding: '2rem', maxWidth: 760 }}>
      {projects.map((p) => (
        <DCProjectCard key={p.title} {...p} onGive={args.onGive} />
      ))}
    </div>
  ),
};

/* -------------------------------------------------------------- Playground -- */
const PLAYGROUND_GOAL = 800;
const SURNAMES = ['Abernathy', 'Worthington', 'Rodriguez', 'Fitzgerald', 'Vanderberg', 'Montgomery'];
const SCHOOL_BASE = 'Frederick Douglass Memorial Elementary School of the Arts and Sciences';
const ESSAY_WORDS = (
  'My students need new books, supplies, and technology to learn, grow, explore, ' +
  'create, and thrive in a classroom that sparks curiosity every single day for ' +
  'every child who walks through our door ready to imagine something bigger'
).split(' ');

/** Build a "Ms. …" teacher name of roughly `n` characters. */
function teacherOfLength(n: number) {
  let s = '';
  for (let i = 0; `Ms. ${s}`.length < n; i++) s += (s ? '-' : '') + SURNAMES[i % SURNAMES.length];
  return `Ms. ${s}`.slice(0, Math.max(4, n));
}
/** Build a school name of roughly `n` characters. */
function schoolOfLength(n: number) {
  let s = SCHOOL_BASE;
  while (s.length < n) s += ` ${SCHOOL_BASE}`;
  return s.slice(0, n).trim();
}
/** Build an essay/description blurb of `n` words. */
function essayOfWords(n: number) {
  const out: string[] = [];
  for (let i = 0; out.length < n; i++) out.push(ESSAY_WORDS[i % ESSAY_WORDS.length]);
  return out.join(' ');
}

const rowStyle: CSSProperties = { display: 'grid', gridTemplateColumns: '150px 1fr 56px', alignItems: 'center', gap: '0.75rem', padding: '0.3rem 0' };
const labelStyle: CSSProperties = { fontFamily: 'var(--dc-font-headline)', fontWeight: 700, fontSize: '0.85rem', color: 'var(--dc-black)' };
const valStyle: CSSProperties = { fontFamily: 'ui-monospace, monospace', fontSize: '0.8rem', color: 'var(--dc-grey)', textAlign: 'right' };

function LenSlider({ label, value, min, max, suffix, onChange }: {
  label: string; value: number; min: number; max: number; suffix: string; onChange: (v: number) => void;
}) {
  return (
    <label style={rowStyle}>
      <span style={labelStyle}>{label}</span>
      <input type="range" min={min} max={max} value={value} onChange={(e) => onChange(Number(e.target.value))} style={{ width: '100%', accentColor: 'var(--dc-blue-link)' }} />
      <span style={valStyle}>{value}{suffix}</span>
    </label>
  );
}

/**
 * Content stress-test — drag the sliders to lengthen or shorten the teacher
 * name, school name, funding progress, and essay, and watch how both card
 * layouts handle it (wrapping, truncation, progress fill).
 */
export const Playground: Story = {
  parameters: { layout: 'padded' },
  render: () => {
    const [teacherLen, setTeacherLen] = useState(12);
    const [schoolLen, setSchoolLen] = useState(26);
    const [pct, setPct] = useState(45);
    const [essayWords, setEssayWords] = useState(16);

    const shared = {
      title: 'Hands-On Science for Curious Minds',
      teacher: teacherOfLength(teacherLen),
      school: schoolOfLength(schoolLen),
      location: 'Brooklyn, NY',
      description: essayOfWords(essayWords),
      goal: PLAYGROUND_GOAL,
      raised: Math.round((PLAYGROUND_GOAL * pct) / 100),
      donors: 12,
      onGive: fn(),
    };

    return (
      <div style={{ fontFamily: 'var(--dc-font-body)', maxWidth: 760 }}>
        <div style={{ padding: '1rem 1.25rem', marginBottom: '1.5rem', background: 'var(--dc-vlgrey)', border: '1px solid var(--dc-grey-stroke)', borderRadius: 'var(--dc-radius-standard)' }}>
          <LenSlider label="Teacher name" value={teacherLen} min={4} max={44} suffix=" ch" onChange={setTeacherLen} />
          <LenSlider label="School name" value={schoolLen} min={6} max={70} suffix=" ch" onChange={setSchoolLen} />
          <LenSlider label="Progress" value={pct} min={0} max={100} suffix="%" onChange={setPct} />
          <LenSlider label="Essay" value={essayWords} min={0} max={60} suffix=" wd" onChange={setEssayWords} />
        </div>

        <div style={{ display: 'grid', gap: '1.5rem' }}>
          <DCProjectCard {...shared} />
          <div style={{ width: 300 }}>
            <DCProjectCard {...shared} layout="vertical" />
          </div>
        </div>
      </div>
    );
  },
};
