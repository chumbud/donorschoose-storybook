import { useEffect, useState } from 'react';
import './tokens.css';
import './dc-progress-bar.css';

export interface DCProgressBarProps {
  /** Project total cost, in dollars. */
  total: number;
  /** Dollars funded so far. */
  funded: number;
  /** Number of donors (for the stats row). */
  donors?: number;
  /** Matched-project treatment (blue track + fill). */
  matched?: boolean;
  /** Force the fully-funded state (100%). */
  fullyFunded?: boolean;
  /** Show the donor count + "still needed" stats row above the bar. */
  showStats?: boolean;
  /** Animate the fill from 0 on mount. Defaults to true. */
  animate?: boolean;
}

const usd = (n: number) =>
  n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });

/**
 * The classic DonorsChoose project **progress bar** from `proposal.jsp`
 * (`.progress-bar` track + `.progress` fill, with the matched `.match` variant).
 * Blue fill that animates up from 0 on load; matched projects turn brand-blue.
 *
 * ⚠️ Deprecated — slated to be replaced by the
 * [Proposed](/?path=/story/components-progress-bar-proposed--playground) bar.
 */
export function DCProgressBar({
  total,
  funded,
  donors = 0,
  matched = false,
  fullyFunded = false,
  showStats = true,
  animate = true,
}: DCProgressBarProps) {
  const pct = fullyFunded ? 100 : Math.min(Math.round((funded / total) * 100), 100);
  const stillNeeded = Math.max(total - funded, 0);

  const [width, setWidth] = useState(animate ? 0 : pct);
  useEffect(() => {
    if (!animate) {
      setWidth(pct);
      return;
    }
    const id = requestAnimationFrame(() => setWidth(pct));
    return () => cancelAnimationFrame(id);
  }, [pct, animate]);

  return (
    <div className={['dc-pbar', matched && 'dc-pbar--match'].filter(Boolean).join(' ')}>
      {showStats && (
        <ul className="dc-pbar__stats">
          <li>
            {donors === 0
              ? 'Be the first to donate!'
              : `${donors} ${donors === 1 ? 'donor' : 'donors'}`}
          </li>
          <li className="dc-pbar__togo">
            {fullyFunded ? (
              'Fully funded!'
            ) : (
              <>
                <strong>{usd(stillNeeded)}</strong> still needed
                {matched && <span className="dc-pbar__match-note"> thanks to a match offer</span>}
              </>
            )}
          </li>
        </ul>
      )}
      <div
        className="dc-pbar__track"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={pct}
        aria-label={`${pct}% funded`}
      >
        <span
          className={['dc-pbar__fill', fullyFunded && 'is-full'].filter(Boolean).join(' ')}
          style={{ width: `${width}%` }}
        />
      </div>
    </div>
  );
}
