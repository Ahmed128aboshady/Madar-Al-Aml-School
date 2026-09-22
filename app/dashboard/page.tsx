"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface IslandItem {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  gradientTop: string;
  gradientBottom: string;
  borderColor: string;
  animationClass: string;
  badges: string[];
}

const ISLANDS: IslandItem[] = [
  {
    id: "animals",
    title: "تعرف على الحيوانات",
    subtitle: "أصوات وأشكال أصدقائنا الحيوانات 🦁",
    icon: "🦁",
    gradientTop: "#FF8C42",
    gradientBottom: "#E0533C",
    borderColor: "#FFB074",
    animationClass: "island-float-1",
    badges: ["🐰 أرنب", "🐘 فيل", "🦒 زرافة"],
  },
  {
    id: "fruits",
    title: "تعرف على الفواكه",
    subtitle: "فواكه لذيذة وصحية ومفيدة 🍓",
    icon: "🍎",
    gradientTop: "#FF5376",
    gradientBottom: "#D62246",
    borderColor: "#FFA3B5",
    animationClass: "island-float-2",
    badges: ["🍌 موز", "🍇 عنب", "🍊 برتقال"],
  },
  {
    id: "vegetables",
    title: "تعرف على الخضار",
    subtitle: "خضروات طازجة وقوية للجسم 🥕",
    icon: "🥕",
    gradientTop: "#4CAF50",
    gradientBottom: "#2E7D32",
    borderColor: "#81C784",
    animationClass: "island-float-3",
    badges: ["🥒 خيار", "🍅 طماطم", "🥦 بروكلي"],
  },
  {
    id: "vehicles",
    title: "تعرف على المواصلات",
    subtitle: "سيارات وطائرات وقطارات سريعة 🚗",
    icon: "🚀",
    gradientTop: "#00B4D8",
    gradientBottom: "#0077B6",
    borderColor: "#90E0EF",
    animationClass: "island-float-4",
    badges: ["🚗 سيارة", "✈️ طيارة", "🚂 قطار"],
  },
  {
    id: "daily-actions",
    title: "تعرف على الأفعال اليومية",
    subtitle: "أغسل يدي، أنام مبكراً، وأبتسم 😊",
    icon: "🌟",
    gradientTop: "#8E44AD",
    gradientBottom: "#5B4FA8",
    borderColor: "#BB8FCE",
    animationClass: "island-float-5",
    badges: ["🧼 نظافة", "🛌 نوم", "🎒 مدرسة"],
  },
];

/* ── Cloud Graphic ── */
function SoftCloud({ width, style, className }: { width: number; style?: React.CSSProperties; className?: string }) {
  return (
    <div style={{ width, ...style }} className={className}>
      <svg viewBox="0 0 200 120" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "auto" }}>
        <defs>
          <filter id="cShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="6" stdDeviation="10" floodColor="rgba(0,0,0,0.08)" />
          </filter>
        </defs>
        <ellipse cx="100" cy="85" rx="85" ry="32" fill="white" filter="url(#cShadow)" />
        <ellipse cx="65" cy="65" rx="42" ry="35" fill="white" />
        <ellipse cx="115" cy="60" rx="38" ry="34" fill="white" />
        <ellipse cx="145" cy="72" rx="30" ry="26" fill="white" />
        <ellipse cx="45" cy="75" rx="26" ry="22" fill="white" />
      </svg>
    </div>
  );
}

export default function DashboardPage() {
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [selectedIsland, setSelectedIsland] = useState<IslandItem | null>(null);

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
        minHeight: "100vh",
        width: "100vw",
        background: "linear-gradient(180deg, #6ec6e6 0%, #a0e1ff 35%, #d8f3ff 75%, #ffffff 100%)",
        position: "relative",
        overflowX: "hidden",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      {/* ── Sun with gentle rotation ── */}
      <div
        className="sun-rotate"
        style={{
          position: "fixed",
          top: "-60px",
          left: "-60px",
          width: "220px",
          height: "220px",
          borderRadius: "50%",
          background: "radial-gradient(circle, #FFE066 30%, #FFB703 70%, rgba(255,183,3,0) 100%)",
          filter: "blur(2px)",
          zIndex: 1,
          pointerEvents: "none",
        }}
      />

      {/* ── Background Floating Clouds ── */}
      <SoftCloud
        width={340}
        className="cloud-drift-1"
        style={{ position: "fixed", top: "40px", left: "6%", opacity: 0.85, zIndex: 1, pointerEvents: "none" }}
      />
      <SoftCloud
        width={260}
        className="cloud-drift-2"
        style={{ position: "fixed", top: "120px", right: "8%", opacity: 0.9, zIndex: 1, pointerEvents: "none" }}
      />
      <SoftCloud
        width={420}
        className="cloud-drift-1"
        style={{ position: "fixed", top: "48%", left: "45%", opacity: 0.75, zIndex: 1, pointerEvents: "none" }}
      />

      {/* ── Top Header Bar ── */}
      <header
        style={{
          position: "relative",
          zIndex: 20,
          padding: "16px 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 12,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div
            style={{
              width: 65,
              height: 48,
              position: "relative",
              filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.15))",
            }}
          >
            <Image src="/logo.png" alt="مدار الأمل" fill style={{ objectFit: "contain" }} priority />
          </div>
          <div>
            <h1
              style={{
                margin: 0,
                color: "#5B4FA8",
                fontSize: "clamp(20px, 3.5vw, 28px)",
                fontWeight: 900,
                textShadow: "0 2px 4px rgba(255,255,255,0.8)",
              }}
            >
              مدار الأمل السعودية ✨
            </h1>
            <p style={{ margin: 0, color: "#3A7BC8", fontSize: "14px", fontWeight: 700 }}>
              رحلة الاستكشاف والتعلم للأبطال الصغار 🌈
            </p>
          </div>
        </div>

        {/* User Info & Logout Button */}
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          {userEmail && (
            <div
              style={{
                background: "rgba(255,255,255,0.85)",
                padding: "8px 16px",
                borderRadius: 20,
                border: "2px solid #5B4FA8",
                color: "#5B4FA8",
                fontSize: 13,
                fontWeight: 700,
                display: "flex",
                alignItems: "center",
                gap: 6,
                boxShadow: "0 4px 12px rgba(91,79,168,0.1)",
              }}
            >
              <span>👋 مرحباً:</span>
              <span style={{ direction: "ltr" }}>{userEmail.split("@")[0]}</span>
            </div>
          )}

          <button
            onClick={handleSignOut}
            style={{
              background: "#FF5E7E",
              color: "white",
              border: "none",
              borderRadius: 20,
              padding: "9px 18px",
              fontSize: 14,
              fontWeight: 800,
              cursor: "pointer",
              boxShadow: "0 4px 12px rgba(255,94,126,0.3)",
              transition: "transform 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            خروج 🚪
          </button>
        </div>
      </header>

      {/* ── Main Sky Islands Exploration ── */}
      <main
        style={{
          position: "relative",
          zIndex: 10,
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "20px 20px 60px",
          maxWidth: "1350px",
          margin: "0 auto",
          width: "100%",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: 35 }}>
          <span
            style={{
              background: "rgba(255, 255, 255, 0.9)",
              padding: "6px 20px",
              borderRadius: 30,
              color: "#E07820",
              fontWeight: 800,
              fontSize: 15,
              border: "2px dashed #E07820",
              boxShadow: "0 4px 14px rgba(224,120,32,0.15)",
            }}
          >
            ☁️ اختر جزيرتك السحرية وابدأ اللعب والتعلم 🎈
          </span>
        </div>

        {/* Islands Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "28px",
            width: "100%",
            justifyItems: "center",
          }}
        >
          {ISLANDS.map((island) => (
            <div
              key={island.id}
              className={`${island.animationClass} island-interactive-card`}
              onClick={() => setSelectedIsland(island)}
              style={{
                width: "100%",
                maxWidth: 260,
                position: "relative",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              {/* Island Floating Land (Sky Island) */}
              <div
                style={{
                  width: "100%",
                  borderRadius: "28px 28px 38px 38px",
                  background: `linear-gradient(145deg, ${island.gradientTop}, ${island.gradientBottom})`,
                  border: `4px solid ${island.borderColor}`,
                  boxShadow: "0 18px 30px rgba(0,0,0,0.18), inset 0 3px 6px rgba(255,255,255,0.4)",
                  padding: "24px 18px 20px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                  position: "relative",
                  zIndex: 2,
                }}
              >
                {/* Island Big Icon */}
                <div
                  style={{
                    width: 86,
                    height: 86,
                    borderRadius: "50%",
                    background: "rgba(255,255,255,0.95)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 44,
                    boxShadow: "0 8px 16px rgba(0,0,0,0.15)",
                    marginBottom: 12,
                    border: `3px solid ${island.borderColor}`,
                  }}
                >
                  {island.icon}
                </div>

                {/* Island Title */}
                <h3
                  style={{
                    margin: "0 0 6px 0",
                    color: "white",
                    fontSize: 20,
                    fontWeight: 900,
                    textShadow: "0 2px 4px rgba(0,0,0,0.3)",
                  }}
                >
                  {island.title}
                </h3>

                {/* Island Description */}
                <p
                  style={{
                    margin: "0 0 14px 0",
                    color: "rgba(255,255,255,0.92)",
                    fontSize: 13,
                    fontWeight: 600,
                    lineHeight: 1.4,
                  }}
                >
                  {island.subtitle}
                </p>

                {/* Mini Badges / Preview */}
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap", justifyContent: "center" }}>
                  {island.badges.map((b, i) => (
                    <span
                      key={i}
                      style={{
                        background: "rgba(255,255,255,0.25)",
                        color: "white",
                        padding: "3px 8px",
                        borderRadius: 12,
                        fontSize: 11,
                        fontWeight: 700,
                        border: "1px solid rgba(255,255,255,0.4)",
                      }}
                    >
                      {b}
                    </span>
                  ))}
                </div>

                {/* Start Button */}
                <button
                  style={{
                    marginTop: 16,
                    background: "white",
                    color: island.gradientBottom,
                    border: "none",
                    borderRadius: 20,
                    padding: "8px 22px",
                    fontWeight: 900,
                    fontSize: 14,
                    boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                  }}
                >
                  <span>استكشف</span>
                  <span>✨</span>
                </button>
              </div>

              {/* Cloud Base Under Island (الجزيرة في السما وتحتها سحاب) */}
              <div
                style={{
                  marginTop: -26,
                  zIndex: 1,
                  width: "115%",
                  display: "flex",
                  justifyContent: "center",
                  filter: "drop-shadow(0 12px 14px rgba(58,123,200,0.22))",
                }}
              >
                <svg viewBox="0 0 220 80" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "auto" }}>
                  <ellipse cx="110" cy="50" rx="90" ry="24" fill="white" />
                  <ellipse cx="65" cy="40" rx="45" ry="25" fill="white" />
                  <ellipse cx="145" cy="42" rx="42" ry="24" fill="white" />
                  <ellipse cx="110" cy="30" rx="48" ry="26" fill="white" />
                  <ellipse cx="30" cy="52" rx="25" ry="16" fill="#F0F8FF" />
                  <ellipse cx="185" cy="50" rx="25" ry="16" fill="#F0F8FF" />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* ── Giant Fluffy Clouds at Bottom ── */}
      <div
        style={{
          position: "relative",
          width: "100%",
          lineHeight: 0,
          zIndex: 15,
          marginTop: "auto",
        }}
      >
        <svg
          viewBox="0 0 1440 220"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ width: "100%", height: "auto", display: "block" }}
        >
          <path
            d="M0 140C80 110 160 110 240 130C320 150 400 150 480 120C560 90 640 90 720 115C800 140 880 140 960 110C1040 80 1120 85 1200 120C1280 155 1360 145 1440 130V220H0V140Z"
            fill="rgba(255,255,255,0.7)"
          />
          <path
            d="M0 165C70 140 150 140 220 155C300 170 380 170 460 145C540 120 620 120 700 145C780 170 860 170 940 145C1020 120 1100 125 1180 155C1260 185 1340 175 1440 160V220H0V165Z"
            fill="#FFFFFF"
          />
        </svg>
      </div>

      {/* ── Interactive Modal for Island Click ── */}
      {selectedIsland && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(0, 30, 60, 0.45)", backdropFilter: "blur(6px)" }}
        >
          <div
            style={{
              background: "white",
              borderRadius: 36,
              maxWidth: 420,
              width: "100%",
              padding: "36px 28px",
              textAlign: "center",
              boxShadow: "0 24px 48px rgba(0,0,0,0.25)",
              border: `4px solid ${selectedIsland.borderColor}`,
              position: "relative",
            }}
          >
            <div style={{ fontSize: 64, marginBottom: 12 }}>{selectedIsland.icon}</div>
            <h2 style={{ color: selectedIsland.gradientBottom, margin: "0 0 10px 0", fontSize: 24, fontWeight: 900 }}>
              {selectedIsland.title}
            </h2>
            <p style={{ color: "#555", fontSize: 16, lineHeight: 1.5, marginBottom: 24, fontWeight: 600 }}>
              أهلاً بك يا بطل في هذه الجزيرة! سنبدأ معاً مغامرة تعليمية تفاعلية ممتعة بالصوت والصورة والألعاب الذكية 🎈
            </p>
            <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
              <button
                onClick={() => alert(`قريباً: فتح دروس وأنشطة ${selectedIsland.title} 🎮`)}
                style={{
                  background: `linear-gradient(135deg, ${selectedIsland.gradientTop}, ${selectedIsland.gradientBottom})`,
                  color: "white",
                  border: "none",
                  borderRadius: 22,
                  padding: "12px 28px",
                  fontSize: 16,
                  fontWeight: 900,
                  cursor: "pointer",
                  boxShadow: "0 6px 16px rgba(0,0,0,0.15)",
                }}
              >
                ابدأ المغامرة 🚀
              </button>
              <button
                onClick={() => setSelectedIsland(null)}
                style={{
                  background: "#F0F2F5",
                  color: "#666",
                  border: "none",
                  borderRadius: 22,
                  padding: "12px 22px",
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
