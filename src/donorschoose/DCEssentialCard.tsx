import './tokens.css';
import './dc-essential-card.css';
import { DCButton } from './DCButton';
import { DCIcon } from './DCIcon';

export interface DCEssentialCardProps {
  /** Item name, e.g. "Crayons". */
  name: string;
  /** Item price in dollars. */
  price: number;
  /** Who it's for, e.g. "For Mrs. Stephens · Avon, MS". */
  forWho: string;
  /** Product image URL. */
  imageUrl?: string;
  /** CTA label. Defaults to "Add to cart". */
  ctaLabel?: string;
  onAdd?: () => void;
}

export function DCEssentialCard({
  name,
  price,
  forWho,
  imageUrl,
  ctaLabel = 'Add to cart',
  onAdd,
}: DCEssentialCardProps) {
  return (
    <div className="dc-essential">
      <div
        className="dc-essential__img"
        style={imageUrl ? { backgroundImage: `url("${imageUrl}")` } : undefined}
        role="img"
        aria-label={name}
      />
      <div className="dc-essential__price">${price.toLocaleString('en-US')}</div>
      <div className="dc-essential__name">{name}</div>
      <div className="dc-essential__for">{forWho}</div>
      <DCButton className="dc-essential__cta" size="small" fullWidth icon={<DCIcon name="cart" size={16} />} onClick={onAdd}>
        {ctaLabel}
      </DCButton>
    </div>
  );
}
