import type { Meta, StoryObj } from '@storybook/react-vite';
import { underConstruction } from '../underConstruction';
import { DCProjectPage } from './DCProjectPage';
import { byStatus } from '../mockProjects';

/**
 * A full **project detail page** — header, classroom photo, story, supporters,
 * and a state-aware funding sidebar with a working Give modal. One story per
 * project state.
 */
const meta = {
  title: 'Pages/Project',
  tags: ['!autodocs', 'wip'], // live previews (no Docs), marked under construction
  decorators: [underConstruction],
  component: DCProjectPage,
  parameters: { layout: 'fullscreen', badges: ['wip'] },
} satisfies Meta<typeof DCProjectPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Active: Story = { args: { project: byStatus('active') } };
export const AlmostFunded: Story = { args: { project: byStatus('almost') } };
export const Funded: Story = { args: { project: byStatus('funded') } };
export const Matched: Story = { args: { project: byStatus('matched') } };
