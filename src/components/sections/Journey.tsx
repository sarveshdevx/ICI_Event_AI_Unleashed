"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { sound } from "@/lib/audio";
import { Play, Pause, RotateCcw, ChevronRight, Sparkles, Activity } from "lucide-react";

interface TeamNode {
  id: number;
  name: string;
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  vx: number;
  vy: number;
  status: "active" | "eliminated" | "survived";
  glow: string;
  radius: number;
  targetRadius: number;
  pairIndex?: number;
  clusterIndex?: number;
}

interface JourneyProps {
  onReachFinal: () => void;
}

export default function Journey({ onReachFinal }: JourneyProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [activeStep, setActiveStep] = useState<number>(0); // 0: 60, 1: 20, 2: 10, 3: 3
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [hoveredNode, setHoveredNode] = useState<{ id: number; name: string; score: number } | null>(null);

  const steps = [
    {
      count: 60,
      label: "INITIAL COHORT",
      sub: "60 TEAMS ENTER",
      desc: "All participating teams report at the Civil Dept arena. Raw AI awareness and diverse technical backgrounds.",
      colorHex: "#00E5FF",
      accent: "ELECTRIC CYAN",
      roundText: "THE STARTING ARENA",
      quote: "Many Teams. One Goal.",
    },
    {
      count: 20,
      label: "ROUND 01 QUALIFIERS",
      sub: "60 → 20 TEAMS ADVANCE",
      desc: "40 teams eliminated in the speed & accuracy AI Quiz. 20 highest-scoring squads reorganize into 10 duel brackets.",
      colorHex: "#087BFF",
      accent: "ELECTRIC BLUE",
      roundText: "ROUND 01 // AI QUIZ CUTOFF",
      quote: "Know. Think. Advance.",
    },
    {
      count: 10,
      label: "ROUND 02 SURVIVORS",
      sub: "20 → 10 HEAD-TO-HEAD WINNERS",
      desc: "10 high-stakes direct clashes. AI-assisted judging compares practicality and feasibility. 10 winning teams stand out.",
      colorHex: "#FF5A5F",
      accent: "CORAL RED",
      roundText: "ROUND 02 // HEAD-TO-HEAD DUELS",
      quote: "Solve. Compare. Stand Out.",
    },
    {
      count: 3,
      label: "ROUND 03 FINALISTS",
      sub: "10 → 3 FINALISTS TO PODIUM",
      desc: "Guess the Prompt mystery. 7 teams fall short; 3 elite teams qualify for the Grand Final stage.",
      colorHex: "#FFD83D",
      accent: "GOLDEN TRIUMPH",
      roundText: "ROUND 03 // GUESS THE PROMPT",
      quote: "Imagine. Decode. Be Creative.",
    },
  ];

  const nodesRef = useRef<TeamNode[]>([]);

  // Initialize 60 nodes
  const initNodes = useCallback((width: number, height: number) => {
    const nodes: TeamNode[] = [];
    for (let i = 0; i < 60; i++) {
      nodes.push({
        id: i + 1,
        name: `TEAM ${String(i + 1).padStart(2, "0")}`,
        x: width / 2 + (Math.random() - 0.5) * (width * 0.7),
        y: height / 2 + (Math.random() - 0.5) * (height * 0.6),
        targetX: width / 2,
        targetY: height / 2,
        vx: 0,
        vy: 0,
        status: "active",
        glow: "#00E5FF",
        radius: 4,
        targetRadius: 4,
      });
    }
    nodesRef.current = nodes;
  }, []);

  // Update target positions based on step
  const updateNodeTargets = useCallback((step: number, width: number, height: number) => {
    const nodes = nodesRef.current;
    if (nodes.length === 0) return;

    if (step === 0) {
      // 60 Teams in an expansive organic neural cloud
      const cols = 10;
      const rows = 6;
      const startX = width * 0.18;
      const endX = width * 0.82;
      const startY = height * 0.22;
      const endY = height * 0.78;

      nodes.forEach((n, i) => {
        const c = i % cols;
        const r = Math.floor(i / cols);
        const gx = startX + (c / (cols - 1)) * (endX - startX);
        const gy = startY + (r / (rows - 1)) * (endY - startY);
        n.targetX = gx + (Math.random() - 0.5) * 35;
        n.targetY = gy + (Math.random() - 0.5) * 35;
        n.status = "active";
        n.glow = "#00E5FF";
        n.targetRadius = 5;
      });
    } else if (step === 1) {
      // 20 Teams remain (40 dissolve outward)
      // Top 20 form 10 paired clusters in the center
      nodes.forEach((n, i) => {
        if (i < 20) {
          n.status = "survived";
          n.glow = "#087BFF";
          n.targetRadius = 7;
          // Arrange in 2 circles or 10 pairs
          const pairIdx = Math.floor(i / 2);
          const isLeft = i % 2 === 0;
          const angle = (pairIdx / 10) * Math.PI * 2;
          const radius = Math.min(width, height) * 0.28;
          const centerX = width / 2 + Math.cos(angle) * radius;
          const centerY = height / 2 + Math.sin(angle) * radius;

          n.targetX = centerX + (isLeft ? -18 : 18);
          n.targetY = centerY;
        } else {
          n.status = "eliminated";
          n.targetRadius = 1.5;
          // Disperse toward edges
          const angle = Math.random() * Math.PI * 2;
          const dist = Math.max(width, height) * 0.65;
          n.targetX = width / 2 + Math.cos(angle) * dist;
          n.targetY = height / 2 + Math.sin(angle) * dist;
        }
      });
    } else if (step === 2) {
      // 10 Teams remain (10 winners from each pair)
      nodes.forEach((n, i) => {
        if (i < 10) {
          n.status = "survived";
          n.glow = "#FF5A5F";
          n.targetRadius = 9;
          // Decagon ring
          const angle = (i / 10) * Math.PI * 2;
          const radius = Math.min(width, height) * 0.22;
          n.targetX = width / 2 + Math.cos(angle) * radius;
          n.targetY = height / 2 + Math.sin(angle) * radius;
        } else {
          n.status = "eliminated";
          n.targetRadius = 1;
          const angle = (i / 50) * Math.PI * 2;
          n.targetX = width / 2 + Math.cos(angle) * (Math.max(width, height) * 0.7);
          n.targetY = height / 2 + Math.sin(angle) * (Math.max(width, height) * 0.7);
        }
      });
    } else if (step === 3) {
      // 3 Finalists remain (Podium formation)
      nodes.forEach((n, i) => {
        if (i === 0) {
          // 1st podium center top
          n.status = "survived";
          n.glow = "#FFD83D";
          n.targetRadius = 16;
          n.targetX = width / 2;
          n.targetY = height / 2 - 45;
        } else if (i === 1) {
          // 2nd podium left
          n.status = "survived";
          n.glow = "#FF8A00";
          n.targetRadius = 13;
          n.targetX = width / 2 - 140;
          n.targetY = height / 2 + 35;
        } else if (i === 2) {
          // 3rd podium right
          n.status = "survived";
          n.glow = "#FF3CAC";
          n.targetRadius = 13;
          n.targetX = width / 2 + 140;
          n.targetY = height / 2 + 45;
        } else {
          n.status = "eliminated";
          n.targetRadius = 0.5;
          const angle = Math.random() * Math.PI * 2;
          n.targetX = width / 2 + Math.cos(angle) * (Math.max(width, height) * 0.8);
          n.targetY = height / 2 + Math.sin(angle) * (Math.max(width, height) * 0.8);
        }
      });
    }
  }, []);

  // Canvas loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 650);

    const onResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
      updateNodeTargets(activeStep, width, height);
    };

    window.addEventListener("resize", onResize);
    initNodes(width, height);
    updateNodeTargets(activeStep, width, height);

    const render = () => {
      ctx.fillStyle = "#07111F";
      ctx.fillRect(0, 0, width, height);

      const nodes = nodesRef.current;

      // Draw connective web between active/survived nodes
      ctx.save();
      const activeNodes = nodes.filter((n) => n.status !== "eliminated");
      for (let i = 0; i < activeNodes.length; i++) {
        for (let j = i + 1; j < activeNodes.length; j++) {
          const n1 = activeNodes[i];
          const n2 = activeNodes[j];
          const dist = Math.hypot(n1.x - n2.x, n1.y - n2.y);
          const maxDist = activeStep === 0 ? 110 : activeStep === 1 ? 95 : 180;

          if (dist < maxDist) {
            ctx.strokeStyle = `rgba(255, 255, 255, ${0.12 * (1 - dist / maxDist)})`;
            ctx.lineWidth = 0.7;
            ctx.beginPath();
            ctx.moveTo(n1.x, n1.y);
            ctx.lineTo(n2.x, n2.y);
            ctx.stroke();
          }
        }
      }
      ctx.restore();

      // Render Nodes with smooth physics
      nodes.forEach((n) => {
        // Spring lerp
        n.vx = (n.targetX - n.x) * 0.08;
        n.vy = (n.targetY - n.y) * 0.08;
        n.x += n.vx;
        n.y += n.vy;
        n.radius += (n.targetRadius - n.radius) * 0.1;

        if (n.radius <= 0.2) return;

        // Draw node glow aura if active or survived
        if (n.status !== "eliminated") {
          const grad = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.radius * 3);
          grad.addColorStop(0, n.glow);
          grad.addColorStop(1, "transparent");
          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.radius * 3, 0, Math.PI * 2);
          ctx.fill();
        }

        // Draw Core Dot
        ctx.fillStyle = n.status === "eliminated" ? "rgba(255,255,255,0.15)" : "#FFFFFF";
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
        ctx.fill();

        // If in finalists phase (3), draw team label on nodes
        if (activeStep === 3 && n.status === "survived") {
          ctx.fillStyle = "#FFFFFF";
          ctx.font = "bold 11px monospace";
          ctx.textAlign = "center";
          ctx.fillText(n.name, n.x, n.y - n.radius - 8);
        }
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", onResize);
    };
  }, [activeStep, initNodes, updateNodeTargets]);

  // Handle step change
  const setStep = (newStep: number) => {
    sound.playEliminationImpact();
    setActiveStep(newStep);
    if (canvasRef.current) {
      updateNodeTargets(newStep, canvasRef.current.width, canvasRef.current.height);
    }
  };

  // Auto-play timer
  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {
      setActiveStep((prev) => {
        const next = (prev + 1) % 4;
        sound.playHover();
        if (canvasRef.current) {
          updateNodeTargets(next, canvasRef.current.width, canvasRef.current.height);
        }
        return next;
      });
    }, 4500);

    return () => clearInterval(timer);
  }, [isPlaying, updateNodeTargets]);

  const current = steps[activeStep];

  return (
    <section
      id="journey"
      className="relative w-full min-h-screen flex flex-col justify-between px-4 sm:px-8 md:px-16 py-20 bg-[#07111F] border-t border-white/5 overflow-hidden"
    >
      {/* Top Section Header */}
      <div className="relative z-10 max-w-6xl mx-auto w-full flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#00E5FF] tracking-widest uppercase mb-2">
            <Activity className="w-4 h-4 animate-pulse" />
            <span>THE ELIMINATION ENGINE</span>
          </div>
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight uppercase text-white">
            60 → 20 → 10 → 3
          </h2>
        </div>

        <div className="flex items-center gap-4 text-xs font-mono text-slate-400">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/10">
            <span>CURRENT PHASE:</span>
            <span className="font-bold text-white uppercase">{current.label}</span>
          </div>
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            onMouseEnter={() => sound.playHover()}
            data-cursor={isPlaying ? "PAUSE" : "PLAY"}
            className="p-2 rounded-full border border-white/20 hover:border-white text-white transition-colors"
            title={isPlaying ? "Pause auto-progression" : "Play auto-progression"}
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Main Interactive Elimination Stage */}
      <div className="relative z-10 max-w-6xl mx-auto w-full flex-1 my-6 flex flex-col lg:flex-row items-center gap-8">
        {/* Left: Giant Typography & Phase Story */}
        <div className="w-full lg:w-5/12 flex flex-col justify-center select-none">
          <div className="text-xs font-mono tracking-widest text-[#00E5FF] uppercase">
            {current.roundText}
          </div>

          {/* Huge Number */}
          <div
            className="text-8xl sm:text-9xl md:text-[11rem] font-black tracking-tighter leading-none transition-all duration-500"
            style={{ color: current.colorHex }}
          >
            {current.count}
          </div>

          <div className="text-2xl sm:text-3xl font-black tracking-tight text-white uppercase mt-2">
            {current.sub}
          </div>

          <div className="text-sm text-slate-300 mt-4 leading-relaxed font-sans max-w-md">
            {current.desc}
          </div>

          <div className="mt-4 inline-block px-4 py-1.5 rounded-lg bg-white/[0.04] border border-white/10 text-xs font-mono text-slate-300 italic">
            &ldquo;{current.quote}&rdquo;
          </div>

          {/* Interactive Phase Selector Pills */}
          <div className="flex items-center gap-2 mt-8">
            {steps.map((s, idx) => (
              <button
                key={s.count}
                onClick={() => setStep(idx)}
                onMouseEnter={() => sound.playHover()}
                data-cursor="SCRUB"
                className={`flex-1 py-2.5 px-3 rounded-xl border text-center transition-all duration-200 ${
                  activeStep === idx
                    ? "bg-white text-[#07111F] font-black border-white shadow-[0_0_20px_rgba(255,255,255,0.4)]"
                    : "bg-white/[0.03] text-slate-400 border-white/10 hover:border-white/30 hover:text-white"
                }`}
              >
                <div className="text-sm font-black">{s.count}</div>
                <div className="text-[9px] font-mono tracking-tighter opacity-80 uppercase">
                  {idx === 0 ? "START" : `STAGE 0${idx}`}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Right: Live Interactive Simulation Canvas */}
        <div className="w-full lg:w-7/12 h-[380px] sm:h-[480px] lg:h-[540px] relative rounded-3xl border border-white/10 overflow-hidden bg-black/40 backdrop-blur-md shadow-[0_0_50px_rgba(0,0,0,0.8)]">
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full"
          />

          {/* Live Canvas Telemetry Badge */}
          <div className="absolute top-4 left-4 z-20 flex items-center gap-2 px-3 py-1 rounded-full bg-[#07111F]/80 backdrop-blur-md border border-white/10 text-[10px] font-mono text-slate-300">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            <span>SIMULATION // 60 NODE ARRAY</span>
          </div>

          <div className="absolute bottom-4 right-4 z-20 text-[10px] font-mono text-slate-500">
            CLICK PILLS TO REORGANIZE
          </div>
        </div>
      </div>

      {/* Bottom Milestone Ribbon */}
      <div className="relative z-10 max-w-6xl mx-auto w-full flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/10 pt-4 text-xs font-mono text-slate-400">
        <div className="flex items-center gap-4">
          <span className="text-[#00E5FF]">60 TEAMS BEGIN</span>
          <span>→</span>
          <span className="text-[#087BFF]">20 ADVANCE</span>
          <span>→</span>
          <span className="text-[#FF5A5F]">10 SURVIVE</span>
          <span>→</span>
          <span className="text-[#FFD83D] font-bold">3 PODIUM FINALISTS</span>
        </div>

        <button
          onClick={() => {
            sound.playClick();
            onReachFinal();
          }}
          className="flex items-center gap-1 text-white hover:text-[#00E5FF] transition-colors"
        >
          <span>EXPLORE DETAILED ROUNDS</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
}

