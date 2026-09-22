export default function DashboardPage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #a8edff, #5B4FA8)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: 24,
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ fontSize: 80 }}>🎉</div>
      <h1 style={{ color: "white", fontSize: 32, fontWeight: 900, textAlign: "center", textShadow: "0 4px 16px rgba(0,0,0,0.2)" }}>
        أهلاً وسهلاً!
      </h1>
      <p style={{ color: "rgba(255,255,255,0.85)", fontSize: 18, textAlign: "center" }}>
        مرحباً في منصة مدار الأمل السعودية 🌟
      </p>
      <a
        href="/"
        style={{
          background: "white",
          color: "#5B4FA8",
          padding: "12px 32px",
          borderRadius: 24,
          fontWeight: 700,
          textDecoration: "none",
          boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
        }}
      >
        ← رجوع لتسجيل الدخول
      </a>
    </div>
  );
}
