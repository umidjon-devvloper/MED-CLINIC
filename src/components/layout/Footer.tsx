"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Phone, Mail, MapPin, Plus, ArrowUpRight, Shield, Clock3 } from "lucide-react";

const socials = [
  { name: "Telegram",  href: "https://t.me/medclinic_uz",             svg: <path d="M9.78 18.65l.28-4.23 7.68-6.92c.34-.31-.07-.46-.52-.19L7.74 13.3 3.64 12c-.88-.25-.89-.86.2-1.3l15.97-6.16c.73-.33 1.43.18 1.15 1.3l-2.72 12.81c-.19.91-.74 1.13-1.5.71L12.6 16.3l-1.99 1.93c-.23.23-.42.42-.83.42z" /> },
  { name: "Instagram", href: "https://instagram.com/medclinic.uz",    svg: <><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></> },
  { name: "YouTube",   href: "https://youtube.com/@medclinic",        svg: <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /> },
  { name: "TikTok",    href: "https://tiktok.com/@medclinic",         svg: <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005.8 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1.84-.1z" /> },
];

export function Footer() {
  const pathname = usePathname();
  if (pathname.startsWith("/booking") || pathname.startsWith("/dashboard") || pathname.startsWith("/doctor-dashboard") || pathname.startsWith("/login") || pathname.startsWith("/register")) return null;

  return (
    <footer className="relative overflow-hidden text-[#8AA3C4]" style={{ background: "#07122A" }}>
      {/* Signature thin accent line at top */}
      <div className="absolute top-0 inset-x-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(77,148,245,0.6), rgba(34,197,139,0.6), transparent)" }} />
      {/* Soft decorative glow */}
      <div className="absolute top-1/2 right-[10%] w-[520px] h-[520px] rounded-full blur-[90px] opacity-20 pointer-events-none -translate-y-1/2" style={{ background: "radial-gradient(closest-side, rgba(77,148,245,0.5), transparent 70%)" }} />

      <div className="container-wide relative">
        <div className="py-16 md:py-24 border-b border-white/10 grid lg:grid-cols-[1.4fr_auto] gap-10 items-end">
          <div>
            <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#4D94F5] mb-6 inline-flex items-center gap-2.5">
              <span className="w-8 h-px bg-[#4D94F5]" />
              Siz uchun · 24/7
            </div>
            <h2 className="font-display font-normal text-white leading-[0.98] tracking-[-0.025em]" style={{ fontSize: "clamp(36px, 5.5vw, 68px)" }}>
              Sog&apos;lig&apos;ingiz — <em className="italic text-[#BBD1EC]">doimiy nazorat</em>da.
            </h2>
            <p className="text-[15px] md:text-[17px] text-[#B7C6DE] mt-6 max-w-[56ch] leading-relaxed">
              O&apos;zbekistondagi yetakchi tibbiy platforma. 140+ sertifikatlangan shifokor, 6 ta klinika, 60+ xizmat.
            </p>
          </div>
          <Link href="/booking" style={{ color: "#07122A" }} className="group inline-flex items-center gap-2 bg-white hover:bg-[#BBD1EC] !text-[#07122A] px-6 py-3.5 rounded-full font-bold text-[14px] transition-colors self-end whitespace-nowrap">
            Qabulga yozilish
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={2.5} />
          </Link>
        </div>

        <div className="py-14 md:py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1.3fr] gap-10 md:gap-14 border-b border-white/10">
          <div>
            <Link href="/" className="inline-flex items-center gap-2.5 text-white text-[1.3rem] font-extrabold tracking-tight mb-5">
              <span className="w-10 h-10 rounded-xl grid place-items-center relative" style={{ background: "linear-gradient(135deg, #1E6DD8, #0E3F8C)", color: "#fff" }}>
                <Plus className="w-5 h-5" strokeWidth={2.75} />
                <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-[#35D59B] border-2" style={{ borderColor: "#07122A" }} />
              </span>
              MED <em className="font-display italic font-medium text-[#BBD1EC] text-[1.35rem]">CLINIC</em>
            </Link>
            <p className="text-[13.5px] leading-relaxed max-w-[38ch]">
              O&apos;zbekistondagi yetakchi tibbiy platforma — bemorlar va shifokorlarni bir joyda bog&apos;laydi.
            </p>
            <div className="flex gap-2 mt-6">
              {socials.map((s) => (
                <a key={s.name} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.name}
                  className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 grid place-items-center text-[#BBD1EC] hover:text-white hover:bg-white/10 hover:border-white/20 hover:-translate-y-0.5 transition-all">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-[18px] h-[18px]">{s.svg}</svg>
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-[11px] font-bold text-[#4D94F5] mb-5 uppercase tracking-[0.15em]">Platforma</h4>
            <ul className="flex flex-col gap-3 text-[14px]">
              <li><Link href="/doctors" className="hover:text-white transition-colors">Shifokorlar</Link></li>
              <li><Link href="/services" className="hover:text-white transition-colors">Xizmatlar</Link></li>
              <li><Link href="/clinics" className="hover:text-white transition-colors">Klinikalar</Link></li>
              <li><Link href="/booking" className="hover:text-white transition-colors">Qabulga yozilish</Link></li>
              <li><Link href="/dashboard" className="hover:text-white transition-colors">Shaxsiy kabinet</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[11px] font-bold text-[#4D94F5] mb-5 uppercase tracking-[0.15em]">Kompaniya</h4>
            <ul className="flex flex-col gap-3 text-[14px]">
              <li><Link href="/about" className="hover:text-white transition-colors">Biz haqimizda</Link></li>
              <li><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Aloqa</Link></li>
              <li><Link href="/doctor-dashboard" className="hover:text-white transition-colors">Shifokorlar uchun</Link></li>
              <li><a href="#" className="hover:text-white transition-colors">Karyera</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[11px] font-bold text-[#4D94F5] mb-5 uppercase tracking-[0.15em]">Aloqa</h4>
            <ul className="flex flex-col gap-4">
              <li className="flex gap-3 items-start">
                <div className="w-9 h-9 rounded-lg bg-white/5 grid place-items-center text-[#4D94F5] shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <div className="text-[10.5px] text-[#607994] uppercase tracking-wider font-bold mb-0.5">Call-center</div>
                  <a href="tel:+998712000000" className="text-white hover:text-[#BBD1EC] font-semibold text-[14px] transition-colors">+998 71 200 00 00</a>
                </div>
              </li>
              <li className="flex gap-3 items-start">
                <div className="w-9 h-9 rounded-lg bg-white/5 grid place-items-center text-[#4D94F5] shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <div className="text-[10.5px] text-[#607994] uppercase tracking-wider font-bold mb-0.5">Email</div>
                  <a href="mailto:info@medclinic.uz" className="text-white hover:text-[#BBD1EC] text-[14px] transition-colors">info@medclinic.uz</a>
                </div>
              </li>
              <li className="flex gap-3 items-start">
                <div className="w-9 h-9 rounded-lg bg-white/5 grid place-items-center text-[#4D94F5] shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <div className="text-[10.5px] text-[#607994] uppercase tracking-wider font-bold mb-0.5">Bosh ofis</div>
                  <span className="text-white text-[14px]">Toshkent, Navoiy, 14</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="py-6 flex flex-wrap items-center justify-center gap-6 md:gap-12 border-b border-white/10 text-[11.5px] uppercase tracking-wider text-[#607994] font-bold">
          <span className="inline-flex items-center gap-2"><Shield className="w-3.5 h-3.5 text-[#4D94F5]" /> Sog&apos;liq Vazirligi litsenziyasi</span>
          <span className="hidden md:inline">·</span>
          <span className="inline-flex items-center gap-2"><Clock3 className="w-3.5 h-3.5 text-[#4D94F5]" /> 10+ yillik tajriba</span>
          <span className="hidden md:inline">·</span>
          <span>ISO 9001:2015</span>
          <span className="hidden md:inline">·</span>
          <span>SSL himoyalangan</span>
        </div>

        <div className="py-7 flex justify-between items-center gap-4 text-[12.5px] text-[#607994] flex-wrap">
          <div>© 2026 MED CLINIC. Barcha huquqlar himoyalangan.</div>
          <div className="flex gap-7">
            <Link href="#" className="hover:text-white transition-colors">Maxfiylik</Link>
            <Link href="#" className="hover:text-white transition-colors">Shartlar</Link>
            <Link href="#" className="hover:text-white transition-colors">Litsenziyalar</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
