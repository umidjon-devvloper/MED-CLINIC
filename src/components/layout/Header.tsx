"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Plus, Phone, ChevronDown, LogOut, LayoutDashboard, Stethoscope, UserCircle, MapPin } from "lucide-react";
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

      {/* Main nav — compact, sticky, modern with subtle backdrop blur */}
      <nav className="sticky top-0 z-30 bg-surface/80 backdrop-blur-md border-b border-line/60">
        <div className="container-wide flex items-center gap-6 py-3.5 md:py-4">
          <Link href="/" className="flex items-center gap-2 font-extrabold text-[1.1rem] tracking-tight shrink-0">
            <span className="w-9 h-9 rounded-[10px] grid place-items-center text-white relative" style={{ background: "linear-gradient(135deg, var(--brand) 0%, var(--brand-ink) 100%)", color: "#fff" }}>
              <Plus className="w-[18px] h-[18px]" strokeWidth={2.75} />
              <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-accent border-2 border-surface" />
            </span>
            <span className="text-ink">MED</span>
            <em className="font-display italic font-medium text-brand text-[1.2rem] tracking-tight -ml-0.5">CLINIC</em>
          </Link>

          <div className="hidden lg:flex items-center gap-1 ml-4 xl:ml-6">
            {navLinks.map((link) => {
              const active = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`nav-link relative px-2 xl:px-3 py-2 text-[13.5px] font-medium whitespace-nowrap transition-colors ${active ? "text-ink font-semibold" : "text-ink-soft hover:text-ink"}`}
                >
                  {link.label}
                  {active && <span className="absolute left-2 right-2 xl:left-3 xl:right-3 -bottom-[1px] h-0.5 bg-brand rounded-full" />}
                </Link>
              );
            })}
          </div>

          <div className="ml-auto flex gap-2 items-center shrink-0">
            {user ? (
              <div ref={menuRef} className="relative hidden sm:block">
                <button onClick={() => setMenuOpen((v) => !v)} className="flex items-center gap-2 pl-1 pr-2.5 py-1 bg-brand-soft/50 hover:bg-brand-soft border border-transparent hover:border-brand/20 rounded-full transition-colors max-w-[180px]">
                  <span className="w-8 h-8 rounded-full text-white font-bold grid place-items-center text-[12px] shrink-0" style={{ background: "linear-gradient(135deg, var(--brand), var(--brand-ink))", color: "#fff" }}>
                    {initialsFor(user)}
                  </span>
                  <span className="hidden xl:inline text-[13px] font-semibold text-ink max-w-[100px] truncate">
                    {displayName(user)}
                  </span>
                  <ChevronDown className={`w-3.5 h-3.5 text-muted transition-transform shrink-0 ${menuOpen ? "rotate-180" : ""}`} />
                </button>
                {menuOpen && (
                  <div className="absolute right-0 top-full mt-2 w-60 bg-surface border border-line rounded-xl shadow-xl z-30 overflow-hidden">
                    <div className="px-4 py-3 border-b border-line bg-bg">
                      <div className="font-bold text-sm text-ink truncate">{user.firstName || "Foydalanuvchi"} {user.lastName || ""}</div>
                      <div className="text-[12px] text-muted inline-flex items-center gap-1.5 mt-0.5">
                        {user.role === "doctor" ? <><Stethoscope className="w-3 h-3" />{user.specialty || "Shifokor"}</> : <><UserCircle className="w-3 h-3" />Bemor</>}
                      </div>
                    </div>
                    <Link href={user.role === "doctor" ? "/doctor-dashboard" : "/dashboard"} onClick={() => setMenuOpen(false)} className="block px-4 py-2.5 text-sm hover:bg-bg text-ink">
                      <LayoutDashboard className="w-4 h-4 text-ink-soft inline mr-2.5" />
                      {user.role === "doctor" ? "Shifokor paneli" : "Shaxsiy kabinet"}
                    </Link>
                    {user.role === "patient" && (
                      <Link href="/booking" onClick={() => setMenuOpen(false)} className="block px-4 py-2.5 text-sm hover:bg-bg text-ink border-t border-line">
                        <Phone className="w-4 h-4 text-ink-soft inline mr-2.5" />Qabulga yozilish
                      </Link>
                    )}
                    <button onClick={onLogout} className="w-full text-left px-4 py-2.5 text-sm text-danger hover:bg-danger-soft border-t border-line transition-colors flex items-center gap-2.5">
                      <LogOut className="w-4 h-4" />Chiqish
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link href="/login" style={{ color: "var(--ink)" }} className="hidden sm:inline-block text-[13.5px] font-medium px-2.5 py-1.5 hover:text-brand transition-colors whitespace-nowrap">Kirish</Link>
            )}
            <Link href="/booking" style={{ color: "#fff" }} className="bg-brand hover:bg-brand-ink !text-white px-3.5 xl:px-4 h-9 rounded-[9px] text-[13px] font-semibold inline-flex items-center gap-1 whitespace-nowrap transition-colors">
              <span className="hidden sm:inline">Qabulga yozilish</span>
              <span className="sm:hidden">Qabul</span>
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
}
