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
    id: "lion",
    name: "الأسد",
    emoji: "🦁",
    soundCue: "زئير الأسد القوي",
    color: "#E07820",
    fact: "الأسد هو ملك الغابة الشجاع، يعيش في مجموعات تسمى عائلة الأسود ويحب النوم تحت ظلال الأشجار!",
    options: ["الأسد", "الفيل", "الزرافة"],
    videoUrl: "/videos/animals/lion.mp4",
  },
  {
    id: "elephant",
    name: "الفيل",
    emoji: "🐘",
    soundCue: "صوت خرطوم الفيل",
    color: "#4F46E5",
    fact: "الفيل هو أضخم حيوان يعيش على اليابسة، وخرطومه الطويل يساعده في الشرب وتناول أوراق الأشجار!",
    options: ["الحصان", "الفيل", "الخروف"],
    videoUrl: "/videos/animals/elephant.mp4",
  },
  {
    id: "monkey",
    name: "القرد",
    emoji: "🐒",
    soundCue: "ضحكات وصيحات القرد",
    color: "#D97706",
    fact: "القرد ذكي جداً ومرح، يحب القفز بين أغصان الأشجار وتناول الفواكه والموز اللذيذ!",
    options: ["القرد", "الأسد", "القط"],
    videoUrl: "/videos/animals/monkey.mp4",
  },
  {
    id: "giraffe",
    name: "الزرافة",
    emoji: "🦒",
    soundCue: "خطوات الزرافة اللطيفة",
    color: "#CA8A04",
    fact: "الزرافة هي أطول حيوان في العالم، وعنقها الطويل يمكنها من تناول أوراق أعلى قمم الأشجار!",
    options: ["الفيل", "الزرافة", "الدب"],
    videoUrl: "/videos/animals/giraffe.mp4",
  },
  {
    id: "horse",
    name: "الحصان",
    emoji: "🐴",
    soundCue: "صهيل الحصان السريع",
    color: "#059669",
    fact: "الحصان حيوان سريع ورشيق وصديق مخلص للإنسان منذ قديم الزمان، ويحب الجري في المروج الخضراء!",
    options: ["الحصان", "النمر", "الثعلب"],
    videoUrl: "/videos/animals/horse.mp4",
  },
  {
    id: "sheep",
    name: "الخروف",
    emoji: "🐑",
    soundCue: "مأمأة الخروف الوديع",
    color: "#0284C7",
    fact: "الخروف حيوان لطيف وهادئ، يعطينا الصوف الدافئ الجميل لصنع الملابس الشتوية!",
    options: ["الخروف", "القرد", "الغزال"],
    videoUrl: "/videos/animals/sheep.mp4",
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

// ── Arabic Speech Synthesizer for Kids ──
function speakArabic(text: string) {
  try {
    if (!("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "ar-SA";
    utterance.rate = 0.9;
    utterance.pitch = 1.1;
    window.speechSynthesis.speak(utterance);
  } catch {}
}

interface Props {
  onBackToMap: () => void;
  onCompleteIsland: (islandId: string) => void;
  deviceType: "desktop" | "tablet" | "mobile";
}

export default function AnimalsIslandAdventure({ onBackToMap, onCompleteIsland, deviceType }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [completedAnimalIds, setCompletedAnimalIds] = useState<string[]>([]);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean | null>(null);
  const [shakeKey, setShakeKey] = useState(0);
  const [showIslandCelebration, setShowIslandCelebration] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const currentAnimal = ANIMALS_DATA[currentIndex];

  // Reset state when animal index changes
  useEffect(() => {
    setSelectedOption(null);
    setIsAnswerCorrect(null);
    setVideoError(false);
    setIsPlayingVideo(false);
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
      speakArabic(`أحسنت! إجابة صحيحة! هذا هو ${currentAnimal.name}`);

      if (!completedAnimalIds.includes(currentAnimal.id)) {
        const nextCompleted = [...completedAnimalIds, currentAnimal.id];
        setCompletedAnimalIds(nextCompleted);

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
      speakArabic("حاول مرة أخرى يا بطل!");
    }
  };

  const handleNextAnimal = () => {
    playAudioTone("click");
    if (currentIndex < ANIMALS_DATA.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      // If at end and completed, show celebration
      setShowIslandCelebration(true);
    }
  };

  const handlePrevAnimal = () => {
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
            padding: deviceType === "mobile" ? "5px 12px" : "8px 18px",
            fontSize: deviceType === "mobile" ? "12px" : "14px",
            fontWeight: 800,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: 6,
            boxShadow: "0 4px 12px rgba(79, 70, 229, 0.3)",
            transition: "transform 0.15s ease",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
          onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
          <span>⬅️ خريطة الجزر</span>
        </button>

        {/* Island Title */}
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              fontSize: deviceType === "mobile" ? "15px" : "20px",
              fontWeight: 900,
              color: "#E07820",
              textShadow: "0 1px 2px rgba(255,255,255,0.9)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 6,
            }}
          >
            <span>🦁</span>
            <span>جزيرة الحيوانات السحرية</span>
          </div>
          <div
            style={{
              fontSize: deviceType === "mobile" ? "10px" : "12px",
              fontWeight: 700,
              color: "#6B7280",
            }}
          >
            الحيوان {currentIndex + 1} من {ANIMALS_DATA.length}
          </div>
        </div>

        {/* Progress Stars Badge */}
        <div
          style={{
            background: "rgba(254, 243, 199, 0.95)",
            border: "2px solid #F59E0B",
            borderRadius: "20px",
            padding: deviceType === "mobile" ? "4px 10px" : "6px 14px",
            fontSize: deviceType === "mobile" ? "11px" : "13px",
            fontWeight: 900,
            color: "#B45309",
            display: "flex",
            alignItems: "center",
            gap: 4,
          }}
        >
          <span>⭐</span>
          <span>
            {completedAnimalIds.length}/{ANIMALS_DATA.length}
          </span>
        </div>
      </div>

      {/* ── Animal Step Navigator (حيوان حيوان) ── */}
      <div
        style={{
          position: "relative",
          zIndex: 60,
          padding: deviceType === "mobile" ? "6px 8px" : "8px 16px",
          display: "flex",
          justifyContent: "center",
          gap: deviceType === "mobile" ? 6 : 10,
          overflowX: "auto",
          background: "rgba(255, 255, 255, 0.5)",
          backdropFilter: "blur(6px)",
        }}
      >
        {ANIMALS_DATA.map((animal, idx) => {
          const isActive = idx === currentIndex;
          const isDone = completedAnimalIds.includes(animal.id);

          return (
            <button
              key={animal.id}
              onClick={() => {
                playAudioTone("click");
                setCurrentIndex(idx);
              }}
              style={{
                background: isActive
                  ? "white"
                  : isDone
                  ? "#ECFDF5"
                  : "rgba(255, 255, 255, 0.8)",
                border: isActive
                  ? `3px solid ${animal.color}`
                  : isDone
                  ? "2px solid #10B981"
                  : "2px solid #CBD5E1",
                borderRadius: "16px",
                padding: deviceType === "mobile" ? "4px 8px" : "6px 14px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 5,
                transform: isActive ? "scale(1.08)" : "scale(1)",
                transition: "all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)",
                boxShadow: isActive
                  ? `0 6px 16px ${animal.color}44`
                  : "0 2px 6px rgba(0,0,0,0.06)",
                whiteSpace: "nowrap",
              }}
            >
              <span style={{ fontSize: deviceType === "mobile" ? "16px" : "20px" }}>
                {animal.emoji}
              </span>
              <span
                style={{
                  fontSize: deviceType === "mobile" ? "11px" : "13px",
                  fontWeight: 800,
                  color: isActive ? animal.color : "#374151",
                }}
              >
                {animal.name}
              </span>
              {isDone && <span style={{ fontSize: "12px" }}>⭐</span>}
            </button>
          );
        })}
      </div>

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
          {/* Decorative Corner Leaf Accents */}
          <div style={{ position: "absolute", top: -8, right: -8, fontSize: "22px" }}>🌿</div>
          <div style={{ position: "absolute", top: -8, left: -8, fontSize: "22px" }}>🌴</div>
          <div style={{ position: "absolute", bottom: -8, right: -8, fontSize: "22px" }}>🌸</div>
          <div style={{ position: "absolute", bottom: -8, left: -8, fontSize: "22px" }}>🌺</div>

          {/* Top Banner on Frame */}
          <div
            style={{
              textAlign: "center",
              marginBottom: 8,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
            }}
          >
            <span style={{ fontSize: "14px" }}>✨</span>
            <span
              style={{
                color: "#FEF3C7",
                fontWeight: 900,
                fontSize: deviceType === "mobile" ? "12px" : "14px",
                textShadow: "0 1px 3px rgba(0,0,0,0.6)",
              }}
            >
              شاهد وتعرف على {currentAnimal.name} {currentAnimal.emoji}
            </span>
            <span style={{ fontSize: "14px" }}>✨</span>
          </div>

          {/* Video Player / Interactive Animation Screen */}
          <div
            style={{
              position: "relative",
              width: "100%",
              aspectRatio: "16 / 9",
              background: "#1E293B",
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
                ref={videoRef}
                src={currentAnimal.videoUrl}
                controls
                playsInline
                onError={() => setVideoError(true)}
                onPlay={() => setIsPlayingVideo(true)}
                onPause={() => setIsPlayingVideo(false)}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            ) : null}

            {/* If video is not yet provided or failed to load, show rich interactive cartoon placeholder */}
            {(videoError || !currentAnimal.videoUrl || !isPlayingVideo) && (
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: `radial-gradient(circle at center, ${currentAnimal.color}33 0%, #0F172A 85%)`,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                  padding: 16,
                  textAlign: "center",
                  cursor: "pointer",
                }}
                onClick={() => {
                  if (videoRef.current && !videoError) {
                    videoRef.current.play().catch(() => setVideoError(true));
                  } else {
                    speakArabic(`أنا ${currentAnimal.name}، ${currentAnimal.fact}`);
                    playAudioTone("click");
                  }
                }}
              >
                {/* Big Animated Emoji Avatar */}
                <div
                  style={{
                    fontSize: deviceType === "mobile" ? "64px" : "84px",
                    filter: "drop-shadow(0 8px 16px rgba(0,0,0,0.4))",
                    animation: "bounce 2s infinite ease-in-out",
                  }}
                >
                  {currentAnimal.emoji}
                </div>

                {/* Play Video / Speak Button */}
                <div
                  style={{
                    marginTop: 8,
                    background: "rgba(255, 255, 255, 0.95)",
                    color: "#1E293B",
                    borderRadius: "24px",
                    padding: deviceType === "mobile" ? "6px 14px" : "8px 20px",
                    fontWeight: 900,
                    fontSize: deviceType === "mobile" ? "12px" : "14px",
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    boxShadow: "0 6px 18px rgba(0,0,0,0.3)",
                    border: `2px solid ${currentAnimal.color}`,
                  }}
                >
                  <span>▶️</span>
                  <span>اضغط لمشاهدة الفيديو والاستماع</span>
                </div>

                <div
                  style={{
                    marginTop: 6,
                    fontSize: deviceType === "mobile" ? "10px" : "12px",
                    color: "#94A3B8",
                  }}
                >
                  (سيعمل الفيديو فور وضع الملف في المسار)
                </div>
              </div>
            )}
          </div>

          {/* Quick Pronunciation & Sound Trigger */}
          <div
            style={{
              marginTop: 10,
              display: "flex",
              justifyContent: "center",
              gap: 8,
            }}
          >
            <button
              onClick={() => {
                speakArabic(currentAnimal.name);
                playAudioTone("click");
              }}
              style={{
                background: "rgba(255, 255, 255, 0.95)",
                color: "#78350F",
                border: "2px solid #FDE68A",
                borderRadius: "16px",
                padding: "5px 14px",
                fontSize: "12px",
                fontWeight: 800,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 5,
              }}
            >
              <span>🔊</span>
              <span>نطق اسم الحيوان</span>
            </button>

            <button
              onClick={() => {
                speakArabic(currentAnimal.fact);
                playAudioTone("click");
              }}
              style={{
                background: "rgba(255, 255, 255, 0.95)",
                color: "#1E40AF",
                border: "2px solid #BFDBFE",
                borderRadius: "16px",
                padding: "5px 14px",
                fontSize: "12px",
                fontWeight: 800,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 5,
              }}
            >
              <span>💡</span>
              <span>معلومة سريعة</span>
            </button>
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
              gap: 8,
              marginBottom: 14,
            }}
          >
            <span style={{ fontSize: "20px" }}>🎯</span>
            <h3
              style={{
                margin: 0,
                fontSize: deviceType === "mobile" ? "16px" : "19px",
                fontWeight: 900,
                color: "#1F2937",
              }}
            >
              ما هو اسم هذا الحيوان الجميل؟
            </h3>
            <button
              onClick={() => speakArabic("ما هو اسم هذا الحيوان الجميل؟")}
              style={{
                background: "none",
                border: "none",
                fontSize: "16px",
                cursor: "pointer",
                padding: 2,
              }}
              title="استمع للسؤال"
            >
              🔊
            </button>
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
                  {isSelected && (isCorrect ? " ✅" : " ❌")}
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
              <div style={{ fontSize: "16px", fontWeight: 900, marginBottom: 4 }}>
                🌟 رائع يا بطل! إجابة صحيحة! 👏
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
              😊 حاول مرة أخرى يا بطل! ركز في شكل الحيوان جيداً!
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
                padding: "8px 16px",
                fontSize: "12px",
                fontWeight: 800,
                cursor: currentIndex === 0 ? "not-allowed" : "pointer",
              }}
            >
              ⬅️ السابق
            </button>

            <button
              onClick={handleNextAnimal}
              style={{
                background: isAnswerCorrect
                  ? "linear-gradient(135deg, #10B981, #059669)"
                  : "linear-gradient(135deg, #E07820, #C2410C)",
                color: "white",
                border: "none",
                borderRadius: "16px",
                padding: deviceType === "mobile" ? "9px 20px" : "10px 26px",
                fontSize: deviceType === "mobile" ? "13px" : "15px",
                fontWeight: 900,
                cursor: "pointer",
                boxShadow: "0 6px 18px rgba(0,0,0,0.18)",
                display: "flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              <span>{currentIndex < ANIMALS_DATA.length - 1 ? "الحيوان التالي" : "إنهاء الجزيرة"}</span>
              <span>➡️</span>
            </button>
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
            <p
              style={{
                fontSize: "15px",
                color: "#4B5563",
                lineHeight: 1.6,
                fontWeight: 700,
                marginBottom: 20,
              }}
            >
              لقد أكملت جميع حيوانات <strong>جزيرة الحيوانات</strong> بنجاح!
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
