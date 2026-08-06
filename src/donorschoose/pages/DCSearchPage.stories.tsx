import type { Meta, StoryObj } from '@storybook/react-vite';
import { underConstruction } from '../underConstruction';
import { DCSearchPage } from './DCSearchPage';

/**
 * A **search results page** — header, search field, filters, and a grid of
 * project cards covering every project state.
 */
const meta = {
  title: 'Pages/Search',
  tags: ['!autodocs', 'wip'], // live previews (no Docs), marked under construction
  decorators: [underConstruction],
  component: DCSearchPage,
  parameters: { layout: 'fullscreen', badges: ['wip'] },
} satisfies Meta<typeof DCSearchPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
