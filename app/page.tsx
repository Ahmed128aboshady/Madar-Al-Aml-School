"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

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
    mobileTop: "17%",
    mobileLeft: "3%",
    mobileWidth: "46%",
    mobileHeight: "22%",
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
    mobileTop: "18%",
    mobileLeft: "51%",
    mobileWidth: "46%",
    mobileHeight: "22%",
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
    mobileTop: "39%",
    mobileLeft: "26%",
    mobileWidth: "48%",
    mobileHeight: "23%",
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
    mobileTop: "61%",
    mobileLeft: "3%",
    mobileWidth: "46%",
    mobileHeight: "22%",
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
    mobileTop: "61%",
    mobileLeft: "51%",
    mobileWidth: "46%",
    mobileHeight: "22%",
  },
];

function getIslandStatus(zoneId: string, completed: string[]) {
  const index = ISLAND_ZONES.findIndex((z) => z.id === zoneId);
  const isCompleted = completed.includes(zoneId);
  // الجزيرة الأولى (الحيوانات) مفتوحة دائماً، وباقي الجزر تفتح بالتسلسل عند إنهاء الجزيرة السابقة
  const isUnlocked = index === 0 || completed.includes(ISLAND_ZONES[index - 1].id);
  const previousZone = index > 0 ? ISLAND_ZONES[index - 1] : null;
  const nextZone = index < ISLAND_ZONES.length - 1 ? ISLAND_ZONES[index + 1] : null;

  return { index, isUnlocked, isCompleted, previousZone, nextZone };
}

export default function HomePage() {
  const [currentUser, setCurrentUser] = useState<import("@supabase/supabase-js").User | null>(null);
  const [activeIsland, setActiveIsland] = useState<IslandZone | null>(null);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [deviceType, setDeviceType] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const [checkingAuth, setCheckingAuth] = useState(true);

  // نظام تقدم الجزر وفتحها بالتسلسل
  const [completedIslands, setCompletedIslands] = useState<string[]>([]);
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
    // استرجاع تقدم الجزر من الذاكرة المحلية أولاً
    try {
      const saved = localStorage.getItem("madar_completed_islands");
      if (saved) {
        setCompletedIslands(JSON.parse(saved));
      }
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

          // استرجاع الجزر المكتملة من قاعدة البيانات
          if (Array.isArray(meta.completed_islands) && meta.completed_islands.length > 0) {
            setCompletedIslands(meta.completed_islands);
            try {
              localStorage.setItem("madar_completed_islands", JSON.stringify(meta.completed_islands));
            } catch {}
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

    const { nextZone } = getIslandStatus(zoneId, updated);
    const completedZone = ISLAND_ZONES.find((z) => z.id === zoneId)!;
    setActiveIsland(null);
    setCelebrationModal({ completedZone, nextZone });
  }

  async function handleResetProgress() {
    if (!confirm("هل تريد إعادة قفل الجزر من البداية للتجربة؟ ستفتح الجزيرة الأولى فقط.")) return;
    setCompletedIslands([]);
    try {
      localStorage.removeItem("madar_completed_islands");
      const { supabase } = await import("@/lib/supabase");
      await supabase.auth.updateUser({
        data: {
          completed_islands: [],
        },
      });
    } catch {}
    alert("تمت إعادة تعيين الجزر بنجاح! الجزيرة الأولى مفتوحة وباقي الجزر مقفلة.");
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
        <span>جاري تحميل الجزر السحرية... ☁️🎈</span>
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
      {/* ── Top Bar Controls ── */}
      <header
        style={{
          position: "absolute",
          top: "10px",
          left: "14px",
          right: "14px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          zIndex: 40,
        }}
      >
        {/* Sign Out Button (Goes to /login) */}
        <button
          onClick={handleSignOut}
          style={{
            background: "#FF5E7E",
            color: "white",
            border: "2px solid white",
            borderRadius: "20px",
            padding: "6px 16px",
            fontSize: "13px",
            fontWeight: 800,
            cursor: "pointer",
            boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
            transition: "transform 0.2s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
          onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
          خروج 🚪
        </button>

        {/* Profile Button / User Pill (Opens User Profile Modal) */}
        <button
          onClick={() => setShowProfileModal(true)}
          style={{
            background: "rgba(255, 255, 255, 0.95)",
            padding: "6px 14px",
            borderRadius: "20px",
            color: "#5B4FA8",
            fontWeight: 800,
            fontSize: "13px",
            boxShadow: "0 4px 14px rgba(0,0,0,0.15)",
            border: "2px solid #5B4FA8",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: 6,
            transition: "transform 0.2s, box-shadow 0.2s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
          onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
          <span>👤 مرحباً بك</span>
          {currentUser?.email && (
            <span style={{ direction: "ltr", maxWidth: 120, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              ({currentUser.email.split("@")[0]})
            </span>
          )}
          <span style={{ fontSize: 11 }}>ℹ️</span>
        </button>
      </header>

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

        {/* ── Top Cloud Banner ("اختر جزيرتك السحرية") ── */}
        <div
          style={{
            position: "absolute",
            top: deviceType === "mobile" ? "4%" : deviceType === "tablet" ? "4%" : "6%",
            left: "50%",
            transform: "translateX(-50%)",
            width: deviceType === "mobile" ? "84%" : deviceType === "tablet" ? "52%" : "48%",
            height: deviceType === "mobile" ? "13%" : deviceType === "tablet" ? "18%" : "22%",
            zIndex: 15,
            pointerEvents: "none",
          }}
        >
          <div style={{ position: "relative", width: "100%", height: "100%" }}>
            <Image
              src="/islands/cloud-banner.png"
              alt="اختر جزيرتك السحرية"
              fill
              priority
              style={{ objectFit: "contain" }}
            />
            {/* Playful Arabic Title Styled Crisp and Colorful */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                paddingTop: "1%",
                textAlign: "center",
              }}
            >
              <h1
                style={{
                  margin: 0,
                  fontSize:
                    deviceType === "mobile"
                      ? "16px"
                      : deviceType === "tablet"
                      ? "22px"
                      : "clamp(22px, 2.7vw, 40px)",
                  fontWeight: 900,
                  color: "#BE123C",
                  textShadow: "0 2px 4px rgba(255,255,255,0.85)",
                  lineHeight: 1.15,
                }}
              >
                اختر جزيرتك السحرية
              </h1>
              <p
                style={{
                  margin: "3px 0 0",
                  fontSize:
                    deviceType === "mobile"
                      ? "11px"
                      : deviceType === "tablet"
                      ? "13px"
                      : "clamp(13px, 1.5vw, 22px)",
                  fontWeight: 800,
                  color: "#1D4ED8",
                  textShadow: "0 1px 2px rgba(255,255,255,0.85)",
                }}
              >
                وابدأ اللعب والتعلم
              </p>
            </div>
          </div>
        </div>

        {/* ── Built-in Header 'مرحباً بك' hotspot in the image for mobile & desktop ── */}
        <div
          onClick={() => setShowProfileModal(true)}
          style={{
            position: "absolute",
            top: deviceType === "mobile" ? "1.5%" : deviceType === "tablet" ? "1.8%" : "2%",
            left: deviceType === "mobile" ? "2.5%" : deviceType === "tablet" ? "1.8%" : "1.5%",
            width: deviceType === "mobile" ? "24%" : "13%",
            height: deviceType === "mobile" ? "4.5%" : "6%",
            cursor: "pointer",
            borderRadius: "20px",
            zIndex: 35,
          }}
          title="عرض بيانات الحساب"
        />

        {/* ── 5 Interactive Individual Island Assets ── */}
        {ISLAND_ZONES.map((zone) => {
          const { isUnlocked, isCompleted, previousZone } = getIslandStatus(zone.id, completedIslands);

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
                if (!isUnlocked && previousZone) {
                  setLockedNoticeZone({ zone, prevZone: previousZone });
                } else {
                  setActiveIsland(zone);
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
            <div style={{ fontSize: 40, marginBottom: 4 }}>👨‍👩‍👧‍👦🌟</div>
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
                <span style={{ color: "#718096", fontWeight: 700 }}>📧 الحساب المسجل: </span>
                <span style={{ color: "#2D3748", fontWeight: 800, direction: "ltr", display: "inline-block" }}>
                  {currentUser?.email || "غير متوفر"}
                </span>
              </div>

              <div>
                <span style={{ color: "#718096", fontWeight: 700 }}>🔐 طريقة الدخول: </span>
                <span style={{ color: "#2D3748", fontWeight: 800 }}>
                  {currentUser?.app_metadata?.provider === "google" ? "حساب Google 🌐" : "البريد الإلكتروني ✉️"}
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
                <span>📝 بيانات ولي الأمر والطفل</span>
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
                  {savingProfile ? "⏳ جارٍ الحفظ..." : "💾 حفظ وتحديث البيانات"}
                </button>

                {saveSuccess && (
                  <div style={{ color: "#15803D", fontSize: 13, fontWeight: 700, textAlign: "center", marginTop: 4 }}>
                    ✅ تم حفظ وتحديث البيانات بنجاح في قاعدة البيانات!
                  </div>
                )}
              </div>
            </div>

            {/* Progress and Reset Box */}
            <div style={{ background: "#EEF2FF", border: "1px solid #C7D2FE", borderRadius: 16, padding: "10px 14px", marginBottom: 14 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                <span style={{ fontWeight: 800, color: "#4338CA", fontSize: 13 }}>⭐ تقدم البطل في الجزر:</span>
                <span style={{ fontWeight: 900, color: "#4338CA", fontSize: 13 }}>{completedIslands.length} من {ISLAND_ZONES.length} مكتملة</span>
              </div>
              <div style={{ height: 8, background: "#E0E7FF", borderRadius: 4, overflow: "hidden" }}>
                <div style={{ height: "100%", width: `${(completedIslands.length / ISLAND_ZONES.length) * 100}%`, background: "linear-gradient(90deg, #6366F1, #10B981)", transition: "width 0.4s" }} />
              </div>
              <button
                onClick={handleResetProgress}
                style={{
                  background: "none",
                  border: "none",
                  color: "#6B7280",
                  fontSize: 11,
                  fontWeight: 700,
                  cursor: "pointer",
                  marginTop: 6,
                  textDecoration: "underline",
                  padding: 0,
                }}
              >
                🔄 إعادة قفل الجزر من البداية (للتجربة)
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
                تسجيل الخروج 🚪
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Modal Pop-up on Island Click ── */}
      {activeIsland && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(10, 35, 70, 0.55)", backdropFilter: "blur(8px)" }}
        >
          <div
            style={{
              background: "white",
              borderRadius: 32,
              maxWidth: 440,
              width: "100%",
              padding: "30px 22px",
              textAlign: "center",
              boxShadow: "0 28px 56px rgba(0,0,0,0.35)",
              border: `5px solid ${activeIsland.themeColor}`,
              position: "relative",
            }}
          >
            <h2
              style={{
                color: activeIsland.themeColor,
                margin: "0 0 12px 0",
                fontSize: 23,
                fontWeight: 900,
              }}
            >
              {activeIsland.title}
            </h2>

            <p
              style={{
                color: "#4A5568",
                fontSize: 14,
                lineHeight: 1.6,
                marginBottom: 16,
                fontWeight: 600,
              }}
            >
              {activeIsland.description}
            </p>

            {completedIslands.includes(activeIsland.id) ? (
              <div
                style={{
                  background: "#DCFCE7",
                  color: "#15803D",
                  borderRadius: 14,
                  padding: "8px 12px",
                  fontSize: 13,
                  fontWeight: 800,
                  marginBottom: 16,
                  border: "1px solid #86EFAC",
                }}
              >
                ⭐ هذه الجزيرة مكتملة ومفتوحة دائماً!
              </div>
            ) : (
              <div
                style={{
                  background: "#FEF3C7",
                  color: "#92400E",
                  borderRadius: 14,
                  padding: "8px 12px",
                  fontSize: 12,
                  fontWeight: 800,
                  marginBottom: 16,
                  border: "1px solid #FCD34D",
                }}
              >
                🎯 أكمل مغامرة هذه الجزيرة لفتح الجزيرة التالية على الخريطة!
              </div>
            )}

            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <button
                onClick={() => handleCompleteIsland(activeIsland.id)}
                style={{
                  background: "linear-gradient(135deg, #16A34A 0%, #15803D 100%)",
                  color: "white",
                  border: "none",
                  borderRadius: 22,
                  padding: "12px 20px",
                  fontSize: 15,
                  fontWeight: 900,
                  cursor: "pointer",
                  boxShadow: "0 6px 18px rgba(22, 163, 74, 0.35)",
                }}
              >
                🎉 إكمال المغامرة وفتح الجزيرة التالية ⭐
              </button>

              <button
                onClick={() => setActiveIsland(null)}
                style={{
                  background: "#EDF2F7",
                  color: "#4A5568",
                  border: "none",
                  borderRadius: 22,
                  padding: "10px 20px",
                  fontSize: 14,
                  fontWeight: 800,
                  cursor: "pointer",
                }}
              >
                إغلاق والعودة للخريطة ✖️
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Modal Pop-up on Locked Island Click ── */}
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
            <div style={{ fontSize: 48, marginBottom: 6 }}>🔒✨</div>
            <h2 style={{ color: "#475569", margin: "0 0 10px", fontSize: 21, fontWeight: 900 }}>
              هذه الجزيرة مقفلة حالياً!
            </h2>
            <p style={{ color: "#64748B", fontSize: 14, lineHeight: 1.6, marginBottom: 20 }}>
              يا بطل! عليك أولاً إكمال مغامرة <strong>{lockedNoticeZone.prevZone.title}</strong> لتفتح لك جزيرة <strong>{lockedNoticeZone.zone.title}</strong> السحرية! 🌟
            </p>

            <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
              <button
                onClick={() => {
                  const target = lockedNoticeZone.prevZone;
                  setLockedNoticeZone(null);
                  setActiveIsland(target);
                }}
                style={{
                  background: lockedNoticeZone.prevZone.themeColor,
                  color: "white",
                  border: "none",
                  borderRadius: 20,
                  padding: "10px 20px",
                  fontSize: 14,
                  fontWeight: 800,
                  cursor: "pointer",
                  boxShadow: "0 4px 14px rgba(0,0,0,0.2)",
                }}
              >
                الذهاب لـ {lockedNoticeZone.prevZone.title} 🚀
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
                حسناً 👍
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
            <div style={{ fontSize: 56, marginBottom: 6 }}>🏆🎊⭐</div>
            <h2 style={{ color: "#D97706", margin: "0 0 10px", fontSize: 23, fontWeight: 900 }}>
              أحسنت يا بطل! عمل رائع!
            </h2>
            <p style={{ color: "#4B5563", fontSize: 15, lineHeight: 1.6, marginBottom: 22 }}>
              لقد أتممت مغامرة <strong>{celebrationModal.completedZone.title}</strong> بنجاح وحصلت على وسام الشجاعة! ⭐
              {celebrationModal.nextZone ? (
                <>
                  <br />
                  <span style={{ color: "#059669", fontWeight: 800, display: "inline-block", marginTop: 6 }}>
                    🔓 تم فتح جزيرة «{celebrationModal.nextZone.title}» الآن!
                  </span>
                </>
              ) : (
                <>
                  <br />
                  <span style={{ color: "#7C3AED", fontWeight: 800, display: "inline-block", marginTop: 6 }}>
                    👑 مبروك! لقد أنهيت جميع الجزر السحرية وأصبحت بطل المدار!
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
                  انتقل لـ {celebrationModal.nextZone.title} 🚀
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
                العودة للخريطة 🗺️
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
