"use client";

import { useState } from "react";

const initialLots = [
  { id: "JP-041", desc: "John Pye Electronics — Mixed Batch", units: 24, cost: 320, sales: 611.40, fees: 48.90 },
  { id: "JBL-019", desc: "Jobalots Clothing — Spring Returns", units: 60, cost: 180, sales: 294.00, fees: 23.50 },
  { id: "JP-038", desc: "John Pye Tools — Power Tool Lot", units: 12, cost: 210, sales: 387.50, fees: 31.00 },
  { id: "JBL-022", desc: "Jobalots Homewares — Kitchen Lot", units: 35, cost: 95, sales: 163.20, fees: 13.10 },
];

const newSale = { orderId: "12-09821-44201", title: "Bosch Drill — JP-038", amount: 42.99, fees: 3.44 };

function pnl(lot: typeof initialLots[0]) {
  return lot.sales - lot.fees - lot.cost;
}

export default function TradeDeskShowcase() {
  const [lots, setLots] = useState(initialLots);
  const [syncing, setSyncing] = useState(false);
  const [synced, setSynced] = useState(false);
  const [flash, setFlash] = useState<string | null>(null);

  async function handleSync() {
    setSyncing(true);
    await new Promise(r => setTimeout(r, 1800));
    setLots(prev => prev.map(l =>
      l.id === "JP-038"
        ? { ...l, sales: l.sales + newSale.amount, fees: l.fees + newSale.fees }
        : l
    ));
    setSyncing(false);
    setSynced(true);
    setFlash("JP-038");
    setTimeout(() => setFlash(null), 2000);
  }

  return (
    <div className="rounded-xl border border-slate-200 overflow-hidden text-sm">
      {/* toolbar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-slate-50 border-b border-slate-200">
        <span className="font-semibold text-slate-700">Lots</span>
        <button
          onClick={handleSync}
          disabled={syncing || synced}
          className="flex items-center gap-1.5 text-xs font-semibold text-white px-3 py-1.5 rounded-lg bg-[#7C3AED] disabled:opacity-60 hover:bg-[#6D28D9] transition-colors"
        >
          {syncing ? (
            <>
              <svg className="animate-spin w-3 h-3" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
              </svg>
              Syncing…
            </>
          ) : synced ? "✓ Synced" : "↻ Sync eBay"}
        </button>
      </div>

      {/* table */}
      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-slate-100 text-slate-400 text-left">
              <th className="px-4 py-2 font-medium">Lot ID</th>
              <th className="px-4 py-2 font-medium">Description</th>
              <th className="px-4 py-2 font-medium text-right">Units</th>
              <th className="px-4 py-2 font-medium text-right">Cost</th>
              <th className="px-4 py-2 font-medium text-right">Revenue</th>
              <th className="px-4 py-2 font-medium text-right">P&L</th>
            </tr>
          </thead>
          <tbody>
            {lots.map(lot => {
              const pl = pnl(lot);
              const isFlashing = flash === lot.id;
              return (
                <tr
                  key={lot.id}
                  className={`border-b border-slate-50 transition-colors duration-500 ${isFlashing ? "bg-green-50" : "hover:bg-slate-50"}`}
                >
                  <td className="px-4 py-2.5 font-mono text-slate-500">{lot.id}</td>
                  <td className="px-4 py-2.5 text-slate-700 max-w-[180px] truncate">{lot.desc}</td>
                  <td className="px-4 py-2.5 text-right text-slate-600">{lot.units}</td>
                  <td className="px-4 py-2.5 text-right text-slate-600">£{lot.cost.toFixed(2)}</td>
                  <td className="px-4 py-2.5 text-right text-slate-600">£{lot.sales.toFixed(2)}</td>
                  <td className={`px-4 py-2.5 text-right font-semibold ${pl >= 0 ? "text-emerald-600" : "text-red-500"}`}>
                    {pl >= 0 ? "+" : ""}£{pl.toFixed(2)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {synced && (
        <div className="px-4 py-2 bg-emerald-50 border-t border-emerald-100 text-xs text-emerald-700 font-medium">
          ✓ 1 new order imported — {newSale.title} · £{newSale.amount}
        </div>
      )}
    </div>
  );
}
