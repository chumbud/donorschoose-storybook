/**
 * Format a whole-dollar USD amount — e.g. `670` → `"$670"`.
 * Shared by the card components so the currency formatting stays consistent.
 */
export const usd = (n: number) =>
  n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
