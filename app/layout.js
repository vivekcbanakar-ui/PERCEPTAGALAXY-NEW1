import "./globals.css";
import Providers from "./providers";

const siteUrl = process.env.NEXTAUTH_URL || "https://perceptagalaxy-vivekcbanakar-ui.vercel.app";

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Percepta Galaxy",
  url: siteUrl,
  logo: `${siteUrl}/og-image.svg`,
  description:
    "AI-powered competitive intelligence platform for SaaS founders. Track your competitors' pricing, features, and strategy in real-time.",
  sameAs: [
    "https://twitter.com/perceptagalaxy",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "Sales",
    email: "vivekcbanakar@gmail.com",
  },
};

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Percepta Galaxy",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  offers: {
    "@type": "AggregateOffer",
    lowPrice: 99,
    highPrice: 999,
    priceCurrency: "USD",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.8",
    reviewCount: "12",
  },
};

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
    "crayon alternative",
    "competitor analysis",
  ],
  authors: [{ name: "Percepta Galaxy" }],
  creator: "Percepta Galaxy",
  publisher: "Percepta Galaxy",
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
        url: "/og-image.svg",
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
    images: ["/og-image.svg"],
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
  alternates: {
    canonical: siteUrl,
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
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
        />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
