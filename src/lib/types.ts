export type StageId =
  | 'intro'
  | 'challenge'
  | 'journey'
  | 'round01'
  | 'round02'
  | 'round03'
  | 'final'
  | 'about'
  | 'register';

export interface StageInfo {
  id: StageId;
  label: string;
  roundIndicator?: string;
  colorName: string;
  hex: string;
}

export interface CoordinatePoint {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  tag: string;
  xPercent: number;
  yPercent: number;
  accentHex: string;
  shortDesc: string;
  content: {
    heading: string;
    paragraphs: string[];
    specs?: { label: string; value: string }[];
    highlightQuote?: string;
  };
}

export interface QuizQuestion {
  id: number;
  question: string;
  concept: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface ProblemClash {
  id: number;
  code: string;
  title: string;
  problem: string;
  teamA: {
    name: string;
    concept: string;
    approach: string;
    metrics: { practicality: number; feasibility: number; innovation: number; quality: number };
  };
  teamB: {
    name: string;
    concept: string;
    approach: string;
    metrics: { practicality: number; feasibility: number; innovation: number; quality: number };
  };
  keyCriterion: string;
}

export interface PromptMystery {
  id: number;
  targetSubject: string;
  secretPrompt: string;
  revealedPercentage: number;
  keyTokens: string[];
  style: string;
}

