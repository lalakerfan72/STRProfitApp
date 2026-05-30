"use client";

import { MONTH_LABELS_SHORT } from "@/lib/months";
import { formatCurrency } from "@/lib/format";
import { NumericInput } from "./NumericInput";

type SeasonalIncomeInputsProps = {
  values: number[];
  onChange: (values: number[]) => void;
};

export function SeasonalIncomeInputs({
  values,
  onChange,
}: SeasonalIncomeInputsProps) {
  const total = values.reduce((sum, amount) => sum + amount, 0);

  const setMonth = (index: number, amount: number) => {
    const next = [...values];
    next[index] = amount;
    onChange(next);
  };

  return (
    <div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {MONTH_LABELS_SHORT.map((label, index) => (
          <div key={label}>
            <label
              htmlFor={`seasonal-income-${index}`}
              className="block text-sm font-medium text-slate-700"
            >
              {label}
            </label>
            <div className="relative mt-1">
              <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2.5 text-sm text-slate-500">
                $
              </span>
              <NumericInput
                id={`seasonal-income-${index}`}
                value={values[index] ?? 0}
                onChange={(v) => setMonth(index, v)}
                min={0}
                className="block w-full rounded-lg border border-slate-300 py-2 pl-6 pr-2 text-sm text-slate-900 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
            </div>
          </div>
        ))}
      </div>
      <p className="mt-3 text-sm font-medium text-slate-700">
        Projected annual gross income:{" "}
        <span className="tabular-nums text-emerald-700">
          {formatCurrency(total)}
        </span>
      </p>
    </div>
  );
}
