import "./globals.css";
import Providers from "./providers";

const siteUrl = process.env.NEXTAUTH_URL || "https://perceptagalaxy-vivekcbanakar-ui.vercel.app";

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Percepta Galaxy - AI Competitive Intelligence",
    template: "%s | Percepta Galaxy",
  },
  description:
    "Track your competitors in real-time. Get AI-powered insights on pricing changes, product launches, and marketing moves. Stay ahead of the competition.",
  keywords: [
    "competitive intelligence",
    "competitor tracking",
    "AI insights",
    "market intelligence",
    "price monitoring",
    "product launch alerts",
  ],
  authors: [{ name: "Percepta Galaxy" }],
  creator: "Percepta Galaxy",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Percepta Galaxy",
    title: "Percepta Galaxy - AI Competitive Intelligence",
    description:
      "Track your competitors in real-time. Get AI-powered insights on pricing changes, product launches, and marketing moves.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Percepta Galaxy - AI Competitive Intelligence",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Percepta Galaxy - AI Competitive Intelligence",
    description:
      "Track your competitors in real-time. Get AI-powered insights on pricing changes, product launches, and marketing moves.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport = {
  themeColor: "#0f172a",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
