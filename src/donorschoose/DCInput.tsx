import type { InputHTMLAttributes, ReactNode, SelectHTMLAttributes, TextareaHTMLAttributes } from 'react';
import { useId, useState } from 'react';
import './tokens.css';
import './dc-input.css';

/* ---------------- Field wrapper (label + help/error) ---------------- */
interface FieldShellProps {
  label?: ReactNode;
  required?: boolean;
  help?: ReactNode;
  error?: ReactNode;
  htmlFor?: string;
  children: ReactNode;
}
function FieldShell({ label, required, help, error, htmlFor, children }: FieldShellProps) {
  return (
    <div className={['dc-field', error && 'dc-field--error'].filter(Boolean).join(' ')}>
      {label && (
        <label className="dc-field__label" htmlFor={htmlFor}>
          {label}
          {required && <span className="dc-field__req">*</span>}
        </label>
      )}
      {children}
      {error ? (
        <span className="dc-field__error">{error}</span>
      ) : help ? (
        <span className="dc-field__help">{help}</span>
      ) : null}
    </div>
  );
}

/* ---------------- Text input ---------------- */
export interface DCInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: ReactNode;
  help?: ReactNode;
  error?: ReactNode;
}
export function DCInput({ label, help, error, required, id, className, ...props }: DCInputProps) {
  const autoId = useId();
  const inputId = id ?? autoId;
  return (
    <FieldShell label={label} required={required} help={help} error={error} htmlFor={inputId}>
      <input id={inputId} className={['dc-input', className].filter(Boolean).join(' ')} {...props} />
    </FieldShell>
  );
}

/* ---------------- Textarea (with optional word counter) ---------------- */
export interface DCTextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: ReactNode;
  help?: ReactNode;
  error?: ReactNode;
  /** Minimum word count (turns the counter green once reached). */
  minWords?: number;
  /** Maximum word count (turns the counter red once exceeded). */
  maxWords?: number;
}

const countWords = (s: string) => (s.trim() ? s.trim().split(/\s+/).length : 0);

export function DCTextarea({
  label,
  help,
  error,
  required,
  id,
  className,
  minWords,
  maxWords,
  value,
  defaultValue,
  onChange,
  ...props
}: DCTextareaProps) {
  const autoId = useId();
  const inputId = id ?? autoId;
  const showCounter = minWords != null || maxWords != null;
  const [count, setCount] = useState(() => countWords(String(value ?? defaultValue ?? '')));

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCount(countWords(e.target.value));
    onChange?.(e);
  };

  const state =
    maxWords != null && count > maxWords
      ? 'max'
      : minWords != null && count >= minWords
        ? 'min'
        : '';

  return (
    <FieldShell label={label} required={required} help={help} error={error} htmlFor={inputId}>
      <textarea
        id={inputId}
        className={['dc-textarea', className].filter(Boolean).join(' ')}
        value={value}
        defaultValue={defaultValue}
        onChange={handleChange}
        {...props}
      />
      {showCounter && (
        <span
          className={['dc-field__wordcount', state && `dc-field__wordcount--${state}`]
            .filter(Boolean)
            .join(' ')}
          aria-live="polite"
        >
          {count} {count === 1 ? 'word' : 'words'}
          {maxWords != null && ` / ${maxWords} max`}
          {minWords != null && count < minWords && ` (${minWords} min)`}
        </span>
      )}
    </FieldShell>
  );
}

/* ---------------- Select ---------------- */
export interface DCSelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: ReactNode;
  help?: ReactNode;
  error?: ReactNode;
}
export function DCSelect({ label, help, error, required, id, className, children, ...props }: DCSelectProps) {
  const autoId = useId();
  const inputId = id ?? autoId;
  return (
    <FieldShell label={label} required={required} help={help} error={error} htmlFor={inputId}>
      <select id={inputId} className={['dc-select', className].filter(Boolean).join(' ')} {...props}>
        {children}
      </select>
    </FieldShell>
  );
}

/* ---------------- Checkbox / Radio ---------------- */
// Canonical implementation lives in DCCheckbox; re-exported here as DCCheck
// so form code can import it alongside the other field components.
export { DCCheckbox as DCCheck, type DCCheckboxProps as DCCheckProps } from './DCCheckbox';

/* ---------------- Search input ---------------- */
export interface DCSearchInputProps extends InputHTMLAttributes<HTMLInputElement> {
  /** Submit button label. Pass null to hide the button. */
  submitLabel?: ReactNode;
  onSubmit?: () => void;
}
export function DCSearchInput({
  submitLabel = 'Search',
  onSubmit,
  placeholder = 'Search projects, schools, or teachers',
  className,
  ...props
}: DCSearchInputProps) {
  return (
    <form
      className={['dc-search', className].filter(Boolean).join(' ')}
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit?.();
      }}
      role="search"
    >
      <span className="dc-search__field">
        <svg className="dc-search__icon" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M15.5 14h-.8l-.3-.3a6.5 6.5 0 1 0-.7.7l.3.3v.8l5 5 1.5-1.5-5-5zm-6 0a4.5 4.5 0 1 1 0-9 4.5 4.5 0 0 1 0 9z" />
        </svg>
        <input className="dc-input" type="search" placeholder={placeholder} {...props} />
      </span>
      {submitLabel != null && (
        <button type="submit" className="dc-search__submit">
          {submitLabel}
        </button>
      )}
    </form>
  );
}
