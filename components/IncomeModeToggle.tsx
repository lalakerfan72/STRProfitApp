"use client";

import type { IncomeMode } from "@/lib/calculations";

type IncomeModeToggleProps = {
  value: IncomeMode;
  onChange: (mode: IncomeMode) => void;
};

export function IncomeModeToggle({ value, onChange }: IncomeModeToggleProps) {
  return (
    <fieldset>
      <legend className="block text-sm font-medium text-slate-700">
        Income entry method
      </legend>
      <div className="mt-2 flex gap-3">
        <label
          className={`flex flex-1 cursor-pointer items-center justify-center rounded-lg border px-3 py-2.5 text-sm font-medium transition-colors ${
            value === "monthly"
              ? "border-emerald-600 bg-emerald-50 text-emerald-800"
              : "border-slate-300 text-slate-700 hover:bg-slate-50"
          }`}
        >
          <input
            type="radio"
            name="income-mode"
            value="monthly"
            checked={value === "monthly"}
            onChange={() => onChange("monthly")}
            className="sr-only"
          />
          Monthly average
        </label>
        <label
          className={`flex flex-1 cursor-pointer items-center justify-center rounded-lg border px-3 py-2.5 text-sm font-medium transition-colors ${
            value === "seasonal"
              ? "border-emerald-600 bg-emerald-50 text-emerald-800"
              : "border-slate-300 text-slate-700 hover:bg-slate-50"
          }`}
        >
          <input
            type="radio"
            name="income-mode"
            value="seasonal"
            checked={value === "seasonal"}
            onChange={() => onChange("seasonal")}
            className="sr-only"
          />
          Seasonal by month
        </label>
      </div>
    </fieldset>
  );
}
