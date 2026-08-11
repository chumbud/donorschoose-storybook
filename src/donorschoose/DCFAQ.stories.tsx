import type { Meta, StoryObj } from '@storybook/react-vite';
import { DCFAQ } from './DCFAQ';

/**
 * A **FAQ** section — the static `section.faq` pattern from the About pages
 * (`.question-container` → `.single-question`). Two-column list of question /
 * answer pairs by default, or a single-column click-to-expand accordion via
 * `collapsible`.
 */
const meta = {
  title: 'Components/FAQ',
  component: DCFAQ,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  args: {
    heading: 'Answers and tools',
    subheader:
      'Everything you need to know about giving to classrooms through DonorsChoose.',
    columns: 2,
    items: [
      {
        question: 'Where does my donation go?',
        answer:
          'Your donation funds the specific classroom project you choose. We purchase the requested materials and ship them directly to the school.',
      },
      {
        question: 'What if a project doesn’t reach its goal?',
        answer:
          'If a project expires before it’s fully funded, you can apply your donation to another classroom project of your choice, or we’ll help you find a similar one.',
      },
      {
        question: 'Is my donation tax-deductible?',
        answer:
          'Yes. DonorsChoose is a 501(c)(3) nonprofit, so your donation is tax-deductible. You’ll get a receipt by email right after you give.',
      },
      {
        question: 'How do I know the materials arrive?',
        answer:
          'Teachers confirm delivery and share photos and thank-you notes once materials arrive, so you can see your impact in the classroom.',
      },
      {
        question: 'Can I give monthly?',
        answer:
          'You can set up a monthly gift that’s split across classrooms in need. Edit or cancel it anytime from your account.',
      },
      {
        question: 'What are classroom Essentials?',
        answer:
          'Essentials are everyday supplies — tissues, markers, snacks — that teachers request in small amounts, so you can help stock a classroom for just a few dollars.',
      },
    ],
  },
} satisfies Meta<typeof DCFAQ>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Static two-column list — every answer visible (matches `_faq.scss`). */
export const Default: Story = {};

/** Single column. */
export const OneColumn: Story = { args: { columns: 1 } };

/** Click-to-expand accordion (the `js-single-question` behavior). */
export const Collapsible: Story = { args: { collapsible: true } };
