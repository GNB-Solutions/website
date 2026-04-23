"use client";

import { useState } from "react";

const players = [
  { name: "xNova", rating: 2140, avatar: "N" },
  { name: "ShadowRift", rating: 1985, avatar: "S" },
  { name: "AceVenom", rating: 2050, avatar: "A" },
  { name: "BlitzKrieg", rating: 1870, avatar: "B" },
];

type Match = { round: string; p1: string | null; p2: string | null; s1: number | null; s2: number | null; done: boolean };

const bracket: Match[] = [
  { round: "Semi 1", p1: "xNova", p2: "BlitzKrieg", s1: 2, s2: 0, done: true },
  { round: "Semi 2", p1: "ShadowRift", p2: "AceVenom", s1: null, s2: null, done: false },
  { round: "Final", p1: null, p2: null, s1: null, s2: null, done: false },
];

export default function GameOnShowcase() {
  const [matches, setMatches] = useState(bracket);
  const [submitting, setSubmitting] = useState(false);
  const [coins, setCoins] = useState(0);
  const [step, setStep] = useState(0);

  async function submitScore() {
    if (step !== 0 || submitting) return;
    setSubmitting(true);
    await new Promise(r => setTimeout(r, 1200));
    setMatches(prev => prev.map((m, i) =>
      i === 1 ? { ...m, s1: 2, s2: 1, done: true } : m
    ));
    setSubmitting(false);
    setStep(1);

    // After a beat, populate the final
    setTimeout(() => {
      setMatches(prev => prev.map((m, i) =>
        i === 2 ? { ...m, p1: "xNova", p2: "ShadowRift" } : m
      ));
    }, 800);

    // Award coins
    setTimeout(() => setCoins(50), 1500);
  }

  return (
    <div className="rounded-xl border border-slate-200 overflow-hidden text-sm">
      {/* header */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-slate-50 border-b border-slate-200">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-slate-700">Valorant 1v1</span>
          <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 font-medium">Free Entry</span>
        </div>
        {coins > 0 && (
          <span className="text-xs font-semibold text-amber-600 animate-fade-in flex items-center gap-1">
            <span className="w-4 h-4 rounded-full bg-amber-100 flex items-center justify-center text-[10px]">G</span>
            +{coins} GameCoins
          </span>
        )}
      </div>

      {/* bracket */}
      <div className="p-4 space-y-2">
        {matches.map((m, i) => (
          <div key={i} className={`flex items-center gap-3 px-3 py-2.5 rounded-lg border transition-all duration-500 ${m.done ? "border-emerald-200 bg-emerald-50/30" : m.p1 ? "border-slate-200 bg-white" : "border-dashed border-slate-200 bg-slate-50/50"}`}>
            <span className="text-xs font-medium text-slate-400 w-14 shrink-0">{m.round}</span>
            <div className="flex-1 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5">
                  {m.p1 ? (
                    <>
                      <span className="w-5 h-5 rounded-full bg-[#7C3AED] text-white text-[10px] flex items-center justify-center font-bold">{m.p1[0]}</span>
                      <span className={`text-xs font-medium ${m.done && m.s1 !== null && m.s2 !== null && m.s1 > m.s2 ? "text-emerald-700" : "text-slate-700"}`}>{m.p1}</span>
                    </>
                  ) : (
                    <span className="text-xs text-slate-300 italic">TBD</span>
                  )}
                </div>
                <span className="text-xs text-slate-300">vs</span>
                <div className="flex items-center gap-1.5">
                  {m.p2 ? (
                    <>
                      <span className="w-5 h-5 rounded-full bg-slate-600 text-white text-[10px] flex items-center justify-center font-bold">{m.p2[0]}</span>
                      <span className={`text-xs font-medium ${m.done && m.s1 !== null && m.s2 !== null && m.s2 > m.s1 ? "text-emerald-700" : "text-slate-700"}`}>{m.p2}</span>
                    </>
                  ) : (
                    <span className="text-xs text-slate-300 italic">TBD</span>
                  )}
                </div>
              </div>
              {m.done && m.s1 !== null && (
                <span className="text-xs font-bold text-slate-500">{m.s1} - {m.s2}</span>
              )}
              {!m.done && m.p1 && m.p2 && i === 1 && (
                <button
                  onClick={submitScore}
                  disabled={submitting}
                  className="text-xs font-semibold text-white px-3 py-1 rounded-lg bg-[#7C3AED] hover:bg-[#6D28D9] disabled:opacity-60 transition-colors"
                >
                  {submitting ? "Submitting..." : "Submit Score"}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* players */}
      <div className="px-4 pb-3 flex gap-2 flex-wrap">
        {players.map(p => (
          <div key={p.name} className="flex items-center gap-1.5 text-xs text-slate-500">
            <span className="w-4 h-4 rounded-full bg-slate-200 text-slate-600 text-[9px] flex items-center justify-center font-bold">{p.avatar}</span>
            {p.name}
            <span className="text-slate-300">{p.rating}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
