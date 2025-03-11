import type { Metadata } from "next";
import { Caprasimo, Kiwi_Maru } from "next/font/google";
import "./globals.css";

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
  icons: {
    icon: [
      { url: '/vinyl.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: 'any' } // Fallback for browsers that don't support SVG
    ],
    apple: [
      { url: '/vinyl.png', sizes: '180x180', type: 'image/png' }
    ],
  },
  appleWebApp: {
    title: "Vinyl Cafe",
    statusBarStyle: "black-translucent",
    startupImage: [
      { url: '/vinyl.png', media: '(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2)' }
    ]
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Force browsers to use the new favicon by adding version parameter */}
        <link rel="icon" href="/vinyl.svg?v=2" type="image/svg+xml" />
        <link rel="alternate icon" href="/favicon.ico?v=2" />

        {/* Apple specific icons */}
        <link rel="apple-touch-icon" href="/apple-icon.png?v=2" />
        <link rel="mask-icon" href="/vinyl.svg?v=2" color="#000000" />

        {/* iOS status bar style */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Vinyl Cafe" />
      </head>
      <body
        className={`${caprasimo.variable} ${kiwiMaru.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
