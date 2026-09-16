"use client";

import React, { useState } from "react";
import { sound } from "@/lib/audio";
import { handleRegistrationRedirect } from "@/config/registration";
import { Volume2, VolumeX, Menu, X, ArrowUpRight, Sparkles, ExternalLink } from "lucide-react";

interface NavigationProps {
  currentStage: string;
  onNavigate: (sectionId: string) => void;
}

export default function Navigation({
  currentStage,
  onNavigate,
}: NavigationProps) {
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const toggleSound = () => {
    const muted = sound.toggleMute();
    setIsMuted(muted);
  };

  const getStageDisplay = () => {
    switch (currentStage) {
      case "intro":
        return { label: "ICI FEST 2026", sub: "START JOURNEY", badge: "00", color: "text-[#00E5FF]" };
      case "challenge":
        return { label: "THE CHALLENGE", sub: "HUMAN VS MACHINE", badge: "01", color: "text-[#087BFF]" };
      case "journey":
        return { label: "60 → 20 → 10 → 3", sub: "ELIMINATION ENGINE", badge: "JOURNEY", color: "text-[#00E5FF]" };
      case "round01":
        return { label: "ROUND 01 / 03", sub: "AI QUIZ (60 → 20)", badge: "R-01", color: "text-[#00E5FF]" };
      case "round02":
        return { label: "ROUND 02 / 03", sub: "HEAD-TO-HEAD (20 → 10)", badge: "R-02", color: "text-[#FF5A5F]" };
      case "round03":
        return { label: "ROUND 03 / 03", sub: "GUESS THE PROMPT (10 → 3)", badge: "R-03", color: "text-[#FF3CAC]" };
      case "final":
        return { label: "THE FINAL", sub: "TOP 3 WINNERS", badge: "WINNERS", color: "text-[#FFD83D]" };
      case "about":
        return { label: "SPATIAL CANVAS", sub: "4 COORDINATES", badge: "ABOUT", color: "text-white" };
      case "register":
        return { label: "REGISTER", sub: "3 PLAYERS PER TEAM", badge: "ACTIVATE", color: "text-[#B7F34A]" };
      default:
        return { label: "ROUND 01 / 03", sub: "AI UNLEASHED", badge: "R-01", color: "text-[#00E5FF]" };
    }
  };

  const stage = getStageDisplay();

  const navLinks = [
    { id: "intro", label: "00 // INTRO", desc: "Human vs Machine Duality", color: "hover:text-[#00E5FF]" },
    { id: "challenge", label: "01 // THE CHALLENGE", desc: "Can humans outthink machines?", color: "hover:text-[#087BFF]" },
    { id: "journey", label: "02 // THE JOURNEY", desc: "60 → 20 → 10 → 3 Elimination", color: "hover:text-[#00E5FF]" },
    { id: "round01", label: "03 // ROUND 01: AI QUIZ", desc: "60 Teams → Top 20", color: "hover:text-[#00E5FF]" },
    { id: "round02", label: "04 // ROUND 02: HEAD-TO-HEAD", desc: "20 Teams → Top 10", color: "hover:text-[#FF5A5F]" },
    { id: "round03", label: "05 // ROUND 03: GUESS THE PROMPT", desc: "10 Teams → Top 3", color: "hover:text-[#FF3CAC]" },
    { id: "final", label: "06 // FINAL: TOP 3 WINNERS", desc: "Three Teams. One Stage.", color: "hover:text-[#FFD83D]" },
    { id: "about", label: "07 // ABOUT: 4 COORDINATES", desc: "Spatial Radar & Event Dossier", color: "hover:text-white" },
    { id: "register", label: "08 // REGISTRATION", desc: "Official ICI Portal Redirect", color: "hover:text-[#B7F34A]" },
  ];

  const handleLinkClick = (id: string) => {
    sound.playClick();
    setIsMenuOpen(false);
    onNavigate(id);
  };

  const handleRegisterClick = () => {
    sound.playClick();
    handleRegistrationRedirect();
  };

  return (
    <>
      {/* Top Floating HUD Bar */}
      <header className="fixed top-4 md:top-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-6xl pointer-events-auto">
        <nav
          className="flex items-center justify-between px-4 sm:px-6 py-2.5 sm:py-3 rounded-full bg-[#07111F]/80 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.5)] transition-all duration-300"
          aria-label="Main Navigation"
        >
          {/* Logo / Brand */}
          <button
            onClick={() => handleLinkClick("intro")}
            onMouseEnter={() => sound.playHover()}
            data-cursor="EXPLORE"
            className="flex items-center gap-2 group text-left"
          >
            <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-[#087BFF] via-[#00E5FF] to-[#8B3DFF] flex items-center justify-center p-[1px] group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-[#07111F] rounded-full flex items-center justify-center">
                <Sparkles className="w-3.5 h-3.5 text-[#00E5FF] group-hover:rotate-12 transition-transform" />
              </div>
            </div>
            <div>
              <span className="text-xs sm:text-sm font-black tracking-wider text-white">
                AI <span className="text-[#00E5FF]">UNLEASHED</span>
              </span>
              <span className="hidden sm:block text-[9px] font-mono tracking-widest text-slate-400">
                ICI FEST 2026
              </span>
            </div>
          </button>

          {/* Dynamic Live Stage Indicator */}
          <div className="flex items-center gap-2.5 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono">
            <span className="w-2 h-2 rounded-full bg-[#00E5FF] animate-pulse" />
            <div className="flex items-center gap-2">
              <span className={`font-bold tracking-wider ${stage.color}`}>
                {stage.label}
              </span>
              <span className="hidden md:inline text-slate-500">•</span>
              <span className="hidden md:inline text-slate-300 text-[11px]">
                {stage.sub}
              </span>
            </div>
          </div>

          {/* Right Action Cluster: Sound, Register CTA, and Menu */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Ambient Sound Toggle */}
            <button
              onClick={toggleSound}
              onMouseEnter={() => sound.playHover()}
              data-cursor="SOUND"
              aria-label={isMuted ? "Enable Ambient Audio" : "Mute Ambient Audio"}
              className={`p-2 rounded-full border transition-all duration-200 ${
                !isMuted
                  ? "border-[#00E5FF] text-[#00E5FF] bg-[#00E5FF]/10 shadow-[0_0_12px_rgba(0,229,255,0.4)]"
                  : "border-white/10 text-slate-400 hover:text-white hover:border-white/30 bg-white/[0.02]"
              }`}
              title={isMuted ? "Unmute generative audio" : "Mute audio"}
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>

            {/* Register CTA Button (Redirects to official ICI portal) */}
            <button
              onClick={handleRegisterClick}
              onMouseEnter={() => sound.playHover()}
              data-cursor="REGISTER"
              className="relative group overflow-hidden px-3.5 sm:px-5 py-1.5 sm:py-2 rounded-full bg-gradient-to-r from-[#087BFF] to-[#00E5FF] text-[#07111F] font-bold text-xs tracking-wider uppercase transition-all duration-300 hover:scale-105 shadow-[0_0_20px_rgba(0,229,255,0.4)]"
            >
              <span className="relative z-10 flex items-center gap-1.5">
                <span>Register</span>
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
              <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity" />
            </button>

            {/* Menu Trigger */}
            <button
              onClick={() => {
                sound.playClick();
                setIsMenuOpen(!isMenuOpen);
              }}
              onMouseEnter={() => sound.playHover()}
              data-cursor="MENU"
              aria-label="Toggle Navigation Menu"
              className="p-2 rounded-full border border-white/10 hover:border-white/30 text-white bg-white/[0.04] transition-all"
            >
              {isMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </nav>
      </header>

      {/* Fullscreen Overlay Index Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[#07111F]/95 backdrop-blur-2xl flex flex-col justify-between p-6 sm:p-12 lg:p-16 animate-in fade-in duration-200">
          <div className="flex items-center justify-between border-b border-white/10 pb-6">
            <div className="text-xs font-mono text-[#00E5FF] tracking-widest uppercase">
              INDEX // NAVIGATION MATRIX
            </div>
            <button
              onClick={() => setIsMenuOpen(false)}
              className="text-xs font-mono text-slate-400 hover:text-white flex items-center gap-1"
            >
              CLOSE [ESC]
            </button>
          </div>

          {/* Links Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-auto max-w-6xl mx-auto w-full">
            {navLinks.map((item) => (
              <button
                key={item.id}
                onClick={() => handleLinkClick(item.id)}
                onMouseEnter={() => sound.playHover()}
                data-cursor="JUMP"
                className="group text-left p-4 rounded-xl border border-white/5 hover:border-white/20 bg-white/[0.01] hover:bg-white/[0.04] transition-all duration-200"
              >
                <div className={`text-base sm:text-lg font-black tracking-tight text-white transition-colors ${item.color}`}>
                  {item.label}
                </div>
                <div className="text-xs font-mono text-slate-400 mt-1">
                  {item.desc}
                </div>
              </button>
            ))}
          </div>

          {/* Menu Bottom Footer */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/10 pt-6 text-xs font-mono text-slate-400">
            <div>
              SWAMI KESHVANAND INSTITUTE OF TECHNOLOGY · JAIPUR
            </div>
            <div className="text-[#00E5FF]">
              OCTOBER 12–17, 2026 · CIVIL DEPT
            </div>
          </div>
        </div>
      )}
    </>
  );
}
