import { useRef, useState } from 'react';
import './tokens.css';
import './dc-donation-progress-bar.css';

export interface DCMilestone {
  /** Dollar amount at which this milestone sits. */
  amount: number;
  label?: string;
}

export interface DCDonationProgressBarProps {
  /** Project's total cost, in dollars. */
  totalPrice: number;
  /** Dollars already funded. */
  fundedAmount: number;
  /** Match multiplier (e.g. 2 = 2×). 0/undefined = no match (purple theme when set). */
  matchMultiplier?: number;
  /** Explicit milestone dots. If omitted, they're derived from the two props below. */
  milestones?: DCMilestone[];
  /** When deriving milestones: how many dots. Defaults to 4. */
  milestoneCount?: number;
  /** When deriving milestones: where the first dot sits, as a percent (0–50). Defaults to 25. */
  firstMilestonePct?: number;
  /** Fires when the user clicks the track or types an amount. */
  onDonationSelect?: (amount: number) => void;
  /** Fires on the "Give to this classroom" button / Enter. */
  onGiveToClassroom?: (amount: number) => void;
}

const usd = (n: number) =>
  n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });

const clamp = (n: number, min: number, max: number) => Math.min(Math.max(n, min), max);

/** Evenly space `count` dots from `firstPct`% to 100%, as dollar amounts of `total`. */
function deriveMilestones(total: number, count: number, firstPct: number): DCMilestone[] {
  const n = Math.max(1, count);
  if (n === 1) return [{ amount: total }];
  const out: DCMilestone[] = [];
  for (let i = 0; i < n; i++) {
    const pct = firstPct + ((100 - firstPct) * i) / (n - 1);
    out.push({ amount: Math.round((pct / 100) * total) });
  }
  return out;
}

/**
 * **Proposed** donation progress bar (from the DonorsChoose Remix prototype). A
 * clickable/hoverable funding track with milestone dots, a live donation input,
 * and a match-multiplier (purple) / fully-funding (green) treatment. Hovering
 * previews the fill and snaps to $25 increments (or an exact milestone nearby).
 *
 * Re-implemented from `DonationProgressBar.tsx` + `progress-bar.css` in the
 * donorschoose-remix repo (matching its class names, palettes, and dimensions).
 */
export function DCDonationProgressBar({
  totalPrice,
  fundedAmount,
  matchMultiplier = 0,
  milestones,
  milestoneCount = 4,
  firstMilestonePct = 25,
  onDonationSelect,
  onGiveToClassroom,
}: DCDonationProgressBarProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [hover, setHover] = useState<{ pct: number; amount: number } | null>(null);
  const [inputValue, setInputValue] = useState('');

  const matched = matchMultiplier > 0;
  const dots = milestones ?? deriveMilestones(totalPrice, milestoneCount, firstMilestonePct);

  const fundedPct = clamp((fundedAmount / totalPrice) * 100, 0, 100);
  const remaining = Math.max(totalPrice - fundedAmount, 0);
  const isFull = fundedAmount >= totalPrice;

  // Preview position from hover, else from a typed amount (scaled by the match).
  const inputPreviewPct = inputValue
    ? clamp(((fundedAmount + Number(inputValue) * (matched ? matchMultiplier : 1)) / totalPrice) * 100, 0, 100)
    : null;
  const previewPct = hover?.pct ?? inputPreviewPct;
  const willComplete = previewPct != null && previewPct >= 100;
  const fullyFunding = isFull || willComplete;

  // Prominent remaining label once only the final segment is left.
  const positions = dots.map((m) => clamp((m.amount / totalPrice) * 100, 0, 100));
  const promptThreshold = positions.length >= 2 ? positions[positions.length - 2] : 75;
  const prominent = fundedPct >= promptThreshold && !isFull;

  /** Map a cursor position on the track to a preview pct + donor amount. */
  const readAt = (clientX: number): { pct: number; amount: number } => {
    const track = trackRef.current;
    if (!track) return { pct: fundedPct, amount: 0 };
    const rect = track.getBoundingClientRect();
    const cursorPct = clamp(((clientX - rect.left) / rect.width) * 100, 0, 100);
    const near = dots.find((m) => Math.abs((m.amount / totalPrice) * 100 - cursorPct) < 3);
    const target = near ? near.amount : fundedAmount + Math.round(((cursorPct / 100) * totalPrice - fundedAmount) / 25) * 25;
    const impact = clamp(target, fundedAmount, totalPrice) - fundedAmount;
    const pct = clamp(((fundedAmount + impact) / totalPrice) * 100, 0, 100);
    const donor = matched ? Math.round(impact / matchMultiplier) : impact;
    return { pct, amount: Math.max(donor, 0) };
  };

  const submit = () => {
    const amt = Number(inputValue) || hover?.amount || 0;
    if (amt > 0) onGiveToClassroom?.(amt);
  };

  const themeMod = fullyFunding
    ? 'dc-progress-widget--fully-funding'
    : matched
      ? 'dc-progress-widget--matched'
      : '';

  return (
    <div className={['dc-progress-widget', themeMod].filter(Boolean).join(' ')}>
      <div
        ref={trackRef}
        className="dc-progress-track"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={totalPrice}
        aria-valuenow={Math.round(fundedAmount)}
        aria-label={`${Math.round(fundedPct)}% funded`}
        onMouseMove={(e) => setHover(readAt(e.clientX))}
        onMouseLeave={() => setHover(null)}
        onClick={(e) => {
          const { amount } = readAt(e.clientX);
          if (amount > 0) {
            setInputValue(String(amount));
            onDonationSelect?.(amount);
          }
        }}
      >
        <div
          className={['dc-progress-fill', isFull && 'dc-progress-fill--full'].filter(Boolean).join(' ')}
          style={{ width: `${fundedPct}%` }}
        />
        {previewPct != null && previewPct > fundedPct && (
          <div
            className="dc-progress-hover-fill"
            style={{ left: `${fundedPct}%`, width: `${previewPct - fundedPct}%` }}
          />
        )}
        {dots.map((m, i) => {
          const pos = positions[i];
          const isLast = i === dots.length - 1;
          const reached = fundedAmount >= m.amount;
          const hovered = hover != null && Math.abs(hover.pct - pos) < 1.5;
          const cls = [
            'dc-milestone-dot',
            isLast && 'dc-milestone-dot--track-end',
            reached && 'dc-milestone-dot--reached',
            hovered && 'dc-milestone-dot--hovered',
          ]
            .filter(Boolean)
            .join(' ');
          return (
            <div
              key={i}
              className={cls}
              style={isLast ? undefined : { left: `${pos}%` }}
              title={m.label ?? usd(m.amount)}
            />
          );
        })}
        {hover && hover.amount > 0 && (
          <div className="dc-hover-tooltip" style={{ left: `${hover.pct}%` }}>
            Give {usd(hover.amount)}
          </div>
        )}
      </div>

      <div className="dc-progress-labels">
        <span
          className={['dc-progress-remaining', prominent && 'dc-progress-remaining--prominent']
            .filter(Boolean)
            .join(' ')}
        >
          {isFull
            ? 'Fully funded!'
            : matched
              ? `${usd(Math.ceil(remaining / matchMultiplier))} to complete`
              : `${usd(remaining)} to go`}
        </span>
      </div>

      <div className="dc-progress-input-area">
        <div className="dc-progress-input-wrap">
          <span className="dc-progress-input-prefix">$</span>
          <input
            className="dc-progress-input"
            type="text"
            inputMode="numeric"
            aria-label="Donation amount"
            placeholder="25"
            value={inputValue}
            onChange={(e) => {
              const v = e.target.value.replace(/[^0-9]/g, '');
              setInputValue(v);
              if (v) onDonationSelect?.(Number(v));
            }}
            onKeyDown={(e) => e.key === 'Enter' && submit()}
          />
        </div>
        <button type="button" className="dc-progress-give-btn" onClick={submit}>
          Give to this classroom
        </button>
      </div>
    </div>
  );
}
