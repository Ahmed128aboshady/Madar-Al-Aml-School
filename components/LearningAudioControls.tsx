"use client";
import { useEffect } from "react";
import Icon from "./LearningIcon";
import { stopLearningAudio, useLearningAudio } from "@/lib/learning-audio";
export default function LearningAudioControls() {
  const audio = useLearningAudio();
  useEffect(() => stopLearningAudio, []);
  return (
    <div className="game-audio-controls">
      <button
        className="icon-button"
        onClick={audio.toggle}
        aria-label={audio.enabled ? "إيقاف الصوت" : "تشغيل الصوت"}
        aria-pressed={audio.enabled}
      >
        <Icon name={audio.enabled ? "sound" : "muted"} />
      </button>
      {audio.message && (
        <p className="audio-message" role="status">
          {audio.message}
        </p>
      )}
    </div>
  );
}
