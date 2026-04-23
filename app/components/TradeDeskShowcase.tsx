"use client";

import { useState } from "react";

const initialLots = [
  { id: "LOT-001", desc: "Phone Cases — Mixed Brands", units: 50, sold: 38, cost: 120, revenue: 410, refunds: 0 },
  { id: "LOT-002", desc: "Wireless Earbuds", units: 20, sold: 15, cost: 200, revenue: 285, refunds: 0 },
  { id: "LOT-003", desc: "LED Desk Lamps", units: 12, sold: 9, cost: 90, revenue: 72, refunds: 0 },
];

const syncResult = {
  imported: 2,
  updated: 1,
  refunded: 1,
  detail: "2 new sales imported, 1 refund detected",
};

export default function TradeDeskShowcase() {
  const [lots, setLots] = useState(initialLots);
  const [syncing, setSyncing] = useState(false);
  const [synced, setSynced] = useState(false);
  const [tab, setTab] = useState<"lots" | "analytics">("lots");

  async function handleSync() {
    if (syncing || synced) return;
    setSyncing(true);
    await new Promise(r => setTimeout(r, 2000));
    setLots(prev => prev.map(l => {
      if (l.id === "LOT-001") return { ...l, sold: l.sold + 2, revenue: l.revenue + 22 };
      if (l.id === "LOT-003") return { ...l, refunds: 8, revenue: l.revenue - 8 };
      return l;
    }));
    setSyncing(false);
    setSynced(true);
  }

  const totalCost = lots.reduce((s, l) => s + l.cost, 0);
  const totalRevenue = lots.reduce((s, l) => s + l.revenue, 0);
  const totalPL = totalRevenue - totalCost;
  const totalRefunds = lots.reduce((s, l) => s + l.refunds, 0);

  return (
    <div className="rounded-xl border border-slate-200 overflow-hidden text-sm">
      {/* toolbar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-slate-50 border-b border-slate-200">
        <div className="flex gap-1">
          <button onClick={() => setTab("lots")} className={`text-xs font-medium px-3 py-1 rounded-md transition-colors ${tab === "lots" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}>Lots</button>
          <button onClick={() => setTab("analytics")} className={`text-xs font-medium px-3 py-1 rounded-md transition-colors ${tab === "analytics" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}>Analytics</button>
        </div>
        <button
          onClick={handleSync}
          disabled={syncing || synced}
          className="flex items-center gap-1.5 text-xs font-semibold text-white px-3 py-1.5 rounded-lg bg-[#7C3AED] disabled:opacity-60 hover:bg-[#6D28D9] transition-colors"
        >
          {syncing ? (
            <><svg className="animate-spin w-3 h-3" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/></svg>Syncing eBay…</>
          ) : synced ? "Synced" : "Sync eBay"}
        </button>
      </div>

      {tab === "lots" ? (
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-slate-100 text-slate-400 text-left">
                <th className="px-4 py-2 font-medium">Lot</th>
                <th className="px-4 py-2 font-medium">Description</th>
                <th className="px-4 py-2 font-medium text-right">Sold</th>
                <th className="px-4 py-2 font-medium text-right">Cost</th>
                <th className="px-4 py-2 font-medium text-right">Revenue</th>
                {synced && <th className="px-4 py-2 font-medium text-right">Refunds</th>}
                <th className="px-4 py-2 font-medium text-right">P&L</th>
              </tr>
            </thead>
            <tbody>
              {lots.map(lot => {
                const pl = lot.revenue - lot.cost;
                const hasRefund = lot.refunds > 0;
                return (
                  <tr key={lot.id} className={`border-b border-slate-50 transition-colors duration-500 ${hasRefund && synced ? "bg-red-50/50" : "hover:bg-slate-50"}`}>
                    <td className="px-4 py-2.5 font-mono text-slate-500">{lot.id}</td>
                    <td className="px-4 py-2.5 text-slate-700 max-w-[180px] truncate">{lot.desc}</td>
                    <td className="px-4 py-2.5 text-right text-slate-600">{lot.sold}/{lot.units}</td>
                    <td className="px-4 py-2.5 text-right text-slate-600">{"\u00A3"}{lot.cost.toFixed(2)}</td>
                    <td className="px-4 py-2.5 text-right text-slate-600">{"\u00A3"}{lot.revenue.toFixed(2)}</td>
                    {synced && <td className={`px-4 py-2.5 text-right ${hasRefund ? "text-red-500 font-semibold" : "text-slate-400"}`}>{hasRefund ? `-\u00A3${lot.refunds.toFixed(2)}` : "\u2014"}</td>}
                    <td className={`px-4 py-2.5 text-right font-semibold ${pl >= 0 ? "text-emerald-600" : "text-red-500"}`}>
                      {pl >= 0 ? "+" : ""}{"\u00A3"}{pl.toFixed(2)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="p-4 grid grid-cols-2 gap-3">
          <div className="bg-slate-50 rounded-lg p-3">
            <p className="text-xs text-slate-400 mb-1">Total Revenue</p>
            <p className="text-lg font-bold text-slate-900">{"\u00A3"}{totalRevenue.toFixed(2)}</p>
          </div>
          <div className="bg-slate-50 rounded-lg p-3">
            <p className="text-xs text-slate-400 mb-1">Total Invested</p>
            <p className="text-lg font-bold text-slate-900">{"\u00A3"}{totalCost.toFixed(2)}</p>
          </div>
          <div className="bg-slate-50 rounded-lg p-3">
            <p className="text-xs text-slate-400 mb-1">Net P&L</p>
            <p className={`text-lg font-bold ${totalPL >= 0 ? "text-emerald-600" : "text-red-500"}`}>{totalPL >= 0 ? "+" : ""}{"\u00A3"}{totalPL.toFixed(2)}</p>
          </div>
          <div className="bg-slate-50 rounded-lg p-3">
            <p className="text-xs text-slate-400 mb-1">Refunds</p>
            <p className={`text-lg font-bold ${totalRefunds > 0 ? "text-red-500" : "text-slate-900"}`}>{totalRefunds > 0 ? `-\u00A3${totalRefunds.toFixed(2)}` : "\u00A30.00"}</p>
          </div>
        </div>
      )}

      {synced && (
        <div className="px-4 py-2 bg-emerald-50 border-t border-emerald-100 text-xs text-emerald-700 font-medium">
          {syncResult.detail} — returns & cases automatically tracked
        </div>
      )}
    </div>
  );
}
