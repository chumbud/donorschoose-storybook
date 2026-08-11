import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { DCEssentialCard } from './DCEssentialCard';

const IMG = '/images/essentials';

/** The real Essentials supply photos available in `war/images`. */
const SUPPLIES: Record<string, string> = {
  Bandages: 'bandages',
  Crackers: 'crackers',
  Crayons: 'crayons',
  'Easel pads': 'easelpads',
  Erasers: 'erasers',
  'Erasers + pencil toppers': 'erasers-penciltoppers',
  'Fruit snacks': 'fruitsnacks',
  'Glue sticks': 'gluesticks',
  Highlighters: 'highlighters',
  'Laminating pouches': 'laminating-pouches',
  'Markers (color)': 'markers-color',
  'Markers (dry-erase)': 'markers-dryerase',
  'Paper (color)': 'paper-color',
  'Paper (white)': 'paper-white',
  'Pencils (color)': 'pencils-color',
  'Pencils (pre-sharpened)': 'pencils-presharpened',
  'Pens (ballpoint)': 'pens-ballpoint',
  'Pens (felt-tip)': 'pens-felttip',
  'Play-Doh': 'playdoh',
  'Sticky notes': 'stickynotes',
  Tissues: 'tissues',
  Wipes: 'wipes',
};
// Storybook select: option values are the image URLs, labelled by supply name.
const imageOptions = Object.values(SUPPLIES).map((f) => `${IMG}/${f}.jpg`);
const imageLabels = Object.fromEntries(
  Object.entries(SUPPLIES).map(([label, f]) => [`${IMG}/${f}.jpg`, label]),
);

/**
 * DonorsChoose Essentials list card — a single classroom-basics item a donor
 * can add to their cart (used in the "Help a teacher stock up" strip). Product
 * photos are the real Essentials supply images from `war/images` — use the
 * **imageUrl** dropdown in Controls to swap the supply.
 */
const meta = {
  title: 'Components/Cards/Essential Card',
  component: DCEssentialCard,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  args: {
    name: 'Crayons',
    price: 11,
    forWho: 'For Mrs. Stephens · Avon, MS',
    imageUrl: `${IMG}/crayons.jpg`,
    onAdd: fn(),
  },
  argTypes: {
    imageUrl: {
      options: imageOptions,
      control: { type: 'select', labels: imageLabels },
      description: 'Essentials supply photo (real images from war/images).',
    },
  },
} satisfies Meta<typeof DCEssentialCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div style={{ width: 260 }}>
      <DCEssentialCard {...args} />
    </div>
  ),
};

/** Matches the production card: photo, big price, name, recipient, purple CTA. */
export const Bandages: Story = {
  args: { name: 'Bandages', price: 20, forWho: 'For Ms. Williams · San Antonio, TX', imageUrl: `${IMG}/bandages.jpg` },
  render: (args) => (
    <div style={{ width: 260 }}>
      <DCEssentialCard {...args} />
    </div>
  ),
};

export const Row: Story = {
  parameters: { layout: 'centered' },
  render: (args) => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', maxWidth: 900 }}>
      <DCEssentialCard {...args} name="Crayons" price={11} forWho="For Mrs. Stephens · Avon, MS" imageUrl={`${IMG}/crayons.jpg`} />
      <DCEssentialCard {...args} name="Bandages" price={20} forWho="For Ms. Williams · San Antonio, TX" imageUrl={`${IMG}/bandages.jpg`} />
      <DCEssentialCard {...args} name="Dry-erase markers" price={14} forWho="For Mr. Lopez · Dallas, TX" imageUrl={`${IMG}/markers-dryerase.jpg`} />
      <DCEssentialCard {...args} name="Tissues" price={9} forWho="For Ms. Hoffmann · Miami, FL" imageUrl={`${IMG}/tissues.jpg`} />
    </div>
  ),
};
