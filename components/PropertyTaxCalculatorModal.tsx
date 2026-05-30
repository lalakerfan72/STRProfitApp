"use client";

import { useEffect, useId, useRef } from "react";
import { monthlyPropertyTax, yearlyPropertyTax } from "@/lib/propertyTax";
import { formatCurrency } from "@/lib/format";
import { NumericInput } from "./NumericInput";

type PropertyTaxCalculatorModalProps = {
  open: boolean;
  purchasePrice: number;
  taxRatePercent: number;
  onPurchasePriceChange: (value: number) => void;
  onTaxRateChange: (value: number) => void;
  onUse: (monthlyTax: number) => void;
  onCancel: () => void;
};

export function PropertyTaxCalculatorModal({
  open,
  purchasePrice,
  taxRatePercent,
  onPurchasePriceChange,
  onTaxRateChange,
  onUse,
  onCancel,
}: PropertyTaxCalculatorModalProps) {
  const titleId = useId();
  const purchasePriceRef = useRef<HTMLInputElement>(null);
  const onCancelRef = useRef(onCancel);
  onCancelRef.current = onCancel;
  const yearlyTax = yearlyPropertyTax(purchasePrice, taxRatePercent);
  const monthlyTax = monthlyPropertyTax(purchasePrice, taxRatePercent);

  useEffect(() => {
    if (!open) return;
    purchasePriceRef.current?.focus();
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCancelRef.current();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="presentation"
    >
      <button
        type="button"
        className="absolute inset-0 bg-slate-900/50"
        aria-label="Close property tax calculator"
        onClick={onCancel}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative w-full max-w-md rounded-xl border border-slate-200 bg-white p-6 shadow-xl"
      >
        <h2 id={titleId} className="text-lg font-semibold text-slate-900">
          Property tax calculator
        </h2>
        <p className="mt-1 text-sm text-slate-600">
          Estimate monthly property tax from purchase price and your local rate.
        </p>

        <div className="mt-5 space-y-4">
          <div>
            <label
              htmlFor="tax-calc-purchase-price"
              className="block text-sm font-medium text-slate-700"
            >
              Purchase price
            </label>
            <div className="relative mt-1">
              <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-500">
                $
              </span>
              <NumericInput
                ref={purchasePriceRef}
                id="tax-calc-purchase-price"
                value={purchasePrice}
                onChange={onPurchasePriceChange}
                min={0}
                className="block w-full rounded-lg border border-slate-300 py-2 pl-7 pr-3 text-slate-900 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="tax-calc-rate"
              className="block text-sm font-medium text-slate-700"
            >
              Property tax rate
            </label>
            <div className="relative mt-1">
              <NumericInput
                id="tax-calc-rate"
                value={taxRatePercent}
                onChange={onTaxRateChange}
                min={0}
                max={10}
                className="block w-full rounded-lg border border-slate-300 py-2 pl-3 pr-8 text-slate-900 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-slate-500">
                %
              </span>
            </div>
            <p className="mt-1 text-xs text-slate-500">
              County or state effective tax rate (e.g. 1.2%).
            </p>
          </div>

          <div className="rounded-lg bg-slate-50 px-4 py-3">
            <div className="flex justify-between text-sm">
              <span className="text-slate-600">Yearly property tax</span>
              <span className="font-semibold tabular-nums text-slate-900">
                {formatCurrency(yearlyTax)}
              </span>
            </div>
            <div className="mt-2 flex justify-between text-sm">
              <span className="text-slate-600">Monthly property tax</span>
              <span className="font-semibold tabular-nums text-emerald-700">
                {formatCurrency(monthlyTax)}
              </span>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => onUse(Math.round(monthlyTax * 100) / 100)}
            className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
          >
            Use
          </button>
        </div>
      </div>
    </div>
  );
}
