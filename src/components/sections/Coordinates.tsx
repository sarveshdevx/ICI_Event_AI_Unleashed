"use client";

import React, { useState, useRef, useEffect } from "react";
import { sound } from "@/lib/audio";
import { CoordinatePoint } from "@/lib/types";
import { Compass, X, ArrowUpRight, Shield, User, Calendar, MapPin, Phone, Building } from "lucide-react";

const coordinateData: CoordinatePoint[] = [
  {
    id: "c1",
    number: "01",
    title: "ICI FEST",
    subtitle: "INSTITUTIONAL FESTIVAL",
    tag: "ORIGIN MATRIX",
    xPercent: 24,
    yPercent: 32,
    accentHex: "#087BFF",
    shortDesc: "Annual flagship innovation celebration at SKIT Jaipur.",
    content: {
      heading: "ICI FEST 2026 // THE CONVERGENCE",
      paragraphs: [
        "ICI Fest is the marquee technical and cultural festival organized by the ICI Committee at Swami Keshvanand Institute of Technology, Management & Gramothan (SKIT), Jaipur.",
        "Bringing together brilliant young engineers, innovators, and thinkers from across departments, ICI Fest hosts premier competitive games designed to test modern frontiers in engineering and applied computing.",
      ],
      specs: [
        { label: "INSTITUTE", value: "Swami Keshvanand Institute of Technology, Management & Gramothan" },
        { label: "ORGANIZER", value: "ICI Committee" },
        { label: "FEST YEAR", value: "2026" },
        { label: "CAMPUS", value: "SKIT Jaipur, Rajasthan" },
      ],
      highlightQuote: "Ideas Today. A Smarter Tomorrow.",
    },
  },
  {
    id: "c2",
    number: "02",
    title: "AI UNLEASHED",
    subtitle: "COMPETITION ARCHITECTURE",
    tag: "EVENT VISION",
    xPercent: 72,
    yPercent: 28,
    accentHex: "#8B3DFF",
    shortDesc: "A multi-stage challenge pairing human intellect with AI judging.",
    content: {
      heading: "AI UNLEASHED // OBJECTIVE & PARADIGM",
      paragraphs: [
        "The primary objective of AI Unleashed is to provide students with an engaging and competitive platform where they can demonstrate AI awareness, problem-solving ability, creativity, logical thinking, teamwork, and decision-making skills.",
        "A distinctive feature of the competition is that Round 2 and Round 3 utilize AI-assisted judging only. AI evaluates practicality, feasibility, innovation, and prompt accuracy without human bias, making AI an active participant in the competition itself.",
      ],
      specs: [
        { label: "EVENT TYPE", value: "ICI Fest Game" },
        { label: "TOTAL TEAMS", value: "60 Teams Max" },
        { label: "ROUND PROGRESSION", value: "60 → 20 → 10 → 3 Finalists" },
        { label: "JUDGING SYSTEM", value: "Autonomous AI-Assisted Evaluation" },
      ],
      highlightQuote: "Human Minds | Tech Skills | Limitless Possibilities.",
    },
  },
  {
    id: "c3",
    number: "03",
    title: "THE CHALLENGE",
    subtitle: "SCHEDULE & PROTOCOLS",
    tag: "ARENA TELEMETRY",
    xPercent: 38,
    yPercent: 74,
    accentHex: "#FF5A5F",
    shortDesc: "Dates: 12–17 October 2026 • Civil Department arena.",
    content: {
      heading: "OFFICIAL SCHEDULE & RULES",
      paragraphs: [
        "The event runs across 12–17 October 2026 from 10:00 AM to 8:00 PM at the Civil Department premises.",
        "Participants must strictly follow the official 9 rules: fair-play rules throughout, zero tolerance for unfair means, reporting prior to scheduled round times, and adherence to time limits. The decision of event coordinators regarding the competition will be final.",
      ],
      specs: [
        { label: "DATES", value: "12–17 October 2026" },
        { label: "HOURS", value: "10:00 AM – 8:00 PM" },
        { label: "VENUE", value: "Civil Department" },
        { label: "RULES", value: "9 Enforced Fair-Play Articles" },
      ],
      highlightQuote: "Challenge The Intelligence.",
    },
  },
  {
    id: "c4",
    number: "04",
    title: "THE PEOPLE",
    subtitle: "COORDINATION CREW",
    tag: "PERSONNEL",
    xPercent: 84,
    yPercent: 68,
    accentHex: "#10B981",
    shortDesc: "Official student coordinators from Dept of AI & Data Science.",
    content: {
      heading: "STUDENT COORDINATORS",
      paragraphs: [
        "AI Unleashed is spearheaded by dedicated student coordinators from the Department of Artificial Intelligence under the ICI Committee.",
        "For event queries, technical rules clarifications, and team check-ins, participants can contact the designated coordinators:",
      ],
      specs: [
        { label: "SARVESH SHARMA", value: "AI-D • +91 7014502018 (Roll: 25ESKCA211)" },
        { label: "JATIN PANCHAL", value: "AI-B • +91 92449 45532 (Roll: 25ESKCA109)" },
        { label: "SHYAMA OJHA", value: "AI-D • +91 93414 35764 (Roll: 25ESKCA217)" },
        { label: "YACHI GUPTA", value: "AI-D • +91 82095 43350 (Roll: 25ESKCA247)" },
      ],
      highlightQuote: "Great Minds. Greater Impact!",
    },
  },
];

interface CoordinatesProps {
  onContinue: () => void;
}

export default function Coordinates({ onContinue }: CoordinatesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [selectedPoint, setSelectedPoint] = useState<CoordinatePoint | null>(null);
  const [hoveredPoint, setHoveredPoint] = useState<CoordinatePoint | null>(null);
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  // Canvas radar telemetry rendering
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 800);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 550);

    const onResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener("resize", onResize);

    let angle = 0;

    const render = () => {
      angle += 0.008;
      ctx.clearRect(0, 0, width, height);

      // Light base grid lines (Gionatan Nese inspired minimal architectural plane)
      ctx.strokeStyle = "rgba(15, 23, 42, 0.08)";
      ctx.lineWidth = 1;
      const step = 40;
      for (let x = 0; x < width; x += step) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += step) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Draw subtle telemetry crosshairs at center
      ctx.strokeStyle = "rgba(15, 23, 42, 0.15)";
      ctx.beginPath();
      ctx.moveTo(width / 2 - 20, height / 2);
      ctx.lineTo(width / 2 + 20, height / 2);
      ctx.moveTo(width / 2, height / 2 - 20);
      ctx.lineTo(width / 2, height / 2 + 20);
      ctx.stroke();

      // Connecting lines between the 4 points
      ctx.strokeStyle = "rgba(8, 123, 255, 0.2)";
      ctx.lineWidth = 1.2;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      coordinateData.forEach((pt, i) => {
        const px = (pt.xPercent / 100) * width;
        const py = (pt.yPercent / 100) * height;
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      });
      ctx.closePath();
      ctx.stroke();
      ctx.setLineDash([]);

      // Radar sweep arc
      ctx.save();
      ctx.translate(width / 2, height / 2);
      ctx.rotate(angle);
      const sweepGrad = ctx.createRadialGradient(0, 0, 10, 0, 0, width * 0.4);
      sweepGrad.addColorStop(0, "rgba(8, 123, 255, 0.06)");
      sweepGrad.addColorStop(1, "transparent");
      ctx.fillStyle = sweepGrad;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.arc(0, 0, width * 0.4, 0, Math.PI / 3);
      ctx.closePath();
      ctx.fill();
      ctx.restore();

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  const handlePointClick = (pt: CoordinatePoint) => {
    sound.playClick();
    setSelectedPoint(pt);
  };

  return (
    <section
      id="about"
      className="relative w-full min-h-screen flex flex-col justify-between px-4 sm:px-8 md:px-16 py-24 bg-[#F8FAFC] text-[#07111F] transition-colors duration-500 overflow-hidden"
    >
      {/* Top Header */}
      <div className="relative z-10 max-w-6xl mx-auto w-full border-b border-slate-200 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#087BFF] tracking-widest uppercase mb-1">
            <Compass className="w-4 h-4" />
            <span>08 // SPATIAL ARCHITECTURE</span>
          </div>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-[#07111F] uppercase">
            FOUR COORDINATES
          </h2>
        </div>

        <div className="text-xs font-mono text-slate-500 text-left md:text-right">
          <div>SPATIAL NAVIGATION CANVAS</div>
          <div className="text-[#087BFF]">CLICK ANY POINT TO EXPAND DOSSIER</div>
        </div>
      </div>

      {/* Main Spatial Map Surface */}
      <div className="relative z-10 max-w-6xl mx-auto w-full my-8 h-[480px] sm:h-[560px] md:h-[620px] rounded-3xl bg-white border border-slate-200 shadow-xl overflow-hidden">
        {/* Canvas Radar Grid */}
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />

        {/* The 4 Spatial Interactive Points */}
        {coordinateData.map((pt) => {
          const isSelected = selectedPoint?.id === pt.id;
          const isHovered = hoveredPoint?.id === pt.id;

          return (
            <div
              key={pt.id}
              style={{
                top: `${pt.yPercent}%`,
                left: `${pt.xPercent}%`,
                transform: "translate(-50%, -50%)",
              }}
              className="absolute z-20"
            >
              <button
                onClick={() => handlePointClick(pt)}
                onMouseEnter={() => {
                  sound.playHover();
                  setHoveredPoint(pt);
                }}
                onMouseLeave={() => setHoveredPoint(null)}
                data-cursor="INSPECT"
                className="group relative flex flex-col items-center text-center focus:outline-none"
              >
                {/* Ping Ring */}
                <span
                  className="absolute -inset-2 rounded-full opacity-75 animate-ping pointer-events-none"
                  style={{ backgroundColor: pt.accentHex }}
                />

                {/* Point Center Node */}
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white font-mono font-black text-xs shadow-lg transition-transform duration-300 group-hover:scale-125"
                  style={{ backgroundColor: pt.accentHex }}
                >
                  {pt.number}
                </div>

                {/* Label Tooltip Badge */}
                <div className="mt-2.5 px-3 py-1.5 rounded-xl bg-slate-900 text-white shadow-xl flex flex-col items-center transition-all duration-200 group-hover:-translate-y-1">
                  <div className="text-[11px] font-black tracking-wider uppercase">
                    {pt.title}
                  </div>
                  <div className="text-[9px] font-mono text-slate-400">
                    X: 0{pt.xPercent} / Y: 0{pt.yPercent}
                  </div>
                </div>
              </button>
            </div>
          );
        })}

        {/* Spatial Coordinate Telemetry Legend (Bottom Left) */}
        <div className="absolute bottom-6 left-6 z-10 hidden sm:flex flex-col gap-1 p-3 rounded-xl bg-white/90 backdrop-blur-md border border-slate-200 text-[10px] font-mono text-slate-600">
          <div className="font-bold text-[#07111F]">SYSTEM TELEMETRY</div>
          <div>DATUM: 26.8206° N, 75.8672° E (SKIT)</div>
          <div>FRAMEWORK: GIONATAN NESE CARTESIAN PLANE</div>
        </div>
      </div>

      {/* Slide-in Detailed Dossier Modal / Drawer */}
      {selectedPoint && (
        <div className="fixed inset-0 z-50 bg-[#07111F]/70 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 text-[#07111F] max-h-[90vh] overflow-y-auto">
            {/* Close Button */}
            <button
              onClick={() => setSelectedPoint(null)}
              className="absolute top-6 right-6 p-2 rounded-full hover:bg-slate-100 text-slate-500 hover:text-black transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Dossier Header */}
            <div className="flex items-center gap-3">
              <span
                className="px-3 py-1 rounded-full text-white text-xs font-mono font-bold"
                style={{ backgroundColor: selectedPoint.accentHex }}
              >
                COORD {selectedPoint.number}
              </span>
              <span className="text-xs font-mono text-slate-500 uppercase tracking-widest">
                {selectedPoint.tag}
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-black uppercase text-[#07111F] mt-3">
              {selectedPoint.content.heading}
            </h3>

            {/* Paragraphs */}
            <div className="mt-4 space-y-3 text-sm text-slate-600 leading-relaxed font-sans">
              {selectedPoint.content.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            {/* Specs / Table Grid */}
            {selectedPoint.content.specs && (
              <div className="mt-6 border border-slate-200 rounded-2xl overflow-hidden">
                <div className="bg-slate-50 px-4 py-2 text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider border-b border-slate-200">
                  OFFICIAL METADATA
                </div>
                <div className="divide-y divide-slate-100">
                  {selectedPoint.content.specs.map((s, idx) => (
                    <div key={idx} className="p-3 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-1 font-mono">
                      <span className="text-slate-400 font-bold">{s.label}</span>
                      <span className="text-slate-900 font-semibold">{s.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Highlight Quote */}
            {selectedPoint.content.highlightQuote && (
              <div className="mt-6 p-4 rounded-xl bg-slate-50 border-l-4 border-[#087BFF] text-xs font-mono text-slate-700 italic">
                &ldquo;{selectedPoint.content.highlightQuote}&rdquo;
              </div>
            )}

            <div className="mt-8 flex justify-end">
              <button
                onClick={() => setSelectedPoint(null)}
                className="px-6 py-2.5 rounded-full bg-[#07111F] text-white text-xs font-mono uppercase tracking-wider hover:bg-[#087BFF] transition-colors"
              >
                CLOSE DOSSIER [ESC]
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Navigation */}
      <div className="relative z-10 max-w-6xl mx-auto w-full flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-200 pt-4 text-xs font-mono text-slate-600">
        <div>ICI FEST 2026 // AI UNLEASHED CARTOGRAPHY</div>

        <button
          onClick={() => {
            sound.playClick();
            onContinue();
          }}
          className="flex items-center gap-2 text-[#087BFF] hover:text-[#07111F] font-bold transition-colors"
        >
          <span>PROCEED TO FINAL REGISTRATION</span>
          <ArrowUpRight className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
}

