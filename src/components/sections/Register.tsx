"use client";

import React from "react";
import { sound } from "@/lib/audio";
import {
  TEAM_SIZE_LABEL,
  TEAM_SIZE_RULE,
  handleRegistrationRedirect,
} from "@/config/registration";
import {
  Zap,
  Sparkles,
  MapPin,
  Calendar,
  Users,
  Phone,
  ArrowUpRight,
} from "lucide-react";

interface RegisterProps {
  onJumpToSection: (id: string) => void;
}

export default function Register({ onJumpToSection }: RegisterProps) {
  const handleRegisterClick = () => {
    sound.playClick();
    handleRegistrationRedirect();
  };

  return (
    <section
      id="register"
      className="relative w-full min-h-screen flex flex-col justify-between px-4 sm:px-8 md:px-16 py-24 bg-gradient-to-b from-[#07111F] via-[#0b172a] to-[#040810] border-t border-white/10 overflow-hidden"
    >
      {/* Complete Palette Chromatic Convergence Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[850px] rounded-full blur-[180px] pointer-events-none opacity-25 bg-gradient-to-tr from-[#087BFF] via-[#FF3CAC] to-[#FFD83D]" />

      {/* Top Banner */}
      <div className="relative z-10 max-w-6xl mx-auto w-full border-b border-white/10 pb-6 flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs font-mono text-[#00E5FF] tracking-widest uppercase">
          <Sparkles className="w-4 h-4" />
          <span>STAGE 09 // REGISTRATION PORTAL</span>
        </div>
        <div className="text-xs font-mono text-amber-300 font-bold tracking-wider uppercase">
          {TEAM_SIZE_LABEL}
        </div>
      </div>

      {/* Center Cinematic Call To Action */}
      <div className="relative z-10 max-w-5xl mx-auto w-full my-auto text-center flex flex-col items-center py-10">
        <div className="text-xs sm:text-sm font-mono tracking-widest text-[#00E5FF] uppercase font-bold mb-3">
          ARE YOU PREPARED TO CHALLENGE THE INTELLIGENCE?
        </div>

        {/* Powerful Callout Typography */}
        <div className="flex flex-col items-center leading-none select-none">
          <h2 className="text-6xl sm:text-8xl md:text-9xl font-black tracking-tighter uppercase text-slate-300">
            READY?
          </h2>
          <h2 className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tighter uppercase text-slate-400 -mt-2">
            THEN
          </h2>
          <h2 className="text-7xl sm:text-9xl md:text-[11rem] font-black tracking-tighter uppercase text-transparent bg-clip-text bg-gradient-to-r from-[#00E5FF] via-[#8B3DFF] via-[#FF3CAC] via-[#FF8A00] to-[#FFD83D] -mt-2 drop-shadow-[0_0_60px_rgba(0,229,255,0.4)]">
            STEP IN.
          </h2>
        </div>

        {/* CRITICAL TEAM RULE CALLOUT */}
        <div className="mt-8 px-6 py-3.5 rounded-2xl bg-amber-500/10 border-2 border-amber-400/60 text-amber-300 shadow-[0_0_30px_rgba(251,191,36,0.2)] max-w-md w-full">
          <div className="flex items-center justify-center gap-2 text-xs font-mono tracking-widest uppercase font-black">
            <Users className="w-4 h-4 text-amber-400" />
            <span>OFFICIAL TEAM RULE:</span>
          </div>
          <div className="text-xl sm:text-2xl font-black tracking-wider uppercase text-white mt-0.5">
            EXACTLY 3 PLAYERS
          </div>
          <div className="text-[11px] font-mono text-amber-200/80 mt-0.5">
            1 LEADER + 2 MEMBERS • STRICTLY ENFORCED
          </div>
        </div>

        {/* Event Key Parameters */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mt-6 text-xs font-mono text-slate-300">
          <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-950/60 border border-[#00E5FF]/40 text-[#00E5FF] shadow-[0_0_15px_rgba(0,229,255,0.2)]">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-bold">CAPACITY: 60 TEAMS</span>
            <span className="text-slate-500">|</span>
            <span className="text-slate-300">LIMITED SLOTS</span>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/10">
            <Zap className="w-3.5 h-3.5 text-[#FF5A5F]" />
            <span>3 PROGRESSIVE ROUNDS</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/10">
            <Calendar className="w-3.5 h-3.5 text-[#FFD83D]" />
            <span>12–17 OCT 2026</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/10">
            <MapPin className="w-3.5 h-3.5 text-emerald-400" />
            <span>CIVIL DEPT, SKIT</span>
          </div>
        </div>

        {/* Primary Action Button (Opens External ICI Portal) */}
        <div className="mt-9 flex flex-col items-center gap-3">
          <button
            onClick={handleRegisterClick}
            onMouseEnter={() => sound.playHover()}
            data-cursor="REGISTER"
            className="group relative px-10 py-5 rounded-full bg-gradient-to-r from-[#087BFF] via-[#8B3DFF] via-[#FF3CAC] to-[#FFD83D] text-[#07111F] font-black text-base uppercase tracking-widest transition-all duration-300 hover:scale-105 shadow-[0_0_50px_rgba(0,229,255,0.6)] cursor-pointer"
          >
            <span className="relative z-10 flex items-center gap-3">
              <Zap className="w-5 h-5 fill-current" />
              <span>[ REGISTER YOUR TEAM ]</span>
              <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          </button>

          <div className="text-[11px] font-mono text-slate-400">
            OFFICIAL ICI PORTAL • REDIRECTS IN NEW TAB
          </div>
        </div>

        {/* Coordinator Helpdesk Contact Card */}
        <div className="mt-10 sm:mt-12 p-6 sm:p-7 rounded-2xl bg-white/[0.02] border border-white/10 max-w-xl w-full text-left backdrop-blur-md">
          <div className="text-[11px] font-mono font-bold text-slate-400 uppercase mb-3 flex items-center justify-between">
            <span>STUDENT COORDINATORS // AI DEPT</span>
            <span className="text-emerald-400 font-mono">CONTACT</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono text-slate-300">
            <div className="flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-cyan-400" />
              <span>Sarvesh Sharma: 7014502018</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-purple-400" />
              <span>Jatin Panchal: 9244945532</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-rose-400" />
              <span>Shyama Ojha: 9341435764</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-amber-400" />
              <span>Yachi Gupta: 8209543350</span>
            </div>
          </div>
        </div>
      </div>

      {/* Official Poster Slogan Footer Anchor */}
      <div className="relative z-10 max-w-6xl mx-auto w-full border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-400">
        <div className="text-center sm:text-left">
          <span className="text-white font-bold tracking-widest uppercase">
            IDEAS TODAY. A SMARTER TOMORROW.
          </span>
          <span className="mx-2 text-slate-600">•</span>
          <span>ICI COMMITTEE, SKIT JAIPUR</span>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => onJumpToSection("intro")}
            className="hover:text-cyan-400 transition-colors"
          >
            TOP ↑
          </button>
          <button
            onClick={() => onJumpToSection("about")}
            className="hover:text-white transition-colors"
          >
            ABOUT
          </button>
          <button
            onClick={() => onJumpToSection("journey")}
            className="hover:text-white transition-colors"
          >
            THE JOURNEY
          </button>
        </div>
      </div>
    </section>
  );
}
