"use client";

import React, { useState } from "react";
import { sound } from "@/lib/audio";
import { Brain, CheckCircle2, XCircle, ArrowRight, HelpCircle } from "lucide-react";
import { QuizQuestion } from "@/lib/types";

const sampleQuestions: QuizQuestion[] = [
  {
    id: 1,
    concept: "AI LEADERSHIP",
    question: "Who is the CEO of OpenAI, the company behind ChatGPT?",
    options: ["Mark Zuckerberg", "Sam Altman", "Elon Musk", "Sundar Pichai"],
    correctIndex: 1,
    explanation: "Sam Altman is the CEO of OpenAI, the research laboratory that developed ChatGPT.",
  },
  {
    id: 2,
    concept: "AI TERMINOLOGY",
    question: "What does LLM stand for?",
    options: [
      "Long Learning Machine",
      "Logical Language Machine",
      "Large Language Model",
      "Large Logic Method",
    ],
    correctIndex: 2,
    explanation: "LLM stands for Large Language Model, an AI system trained on extensive text datasets.",
  },
  {
    id: 3,
    concept: "AI APPLICATIONS",
    question: "What is ChatGPT?",
    options: [
      "An AI chatbot",
      "A web browser",
      "A programming language",
      "A computer operating system",
    ],
    correctIndex: 0,
    explanation: "ChatGPT is an artificial intelligence chatbot designed to understand and generate natural language.",
  },
  {
    id: 4,
    concept: "FOUNDATIONS",
    question: "What does AI stand for?",
    options: [
      "Automated Internet",
      "Advanced Information",
      "Artificial Internet",
      "Artificial Intelligence",
    ],
    correctIndex: 3,
    explanation: "AI stands for Artificial Intelligence—the simulation of human intelligence by computer systems.",
  },
  {
    id: 5,
    concept: "GENERATIVE AI",
    question: "Which of these is commonly used to generate images with AI?",
    options: [
      "Calculator",
      "An AI image generator",
      "File manager",
      "Music player",
    ],
    correctIndex: 1,
    explanation: "AI image generators (such as Midjourney, DALL-E, and Imagen) create visual images from text prompts.",
  },
  {
    id: 6,
    concept: "PROMPT BASICS",
    question: "What is a prompt?",
    options: [
      "An instruction given to an AI",
      "A computer virus",
      "A type of keyboard",
      "A storage device",
    ],
    correctIndex: 0,
    explanation: "A prompt is the input instruction, question, or text you provide to guide an AI's output.",
  },
  {
    id: 7,
    concept: "TECH ECOSYSTEM",
    question: "Which company developed Gemini?",
    options: ["Microsoft", "Apple", "Google", "Adobe"],
    correctIndex: 2,
    explanation: "Gemini is Google's flagship family of multimodal artificial intelligence models.",
  },
  {
    id: 8,
    concept: "GENERATIVE TOOLS",
    question: "Which of these is an example of generative AI?",
    options: ["Calculator", "Stopwatch", "ChatGPT", "File Explorer"],
    correctIndex: 2,
    explanation: "ChatGPT is generative AI because it generates original text, answers, and creative ideas.",
  },
  {
    id: 9,
    concept: "AI CAPABILITIES",
    question: "What can generative AI create?",
    options: [
      "Only spreadsheets",
      "Text, images and other content",
      "Only computer hardware",
      "Only internet connections",
    ],
    correctIndex: 1,
    explanation: "Generative AI can create text, images, code, audio, videos, and multi-modal creative works.",
  },
  {
    id: 10,
    concept: "CONVERSATIONAL AI",
    question: "What is the main purpose of a chatbot?",
    options: [
      "To communicate with users",
      "To charge a phone",
      "To print documents",
      "To store electricity",
    ],
    correctIndex: 0,
    explanation: "Chatbots are software applications created to interact, converse, and communicate with users.",
  },
];

const floatingKeywords = [
  "CHATGPT",
  "PROMPT",
  "LLM",
  "GEMINI",
  "AI",
  "IMAGES",
  "CREATIVITY",
  "MODELS",
  "CHATBOT",
  "IDEAS",
  "OPENAI",
  "GOOGLE",
];

interface Round01Props {
  onNextRound: () => void;
}

export default function Round01({ onNextRound }: Round01Props) {
  const [currentQIndex, setCurrentQIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [hasAnswered, setHasAnswered] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);

  const currentQ = sampleQuestions[currentQIndex];

  const handleSelectOption = (index: number) => {
    if (hasAnswered) return;
    sound.playClick();
    setSelectedOption(index);
    setHasAnswered(true);

    if (index === currentQ.correctIndex) {
      sound.playTriumph();
      setScore((prev) => prev + 1);
    } else {
      sound.playEliminationImpact();
    }
  };

  const handleNextQuestion = () => {
    sound.playHover();
    if (currentQIndex < sampleQuestions.length - 1) {
      setCurrentQIndex((prev) => prev + 1);
      setSelectedOption(null);
      setHasAnswered(false);
    } else {
      // Reset quiz
      setCurrentQIndex(0);
      setSelectedOption(null);
      setHasAnswered(false);
      setScore(0);
    }
  };

  return (
    <section
      id="round01"
      className="relative w-full min-h-screen flex flex-col justify-between px-4 sm:px-8 md:px-16 py-24 bg-gradient-to-b from-[#07111F] via-[#051326] to-[#07111F] border-t border-cyan-500/20 overflow-hidden"
    >
      {/* Floating AI Keywords in background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none opacity-20">
        {floatingKeywords.map((word, idx) => (
          <span
            key={word}
            className="absolute font-mono font-black text-white/25 text-xs sm:text-sm tracking-widest uppercase animate-float-slow"
            style={{
              top: `${(idx * 8 + 10) % 85}%`,
              left: `${(idx * 16 + 5) % 90}%`,
              animationDelay: `${idx * 0.7}s`,
              animationDuration: `${7 + (idx % 5)}s`,
            }}
          >
            {word}
          </span>
        ))}
      </div>

      {/* Top Header & Round Marker */}
      <div className="relative z-10 max-w-6xl mx-auto w-full">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#00E5FF]/20 pb-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#087BFF] to-[#00E5FF] p-[1px] flex items-center justify-center shadow-[0_0_25px_rgba(0,229,255,0.4)]">
              <div className="w-full h-full bg-[#07111F] rounded-2xl flex items-center justify-center">
                <Brain className="w-7 h-7 text-[#00E5FF] animate-pulse" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#00E5FF] tracking-widest uppercase">
                <span>ROUND 01 OF 03</span>
                <span>•</span>
                <span className="text-white">STAGE 01</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white uppercase mt-0.5">
                AI QUIZ
              </h2>
            </div>
          </div>

          {/* Elimination Metric Pill */}
          <div className="flex items-center gap-4">
            <div className="px-5 py-2.5 rounded-2xl bg-cyan-950/40 border border-[#00E5FF]/40 text-center">
              <div className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest">
                ELIMINATION THRESHOLD
              </div>
              <div className="text-lg sm:text-xl font-black text-white font-mono tracking-wider">
                60 TEAMS <span className="text-[#00E5FF]">→</span> 20 TEAMS
              </div>
            </div>

            <div className="hidden sm:block text-right text-xs font-mono text-cyan-300">
              <div className="font-bold">TOP 20 ADVANCE</div>
              <div className="text-slate-400 italic">“Know. Think. Advance.”</div>
            </div>
          </div>
        </div>

        {/* Subtitle & Provocation */}
        <div className="mt-8 max-w-2xl">
          <div className="inline-block px-3 py-1 rounded-md bg-[#00E5FF]/10 text-[#00E5FF] font-mono text-xs tracking-wider uppercase font-bold mb-2">
            TEST YOUR KNOWLEDGE
          </div>
          <h3 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-100">
            HOW MUCH DO YOU REALLY KNOW ABOUT AI?
          </h3>
          <p className="text-xs sm:text-sm font-sans text-slate-400 mt-2 leading-relaxed">
            The competition kicks off with 60 teams. A fast-paced, approachable quiz testing everyday
            AI awareness, familiar tools, fundamental concepts, and quick thinking.
          </p>
        </div>
      </div>

      {/* Interactive AI Quiz Sandbox Experience */}
      <div className="relative z-10 max-w-4xl mx-auto w-full my-8">
        <div className="p-6 sm:p-8 rounded-3xl bg-[#081527]/80 backdrop-blur-xl border border-[#00E5FF]/30 shadow-[0_0_50px_rgba(8,123,255,0.2)]">
          <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6 text-xs font-mono">
            <div className="flex items-center gap-2 text-cyan-400">
              <HelpCircle className="w-4 h-4" />
              <span>QUESTION #{currentQ.id} OF {sampleQuestions.length}</span>
              <span className="text-slate-500">•</span>
              <span className="text-white font-bold">{currentQ.concept}</span>
            </div>
            <div className="text-slate-400">
              SCORE: <span className="text-[#00E5FF] font-bold">{score}</span> / {sampleQuestions.length}
            </div>
          </div>

          {/* Question Text */}
          <h4 className="text-lg sm:text-xl md:text-2xl font-bold text-white leading-snug">
            {currentQ.question}
          </h4>

          {/* Options Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mt-6">
            {currentQ.options.map((option, idx) => {
              const isSelected = selectedOption === idx;
              const isCorrect = idx === currentQ.correctIndex;

              let optionStyle =
                "border-white/10 bg-white/[0.02] hover:bg-white/[0.05] hover:border-[#00E5FF]/50 text-slate-200";

              if (hasAnswered) {
                if (isCorrect) {
                  optionStyle =
                    "border-emerald-400 bg-emerald-500/20 text-emerald-300 font-bold shadow-[0_0_15px_rgba(52,211,153,0.3)]";
                } else if (isSelected && !isCorrect) {
                  optionStyle = "border-rose-500 bg-rose-500/20 text-rose-300 line-through";
                } else {
                  optionStyle = "border-white/5 opacity-40 text-slate-400";
                }
              }

              const letterLabel = ["A", "B", "C", "D"][idx];

              return (
                <button
                  key={option}
                  onClick={() => handleSelectOption(idx)}
                  disabled={hasAnswered}
                  onMouseEnter={() => sound.playHover()}
                  data-cursor="SELECT"
                  className={`flex items-center justify-between p-4 rounded-xl border text-left text-xs sm:text-sm transition-all duration-200 ${optionStyle}`}
                >
                  <span className="flex items-center gap-3 flex-1 pr-2">
                    <span className="w-6 h-6 rounded-lg bg-white/10 flex items-center justify-center font-mono font-bold text-xs text-[#00E5FF] shrink-0">
                      {letterLabel}
                    </span>
                    <span>{option}</span>
                  </span>
                  {hasAnswered && isCorrect && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  )}
                  {hasAnswered && isSelected && !isCorrect && (
                    <XCircle className="w-5 h-5 text-rose-400 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Feedback & Advance Button */}
          {hasAnswered && (
            <div className="mt-6 pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 animate-in fade-in duration-200">
              <div className="text-xs text-slate-300 font-sans">
                <span className="font-bold text-[#00E5FF]">AI EXPLANATION: </span>
                {currentQ.explanation}
              </div>

              <button
                onClick={handleNextQuestion}
                onMouseEnter={() => sound.playHover()}
                data-cursor="NEXT"
                className="shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#00E5FF] hover:bg-white text-[#07111F] font-bold text-xs uppercase tracking-wider transition-all"
              >
                <span>
                  {currentQIndex < sampleQuestions.length - 1
                    ? "NEXT QUESTION"
                    : "RESTART QUIZ"}
                </span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Navigation Ribbon */}
      <div className="relative z-10 max-w-6xl mx-auto w-full flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/10 pt-4 text-xs font-mono text-slate-400">
        <div className="flex items-center gap-3">
          <span className="text-[#00E5FF]">CRITERIA:</span>
          <span>SPEED</span>
          <span>•</span>
          <span>ACCURACY</span>
          <span>•</span>
          <span>REASONING</span>
        </div>

        <button
          onClick={() => {
            sound.playClick();
            onNextRound();
          }}
          className="flex items-center gap-2 text-white hover:text-[#00E5FF] transition-colors"
        >
          <span>ADVANCE TO ROUND 02: HEAD-TO-HEAD</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
}
