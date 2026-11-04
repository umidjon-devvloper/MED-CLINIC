"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Plus, Phone, ChevronDown, LogOut, LayoutDashboard, Stethoscope, UserCircle, MapPin, Search, CalendarPlus } from "lucide-react";
import { getUser, logout, type User } from "@/lib/auth";

const navLinks = [
  { href: "/", label: "Bosh sahifa" },
  { href: "/doctors", label: "Shifokorlar" },
  { href: "/services", label: "Xizmatlar" },
  { href: "/clinics", label: "Klinikalar" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "Biz haqimizda" },
  { href: "/contact", label: "Aloqa" },
];

function initialsFor(u: User): string {
  const a = (u.firstName?.trim()?.[0] || "").toUpperCase();
  const b = (u.lastName?.trim()?.[0] || "").toUpperCase();
  if (a || b) return (a + b) || a || b;
  return u.role === "doctor" ? "DR" : "U";
}

function displayName(u: User): string {
  if (u.firstName || u.lastName) {
    return `${u.role === "doctor" ? "Dr. " : ""}${u.firstName || u.lastName || ""}`.trim();
  }
  return u.role === "doctor" ? "Shifokor" : "Foydalanuvchi";
}

export function Header() {
  const pathname = usePathname();
  const [user, setUser] = useState<User | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const refresh = () => setUser(getUser());
    refresh();
    const onStorage = (e: StorageEvent) => { if (e.key === "med-user") refresh(); };
    window.addEventListener("storage", onStorage);
    // Also refresh on route change (pathname effect) in case of login/logout from same tab
    return () => window.removeEventListener("storage", onStorage);
  }, [pathname]);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => { if (menuRef.current && !menuRef.current.contains(e.target as Node)) setMenuOpen(false); };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  const onLogout = () => {
    logout();
    setUser(null);
    setMenuOpen(false);
    window.location.href = "/";
  };

  // Hide full header on booking/dashboard/auth custom shells
  if (
    pathname.startsWith("/booking") ||
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/doctor-dashboard") ||
    pathname.startsWith("/login") ||
    pathname.startsWith("/register")
  ) return null;

  return (
    <>
      {/* Slim top strip — contact, hours, telegram */}
      <div className="bg-ink text-[#8AA3C4] text-[11.5px] relative" style={{ background: "linear-gradient(90deg, #07122A 0%, #0E1F3D 50%, #07122A 100%)" }}>
        <div className="container-wide flex justify-between items-center gap-3 py-2">
          <div className="flex items-center gap-4 min-w-0">
            <a href="tel:+998712000000" className="inline-flex items-center gap-1.5 hover:text-white transition-colors shrink-0">
              <span className="w-5 h-5 rounded-md bg-accent/15 grid place-items-center">
                <Phone className="w-[11px] h-[11px] text-accent" strokeWidth={2.5} />
              </span>
              <strong className="text-white font-semibold tracking-wide tabular-nums">+998 71 200 00 00</strong>
            </a>
            <span className="hidden sm:inline-flex items-center gap-1.5 text-[#8AA3C4]">
              <span className="w-1 h-1 rounded-full bg-[#35D59B] shadow-[0_0_6px_#35D59B]" />
              <span className="font-medium">Hoziroq ochiq · 24/7</span>
            </span>
            <span className="hidden lg:inline-flex items-center gap-1.5 text-[#8AA3C4]">
              <MapPin className="w-[11px] h-[11px] text-[#607994]" />
              <span className="font-medium">Toshkent, Navoiy 14</span>
            </span>
          </div>
          <div className="flex gap-4 items-center shrink-0">
            <a href="https://t.me/medclinic_uz" target="_blank" rel="noopener" className="hidden sm:inline-flex items-center gap-1.5 hover:text-white transition-colors">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3 text-[#2EA6DE]"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" /></svg>
              <span className="font-medium">Telegram</span>
            </a>
            <Link href="/booking" className="hidden md:inline-flex items-center gap-1 text-white font-semibold hover:text-accent transition-colors">
              <span>Shoshilinch yordam</span>
              <span className="text-accent">→</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main nav — blends with the page background */}
      <nav className="sticky top-0 z-30 bg-bg/70 backdrop-blur-md">
        <div className="container-wide flex items-center gap-6 py-4 md:py-5">
          <Link href="/" className="flex items-center gap-2.5 font-extrabold text-[1.2rem] tracking-tight shrink-0 group">
            <span className="w-11 h-11 rounded-[12px] grid place-items-center text-white relative transition-transform group-hover:scale-105" style={{ background: "linear-gradient(135deg, var(--brand) 0%, var(--brand-ink) 100%)", color: "#fff", boxShadow: "0 4px 14px rgba(30,109,216,0.28)" }}>
              <Plus className="w-[21px] h-[21px]" strokeWidth={2.75} />
              <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-accent border-2 border-surface" />
            </span>
            <span className="text-ink text-[1.15rem]">MED</span>
            <em className="font-display italic font-medium text-brand text-[1.4rem] tracking-tight -ml-0.5">CLINIC</em>
          </Link>

          {/* Editorial nav links — larger, confident, underline indicator */}
          <div className="hidden lg:flex items-center gap-1 ml-6 xl:ml-10">
            {navLinks.map((link) => {
              const active = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-3 xl:px-4 py-2.5 text-[15px] whitespace-nowrap transition-colors ${active ? "text-ink font-semibold" : "text-ink-soft font-medium hover:text-ink"}`}
                >
                  {link.label}
                  {active && <span className="absolute left-3 right-3 xl:left-4 xl:right-4 -bottom-[1px] h-[2.5px] rounded-full" style={{ background: "linear-gradient(90deg, var(--brand), var(--accent))" }} />}
                </Link>
              );
            })}
          </div>

          <div className="ml-auto flex gap-2.5 items-center shrink-0">
            {/* Search icon */}
            <Link href="/doctors" aria-label="Qidiruv" className="hidden md:grid w-11 h-11 rounded-[11px] bg-bg/60 border border-line/60 text-ink-soft hover:text-brand hover:border-brand/40 hover:bg-brand-soft/50 place-items-center transition-all">
              <Search className="w-[18px] h-[18px]" />
            </Link>

            {/* Separator */}
            <span className="hidden md:block w-px h-7 bg-line/70 mx-0.5" />

            {user ? (
              <div ref={menuRef} className="relative hidden sm:block">
                <button onClick={() => setMenuOpen((v) => !v)} className="flex items-center gap-2.5 pl-1.5 pr-3.5 py-1.5 bg-brand-soft/50 hover:bg-brand-soft border border-transparent hover:border-brand/20 rounded-full transition-all max-w-[220px]">
                  <span className="w-8 h-8 rounded-full text-white font-bold grid place-items-center text-[12.5px] shrink-0" style={{ background: "linear-gradient(135deg, var(--brand), var(--brand-ink))", color: "#fff" }}>
                    {initialsFor(user)}
                  </span>
                  <span className="hidden xl:inline text-[14px] font-semibold text-ink max-w-[110px] truncate">
                    {displayName(user)}
                  </span>
                  <ChevronDown className={`w-3.5 h-3.5 text-muted transition-transform shrink-0 ${menuOpen ? "rotate-180" : ""}`} />
                </button>
                {menuOpen && (
                  <div className="absolute right-0 top-full mt-2 w-64 bg-surface border border-line rounded-2xl shadow-[0_12px_32px_rgba(10,31,58,0.14)] z-30 overflow-hidden">
                    <div className="px-4 py-3.5 border-b border-line bg-bg/60">
                      <div className="font-bold text-sm text-ink truncate">{user.firstName || "Foydalanuvchi"} {user.lastName || ""}</div>
                      <div className="text-[12px] text-muted inline-flex items-center gap-1.5 mt-0.5">
                        {user.role === "doctor" ? <><Stethoscope className="w-3 h-3" />{user.specialty || "Shifokor"}</> : <><UserCircle className="w-3 h-3" />Bemor</>}
                      </div>
                    </div>
                    <Link href={user.role === "doctor" ? "/doctor-dashboard" : "/dashboard"} onClick={() => setMenuOpen(false)} className="flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-bg text-ink transition-colors">
                      <LayoutDashboard className="w-4 h-4 text-ink-soft" />
                      {user.role === "doctor" ? "Shifokor paneli" : "Shaxsiy kabinet"}
                    </Link>
                    {user.role === "patient" && (
                      <Link href="/booking" onClick={() => setMenuOpen(false)} className="flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-bg text-ink border-t border-line transition-colors">
                        <CalendarPlus className="w-4 h-4 text-ink-soft" />Qabulga yozilish
                      </Link>
                    )}
                    <button onClick={onLogout} className="w-full text-left px-4 py-2.5 text-sm text-danger hover:bg-danger-soft border-t border-line transition-colors flex items-center gap-3">
                      <LogOut className="w-4 h-4" />Chiqish
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link href="/login" className="hidden sm:inline-flex items-center gap-1.5 text-[14.5px] font-semibold text-ink px-3.5 h-11 rounded-[11px] hover:bg-bg/60 hover:text-brand transition-all whitespace-nowrap">
                <UserCircle className="w-[17px] h-[17px]" />
                Kirish
              </Link>
            )}
            <Link href="/booking" style={{ color: "#fff" }} className="group relative !text-white px-4 xl:px-5 h-11 rounded-[12px] text-[14px] font-semibold inline-flex items-center gap-2 whitespace-nowrap transition-all overflow-hidden" >
              <span className="absolute inset-0 transition-transform group-hover:scale-105" style={{ background: "linear-gradient(135deg, var(--brand) 0%, var(--brand-ink) 100%)", boxShadow: "0 6px 18px rgba(30,109,216,0.32)" }} />
              <CalendarPlus className="w-[17px] h-[17px] relative" strokeWidth={2.5} />
              <span className="hidden sm:inline relative">Qabulga yozilish</span>
              <span className="sm:hidden relative">Qabul</span>
              <span className="relative transition-transform group-hover:translate-x-0.5" style={{ color: "#35D59B" }}>→</span>
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
}
