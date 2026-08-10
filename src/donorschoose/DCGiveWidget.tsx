import type { ReactNode } from 'react';
import { useEffect, useRef, useState } from 'react';
import './tokens.css';
import './dc-give-widget.css';
import { DCButton } from './DCButton';
import { DCInput } from './DCInput';
import { DCIcon } from './DCIcon';

export type DCGiveFrequency = 'monthly' | 'one-time';

export interface DCGiveWidgetProps {
  /** Card heading. */
  title?: ReactNode;
  /** Supporting line under the title. */
  subtitle?: ReactNode;
  /** Override the preset amounts for BOTH frequencies. When omitted, the
   *  frequency-specific defaults below are used. */
  amounts?: number[];
  /** Monthly preset amounts. Defaults to [15, 25, 50, 100] — people give less monthly. */
  monthlyAmounts?: number[];
  /** One-time preset amounts. Defaults to [50, 100, 250, 500] — people give more one-time. */
  oneTimeAmounts?: number[];
  /** Initially selected amount. */
  defaultAmount?: number;
  /** Show the Monthly / One-time toggle. */
  allowMonthly?: boolean;
  /** Starting frequency when monthly is allowed. */
  defaultFrequency?: DCGiveFrequency;
  /** Show the "Give another amount" custom entry. */
  allowCustomAmount?: boolean;
  /** Fine print for monthly gifts. */
  monthlyNote?: ReactNode;
  /** Fine print for one-time gifts. */
  oneTimeNote?: ReactNode;
  /** Override the CTA label. By default it reads e.g. "Give $50 monthly". */
  ctaLabel?: string;
  onGive?: (amount: number, frequency: DCGiveFrequency) => void;
}

const usd = (n: number) => `$${n.toLocaleString('en-US')}`;

export function DCGiveWidget({
  title = "Donate to this classroom",
  subtitle = 'Every donation goes towards supplies this classroom needs',
  amounts,
  monthlyAmounts = [15, 25, 50, 100],
  oneTimeAmounts = [50, 100, 250, 500],
  defaultAmount,
  allowMonthly = true,
  defaultFrequency = 'monthly',
  allowCustomAmount = true,
  monthlyNote = "We'll charge you once today. Starting next month, you'll be charged on the 17th of every month. Edit or cancel anytime.",
  oneTimeNote,
  ctaLabel,
  onGive,
}: DCGiveWidgetProps) {
  const [frequency, setFrequency] = useState<DCGiveFrequency>(allowMonthly ? defaultFrequency : 'one-time');
  // People give less monthly and more one-time, so each frequency has its own
  // tier of amounts (an explicit `amounts` prop overrides both).
  const activeAmounts = amounts ?? (frequency === 'monthly' ? monthlyAmounts : oneTimeAmounts);
  const [amount, setAmount] = useState<number>(
    defaultAmount ?? activeAmounts[Math.min(2, activeAmounts.length - 1)],
  );
  const [custom, setCustom] = useState(false);

  // Switching frequency swaps to that tier's amounts and re-selects its default
  // (index 2). The new button set is also keyed by frequency, so the buttons
  // remount and the appear animation replays. Skip the initial mount so a
  // provided `defaultAmount` is honored.
  const firstRun = useRef(true);
  useEffect(() => {
    if (firstRun.current) {
      firstRun.current = false;
      return;
    }
    const set = amounts ?? (frequency === 'monthly' ? monthlyAmounts : oneTimeAmounts);
    setAmount(set[Math.min(2, set.length - 1)]);
    setCustom(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [frequency]);

  const label =
    ctaLabel ?? `Give ${usd(amount)}${frequency === 'monthly' ? ' monthly' : ''}`;
  const note = frequency === 'monthly' ? monthlyNote : oneTimeNote;

  return (
    <div className="dc-give">
      <h2 className="dc-give__title">{title}</h2>
      {subtitle && <p className="dc-give__subtitle">{subtitle}</p>}

      {allowMonthly && (
        <div className="dc-give__freq" role="group" aria-label="Donation frequency">
          <button aria-pressed={frequency === 'monthly'} onClick={() => setFrequency('monthly')}>
            <DCIcon name="check" size={16} />
            Monthly
          </button>
          <button aria-pressed={frequency === 'one-time'} onClick={() => setFrequency('one-time')}>
            <DCIcon name="check" size={16} />
            One-time
          </button>
        </div>
      )}

      <div className="dc-give__amounts" role="group" aria-label="Donation amount">
        {activeAmounts.map((a) => (
          <button
            key={`${frequency}-${a}`}
            className={['dc-give__amount', a === amount && !custom && 'is-selected'].filter(Boolean).join(' ')}
            aria-pressed={a === amount && !custom}
            onClick={() => {
              setAmount(a);
              setCustom(false);
            }}
          >
            {usd(a)}
          </button>
        ))}
      </div>

      {allowCustomAmount &&
        (custom ? (
          <div className="dc-give__custom">
            <DCInput
              type="number"
              aria-label="Custom amount"
              placeholder="Enter an amount"
              autoFocus
              onChange={(e) => setAmount(Number(e.target.value) || 0)}
            />
          </div>
        ) : (
          <button className="dc-give__another" onClick={() => setCustom(true)}>
            Give another amount
          </button>
        ))}

      <DCButton className="dc-give__cta" fullWidth onClick={() => onGive?.(amount, frequency)}>
        {label}
      </DCButton>

      {note && <p className="dc-give__fine">{note}</p>}
    </div>
  );
}
