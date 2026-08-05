/*
 * Input-modality tracking for keyboard-only focus rings.
 *
 * Text inputs match :focus-visible even when focused by mouse click (they
 * accept keyboard entry), so CSS alone can't tell a Tab from a click. We set
 * data-focus-source="keyboard" on <html> only after a Tab press, and back to
 * "pointer" on any pointer interaction. CSS gates the purple outline on the
 * keyboard value; a mouse click keeps just the light-blue focus border.
 */
let installed = false;

export function installFocusModality() {
  if (installed || typeof document === 'undefined') return;
  installed = true;

  const root = document.documentElement;
  const set = (source: 'keyboard' | 'pointer') => {
    root.setAttribute('data-focus-source', source);
  };

  // Default to pointer so nothing shows a keyboard ring until Tab is used.
  if (!root.hasAttribute('data-focus-source')) set('pointer');

  window.addEventListener(
    'keydown',
    (e) => {
      if (e.key === 'Tab') set('keyboard');
    },
    true,
  );
  window.addEventListener('pointerdown', () => set('pointer'), true);
}
