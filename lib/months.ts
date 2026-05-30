export const MONTH_LABELS_SHORT = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
] as const;

/** Example ski-season pattern for first-time seasonal mode users. */
export function exampleSeasonalIncome(): number[] {
  return [6000, 7000, 5000, 1000, 0, 0, 0, 0, 0, 0, 2000, 8000];
}
