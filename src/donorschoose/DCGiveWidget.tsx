import type { ReactNode } from 'react';
import { useState } from 'react';
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
  /** Preset amounts. Defaults to [15, 25, 50, 100]. */
  amounts?: number[];
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
  amounts = [15, 25, 50, 100],
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
  const [amount, setAmount] = useState<number>(defaultAmount ?? amounts[Math.min(2, amounts.length - 1)]);
  const [custom, setCustom] = useState(false);

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
            {frequency === 'monthly' && <DCIcon name="check" size={16} />}
            Monthly
          </button>
          <button aria-pressed={frequency === 'one-time'} onClick={() => setFrequency('one-time')}>
            {frequency === 'one-time' && <DCIcon name="check" size={16} />}
            One-time
          </button>
        </div>
      )}

      <div className="dc-give__amounts">
        {amounts.map((a) => (
          <button
            key={a}
            className={['dc-give__amount', a === amount && !custom && 'is-selected'].filter(Boolean).join(' ')}
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
