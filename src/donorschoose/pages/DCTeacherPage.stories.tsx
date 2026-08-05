import type { Meta, StoryObj } from '@storybook/react-vite';
import { DCTeacherPage } from './DCTeacherPage';

/**
 * A **teacher profile page** — purple hero with the teacher's avatar and a
 * Give Widget, trust band, "About classrooms", "How funds are used" with a
 * current request, and a "Pass it on" share section. Logged-in and logged-out
 * states.
 */
const meta = {
  title: 'Pages/Teacher',
  component: DCTeacherPage,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof DCTeacherPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const LoggedOut: Story = { args: { loggedIn: false } };
export const LoggedIn: Story = { args: { loggedIn: true } };
