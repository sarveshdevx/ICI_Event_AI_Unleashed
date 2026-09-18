"use client";

import React, { useState, useEffect } from "react";
import { sound } from "@/lib/audio";
import { handleRegistrationRedirect, TEAM_SIZE_LABEL } from "@/config/registration";
import { Trophy, Award, Sparkles, Crown, ArrowRight, Star, Users } from "lucide-react";
import confetti from "canvas-confetti";

interface FinalProps {
  onExploreAbout: () => void;
}

export default function Final({ onExploreAbout }: FinalProps) {
  const [countdown, setCountdown] = useState<number>(3);
  const [isRevealed, setIsRevealed] = useState<boolean>(false);

  // Suspense Countdown: 03 -> 02 -> 01 -> Reveal
  useEffect(() => {
    if (countdown > 1) {
      const timer = setTimeout(() => {
        setCountdown((prev) => prev - 1);
        sound.playHover();
      }, 900);
      return () => clearTimeout(timer);
    } else if (countdown === 1 && !isRevealed) {
      const timer = setTimeout(() => {
        setIsRevealed(true);
        sound.playTriumph();
        try {
          confetti({
            particleCount: 80,
            spread: 90,
            origin: { y: 0.6 },
            colors: ["#FFD83D", "#FFAA00", "#FFFFFF", "#00E5FF"],
          });
        } catch {}
      }, 900);
      return () => clearTimeout(timer);
    }
  }, [countdown, isRevealed]);

  const handleCelebrateAgain = () => {
    sound.playTriumph();
    try {
      confetti({
        particleCount: 120,
        spread: 100,
        origin: { y: 0.6 },
        colors: ["#FFD83D", "#FF8A00", "#FF3CAC", "#00E5FF"],
      });
    } catch {}
  };

  const handleRegister = () => {
    sound.playClick();
    handleRegistrationRedirect();
  };

  return (
    <section
      id="final"
      className="relative w-full min-h-screen flex flex-col justify-between px-4 sm:px-8 md:px-16 py-24 bg-gradient-to-b from-[#07111F] via-[#1f1604] to-[#07111F] border-t border-[#FFD83D]/20 overflow-hidden"
    >
      {/* Background Golden Radiance */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-[#FFD83D]/10 rounded-full blur-[150px] pointer-events-none" />

      {/* Top Header */}
      <div className="relative z-10 max-w-6xl mx-auto w-full">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#FFD83D]/20 pb-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#FF8A00] via-[#FFD83D] to-yellow-200 p-[1px] flex items-center justify-center shadow-[0_0_30px_rgba(255,216,61,0.5)]">
              <div className="w-full h-full bg-[#07111F] rounded-2xl flex items-center justify-center">
                <Crown className="w-7 h-7 text-[#FFD83D] animate-bounce" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#FFD83D] tracking-widest uppercase">
                <span>THE CULMINATION</span>
                <span>•</span>
                <span className="text-white">GRAND ARENA</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white uppercase mt-0.5">
                FINAL: TOP 3 WINNERS
              </h2>
            </div>
          </div>

          <div className="hidden sm:block text-right text-xs font-mono text-amber-300">
            <div className="font-bold uppercase tracking-wider">ICI FEST 2026 TITLE</div>
            <div className="text-slate-400 italic">“Great Minds. Greater Impact!”</div>
          </div>
        </div>

        {/* Subtitle */}
        <div className="mt-8 max-w-2xl">
          <div className="inline-block px-3 py-1 rounded-md bg-[#FFD83D]/10 text-[#FFD83D] font-mono text-xs tracking-wider uppercase font-bold mb-2">
            THREE TEAMS. ONE STAGE. BIGGER POSSIBILITIES.
          </div>
          <h3 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
            WHO WILL UNLEASH THEIR INTELLIGENCE?
          </h3>
          <p className="text-xs sm:text-sm font-sans text-slate-400 mt-2 leading-relaxed">
            From 60 ambitious squads across the institute, only 3 stand atop the podium.
            Witness the final clash for the coveted AI UNLEASHED Trophy, cash rewards, and official certificates.
          </p>
        </div>
      </div>

      {/* Center Podium & Suspense Reveal */}
      <div className="relative z-10 max-w-5xl mx-auto w-full my-10">
        {!isRevealed ? (
          <div className="flex flex-col items-center justify-center p-12 text-center">
            <div className="text-xs font-mono text-[#FFD83D] tracking-widest uppercase mb-4 animate-pulse">
              CALCULATING FINALIST BRACKETS...
            </div>
            <div className="text-9xl sm:text-[12rem] font-black text-[#FFD83D] drop-shadow-[0_0_50px_rgba(255,216,61,0.6)] font-mono">
              0{countdown}
            </div>
            <div className="text-sm font-mono text-slate-400 mt-2">
              SUSPENSE PROTOCOL ACTIVE
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center animate-in zoom-in-95 duration-500">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-4xl items-end">
              {/* 2nd Place */}
              <div
                onMouseEnter={() => sound.playHover()}
                className="order-2 sm:order-1 p-6 rounded-3xl bg-gradient-to-b from-slate-800/40 to-black/60 border border-slate-400/30 text-center flex flex-col items-center backdrop-blur-xl hover:border-slate-300 transition-all group"
              >
                <div className="w-12 h-12 rounded-full bg-slate-400/20 flex items-center justify-center mb-3">
                  <Trophy className="w-6 h-6 text-slate-300" />
                </div>
                <div className="text-xs font-mono tracking-widest text-slate-400 uppercase">
                  RUNNER UP
                </div>
                <div className="text-2xl font-black text-white mt-1">TEAM 02</div>
                <div className="text-xs font-mono text-slate-400 mt-2">
                  SILVER TROPHY & CERTIFICATE
                </div>
                <div className="mt-4 px-3 py-1 rounded-full bg-white/5 text-[10px] font-mono text-slate-300">
                  FINALIST PODIUM 2
                </div>
              </div>

              {/* 1st Place Champion */}
              <div
                onMouseEnter={() => sound.playHover()}
                onClick={handleCelebrateAgain}
                data-cursor="CONGRATS"
                className="order-1 sm:order-2 p-8 rounded-3xl bg-gradient-to-b from-amber-500/20 via-yellow-500/10 to-black/80 border-2 border-[#FFD83D] text-center flex flex-col items-center backdrop-blur-xl shadow-[0_0_50px_rgba(255,216,61,0.35)] -translate-y-4 hover:scale-105 transition-all group cursor-pointer"
              >
                <div className="w-16 h-16 rounded-full bg-[#FFD83D]/20 flex items-center justify-center mb-3 group-hover:rotate-12 transition-transform shadow-[0_0_20px_rgba(255,216,61,0.6)]">
                  <Crown className="w-9 h-9 text-[#FFD83D]" />
                </div>
                <div className="text-xs font-mono tracking-widest text-[#FFD83D] uppercase font-bold">
                  CHAMPION OF AI UNLEASHED
                </div>
                <div className="text-3xl sm:text-4xl font-black text-white mt-1 drop-shadow-md">
                  TEAM 01
                </div>
                <div className="text-xs font-mono text-amber-200 mt-2">
                  GRAND PRIZE & WINNER CERTIFICATE
                </div>
                <div className="mt-5 px-4 py-1.5 rounded-full bg-[#FFD83D] text-[#07111F] text-xs font-black uppercase tracking-wider flex items-center gap-1.5 shadow-lg">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <span>PODIUM CHAMPION</span>
                </div>
              </div>

              {/* 3rd Place */}
              <div
                onMouseEnter={() => sound.playHover()}
                className="order-3 p-6 rounded-3xl bg-gradient-to-b from-amber-950/30 to-black/60 border border-amber-600/30 text-center flex flex-col items-center backdrop-blur-xl hover:border-amber-500 transition-all group"
              >
                <div className="w-12 h-12 rounded-full bg-amber-600/20 flex items-center justify-center mb-3">
                  <Trophy className="w-6 h-6 text-amber-500" />
                </div>
                <div className="text-xs font-mono tracking-widest text-amber-500 uppercase">
                  2ND RUNNER UP
                </div>
                <div className="text-2xl font-black text-white mt-1">TEAM 03</div>
                <div className="text-xs font-mono text-amber-400 mt-2">
                  BRONZE TROPHY & CERTIFICATE
                </div>
                <div className="mt-4 px-3 py-1 rounded-full bg-white/5 text-[10px] font-mono text-slate-300">
                  FINALIST PODIUM 3
                </div>
              </div>
            </div>

            {/* Official Rewards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 w-full max-w-4xl text-center text-xs font-mono">
              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/10">
                <div className="text-[#FFD83D] font-bold">EXCITING PRIZES</div>
                <div className="text-slate-400 mt-0.5">Cash rewards & hardware kits for top rankers</div>
              </div>
              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/10">
                <div className="text-emerald-400 font-bold">WINNING CERTIFICATES</div>
                <div className="text-slate-400 mt-0.5">Prestigious ICI Fest honor for the winning teams</div>
              </div>
              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/10">
                <div className="text-cyan-400 font-bold">PARTICIPATION CREDENTIALS</div>
                <div className="text-slate-400 mt-0.5">Certificates for all eligible competing members</div>
              </div>
            </div>

            {/* Direct Register Call to Action */}
            <div className="mt-10 flex flex-col items-center gap-3">
              <div className="flex flex-wrap items-center justify-center gap-4">
                <button
                  onClick={handleRegister}
                  onMouseEnter={() => sound.playHover()}
                  data-cursor="REGISTER"
                  className="px-8 py-4 rounded-full bg-gradient-to-r from-[#FFD83D] via-[#FF8A00] to-[#FF5A5F] text-[#07111F] font-black text-sm uppercase tracking-widest hover:scale-105 transition-all shadow-[0_0_35px_rgba(255,216,61,0.5)]"
                >
                  [ REGISTER YOUR TEAM ]
                </button>

                <button
                  onClick={handleCelebrateAgain}
                  className="px-6 py-4 rounded-full border border-white/20 hover:border-white text-white text-xs font-mono uppercase tracking-wider transition-colors"
                >
                  CONFETTI CELEBRATION ✨
                </button>
              </div>

              <div className="text-xs font-mono text-amber-300 flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5" />
                <span>REQUIREMENT: {TEAM_SIZE_LABEL}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <div className="relative z-10 max-w-6xl mx-auto w-full flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/10 pt-4 text-xs font-mono text-slate-400">
        <div>SWAMI KESHVANAND INSTITUTE OF TECHNOLOGY, MANAGEMENT & GRAMOTHAN</div>

        <button
          onClick={() => {
            sound.playClick();
            onExploreAbout();
          }}
          className="flex items-center gap-2 text-white hover:text-[#FFD83D] transition-colors"
        >
          <span>EXPLORE ABOUT // 4 COORDINATES</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
}
