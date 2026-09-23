import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
});

export const metadata: Metadata = {
  title: "مركز مدار الأمل بالمملكة العربية السعودية",
  description: "منصة تعليمية للأطفال ذوي الاحتياجات الخاصة",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Baloo+Bhaijaan+2:wght@600;700;800;900&family=Marhey:wght@700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`${geist.variable} antialiased`}>{children}</body>
    </html>
  );
}
