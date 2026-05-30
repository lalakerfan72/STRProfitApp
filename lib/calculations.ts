export type IncomeMode = "monthly" | "seasonal";

export const SEASONAL_MONTH_COUNT = 12;

export type CalculatorInputs = {
  incomeMode: IncomeMode;
  nightlyRate: number;
  occupancyPercent: number;
  seasonalIncomeByMonth: number[];
  staysPerMonth: number;
  platformFeePercent: number;
  managementFeePercent: number;
  propertyTaxMonthly: number;
  insuranceMonthly: number;
  hoaMonthly: number;
  internetMonthly: number;
  utilitiesMonthly: number;
  cleaningCostPerStay: number;
  suppliesMonthly: number;
  maintenanceReserveMonthly: number;
  financingEnabled: boolean;
  mortgageMonthly: number;
};

export type CalculationResults = {
  incomeMode: IncomeMode;
  nightsBookedPerMonth: number | null;
  monthlyGrossIncome: number;
  annualGrossIncome: number;
  platformFees: number;
  managementFees: number;
  fixedExpensesMonthly: number;
  variableExpensesMonthly: number;
  cleaningCostMonthly: number;
  monthlyOperatingExpenses: number;
  monthlyOperatingProfit: number;
  monthlyCashFlow: number;
  annualOperatingProfit: number;
  annualCashFlow: number;
  isProfitable: boolean;
};

export function normalizeSeasonalIncome(months: number[]): number[] {
  const normalized = months
    .slice(0, SEASONAL_MONTH_COUNT)
    .map((amount) => Math.max(0, amount));
  while (normalized.length < SEASONAL_MONTH_COUNT) {
    normalized.push(0);
  }
  return normalized;
}

export function nightsBookedPerMonth(occupancyPercent: number): number {
  return 30 * (occupancyPercent / 100);
}

export function monthlyGrossFromNightly(i: CalculatorInputs): number {
  const nights = nightsBookedPerMonth(i.occupancyPercent);
  return i.nightlyRate * nights;
}

export function annualGrossIncome(i: CalculatorInputs): number {
  if (i.incomeMode === "seasonal") {
    return normalizeSeasonalIncome(i.seasonalIncomeByMonth).reduce(
      (sum, amount) => sum + amount,
      0
    );
  }
  return monthlyGrossFromNightly(i) * 12;
}

export function monthlyGrossIncome(i: CalculatorInputs): number {
  if (i.incomeMode === "seasonal") {
    return annualGrossIncome(i) / 12;
  }
  return monthlyGrossFromNightly(i);
}

export function cleaningCostMonthly(i: CalculatorInputs): number {
  return i.cleaningCostPerStay * i.staysPerMonth;
}

export function fixedExpensesMonthly(i: CalculatorInputs): number {
  return (
    i.propertyTaxMonthly +
    i.insuranceMonthly +
    i.hoaMonthly +
    i.internetMonthly
  );
}

export function variableExpensesMonthly(i: CalculatorInputs): number {
  return (
    i.utilitiesMonthly +
    cleaningCostMonthly(i) +
    i.suppliesMonthly +
    i.maintenanceReserveMonthly
  );
}

export function monthlyOperatingExpenses(
  i: CalculatorInputs,
  gross: number
): number {
  const platformFees = gross * (i.platformFeePercent / 100);
  const managementFees = gross * (i.managementFeePercent / 100);
  return (
    platformFees +
    managementFees +
    fixedExpensesMonthly(i) +
    variableExpensesMonthly(i)
  );
}

function seasonalTotals(i: CalculatorInputs) {
  let annualGross = 0;
  let annualPlatform = 0;
  let annualMgmt = 0;

  for (const gross of normalizeSeasonalIncome(i.seasonalIncomeByMonth)) {
    annualGross += gross;
    annualPlatform += gross * (i.platformFeePercent / 100);
    annualMgmt += gross * (i.managementFeePercent / 100);
  }

  const fixedAnnual = fixedExpensesMonthly(i) * 12;
  const variableAnnual = variableExpensesMonthly(i) * 12;
  const annualOpEx = annualPlatform + annualMgmt + fixedAnnual + variableAnnual;
  const annualOpProfit = annualGross - annualOpEx;
  const annualCashFlow = i.financingEnabled
    ? annualOpProfit - i.mortgageMonthly * 12
    : annualOpProfit;

  return {
    annualGross,
    annualPlatform,
    annualMgmt,
    annualOpEx,
    annualOpProfit,
    annualCashFlow,
  };
}

function isProfitableFromAnnual(
  annualOperatingProfit: number,
  annualCashFlow: number,
  financingEnabled: boolean
): boolean {
  const annual = financingEnabled ? annualCashFlow : annualOperatingProfit;
  return annual > 0;
}

export function monthlyOperatingProfit(i: CalculatorInputs): number {
  if (i.incomeMode === "seasonal") {
    return seasonalTotals(i).annualOpProfit / 12;
  }
  const gross = monthlyGrossFromNightly(i);
  return gross - monthlyOperatingExpenses(i, gross);
}

export function monthlyCashFlow(i: CalculatorInputs): number {
  const op = monthlyOperatingProfit(i);
  return i.financingEnabled ? op - i.mortgageMonthly : op;
}

export function annualOperatingProfit(i: CalculatorInputs): number {
  if (i.incomeMode === "seasonal") {
    return seasonalTotals(i).annualOpProfit;
  }
  return monthlyOperatingProfit(i) * 12;
}

export function annualCashFlow(i: CalculatorInputs): number {
  if (i.incomeMode === "seasonal") {
    return seasonalTotals(i).annualCashFlow;
  }
  return monthlyCashFlow(i) * 12;
}

export function isProfitable(i: CalculatorInputs): boolean {
  return isProfitableFromAnnual(
    annualOperatingProfit(i),
    annualCashFlow(i),
    i.financingEnabled
  );
}

export function calculateAll(i: CalculatorInputs): CalculationResults {
  const fixed = fixedExpensesMonthly(i);
  const variable = variableExpensesMonthly(i);
  const cleaning = cleaningCostMonthly(i);

  if (i.incomeMode === "seasonal") {
    const seasonal = seasonalTotals(i);
    const annualOperatingProfit = seasonal.annualOpProfit;
    const annualCashFlow = seasonal.annualCashFlow;

    return {
      incomeMode: "seasonal",
      nightsBookedPerMonth: null,
      monthlyGrossIncome: seasonal.annualGross / 12,
      annualGrossIncome: seasonal.annualGross,
      platformFees: seasonal.annualPlatform / 12,
      managementFees: seasonal.annualMgmt / 12,
      fixedExpensesMonthly: fixed,
      variableExpensesMonthly: variable,
      cleaningCostMonthly: cleaning,
      monthlyOperatingExpenses: seasonal.annualOpEx / 12,
      monthlyOperatingProfit: seasonal.annualOpProfit / 12,
      monthlyCashFlow: seasonal.annualCashFlow / 12,
      annualOperatingProfit,
      annualCashFlow,
      isProfitable: isProfitableFromAnnual(
        annualOperatingProfit,
        annualCashFlow,
        i.financingEnabled
      ),
    };
  }

  const gross = monthlyGrossFromNightly(i);
  const platformFees = gross * (i.platformFeePercent / 100);
  const managementFees = gross * (i.managementFeePercent / 100);
  const opEx = monthlyOperatingExpenses(i, gross);
  const opProfit = gross - opEx;
  const cashFlow = i.financingEnabled
    ? opProfit - i.mortgageMonthly
    : opProfit;
  const annualOperatingProfit = opProfit * 12;
  const annualCashFlow = cashFlow * 12;

  return {
    incomeMode: "monthly",
    nightsBookedPerMonth: nightsBookedPerMonth(i.occupancyPercent),
    monthlyGrossIncome: gross,
    annualGrossIncome: gross * 12,
    platformFees,
    managementFees,
    fixedExpensesMonthly: fixed,
    variableExpensesMonthly: variable,
    cleaningCostMonthly: cleaning,
    monthlyOperatingExpenses: opEx,
    monthlyOperatingProfit: opProfit,
    monthlyCashFlow: cashFlow,
    annualOperatingProfit,
    annualCashFlow,
    isProfitable: isProfitableFromAnnual(
      annualOperatingProfit,
      annualCashFlow,
      i.financingEnabled
    ),
  };
}
