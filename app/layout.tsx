import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import ServiceWorkerRegistration from "@/components/ServiceWorkerRegistration";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#132018",
};

export const metadata: Metadata = {
  title: "Bet the Hand — Mahjong Betting Game",
  description:
    "A hi-lo betting game using Mahjong tiles with dynamic tile values.",
  openGraph: {
    title: "Bet the Hand",
    description:
      "Read the hand. Bet higher or lower. Survive as long as your reads hold up.",
    images: ["/og-image.png"],
  },
  other: {
    "apple-mobile-web-app-title": "Hi-Lo",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body suppressHydrationWarning className="h-screen overflow-hidden bg-linear-to-br from-[#1A2E25] via-[#132018] to-[#0D1610] antialiased">
        <ServiceWorkerRegistration />
        {children}
      </body>
    </html>
  );
}
