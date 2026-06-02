import type { Metadata } from "next";
import { Geist, Geist_Mono, DM_Serif_Display } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";
import EasterEggs from "@/components/EasterEggs";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const dmSerifDisplay = DM_Serif_Display({
  variable: "--font-dm-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Eron Begiqi — UX/UI Designer & Web Developer",
  description:
    "Portfolio of Eron Begiqi — UX/UI Designer and Web Developer crafting digital experiences that balance beauty with function.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${dmSerifDisplay.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-white text-[#111111]">
        <CustomCursor />
        <EasterEggs />
        {children}
      </body>
    </html>
  );
}
