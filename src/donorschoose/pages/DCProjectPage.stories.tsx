import type { Meta, StoryObj } from '@storybook/react-vite';
import { DCProjectPage } from './DCProjectPage';
import { byStatus } from '../mockProjects';

/**
 * A full **project detail page** — header, classroom photo, story, supporters,
 * and a state-aware funding sidebar with a working Give modal. One story per
 * project state.
 */
const meta = {
  title: 'Pages/Project',
  tags: ['!autodocs'], // Pages are live previews — skip the autodocs "Docs" page
  component: DCProjectPage,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof DCProjectPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Active: Story = { args: { project: byStatus('active') } };
export const AlmostFunded: Story = { args: { project: byStatus('almost') } };
export const Funded: Story = { args: { project: byStatus('funded') } };
export const FriendsAndFamily: Story = { args: { project: byStatus('friends-family') } };
export const Matched: Story = { args: { project: byStatus('matched') } };
