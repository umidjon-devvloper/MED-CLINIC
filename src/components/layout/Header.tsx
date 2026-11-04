"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Menu, Plus, Phone, ChevronDown, LogOut, LayoutDashboard, Stethoscope, UserCircle } from "lucide-react";
import { MobileDrawer } from "./MobileDrawer";
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

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
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
      <div className="bg-ink text-[#BBD1EC] text-[12.5px] py-3.5 relative" style={{ background: "linear-gradient(90deg, var(--ink) 0%, #0A2A50 50%, var(--ink) 100%)" }}>
        <div className="container-x flex justify-between items-center gap-4 flex-wrap">
          <div className="flex gap-4 items-center flex-wrap">
            <a href="tel:+998712000000" className="inline-flex items-center gap-2 hover:text-white transition-colors">
              <Phone className="w-[13px] h-[13px] text-accent" />
              <strong className="text-white font-semibold tracking-wide">+998 71 200 00 00</strong>
            </a>
            <span className="hidden md:inline-block w-px h-[14px] bg-white/15" />
            <span className="hidden md:inline-flex items-center gap-2">24/7 shoshilinch yordam</span>
          </div>
          <div className="flex gap-3 items-center">
            <a href="https://t.me/medclinic_uz" className="inline-flex items-center gap-1.5 hover:text-white">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-[13px] h-[13px]"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" /></svg>
              <span className="hidden sm:inline">Telegram</span>
            </a>
            <div className="flex items-center gap-0.5 bg-white/8 rounded-full p-[3px]">
              <button type="button" className="px-2.5 py-[3px] rounded-full text-[11.5px] font-semibold bg-white text-brand-ink">UZ</button>
              <button type="button" title="Tez orada — rus tili" disabled className="px-2.5 py-[3px] rounded-full text-[11.5px] font-semibold text-[#8AA3C4] opacity-60 cursor-not-allowed">RU</button>
              <button type="button" title="Coming soon — English" disabled className="px-2.5 py-[3px] rounded-full text-[11.5px] font-semibold text-[#8AA3C4] opacity-60 cursor-not-allowed">EN</button>
            </div>
          </div>
        </div>
      </div>

      <nav className="bg-surface border-b py-2 border-line relative z-10 shadow-[0_2px_12px_rgba(10,31,58,0.04)]">
        <div className="container-x flex items-center gap-4 py-7 md:py-8">
          <Link href="/" className="flex items-center gap-2.5 font-extrabold text-[1.15rem] tracking-wide">
            <span className="w-10 h-10 rounded-xl grid place-items-center text-white relative overflow-hidden shadow-[0_6px_16px_rgba(30,109,216,.28)]" style={{ background: "linear-gradient(135deg, var(--brand) 0%, var(--brand-ink) 100%)" }}>
              <Plus className="w-5 h-5" strokeWidth={2.5} />
              <span className="absolute top-[-3px] right-[-3px] w-[11px] h-[11px] rounded-full bg-accent border-[2.5px] border-surface shadow-[0_0_10px_rgba(34,197,139,.5)]" />
            </span>
            MED <em className="font-display italic font-medium text-brand text-[1.3rem] tracking-tight">CLINIC</em>
          </Link>

          <div className="hidden lg:flex gap-1 ml-6">
            {navLinks.map((link) => {
              const active = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
              return (
                <Link key={link.href} href={link.href} className={`relative px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${active ? "text-brand font-semibold bg-brand-soft/60" : "text-ink-soft hover:text-brand hover:bg-brand-soft/30"}`}>
                  {link.label}
                </Link>
              );
            })}
          </div>

          <div className="ml-auto flex gap-2 items-center">
            {user ? (
              <div ref={menuRef} className="relative hidden sm:block">
                <button onClick={() => setMenuOpen((v) => !v)} className="flex items-center gap-2.5 pl-1 pr-3 py-1 bg-brand-soft/50 hover:bg-brand-soft border border-transparent hover:border-brand/20 rounded-full transition-colors">
                  <span className="w-8 h-8 rounded-full text-white font-bold grid place-items-center text-[12px]" style={{ background: "linear-gradient(135deg, var(--brand), var(--brand-ink))", color: "#fff" }}>
                    {(user.firstName?.[0] ?? user.phone[1] ?? "U").toUpperCase()}
                    {(user.lastName?.[0] ?? "").toUpperCase()}
                  </span>
                  <span className="text-[13px] font-semibold text-ink max-w-[120px] truncate">
                    {user.role === "doctor" ? "Dr. " : ""}{user.firstName || user.phone.slice(0, 8)}
                  </span>
                  <ChevronDown className={`w-3.5 h-3.5 text-muted transition-transform ${menuOpen ? "rotate-180" : ""}`} />
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
              <Link href="/login" style={{ color: "var(--ink)" }} className="hidden sm:inline-block text-sm font-medium px-3.5 py-2 hover:text-brand transition-colors">Kirish</Link>
            )}
            <Link href="/booking" style={{ color: "#fff" }} className="bg-brand hover:bg-brand-ink !text-white px-4 h-10 rounded-[10px] text-sm font-semibold inline-flex items-center transition-colors">
              Qabulga yozilish
            </Link>
            <button onClick={() => setOpen(true)} className="lg:hidden w-10 h-10 rounded-[10px] bg-surface border border-line-strong text-ink grid place-items-center" aria-label="Menyu">
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </nav>

      <MobileDrawer open={open} onClose={() => setOpen(false)} />
    </>
  );
}
