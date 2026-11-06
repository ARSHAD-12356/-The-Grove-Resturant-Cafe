import type { Metadata, Viewport } from "next";
import { Lora, Newsreader, Source_Sans_3 } from "next/font/google";
import "./globals.css";

const newsreader = Newsreader({
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
  variable: "--font-newsreader",
  display: "swap",
});

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-lora",
  display: "swap",
});

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-source-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "The Grove | Restaurant & Café",
  description:
    "Savor chef-crafted dishes, handcrafted beverages, and a warm, luxurious dining experience — all in one place.",
};

export const viewport: Viewport = {
  themeColor: "#0a0803",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`motion-safe:scroll-smooth ${newsreader.variable} ${lora.variable} ${sourceSans.variable}`}>
      <body className="font-serif antialiased">{children}</body>
    </html>
  );
}
