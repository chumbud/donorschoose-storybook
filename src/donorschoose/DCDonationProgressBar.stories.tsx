import { useState, type CSSProperties } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { DCDonationProgressBar } from './DCDonationProgressBar';
import { DCButton } from './DCButton';

/** Auto milestone count by project-cost tier (mirrors the demo's `am` toggle). */
function autoMilestones(total: number): number {
  if (total < 500) return 2;
  if (total < 1000) return 3;
  if (total < 2000) return 4;
  if (total < 3500) return 5;
  return 6;
}

interface PlaygroundArgs {
  /** `t` — total project cost. */
  totalPrice: number;
  /** `f` — dollars funded. */
  fundedAmount: number;
  /** `am` — auto-scale milestone count from the total (ignores Milestone count). */
  autoMilestoneCount: boolean;
  /** `n` — milestone count. */
  milestoneCount: number;
  /** `p` — first milestone position (%). */
  firstMilestonePct: number;
  /** `m` — matched donation on/off. */
  matched: boolean;
  /** `mult` — match multiplier (used when matched). */
  matchMultiplier: number;
  /** `vm` — preview in a mobile-width frame. */
  mobileViewport: boolean;
  /** `vw` — mobile frame width (px). */
  mobileWidth: number;
  onDonationSelect: (amount: number) => void;
  onGiveToClassroom: (amount: number) => void;
}

const frame: CSSProperties = {
  border: '1px solid var(--dc-grey-stroke)',
  borderRadius: 20,
  padding: '1.25rem',
  margin: '0 auto',
  boxShadow: '0 8px 30px rgba(33,33,33,0.12)',
};

/** Debug-mode playground — maps the demo's controls onto the proposed bar. */
function ProgressBarPlayground({
  totalPrice,
  fundedAmount,
  autoMilestoneCount,
  milestoneCount,
  firstMilestonePct,
  matched,
  matchMultiplier,
  mobileViewport,
  mobileWidth,
  onDonationSelect,
  onGiveToClassroom,
}: PlaygroundArgs) {
  const [copied, setCopied] = useState(false);
  const count = autoMilestoneCount ? autoMilestones(totalPrice) : milestoneCount;

  // Shareable permalink encoding the current state (same params as the demo).
  const shareUrl =
    `https://donorschoose-remix.vercel.app/progress-bar?t=${totalPrice}&f=${fundedAmount}` +
    `&mult=${matched ? matchMultiplier : 0}&n=${count}&p=${firstMilestonePct}` +
    `&am=${autoMilestoneCount ? 1 : 0}&vm=${mobileViewport ? 1 : 0}&vw=${mobileWidth}`;
  const copyLink = () => {
    navigator.clipboard?.writeText(shareUrl);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1500);
  };

  const bar = (
    <DCDonationProgressBar
      totalPrice={totalPrice}
      fundedAmount={fundedAmount}
      matchMultiplier={matched ? matchMultiplier : 0}
      milestoneCount={count}
      firstMilestonePct={firstMilestonePct}
      onDonationSelect={onDonationSelect}
      onGiveToClassroom={onGiveToClassroom}
    />
  );

  return (
    <div style={{ maxWidth: 560, margin: '0 auto' }}>
      <div style={{ marginBottom: '1.25rem' }}>
        <DCButton variant="secondary" size="small" onClick={copyLink}>
          {copied ? 'Copied!' : 'Copy link to this state'}
        </DCButton>
      </div>
      {mobileViewport ? (
        <div style={{ ...frame, width: mobileWidth, maxWidth: '100%' }}>{bar}</div>
      ) : (
        <div style={{ maxWidth: 520 }}>{bar}</div>
      )}
    </div>
  );
}

/**
 * The **proposed** replacement for the classic project progress bar (from the
 * DonorsChoose Remix prototype). The controls below are the prototype's debug
 * panel — total (`t`), funded (`f`), milestone count (`n`) / first position
 * (`p`) / auto-count (`am`), match (`m`) + multiplier (`mult`), and a mobile
 * preview (`vm` / `vw`). Hover or click the track to preview a donation.
 */
const meta = {
  title: 'Components/Progress Bar/Proposed',
  component: ProgressBarPlayground,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  args: {
    totalPrice: 868,
    fundedAmount: 325,
    autoMilestoneCount: false,
    milestoneCount: 4,
    firstMilestonePct: 25,
    matched: false,
    matchMultiplier: 2,
    mobileViewport: false,
    mobileWidth: 375,
    onDonationSelect: fn(),
    onGiveToClassroom: fn(),
  },
  argTypes: {
    totalPrice: { control: { type: 'range', min: 100, max: 5000, step: 50 } },
    fundedAmount: { control: { type: 'range', min: 0, max: 5000, step: 25 } },
    autoMilestoneCount: { control: 'boolean' },
    milestoneCount: { control: { type: 'range', min: 1, max: 10, step: 1 } },
    firstMilestonePct: { control: { type: 'range', min: 0, max: 50, step: 1 } },
    matched: { control: 'boolean' },
    matchMultiplier: { control: 'inline-radio', options: [1.5, 2, 2.5, 3] },
    mobileViewport: { control: 'boolean' },
    mobileWidth: { control: { type: 'range', min: 280, max: 480, step: 5 } },
  },
} satisfies Meta<typeof ProgressBarPlayground>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Full debug playground — drag every control (the demo's t / f / n / p / am / m / mult / vm / vw). */
export const Playground: Story = {};

/** A 2× match — purple treatment; the label shows the donor's matched contribution. */
export const Matched: Story = { args: { matched: true, matchMultiplier: 2, fundedAmount: 300 } };

/** Fully funded — green treatment. */
export const FullyFunded: Story = { args: { fundedAmount: 868 } };

/** Mobile preview at an iPhone width. */
export const Mobile: Story = { args: { mobileViewport: true, mobileWidth: 375 } };
