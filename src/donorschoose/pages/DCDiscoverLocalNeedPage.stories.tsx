import type { Meta, StoryObj } from '@storybook/react-vite';
import { underConstruction } from '../underConstruction';
import { DCDiscoverLocalNeedPage } from './DCDiscoverLocalNeedPage';

/**
 * The **Discover local need** map page (donorschoose.org/donors/map.html) — a
 * full map of nearby schools shaded by need level, with a location search, the
 * need-level legend, and the school-detail sidebar. Click a marker to open that
 * school in the sidebar; click the × to close it.
 */
const meta = {
  title: 'Pages/Discover Local Need',
  tags: ['!autodocs', 'wip'], // live previews (no Docs), marked under construction
  decorators: [underConstruction],
  component: DCDiscoverLocalNeedPage,
  parameters: { layout: 'fullscreen', badges: ['wip'] },
} satisfies Meta<typeof DCDiscoverLocalNeedPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
