import type { ReactNode } from 'react';
import './tokens.css';
import './dc-share.css';
import { DCIcon } from './DCIcon';

export const SHARE_PLATFORMS = [
  'facebook',
  'email',
  'nextdoor',
  'linkedin',
  'twitter',
  'sms',
  'messenger',
] as const;

export type SharePlatform = (typeof SHARE_PLATFORMS)[number];

const CONFIG: Record<SharePlatform, { label: string; color: string; icon: string }> = {
  facebook: { label: 'Facebook', color: '#1877F2', icon: 'icon-ss-facebook' },
  email: { label: 'Email', color: '#2b2b2b', icon: 'icon-ss-mail' },
  nextdoor: { label: 'Nextdoor', color: '#00a95c', icon: 'icon-ss-nextdoor' },
  linkedin: { label: 'LinkedIn', color: '#0A66C2', icon: 'icon-ss-linkedin' },
  twitter: { label: 'X', color: '#000000', icon: 'icon-ss-twitter' },
  sms: { label: 'SMS', color: '#6EA217', icon: 'icon-ss-phone' },
  messenger: { label: 'Messenger', color: '#0084FF', icon: 'icon-ss-facebook' },
};

/** Renders a brand glyph from the social-circle sprite (public/icon-social-circle.svg). */
function SocialGlyph({ id, size = 20 }: { id: string; size?: number }) {
  return (
    <svg className="dc-icon" width={size} height={size} viewBox="0 0 23 32" aria-hidden="true">
      <use href={`/icon-social-circle.svg#${id}`} />
    </svg>
  );
}

export interface DCShareToolsProps {
  /** Which platforms/actions to show, in order. Defaults to Facebook, Email, Nextdoor, LinkedIn. */
  platforms?: SharePlatform[];
  /** Boost-card heading. Pass null for a bare button row (no grey card). */
  heading?: ReactNode;
  /** Supporting line under the heading. */
  description?: ReactNode;
  /** Layout: labelled `row` (default), `stacked`, or `icons` (disc-only). */
  layout?: 'row' | 'stacked' | 'icons';
  /** Show the copy-link field + button. */
  showCopyLink?: boolean;
  /** The URL shown in the copy-link field. */
  url?: string;
  onShare?: (platform: SharePlatform) => void;
  onCopy?: () => void;
}

export function DCShareTools({
  platforms = ['facebook', 'email', 'nextdoor', 'linkedin'],
  heading = 'Give this project a boost!',
  description = 'A chain reaction of support starts with one share.',
  layout = 'row',
  showCopyLink = true,
  url = 'https://www.donorschoose.org/sl/6Nqq6sKgfh',
  onShare,
  onCopy,
}: DCShareToolsProps) {
  const shareClasses = [
    'dc-share',
    layout === 'stacked' && 'dc-share--stacked',
    layout === 'icons' && 'dc-share--icons',
  ]
    .filter(Boolean)
    .join(' ');

  const buttons = (
    <div className={shareClasses}>
      {platforms.map((p) => {
        const cfg = CONFIG[p];
        if (!cfg) return null;
        return (
          <button
            key={p}
            type="button"
            className="dc-share__btn"
            aria-label={`Share on ${cfg.label}`}
            title={cfg.label}
            onClick={() => onShare?.(p)}
          >
            <span className="dc-share__disc" style={{ background: cfg.color }}>
              <SocialGlyph id={cfg.icon} />
            </span>
            <span className="dc-share__label">{cfg.label}</span>
          </button>
        );
      })}
    </div>
  );

  const copy = showCopyLink && (
    <div className="dc-share__copy">
      <div className="dc-share__copy-field">
        <span className="dc-share__copy-disc">
          <DCIcon name="link" size={16} />
        </span>
        <input className="dc-share__copy-url" value={url} readOnly aria-label="Share link" />
      </div>
      <button type="button" className="dc-share__copy-btn" onClick={onCopy}>
        Copy link
      </button>
    </div>
  );

  // Bare (no grey card / header) when heading is explicitly null.
  if (heading == null) {
    return (
      <div>
        {buttons}
        {copy}
      </div>
    );
  }

  return (
    <div className="dc-share-box">
      <div className="dc-share__header">
        <img
          className="dc-share__illo"
          src="/images/donor-share-image@2x.png"
          alt=""
          aria-hidden="true"
          width={79}
          height={62}
        />
        <div className="dc-share__header-text">
          <h3>{heading}</h3>
          {description && <p>{description}</p>}
        </div>
      </div>
      {buttons}
      {copy}
    </div>
  );
}
