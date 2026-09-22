"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

/* ───── Cloud SVG ───── */
const CloudSVG = ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
  <svg viewBox="0 0 200 120" className={className} style={style} xmlns="http://www.w3.org/2000/svg">
    <defs>
      <filter id="softShadow">
        <feDropShadow dx="0" dy="4" stdDeviation="8" floodColor="rgba(91,79,168,0.15)" />
      </filter>
    </defs>
    <ellipse cx="100" cy="80" rx="85" ry="35" fill="white" filter="url(#softShadow)" />
    <ellipse cx="70" cy="65" rx="45" ry="38" fill="white" />
    <ellipse cx="115" cy="60" rx="40" ry="35" fill="white" />
    <ellipse cx="145" cy="70" rx="32" ry="28" fill="white" />
    <ellipse cx="50" cy="73" rx="28" ry="22" fill="white" />
  </svg>
);

/* ───── Star Decoration ───── */
const Star = ({ x, y, size, delay, color }: { x: number; y: number; size: number; delay: number; color: string }) => (
  <div
    className="star"
    style={{
      left: `${x}%`,
      top: `${y}%`,
      width: size,
      height: size,
      backgroundColor: color,
      animationDelay: `${delay}s`,
      animationDuration: `${1.5 + delay}s`,
    }}
  />
);

/* ───── Bubble Decoration ───── */
const Bubble = ({ x, size, delay, duration }: { x: number; size: number; delay: number; duration: number }) => (
  <div
    className="bubble"
    style={{
      left: `${x}%`,
      bottom: "-10%",
      width: size,
      height: size,
      animationDelay: `${delay}s`,
      animationDuration: `${duration}s`,
      background: `radial-gradient(circle at 30% 30%, rgba(255,255,255,0.6), rgba(91,79,168,0.1))`,
    }}
  />
);

/* ═══════════════════════════════════════════
   MAIN PAGE
═══════════════════════════════════════════ */
export default function LoginPage() {
  /* ── Animation phases ── */
  const [phase, setPhase] = useState<"clouds" | "logo" | "login">("clouds");
  const [cloudsVisible, setCloudsVisible] = useState(true);

  /* ── Form state ── */
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isRegister, setIsRegister] = useState(false);

  /* ── Supabase ── */
  const [supabase, setSupabase] = useState<import("@supabase/supabase-js").SupabaseClient | null>(null);

  useEffect(() => {
    // 1. Setup Supabase and check session
    import("@/lib/supabase").then(async (m) => {
      setSupabase(m.supabase);
      try {
        const { data } = await m.supabase.auth.getSession();
        if (data?.session) {
          window.location.href = "/dashboard";
        }
      } catch (err) {
        console.error("Auth session check error:", err);
      }
    });

    // 2. Smooth animation timing
    // Clouds vanish after 2 seconds
    const t1 = setTimeout(() => setCloudsVisible(false), 2000);
    // Logo appears
    const t2 = setTimeout(() => setPhase("logo"), 2200);
    // Login box appears directly
    const t3 = setTimeout(() => setPhase("login"), 3200);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  /* ── Handlers ── */
  async function handleEmailAuth() {
    if (!supabase) return;
    if (!email || !password) {
      setError("من فضلك أدخل البريد الإلكتروني وكلمة المرور");
      return;
    }
    setLoading(true);
    setError("");
    try {
      if (isRegister) {
        const { error: e } = await supabase.auth.signUp({
          email,
          password,
        });
        if (e) throw e;
        setError("✅ تم إنشاء الحساب بنجاح! يمكنك تسجيل الدخول الآن.");
      } else {
        const { error: e } = await supabase.auth.signInWithPassword({ email, password });
        if (e) throw e;
        window.location.href = "/dashboard";
      }
    } catch (e: unknown) {
      setError((e as { message?: string })?.message || "حدث خطأ، حاول مجدداً");
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogle() {
    if (!supabase) return;
    setLoading(true);
    setError("");
    try {
      const { error: e } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: { redirectTo: `${window.location.origin}/dashboard` },
      });
      if (e) throw e;
    } catch (e: unknown) {
      setError((e as { message?: string })?.message || "خطأ في تسجيل الدخول بجوجل");
      setLoading(false);
    }
  }

  /* ═══ RENDER ═══ */
  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100vw",
        background: "linear-gradient(160deg, #a8edff 0%, #6ec6e6 25%, #4a9fd4 55%, #3a7bc8 80%, #5B4FA8 100%)",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px 10px",
      }}
    >
      {/* ── Background stars ── */}
      <Star x={5}  y={10} size={8}  delay={0}   color="rgba(255,255,200,0.8)" />
      <Star x={15} y={25} size={5}  delay={0.5} color="rgba(255,220,150,0.7)" />
      <Star x={88} y={12} size={7}  delay={1}   color="rgba(255,255,200,0.8)" />
      <Star x={75} y={30} size={4}  delay={0.7} color="rgba(200,255,220,0.7)" />
      <Star x={92} y={55} size={6}  delay={1.2} color="rgba(255,200,255,0.7)" />
      <Star x={3}  y={65} size={5}  delay={0.3} color="rgba(255,255,150,0.6)" />
      <Star x={20} y={80} size={8}  delay={1.5} color="rgba(200,230,255,0.7)" />
      <Star x={80} y={75} size={5}  delay={0.8} color="rgba(255,200,200,0.7)" />

      {/* ── Floating bubbles ── */}
      <Bubble x={10} size={40}  delay={0}   duration={8} />
      <Bubble x={25} size={20}  delay={2}   duration={6} />
      <Bubble x={55} size={55}  delay={1}   duration={10} />
      <Bubble x={70} size={30}  delay={3}   duration={7} />
      <Bubble x={85} size={18}  delay={0.5} duration={9} />
      <Bubble x={40} size={25}  delay={4}   duration={8} />

      {/* ─────────────────────────────
           PHASE 1: CLOUDS ANIMATION
      ───────────────────────────── */}
      {cloudsVisible && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 30,
            pointerEvents: "none",
            transition: "opacity 0.6s ease",
            opacity: cloudsVisible ? 1 : 0,
          }}
        >
          {/* Center cloud - zooms in */}
          <div className="cloud-zoom" style={{ position: "absolute", width: 380, opacity: 0, animationDelay: "0s" }}>
            <CloudSVG />
          </div>
          {/* Top-left cloud */}
          <div className="cloud-zoom" style={{ position: "absolute", width: 280, top: "10%", left: "5%", opacity: 0, animationDelay: "0.2s" }}>
            <CloudSVG />
          </div>
          {/* Top-right cloud */}
          <div className="cloud-zoom" style={{ position: "absolute", width: 260, top: "8%", right: "5%", opacity: 0, animationDelay: "0.4s" }}>
            <CloudSVG />
          </div>
          {/* Bottom-left cloud */}
          <div className="cloud-zoom" style={{ position: "absolute", width: 220, bottom: "15%", left: "8%", opacity: 0, animationDelay: "0.15s" }}>
            <CloudSVG />
          </div>
          {/* Bottom-right cloud */}
          <div className="cloud-zoom" style={{ position: "absolute", width: 240, bottom: "12%", right: "6%", opacity: 0, animationDelay: "0.35s" }}>
            <CloudSVG />
          </div>
        </div>
      )}

      {/* ─────────────────────────────
           PHASE 2 & 3: LOGO + TITLE
      ───────────────────────────── */}
      {(phase === "logo" || phase === "login") && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            position: phase === "login" ? "relative" : "absolute",
            top: phase === "login" ? undefined : "50%",
            transform: phase === "login" ? undefined : "translateY(-50%)",
            zIndex: 20,
            marginBottom: phase === "login" ? 18 : 0,
            transition: "all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)",
          }}
        >
          {/* Logo */}
          <div
            className="logo-reveal"
            style={{
              width: phase === "login" ? 120 : 190,
              height: phase === "login" ? 75 : 115,
              position: "relative",
              filter: "drop-shadow(0 8px 24px rgba(91,79,168,0.4))",
              transition: "all 0.5s ease",
            }}
          >
            <Image src="/logo.png" alt="Orbit of Hope" fill style={{ objectFit: "contain" }} priority />
          </div>

          {/* School name */}
          <div
            className="title-slide"
            style={{
              textAlign: "center",
              marginTop: 6,
            }}
          >
            <h1
              style={{
                margin: 0,
                fontWeight: 900,
                color: "white",
                textShadow: "0 4px 20px rgba(0,0,0,0.3), 0 2px 4px rgba(0,0,0,0.2)",
                letterSpacing: "0.05em",
                lineHeight: 1.2,
                fontSize: phase === "login" ? "clamp(18px, 4vw, 26px)" : "clamp(24px, 5vw, 40px)",
              }}
            >
              مدار الأمل السعودية
            </h1>
            {phase !== "login" && (
              <p
                style={{
                  margin: "8px 0 0",
                  color: "rgba(255,255,255,0.9)",
                  fontSize: "clamp(12px, 2.5vw, 17px)",
                  fontWeight: 600,
                  textShadow: "0 2px 8px rgba(0,0,0,0.2)",
                }}
              >
                منصة تعليمية للأطفال ذوي الاحتياجات الخاصة
              </p>
            )}
          </div>
        </div>
      )}

      {/* ─────────────────────────────
           PHASE 3: LOGIN BOX
      ───────────────────────────── */}
      {phase === "login" && (
        <div
          className="login-reveal glass-card"
          style={{
            width: "min(420px, 92vw)",
            borderRadius: 28,
            padding: "26px 28px 22px",
            position: "relative",
            zIndex: 20,
          }}
        >
          {/* Decorative top dots */}
          <div style={{ display: "flex", justifyContent: "center", gap: 8, marginBottom: 16 }}>
            {["#E07820", "#6AAD3D", "#5B4FA8", "#3AB5C8", "#F5A623"].map((c, i) => (
              <div key={i} style={{ width: 10, height: 10, borderRadius: "50%", background: c }} />
            ))}
          </div>

          <h2
            style={{
              textAlign: "center",
              color: "#5B4FA8",
              margin: "0 0 18px",
              fontSize: 21,
              fontWeight: 800,
            }}
          >
            {isRegister ? "✨ إنشاء حساب جديد" : "👋 أهلاً بك!"}
          </h2>

          {/* Error message */}
          {error && (
            <div
              style={{
                background: error.startsWith("✅") ? "rgba(106,173,61,0.15)" : "rgba(220,53,69,0.12)",
                border: `2px solid ${error.startsWith("✅") ? "#6AAD3D" : "#dc3545"}`,
                borderRadius: 16,
                padding: "8px 14px",
                marginBottom: 14,
                color: error.startsWith("✅") ? "#4a7a28" : "#c0392b",
                fontSize: 13,
                textAlign: "center",
              }}
            >
              {error}
            </div>
          )}

          {/* ─ Email Form ─ */}
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{ position: "relative" }}>
              <span style={{ position: "absolute", right: 16, top: "50%", transform: "translateY(-50%)", fontSize: 17 }}>📧</span>
              <input
                className="kid-input"
                type="email"
                placeholder="البريد الإلكتروني"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ paddingRight: 44 }}
              />
            </div>

            <div style={{ position: "relative" }}>
              <span style={{ position: "absolute", right: 16, top: "50%", transform: "translateY(-50%)", fontSize: 17 }}>🔒</span>
              <input
                className="kid-input"
                type={showPass ? "text" : "password"}
                placeholder="كلمة المرور"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ paddingRight: 44, paddingLeft: 44 }}
                onKeyDown={(e) => e.key === "Enter" && handleEmailAuth()}
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                style={{
                  position: "absolute",
                  left: 14,
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontSize: 17,
                  padding: 0,
                }}
              >
                {showPass ? "🙈" : "👁️"}
              </button>
            </div>

            <button className="kid-btn-primary" onClick={handleEmailAuth} disabled={loading}>
              {loading ? "⏳ جارٍ التحميل..." : isRegister ? "✨ إنشاء الحساب" : "🚀 تسجيل الدخول"}
            </button>
          </div>

          {/* ─ Divider ─ */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              margin: "16px 0",
              color: "rgba(91,79,168,0.6)",
              fontSize: 13,
              fontWeight: 600,
            }}
          >
            <div style={{ flex: 1, height: 2, background: "rgba(91,79,168,0.2)", borderRadius: 1 }} />
            أو
            <div style={{ flex: 1, height: 2, background: "rgba(91,79,168,0.2)", borderRadius: 1 }} />
          </div>

          {/* ─ Google button ─ */}
          <button className="kid-btn-google" onClick={handleGoogle} disabled={loading}>
            <svg width="20" height="20" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            الدخول بـ Google
          </button>

          {/* ─ Switch Register / Login ─ */}
          <div style={{ textAlign: "center", marginTop: 14 }}>
            <button
              onClick={() => { setIsRegister(!isRegister); setError(""); }}
              style={{
                background: "none",
                border: "none",
                color: "#5B4FA8",
                fontWeight: 700,
                cursor: "pointer",
                fontSize: 13,
                textDecoration: "underline",
                padding: 0,
              }}
            >
              {isRegister ? "لديك حساب؟ سجّل دخولك" : "ليس لديك حساب؟ أنشئ حساباً الآن"}
            </button>
          </div>

          {/* Footer decoration */}
          <div style={{ textAlign: "center", marginTop: 12, fontSize: 18, letterSpacing: 5 }}>
            ⭐🌙✨🌟💫
          </div>
        </div>
      )}
    </div>
  );
}
