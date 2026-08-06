import { addons } from 'storybook/manager-api';
import { lightTheme, darkTheme } from './theme';

/* ---- Sidebar status markers (driven by the `wip` / `deprecated` story tags) ----
 * Flagged components/pages get an emoji prefix (🚧 / ⚠️); each parent section
 * gets an emoji + count of how many of its components are flagged.
 * (Storybook 10's sidebar renderLabel only reliably renders strings, not JSX,
 * so we prefix the label rather than stack a badge under it.) */
type Status = 'wip' | 'deprecated';
type Entry = { id: string; name?: string; type?: string; tags?: string[]; children?: string[] };
type Api = { getData?: (id: string) => Entry | undefined };

const EMOJI: Record<Status, string> = { wip: '🚧', deprecated: '⚠️' };

/** Status of a node from its own tags, else the first flagged descendant. */
const nodeStatus = (id: string, api: Api, depth = 0): Status | null => {
  const d = api.getData?.(id);
  if (!d || depth > 4) return null;
  const tags = d.tags ?? [];
  if (tags.includes('wip')) return 'wip';
  if (tags.includes('deprecated')) return 'deprecated';
  for (const c of d.children ?? []) {
    const s = nodeStatus(c, api, depth + 1);
    if (s) return s;
  }
  return null;
};

/** Count flagged components directly inside a section. */
const countStatuses = (rootId: string, api: Api) => {
  const counts: Record<Status, number> = { wip: 0, deprecated: 0 };
  const root = api.getData?.(rootId);
  for (const cid of root?.children ?? []) {
    const c = api.getData?.(cid);
    if (!c) continue;
    if (c.type === 'component' || c.type === 'group') {
      const s = nodeStatus(cid, api);
      if (s) counts[s] += 1;
    }
  }
  return counts;
};

const renderLabel = (item: Entry & { name: string }, api: Api): string => {
  // Section header → name + 🚧N / ⚠️N counts.
  if (item.type === 'root') {
    const c = countStatuses(item.id, api);
    let label = item.name;
    if (c.wip) label += `  🚧${c.wip}`;
    if (c.deprecated) label += `  ⚠️${c.deprecated}`;
    return label;
  }
  // Flagged component / page → emoji prefix.
  if (item.type === 'component' || item.type === 'group') {
    const own = item.tags?.includes('wip')
      ? 'wip'
      : item.tags?.includes('deprecated')
        ? 'deprecated'
        : nodeStatus(item.id, api);
    if (own) return `${EMOJI[own]} ${item.name}`;
  }
  return item.name;
};

// Theme-aware Storybook chrome: blue DonorsChoose logo on light, white on dark,
// following the system color scheme. The story canvas stays light (see
// donorschoose-ui.css).
const mq =
  typeof window !== 'undefined' && window.matchMedia
    ? window.matchMedia('(prefers-color-scheme: dark)')
    : null;

const applyTheme = (isDark: boolean) => {
  addons.setConfig({
    theme: isDark ? darkTheme : lightTheme,
    sidebar: { renderLabel: renderLabel as never },
  });
};

applyTheme(!!mq?.matches);

// Re-apply when the system preference flips (a manual refresh guarantees the
// logo/brand image re-renders if Storybook doesn't hot-swap it).
mq?.addEventListener?.('change', (e) => applyTheme(e.matches));
