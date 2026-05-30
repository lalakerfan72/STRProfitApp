import { describe, expect, it } from "vitest";
import { calculateAll } from "./calculations";
import { defaultInputs as defaults } from "./defaults";
import { exampleSeasonalIncome } from "./months";

const base = { ...defaults };

describe("calculateAll", () => {
  it("returns positive cash flow with default inputs and no financing", () => {
    const result = calculateAll({ ...base, financingEnabled: false });
    expect(result.monthlyGrossIncome).toBeGreaterThan(0);
    expect(result.monthlyOperatingProfit).toBeGreaterThan(0);
    expect(result.isProfitable).toBe(true);
  });

  it("reduces cash flow when financing is enabled", () => {
    const without = calculateAll({ ...base, financingEnabled: false });
    const withFinancing = calculateAll({
      ...base,
      financingEnabled: true,
      mortgageMonthly: 2000,
    });
    expect(withFinancing.monthlyCashFlow).toBeLessThan(
      without.monthlyOperatingProfit
    );
  });

  it("is not profitable with high mortgage", () => {
    const result = calculateAll({
      ...base,
      financingEnabled: true,
      mortgageMonthly: 10000,
    });
    expect(result.isProfitable).toBe(false);
    expect(result.annualCashFlow).toBeLessThan(0);
  });

  it("returns zero lodging income at zero occupancy", () => {
    const result = calculateAll({ ...base, occupancyPercent: 0 });
    expect(result.monthlyGrossIncome).toBe(0);
    expect(result.nightsBookedPerMonth).toBe(0);
    expect(result.cleaningCostMonthly).toBe(500);
  });

  it("calculates cleaning expense per stay", () => {
    const result = calculateAll({
      ...base,
      cleaningCostPerStay: 100,
      staysPerMonth: 6,
    });
    expect(result.cleaningCostMonthly).toBe(600);
  });

  it("uses seasonal income totals for annual gross", () => {
    const seasonalIncome = exampleSeasonalIncome();
    const result = calculateAll({
      ...base,
      incomeMode: "seasonal",
      seasonalIncomeByMonth: seasonalIncome,
    });
    expect(result.annualGrossIncome).toBe(
      seasonalIncome.reduce((sum, n) => sum + n, 0)
    );
    expect(result.incomeMode).toBe("seasonal");
    expect(result.nightsBookedPerMonth).toBeNull();
  });

  it("applies platform fees per month in seasonal mode", () => {
    const result = calculateAll({
      ...base,
      incomeMode: "seasonal",
      seasonalIncomeByMonth: [12000, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      platformFeePercent: 3,
    });
    expect(result.annualGrossIncome).toBe(12000);
    expect(result.platformFees * 12).toBeCloseTo(360, 0);
  });

  it("normalizes seasonal income arrays to 12 months", () => {
    const result = calculateAll({
      ...base,
      incomeMode: "seasonal",
      seasonalIncomeByMonth: [1000, 2000, 3000],
    });
    expect(result.annualGrossIncome).toBe(6000);
  });
});
