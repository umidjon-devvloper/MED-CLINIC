"use client";

import { useEffect, useState, type ReactNode } from "react";
import Link from "next/link";
import { ShieldCheck, LogIn, UserPlus, Sparkles, Copy, Check, Stethoscope, HeartPulse, FileText } from "lucide-react";
import { getUser, DEMO_PATIENT } from "@/lib/auth";

type Props = {
  children: ReactNode;
  redirectTo?: string;
  title?: string;
  message?: string;
};

export function AuthGate({ children, redirectTo, title = "Kirish talab qilinadi", message = "Qabulga yozilish uchun avval ro'yxatdan o'ting yoki tizimga kiring. Bu bir daqiqa oladi." }: Props) {
  const [state, setState] = useState<"loading" | "authed" | "anon">("loading");
  const [copied, setCopied] = useState<"phone" | "pass" | null>(null);

  useEffect(() => {
    const user = getUser();
    setState(user ? "authed" : "anon");
  }, []);

  const copy = async (text: string, which: "phone" | "pass") => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(which);
      setTimeout(() => setCopied(null), 1500);
    } catch { /* ignore */ }
  };

  if (state === "loading") {
    return (
      <div className="min-h-[60vh] grid place-items-center">
        <div className="w-10 h-10 rounded-full border-[3px] border-brand/20 border-t-brand animate-spin" />
      </div>
    );
  }

  if (state === "anon") {
    const next = redirectTo ?? (typeof window !== "undefined" ? window.location.pathname + window.location.search : "/booking");
    const nextParam = `?next=${encodeURIComponent(next)}`;
    const titleWords = title.split(" ");
    const lastWord = titleWords.pop() ?? "";
    const titleLead = titleWords.join(" ");

    return (
      <div className="relative min-h-screen w-full overflow-hidden flex items-center justify-center py-12 md:py-20 px-4" style={{ background: "linear-gradient(135deg, #F7FAFF 0%, #EDF4FD 55%, #E3EEFF 100%)" }}>
        {/* Ambient orbs */}
        <div className="absolute -top-40 -left-32 w-[560px] h-[560px] rounded-full opacity-45 pointer-events-none" style={{ background: "radial-gradient(closest-side, rgba(77,148,245,0.35), transparent 70%)", filter: "blur(70px)" }} />
        <div className="absolute -bottom-40 -right-32 w-[620px] h-[620px] rounded-full opacity-40 pointer-events-none" style={{ background: "radial-gradient(closest-side, rgba(187,209,236,0.6), transparent 70%)", filter: "blur(80px)" }} />
        <div className="absolute top-[30%] right-[18%] w-[320px] h-[320px] rounded-full opacity-25 pointer-events-none" style={{ background: "radial-gradient(closest-side, rgba(34,197,139,0.25), transparent 70%)", filter: "blur(50px)" }} />
        {/* Fine grid texture */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: "linear-gradient(#1E6DD8 1px, transparent 1px), linear-gradient(90deg, #1E6DD8 1px, transparent 1px)", backgroundSize: "40px 40px" }} />

        <div className="relative max-w-[460px] w-full">
          {/* Floating stat chips — editorial detail */}
          <div className="hidden sm:flex absolute -top-12 left-6 items-center gap-2 bg-surface border border-line rounded-full px-3 py-1.5 shadow-[0_8px_20px_rgba(10,31,58,0.06)]">
            <ShieldCheck className="w-3.5 h-3.5 text-accent" />
            <span className="text-[11px] font-semibold text-ink">SSL himoyalangan</span>
          </div>
          <div className="hidden sm:flex absolute -top-6 -right-4 items-center gap-2 bg-surface border border-line rounded-full px-3 py-1.5 shadow-[0_8px_20px_rgba(10,31,58,0.06)]">
            <span className="w-1.5 h-1.5 rounded-full bg-accent shadow-[0_0_8px_var(--accent)]" />
            <span className="text-[11px] font-semibold text-ink">24/7 onlayn</span>
          </div>

          {/* Main card */}
          <div className="bg-surface/95 backdrop-blur-xl border border-white rounded-[28px] shadow-[0_30px_80px_rgba(10,31,58,0.12)] p-7 md:p-10 relative overflow-hidden">
            {/* Decorative corner mark */}
            <div className="absolute top-0 left-0 w-full h-1" style={{ background: "linear-gradient(90deg, var(--brand), var(--accent))" }} />

            <div className="flex flex-col items-center text-center">
              {/* Icon badge with pulse */}
              <div className="relative mb-6">
                <span className="absolute inset-0 rounded-[18px] animate-ping opacity-20" style={{ background: "linear-gradient(135deg, var(--brand), var(--accent))" }} />
                <div className="relative w-[70px] h-[70px] rounded-[18px] grid place-items-center text-white shadow-[0_10px_24px_rgba(30,109,216,0.28)]" style={{ background: "linear-gradient(135deg, var(--brand) 0%, var(--brand-ink) 100%)", color: "#fff" }}>
                  <ShieldCheck className="w-8 h-8" strokeWidth={2.25} />
                </div>
              </div>

              {/* Eyebrow */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-brand-soft text-brand text-[10.5px] font-bold uppercase tracking-[0.18em] rounded-full mb-4">
                <Sparkles className="w-3 h-3" /> Xavfsiz kirish
              </div>

              {/* Title */}
              <h2 className="font-display font-normal text-[28px] md:text-[34px] tracking-tight leading-[1.05] mb-3 text-balance">
                {titleLead} <em className="italic" style={{ background: "linear-gradient(135deg, #4D94F5 0%, #1E6DD8 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>{lastWord}</em>
              </h2>

              <p className="text-[14px] md:text-[14.5px] text-ink-soft leading-relaxed mb-7 max-w-[36ch]">{message}</p>

              {/* Benefit strip */}
              <div className="grid grid-cols-3 gap-2 w-full mb-7">
                {[
                  { icon: Stethoscope, label: "140+ shifokor" },
                  { icon: HeartPulse,  label: "2 daqiqa" },
                  { icon: FileText,    label: "Tahlillar" },
                ].map((b, i) => (
                  <div key={i} className="flex flex-col items-center gap-1.5 py-2.5 px-2 bg-bg/60 rounded-xl border border-line/40">
                    <b.icon className="w-4 h-4 text-brand" />
                    <span className="text-[10.5px] font-semibold text-ink-soft">{b.label}</span>
                  </div>
                ))}
              </div>

              {/* CTAs */}
              <div className="flex flex-col gap-2.5 w-full mb-5">
                <Link href={`/login${nextParam}`} className="group relative h-12 rounded-2xl text-white font-semibold text-[14px] inline-flex items-center justify-center gap-2 overflow-hidden transition-transform hover:scale-[1.01]" style={{ color: "#fff" }}>
                  <span className="absolute inset-0 transition-transform group-hover:scale-105" style={{ background: "linear-gradient(135deg, var(--brand) 0%, var(--brand-ink) 100%)", boxShadow: "0 10px 24px rgba(30,109,216,0.32)" }} />
                  <LogIn className="w-[17px] h-[17px] relative" strokeWidth={2.5} />
                  <span className="relative">Tizimga kirish</span>
                  <span className="relative transition-transform group-hover:translate-x-0.5" style={{ color: "#35D59B" }}>→</span>
                </Link>
                <Link href={`/register${nextParam}`} className="h-12 rounded-2xl bg-bg/60 border border-line-strong text-ink font-semibold text-[14px] inline-flex items-center justify-center gap-2 hover:border-brand hover:text-brand transition-all">
                  <UserPlus className="w-[17px] h-[17px]" />
                  Yangi hisob ochish
                </Link>
              </div>

              {/* Demo credentials — modern card with copy */}
              <div className="w-full rounded-2xl p-4 border border-brand/20 relative overflow-hidden" style={{ background: "linear-gradient(135deg, rgba(234,242,253,0.9), rgba(231,248,240,0.7))" }}>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="inline-flex items-center gap-1.5 text-[11px] font-bold text-brand uppercase tracking-wider">
                    <Sparkles className="w-3 h-3" /> Demo bemor hisobi
                  </div>
                  <span className="text-[9.5px] font-bold px-1.5 py-0.5 bg-accent text-white rounded" style={{ color: "#fff" }}>TAYYOR</span>
                </div>
                <div className="flex flex-col gap-1.5 text-left">
                  <button type="button" onClick={() => copy(DEMO_PATIENT.phone, "phone")} className="group flex items-center justify-between gap-2 px-3 py-2 bg-surface/80 hover:bg-surface border border-line/60 rounded-lg transition-all">
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="text-[10.5px] font-bold text-muted uppercase tracking-wider">Tel</span>
                      <span className="text-[13px] font-semibold text-ink tabular-nums truncate">{DEMO_PATIENT.phone}</span>
                    </div>
                    {copied === "phone" ? <Check className="w-3.5 h-3.5 text-accent shrink-0" /> : <Copy className="w-3.5 h-3.5 text-muted group-hover:text-brand shrink-0" />}
                  </button>
                  <button type="button" onClick={() => copy(DEMO_PATIENT.password, "pass")} className="group flex items-center justify-between gap-2 px-3 py-2 bg-surface/80 hover:bg-surface border border-line/60 rounded-lg transition-all">
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="text-[10.5px] font-bold text-muted uppercase tracking-wider">Parol</span>
                      <span className="text-[13px] font-semibold text-ink font-mono truncate">{DEMO_PATIENT.password}</span>
                    </div>
                    {copied === "pass" ? <Check className="w-3.5 h-3.5 text-accent shrink-0" /> : <Copy className="w-3.5 h-3.5 text-muted group-hover:text-brand shrink-0" />}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
