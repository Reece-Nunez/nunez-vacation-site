import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const SITE_URL = "https://nunezvacationhomes.com";
const SITE_NAME = "Nunez Vacation Homes";

export const viewport: Viewport = {
  themeColor: "#1d383f",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default:
      "Nunez Vacation Homes | Luxury Vacation Rentals in Port Charlotte, FL",
    template: "%s | Nunez Vacation Homes",
  },
  description:
    "Book luxury vacation rentals in Port Charlotte, Florida. Two stunning Superhost homes with heated saltwater pools, minutes from Gulf Coast beaches. Sleeps up to 14 guests — perfect for families, reunions, and group getaways.",
  keywords: [
    // Primary keywords
    "Port Charlotte vacation rental",
    "Port Charlotte FL Airbnb",
    "Florida Gulf Coast vacation home",
    "heated pool vacation rental Florida",
    // Long-tail keywords
    "family vacation rental Port Charlotte FL",
    "beach house rental near Englewood FL",
    "vacation home with pool near Punta Gorda",
    "Airbnb Superhost Port Charlotte",
    "large group vacation rental southwest Florida",
    "pet friendly vacation rental Port Charlotte",
    // Geo modifiers
    "vacation rental near Boca Grande",
    "rental home near Englewood Beach",
    "Charlotte County vacation rental",
    "southwest Florida vacation home",
    // Intent keywords
    "best Airbnb Port Charlotte FL",
    "luxury Airbnb with pool Florida",
    "family reunion rental Florida Gulf Coast",
    "snowbird rental Port Charlotte",
  ],
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  formatDetection: {
    telephone: true,
    email: true,
    address: true,
  },
  category: "Travel",
  classification: "Vacation Rentals",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: "Nunez Vacation Homes | Luxury Rentals in Port Charlotte, FL",
    description:
      "Two stunning Superhost vacation homes with heated saltwater pools in Port Charlotte, FL. Minutes from Gulf Coast beaches. Book direct for the best rates.",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Nunez Vacation Homes — Luxury rentals with heated pools in Port Charlotte, Florida",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nunez Vacation Homes | Luxury Rentals in Port Charlotte, FL",
    description:
      "Two stunning Superhost vacation homes with heated saltwater pools in Port Charlotte, FL. Minutes from Gulf Coast beaches.",
    images: [
      {
        url: "/images/og-image.jpg",
        alt: "Nunez Vacation Homes — Luxury rentals with heated pools in Port Charlotte, Florida",
      },
    ],
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
  alternates: {
    canonical: SITE_URL,
  },
  other: {
    "google-site-verification": "",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body>
        <Toaster position="bottom-right" richColors />
        {children}
      </body>
    </html>
  );
}
