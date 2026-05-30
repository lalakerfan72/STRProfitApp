"use client";

import { useEffect, useId, useRef } from "react";
import type { MortgageTermYears } from "@/lib/mortgage";
import {
  loanAmount,
  monthlyMortgagePayment,
  totalMortgageInterest,
} from "@/lib/mortgage";
import { formatCurrency } from "@/lib/format";
import { NumericInput } from "./NumericInput";

type MortgageCalculatorModalProps = {
  open: boolean;
  purchasePrice: number;
  downPayment: number;
  annualRatePercent: number;
  termYears: MortgageTermYears;
  onPurchasePriceChange: (value: number) => void;
  onDownPaymentChange: (value: number) => void;
  onRateChange: (value: number) => void;
  onTermChange: (value: MortgageTermYears) => void;
  onUse: (monthlyPayment: number) => void;
  onCancel: () => void;
};

export function MortgageCalculatorModal({
  open,
  purchasePrice,
  downPayment,
  annualRatePercent,
  termYears,
  onPurchasePriceChange,
  onDownPaymentChange,
  onRateChange,
  onTermChange,
  onUse,
  onCancel,
}: MortgageCalculatorModalProps) {
  const titleId = useId();
  const purchasePriceRef = useRef<HTMLInputElement>(null);
  const onCancelRef = useRef(onCancel);
  onCancelRef.current = onCancel;

  const principal = loanAmount(purchasePrice, downPayment);
  const monthlyPayment = monthlyMortgagePayment(
    purchasePrice,
    downPayment,
    annualRatePercent,
    termYears
  );
  const totalInterest = totalMortgageInterest(
    purchasePrice,
    downPayment,
    annualRatePercent,
    termYears
  );

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
        aria-label="Close mortgage calculator"
        onClick={onCancel}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative w-full max-w-md rounded-xl border border-slate-200 bg-white p-6 shadow-xl"
      >
        <h2 id={titleId} className="text-lg font-semibold text-slate-900">
          Mortgage calculator
        </h2>
        <p className="mt-1 text-sm text-slate-600">
          Estimate principal and interest from purchase price, down payment, rate,
          and term.
        </p>

        <div className="mt-5 space-y-4">
          <div>
            <label
              htmlFor="mortgage-calc-purchase-price"
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
                id="mortgage-calc-purchase-price"
                value={purchasePrice}
                onChange={onPurchasePriceChange}
                min={0}
                className="block w-full rounded-lg border border-slate-300 py-2 pl-7 pr-3 text-slate-900 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
            </div>
            <p className="mt-1 text-xs text-slate-500">
              Total property purchase price.
            </p>
          </div>

          <div>
            <label
              htmlFor="mortgage-calc-down-payment"
              className="block text-sm font-medium text-slate-700"
            >
              Down payment
            </label>
            <div className="relative mt-1">
              <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-500">
                $
              </span>
              <NumericInput
                id="mortgage-calc-down-payment"
                value={downPayment}
                onChange={onDownPaymentChange}
                min={0}
                max={purchasePrice}
                className="block w-full rounded-lg border border-slate-300 py-2 pl-7 pr-3 text-slate-900 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
            </div>
            <p className="mt-1 text-xs text-slate-500">
              Cash paid upfront; loan amount is purchase price minus down payment.
            </p>
          </div>

          <div>
            <label
              htmlFor="mortgage-calc-rate"
              className="block text-sm font-medium text-slate-700"
            >
              Mortgage rate
            </label>
            <div className="relative mt-1">
              <NumericInput
                id="mortgage-calc-rate"
                value={annualRatePercent}
                onChange={onRateChange}
                min={0}
                max={30}
                className="block w-full rounded-lg border border-slate-300 py-2 pl-3 pr-8 text-slate-900 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-slate-500">
                %
              </span>
            </div>
            <p className="mt-1 text-xs text-slate-500">
              Annual interest rate (e.g. 7%).
            </p>
          </div>

          <fieldset>
            <legend className="block text-sm font-medium text-slate-700">
              Loan term
            </legend>
            <div className="mt-2 flex gap-3">
              {([15, 30] as const).map((years) => (
                <label
                  key={years}
                  className={`flex flex-1 cursor-pointer items-center justify-center rounded-lg border px-4 py-2.5 text-sm font-medium transition-colors ${
                    termYears === years
                      ? "border-emerald-600 bg-emerald-50 text-emerald-800"
                      : "border-slate-300 text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  <input
                    type="radio"
                    name="mortgage-term"
                    value={years}
                    checked={termYears === years}
                    onChange={() => onTermChange(years)}
                    className="sr-only"
                  />
                  {years} years
                </label>
              ))}
            </div>
          </fieldset>

          <div className="rounded-lg bg-slate-50 px-4 py-3">
            <div className="flex justify-between text-sm">
              <span className="text-slate-600">Loan amount</span>
              <span className="font-semibold tabular-nums text-slate-900">
                {formatCurrency(principal)}
              </span>
            </div>
            <div className="mt-2 flex justify-between text-sm">
              <span className="text-slate-600">Monthly payment (P&I)</span>
              <span className="font-semibold tabular-nums text-emerald-700">
                {formatCurrency(monthlyPayment)}
              </span>
            </div>
            <div className="mt-2 flex justify-between text-sm">
              <span className="text-slate-600">Total interest over {termYears} years</span>
              <span className="font-semibold tabular-nums text-slate-900">
                {formatCurrency(totalInterest)}
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
            onClick={() =>
              onUse(Math.round(monthlyPayment * 100) / 100)
            }
            className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
          >
            Use
          </button>
        </div>
      </div>
    </div>
  );
}
