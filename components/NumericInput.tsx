"use client";

import { forwardRef, useEffect, useState } from "react";

type NumericInputProps = {
  id?: string;
  value: number;
  onChange: (value: number) => void;
  integer?: boolean;
  min?: number;
  max?: number;
  inputMode?: "decimal" | "numeric";
  className?: string;
};

const defaultClassName =
  "block w-full rounded-lg border border-slate-300 py-2 text-slate-900 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500";

function formatDisplay(value: number, integer: boolean): string {
  if (value === 0) return "";
  return integer ? String(Math.trunc(value)) : String(value);
}

function parseValue(raw: string, integer: boolean): number {
  if (raw === "" || raw === ".") return 0;
  const parsed = integer ? parseInt(raw, 10) : parseFloat(raw);
  return Number.isNaN(parsed) ? 0 : parsed;
}

function isValidInput(raw: string, integer: boolean): boolean {
  if (raw === "") return true;
  return integer ? /^\d+$/.test(raw) : /^\d*\.?\d*$/.test(raw);
}

function clampValue(value: number, min?: number, max?: number): number {
  let next = value;
  if (min !== undefined) next = Math.max(min, next);
  if (max !== undefined) next = Math.min(max, next);
  return next;
}

export const NumericInput = forwardRef<HTMLInputElement, NumericInputProps>(
  function NumericInput(
    {
      id,
      value,
      onChange,
      integer = false,
      min,
      max,
      inputMode = "decimal",
      className = defaultClassName,
    },
    ref
  ) {
    const [text, setText] = useState(() => formatDisplay(value, integer));
    const [focused, setFocused] = useState(false);

    useEffect(() => {
      if (!focused) {
        setText(formatDisplay(value, integer));
      }
    }, [value, focused, integer]);

    const commit = (raw: string) => {
      const next = clampValue(parseValue(raw, integer), min, max);
      onChange(next);
      setText(formatDisplay(next, integer));
    };

    return (
      <input
        ref={ref}
        id={id}
        type="text"
        inputMode={inputMode}
        value={focused ? text : formatDisplay(value, integer)}
        onFocus={() => {
          setFocused(true);
          setText(formatDisplay(value, integer));
        }}
        onChange={(e) => {
          const raw = e.target.value;
          if (!isValidInput(raw, integer)) return;
          setText(raw);
          onChange(clampValue(parseValue(raw, integer), min, max));
        }}
        onBlur={() => {
          setFocused(false);
          commit(text);
        }}
        className={className}
      />
    );
  }
);

NumericInput.displayName = "NumericInput";
