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

const BUBBLE_PALETTE = [
  { body: "#FF4D6D", shine: "#FF8FA3", dark: "#C9184A" },
  { body: "#FF9F1C", shine: "#FFBF69", dark: "#D97706" },
  { body: "#10B981", shine: "#6EE7B7", dark: "#047857" },
  { body: "#0EA5E9", shine: "#7DD3FC", dark: "#0369A1" },
  { body: "#8B5CF6", shine: "#C4B5FD", dark: "#6D28D9" },
  { body: "#EC4899", shine: "#F9A8D4", dark: "#BE185D" },
  { body: "#F59E0B", shine: "#FDE68A", dark: "#B45309" },
  { body: "#06B6D4", shine: "#67E8F9", dark: "#0E7490" },
];

const SCALE_FREQS = [523.25, 659.25, 783.99, 1046.5];

function playLetterSound(type: "pop" | "correct" | "wrong" | "fanfare" | "click", stepIndex = 0) {
  try {
    const AudioCtx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const now = ctx.currentTime;

    if (type === "pop") {
      const popOsc = ctx.createOscillator();
      const popGain = ctx.createGain();
      popOsc.type = "sine";
      popOsc.frequency.setValueAtTime(380, now);
      popOsc.frequency.exponentialRampToValueAtTime(110, now + 0.08);
      popGain.gain.setValueAtTime(0.32, now);
      popGain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);
      popOsc.connect(popGain);
      popGain.connect(ctx.destination);
      popOsc.start(now);
      popOsc.stop(now + 0.09);

      const noteFreq = SCALE_FREQS[stepIndex % SCALE_FREQS.length];
      const chimeOsc = ctx.createOscillator();
      const chimeGain = ctx.createGain();
      chimeOsc.type = "triangle";
      chimeOsc.frequency.setValueAtTime(noteFreq, now + 0.03);
      chimeGain.gain.setValueAtTime(0.24, now + 0.03);
      chimeGain.gain.exponentialRampToValueAtTime(0.001, now + 0.34);
      chimeOsc.connect(chimeGain);
      chimeGain.connect(ctx.destination);
      chimeOsc.start(now + 0.03);
      chimeOsc.stop(now + 0.35);
    } else if (type === "correct" || type === "fanfare") {
      const notes =
        type === "fanfare"
          ? [523.25, 659.25, 783.99, 1046.5, 783.99, 1046.5]
          : [523.25, 659.25, 783.99, 1046.5];
      notes.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "triangle";
        osc.frequency.setValueAtTime(freq, now + i * 0.09);
        gain.gain.setValueAtTime(0.22, now + i * 0.09);
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.09 + 0.38);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + i * 0.09);
        osc.stop(now + i * 0.09 + 0.4);
      });
    } else if (type === "wrong") {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(240, now);
      osc.frequency.linearRampToValueAtTime(175, now + 0.2);
      gain.gain.setValueAtTime(0.18, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.24);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.25);
    } else {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(640, now);
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.09);
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

// ── Glossy 3D Letter Balloon SVG ──
function GlossyLetterBalloon({
  color,
  letter,
  size = 90,
}: {
  color: { body: string; shine: string; dark: string };
  letter: string;
  size?: number;
}) {
  return (
    <svg
      width={size}
      height={size * 1.32}
      viewBox="0 0 90 120"
      style={{ filter: "drop-shadow(0 10px 14px rgba(15,23,42,0.2))", overflow: "visible" }}
    >
      <path
        d="M45 86 Q52 96 43 105 Q37 112 46 119"
        fill="none"
        stroke="rgba(71,85,105,0.65)"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      <polygon points="40,87 50,87 45,80" fill={color.dark} />
      <ellipse cx="45" cy="44" rx="35" ry="40" fill={color.body} stroke={color.dark} strokeWidth="2.5" />
      <ellipse cx="33" cy="29" rx="11" ry="18" fill={color.shine} opacity="0.6" transform="rotate(-18 33 29)" />
      <circle cx="28" cy="21" r="4" fill="#FFFFFF" opacity="0.85" />
      <text
        x="45"
        y="55"
        textAnchor="middle"
        fill="#FFFFFF"
        fontSize="36"
        fontWeight="900"
        style={{
          fontFamily: "'Baloo Bhaijaan 2', sans-serif",
          filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.32))",
        }}
      >
        {letter}
      </text>
    </svg>
  );
}

interface FloatingLetterBalloon {
  uid: string;
  letter: string;
  isTarget: boolean;
  xPercent: number;
  yPercent: number;
  colorIndex: number;
  popped: boolean;
  wrongShake: boolean;
  delay: number;
  duration: number;
}

interface PopBurst {
  id: number;
  x: number;
  y: number;
  letter: string;
  color: string;
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

  // Learn mode stages: "pop" (find & pop 3 matching letter balloons) -> "quiz" (pick word starting with letter) -> "solved"
  const [stage, setStage] = useState<"pop" | "quiz" | "solved">("pop");
  const [balloons, setBalloons] = useState<FloatingLetterBalloon[]>([]);
  const [poppedTargets, setPoppedTargets] = useState(0);
  const [popHint, setPopHint] = useState<string | null>(null);
  const [bursts, setBursts] = useState<PopBurst[]>([]);

  // Quiz state
  const [wrongWord, setWrongWord] = useState<string | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);

  // Arcade mode state
  const [arcadeTarget, setArcadeTarget] = useState<LetterLevel>(LETTERS_DATA[0]);
  const [arcadeBalloons, setArcadeBalloons] = useState<FloatingLetterBalloon[]>([]);
  const [arcadeScore, setArcadeScore] = useState(0);
  const [arcadeStreak, setArcadeStreak] = useState(0);
  const [arcadeFeedback, setArcadeFeedback] = useState<string | null>(null);

  const burstIdRef = useRef(0);
  const currentLevel = LETTERS_DATA[currentIndex];

  // Load saved progress
  useEffect(() => {
    try {
      const saved = localStorage.getItem("madar_letters_completed_ids");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) setCompletedIds(parsed);
      }
    } catch {}
  }, []);

  // Build 6 balloons for current letter: 3 target + 3 distractors
  const initBalloonsForLetter = useCallback((level: LetterLevel) => {
    const items = [
      { letter: level.letter, isTarget: true },
      { letter: level.letter, isTarget: true },
      { letter: level.letter, isTarget: true },
      { letter: level.distractors[0], isTarget: false },
      { letter: level.distractors[1], isTarget: false },
      { letter: level.distractors[2], isTarget: false },
    ].sort(() => Math.random() - 0.5);

    const generated: FloatingLetterBalloon[] = items.map((item, idx) => {
      const row = Math.floor(idx / 3);
      const col = idx % 3;
      const xBase = 20 + col * 30 + (row === 1 ? 4 : -4);
      const yBase = row === 0 ? 34 : 66;
      return {
        uid: `${level.id}-b-${idx}-${Date.now()}`,
        letter: item.letter,
        isTarget: item.isTarget,
        xPercent: xBase,
        yPercent: yBase,
        colorIndex: (idx + currentIndex) % BUBBLE_PALETTE.length,
        popped: false,
        wrongShake: false,
        delay: idx * 0.3,
        duration: 2.7 + (idx % 3) * 0.45,
      };
    });

    setBalloons(generated);
    setPoppedTargets(0);
    setPopHint(null);
    setBursts([]);
    setWrongWord(null);
    setStage("pop");
  }, [currentIndex]);

  useEffect(() => {
    initBalloonsForLetter(currentLevel);
  }, [currentLevel, initBalloonsForLetter]);

  // Arcade round generator
  const initArcadeRound = useCallback(() => {
    const target = LETTERS_DATA[Math.floor(Math.random() * LETTERS_DATA.length)];
    setArcadeTarget(target);

    const pool = new Set<string>([target.letter]);
    while (pool.size < 6) {
      pool.add(LETTERS_DATA[Math.floor(Math.random() * LETTERS_DATA.length)].letter);
    }
    const letters = Array.from(pool).sort(() => Math.random() - 0.5);

    const list: FloatingLetterBalloon[] = letters.map((lt, idx) => ({
      uid: `arc-${Date.now()}-${idx}`,
      letter: lt,
      isTarget: lt === target.letter,
      xPercent: 12 + idx * 15,
      yPercent: 34 + (idx % 2) * 32,
      colorIndex: (idx * 2 + lt.charCodeAt(0)) % BUBBLE_PALETTE.length,
      popped: false,
      wrongShake: false,
      delay: idx * 0.25,
      duration: 2.8 + (idx % 3) * 0.5,
    }));

    setArcadeBalloons(list);
    setArcadeFeedback(null);
  }, []);

  useEffect(() => {
    if (gameMode === "arcade") {
      initArcadeRound();
    }
  }, [gameMode, initArcadeRound]);

  // Pop a balloon in Learn Mode
  const handlePopBalloon = (b: FloatingLetterBalloon) => {
    if (b.popped || stage !== "pop") return;

    if (b.isTarget) {
      const nextCount = poppedTargets + 1;
      playLetterSound("pop", nextCount - 1);
      setBalloons((prev) => prev.map((item) => (item.uid === b.uid ? { ...item, popped: true } : item)));
      setPoppedTargets(nextCount);
      setPopHint(`ممتاز! وجدت الحرف ${currentLevel.letter} (${nextCount} من 3)`);

      const bId = ++burstIdRef.current;
      setBursts((prev) => [
        ...prev,
        {
          id: bId,
          x: b.xPercent,
          y: b.yPercent,
          letter: b.letter,
          color: BUBBLE_PALETTE[b.colorIndex].body,
        },
      ]);
      setTimeout(() => {
        setBursts((prev) => prev.filter((item) => item.id !== bId));
      }, 850);

      if (nextCount >= 3) {
        setTimeout(() => {
          playLetterSound("correct");
          setStage("quiz");
        }, 650);
      }
    } else {
      playLetterSound("wrong");
      setPopHint(`هذا حرف (${b.letter}).. ابحث عن بالون الحرف (${currentLevel.letter}) يا بطل!`);
      setBalloons((prev) => prev.map((item) => (item.uid === b.uid ? { ...item, wrongShake: true } : item)));
      setTimeout(() => {
        setBalloons((prev) => prev.map((item) => (item.uid === b.uid ? { ...item, wrongShake: false } : item)));
      }, 480);
    }
  };

  // Answer Word Quiz
  const handleWordChoice = (opt: { word: string; icon: string; isCorrect: boolean }) => {
    if (stage !== "quiz") return;

    if (opt.isCorrect) {
      playLetterSound("fanfare");
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
      playLetterSound("wrong");
      setWrongWord(opt.word);
      setTimeout(() => setWrongWord(null), 600);
    }
  };

  // Tap Balloon in Arcade Mode
  const handleArcadeTap = (b: FloatingLetterBalloon) => {
    if (b.popped) return;
    if (b.isTarget) {
      playLetterSound("fanfare");
      setArcadeBalloons((prev) => prev.map((item) => (item.uid === b.uid ? { ...item, popped: true } : item)));
      setArcadeScore((s) => s + 10);
      setArcadeStreak((st) => st + 1);
      setArcadeFeedback(`بطل رائع! هذا هو حرف ${arcadeTarget.name} (${arcadeTarget.letter}) مثل ${arcadeTarget.word}`);
      setShowConfetti(true);
      setTimeout(() => {
        setShowConfetti(false);
        initArcadeRound();
      }, 1350);
    } else {
      playLetterSound("wrong");
      setArcadeStreak(0);
      setArcadeBalloons((prev) =>
        prev.map((item) => (item.uid === b.uid ? { ...item, wrongShake: true } : item))
      );
      setArcadeFeedback(`حاول مرة أخرى! ابحث عن بالون حرف ${arcadeTarget.name} (${arcadeTarget.letter})`);
      setTimeout(() => {
        setArcadeBalloons((prev) =>
          prev.map((item) => (item.uid === b.uid ? { ...item, wrongShake: false } : item))
        );
      }, 480);
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
        background: "linear-gradient(180deg, #A855F7 0%, #EC4899 35%, #FCE7F3 75%, #FEF3C7 100%)",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        fontFamily: "'Baloo Bhaijaan 2', 'Marhey', sans-serif",
      }}
    >
      <style>{`
        @keyframes letterBalloonBob {
          0%, 100% { transform: translate(-50%, -50%) translateY(0px) rotate(-2.5deg); }
          50% { transform: translate(-50%, -50%) translateY(-15px) rotate(2.5deg); }
        }
        @keyframes letterBurstAnim {
          0% { transform: translate(-50%, -50%) scale(0.4); opacity: 1; }
          60% { transform: translate(-50%, -75%) scale(1.35); opacity: 1; }
          100% { transform: translate(-50%, -105%) scale(1.6); opacity: 0; }
        }
        @keyframes letterConfetti {
          0% { transform: translateY(-20px) rotate(0deg); opacity: 1; }
          100% { transform: translateY(105vh) rotate(720deg); opacity: 0; }
        }
        @keyframes letterBounce {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.07); }
        }
        @keyframes letterShake {
          0%, 100% { transform: translate(-50%, -50%) translateX(0); }
          25% { transform: translate(-50%, -50%) translateX(-9px) rotate(-5deg); }
          75% { transform: translate(-50%, -50%) translateX(9px) rotate(5deg); }
        }
        @keyframes wordShake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-8px); }
          75% { transform: translateX(8px); }
        }
        .let-balloon-btn:hover { filter: brightness(1.08) saturate(1.1); }
        .let-balloon-btn:active { transform: translate(-50%, -50%) scale(0.86) !important; }
        .let-scroll::-webkit-scrollbar { height: 5px; }
      `}</style>

      {/* ── Confetti Overlay ── */}
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
                background: BUBBLE_PALETTE[i % BUBBLE_PALETTE.length].body,
                animation: `letterConfetti ${1.5 + (i % 5) * 0.25}s ease-in forwards`,
                animationDelay: `${(i % 7) * 0.06}s`,
              }}
            />
          ))}
        </div>
      )}

      {/* ── Header Bar ── */}
      <header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "10px 18px",
          background: "rgba(255,255,255,0.9)",
          backdropFilter: "blur(12px)",
          borderBottom: "3px solid #FFFFFF",
          boxShadow: "0 6px 20px rgba(168,85,247,0.18)",
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
              background: "linear-gradient(90deg, #9333EA, #EC4899, #F59E0B)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              lineHeight: 1.1,
            }}
          >
            جزيرة الحروف السحرية
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
              playLetterSound("click");
              setGameMode("learn");
            }}
            style={{
              padding: "6px 14px",
              borderRadius: 999,
              border: "none",
              cursor: "pointer",
              fontWeight: 800,
              fontSize: 13,
              background: gameMode === "learn" ? "linear-gradient(135deg, #9333EA, #EC4899)" : "transparent",
              color: gameMode === "learn" ? "#FFF" : "#475569",
              boxShadow: gameMode === "learn" ? "0 3px 10px rgba(236,72,153,0.35)" : "none",
            }}
          >
            مغامرة الحروف (أ - ي)
          </button>
          <button
            onClick={() => {
              playLetterSound("click");
              setGameMode("arcade");
            }}
            style={{
              padding: "6px 14px",
              borderRadius: 999,
              border: "none",
              cursor: "pointer",
              fontWeight: 800,
              fontSize: 13,
              background: gameMode === "arcade" ? "linear-gradient(135deg, #F59E0B, #EF4444)" : "transparent",
              color: gameMode === "arcade" ? "#FFF" : "#475569",
              boxShadow: gameMode === "arcade" ? "0 3px 10px rgba(245,158,11,0.35)" : "none",
            }}
          >
            لعبة صيد الحروف
          </button>
        </div>

        {/* Right Controls */}
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
              playLetterSound("click");
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

      {/* ── Main Content ── */}
      <main
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "12px 16px",
          overflowY: "auto",
        }}
      >
        {gameMode === "learn" ? (
          <div style={{ width: "100%", maxWidth: 960, display: "flex", flexDirection: "column", gap: 14 }}>
            {/* Top Letter Showcase Card */}
            <div
              style={{
                background: "rgba(255,255,255,0.95)",
                borderRadius: 26,
                padding: "14px 20px",
                border: `3.5px solid ${currentLevel.primaryColor}`,
                boxShadow: `0 12px 28px ${currentLevel.primaryColor}30`,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: 12,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <div
                  onClick={() => {
                    playLetterSound("click");
                    speakArabicLetter(`حرف ${currentLevel.name}. ${currentLevel.word}`);
                  }}
                  title="اضغط لسماع النطق"
                  style={{
                    width: 76,
                    height: 76,
                    borderRadius: 22,
                    background: `linear-gradient(135deg, ${currentLevel.primaryColor}, ${currentLevel.secondaryColor})`,
                    color: "#FFF",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 46,
                    fontWeight: 900,
                    cursor: "pointer",
                    boxShadow: `0 8px 18px ${currentLevel.primaryColor}55, inset 0 3px 6px rgba(255,255,255,0.45)`,
                    animation: "letterBounce 2.2s ease-in-out infinite",
                    flexShrink: 0,
                  }}
                >
                  {currentLevel.letter}
                </div>

                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                    <span style={{ fontSize: "clamp(22px, 3vw, 28px)", fontWeight: 900, color: currentLevel.primaryColor }}>
                      حرف {currentLevel.name}
                    </span>
                    <span
                      style={{
                        background: currentLevel.bgGradient,
                        color: currentLevel.primaryColor,
                        border: `2px solid ${currentLevel.primaryColor}40`,
                        borderRadius: 12,
                        padding: "2px 12px",
                        fontSize: 17,
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
                        padding: "3px 11px",
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

              {/* 3 Star Targets Tracker */}
              <div
                style={{
                  background: currentLevel.bgGradient,
                  borderRadius: 18,
                  padding: "8px 16px",
                  border: `2px solid ${currentLevel.primaryColor}44`,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  minWidth: 140,
                }}
              >
                <span style={{ fontSize: 12, fontWeight: 800, color: "#64748B" }}>
                  {stage === "pop" ? "بالونات الحرف" : stage === "quiz" ? "تحدي الكلمة" : "أحسنت يا بطل!"}
                </span>
                <div style={{ display: "flex", gap: 8, marginTop: 4 }}>
                  {[0, 1, 2].map((idx) => {
                    const filled = idx < poppedTargets || stage !== "pop";
                    return (
                      <div
                        key={idx}
                        style={{
                          width: 28,
                          height: 28,
                          borderRadius: "50%",
                          background: filled
                            ? `linear-gradient(135deg, ${currentLevel.primaryColor}, ${currentLevel.secondaryColor})`
                            : "#E2E8F0",
                          color: filled ? "#FFF" : "#94A3B8",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: 15,
                          fontWeight: 900,
                          transition: "transform 0.25s",
                          transform: filled ? "scale(1.12)" : "scale(0.95)",
                        }}
                      >
                        {filled ? currentLevel.letter : "★"}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Stage 1: Pop 3 Matching Letter Balloons */}
            {stage === "pop" && (
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  height: "clamp(300px, 46vh, 420px)",
                  borderRadius: 30,
                  background: "linear-gradient(180deg, #7C3AED 0%, #C084FC 45%, #FBCFE8 100%)",
                  border: "4px solid #FFFFFF",
                  boxShadow: "0 16px 36px rgba(124,58,237,0.28)",
                  overflow: "hidden",
                }}
              >
                {/* Prompt Banner */}
                <div
                  style={{
                    position: "absolute",
                    top: 12,
                    left: "50%",
                    transform: "translateX(-50%)",
                    background: "rgba(255,255,255,0.95)",
                    padding: "6px 20px",
                    borderRadius: 999,
                    boxShadow: "0 6px 16px rgba(15,23,42,0.14)",
                    zIndex: 10,
                    whiteSpace: "nowrap",
                    border: `2px solid ${currentLevel.primaryColor}`,
                  }}
                >
                  <span style={{ fontSize: "clamp(13px, 2vw, 16px)", fontWeight: 900, color: "#1E293B" }}>
                    {popHint || (
                      <>
                        فرقع ٣ بالونات تحمل الحرف{" "}
                        <span style={{ color: currentLevel.primaryColor, fontSize: "1.2em" }}>
                          ({currentLevel.letter} - {currentLevel.name})
                        </span>
                      </>
                    )}
                  </span>
                </div>

                {/* Floating Letter Balloons */}
                {balloons.map((b) =>
                  b.popped ? null : (
                    <button
                      key={b.uid}
                      className="let-balloon-btn"
                      onClick={() => handlePopBalloon(b)}
                      style={{
                        position: "absolute",
                        left: `${b.xPercent}%`,
                        top: `${b.yPercent}%`,
                        background: "none",
                        border: "none",
                        padding: 0,
                        cursor: "pointer",
                        animation: b.wrongShake
                          ? "letterShake 0.45s ease"
                          : `letterBalloonBob ${b.duration}s ease-in-out ${b.delay}s infinite`,
                        zIndex: 15,
                        touchAction: "manipulation",
                      }}
                    >
                      <GlossyLetterBalloon color={BUBBLE_PALETTE[b.colorIndex]} letter={b.letter} size={88} />
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
                      animation: "letterBurstAnim 0.85s ease-out forwards",
                    }}
                  >
                    <div
                      style={{
                        width: 60,
                        height: 60,
                        borderRadius: "50%",
                        background: "#FFF",
                        border: `4px solid ${burst.color}`,
                        color: burst.color,
                        fontSize: 32,
                        fontWeight: 900,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        boxShadow: `0 0 24px ${burst.color}`,
                      }}
                    >
                      {burst.letter}
                    </div>
                  </div>
                ))}

                {/* Grassy Ground */}
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

            {/* Stage 2: Word & Picture Quiz */}
            {stage === "quiz" && (
              <div
                style={{
                  background: "rgba(255,255,255,0.96)",
                  borderRadius: 30,
                  padding: "26px 20px",
                  border: `4px solid ${currentLevel.primaryColor}`,
                  boxShadow: "0 18px 40px rgba(15,23,42,0.14)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 20,
                  minHeight: 320,
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
                    border: `2px solid ${currentLevel.primaryColor}40`,
                  }}
                >
                  تحدي الذكاء: أي كلمة تبدأ بحرف ({currentLevel.letter} - {currentLevel.name})؟
                </div>

                <div style={{ display: "flex", gap: 16, flexWrap: "wrap", justifyContent: "center" }}>
                  {currentLevel.wordOptions.map((opt, idx) => {
                    const pal = BUBBLE_PALETTE[(idx * 2 + currentIndex) % BUBBLE_PALETTE.length];
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
                          background: isWrong
                            ? "linear-gradient(135deg, #EF4444, #DC2626)"
                            : `linear-gradient(135deg, ${pal.body}, ${pal.dark})`,
                          color: "#FFF",
                          boxShadow: `0 10px 20px ${pal.body}55, inset 0 3px 6px rgba(255,255,255,0.4)`,
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          gap: 6,
                          animation: isWrong ? "wordShake 0.45s ease" : "none",
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

            {/* Stage 3: Solved Celebration */}
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
                  {currentLevel.letter}
                </div>

                <h2 style={{ margin: 0, fontSize: 27, fontWeight: 900, color: "#059669" }}>
                  ممتاز يا بطل! أتقنت حرف {currentLevel.name} ({currentLevel.icon} {currentLevel.word})
                </h2>
                <p style={{ margin: 0, fontSize: 15, fontWeight: 700, color: "#475569" }}>
                  أتممت {completedIds.length} من {LETTERS_DATA.length} حرفاً في جزيرة الحروف السحرية!
                </p>

                <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center", marginTop: 6 }}>
                  <button
                    onClick={() => {
                      playLetterSound("click");
                      initBalloonsForLetter(currentLevel);
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
                    العب الحرف مرة أخرى
                  </button>

                  {currentIndex < LETTERS_DATA.length - 1 ? (
                    <button
                      onClick={() => {
                        playLetterSound("click");
                        setCurrentIndex((i) => i + 1);
                      }}
                      style={{
                        padding: "11px 28px",
                        borderRadius: 16,
                        border: "none",
                        background: "linear-gradient(135deg, #9333EA, #EC4899)",
                        color: "#FFF",
                        fontWeight: 900,
                        fontSize: 16,
                        cursor: "pointer",
                        boxShadow: "0 8px 18px rgba(147,51,234,0.4)",
                      }}
                    >
                      الحرف التالي ({LETTERS_DATA[currentIndex + 1].letter} - {LETTERS_DATA[currentIndex + 1].name}) ⬅
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        playLetterSound("fanfare");
                        onCompleteIsland("letters");
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
          /* ── ARCADE MODE: CATCH THE LETTER BALLOON ── */
          <div style={{ width: "100%", maxWidth: 960, display: "flex", flexDirection: "column", gap: 14 }}>
            <div
              style={{
                background: "rgba(255,255,255,0.95)",
                borderRadius: 24,
                padding: "14px 20px",
                border: "3px solid #F59E0B",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: 10,
                boxShadow: "0 10px 24px rgba(245,158,11,0.22)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div
                  onClick={() => speakArabicLetter(`حرف ${arcadeTarget.name}`)}
                  style={{
                    width: 62,
                    height: 62,
                    borderRadius: 18,
                    background: `linear-gradient(135deg, ${arcadeTarget.primaryColor}, ${arcadeTarget.secondaryColor})`,
                    color: "#FFF",
                    fontSize: 36,
                    fontWeight: 900,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                  }}
                >
                  {arcadeTarget.letter}
                </div>
                <div>
                  <div style={{ fontSize: 20, fontWeight: 900, color: "#9A3412" }}>
                    اصطد بالون حرف: {arcadeTarget.name} ({arcadeTarget.letter}) {arcadeTarget.icon}
                  </div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: "#64748B" }}>
                    {arcadeFeedback || "اضغط بسرعة على البالون الذي يحمل الحرف المطلوب!"}
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
                background: "linear-gradient(180deg, #EC4899 0%, #8B5CF6 50%, #38BDF8 100%)",
                border: "4px solid #FFFFFF",
                boxShadow: "0 16px 36px rgba(236,72,153,0.28)",
                overflow: "hidden",
              }}
            >
              {arcadeBalloons.map((b) =>
                b.popped ? null : (
                  <button
                    key={b.uid}
                    className="let-balloon-btn"
                    onClick={() => handleArcadeTap(b)}
                    style={{
                      position: "absolute",
                      left: `${b.xPercent}%`,
                      top: `${b.yPercent}%`,
                      background: "none",
                      border: "none",
                      padding: 0,
                      cursor: "pointer",
                      animation: b.wrongShake
                        ? "letterShake 0.4s ease"
                        : `letterBalloonBob ${b.duration}s ease-in-out ${b.delay}s infinite`,
                      touchAction: "manipulation",
                    }}
                  >
                    <GlossyLetterBalloon color={BUBBLE_PALETTE[b.colorIndex]} letter={b.letter} size={90} />
                  </button>
                )
              )}
            </div>
          </div>
        )}
      </main>

      {/* ── Bottom Scrollable 28 Arabic Letters Stepper ── */}
      {gameMode === "learn" && (
        <footer
          style={{
            background: "rgba(255,255,255,0.94)",
            backdropFilter: "blur(10px)",
            borderTop: "3px solid #FFFFFF",
            padding: "10px 14px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 30,
          }}
        >
          <div
            className="let-scroll"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              overflowX: "auto",
              paddingBottom: 4,
              maxWidth: "100%",
            }}
          >
            {LETTERS_DATA.map((item, idx) => {
              const isActive = idx === currentIndex;
              const isSolved = completedIds.includes(item.id);
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    playLetterSound("click");
                    setCurrentIndex(idx);
                  }}
                  style={{
                    minWidth: 48,
                    height: 48,
                    borderRadius: 15,
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
                  {item.letter}
                  {isSolved && (
                    <span
                      style={{
                        position: "absolute",
                        top: -5,
                        right: -5,
                        width: 17,
                        height: 17,
                        borderRadius: "50%",
                        background: "#FACC15",
                        color: "#78350F",
                        fontSize: 10,
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
        </footer>
      )}
    </div>
  );
}
