"use client";
import { useEffect, useRef, useState } from "react";
import LettersIslandAdventure, { LETTERS_DATA } from "./LettersIslandAdventure";
import Icon from "./LearningIcon";
import {
  useLearningAudio,
  setLearningSound,
  stopLearningAudio,
} from "@/lib/learning-audio";
import { readProgress, saveProgress } from "@/lib/learning-progress";

export default function ArabicLetterLesson({
  onBack,
  onComplete,
}: {
  onBack: () => void;
  onComplete: () => void;
}) {
  const [index, setIndex] = useState(0);
  const [completed, setCompleted] = useState<string[]>(() =>
    readProgress("letters"),
  );
  const [step, setStep] = useState<"learn" | "quiz" | "solved">("learn");
  const [feedback, setFeedback] = useState("");
  const [game, setGame] = useState(false);
  const strip = useRef<HTMLDivElement>(null);
  const heading = useRef<HTMLHeadingElement>(null);
  const audio = useLearningAudio();
  const letter = LETTERS_DATA[index];
  useEffect(() => {
    heading.current?.focus();
    return stopLearningAudio;
  }, []);
  useEffect(() => {
    strip.current
      ?.querySelector('[aria-current="step"]')
      ?.scrollIntoView({
        block: "nearest",
        inline: "center",
        behavior: "smooth",
      });
  }, [index]);
  function pronounce(next = letter) {
    audio.speak(
      "حَرْفُ " + next.name + ". " + next.name + " مِثْل " + next.word + ".",
    );
  }
  function selectLetter(next: number) {
    if (next < 0 || next >= LETTERS_DATA.length) return;
    setIndex(next);
    setStep("learn");
    setFeedback("");
    pronounce(LETTERS_DATA[next]);
  }
  function choose(correct: boolean) {
    if (step === "solved") return;
    if (!correct) {
      setFeedback("حاول مرة تانية. اسمع الحرف وفكّر بهدوء.");
      pronounce();
      return;
    }
    const next = [...new Set([...completed, letter.id])];
    setCompleted(next);
    saveProgress("letters", next);
    setStep("solved");
    setFeedback("أحسنت! " + letter.name + " مثل " + letter.word + ".");
    audio.speak("أَحْسَنْت! " + letter.name + " مِثْل " + letter.word);
  }
  if (game)
    return (
      <LettersIslandAdventure
        onBackToMap={() => {
          audio.stop();
          setCompleted(readProgress("letters"));
          setGame(false);
        }}
        onCompleteIsland={onComplete}
        onProgressUpdate={(_count, _total, ids) => {
          if (ids) {
            saveProgress("letters", ids);
            setCompleted(ids);
          }
        }}
      />
    );
  return (
    <section
      className="letter-lesson activity-shell"
      aria-labelledby="lesson-title"
    >
      <header className="lesson-header">
        <button
          className="icon-button"
          onClick={onBack}
          aria-label="العودة إلى الجزر"
        >
          <Icon name="back" />
        </button>
        <div>
          <span className="eyebrow">جزيرة الحروف</span>
          <h1 id="lesson-title" tabIndex={-1} ref={heading}>
            نكتشف حرف {letter.name}
          </h1>
        </div>
        <button
          className="icon-button"
          onClick={audio.toggle}
          aria-label={audio.enabled ? "إيقاف الصوت" : "تشغيل الصوت"}
          aria-pressed={audio.enabled}
        >
          <Icon name={audio.enabled ? "sound" : "muted"} />
        </button>
      </header>
      <main className="lesson-content">
        <div className="lesson-meta">
          <span>حرف {index + 1} من ٢٨</span>
          <span>
            <Icon name="star" size={17} />
            {completed.length} حرف مكتمل
          </span>
        </div>
        <progress
          className="lesson-progress"
          value={completed.length}
          max={28}
          aria-label="تقدم الحروف العربية"
        />
        <div className="lesson-tabs" aria-label="خطوات التعلم">
          <button
            aria-pressed={step === "learn"}
            onClick={() => {
              setStep("learn");
              setFeedback("");
            }}
          >
            <span>١</span> اسمع واتعلم
          </button>
          <button
            aria-pressed={step !== "learn"}
            onClick={() => {
              setStep("quiz");
              setFeedback("");
            }}
          >
            <span>٢</span> جرّب بنفسك
          </button>
        </div>
        {step === "learn" ? (
          <>
            <div className="letter-display">
              <span className="letter-decoration" aria-hidden="true">
                ✦
              </span>
              <div className="letter-glyph" aria-label={"حرف " + letter.name}>
                {letter.letter}
              </div>
              <span className="letter-name">حرف {letter.name}</span>
              <button
                className={
                  "listen-button" + (audio.speaking ? " is-speaking" : "")
                }
                onClick={() => {
                  if (!audio.enabled) setLearningSound(true);
                  pronounce();
                }}
              >
                <Icon name="sound" />
                {audio.speaking ? "بنسمع الحرف…" : "اسمع الحرف"}
                <span className="sound-bars" aria-hidden="true">
                  <i />
                  <i />
                  <i />
                </span>
              </button>
            </div>
            <div className="word-example">
              <span
                className="word-picture"
                role="img"
                aria-label={letter.word}
              >
                {letter.icon}
              </span>
              <div>
                <span className="eyebrow">{letter.name} مثل</span>
                <h2>{letter.word}</h2>
                <p>{letter.chant}</p>
              </div>
              <button
                className="icon-button"
                onClick={() => {
                  if (!audio.enabled) setLearningSound(true);
                  audio.speak(letter.word);
                }}
                aria-label={"اسمع كلمة " + letter.word}
              >
                <Icon name="sound" />
              </button>
            </div>
            <button
              className="primary-button practice-button"
              onClick={() => {
                setStep("quiz");
                setFeedback("");
                audio.speak("اختر الكلمة التي تبدأ بحرف " + letter.name);
              }}
            >
              يلا نجرّب سوا
              <Icon name="arrow" />
            </button>
          </>
        ) : (
          <div className="letter-quiz">
            <span className="quiz-letter">{letter.letter}</span>
            <h2>إيه الكلمة اللي بتبدأ بحرف {letter.name}؟</h2>
            <button
              className="text-button"
              onClick={() => {
                if (!audio.enabled) setLearningSound(true);
                pronounce();
              }}
            >
              <Icon name="sound" size={18} /> اسمع الحرف تاني
            </button>
            <div className="word-choices">
              {letter.wordOptions.map((option) => (
                <button
                  key={option.word}
                  disabled={step === "solved"}
                  className={
                    step === "solved" && option.isCorrect
                      ? "correct-choice"
                      : ""
                  }
                  onClick={() => choose(option.isCorrect)}
                >
                  <span role="img" aria-label={option.word}>
                    {option.icon}
                  </span>
                  <strong>{option.word}</strong>
                  {step === "solved" && option.isCorrect && (
                    <Icon name="check" />
                  )}
                </button>
              ))}
            </div>
            <p
              role="status"
              className={
                "quiz-feedback " + (step === "solved" ? "success" : "")
              }
            >
              {feedback || "خد وقتك، مفيش استعجال."}
            </p>
            {step === "solved" &&
              (completed.length === 28 ? (
                <button className="primary-button" onClick={onComplete}>
                  أكملت كل الحروف!
                  <Icon name="star" />
                </button>
              ) : (
                <button
                  className="primary-button"
                  onClick={() =>
                    selectLetter(
                      index < 27
                        ? index + 1
                        : LETTERS_DATA.findIndex(
                            (item) => !completed.includes(item.id),
                          ),
                    )
                  }
                >
                  نكمل للحرف التالي
                  <Icon name="arrow" />
                </button>
              ))}
          </div>
        )}
        {audio.message && (
          <p className="audio-message" role="status">
            {audio.message}
          </p>
        )}
        <div className="letter-pagination">
          <button
            onClick={() => selectLetter(index - 1)}
            disabled={index === 0}
          >
            <Icon name="back" size={18} /> السابق
          </button>
          <button
            className="game-link"
            onClick={() => {
              pronounce();
              setGame(true);
            }}
          >
            <Icon name="play" size={17} /> لعبة الحروف
          </button>
          <button
            onClick={() => selectLetter(index + 1)}
            disabled={index === 27}
          >
            التالي
            <Icon name="arrow" size={18} />
          </button>
        </div>
      </main>
      <footer className="letter-picker">
        <div className="picker-heading">
          <span>اختار أي حرف تسمعه</span>
          <span>أ — ي</span>
        </div>
        <div className="letter-strip" ref={strip}>
          {LETTERS_DATA.map((item, i) => (
            <button
              key={item.id}
              aria-label={
                "حرف " +
                item.name +
                (completed.includes(item.id) ? "، مكتمل" : "")
              }
              aria-current={index === i ? "step" : undefined}
              onClick={() => selectLetter(i)}
            >
              {item.letter}
              {completed.includes(item.id) && (
                <span className="letter-complete" aria-hidden="true">
                  ✓
                </span>
              )}
            </button>
          ))}
        </div>
      </footer>
    </section>
  );
}
