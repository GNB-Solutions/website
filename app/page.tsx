import Link from "next/link";
import TradeDeskShowcase from "./components/TradeDeskShowcase";
import GameOnShowcase from "./components/GameOnShowcase";

const products = [
  {
    name: "TradeDesk",
    tagline: "The all-in-one trading management platform.",
    description:
      "Self-hosted platform for resellers and traders. Track wholesale lots, car flips, or any buy-and-sell business. eBay sync with automatic refund and cancellation detection, in-house AI for listing generation and invoice import, real-time analytics, and a modular architecture that expands to any marketplace.",
    tags: ["eBay Sync", "In-House AI", "Car Flips", "Analytics", "Self-Hosted", "Mac App"],
    href: "https://github.com/GNB-Solutions/tradedesk",
    showcase: <TradeDeskShowcase />,
  },
  {
    name: "GameOn",
    tagline: "Esports tournament platform",
    description:
      "Tournament platform for Valorant and Rocket League. Players join free or paid brackets, submit match scores, and earn GameCoins redeemable for gift cards. Built with real-time bracket progression and an in-app economy.",
    tags: ["Next.js", "Prisma", "PostgreSQL", "Better Auth"],
    href: "https://github.com/GNB-Solutions/game-on",
    showcase: <GameOnShowcase />,
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
                View on GitHub &rarr;
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
          <span>&copy; {new Date().getFullYear()} GNB Solutions</span>
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
