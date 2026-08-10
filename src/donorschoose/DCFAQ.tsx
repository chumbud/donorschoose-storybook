import { useId, useState, type ReactNode } from 'react';
import './tokens.css';
import './dc-faq.css';
import { DCIcon } from './DCIcon';

export interface DCFAQItem {
  question: ReactNode;
  answer: ReactNode;
}

export interface DCFAQProps {
  /** Section heading (e.g. "Answers and tools"). */
  heading?: ReactNode;
  /** Supporting line under the heading. */
  subheader?: ReactNode;
  /** The question / answer pairs. */
  items: DCFAQItem[];
  /**
   * When `true`, each question toggles its answer (accordion). Default `false` —
   * a static list with every answer shown, in `columns` columns.
   */
  collapsible?: boolean;
  /** Columns for the static (non-collapsible) layout. Defaults to 2. */
  columns?: 1 | 2;
}

/**
 * A **FAQ** section — ported from the static `section.faq` markup
 * (`.question-container` → `.single-question` `<h3>` + `<p>`) and
 * `components/_faq.scss`. Static two-column by default; pass `collapsible` for
 * the click-to-expand accordion variant (the `js-single-question` behavior).
 */
export function DCFAQ({ heading, subheader, items, collapsible = false, columns = 2 }: DCFAQProps) {
  const [open, setOpen] = useState<number | null>(0);
  const uid = useId();

  const classes = [
    'dc-faq',
    collapsible ? 'dc-faq--collapsible' : `dc-faq--cols-${columns}`,
  ].join(' ');

  return (
    <section className={classes}>
      {heading && <h2 className="dc-faq__heading">{heading}</h2>}
      {subheader && <p className="dc-faq__subheader">{subheader}</p>}

      <div className="dc-faq__list">
        {items.map((item, i) =>
          collapsible ? (
            <div
              key={i}
              className={['dc-faq__item', 'dc-faq__item--toggle', open === i && 'is-open']
                .filter(Boolean)
                .join(' ')}
            >
              <button
                type="button"
                id={`${uid}-q-${i}`}
                className="dc-faq__q-btn"
                aria-expanded={open === i}
                aria-controls={`${uid}-a-${i}`}
                onClick={() => setOpen(open === i ? null : i)}
              >
                <span className="dc-faq__q">{item.question}</span>
                <DCIcon name={open === i ? 'up' : 'down'} size={16} title={open === i ? 'Collapse' : 'Expand'} />
              </button>
              <div
                id={`${uid}-a-${i}`}
                role="region"
                aria-labelledby={`${uid}-q-${i}`}
                className="dc-faq__a"
                hidden={open !== i}
              >
                {item.answer}
              </div>
            </div>
          ) : (
            <div key={i} className="dc-faq__item">
              <h3 className="dc-faq__q">{item.question}</h3>
              <div className="dc-faq__a">{item.answer}</div>
            </div>
          ),
        )}
      </div>
    </section>
  );
}
