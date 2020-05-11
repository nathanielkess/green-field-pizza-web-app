export const centsToCurrency = (cents, cur = 'en-US') => new Intl.NumberFormat(cur, {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
}).format(cents * .01);