import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://nunezvacationhomes.com"),
  title: {
    default: "Nunez Vacation Homes | Luxury Rentals in Port Charlotte, FL",
    template: "%s | Nunez Vacation Homes",
  },
  description:
    "Experience luxury vacation rentals in Port Charlotte, Florida. Two stunning homes with heated pools, near Gulf Coast beaches. Perfect for families, reunions, and relaxing getaways.",
  keywords: [
    "Port Charlotte vacation rental",
    "Florida vacation home",
    "Gulf Coast rental",
    "heated pool rental",
    "family vacation Florida",
    "Port Charlotte FL",
    "beach house rental",
  ],
  authors: [{ name: "Nunez Vacation Homes" }],
  creator: "Nunez Vacation Homes",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://nunezvacationhomes.com",
    siteName: "Nunez Vacation Homes",
    title: "Nunez Vacation Homes | Luxury Rentals in Port Charlotte, FL",
    description:
      "Experience luxury vacation rentals in Port Charlotte, Florida. Stunning homes with pools near Gulf Coast beaches.",
    images: [
      {
        url: "/images/beach-scene.jpg",
        width: 1200,
        height: 630,
        alt: "Nunez Vacation Homes - Port Charlotte, Florida",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nunez Vacation Homes | Luxury Rentals in Port Charlotte, FL",
    description:
      "Experience luxury vacation rentals in Port Charlotte, Florida.",
    images: ["/images/beach-scene.jpg"],
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
    canonical: "https://nunezvacationhomes.com",
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
