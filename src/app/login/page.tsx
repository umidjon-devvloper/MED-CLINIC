"use client";

import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Plus, Eye, EyeOff, Phone, Lock, ArrowRight, Shield, Star, Loader2, User, Stethoscope, Info } from "lucide-react";
import { useToast } from "@/components/ui/Toast";
import { tryLogin, DEMO_PATIENT, DEMO_DOCTOR } from "@/lib/auth";

const loginSchema = z.object({
  phone: z.string().min(9, "Telefon raqamini to'liq kiriting"),
  password: z.string().min(6, "Parol kamida 6 belgi bo'lishi kerak"),
  remember: z.boolean().optional(),
});
type LoginForm = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const [showPwd, setShowPwd] = useState(false);
  const [role, setRole] = useState<"patient" | "doctor">("patient");
  const toast = useToast();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: { phone: "+998 ", password: "", remember: true },
  });

  async function onSubmit(data: LoginForm) {
    await new Promise(r => setTimeout(r, 700));
    const user = tryLogin(data.phone, data.password, role);
    if (!user) {
      toast.show("Login yoki parol noto'g'ri", "error");
      return;
    }
    // Where to go next — ?next=... overrides the role default
    const next = typeof window !== "undefined" ? new URLSearchParams(window.location.search).get("next") : null;
    const dest = next || (user.role === "doctor" ? "/doctor-dashboard" : "/dashboard");
    toast.show(user.role === "doctor" ? "Shifokor sifatida kirdingiz" : `Xush kelibsiz${user.firstName ? ", " + user.firstName : ""}!`, "success");
    setTimeout(() => { window.location.href = dest; }, 700);
  }

  return (
    <div className="min-h-screen grid lg:grid-cols-[1fr_1fr]">
      {/* LEFT panel */}
      <div className="hidden lg:flex relative overflow-hidden flex-col justify-between p-12 text-white" style={{ background: "linear-gradient(135deg, var(--brand-ink) 0%, var(--brand) 100%)" }}>
        <div className="absolute bottom-[-100px] right-[-100px] w-[500px] h-[500px] rounded-full" style={{ background: "radial-gradient(closest-side, rgba(255,255,255,.12), transparent 70%)" }} />
        <div className="absolute top-[-80px] left-[-80px] w-[260px] h-[260px] rounded-full" style={{ background: "radial-gradient(closest-side, rgba(255,255,255,.08), transparent 70%)" }} />

        <Link href="/" className="flex items-center gap-3 font-extrabold text-2xl tracking-wide relative z-10">
          <span className="w-12 h-12 rounded-xl grid place-items-center bg-white/15 backdrop-blur">
            <Plus className="w-6 h-6" strokeWidth={2.5} />
          </span>
          MED <em className="font-display italic font-medium text-[#BBD1EC] text-[1.6rem]">CLINIC</em>
        </Link>

        <div className="relative z-10">
          <blockquote className="font-display font-normal text-3xl leading-tight italic mb-6">
            &quot;MED CLINIC bilan sog&apos;lig&apos;im nazoratda. Qulay bron, aniq vaqtda qabul, zamonaviy dashboard — hammasi bir ilovada.&quot;
          </blockquote>
          <div className="flex items-center gap-3 mt-6">
            <div className="w-12 h-12 rounded-full grid place-items-center text-white font-bold text-sm bg-white/14">AS</div>
            <div>
              <div className="font-semibold">Aziza Saidova</div>
              <div className="text-[#BBD1EC] text-sm">3 yillik bemor · Toshkent</div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-white/20 grid grid-cols-3 gap-4">
            {[
              { v: "140+", l: "Shifokor" },
              { v: "25k+", l: "Bemor" },
              { v: "4.9", l: "Reyting" },
            ].map((s, i) => (
              <div key={i}>
                <div className="font-display font-medium text-2xl tabular-nums">{s.v}</div>
                <div className="text-[#BBD1EC] text-xs mt-1">{s.l}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10 flex items-center gap-6 text-[#BBD1EC] text-xs">
          <span className="inline-flex items-center gap-1.5"><Shield className="w-3.5 h-3.5" /> SSL himoyalangan</span>
          <span className="inline-flex items-center gap-1.5"><Star className="w-3.5 h-3.5 fill-current" /> 24/7 qo&apos;llab-quvvatlash</span>
        </div>
      </div>

      {/* RIGHT form */}
      <div className="flex flex-col items-center justify-center p-6 md:p-12 bg-bg">
        <div className="w-full max-w-md">
          <Link href="/" className="lg:hidden flex items-center gap-2.5 font-extrabold text-lg mb-8">
            <span className="w-10 h-10 rounded-xl grid place-items-center text-white" style={{ background: "linear-gradient(135deg, var(--brand), var(--brand-ink))" }}>
              <Plus className="w-5 h-5" strokeWidth={2.5} />
            </span>
            MED <em className="font-display italic font-medium text-brand text-[1.3rem]">CLINIC</em>
          </Link>

          <h1 className="font-display font-normal text-3xl md:text-[42px] tracking-tight leading-tight text-ink">
            Shaxsiy <em className="italic text-brand">kabinetga</em> kirish
          </h1>
          <p className="text-[14.5px] text-ink-soft mt-3 mb-6">
            Hali hisob yo&apos;qmi? <Link href="/register" className="text-brand font-semibold hover:underline">Ro&apos;yxatdan o&apos;ting</Link>
          </p>

          {/* Demo credentials hint */}
          <div className="mb-5 bg-brand-soft/50 border border-brand-soft rounded-xl p-3.5">
            <div className="flex items-start gap-2.5">
              <Info className="w-4 h-4 text-brand shrink-0 mt-0.5" />
              <div className="text-[12.5px] leading-relaxed flex-1">
                <div className="font-bold text-brand mb-1">Demo hisoblar bilan sinab ko&apos;ring:</div>
                <div className="grid grid-cols-2 gap-2 text-ink-soft">
                  <div className="bg-surface rounded-lg p-2">
                    <div className="font-bold text-ink text-[11px] uppercase tracking-wider mb-0.5">Bemor</div>
                    <div className="tabular-nums">{DEMO_PATIENT.phone}</div>
                    <div className="tabular-nums">parol: {DEMO_PATIENT.password}</div>
                  </div>
                  <div className="bg-surface rounded-lg p-2">
                    <div className="font-bold text-ink text-[11px] uppercase tracking-wider mb-0.5">Shifokor</div>
                    <div className="tabular-nums">{DEMO_DOCTOR.phone}</div>
                    <div className="tabular-nums">parol: {DEMO_DOCTOR.password}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Role selector */}
          <div className="grid grid-cols-2 gap-2 p-1 bg-surface border border-line-strong rounded-xl mb-5">
            <button
              type="button"
              onClick={() => setRole("patient")}
              style={role === "patient" ? { color: "#fff" } : undefined}
              className={`inline-flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold transition-all ${role === "patient" ? "bg-brand text-white shadow-sm" : "text-ink-soft hover:text-brand"}`}
            >
              <User className="w-4 h-4" />
              Bemor
            </button>
            <button
              type="button"
              onClick={() => setRole("doctor")}
              style={role === "doctor" ? { color: "#fff" } : undefined}
              className={`inline-flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold transition-all ${role === "doctor" ? "bg-brand text-white shadow-sm" : "text-ink-soft hover:text-brand"}`}
            >
              <Stethoscope className="w-4 h-4" />
              Shifokor
            </button>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <div>
              <label className="block text-xs font-semibold text-ink-soft mb-2 tracking-wide">TELEFON RAQAMI</label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
                <input {...register("phone")} type="tel" placeholder="+998 90 123 45 67" className="w-full pl-11 pr-4 py-3.5 bg-surface border border-line-strong rounded-xl text-[15px] text-ink outline-none focus:border-brand focus:shadow-[0_0_0_3px_rgba(30,109,216,.12)] transition-all" />
              </div>
              {errors.phone && <p className="text-xs text-danger mt-1.5">{errors.phone.message}</p>}
            </div>

            <div>
              <label className="block text-xs font-semibold text-ink-soft mb-2 tracking-wide">PAROL</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
                <input {...register("password")} type={showPwd ? "text" : "password"} placeholder="••••••••" className="w-full pl-11 pr-11 py-3.5 bg-surface border border-line-strong rounded-xl text-[15px] text-ink outline-none focus:border-brand focus:shadow-[0_0_0_3px_rgba(30,109,216,.12)] transition-all" />
                <button type="button" onClick={() => setShowPwd(v => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 grid place-items-center text-muted hover:text-brand">
                  {showPwd ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.password && <p className="text-xs text-danger mt-1.5">{errors.password.message}</p>}
            </div>

            <div className="flex items-center justify-between mt-1">
              <label className="inline-flex items-center gap-2 text-sm text-ink-soft cursor-pointer">
                <input {...register("remember")} type="checkbox" className="w-4 h-4 accent-brand" />
                Meni eslab qol
              </label>
              <a href="#" className="text-sm text-brand font-semibold hover:underline">Parolni unutdingizmi?</a>
            </div>

            <button type="submit" disabled={isSubmitting} style={{ color: "#fff" }} className="btn btn-primary btn-lg justify-center w-full mt-3 disabled:opacity-60">
              {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
              {isSubmitting ? "Kirilmoqda..." : "Kirish"}
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="text-center mt-8">
            <a href="#" className="text-sm text-ink-soft hover:text-brand inline-flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5" />
              SMS orqali kirish
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
