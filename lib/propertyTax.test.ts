import { describe, expect, it } from "vitest";
import { monthlyPropertyTax, yearlyPropertyTax } from "./propertyTax";

describe("propertyTax", () => {
  it("calculates yearly tax from purchase price and rate", () => {
    expect(yearlyPropertyTax(400000, 1.2)).toBe(4800);
  });

  it("calculates monthly tax as yearly divided by 12", () => {
    expect(monthlyPropertyTax(400000, 1.2)).toBe(400);
  });

  it("returns zero when purchase price is zero", () => {
    expect(monthlyPropertyTax(0, 1.5)).toBe(0);
  });
});
