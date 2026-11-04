import type { Metadata } from "next";
import { Fraunces, Manrope } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ToastProvider } from "@/components/ui/Toast";
import { ScrollRevealProvider } from "@/components/ui/ScrollReveal";
import { PageTransition } from "@/components/ui/motion";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://medclinic.uz";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "MED CLINIC — Professional Tibbiy Platforma",
    template: "%s · MED CLINIC",
  },
  description: "140+ sertifikatlangan shifokor, 6 ta klinika va 60+ tibbiy xizmat bir platformada. Onlayn qabulga yoziling — jarayon 2 daqiqa.",
  applicationName: "MED CLINIC",
  authors: [{ name: "MED CLINIC", url: SITE_URL }],
  creator: "MED CLINIC",
  publisher: "MED CLINIC",
  category: "health",
  keywords: [
    "tibbiyot", "klinika", "shifokor", "qabul", "O'zbekiston", "Toshkent",
    "kardiologiya", "pediatriya", "stomatologiya", "nevrologiya",
    "онлайн запись к врачу", "медицинская платформа", "doctor booking",
  ],
  alternates: {
    canonical: "/",
    languages: { "uz-UZ": "/", "ru-RU": "/", "en-US": "/" },
  },
  openGraph: {
    type: "website",
    locale: "uz_UZ",
    alternateLocale: ["ru_RU", "en_US"],
    url: SITE_URL,
    siteName: "MED CLINIC",
    title: "MED CLINIC — Professional Tibbiy Platforma",
    description: "Sog'lig'ingiz — bizning ustuvor vazifamiz. 140+ shifokor, 6 klinika, 60+ xizmat.",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "MED CLINIC" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "MED CLINIC — Professional Tibbiy Platforma",
    description: "Sog'lig'ingiz — bizning ustuvor vazifamiz.",
    images: ["/og.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large", "max-video-preview": -1 },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION,
  },
};

export const viewport = {
  themeColor: "#1E6DD8",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="uz">
      <head>
        {/* Organization + MedicalBusiness structured data for rich Google results */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "MedicalBusiness",
              name: "MED CLINIC",
              url: SITE_URL,
              logo: `${SITE_URL}/favicon.ico`,
              image: `${SITE_URL}/og.png`,
              description: "Professional tibbiy platforma — 140+ shifokor, 6 klinika, 60+ xizmat",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Navoiy ko'chasi 14-uy",
                addressLocality: "Toshkent",
                addressRegion: "Shayxontohur",
                postalCode: "100000",
                addressCountry: "UZ",
              },
              geo: { "@type": "GeoCoordinates", latitude: 41.3264, longitude: 69.2370 },
              telephone: "+998712000000",
              email: "info@medclinic.uz",
              openingHours: "Mo-Su 00:00-23:59",
              sameAs: [
                "https://t.me/medclinic_uz",
                "https://instagram.com/medclinic.uz",
                "https://facebook.com/medclinic",
                "https://youtube.com/@medclinic",
              ],
              medicalSpecialty: ["Cardiovascular", "Pediatric", "Dermatologic", "Neurologic", "Dentistry"],
            }),
          }}
        />
      </head>
      <body className={`${manrope.variable} ${fraunces.variable}`}>
        <ToastProvider>
          <ScrollRevealProvider />
          <Header />
          <main>
            <PageTransition>{children}</PageTransition>
          </main>
          <Footer />
        </ToastProvider>
      </body>
    </html>
  );
}
