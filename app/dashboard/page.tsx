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
    // Desktop
    desktopTop: "18%",
    desktopLeft: "7%",
    desktopWidth: "24%",
    desktopHeight: "36%",
    desktopButtonTop: "75%",
    // Mobile (Top Left)
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
    // Desktop
    desktopTop: "18%",
    desktopLeft: "37.5%",
    desktopWidth: "24%",
    desktopHeight: "36%",
    desktopButtonTop: "75%",
    // Mobile (Top Right)
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
    // Desktop
    desktopTop: "14%",
    desktopLeft: "68%",
    desktopWidth: "25%",
    desktopHeight: "38%",
    desktopButtonTop: "73%",
    // Mobile (Center)
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
    // Desktop
    desktopTop: "54%",
    desktopLeft: "22%",
    desktopWidth: "26%",
    desktopHeight: "36%",
    desktopButtonTop: "75%",
    // Mobile (Bottom Left)
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
    // Desktop
    desktopTop: "54%",
    desktopLeft: "53%",
    desktopWidth: "26%",
    desktopHeight: "36%",
    desktopButtonTop: "75%",
    // Mobile (Bottom Right)
    mobileTop: "63%",
    mobileLeft: "51%",
    mobileWidth: "44%",
    mobileHeight: "24%",
    mobileButtonTop: "75%",
  },
];

export default function DashboardPage() {
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [activeIsland, setActiveIsland] = useState<IslandZone | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Detect mobile orientation / viewport
    function checkOrientation() {
      setIsMobile(window.innerWidth < 768 || window.innerHeight > window.innerWidth);
    }
    checkOrientation();
    window.addEventListener("resize", checkOrientation);

    import("@/lib/supabase").then(async ({ supabase }) => {
      const { data } = await supabase.auth.getUser();
      if (data?.user?.email) {
        setUserEmail(data.user.email);
      }
    });

    return () => window.removeEventListener("resize", checkOrientation);
  }, []);

  async function handleSignOut() {
    const { supabase } = await import("@/lib/supabase");
    await supabase.auth.signOut();
    window.location.href = "/";
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
        <button
          onClick={handleSignOut}
          style={{
            background: "#FF5E7E",
            color: "white",
            border: "2px solid white",
            borderRadius: "20px",
            padding: "5px 14px",
            fontSize: "12px",
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

        {userEmail && (
          <div
            style={{
              background: "rgba(255, 255, 255, 0.95)",
              padding: "5px 12px",
              borderRadius: "20px",
              color: "#5B4FA8",
              fontWeight: 800,
              fontSize: "12px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              border: "1.5px solid rgba(91,79,168,0.25)",
            }}
          >
            مرحباً: <span style={{ direction: "ltr" }}>{userEmail.split("@")[0]}</span>
          </div>
        )}
      </header>

      {/* ── Interactive Viewport Canvas ── */}
      {/* On desktop: 16:9 bounds | On mobile: 9:16 portrait bounds */}
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
