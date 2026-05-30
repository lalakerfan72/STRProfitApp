"use client";

import { NumericInput } from "./NumericInput";

type PercentInputProps = {
  id: string;
  label: string;
  value: number;
  onChange: (value: number) => void;
  helperText?: string;
  min?: number;
  max?: number;
};

export function PercentInput({
  id,
  label,
  value,
  onChange,
  helperText,
  min = 0,
  max = 100,
}: PercentInputProps) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-slate-700">
        {label}
      </label>
      <div className="relative mt-1">
        <NumericInput
          id={id}
          value={value}
          onChange={onChange}
          min={min}
          max={max}
          inputMode="decimal"
          className="block w-full rounded-lg border border-slate-300 py-2 pl-3 pr-8 text-slate-900 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
        />
        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-slate-500">
          %
        </span>
      </div>
      {helperText ? (
        <p className="mt-1 text-xs text-slate-500">{helperText}</p>
      ) : null}
    </div>
  );
}
