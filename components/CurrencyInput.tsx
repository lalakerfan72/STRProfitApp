"use client";

import { NumericInput } from "./NumericInput";

type CurrencyInputProps = {
  id: string;
  label: string;
  value: number;
  onChange: (value: number) => void;
  helperText?: string;
  min?: number;
  max?: number;
};

export function CurrencyInput({
  id,
  label,
  value,
  onChange,
  helperText,
  min = 0,
  max,
}: CurrencyInputProps) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-slate-700">
        {label}
      </label>
      <div className="relative mt-1">
        <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-500">
          $
        </span>
        <NumericInput
          id={id}
          value={value}
          onChange={onChange}
          min={min}
          max={max}
          inputMode="decimal"
          className="block w-full rounded-lg border border-slate-300 py-2 pl-7 pr-3 text-slate-900 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
        />
      </div>
      {helperText ? (
        <p className="mt-1 text-xs text-slate-500">{helperText}</p>
      ) : null}
    </div>
  );
}
