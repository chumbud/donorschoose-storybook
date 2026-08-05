import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { DCHeader } from './DCHeader';

/**
 * The DonorsChoose global header — logo, primary nav, the outlined "Find a
 * classroom to support" CTA, and account links. Collapses to a "Menu" drawer at
 * ≤46em. The background is customizable (mirrors the `color-nav` mixin): set
 * `background` and the nav text, CTA, and logo recolor to match.
 */
const meta = {
  title: 'Components/Header',
  component: DCHeader,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
  args: { onSignIn: fn(), onFindClassroom: fn() },
  argTypes: {
    background: { control: 'color' },
    color: { control: 'color' },
    logoColor: { control: 'color' },
  },
} satisfies Meta<typeof DCHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const LoggedOut: Story = {};

export const LoggedIn: Story = {
  args: { user: { name: 'Jordan' } },
};

/** Brand-blue background with white nav + logo (color-nav treatment). */
export const ColoredBackground: Story = {
  args: { background: '#3804c1', color: '#ffffff' },
};

/** Any background — e.g. black chrome with a yellow logo. */
export const CustomColors: Story = {
  args: { background: '#212121', color: '#ffffff', logoColor: '#f9d524' },
};

export const Mobile: Story = {
  parameters: { viewport: { defaultViewport: 'mobile1' } },
};
