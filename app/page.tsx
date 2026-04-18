import Link from "next/link";
import TradeDeskShowcase from "./components/TradeDeskShowcase";
import BuyeeShowcase from "./components/BuyeeShowcase";

const products = [
  {
    name: "TradeDesk",
    tagline: "Lot trading & inventory management",
    description:
      "A self-hosted app for managing eBay lot trading. Track lots, log sales, auto-sync orders nightly via the eBay API, and get a clear picture of your P&L across every batch you buy and sell.",
    tags: ["eBay API", "Self-hosted", "Next.js", "PostgreSQL"],
    href: "https://github.com/GNB-Solutions/tradedesk",
    showcase: <TradeDeskShowcase />,
  },
  {
    name: "Buyee Scraper",
    tagline: "Japanese auction marketplace scraper",
    description:
      "Scrape Buyee.jp and its 10 sub-sites — Yahoo Auctions, Mercari, Rakuten and more. Comes with a live dashboard, CLI filtering, JSON export, and a client request form for prospective customers.",
    tags: ["Node.js", "Express", "SSE", "10 sub-sites"],
    href: "https://github.com/GNB-Solutions/buyee-scraper",
    showcase: <BuyeeShowcase />,
  },
];

export default function Home() {
  return (
    <>
      {/* Nav */}
      <header className="sticky top-0 z-50 bg-white border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-white text-sm font-bold px-2 py-0.5 rounded bg-[#7C3AED]">
              GNB
            </span>
            <span className="font-semibold text-slate-900 tracking-tight">Solutions</span>
          </div>
          <a href="mailto:contact@gnbsolutions.com" className="text-sm font-medium text-[#7C3AED]">
            Get in touch
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-5xl mx-auto px-6 pt-20 pb-16">
        <p className="text-sm font-semibold uppercase tracking-widest mb-4 text-[#7C3AED]">
          GNB Solutions
        </p>
        <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 leading-tight mb-6">
          Software built for<br />real business problems.
        </h1>
        <p className="text-lg text-slate-500 max-w-xl">
          We build practical tools that solve specific problems — not bloated platforms.
          Each product is self-hosted, configurable, and built to be owned by you.
        </p>
      </section>

      {/* Products */}
      <section className="max-w-5xl mx-auto px-6 pb-24 flex flex-col gap-20">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-slate-400 -mb-14">Products</h2>

        {products.map((p, i) => (
          <div key={p.name} className={`flex flex-col ${i % 2 === 1 ? "lg:flex-row-reverse" : "lg:flex-row"} gap-10 items-start`}>
            {/* info */}
            <div className="lg:w-80 shrink-0 flex flex-col gap-4 lg:pt-2">
              <div>
                <h3 className="text-2xl font-bold text-slate-900 mb-1">{p.name}</h3>
                <p className="text-sm font-medium text-[#7C3AED]">{p.tagline}</p>
              </div>
              <p className="text-slate-500 text-sm leading-relaxed">{p.description}</p>
              <div className="flex flex-wrap gap-2">
                {p.tags.map((t) => (
                  <span key={t} className="text-xs font-medium px-2 py-0.5 rounded-full bg-[#F5F3FF] text-[#6D28D9]">
                    {t}
                  </span>
                ))}
              </div>
              <Link
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-sm font-semibold text-[#7C3AED]"
              >
                View on GitHub →
              </Link>
            </div>

            {/* showcase */}
            <div className="flex-1 w-full min-w-0">
              <p className="text-xs font-semibold uppercase tracking-widest text-slate-300 mb-3">Live demo</p>
              {p.showcase}
            </div>
          </div>
        ))}
      </section>

      {/* Contact */}
      <section className="border-t border-slate-200 bg-slate-50">
        <div className="max-w-5xl mx-auto px-6 py-16 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Interested in a product?</h2>
            <p className="text-slate-500 text-sm">
              Get in touch and we can discuss setup, customisation, or a bespoke build.
            </p>
          </div>
          <a
            href="mailto:contact@gnbsolutions.com"
            className="shrink-0 text-sm font-semibold text-white px-5 py-2.5 rounded-lg bg-[#7C3AED] hover:bg-[#6D28D9] transition-colors"
          >
            Contact us
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200">
        <div className="max-w-5xl mx-auto px-6 py-6 flex items-center justify-between text-xs text-slate-400">
          <span>© {new Date().getFullYear()} GNB Solutions</span>
          <a
            href="https://github.com/GNB-Solutions"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-slate-600 transition-colors"
          >
            GitHub
          </a>
        </div>
      </footer>
    </>
  );
}
