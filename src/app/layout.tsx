import type { Metadata } from "next";
import { Syne, DM_Sans, Caveat } from "next/font/google";
import "./globals.css";
import FeedbackWidget from "@/components/FeedbackWidget";
import { ToastProvider } from "@/components/Toast";

const syne = Syne({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const dmSans = DM_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const caveat = Caveat({
  variable: "--font-handwritten",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "LoopEasy | Video Channels Curated by AI, Built by Creators",
  description: "Discover endless video channels or create your own. Watch free or go Premium. Creators earn 70% of ad revenue. Your taste is your talent.",
  keywords: ["video channels", "curated content", "creator economy", "video curation", "ai video", "fitness tv", "gym content"],
  authors: [{ name: "LoopEasy" }],
  manifest: "/manifest.json",
  openGraph: {
    title: "LoopEasy | Video Channels Curated by AI, Built by Creators",
    description: "Discover endless video channels or create your own. Creators earn 70% of ad revenue. Your taste is your talent.",
    url: "https://loopeasy.com",
    siteName: "LoopEasy",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://loopeasy.com/opengraph-image",
        width: 1200,
        height: 630,
        alt: "LoopEasy - Video Channels Curated by AI",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "LoopEasy | Video Channels Curated by AI",
    description: "Discover endless video channels or create your own. Creators earn 70% of ad revenue.",
    images: ["https://loopeasy.com/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
  },
  other: {
    "theme-color": "#6366f1",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
  },
};

// JSON-LD structured data for rich search results
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "LoopEasy",
  "description": "Video Channels Curated by AI, Built by Creators. Discover endless video channels or create your own.",
  "url": "https://loopeasy.com",
  "applicationCategory": "EntertainmentApplication",
  "operatingSystem": "Web",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD",
    "description": "Free to watch, creators earn 70% revenue share"
  },
  "creator": {
    "@type": "Organization",
    "name": "LoopEasy",
    "url": "https://loopeasy.com"
  },
  "featureList": [
    "AI-curated video channels",
    "70% revenue share for creators",
    "AI video enhancement tools",
    "Cross-device sync",
    "Live streaming support"
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <noscript>
          <style>{`
            .opacity-0 { opacity: 1 !important; }
            .translate-y-8 { transform: none !important; }
          `}</style>
        </noscript>
      </head>
      <body className={`${syne.variable} ${dmSans.variable} ${caveat.variable} antialiased`}>
        <ToastProvider>
          {children}
          <FeedbackWidget />
        </ToastProvider>
      </body>
    </html>
  );
}
