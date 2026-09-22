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
  // Tablet 4:3 coordinates
  tabletTop: string;
  tabletLeft: string;
  tabletWidth: string;
  tabletHeight: string;
  tabletButtonTop: string;
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
    tabletTop: "20%",
    tabletLeft: "12%",
    tabletWidth: "27%",
    tabletHeight: "33%",
    tabletButtonTop: "74%",
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
    tabletTop: "24%",
    tabletLeft: "57%",
    tabletWidth: "28%",
    tabletHeight: "33%",
    tabletButtonTop: "75%",
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
    tabletTop: "40%",
    tabletLeft: "34%",
    tabletWidth: "30%",
    tabletHeight: "35%",
    tabletButtonTop: "74%",
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
    tabletTop: "57%",
    tabletLeft: "5%",
    tabletWidth: "29%",
    tabletHeight: "33%",
    tabletButtonTop: "75%",
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
    tabletTop: "59%",
    tabletLeft: "63%",
    tabletWidth: "30%",
    tabletHeight: "33%",
    tabletButtonTop: "75%",
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
  const [deviceType, setDeviceType] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const [checkingAuth, setCheckingAuth] = useState(true);

  // بيانات ولي الأمر
  const [parentName, setParentName] = useState("");
  const [childName, setChildName] = useState("");
  const [parentPhone, setParentPhone] = useState("");
  const [parentCity, setParentCity] = useState("");
  const [savingProfile, setSavingProfile] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
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
          width:
            deviceType === "mobile"
              ? "min(100vw, 56.28vh)"
              : deviceType === "tablet"
              ? "min(100vw, 133.33vh)"
              : "min(100vw, 177.68vh)",
          height:
            deviceType === "mobile"
              ? "min(100vh, 177.68vw)"
              : deviceType === "tablet"
              ? "min(100vh, 75vw)"
              : "min(100vh, 56.28vw)",
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        {/* The Exact Image Rendered with contain */}
        <Image
          src={
            deviceType === "mobile"
              ? "/sky-map-mobile.png"
              : deviceType === "tablet"
              ? "/sky-map-tablet.png"
              : "/sky-map.png"
          }
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
            top: deviceType === "mobile" ? "1.5%" : deviceType === "tablet" ? "1.8%" : "2%",
            left: deviceType === "mobile" ? "2.5%" : deviceType === "tablet" ? "1.8%" : "1.5%",
            width: deviceType === "mobile" ? "24%" : deviceType === "tablet" ? "16%" : "13%",
            height: deviceType === "mobile" ? "4.5%" : deviceType === "tablet" ? "5.5%" : "6%",
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
              top:
                deviceType === "mobile"
                  ? zone.mobileTop
                  : deviceType === "tablet"
                  ? zone.tabletTop
                  : zone.desktopTop,
              left:
                deviceType === "mobile"
                  ? zone.mobileLeft
                  : deviceType === "tablet"
                  ? zone.tabletLeft
                  : zone.desktopLeft,
              width:
                deviceType === "mobile"
                  ? zone.mobileWidth
                  : deviceType === "tablet"
                  ? zone.tabletWidth
                  : zone.desktopWidth,
              height:
                deviceType === "mobile"
                  ? zone.mobileHeight
                  : deviceType === "tablet"
                  ? zone.tabletHeight
                  : zone.desktopHeight,
            }}
          >
            {/* Click to start tag */}
            <div
              className="hotspot-tag"
              style={{
                position: "absolute",
                top:
                  deviceType === "mobile"
                    ? zone.mobileButtonTop
                    : deviceType === "tablet"
                    ? zone.tabletButtonTop
                    : zone.desktopButtonTop,
                left: "50%",
                transform: "translateX(-50%)",
                background: "rgba(255, 255, 255, 0.95)",
                color: zone.themeColor,
                padding: deviceType === "mobile" ? "3px 10px" : "5px 16px",
                borderRadius: "18px",
                fontWeight: 900,
                fontSize: deviceType === "mobile" ? "11px" : "clamp(11px, 1vw, 14px)",
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
