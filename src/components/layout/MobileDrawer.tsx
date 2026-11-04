"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { X, ChevronRight, Plus } from "lucide-react";
import { useEffect } from "react";

const links = [
  { href: "/", label: "Bosh sahifa" },
  { href: "/doctors", label: "Shifokorlar" },
  { href: "/services", label: "Xizmatlar" },
  { href: "/clinics", label: "Klinikalar" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "Biz haqimizda" },
  { href: "/contact", label: "Aloqa" },
  { href: "/dashboard", label: "Shaxsiy kabinet" },
];

export function MobileDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const pathname = usePathname();

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <div
        className={`fixed inset-0 bg-ink/50 z-[90] transition-opacity duration-250 ${open ? "opacity-100 visible" : "opacity-0 invisible"} cursor-pointer`}
        onClick={onClose}
      />
      <aside
        className={`fixed top-0 right-0 bottom-0 w-[85%] max-w-[320px] bg-surface z-[100] shadow-[-10px_0_30px_rgba(10,31,58,0.2)] flex flex-col transition-transform duration-300 overflow-y-auto ${open ? "translate-x-0" : "translate-x-full"}`}
        style={{ transitionTimingFunction: "cubic-bezier(.22,.9,.3,1)" }}
      >
        <div className="flex justify-between items-center px-6 py-5 border-b border-line">
          <span className="flex items-center gap-2.5 font-extrabold text-base">
            <span className="w-8 h-8 rounded-[9px] grid place-items-center text-white" style={{ background: "linear-gradient(135deg, var(--brand), var(--brand-ink))" }}>
              <Plus className="w-4 h-4" strokeWidth={2.5} />
            </span>
            MED <em className="font-display italic font-medium text-brand text-[1.2rem]">CLINIC</em>
          </span>
          <button onClick={onClose} aria-label="Yopish" className="w-9 h-9 rounded-[10px] border border-line bg-surface text-ink-soft grid place-items-center">
            <X className="w-[18px] h-[18px]" />
          </button>
        </div>

        <nav className="flex flex-col py-3">
          {links.map((link) => {
            const active = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={onClose}
                className={`px-6 py-3.5 text-[15px] font-medium flex items-center justify-between border-l-[3px] transition-colors ${active ? "text-brand font-semibold bg-brand-soft border-brand" : "text-ink border-transparent hover:bg-bg"}`}
              >
                {link.label}
                <ChevronRight className="w-[15px] h-[15px] text-muted" />
              </Link>
            );
          })}
        </nav>

        <div className="px-6 py-3 text-[12.5px] text-muted flex flex-col gap-1.5 border-t border-line">
          <span>24/7 shoshilinch yordam</span>
          <a href="tel:+998712000000" className="text-ink font-semibold">+998 71 200 00 00</a>
        </div>

        <div className="mt-auto px-6 py-5 border-t border-line flex flex-col gap-2.5">
          <Link href="/booking" onClick={onClose} className="btn btn-primary justify-center">Qabulga yozilish</Link>
          <Link href="/login" onClick={onClose} className="btn btn-outline justify-center">Kirish</Link>
        </div>
      </aside>
    </>
  );
}
