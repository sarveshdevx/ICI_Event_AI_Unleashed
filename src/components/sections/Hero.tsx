"use client";

import React, { useEffect, useRef } from "react";
import { sound } from "@/lib/audio";
import { handleRegistrationRedirect, TEAM_SIZE_LABEL, TEAM_SIZE_RULE } from "@/config/registration";
import { ArrowDown, Cpu, Sparkles, Brain, Zap, Users } from "lucide-react";

interface HeroProps {
  onExplore: () => void;
  onOpenRegister?: () => void;
}

export default function Hero({ onExplore }: HeroProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef<{ x: number; y: number; targetX: number; targetY: number }>({
    x: 0.5,
    y: 0.5,
    targetX: 0.5,
    targetY: 0.5,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const onResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", onResize);

    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current.targetX = e.clientX / window.innerWidth;
      mouseRef.current.targetY = e.clientY / window.innerHeight;
    };
    window.addEventListener("mousemove", onMouseMove, { passive: true });

    // Abstract organic visual bodies behind typography
    interface Orb {
      x: number;
      y: number;
      baseX: number;
      baseY: number;
      radius: number;
      color: string;
      speed: number;
      phase: number;
    }

    const orbs: Orb[] = [
      { x: 0.35, y: 0.45, baseX: 0.35, baseY: 0.45, radius: 240, color: "rgba(8, 123, 255, 0.45)", speed: 0.0012, phase: 0 },
      { x: 0.65, y: 0.4, baseX: 0.65, baseY: 0.4, radius: 260, color: "rgba(0, 229, 255, 0.35)", speed: 0.0016, phase: 2 },
      { x: 0.5, y: 0.6, baseX: 0.5, baseY: 0.6, radius: 290, color: "rgba(139, 61, 255, 0.38)", speed: 0.0009, phase: 4 },
      { x: 0.75, y: 0.65, baseX: 0.75, baseY: 0.65, radius: 190, color: "rgba(255, 60, 172, 0.3)", speed: 0.0014, phase: 1 },
      { x: 0.25, y: 0.6, baseX: 0.25, baseY: 0.6, radius: 180, color: "rgba(255, 138, 0, 0.22)", speed: 0.0018, phase: 3 },
    ];

    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      color: string;
    }

    const particles: Particle[] = Array.from({ length: 45 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      size: Math.random() * 2 + 1,
      color: Math.random() > 0.5 ? "#00E5FF" : "#8B3DFF",
    }));

    let time = 0;

    const render = () => {
      time += 1;

      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

      ctx.fillStyle = "#07111F";
      ctx.fillRect(0, 0, width, height);

      ctx.save();
      ctx.globalCompositeOperation = "screen";

      orbs.forEach((orb) => {
        const offsetX = Math.sin(time * orb.speed + orb.phase) * 60 + (mouseRef.current.x - 0.5) * 100;
        const offsetY = Math.cos(time * orb.speed + orb.phase) * 60 + (mouseRef.current.y - 0.5) * 80;

        const cx = orb.baseX * width + offsetX;
        const cy = orb.baseY * height + offsetY;

        const grad = ctx.createRadialGradient(cx, cy, 10, cx, cy, orb.radius);
        grad.addColorStop(0, orb.color);
        grad.addColorStop(0.6, orb.color.replace(/[\d\.]+\)$/, "0.1)"));
        grad.addColorStop(1, "transparent");

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(cx, cy, orb.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.restore();

      ctx.save();
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (dist < 110) {
            ctx.strokeStyle = `rgba(0, 229, 255, ${0.18 * (1 - dist / 110)})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }

        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  const handleRegister = () => {
    sound.playClick();
    handleRegistrationRedirect();
  };

  return (
    <section
      id="intro"
      className="relative w-full min-h-screen flex flex-col justify-between overflow-hidden px-4 sm:px-8 md:px-16 pt-24 pb-8 select-none"
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-85"
      />

      {/* Top Telemetry Duality Bar */}
      <div className="relative z-10 w-full max-w-6xl mx-auto flex items-center justify-between border-b border-white/10 pb-3 text-[10px] sm:text-xs font-mono uppercase tracking-widest text-slate-400">
        <div className="flex items-center gap-2 text-cyan-400">
          <Brain className="w-4 h-4 animate-pulse" />
          <span className="hidden sm:inline">HUMAN MIND //</span>
          <span>IDEAS • LOGIC • PEOPLE</span>
        </div>
        <div className="flex items-center gap-2 text-purple-400">
          <span>ARTIFICIAL INTELLIGENCE • TOMORROW</span>
          <span className="hidden sm:inline">// MACHINE</span>
          <Cpu className="w-4 h-4 animate-pulse" />
        </div>
      </div>

      {/* Center Cinematic Typography */}
      <div className="relative z-10 w-full max-w-6xl mx-auto my-auto py-8 text-center flex flex-col items-center justify-center">
        {/* Event Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/15 backdrop-blur-md text-[11px] sm:text-xs font-mono tracking-widest text-white mb-4 sm:mb-6">
          <Sparkles className="w-3.5 h-3.5 text-[#00E5FF]" />
          <span>ICI FEST 2026 PRESENTATION</span>
          <span className="text-[#00E5FF]">•</span>
          <span className="text-[#00E5FF] font-bold">OCTOBER 12–17</span>
        </div>

        {/* Massive AI UNLEASHED Heading */}
        <div className="relative flex flex-col items-center justify-center leading-none">
          <h1 className="text-7xl sm:text-9xl md:text-[12rem] lg:text-[14rem] font-black tracking-tighter uppercase select-none">
            <span className="text-transparent bg-clip-text bg-gradient-to-br from-[#087BFF] via-[#00E5FF] to-cyan-300 drop-shadow-[0_0_45px_rgba(0,229,255,0.4)]">
              AI
            </span>
          </h1>

          <div className="text-5xl sm:text-8xl md:text-[8rem] lg:text-[10rem] font-black tracking-tight text-white uppercase -mt-4 sm:-mt-10 md:-mt-16 drop-shadow-[0_0_60px_rgba(255,255,255,0.3)]">
            UNLEASHED
          </div>
        </div>

        {/* Tagline & Supporting Line */}
        <div className="mt-4 sm:mt-8 flex flex-col items-center gap-2 max-w-3xl">
          <p className="text-lg sm:text-2xl md:text-3xl font-extrabold tracking-widest uppercase text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-white to-purple-400">
            CHALLENGE THE INTELLIGENCE
          </p>

          <p className="text-xs sm:text-sm md:text-base font-mono tracking-widest text-slate-300 uppercase">
            HUMAN MINDS <span className="text-[#00E5FF]">|</span> TECH SKILLS <span className="text-[#8B3DFF]">|</span> LIMITLESS POSSIBILITIES
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mt-3 px-4 py-1.5 rounded-lg bg-black/40 border border-white/10 text-xs font-mono text-cyan-300">
            <span>60 TEAMS</span>
            <span>•</span>
            <span>3 ROUNDS</span>
            <span>•</span>
            <span className="text-amber-300 font-bold flex items-center gap-1">
              <Users className="w-3.5 h-3.5" />
              {TEAM_SIZE_RULE}
            </span>
          </div>
        </div>

        {/* Action CTAs */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={handleRegister}
            onMouseEnter={() => sound.playHover()}
            data-cursor="REGISTER"
            className="group relative px-8 py-4 rounded-full bg-gradient-to-r from-[#087BFF] via-[#00E5FF] to-[#8B3DFF] text-[#07111F] font-black text-sm uppercase tracking-widest transition-all duration-300 hover:scale-105 shadow-[0_0_35px_rgba(0,229,255,0.5)]"
          >
            <span className="relative z-10 flex items-center gap-2">
              <Zap className="w-4 h-4 fill-current" />
              <span>[ REGISTER YOUR TEAM ]</span>
            </span>
          </button>

          <button
            onClick={() => {
              sound.playClick();
              onExplore();
            }}
            onMouseEnter={() => sound.playHover()}
            data-cursor="EXPLORE"
            className="px-8 py-4 rounded-full border border-white/20 hover:border-[#00E5FF] hover:bg-[#00E5FF]/10 text-white font-mono text-sm tracking-wider uppercase backdrop-blur-md transition-all duration-300"
          >
            ENTER THE EXPERIENCE ↓
          </button>
        </div>
      </div>

      {/* Bottom Information Ribbon */}
      <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/10 pt-4 text-[11px] font-mono text-slate-400">
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span className="text-white font-bold">{TEAM_SIZE_LABEL}</span>
          <span className="text-slate-600">|</span>
          <span>VENUE: CIVIL DEPT, SKIT JAIPUR</span>
        </div>

        <button
          onClick={onExplore}
          className="flex items-center gap-2 text-cyan-400 hover:text-white transition-colors group"
        >
          <span>SCROLL TO ADVANCE</span>
          <ArrowDown className="w-3.5 h-3.5 group-hover:translate-y-1 transition-transform" />
        </button>
      </div>
    </section>
  );
}
