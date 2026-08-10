import './tokens.css';
import './dc-pagination.css';
import { DCIcon } from './DCIcon';

export interface DCPaginationProps {
  /** Current page (1-based). */
  page: number;
  /** Total number of pages. */
  totalPages: number;
  /** Called with the requested page number. */
  onChange?: (page: number) => void;
  /** How many pages to show on each side of the current page. Defaults to 1. */
  siblingCount?: number;
}

type Item = number | 'ellipsis';

function buildItems(page: number, total: number, sibling: number): Item[] {
  if (total <= 1) return total === 1 ? [1] : [];
  const items: Item[] = [];
  const left = Math.max(2, page - sibling);
  const right = Math.min(total - 1, page + sibling);

  items.push(1);
  if (left > 2) items.push('ellipsis');
  for (let i = left; i <= right; i++) items.push(i);
  if (right < total - 1) items.push('ellipsis');
  items.push(total);
  return items;
}

export function DCPagination({ page, totalPages, onChange, siblingCount = 1 }: DCPaginationProps) {
  const items = buildItems(page, totalPages, siblingCount);
  const go = (p: number) => (e: React.MouseEvent) => {
    e.preventDefault();
    if (p >= 1 && p <= totalPages && p !== page) onChange?.(p);
  };

  return (
    <nav className="dc-pagination" aria-label="Pagination">
      <ul>
        {/* Prev */}
        <li className={page <= 1 ? 'disabled' : ''}>
          <a
            href="#"
            onClick={go(page - 1)}
            aria-label="Previous page"
            aria-disabled={page <= 1 || undefined}
            tabIndex={page <= 1 ? -1 : undefined}
          >
            <DCIcon name="navigateleft" size={14} className="dc-pagination__icon" />
          </a>
        </li>

        {items.map((it, i) =>
          it === 'ellipsis' ? (
            <li key={`e${i}`} aria-hidden="true">
              <span className="ellipsis">…</span>
            </li>
          ) : (
            <li key={it} className={it === page ? 'current' : ''}>
              <a
                href="#"
                onClick={go(it)}
                aria-label={`Page ${it}`}
                aria-current={it === page ? 'page' : undefined}
              >
                {it}
              </a>
            </li>
          ),
        )}

        {/* Next */}
        <li className={page >= totalPages ? 'disabled' : ''}>
          <a
            href="#"
            onClick={go(page + 1)}
            aria-label="Next page"
            aria-disabled={page >= totalPages || undefined}
            tabIndex={page >= totalPages ? -1 : undefined}
          >
            <DCIcon name="navigateright" size={14} className="dc-pagination__icon" />
          </a>
        </li>
      </ul>
    </nav>
  );
}
