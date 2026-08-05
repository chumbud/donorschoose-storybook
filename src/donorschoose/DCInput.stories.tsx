import type { Meta, StoryObj } from '@storybook/react-vite';
import { DCCheck, DCInput, DCSearchInput, DCSelect, DCTextarea } from './DCInput';

/**
 * DonorsChoose form inputs — ported from `_forms.scss`. Square corners, grey
 * border, blue focus. Includes text, textarea, select, checkbox/radio, and a
 * search field.
 */
const meta = {
  title: 'Components/Inputs',
  component: DCInput,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
} satisfies Meta<typeof DCInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Text: Story = {
  args: { label: 'Full name', placeholder: 'Jane Doe', required: true },
  render: (args) => (
    <div style={{ maxWidth: 360 }}>
      <DCInput {...args} />
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div style={{ maxWidth: 360, display: 'grid', gap: '0.5rem' }}>
      <DCInput label="Default" placeholder="Placeholder" />
      <DCInput label="With value" defaultValue="Ms. Alvarez" />
      <DCInput label="With helper" placeholder="you@example.com" help="We'll never share your email." />
      <DCInput label="Error" defaultValue="not-an-email" error="Enter a valid email address." />
      <DCInput label="Disabled" placeholder="Unavailable" disabled />
    </div>
  ),
};

export const Fields: Story = {
  render: () => (
    <div style={{ maxWidth: 420, display: 'grid', gap: '0.75rem' }}>
      <DCInput label="Email" type="email" placeholder="you@example.com" required />
      <DCSelect label="Grade level" defaultValue="">
        <option value="" disabled>
          Choose a grade…
        </option>
        <option>Pre-K</option>
        <option>Grades K-2</option>
        <option>Grades 3-5</option>
        <option>Grades 6-8</option>
        <option>Grades 9-12</option>
      </DCSelect>
      <DCTextarea label="Why this project?" placeholder="My students need…" />
      <div style={{ display: 'flex', gap: '1.5rem', marginTop: '0.25rem' }}>
        <DCCheck label="Make it monthly" defaultChecked />
        <DCCheck type="radio" name="freq" label="One-time" defaultChecked />
        <DCCheck type="radio" name="freq" label="Monthly" />
      </div>
    </div>
  ),
};

export const Search: Story = {
  render: () => (
    <div style={{ maxWidth: 520 }}>
      <DCSearchInput />
    </div>
  ),
};

/** Textarea with the project-creation word counter — grey under the minimum,
 *  green once the minimum is reached, red once over the maximum. */
export const WordCounter: Story = {
  render: () => (
    <div style={{ maxWidth: 480, display: 'grid', gap: '1.25rem' }}>
      <DCTextarea
        label="Tell us about your project"
        placeholder="Start typing…"
        minWords={5}
        maxWords={40}
        defaultValue="My students need"
      />
      <DCTextarea
        label="Minimum reached (green)"
        minWords={3}
        maxWords={40}
        defaultValue="My students really need new books"
      />
      <DCTextarea
        label="Over the maximum (red)"
        minWords={3}
        maxWords={8}
        defaultValue="My students need a great many wonderful new books and supplies for the year"
      />
    </div>
  ),
};
