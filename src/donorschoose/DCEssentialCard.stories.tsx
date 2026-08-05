import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { DCEssentialCard } from './DCEssentialCard';

/**
 * DonorsChoose Essentials list card — a single classroom-basics item a donor
 * can add to their cart (used in the "Help a teacher stock up" strip).
 */
const meta = {
  title: 'Components/Essential Card',
  component: DCEssentialCard,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  args: {
    name: 'Crayons',
    price: 11,
    forWho: 'For Mrs. Stephens · Avon, MS',
    onAdd: fn(),
  },
} satisfies Meta<typeof DCEssentialCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div style={{ width: 220 }}>
      <DCEssentialCard {...args} />
    </div>
  ),
};

export const Row: Story = {
  parameters: { layout: 'padded' },
  render: (args) => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', maxWidth: 720 }}>
      <DCEssentialCard {...args} name="Crayons" price={11} forWho="For Mrs. Stephens · Avon, MS" />
      <DCEssentialCard {...args} name="Bandages" price={20} forWho="For Ms. Rodriguez · Los Angeles, CA" />
      <DCEssentialCard {...args} name="Crackers" price={10} forWho="For Ms. Hoffmann · Dallas, TX" />
    </div>
  ),
};
