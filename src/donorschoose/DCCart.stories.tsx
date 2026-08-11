import { useCallback, useEffect, useRef, useState, type CSSProperties } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { DCCart } from './DCCart';
import { DCButton } from './DCButton';
import { DCIcon } from './DCIcon';
import { DCToast } from './DCToast';
import { usdHideZeroCents } from './money';

/**
 * The DonorsChoose **mini-cart** — the cart icon in the global nav, with a count
 * badge and a black message bubble summarizing what's inside.
 *
 * Ported from donorschoose-web: the markup is the `.cart-group` block in
 * `genHeader.tag`, the styles are `#mainHeader a.mini-cart` in `_header.scss`,
 * and the count, total, and copy come from `miniCartFunctions.ts`.
 *
 * **Multi-cart.** A donor can stack several classrooms in one cart, so the
 * message counts them — "$120 for 3 classrooms". When every item belongs to a
 * single teacher, it names them instead: "$45 for Ms. Ramirez's classroom".
 *
 * **Guidelines**
 * - The cart is hidden until it has something in it (`hideWhenEmpty`), matching
 *   the header — an empty cart isn't a thing donors need to look at.
 * - The bubble opens on hover *and* keyboard focus.
 * - `showMessage` pushes it open with no pointer involved. The project page uses
 *   this after an add-to-cart: once the confirmation clears, the cart flashes its
 *   contents for 3 seconds so the donor's eye follows their donation up to the
 *   nav. See the **AddToCartFlow** story.
 */
const meta = {
  title: 'Components/Cart',
  component: DCCart,
  args: {
    items: 2,
    total: 120,
    showMessage: false,
    hideWhenEmpty: true,
    divider: false,
    checkout: false,
    onClick: fn(),
  },
  argTypes: {
    items: { control: { type: 'number', min: 0, max: 120, step: 1 } },
    total: { control: { type: 'number', min: 0, max: 5000, step: 5 } },
    teacherScreenName: { control: 'text' },
    message: { control: false },
  },
} satisfies Meta<typeof DCCart>;

export default meta;
type Story = StoryObj<typeof meta>;

/* ---- Shared story furniture ---- */

/** A stand-in for the nav bar the cart actually lives in ($vlgrey background). */
const navBar: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  gap: '1.5rem',
  padding: '1.25rem 1.5rem',
  background: 'var(--dc-vlgrey)',
  borderBottom: '1px solid var(--dc-grey-stroke)',
};

const stage: CSSProperties = {
  position: 'relative',
  minHeight: 440,
  borderRadius: 12,
  border: '1px solid var(--dc-grey-stroke)',
  background: 'var(--dc-white)',
  overflow: 'hidden',
};

const hint: CSSProperties = {
  fontFamily: 'var(--dc-font-body)',
  fontSize: '0.875rem',
  lineHeight: 1.5,
  color: 'var(--dc-grey)',
};

/**
 * Room below the cart for the bubble to drop into. The bubble is centered under
 * the icon (the site's `left: 30%` anchor), so the cart also needs a little room
 * to its right — in the real nav the account links provide it.
 */
const bubbleRoom: CSSProperties = { paddingBottom: '5rem' };
const bubbleGutter: CSSProperties = { paddingRight: '8rem' };

/** Controls-driven. The message bubble drops in on hover or Tab-focus. */
export const Playground: Story = {
  render: (args) => (
    <div style={bubbleRoom}>
      <div style={{ ...navBar, ...bubbleGutter }}>
        <span style={hint}>Hover (or Tab to) the cart →</span>
        <DCCart {...args} />
      </div>
    </div>
  ),
};

/**
 * The add-to-cart flow from the project page (`multiProjectGiving.js`), end to end:
 *
 * 1. A donation is added — the badge count and total go up, with a bump on the badge.
 * 2. A toast confirms it in the bottom-right corner and counts itself down.
 * 3. When the toast leaves, the cart pushes its own message open for 3 seconds
 *    (`$('.mini-cart').addClass('show-message')` → `setTimeout(…, 3000)`), handing
 *    the donor's attention off to the nav.
 *
 * Add a second classroom and watch the message switch from naming the teacher to
 * counting classrooms.
 */
export const AddToCartFlow: Story = {
  parameters: { controls: { disable: true } },
  render: () => <AddToCartDemo />,
};

const CLASSROOMS = [
  { teacher: 'Ms. Ramirez', project: 'Flexible Seating for Focused Readers', amount: 25 },
  { teacher: 'Mr. Whitaker', project: 'Microscopes for Young Scientists', amount: 50 },
  { teacher: 'Mrs. Okafor', project: 'Art Supplies for Every Student', amount: 35 },
];

function AddToCartDemo() {
  const [added, setAdded] = useState<typeof CLASSROOMS>([]);
  const [toast, setToast] = useState<{ key: number; amount: number } | null>(null);
  const [showMessage, setShowMessage] = useState(false);
  const messageTimer = useRef<number>(0);

  useEffect(() => () => window.clearTimeout(messageTimer.current), []);

  const items = added.length;
  const total = added.reduce((sum, c) => sum + c.amount, 0);

  const addToCart = (index: number) => {
    setAdded((prev) => (prev.includes(CLASSROOMS[index]) ? prev : [...prev, CLASSROOMS[index]]));
    // Re-key so a second add replays the toast instead of reusing the old timer.
    setToast({ key: Date.now(), amount: CLASSROOMS[index].amount });
    window.clearTimeout(messageTimer.current);
    setShowMessage(false);
  };

  // Once the toast is gone, proc the cart's on-hover message for 3 seconds.
  const onToastDismiss = useCallback(() => {
    setToast(null);
    setShowMessage(true);
    messageTimer.current = window.setTimeout(() => setShowMessage(false), 3000);
  }, []);

  const reset = () => {
    window.clearTimeout(messageTimer.current);
    setAdded([]);
    setToast(null);
    setShowMessage(false);
  };

  return (
    <div style={stage}>
      <div style={navBar}>
        <DCCart
          items={items}
          total={total}
          teacherScreenName={items === 1 ? added[0].teacher : undefined}
          showMessage={showMessage}
          divider
        />
        <span style={{ ...hint, fontWeight: 500 }}>Sign in</span>
      </div>

      <div style={{ padding: '2rem 1.5rem', display: 'grid', gap: '1.25rem', maxWidth: 620 }}>
        <p style={hint}>
          {items === 0
            ? 'The cart is hidden until something lands in it. Support a classroom to bring it into the nav.'
            : `${usdHideZeroCents(total)} in the cart across ${items} classroom${items === 1 ? '' : 's'}. Hover the cart any time — or add another and let the flow run.`}
        </p>

        {CLASSROOMS.map((c, i) => {
          const inCart = added.includes(c);
          return (
            <div
              key={c.teacher}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '1rem',
                padding: '1rem',
                border: '1px solid var(--dc-grey-stroke)',
                borderRadius: 'var(--dc-radius-standard)',
              }}
            >
              <span style={hint}>
                <strong style={{ fontFamily: 'var(--dc-font-headline)', color: 'var(--dc-black)' }}>
                  {c.project}
                </strong>
                <br />
                {c.teacher}'s classroom
              </span>
              <DCButton
                variant={inCart ? 'secondary' : 'primary'}
                size="small"
                disabled={inCart}
                onClick={() => addToCart(i)}
              >
                {inCart ? 'In your cart' : `Give ${usdHideZeroCents(c.amount)}`}
              </DCButton>
            </div>
          );
        })}

        {items > 0 && (
          <DCButton variant="secondary" size="small" onClick={reset}>
            Empty the cart
          </DCButton>
        )}
      </div>

      {toast && (
        <DCToast
          key={toast.key}
          fixed={false}
          position="bottom-right"
          tone="black"
          icon={<DCIcon name="cart" size={22} />}
          message={`Your ${usdHideZeroCents(toast.amount)} donation was added to your cart!`}
          action={{ label: 'Check out', variant: 'primary', onClick: fn() }}
          duration={4}
          onDismiss={onToastDismiss}
        />
      )}
    </div>
  );
}

/**
 * How the message reads. One classroom names the teacher; anything more counts
 * classrooms — the multi-cart case. Cents only show when they're not zero.
 */
export const MessageVariants: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ ...bubbleRoom, display: 'grid', gap: '1rem' }}>
      {[
        { items: 1, total: 45, teacherScreenName: 'Ms. Ramirez', label: 'One classroom, teacher known' },
        { items: 1, total: 45, label: 'One classroom, teacher unknown' },
        { items: 3, total: 120, label: 'Three classrooms — the multi-cart message' },
        { items: 2, total: 87.5, label: 'Cents show when they exist' },
        { items: 128, total: 4230, label: 'Big counts cap at 99+' },
      ].map((c) => (
        <div key={c.label} style={{ ...navBar, ...bubbleGutter, justifyContent: 'space-between' }}>
          <span style={hint}>{c.label}</span>
          <DCCart items={c.items} total={c.total} teacherScreenName={c.teacherScreenName} showMessage />
        </div>
      ))}
    </div>
  ),
};

/**
 * Resting, hovered/pushed-open, and empty. `hideWhenEmpty={false}` keeps the
 * empty cart mounted (badge and bubble suppressed) — handy for layout work,
 * though the real header hides it outright.
 */
export const States: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ ...bubbleRoom, display: 'grid', gap: '1rem' }}>
      <div style={{ ...navBar, ...bubbleGutter, justifyContent: 'space-between' }}>
        <span style={hint}>Resting — badge only</span>
        <DCCart items={2} total={120} />
      </div>
      <div style={{ ...navBar, ...bubbleGutter, justifyContent: 'space-between' }}>
        <span style={hint}>Message open — pushed by showMessage, or on hover/focus</span>
        <DCCart items={2} total={120} showMessage />
      </div>
      <div style={{ ...navBar, ...bubbleGutter, justifyContent: 'space-between' }}>
        <span style={hint}>With the account-links divider</span>
        <DCCart items={5} total={310} divider />
      </div>
      <div style={{ ...navBar, ...bubbleGutter, justifyContent: 'space-between' }}>
        <span style={hint}>Empty, kept mounted — hideWhenEmpty=false</span>
        <DCCart items={0} total={0} hideWhenEmpty={false} />
      </div>
    </div>
  ),
};

/**
 * On mobile (≤ 46em) the badge becomes a blue pill beside a smaller icon and the
 * hover message is dropped — there's no hover on touch, so the count carries it.
 * Resize the preview narrow to see it.
 */
export const Mobile: Story = {
  parameters: { controls: { disable: true }, viewport: { defaultViewport: 'mobile1' } },
  render: () => (
    <div style={bubbleRoom}>
      <div style={navBar}>
        <DCCart items={3} total={120} />
      </div>
      <p style={{ ...hint, padding: '1rem 1.5rem' }}>
        Resize the preview below 46em (736px) — the badge unpins into a pill and the
        message bubble goes away.
      </p>
    </div>
  ),
};
