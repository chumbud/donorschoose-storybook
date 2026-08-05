import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { DCModal } from './DCModal';
import { DCButton } from './DCButton';
import { DCText } from './DCText';

/**
 * DonorsChoose Modal — ported from `LightBoxWrapper` + `_overlay.scss`. Scrim
 * fades in first, then the dialog slides up; reverse on close. Closes on scrim
 * click, the X, or Escape.
 */
const meta = {
  title: 'Components/Modal',
  component: DCModal,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
} satisfies Meta<typeof DCModal>;

export default meta;
type Story = StoryObj<typeof meta>;

function Demo({ size }: { size?: 'default' | 'large' }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ padding: '3rem', minHeight: '60vh' }}>
      <DCButton onClick={() => setOpen(true)}>Open modal</DCButton>
      <DCModal
        open={open}
        onClose={() => setOpen(false)}
        size={size}
        title="Complete your donation"
        footer={
          <>
            <DCButton variant="secondary" onClick={() => setOpen(false)}>
              Cancel
            </DCButton>
            <DCButton onClick={() => setOpen(false)}>Give $25</DCButton>
          </>
        }
      >
        <DCText>
          You're supporting <strong>Ms. Alvarez's</strong> classroom project. 100% of your donation
          reaches the classroom.
        </DCText>
      </DCModal>
    </div>
  );
}

export const Default: Story = { render: () => <Demo /> };
export const Large: Story = { render: () => <Demo size="large" /> };

/** Rendered open so you can see the dialog + scrim without interacting. */
export const OpenState: Story = {
  render: () => (
    <div style={{ minHeight: '70vh' }}>
      <DCModal open onClose={() => {}} title="You're all set!" footer={<DCButton>Done</DCButton>}>
        <DCText>Thanks for supporting public school classrooms.</DCText>
      </DCModal>
    </div>
  ),
};
