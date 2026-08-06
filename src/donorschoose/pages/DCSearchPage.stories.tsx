import type { Meta, StoryObj } from '@storybook/react-vite';
import { DCSearchPage } from './DCSearchPage';

/**
 * A **search results page** — header, search field, filters, and a grid of
 * project cards covering every project state.
 */
const meta = {
  title: 'Pages/Search',
  tags: ['!autodocs'], // Pages are live previews — skip the autodocs "Docs" page
  component: DCSearchPage,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof DCSearchPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
