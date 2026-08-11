import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { fn } from 'storybook/test';
import { DCPagination } from './DCPagination';

/**
 * DonorsChoose Pagination — ported from `_pagination.scss` + `pagination.js`.
 * Pill-shaped page links with arrow prev/next, ellipsis for gaps, and
 * current/disabled states.
 */
const meta = {
  title: 'Components/Pagination',
  component: DCPagination,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  args: { page: 1, totalPages: 10, onChange: fn() },
  argTypes: {
    page: { control: { type: 'number', min: 1 } },
    totalPages: { control: { type: 'number', min: 1 } },
    siblingCount: { control: { type: 'number', min: 0, max: 3 } },
  },
} satisfies Meta<typeof DCPagination>;

export default meta;
type Story = StoryObj<typeof meta>;

export const FirstPage: Story = { args: { page: 1, totalPages: 10 } };
export const MiddlePage: Story = { args: { page: 5, totalPages: 10 } };
export const LastPage: Story = { args: { page: 10, totalPages: 10 } };
export const FewPages: Story = { args: { page: 2, totalPages: 3 } };

/** Fully interactive — click pages and the arrows. */
export const Interactive: Story = {
  render: (args) => {
    const [page, setPage] = useState(3);
    return <DCPagination {...args} page={page} totalPages={12} onChange={setPage} />;
  },
};
