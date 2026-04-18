"use client";

import { useState, useRef } from "react";

const SITES = ["All Sites", "Yahoo Auctions", "Mercari", "Rakuten", "Flea Market"];

const fakeResults = [
  { site: "Yahoo Auctions", title: "Sony WH-1000XM5 ワイヤレスヘッドホン", price: "¥28,500", condition: "Like New", img: "🎧" },
  { site: "Mercari", title: "Nintendo Switch 本体 ネオン 動作確認済み", price: "¥24,800", condition: "Good", img: "🎮" },
  { site: "Yahoo Auctions", title: "Apple Watch Series 9 45mm GPSモデル", price: "¥41,000", condition: "Like New", img: "⌚" },
  { site: "Rakuten", title: "Dyson V15 Detect コードレス掃除機", price: "¥52,000", condition: "New", img: "🌀" },
  { site: "Mercari", title: "Canon EOS R50 ミラーレスカメラ キット", price: "¥63,500", condition: "Good", img: "📷" },
];

export default function BuyeeShowcase() {
  const [query, setQuery] = useState("electronics");
  const [site, setSite] = useState("All Sites");
  const [results, setResults] = useState<typeof fakeResults>([]);
  const [searching, setSearching] = useState(false);
  const [done, setDone] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  function handleSearch() {
    if (searching) return;
    setResults([]);
    setDone(false);
    setSearching(true);

    const filtered = site === "All Sites" ? fakeResults : fakeResults.filter(r => r.site === site);
    const pool = filtered.length ? filtered : fakeResults;

    pool.forEach((item, i) => {
      timerRef.current = setTimeout(() => {
        setResults(prev => [...prev, item]);
        if (i === pool.length - 1) {
          setSearching(false);
          setDone(true);
        }
      }, 400 + i * 500);
    });
  }

  return (
    <div className="rounded-xl border border-slate-200 overflow-hidden text-sm">
      {/* search bar */}
      <div className="flex gap-2 px-4 py-3 bg-slate-50 border-b border-slate-200">
        <input
          value={query}
          onChange={e => { setQuery(e.target.value); setResults([]); setDone(false); }}
          className="flex-1 text-xs border border-slate-200 rounded-lg px-3 py-1.5 bg-white focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/30"
          placeholder="Search keyword…"
        />
        <select
          value={site}
          onChange={e => { setSite(e.target.value); setResults([]); setDone(false); }}
          className="text-xs border border-slate-200 rounded-lg px-2 py-1.5 bg-white focus:outline-none"
        >
          {SITES.map(s => <option key={s}>{s}</option>)}
        </select>
        <button
          onClick={handleSearch}
          disabled={searching}
          className="text-xs font-semibold text-white px-3 py-1.5 rounded-lg bg-[#7C3AED] hover:bg-[#6D28D9] disabled:opacity-60 transition-colors"
        >
          {searching ? "Scraping…" : "Search"}
        </button>
      </div>

      {/* results */}
      <div className="divide-y divide-slate-50 min-h-[160px]">
        {results.length === 0 && !searching && (
          <div className="flex items-center justify-center h-40 text-slate-300 text-xs">
            Hit search to see results stream in
          </div>
        )}
        {results.map((r, i) => (
          <div key={i} className="flex items-center gap-3 px-4 py-2.5 animate-fade-in">
            <span className="text-xl w-7 text-center shrink-0">{r.img}</span>
            <div className="flex-1 min-w-0">
              <p className="text-slate-700 font-medium truncate">{r.title}</p>
              <p className="text-slate-400 text-xs">{r.site} · {r.condition}</p>
            </div>
            <span className="font-semibold text-slate-800 shrink-0">{r.price}</span>
          </div>
        ))}
        {searching && (
          <div className="flex items-center gap-2 px-4 py-2.5 text-xs text-slate-400">
            <svg className="animate-spin w-3 h-3 text-[#7C3AED]" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
            </svg>
            Scraping {site}…
          </div>
        )}
      </div>

      {done && (
        <div className="px-4 py-2 bg-emerald-50 border-t border-emerald-100 text-xs text-emerald-700 font-medium">
          ✓ {results.length} results found across {site === "All Sites" ? "all sites" : site}
        </div>
      )}
    </div>
  );
}
