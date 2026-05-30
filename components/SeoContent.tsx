import { siteName } from "@/lib/site";

const faqs = [
  {
    question: "How do I know if my short-term rental is profitable?",
    answer:
      "Compare your annual cash flow (or operating profit if you own outright) to zero. This calculator adds nightly lodging revenue, subtracts platform fees, per-stay cleaning costs, management, utilities, and other monthly costs, and optionally subtracts your mortgage.",
  },
  {
    question: "What occupancy rate should I use?",
    answer:
      "Use your market research or trailing 12-month average. Many STR markets target 60–75% occupancy, but seasonal destinations vary widely. Conservative estimates help avoid overestimating profit.",
  },
  {
    question: "Are platform fees included?",
    answer:
      "Yes. Enter your host service fee percentage (often around 3% for Airbnb). The calculator deducts it from gross revenue along with other operating expenses.",
  },
  {
    question: "Should I include my mortgage?",
    answer:
      "Operating profit shows property performance before debt. Cash flow includes your mortgage and reflects what stays in your pocket each month—useful when financing the purchase.",
  },
];

export function SeoContent() {
  return (
    <article className="prose prose-slate mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      <h2 className="text-xl font-bold text-slate-900">
        How to use this STR calculator
      </h2>
      <ol className="mt-4 list-decimal space-y-2 pl-5 text-slate-700">
        <li>Enter your expected nightly rate and occupancy percentage.</li>
        <li>Add per-stay cleaning cost and how many turnovers you expect per month.</li>
        <li>Fill in monthly operating expenses (tax, insurance, utilities, etc.).</li>
        <li>Toggle financing if you want cash flow after mortgage payments.</li>
        <li>Review the summary panel for monthly totals and annual profit.</li>
      </ol>

      <h2 className="mt-10 text-xl font-bold text-slate-900">
        What affects short-term rental profitability
      </h2>
      <p className="mt-4 text-slate-700">
        Short-term rental profit depends on revenue per night, how often the
        property is booked, and every cost to operate and market the listing.
        Occupancy and nightly rate drive gross income; platform host fees,
        per-stay cleaning, utilities, maintenance reserves, and property management
        reduce it. Financing adds mortgage payments that must be covered for
        positive cash flow. {siteName} uses a 30-day month for occupancy math so
        you can quickly stress-test a deal before you buy or list.
      </p>

      <h2 className="mt-10 text-xl font-bold text-slate-900">
        Frequently asked questions
      </h2>
      <dl className="mt-4 space-y-6">
        {faqs.map((faq) => (
          <div key={faq.question}>
            <dt className="font-semibold text-slate-900">{faq.question}</dt>
            <dd className="mt-2 text-slate-700">{faq.answer}</dd>
          </div>
        ))}
      </dl>
    </article>
  );
}

export { faqs };
