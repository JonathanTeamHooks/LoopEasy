import type { Metadata } from "next";
import { Syne, DM_Sans } from "next/font/google";
import "./globals.css";

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

export const metadata: Metadata = {
  title: "LoopEasy | Video Channels Curated by AI, Built by Creators",
  description: "Discover endless video channels or create your own. Watch free or go Premium. Creators earn 70% of ad revenue. Your taste is your talent.",
  keywords: ["video channels", "curated content", "creator economy", "video curation", "ai video", "fitness tv", "gym content"],
  authors: [{ name: "LoopEasy" }],
  openGraph: {
    title: "LoopEasy | Video Channels Curated by AI, Built by Creators",
    description: "Discover endless video channels or create your own. Creators earn 70% of ad revenue. Your taste is your talent.",
    url: "https://loopeasy.com",
    siteName: "LoopEasy",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "LoopEasy | Video Channels Curated by AI",
    description: "Discover endless video channels or create your own. Creators earn 70% of ad revenue.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${syne.variable} ${dmSans.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
