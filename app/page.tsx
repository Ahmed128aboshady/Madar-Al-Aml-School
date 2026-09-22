"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface IslandZone {
  id: string;
  title: string;
  description: string;
  themeColor: string;
  // Desktop 16:9 coordinates
  desktopTop: string;
  desktopLeft: string;
  desktopWidth: string;
  desktopHeight: string;
  desktopButtonTop: string;
  // Mobile 9:16 coordinates
  mobileTop: string;
  mobileLeft: string;
  mobileWidth: string;
  mobileHeight: string;
  mobileButtonTop: string;
}

const ISLAND_ZONES: IslandZone[] = [
  {
    id: "animals",
    title: "تعرف على الحيوانات",
    description: "مرحباً بك في جزيرة الأسد والأصدقاء! سنكتشف سوياً أصوات الحيوانات وأشكالها الجميلة بطريقة سهلة وممتعة.",
    themeColor: "#E07820",
    desktopTop: "19%",
    desktopLeft: "13%",
    desktopWidth: "25%",
    desktopHeight: "34%",
    desktopButtonTop: "74%",
    mobileTop: "19%",
    mobileLeft: "5%",
    mobileWidth: "44%",
    mobileHeight: "22%",
    mobileButtonTop: "75%",
  },
  {
    id: "fruits",
    title: "تعرف على الفواكه",
    description: "أهلاً بك في جزيرة الفواكه اللذيذة! هيا نتعرف على التفاح والموز والبرتقال وفوائدها لصحتنا وطاقتنا.",
    themeColor: "#D62246",
    desktopTop: "24%",
    desktopLeft: "58%",
    desktopWidth: "26%",
    desktopHeight: "34%",
    desktopButtonTop: "75%",
    mobileTop: "19.5%",
    mobileLeft: "51%",
    mobileWidth: "44%",
    mobileHeight: "22%",
    mobileButtonTop: "75%",
  },
  {
    id: "vegetables",
    title: "تعرف على الخضار",
    description: "جزيرة الخضار الطازجة! سنلعب مع الجزر والبروكلي اللطيف ونتعلم ألوانها وأهميتها لأجسامنا القوية.",
    themeColor: "#2E7D32",
    desktopTop: "39%",
    desktopLeft: "36%",
    desktopWidth: "27%",
    desktopHeight: "36%",
    desktopButtonTop: "74%",
    mobileTop: "40%",
    mobileLeft: "27%",
    mobileWidth: "46%",
    mobileHeight: "24%",
    mobileButtonTop: "75%",
  },
  {
    id: "vehicles",
    title: "تعرف على المواصلات",
    description: "أهلاً بك في جزيرة السيارات والطائرات! هيا نقود السيارة ونحلق بالطائرة ونتعرف على وسائل النقل السريعة.",
    themeColor: "#0077B6",
    desktopTop: "57%",
    desktopLeft: "7%",
    desktopWidth: "26%",
    desktopHeight: "34%",
    desktopButtonTop: "75%",
    mobileTop: "63%",
    mobileLeft: "5%",
    mobileWidth: "44%",
    mobileHeight: "24%",
    mobileButtonTop: "75%",
  },
  {
    id: "daily-actions",
    title: "تعرف على الأفعال اليومية",
    description: "جزيرة الأفعال اليومية مع النجمة اللامعة! نتعلم كيف ننظف أسناننا، نغسل أيدينا، ونرتب كتبنا وألعابنا.",
    themeColor: "#5B4FA8",
    desktopTop: "60%",
    desktopLeft: "64%",
    desktopWidth: "27%",
    desktopHeight: "34%",
    desktopButtonTop: "75%",
    mobileTop: "63%",
    mobileLeft: "51%",
    mobileWidth: "44%",
    mobileHeight: "24%",
    mobileButtonTop: "75%",
  },
];

export default function HomePage() {
  const [currentUser, setCurrentUser] = useState<import("@supabase/supabase-js").User | null>(null);
  const [activeIsland, setActiveIsland] = useState<IslandZone | null>(null);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    function checkOrientation() {
      setIsMobile(window.innerWidth < 768 || window.innerHeight > window.innerWidth);
    }
    checkOrientation();
    window.addEventListener("resize", checkOrientation);

    import("@/lib/supabase").then(async ({ supabase }) => {
      try {
        const { data } = await supabase.auth.getUser();
        if (data?.user) {
          setCurrentUser(data.user);
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

    return () => window.removeEventListener("resize", checkOrientation);
  }, []);

  async function handleSignOut() {
    const { supabase } = await import("@/lib/supabase");
    await supabase.auth.signOut();
    window.location.href = "/login";
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
          width: isMobile ? "min(100vw, 56.25vh)" : "min(100vw, 177.78vh)",
          height: isMobile ? "min(100vh, 177.78vw)" : "min(100vh, 56.25vw)",
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        {/* The Exact Image Rendered with contain */}
        <Image
          src={isMobile ? "/sky-map-mobile.png" : "/sky-map.png"}
          alt="جزر مدار الأمل التعليمية السحرية"
          fill
          priority
          sizes="(max-width: 768px) 100vw, 1920px"
          style={{
            objectFit: "contain",
            objectPosition: "center",
          }}
        />

        {/* ── Built-in Header 'مرحباً بك' hotspot in the image for mobile & desktop ── */}
        <div
          onClick={() => setShowProfileModal(true)}
          style={{
            position: "absolute",
            top: isMobile ? "1.5%" : "2%",
            left: isMobile ? "2.5%" : "1.5%",
            width: isMobile ? "24%" : "13%",
            height: isMobile ? "4.5%" : "6%",
            cursor: "pointer",
            borderRadius: "20px",
            zIndex: 35,
          }}
          title="عرض بيانات الحساب"
        />

        {/* ── Interactive Hotspots locked strictly to each Island ── */}
        {ISLAND_ZONES.map((zone) => (
          <div
            key={zone.id}
            className="island-hotspot"
            onClick={() => setActiveIsland(zone)}
            style={{
              top: isMobile ? zone.mobileTop : zone.desktopTop,
              left: isMobile ? zone.mobileLeft : zone.desktopLeft,
              width: isMobile ? zone.mobileWidth : zone.desktopWidth,
              height: isMobile ? zone.mobileHeight : zone.desktopHeight,
            }}
          >
            {/* Click to start tag */}
            <div
              className="hotspot-tag"
              style={{
                position: "absolute",
                top: isMobile ? zone.mobileButtonTop : zone.desktopButtonTop,
                left: "50%",
                transform: "translateX(-50%)",
                background: "rgba(255, 255, 255, 0.95)",
                color: zone.themeColor,
                padding: isMobile ? "3px 10px" : "5px 16px",
                borderRadius: "18px",
                fontWeight: 900,
                fontSize: isMobile ? "11px" : "clamp(11px, 1vw, 14px)",
                border: `2px solid ${zone.themeColor}`,
                boxShadow: "0 4px 12px rgba(0,0,0,0.25)",
                whiteSpace: "nowrap",
                cursor: "pointer",
              }}
            >
              <span>اضغط للبدء ✨</span>
            </div>
          </div>
        ))}
      </div>

      {/* ── User Profile Details Modal ── */}
      {showProfileModal && (
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
              padding: "30px 24px",
              textAlign: "center",
              boxShadow: "0 28px 56px rgba(0,0,0,0.35)",
              border: "4px solid #5B4FA8",
              position: "relative",
            }}
          >
            <div style={{ fontSize: 48, marginBottom: 8 }}>🧒⭐</div>
            <h2 style={{ color: "#5B4FA8", margin: "0 0 16px 0", fontSize: 22, fontWeight: 900 }}>
              بيانات البطل المسجل
            </h2>

            <div
              style={{
                background: "#F8FAFC",
                borderRadius: 20,
                padding: "16px",
                marginBottom: 20,
                textAlign: "right",
                fontSize: 14,
                display: "flex",
                flexDirection: "column",
                gap: 10,
                border: "1px solid #E2E8F0",
              }}
            >
              <div>
                <span style={{ color: "#718096", fontWeight: 700 }}>📧 البريد الإلكتروني: </span>
                <span style={{ color: "#2D3748", fontWeight: 800, direction: "ltr", display: "inline-block" }}>
                  {currentUser?.email || "غير متوفر"}
                </span>
              </div>

              <div>
                <span style={{ color: "#718096", fontWeight: 700 }}>🔐 نوع تسجيل الدخول: </span>
                <span style={{ color: "#2D3748", fontWeight: 800 }}>
                  {currentUser?.app_metadata?.provider === "google" ? "حساب Google (جيميل) 🌐" : "البريد الإلكتروني وكلمة المرور ✉️"}
                </span>
              </div>

              <div>
                <span style={{ color: "#718096", fontWeight: 700 }}>📅 تاريخ الانضمام: </span>
                <span style={{ color: "#2D3748", fontWeight: 800 }}>
                  {currentUser?.created_at ? new Date(currentUser.created_at).toLocaleDateString("ar-SA") : "اليوم"}
                </span>
              </div>
            </div>

            <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
              <button
                onClick={() => setShowProfileModal(false)}
                style={{
                  background: "#5B4FA8",
                  color: "white",
                  border: "none",
                  borderRadius: 20,
                  padding: "10px 26px",
                  fontSize: 15,
                  fontWeight: 800,
                  cursor: "pointer",
                  boxShadow: "0 4px 12px rgba(91,79,168,0.3)",
                }}
              >
                حسناً 👍
              </button>

              <button
                onClick={handleSignOut}
                style={{
                  background: "#FF5E7E",
                  color: "white",
                  border: "none",
                  borderRadius: 20,
                  padding: "10px 20px",
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
              padding: "32px 24px",
              textAlign: "center",
              boxShadow: "0 28px 56px rgba(0,0,0,0.35)",
              border: `5px solid ${activeIsland.themeColor}`,
              position: "relative",
            }}
          >
            <h2
              style={{
                color: activeIsland.themeColor,
                margin: "0 0 14px 0",
                fontSize: 24,
                fontWeight: 900,
              }}
            >
              {activeIsland.title}
            </h2>

            <p
              style={{
                color: "#4A5568",
                fontSize: 15,
                lineHeight: 1.6,
                marginBottom: 24,
                fontWeight: 600,
              }}
            >
              {activeIsland.description}
            </p>

            <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
              <button
                onClick={() => alert(`جاري فتح دروس: ${activeIsland.title}`)}
                style={{
                  background: activeIsland.themeColor,
                  color: "white",
                  border: "none",
                  borderRadius: 22,
                  padding: "11px 26px",
                  fontSize: 15,
                  fontWeight: 900,
                  cursor: "pointer",
                  boxShadow: "0 6px 18px rgba(0,0,0,0.2)",
                }}
              >
                ابدأ المغامرة الآن 🚀
              </button>

              <button
                onClick={() => setActiveIsland(null)}
                style={{
                  background: "#EDF2F7",
                  color: "#4A5568",
                  border: "none",
                  borderRadius: 22,
                  padding: "11px 20px",
                  fontSize: 14,
                  fontWeight: 800,
                  cursor: "pointer",
                }}
              >
                إغلاق ✖️
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
