import { useState, type ReactNode } from 'react';
import './tokens.css';
import './dc-typeahead.css';
import { DCAvatar } from './DCAvatar';
import schoolIconRaw from './assets/site-icons/map/school-building.svg?raw';

export interface DCTypeaheadTeacher {
  name: string;
  school: string;
  location: string;
  /** Placeholder avatar key, e.g. "teacher-3". */
  avatar?: string;
}
export interface DCTypeaheadSchool {
  name: string;
  address: string;
}

export interface DCTypeaheadProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  /** Suggested query completion (e.g. typing "k" → "kindergarten"). */
  completion?: string;
  teachers?: DCTypeaheadTeacher[];
  schools?: DCTypeaheadSchool[];
  /** Force the results panel open (handy for docs/snapshots). */
  open?: boolean;
  onViewAllTeachers?: () => void;
}

const escapeRe = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

/** Bolds every occurrence of the query within the text. */
function Highlight({ text, q }: { text: string; q: string }): ReactNode {
  if (!q) return text;
  const parts = text.split(new RegExp(`(${escapeRe(q)})`, 'ig'));
  return parts.map((p, i) =>
    p.toLowerCase() === q.toLowerCase() ? <strong key={i}>{p}</strong> : <span key={i}>{p}</span>,
  );
}

/**
 * Search **type-ahead** — the autocomplete that drops out of the site search
 * field: a query completion, then TEACHERS and SCHOOLS result groups with a
 * "View all matching teachers" link. Matches in each result are bolded.
 */
export function DCTypeahead({
  value: valueProp,
  onChange,
  placeholder = 'Search classroom projects',
  completion,
  teachers = [],
  schools = [],
  open,
  onViewAllTeachers,
}: DCTypeaheadProps) {
  const [internal, setInternal] = useState(valueProp ?? '');
  const [focused, setFocused] = useState(false);
  const value = valueProp ?? internal;
  const isOpen = (open ?? focused) && value.trim().length > 0;

  const set = (v: string) => {
    setInternal(v);
    onChange?.(v);
  };

  return (
    <div className="dc-ta">
      <input
        className="dc-ta__input"
        type="search"
        role="combobox"
        aria-expanded={isOpen}
        aria-autocomplete="list"
        value={value}
        placeholder={placeholder}
        onChange={(e) => set(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setTimeout(() => setFocused(false), 120)}
      />

      {isOpen && (
        <div className="dc-ta__panel" role="listbox">
          {completion && (
            <button type="button" className="dc-ta__completion" role="option" onMouseDown={() => set(completion)}>
              <Highlight text={completion} q={value} />
            </button>
          )}

          {teachers.length > 0 && (
            <>
              <div className="dc-ta__group">Teachers</div>
              {teachers.map((t) => (
                <button type="button" className="dc-ta__row" role="option" key={t.name + t.school}>
                  <DCAvatar name={t.name} placeholder={t.avatar} size={44} />
                  <span className="dc-ta__row-text">
                    <span className="dc-ta__row-title">
                      <Highlight text={t.name} q={value} />
                    </span>
                    <span className="dc-ta__row-sub">
                      {t.school}, {t.location}
                    </span>
                  </span>
                </button>
              ))}
              <button type="button" className="dc-ta__viewall" onMouseDown={onViewAllTeachers}>
                View all matching teachers
              </button>
            </>
          )}

          {schools.length > 0 && (
            <>
              <div className="dc-ta__group">Schools</div>
              {schools.map((s) => (
                <button type="button" className="dc-ta__row" role="option" key={s.name + s.address}>
                  <span className="dc-ta__school-ic" aria-hidden="true" dangerouslySetInnerHTML={{ __html: schoolIconRaw }} />
                  <span className="dc-ta__row-text">
                    <span className="dc-ta__row-title">
                      <Highlight text={s.name} q={value} />
                    </span>
                    <span className="dc-ta__row-sub">{s.address}</span>
                  </span>
                </button>
              ))}
            </>
          )}
        </div>
      )}
    </div>
  );
}
