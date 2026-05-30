"use client";

import { useRef, useState } from "react";
import type { CalculatorInputs } from "@/lib/calculations";
import { normalizeSeasonalIncome } from "@/lib/calculations";
import { exampleSeasonalIncome } from "@/lib/months";
import { CurrencyInput } from "./CurrencyInput";
import { IncomeModeToggle } from "./IncomeModeToggle";
import { NumericInput } from "./NumericInput";
import { PercentInput } from "./PercentInput";
import { SeasonalIncomeInputs } from "./SeasonalIncomeInputs";
import { PropertyTaxCalculatorModal } from "./PropertyTaxCalculatorModal";
import { MortgageCalculatorModal } from "./MortgageCalculatorModal";
import type { MortgageTermYears } from "@/lib/mortgage";
import { Section } from "./Section";

type CalculatorFormProps = {
  inputs: CalculatorInputs;
  onChange: (inputs: CalculatorInputs) => void;
};

export function CalculatorForm({ inputs, onChange }: CalculatorFormProps) {
  const [taxModalOpen, setTaxModalOpen] = useState(false);
  const [taxPurchasePrice, setTaxPurchasePrice] = useState(400000);
  const [taxRatePercent, setTaxRatePercent] = useState(1.2);
  const [mortgageModalOpen, setMortgageModalOpen] = useState(false);
  const [mortgagePurchasePrice, setMortgagePurchasePrice] = useState(400000);
  const [mortgageDownPayment, setMortgageDownPayment] = useState(80000);
  const [mortgageRatePercent, setMortgageRatePercent] = useState(7);
  const [mortgageTermYears, setMortgageTermYears] =
    useState<MortgageTermYears>(30);
  const seasonalExampleApplied = useRef(false);

  const set = <K extends keyof CalculatorInputs>(
    key: K,
    value: CalculatorInputs[K]
  ) => onChange({ ...inputs, [key]: value });

  const openTaxModal = () => setTaxModalOpen(true);

  const openMortgageModal = () => setMortgageModalOpen(true);

  return (
    <div className="space-y-6">
      <Section
        title="Income"
        description={
          inputs.incomeMode === "monthly"
            ? "Revenue from nightly stays."
            : "Project gross rental income for each month of the year."
        }
      >
        <IncomeModeToggle
          value={inputs.incomeMode}
          onChange={(mode) => {
            if (
              mode === "seasonal" &&
              !seasonalExampleApplied.current &&
              inputs.seasonalIncomeByMonth.every((v) => v === 0)
            ) {
              seasonalExampleApplied.current = true;
              onChange({
                ...inputs,
                incomeMode: mode,
                seasonalIncomeByMonth: exampleSeasonalIncome(),
              });
            } else {
              set("incomeMode", mode);
            }
          }}
        />

        {inputs.incomeMode === "monthly" ? (
          <>
            <CurrencyInput
              id="nightlyRate"
              label="Nightly rate"
              value={inputs.nightlyRate}
              onChange={(v) => set("nightlyRate", v)}
              helperText="Average nightly rate before platform fees."
            />
            <PercentInput
              id="occupancyPercent"
              label="Occupancy rate"
              value={inputs.occupancyPercent}
              onChange={(v) => set("occupancyPercent", v)}
              helperText="Percent of nights booked per month (30-day month)."
            />
          </>
        ) : (
          <SeasonalIncomeInputs
            values={inputs.seasonalIncomeByMonth}
            onChange={(values) =>
              set("seasonalIncomeByMonth", normalizeSeasonalIncome(values))
            }
          />
        )}

        <PercentInput
          id="platformFeePercent"
          label="Platform host fee"
          value={inputs.platformFeePercent}
          onChange={(v) => set("platformFeePercent", v)}
          helperText="Airbnb or VRBO host service fee (typically ~3%)."
        />
      </Section>

      <Section
        title="Operating expenses"
        description={
          inputs.incomeMode === "seasonal"
            ? "Monthly costs applied every month, including off-season. Cleaning uses average stays per month."
            : "Monthly costs to run the property."
        }
      >
        <PercentInput
          id="managementFeePercent"
          label="Property management fee"
          value={inputs.managementFeePercent}
          onChange={(v) => set("managementFeePercent", v)}
          helperText="Percent of gross revenue (0% if self-managed)."
        />
        <div className="grid gap-4 sm:grid-cols-2">
          <CurrencyInput
            id="cleaningCostPerStay"
            label="Cleaning cost per stay"
            value={inputs.cleaningCostPerStay}
            onChange={(v) => set("cleaningCostPerStay", v)}
            helperText="Turnover cleaning cost charged per booking."
          />
          <div>
            <label
              htmlFor="staysPerMonth"
              className="block text-sm font-medium text-slate-700"
            >
              Stays per month
            </label>
            <NumericInput
              id="staysPerMonth"
              value={inputs.staysPerMonth}
              onChange={(v) => set("staysPerMonth", v)}
              integer
              min={0}
              max={31}
              inputMode="numeric"
              className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            />
            <p className="mt-1 text-xs text-slate-500">
              {inputs.incomeMode === "seasonal"
                ? "Average guest turnovers per month for cleaning cost (same each month)."
                : "Guest turnovers per month (used to calculate cleaning expense)."}
            </p>
          </div>
          <div>
            <div className="flex items-center justify-between gap-2">
              <label
                htmlFor="propertyTaxMonthly"
                className="block text-sm font-medium text-slate-700"
              >
                Property tax
              </label>
              <button
                type="button"
                onClick={openTaxModal}
                className="rounded-md border border-slate-300 px-2 py-0.5 text-xs font-medium text-slate-600 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-1"
              >
                Calculate
              </button>
            </div>
            <div className="relative mt-1">
              <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-500">
                $
              </span>
              <NumericInput
                id="propertyTaxMonthly"
                value={inputs.propertyTaxMonthly}
                onChange={(v) => set("propertyTaxMonthly", v)}
                min={0}
                className="block w-full rounded-lg border border-slate-300 py-2 pl-7 pr-3 text-slate-900 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
            </div>
            <p className="mt-1 text-xs text-slate-500">Monthly amount.</p>
          </div>
          <CurrencyInput
            id="insuranceMonthly"
            label="Insurance"
            value={inputs.insuranceMonthly}
            onChange={(v) => set("insuranceMonthly", v)}
          />
          <CurrencyInput
            id="hoaMonthly"
            label="HOA"
            value={inputs.hoaMonthly}
            onChange={(v) => set("hoaMonthly", v)}
          />
          <CurrencyInput
            id="internetMonthly"
            label="Internet / TV"
            value={inputs.internetMonthly}
            onChange={(v) => set("internetMonthly", v)}
          />
          <CurrencyInput
            id="utilitiesMonthly"
            label="Utilities"
            value={inputs.utilitiesMonthly}
            onChange={(v) => set("utilitiesMonthly", v)}
          />
          <CurrencyInput
            id="suppliesMonthly"
            label="Supplies"
            value={inputs.suppliesMonthly}
            onChange={(v) => set("suppliesMonthly", v)}
          />
          <CurrencyInput
            id="maintenanceReserveMonthly"
            label="Maintenance reserve"
            value={inputs.maintenanceReserveMonthly}
            onChange={(v) => set("maintenanceReserveMonthly", v)}
          />
        </div>
      </Section>

      <Section
        title="Financing (optional)"
        description="Include mortgage to see cash flow after debt service."
      >
        <label className="flex cursor-pointer items-center gap-3">
          <input
            type="checkbox"
            checked={inputs.financingEnabled}
            onChange={(e) => set("financingEnabled", e.target.checked)}
            className="h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
          />
          <span className="text-sm font-medium text-slate-700">
            Include monthly mortgage payment
          </span>
        </label>
        {inputs.financingEnabled ? (
          <div>
            <div className="flex items-center justify-between gap-2">
              <label
                htmlFor="mortgageMonthly"
                className="block text-sm font-medium text-slate-700"
              >
                Monthly mortgage (P&I)
              </label>
              <button
                type="button"
                onClick={openMortgageModal}
                className="rounded-md border border-slate-300 px-2 py-0.5 text-xs font-medium text-slate-600 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-1"
              >
                Calculate
              </button>
            </div>
            <div className="relative mt-1">
              <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-500">
                $
              </span>
              <NumericInput
                id="mortgageMonthly"
                value={inputs.mortgageMonthly}
                onChange={(v) => set("mortgageMonthly", v)}
                min={0}
                className="block w-full rounded-lg border border-slate-300 py-2 pl-7 pr-3 text-slate-900 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
            </div>
            <p className="mt-1 text-xs text-slate-500">
              Principal and interest only.
            </p>
          </div>
        ) : null}
      </Section>

      <PropertyTaxCalculatorModal
        open={taxModalOpen}
        purchasePrice={taxPurchasePrice}
        taxRatePercent={taxRatePercent}
        onPurchasePriceChange={setTaxPurchasePrice}
        onTaxRateChange={setTaxRatePercent}
        onUse={(monthlyTax) => {
          set("propertyTaxMonthly", monthlyTax);
          setTaxModalOpen(false);
        }}
        onCancel={() => setTaxModalOpen(false)}
      />

      <MortgageCalculatorModal
        open={mortgageModalOpen}
        purchasePrice={mortgagePurchasePrice}
        downPayment={mortgageDownPayment}
        annualRatePercent={mortgageRatePercent}
        termYears={mortgageTermYears}
        onPurchasePriceChange={setMortgagePurchasePrice}
        onDownPaymentChange={setMortgageDownPayment}
        onRateChange={setMortgageRatePercent}
        onTermChange={setMortgageTermYears}
        onUse={(monthlyPayment) => {
          onChange({
            ...inputs,
            financingEnabled: true,
            mortgageMonthly: monthlyPayment,
          });
          setMortgageModalOpen(false);
        }}
        onCancel={() => setMortgageModalOpen(false)}
      />
    </div>
  );
}
