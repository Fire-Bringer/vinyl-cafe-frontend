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
    // Update apple icon array to include all sizes
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
      { url: '/apple-touch-icon-152x152.png', sizes: '152x152', type: 'image/png' },
      { url: '/apple-touch-icon-120x120.png', sizes: '120x120', type: 'image/png' },
    ],
  },
  appleWebApp: {
    title: "Vinyl Cafe",
    statusBarStyle: "black-translucent",
    startupImage: [
      { url: '/apple-touch-startup-image.png', media: '(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2)' }
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
        <link rel="icon" href="/vinyl.svg?v=4" type="image/svg+xml" />
        <link rel="alternate icon" href="/favicon.ico?v=4" />

        {/* Apple specific icons - using your vinyl.png as the base */}
        <link rel="apple-touch-icon" href="/apple-touch-icon.png?v=4" sizes="180x180" />
        <link rel="apple-touch-icon" href="/apple-touch-icon-152x152.png?v=4" sizes="152x152" />
        <link rel="apple-touch-icon" href="/apple-touch-icon-120x120.png?v=4" sizes="120x120" />
        <link rel="mask-icon" href="/vinyl.svg?v=4" color="#000000" />

        {/* iOS status bar style */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Vinyl Cafe" />

        {/* Force cache busting with timestamp (optional, remove in production) */}
        <meta httpEquiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
        <meta httpEquiv="Pragma" content="no-cache" />
        <meta httpEquiv="Expires" content="0" />
      </head>
      <body
        className={`${caprasimo.variable} ${kiwiMaru.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
