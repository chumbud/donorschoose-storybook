import { addons } from 'storybook/manager-api';
import { SET_CURRENT_STORY, STORY_CHANGED } from 'storybook/internal/core-events';
import { lightTheme } from './theme';
import { installCopyLink, entryUrl } from './copy-link';

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
  // Top-level section → name + 🚧N / ⚠️N counts. With `showRoots: false` the
  // sections render as collapsible groups (type 'group') rather than roots, so
  // treat single-segment group ids (e.g. "components", "foundations") as sections.
  const isSection =
    item.type === 'root' || (item.type === 'group' && !item.id.includes('-'));
  if (isSection) {
    const c = countStatuses(item.id, api);
    let label = item.name;
    if (c.wip) label += `  🚧${c.wip}`;
    if (c.deprecated) label += `  ⚠️${c.deprecated}`;
    return label;
  }
  // Flagged component / page → emoji after the label, so the names stay aligned.
  if (item.type === 'component' || item.type === 'group') {
    const own = item.tags?.includes('wip')
      ? 'wip'
      : item.tags?.includes('deprecated')
        ? 'deprecated'
        : nodeStatus(item.id, api);
    if (own) return `${item.name}  ${EMOJI[own]}`;
  }
  return item.name;
};

/**
 * Sidebar width. It lists components only — the stories live in the rail on the
 * right of the manager — so it can stay narrow. Also applied via `api.setSizes`
 * below, since a persisted user resize outranks setConfig's navSize.
 */
const DC_NAV_SIZE = 220;

addons.setConfig({
  // Light only — the chrome ignores the system color scheme, matching the story
  // canvas (which donorschoose-ui.css also pins to light).
  theme: lightTheme,
  navSize: DC_NAV_SIZE,
  sidebar: {
    // Top-level sections render as always-open headers — nothing to collapse,
    // so Foundations/Components/Pages are permanently expanded. Their styling
    // (1rem of air above, .66 opacity) lives in main.ts's managerHead.
    showRoots: true,
    renderLabel: renderLabel as never,
  },
});

addons.register('donorschoose/sidebar', (api) => {
  // Storybook restores a persisted nav width from localStorage after boot, which
  // would leave the two columns cramped — set it through the API (not CSS) so the
  // resize handle keeps matching the real width. Dragging still works from here.
  window.setTimeout(() => api.setSizes({ navSize: DC_NAV_SIZE }), 400);

  /* ---- Addon panel only while a component story is open ----
   * Actions / Interactions / Visual tests / Accessibility are only useful with a
   * component story on screen, so the panel is hidden on docs pages and on the
   * Overview / Foundations / Pages entries.
   */
  const isComponentStory = (id?: string) => {
    if (!id) return false;
    const entry = (api as unknown as { getData?: (i: string) => { type?: string } | undefined })
      .getData?.(id);
    return entry?.type === 'story' && id.startsWith('components-');
  };

  const syncPanel = () => {
    // togglePanel is idempotent when passed an explicit target state.
    api.togglePanel(isComponentStory(api.getCurrentStoryData()?.id));
  };

  api.on(STORY_CHANGED, syncPanel);
  api.on(SET_CURRENT_STORY, () => window.setTimeout(syncPanel, 0));
  window.setTimeout(syncPanel, 300);

  /* ---- Story rail ----
   * The sidebar lists only what sits directly under a section; everything below
   * that — nested components and their stories — renders in a rail on the
   * manager's right edge. Storybook 10 exposes no slot to render into, so the
   * rail is our own element mounted on #root.
   *
   * The hierarchy comes from `api.resolveStory`, which (unlike `api.getData`)
   * resolves group and component nodes too, so `children`/`depth`/`parent` are
   * available without scraping the tree DOM.
   */
  type Hash = {
    id: string;
    name: string;
    depth: number;
    type?: string;
    parent?: string;
    children?: string[];
  };

  const resolve = (id?: string): Hash | undefined =>
    id ? (api.resolveStory(id) as unknown as Hash | undefined) : undefined;

  const isLeaf = (entry?: Hash) => entry?.type === 'story' || entry?.type === 'docs';

  /** The ancestor sitting directly under a section — what the sidebar lists. */
  const sectionChild = (id?: string): Hash | undefined => {
    let entry = resolve(id);
    while (entry && entry.depth > 1) entry = resolve(entry.parent);
    return entry;
  };

  /** First story/docs page inside `id` — where clicking a group should land. */
  const firstLeaf = (id: string): string | undefined => {
    const entry = resolve(id);
    if (!entry) return undefined;
    if (isLeaf(entry)) return entry.id;
    for (const child of entry.children ?? []) {
      const found = firstLeaf(child);
      if (found) return found;
    }
    return undefined;
  };

  const columnEl = () => {
    // Mounted on #root (not inside the sidebar) so it can be a full-height rail
    // on the manager's right edge; main.ts narrows the layout to leave room.
    const host = document.getElementById('root');
    if (!host || !document.querySelector('.sidebar-container')) return null;
    let el = host.querySelector<HTMLElement>('.dc-story-column');
    if (!el) {
      el = document.createElement('aside');
      el.className = 'dc-story-column';
      el.setAttribute('aria-label', 'Stories');
      host.appendChild(el);
    }
    return el;
  };

  /**
   * Tag every sidebar row with its depth (main.ts hides anything below the top
   * level) and mark the row whose subtree is currently open. Re-run whenever the
   * tree re-renders, since React owns those nodes.
   */
  const markSidebar = (currentTopId?: string) => {
    document
      .querySelectorAll<HTMLElement>('#storybook-explorer-tree .sidebar-item[data-item-id]')
      .forEach((row) => {
        const entry = resolve(row.getAttribute('data-item-id') ?? undefined);
        if (entry) row.dataset.dcDepth = String(entry.depth);
        row.classList.toggle(
          'is-dc-current',
          !!currentTopId && row.getAttribute('data-item-id') === currentTopId,
        );
      });
  };

  const renderColumn = () => {
    const el = columnEl();
    if (!el) return false;

    const currentId = api.getCurrentStoryData()?.id;
    const top = sectionChild(currentId);
    markSidebar(top?.id);

    // A section child that's a page in its own right (Overview) has no subtree.
    const show = !!top && !isLeaf(top) && !!top.children?.length;
    el.classList.toggle('is-open', show);
    if (!show || !top) {
      el.replaceChildren();
      return !!currentId;
    }

    const title = document.createElement('h2');
    title.className = 'dc-story-column__title';
    title.textContent = top.name;

    const list = document.createElement('div');
    list.className = 'dc-story-column__list';

    /**
     * A standalone docs page (an MDX `<Meta title="…/Overview" />`) is indexed as a
     * component wrapping a single docs child. It's a page, not a component, so
     * list it as one row named after the entry rather than a heading + "Docs".
     */
    const soleDocsPage = (entry: Hash) => {
      if (entry.children?.length !== 1) return undefined;
      const only = resolve(entry.children[0]);
      return only?.type === 'docs' ? only : undefined;
    };

    /** Render `ids` in order, recursing so nested components bring their stories. */
    const append = (ids: string[], level: number) => {
      for (const id of ids) {
        const entry = resolve(id);
        if (!entry) continue;
        const page = isLeaf(entry) ? entry : soleDocsPage(entry);
        const item = document.createElement('button');
        item.type = 'button';
        item.className = page ? 'dc-story-column__item' : 'dc-story-column__subhead';
        item.dataset.entryId = page?.id ?? id;
        item.style.setProperty('--dc-rail-level', String(level));
        item.textContent = entry.name;
        if (page && page.id === currentId) {
          item.classList.add('is-selected');
          item.setAttribute('aria-current', 'true');
        }
        const target = page?.id ?? firstLeaf(id);
        item.addEventListener('click', () => {
          if (target) api.selectStory(target);
        });
        list.appendChild(item);
        if (!page) append(entry.children ?? [], level + 1);
      }
    };
    append(top.children ?? [], 0);

    el.replaceChildren(title, list);
    return true;
  };

  /* A component row's click toggles expansion in the tree, and Storybook only
   * navigates when that toggle *expands*. Expansion is invisible in this layout
   * (no story rows, no arrows), so clicking an already-open component would look
   * like nothing happened — always land on one of its stories instead. */
  document.addEventListener(
    'click',
    (event) => {
      const target = event.target as HTMLElement | null;
      const row = target?.closest?.(
        '#storybook-explorer-tree .sidebar-item[data-nodetype="component"], #storybook-explorer-tree .sidebar-item[data-nodetype="group"]',
      );
      const componentId = row?.getAttribute('data-item-id');
      if (!componentId) return;
      // Let Storybook handle its own toggle/selection first.
      window.setTimeout(() => {
        const currentId = api.getCurrentStoryData()?.id;
        // Already somewhere inside this row's subtree — nothing to do.
        if (currentId && sectionChild(currentId)?.id === componentId) return;
        const first = firstLeaf(componentId);
        if (first) api.selectStory(first);
      }, 0);
    },
    true,
  );

  api.on(STORY_CHANGED, renderColumn);
  api.on(SET_CURRENT_STORY, () => window.setTimeout(renderColumn, 0));
  // Poll until the sidebar has mounted *and* the index knows the current story —
  // on a cold load the story is already selected, so no STORY_CHANGED follows.
  const waitColumn = window.setInterval(() => {
    if (renderColumn() && api.getCurrentStoryData()?.id) window.clearInterval(waitColumn);
  }, 200);
  window.setTimeout(() => window.clearInterval(waitColumn), 15000);

  // React owns the tree rows and re-renders them (on expand, filter, status
  // updates), which drops the depth tags and the current-row class — re-apply
  // whenever rows come and go.
  const observeTree = () => {
    const tree = document.getElementById('storybook-explorer-tree');
    if (!tree) return false;
    const remark = () => markSidebar(sectionChild(api.getCurrentStoryData()?.id)?.id);
    // childList only: markSidebar itself writes attributes, so watching those
    // would loop.
    new MutationObserver(remark).observe(tree, { childList: true, subtree: true });
    remark();
    return true;
  };
  const waitTree = window.setInterval(() => {
    if (observeTree()) window.clearInterval(waitTree);
  }, 200);
  window.setTimeout(() => window.clearInterval(waitTree), 15000);

  /* ---- Hover-to-copy links on sidebar rows and rail items ----
   * Docs headings are left alone — Storybook already anchors those itself.
   */
  const viewModeFor = (entryId: string): 'story' | 'docs' =>
    entryId.endsWith('--docs') ? 'docs' : 'story';

  installCopyLink(document, (el) => {
    const railItem = el.closest?.('.dc-story-column__item') as HTMLElement | null;
    if (railItem?.dataset.entryId) {
      const id = railItem.dataset.entryId;
      return {
        anchor: railItem,
        href: entryUrl(window.location.origin, viewModeFor(id), id),
        label: `Copy link to ${railItem.textContent?.trim() ?? id}`,
      };
    }

    const row = el.closest?.('#storybook-explorer-tree .sidebar-item') as HTMLElement | null;
    const itemId = row?.getAttribute('data-item-id');
    if (!row || !itemId) return null;

    // A component or group row has no page of its own — link to whatever clicking
    // it opens, i.e. the first page inside it.
    const entry = resolve(itemId);
    const entryId = isLeaf(entry) ? itemId : firstLeaf(itemId);
    if (!entryId) return null;

    return {
      anchor: row,
      href: entryUrl(window.location.origin, viewModeFor(entryId), entryId),
      label: `Copy link to ${row.textContent?.trim().replace(/\s+/g, ' ') ?? itemId}`,
    };
  });
});
