import type { Metadata, Viewport } from "next";
import { Baloo_Bhaijaan_2 } from "next/font/google";
import "./globals.css";
import "./learning.css";

const arabic = Baloo_Bhaijaan_2({
  subsets: ["arabic", "latin"],
  display: "swap",
  variable: "--font-arabic",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#fcfaf7",
};

export const metadata: Metadata = {
  title: "العب واتعلم | Play & Learn",
  description: "تطبيق تعليمي وتفاعلي للأطفال لتعلم الأرقام والحروف العربية والإنجليزية باللعب والتلوين",
  manifest: "/manifest.json",
  icons: {
    icon: "/logo.png",
    apple: "/apple-touch-icon.png",
  },
  appleWebApp: {
    capable: true,
    title: "العب واتعلم",
    statusBarStyle: "default",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body className={`${arabic.variable} antialiased`}>{children}</body>
    </html>
  );
}
