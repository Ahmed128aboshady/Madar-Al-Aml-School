"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import AnimalsIslandAdventure from "@/components/AnimalsIslandAdventure";

interface IslandZone {
  id: string;
  title: string;
  description: string;
  themeColor: string;
  imageSrc: string;
  // Desktop coordinates
  desktopTop: string;
  desktopLeft: string;
  desktopWidth: string;
  desktopHeight: string;
  // Tablet coordinates
  tabletTop: string;
  tabletLeft: string;
  tabletWidth: string;
  tabletHeight: string;
  // Mobile coordinates
  mobileTop: string;
  mobileLeft: string;
  mobileWidth: string;
  mobileHeight: string;
}

const ISLAND_ZONES: IslandZone[] = [
  {
    id: "animals",
    title: "تعرف على الحيوانات",
    description: "مرحباً بك في جزيرة الأسد والأصدقاء! سنكتشف سوياً أصوات الحيوانات وأشكالها الجميلة بطريقة سهلة وممتعة.",
    themeColor: "#E07820",
    imageSrc: "/islands/island-animals.png",
    desktopTop: "17%",
    desktopLeft: "12%",
    desktopWidth: "26%",
    desktopHeight: "36%",
    tabletTop: "17%",
    tabletLeft: "10%",
    tabletWidth: "30%",
    tabletHeight: "33%",
    mobileTop: "20%",
    mobileLeft: "4%",
    mobileWidth: "44%",
    mobileHeight: "20%",
  },
  {
    id: "vegetables",
    title: "تعرف على الخضار",
    description: "جزيرة الخضار الطازجة! سنلعب مع الجزر والبروكلي اللطيف ونتعلم ألوانها وأهميتها لأجسامنا القوية.",
    themeColor: "#2E7D32",
    imageSrc: "/islands/island-vegetables.png",
    desktopTop: "37%",
    desktopLeft: "35%",
    desktopWidth: "27%",
    desktopHeight: "38%",
    tabletTop: "38%",
    tabletLeft: "34%",
    tabletWidth: "32%",
    tabletHeight: "34%",
    mobileTop: "42%",
    mobileLeft: "27%",
    mobileWidth: "46%",
    mobileHeight: "21%",
  },
  {
    id: "fruits",
    title: "تعرف على الفواكه",
    description: "أهلاً بك في جزيرة الفواكه اللذيذة! هيا نتعرف على التفاح والموز والبرتقال وفوائدها لصحتنا وطاقتنا.",
    themeColor: "#D62246",
    imageSrc: "/islands/island-fruits.png",
    desktopTop: "22%",
    desktopLeft: "58%",
    desktopWidth: "26%",
    desktopHeight: "36%",
    tabletTop: "22%",
    tabletLeft: "58%",
    tabletWidth: "30%",
    tabletHeight: "33%",
    mobileTop: "20%",
    mobileLeft: "52%",
    mobileWidth: "44%",
    mobileHeight: "20%",
  },
  {
    id: "daily-actions",
    title: "تعرف على الأفعال اليومية",
    description: "جزيرة الأفعال اليومية مع النجمة اللامعة! نتعلم كيف ننظف أسناننا، نغسل أيدينا، ونرتب كتبنا وألعابنا.",
    themeColor: "#5B4FA8",
    imageSrc: "/islands/island-daily-actions.png",
    desktopTop: "58%",
    desktopLeft: "63%",
    desktopWidth: "28%",
    desktopHeight: "36%",
    tabletTop: "58%",
    tabletLeft: "63%",
    tabletWidth: "32%",
    tabletHeight: "33%",
    mobileTop: "65%",
    mobileLeft: "52%",
    mobileWidth: "44%",
    mobileHeight: "20%",
  },
  {
    id: "vehicles",
    title: "تعرف على المواصلات",
    description: "أهلاً بك في جزيرة السيارات والطائرات! هيا نقود السيارة ونحلق بالطائرة ونتعرف على وسائل النقل السريعة.",
    themeColor: "#0077B6",
    imageSrc: "/islands/island-vehicles.png",
    desktopTop: "56%",
    desktopLeft: "6%",
    desktopWidth: "28%",
    desktopHeight: "36%",
    tabletTop: "56%",
    tabletLeft: "5%",
    tabletWidth: "32%",
    tabletHeight: "33%",
    mobileTop: "65%",
    mobileLeft: "4%",
    mobileWidth: "44%",
    mobileHeight: "20%",
  },
];

interface PathSegment {
  fromId: string;
  toId: string;
  desktopD: string;
  tabletD: string;
  mobileD: string;
}

// خطوط ومسارات الخطوات بين كل جزيرة والتالية حسب الترتيب المحدد
const ISLAND_PATHS: PathSegment[] = [
  // 1. الحيوانات (أعلى اليسار) -> 2. الخضار (الوسط)
  {
    fromId: "animals",
    toId: "vegetables",
    desktopD: "M 25 46 Q 32 58 45 56",
    tabletD: "M 25 44 Q 33 58 45 56",
    mobileD: "M 26 38 Q 32 50 44 51",
  },
  // 2. الخضار (الوسط) -> 3. الفواكه (أعلى اليمين)
  {
    fromId: "vegetables",
    toId: "fruits",
    desktopD: "M 52 53 Q 63 50 68 44",
    tabletD: "M 53 53 Q 63 48 70 42",
    mobileD: "M 54 48 Q 67 44 70 38",
  },
  // 3. الفواكه (أعلى اليمين) -> 4. الأفعال اليومية (أسفل اليمين)
  {
    fromId: "fruits",
    toId: "daily-actions",
    desktopD: "M 71 47 Q 78 60 76 72",
    tabletD: "M 72 47 Q 80 62 78 72",
    mobileD: "M 74 38 Q 80 56 74 72",
  },
  // 4. الأفعال اليومية (أسفل اليمين) -> 5. المواصلات (أسفل اليسار)
  {
    fromId: "daily-actions",
    toId: "vehicles",
    desktopD: "M 70 78 Q 48 85 24 77",
    tabletD: "M 70 78 Q 48 85 24 76",
    mobileD: "M 66 77 Q 48 83 28 77",
  },
];

function getIslandStatus(zoneId: string, completed: string[], animalsProgressCount: number = 0) {
  const index = ISLAND_ZONES.findIndex((z) => z.id === zoneId);
  const isCompleted = completed.includes(zoneId);
  let isUnlocked = false;

  if (zoneId === "animals") {
    // 1. الجزيرة الأولى (الحيوانات) فقط هي المفتوحة
    isUnlocked = true;
  } else if (zoneId === "vegetables") {
    // 2. الجزيرة الثانية (الخضار) مقفلة تماماً وتفتح فقط عند حل 80% على الأقل من جزيرة الحيوانات (10 من 13)
    isUnlocked = animalsProgressCount >= 10;
  } else {
    // 3. الفواكه، 4. الأفعال، 5. المواصلات: مقفلة تماماً وتفتح بالتسلسل فقط بعد 80% من الحيوانات وإنهاء الجزيرة السابقة
    const prevZoneId = index > 0 ? ISLAND_ZONES[index - 1].id : null;
    isUnlocked = Boolean(animalsProgressCount >= 10 && prevZoneId && completed.includes(prevZoneId));
  }

  const previousZone = index > 0 ? ISLAND_ZONES[index - 1] : null;
  const nextZone = index < ISLAND_ZONES.length - 1 ? ISLAND_ZONES[index + 1] : null;

  return { index, isUnlocked, isCompleted, previousZone, nextZone };
}

const ANIMAL_NAMES_MAP: Record<string, string> = {
  cat: "القطة",
  dog: "الكلب",
  horse: "الحصان",
  sheep: "الخروف",
  cow: "البقرة",
  lion: "الأسد",
  elephant: "الفيل",
  monkey: "القرد",
  rabbit: "الأرنب",
  bird: "العصفور",
  duck: "البطة",
  giraffe: "الزرافة",
  bear: "الدب",
};

export function calculateHeroCycle(animalIds: string[]) {
  const uniqueIds = Array.from(new Set(animalIds || []));
  const count = uniqueIds.length;
  // 80% من جزيرة الحيوانات (10 من 13) لفتح الجزيرة التالية
  const isAnimalsComplete = count >= 10;
  const trueCompletedIslands = isAnimalsComplete ? ["animals"] : [];
  const percent = Math.min(100, Math.round((count / 13) * 100));
  const remainingForVegetables = Math.max(0, 10 - count);
  const solvedNames = uniqueIds.map((id) => ANIMAL_NAMES_MAP[id] || id);
  return {
    uniqueIds,
    count,
    isAnimalsComplete,
    trueCompletedIslands,
    percent,
    remainingForVegetables,
    solvedNames,
  };
}

export default function HomePage() {
  const [currentUser, setCurrentUser] = useState<import("@supabase/supabase-js").User | null>(null);
  const [activeIsland, setActiveIsland] = useState<IslandZone | null>(null);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [deviceType, setDeviceType] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const [checkingAuth, setCheckingAuth] = useState(true);

  // نظام دورة تقدم الجزر وتقدم البطل (Cycle)
  const [completedIslands, setCompletedIslands] = useState<string[]>([]);
  const [animalsProgressCount, setAnimalsProgressCount] = useState<number>(0);
  const [animalsCompletedIds, setAnimalsCompletedIds] = useState<string[]>([]);
  const [lockedNoticeZone, setLockedNoticeZone] = useState<{ zone: IslandZone; prevZone: IslandZone } | null>(null);
  const [celebrationModal, setCelebrationModal] = useState<{ completedZone: IslandZone; nextZone: IslandZone | null } | null>(null);

  // بيانات ولي الأمر
  const [parentName, setParentName] = useState("");
  const [childName, setChildName] = useState("");
  const [parentPhone, setParentPhone] = useState("");
  const [parentCity, setParentCity] = useState("");
  const [savingProfile, setSavingProfile] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    // 1. دورة حساب التقدم المحلي فور تشغيل المتصفح
    let localAnimalIds: string[] = [];
    try {
      if (localStorage.getItem("madar_lock_v5") !== "active") {
        localStorage.setItem("madar_lock_v5", "active");
        localStorage.removeItem("madar_completed_islands");
      }
      const savedAnimals = localStorage.getItem("madar_animals_completed_ids");
      if (savedAnimals) {
        const parsed = JSON.parse(savedAnimals);
        if (Array.isArray(parsed)) localAnimalIds = parsed;
      }
    } catch {}

    const initCycle = calculateHeroCycle(localAnimalIds);
    setAnimalsCompletedIds(initCycle.uniqueIds);
    setAnimalsProgressCount(initCycle.count);
    setCompletedIslands(initCycle.trueCompletedIslands);
    try {
      localStorage.setItem("madar_completed_islands", JSON.stringify(initCycle.trueCompletedIslands));
    } catch {}

    function checkOrientation() {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const isPortrait = h > w;

      if (w < 640 || (isPortrait && w < 768)) {
        setDeviceType("mobile");
      } else if ((w >= 640 && w <= 1024) || (isPortrait && w >= 768)) {
        setDeviceType("tablet");
      } else {
        setDeviceType("desktop");
      }
    }
    checkOrientation();
    window.addEventListener("resize", checkOrientation);
    window.addEventListener("orientationchange", checkOrientation);

    import("@/lib/supabase").then(async ({ supabase }) => {
      try {
        const { data } = await supabase.auth.getUser();
        if (data?.user) {
          setCurrentUser(data.user);
          const meta = data.user.user_metadata || {};
          setParentName(meta.parent_name || "");
          setChildName(meta.child_name || "");
          setParentPhone(meta.parent_phone || meta.phone || "");
          setParentCity(meta.parent_city || "");

          // 2. دورة حساب ومزامنة حساب المستخدم السحابي (Supabase Cycle)
          let serverAnimalIds: string[] = [];
          if (Array.isArray(meta.animals_completed_ids)) {
            serverAnimalIds = meta.animals_completed_ids;
          }
          // دمج الحيوانات المحلولة بدون تكرار
          const mergedAnimalIds = Array.from(new Set([...localAnimalIds, ...serverAnimalIds]));
          const accountCycle = calculateHeroCycle(mergedAnimalIds);

          setAnimalsCompletedIds(accountCycle.uniqueIds);
          setAnimalsProgressCount(accountCycle.count);
          setCompletedIslands(accountCycle.trueCompletedIslands);

          // تصحيح فوري وتحديث شامل في Supabase و localStorage
          try {
            localStorage.setItem("madar_animals_completed_ids", JSON.stringify(accountCycle.uniqueIds));
            localStorage.setItem("madar_completed_islands", JSON.stringify(accountCycle.trueCompletedIslands));
            await supabase.auth.updateUser({
              data: {
                animals_progress_count: accountCycle.count,
                animals_completed_ids: accountCycle.uniqueIds,
                completed_islands: accountCycle.trueCompletedIslands,
              },
            });
          } catch (syncErr) {
            console.error("Cycle sync error:", syncErr);
          }
        } else {
          // If not logged in, redirect to login page
          window.location.href = "/login";
          return;
        }
      } catch (err) {
        console.error("Auth check error:", err);
        window.location.href = "/login";
        return;
      } finally {
        setCheckingAuth(false);
      }
    });

    return () => {
      window.removeEventListener("resize", checkOrientation);
      window.removeEventListener("orientationchange", checkOrientation);
    };
  }, []);

  async function handleSaveParentData() {
    setSavingProfile(true);
    setSaveSuccess(false);
    try {
      const { supabase } = await import("@/lib/supabase");
      const { data, error } = await supabase.auth.updateUser({
        data: {
          parent_name: parentName,
          child_name: childName,
          parent_phone: parentPhone,
          parent_city: parentCity,
        },
      });
      if (error) throw error;
      if (data?.user) {
        setCurrentUser(data.user);
        try {
          await supabase.from("profiles").upsert({
            id: data.user.id,
            email: data.user.email,
            parent_name: parentName,
            child_name: childName,
            parent_phone: parentPhone,
            parent_city: parentCity,
            updated_at: new Date().toISOString(),
          });
        } catch {
          // Table may not exist yet; metadata is safely saved in auth.users
        }
      }
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err) {
      alert("حدث خطأ أثناء حفظ البيانات، يرجى المحاولة لاحقاً");
      console.error(err);
    } finally {
      setSavingProfile(false);
    }
  }

  async function handleSignOut() {
    const { supabase } = await import("@/lib/supabase");
    await supabase.auth.signOut();
    window.location.href = "/login";
  }

  async function handleCompleteIsland(zoneId: string) {
    const updated = Array.from(new Set([...completedIslands, zoneId]));
    setCompletedIslands(updated);
    try {
      localStorage.setItem("madar_completed_islands", JSON.stringify(updated));
    } catch {}

    // حفظ التقدم في بيانات المستخدم في Supabase
    try {
      const { supabase } = await import("@/lib/supabase");
      await supabase.auth.updateUser({
        data: {
          completed_islands: updated,
        },
      });
    } catch (err) {
      console.error("Save progress error:", err);
    }

    const { nextZone } = getIslandStatus(zoneId, updated, animalsProgressCount);
    const completedZone = ISLAND_ZONES.find((z) => z.id === zoneId)!;
    setActiveIsland(null);
    setCelebrationModal({ completedZone, nextZone });
  }

  async function handleResetProgress() {
    if (!confirm("هل تريد إعادة قفل الجزر وبدء التقدم من الصفر للتجربة؟ ستفتح جزيرة الحيوانات فقط.")) return;
    setCompletedIslands([]);
    setAnimalsProgressCount(0);
    setAnimalsCompletedIds([]);
    try {
      localStorage.removeItem("madar_completed_islands");
      localStorage.removeItem("madar_animals_completed_ids");
      const { supabase } = await import("@/lib/supabase");
      await supabase.auth.updateUser({
        data: {
          completed_islands: [],
          animals_progress_count: 0,
          animals_completed_ids: [],
        },
      });
    } catch {}
    alert("تمت إعادة تعيين التقدم بنجاح! جزيرة الحيوانات فقط مفتوحة وباقي الجزر مقفلة.");
  }

  if (checkingAuth) {
    return (
      <div
        style={{
          width: "100vw",
          height: "100vh",
          background: "linear-gradient(180deg, #78D4FA 0%, #AEE6FF 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#5B4FA8",
          fontSize: 20,
          fontWeight: 800,
        }}
      >
        <span>جاري تحميل الجزر السحرية...</span>
      </div>
    );
  }

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        background: "radial-gradient(circle at center, #A0E4FF 0%, #68C8F7 50%, #4FAEE6 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* ── Interactive Viewport Canvas ── */}
      <div
        style={{
          width: "100vw",
          height: "100vh",
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        {/* Responsive Clean Background Map Image */}
        <Image
          src={
            deviceType === "mobile"
              ? "/islands/map-background-mobile.png"
              : deviceType === "tablet"
              ? "/islands/map-background-tablet.png"
              : "/islands/map-background.png"
          }
          alt="خلفية جزر مدار الأمل التعليمية"
          fill
          priority
          sizes="100vw"
          style={{
            objectFit: "cover",
            objectPosition: "center",
          }}
        />

        {/* ── Top Center: Madar Al Amal Logo in Sky (لوجو مدار الأمل في السماء) ── */}
        <div
          style={{
            position: "absolute",
            top:
              deviceType === "mobile"
                ? "max(52px, calc(env(safe-area-inset-top, 0px) + 16px))"
                : deviceType === "tablet"
                ? "24px"
                : "28px",
            left: "50%",
            transform: "translateX(-50%)",
            width: deviceType === "mobile" ? "120px" : deviceType === "tablet" ? "220px" : "360px",
            height: deviceType === "mobile" ? "42px" : deviceType === "tablet" ? "74px" : "120px",
            zIndex: 25,
            pointerEvents: "none",
            filter: "drop-shadow(0 4px 14px rgba(255, 255, 255, 0.85)) drop-shadow(0 2px 6px rgba(0, 0, 0, 0.12))",
          }}
        >
          <Image
            src="/logo.png"
            alt="مدار الأمل"
            fill
            priority
            style={{ objectFit: "contain" }}
          />
        </div>

        {/* ── SVG Connecting Stepping Paths Between Islands ("خطوات بين الجزر") ── */}
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            zIndex: 18,
            pointerEvents: "none",
          }}
        >
          <defs>
            <filter id="pathShadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#0F172A" floodOpacity="0.25" />
            </filter>
          </defs>

          {ISLAND_PATHS.map((seg) => {
            const pathD =
              deviceType === "mobile"
                ? seg.mobileD
                : deviceType === "tablet"
                ? seg.tabletD
                : seg.desktopD;

            // Target island status
            const targetStatus = getIslandStatus(seg.toId, completedIslands, animalsProgressCount);
            const isPathActive = targetStatus.isUnlocked;

            return (
              <g key={`path-${seg.fromId}-${seg.toId}`} filter="url(#pathShadow)">
                {/* Underlayer Soft Cloud Glow */}
                <path
                  d={pathD}
                  fill="none"
                  stroke="rgba(255, 255, 255, 0.9)"
                  strokeWidth="7"
                  strokeLinecap="round"
                  vectorEffect="non-scaling-stroke"
                />

                {/* Dotted Stepping Stones Path */}
                <path
                  d={pathD}
                  fill="none"
                  stroke={isPathActive ? "#F59E0B" : "rgba(148, 163, 184, 0.75)"}
                  strokeWidth={isPathActive ? "5" : "4"}
                  strokeDasharray="2 10"
                  strokeLinecap="round"
                  vectorEffect="non-scaling-stroke"
                />
              </g>
            );
          })}
        </svg>

        {/* ── 5 Interactive Individual Island Assets ── */}
        {ISLAND_ZONES.map((zone) => {
          const { isUnlocked, isCompleted, previousZone } = getIslandStatus(zone.id, completedIslands, animalsProgressCount);

          const posTop =
            deviceType === "mobile" ? zone.mobileTop : deviceType === "tablet" ? zone.tabletTop : zone.desktopTop;
          const posLeft =
            deviceType === "mobile" ? zone.mobileLeft : deviceType === "tablet" ? zone.tabletLeft : zone.desktopLeft;
          const posWidth =
            deviceType === "mobile" ? zone.mobileWidth : deviceType === "tablet" ? zone.tabletWidth : zone.desktopWidth;
          const posHeight =
            deviceType === "mobile" ? zone.mobileHeight : deviceType === "tablet" ? zone.tabletHeight : zone.desktopHeight;

          return (
            <div
              key={zone.id}
              className="island-card"
              onClick={() => {
                if (zone.id === "animals") {
                  setActiveIsland(zone);
                } else {
                  setLockedNoticeZone({ zone, prevZone: ISLAND_ZONES[0] });
                }
              }}
              style={{
                position: "absolute",
                top: posTop,
                left: posLeft,
                width: posWidth,
                height: posHeight,
                cursor: "pointer",
                zIndex: 20,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                transition: "transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
              }}
              onMouseEnter={(e) => {
                if (isUnlocked) e.currentTarget.style.transform = "scale(1.05)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
              }}
            >
              {/* Island Image: Grayscale directly on the PNG when locked, Vibrant color when unlocked */}
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  height: "100%",
                  filter: isUnlocked
                    ? "drop-shadow(0 10px 18px rgba(0,0,0,0.18))"
                    : "grayscale(100%) brightness(0.82) contrast(0.9) drop-shadow(0 6px 12px rgba(0,0,0,0.25))",
                  opacity: isUnlocked ? 1 : 0.75,
                  transition: "filter 0.5s ease, opacity 0.5s ease",
                }}
              >
                <Image
                  src={zone.imageSrc}
                  alt={zone.title}
                  fill
                  priority
                  style={{
                    objectFit: "contain",
                    objectPosition: "center",
                  }}
                />
              </div>
            </div>
          );
        })}

        {/* ── Bottom Controls: خروج + سحابة العنوان الموسعة + حسابي (بفونت أطفال كرتوني) ── */}
        <footer
          style={{
            position: "absolute",
            bottom: deviceType === "mobile" ? "6px" : deviceType === "tablet" ? "14px" : "18px",
            left: 0,
            right: 0,
            height: deviceType === "mobile" ? "98px" : deviceType === "tablet" ? "150px" : "240px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 35,
            pointerEvents: "none",
          }}
        >
          {/* Right side (RTL start): زر الخروج */}
          <button
            onClick={handleSignOut}
            style={{
              position: "absolute",
              right: deviceType === "mobile" ? "10px" : deviceType === "tablet" ? "24px" : "48px",
              bottom: deviceType === "mobile" ? "14px" : deviceType === "tablet" ? "22px" : "32px",
              fontFamily: "'Baloo Bhaijaan 2', 'Marhey', cursive, sans-serif",
              background: "linear-gradient(135deg, #FF6584, #FF4568)",
              color: "white",
              border: deviceType === "mobile" ? "2.5px solid white" : "3.5px solid white",
              borderRadius: deviceType === "mobile" ? "24px" : "36px",
              padding: deviceType === "mobile" ? "6px 14px" : deviceType === "tablet" ? "10px 24px" : "14px 34px",
              fontSize: deviceType === "mobile" ? "13px" : deviceType === "tablet" ? "16px" : "21px",
              fontWeight: 800,
              cursor: "pointer",
              boxShadow: "0 6px 18px rgba(255, 69, 104, 0.4)",
              transition: "transform 0.2s",
              whiteSpace: "nowrap",
              pointerEvents: "auto",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.06)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            خروج
          </button>

          {/* Center: سحابة العنوان الكبيرة مع الفونت الكرتوني المناسب للأطفال */}
          <div
            style={{
              position: "relative",
              width:
                deviceType === "mobile"
                  ? "clamp(240px, 66vw, 275px)"
                  : deviceType === "tablet"
                  ? "420px"
                  : "740px",
              height:
                deviceType === "mobile"
                  ? "94px"
                  : deviceType === "tablet"
                  ? "145px"
                  : "235px",
              pointerEvents: "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Image
              src="/islands/cloud-banner.png"
              alt="اختر جزيرتك السحرية"
              fill
              priority
              style={{ objectFit: "contain" }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                paddingTop: deviceType === "mobile" ? "2px" : deviceType === "tablet" ? "6px" : "14px",
              }}
            >
              <div
                style={{
                  fontFamily: "'Baloo Bhaijaan 2', 'Marhey', cursive, sans-serif",
                  fontSize:
                    deviceType === "mobile"
                      ? "18px"
                      : deviceType === "tablet"
                      ? "26px"
                      : "46px",
                  fontWeight: 900,
                  color: "#E11D48",
                  textShadow: `
                    -2.5px -2.5px 0 #ffffff,
                     2.5px -2.5px 0 #ffffff,
                    -2.5px  2.5px 0 #ffffff,
                     2.5px  2.5px 0 #ffffff,
                     0px  3.5px 0 #ffffff,
                     0px -3.5px 0 #ffffff,
                    -3.5px  0px 0 #ffffff,
                     3.5px  0px 0 #ffffff,
                     0 6px 14px rgba(0, 0, 0, 0.22)
                  `,
                  lineHeight: 1.15,
                  whiteSpace: "nowrap",
                  letterSpacing: "-0.3px",
                }}
              >
                اختر جزيرتك السحرية
              </div>
              <div
                style={{
                  fontFamily: "'Baloo Bhaijaan 2', 'Marhey', cursive, sans-serif",
                  fontSize:
                    deviceType === "mobile"
                      ? "13px"
                      : deviceType === "tablet"
                      ? "18px"
                      : "30px",
                  fontWeight: 900,
                  color: "#2563EB",
                  textShadow: `
                    -2px -2px 0 #ffffff,
                     2px -2px 0 #ffffff,
                    -2px  2px 0 #ffffff,
                     2px  2px 0 #ffffff,
                     0px  2.5px 0 #ffffff,
                     0px -2.5px 0 #ffffff,
                     0 5px 12px rgba(0, 0, 0, 0.18)
                  `,
                  lineHeight: 1.15,
                  whiteSpace: "nowrap",
                  marginTop: deviceType === "mobile" ? "1px" : "5px",
                  letterSpacing: "-0.2px",
                }}
              >
                وابدأ اللعب والتعلم
              </div>
            </div>
          </div>

          {/* Left side (RTL end): زر حسابي */}
          <button
            onClick={() => setShowProfileModal(true)}
            style={{
              position: "absolute",
              left: deviceType === "mobile" ? "10px" : deviceType === "tablet" ? "24px" : "48px",
              bottom: deviceType === "mobile" ? "14px" : deviceType === "tablet" ? "22px" : "32px",
              fontFamily: "'Baloo Bhaijaan 2', 'Marhey', cursive, sans-serif",
              background: "rgba(255, 255, 255, 0.96)",
              padding: deviceType === "mobile" ? "6px 14px" : deviceType === "tablet" ? "10px 24px" : "14px 34px",
              borderRadius: deviceType === "mobile" ? "24px" : "36px",
              color: "#5B4FA8",
              fontWeight: 800,
              fontSize: deviceType === "mobile" ? "13px" : deviceType === "tablet" ? "16px" : "21px",
              boxShadow: "0 6px 18px rgba(91, 79, 168, 0.28)",
              border: deviceType === "mobile" ? "2.5px solid #5B4FA8" : "3.5px solid #5B4FA8",
              cursor: "pointer",
              transition: "transform 0.2s, box-shadow 0.2s",
              whiteSpace: "nowrap",
              pointerEvents: "auto",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.06)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            {deviceType === "mobile" ? (childName ? childName : "حسابي") : "حسابي"}
          </button>
        </footer>
      </div>

      {/* ── User & Guardian Profile Modal ── */}
      {showProfileModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3"
          style={{ background: "rgba(10, 35, 70, 0.65)", backdropFilter: "blur(8px)" }}
        >
          <div
            style={{
              background: "white",
              borderRadius: 32,
              maxWidth: 460,
              width: "100%",
              maxHeight: "92vh",
              overflowY: "auto",
              padding: "24px 20px",
              textAlign: "center",
              boxShadow: "0 28px 56px rgba(0,0,0,0.35)",
              border: "4px solid #5B4FA8",
              position: "relative",
            }}
          >
            <h2 style={{ color: "#5B4FA8", margin: "0 0 4px 0", fontSize: 20, fontWeight: 900 }}>
              بيانات الحساب وولي الأمر
            </h2>
            <p style={{ margin: "0 0 16px 0", color: "#718096", fontSize: 13, fontWeight: 600 }}>
              مركز مدار الأمل بالمملكة العربية السعودية
            </p>

            {/* Account Details Box */}
            <div
              style={{
                background: "#F8FAFC",
                borderRadius: 18,
                padding: "12px 16px",
                marginBottom: 16,
                textAlign: "right",
                fontSize: 13,
                display: "flex",
                flexDirection: "column",
                gap: 8,
                border: "1px solid #E2E8F0",
              }}
            >
              <div>
                <span style={{ color: "#718096", fontWeight: 700 }}>الحساب المسجل: </span>
                <span style={{ color: "#2D3748", fontWeight: 800, direction: "ltr", display: "inline-block" }}>
                  {currentUser?.email || "غير متوفر"}
                </span>
              </div>

              <div>
                <span style={{ color: "#718096", fontWeight: 700 }}>طريقة الدخول: </span>
                <span style={{ color: "#2D3748", fontWeight: 800 }}>
                  {currentUser?.app_metadata?.provider === "google" ? "حساب Google" : "البريد الإلكتروني"}
                </span>
              </div>
            </div>

            {/* Guardian & Child Editable Form */}
            <div
              style={{
                background: "#F0FDF4",
                borderRadius: 20,
                padding: "14px 16px",
                marginBottom: 16,
                textAlign: "right",
                border: "1.5px solid #BBF7D0",
              }}
            >
              <h3 style={{ color: "#166534", margin: "0 0 12px 0", fontSize: 15, fontWeight: 800, display: "flex", alignItems: "center", gap: 6 }}>
                <span>بيانات ولي الأمر والطفل</span>
              </h3>

              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <div>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "#374151", marginBottom: 3 }}>
                    اسم ولي الأمر:
                  </label>
                  <input
                    type="text"
                    placeholder="مثال: أحمد عبد الله"
                    value={parentName}
                    onChange={(e) => setParentName(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "8px 12px",
                      borderRadius: "12px",
                      border: "1.5px solid #CBD5E1",
                      fontSize: "13px",
                      outline: "none",
                      background: "white",
                      textAlign: "right",
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "#374151", marginBottom: 3 }}>
                    اسم البطل / الطفل:
                  </label>
                  <input
                    type="text"
                    placeholder="مثال: سارة أو محمد"
                    value={childName}
                    onChange={(e) => setChildName(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "8px 12px",
                      borderRadius: "12px",
                      border: "1.5px solid #CBD5E1",
                      fontSize: "13px",
                      outline: "none",
                      background: "white",
                      textAlign: "right",
                    }}
                  />
                </div>

                <div style={{ display: "flex", gap: 8 }}>
                  <div style={{ flex: 1 }}>
                    <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "#374151", marginBottom: 3 }}>
                      رقم الجوال:
                    </label>
                    <input
                      type="tel"
                      placeholder="05XXXXXXXX"
                      value={parentPhone}
                      onChange={(e) => setParentPhone(e.target.value)}
                      style={{
                        width: "100%",
                        padding: "8px 12px",
                        borderRadius: "12px",
                        border: "1.5px solid #CBD5E1",
                        fontSize: "13px",
                        outline: "none",
                        background: "white",
                        direction: "ltr",
                        textAlign: "right",
                      }}
                    />
                  </div>

                  <div style={{ flex: 1 }}>
                    <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "#374151", marginBottom: 3 }}>
                      المدينة:
                    </label>
                    <input
                      type="text"
                      placeholder="الرياض، جدة..."
                      value={parentCity}
                      onChange={(e) => setParentCity(e.target.value)}
                      style={{
                        width: "100%",
                        padding: "8px 12px",
                        borderRadius: "12px",
                        border: "1.5px solid #CBD5E1",
                        fontSize: "13px",
                        outline: "none",
                        background: "white",
                        textAlign: "right",
                      }}
                    />
                  </div>
                </div>

                {/* Save Button */}
                <button
                  onClick={handleSaveParentData}
                  disabled={savingProfile}
                  style={{
                    marginTop: 6,
                    background: "linear-gradient(135deg, #16A34A 0%, #15803D 100%)",
                    color: "white",
                    border: "none",
                    borderRadius: "14px",
                    padding: "10px",
                    fontSize: "14px",
                    fontWeight: 800,
                    cursor: "pointer",
                    boxShadow: "0 4px 10px rgba(22, 163, 74, 0.3)",
                    transition: "transform 0.2s",
                  }}
                >
                  {savingProfile ? "جارٍ الحفظ..." : "حفظ وتحديث البيانات"}
                </button>

                {saveSuccess && (
                  <div style={{ color: "#15803D", fontSize: 13, fontWeight: 700, textAlign: "center", marginTop: 4 }}>
                    تم حفظ وتحديث البيانات بنجاح في قاعدة البيانات!
                  </div>
                )}
              </div>
            </div>

            {/* Hero Progress Cycle Box */}
            <div style={{ background: "#F8FAFC", border: "2px solid #E2E8F0", borderRadius: 20, padding: "14px 16px", marginBottom: 14 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                <span style={{ fontWeight: 900, color: "#1E293B", fontSize: 13 }}>
                  دورة تقدم البطل (الحساب الفعلي):
                </span>
                <span style={{
                  background: completedIslands.length > 0 ? "#DCFCE7" : "#F1F5F9",
                  color: completedIslands.length > 0 ? "#15803D" : "#475569",
                  padding: "4px 10px",
                  borderRadius: 12,
                  fontSize: 12,
                  fontWeight: 900,
                  border: "1px solid #CBD5E1"
                }}>
                  {completedIslands.length} من {ISLAND_ZONES.length} جزر مكتملة
                </span>
              </div>

              {/* بطاقة جزيرة الحيوانات */}
              <div style={{ background: "white", borderRadius: 14, padding: "12px 14px", border: "1.5px solid #FED7AA", boxShadow: "0 2px 8px rgba(0,0,0,0.03)", marginBottom: 10 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                  <span style={{ fontSize: 13, fontWeight: 900, color: "#9A3412" }}>
                    🐾 جزيرة الحيوانات (مفتوحة):
                  </span>
                  <span style={{ fontSize: 13, fontWeight: 900, color: "#EA580C" }}>
                    {animalsProgressCount} من 13 حيوان ({Math.min(100, Math.round((animalsProgressCount / 13) * 100))}%)
                  </span>
                </div>

                <div style={{ height: 10, background: "#FFEDD5", borderRadius: 5, overflow: "hidden", marginBottom: 8 }}>
                  <div
                    style={{
                      height: "100%",
                      width: `${Math.min(100, Math.round((animalsProgressCount / 13) * 100))}%`,
                      background: "linear-gradient(90deg, #F97316, #10B981)",
                      transition: "width 0.4s",
                    }}
                  />
                </div>

                {animalsCompletedIds.length > 0 && (
                  <div style={{ fontSize: 12, color: "#334155", fontWeight: 700, marginBottom: 6, display: "flex", flexWrap: "wrap", alignItems: "center", gap: 4 }}>
                    <span>تم حل بنجاح:</span>
                    {animalsCompletedIds.map((id) => (
                      <span key={id} style={{ background: "#ECFDF5", color: "#065F46", padding: "2px 8px", borderRadius: 8, border: "1px solid #A7F3D0", fontWeight: 800 }}>
                        {ANIMAL_NAMES_MAP[id] || id}
                      </span>
                    ))}
                  </div>
                )}

                <div style={{ fontSize: 12, color: animalsProgressCount >= 10 ? "#059669" : "#D97706", fontWeight: 800 }}>
                  {animalsProgressCount >= 10
                    ? "أحسنت يا بطل! أتممت نسبة 80% وتم فتح جزيرة الخضار بنجاح! 🔓"
                    : `متبقي حل ${Math.max(0, 10 - animalsProgressCount)} حيوانات للوصول إلى 80% وفتح جزيرة الخضار`}
                </div>
              </div>

              {/* تنبيه حالة قفل الجزر التالية */}
              <div style={{ fontSize: 11, color: "#64748B", fontWeight: 700, textAlign: "center", background: "#F1F5F9", padding: "6px 10px", borderRadius: 10 }}>
                🔒 باقي الجزر مقفلة تلقائياً وتفتح تباعاً بمجرد إكمال 80% من كل جزيرة
              </div>

              <button
                onClick={handleResetProgress}
                style={{
                  background: "none",
                  border: "none",
                  color: "#94A3B8",
                  fontSize: 11,
                  fontWeight: 700,
                  cursor: "pointer",
                  marginTop: 10,
                  textDecoration: "underline",
                  padding: 0,
                  width: "100%",
                  textAlign: "center",
                }}
              >
                إعادة قفل الجزر وبدء التقدم من الصفر (للتجربة)
              </button>
            </div>

            {/* Bottom Actions */}
            <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
              <button
                onClick={() => setShowProfileModal(false)}
                style={{
                  background: "#5B4FA8",
                  color: "white",
                  border: "none",
                  borderRadius: 18,
                  padding: "9px 24px",
                  fontSize: 14,
                  fontWeight: 800,
                  cursor: "pointer",
                  boxShadow: "0 4px 12px rgba(91,79,168,0.3)",
                }}
              >
                إغلاق النافذة
              </button>

              <button
                onClick={handleSignOut}
                style={{
                  background: "#FF5E7E",
                  color: "white",
                  border: "none",
                  borderRadius: 18,
                  padding: "9px 18px",
                  fontSize: 14,
                  fontWeight: 800,
                  cursor: "pointer",
                }}
              >
                تسجيل الخروج
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Animals Island Interactive Adventure ── */}
      {activeIsland?.id === "animals" && (
        <AnimalsIslandAdventure
          onBackToMap={() => {
            // مزامنة دورة الإجابات والتقدم
            try {
              const savedAnimals = localStorage.getItem("madar_animals_completed_ids");
              if (savedAnimals) {
                const parsed = JSON.parse(savedAnimals);
                if (Array.isArray(parsed)) {
                  const cycle = calculateHeroCycle(parsed);
                  setAnimalsCompletedIds(cycle.uniqueIds);
                  setAnimalsProgressCount(cycle.count);
                  setCompletedIslands(cycle.trueCompletedIslands);
                }
              }
            } catch {}
            setActiveIsland(null);
          }}
          onCompleteIsland={handleCompleteIsland}
          onProgressUpdate={async (count, total, ids) => {
            const cycle = calculateHeroCycle(ids || []);
            setAnimalsCompletedIds(cycle.uniqueIds);
            setAnimalsProgressCount(cycle.count);
            setCompletedIslands(cycle.trueCompletedIslands);
            try {
              localStorage.setItem("madar_animals_completed_ids", JSON.stringify(cycle.uniqueIds));
              localStorage.setItem("madar_completed_islands", JSON.stringify(cycle.trueCompletedIslands));
              const { supabase } = await import("@/lib/supabase");
              await supabase.auth.updateUser({
                data: {
                  animals_progress_count: cycle.count,
                  animals_completed_ids: cycle.uniqueIds,
                  completed_islands: cycle.trueCompletedIslands,
                },
              });
            } catch (err) {
              console.error("Failed to sync animals progress to supabase:", err);
            }
          }}
          deviceType={deviceType}
        />
      )}

      {/* ── Modal Pop-up on Locked Island Click (توجيه الطفل إلى جزيرة الحيوانات) ── */}
      {lockedNoticeZone && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(10, 35, 70, 0.6)", backdropFilter: "blur(8px)" }}
        >
          <div
            style={{
              background: "white",
              borderRadius: 32,
              maxWidth: 420,
              width: "100%",
              padding: "28px 24px",
              textAlign: "center",
              boxShadow: "0 28px 56px rgba(0,0,0,0.35)",
              border: "4px solid #CBD5E1",
              position: "relative",
            }}
          >
            <h2 style={{ color: "#475569", margin: "0 0 10px", fontSize: 21, fontWeight: 900 }}>
              هذه الجزيرة مقفلة حالياً
            </h2>

            {lockedNoticeZone.zone.id === "vegetables" ? (
              <>
                <p style={{ color: "#64748B", fontSize: 14, lineHeight: 1.6, marginBottom: 12 }}>
                  يا بطل! عليك أولاً التوجه إلى <strong>جزيرة الحيوانات</strong> وإكمال <strong>80% على الأقل</strong> (حل 10 حيوانات على الأقل) لتفتح لك جزيرة <strong>{lockedNoticeZone.zone.title}</strong>!
                </p>
                <div
                  style={{
                    background: "#FEF3C7",
                    border: "1.5px solid #F59E0B",
                    borderRadius: "14px",
                    padding: "8px 14px",
                    color: "#B45309",
                    fontSize: "13px",
                    fontWeight: 800,
                    marginBottom: 20,
                  }}
                >
                  درجتك الحالية في الحيوانات: {animalsProgressCount} من 13 ({Math.round((animalsProgressCount / 13) * 100)}%)
                </div>
              </>
            ) : (
              <p style={{ color: "#64748B", fontSize: 14, lineHeight: 1.6, marginBottom: 20 }}>
                يا بطل! عليك أولاً التوجه إلى <strong>جزيرة الحيوانات</strong> وإنهاء متطلبات الجزر السابقة لتفتح لك جزيرة <strong>{lockedNoticeZone.zone.title}</strong> السحرية!
              </p>
            )}

            <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
              <button
                onClick={() => {
                  setLockedNoticeZone(null);
                  setActiveIsland(ISLAND_ZONES[0]); // توجيه مباشر إلى جزيرة الحيوانات
                }}
                style={{
                  background: "#E07820",
                  color: "white",
                  border: "none",
                  borderRadius: 20,
                  padding: "10px 22px",
                  fontSize: 14,
                  fontWeight: 900,
                  cursor: "pointer",
                  boxShadow: "0 4px 14px rgba(224, 120, 32, 0.35)",
                }}
              >
                الذهاب إلى جزيرة الحيوانات
              </button>

              <button
                onClick={() => setLockedNoticeZone(null)}
                style={{
                  background: "#EDF2F7",
                  color: "#475569",
                  border: "none",
                  borderRadius: 20,
                  padding: "10px 18px",
                  fontSize: 14,
                  fontWeight: 700,
                  cursor: "pointer",
                }}
              >
                حسناً
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Celebration Modal when an Island is completed ── */}
      {celebrationModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(10, 35, 70, 0.65)", backdropFilter: "blur(8px)" }}
        >
          <div
            style={{
              background: "white",
              borderRadius: 32,
              maxWidth: 440,
              width: "100%",
              padding: "32px 24px",
              textAlign: "center",
              boxShadow: "0 28px 56px rgba(0,0,0,0.4)",
              border: "5px solid #F59E0B",
              position: "relative",
            }}
          >
            <h2 style={{ color: "#D97706", margin: "0 0 12px", fontSize: 23, fontWeight: 900 }}>
              أحسنت يا بطل! عمل رائع!
            </h2>
            <p style={{ color: "#4B5563", fontSize: 15, lineHeight: 1.6, marginBottom: 22 }}>
              لقد أتممت مغامرة <strong>{celebrationModal.completedZone.title}</strong> بنجاح وحصلت على وسام الشجاعة!
              {celebrationModal.nextZone ? (
                <>
                  <br />
                  <span style={{ color: "#059669", fontWeight: 800, display: "inline-block", marginTop: 8 }}>
                    تم فتح جزيرة «{celebrationModal.nextZone.title}» الآن!
                  </span>
                </>
              ) : (
                <>
                  <br />
                  <span style={{ color: "#7C3AED", fontWeight: 800, display: "inline-block", marginTop: 8 }}>
                    مبروك! لقد أنهيت جميع الجزر السحرية وأصبحت بطل المدار!
                  </span>
                </>
              )}
            </p>

            <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
              {celebrationModal.nextZone ? (
                <button
                  onClick={() => {
                    const next = celebrationModal.nextZone!;
                    setCelebrationModal(null);
                    setActiveIsland(next);
                  }}
                  style={{
                    background: celebrationModal.nextZone.themeColor,
                    color: "white",
                    border: "none",
                    borderRadius: 22,
                    padding: "11px 22px",
                    fontSize: 14,
                    fontWeight: 900,
                    cursor: "pointer",
                    boxShadow: "0 6px 18px rgba(0,0,0,0.25)",
                  }}
                >
                  انتقل إلى {celebrationModal.nextZone.title}
                </button>
              ) : null}

              <button
                onClick={() => setCelebrationModal(null)}
                style={{
                  background: "#EDF2F7",
                  color: "#4B5563",
                  border: "none",
                  borderRadius: 22,
                  padding: "11px 20px",
                  fontSize: 14,
                  fontWeight: 800,
                  cursor: "pointer",
                }}
              >
                العودة للخريطة
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
