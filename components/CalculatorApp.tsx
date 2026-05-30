"use client";

import { useMemo, useState } from "react";
import { calculateAll } from "@/lib/calculations";
import { defaultInputs } from "@/lib/defaults";
import { CalculatorForm } from "./CalculatorForm";
import { SummaryPanel } from "./SummaryPanel";
import { AdSlot } from "./AdSlot";

export function CalculatorApp() {
  const [inputs, setInputs] = useState(defaultInputs);
  const results = useMemo(() => calculateAll(inputs), [inputs]);

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_320px_160px] xl:grid-cols-[1fr_340px_180px]">
      <div className="min-w-0">
        <CalculatorForm inputs={inputs} onChange={setInputs} />
      </div>
      <div>
        <SummaryPanel inputs={inputs} results={results} />
      </div>
      <div className="hidden lg:block">
        <div className="sticky top-6 space-y-6">
          <AdSlot slot="sidebar" />
          <AdSlot slot="sidebar2" />
        </div>
      </div>
    </div>
  );
}
