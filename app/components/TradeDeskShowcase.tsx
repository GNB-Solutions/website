"use client";

import { useState } from "react";

type Tab = "dashboard" | "lots" | "analytics" | "ai";

const lotData = [
  { id: "LOT-001", desc: "Phone Cases — Mixed Brands", units: 50, sold: 38, cost: 120, revenue: 410 },
  { id: "LOT-002", desc: "Wireless Earbuds", units: 20, sold: 15, cost: 200, revenue: 285 },
  { id: "LOT-003", desc: "LED Desk Lamps", units: 12, sold: 9, cost: 90, revenue: 72 },
];

const carData = [
  { name: "Ford Ranger 2022", invested: 19009, received: 18542, status: "Pending" },
  { name: "Mercedes GLC43", invested: 20220, received: 20500, status: "Sold" },
];

function fmt(n: number) { return `£${n.toLocaleString("en-GB", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`; }

export default function TradeDeskShowcase() {
  const [tab, setTab] = useState<Tab>("dashboard");

  const tabs: { id: Tab; label: string }[] = [
    { id: "dashboard", label: "Dashboard" },
    { id: "lots", label: "Lots" },
    { id: "analytics", label: "Analytics" },
    { id: "ai", label: "AI Tools" },
  ];

  return (
    <div className="rounded-xl border border-slate-200 overflow-hidden text-sm">
      {/* Tab bar */}
      <div className="flex bg-slate-50 border-b border-slate-200">
        {tabs.map((t) => (
          <button key={t.id} onClick={() => setTab(t.id)}
            className={`flex-1 text-xs font-medium py-2 transition-colors ${tab === t.id ? "bg-white text-slate-900 border-b-2 border-[#7C3AED]" : "text-slate-500 hover:text-slate-700"}`}>
            {t.label}
          </button>
        ))}
      </div>

      {/* Dashboard */}
      {tab === "dashboard" && (
        <div className="p-4 space-y-3">
          <div className="grid grid-cols-4 gap-2">
            {[
              { label: "Invested", value: "£19,720", color: "text-slate-800" },
              { label: "Revenue", value: "£19,579", color: "text-slate-800" },
              { label: "Cash Position", value: "-£141", color: "text-red-500" },
              { label: "Unsold Stock", value: "£282", color: "text-amber-500" },
            ].map((s) => (
              <div key={s.label} className="bg-slate-50 rounded-lg p-2">
                <p className="text-[10px] text-slate-400">{s.label}</p>
                <p className={`text-sm font-bold ${s.color}`}>{s.value}</p>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-slate-50 rounded-lg p-3">
              <p className="text-xs font-semibold text-slate-700 mb-1">eBay Lots</p>
              <div className="flex gap-3 text-[10px] text-slate-500">
                <span>3 Lots</span><span>62 Sold</span><span className="text-emerald-600">+£147</span>
              </div>
            </div>
            <div className="bg-slate-50 rounded-lg p-3">
              <p className="text-xs font-semibold text-slate-700 mb-1">Car Flips</p>
              <div className="flex gap-3 text-[10px] text-slate-500">
                <span>2 Cars</span><span>1 Sold</span><span className="text-red-500">-£288</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Lots */}
      {tab === "lots" && (
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-slate-100 text-slate-400 text-left">
                <th className="px-3 py-2 font-medium">Lot</th>
                <th className="px-3 py-2 font-medium">Description</th>
                <th className="px-3 py-2 font-medium text-center">Sold</th>
                <th className="px-3 py-2 font-medium text-center">Cost</th>
                <th className="px-3 py-2 font-medium text-center">Revenue</th>
                <th className="px-3 py-2 font-medium text-center">P&L</th>
              </tr>
            </thead>
            <tbody>
              {lotData.map((lot) => {
                const pl = lot.revenue - lot.cost;
                return (
                  <tr key={lot.id} className="border-b border-slate-50 hover:bg-slate-50">
                    <td className="px-3 py-2 font-mono text-slate-500">{lot.id}</td>
                    <td className="px-3 py-2 text-slate-700">{lot.desc}</td>
                    <td className="px-3 py-2 text-center text-slate-600">{lot.sold}/{lot.units}</td>
                    <td className="px-3 py-2 text-center text-slate-600">{fmt(lot.cost)}</td>
                    <td className="px-3 py-2 text-center text-slate-600">{fmt(lot.revenue)}</td>
                    <td className={`px-3 py-2 text-center font-semibold ${pl >= 0 ? "text-emerald-600" : "text-red-500"}`}>
                      {pl >= 0 ? "+" : ""}{fmt(pl)}
                    </td>
                  </tr>
                );
              })}
              {carData.map((car) => {
                const pl = car.received - car.invested;
                return (
                  <tr key={car.name} className="border-b border-slate-50 hover:bg-slate-50">
                    <td className="px-3 py-2 text-slate-500">🚗</td>
                    <td className="px-3 py-2 text-slate-700">{car.name}</td>
                    <td className="px-3 py-2 text-center"><span className={`text-[10px] px-1.5 py-0.5 rounded-full ${car.status === "Sold" ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"}`}>{car.status}</span></td>
                    <td className="px-3 py-2 text-center text-slate-600">{fmt(car.invested)}</td>
                    <td className="px-3 py-2 text-center text-slate-600">{fmt(car.received)}</td>
                    <td className={`px-3 py-2 text-center font-semibold ${pl >= 0 ? "text-emerald-600" : "text-red-500"}`}>
                      {pl >= 0 ? "+" : ""}{fmt(pl)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Analytics */}
      {tab === "analytics" && (
        <div className="p-4 space-y-3">
          <div className="grid grid-cols-3 gap-2">
            {[
              { label: "Realised Profit", value: "+£437.00", color: "text-emerald-600" },
              { label: "Unsold Stock", value: "£282.70", color: "text-amber-500" },
              { label: "True P&L", value: "+£719.70", color: "text-emerald-600" },
            ].map((s) => (
              <div key={s.label} className="bg-slate-50 rounded-lg p-2 text-center">
                <p className="text-[10px] text-slate-400">{s.label}</p>
                <p className={`text-sm font-bold ${s.color}`}>{s.value}</p>
              </div>
            ))}
          </div>
          <div className="bg-slate-50 rounded-lg p-3">
            <p className="text-xs font-semibold text-slate-700 mb-2">By Source</p>
            <div className="space-y-1.5">
              {[
                { name: "Wholesale Direct", invested: "£410.00", pl: "+£357.00", color: "text-emerald-600" },
                { name: "Auction House", invested: "£143.00", pl: "+£80.00", color: "text-emerald-600" },
                { name: "Car Flips", invested: "£39,229.00", pl: "-£187.00", color: "text-red-500" },
              ].map((s) => (
                <div key={s.name} className="flex justify-between text-xs">
                  <span className="text-slate-600">{s.name}</span>
                  <div className="flex gap-3">
                    <span className="text-slate-400">{s.invested}</span>
                    <span className={`font-semibold ${s.color}`}>{s.pl}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-slate-50 rounded-lg p-3">
            <p className="text-xs font-semibold text-slate-700 mb-1">Fee Drain</p>
            <p className="text-lg font-bold text-red-500">£57.25</p>
            <p className="text-[10px] text-slate-400">7.4% of Gross Revenue</p>
          </div>
        </div>
      )}

      {/* AI Tools */}
      {tab === "ai" && (
        <div className="p-4 space-y-3">
          <div className="bg-slate-50 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-purple-100 text-purple-700 font-medium">AI</span>
              <p className="text-xs font-semibold text-slate-700">Listing Generator</p>
            </div>
            <p className="text-[11px] text-slate-500 mb-2">Upload a photo or describe an item → AI writes the title, description, and suggests a price.</p>
            <div className="bg-white rounded border border-slate-200 p-2">
              <p className="text-[10px] text-slate-400">Generated Title:</p>
              <p className="text-xs text-slate-700 font-medium">Wireless Bluetooth Headphones — Noise Cancelling, 30hr Battery, Foldable</p>
              <p className="text-[10px] text-slate-400 mt-1">Suggested Price: <span className="text-emerald-600 font-semibold">£14.99</span></p>
            </div>
          </div>
          <div className="bg-slate-50 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-purple-100 text-purple-700 font-medium">AI</span>
              <p className="text-xs font-semibold text-slate-700">Invoice Import</p>
            </div>
            <p className="text-[11px] text-slate-500 mb-2">Drop invoice PDFs + manifests → AI reads them, matches SKUs, detects refunds, and imports lots.</p>
            <div className="bg-white rounded border border-slate-200 p-2 space-y-1">
              <div className="flex justify-between text-[10px]">
                <span className="text-slate-600">✓ 3 Lots Detected</span>
                <span className="text-emerald-600">Imported</span>
              </div>
              <div className="flex justify-between text-[10px]">
                <span className="text-slate-600">✗ 1 Credit Note</span>
                <span className="text-red-500">Skipped</span>
              </div>
            </div>
          </div>
          <div className="bg-slate-50 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-purple-100 text-purple-700 font-medium">AI</span>
              <p className="text-xs font-semibold text-slate-700">Price Research</p>
            </div>
            <p className="text-[11px] text-slate-500">Search sold comps → AI analyses and suggests optimal price with confidence level.</p>
          </div>
        </div>
      )}
    </div>
  );
}
