import type { CSSProperties } from 'react';
import './dc-icon.css';

/** All 149 glyph names in the SS Junior sprite (public/icon-junior.svg). */
export const ICON_NAMES = [
  'plus', 'hyphen', 'ellipsis', 'info', 'redirect', 'replay', 'refresh', 'transfer', 'star',
  'home', 'clock', 'delete', 'play', 'navigateright', 'navigateleft', 'frown', 'smile', 'heart',
  'music', 'flag', 'settings', 'alert', 'caution', 'mail', 'write', 'check', 'help', 'right',
  'expand', 'counterclockwise', 'left', 'up', 'down', 'upright', 'upleft', 'downright', 'downleft',
  'cursor', 'zoomin', 'zoomout', 'binoculars', 'viewdisabled', 'move', 'writingdisabled', 'trash',
  'tag', 'crop', 'ruler', 'paint', 'pixels', 'send', 'textchat', 'ellipsischat', 'cart',
  'shoppingbag', 'calculator', 'calculate', 'activity', 'presentation', 'navigate', 'compass',
  'map', 'location', 'code', 'mutevolume', 'pictures', 'pause', 'thumbnails', 'tablet',
  'downloadcloud', 'download', 'uploadcloud', 'upload', 'sync', 'loading', 'wifi', 'files',
  'searchfile', 'downloadfolder', 'uploadfolder', 'anchor', 'list', 'action', 'contract',
  'scaleup', 'scaledown', 'menu', 'dashboard', 'toggles', 'toolbox', 'keyboard', 'outlet',
  'navigateup', 'navigatedown', 'share', 'picture', 'mic', 'headphones', 'bank', 'store', 'view',
  'like', 'dislike', 'masculineuser', 'users', 'feminineuser', 'lightbulb', 'droplet', 'chat',
  'creditcard', 'banknote', 'desktop', 'briefcase', 'floppydisk', 'folder', 'file', 'calendar',
  'contacts', 'clipboard', 'pushpin', 'pin', 'attach', 'addressbook', 'checkitem', 'notebook',
  'books', 'compose', 'phone', 'box', 'mailbox', 'newspaper', 'cell', 'camera', 'video', 'radio',
  'volume', 'search', 'key', 'lock', 'unlock', 'notifications', 'bookmark', 'link', 'wrench',
  'rocket', 'bus', 'car', 'truck', 'ban',
] as const;

export type DCIconName = (typeof ICON_NAMES)[number];

export interface DCIconProps {
  /** Glyph name (without the `icon-` prefix), e.g. "heart". */
  name: DCIconName | string;
  /** Pixel size (width & height). Defaults to 24. */
  size?: number;
  /** Accessible label. If omitted the icon is treated as decorative. */
  title?: string;
  className?: string;
  style?: CSSProperties;
}

/**
 * Renders a single SS Junior icon from the SVG sprite. Color follows the
 * current text color (`fill: currentColor`).
 */
export function DCIcon({ name, size = 24, title, className, style }: DCIconProps) {
  return (
    <svg
      className={['dc-icon', className].filter(Boolean).join(' ')}
      width={size}
      height={size}
      style={style}
      role={title ? 'img' : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      viewBox="0 0 23 32"
    >
      <use href={`/icon-junior.svg#icon-${name}`} />
    </svg>
  );
}
