"use client";

import React from "react";
import { sound } from "@/lib/audio";
import { ShieldAlert, Zap, Users, Trophy } from "lucide-react";

interface ChallengeProps {
  onContinue: () => void;
}

export default function Challenge({ onContinue }: ChallengeProps) {
  return (
    <section
      id="challenge"
      className="relative w-full min-h-screen flex flex-col justify-center px-4 sm:px-8 md:px-16 py-24 bg-gradient-to-b from-[#07111F] via-[#08172e] to-[#07111F] border-t border-white/5 overflow-hidden"
    >
      {/* Background Subtle Radar Grid Lines */}
      <div className="absolute inset-0 bg-grid-subtle opacity-40 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#087BFF]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto w-full flex flex-col items-center text-center">
        {/* Stage Counter */}
        <div className="flex items-center gap-3 px-4 py-1.5 rounded-full bg-white/[0.04] border border-[#00E5FF]/30 text-xs font-mono text-[#00E5FF] mb-8">
          <span className="w-2 h-2 rounded-full bg-[#00E5FF] animate-ping" />
          <span>PROVOCATION 01 // STAGE INTENT</span>
        </div>

        {/* Kinetic Stretching Typography */}
        <div className="flex flex-col items-center gap-1 sm:gap-2 select-none">
          <h2 className="text-4xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter uppercase text-slate-300">
            CAN HUMAN
          </h2>
          <h2 className="text-5xl sm:text-8xl md:text-9xl lg:text-[10rem] font-black tracking-tighter uppercase text-transparent bg-clip-text bg-gradient-to-r from-[#00E5FF] via-[#087BFF] to-[#8B3DFF] glow-cyan">
            INTELLIGENCE
          </h2>
          <h2 className="text-4xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter uppercase text-slate-100">
            OUTTHINK
          </h2>
          <h2 className="text-5xl sm:text-8xl md:text-9xl lg:text-[10rem] font-black tracking-tighter uppercase text-transparent bg-clip-text bg-gradient-to-r from-[#8B3DFF] via-[#FF3CAC] to-white glow-purple">
            THE MACHINE?
          </h2>
        </div>

        {/* Poster Quote Ribbon */}
        <div className="mt-8 px-6 py-2 rounded-full bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-transparent border border-white/10 text-xs sm:text-sm font-mono tracking-widest text-cyan-300 uppercase">
          &ldquo;MANY TEAMS. ONE GOAL.&rdquo;
        </div>

        {/* The 3 Progressive Rounds Preview Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-14 w-full max-w-4xl text-left">
          {/* Round 1 Pillar */}
          <div
            onMouseEnter={() => sound.playHover()}
            data-cursor="QUIZ"
            className="p-6 rounded-2xl bg-gradient-to-b from-white/[0.05] to-transparent border border-[#00E5FF]/20 hover:border-[#00E5FF] transition-all duration-300 group"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono font-bold text-[#00E5FF]">ROUND 01</span>
              <span className="text-[11px] font-mono text-slate-400">60 → 20 TEAMS</span>
            </div>
            <div className="text-xl font-black tracking-tight text-white group-hover:text-[#00E5FF] transition-colors">
              AI QUIZ
            </div>
            <div className="text-xs font-mono text-slate-300 mt-2">
              TEST YOUR KNOWLEDGE
            </div>
            <p className="text-xs text-slate-400 mt-3 leading-relaxed">
              Speed, accuracy, and foundational deep learning awareness under tight clock pressure.
            </p>
            <div className="mt-4 pt-3 border-t border-white/10 text-[10px] font-mono text-[#00E5FF] uppercase">
              Know. Think. Advance.
            </div>
          </div>

          {/* Round 2 Pillar */}
          <div
            onMouseEnter={() => sound.playHover()}
            data-cursor="CLASH"
            className="p-6 rounded-2xl bg-gradient-to-b from-white/[0.05] to-transparent border border-[#FF5A5F]/20 hover:border-[#FF5A5F] transition-all duration-300 group"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono font-bold text-[#FF5A5F]">ROUND 02</span>
              <span className="text-[11px] font-mono text-slate-400">20 → 10 TEAMS</span>
            </div>
            <div className="text-xl font-black tracking-tight text-white group-hover:text-[#FF5A5F] transition-colors">
              HEAD-TO-HEAD
            </div>
            <div className="text-xs font-mono text-slate-300 mt-2">
              SAME PROBLEM. BETTER IDEAS.
            </div>
            <p className="text-xs text-slate-400 mt-3 leading-relaxed">
              10 direct duels. Propose the most practical, feasible, and innovative AI solution.
            </p>
            <div className="mt-4 pt-3 border-t border-white/10 text-[10px] font-mono text-[#FF5A5F] uppercase">
              Solve. Compare. Stand Out.
            </div>
          </div>

          {/* Round 3 Pillar */}
          <div
            onMouseEnter={() => sound.playHover()}
            data-cursor="DECODE"
            className="p-6 rounded-2xl bg-gradient-to-b from-white/[0.05] to-transparent border border-[#FF3CAC]/20 hover:border-[#FF3CAC] transition-all duration-300 group"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono font-bold text-[#FF3CAC]">ROUND 03</span>
              <span className="text-[11px] font-mono text-slate-400">10 → 3 TEAMS</span>
            </div>
            <div className="text-xl font-black tracking-tight text-white group-hover:text-[#FF3CAC] transition-colors">
              GUESS THE PROMPT
            </div>
            <div className="text-xs font-mono text-slate-300 mt-2">
              WRITE. THINK. MATCH.
            </div>
            <p className="text-xs text-slate-400 mt-3 leading-relaxed">
              Unscramble AI-generated synthetic art. Reverse engineer the exact creative prompt.
            </p>
            <div className="mt-4 pt-3 border-t border-white/10 text-[10px] font-mono text-[#FF3CAC] uppercase">
              Imagine. Decode. Be Creative.
            </div>
          </div>
        </div>

        {/* Progression Callout */}
        <button
          onClick={() => {
            sound.playClick();
            onContinue();
          }}
          onMouseEnter={() => sound.playHover()}
          data-cursor="JOURNEY"
          className="mt-14 inline-flex items-center gap-3 px-8 py-3.5 rounded-full bg-white text-[#07111F] font-bold text-xs uppercase tracking-widest hover:bg-[#00E5FF] transition-all duration-200 shadow-[0_0_25px_rgba(255,255,255,0.3)]"
        >
          <span>EXPERIENCE THE 60 → 3 ELIMINATION</span>
          <Zap className="w-4 h-4 fill-current text-[#07111F]" />
        </button>
      </div>
    </section>
  );
}

