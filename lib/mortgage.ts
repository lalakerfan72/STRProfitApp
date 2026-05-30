export type MortgageTermYears = 15 | 30;

export function loanAmount(
  purchasePrice: number,
  downPayment: number
): number {
  return Math.max(0, purchasePrice - downPayment);
}

export function monthlyMortgagePayment(
  purchasePrice: number,
  downPayment: number,
  annualRatePercent: number,
  termYears: MortgageTermYears
): number {
  const principal = loanAmount(purchasePrice, downPayment);
  const months = termYears * 12;

  if (principal <= 0) return 0;
  if (annualRatePercent <= 0) return principal / months;

  const monthlyRate = annualRatePercent / 100 / 12;
  const factor = Math.pow(1 + monthlyRate, months);
  return (principal * monthlyRate * factor) / (factor - 1);
}

export function totalMortgageInterest(
  purchasePrice: number,
  downPayment: number,
  annualRatePercent: number,
  termYears: MortgageTermYears
): number {
  const principal = loanAmount(purchasePrice, downPayment);
  const monthly = monthlyMortgagePayment(
    purchasePrice,
    downPayment,
    annualRatePercent,
    termYears
  );
  return monthly * termYears * 12 - principal;
}
