import type { Meta, StoryObj } from '@storybook/react-vite';
import { underConstruction } from '../underConstruction';
import { DCSchoolPage } from './DCSchoolPage';

/**
 * A **school profile page** — hero with school stats, then the school's
 * projects across every project state.
 */
const meta = {
  title: 'Pages/School',
  tags: ['!autodocs', 'wip'], // live previews (no Docs), marked under construction
  decorators: [underConstruction],
  component: DCSchoolPage,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof DCSchoolPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
