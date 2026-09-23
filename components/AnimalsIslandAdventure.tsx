"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";

export interface AnimalItem {
  id: string;
  name: string;
  emoji: string;
  soundCue: string;
  color: string;
  fact: string;
  options: string[];
  videoUrl?: string; // Optional custom video URL (e.g. /videos/animals/lion.mp4)
}

const ANIMALS_DATA: AnimalItem[] = [
  {
    id: "cat",
    name: "قطة",
    emoji: "🐱",
    soundCue: "مواء القطة اللطيف",
    color: "#EA580C",
    fact: "القطة حيوان أليف لطيف يحب اللعب بالكرات الصغيرة وينظف نفسه بلسانه!",
    options: ["قطة", "كلب", "عصفور"],
    videoUrl: "/videos/animals/cat.mp4",
  },
  {
    id: "dog",
    name: "كلب",
    emoji: "🐶",
    soundCue: "نباح الكلب الوفي",
    color: "#B45309",
    fact: "الكلب صديق وفي وذكي يحب مساعدة الإنسان وحراسة المنزل والمرح في الحديقة!",
    options: ["خروف", "كلب", "حصان"],
    videoUrl: "/videos/animals/dog.mp4",
  },
  {
    id: "horse",
    name: "حصان",
    emoji: "🐴",
    soundCue: "صهيل الحصان السريع",
    color: "#059669",
    fact: "الحصان حيوان رشيق وسريع وله شعر ناعم، ويحب الجري في المروج الخضراء الواسعة!",
    options: ["حصان", "بقرة", "أسد"],
    videoUrl: "/videos/animals/horse.mp4",
  },
  {
    id: "sheep",
    name: "خروف",
    emoji: "🐑",
    soundCue: "مأمأة الخروف الوديع",
    color: "#0284C7",
    fact: "الخروف حيوان هادئ ولطيف يعطينا الصوف الدافئ الجميل لصنع الملابس الشتوية!",
    options: ["بطة", "خروف", "دب"],
    videoUrl: "/videos/animals/sheep.mp4",
  },
  {
    id: "cow",
    name: "بقرة",
    emoji: "🐮",
    soundCue: "خوار البقرة المفيدة",
    color: "#4F46E5",
    fact: "البقرة تعيش في المزرعة الجميلة وتمنحنا الحليب الطازج اللذيذ لنصنع منه الجبن والزبادي!",
    options: ["بقرة", "حصان", "زرافة"],
    videoUrl: "/videos/animals/cow.mp4",
  },
  {
    id: "duck",
    name: "بطة",
    emoji: "🦆",
    soundCue: "بطبطة البطة في الماء",
    color: "#0D9488",
    fact: "البطة طائر مائي ماهر يحب السباحة في البحيرات مع صغارها اللطيفين وريشها لا يبتل بالماء!",
    options: ["ديك", "بطة", "سمكة"],
    videoUrl: "/videos/animals/duck.mp4",
  },
  {
    id: "rooster",
    name: "ديك",
    emoji: "🐓",
    soundCue: "صياح الديك النشيط في الصباح",
    color: "#DC2626",
    fact: "الديك طائر جميل ذو ريش ملون وعرف أحمر رائع، يستيقظ مبكراً ليوقظ المزرعة كلها بصياحه!",
    options: ["عصفور", "ديك", "قطة"],
    videoUrl: "/videos/animals/rooster.mp4",
  },
  {
    id: "bird",
    name: "عصفور",
    emoji: "🐦",
    soundCue: "تغريد وزقزقة العصفور العذبة",
    color: "#2563EB",
    fact: "العصفور طائر صغير مغرد يبني عشه الجميل فوق أغصان الأشجار ويطير بخفة ورشاقة في السماء!",
    options: ["عصفور", "بطة", "سمكة"],
    videoUrl: "/videos/animals/bird.mp4",
  },
  {
    id: "fish",
    name: "سمكة",
    emoji: "🐟",
    soundCue: "سباحة السمكة الهادئة",
    color: "#06B6D4",
    fact: "السمكة تعيش وتتنفس تحت الماء وتسبح باستخدام زعانفها الجميلة وألوانها تبهر الأنظار!",
    options: ["سمكة", "دب", "نمر"],
    videoUrl: "/videos/animals/fish.mp4",
  },
  {
    id: "lion",
    name: "أسد",
    emoji: "🦁",
    soundCue: "زئير الأسد القوي",
    color: "#E07820",
    fact: "الأسد هو ملك الغابة الشجاع ذو اللبدة الذهبية، قوي جداً ويعيش في البراري الواسعة!",
    options: ["نمر", "أسد", "دب"],
    videoUrl: "/videos/animals/lion.mp4",
  },
  {
    id: "bear",
    name: "دب",
    emoji: "🐻",
    soundCue: "زمجرة الدب الضخم",
    color: "#78350F",
    fact: "الدب حيوان قوي وضخم وله فرو كثيف دافئ، يحب صيد الأسماك وتناول العسل اللذيذ من خلايا النحل!",
    options: ["دب", "أسد", "حصان"],
    videoUrl: "/videos/animals/bear.mp4",
  },
  {
    id: "tiger",
    name: "نمر",
    emoji: "🐯",
    soundCue: "زئير النمر الرشيق",
    color: "#D97706",
    fact: "النمر حيوان سريع جداً ومخطط بخطوط برتقالية وسوداء مميزة، ويجيد السباحة وتسلق الأشجار!",
    options: ["قطة", "نمر", "أسد"],
    videoUrl: "/videos/animals/tiger.mp4",
  },
  {
    id: "giraffe",
    name: "زرافة",
    emoji: "🦒",
    soundCue: "خطوات الزرافة الرشيقة",
    color: "#CA8A04",
    fact: "الزرافة هي أطول كائن على الأرض، عنقها الطويل المزين ببقع ملونة يساعدها في الوصول لأعلى الأشجار!",
    options: ["بقرة", "زرافة", "حصان"],
    videoUrl: "/videos/animals/giraffe.mp4",
  },
];

// ── Web Audio Synthesizer for rich child-friendly sound effects ──
function playAudioTone(type: "correct" | "wrong" | "click" | "fanfare") {
  try {
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();

    if (type === "click") {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(440, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.08);
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.08);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.08);
    } else if (type === "correct") {
      const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "triangle";
        osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.1);
        gain.gain.setValueAtTime(0.2, ctx.currentTime + idx * 0.1);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + idx * 0.1 + 0.25);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + idx * 0.1);
        osc.stop(ctx.currentTime + idx * 0.1 + 0.25);
      });
    } else if (type === "wrong") {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(260, ctx.currentTime);
      osc.frequency.linearRampToValueAtTime(190, ctx.currentTime + 0.2);
      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.01, ctx.currentTime + 0.2);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.2);
    } else if (type === "fanfare") {
      const fanfare = [
        { f: 523.25, d: 0.15 },
        { f: 659.25, d: 0.15 },
        { f: 783.99, d: 0.15 },
        { f: 1046.5, d: 0.4 },
      ];
      let t = ctx.currentTime;
      fanfare.forEach((n) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "triangle";
        osc.frequency.setValueAtTime(n.f, t);
        gain.gain.setValueAtTime(0.25, t);
        gain.gain.exponentialRampToValueAtTime(0.01, t + n.d);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(t);
        osc.stop(t + n.d);
        t += n.d;
      });
    }
  } catch {}
}

interface Props {
  onBackToMap: () => void;
  onCompleteIsland: (islandId: string) => void;
  onProgressUpdate?: (count: number, total: number) => void;
  deviceType: "desktop" | "tablet" | "mobile";
}

export default function AnimalsIslandAdventure({ onBackToMap, onCompleteIsland, onProgressUpdate, deviceType }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [completedAnimalIds, setCompletedAnimalIds] = useState<string[]>([]);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean | null>(null);
  const [shakeKey, setShakeKey] = useState(0);
  const [showIslandCelebration, setShowIslandCelebration] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);
  const [lockedHint, setLockedHint] = useState<string | null>(null);

  const videoRef = useRef<HTMLVideoElement>(null);
  const animalNavRef = useRef<HTMLDivElement>(null);
  const currentAnimal = ANIMALS_DATA[currentIndex];

  // Restore completed animals from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("madar_animals_completed_ids");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          setCompletedAnimalIds(parsed);
          onProgressUpdate?.(parsed.length, ANIMALS_DATA.length);
        }
      }
    } catch {}
  }, []);

  // Check if an animal at idx is unlocked
  const isAnimalUnlocked = (idx: number) => {
    if (idx === 0) return true;
    // An animal is unlocked only if the preceding animal has been solved
    return completedAnimalIds.includes(ANIMALS_DATA[idx - 1].id);
  };

  // Auto-scroll active animal into view (on desktop)
  useEffect(() => {
    if (animalNavRef.current && deviceType !== "mobile") {
      const activeEl = animalNavRef.current.children[currentIndex] as HTMLElement | undefined;
      activeEl?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
    }
  }, [currentIndex, deviceType]);

  // Reset state when animal index changes
  useEffect(() => {
    setSelectedOption(null);
    setIsAnswerCorrect(null);
    setVideoError(false);
    setIsPlayingVideo(false);
    setLockedHint(null);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
    }
  }, [currentIndex]);

  const handleSelectOption = (option: string) => {
    playAudioTone("click");
    setSelectedOption(option);

    if (option === currentAnimal.name) {
      // Correct!
      setIsAnswerCorrect(true);
      playAudioTone("correct");

      if (!completedAnimalIds.includes(currentAnimal.id)) {
        const nextCompleted = [...completedAnimalIds, currentAnimal.id];
        setCompletedAnimalIds(nextCompleted);
        try {
          localStorage.setItem("madar_animals_completed_ids", JSON.stringify(nextCompleted));
        } catch {}
        onProgressUpdate?.(nextCompleted.length, ANIMALS_DATA.length);

        // Check if all animals are completed
        if (nextCompleted.length === ANIMALS_DATA.length) {
          setTimeout(() => {
            playAudioTone("fanfare");
            setShowIslandCelebration(true);
            onCompleteIsland("animals");
          }, 800);
        }
      }
    } else {
      // Wrong
      setIsAnswerCorrect(false);
      setShakeKey((prev) => prev + 1);
      playAudioTone("wrong");
    }
  };

  const handleSelectAnimalTab = (idx: number) => {
    if (!isAnimalUnlocked(idx)) {
      playAudioTone("wrong");
      setLockedHint(`عليك حل سؤال «${ANIMALS_DATA[idx - 1].name}» أولاً لفتح هذا الحيوان!`);
      return;
    }
    setLockedHint(null);
    playAudioTone("click");
    setCurrentIndex(idx);
  };

  const handleNextAnimal = () => {
    // Only proceed if current animal is solved
    if (!completedAnimalIds.includes(currentAnimal.id)) {
      playAudioTone("wrong");
      setLockedHint("أجب عن السؤال بالشكل الصحيح أولاً لتنتقل للحيوان التالي!");
      return;
    }
    setLockedHint(null);
    playAudioTone("click");
    if (currentIndex < ANIMALS_DATA.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      // If at end and completed, show celebration
      setShowIslandCelebration(true);
    }
  };

  const handlePrevAnimal = () => {
    setLockedHint(null);
    playAudioTone("click");
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const bgImage =
    deviceType === "mobile"
      ? "/islands/map-background-mobile.png"
      : deviceType === "tablet"
      ? "/islands/map-background-tablet.png"
      : "/islands/map-background.png";

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 50,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        direction: "rtl",
        fontFamily: "system-ui, -apple-system, sans-serif",
      }}
    >
      {/* ── Background Map Image ── */}
      <Image
        src={bgImage}
        alt="خلفية الجزيرة"
        fill
        priority
        style={{ objectFit: "cover", objectPosition: "center", filter: "blur(2px) brightness(0.92)" }}
      />
      {/* Light sky overlay for readability */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(180deg, rgba(255,255,255,0.45) 0%, rgba(224,242,254,0.65) 100%)",
        }}
      />

      {/* ── Top Bar Controls ── */}
      <div
        style={{
          position: "relative",
          zIndex: 60,
          padding: deviceType === "mobile" ? "8px 12px" : "12px 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: "rgba(255, 255, 255, 0.85)",
          backdropFilter: "blur(10px)",
          borderBottom: "2px solid rgba(224, 120, 32, 0.3)",
          boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
        }}
      >
        {/* Back Button */}
        <button
          onClick={onBackToMap}
          style={{
            background: "#4F46E5",
            color: "white",
            border: "none",
            borderRadius: "20px",
            padding: deviceType === "mobile" ? "6px 14px" : "8px 20px",
            fontSize: deviceType === "mobile" ? "12px" : "14px",
            fontWeight: 800,
            cursor: "pointer",
            boxShadow: "0 4px 12px rgba(79, 70, 229, 0.3)",
            transition: "transform 0.15s ease",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
          onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
          خريطة الجزر
        </button>

        {/* Island Title */}
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              fontSize: deviceType === "mobile" ? "16px" : "20px",
              fontWeight: 900,
              color: "#E07820",
              textShadow: "0 1px 2px rgba(255,255,255,0.9)",
            }}
          >
            جزيرة الحيوانات
          </div>
          <div
            style={{
              fontSize: deviceType === "mobile" ? "11px" : "13px",
              fontWeight: 700,
              color: "#6B7280",
            }}
          >
            الحيوان {currentIndex + 1} من {ANIMALS_DATA.length}
          </div>
        </div>

        {/* Score & Progress Badge */}
        <div
          style={{
            background: "rgba(254, 243, 199, 0.95)",
            border: "2px solid #F59E0B",
            borderRadius: "20px",
            padding: deviceType === "mobile" ? "4px 10px" : "6px 16px",
            textAlign: "center",
            boxShadow: "0 2px 8px rgba(245, 158, 11, 0.2)",
          }}
        >
          <div
            style={{
              fontSize: deviceType === "mobile" ? "11px" : "13px",
              fontWeight: 900,
              color: "#B45309",
              lineHeight: 1.2,
            }}
          >
            الدرجة: {completedAnimalIds.length} من {ANIMALS_DATA.length}
          </div>
          <div
            style={{
              fontSize: deviceType === "mobile" ? "9px" : "11px",
              fontWeight: 800,
              color: "#D97706",
              lineHeight: 1.1,
            }}
          >
            ({Math.round((completedAnimalIds.length / ANIMALS_DATA.length) * 100)}%)
          </div>
        </div>
      </div>

      {/* ── Animal Step Navigator (حيوان حيوان) - Centered, Responsive & No-Cutoff ── */}
      <div
        ref={animalNavRef}
        style={{
          position: "relative",
          zIndex: 60,
          padding: deviceType === "mobile" ? "6px 8px" : "10px 16px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "rgba(255, 255, 255, 0.8)",
          backdropFilter: "blur(8px)",
          borderBottom: "1px solid rgba(226, 232, 240, 0.8)",
          width: "100%",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexWrap: deviceType === "mobile" ? "wrap" : "nowrap",
            gap: deviceType === "mobile" ? "4px 6px" : 8,
            maxWidth: deviceType === "mobile" ? "360px" : "100%",
            margin: "0 auto",
            width: "100%",
          }}
        >
          {ANIMALS_DATA.map((animal, idx) => {
            const isActive = idx === currentIndex;
            const isDone = completedAnimalIds.includes(animal.id);
            const isUnlocked = isAnimalUnlocked(idx);

            let bg = "white";
            let color = "#334155";
            let border = "1.5px solid #CBD5E1";

            if (isActive) {
              bg = animal.color;
              color = "white";
              border = `2.5px solid ${animal.color}`;
            } else if (isDone) {
              bg = "#DCFCE7";
              color = "#15803D";
              border = "2px solid #86EFAC";
            } else if (!isUnlocked) {
              bg = "#F1F5F9";
              color = "#94A3B8";
              border = "1.5px dashed #CBD5E1";
            }

            return (
              <button
                key={animal.id}
                onClick={() => handleSelectAnimalTab(idx)}
                style={{
                  background: bg,
                  color: color,
                  border: border,
                  borderRadius: "14px",
                  padding: deviceType === "mobile" ? "4px 8px" : "7px 16px",
                  cursor: !isUnlocked ? "not-allowed" : "pointer",
                  fontWeight: 800,
                  fontSize: deviceType === "mobile" ? "11px" : "13px",
                  transform: isActive ? "scale(1.06)" : "scale(1)",
                  transition: "all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)",
                  boxShadow: isActive
                    ? `0 4px 12px ${animal.color}40`
                    : "0 1px 3px rgba(0,0,0,0.05)",
                  opacity: !isUnlocked ? 0.6 : 1,
                  whiteSpace: "nowrap",
                }}
              >
                {animal.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Gentle educational hint if child clicks locked animal */}
      {lockedHint && (
        <div
          style={{
            position: "relative",
            zIndex: 60,
            background: "#FEF2F2",
            borderBottom: "1px solid #FECACA",
            color: "#991B1B",
            padding: "6px 14px",
            fontSize: deviceType === "mobile" ? "11px" : "13px",
            fontWeight: 800,
            textAlign: "center",
            width: "100%",
            boxSizing: "border-box",
          }}
        >
          {lockedHint}
        </div>
      )}

      {/* ── Main Interactive Content Area ── */}
      <div
        style={{
          position: "relative",
          zIndex: 60,
          flex: 1,
          overflowY: "auto",
          padding: deviceType === "mobile" ? "10px 12px 30px" : "16px 24px 30px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
          gap: deviceType === "mobile" ? 14 : 20,
        }}
      >
        {/* ── Themed Video Frame ("اطار للفيديو") ── */}
        <div
          style={{
            width: "100%",
            maxWidth: deviceType === "mobile" ? "380px" : deviceType === "tablet" ? "560px" : "640px",
            background: "linear-gradient(135deg, #B45309 0%, #78350F 50%, #B45309 100%)",
            borderRadius: "28px",
            padding: deviceType === "mobile" ? "10px" : "14px",
            boxShadow: "0 18px 36px rgba(120, 53, 15, 0.35), 0 4px 12px rgba(0,0,0,0.15)",
            border: "4px solid #FDE68A",
            position: "relative",
          }}
        >
          {/* Top Banner on Frame */}
          <div
            style={{
              textAlign: "center",
              marginBottom: 8,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span
              style={{
                color: "#FEF3C7",
                fontWeight: 900,
                fontSize: deviceType === "mobile" ? "13px" : "15px",
                textShadow: "0 1px 3px rgba(0,0,0,0.6)",
              }}
            >
              شاهد وتعرف على {currentAnimal.name}
            </span>
          </div>

          {/* Video Player / Interactive Screen */}
          <div
            style={{
              position: "relative",
              width: "100%",
              aspectRatio: "16 / 9",
              background: "#0F172A",
              borderRadius: "18px",
              overflow: "hidden",
              border: "3px solid #F59E0B",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* Real HTML5 Video Player if videoUrl exists and loads */}
            {!videoError && currentAnimal.videoUrl ? (
              <video
                key={currentAnimal.videoUrl}
                ref={videoRef}
                src={currentAnimal.videoUrl}
                controls
                playsInline
                preload="metadata"
                onError={() => setVideoError(true)}
                onPlay={() => setIsPlayingVideo(true)}
                onPause={() => setIsPlayingVideo(false)}
                onEnded={() => setIsPlayingVideo(false)}
                style={{ width: "100%", height: "100%", objectFit: "contain", background: "#000" }}
              />
            ) : null}

            {/* If video failed to load or has no video file yet */}
            {(videoError || !currentAnimal.videoUrl) && (
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: `radial-gradient(circle at center, ${currentAnimal.color}25 0%, #0F172A 85%)`,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                  padding: 16,
                  textAlign: "center",
                }}
              >
                {/* Clean Animal Name Heading */}
                <div
                  style={{
                    fontSize: deviceType === "mobile" ? "36px" : "48px",
                    fontWeight: 900,
                    color: "white",
                    textShadow: `0 4px 16px ${currentAnimal.color}`,
                  }}
                >
                  {currentAnimal.name}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ── Interactive Quiz Question Card ("اختر اسم الحيوان") ── */}
        <div
          key={shakeKey}
          style={{
            width: "100%",
            maxWidth: deviceType === "mobile" ? "380px" : deviceType === "tablet" ? "560px" : "640px",
            background: "rgba(255, 255, 255, 0.95)",
            backdropFilter: "blur(12px)",
            borderRadius: "28px",
            padding: deviceType === "mobile" ? "16px" : "22px",
            boxShadow: "0 12px 32px rgba(0,0,0,0.12)",
            border: `3px solid ${currentAnimal.color}44`,
            textAlign: "center",
            animation: isAnswerCorrect === false ? "shake 0.5s ease" : "none",
          }}
        >
          {/* Question Title */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 14,
            }}
          >
            <h3
              style={{
                margin: 0,
                fontSize: deviceType === "mobile" ? "17px" : "20px",
                fontWeight: 900,
                color: "#1F2937",
              }}
            >
              ما هو اسم هذا الحيوان؟
            </h3>
          </div>

          {/* Multiple-Choice Buttons */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: deviceType === "mobile" ? 8 : 12,
              marginBottom: 14,
            }}
          >
            {currentAnimal.options.map((option) => {
              const isSelected = selectedOption === option;
              const isCorrect = option === currentAnimal.name;
              let bg = "white";
              let borderColor = "#E2E8F0";
              let textColor = "#1E293B";

              if (isSelected) {
                if (isCorrect) {
                  bg = "#DCFCE7";
                  borderColor = "#16A34A";
                  textColor = "#15803D";
                } else {
                  bg = "#FEE2E2";
                  borderColor = "#DC2626";
                  textColor = "#B91C1C";
                }
              }

              return (
                <button
                  key={option}
                  onClick={() => handleSelectOption(option)}
                  style={{
                    background: bg,
                    border: `3px solid ${borderColor}`,
                    borderRadius: "18px",
                    padding: deviceType === "mobile" ? "12px 6px" : "14px 10px",
                    fontSize: deviceType === "mobile" ? "14px" : "16px",
                    fontWeight: 900,
                    color: textColor,
                    cursor: "pointer",
                    boxShadow: isSelected
                      ? `0 6px 14px ${borderColor}44`
                      : "0 3px 8px rgba(0,0,0,0.06)",
                    transition: "all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)",
                    transform: isSelected ? "scale(1.04)" : "scale(1)",
                  }}
                  onMouseEnter={(e) => {
                    if (!isSelected) e.currentTarget.style.transform = "scale(1.03)";
                  }}
                  onMouseLeave={(e) => {
                    if (!isSelected) e.currentTarget.style.transform = "scale(1)";
                  }}
                >
                  {option}
                </button>
              );
            })}
          </div>

          {/* Feedback Message */}
          {isAnswerCorrect === true && (
            <div
              style={{
                background: "#F0FDF4",
                border: "2px solid #86EFAC",
                borderRadius: "18px",
                padding: "12px",
                marginBottom: 12,
                color: "#166534",
              }}
            >
              <div style={{ fontSize: "15px", fontWeight: 900, marginBottom: 4 }}>
                ممتاز يا بطل! إجابة صحيحة.
              </div>
              <div style={{ fontSize: "12px", fontWeight: 700, color: "#15803D" }}>
                {currentAnimal.fact}
              </div>
            </div>
          )}

          {isAnswerCorrect === false && (
            <div
              style={{
                background: "#FEF2F2",
                border: "2px solid #FCA5A5",
                borderRadius: "18px",
                padding: "10px",
                marginBottom: 12,
                color: "#991B1B",
                fontSize: "13px",
                fontWeight: 800,
              }}
            >
              حاول مرة أخرى يا بطل! ركز في شكل الحيوان جيداً.
            </div>
          )}

          {/* Navigation to Next / Prev Animal */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: 10,
            }}
          >
            <button
              onClick={handlePrevAnimal}
              disabled={currentIndex === 0}
              style={{
                background: currentIndex === 0 ? "#F1F5F9" : "#E2E8F0",
                color: currentIndex === 0 ? "#94A3B8" : "#334155",
                border: "none",
                borderRadius: "14px",
                padding: "8px 18px",
                fontSize: "12px",
                fontWeight: 800,
                cursor: currentIndex === 0 ? "not-allowed" : "pointer",
              }}
            >
              السابق
            </button>

            {/* Sequential lock: Cannot advance if current question is not yet answered correctly */}
            {(() => {
              const isCurrentSolved = completedAnimalIds.includes(currentAnimal.id);
              return (
                <button
                  onClick={handleNextAnimal}
                  disabled={!isCurrentSolved}
                  style={{
                    background: !isCurrentSolved
                      ? "#CBD5E1"
                      : "linear-gradient(135deg, #10B981, #059669)",
                    color: !isCurrentSolved ? "#64748B" : "white",
                    border: "none",
                    borderRadius: "16px",
                    padding: deviceType === "mobile" ? "9px 18px" : "10px 26px",
                    fontSize: deviceType === "mobile" ? "12px" : "15px",
                    fontWeight: 900,
                    cursor: !isCurrentSolved ? "not-allowed" : "pointer",
                    boxShadow: !isCurrentSolved ? "none" : "0 6px 18px rgba(16, 185, 129, 0.3)",
                    opacity: !isCurrentSolved ? 0.75 : 1,
                    transition: "all 0.2s ease",
                  }}
                >
                  {!isCurrentSolved
                    ? "أجب أولاً للانتقال"
                    : currentIndex < ANIMALS_DATA.length - 1
                    ? "الحيوان التالي"
                    : "إنهاء الجزيرة"}
                </button>
              );
            })()}
          </div>
        </div>
      </div>

      {/* ── Island Completion Celebration Modal ── */}
      {showIslandCelebration && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 100,
            background: "rgba(15, 23, 42, 0.75)",
            backdropFilter: "blur(10px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 16,
          }}
        >
          <div
            style={{
              background: "white",
              borderRadius: "32px",
              maxWidth: "460px",
              width: "100%",
              padding: "32px 24px",
              textAlign: "center",
              boxShadow: "0 28px 56px rgba(0,0,0,0.4)",
              border: "6px solid #F59E0B",
              position: "relative",
              animation: "popIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
            }}
          >
            <h2
              style={{
                fontSize: "24px",
                fontWeight: 900,
                color: "#E07820",
                margin: "0 0 12px 0",
              }}
            >
              مبارك يا بطل الأبطال!
            </h2>
            <div
              style={{
                background: "#FEF3C7",
                border: "2px solid #F59E0B",
                borderRadius: "18px",
                padding: "8px 16px",
                display: "inline-block",
                marginBottom: 16,
                fontWeight: 900,
                color: "#B45309",
                fontSize: "15px",
              }}
            >
              درجتك النهائية: {completedAnimalIds.length} من {ANIMALS_DATA.length} (100%)
            </div>
            <p
              style={{
                fontSize: "15px",
                color: "#4B5563",
                lineHeight: 1.6,
                fontWeight: 700,
                marginBottom: 20,
              }}
            >
              لقد أتقنت جميع حيوانات <strong>جزيرة الحيوانات</strong> بنجاح!
              <br />
              تم فتح <strong>جزيرة الفواكه</strong> على الخريطة لتكمل مغامرتك!
            </p>

            <div
              style={{
                display: "flex",
                gap: 12,
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              <button
                onClick={onBackToMap}
                style={{
                  background: "linear-gradient(135deg, #10B981, #059669)",
                  color: "white",
                  border: "none",
                  borderRadius: "20px",
                  padding: "12px 28px",
                  fontSize: "15px",
                  fontWeight: 900,
                  cursor: "pointer",
                  boxShadow: "0 8px 20px rgba(16, 185, 129, 0.4)",
                }}
              >
                العودة للخريطة لاستكشاف الفواكه
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Keyframe CSS animations ── */}
      <style jsx>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20%, 60% { transform: translateX(-8px); }
          40%, 80% { transform: translateX(8px); }
        }
        @keyframes popIn {
          0% { transform: scale(0.85); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
      `}</style>
    </div>
  );
}
