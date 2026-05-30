"use client";

import type { CalculationResults, CalculatorInputs } from "@/lib/calculations";
import { formatCurrency } from "@/lib/format";

type SummaryPanelProps = {
  inputs: CalculatorInputs;
  results: CalculationResults;
};

function Row({
  label,
  value,
  muted,
}: {
  label: string;
  value: string;
  muted?: boolean;
}) {
  return (
    <div
      className={`flex justify-between gap-4 text-sm ${muted ? "text-slate-500" : "text-slate-700"}`}
    >
      <span>{label}</span>
      <span className="font-medium tabular-nums">{value}</span>
    </div>
  );
}

export function SummaryPanel({ inputs, results }: SummaryPanelProps) {
  const annualDisplay = inputs.financingEnabled
    ? results.annualCashFlow
    : results.annualOperatingProfit;
  const monthlyDisplay = inputs.financingEnabled
    ? results.monthlyCashFlow
    : results.monthlyOperatingProfit;
  const monthlyLabel = inputs.financingEnabled
    ? "Monthly cash flow"
    : "Monthly operating profit";

  return (
    <aside
      className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm lg:sticky lg:top-6"
      aria-label="Profit summary"
    >
      <h2 className="text-lg font-semibold text-slate-900">Summary</h2>
      <p className="mt-1 text-sm text-slate-600">
        {results.incomeMode === "seasonal" ? (
          <>
            Based on projected income across 12 months (
            {formatCurrency(results.annualGrossIncome)} annual gross).
          </>
        ) : (
          <>
            Based on a 30-day month at {results.nightsBookedPerMonth?.toFixed(1)}{" "}
            booked nights.
          </>
        )}
      </p>

      <div
        className={`mt-4 rounded-lg px-4 py-3 text-center ${
          results.isProfitable ? "bg-profit-light" : "bg-loss-light"
        }`}
      >
        <p className="text-xs font-medium uppercase tracking-wide text-slate-600">
          {inputs.financingEnabled ? "Annual cash flow" : "Annual operating profit"}
        </p>
        <p
          className={`mt-1 text-3xl font-bold tabular-nums ${
            results.isProfitable ? "text-profit" : "text-loss"
          }`}
        >
          {formatCurrency(annualDisplay)}
        </p>
        <p
          className={`mt-2 inline-block rounded-full px-3 py-1 text-sm font-semibold ${
            results.isProfitable
              ? "bg-profit text-white"
              : "bg-loss text-white"
          }`}
        >
          {results.isProfitable ? "Profitable for the year" : "Not profitable"}
        </p>
      </div>

      <div className="mt-6 space-y-3 border-t border-slate-100 pt-4">
        <Row
          label={
            results.incomeMode === "seasonal"
              ? "Avg. monthly gross income"
              : "Monthly gross income"
          }
          value={formatCurrency(results.monthlyGrossIncome)}
        />
        {results.incomeMode === "seasonal" ? (
          <Row
            label="Annual gross income"
            value={formatCurrency(results.annualGrossIncome)}
            muted
          />
        ) : null}
        <Row
          label="Monthly operating expenses"
          value={formatCurrency(results.monthlyOperatingExpenses)}
          muted
        />
        <Row
          label="Platform fees"
          value={formatCurrency(results.platformFees)}
          muted
        />
        <Row
          label="Management fees"
          value={formatCurrency(results.managementFees)}
          muted
        />
        <Row
          label="Fixed expenses"
          value={formatCurrency(results.fixedExpensesMonthly)}
          muted
        />
        <Row
          label="Cleaning"
          value={formatCurrency(results.cleaningCostMonthly)}
          muted
        />
        <Row
          label="Other variable expenses"
          value={formatCurrency(
            results.variableExpensesMonthly - results.cleaningCostMonthly
          )}
          muted
        />
        <Row
          label="Monthly operating profit"
          value={formatCurrency(results.monthlyOperatingProfit)}
        />
        {inputs.financingEnabled ? (
          <>
            <Row
              label="Mortgage"
              value={formatCurrency(inputs.mortgageMonthly)}
              muted
            />
            <Row
              label={monthlyLabel}
              value={formatCurrency(monthlyDisplay)}
            />
          </>
        ) : null}
      </div>
    </aside>
  );
}
