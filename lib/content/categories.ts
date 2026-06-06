export type PageType = "overview" | "content" | "tool";
export type PageStatus = "live" | "coming-soon";

export type FaqItem = { question: string; answer: string };

export type Subcategory = {
  slug: string;
  title: string;
  shortDescription: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  h1: string;
  overview: string[];
  pageType: PageType;
  status: PageStatus;
  toolId?: string;
  affiliateLinkIds?: string[];
  cardImage?: string;
  dedicatedRoute?: boolean;
  faq?: FaqItem[];
};

export type Category = {
  id: string;
  slug: string;
  title: string;
  navLabel: string;
  shortDescription: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  h1: string;
  overview: string[];
  cardImage: string;
  heroImage: string;
  faq?: FaqItem[];
  subcategories: Subcategory[];
};

export const homeContent = {
  h1: "Explore passive income opportunities",
  metaTitle: "Passive Income Ideas & Streams",
  metaDescription:
    "Discover passive income ideas across securities, real estate, and digital assets. Free educational guides and tools to help you research ways to earn extra income.",
  keywords: [
    "passive income ideas",
    "passive income streams",
    "ways to make passive income",
    "extra income ideas",
    "build passive income",
  ],
  intro: [
    "Passive Income Hub helps you explore realistic ways to earn additional income outside your day job. Whether you are researching dividend stocks, rental property, or online business models, we organize the landscape so you can learn at your own pace.",
    "Every income path carries risk. Our goal is education—not hype. Browse by category to understand how each stream works, what it typically requires, and whether it fits your goals and timeline.",
    "Start with the category that interests you most. Securities cover market-based income like stocks and bonds. Real Estate covers property-based strategies including our free short-term rental profit calculator. Digital Assets covers online models like subscriptions, affiliate marketing, and e-products.",
  ],
  heroImage: "/images/hero/home.svg",
};

export const categories: Category[] = [
  {
    id: "securities",
    slug: "securities",
    title: "Securities",
    navLabel: "Securities",
    shortDescription:
      "Earn income from stocks, bonds, and banking products like dividends, interest, and yield.",
    metaTitle: "Passive Income from Securities",
    metaDescription:
      "Learn how stocks, bonds, and banking products can generate passive income through dividends, interest, and yield. Explore securities income ideas.",
    keywords: [
      "passive income stocks",
      "dividend passive income",
      "bond passive income",
      "passive income from securities",
    ],
    h1: "Passive income from securities",
    overview: [
      "Securities-based passive income comes from owning financial assets that pay you without active daily work—think dividends from stocks, coupon payments from bonds, or interest from savings and CDs.",
      "This category covers the most accessible entry points for many investors: public markets and bank products. Each subcategory below explains a different angle and what to research before committing capital.",
    ],
    cardImage: "/images/categories/securities.svg",
    heroImage: "/images/categories/securities.svg",
    subcategories: [
      {
        slug: "stocks",
        title: "Stocks",
        shortDescription:
          "Dividend stocks, ETFs, and index funds that pay regular distributions.",
        metaTitle: "Passive Income from Stocks",
        metaDescription:
          "Explore dividend stocks, ETFs, and index funds as passive income sources. Learn how equity income streams work and what to evaluate.",
        keywords: ["dividend passive income", "passive income stocks", "dividend ETFs"],
        h1: "Passive income from stocks",
        overview: [
          "Stocks can generate passive income when companies pay dividends or when you hold income-focused ETFs that pass through distributions. Many investors build portfolios aimed at steady quarterly payments rather than quick gains.",
          "Dividend yield, payout ratio, and sector diversification all affect how reliable that income may be. Index funds and ETFs offer a simpler way to spread risk across many holdings.",
          "More guides and analysis tools for stock income are on the way. For now, use this page to understand the basics before opening a brokerage account or choosing funds.",
        ],
        pageType: "content",
        status: "coming-soon",
      },
      {
        slug: "bonds",
        title: "Bonds",
        shortDescription:
          "Treasuries, corporate bonds, and bond funds for steady interest income.",
        metaTitle: "Passive Income from Bonds",
        metaDescription:
          "Learn how bonds and bond funds generate passive income through interest payments. Explore treasuries, corporate bonds, and fixed-income strategies.",
        keywords: ["bond passive income", "fixed income passive", "treasury bond income"],
        h1: "Passive income from bonds",
        overview: [
          "Bonds pay periodic interest to holders, making them a classic passive income vehicle for conservative portfolios. Government treasuries, municipal bonds, and corporate debt each carry different risk and tax profiles.",
          "Bond funds and ETFs let you collect diversified interest without picking individual issues. Yields move with interest rates—when rates rise, existing bond prices often fall, so timing and duration matter.",
          "We are building deeper bond income content and tools. Use this overview to decide whether fixed income belongs in your passive income mix.",
        ],
        pageType: "content",
        status: "coming-soon",
      },
      {
        slug: "banking",
        title: "Banking",
        shortDescription:
          "High-yield savings, CDs, and money market accounts for low-risk interest.",
        metaTitle: "Passive Income from Banking Products",
        metaDescription:
          "Discover passive income from high-yield savings, CDs, and money market accounts. Low-risk interest strategies explained.",
        keywords: [
          "high yield savings passive income",
          "CD passive income",
          "money market passive income",
        ],
        h1: "Passive income from banking products",
        overview: [
          "Banking products offer one of the simplest forms of passive income: you deposit cash and earn interest. High-yield savings accounts, certificates of deposit (CDs), and money market accounts vary in liquidity and rate.",
          "Returns are typically lower than stocks or real estate but with far less volatility. FDIC insurance (where applicable) adds a layer of safety for eligible deposits.",
          "Compare rates across institutions and watch for minimum balances or withdrawal penalties on CDs. More banking income resources are coming soon.",
        ],
        pageType: "content",
        status: "coming-soon",
      },
    ],
  },
  {
    id: "real-estate",
    slug: "real-estate",
    title: "Real Estate",
    navLabel: "Real Estate",
    shortDescription:
      "Property-based income from rentals, commercial real estate, crowdfunding, and REITs.",
    metaTitle: "Passive Income from Real Estate",
    metaDescription:
      "Explore real estate passive income: short-term rentals, long-term rentals, commercial property, crowdfunding, and REITs. Free STR profit calculator.",
    keywords: [
      "passive income real estate",
      "rental property passive income",
      "real estate income streams",
    ],
    h1: "Passive income from real estate",
    overview: [
      "Real estate has long been a favorite path to extra income—from monthly rent checks to quarterly REIT distributions. Property can appreciate over time while generating cash flow, though management, maintenance, and market cycles add complexity.",
      "This section covers five common approaches: short-term rentals, long-term rentals, commercial real estate, crowdfunding platforms, and REITs. Each has different capital requirements, effort levels, and risk profiles.",
    ],
    cardImage: "/images/categories/real-estate.svg",
    heroImage: "/images/categories/real-estate.svg",
    subcategories: [
      {
        slug: "short-term-rentals",
        title: "Short Term Rentals",
        shortDescription:
          "Airbnb and vacation rental income—with a free profit calculator.",
        metaTitle: "Short-Term Rental Passive Income Calculator",
        metaDescription:
          "Estimate Airbnb and vacation rental profitability with our free STR calculator. Explore short-term rental passive income and cash flow.",
        keywords: [
          "Airbnb passive income",
          "short term rental calculator",
          "STR profit calculator",
          "vacation rental passive income",
        ],
        h1: "Short-term rental passive income",
        overview: [
          "Short-term rentals (STRs)—listed on Airbnb, VRBO, and similar platforms—can produce strong nightly revenue compared to long-term leases. Success depends on location, occupancy, nightly rate, and operating costs including cleaning, platform fees, and management.",
          "Use the calculator below to model monthly income, expenses, and annual profit for a property you own or are considering. Toggle financing to see cash flow after mortgage payments.",
        ],
        pageType: "tool",
        status: "live",
        toolId: "str-calculator",
        dedicatedRoute: true,
        cardImage: "/images/categories/real-estate.svg",
      },
      {
        slug: "long-term-rentals",
        title: "Long Term Rentals",
        shortDescription:
          "Traditional rental properties with monthly tenant income.",
        metaTitle: "Long-Term Rental Passive Income",
        metaDescription:
          "Learn how long-term rental properties generate passive income through monthly rent. Guides and tools coming soon.",
        keywords: ["long term rental passive income", "rental property income"],
        h1: "Long-term rental passive income",
        overview: [
          "Long-term rentals provide predictable monthly income from tenants on leases—typically 6 to 12 months or longer. Many investors start here before exploring STRs or commercial property.",
          "Key metrics include rent-to-price ratio, vacancy rate, property management costs, and local landlord regulations. Financing amplifies returns but adds debt service risk.",
          "We are developing calculators and guides for long-term rental analysis. Check back as we expand this section.",
        ],
        pageType: "content",
        status: "coming-soon",
      },
      {
        slug: "commercial-real-estate",
        title: "Commercial Real Estate",
        shortDescription:
          "Office, retail, and industrial property income at scale.",
        metaTitle: "Commercial Real Estate Passive Income",
        metaDescription:
          "Explore passive income from commercial real estate including office, retail, and industrial properties. Educational content coming soon.",
        keywords: ["commercial real estate passive income", "CRE investing"],
        h1: "Commercial real estate passive income",
        overview: [
          "Commercial real estate (CRE) includes office buildings, retail spaces, warehouses, and multi-family at scale. Leases are often longer than residential, and tenants sometimes pay operating expenses (NNN leases).",
          "CRE typically requires more capital and expertise than residential rentals. Syndications and funds can lower the barrier for passive investors.",
          "Detailed CRE income guides and tools are in development.",
        ],
        pageType: "content",
        status: "coming-soon",
      },
      {
        slug: "crowdfunding",
        title: "Crowdfunding",
        shortDescription:
          "Pool capital with other investors on real estate platforms.",
        metaTitle: "Real Estate Crowdfunding Passive Income",
        metaDescription:
          "Learn how real estate crowdfunding platforms let you earn passive income with lower minimums. Guides coming soon.",
        keywords: ["real estate crowdfunding", "crowdfunded passive income"],
        h1: "Real estate crowdfunding",
        overview: [
          "Real estate crowdfunding platforms let multiple investors fund a project—fix-and-flip, development, or income-producing property—in exchange for equity or debt returns.",
          "Minimum investments are often lower than buying property outright, but liquidity is limited and platform risk matters. Due diligence on sponsors and deal structure is essential.",
          "We will add platform comparisons and return calculators as this section grows.",
        ],
        pageType: "content",
        status: "coming-soon",
      },
      {
        slug: "reits",
        title: "REITs",
        shortDescription:
          "Real estate investment trusts traded like stocks.",
        metaTitle: "REIT Passive Income",
        metaDescription:
          "Understand REITs as a passive real estate income vehicle. Dividend-focused real estate trusts explained.",
        keywords: ["REIT passive income", "real estate investment trust income"],
        h1: "Passive income from REITs",
        overview: [
          "REITs (real estate investment trusts) own or finance income-producing property and must distribute most of their taxable income to shareholders. You can buy many REITs on public exchanges like stocks.",
          "They offer diversification across property types and geographies without direct management. Dividend yields vary with interest rates and sector performance.",
          "More REIT screening tools and sector guides are coming soon.",
        ],
        pageType: "content",
        status: "coming-soon",
      },
    ],
  },
  {
    id: "digital-assets",
    slug: "digital-assets",
    title: "Digital Assets / Marketing",
    navLabel: "Digital Assets",
    shortDescription:
      "Online income from subscriptions, affiliate marketing, e-products, and more.",
    metaTitle: "Digital Passive Income & Marketing",
    metaDescription:
      "Explore online passive income: subscriptions, affiliate marketing, e-products, and multi-level marketing models. Educational guides coming soon.",
    keywords: [
      "passive income online",
      "digital passive income",
      "make money online passive",
    ],
    h1: "Digital assets & marketing income",
    overview: [
      "Digital income streams leverage the internet to reach customers with lower overhead than physical businesses. Some models—like subscriptions or e-products—can scale after the initial build; others require ongoing promotion.",
      "Browse the subcategories below to learn how each model works, typical effort levels, and risks—including the difference between sustainable affiliate income and high-pressure MLM structures.",
    ],
    cardImage: "/images/categories/digital-assets.svg",
    heroImage: "/images/categories/digital-assets.svg",
    subcategories: [
      {
        slug: "subscriptions",
        title: "Subscriptions",
        shortDescription:
          "Recurring revenue from SaaS, newsletters, and memberships.",
        metaTitle: "Subscription Passive Income",
        metaDescription:
          "Learn how subscription businesses create recurring passive income through SaaS, newsletters, and membership sites.",
        keywords: ["subscription passive income", "recurring revenue online"],
        h1: "Subscription-based passive income",
        overview: [
          "Subscription models charge customers on a recurring basis—monthly or annually—for software, content, communities, or services. Predictable revenue is the main appeal; churn is the main risk.",
          "Building a subscriber base takes upfront work in product development and marketing. Once running, well-designed subscriptions can produce income with less daily effort than one-off sales.",
          "Guides on pricing, churn reduction, and platform choices are coming soon.",
        ],
        pageType: "content",
        status: "coming-soon",
      },
      {
        slug: "affiliate-marketing",
        title: "Affiliate Marketing",
        shortDescription:
          "Earn commissions promoting products and services you recommend.",
        metaTitle: "Affiliate Marketing Passive Income",
        metaDescription:
          "Explore affiliate marketing as a passive income stream. Learn how commission-based promotion works and what to expect.",
        keywords: ["affiliate marketing passive income", "affiliate income online"],
        h1: "Affiliate marketing passive income",
        overview: [
          "Affiliate marketing pays you a commission when someone buys through your referral link. Blog posts, reviews, email lists, and social content can drive traffic long after you publish.",
          "Success depends on audience trust, relevant offers, and disclosure compliance. Income is rarely fully passive at the start—you need content and traffic first.",
          "We will add program comparisons and income planning tools in future updates.",
        ],
        pageType: "content",
        status: "coming-soon",
      },
      {
        slug: "e-products",
        title: "E-Products",
        shortDescription:
          "Sell ebooks, courses, templates, and digital downloads.",
        metaTitle: "E-Product Passive Income",
        metaDescription:
          "Discover passive income from e-products: ebooks, online courses, templates, and digital downloads.",
        keywords: ["digital product passive income", "ebook passive income", "online course income"],
        h1: "Passive income from e-products",
        overview: [
          "E-products—ebooks, courses, presets, templates—are created once and sold repeatedly with low marginal cost. Platforms like Gumroad, Teachable, and your own site handle delivery.",
          "Quality and marketing determine sales. A strong product in a niche you understand can earn for years with occasional updates.",
          "Product launch guides and pricing calculators are planned for this section.",
        ],
        pageType: "content",
        status: "coming-soon",
      },
      {
        slug: "multi-level-marketing",
        title: "Multi-Level Marketing",
        shortDescription:
          "Network marketing and downstream commission structures.",
        metaTitle: "Multi-Level Marketing Income",
        metaDescription:
          "Understand multi-level marketing (MLM) income structures, risks, and how they differ from other passive income models.",
        keywords: ["MLM passive income", "multi level marketing income"],
        h1: "Multi-level marketing income",
        overview: [
          "Multi-level marketing (MLM) compensates participants for selling products and recruiting others who also sell. Some portray it as passive income; in practice, most participants earn little or lose money.",
          "Before joining any MLM, research income disclosure statements, inventory requirements, and the difference between retail sales and recruitment-heavy models.",
          "We will publish balanced educational content on evaluating MLM opportunities. This is not an endorsement of any specific program.",
        ],
        pageType: "content",
        status: "coming-soon",
      },
    ],
  },
];

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

export function getSubcategory(
  categorySlug: string,
  subSlug: string
): { category: Category; subcategory: Subcategory } | undefined {
  const category = getCategoryBySlug(categorySlug);
  if (!category) return undefined;
  const subcategory = category.subcategories.find((s) => s.slug === subSlug);
  if (!subcategory) return undefined;
  return { category, subcategory };
}

export function getSubcategoryPath(categorySlug: string, subSlug: string): string {
  return `/${categorySlug}/${subSlug}`;
}

export function getStubSubcategories(categorySlug: string): Subcategory[] {
  const category = getCategoryBySlug(categorySlug);
  if (!category) return [];
  return category.subcategories.filter(
    (s) => s.status === "coming-soon" && !s.dedicatedRoute
  );
}

export function getAllSubcategoryPaths(): { categorySlug: string; subSlug: string }[] {
  return categories.flatMap((c) =>
    c.subcategories
      .filter((s) => !s.dedicatedRoute)
      .map((s) => ({ categorySlug: c.slug, subSlug: s.slug }))
  );
}

export function getAllRoutes(): { path: string; priority: number }[] {
  const routes: { path: string; priority: number }[] = [
    { path: "/", priority: 1.0 },
  ];
  for (const category of categories) {
    routes.push({ path: `/${category.slug}`, priority: 0.9 });
    for (const sub of category.subcategories) {
      const priority = sub.status === "live" ? 0.9 : 0.7;
      routes.push({
        path: getSubcategoryPath(category.slug, sub.slug),
        priority,
      });
    }
  }
  return routes;
}
