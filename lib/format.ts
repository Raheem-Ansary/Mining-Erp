const nf = new Intl.NumberFormat("fa-AF");

export function formatNumber(value: number) {
  return nf.format(value);
}
