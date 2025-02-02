import type { Metadata } from "next";
import { Caprasimo, Kiwi_Maru } from "next/font/google";
import "./globals.css";
// For Sole ScrollTrigger Registration
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Preempt Check for SSR
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Font Configurations
const caprasimo = Caprasimo({
  variable: "--font-caprasimo",
  subsets: ["latin"],
  weight: ['400'],
});

const kiwiMaru = Kiwi_Maru({
  variable: "--font-kiwi-maru",
  subsets: ["latin"],
  weight: ['400'],
});

export const metadata: Metadata = {
  title: "Vinyl Cafe",
  description: "A practice Next.js website by Rashad DuPaty",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${caprasimo.variable} ${kiwiMaru.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
