import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
});

export const metadata: Metadata = {
  title: "مدار الأمل السعودية",
  description: "منصة تعليمية للأطفال ذوي الاحتياجات الخاصة",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body className={`${geist.variable} antialiased`}>{children}</body>
    </html>
  );
}
