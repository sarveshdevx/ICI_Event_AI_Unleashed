"use client";

import React, { useState, useEffect } from "react";
import Lenis from "lenis";
import Cursor from "@/components/common/Cursor";
import Navigation from "@/components/common/Navigation";
import Hero from "@/components/sections/Hero";
import Challenge from "@/components/sections/Challenge";
import Journey from "@/components/sections/Journey";
import Round01 from "@/components/sections/Round01";
import Round02 from "@/components/sections/Round02";
import Round03 from "@/components/sections/Round03";
import Final from "@/components/sections/Final";
import Coordinates from "@/components/sections/Coordinates";
import Register from "@/components/sections/Register";
import { sound } from "@/lib/audio";

export default function Home() {
  const [currentStage, setCurrentStage] = useState<string>("intro");

  // Initialize Lenis smooth momentum scrolling
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      touchMultiplier: 1.5,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    const animId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(animId);
      lenis.destroy();
    };
  }, []);

  // Track active section on scroll
  useEffect(() => {
    const sectionIds = [
      "intro",
      "challenge",
      "journey",
      "round01",
      "round02",
      "round03",
      "final",
      "about",
      "register",
    ];

    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight * 0.4;

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el && el.offsetTop <= scrollPosition) {
          if (currentStage !== sectionIds[i]) {
            setCurrentStage(sectionIds[i]);
            sound.setStageAmbient(sectionIds[i]);
          }
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [currentStage]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <main className="relative min-h-screen bg-[#07111F] text-white">
      {/* Desktop Custom Cursor */}
      <Cursor />

      {/* Floating HUD Navigation */}
      <Navigation
        currentStage={currentStage}
        onNavigate={scrollToSection}
      />

      {/* 01 — INTRO / HERO */}
      <Hero onExplore={() => scrollToSection("challenge")} />

      {/* 02 — THE CHALLENGE */}
      <Challenge onContinue={() => scrollToSection("journey")} />

      {/* 03 — THE JOURNEY (60 → 20 → 10 → 3 ELIMINATION ENGINE) */}
      <Journey onReachFinal={() => scrollToSection("round01")} />

      {/* 04 — ROUND 01: AI QUIZ (EASY AWARENESS QUESTIONS) */}
      <Round01 onNextRound={() => scrollToSection("round02")} />

      {/* 05 — ROUND 02: HEAD-TO-HEAD SOLUTIONS */}
      <Round02 onNextRound={() => scrollToSection("round03")} />

      {/* 06 — ROUND 03: GUESS THE PROMPT (RED MONKEY HOLDING BANANA ON ROPE) */}
      <Round03 onNextRound={() => scrollToSection("final")} />

      {/* 07 — FINAL: TOP 3 WINNERS */}
      <Final onExploreAbout={() => scrollToSection("about")} />

      {/* 08 — ABOUT / 4 COORDINATES (GIONATAN NESE SPATIAL ARCHITECTURE) */}
      <Coordinates onContinue={() => scrollToSection("register")} />

      {/* 09 — REGISTER FINALE (EXACTLY 3 PLAYERS • CONFIGURABLE ICI PORTAL) */}
      <Register onJumpToSection={scrollToSection} />
    </main>
  );
}
