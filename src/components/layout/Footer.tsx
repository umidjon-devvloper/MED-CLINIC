"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Phone, Mail, MapPin, Plus } from "lucide-react";

export function Footer() {
  const pathname = usePathname();
  if (pathname.startsWith("/booking") || pathname.startsWith("/dashboard") || pathname.startsWith("/doctor-dashboard") || pathname.startsWith("/login") || pathname.startsWith("/register")) return null;

  return (
    <footer className="bg-ink text-[#8AA3C4] pt-16 pb-8">
      <div className="container-x">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1.2fr] gap-10 pb-12 border-b border-white/8">
          <div>
            <div className="flex items-center gap-2.5 text-white text-xl font-extrabold mb-4">
              <span className="w-[34px] h-[34px] rounded-[10px] grid place-items-center text-white" style={{ background: "linear-gradient(135deg, var(--brand), var(--brand-ink))" }}>
                <Plus className="w-[18px] h-[18px]" strokeWidth={2.5} />
              </span>
              MED <em className="font-display italic font-medium text-[#BBD1EC] text-[1.25rem]">CLINIC</em>
            </div>
            <p className="text-sm leading-relaxed max-w-[38ch]">
              O&apos;zbekistondagi yetakchi tibbiy platforma — 140+ shifokor, 6 klinika va 60+ xizmatni bir joyga jamlagan.
            </p>
            <div className="flex gap-2 mt-5">
              {[
                {
                  name: "Telegram",
                  href: "https://t.me/medclinic",
                  svg: <path d="M9.78 18.65l.28-4.23 7.68-6.92c.34-.31-.07-.46-.52-.19L7.74 13.3 3.64 12c-.88-.25-.89-.86.2-1.3l15.97-6.16c.73-.33 1.43.18 1.15 1.3l-2.72 12.81c-.19.91-.74 1.13-1.5.71L12.6 16.3l-1.99 1.93c-.23.23-.42.42-.83.42z" />,
                },
                {
                  name: "Instagram",
                  href: "https://instagram.com/medclinic",
                  svg: <><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></>,
                },
                {
                  name: "YouTube",
                  href: "https://youtube.com/@medclinic",
                  svg: <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />,
                },
                {
                  name: "TikTok",
                  href: "https://tiktok.com/@medclinic",
                  svg: <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005.8 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1.84-.1z" />,
                },
              ].map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.name}
                  className="w-[38px] h-[38px] rounded-[10px] bg-white/5 grid place-items-center text-white hover:bg-brand hover:-translate-y-0.5 transition-all"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-[18px] h-[18px]">
                    {s.svg}
                  </svg>
                </a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-white text-[13.5px] font-semibold mb-4 uppercase tracking-wide">Platforma</h4>
            <ul className="flex flex-col gap-2.5 text-sm">
              <li><Link href="/doctors" className="hover:text-white">Shifokorlar</Link></li>
              <li><Link href="/services" className="hover:text-white">Xizmatlar</Link></li>
              <li><Link href="/clinics" className="hover:text-white">Klinikalar</Link></li>
              <li><Link href="/booking" className="hover:text-white">Qabulga yozilish</Link></li>
              <li><Link href="/dashboard" className="hover:text-white">Shaxsiy kabinet</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white text-[13.5px] font-semibold mb-4 uppercase tracking-wide">Kompaniya</h4>
            <ul className="flex flex-col gap-2.5 text-sm">
              <li><Link href="/about" className="hover:text-white">Biz haqimizda</Link></li>
              <li><Link href="/blog" className="hover:text-white">Blog</Link></li>
              <li><Link href="/contact" className="hover:text-white">Aloqa</Link></li>
              <li><a href="#" className="hover:text-white">Karyera</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white text-[13.5px] font-semibold mb-4 uppercase tracking-wide">Aloqa</h4>
            <ul className="flex flex-col gap-3">
              <li className="flex gap-2.5 items-start">
                <Phone className="w-[15px] h-[15px] text-[#BBD1EC] mt-1 shrink-0" />
                <span>
                  <span className="block text-[11px] text-muted uppercase tracking-wider font-semibold mb-0.5">Call-center</span>
                  <span className="text-white">+998 71 200 00 00</span>
                </span>
              </li>
              <li className="flex gap-2.5 items-start">
                <Mail className="w-[15px] h-[15px] text-[#BBD1EC] mt-1 shrink-0" />
                <span>
                  <span className="block text-[11px] text-muted uppercase tracking-wider font-semibold mb-0.5">Email</span>
                  <span className="text-white">info@medclinic.uz</span>
                </span>
              </li>
              <li className="flex gap-2.5 items-start">
                <MapPin className="w-[15px] h-[15px] text-[#BBD1EC] mt-1 shrink-0" />
                <span>
                  <span className="block text-[11px] text-muted uppercase tracking-wider font-semibold mb-0.5">Bosh ofis</span>
                  <span className="text-white">Toshkent, Navoiy, 14</span>
                </span>
              </li>
            </ul>
          </div>
        </div>
        <div className="pt-6 flex justify-between items-center gap-4 text-[12.5px] flex-wrap">
          <div>© 2026 MED CLINIC. Barcha huquqlar himoyalangan.</div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white">Maxfiylik siyosati</a>
            <a href="#" className="hover:text-white">Foydalanish shartlari</a>
            <a href="#" className="hover:text-white">Litsenziyalar</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
