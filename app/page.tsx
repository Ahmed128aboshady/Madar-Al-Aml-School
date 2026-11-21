"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { User } from "@supabase/supabase-js";
import NumbersIslandAdventure from "@/components/NumbersIslandAdventure";
import ArabicLetterLesson from "@/components/ArabicLetterLesson";
import EnglishColoringIsland from "@/components/EnglishColoringIsland";
import Icon from "@/components/LearningIcon";
import { useLearningAudio } from "@/lib/learning-audio";
import {
  readProgress,
  saveProgress,
  validProgress,
  TOTALS,
  type LearningIsland,
} from "@/lib/learning-progress";

const islands: {
  id: LearningIsland;
  title: string;
  subtitle: string;
  image: string;
  badge: string;
}[] = [
  {
    id: "letters",
    title: "الحروف العربية",
    subtitle: "نسمع، نتعلم، ونلعب",
    image: "letters",
    badge: "أ — ي",
  },
  {
    id: "numbers",
    title: "عالم الأرقام",
    subtitle: "نعدّ ونكتشف معًا",
    image: "numbers",
    badge: "١ — ١٠",
  },
  {
    id: "english",
    title: "الحروف الإنجليزية",
    subtitle: "حروف وألوان وحكايات",
    image: "english",
    badge: "A — Z",
  },
];
type Progress = Record<LearningIsland, string[]>;
const emptyProgress: Progress = { letters: [], numbers: [], english: [] };

export default function HomePage() {
  const [activeIsland, setActiveIsland] = useState<LearningIsland | null>(null);
  const [tab, setTab] = useState<"home" | "progress">("home");
  const [progress, setProgress] = useState<Progress>(emptyProgress);
  const [childName, setChildName] = useState("");
  const [parentName, setParentName] = useState("");
  const [parentPhone, setParentPhone] = useState("");
  const [parentCity, setParentCity] = useState("");
  const [user, setUser] = useState<User | null>(null);
  const [lastIsland, setLastIsland] = useState<LearningIsland>("letters");
  const [profileStatus, setProfileStatus] = useState("");
  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState("");
  const profileRef = useRef<HTMLDialogElement>(null);
  const audio = useLearningAudio();
  const router = useRouter();
  const total = Object.values(progress).reduce(
    (sum, ids) => sum + ids.length,
    0,
  );

  useEffect(() => {
    let disposed = false;
    const local: Progress = {
      letters: readProgress("letters"),
      numbers: readProgress("numbers"),
      english: readProgress("english"),
    };
    // Hydrate browser-only progress after the server-rendered shell mounts.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setProgress(local);
    try {
      setChildName(localStorage.getItem("madar_child_name") || "");
      setParentName(localStorage.getItem("madar_parent_name") || "");
      setParentPhone(localStorage.getItem("madar_parent_phone") || "");
      setParentCity(localStorage.getItem("madar_parent_city") || "");
      const recent = localStorage.getItem("madar_last_island");
      if (recent === "letters" || recent === "numbers" || recent === "english")
        setLastIsland(recent);
      if (localStorage.getItem("madar_guest_mode") === "true") return;
    } catch {
      /* Browsing without local storage is supported. */
    }
    void import("@/lib/supabase")
      .then(async ({ supabase }) => {
        const { data } = await supabase.auth.getUser();
        if (disposed || !data.user) return;
        setUser(data.user);
        const meta = data.user.user_metadata;
        setChildName(meta.child_name || "");
        setParentName(meta.parent_name || "");
        setParentPhone(meta.parent_phone || meta.phone || "");
        setParentCity(meta.parent_city || "");
        setProgress((current) => {
          const merged = { ...current };
          for (const kind of ["letters", "numbers", "english"] as const) {
            merged[kind] = validProgress(kind, [
              ...current[kind],
              ...validProgress(kind, meta[kind + "_completed_ids"]),
            ]);
            saveProgress(kind, merged[kind]);
          }
          return merged;
        });
      })
      .catch(() => {
        /* Guest learning remains available. */
      });
    return () => {
      disposed = true;
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = activeIsland ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [activeIsland]);

  function openIsland(id: LearningIsland) {
    audio.stop();
    setLastIsland(id);
    try {
      localStorage.setItem("madar_last_island", id);
    } catch {
      /* Optional preference. */
    }
    if (id === "letters") audio.speak("حَرْفُ أَلِف. أَلِف مِثْل أَسَد.");
    if (id === "english") audio.speak("A. A is for Apple.", "en-US");
    setActiveIsland(id);
  }
  async function syncProgress(next: Progress) {
    if (!user) return;
    try {
      const { supabase } = await import("@/lib/supabase");
      const { error } = await supabase.auth.updateUser({
        data: {
          letters_completed_ids: next.letters,
          numbers_completed_ids: next.numbers,
          english_completed_ids: next.english,
          numbers_progress_count: next.numbers.length,
        },
      });
      if (error)
        setNotice("تقدمك محفوظ على هذا الجهاز. تعذّرت مزامنته مع الحساب الآن.");
    } catch {
      setNotice("تقدمك محفوظ على هذا الجهاز. تعذّرت مزامنته مع الحساب الآن.");
    }
  }
  function backHome() {
    audio.stop();
    const next = {
      letters: readProgress("letters"),
      numbers: readProgress("numbers"),
      english: readProgress("english"),
    };
    setProgress(next);
    setActiveIsland(null);
    void syncProgress(next);
  }
  function completeIsland() {
    backHome();
    setTab("progress");
    setNotice("أحسنت يا بطل! كل خطوة صغيرة إنجاز يستحق الاحتفال.");
  }
  async function saveProfile(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setProfileStatus("");
    let localSaved = true;
    try {
      localStorage.setItem("madar_child_name", childName.trim());
      localStorage.setItem("madar_parent_name", parentName.trim());
      localStorage.setItem("madar_parent_phone", parentPhone.trim());
      localStorage.setItem("madar_parent_city", parentCity.trim());
    } catch {
      localSaved = false;
    }
    if (user) {
      try {
        const { supabase } = await import("@/lib/supabase");
        const { error } = await supabase.auth.updateUser({
          data: {
            child_name: childName.trim(),
            parent_name: parentName.trim(),
            parent_phone: parentPhone.trim(),
            parent_city: parentCity.trim(),
          },
        });
        if (error) throw error;
        setProfileStatus("تم حفظ البيانات بنجاح.");
      } catch {
        setProfileStatus(
          localSaved
            ? "تم الحفظ على هذا الجهاز. تعذّرت مزامنة الحساب الآن."
            : "تعذّر الحفظ. حاول مرة أخرى.",
        );
      }
    } else
      setProfileStatus(
        localSaved
          ? "تم حفظ البيانات على هذا الجهاز."
          : "تعذّر الحفظ. تحقق من إعدادات التخزين في المتصفح.",
      );
    setSaving(false);
  }
  async function signOut() {
    try {
      if (user) {
        const { supabase } = await import("@/lib/supabase");
        const { error } = await supabase.auth.signOut();
        if (error) throw error;
      }
      localStorage.removeItem("madar_guest_mode");
      router.push("/login");
    } catch {
      setProfileStatus("تعذّر تسجيل الخروج الآن. حاول مرة أخرى.");
    }
  }

  return (
    <div className="learning-app">
      <div
        inert={activeIsland !== null}
        aria-hidden={activeIsland !== null ? true : undefined}
      >
        <header className="app-header">
          <Link href="/" className="brand" aria-label="العب واتعلم، الرئيسية">
            <Image
              src="/logo.png"
              alt="العب واتعلم"
              width={64}
              height={64}
              priority
              style={{ objectFit: "contain" }}
            />
            <span>العب واتعلم</span>
          </Link>
          <div className="header-actions">
            <button
              className="icon-button"
              onClick={audio.toggle}
              aria-label={audio.enabled ? "إيقاف الصوت" : "تشغيل الصوت"}
              aria-pressed={audio.enabled}
            >
              <Icon name={audio.enabled ? "sound" : "muted"} />
            </button>
            <button
              className="parent-button"
              onClick={() => profileRef.current?.showModal()}
            >
              <Icon name="user" />
              <span>ولي الأمر</span>
            </button>
          </div>
        </header>
        <main className="home-content" id="main-content">
          <div className="greeting">
            <span className="eyebrow">مساحة للتعلم بطريقتك</span>
            <h1>
              أهلًا{" "}
              {childName && childName !== "بطل مدار الأمل"
                ? childName
                : "يا بطل"}
              <span className="greeting-spark" aria-hidden="true">
                ✦
              </span>
            </h1>
            <p>كل يوم، نكتشف حاجة جديدة مع بعض.</p>
          </div>
          {notice && (
            <div className="notice" role="status">
              {notice}
              <button
                className="icon-button"
                aria-label="إغلاق التنبيه"
                onClick={() => setNotice("")}
              >
                <Icon name="close" size={18} />
              </button>
            </div>
          )}
          {tab === "home" ? (
            <>
              <section className="journey-hero" aria-labelledby="journey-title">
                <div className="hero-copy">
                  <span className="hero-label">
                    <span /> مغامرة على قدّ خطواتك
                  </span>
                  <h2 id="journey-title">
                    عالم صغير،
                    <br />
                    <span>اكتشافات كبيرة!</span>
                  </h2>
                  <p>
                    نسمع الحروف، نلعب بالأرقام،
                    <br className="desktop-break" /> ونلوّن رحلتنا بالأمل.
                  </p>
                  <button
                    className="primary-button"
                    onClick={() => openIsland(lastIsland)}
                  >
                    {total
                      ? "نكمل رحلتنا"
                      : lastIsland === "letters"
                        ? "هيا نبدأ بالحروف"
                        : "هيا نكمل الاكتشاف"}
                    <Icon name="arrow" size={20} />
                  </button>
                </div>
                <div className="hero-art" aria-hidden="true">
                  <div className="hero-orbit" />
                  <Image
                    src="/islands/island-letters.png"
                    alt=""
                    fill
                    sizes="(max-width: 600px) 44vw, 430px"
                    priority
                  />
                  <span className="floating-letter letter-one">أ</span>
                  <span className="floating-letter letter-two">ب</span>
                  <span className="art-spark spark-one">✦</span>
                  <span className="art-spark spark-two">✦</span>
                </div>
              </section>
              <div className="daily-note">
                <span className="note-icon">
                  <Icon name="leaf" />
                </span>
                <div>
                  <strong>خطوة صغيرة تصنع فرقًا</strong>
                  <p>خذ وقتك. نقدر نسمع الحرف ونجرّب أكتر من مرة.</p>
                </div>
                <span className="note-stars" aria-hidden="true">
                  ✦
                </span>
              </div>
              <section aria-labelledby="islands-title">
                <div className="section-heading">
                  <div>
                    <span className="eyebrow">نتعلم باللعب</span>
                    <h2 id="islands-title">اختار جزيرتك</h2>
                  </div>
                  <span className="section-count">٣ عوالم للاستكشاف</span>
                </div>
                <div className="islands-grid">
                  {islands.map((island) => (
                    <button
                      key={island.id}
                      className={"learning-island " + island.id}
                      onClick={() => openIsland(island.id)}
                    >
                      <div className="island-art">
                        <span className="island-badge">{island.badge}</span>
                        <Image
                          src={"/islands/island-" + island.image + ".png"}
                          alt=""
                          fill
                          sizes="(max-width: 600px) 45vw, 320px"
                        />
                      </div>
                      <div className="island-copy">
                        <h3>{island.title}</h3>
                        <p>{island.subtitle}</p>
                        <div className="island-bottom">
                          <span>
                            {progress[island.id].length} من {TOTALS[island.id]}{" "}
                            {island.id === "numbers" ? "رقم" : "حرف"}
                          </span>
                          <span className="card-arrow">
                            <Icon name="arrow" size={18} />
                          </span>
                        </div>
                        <progress
                          value={progress[island.id].length}
                          max={TOTALS[island.id]}
                          aria-label={"تقدم " + island.title}
                        />
                      </div>
                    </button>
                  ))}
                </div>
              </section>
              <section className="coming-soon" aria-label="مغامرات قادمة">
                <div>
                  <Icon name="book" />
                  <strong>مغامرات جديدة في الطريق</strong>
                </div>
                <p>
                  الأفعال اليومية والمواصلات <span>قريبًا</span>
                </p>
              </section>
            </>
          ) : (
            <section className="progress-page" aria-labelledby="progress-title">
              <div className="progress-celebration">
                <span className="achievement-icon">
                  <Icon name="star" size={36} />
                </span>
                <span className="eyebrow">كل محاولة تستحق التشجيع</span>
                <h2 id="progress-title">رحلتك مليانة إنجازات</h2>
                <p>
                  اتعلمت <strong>{total}</strong> من ٦٤ حرف ورقم. نكمل مع بعض؟
                </p>
              </div>
              <div className="progress-list">
                {islands.map((island) => (
                  <div className={"progress-item " + island.id} key={island.id}>
                    <Image
                      src={"/islands/island-" + island.image + ".png"}
                      alt=""
                      width={90}
                      height={80}
                    />
                    <div>
                      <h3>{island.title}</h3>
                      <p>
                        {progress[island.id].length} من {TOTALS[island.id]}{" "}
                        مكتمل
                      </p>
                      <progress
                        value={progress[island.id].length}
                        max={TOTALS[island.id]}
                        aria-label={"تقدم " + island.title}
                      />
                    </div>
                    <button
                      className="icon-button"
                      aria-label={"أكمل " + island.title}
                      onClick={() => openIsland(island.id)}
                    >
                      <Icon name="arrow" />
                    </button>
                  </div>
                ))}
              </div>
              <p className="storage-note">
                {user
                  ? "تقدمك محفوظ على جهازك وتتم مزامنته مع حسابك عند العودة من النشاط."
                  : "تقدمك محفوظ على هذا الجهاز. لا تحتاج حسابًا لتبدأ."}
              </p>
            </section>
          )}
        </main>
        <nav className="bottom-nav" aria-label="التنقل الرئيسي">
          <button
            aria-current={tab === "home" ? "page" : undefined}
            onClick={() => {
              setTab("home");
              window.scrollTo({ top: 0 });
            }}
          >
            <Icon name="home" />
            <span>جزري</span>
          </button>
          <button
            aria-current={tab === "progress" ? "page" : undefined}
            onClick={() => {
              setTab("progress");
              window.scrollTo({ top: 0 });
            }}
          >
            <Icon name="star" />
            <span>إنجازاتي</span>
            {total > 0 && <span className="nav-count">{total}</span>}
          </button>
          <button onClick={() => profileRef.current?.showModal()}>
            <Icon name="user" />
            <span>حسابي</span>
          </button>
        </nav>
        <dialog
          ref={profileRef}
          className="profile-dialog"
          aria-labelledby="profile-title"
          onClick={(event) => {
            if (event.target === event.currentTarget)
              profileRef.current?.close();
          }}
        >
          <div className="dialog-heading">
            <div>
              <span className="eyebrow">مساحة ولي الأمر</span>
              <h2 id="profile-title">نتعلم سوا</h2>
            </div>
            <button
              className="icon-button"
              onClick={() => profileRef.current?.close()}
              aria-label="إغلاق الحساب"
            >
              <Icon name="close" />
            </button>
          </div>
          <p className="muted-copy">
            {user
              ? "عدّل بياناتك وتابع رحلة طفلك."
              : "أضف اسم طفلك لتكون الرحلة أقرب له."}
          </p>
          <form onSubmit={saveProfile}>
            <label>
              اسم الطفل
              <input
                value={childName}
                onChange={(e) => setChildName(e.target.value)}
                maxLength={40}
                autoComplete="off"
                placeholder="بطلنا الصغير"
              />
            </label>
            <label>
              اسم ولي الأمر
              <input
                value={parentName}
                onChange={(e) => setParentName(e.target.value)}
                maxLength={80}
                autoComplete="name"
              />
            </label>
            <div className="form-row">
              <label>
                رقم الهاتف
                <input
                  type="tel"
                  value={parentPhone}
                  onChange={(e) => setParentPhone(e.target.value)}
                  maxLength={24}
                  autoComplete="tel"
                />
              </label>
              <label>
                المدينة
                <input
                  value={parentCity}
                  onChange={(e) => setParentCity(e.target.value)}
                  maxLength={80}
                  autoComplete="address-level2"
                />
              </label>
            </div>
            <button className="primary-button" disabled={saving}>
              {saving ? "جارٍ الحفظ…" : "حفظ البيانات"}
              <Icon name="check" />
            </button>
            <p role="status" className="form-status">
              {profileStatus}
            </p>
          </form>
          <button className="text-button" onClick={signOut}>
            {user ? "تسجيل الخروج" : "الانتقال لتسجيل الدخول"}
          </button>
        </dialog>
      </div>
      {activeIsland === "letters" && (
        <ArabicLetterLesson onBack={backHome} onComplete={completeIsland} />
      )}
      {activeIsland === "numbers" && (
        <NumbersIslandAdventure
          onBackToMap={backHome}
          onCompleteIsland={completeIsland}
          onProgressUpdate={(_count, _total, ids) => {
            if (ids) {
              saveProgress("numbers", ids);
              setProgress((current) => ({
                ...current,
                numbers: validProgress("numbers", ids),
              }));
            }
          }}
        />
      )}
      {activeIsland === "english" && (
        <EnglishColoringIsland
          onBackToMap={backHome}
          onCompleteIsland={completeIsland}
        />
      )}
    </div>
  );
}
