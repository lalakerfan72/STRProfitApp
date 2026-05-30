import { describe, expect, it } from "vitest";
import { loanAmount, monthlyMortgagePayment } from "./mortgage";

describe("loanAmount", () => {
  it("subtracts down payment from purchase price", () => {
    expect(loanAmount(400000, 80000)).toBe(320000);
  });

  it("does not go below zero", () => {
    expect(loanAmount(400000, 500000)).toBe(0);
  });
});

describe("monthlyMortgagePayment", () => {
  it("calculates payment from loan amount after down payment", () => {
    const payment = monthlyMortgagePayment(400000, 80000, 7, 30);
    expect(payment).toBeGreaterThan(2100);
    expect(payment).toBeLessThan(2200);
  });

  it("calculates a 15-year payment higher than 30-year", () => {
    const thirty = monthlyMortgagePayment(400000, 0, 7, 30);
    const fifteen = monthlyMortgagePayment(400000, 0, 7, 15);
    expect(fifteen).toBeGreaterThan(thirty);
  });

  it("returns zero when down payment covers full price", () => {
    expect(monthlyMortgagePayment(400000, 400000, 7, 30)).toBe(0);
  });

  it("handles zero interest rate", () => {
    expect(monthlyMortgagePayment(400000, 40000, 0, 30)).toBe(1000);
  });
});
