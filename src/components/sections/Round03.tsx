"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { sound } from "@/lib/audio";
import { Wand2, Sparkles, Check, ArrowRight, Eye, RefreshCw, KeyRound } from "lucide-react";

interface PromptToken {
  id: string;
  text: string;
  isCorrect: boolean;
  category: "subject" | "action" | "object" | "environment";
}

const monkeyTokens: PromptToken[] = [
  { id: "t1", text: "bright red monkey", isCorrect: true, category: "subject" },
  { id: "t2", text: "holding a yellow banana", isCorrect: true, category: "object" },
  { id: "t3", text: "hanging from a rope", isCorrect: true, category: "action" },
  { id: "t4", text: "colourful jungle environment", isCorrect: true, category: "environment" },
  { id: "t5", text: "steampunk brass robot", isCorrect: false, category: "subject" },
  { id: "t6", text: "cyberpunk neon city skyline", isCorrect: false, category: "environment" },
  { id: "t7", text: "playful expressive face", isCorrect: true, category: "subject" },
  { id: "t8", text: "monochrome pencil sketch", isCorrect: false, category: "object" },
];

const MASTER_PROMPT =
  "A polished AI illustration of a bright red playful monkey holding a yellow banana, hanging from a vine rope with one hand, in a colourful lush tropical jungle.";

interface Round03Props {
  onNextRound: () => void;
}

export default function Round03({ onNextRound }: Round03Props) {
  const [selectedTokens, setSelectedTokens] = useState<string[]>([]);
  const [clarity, setClarity] = useState<number>(30);
  const [showFullPrompt, setShowFullPrompt] = useState<boolean>(false);

  // Calculate prompt reconstruction score
  useEffect(() => {
    const correctSelected = selectedTokens.filter((id) => {
      const tok = monkeyTokens.find((t) => t.id === id);
      return tok?.isCorrect;
    }).length;

    const totalCorrect = monkeyTokens.filter((t) => t.isCorrect).length;
    const progress = Math.min(100, Math.round(20 + (correctSelected / totalCorrect) * 80));
    setClarity(progress);
  }, [selectedTokens]);

  const toggleToken = (tokenId: string) => {
    sound.playClick();
    if (selectedTokens.includes(tokenId)) {
      setSelectedTokens(selectedTokens.filter((id) => id !== tokenId));
    } else {
      setSelectedTokens([...selectedTokens, tokenId]);
      const tok = monkeyTokens.find((t) => t.id === tokenId);
      if (tok?.isCorrect) {
        sound.playHover();
      }
    }
  };

  const handleReset = () => {
    sound.playHover();
    setSelectedTokens([]);
    setShowFullPrompt(false);
  };

  const handleRevealFull = () => {
    sound.playTriumph();
    setShowFullPrompt(true);
    setSelectedTokens(monkeyTokens.filter((t) => t.isCorrect).map((t) => t.id));
  };

  return (
    <section
      id="round03"
      className="relative w-full min-h-screen flex flex-col justify-between px-4 sm:px-8 md:px-16 py-24 bg-gradient-to-b from-[#07111F] via-[#160621] to-[#07111F] border-t border-[#8B3DFF]/20 overflow-hidden"
    >
      {/* Background Mystery Glows */}
      <div className="absolute top-1/3 -right-32 w-[500px] h-[500px] bg-[#8B3DFF]/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 -left-32 w-[450px] h-[450px] bg-[#FF3CAC]/15 rounded-full blur-[140px] pointer-events-none" />

      {/* Top Header */}
      <div className="relative z-10 max-w-6xl mx-auto w-full">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#8B3DFF]/20 pb-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#8B3DFF] to-[#FF3CAC] p-[1px] flex items-center justify-center shadow-[0_0_25px_rgba(139,61,255,0.4)]">
              <div className="w-full h-full bg-[#07111F] rounded-2xl flex items-center justify-center">
                <Wand2 className="w-7 h-7 text-[#FF3CAC] animate-pulse" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#FF3CAC] tracking-widest uppercase">
                <span>ROUND 03 OF 03</span>
                <span>•</span>
                <span className="text-white">STAGE 03</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white uppercase mt-0.5">
                GUESS THE PROMPT
              </h2>
            </div>
          </div>

          {/* Elimination Metric Pill */}
          <div className="flex items-center gap-4">
            <div className="px-5 py-2.5 rounded-2xl bg-[#8B3DFF]/10 border border-[#8B3DFF]/40 text-center">
              <div className="text-[10px] font-mono text-[#FF3CAC] uppercase tracking-widest">
                FINAL CUTOFF
              </div>
              <div className="text-lg sm:text-xl font-black text-white font-mono tracking-wider">
                10 TEAMS <span className="text-[#FF3CAC]">→</span> 3 TEAMS
              </div>
            </div>

            <div className="hidden sm:block text-right text-xs font-mono text-purple-300">
              <div className="font-bold">TOP 3 ADVANCE TO FINAL</div>
              <div className="text-slate-400 italic">“Imagine. Decode. Be Creative.”</div>
            </div>
          </div>
        </div>

        {/* Subtitle & Provocation */}
        <div className="mt-8 max-w-2xl">
          <div className="inline-block px-3 py-1 rounded-md bg-[#8B3DFF]/10 text-[#FF3CAC] font-mono text-xs tracking-wider uppercase font-bold mb-2">
            WRITE. THINK. MATCH.
          </div>
          <h3 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-100">
            CAN YOU GUESS THE PROMPT BEHIND THIS IMAGE?
          </h3>
          <p className="text-xs sm:text-sm font-sans text-slate-400 mt-2 leading-relaxed">
            Examine the AI-generated artwork below. What prompt could have created it?
            Teams must reverse-engineer the exact subject, action, style, and atmosphere.
            Judged on prompt accuracy, creativity, and semantic relevance.
          </p>
        </div>
      </div>

      {/* Main Visual Focus: The Red Monkey Image & Prompt Decryption */}
      <div className="relative z-10 max-w-5xl mx-auto w-full my-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-6 sm:p-8 rounded-3xl bg-[#12051e]/90 backdrop-blur-xl border border-[#8B3DFF]/30 shadow-[0_0_60px_rgba(139,61,255,0.2)]">
          {/* Left: High-Quality AI Generated Artwork */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="relative w-full max-w-[360px] aspect-square rounded-2xl overflow-hidden border-2 border-[#FF3CAC]/40 shadow-[0_0_40px_rgba(255,60,172,0.35)] group">
              <Image
                src="/images/red_monkey.jpg"
                alt="A red monkey holding a banana, hanging from a rope in a colourful jungle"
                width={700}
                height={700}
                priority
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* Status Badge */}
              <div className="absolute top-3 left-3 z-10 px-3 py-1 rounded-full bg-black/75 backdrop-blur-md border border-white/20 text-[10px] font-mono text-white flex items-center gap-1.5 shadow-lg">
                <Eye className="w-3.5 h-3.5 text-[#FF3CAC]" />
                <span>SAMPLE IMAGE // AI TARGET #03</span>
              </div>

              {clarity >= 90 && (
                <div className="absolute bottom-3 left-3 right-3 bg-emerald-950/90 backdrop-blur-md border border-emerald-400/80 rounded-xl p-2.5 text-center text-emerald-300 font-mono text-xs font-bold flex items-center justify-center gap-2 shadow-xl animate-in fade-in duration-300">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>PROMPT RECONSTRUCTION MATCHED (100%)</span>
                </div>
              )}
            </div>

            <div className="mt-3 text-[11px] font-mono text-center text-purple-200">
              VISUAL CONCEPT: <span className="text-white font-bold">RED MONKEY • BANANA • ROPE • JUNGLE</span>
            </div>
          </div>

          {/* Right: Interactive Prompt Reconstruction Workbench */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                  IDENTIFY KEY PROMPT TOKENS:
                </span>
                <div className="flex items-center gap-3">
                  <button
                    onClick={handleRevealFull}
                    onMouseEnter={() => sound.playHover()}
                    className="flex items-center gap-1 text-[11px] font-mono text-[#00E5FF] hover:underline"
                  >
                    <KeyRound className="w-3 h-3" />
                    <span>REVEAL MASTER PROMPT</span>
                  </button>
                  <button
                    onClick={handleReset}
                    className="flex items-center gap-1 text-[11px] font-mono text-slate-400 hover:text-white transition-colors"
                  >
                    <RefreshCw className="w-3 h-3" />
                    <span>RESET</span>
                  </button>
                </div>
              </div>

              {/* Token Chips Selection */}
              <div className="flex flex-wrap gap-2 mb-6">
                {monkeyTokens.map((t) => {
                  const isSelected = selectedTokens.includes(t.id);
                  return (
                    <button
                      key={t.id}
                      onClick={() => toggleToken(t.id)}
                      onMouseEnter={() => sound.playHover()}
                      data-cursor="TOKEN"
                      className={`px-3 py-2 rounded-xl text-xs font-mono transition-all duration-200 border ${
                        isSelected
                          ? t.isCorrect
                            ? "bg-purple-600/40 text-purple-100 border-purple-400 shadow-[0_0_15px_rgba(139,61,255,0.4)]"
                            : "bg-rose-950/40 text-rose-300 border-rose-500/50"
                          : "bg-white/[0.03] text-slate-300 border-white/10 hover:border-purple-400/50"
                      }`}
                    >
                      {isSelected ? (t.isCorrect ? "✓ " : "✕ ") : "+ "}
                      {t.text}
                    </button>
                  );
                })}
              </div>

              {/* Synthesized Prompt Box */}
              <div className="p-4 rounded-xl bg-black/40 border border-white/10 text-xs font-mono text-slate-300">
                <span className="text-[#FF3CAC] font-bold">RECONSTRUCTED PROMPT: </span>
                {showFullPrompt ? (
                  <span className="text-white font-semibold">{MASTER_PROMPT}</span>
                ) : selectedTokens.length > 0 ? (
                  selectedTokens
                    .map((id) => monkeyTokens.find((t) => t.id === id)?.text)
                    .join(", ")
                ) : (
                  <span className="text-slate-500 italic">
                    Click tokens above to guess the prompt that generated the monkey image...
                  </span>
                )}
              </div>

              {/* AI Judging Meters */}
              <div className="grid grid-cols-3 gap-3 mt-4 text-[11px] font-mono text-center">
                <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/5">
                  <div className="text-slate-400">ACCURACY</div>
                  <div className="text-white font-bold text-sm mt-0.5">{clarity}%</div>
                </div>
                <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/5">
                  <div className="text-slate-400">CREATIVITY</div>
                  <div className="text-purple-300 font-bold text-sm mt-0.5">
                    {Math.min(98, clarity + 10)}%
                  </div>
                </div>
                <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/5">
                  <div className="text-slate-400">RELEVANCE</div>
                  <div className="text-cyan-300 font-bold text-sm mt-0.5">
                    {Math.min(96, clarity + 8)}%
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Qualification Indicator */}
            <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
              <div className="text-xs font-mono text-slate-400">
                ROUND 03 CUTOFF: <span className="text-white font-bold">TOP 3 ADVANCE TO FINAL</span>
              </div>

              {clarity >= 80 && (
                <div className="flex items-center gap-1.5 text-xs font-mono text-emerald-400">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>PODIUM QUALIFICATION THRESHOLD MET</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="relative z-10 max-w-6xl mx-auto w-full flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/10 pt-4 text-xs font-mono text-slate-400">
        <div className="flex items-center gap-3">
          <span className="text-[#FF3CAC]">ROUND 03 EVALUATION:</span>
          <span>OBSERVATION</span>
          <span>•</span>
          <span>PROMPT ENGINEERING</span>
          <span>•</span>
          <span>IMAGINATION</span>
        </div>

        <button
          onClick={() => {
            sound.playClick();
            onNextRound();
          }}
          className="flex items-center gap-2 text-white hover:text-[#FF3CAC] transition-colors"
        >
          <span>ENTER THE FINAL: TOP 3 WINNERS</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
}
