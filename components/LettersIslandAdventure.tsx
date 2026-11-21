"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";

export interface LetterLevel {
  id: string;
  letter: string;
  name: string;
  word: string;
  chant: string;
  icon: string;
  primaryColor: string;
  secondaryColor: string;
  bgGradient: string;
  distractors: string[];
  wordOptions: { word: string; icon: string; isCorrect: boolean }[];
}

export const LETTERS_DATA: LetterLevel[] = [
  {
    id: "let-1",
    letter: "أ",
    name: "ألف",
    word: "أَسَد",
    chant: "ألف.. أسد شجاع ملك الغابة!",
    icon: "🦁",
    primaryColor: "#FF5E7E",
    secondaryColor: "#FF8E53",
    bgGradient: "linear-gradient(135deg, #FFF0F3 0%, #FFE3E8 100%)",
    distractors: ["ب", "ج", "س"],
    wordOptions: [
      { word: "أَسَد", icon: "🦁", isCorrect: true },
      { word: "بَطَّة", icon: "🦆", isCorrect: false },
      { word: "سَمَكَة", icon: "🐟", isCorrect: false },
    ],
  },
  {
    id: "let-2",
    letter: "ب",
    name: "باء",
    word: "بَطَّة",
    chant: "باء.. بطة جميلة تسبح في البحيرة!",
    icon: "🦆",
    primaryColor: "#FF9F1C",
    secondaryColor: "#FFD166",
    bgGradient: "linear-gradient(135deg, #FFFBEB 0%, #FEF3C7 100%)",
    distractors: ["ت", "ن", "ث"],
    wordOptions: [
      { word: "تُفَّاح", icon: "🍎", isCorrect: false },
      { word: "بَطَّة", icon: "🦆", isCorrect: true },
      { word: "قَمَر", icon: "🌙", isCorrect: false },
    ],
  },
  {
    id: "let-3",
    letter: "ت",
    name: "تاء",
    word: "تُفَّاح",
    chant: "تاء.. تفاح أحمر لذيذ ومفيد!",
    icon: "🍎",
    primaryColor: "#10B981",
    secondaryColor: "#34D399",
    bgGradient: "linear-gradient(135deg, #ECFDF5 0%, #D1FAE5 100%)",
    distractors: ["ب", "ث", "ك"],
    wordOptions: [
      { word: "تُفَّاح", icon: "🍎", isCorrect: true },
      { word: "جَمَل", icon: "🐪", isCorrect: false },
      { word: "نَجْمَة", icon: "⭐", isCorrect: false },
    ],
  },
  {
    id: "let-4",
    letter: "ث",
    name: "ثاء",
    word: "ثَعْلَب",
    chant: "ثاء.. ثعلب ذكي يجري في الغابة!",
    icon: "🦊",
    primaryColor: "#0EA5E9",
    secondaryColor: "#38BDF8",
    bgGradient: "linear-gradient(135deg, #F0F9FF 0%, #E0F2FE 100%)",
    distractors: ["ت", "ب", "ش"],
    wordOptions: [
      { word: "حِصَان", icon: "🐴", isCorrect: false },
      { word: "ثَعْلَب", icon: "🦊", isCorrect: true },
      { word: "فِيل", icon: "🐘", isCorrect: false },
    ],
  },
  {
    id: "let-5",
    letter: "ج",
    name: "جيم",
    word: "جَمَل",
    chant: "جيم.. جمل صبور سفينة الصحراء!",
    icon: "🐪",
    primaryColor: "#8B5CF6",
    secondaryColor: "#C084FC",
    bgGradient: "linear-gradient(135deg, #F5F3FF 0%, #EDE9FE 100%)",
    distractors: ["ح", "خ", "ع"],
    wordOptions: [
      { word: "جَمَل", icon: "🐪", isCorrect: true },
      { word: "أَرْنَب", icon: "🐰", isCorrect: false },
      { word: "دُبّ", icon: "🐻", isCorrect: false },
    ],
  },
  {
    id: "let-6",
    letter: "ح",
    name: "حاء",
    word: "حِصَان",
    chant: "حاء.. حصان عربي أصيل وسريع!",
    icon: "🐴",
    primaryColor: "#EC4899",
    secondaryColor: "#F472B6",
    bgGradient: "linear-gradient(135deg, #FDF2F8 0%, #FCE7F3 100%)",
    distractors: ["ج", "خ", "م"],
    wordOptions: [
      { word: "خَرُوف", icon: "🐑", isCorrect: false },
      { word: "حِصَان", icon: "🐴", isCorrect: true },
      { word: "وَرْدَة", icon: "🌹", isCorrect: false },
    ],
  },
  {
    id: "let-7",
    letter: "خ",
    name: "خاء",
    word: "خَرُوف",
    chant: "خاء.. خروف أبيض لطيف يعطينا الصوف!",
    icon: "🐑",
    primaryColor: "#06B6D4",
    secondaryColor: "#22D3EE",
    bgGradient: "linear-gradient(135deg, #ECFEFF 0%, #CFFAFE 100%)",
    distractors: ["ح", "ج", "ذ"],
    wordOptions: [
      { word: "خَرُوف", icon: "🐑", isCorrect: true },
      { word: "شَمْس", icon: "☀️", isCorrect: false },
      { word: "كَلْب", icon: "🐶", isCorrect: false },
    ],
  },
  {
    id: "let-8",
    letter: "د",
    name: "دال",
    word: "دُبّ",
    chant: "دال.. دب قوي يحب العسل اللذيذ!",
    icon: "🐻",
    primaryColor: "#F59E0B",
    secondaryColor: "#FBBF24",
    bgGradient: "linear-gradient(135deg, #FFFBEB 0%, #FDE68A 100%)",
    distractors: ["ذ", "ر", "ز"],
    wordOptions: [
      { word: "رُمَّان", icon: "🍓", isCorrect: false },
      { word: "دُبّ", icon: "🐻", isCorrect: true },
      { word: "فَرَاشَة", icon: "🦋", isCorrect: false },
    ],
  },
  {
    id: "let-9",
    letter: "ذ",
    name: "ذال",
    word: "ذُرَة",
    chant: "ذال.. ذرة صفراء حلوة ومقرمشة!",
    icon: "🌽",
    primaryColor: "#6366F1",
    secondaryColor: "#818CF8",
    bgGradient: "linear-gradient(135deg, #EEF2FF 0%, #E0E7FF 100%)",
    distractors: ["د", "ز", "ر"],
    wordOptions: [
      { word: "ذُرَة", icon: "🌽", isCorrect: true },
      { word: "دِيك", icon: "🐓", isCorrect: false },
      { word: "مَوْز", icon: "🍌", isCorrect: false },
    ],
  },
  {
    id: "let-10",
    letter: "ر",
    name: "راء",
    word: "رِيشَة",
    chant: "راء.. ريشة ملونة خفيفة تطير في الهواء!",
    icon: "🪶",
    primaryColor: "#E11D48",
    secondaryColor: "#FB7185",
    bgGradient: "linear-gradient(135deg, #FFF1F2 0%, #FFE4E6 100%)",
    distractors: ["ز", "د", "و"],
    wordOptions: [
      { word: "زَرَافَة", icon: "🦒", isCorrect: false },
      { word: "رِيشَة", icon: "🪶", isCorrect: true },
      { word: "قِطَّة", icon: "🐱", isCorrect: false },
    ],
  },
  {
    id: "let-11",
    letter: "ز",
    name: "زاي",
    word: "زَرَافَة",
    chant: "زاي.. زرافة طويلة العنق تأكل أوراق الشجر!",
    icon: "🦒",
    primaryColor: "#14B8A6",
    secondaryColor: "#2DD4BF",
    bgGradient: "linear-gradient(135deg, #F0FDFA 0%, #CCFBF1 100%)",
    distractors: ["ر", "ذ", "ن"],
    wordOptions: [
      { word: "زَرَافَة", icon: "🦒", isCorrect: true },
      { word: "أَسَد", icon: "🦁", isCorrect: false },
      { word: "سَيَّارَة", icon: "🚗", isCorrect: false },
    ],
  },
  {
    id: "let-12",
    letter: "س",
    name: "سين",
    word: "سَمَكَة",
    chant: "سين.. سمكة ملونة تسبح في البحر الأزرق!",
    icon: "🐟",
    primaryColor: "#0284C7",
    secondaryColor: "#38BDF8",
    bgGradient: "linear-gradient(135deg, #F0F9FF 0%, #BAE6FD 100%)",
    distractors: ["ش", "ص", "ث"],
    wordOptions: [
      { word: "شَجَرَة", icon: "🌳", isCorrect: false },
      { word: "سَمَكَة", icon: "🐟", isCorrect: true },
      { word: "تَاج", icon: "👑", isCorrect: false },
    ],
  },
  {
    id: "let-13",
    letter: "ش",
    name: "شين",
    word: "شَمْس",
    chant: "شين.. شمس مشرقة تمنحنا النور والدفء!",
    icon: "☀️",
    primaryColor: "#EA580C",
    secondaryColor: "#FB923C",
    bgGradient: "linear-gradient(135deg, #FFF7ED 0%, #FFEDD5 100%)",
    distractors: ["س", "ض", "ث"],
    wordOptions: [
      { word: "شَمْس", icon: "☀️", isCorrect: true },
      { word: "قَمَر", icon: "🌙", isCorrect: false },
      { word: "بَطَّة", icon: "🦆", isCorrect: false },
    ],
  },
  {
    id: "let-14",
    letter: "ص",
    name: "صاد",
    word: "صَقْر",
    chant: "صاد.. صقر حر يحلّق عالياً في السماء!",
    icon: "🦅",
    primaryColor: "#7C3AED",
    secondaryColor: "#A78BFA",
    bgGradient: "linear-gradient(135deg, #F5F3FF 0%, #DDD6FE 100%)",
    distractors: ["ض", "س", "ط"],
    wordOptions: [
      { word: "ضِفْدَع", icon: "🐸", isCorrect: false },
      { word: "صَقْر", icon: "🦅", isCorrect: true },
      { word: "وَرْدَة", icon: "🌹", isCorrect: false },
    ],
  },
  {
    id: "let-15",
    letter: "ض",
    name: "ضاد",
    word: "ضِفْدَع",
    chant: "ضاد.. ضفدع أخضر يقفز بمرح قرب الماء!",
    icon: "🐸",
    primaryColor: "#16A34A",
    secondaryColor: "#4ADE80",
    bgGradient: "linear-gradient(135deg, #F0FDF4 0%, #DCFCE7 100%)",
    distractors: ["ص", "ظ", "ش"],
    wordOptions: [
      { word: "ضِفْدَع", icon: "🐸", isCorrect: true },
      { word: "صَقْر", icon: "🦅", isCorrect: false },
      { word: "فِيل", icon: "🐘", isCorrect: false },
    ],
  },
  {
    id: "let-16",
    letter: "ط",
    name: "طاء",
    word: "طَائِرَة",
    chant: "طاء.. طائرة سريعة تحلق فوق السحاب!",
    icon: "✈️",
    primaryColor: "#2563EB",
    secondaryColor: "#60A5FA",
    bgGradient: "linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 100%)",
    distractors: ["ظ", "ص", "ل"],
    wordOptions: [
      { word: "سَفِينَة", icon: "⛵", isCorrect: false },
      { word: "طَائِرَة", icon: "✈️", isCorrect: true },
      { word: "جَمَل", icon: "🐪", isCorrect: false },
    ],
  },
  {
    id: "let-17",
    letter: "ظ",
    name: "ظاء",
    word: "ظَرْف",
    chant: "ظاء.. ظرف رسالة يحمل أجمل الكلمات!",
    icon: "✉️",
    primaryColor: "#DB2777",
    secondaryColor: "#F472B6",
    bgGradient: "linear-gradient(135deg, #FDF2F8 0%, #FCE7F3 100%)",
    distractors: ["ط", "ض", "ذ"],
    wordOptions: [
      { word: "ظَرْف", icon: "✉️", isCorrect: true },
      { word: "كِتَاب", icon: "📖", isCorrect: false },
      { word: "طَائِرَة", icon: "✈️", isCorrect: false },
    ],
  },
  {
    id: "let-18",
    letter: "ع",
    name: "عين",
    word: "عُصْفُور",
    chant: "عين.. عصفور صغير يغرد بأعذب الألحان!",
    icon: "🐦",
    primaryColor: "#0891B2",
    secondaryColor: "#22D3EE",
    bgGradient: "linear-gradient(135deg, #ECFEFF 0%, #CFFAFE 100%)",
    distractors: ["غ", "ح", "ج"],
    wordOptions: [
      { word: "غَزَال", icon: "🦌", isCorrect: false },
      { word: "عُصْفُور", icon: "🐦", isCorrect: true },
      { word: "نَحْلَة", icon: "🐝", isCorrect: false },
    ],
  },
  {
    id: "let-19",
    letter: "غ",
    name: "غين",
    word: "غَزَال",
    chant: "غين.. غزال رشيق يجري بخفة وجمال!",
    icon: "🦌",
    primaryColor: "#D97706",
    secondaryColor: "#FBBF24",
    bgGradient: "linear-gradient(135deg, #FFFBEB 0%, #FEF3C7 100%)",
    distractors: ["ع", "ف", "خ"],
    wordOptions: [
      { word: "غَزَال", icon: "🦌", isCorrect: true },
      { word: "عِنَب", icon: "🍇", isCorrect: false },
      { word: "حِصَان", icon: "🐴", isCorrect: false },
    ],
  },
  {
    id: "let-20",
    letter: "ف",
    name: "فاء",
    word: "فَرَاشَة",
    chant: "فاء.. فراشة ملونة ترقص بين الأزهار!",
    icon: "🦋",
    primaryColor: "#9333EA",
    secondaryColor: "#C084FC",
    bgGradient: "linear-gradient(135deg, #FAF5FF 0%, #F3E8FF 100%)",
    distractors: ["ق", "غ", "ن"],
    wordOptions: [
      { word: "قِطَّة", icon: "🐱", isCorrect: false },
      { word: "فَرَاشَة", icon: "🦋", isCorrect: true },
      { word: "سَمَكَة", icon: "🐟", isCorrect: false },
    ],
  },
  {
    id: "let-21",
    letter: "ق",
    name: "قاف",
    word: "قَمَر",
    chant: "قاف.. قمر مضيء يزين السماء ليلاً!",
    icon: "🌙",
    primaryColor: "#4F46E5",
    secondaryColor: "#818CF8",
    bgGradient: "linear-gradient(135deg, #EEF2FF 0%, #E0E7FF 100%)",
    distractors: ["ف", "ك", "و"],
    wordOptions: [
      { word: "قَمَر", icon: "🌙", isCorrect: true },
      { word: "فِيل", icon: "🐘", isCorrect: false },
      { word: "شَمْس", icon: "☀️", isCorrect: false },
    ],
  },
  {
    id: "let-22",
    letter: "ك",
    name: "كاف",
    word: "كِتَاب",
    chant: "كاف.. كتاب مفيد يعلمنا أجمل الحكايات!",
    icon: "📖",
    primaryColor: "#E11D48",
    secondaryColor: "#FB7185",
    bgGradient: "linear-gradient(135deg, #FFF1F2 0%, #FFE4E6 100%)",
    distractors: ["ل", "ق", "م"],
    wordOptions: [
      { word: "لَيْمُون", icon: "🍋", isCorrect: false },
      { word: "كِتَاب", icon: "📖", isCorrect: true },
      { word: "مَوْز", icon: "🍌", isCorrect: false },
    ],
  },
  {
    id: "let-23",
    letter: "ل",
    name: "لام",
    word: "لَيْمُون",
    chant: "لام.. ليمون أصفر منعش مليء بالفيتامين!",
    icon: "🍋",
    primaryColor: "#CA8A04",
    secondaryColor: "#FACC15",
    bgGradient: "linear-gradient(135deg, #FEFCE8 0%, #FEF08A 100%)",
    distractors: ["ك", "أ", "ن"],
    wordOptions: [
      { word: "لَيْمُون", icon: "🍋", isCorrect: true },
      { word: "تُفَّاح", icon: "🍎", isCorrect: false },
      { word: "كَلْب", icon: "🐶", isCorrect: false },
    ],
  },
  {
    id: "let-24",
    letter: "م",
    name: "ميم",
    word: "مَوْز",
    chant: "ميم.. موز أصفر لذيذ يمنحنا الطاقة!",
    icon: "🍌",
    primaryColor: "#059669",
    secondaryColor: "#34D399",
    bgGradient: "linear-gradient(135deg, #ECFDF5 0%, #D1FAE5 100%)",
    distractors: ["ن", "ه", "ع"],
    wordOptions: [
      { word: "نَحْلَة", icon: "🐝", isCorrect: false },
      { word: "مَوْز", icon: "🍌", isCorrect: true },
      { word: "وَرْدَة", icon: "🌹", isCorrect: false },
    ],
  },
  {
    id: "let-25",
    letter: "ن",
    name: "نون",
    word: "نَحْلَة",
    chant: "نون.. نحلة نشيطة تصنع العسل الشهي!",
    icon: "🐝",
    primaryColor: "#F59E0B",
    secondaryColor: "#FCD34D",
    bgGradient: "linear-gradient(135deg, #FFFBEB 0%, #FEF3C7 100%)",
    distractors: ["ب", "ت", "ي"],
    wordOptions: [
      { word: "نَحْلَة", icon: "🐝", isCorrect: true },
      { word: "مَوْز", icon: "🍌", isCorrect: false },
      { word: "بَطَّة", icon: "🦆", isCorrect: false },
    ],
  },
  {
    id: "let-26",
    letter: "ه",
    name: "هاء",
    word: "هَدِيَّة",
    chant: "هاء.. هدية جميلة تسعد الأصدقاء!",
    icon: "🎁",
    primaryColor: "#EC4899",
    secondaryColor: "#F9A8D4",
    bgGradient: "linear-gradient(135deg, #FDF2F8 0%, #FCE7F3 100%)",
    distractors: ["م", "و", "ق"],
    wordOptions: [
      { word: "وَرْدَة", icon: "🌹", isCorrect: false },
      { word: "هَدِيَّة", icon: "🎁", isCorrect: true },
      { word: "يَد", icon: "✋", isCorrect: false },
    ],
  },
  {
    id: "let-27",
    letter: "و",
    name: "واو",
    word: "وَرْدَة",
    chant: "واو.. وردة عطرة بألوان زاهية وجميلة!",
    icon: "🌹",
    primaryColor: "#EF4444",
    secondaryColor: "#FCA5A5",
    bgGradient: "linear-gradient(135deg, #FEF2F2 0%, #FEE2E2 100%)",
    distractors: ["ر", "د", "ف"],
    wordOptions: [
      { word: "وَرْدَة", icon: "🌹", isCorrect: true },
      { word: "هَدِيَّة", icon: "🎁", isCorrect: false },
      { word: "شَمْس", icon: "☀️", isCorrect: false },
    ],
  },
  {
    id: "let-28",
    letter: "ي",
    name: "ياء",
    word: "يَمَامَة",
    chant: "ياء.. يمامة بيضاء جميلة ترمز للسلام!",
    icon: "🕊️",
    primaryColor: "#0EA5E9",
    secondaryColor: "#7DD3FC",
    bgGradient: "linear-gradient(135deg, #F0F9FF 0%, #E0F2FE 100%)",
    distractors: ["ب", "ن", "ت"],
    wordOptions: [
      { word: "بَطَّة", icon: "🦆", isCorrect: false },
      { word: "يَمَامَة", icon: "🕊️", isCorrect: true },
      { word: "نَحْلَة", icon: "🐝", isCorrect: false },
    ],
  },
];

const CONFETTI_COLORS = ["#FF4D6D", "#FF9F1C", "#10B981", "#0EA5E9", "#8B5CF6", "#EC4899", "#FACC15"];

// ── Mario-Inspired Retro Web Audio Synthesizer ──
function playMarioSound(type: "jump" | "coin" | "wrong" | "fanfare" | "click") {
  try {
    const AudioCtx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const now = ctx.currentTime;

    if (type === "jump") {
      // Classic bouncy Mario-style jump sweep!
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "square";
      osc.frequency.setValueAtTime(220, now);
      osc.frequency.exponentialRampToValueAtTime(620, now + 0.14);
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.16);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.17);
    } else if (type === "coin") {
      // Iconic Mario B5 -> E6 coin ding!
      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      osc1.type = "square";
      osc1.frequency.setValueAtTime(987.77, now);
      osc1.frequency.setValueAtTime(1318.51, now + 0.08);
      gain1.gain.setValueAtTime(0.14, now);
      gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.36);
      osc1.connect(gain1);
      gain1.connect(ctx.destination);
      osc1.start(now);
      osc1.stop(now + 0.37);
    } else if (type === "wrong") {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(210, now);
      osc.frequency.linearRampToValueAtTime(130, now + 0.22);
      gain.gain.setValueAtTime(0.11, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.24);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.25);
    } else if (type === "fanfare") {
      const notes = [523.25, 659.25, 783.99, 1046.5, 783.99, 1046.5];
      const times = [0, 0.1, 0.2, 0.3, 0.45, 0.56];
      notes.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "triangle";
        osc.frequency.setValueAtTime(freq, now + times[i]);
        gain.gain.setValueAtTime(0.22, now + times[i]);
        gain.gain.exponentialRampToValueAtTime(0.001, now + times[i] + 0.38);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + times[i]);
        osc.stop(now + times[i] + 0.4);
      });
    } else {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(640, now);
      gain.gain.setValueAtTime(0.1, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.07);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.08);
    }
  } catch {}
}

function speakArabicLetter(text: string) {
  try {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = "ar-SA";
    utter.rate = 0.85;
    utter.pitch = 1.15;
    window.speechSynthesis.speak(utter);
  } catch {}
}

// ── Mario-Style Platformer Canvas Component ──
interface CoinEntity {
  id: number;
  x: number;
  y: number;
  letter: string;
  isTarget: boolean;
  collected: boolean;
  bobOffset: number;
}

interface PlatformEntity {
  x: number;
  y: number;
  w: number;
  h: number;
  isBrick: boolean;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  color: string;
  size: number;
  text?: string;
}

interface MarioRunnerCanvasProps {
  targetLevel: LetterLevel;
  mode: "learn" | "arcade";
  onCollectTarget: (newCount: number) => void;
  onWrongLetter: (letter: string) => void;
  onArcadeScore: () => void;
}

function MarioLetterRunnerCanvas({
  targetLevel,
  mode,
  onCollectTarget,
  onWrongLetter,
  onArcadeScore,
}: MarioRunnerCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const jumpRequestRef = useRef(false);

  // Keep latest callbacks in refs so RAF loop never restarts unnecessarily
  const callbacksRef = useRef({ onCollectTarget, onWrongLetter, onArcadeScore });
  callbacksRef.current = { onCollectTarget, onWrongLetter, onArcadeScore };

  const targetRef = useRef(targetLevel);
  targetRef.current = targetLevel;

  const triggerJump = useCallback(() => {
    jumpRequestRef.current = true;
  }, []);

  // Keyboard Space / Up Arrow support
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space" || e.code === "ArrowUp" || e.code === "KeyW") {
        e.preventDefault();
        triggerJump();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [triggerJump]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const W = 880;
    const H = 360;
    const GROUND_Y = 296;
    const HERO_X = 155;
    const HERO_W = 46;
    const HERO_H = 58;
    const GRAVITY = 0.62;
    const JUMP_FORCE = -13.2;
    const RUN_SPEED = mode === "arcade" ? 4.4 : 3.7;

    let heroY = GROUND_Y - HERO_H;
    let heroVy = 0;
    let jumpsLeft = 2; // Double jump for kid-friendly Mario fun!
    let runFrame = 0;
    let scrollX = 0;
    let collectedCount = 0;
    let coinUid = 1;
    let wrongCooldown = 0;

    let coins: CoinEntity[] = [];
    let platforms: PlatformEntity[] = [];
    let particles: Particle[] = [];

    // Spawn initial platforms and letter coins ahead of hero
    const spawnSegment = (startX: number) => {
      const level = targetRef.current;
      // Add a Mario floating brick platform occasionally
      const hasPlatform = Math.random() > 0.35;
      let platY = GROUND_Y - 108;
      if (hasPlatform) {
        platY = GROUND_Y - (95 + Math.floor(Math.random() * 45));
        platforms.push({
          x: startX + 30,
          y: platY,
          w: 120,
          h: 24,
          isBrick: true,
        });
      }

      // Guarantee generous target letters (60% target, 40% distractor)
      const isTarget = Math.random() < 0.62;
      const letter = isTarget
        ? level.letter
        : level.distractors[Math.floor(Math.random() * level.distractors.length)];

      // Place coin either above the platform, mid-air jump, or ground level
      const yPos = hasPlatform
        ? platY - 46
        : Math.random() > 0.45
        ? GROUND_Y - 135
        : GROUND_Y - 48;

      coins.push({
        id: coinUid++,
        x: startX + 85,
        y: yPos,
        letter,
        isTarget,
        collected: false,
        bobOffset: Math.random() * Math.PI * 2,
      });
    };

    // Seed initial track
    for (let sx = 340; sx < 1400; sx += 225) {
      spawnSegment(sx);
    }

    let animId = 0;
    let time = 0;

    const spawnDust = (x: number, y: number, color: string, count = 7, text?: string) => {
      for (let i = 0; i < count; i++) {
        particles.push({
          x,
          y,
          vx: (Math.random() - 0.5) * 6,
          vy: -Math.random() * 5 - 1.5,
          life: 1,
          color,
          size: 4 + Math.random() * 5,
        });
      }
      if (text) {
        particles.push({
          x,
          y: y - 16,
          vx: 0,
          vy: -2.2,
          life: 1.2,
          color,
          size: 28,
          text,
        });
      }
    };

    const drawCloud = (x: number, y: number, scale: number) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.scale(scale, scale);
      ctx.fillStyle = "rgba(255,255,255,0.92)";
      ctx.beginPath();
      ctx.arc(0, 0, 22, 0, Math.PI * 2);
      ctx.arc(24, -8, 28, 0, Math.PI * 2);
      ctx.arc(52, 0, 22, 0, Math.PI * 2);
      ctx.arc(26, 8, 22, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    };

    const drawHill = (x: number, w: number, h: number, color: string, highlight: string) => {
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.moveTo(x, GROUND_Y);
      ctx.quadraticCurveTo(x + w / 2, GROUND_Y - h * 2, x + w, GROUND_Y);
      ctx.closePath();
      ctx.fill();

      ctx.fillStyle = highlight;
      ctx.beginPath();
      ctx.arc(x + w * 0.42, GROUND_Y - h * 0.48, 9, 0, Math.PI * 2);
      ctx.arc(x + w * 0.62, GROUND_Y - h * 0.3, 6, 0, Math.PI * 2);
      ctx.fill();
    };

    const drawHero = (x: number, y: number, vy: number, frame: number) => {
      const isJumping = Math.abs(vy) > 0.6 || y < GROUND_Y - HERO_H - 2;
      const legSwing = isJumping ? 10 : Math.sin(frame * 0.35) * 11;

      ctx.save();
      ctx.translate(x + HERO_W / 2, y + HERO_H / 2);

      // Soft ground shadow if near ground
      const distGround = GROUND_Y - (y + HERO_H);
      if (distGround < 130) {
        ctx.fillStyle = `rgba(15, 23, 42, ${Math.max(0.06, 0.24 - distGround / 550)})`;
        ctx.beginPath();
        ctx.ellipse(0, HERO_H / 2 + distGround, 20 - distGround * 0.08, 5, 0, 0, Math.PI * 2);
        ctx.fill();
      }

      // Back Leg & Shoe
      ctx.strokeStyle = "#1D4ED8";
      ctx.lineWidth = 8;
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(-5, 12);
      ctx.lineTo(-5 - legSwing, 26);
      ctx.stroke();
      ctx.fillStyle = "#92400E";
      ctx.beginPath();
      ctx.ellipse(-3 - legSwing, 27, 8, 5, 0, 0, Math.PI * 2);
      ctx.fill();

      // Front Leg & Shoe
      ctx.beginPath();
      ctx.moveTo(5, 12);
      ctx.lineTo(5 + legSwing, 26);
      ctx.stroke();
      ctx.beginPath();
      ctx.ellipse(7 + legSwing, 27, 8, 5, 0, 0, Math.PI * 2);
      ctx.fill();

      // Shirt / Overalls (Vibrant Mario-inspired Red & Blue!)
      ctx.fillStyle = "#EF4444";
      ctx.beginPath();
      ctx.roundRect(-14, -4, 28, 22, 8);
      ctx.fill();
      ctx.fillStyle = "#2563EB";
      ctx.beginPath();
      ctx.roundRect(-13, 6, 26, 14, 6);
      ctx.fill();
      // Gold overall buttons
      ctx.fillStyle = "#FACC15";
      ctx.beginPath();
      ctx.arc(-6, 9, 2.5, 0, Math.PI * 2);
      ctx.arc(6, 9, 2.5, 0, Math.PI * 2);
      ctx.fill();

      // Arm (raised happily when jumping!)
      ctx.strokeStyle = "#EF4444";
      ctx.lineWidth = 7;
      ctx.beginPath();
      ctx.moveTo(8, 2);
      ctx.lineTo(isJumping ? 20 : 14 + legSwing * 0.6, isJumping ? -14 : 10);
      ctx.stroke();
      // White glove
      ctx.fillStyle = "#FFFFFF";
      ctx.beginPath();
      ctx.arc(isJumping ? 21 : 15 + legSwing * 0.6, isJumping ? -15 : 11, 5, 0, Math.PI * 2);
      ctx.fill();

      // Head
      ctx.fillStyle = "#FDE68A";
      ctx.beginPath();
      ctx.arc(0, -15, 15, 0, Math.PI * 2);
      ctx.fill();

      // Happy Eye & Smile (facing right!)
      ctx.fillStyle = "#1E293B";
      ctx.beginPath();
      ctx.arc(6, -16, 2.6, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#FFFFFF";
      ctx.beginPath();
      ctx.arc(7, -17, 1, 0, Math.PI * 2);
      ctx.fill();
      // Rosy cheek
      ctx.fillStyle = "rgba(244,63,94,0.38)";
      ctx.beginPath();
      ctx.arc(3, -12, 3.2, 0, Math.PI * 2);
      ctx.fill();
      // Big Joyful Smile
      ctx.strokeStyle = "#78350F";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(5, -12, 5, 0.1 * Math.PI, 0.85 * Math.PI);
      ctx.stroke();

      // Cute Hero Cap (Red with Star Badge!)
      ctx.fillStyle = "#DC2626";
      ctx.beginPath();
      ctx.arc(0, -19, 15.5, Math.PI, 0);
      ctx.fill();
      // Cap Visor
      ctx.fillStyle = "#B91C1C";
      ctx.beginPath();
      ctx.roundRect(4, -22, 16, 5, 3);
      ctx.fill();
      // White Emblem on Cap
      ctx.fillStyle = "#FFFFFF";
      ctx.beginPath();
      ctx.arc(4, -25, 5, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#F59E0B";
      ctx.beginPath();
      ctx.arc(4, -25, 2.5, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    };

    const loop = () => {
      time += 0.05;
      scrollX += RUN_SPEED;
      runFrame += 1;
      if (wrongCooldown > 0) wrongCooldown--;

      // Handle Jump Request
      if (jumpRequestRef.current) {
        jumpRequestRef.current = false;
        if (jumpsLeft > 0) {
          heroVy = JUMP_FORCE;
          jumpsLeft -= 1;
          playMarioSound("jump");
          spawnDust(HERO_X + HERO_W / 2, heroY + HERO_H, "#FFFFFF", 6);
        }
      }

      // Physics
      const prevBottom = heroY + HERO_H;
      heroVy += GRAVITY;
      heroY += heroVy;

      // Platform Landing Collision
      let landed = false;
      for (const p of platforms) {
        const withinX = HERO_X + HERO_W - 8 > p.x && HERO_X + 8 < p.x + p.w;
        if (withinX && heroVy >= 0 && prevBottom <= p.y + 8 && heroY + HERO_H >= p.y) {
          heroY = p.y - HERO_H;
          heroVy = 0;
          jumpsLeft = 2;
          landed = true;
        }
      }

      // Ground Collision
      if (!landed && heroY + HERO_H >= GROUND_Y) {
        heroY = GROUND_Y - HERO_H;
        heroVy = 0;
        jumpsLeft = 2;
      }

      // Move Platforms & Coins
      platforms.forEach((p) => (p.x -= RUN_SPEED));
      coins.forEach((c) => (c.x -= RUN_SPEED));

      // Cleanup & Spawn New Segments
      platforms = platforms.filter((p) => p.x + p.w > -60);
      coins = coins.filter((c) => c.x > -60 && !c.collected);

      const rightmostCoin = coins.reduce((max, c) => Math.max(max, c.x), 0);
      if (rightmostCoin < W + 240) {
        spawnSegment(Math.max(W + 60, rightmostCoin + 175));
      }

      // Coin Collision Detection
      const heroCenterX = HERO_X + HERO_W / 2;
      const heroCenterY = heroY + HERO_H / 2;

      for (const c of coins) {
        if (c.collected) continue;
        const bobY = c.y + Math.sin(time * 2 + c.bobOffset) * 7;
        const dx = heroCenterX - c.x;
        const dy = heroCenterY - bobY;
        const dist = Math.hypot(dx, dy);

        if (dist < 44) {
          if (c.isTarget) {
            c.collected = true;
            playMarioSound("coin");
            spawnDust(c.x, bobY, "#FACC15", 12, `+${c.letter}`);
            if (mode === "learn") {
              collectedCount += 1;
              callbacksRef.current.onCollectTarget(collectedCount);
            } else {
              callbacksRef.current.onArcadeScore();
            }
          } else if (wrongCooldown === 0) {
            c.collected = true;
            wrongCooldown = 25;
            playMarioSound("wrong");
            spawnDust(c.x, bobY, "#EF4444", 8, "✗");
            callbacksRef.current.onWrongLetter(c.letter);
          }
        }
      }

      // Update Particles
      particles.forEach((pt) => {
        pt.x += pt.vx;
        pt.y += pt.vy;
        if (!pt.text) pt.vy += 0.22;
        pt.life -= 0.03;
      });
      particles = particles.filter((pt) => pt.life > 0);

      // ── RENDER MARIO WORLD ──
      // 1. Vibrant Sky Gradient
      const skyGrad = ctx.createLinearGradient(0, 0, 0, GROUND_Y);
      skyGrad.addColorStop(0, "#38BDF8");
      skyGrad.addColorStop(0.65, "#7DD3FC");
      skyGrad.addColorStop(1, "#E0F2FE");
      ctx.fillStyle = skyGrad;
      ctx.fillRect(0, 0, W, H);

      // Smiling Sun in Sky
      ctx.fillStyle = "#FDE047";
      ctx.beginPath();
      ctx.arc(W - 85, 62, 30, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "rgba(253,224,71,0.35)";
      ctx.beginPath();
      ctx.arc(W - 85, 62, 42 + Math.sin(time) * 3, 0, Math.PI * 2);
      ctx.fill();

      // 2. Parallax Clouds
      const cloudOffset = (scrollX * 0.25) % (W + 220);
      drawCloud(W + 80 - cloudOffset, 64, 0.9);
      drawCloud(((W + 460 - cloudOffset) % (W + 220)) - 60, 108, 0.72);
      drawCloud(((W + 820 - cloudOffset) % (W + 220)) - 60, 52, 1.05);

      // 3. Parallax Green Hills (Classic Mario Vibes!)
      const hillOffset = (scrollX * 0.45) % 480;
      for (let hx = -hillOffset - 160; hx < W + 240; hx += 480) {
        drawHill(hx, 260, 86, "#4ADE80", "#86EFAC");
        drawHill(hx + 230, 190, 58, "#22C55E", "#4ADE80");
      }

      // 4. Floating Mario Brick Platforms
      for (const p of platforms) {
        // Shadow
        ctx.fillStyle = "rgba(15,23,42,0.18)";
        ctx.beginPath();
        ctx.roundRect(p.x + 3, p.y + 5, p.w, p.h, 7);
        ctx.fill();

        // Warm Golden-Orange Brick Body
        ctx.fillStyle = "#F59E0B";
        ctx.strokeStyle = "#B45309";
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.roundRect(p.x, p.y, p.w, p.h, 7);
        ctx.fill();
        ctx.stroke();

        // Brick Dividers + Rivets
        ctx.strokeStyle = "#D97706";
        ctx.lineWidth = 2;
        for (let bx = p.x + 30; bx < p.x + p.w - 10; bx += 30) {
          ctx.beginPath();
          ctx.moveTo(bx, p.y + 2);
          ctx.lineTo(bx, p.y + p.h - 2);
          ctx.stroke();
        }
        ctx.fillStyle = "#FEF3C7";
        ctx.fillRect(p.x + 6, p.y + 4, p.w - 12, 4);
      }

      // 5. Mario Grass & Checkered Dirt Ground
      ctx.fillStyle = "#92400E";
      ctx.fillRect(0, GROUND_Y, W, H - GROUND_Y);

      // Checkered Brick Pattern on Dirt
      const tileW = 40;
      const gOff = scrollX % tileW;
      ctx.fillStyle = "#B45309";
      for (let gx = -gOff; gx < W + tileW; gx += tileW) {
        ctx.fillRect(gx + 3, GROUND_Y + 18, tileW - 6, 18);
        ctx.fillRect(gx + 18, GROUND_Y + 40, tileW - 6, 18);
      }

      // Lush Green Top Grass Lip
      ctx.fillStyle = "#22C55E";
      ctx.fillRect(0, GROUND_Y, W, 16);
      ctx.fillStyle = "#4ADE80";
      ctx.fillRect(0, GROUND_Y, W, 6);

      // 6. Glowing Letter Coins!
      for (const c of coins) {
        const bobY = c.y + Math.sin(time * 2 + c.bobOffset) * 7;
        ctx.save();
        ctx.translate(c.x, bobY);

        if (c.isTarget) {
          // Outer golden sparkle halo for target letter!
          ctx.fillStyle = "rgba(250, 204, 21, 0.35)";
          ctx.beginPath();
          ctx.arc(0, 0, 32 + Math.sin(time * 4) * 3, 0, Math.PI * 2);
          ctx.fill();
        }

        // Coin Body
        ctx.fillStyle = c.isTarget ? "#FACC15" : "#E2E8F0";
        ctx.strokeStyle = c.isTarget ? "#CA8A04" : "#94A3B8";
        ctx.lineWidth = 3.5;
        ctx.beginPath();
        ctx.arc(0, 0, 25, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        // Inner glossy ring
        ctx.fillStyle = c.isTarget ? "#FEF08A" : "#F8FAFC";
        ctx.beginPath();
        ctx.arc(0, 0, 19, 0, Math.PI * 2);
        ctx.fill();

        // Bold Arabic Letter
        ctx.fillStyle = c.isTarget ? "#9A3412" : "#475569";
        ctx.font = "900 26px 'Baloo Bhaijaan 2', sans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(c.letter, 0, 2);

        ctx.restore();
      }

      // 7. Animated Hero Kid
      drawHero(HERO_X, heroY, heroVy, runFrame);

      // 8. Particles & Floating Score Popups
      for (const pt of particles) {
        ctx.save();
        ctx.globalAlpha = Math.max(0, Math.min(1, pt.life));
        if (pt.text) {
          ctx.font = `900 ${pt.size}px 'Baloo Bhaijaan 2', sans-serif`;
          ctx.textAlign = "center";
          ctx.fillStyle = "#FFFFFF";
          ctx.strokeStyle = pt.color;
          ctx.lineWidth = 5;
          ctx.strokeText(pt.text, pt.x, pt.y);
          ctx.fillText(pt.text, pt.x, pt.y);
        } else {
          ctx.fillStyle = pt.color;
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, pt.size, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      }

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [targetLevel.id, mode]);

  return (
    <div style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
      <div
        onPointerDown={(e) => {
          e.preventDefault();
          triggerJump();
        }}
        style={{
          position: "relative",
          width: "100%",
          maxWidth: 880,
          borderRadius: 28,
          overflow: "hidden",
          border: "4px solid #FFFFFF",
          boxShadow: "0 18px 40px rgba(15,23,42,0.22)",
          cursor: "pointer",
          touchAction: "manipulation",
          userSelect: "none",
        }}
      >
        <canvas
          ref={canvasRef}
          width={880}
          height={360}
          style={{ width: "100%", height: "auto", display: "block" }}
        />

        {/* Top Floating Hint Pill */}
        <div
          style={{
            position: "absolute",
            top: 12,
            left: "50%",
            transform: "translateX(-50%)",
            background: "rgba(255,255,255,0.92)",
            padding: "5px 18px",
            borderRadius: 999,
            border: `2.5px solid ${targetLevel.primaryColor}`,
            boxShadow: "0 6px 14px rgba(15,23,42,0.14)",
            whiteSpace: "nowrap",
            pointerEvents: "none",
          }}
        >
          <span style={{ fontSize: "clamp(12px, 1.8vw, 15px)", fontWeight: 900, color: "#1E293B" }}>
            اضغط في أي مكان أو زر المسافة للقفز وجمع عملات حرف{" "}
            <span style={{ color: targetLevel.primaryColor, fontSize: "1.2em" }}>
              ({targetLevel.letter} - {targetLevel.name})
            </span>
          </span>
        </div>
      </div>

      {/* Giant Kid-Friendly Jump Button */}
      <button
        type="button"
        onPointerDown={(e) => {
          e.preventDefault();
          triggerJump();
        }}
        style={{
          background: "linear-gradient(135deg, #F59E0B, #EF4444)",
          color: "#FFFFFF",
          border: "3px solid #FFFFFF",
          borderRadius: 999,
          padding: "10px 38px",
          fontSize: 18,
          fontWeight: 900,
          cursor: "pointer",
          boxShadow: "0 8px 20px rgba(239,68,68,0.4)",
          touchAction: "manipulation",
          userSelect: "none",
        }}
      >
        ⬆️ اقفز يا بطل! (اضغط مرتين للقفزة العالية)
      </button>
    </div>
  );
}

interface LettersIslandProps {
  onBackToMap: () => void;
  onCompleteIsland: (zoneId: string) => void;
  onProgressUpdate?: (completedCount: number, totalCount: number, completedIds?: string[]) => void;
}

export default function LettersIslandAdventure({
  onBackToMap,
  onCompleteIsland,
  onProgressUpdate,
}: LettersIslandProps) {
  const [gameMode, setGameMode] = useState<"learn" | "arcade">("learn");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [completedIds, setCompletedIds] = useState<string[]>([]);

  // Stages: "run" (Mario Runner collect 3 coins) -> "quiz" (Word match) -> "solved"
  const [stage, setStage] = useState<"run" | "quiz" | "solved">("run");
  const [collectedCoins, setCollectedCoins] = useState(0);
  const [runnerHint, setRunnerHint] = useState<string | null>(null);
  const [wrongWord, setWrongWord] = useState<string | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);

  // Endless Mario Arcade state
  const [arcadeTargetIdx, setArcadeTargetIdx] = useState(0);
  const [arcadeScore, setArcadeScore] = useState(0);
  const [arcadeStreak, setArcadeStreak] = useState(0);

  const currentLevel = LETTERS_DATA[currentIndex];
  const arcadeLevel = LETTERS_DATA[arcadeTargetIdx];

  useEffect(() => {
    try {
      const saved = localStorage.getItem("madar_letters_completed_ids");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) setCompletedIds(parsed);
      }
    } catch {}
  }, []);

  // Reset level state when switching letter
  useEffect(() => {
    setCollectedCoins(0);
    setRunnerHint(null);
    setWrongWord(null);
    setStage("run");
  }, [currentIndex]);

  const handleCollectTarget = useCallback(
    (newCount: number) => {
      setCollectedCoins(newCount);
      setRunnerHint(`رائع يا بطل! جمعت ${newCount} من 3 عملات لحرف (${currentLevel.letter})`);
      if (newCount >= 3) {
        setTimeout(() => {
          playMarioSound("fanfare");
          setStage("quiz");
        }, 550);
      }
    },
    [currentLevel.letter]
  );

  const handleWrongLetter = useCallback(
    (wrongLt: string) => {
      const active = gameMode === "learn" ? currentLevel : arcadeLevel;
      setRunnerHint(`تجنب حرف (${wrongLt}).. اقفز واجمع العملات الذهبية لحرف (${active.letter})!`);
      if (gameMode === "arcade") setArcadeStreak(0);
    },
    [gameMode, currentLevel, arcadeLevel]
  );

  const handleArcadeScore = useCallback(() => {
    setArcadeScore((s) => s + 10);
    setArcadeStreak((st) => st + 1);
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 900);
    setArcadeTargetIdx(Math.floor(Math.random() * LETTERS_DATA.length));
  }, []);

  const handleWordChoice = (opt: { word: string; icon: string; isCorrect: boolean }) => {
    if (stage !== "quiz") return;
    if (opt.isCorrect) {
      playMarioSound("fanfare");
      setWrongWord(null);
      setStage("solved");
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 2400);

      const updated = Array.from(new Set([...completedIds, currentLevel.id]));
      setCompletedIds(updated);
      try {
        localStorage.setItem("madar_letters_completed_ids", JSON.stringify(updated));
      } catch {}
      if (onProgressUpdate) {
        onProgressUpdate(updated.length, LETTERS_DATA.length, updated);
      }
    } else {
      playMarioSound("wrong");
      setWrongWord(opt.word);
      setTimeout(() => setWrongWord(null), 600);
    }
  };

  const progressPercent = Math.round((completedIds.length / LETTERS_DATA.length) * 100);

  return (
    <div
      dir="rtl"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 100,
        background: "linear-gradient(180deg, #0EA5E9 0%, #38BDF8 35%, #E0F2FE 75%, #DCFCE7 100%)",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        fontFamily: "'Baloo Bhaijaan 2', 'Marhey', sans-serif",
      }}
    >
      <style>{`
        @keyframes marioConfetti {
          0% { transform: translateY(-20px) rotate(0deg); opacity: 1; }
          100% { transform: translateY(105vh) rotate(720deg); opacity: 0; }
        }
        @keyframes marioWordShake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-8px); }
          75% { transform: translateX(8px); }
        }
        .let-scroll::-webkit-scrollbar { height: 5px; }
      `}</style>

      {/* Confetti */}
      {showConfetti && (
        <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 200, overflow: "hidden" }}>
          {Array.from({ length: 40 }).map((_, i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                top: -15,
                left: `${(i * 2.5) % 100}%`,
                width: i % 2 === 0 ? 12 : 9,
                height: i % 2 === 0 ? 12 : 16,
                borderRadius: i % 3 === 0 ? "50%" : 3,
                background: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
                animation: `marioConfetti ${1.4 + (i % 5) * 0.22}s ease-in forwards`,
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
          boxShadow: "0 6px 20px rgba(14,165,233,0.16)",
          zIndex: 30,
          gap: 10,
          flexWrap: "wrap",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ position: "relative", width: 88, height: 34, flexShrink: 0 }}>
            <Image src="/logo.png" alt="مدار الأمل" fill style={{ objectFit: "contain" }} />
          </div>
          <h1
            style={{
              margin: 0,
              fontSize: "clamp(16px, 2.4vw, 22px)",
              fontWeight: 900,
              background: "linear-gradient(90deg, #EF4444, #F59E0B, #10B981)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              lineHeight: 1.1,
            }}
          >
            مغامرة بطل الحروف
          </h1>
        </div>

        {/* Mode Toggle */}
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
              playMarioSound("click");
              setGameMode("learn");
            }}
            style={{
              padding: "6px 14px",
              borderRadius: 999,
              border: "none",
              cursor: "pointer",
              fontWeight: 800,
              fontSize: 13,
              background: gameMode === "learn" ? "linear-gradient(135deg, #EF4444, #F59E0B)" : "transparent",
              color: gameMode === "learn" ? "#FFF" : "#475569",
            }}
          >
            مراحل الحروف (أ - ي)
          </button>
          <button
            onClick={() => {
              playMarioSound("click");
              setGameMode("arcade");
            }}
            style={{
              padding: "6px 14px",
              borderRadius: 999,
              border: "none",
              cursor: "pointer",
              fontWeight: 800,
              fontSize: 13,
              background: gameMode === "arcade" ? "linear-gradient(135deg, #10B981, #0EA5E9)" : "transparent",
              color: gameMode === "arcade" ? "#FFF" : "#475569",
            }}
          >
            السباق اللانهائي
          </button>
        </div>

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
            }}
          >
            الحروف: {completedIds.length}/{LETTERS_DATA.length} ({progressPercent}%)
          </div>
          <button
            onClick={() => {
              playMarioSound("click");
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
      </header>

      {/* Main Content */}
      <main
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "10px 16px",
          overflowY: "auto",
        }}
      >
        {gameMode === "learn" ? (
          <div style={{ width: "100%", maxWidth: 920, display: "flex", flexDirection: "column", gap: 12 }}>
            {/* Top Target Banner */}
            <div
              style={{
                background: "rgba(255,255,255,0.95)",
                borderRadius: 24,
                padding: "12px 18px",
                border: `3.5px solid ${currentLevel.primaryColor}`,
                boxShadow: `0 10px 24px ${currentLevel.primaryColor}25`,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: 10,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div
                  onClick={() => speakArabicLetter(`حرف ${currentLevel.name}. ${currentLevel.word}`)}
                  style={{
                    width: 66,
                    height: 66,
                    borderRadius: 20,
                    background: `linear-gradient(135deg, ${currentLevel.primaryColor}, ${currentLevel.secondaryColor})`,
                    color: "#FFF",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 40,
                    fontWeight: 900,
                    cursor: "pointer",
                    boxShadow: `0 6px 16px ${currentLevel.primaryColor}55`,
                  }}
                >
                  {currentLevel.letter}
                </div>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                    <span style={{ fontSize: 24, fontWeight: 900, color: currentLevel.primaryColor }}>
                      حرف {currentLevel.name}
                    </span>
                    <span
                      style={{
                        background: currentLevel.bgGradient,
                        color: currentLevel.primaryColor,
                        borderRadius: 10,
                        padding: "2px 10px",
                        fontSize: 16,
                        fontWeight: 900,
                      }}
                    >
                      {currentLevel.icon} {currentLevel.word}
                    </span>
                    <button
                      onClick={() => speakArabicLetter(`حرف ${currentLevel.name}. ${currentLevel.chant}`)}
                      style={{
                        background: "#F1F5F9",
                        border: "2px solid #CBD5E1",
                        borderRadius: 999,
                        padding: "2px 10px",
                        fontSize: 12,
                        fontWeight: 800,
                        color: "#334155",
                        cursor: "pointer",
                      }}
                    >
                      اسمع النطق
                    </button>
                  </div>
                  <p style={{ margin: "2px 0 0", color: "#475569", fontSize: 13.5, fontWeight: 700 }}>
                    {runnerHint || currentLevel.chant}
                  </p>
                </div>
              </div>

              {/* 3 Gold Coin Slots */}
              <div
                style={{
                  background: "#FFFBEB",
                  borderRadius: 16,
                  padding: "6px 14px",
                  border: "2px solid #F59E0B",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <span style={{ fontSize: 11, fontWeight: 800, color: "#92400E" }}>العملات الذهبية</span>
                <div style={{ display: "flex", gap: 6, marginTop: 3 }}>
                  {[0, 1, 2].map((idx) => {
                    const filled = idx < collectedCoins || stage !== "run";
                    return (
                      <div
                        key={idx}
                        style={{
                          width: 28,
                          height: 28,
                          borderRadius: "50%",
                          background: filled ? "linear-gradient(135deg, #FACC15, #F59E0B)" : "#E2E8F0",
                          color: filled ? "#78350F" : "#94A3B8",
                          border: filled ? "2px solid #CA8A04" : "2px solid #CBD5E1",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: 15,
                          fontWeight: 900,
                        }}
                      >
                        {filled ? currentLevel.letter : "★"}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Stage 1: Mario Side-Scrolling Runner */}
            {stage === "run" && (
              <MarioLetterRunnerCanvas
                targetLevel={currentLevel}
                mode="learn"
                onCollectTarget={handleCollectTarget}
                onWrongLetter={handleWrongLetter}
                onArcadeScore={handleArcadeScore}
              />
            )}

            {/* Stage 2: Word Quiz */}
            {stage === "quiz" && (
              <div
                style={{
                  background: "rgba(255,255,255,0.96)",
                  borderRadius: 28,
                  padding: "26px 20px",
                  border: `4px solid ${currentLevel.primaryColor}`,
                  boxShadow: "0 18px 40px rgba(15,23,42,0.14)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 20,
                  minHeight: 310,
                  justifyContent: "center",
                }}
              >
                <div
                  style={{
                    background: currentLevel.bgGradient,
                    color: currentLevel.primaryColor,
                    padding: "8px 22px",
                    borderRadius: 999,
                    fontWeight: 900,
                    fontSize: 19,
                  }}
                >
                  وصلت لخط النهاية! أي كلمة تبدأ بحرف ({currentLevel.letter} - {currentLevel.name})؟
                </div>
                <div style={{ display: "flex", gap: 16, flexWrap: "wrap", justifyContent: "center" }}>
                  {currentLevel.wordOptions.map((opt, idx) => {
                    const bg = CONFETTI_COLORS[(idx * 2 + currentIndex) % CONFETTI_COLORS.length];
                    const isWrong = wrongWord === opt.word;
                    return (
                      <button
                        key={opt.word}
                        onClick={() => handleWordChoice(opt)}
                        style={{
                          minWidth: 145,
                          padding: "18px 22px",
                          borderRadius: 24,
                          border: "none",
                          cursor: "pointer",
                          background: isWrong ? "#EF4444" : bg,
                          color: "#FFF",
                          boxShadow: "0 10px 20px rgba(15,23,42,0.18)",
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          gap: 6,
                          animation: isWrong ? "marioWordShake 0.45s ease" : "none",
                        }}
                      >
                        <span style={{ fontSize: 44, lineHeight: 1 }}>{opt.icon}</span>
                        <span style={{ fontSize: 22, fontWeight: 900 }}>{opt.word}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Stage 3: Victory Card */}
            {stage === "solved" && (
              <div
                style={{
                  background: "rgba(255,255,255,0.97)",
                  borderRadius: 28,
                  padding: "28px 24px",
                  border: "4px solid #10B981",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                  gap: 14,
                  minHeight: 300,
                  justifyContent: "center",
                }}
              >
                <div
                  style={{
                    width: 86,
                    height: 86,
                    borderRadius: "50%",
                    background: `linear-gradient(135deg, ${currentLevel.primaryColor}, ${currentLevel.secondaryColor})`,
                    color: "#FFF",
                    fontSize: 46,
                    fontWeight: 900,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {currentLevel.letter}
                </div>
                <h2 style={{ margin: 0, fontSize: 26, fontWeight: 900, color: "#059669" }}>
                  بطل المغامرة! أتقنت حرف {currentLevel.name} ({currentLevel.icon} {currentLevel.word})
                </h2>
                <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
                  <button
                    onClick={() => {
                      playMarioSound("click");
                      setCollectedCoins(0);
                      setStage("run");
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
                    العب المرحلة مرة أخرى
                  </button>
                  {currentIndex < LETTERS_DATA.length - 1 ? (
                    <button
                      onClick={() => {
                        playMarioSound("click");
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
                      }}
                    >
                      المرحلة التالية ({LETTERS_DATA[currentIndex + 1].letter} - {LETTERS_DATA[currentIndex + 1].name}) ⬅
                    </button>
                  ) : (
                    <button
                      onClick={() => onCompleteIsland("letters")}
                      style={{
                        padding: "11px 28px",
                        borderRadius: 16,
                        border: "none",
                        background: "linear-gradient(135deg, #F59E0B, #EA580C)",
                        color: "#FFF",
                        fontWeight: 900,
                        fontSize: 16,
                        cursor: "pointer",
                      }}
                    >
                      إنهاء جزيرة الحروف والاحتفال!
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        ) : (
          /* Endless Mario Runner Arcade */
          <div style={{ width: "100%", maxWidth: 920, display: "flex", flexDirection: "column", gap: 12 }}>
            <div
              style={{
                background: "rgba(255,255,255,0.95)",
                borderRadius: 22,
                padding: "12px 18px",
                border: "3px solid #10B981",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: 10,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div
                  style={{
                    width: 58,
                    height: 58,
                    borderRadius: 16,
                    background: `linear-gradient(135deg, ${arcadeLevel.primaryColor}, ${arcadeLevel.secondaryColor})`,
                    color: "#FFF",
                    fontSize: 34,
                    fontWeight: 900,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {arcadeLevel.letter}
                </div>
                <div>
                  <div style={{ fontSize: 19, fontWeight: 900, color: "#065F46" }}>
                    اجمع عملة حرف: {arcadeLevel.name} ({arcadeLevel.letter}) {arcadeLevel.icon}
                  </div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: "#64748B" }}>
                    {runnerHint || "اجرِ واقفز فوق المنصات لجمع العملة الذهبية الصحيحة!"}
                  </div>
                </div>
              </div>
              <div style={{ display: "flex", gap: 10 }}>
                <div style={{ background: "#FEF3C7", border: "2px solid #F59E0B", borderRadius: 14, padding: "6px 14px", fontWeight: 900, color: "#92400E" }}>
                  النقاط: {arcadeScore}
                </div>
                <div style={{ background: "#ECFDF5", border: "2px solid #10B981", borderRadius: 14, padding: "6px 14px", fontWeight: 900, color: "#065F46" }}>
                  التتابع: {arcadeStreak}
                </div>
              </div>
            </div>

            <MarioLetterRunnerCanvas
              targetLevel={arcadeLevel}
              mode="arcade"
              onCollectTarget={handleCollectTarget}
              onWrongLetter={handleWrongLetter}
              onArcadeScore={handleArcadeScore}
            />
          </div>
        )}
      </main>

      {/* Bottom 28 Letters Stepper */}
      {gameMode === "learn" && (
        <footer
          style={{
            background: "rgba(255,255,255,0.94)",
            borderTop: "3px solid #FFFFFF",
            padding: "8px 14px",
            display: "flex",
            justifyContent: "center",
            zIndex: 30,
          }}
        >
          <div className="let-scroll" style={{ display: "flex", gap: 7, overflowX: "auto", paddingBottom: 3, maxWidth: "100%" }}>
            {LETTERS_DATA.map((item, idx) => {
              const isActive = idx === currentIndex;
              const isSolved = completedIds.includes(item.id);
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    playMarioSound("click");
                    setCurrentIndex(idx);
                  }}
                  style={{
                    minWidth: 46,
                    height: 46,
                    borderRadius: 14,
                    border: isActive ? "3px solid #1E293B" : "2px solid #E2E8F0",
                    background: isSolved
                      ? "linear-gradient(135deg, #10B981, #059669)"
                      : isActive
                      ? `linear-gradient(135deg, ${item.primaryColor}, ${item.secondaryColor})`
                      : "#F1F5F9",
                    color: isSolved || isActive ? "#FFF" : "#334155",
                    fontSize: 21,
                    fontWeight: 900,
                    cursor: "pointer",
                    position: "relative",
                    flexShrink: 0,
                  }}
                >
                  {item.letter}
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
      )}
    </div>
  );
}
