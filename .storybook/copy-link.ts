/**
 * Hover-to-copy deep links for sidebar rows and the story rail.
 *
 * Rather than injecting a button into markup React owns — Storybook's tree
 * re-renders freely, and the rail is rebuilt on every navigation — one floating
 * button tucks itself into whichever row the pointer is over.
 *
 * Docs headings deliberately don't use this: Storybook already gives them their
 * own anchor links.
 */

export interface CopyLinkTarget {
  /** Row the pointer is over — the button sits inside its right edge. */
  anchor: HTMLElement;
  /** Absolute URL to put on the clipboard. */
  href: string;
  /** Accessible name, e.g. "Copy link to States". */
  label: string;
}

const STYLE_ID = 'dc-copy-link-styles';

const CSS = `
.dc-copy-link {
  position: fixed;
  z-index: 2147483000;
  display: none;
  align-items: center;
  gap: 4px;
  height: 22px;
  padding: 0 6px;
  border: 1px solid rgba(65, 65, 66, 0.2);
  border-radius: 6px;
  background: #fff;
  color: #414142;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  font-size: 11px;
  line-height: 1;
  cursor: pointer;
  box-shadow: 0 2px 6px rgba(33, 33, 33, 0.12);
}
.dc-copy-link.is-visible { display: inline-flex; }
.dc-copy-link:hover { color: #0062fd; border-color: rgba(0, 98, 253, 0.4); }
.dc-copy-link:focus-visible { outline: 2px solid #8152ff; outline-offset: 1px; }
.dc-copy-link svg { width: 12px; height: 12px; fill: currentColor; }
.dc-copy-link__label { display: none; font-weight: 700; }
.dc-copy-link.is-copied { color: #6ea217; border-color: rgba(110, 162, 23, 0.5); }
.dc-copy-link.is-copied .dc-copy-link__label { display: inline; }
`;

/** A link glyph — inline so this works in the manager and the preview alike. */
const ICON = `<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M6.9 9.1a.75.75 0 0 1 0-1.06l1.1-1.1a2.75 2.75 0 0 1 3.9 3.9l-1.6 1.6a2.75 2.75 0 0 1-3.9 0 .75.75 0 0 1 1.07-1.06 1.25 1.25 0 0 0 1.77 0l1.6-1.6a1.25 1.25 0 0 0-1.77-1.77l-1.1 1.1a.75.75 0 0 1-1.07 0Z"/><path d="M9.1 6.9a.75.75 0 0 1 0 1.06l-1.1 1.1a2.75 2.75 0 0 1-3.9-3.9l1.6-1.6a2.75 2.75 0 0 1 3.9 0 .75.75 0 0 1-1.07 1.06 1.25 1.25 0 0 0-1.77 0l-1.6 1.6a1.25 1.25 0 0 0 1.77 1.77l1.1-1.1a.75.75 0 0 1 1.07 0Z"/></svg>`;

const copyToClipboard = async (doc: Document, text: string) => {
  const view = doc.defaultView;
  try {
    await view?.navigator.clipboard?.writeText(text);
    return true;
  } catch {
    // Clipboard API needs a secure context; fall back to a throwaway selection.
    try {
      const scratch = doc.createElement('textarea');
      scratch.value = text;
      scratch.setAttribute('readonly', '');
      scratch.style.cssText = 'position:fixed;top:-100px;opacity:0';
      doc.body.appendChild(scratch);
      scratch.select();
      const ok = doc.execCommand('copy');
      scratch.remove();
      return ok;
    } catch {
      return false;
    }
  }
};

/**
 * Wire up the affordance in `doc`. `resolve` is handed whatever the pointer is
 * over and returns the link to offer, or null to stay hidden.
 */
export function installCopyLink(doc: Document, resolve: (el: HTMLElement) => CopyLinkTarget | null) {
  if (!doc.body || doc.getElementById(STYLE_ID)) return;

  const style = doc.createElement('style');
  style.id = STYLE_ID;
  style.textContent = CSS;
  doc.head.appendChild(style);

  const button = doc.createElement('button');
  button.type = 'button';
  button.className = 'dc-copy-link';
  button.innerHTML = `${ICON}<span class="dc-copy-link__label">Copied</span>`;
  doc.body.appendChild(button);

  let target: CopyLinkTarget | null = null;
  let hideTimer = 0;
  let copiedTimer = 0;

  const hide = () => {
    button.classList.remove('is-visible', 'is-copied');
    target = null;
  };

  const show = (next: CopyLinkTarget) => {
    doc.defaultView?.clearTimeout(hideTimer);
    target = next;
    const box = next.anchor.getBoundingClientRect();
    button.style.top = `${Math.round(box.top + box.height / 2 - 11)}px`;
    button.style.left = `${Math.round(box.right - 30)}px`;
    button.setAttribute('aria-label', next.label);
    button.title = next.label;
    button.classList.add('is-visible');
  };

  doc.addEventListener(
    'mouseover',
    (event) => {
      const el = event.target as HTMLElement | null;
      if (!el || el === button || button.contains(el)) return;
      const next = resolve(el);
      if (next) show(next);
      else if (target) {
        // Leaving a target: give the pointer a moment to reach the button.
        doc.defaultView?.clearTimeout(hideTimer);
        hideTimer = doc.defaultView?.setTimeout(hide, 120) ?? 0;
      }
    },
    true,
  );

  button.addEventListener('mouseenter', () => doc.defaultView?.clearTimeout(hideTimer));
  button.addEventListener('mouseleave', hide);
  doc.addEventListener('scroll', hide, true);

  button.addEventListener('click', async (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (!target) return;
    const ok = await copyToClipboard(doc, target.href);
    if (!ok) return;
    button.classList.add('is-copied');
    doc.defaultView?.clearTimeout(copiedTimer);
    copiedTimer = doc.defaultView?.setTimeout(() => button.classList.remove('is-copied'), 1200) ?? 0;
  });
}

/**
 * The manager URL for a story/docs entry — what a shareable link looks like.
 * `hash` deep-links to a docs section (Storybook scrolls the docs iframe to it).
 */
export const entryUrl = (
  origin: string,
  viewMode: 'story' | 'docs',
  entryId: string,
  hash?: string,
) => `${origin}/?path=/${viewMode}/${entryId}${hash ? `#${hash}` : ''}`;
