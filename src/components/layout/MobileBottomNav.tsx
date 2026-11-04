"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Home, Stethoscope, Activity, Building2, UserCircle, MoreHorizontal, Newspaper, Info, PhoneCall, X, LogIn, CalendarPlus } from "lucide-react";
import { getUser, type User } from "@/lib/auth";

const primary = [
  { href: "/",         label: "Bosh",       icon: Home },
  { href: "/doctors",  label: "Shifokor",   icon: Stethoscope },
  { href: "/services", label: "Xizmat",     icon: Activity },
  { href: "/clinics",  label: "Klinika",    icon: Building2 },
];

const more = [
  { href: "/blog",    label: "Blog",         icon: Newspaper },
  { href: "/about",   label: "Biz haqimizda", icon: Info },
  { href: "/contact", label: "Aloqa",        icon: PhoneCall },
];

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

export function MobileBottomNav() {
  const pathname = usePathname();
  const [sheet, setSheet] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    setUser(getUser());
    const onStorage = (e: StorageEvent) => { if (e.key === "med-user") setUser(getUser()); };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, [pathname]);

  useEffect(() => { setSheet(false); }, [pathname]);

  useEffect(() => {
    if (sheet) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [sheet]);

  // Hide on custom shells (same rule as the main header)
  if (
    pathname.startsWith("/booking") ||
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/doctor-dashboard") ||
    pathname.startsWith("/login") ||
    pathname.startsWith("/register")
  ) return null;

  const accountHref = user ? (user.role === "doctor" ? "/doctor-dashboard" : "/dashboard") : "/login";
  const accountLabel = user ? "Kabinet" : "Kirish";
  const AccountIcon = user ? UserCircle : LogIn;
  const accountActive = user ? isActive(pathname, accountHref) : pathname.startsWith("/login") || pathname.startsWith("/register");

  const moreActive = more.some((l) => isActive(pathname, l.href));

  return (
    <>
      {/* Spacer so page content clears the fixed bar */}
      <div className="lg:hidden h-[72px]" aria-hidden />

      <nav
        className="lg:hidden fixed left-0 right-0 bottom-0 z-40 bg-surface/95 backdrop-blur-xl border-t border-line/70 shadow-[0_-4px_20px_rgba(10,31,58,0.06)]"
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
        aria-label="Asosiy navigatsiya"
      >
        <div className="grid grid-cols-6 items-stretch h-[62px]">
          {primary.map((l) => {
            const active = isActive(pathname, l.href);
            return (
              <Link key={l.href} href={l.href} className={`flex flex-col items-center justify-center gap-1 pt-1 relative transition-colors ${active ? "text-brand" : "text-ink-soft hover:text-ink"}`}>
                {active && <span className="absolute top-0 h-[3px] w-10 rounded-b-full bg-brand" />}
                <l.icon className="w-[20px] h-[20px]" strokeWidth={active ? 2.5 : 2} />
                <span className={`text-[10.5px] tracking-tight ${active ? "font-bold" : "font-medium"}`}>{l.label}</span>
              </Link>
            );
          })}

          <Link href={accountHref} className={`flex flex-col items-center justify-center gap-1 pt-1 relative transition-colors ${accountActive ? "text-brand" : "text-ink-soft hover:text-ink"}`}>
            {accountActive && <span className="absolute top-0 h-[3px] w-10 rounded-b-full bg-brand" />}
            {user ? (
              <span className="w-[22px] h-[22px] rounded-full grid place-items-center text-white font-bold text-[10px]" style={{ background: "linear-gradient(135deg, var(--brand), var(--brand-ink))", color: "#fff" }}>
                {((user.firstName?.[0] || "") + (user.lastName?.[0] || "")).toUpperCase() || "U"}
              </span>
            ) : (
              <AccountIcon className="w-[20px] h-[20px]" strokeWidth={accountActive ? 2.5 : 2} />
            )}
            <span className={`text-[10.5px] tracking-tight ${accountActive ? "font-bold" : "font-medium"}`}>{accountLabel}</span>
          </Link>

          <button onClick={() => setSheet(true)} className={`flex flex-col items-center justify-center gap-1 pt-1 transition-colors ${moreActive || sheet ? "text-brand" : "text-ink-soft hover:text-ink"}`} aria-label="Yana">
            <MoreHorizontal className="w-[20px] h-[20px]" strokeWidth={moreActive || sheet ? 2.5 : 2} />
            <span className={`text-[10.5px] tracking-tight ${moreActive || sheet ? "font-bold" : "font-medium"}`}>Yana</span>
          </button>
        </div>
      </nav>

      {/* Bottom sheet — secondary pages + booking CTA */}
      <div
        className={`lg:hidden fixed inset-0 z-[90] bg-ink/45 transition-opacity duration-200 ${sheet ? "opacity-100 visible" : "opacity-0 invisible"}`}
        onClick={() => setSheet(false)}
      />
      <aside
        className={`lg:hidden fixed left-0 right-0 bottom-0 z-[100] bg-surface rounded-t-[22px] shadow-[0_-20px_60px_rgba(10,31,58,0.25)] transition-transform duration-300 ${sheet ? "translate-y-0" : "translate-y-full"}`}
        style={{ transitionTimingFunction: "cubic-bezier(.22,.9,.3,1)", paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        <div className="flex justify-center pt-2.5 pb-1"><span className="w-10 h-1 rounded-full bg-line" /></div>
        <div className="flex items-center justify-between px-5 pb-3">
          <div className="font-display text-[18px] font-normal tracking-tight">Boshqa <em className="italic text-brand">bo&apos;limlar</em></div>
          <button onClick={() => setSheet(false)} aria-label="Yopish" className="w-8 h-8 rounded-lg border border-line text-ink-soft grid place-items-center hover:text-brand hover:border-brand transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        <nav className="px-3 pb-2">
          {more.map((l) => {
            const active = isActive(pathname, l.href);
            return (
              <Link key={l.href} href={l.href} onClick={() => setSheet(false)} className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-colors ${active ? "bg-brand-soft text-brand font-semibold" : "text-ink hover:bg-bg"}`}>
                <span className={`w-9 h-9 rounded-xl grid place-items-center ${active ? "bg-brand text-white" : "bg-bg text-ink-soft"}`} style={active ? { color: "#fff" } : undefined}>
                  <l.icon className="w-[17px] h-[17px]" />
                </span>
                <span className="text-[14.5px]">{l.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="px-4 pt-3 pb-5 border-t border-line flex flex-col gap-2">
          <Link href="/booking" onClick={() => setSheet(false)} className="btn btn-primary w-full justify-center">
            <CalendarPlus className="w-4 h-4" />Qabulga yozilish
          </Link>
          <a href="tel:+998712000000" className="text-center text-[12.5px] text-muted pt-1">
            24/7 shoshilinch yordam · <span className="text-ink font-semibold">+998 71 200 00 00</span>
          </a>
        </div>
      </aside>
    </>
  );
}
