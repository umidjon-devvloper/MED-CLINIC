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

export const metadata: Metadata = {
  title: "MED CLINIC — Professional Tibbiy Platforma",
  description: "140+ sertifikatlangan shifokor, 6 ta klinika va 60+ tibbiy xizmat bir platformada. Onlayn qabulga yoziling.",
  keywords: ["tibbiyot", "klinika", "shifokor", "qabul", "O'zbekiston"],
  openGraph: {
    title: "MED CLINIC",
    description: "Sog'lig'ingiz — bizning ustuvor vazifamiz",
    locale: "uz_UZ",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="uz">
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
