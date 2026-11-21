"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { readProgress } from "@/lib/learning-progress";
import LearningAudioControls from "./LearningAudioControls";
import { speakLearningText, isLearningSoundEnabled } from "@/lib/learning-audio";

export interface EnglishLetterItem {
  id: string;
  upper: string;
  lower: string;
  word: string;
  arabicWord: string;
  phonics: string;
  icon: string;
  accent: string;
}

export const ENGLISH_LETTERS: EnglishLetterItem[] = [
  { id: "en-A", upper: "A", lower: "a", word: "Apple", arabicWord: "تُفَّاحَة", phonics: "/æ/", icon: "🍎", accent: "#EF4444" },
  { id: "en-B", upper: "B", lower: "b", word: "Ball", arabicWord: "كُرَة", phonics: "/b/", icon: "⚽", accent: "#3B82F6" },
  { id: "en-C", upper: "C", lower: "c", word: "Cat", arabicWord: "قِطَّة", phonics: "/k/", icon: "🐱", accent: "#F59E0B" },
  { id: "en-D", upper: "D", lower: "d", word: "Duck", arabicWord: "بَطَّة", phonics: "/d/", icon: "🦆", accent: "#10B981" },
  { id: "en-E", upper: "E", lower: "e", word: "Elephant", arabicWord: "فِيل", phonics: "/e/", icon: "🐘", accent: "#6366F1" },
  { id: "en-F", upper: "F", lower: "f", word: "Fish", arabicWord: "سَمَكَة", phonics: "/f/", icon: "🐟", accent: "#06B6D4" },
  { id: "en-G", upper: "G", lower: "g", word: "Giraffe", arabicWord: "زَرَافَة", phonics: "/dʒ/", icon: "🦒", accent: "#EA580C" },
  { id: "en-H", upper: "H", lower: "h", word: "Home", arabicWord: "مَنْزِل", phonics: "/h/", icon: "🏠", accent: "#EC4899" },
  { id: "en-I", upper: "I", lower: "i", word: "Ice Cream", arabicWord: "آيس كريم", phonics: "/aɪ/", icon: "🍦", accent: "#DB2777" },
  { id: "en-J", upper: "J", lower: "j", word: "Juice", arabicWord: "عَصِير", phonics: "/dʒ/", icon: "🧃", accent: "#F97316" },
  { id: "en-K", upper: "K", lower: "k", word: "Kite", arabicWord: "طَائِرَة وَرَقِيَّة", phonics: "/k/", icon: "🪁", accent: "#8B5CF6" },
  { id: "en-L", upper: "L", lower: "l", word: "Lion", arabicWord: "أَسَد", phonics: "/l/", icon: "🦁", accent: "#D97706" },
  { id: "en-M", upper: "M", lower: "m", word: "Moon", arabicWord: "قَمَر", phonics: "/m/", icon: "🌙", accent: "#4F46E5" },
  { id: "en-N", upper: "N", lower: "n", word: "Nest", arabicWord: "عُشّ", phonics: "/n/", icon: "🪺", accent: "#16A34A" },
  { id: "en-O", upper: "O", lower: "o", word: "Orange", arabicWord: "بُرْتُقَالَة", phonics: "/ɒ/", icon: "🍊", accent: "#EA580C" },
  { id: "en-P", upper: "P", lower: "p", word: "Panda", arabicWord: "بَانْدَا", phonics: "/p/", icon: "🐼", accent: "#0F172A" },
  { id: "en-Q", upper: "Q", lower: "q", word: "Queen", arabicWord: "مَلِكَة", phonics: "/kw/", icon: "👑", accent: "#A855F7" },
  { id: "en-R", upper: "R", lower: "r", word: "Rainbow", arabicWord: "قَوْس قُزَح", phonics: "/r/", icon: "🌈", accent: "#EC4899" },
  { id: "en-S", upper: "S", lower: "s", word: "Sun", arabicWord: "شَمْس", phonics: "/s/", icon: "☀️", accent: "#EAB308" },
  { id: "en-T", upper: "T", lower: "t", word: "Tree", arabicWord: "شَجَرَة", phonics: "/t/", icon: "🌳", accent: "#15803D" },
  { id: "en-U", upper: "U", lower: "u", word: "Umbrella", arabicWord: "مِظَلَّة", phonics: "/ʌ/", icon: "☂️", accent: "#7C3AED" },
  { id: "en-V", upper: "V", lower: "v", word: "Van", arabicWord: "شَاحِنَة", phonics: "/v/", icon: "🚐", accent: "#0284C7" },
  { id: "en-W", upper: "W", lower: "w", word: "Whale", arabicWord: "حُوت", phonics: "/w/", icon: "🐳", accent: "#2563EB" },
  { id: "en-X", upper: "X", lower: "x", word: "Xylophone", arabicWord: "إِكْسِيلِيفُون", phonics: "/z/", icon: "🎵", accent: "#E11D48" },
  { id: "en-Y", upper: "Y", lower: "y", word: "Yo-Yo", arabicWord: "يُويُو", phonics: "/j/", icon: "🪀", accent: "#14B8A6" },
  { id: "en-Z", upper: "Z", lower: "z", word: "Zebra", arabicWord: "حِمَار وَحْشِيّ", phonics: "/z/", icon: "🦓", accent: "#334155" },
];

const PAINT_COLORS = [
  { id: "red", hex: "#FF4D6D", name: "أحمر" },
  { id: "orange", hex: "#FF9F1C", name: "برتقالي" },
  { id: "yellow", hex: "#FACC15", name: "أصفر" },
  { id: "green", hex: "#10B981", name: "أخضر" },
  { id: "cyan", hex: "#06B6D4", name: "سماوي" },
  { id: "blue", hex: "#3B82F6", name: "أزرق" },
  { id: "purple", hex: "#8B5CF6", name: "بنفسجي" },
  { id: "pink", hex: "#EC4899", name: "وردي" },
  { id: "brown", hex: "#A16207", name: "بني" },
  { id: "rainbow", hex: "rainbow", name: "قوس قزح" },
];

function playStudioSound(type: "pop" | "sparkle" | "fanfare" | "fill" | "click") {
  if (!isLearningSoundEnabled()) return;
  try {
    const AudioCtx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const now = ctx.currentTime;

    if (type === "fill") {
      [440, 554.37, 659.25, 880].forEach((f, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(f, now + i * 0.05);
        gain.gain.setValueAtTime(0.16, now + i * 0.05);
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.05 + 0.25);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + i * 0.05);
        osc.stop(now + i * 0.05 + 0.26);
      });
    } else if (type === "sparkle") {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(980, now);
      osc.frequency.exponentialRampToValueAtTime(1480, now + 0.14);
      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.16);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.17);
    } else if (type === "fanfare") {
      const notes = [523.25, 659.25, 783.99, 1046.5, 1318.51];
      notes.forEach((f, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "triangle";
        osc.frequency.setValueAtTime(f, now + i * 0.09);
        gain.gain.setValueAtTime(0.2, now + i * 0.09);
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.09 + 0.4);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + i * 0.09);
        osc.stop(now + i * 0.09 + 0.42);
      });
    } else {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(type === "pop" ? 520 : 660, now);
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.09);
    }
  } catch {}
}

function speakEnglish(text: string) {
  speakLearningText(text, "en-US");
}

interface EnglishColoringIslandProps {
  onBackToMap: () => void;
  onCompleteIsland: (zoneId: string) => void;
}

export default function EnglishColoringIsland({
  onBackToMap,
  onCompleteIsland,
}: EnglishColoringIslandProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [completedIds, setCompletedIds] = useState<string[]>(() => readProgress("english"));
  const [selectedColor, setSelectedColor] = useState<string>("#FF4D6D");
  const [tool, setTool] = useState<"brush" | "fill" | "stamp">("brush");
  const [brushSize, setBrushSize] = useState<number>(34);
  const [strokeCount, setStrokeCount] = useState<number>(0);
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [justFinished, setJustFinished] = useState<boolean>(false);

  // Two stacked canvases: paintCanvas (masked strictly inside letter!) + outlineCanvas (crisp border on top)
  const paintCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const outlineCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const isDrawingRef = useRef(false);
  const lastPosRef = useRef<{ x: number; y: number } | null>(null);
  const rainbowHueRef = useRef(0);

  const currentItem = ENGLISH_LETTERS[currentIndex];
  function selectLetter(index: number) {
    setCurrentIndex(index);
    const item = ENGLISH_LETTERS[index];
    speakEnglish(item.upper + ". " + item.upper + " is for " + item.word);
  }
  const CANVAS_W = 680;
  const CANVAS_H = 380;


  // Draw crisp letter mask & outer black outline whenever letter changes
  const resetCanvases = useCallback(() => {
    const pCanvas = paintCanvasRef.current;
    const oCanvas = outlineCanvasRef.current;
    if (!pCanvas || !oCanvas) return;

    const pCtx = pCanvas.getContext("2d");
    const oCtx = oCanvas.getContext("2d");
    if (!pCtx || !oCtx) return;

    const letterText = `${currentItem.upper} ${currentItem.lower}`;
    const fontSpec = "900 265px 'Arial Rounded MT Bold', 'Baloo Bhaijaan 2', 'Fredoka', Arial, sans-serif";

    // 1. Paint canvas: fill clean white letter silhouette as our destination-atop alpha mask
    pCtx.globalCompositeOperation = "source-over";
    pCtx.clearRect(0, 0, CANVAS_W, CANVAS_H);
    pCtx.font = fontSpec;
    pCtx.textAlign = "center";
    pCtx.textBaseline = "middle";
    pCtx.fillStyle = "#FFFFFF";
    pCtx.fillText(letterText, CANVAS_W / 2, CANVAS_H / 2 + 12);

    // 2. Outline canvas: crisp thick cartoon border on top so lines ALWAYS stay clean!
    oCtx.clearRect(0, 0, CANVAS_W, CANVAS_H);
    oCtx.font = fontSpec;
    oCtx.textAlign = "center";
    oCtx.textBaseline = "middle";
    oCtx.lineJoin = "round";
    oCtx.lineCap = "round";
    oCtx.strokeStyle = "#1E293B";
    oCtx.lineWidth = 10;
    oCtx.strokeText(letterText, CANVAS_W / 2, CANVAS_H / 2 + 12);

    setStrokeCount(0);
    setJustFinished(false);
  }, [currentItem]);

  useEffect(() => {
    resetCanvases();
  }, [resetCanvases]);

  const getCanvasCoords = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = paintCanvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    return {
      x: ((e.clientX - rect.left) / rect.width) * CANVAS_W,
      y: ((e.clientY - rect.top) / rect.height) * CANVAS_H,
    };
  };

  const getActiveStrokeStyle = () => {
    if (selectedColor === "rainbow") {
      rainbowHueRef.current = (rainbowHueRef.current + 6) % 360;
      return `hsl(${rainbowHueRef.current}, 92%, 56%)`;
    }
    return selectedColor;
  };

  const drawStarStamp = (ctx: CanvasRenderingContext2D, cx: number, cy: number, color: string) => {
    ctx.save();
    ctx.globalCompositeOperation = "source-atop";
    ctx.fillStyle = color;
    ctx.beginPath();
    const spikes = 5;
    const outerR = 24;
    const innerR = 11;
    for (let i = 0; i < spikes * 2; i++) {
      const r = i % 2 === 0 ? outerR : innerR;
      const angle = (i * Math.PI) / spikes - Math.PI / 2;
      const sx = cx + Math.cos(angle) * r;
      const sy = cy + Math.sin(angle) * r;
      if (i === 0) ctx.moveTo(sx, sy);
      else ctx.lineTo(sx, sy);
    }
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = "#FFFFFF";
    ctx.lineWidth = 2.5;
    ctx.stroke();
    ctx.restore();
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const pCanvas = paintCanvasRef.current;
    if (!pCanvas) return;
    const ctx = pCanvas.getContext("2d");
    if (!ctx) return;

    const pos = getCanvasCoords(e);

    if (tool === "fill") {
      // Magic instant fill inside the letter!
      ctx.save();
      ctx.globalCompositeOperation = "source-atop";
      if (selectedColor === "rainbow") {
        const grad = ctx.createLinearGradient(80, 0, CANVAS_W - 80, CANVAS_H);
        grad.addColorStop(0, "#FF4D6D");
        grad.addColorStop(0.2, "#FF9F1C");
        grad.addColorStop(0.4, "#FACC15");
        grad.addColorStop(0.6, "#10B981");
        grad.addColorStop(0.8, "#0EA5E9");
        grad.addColorStop(1, "#8B5CF6");
        ctx.fillStyle = grad;
      } else {
        ctx.fillStyle = selectedColor;
      }
      ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);
      ctx.restore();
      playStudioSound("fill");
      setStrokeCount((c) => c + 12);
      return;
    }

    if (tool === "stamp") {
      const col = getActiveStrokeStyle();
      drawStarStamp(ctx, pos.x, pos.y, col);
      playStudioSound("sparkle");
      setStrokeCount((c) => c + 3);
      return;
    }

    // Brush tool (source-atop keeps ALL paint strictly inside the letter!)
    isDrawingRef.current = true;
    lastPosRef.current = pos;

    ctx.save();
    ctx.globalCompositeOperation = "source-atop";
    ctx.fillStyle = getActiveStrokeStyle();
    ctx.beginPath();
    ctx.arc(pos.x, pos.y, brushSize / 2, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
    setStrokeCount((c) => c + 1);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawingRef.current || tool !== "brush") return;
    const pCanvas = paintCanvasRef.current;
    if (!pCanvas || !lastPosRef.current) return;
    const ctx = pCanvas.getContext("2d");
    if (!ctx) return;

    const pos = getCanvasCoords(e);
    ctx.save();
    ctx.globalCompositeOperation = "source-atop";
    ctx.strokeStyle = getActiveStrokeStyle();
    ctx.lineWidth = brushSize;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.beginPath();
    ctx.moveTo(lastPosRef.current.x, lastPosRef.current.y);
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
    ctx.restore();

    lastPosRef.current = pos;
    setStrokeCount((c) => c + 1);
  };

  const handlePointerUp = () => {
    isDrawingRef.current = false;
    lastPosRef.current = null;
  };

  const handleCompleteLetter = () => {
    playStudioSound("fanfare");
    speakEnglish(`Awesome! ${currentItem.upper} is for ${currentItem.word}!`);
    setShowConfetti(true);
    setJustFinished(true);
    setTimeout(() => setShowConfetti(false), 2400);

    const updated = Array.from(new Set([...completedIds, currentItem.id]));
    setCompletedIds(updated);
    try {
      localStorage.setItem("madar_english_completed_ids", JSON.stringify(updated));
    } catch {}
  };

  const handleDownloadArtwork = () => {
    const pCanvas = paintCanvasRef.current;
    const oCanvas = outlineCanvasRef.current;
    if (!pCanvas || !oCanvas) return;

    const out = document.createElement("canvas");
    out.width = CANVAS_W;
    out.height = CANVAS_H;
    const ctx = out.getContext("2d");
    if (!ctx) return;

    ctx.fillStyle = "#FFFBEB";
    ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);
    ctx.drawImage(pCanvas, 0, 0);
    ctx.drawImage(oCanvas, 0, 0);

    const link = document.createElement("a");
    link.download = `madar-letter-${currentItem.upper}.png`;
    link.href = out.toDataURL("image/png");
    link.click();
    playStudioSound("sparkle");
  };

  const progressPercent = Math.round((completedIds.length / ENGLISH_LETTERS.length) * 100);

  return (
    <div
      dir="rtl"
      className="activity-shell game-activity"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 100,
        background: "linear-gradient(180deg, #F472B6 0%, #FBBF24 45%, #FEF3C7 100%)",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        fontFamily: "'Baloo Bhaijaan 2', 'Marhey', sans-serif",
      }}
    >
      <style>{`
        @keyframes engConfetti {
          0% { transform: translateY(-20px) rotate(0deg); opacity: 1; }
          100% { transform: translateY(105vh) rotate(720deg); opacity: 0; }
        }
        .eng-scroll::-webkit-scrollbar { height: 5px; }
      `}</style>

      {/* Confetti */}
      {showConfetti && (
        <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 200, overflow: "hidden" }}>
          {Array.from({ length: 42 }).map((_, i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                top: -15,
                left: `${(i * 2.4) % 100}%`,
                width: i % 2 === 0 ? 12 : 9,
                height: i % 2 === 0 ? 12 : 16,
                borderRadius: i % 3 === 0 ? "50%" : 3,
                background: PAINT_COLORS[i % (PAINT_COLORS.length - 1)].hex,
                animation: `engConfetti ${1.4 + (i % 5) * 0.24}s ease-in forwards`,
              }}
            />
          ))}
        </div>
      )}

      {/* Header */}
      <header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "10px 18px",
          background: "rgba(255,255,255,0.92)",
          backdropFilter: "blur(12px)",
          borderBottom: "3px solid #FFFFFF",
          boxShadow: "0 6px 20px rgba(244,114,182,0.2)",
          zIndex: 30,
          gap: 10,
          flexWrap: "wrap",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ position: "relative", width: 48, height: 48, flexShrink: 0 }}>
            <Image src="/logo.png" alt="العب واتعلم" fill style={{ objectFit: "contain" }} />
          </div>
          <h1
            style={{
              margin: 0,
              fontSize: "clamp(16px, 2.4vw, 22px)",
              fontWeight: 900,
              background: "linear-gradient(90deg, #EC4899, #F59E0B, #10B981, #3B82F6)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              lineHeight: 1.1,
            }}
          >
            استوديو تلوين الحروف الإنجليزية
          </h1>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div
            style={{
              background: "linear-gradient(135deg, #FCE7F3, #FEF3C7)",
              border: "2px solid #EC4899",
              borderRadius: 999,
              padding: "4px 12px",
              fontWeight: 900,
              fontSize: 13,
              color: "#9D174D",
            }}
          >
            المُلوَّن: {completedIds.length}/{ENGLISH_LETTERS.length} ({progressPercent}%)
          </div>
          <button
            onClick={() => {
              playStudioSound("click");
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
            }}
          >
            خريطة الجزر
          </button>
        </div>
        <LearningAudioControls />
      </header>

      {/* Main Coloring Workspace */}
      <main
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "10px 14px",
          overflowY: "auto",
          gap: 10,
        }}
      >
        <div style={{ width: "100%", maxWidth: 940, display: "flex", flexDirection: "column", gap: 10 }}>
          {/* Top English Word & Phonics Card */}
          <div className="english-word-card"
            style={{
              background: "rgba(255,255,255,0.95)",
              borderRadius: 22,
              padding: "10px 18px",
              border: `3px solid ${currentItem.accent}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: 10,
              boxShadow: "0 8px 20px rgba(15,23,42,0.1)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div
                onClick={() => speakEnglish(`${currentItem.upper}! ${currentItem.word}!`)}
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: 18,
                  background: currentItem.accent,
                  color: "#FFF",
                  fontSize: 28,
                  fontWeight: 900,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  letterSpacing: 1,
                }}
              >
                {currentItem.upper}{currentItem.lower}
              </div>
              <div dir="ltr" style={{ textAlign: "left" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ fontSize: 24, fontWeight: 900, color: currentItem.accent }}>
                    {currentItem.upper}{currentItem.lower} — {currentItem.word}
                  </span>
                  <span style={{ background: "#F1F5F9", color: "#475569", padding: "2px 8px", borderRadius: 8, fontSize: 13, fontWeight: 800 }}>
                    {currentItem.phonics}
                  </span>
                </div>
                <div dir="rtl" style={{ fontSize: 14, fontWeight: 800, color: "#475569", textAlign: "right" }}>
                  المعنى بالعربية: <strong>{currentItem.arabicWord}</strong> — لوّن الحرف بالألوان التي تحبها
                </div>
              </div>
            </div>

            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              <button
                onClick={() => speakEnglish(`${currentItem.upper} is for ${currentItem.word}`)}
                style={{
                  background: "linear-gradient(135deg, #0EA5E9, #2563EB)",
                  color: "#FFF",
                  border: "none",
                  borderRadius: 14,
                  padding: "7px 14px",
                  fontWeight: 800,
                  fontSize: 13,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                  <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                  <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                </svg>
                اسمع النطق بالإنجليزية
              </button>
              <button
                onClick={handleDownloadArtwork}
                style={{
                  background: "#F1F5F9",
                  color: "#334155",
                  border: "2px solid #CBD5E1",
                  borderRadius: 14,
                  padding: "6px 12px",
                  fontWeight: 800,
                  fontSize: 13,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                }}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                حفظ اللوحة
              </button>
            </div>
          </div>

          {/* Interactive Drawing Board + Tools */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              background: "#FFFFFF",
              borderRadius: 28,
              padding: "14px",
              border: "4px solid #FFFFFF",
              boxShadow: "0 18px 40px rgba(15,23,42,0.16)",
              gap: 12,
            }}
          >
            {/* Toolbar Row */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", flexWrap: "wrap", gap: 8 }}>
              {/* Tool Buttons */}
              <div style={{ display: "flex", gap: 6 }}>
                <button
                  onClick={() => {
                    playStudioSound("click");
                    setTool("brush");
                  }}
                  style={{
                    padding: "6px 14px",
                    borderRadius: 14,
                    border: tool === "brush" ? "2.5px solid #1E293B" : "2px solid #E2E8F0",
                    background: tool === "brush" ? "linear-gradient(135deg, #F59E0B, #EC4899)" : "#F8FAFC",
                    color: tool === "brush" ? "#FFF" : "#334155",
                    fontWeight: 800,
                    fontSize: 13,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                  }}
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18.37 2.63 14 7l-1.59-1.59a2 2 0 0 0-2.82 0L8 7l9 9 1.59-1.59a2 2 0 0 0 0-2.82L17 10l4.37-4.37a2.12 2.12 0 1 0-3-3Z" />
                    <path d="M9 8c-2 3-4 3.5-7 4l8 10c2-1 6-5 6-7" />
                  </svg>
                  فرشاة
                </button>
                <button
                  onClick={() => {
                    playStudioSound("click");
                    setTool("fill");
                  }}
                  style={{
                    padding: "6px 14px",
                    borderRadius: 14,
                    border: tool === "fill" ? "2.5px solid #1E293B" : "2px solid #E2E8F0",
                    background: tool === "fill" ? "linear-gradient(135deg, #F59E0B, #EC4899)" : "#F8FAFC",
                    color: tool === "fill" ? "#FFF" : "#334155",
                    fontWeight: 800,
                    fontSize: 13,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                  }}
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m19 11-8-8-8.6 8.6a2 2 0 0 0 0 2.8l5.2 5.2c.8.8 2 .8 2.8 0L19 11Z" />
                    <path d="m5 2 5 5" />
                    <path d="M2 13h15" />
                    <path d="M22 20a2 2 0 1 1-4 0c0-1.6 1.7-2.4 2-4 .3 1.6 2 2.4 2 4Z" />
                  </svg>
                  تعبئة سريعة
                </button>
                <button
                  onClick={() => {
                    playStudioSound("click");
                    setTool("stamp");
                  }}
                  style={{
                    padding: "6px 14px",
                    borderRadius: 14,
                    border: tool === "stamp" ? "2.5px solid #1E293B" : "2px solid #E2E8F0",
                    background: tool === "stamp" ? "linear-gradient(135deg, #F59E0B, #EC4899)" : "#F8FAFC",
                    color: tool === "stamp" ? "#FFF" : "#334155",
                    fontWeight: 800,
                    fontSize: 13,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                  }}
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                  نجوم
                </button>
              </div>

              {/* Brush Sizes */}
              {tool === "brush" && (
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <span style={{ fontSize: 12, fontWeight: 800, color: "#64748B" }}>الحجم:</span>
                  {[20, 34, 52].map((sz) => (
                    <button
                      key={sz}
                      aria-label={"حجم الفرشاة " + sz}
                      aria-pressed={brushSize === sz}
                      onClick={() => setBrushSize(sz)}
                      style={{
                        width: 32,
                        height: 32,
                        borderRadius: "50%",
                        border: brushSize === sz ? "2.5px solid #1E293B" : "2px solid #CBD5E1",
                        background: "#F8FAFC",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                      }}
                    >
                      <span
                        style={{
                          width: sz / 3,
                          height: sz / 3,
                          borderRadius: "50%",
                          background: selectedColor === "rainbow" ? "#EC4899" : selectedColor,
                        }}
                      />
                    </button>
                  ))}
                </div>
              )}

              {/* Clear & Finish Buttons */}
              <div style={{ display: "flex", gap: 6 }}>
                <button
                  onClick={() => {
                    playStudioSound("click");
                    resetCanvases();
                  }}
                  style={{
                    padding: "6px 12px",
                    borderRadius: 12,
                    border: "2px solid #FECACA",
                    background: "#FEF2F2",
                    color: "#DC2626",
                    fontWeight: 800,
                    fontSize: 13,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: 5,
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="3 6 5 6 21 6" />
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                  </svg>
                  مسح
                </button>
                <button
                  onClick={handleCompleteLetter}
                  disabled={strokeCount === 0}
                  style={{
                    padding: "6px 16px",
                    borderRadius: 12,
                    border: "none",
                    background: strokeCount > 0 ? "linear-gradient(135deg, #10B981, #059669)" : "#CBD5E1",
                    color: "#FFF",
                    fontWeight: 900,
                    fontSize: 13,
                    cursor: strokeCount > 0 ? "pointer" : "not-allowed",
                    boxShadow: strokeCount > 0 ? "0 4px 12px rgba(16,185,129,0.4)" : "none",
                    display: "flex",
                    alignItems: "center",
                    gap: 5,
                  }}
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  أنهيت التلوين
                </button>
              </div>
            </div>

            {/* Canvas Container (Clean Magic Inside-the-Lines Mask!) */}
            <div
              style={{
                position: "relative",
                width: "100%",
                maxWidth: CANVAS_W,
                aspectRatio: `${CANVAS_W} / ${CANVAS_H}`,
                borderRadius: 22,
                background: "radial-gradient(circle at center, #FFFDF5 0%, #FEF3C7 100%)",
                border: "3px dashed #FCD34D",
                overflow: "hidden",
                touchAction: "none",
                cursor: tool === "fill" ? "cell" : "crosshair",
              }}
            >
              <canvas
                ref={paintCanvasRef}
                width={CANVAS_W}
                height={CANVAS_H}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onPointerLeave={handlePointerUp}
                style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
              />
              <canvas
                ref={outlineCanvasRef}
                width={CANVAS_W}
                height={CANVAS_H}
                style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}
              />


            </div>

              {justFinished && (
                <div className="english-finished"
                  style={{
                    position: "absolute",
                    bottom: 12,
                    left: "50%",
                    transform: "translateX(-50%)",
                    background: "rgba(16,185,129,0.96)",
                    color: "#FFF",
                    padding: "8px 20px",
                    borderRadius: 999,
                    fontWeight: 900,
                    fontSize: 15,
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    boxShadow: "0 8px 20px rgba(16,185,129,0.4)",
                    whiteSpace: "nowrap",
                  }}
                >
                  <span>فنان رائع! لوّنت حرف {currentItem.upper} بإبداع</span>
                  {currentIndex < ENGLISH_LETTERS.length - 1 ? (
                    <button
                      onClick={() => selectLetter(currentIndex + 1)}
                      style={{
                        background: "#FACC15",
                        color: "#78350F",
                        border: "none",
                        borderRadius: 999,
                        padding: "4px 12px",
                        fontWeight: 900,
                        cursor: "pointer",
                      }}
                    >
                      الحرف التالي ({ENGLISH_LETTERS[currentIndex + 1].upper})
                    </button>
                  ) : (
                    <button
                      onClick={() => onCompleteIsland("english")}
                      style={{
                        background: "#FACC15",
                        color: "#78350F",
                        border: "none",
                        borderRadius: 999,
                        padding: "4px 12px",
                        fontWeight: 900,
                        cursor: "pointer",
                      }}
                    >
                      إنهاء الجزيرة
                    </button>
                  )}
                </div>
              )}

            {/* Color Palette Swatches */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, flexWrap: "wrap" }}>
              {PAINT_COLORS.map((col) => {
                const isSelected = selectedColor === col.hex;
                const isRainbow = col.hex === "rainbow";
                return (
                  <button
                    key={col.id}
                    aria-label={col.name}
                    aria-pressed={isSelected}
                    title={col.name}
                    onClick={() => {
                      playStudioSound("pop");
                      setSelectedColor(col.hex);
                    }}
                    style={{
                      width: isSelected ? 44 : 38,
                      height: isSelected ? 44 : 38,
                      borderRadius: "50%",
                      border: isSelected ? "4px solid #1E293B" : "3px solid #FFFFFF",
                      background: isRainbow
                        ? "conic-gradient(#FF4D6D, #FF9F1C, #FACC15, #10B981, #0EA5E9, #8B5CF6, #FF4D6D)"
                        : col.hex,
                      boxShadow: isSelected
                        ? "0 6px 14px rgba(15,23,42,0.3)"
                        : "0 3px 8px rgba(15,23,42,0.16)",
                      cursor: "pointer",
                      transition: "all 0.15s",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 16,
                    }}
                  >
                    {isRainbow ? "" : ""}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </main>

      {/* Bottom A-Z Scrollable Stepper */}
      <footer
        dir="ltr"
        style={{
          background: "rgba(255,255,255,0.94)",
          borderTop: "3px solid #FFFFFF",
          padding: "8px 14px",
          display: "flex",
          justifyContent: "center",
          zIndex: 30,
        }}
      >
        <div className="eng-scroll" style={{ display: "flex", gap: 7, overflowX: "auto", paddingBottom: 3, maxWidth: "100%" }}>
          {ENGLISH_LETTERS.map((item, idx) => {
            const isActive = idx === currentIndex;
            const isSolved = completedIds.includes(item.id);
            return (
              <button
                key={item.id}
                aria-label={"Letter " + item.upper}
                aria-current={isActive ? "step" : undefined}
                onClick={() => {
                  playStudioSound("click");
                  selectLetter(idx);
                }}
                style={{
                  minWidth: 44,
                  height: 44,
                  borderRadius: 14,
                  border: isActive ? "3px solid #1E293B" : "2px solid #E2E8F0",
                  background: isSolved ? "#10B981" : isActive ? item.accent : "#F1F5F9",
                  color: isSolved || isActive ? "#FFF" : "#334155",
                  fontSize: 20,
                  fontWeight: 900,
                  cursor: "pointer",
                  position: "relative",
                  flexShrink: 0,
                }}
              >
                {item.upper}
                {isSolved && (
                  <span
                    style={{
                      position: "absolute",
                      top: -4,
                      right: -4,
                      width: 16,
                      height: 16,
                      borderRadius: "50%",
                      background: "#FACC15",
                      color: "#78350F",
                      fontSize: 10,
                      fontWeight: 900,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    ✓
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </footer>
    </div>
  );
}
