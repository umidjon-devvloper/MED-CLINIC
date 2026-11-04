"use client";

import { useEffect, useState, type ReactNode } from "react";
import Link from "next/link";
import { Lock, LogIn, UserPlus, Info } from "lucide-react";
import { getUser, DEMO_PATIENT } from "@/lib/auth";

type Props = {
  children: ReactNode;
  /** Where to send the user back after they log in. Defaults to current pathname. */
  redirectTo?: string;
  title?: string;
  message?: string;
};

export function AuthGate({ children, redirectTo, title = "Kirish talab qilinadi", message = "Qabulga yozilish uchun avval ro'yxatdan o'ting yoki tizimga kiring. Bu bir daqiqa oladi." }: Props) {
  const [state, setState] = useState<"loading" | "authed" | "anon">("loading");

  useEffect(() => {
    const user = getUser();
    setState(user ? "authed" : "anon");
  }, []);

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
    return (
      <div className="min-h-[70vh] grid place-items-center py-10 px-4">
        <div className="max-w-md w-full bg-surface border border-line rounded-3xl shadow-[0_20px_50px_rgba(10,31,58,0.08)] p-7 md:p-9 text-center">
          <div className="w-16 h-16 rounded-2xl bg-brand-soft text-brand grid place-items-center mx-auto mb-5">
            <Lock className="w-7 h-7" />
          </div>
          <h2 className="font-display font-normal text-[26px] md:text-[32px] tracking-tight leading-tight mb-2">
            {title.split(" ").slice(0, -1).join(" ")} <em className="italic text-brand">{title.split(" ").slice(-1)[0]}</em>
          </h2>
          <p className="text-sm md:text-[14.5px] text-ink-soft leading-relaxed mb-6">{message}</p>

          <div className="flex flex-col sm:flex-row gap-2.5 mb-5">
            <Link href={`/login${nextParam}`} className="btn btn-primary btn-lg justify-center flex-1">
              <LogIn className="w-4 h-4" />
              Kirish
            </Link>
            <Link href={`/register${nextParam}`} className="btn btn-outline btn-lg justify-center flex-1">
              <UserPlus className="w-4 h-4" />
              Ro&apos;yxatdan o&apos;tish
            </Link>
          </div>

          <div className="bg-brand-soft/50 border border-brand-soft rounded-xl p-3.5 text-left">
            <div className="flex items-start gap-2.5">
              <Info className="w-4 h-4 text-brand shrink-0 mt-0.5" />
              <div className="text-[12.5px] leading-relaxed">
                <div className="font-bold text-brand mb-1">Demo bemor hisobi:</div>
                <div className="text-ink-soft tabular-nums">
                  Telefon: <b className="text-ink">{DEMO_PATIENT.phone}</b><br />
                  Parol: <b className="text-ink">{DEMO_PATIENT.password}</b>
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
