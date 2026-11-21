"use client";
import { useEffect, useSyncExternalStore } from "react";
import narration from "@/public/audio/narration.json";

type AudioState = { enabled: boolean; speaking: boolean; message: string };
const initial: AudioState = { enabled: true, speaking: false, message: "" };
let state = initial;
const listeners = new Set<() => void>();
let active: SpeechSynthesisUtterance | null = null;
let watchdog: ReturnType<typeof setTimeout> | undefined;
let generation = 0;
let recording: HTMLAudioElement | null = null;
const normalize = (text: string) =>
  text
    .toLowerCase()
    .replace(/[\u064B-\u065F\u0670]/g, "")
    .replace(/[^a-z\u0621-\u064A0-9]+/g, " ")
    .trim();
const recordings = new Map(
  narration.clips.flatMap((clip) =>
    [clip.text, ...clip.aliases].map(
      (text) => [normalize(text), "/audio/" + clip.file] as const,
    ),
  ),
);
const subscribe = (listener: () => void) => {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
};
function update(patch: Partial<AudioState>) {
  state = { ...state, ...patch };
  listeners.forEach((fn) => fn());
}
export function stopLearningAudio() {
  generation++;
  clearTimeout(watchdog);
  if (typeof window !== "undefined" && "speechSynthesis" in window)
    window.speechSynthesis.cancel();
  active = null;
  if (recording) {
    recording.pause();
    recording.currentTime = 0;
    recording = null;
  }
  update({ speaking: false });
}
export function isLearningSoundEnabled() {
  return state.enabled;
}
export function setLearningSound(enabled: boolean) {
  if (!enabled) stopLearningAudio();
  update({ enabled, message: "" });
  try {
    localStorage.setItem("madar_sound_enabled", String(enabled));
  } catch {
    /* Storage is optional. */
  }
}
export function speakLearningText(text: string, lang = "ar-SA") {
  stopLearningAudio();
  if (!state.enabled) return;
  const source = recordings.get(normalize(text));
  if (source && typeof window !== "undefined") {
    const token = generation;
    const player = new Audio(source);
    recording = player;
    player.preload = "auto";
    player.onplaying = () => {
      if (token === generation) update({ speaking: true, message: "" });
    };
    player.onended = () => {
      if (token === generation) {
        recording = null;
        update({ speaking: false });
      }
    };
    update({ message: "" });
    void player.play().catch(() => {
      if (token !== generation) return;
      recording = null;
      update({
        speaking: false,
        message: "تعذّر تشغيل الصوت. اضغط «اسمع الحرف» للمحاولة مرة أخرى.",
      });
    });
    return;
  }
  if (typeof window === "undefined" || !("speechSynthesis" in window)) {
    update({
      message: "النطق غير متاح في هذا المتصفح. جرّب متصفحًا يدعم الصوت.",
    });
    return;
  }
  const synth = window.speechSynthesis;
  const voices = synth.getVoices();
  const voice =
    voices.find((v) => v.lang.toLowerCase() === lang.toLowerCase()) ||
    voices.find((v) => v.lang.toLowerCase().startsWith(lang.slice(0, 2)));
  if (voices.length && !voice) {
    update({
      message: lang.startsWith("ar")
        ? "لتشغيل النطق، أضف صوتًا عربيًا من إعدادات الكلام في جهازك ثم أعد المحاولة."
        : "أضف صوتًا إنجليزيًا من إعدادات الكلام في جهازك ثم أعد المحاولة.",
    });
    return;
  }
  const token = generation;
  const utterance = new SpeechSynthesisUtterance(text);
  active = utterance; // Keep the utterance alive until completion on mobile browsers.
  utterance.lang = lang;
  if (voice) utterance.voice = voice;
  utterance.rate = 0.8;
  utterance.pitch = 1;
  utterance.onstart = () => {
    if (token === generation) {
      clearTimeout(watchdog);
      update({ speaking: true, message: "" });
    }
  };
  utterance.onend = () => {
    if (token === generation) {
      clearTimeout(watchdog);
      active = null;
      update({ speaking: false });
    }
  };
  utterance.onerror = (event) => {
    if (
      token !== generation ||
      event.error === "interrupted" ||
      event.error === "canceled"
    )
      return;
    clearTimeout(watchdog);
    active = null;
    update({
      speaking: false,
      message:
        "تعذّر تشغيل النطق. اضغط «اسمع الحرف» للمحاولة مرة أخرى وتأكد من توفر صوت اللغة على جهازك.",
    });
  };
  update({ message: "" });
  try {
    synth.resume();
    synth.speak(active);
    watchdog = setTimeout(() => {
      if (token === generation && !synth.speaking)
        update({ message: "اضغط زر الاستماع لتشغيل النطق على جهازك." });
    }, 2500);
  } catch {
    update({
      speaking: false,
      message: "تعذّر تشغيل الصوت. أعد المحاولة من زر الاستماع.",
    });
  }
}
export function useLearningAudio() {
  const snapshot = useSyncExternalStore(
    subscribe,
    () => state,
    () => initial,
  );
  useEffect(() => {
    try {
      const saved = localStorage.getItem("madar_sound_enabled");
      if (saved !== null) update({ enabled: saved !== "false" });
    } catch {
      /* Storage is optional. */
    }
    if (!("speechSynthesis" in window)) return;
    const warmVoices = () => {
      window.speechSynthesis.getVoices();
    };
    warmVoices();
    window.speechSynthesis.addEventListener("voiceschanged", warmVoices);
    const onVisibility = () => {
      if (document.hidden) stopLearningAudio();
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      window.speechSynthesis.removeEventListener("voiceschanged", warmVoices);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);
  return {
    ...snapshot,
    toggle: () => setLearningSound(!state.enabled),
    speak: speakLearningText,
    stop: stopLearningAudio,
  };
}
