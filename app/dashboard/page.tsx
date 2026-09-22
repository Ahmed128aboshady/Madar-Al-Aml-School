"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface IslandZone {
  id: string;
  title: string;
  description: string;
  themeColor: string;
  top: string;
  left: string;
  width: string;
  height: string;
  buttonTop: string;
}

const ISLAND_ZONES: IslandZone[] = [
  {
    id: "animals",
    title: "تعرف على الحيوانات",
    description: "مرحباً بك في جزيرة الأسد والأصدقاء! سنكتشف سوياً أصوات الحيوانات وأشكالها الجميلة بطريقة سهلة وممتعة.",
    themeColor: "#E07820",
    top: "18%",
    left: "7%",
    width: "24%",
    height: "36%",
    buttonTop: "72%",
  },
  {
    id: "fruits",
    title: "تعرف على الفواكه",
    description: "أهلاً بك في جزيرة الفواكه اللذيذة! هيا نتعرف على التفاح والموز والبرتقال وفوائدها لصحتنا وطاقتنا.",
    themeColor: "#D62246",
    top: "18%",
    left: "37.5%",
    width: "24%",
    height: "36%",
    buttonTop: "72%",
  },
  {
    id: "vegetables",
    title: "تعرف على الخضار",
    description: "جزيرة الخضار الطازجة! سنلعب مع الجزر والبروكلي اللطيف ونتعلم ألوانها وأهميتها لأجسامنا القوية.",
    themeColor: "#2E7D32",
    top: "14%",
    left: "68%",
    width: "25%",
    height: "38%",
    buttonTop: "70%",
  },
  {
    id: "vehicles",
    title: "تعرف على المواصلات",
    description: "أهلاً بك في جزيرة السيارات والطائرات! هيا نقود السيارة ونحلق بالطائرة ونتعرف على وسائل النقل السريعة.",
    themeColor: "#0077B6",
    top: "54%",
    left: "22%",
    width: "26%",
    height: "36%",
    buttonTop: "73%",
  },
  {
    id: "daily-actions",
    title: "تعرف على الأفعال اليومية",
    description: "جزيرة الأفعال اليومية مع النجمة اللامعة! نتعلم كيف ننظف أسناننا، نغسل أيدينا، ونرتب كتبنا وألعابنا.",
    themeColor: "#5B4FA8",
    top: "54%",
    left: "53%",
    width: "26%",
    height: "36%",
    buttonTop: "73%",
  },
];

export default function DashboardPage() {
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [activeIsland, setActiveIsland] = useState<IslandZone | null>(null);

  useEffect(() => {
    import("@/lib/supabase").then(async ({ supabase }) => {
      const { data } = await supabase.auth.getUser();
      if (data?.user?.email) {
        setUserEmail(data.user.email);
      }
    });
  }, []);

  async function handleSignOut() {
    const { supabase } = await import("@/lib/supabase");
    await supabase.auth.signOut();
    window.location.href = "/";
  }

  return (
    <div
      style={{
        position: "relative",
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        background: "#78D4FA",
      }}
    >
      {/* ── Fullscreen Background Image ── */}
      <Image
        src="/sky-map.png"
        alt="جزر مدار الأمل التعليمية السحرية"
        fill
        priority
        sizes="100vw"
        style={{
          objectFit: "cover",
          objectPosition: "center",
        }}
      />

      {/* ── Top Bar Controls (Floating over the image) ── */}
      <header
        style={{
          position: "absolute",
          top: "16px",
          left: "20px",
          right: "20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          zIndex: 40,
          pointerEvents: "none",
        }}
      >
        {/* Sign Out Button (on left in LTR context, accessible) */}
        <button
          onClick={handleSignOut}
          style={{
            pointerEvents: "auto",
            background: "#FF5E7E",
            color: "white",
            border: "2px solid white",
            borderRadius: "24px",
            padding: "8px 22px",
            fontSize: "14px",
            fontWeight: 800,
            cursor: "pointer",
            boxShadow: "0 6px 16px rgba(0,0,0,0.25)",
            transition: "transform 0.2s, background-color 0.2s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.06)")}
          onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
          تسجيل الخروج 🚪
        </button>

        {/* User Pill if logged in */}
        {userEmail && (
          <div
            style={{
              pointerEvents: "auto",
              background: "rgba(255, 255, 255, 0.92)",
              padding: "7px 18px",
              borderRadius: "24px",
              color: "#5B4FA8",
              fontWeight: 800,
              fontSize: "13px",
              boxShadow: "0 4px 14px rgba(0,0,0,0.15)",
              border: "2px solid rgba(91,79,168,0.25)",
              backdropFilter: "blur(6px)",
            }}
          >
            مرحباً بك: <span style={{ direction: "ltr" }}>{userEmail.split("@")[0]}</span>
          </div>
        )}
      </header>

      {/* ── Interactive Clickable Hotspots over each island ── */}
      {ISLAND_ZONES.map((zone) => (
        <div
          key={zone.id}
          className="island-hotspot"
          onClick={() => setActiveIsland(zone)}
          style={{
            top: zone.top,
            left: zone.left,
            width: zone.width,
            height: zone.height,
          }}
        >
          {/* Subtle pulsating call-to-action button */}
          <div
            className="hotspot-tag"
            style={{
              position: "absolute",
              top: zone.buttonTop,
              left: "50%",
              transform: "translateX(-50%)",
              background: "rgba(255, 255, 255, 0.95)",
              color: zone.themeColor,
              padding: "7px 20px",
              borderRadius: "22px",
              fontWeight: 900,
              fontSize: "clamp(12px, 1.1vw, 16px)",
              border: `2px solid ${zone.themeColor}`,
              boxShadow: "0 8px 18px rgba(0,0,0,0.25)",
              whiteSpace: "nowrap",
              cursor: "pointer",
            }}
          >
            اضغط للبدء ✨
          </div>
        </div>
      ))}

      {/* ── Modal Pop-up on Island Click ── */}
      {activeIsland && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(10, 35, 70, 0.55)", backdropFilter: "blur(8px)" }}
        >
          <div
            style={{
              background: "white",
              borderRadius: 36,
              maxWidth: 460,
              width: "100%",
              padding: "36px 30px",
              textAlign: "center",
              boxShadow: "0 28px 56px rgba(0,0,0,0.35)",
              border: `5px solid ${activeIsland.themeColor}`,
              position: "relative",
            }}
          >
            <h2
              style={{
                color: activeIsland.themeColor,
                margin: "0 0 16px 0",
                fontSize: 26,
                fontWeight: 900,
              }}
            >
              {activeIsland.title}
            </h2>

            <p
              style={{
                color: "#4A5568",
                fontSize: 16,
                lineHeight: 1.7,
                marginBottom: 28,
                fontWeight: 600,
              }}
            >
              {activeIsland.description}
            </p>

            <div style={{ display: "flex", gap: 14, justifyContent: "center" }}>
              <button
                onClick={() => alert(`جاري فتح دروس: ${activeIsland.title}`)}
                style={{
                  background: activeIsland.themeColor,
                  color: "white",
                  border: "none",
                  borderRadius: 24,
                  padding: "13px 32px",
                  fontSize: 16,
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
                  borderRadius: 24,
                  padding: "13px 24px",
                  fontSize: 15,
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
