export function yearlyPropertyTax(
  purchasePrice: number,
  taxRatePercent: number
): number {
  return purchasePrice * (taxRatePercent / 100);
}

export function monthlyPropertyTax(
  purchasePrice: number,
  taxRatePercent: number
): number {
  return yearlyPropertyTax(purchasePrice, taxRatePercent) / 12;
}
