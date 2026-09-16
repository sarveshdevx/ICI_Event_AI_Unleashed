"use client";

import React, { useState } from "react";
import { sound } from "@/lib/audio";
import { Lightbulb, Swords, Check, ArrowRight, Sparkles, Scale } from "lucide-react";
import { ProblemClash } from "@/lib/types";

const clashProblems: ProblemClash[] = [
  {
    id: 1,
    code: "CLASH // 01",
    title: "Autonomous Disaster Relief Swarm Coordination",
    problem: "Coordinate a decentralized fleet of 50 drones to map flood zones and deliver emergency medical kits with zero cellular connectivity.",
    teamA: {
      name: "TEAM ALPHA (AI-D)",
      concept: "Decentralized P2P Gossip Mesh + TinyRL on ESP32",
      approach: "Ultra-low-power edge reinforcement learning model with local mesh consensus for obstacle negotiation.",
      metrics: { practicality: 92, feasibility: 89, innovation: 94, quality: 91 },
    },
    teamB: {
      name: "TEAM EPSILON (AI-B)",
      concept: "Centralized Relay Satellite Uplink Model",
      approach: "High-throughput cloud inference redirected via single airborne satellite transceiver balloon.",
      metrics: { practicality: 65, feasibility: 72, innovation: 80, quality: 71 },
    },
    keyCriterion: "Zero network connectivity requirement favored decentralized edge mesh.",
  },
  {
    id: 2,
    code: "CLASH // 02",
    title: "Zero-Hallucination Clinical Triage Assistant",
    problem: "Eliminate hallucinations in automated emergency room patient triage when ingesting ambiguous vernacular speech.",
    teamA: {
      name: "TEAM SIGMA (AI-A)",
      concept: "Self-Verifying Tri-Model RAG with Graph Knowledge",
      approach: "Cross-references patient symptoms against structured medical knowledge graphs with dual-auditing validators.",
      metrics: { practicality: 95, feasibility: 91, innovation: 93, quality: 94 },
    },
    teamB: {
      name: "TEAM DELTA (AI-C)",
      concept: "Fine-Tuned Single Dense 70B LLM",
      approach: "Heavy fine-tuning on regional ER audio transcripts with confidence threshold filtering.",
      metrics: { practicality: 78, feasibility: 70, innovation: 76, quality: 75 },
    },
    keyCriterion: "Determinism and verifiable citation graph provided clinical safety.",
  },
];

interface Round02Props {
  onNextRound: () => void;
}

export default function Round02({ onNextRound }: Round02Props) {
  const [selectedClashIdx, setSelectedClashIdx] = useState<number>(0);
  const [isJudged, setIsJudged] = useState<boolean>(false);

  const clash = clashProblems[selectedClashIdx];

  const handleRunVerdict = () => {
    sound.playTriumph();
    setIsJudged(true);
  };

  const handleSelectProblem = (idx: number) => {
    sound.playClick();
    setSelectedClashIdx(idx);
    setIsJudged(false);
  };

  return (
    <section
      id="round02"
      className="relative w-full min-h-screen flex flex-col justify-between px-4 sm:px-8 md:px-16 py-24 bg-gradient-to-b from-[#07111F] via-[#1a0c10] to-[#07111F] border-t border-[#FF5A5F]/20 overflow-hidden"
    >
      {/* Background Opposing Force Gradient Blurs */}
      <div className="absolute top-1/4 -left-48 w-96 h-96 bg-[#FF5A5F]/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-[#FF8A00]/15 rounded-full blur-[120px] pointer-events-none" />

      {/* Top Header */}
      <div className="relative z-10 max-w-6xl mx-auto w-full">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#FF5A5F]/20 pb-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#FF5A5F] to-[#FF8A00] p-[1px] flex items-center justify-center shadow-[0_0_25px_rgba(255,90,95,0.4)]">
              <div className="w-full h-full bg-[#07111F] rounded-2xl flex items-center justify-center">
                <Lightbulb className="w-7 h-7 text-[#FF5A5F] animate-pulse" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#FF5A5F] tracking-widest uppercase">
                <span>ROUND 02 OF 03</span>
                <span>•</span>
                <span className="text-white">STAGE 02</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white uppercase mt-0.5">
                HEAD-TO-HEAD SOLUTIONS
              </h2>
            </div>
          </div>

          {/* Elimination Metric Pill */}
          <div className="flex items-center gap-4">
            <div className="px-5 py-2.5 rounded-2xl bg-[#FF5A5F]/10 border border-[#FF5A5F]/40 text-center">
              <div className="text-[10px] font-mono text-[#FF5A5F] uppercase tracking-widest">
                DUEL ELIMINATION
              </div>
              <div className="text-lg sm:text-xl font-black text-white font-mono tracking-wider">
                20 TEAMS <span className="text-[#FF5A5F]">→</span> 10 TEAMS
              </div>
            </div>

            <div className="hidden sm:block text-right text-xs font-mono text-rose-300">
              <div className="font-bold">10 PAIRS • 10 WINNERS</div>
              <div className="text-slate-400 italic">“Solve. Compare. Stand Out.”</div>
            </div>
          </div>
        </div>

        {/* Subtitle & Concept */}
        <div className="mt-8 max-w-2xl">
          <div className="inline-block px-3 py-1 rounded-md bg-[#FF5A5F]/10 text-[#FF5A5F] font-mono text-xs tracking-wider uppercase font-bold mb-2">
            SAME PROBLEM. BETTER IDEAS.
          </div>
          <h3 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-100">
            TWO OPPOSING FORCES. ONE SURVIVOR.
          </h3>
          <p className="text-xs sm:text-sm font-sans text-slate-400 mt-2 leading-relaxed">
            The 20 qualified teams are locked into 10 direct pairs. Each pair faces the identical complex
            AI challenge. Solutions are evaluated exclusively by an autonomous AI-assisted judging system
            gauging Practicality, Feasibility, Innovation, and Quality.
          </p>
        </div>
      </div>

      {/* Opposing Forces Arena Container */}
      <div className="relative z-10 max-w-5xl mx-auto w-full my-8">
        {/* Problem Selector Bar */}
        <div className="flex items-center gap-2 mb-4 overflow-x-auto pb-2">
          {clashProblems.map((cp, idx) => (
            <button
              key={cp.id}
              onClick={() => handleSelectProblem(idx)}
              onMouseEnter={() => sound.playHover()}
              data-cursor="CASE"
              className={`px-4 py-2 rounded-xl text-xs font-mono tracking-wider uppercase shrink-0 border transition-all ${
                selectedClashIdx === idx
                  ? "bg-[#FF5A5F] text-white border-[#FF5A5F] font-bold shadow-[0_0_15px_rgba(255,90,95,0.4)]"
                  : "bg-white/[0.03] text-slate-400 border-white/10 hover:border-white/30"
              }`}
            >
              {cp.code}: {cp.title.slice(0, 26)}...
            </button>
          ))}
        </div>

        {/* The Duel Clash Box */}
        <div className="p-6 sm:p-8 rounded-3xl bg-[#140a0e]/90 backdrop-blur-xl border border-[#FF5A5F]/30 shadow-[0_0_60px_rgba(255,90,95,0.15)]">
          {/* Active Problem Statement */}
          <div className="border-b border-white/10 pb-4 mb-6">
            <div className="text-[11px] font-mono text-[#FF5A5F] uppercase tracking-widest">
              SHARED PROBLEM STATEMENT
            </div>
            <div className="text-lg sm:text-xl font-bold text-white mt-1">
              &ldquo;{clash.problem}&rdquo;
            </div>
          </div>

          {/* Clash Split Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
            {/* Center VS Clash Icon (Desktop) */}
            <div className="hidden md:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-[#FF5A5F] text-white font-black text-xs items-center justify-center shadow-[0_0_20px_rgba(255,90,95,0.8)] border-2 border-[#07111F]">
              VS
            </div>

            {/* Force A */}
            <div
              className={`p-5 rounded-2xl border transition-all duration-300 ${
                isJudged
                  ? "border-emerald-400 bg-emerald-950/20 shadow-[0_0_25px_rgba(52,211,153,0.3)]"
                  : "border-white/10 bg-white/[0.02]"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-[#FF5A5F]">FORCE A</span>
                {isJudged && (
                  <span className="flex items-center gap-1 text-[11px] font-mono font-bold text-emerald-400 bg-emerald-950/60 px-2.5 py-0.5 rounded-full border border-emerald-500/40">
                    <Check className="w-3.5 h-3.5" /> ADVANCES
                  </span>
                )}
              </div>
              <div className="text-base font-black text-white mt-1">{clash.teamA.name}</div>
              <div className="text-xs font-mono text-cyan-300 mt-1">{clash.teamA.concept}</div>
              <p className="text-xs text-slate-300 mt-2 leading-relaxed">{clash.teamA.approach}</p>

              {/* Metrics */}
              <div className="mt-4 pt-3 border-t border-white/10 grid grid-cols-2 gap-2 text-[11px] font-mono">
                <div>
                  <span className="text-slate-400">PRACTICALITY: </span>
                  <span className="text-white font-bold">{clash.teamA.metrics.practicality}%</span>
                </div>
                <div>
                  <span className="text-slate-400">FEASIBILITY: </span>
                  <span className="text-white font-bold">{clash.teamA.metrics.feasibility}%</span>
                </div>
                <div>
                  <span className="text-slate-400">INNOVATION: </span>
                  <span className="text-white font-bold">{clash.teamA.metrics.innovation}%</span>
                </div>
                <div>
                  <span className="text-slate-400">QUALITY: </span>
                  <span className="text-white font-bold">{clash.teamA.metrics.quality}%</span>
                </div>
              </div>
            </div>

            {/* Force B */}
            <div
              className={`p-5 rounded-2xl border transition-all duration-300 ${
                isJudged
                  ? "border-white/5 opacity-40 bg-white/[0.01]"
                  : "border-white/10 bg-white/[0.02]"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-[#FF8A00]">FORCE B</span>
                {isJudged && (
                  <span className="text-[11px] font-mono text-slate-400 bg-white/5 px-2.5 py-0.5 rounded-full">
                    ELIMINATED
                  </span>
                )}
              </div>
              <div className="text-base font-black text-white mt-1">{clash.teamB.name}</div>
              <div className="text-xs font-mono text-orange-300 mt-1">{clash.teamB.concept}</div>
              <p className="text-xs text-slate-300 mt-2 leading-relaxed">{clash.teamB.approach}</p>

              {/* Metrics */}
              <div className="mt-4 pt-3 border-t border-white/10 grid grid-cols-2 gap-2 text-[11px] font-mono">
                <div>
                  <span className="text-slate-400">PRACTICALITY: </span>
                  <span className="text-slate-300">{clash.teamB.metrics.practicality}%</span>
                </div>
                <div>
                  <span className="text-slate-400">FEASIBILITY: </span>
                  <span className="text-slate-300">{clash.teamB.metrics.feasibility}%</span>
                </div>
                <div>
                  <span className="text-slate-400">INNOVATION: </span>
                  <span className="text-slate-300">{clash.teamB.metrics.innovation}%</span>
                </div>
                <div>
                  <span className="text-slate-400">QUALITY: </span>
                  <span className="text-slate-300">{clash.teamB.metrics.quality}%</span>
                </div>
              </div>
            </div>
          </div>

          {/* AI-Assisted Verdict Action */}
          <div className="mt-6 pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-slate-300 font-mono">
              <span className="text-[#FF5A5F] font-bold">AI JUDGING PROTOCOL: </span>
              {isJudged ? clash.keyCriterion : "Evaluation compares feasibility, real-world utility, and deployment viability."}
            </div>

            <button
              onClick={handleRunVerdict}
              onMouseEnter={() => sound.playHover()}
              data-cursor="JUDGE"
              className="shrink-0 flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-[#FF5A5F] to-[#FF8A00] hover:scale-105 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(255,90,95,0.4)]"
            >
              <Scale className="w-4 h-4" />
              <span>{isJudged ? "VERDICT RECORDED" : "RUN AI JUDGING VERDICT"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="relative z-10 max-w-6xl mx-auto w-full flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/10 pt-4 text-xs font-mono text-slate-400">
        <div className="flex items-center gap-3">
          <span className="text-[#FF5A5F]">AI JUDGING FACTORS:</span>
          <span>PRACTICALITY</span>
          <span>•</span>
          <span>FEASIBILITY</span>
          <span>•</span>
          <span>INNOVATION</span>
          <span>•</span>
          <span>QUALITY</span>
        </div>

        <button
          onClick={() => {
            sound.playClick();
            onNextRound();
          }}
          className="flex items-center gap-2 text-white hover:text-[#FF5A5F] transition-colors"
        >
          <span>ADVANCE TO ROUND 03: GUESS THE PROMPT</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
}

