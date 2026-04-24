import type { Metadata } from "next";
import { Inter, Outfit, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-outfit",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: "AI Cloud Contact Center Platform — Activate in Minutes | MCM",
  description:
    "Cloud phone and AI contact center on one login. Calls, chat, SMS, video, and an AI receptionist.",
  metadataBase: new URL("https://mycountrymobile.com"),
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    title:
      "Cloud phone and AI contact center. One login. Activate in minutes.",
    description:
      "Calls, chat, video, and an AI receptionist on one platform.",
    url: "https://mycountrymobile.com/",
    images: [
      {
        url: "https://mycountrymobile.com/assets/og-image-1200x630.png",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Cloud phone and AI contact center. One login. Activate in minutes.",
    description:
      "Calls, chat, video, and an AI receptionist on one platform.",
    images: [
      "https://mycountrymobile.com/assets/twitter-card-1200x675.png",
    ],
  },
  robots: { index: true, follow: true, "max-image-preview": "large" } as any,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${outfit.variable} ${jakarta.variable}`}
    >
      <head>
        {/* Material Symbols is an icon font — easier via <link> than next/font */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
        />
      </head>
      <body className="font-inter text-slate-900 bg-[#fafbfc] selection:bg-violet-200 selection:text-violet-900">
        {children}
      </body>
    </html>
  );
}
