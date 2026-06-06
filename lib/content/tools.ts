import type { ComponentType } from "react";
import { CalculatorApp } from "@/components/CalculatorApp";

export type ToolId = "str-calculator";

export const tools: Record<ToolId, ComponentType> = {
  "str-calculator": CalculatorApp,
};

export function getTool(toolId: string): ComponentType | undefined {
  return tools[toolId as ToolId];
}
