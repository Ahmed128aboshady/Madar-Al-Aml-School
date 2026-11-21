"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";

export interface NumberLevel {
  id: string;
  value: number;
  arabicDigit: string;
  word: string;
  chant: string;
  primaryColor: string;
  secondaryColor: string;
  bgGradient: string;
  itemName: string;
  itemShape: "star" | "apple" | "flower" | "heart" | "sun" | "fish" | "gem" | "butterfly" | "cupcake" | "balloon";
  options: number[];
}

export const NUMBERS_DATA: NumberLevel[] = [
  {
    id: "num-1",
    value: 1,
    arabicDigit: "١",
    word: "واحِد",
    chant: "رقم واحد.. مثل الشمس المشرقة في السماء!",
    primaryColor: "#FF5E7E",
    secondaryColor: "#FF8E53",
    bgGradient: "linear-gradient(135deg, #FFF0F3 0%, #FFE3E8 100%)",
    itemName: "شمس مشرقة",
    itemShape: "sun",
    options: [1, 3, 2],
  },
  {
    id: "num-2",
    value: 2,
    arabicDigit: "٢",
    word: "اِثْنَان",
    chant: "رقم اثنان.. عصفوران سعيدان يطيران معاً!",
    primaryColor: "#FF9F1C",
    secondaryColor: "#FFD166",
    bgGradient: "linear-gradient(135deg, #FFFBEB 0%, #FEF3C7 100%)",
    itemName: "تفاحات لذيذة",
    itemShape: "apple",
    options: [4, 2, 1],
  },
  {
    id: "num-3",
    value: 3,
    arabicDigit: "٣",
    word: "ثَلَاثَة",
    chant: "رقم ثلاثة.. ثلاث نجوم تلمع في الفضاء!",
    primaryColor: "#10B981",
    secondaryColor: "#34D399",
    bgGradient: "linear-gradient(135deg, #ECFDF5 0%, #D1FAE5 100%)",
    itemName: "نجوم لامعة",
    itemShape: "star",
    options: [3, 5, 2],
  },
  {
    id: "num-4",
    value: 4,
    arabicDigit: "٤",
    word: "أَرْبَعَة",
    chant: "رقم أربعة.. أربع زهرات ملونة في الحديقة!",
    primaryColor: "#0EA5E9",
    secondaryColor: "#38BDF8",
    bgGradient: "linear-gradient(135deg, #F0F9FF 0%, #E0F2FE 100%)",
    itemName: "زهرات جميلة",
    itemShape: "flower",
    options: [6, 3, 4],
  },
  {
    id: "num-5",
    value: 5,
    arabicDigit: "٥",
    word: "خَمْسَة",
    chant: "رقم خمسة.. مثل أصابع يدي الخمسة الجميلة!",
    primaryColor: "#8B5CF6",
    secondaryColor: "#C084FC",
    bgGradient: "linear-gradient(135deg, #F5F3FF 0%, #EDE9FE 100%)",
    itemName: "قلوب محبة",
    itemShape: "heart",
    options: [5, 4, 7],
  },
  {
    id: "num-6",
    value: 6,
    arabicDigit: "٦",
    word: "سِتَّة",
    chant: "رقم ستة.. ست أسماك تسبح بمرح في البحر!",
    primaryColor: "#EC4899",
    secondaryColor: "#F472B6",
    bgGradient: "linear-gradient(135deg, #FDF2F8 0%, #FCE7F3 100%)",
    itemName: "أسماك ملونة",
    itemShape: "fish",
    options: [8, 6, 5],
  },
  {
    id: "num-7",
    value: 7,
    arabicDigit: "٧",
    word: "سَبْعَة",
    chant: "رقم سبعة.. مثل ألوان قوس قزح السبعة الرائعة!",
    primaryColor: "#06B6D4",
    secondaryColor: "#22D3EE",
    bgGradient: "linear-gradient(135deg, #ECFEFF 0%, #CFFAFE 100%)",
    itemName: "جواهر براقة",
    itemShape: "gem",
    options: [7, 9, 6],
  },
  {
    id: "num-8",
    value: 8,
    arabicDigit: "٨",
    word: "ثَمَانِيَة",
    chant: "رقم ثمانية.. ثماني فراشات ترقص فوق الأزهار!",
    primaryColor: "#F59E0B",
    secondaryColor: "#FBBF24",
    bgGradient: "linear-gradient(135deg, #FFFBEB 0%, #FDE68A 100%)",
    itemName: "فراشات رشيقة",
    itemShape: "butterfly",
    options: [6, 8, 9],
  },
  {
    id: "num-9",
    value: 9,
    arabicDigit: "٩",
    word: "تِسْعَة",
    chant: "رقم تسعة.. تسع كعكات لذيذة في الحفلة!",
    primaryColor: "#6366F1",
    secondaryColor: "#818CF8",
    bgGradient: "linear-gradient(135deg, #EEF2FF 0%, #E0E7FF 100%)",
    itemName: "كعكات شهية",
    itemShape: "cupcake",
    options: [9, 7, 10],
  },
  {
    id: "num-10",
    value: 10,
    arabicDigit: "١٠",
    word: "عَشَرَة",
    chant: "رقم عشرة.. عشرة بالونات تطير احتفالاً بك يا بطل!",
    primaryColor: "#E11D48",
    secondaryColor: "#F59E0B",
    bgGradient: "linear-gradient(135deg, #FFF1F2 0%, #FEF3C7 100%)",
    itemName: "بالونات الاحتفال",
    itemShape: "balloon",
    options: [8, 10, 9],
  },
];

const BALLOON_PALETTE = [
  { body: "#FF4D6D", shine: "#FF8FA3", dark: "#C9184A" },
  { body: "#FF9F1C", shine: "#FFBF69", dark: "#D97706" },
  { body: "#10B981", shine: "#6EE7B7", dark: "#047857" },
  { body: "#0EA5E9", shine: "#7DD3FC", dark: "#0369A1" },
  { body: "#8B5CF6", shine: "#C4B5FD", dark: "#6D28D9" },
  { body: "#EC4899", shine: "#F9A8D4", dark: "#BE185D" },
  { body: "#FACC15", shine: "#FEF08A", dark: "#CA8A04" },
  { body: "#06B6D4", shine: "#67E8F9", dark: "#0E7490" },
];

// ── Rich Web Audio Sound Synthesizer for Kids ──
const SCALE_FREQS = [523.25, 587.33, 659.25, 698.46, 783.99, 880.0, 987.77, 1046.5, 1174.66, 1318.51];

function playSound(type: "pop" | "correct" | "wrong" | "fanfare" | "click", stepIndex = 0) {
  try {
    const AudioCtx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const now = ctx.currentTime;

    if (type === "pop") {
      // Soft crisp balloon pop + ascending xylophone note
      const popOsc = ctx.createOscillator();
      const popGain = ctx.createGain();
      popOsc.type = "sine";
      popOsc.frequency.setValueAtTime(340, now);
      popOsc.frequency.exponentialRampToValueAtTime(90, now + 0.08);
      popGain.gain.setValueAtTime(0.35, now);
      popGain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);
      popOsc.connect(popGain);
      popGain.connect(ctx.destination);
      popOsc.start(now);
      popOsc.stop(now + 0.09);

      // Musical chime note
      const noteFreq = SCALE_FREQS[stepIndex % SCALE_FREQS.length];
      const chimeOsc = ctx.createOscillator();
      const chimeGain = ctx.createGain();
      chimeOsc.type = "triangle";
      chimeOsc.frequency.setValueAtTime(noteFreq, now + 0.03);
      chimeGain.gain.setValueAtTime(0.22, now + 0.03);
      chimeGain.gain.exponentialRampToValueAtTime(0.001, now + 0.32);
      chimeOsc.connect(chimeGain);
      chimeGain.connect(ctx.destination);
      chimeOsc.start(now + 0.03);
      chimeOsc.stop(now + 0.34);
    } else if (type === "correct") {
      [523.25, 659.25, 783.99, 1046.5].forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "triangle";
        osc.frequency.setValueAtTime(freq, now + i * 0.08);
        gain.gain.setValueAtTime(0.22, now + i * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.08 + 0.35);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + i * 0.08);
        osc.stop(now + i * 0.08 + 0.36);
      });
    } else if (type === "wrong") {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(240, now);
      osc.frequency.linearRampToValueAtTime(180, now + 0.22);
      gain.gain.setValueAtTime(0.18, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.26);
    } else if (type === "fanfare") {
      const notes = [523.25, 659.25, 783.99, 1046.5, 783.99, 1046.5];
      const times = [0, 0.11, 0.22, 0.33, 0.48, 0.6];
      notes.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "triangle";
        osc.frequency.setValueAtTime(freq, now + times[i]);
        gain.gain.setValueAtTime(0.24, now + times[i]);
        gain.gain.exponentialRampToValueAtTime(0.001, now + times[i] + 0.42);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + times[i]);
        osc.stop(now + times[i] + 0.45);
      });
    } else {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(620, now);
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.09);
    }
  } catch {
    // AudioContext blocked or unsupported
  }
}

function speakArabic(text: string) {
  try {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = "ar-SA";
    utter.rate = 0.88;
    utter.pitch = 1.15;
    window.speechSynthesis.speak(utter);
  } catch {
    // Ignore if speech synthesis unavailable
  }
}

// ── Cute Colorful SVG Counting Item Renderer ──
function ColorfulCountingShape({ shape, index }: { shape: NumberLevel["itemShape"]; index: number }) {
  const palette = BALLOON_PALETTE[index % BALLOON_PALETTE.length];
  switch (shape) {
    case "sun":
      return (
        <svg viewBox="0 0 64 64" width="54" height="54">
          <circle cx="32" cy="32" r="16" fill="#FACC15" stroke="#F59E0B" strokeWidth="3" />
          {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
            <line
              key={deg}
              x1="32"
              y1="6"
              x2="32"
              y2="12"
              stroke="#F59E0B"
              strokeWidth="4"
              strokeLinecap="round"
              transform={`rotate(${deg} 32 32)`}
            />
          ))}
          <circle cx="27" cy="30" r="2.2" fill="#78350F" />
          <circle cx="37" cy="30" r="2.2" fill="#78350F" />
          <path d="M27 36 Q32 41 37 36" fill="none" stroke="#78350F" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      );
    case "apple":
      return (
        <svg viewBox="0 0 64 64" width="52" height="52">
          <path d="M32 18 C22 14, 12 22, 14 36 C16 48, 24 56, 32 54 C40 56, 48 48, 50 36 C52 22, 42 14, 32 18 Z" fill="#EF4444" stroke="#B91C1C" strokeWidth="2.5" />
          <path d="M32 18 Q34 8 40 8" fill="none" stroke="#78350F" strokeWidth="3.5" strokeLinecap="round" />
          <ellipse cx="39" cy="14" rx="7" ry="4" fill="#22C55E" transform="rotate(-25 39 14)" />
          <ellipse cx="23" cy="28" rx="3.5" ry="7" fill="rgba(255,255,255,0.45)" transform="rotate(-15 23 28)" />
        </svg>
      );
    case "star":
      return (
        <svg viewBox="0 0 64 64" width="52" height="52">
          <polygon
            points="32,6 40,22 58,25 45,38 48,56 32,47 16,56 19,38 6,25 24,22"
            fill={palette.body}
            stroke={palette.dark}
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          <circle cx="27" cy="31" r="2" fill="#FFF" />
          <circle cx="37" cy="31" r="2" fill="#FFF" />
          <path d="M28 37 Q32 41 36 37" fill="none" stroke="#FFF" strokeWidth="2.2" strokeLinecap="round" />
        </svg>
      );
    case "flower":
      return (
        <svg viewBox="0 0 64 64" width="52" height="52">
          {[0, 60, 120, 180, 240, 300].map((deg) => (
            <circle
              key={deg}
              cx="32"
              cy="17"
              r="10"
              fill={palette.body}
              transform={`rotate(${deg} 32 32)`}
            />
          ))}
          <circle cx="32" cy="32" r="10" fill="#FDE047" stroke="#EAB308" strokeWidth="2" />
          <circle cx="29" cy="30" r="1.8" fill="#78350F" />
          <circle cx="35" cy="30" r="1.8" fill="#78350F" />
          <path d="M29 35 Q32 38 35 35" fill="none" stroke="#78350F" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    case "heart":
      return (
        <svg viewBox="0 0 64 64" width="50" height="50">
          <path
            d="M32 54 C14 42, 8 30, 12 20 C16 12, 26 12, 32 20 C38 12, 48 12, 52 20 C56 30, 50 42, 32 54 Z"
            fill={palette.body}
            stroke={palette.dark}
            strokeWidth="2.5"
          />
          <ellipse cx="22" cy="24" rx="3" ry="6" fill="rgba(255,255,255,0.45)" transform="rotate(-25 22 24)" />
        </svg>
      );
    case "fish":
      return (
        <svg viewBox="0 0 64 64" width="52" height="52">
          <polygon points="48,32 60,20 60,44" fill={palette.dark} />
          <ellipse cx="30" cy="32" rx="20" ry="14" fill={palette.body} stroke={palette.dark} strokeWidth="2.2" />
          <circle cx="20" cy="29" r="3.2" fill="#FFF" />
          <circle cx="19" cy="29" r="1.6" fill="#0F172A" />
          <path d="M16 36 Q21 39 25 36" fill="none" stroke="#FFF" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    case "gem":
      return (
        <svg viewBox="0 0 64 64" width="50" height="50">
          <polygon points="18,12 46,12 58,28 32,56 6,28" fill={palette.body} stroke={palette.dark} strokeWidth="2.5" strokeLinejoin="round" />
          <polygon points="18,12 46,12 32,28" fill={palette.shine} opacity="0.7" />
          <line x1="6" y1="28" x2="58" y2="28" stroke="#FFF" strokeWidth="2" opacity="0.6" />
        </svg>
      );
    case "butterfly":
      return (
        <svg viewBox="0 0 64 64" width="50" height="50">
          <ellipse cx="20" cy="24" rx="13" ry="11" fill={palette.body} />
          <ellipse cx="44" cy="24" rx="13" ry="11" fill={palette.body} />
          <ellipse cx="22" cy="40" rx="9" ry="9" fill={palette.shine} />
          <ellipse cx="42" cy="40" rx="9" ry="9" fill={palette.shine} />
          <rect x="29" y="18" width="6" height="28" rx="3" fill="#4C1D95" />
          <circle cx="32" cy="16" r="4" fill="#4C1D95" />
        </svg>
      );
    case "cupcake":
      return (
        <svg viewBox="0 0 64 64" width="50" height="50">
          <polygon points="16,34 48,34 42,56 22,56" fill="#F59E0B" stroke="#B45309" strokeWidth="2" />
          <path d="M14 34 C14 20, 50 20, 50 34 Z" fill={palette.body} />
          <circle cx="32" cy="18" r="5" fill="#EF4444" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 64 64" width="48" height="48">
          <ellipse cx="32" cy="26" rx="16" ry="20" fill={palette.body} stroke={palette.dark} strokeWidth="2" />
          <ellipse cx="26" cy="20" rx="4" ry="8" fill={palette.shine} opacity="0.7" transform="rotate(-15 26 20)" />
          <path d="M32 46 Q35 53 30 60" fill="none" stroke="#64748B" strokeWidth="2" />
        </svg>
      );
  }
}

// ── Glossy 3D Balloon SVG Component ──
function GlossyBalloon({
  color,
  label,
  size = 86,
}: {
  color: { body: string; shine: string; dark: string };
  label?: string;
  size?: number;
}) {
  return (
    <svg
      width={size}
      height={size * 1.32}
      viewBox="0 0 90 120"
      style={{ filter: "drop-shadow(0 10px 14px rgba(15,23,42,0.18))", overflow: "visible" }}
    >
      {/* Wavy String */}
      <path
        d="M45 86 Q52 96 43 105 Q37 112 46 119"
        fill="none"
        stroke="rgba(71,85,105,0.65)"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      {/* Knot */}
      <polygon points="40,87 50,87 45,80" fill={color.dark} />
      {/* Balloon Body */}
      <ellipse cx="45" cy="44" rx="34" ry="40" fill={color.body} stroke={color.dark} strokeWidth="2.5" />
      {/* Inner Gradient Highlight */}
      <ellipse cx="34" cy="30" rx="11" ry="18" fill={color.shine} opacity="0.65" transform="rotate(-18 34 30)" />
      <circle cx="29" cy="22" r="4" fill="#FFFFFF" opacity="0.85" />
      {/* Optional Number Label inside balloon */}
      {label && (
        <text
          x="45"
          y="54"
          textAnchor="middle"
          fill="#FFFFFF"
          fontSize="32"
          fontWeight="900"
          style={{
            fontFamily: "'Baloo Bhaijaan 2', sans-serif",
            filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.3))",
          }}
        >
          {label}
        </text>
      )}
    </svg>
  );
}

interface FloatingBalloon {
  uid: string;
  xPercent: number;
  yPercent: number;
  colorIndex: number;
  popped: boolean;
  delay: number;
  duration: number;
  scale: number;
}

interface PopBurst {
  id: number;
  x: number;
  y: number;
  numLabel: string;
  color: string;
}

interface ArcadeBalloon {
  uid: number;
  value: number;
  arabicDigit: string;
  xPercent: number;
  colorIndex: number;
  speedSec: number;
  delay: number;
  popped: boolean;
  wrongShake: boolean;
}

interface NumbersIslandProps {
  onBackToMap: () => void;
  onCompleteIsland: (zoneId: string) => void;
  onProgressUpdate?: (completedCount: number, totalCount: number, completedIds?: string[]) => void;
}

export default function NumbersIslandAdventure({
  onBackToMap,
  onCompleteIsland,
  onProgressUpdate,
}: NumbersIslandProps) {
  const [gameMode, setGameMode] = useState<"learn" | "arcade">("learn");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [completedIds, setCompletedIds] = useState<string[]>([]);

  // Stage inside each level: "pop" (pop N balloons) -> "quiz" (count & pick number) -> "solved"
  const [stage, setStage] = useState<"pop" | "quiz" | "solved">("pop");
  const [balloons, setBalloons] = useState<FloatingBalloon[]>([]);
  const [poppedCount, setPoppedCount] = useState(0);
  const [bursts, setBursts] = useState<PopBurst[]>([]);

  // Quiz state
  const [wrongOption, setWrongOption] = useState<number | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [unlockNotice, setUnlockNotice] = useState(false);

  // Arcade "Balloon Hunt" state
  const [arcadeTarget, setArcadeTarget] = useState<NumberLevel>(NUMBERS_DATA[2]);
  const [arcadeBalloons, setArcadeBalloons] = useState<ArcadeBalloon[]>([]);
  const [arcadeScore, setArcadeScore] = useState(0);
  const [arcadeStreak, setArcadeStreak] = useState(0);
  const [arcadeFeedback, setArcadeFeedback] = useState<string | null>(null);

  const burstIdRef = useRef(0);
  const currentLevel = NUMBERS_DATA[currentIndex];

  // Load saved progress
  useEffect(() => {
    try {
      const saved = localStorage.getItem("madar_numbers_completed_ids");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          setCompletedIds(parsed);
        }
      }
    } catch {}
  }, []);

  // Build fresh floating balloons whenever currentIndex changes
  const initBalloonsForLevel = useCallback((level: NumberLevel) => {
    const count = level.value;
    const generated: FloatingBalloon[] = [];
    // Distribute cleanly across the arena so they never overlap awkwardly
    const cols = count <= 3 ? count : count <= 6 ? 3 : count <= 8 ? 4 : 5;
    const rows = Math.ceil(count / cols);

    for (let i = 0; i < count; i++) {
      const row = Math.floor(i / cols);
      const col = i % cols;
      const itemsInRow = row === rows - 1 ? count - row * cols : cols;
      const colWidth = 84 / itemsInRow;
      const xBase = 8 + col * colWidth + colWidth / 2;
      const xJitter = (Math.sin(i * 12.7) * 4);
      const yBase = rows === 1 ? 48 : 28 + (row / (rows - 1)) * 42;
      const yJitter = Math.cos(i * 9.3) * 5;

      generated.push({
        uid: `${level.id}-b-${i}-${Date.now()}`,
        xPercent: Math.max(10, Math.min(90, xBase + xJitter)),
        yPercent: Math.max(18, Math.min(78, yBase + yJitter)),
        colorIndex: (i + level.value) % BALLOON_PALETTE.length,
        popped: false,
        delay: (i % 5) * 0.35,
        duration: 2.6 + (i % 3) * 0.5,
        scale: count >= 8 ? 0.85 : count >= 5 ? 0.94 : 1.05,
      });
    }
    setBalloons(generated);
    setPoppedCount(0);
    setBursts([]);
    setWrongOption(null);
    setStage("pop");
  }, []);

  useEffect(() => {
    initBalloonsForLevel(currentLevel);
  }, [currentLevel, initBalloonsForLevel]);

  // Arcade round generator
  const initArcadeRound = useCallback(() => {
    const target = NUMBERS_DATA[Math.floor(Math.random() * NUMBERS_DATA.length)];
    setArcadeTarget(target);
    const pool = new Set<number>([target.value]);
    while (pool.size < 6) {
      pool.add(Math.floor(Math.random() * 10) + 1);
    }
    const nums = Array.from(pool).sort(() => Math.random() - 0.5);
    const list: ArcadeBalloon[] = nums.map((val, idx) => {
      const found = NUMBERS_DATA.find((n) => n.value === val)!;
      return {
        uid: Date.now() + idx,
        value: val,
        arabicDigit: found.arabicDigit,
        xPercent: 12 + idx * 15 + (idx % 2 === 0 ? -2 : 2),
        colorIndex: (idx + val) % BALLOON_PALETTE.length,
        speedSec: 3.0 + (idx % 3) * 0.55,
        delay: idx * 0.25,
        popped: false,
        wrongShake: false,
      };
    });
    setArcadeBalloons(list);
    setArcadeFeedback(null);
  }, []);

  useEffect(() => {
    if (gameMode === "arcade") {
      initArcadeRound();
    }
  }, [gameMode, initArcadeRound]);

  // Pop a balloon in Learn Mode
  const handlePopBalloon = (balloon: FloatingBalloon) => {
    if (balloon.popped || stage !== "pop") return;

    const nextCount = poppedCount + 1;
    playSound("pop", nextCount - 1);

    // Update balloon state
    setBalloons((prev) => prev.map((b) => (b.uid === balloon.uid ? { ...b, popped: true } : b)));
    setPoppedCount(nextCount);

    // Spawn burst effect
    const bId = ++burstIdRef.current;
    const matchedNum = NUMBERS_DATA[nextCount - 1];
    setBursts((prev) => [
      ...prev,
      {
        id: bId,
        x: balloon.xPercent,
        y: balloon.yPercent,
        numLabel: matchedNum ? matchedNum.arabicDigit : String(nextCount),
        color: BALLOON_PALETTE[balloon.colorIndex].body,
      },
    ]);
    setTimeout(() => {
      setBursts((prev) => prev.filter((item) => item.id !== bId));
    }, 850);

    // Check if all balloons popped!
    if (nextCount >= currentLevel.value) {
      setTimeout(() => {
        playSound("correct");
        setStage("quiz");
      }, 650);
    }
  };

  // Answer Quiz in Learn Mode
  const handleQuizAnswer = (selectedVal: number) => {
    if (stage !== "quiz") return;

    if (selectedVal === currentLevel.value) {
      playSound("fanfare");
      setWrongOption(null);
      setStage("solved");
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 2400);

      const updated = Array.from(new Set([...completedIds, currentLevel.id]));
      setCompletedIds(updated);
      try {
        localStorage.setItem("madar_numbers_completed_ids", JSON.stringify(updated));
      } catch {}

      if (onProgressUpdate) {
        onProgressUpdate(updated.length, NUMBERS_DATA.length, updated);
      }

      if (updated.length === 8 && !completedIds.includes(currentLevel.id)) {
        setUnlockNotice(true);
      }
    } else {
      playSound("wrong");
      setWrongOption(selectedVal);
      setTimeout(() => setWrongOption(null), 650);
    }
  };

  // Tap Balloon in Arcade Mode
  const handleArcadeTap = (b: ArcadeBalloon) => {
    if (b.popped) return;
    if (b.value === arcadeTarget.value) {
      playSound("fanfare");
      setArcadeBalloons((prev) => prev.map((item) => (item.uid === b.uid ? { ...item, popped: true } : item)));
      setArcadeScore((s) => s + 10);
      setArcadeStreak((st) => st + 1);
      setArcadeFeedback(`أحسنت يا بطل! هذا هو الرقم ${arcadeTarget.arabicDigit} (${arcadeTarget.word})`);
      setShowConfetti(true);
      setTimeout(() => {
        setShowConfetti(false);
        initArcadeRound();
      }, 1350);
    } else {
      playSound("wrong");
      setArcadeStreak(0);
      setArcadeBalloons((prev) =>
        prev.map((item) => (item.uid === b.uid ? { ...item, wrongShake: true } : item))
      );
      setArcadeFeedback(`حاول مرة أخرى! ابحث عن بالون الرقم ${arcadeTarget.arabicDigit} (${arcadeTarget.word})`);
      setTimeout(() => {
        setArcadeBalloons((prev) =>
          prev.map((item) => (item.uid === b.uid ? { ...item, wrongShake: false } : item))
        );
      }, 500);
    }
  };

  const progressPercent = Math.round((completedIds.length / NUMBERS_DATA.length) * 100);
  const canUnlockNext = completedIds.length >= 8;

  return (
    <div
      dir="rtl"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 100,
        background: "linear-gradient(180deg, #38BDF8 0%, #7DD3FC 35%, #E0F2FE 75%, #FEF9C3 100%)",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        fontFamily: "'Baloo Bhaijaan 2', 'Marhey', sans-serif",
      }}
    >
      {/* ── CSS Animations ── */}
      <style>{`
        @keyframes balloonBob {
          0%, 100% { transform: translate(-50%, -50%) translateY(0px) rotate(-2.5deg); }
          50% { transform: translate(-50%, -50%) translateY(-16px) rotate(2.5deg); }
        }
        @keyframes popBurstAnim {
          0% { transform: translate(-50%, -50%) scale(0.4); opacity: 1; }
          60% { transform: translate(-50%, -75%) scale(1.35); opacity: 1; }
          100% { transform: translate(-50%, -105%) scale(1.6); opacity: 0; }
        }
        @keyframes confettiFall {
          0% { transform: translateY(-20px) rotate(0deg); opacity: 1; }
          100% { transform: translateY(105vh) rotate(720deg); opacity: 0; }
        }
        @keyframes gentleBounce {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.07); }
        }
        @keyframes shakeWobble {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-8px) rotate(-4deg); }
          75% { transform: translateX(8px) rotate(4deg); }
        }
        @keyframes cloudDrift {
          0% { transform: translateX(-8%); }
          50% { transform: translateX(8%); }
          100% { transform: translateX(-8%); }
        }
        .balloon-btn:hover {
          filter: brightness(1.07) saturate(1.1);
        }
        .balloon-btn:active {
          transform: translate(-50%, -50%) scale(0.85) !important;
        }
        .num-pill-scroll::-webkit-scrollbar {
          height: 5px;
        }
      `}</style>

      {/* ── Confetti Overlay ── */}
      {showConfetti && (
        <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 200, overflow: "hidden" }}>
          {Array.from({ length: 42 }).map((_, i) => {
            const col = BALLOON_PALETTE[i % BALLOON_PALETTE.length].body;
            return (
              <div
                key={i}
                style={{
                  position: "absolute",
                  top: -15,
                  left: `${(i * 2.4) % 100}%`,
                  width: i % 2 === 0 ? 12 : 9,
                  height: i % 2 === 0 ? 12 : 16,
                  borderRadius: i % 3 === 0 ? "50%" : 3,
                  background: col,
                  animation: `confettiFall ${1.5 + (i % 5) * 0.25}s ease-in forwards`,
                  animationDelay: `${(i % 7) * 0.06}s`,
                }}
              />
            );
          })}
        </div>
      )}

      {/* ── Top Header Bar ── */}
      <header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "10px 18px",
          background: "rgba(255, 255, 255, 0.88)",
          backdropFilter: "blur(12px)",
          borderBottom: "3px solid rgba(255,255,255,0.95)",
          boxShadow: "0 6px 20px rgba(14,165,233,0.16)",
          zIndex: 30,
          gap: 10,
          flexWrap: "wrap",
        }}
      >
        {/* Right: Logo + Title */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ position: "relative", width: 88, height: 34, flexShrink: 0 }}>
            <Image src="/logo.png" alt="مدار الأمل" fill style={{ objectFit: "contain" }} />
          </div>
          <div>
            <h1
              style={{
                margin: 0,
                fontSize: "clamp(16px, 2.4vw, 22px)",
                fontWeight: 900,
                background: "linear-gradient(90deg, #FF5E7E, #F59E0B, #10B981, #0EA5E9)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                lineHeight: 1.1,
              }}
            >
              جزيرة الأرقام والبالونات
            </h1>
          </div>
        </div>

        {/* Center: Mode Toggle Pills */}
        <div
          style={{
            display: "flex",
            background: "#F1F5F9",
            padding: 4,
            borderRadius: 999,
            gap: 4,
            border: "2px solid #E2E8F0",
          }}
        >
          <button
            onClick={() => {
              playSound("click");
              setGameMode("learn");
            }}
            style={{
              padding: "6px 14px",
              borderRadius: 999,
              border: "none",
              cursor: "pointer",
              fontWeight: 800,
              fontSize: 13,
              background: gameMode === "learn" ? "linear-gradient(135deg, #FF5E7E, #FF9F1C)" : "transparent",
              color: gameMode === "learn" ? "#FFF" : "#475569",
              boxShadow: gameMode === "learn" ? "0 3px 10px rgba(255,94,126,0.35)" : "none",
              transition: "all 0.2s",
            }}
          >
            مغامرة الأرقام (١-١٠)
          </button>
          <button
            onClick={() => {
              playSound("click");
              setGameMode("arcade");
            }}
            style={{
              padding: "6px 14px",
              borderRadius: 999,
              border: "none",
              cursor: "pointer",
              fontWeight: 800,
              fontSize: 13,
              background: gameMode === "arcade" ? "linear-gradient(135deg, #8B5CF6, #0EA5E9)" : "transparent",
              color: gameMode === "arcade" ? "#FFF" : "#475569",
              boxShadow: gameMode === "arcade" ? "0 3px 10px rgba(139,92,246,0.35)" : "none",
              transition: "all 0.2s",
            }}
          >
            لعبة صيد البالونات
          </button>
        </div>

        {/* Left: Progress Pill & Back */}
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div
            style={{
              background: "linear-gradient(135deg, #FEF3C7, #FDE68A)",
              border: "2px solid #F59E0B",
              borderRadius: 999,
              padding: "4px 12px",
              fontWeight: 900,
              fontSize: 13,
              color: "#92400E",
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            <span>الإنجاز: {completedIds.length}/10</span>
            <span style={{ color: "#D97706" }}>({progressPercent}%)</span>
          </div>

          <button
            onClick={() => {
              playSound("click");
              onBackToMap();
            }}
            style={{
              background: "linear-gradient(135deg, #5B4FA8, #4338CA)",
              color: "#FFF",
              border: "none",
              borderRadius: 14,
              padding: "7px 14px",
              fontWeight: 800,
              fontSize: 13,
              cursor: "pointer",
              boxShadow: "0 4px 12px rgba(91,79,168,0.3)",
            }}
          >
            خريطة الجزر
          </button>
        </div>
      </header>

      {/* ── Main Play Area ── */}
      <main
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "12px 16px",
          overflowY: "auto",
          position: "relative",
        }}
      >
        {gameMode === "learn" ? (
          <div
            style={{
              width: "100%",
              maxWidth: 960,
              display: "flex",
              flexDirection: "column",
              gap: 14,
            }}
          >
            {/* ── Top Number Showcase Card ── */}
            <div
              style={{
                background: "rgba(255,255,255,0.94)",
                borderRadius: 26,
                padding: "14px 20px",
                border: `3.5px solid ${currentLevel.primaryColor}`,
                boxShadow: `0 12px 28px ${currentLevel.primaryColor}28`,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: 12,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                {/* Giant Glossy Number Badge */}
                <div
                  onClick={() => {
                    playSound("click");
                    speakArabic(`الرقم ${currentLevel.word}`);
                  }}
                  title="اضغط لسماع النطق"
                  style={{
                    width: 74,
                    height: 74,
                    borderRadius: 22,
                    background: `linear-gradient(135deg, ${currentLevel.primaryColor}, ${currentLevel.secondaryColor})`,
                    color: "#FFF",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 44,
                    fontWeight: 900,
                    cursor: "pointer",
                    boxShadow: `0 8px 18px ${currentLevel.primaryColor}55, inset 0 3px 6px rgba(255,255,255,0.5)`,
                    animation: "gentleBounce 2.2s ease-in-out infinite",
                    flexShrink: 0,
                  }}
                >
                  {currentLevel.arabicDigit}
                </div>

                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span
                      style={{
                        fontSize: "clamp(22px, 3vw, 30px)",
                        fontWeight: 900,
                        color: currentLevel.primaryColor,
                      }}
                    >
                      {currentLevel.word}
                    </span>
                    <span
                      style={{
                        background: currentLevel.bgGradient,
                        color: currentLevel.primaryColor,
                        border: `2px solid ${currentLevel.primaryColor}40`,
                        borderRadius: 10,
                        padding: "2px 10px",
                        fontSize: 16,
                        fontWeight: 900,
                      }}
                    >
                      {currentLevel.value}
                    </span>
                    <button
                      onClick={() => speakArabic(`${currentLevel.word}. ${currentLevel.chant}`)}
                      style={{
                        background: "#F1F5F9",
                        border: "2px solid #CBD5E1",
                        borderRadius: 999,
                        padding: "3px 10px",
                        fontSize: 12,
                        fontWeight: 800,
                        color: "#334155",
                        cursor: "pointer",
                      }}
                    >
                      اسمع النطق
                    </button>
                  </div>
                  <p style={{ margin: "3px 0 0", color: "#475569", fontSize: 14, fontWeight: 700 }}>
                    {currentLevel.chant}
                  </p>
                </div>
              </div>

              {/* Live Popped Stars Counter */}
              <div
                style={{
                  background: currentLevel.bgGradient,
                  borderRadius: 18,
                  padding: "8px 14px",
                  border: `2px solid ${currentLevel.primaryColor}44`,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  minWidth: 150,
                }}
              >
                <span style={{ fontSize: 12, fontWeight: 800, color: "#64748B" }}>
                  {stage === "pop" ? "البالونات المفرقعة" : stage === "quiz" ? "تحدي الذكاء" : "ممتاز يا بطل!"}
                </span>
                <div style={{ display: "flex", gap: 4, marginTop: 4, flexWrap: "wrap", justifyContent: "center" }}>
                  {Array.from({ length: currentLevel.value }).map((_, idx) => {
                    const filled = idx < poppedCount || stage !== "pop";
                    return (
                      <div
                        key={idx}
                        style={{
                          width: 22,
                          height: 22,
                          borderRadius: "50%",
                          background: filled
                            ? `linear-gradient(135deg, ${currentLevel.primaryColor}, ${currentLevel.secondaryColor})`
                            : "#E2E8F0",
                          color: filled ? "#FFF" : "#94A3B8",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: 11,
                          fontWeight: 900,
                          transition: "transform 0.25s cubic-bezier(0.34,1.56,0.64,1)",
                          transform: filled ? "scale(1.1)" : "scale(0.92)",
                        }}
                      >
                        {idx + 1}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* ── Interactive Game Stage Card ── */}
            {stage === "pop" && (
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  height: "clamp(300px, 46vh, 420px)",
                  borderRadius: 30,
                  background: "linear-gradient(180deg, #0EA5E9 0%, #38BDF8 45%, #BAE6FD 100%)",
                  border: "4px solid #FFFFFF",
                  boxShadow: "0 16px 36px rgba(14,165,233,0.28), inset 0 -10px 24px rgba(255,255,255,0.5)",
                  overflow: "hidden",
                }}
              >
                {/* Decorative Drifting Clouds */}
                <div
                  style={{
                    position: "absolute",
                    top: 18,
                    left: "8%",
                    width: 110,
                    height: 36,
                    borderRadius: 999,
                    background: "rgba(255,255,255,0.55)",
                    animation: "cloudDrift 9s ease-in-out infinite",
                    pointerEvents: "none",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    top: 48,
                    right: "10%",
                    width: 140,
                    height: 44,
                    borderRadius: 999,
                    background: "rgba(255,255,255,0.45)",
                    animation: "cloudDrift 12s ease-in-out infinite reverse",
                    pointerEvents: "none",
                  }}
                />

                {/* Instruction Banner inside Sky */}
                <div
                  style={{
                    position: "absolute",
                    top: 12,
                    left: "50%",
                    transform: "translateX(-50%)",
                    background: "rgba(255,255,255,0.94)",
                    padding: "6px 20px",
                    borderRadius: 999,
                    boxShadow: "0 6px 16px rgba(15,23,42,0.12)",
                    zIndex: 10,
                    whiteSpace: "nowrap",
                    border: `2px solid ${currentLevel.primaryColor}`,
                  }}
                >
                  <span style={{ fontSize: "clamp(13px, 2vw, 17px)", fontWeight: 900, color: "#1E293B" }}>
                    اضغط على البالونات الملونة لفرقعها وعدّ حتى{" "}
                    <span style={{ color: currentLevel.primaryColor, fontSize: "1.2em" }}>
                      {currentLevel.arabicDigit} ({currentLevel.word})
                    </span>
                  </span>
                </div>

                {/* Floating Interactive Glossy Balloons */}
                {balloons.map((b) =>
                  b.popped ? null : (
                    <button
                      key={b.uid}
                      className="balloon-btn"
                      onClick={() => handlePopBalloon(b)}
                      aria-label="فرقع البالون"
                      style={{
                        position: "absolute",
                        left: `${b.xPercent}%`,
                        top: `${b.yPercent}%`,
                        background: "none",
                        border: "none",
                        padding: 0,
                        cursor: "pointer",
                        animation: `balloonBob ${b.duration}s ease-in-out ${b.delay}s infinite`,
                        zIndex: 15,
                        touchAction: "manipulation",
                      }}
                    >
                      <GlossyBalloon
                        color={BALLOON_PALETTE[b.colorIndex]}
                        size={Math.round(84 * b.scale)}
                      />
                    </button>
                  )
                )}

                {/* Popped Bursts */}
                {bursts.map((burst) => (
                  <div
                    key={burst.id}
                    style={{
                      position: "absolute",
                      left: `${burst.x}%`,
                      top: `${burst.y}%`,
                      pointerEvents: "none",
                      zIndex: 25,
                      animation: "popBurstAnim 0.85s ease-out forwards",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <div
                      style={{
                        width: 58,
                        height: 58,
                        borderRadius: "50%",
                        background: "#FFFFFF",
                        border: `4px solid ${burst.color}`,
                        color: burst.color,
                        fontSize: 30,
                        fontWeight: 900,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        boxShadow: `0 0 24px ${burst.color}`,
                      }}
                    >
                      {burst.numLabel}
                    </div>
                  </div>
                ))}

                {/* Grassy Ground Rim */}
                <div
                  style={{
                    position: "absolute",
                    bottom: -16,
                    left: -10,
                    right: -10,
                    height: 44,
                    borderRadius: "50% 50% 0 0",
                    background: "linear-gradient(180deg, #4ADE80 0%, #16A34A 100%)",
                    pointerEvents: "none",
                  }}
                />
              </div>
            )}

            {/* ── Stage 2: Visual Counting Quiz ── */}
            {stage === "quiz" && (
              <div
                style={{
                  background: "rgba(255,255,255,0.96)",
                  borderRadius: 30,
                  padding: "24px 20px",
                  border: `4px solid ${currentLevel.primaryColor}`,
                  boxShadow: "0 18px 40px rgba(15,23,42,0.14)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 18,
                  minHeight: 320,
                  justifyContent: "center",
                }}
              >
                <div
                  style={{
                    background: currentLevel.bgGradient,
                    color: currentLevel.primaryColor,
                    padding: "6px 20px",
                    borderRadius: 999,
                    fontWeight: 900,
                    fontSize: 18,
                    border: `2px solid ${currentLevel.primaryColor}40`,
                  }}
                >
                  تحدي البطل: كم عدد ({currentLevel.itemName}) أمامك؟
                </div>

                {/* Colorful Visual Objects Tray */}
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "center",
                    gap: 12,
                    padding: "18px 24px",
                    background: "#F8FAFC",
                    borderRadius: 24,
                    border: "2.5px dashed #CBD5E1",
                    maxWidth: 680,
                    width: "100%",
                  }}
                >
                  {Array.from({ length: currentLevel.value }).map((_, idx) => (
                    <div
                      key={idx}
                      style={{
                        animation: `gentleBounce ${1.8 + (idx % 3) * 0.3}s ease-in-out infinite`,
                        animationDelay: `${idx * 0.12}s`,
                      }}
                    >
                      <ColorfulCountingShape shape={currentLevel.itemShape} index={idx} />
                    </div>
                  ))}
                </div>

                {/* 3 Big Glossy Answer Choices */}
                <div style={{ display: "flex", gap: 16, flexWrap: "wrap", justifyContent: "center" }}>
                  {currentLevel.options.map((optVal, i) => {
                    const numMeta = NUMBERS_DATA.find((n) => n.value === optVal)!;
                    const isWrong = wrongOption === optVal;
                    const pal = BALLOON_PALETTE[(i * 2 + currentIndex) % BALLOON_PALETTE.length];
                    return (
                      <button
                        key={optVal}
                        onClick={() => handleQuizAnswer(optVal)}
                        style={{
                          minWidth: 118,
                          padding: "14px 22px",
                          borderRadius: 22,
                          border: "none",
                          cursor: "pointer",
                          background: isWrong
                            ? "linear-gradient(135deg, #EF4444, #DC2626)"
                            : `linear-gradient(135deg, ${pal.body}, ${pal.dark})`,
                          color: "#FFF",
                          boxShadow: `0 8px 18px ${pal.body}55, inset 0 3px 6px rgba(255,255,255,0.4)`,
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          gap: 2,
                          animation: isWrong ? "shakeWobble 0.45s ease" : "none",
                          transition: "transform 0.15s",
                        }}
                      >
                        <span style={{ fontSize: 36, fontWeight: 900, lineHeight: 1 }}>
                          {numMeta.arabicDigit}
                        </span>
                        <span style={{ fontSize: 15, fontWeight: 800, opacity: 0.95 }}>
                          {numMeta.word}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* ── Stage 3: Level Solved Celebration Card ── */}
            {stage === "solved" && (
              <div
                style={{
                  background: "rgba(255,255,255,0.97)",
                  borderRadius: 30,
                  padding: "28px 24px",
                  border: "4px solid #10B981",
                  boxShadow: "0 20px 44px rgba(16,185,129,0.22)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                  gap: 14,
                  minHeight: 310,
                  justifyContent: "center",
                }}
              >
                <div
                  style={{
                    width: 88,
                    height: 88,
                    borderRadius: "50%",
                    background: `linear-gradient(135deg, ${currentLevel.primaryColor}, ${currentLevel.secondaryColor})`,
                    color: "#FFF",
                    fontSize: 48,
                    fontWeight: 900,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: `0 12px 28px ${currentLevel.primaryColor}55`,
                  }}
                >
                  {currentLevel.arabicDigit}
                </div>

                <h2 style={{ margin: 0, fontSize: 28, fontWeight: 900, color: "#059669" }}>
                  رائع يا بطل! أتقنت الرقم {currentLevel.word}
                </h2>
                <p style={{ margin: 0, fontSize: 16, fontWeight: 700, color: "#475569" }}>
                  حصلت على نجمة جديدة في جزيرة الأرقام! ({completedIds.length} من 10 أرقام)
                </p>

                {unlockNotice && (
                  <div
                    style={{
                      background: "linear-gradient(135deg, #FEF3C7, #FDE68A)",
                      border: "2px solid #F59E0B",
                      color: "#92400E",
                      padding: "8px 18px",
                      borderRadius: 16,
                      fontWeight: 900,
                      fontSize: 15,
                    }}
                  >
                    مبروك! وصلت إلى 80% وفتحت الجزيرة التالية (جزيرة الخضار)!
                  </div>
                )}

                <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center", marginTop: 6 }}>
                  <button
                    onClick={() => {
                      playSound("click");
                      initBalloonsForLevel(currentLevel);
                    }}
                    style={{
                      padding: "11px 22px",
                      borderRadius: 16,
                      border: "2px solid #CBD5E1",
                      background: "#F8FAFC",
                      color: "#334155",
                      fontWeight: 800,
                      fontSize: 15,
                      cursor: "pointer",
                    }}
                  >
                    العب الرقم مرة أخرى
                  </button>

                  {currentIndex < NUMBERS_DATA.length - 1 ? (
                    <button
                      onClick={() => {
                        playSound("click");
                        setCurrentIndex((i) => i + 1);
                      }}
                      style={{
                        padding: "11px 28px",
                        borderRadius: 16,
                        border: "none",
                        background: "linear-gradient(135deg, #10B981, #059669)",
                        color: "#FFF",
                        fontWeight: 900,
                        fontSize: 16,
                        cursor: "pointer",
                        boxShadow: "0 8px 18px rgba(16,185,129,0.4)",
                      }}
                    >
                      الرقم التالي ({NUMBERS_DATA[currentIndex + 1].word})
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        playSound("fanfare");
                        onCompleteIsland("numbers");
                      }}
                      style={{
                        padding: "11px 28px",
                        borderRadius: 16,
                        border: "none",
                        background: "linear-gradient(135deg, #F59E0B, #EA580C)",
                        color: "#FFF",
                        fontWeight: 900,
                        fontSize: 16,
                        cursor: "pointer",
                        boxShadow: "0 8px 18px rgba(245,158,11,0.45)",
                      }}
                    >
                      إنهاء جزيرة الأرقام والاحتفال!
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        ) : (
          /* ── BONUS MODE: BALLOON HUNT ARCADE GAME ── */
          <div style={{ width: "100%", maxWidth: 960, display: "flex", flexDirection: "column", gap: 14 }}>
            <div
              style={{
                background: "rgba(255,255,255,0.95)",
                borderRadius: 24,
                padding: "14px 20px",
                border: "3px solid #8B5CF6",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: 10,
                boxShadow: "0 10px 24px rgba(139,92,246,0.2)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div
                  style={{
                    width: 60,
                    height: 60,
                    borderRadius: 18,
                    background: `linear-gradient(135deg, ${arcadeTarget.primaryColor}, ${arcadeTarget.secondaryColor})`,
                    color: "#FFF",
                    fontSize: 34,
                    fontWeight: 900,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {arcadeTarget.arabicDigit}
                </div>
                <div>
                  <div style={{ fontSize: 20, fontWeight: 900, color: "#4C1D95" }}>
                    اصطد بالون الرقم: {arcadeTarget.word} ({arcadeTarget.arabicDigit})
                  </div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: "#64748B" }}>
                    {arcadeFeedback || "اضغط بسرعة على البالون الذي يحمل الرقم المطلوب!"}
                  </div>
                </div>
              </div>

              <div style={{ display: "flex", gap: 10 }}>
                <div
                  style={{
                    background: "#FEF3C7",
                    border: "2px solid #F59E0B",
                    borderRadius: 14,
                    padding: "6px 14px",
                    fontWeight: 900,
                    color: "#92400E",
                    fontSize: 15,
                  }}
                >
                  النقاط: {arcadeScore}
                </div>
                <div
                  style={{
                    background: "#ECFDF5",
                    border: "2px solid #10B981",
                    borderRadius: 14,
                    padding: "6px 14px",
                    fontWeight: 900,
                    color: "#065F46",
                    fontSize: 15,
                  }}
                >
                  التتابع: {arcadeStreak}
                </div>
              </div>
            </div>

            <div
              style={{
                position: "relative",
                width: "100%",
                height: "clamp(320px, 50vh, 440px)",
                borderRadius: 30,
                background: "linear-gradient(180deg, #6366F1 0%, #38BDF8 55%, #A7F3D0 100%)",
                border: "4px solid #FFFFFF",
                boxShadow: "0 16px 36px rgba(99,102,241,0.28)",
                overflow: "hidden",
              }}
            >
              {arcadeBalloons.map((b, idx) =>
                b.popped ? null : (
                  <button
                    key={b.uid}
                    className="balloon-btn"
                    onClick={() => handleArcadeTap(b)}
                    style={{
                      position: "absolute",
                      left: `${b.xPercent}%`,
                      top: `${32 + (idx % 2) * 34}%`,
                      background: "none",
                      border: "none",
                      padding: 0,
                      cursor: "pointer",
                      animation: b.wrongShake
                        ? "shakeWobble 0.4s ease"
                        : `balloonBob ${b.speedSec}s ease-in-out ${b.delay}s infinite`,
                      touchAction: "manipulation",
                    }}
                  >
                    <GlossyBalloon
                      color={BALLOON_PALETTE[b.colorIndex]}
                      label={b.arabicDigit}
                      size={90}
                    />
                  </button>
                )
              )}
            </div>
          </div>
        )}
      </main>

      {/* ── Bottom Colorful Number Stepper (1 to 10) ── */}
      {gameMode === "learn" && (
        <footer
          style={{
            background: "rgba(255,255,255,0.92)",
            backdropFilter: "blur(10px)",
            borderTop: "3px solid #FFFFFF",
            padding: "10px 14px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 10,
            zIndex: 30,
          }}
        >
          <div
            className="num-pill-scroll"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              overflowX: "auto",
              paddingBottom: 2,
              maxWidth: "100%",
            }}
          >
            {NUMBERS_DATA.map((item, idx) => {
              const isActive = idx === currentIndex;
              const isSolved = completedIds.includes(item.id);
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    playSound("click");
                    setCurrentIndex(idx);
                  }}
                  style={{
                    minWidth: 50,
                    height: 50,
                    borderRadius: 16,
                    border: isActive ? "3px solid #1E293B" : "2px solid rgba(255,255,255,0.8)",
                    background: isSolved
                      ? "linear-gradient(135deg, #10B981, #059669)"
                      : isActive
                      ? `linear-gradient(135deg, ${item.primaryColor}, ${item.secondaryColor})`
                      : "#F1F5F9",
                    color: isSolved || isActive ? "#FFF" : "#334155",
                    fontSize: 22,
                    fontWeight: 900,
                    cursor: "pointer",
                    position: "relative",
                    boxShadow: isActive ? `0 6px 14px ${item.primaryColor}55` : "none",
                    transform: isActive ? "scale(1.08)" : "scale(1)",
                    transition: "all 0.2s",
                    flexShrink: 0,
                  }}
                >
                  {item.arabicDigit}
                  {isSolved && (
                    <span
                      style={{
                        position: "absolute",
                        top: -5,
                        right: -5,
                        width: 18,
                        height: 18,
                        borderRadius: "50%",
                        background: "#FACC15",
                        color: "#78350F",
                        fontSize: 11,
                        fontWeight: 900,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        border: "2px solid #FFF",
                      }}
                    >
                      ✓
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {canUnlockNext && (
            <button
              onClick={() => {
                playSound("fanfare");
                onCompleteIsland("numbers");
              }}
              style={{
                background: "linear-gradient(135deg, #F59E0B, #EA580C)",
                color: "#FFF",
                border: "none",
                borderRadius: 14,
                padding: "10px 16px",
                fontWeight: 900,
                fontSize: 13,
                cursor: "pointer",
                whiteSpace: "nowrap",
                boxShadow: "0 4px 12px rgba(245,158,11,0.4)",
              }}
            >
              افتح الجزيرة التالية
            </button>
          )}
        </footer>
      )}
    </div>
  );
}
