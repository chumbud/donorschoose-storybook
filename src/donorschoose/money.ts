/**
 * Format a whole-dollar USD amount — e.g. `670` → `"$670"`.
 * Shared by the card components so the currency formatting stays consistent.
 */
export const usd = (n: number) =>
  n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });

/**
 * Format a USD amount, dropping the cents only when they're zero — `45` → `"$45"`,
 * `45.5` → `"$45.50"`. Mirrors `formatCurrencyV2(n, 'HIDE_ZERO_CENTS')` in
 * donorschoose-web, which is what the mini-cart message uses.
 */
export const usdHideZeroCents = (n: number) =>
  n.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: Number.isInteger(n) ? 0 : 2,
    maximumFractionDigits: 2,
  });
