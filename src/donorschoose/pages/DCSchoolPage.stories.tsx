import type { Meta, StoryObj } from '@storybook/react-vite';
import { DCSchoolPage } from './DCSchoolPage';

/**
 * A **school profile page** — hero with school stats, then the school's
 * projects across every project state.
 */
const meta = {
  title: 'Pages/School',
  tags: ['!autodocs'], // Pages are live previews — skip the autodocs "Docs" page
  component: DCSchoolPage,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof DCSchoolPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
