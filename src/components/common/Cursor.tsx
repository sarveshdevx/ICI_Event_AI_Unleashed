"use client";

import React, { useEffect, useRef, useState } from "react";

export default function Cursor() {
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorRingRef = useRef<HTMLDivElement>(null);
  const [cursorText, setCursorText] = useState<string>("");
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    // Only run on desktop devices with fine pointer
    if (typeof window === "undefined" || window.matchMedia("(pointer: coarse)").matches) {
      return;
    }

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;
    let animationFrameId: number;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!isVisible) setIsVisible(true);

      if (cursorDotRef.current) {
        cursorDotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      }

      // Check for hovered interactive element with custom cursor label
      const target = e.target as HTMLElement | null;
      const interactiveEl = target?.closest("[data-cursor]") as HTMLElement | null;
      if (interactiveEl) {
        const text = interactiveEl.getAttribute("data-cursor") || "";
        setCursorText(text);
        setIsHovered(true);
      } else if (target?.closest("button, a, input, [role='button']")) {
        setCursorText("");
        setIsHovered(true);
      } else {
        setCursorText("");
        setIsHovered(false);
      }
    };

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    const renderLoop = () => {
      // Smooth ring lerp
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;

      if (cursorRingRef.current) {
        cursorRingRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      }

      animationFrameId = requestAnimationFrame(renderLoop);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);
    animationFrameId = requestAnimationFrame(renderLoop);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isVisible]);

  if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
    return null;
  }

  return (
    <div
      className={`pointer-events-none fixed inset-0 z-[9999] transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      aria-hidden="true"
    >
      {/* Precision Dot */}
      <div
        ref={cursorDotRef}
        className="fixed top-0 left-0 -ml-1 -mt-1 w-2 h-2 rounded-full bg-cyan-400 pointer-events-none transition-transform duration-75 ease-out shadow-[0_0_8px_rgba(0,229,255,0.8)]"
        style={{ willChange: "transform" }}
      />

      {/* Trailing Aura Ring with optional Label */}
      <div
        ref={cursorRingRef}
        className={`fixed top-0 left-0 pointer-events-none flex items-center justify-center rounded-full transition-[width,height,background-color,border-color] duration-200 ease-out ${
          isHovered
            ? cursorText
              ? "-ml-8 -mt-8 w-16 h-16 bg-[#00E5FF]/20 border border-[#00E5FF] backdrop-blur-[2px]"
              : "-ml-5 -mt-5 w-10 h-10 bg-white/10 border border-white/40"
            : "-ml-3 -mt-3 w-6 h-6 border border-white/25"
        }`}
        style={{ willChange: "transform" }}
      >
        {cursorText && (
          <span className="text-[9px] font-black tracking-widest text-[#00E5FF] uppercase select-none">
            {cursorText}
          </span>
        )}
      </div>
    </div>
  );
}

