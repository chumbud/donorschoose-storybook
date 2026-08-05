import type { InputHTMLAttributes, ReactNode } from 'react';
import { useEffect, useRef } from 'react';
import './tokens.css';
import './dc-checkbox.css';

export interface DCCheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  /** Label text/nodes shown next to the control. */
  label: ReactNode;
  /** `checkbox` (default) or `radio`. */
  type?: 'checkbox' | 'radio';
  /** Checkbox-only indeterminate (mixed) state. */
  indeterminate?: boolean;
}

export function DCCheckbox({
  label,
  type = 'checkbox',
  indeterminate = false,
  disabled,
  className,
  ...props
}: DCCheckboxProps) {
  const ref = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (ref.current) ref.current.indeterminate = type === 'checkbox' && indeterminate;
  }, [indeterminate, type]);

  return (
    <label
      className={['dc-check', disabled && 'dc-check--disabled', className].filter(Boolean).join(' ')}
    >
      <input ref={ref} type={type} disabled={disabled} {...props} />
      <span>{label}</span>
    </label>
  );
}
