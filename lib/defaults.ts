import type { CalculatorInputs } from "./calculations";

export const defaultInputs: CalculatorInputs = {
  incomeMode: "monthly",
  nightlyRate: 150,
  occupancyPercent: 65,
  seasonalIncomeByMonth: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  staysPerMonth: 4,
  platformFeePercent: 3,
  managementFeePercent: 0,
  propertyTaxMonthly: 250,
  insuranceMonthly: 120,
  hoaMonthly: 0,
  internetMonthly: 75,
  utilitiesMonthly: 200,
  cleaningCostPerStay: 125,
  suppliesMonthly: 50,
  maintenanceReserveMonthly: 150,
  financingEnabled: false,
  mortgageMonthly: 2000,
};
