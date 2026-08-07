import './tokens.css';
import './dc-map-essentials-card.css';
import { usd } from './money';

export interface DCMapEssentialsCardProps {
  /** Item name, e.g. "Tissues". */
  name: string;
  /** Owning teacher, e.g. "Ms. Bri". */
  teacher: string;
  /** Price in dollars. */
  price: number;
  /** Product image URL. */
  imageUrl?: string;
  /** Project/list page URL. */
  href?: string;
  onAdd?: () => void;
}

/**
 * The **essentials version of the map card** — a single Essentials-list item as
 * it appears in the "Discover local need" map sidebar: a product photo, the item
 * name, "From [teacher]'s essentials list", and a purple "Add to cart $X" button.
 *
 * Ported from `MapEssentialsCard.js` + `.essentials-list-card.mini` in map.scss.
 */
export function DCMapEssentialsCard({
  name,
  teacher,
  price,
  imageUrl,
  href = '#',
  onAdd,
}: DCMapEssentialsCardProps) {
  return (
    <a className="dc-map-essentials-card" href={href}>
      <div
        className="dc-map-essentials-card__img"
        style={imageUrl ? { backgroundImage: `url("${imageUrl}")` } : undefined}
        role="img"
        aria-label={name}
      />
      <div className="dc-map-essentials-card__info">
        <div className="dc-map-essentials-card__name">{name}</div>
        <div className="dc-map-essentials-card__from">From {teacher}&#39;s essentials list</div>
      </div>
      <button
        type="button"
        className="dc-map-essentials-card__cta"
        onClick={(e) => {
          e.preventDefault();
          onAdd?.();
        }}
      >
        Add to cart <span className="dc-map-essentials-card__price">{usd(price)}</span>
      </button>
    </a>
  );
}
