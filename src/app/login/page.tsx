"use client";

import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Plus, Eye, EyeOff, Phone, Lock, ArrowRight, Loader2, User, Stethoscope, Info } from "lucide-react";
import { useToast } from "@/components/ui/Toast";
import { tryLogin, DEMO_PATIENT, DEMO_DOCTOR } from "@/lib/auth";
import { AuthBackground } from "@/components/ui/AuthBackground";

const loginSchema = z.object({
  phone: z.string().min(9, "Telefon raqamini to'liq kiriting"),
  password: z.string().min(6, "Parol kamida 6 belgi bo'lishi kerak"),
  remember: z.boolean().optional(),
});
type LoginForm = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const [showPwd, setShowPwd] = useState(false);
  const [role, setRole] = useState<"patient" | "doctor">("patient");
  const [showDemo, setShowDemo] = useState(false);
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
    const next = typeof window !== "undefined" ? new URLSearchParams(window.location.search).get("next") : null;
    const dest = next || (user.role === "doctor" ? "/doctor-dashboard" : "/dashboard");
    toast.show(user.role === "doctor" ? "Shifokor sifatida kirdingiz" : `Xush kelibsiz${user.firstName ? ", " + user.firstName : ""}!`, "success");
    setTimeout(() => { window.location.href = dest; }, 700);
  }

  return (
    <div className="relative min-h-screen grid place-items-center p-4 md:p-6">
      <AuthBackground />

      {/* Logo top-left */}
      <Link href="/" className="absolute top-6 left-6 md:top-8 md:left-10 flex items-center gap-2.5 font-extrabold text-lg z-10">
        <span className="w-10 h-10 rounded-xl grid place-items-center text-white relative" style={{ background: "linear-gradient(135deg, var(--brand), var(--brand-ink))", color: "#fff" }}>
          <Plus className="w-5 h-5" strokeWidth={2.75} />
          <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-accent border-2 border-surface" />
        </span>
        <span className="text-ink">MED</span>
        <em className="font-display italic font-medium text-brand text-[1.2rem] -ml-0.5">CLINIC</em>
      </Link>

      {/* Centered card */}
      <div className="w-full max-w-md relative">
        <div className="text-center mb-8">
          <h1 className="font-display font-normal text-ink leading-[1.05] tracking-[-0.02em]" style={{ fontSize: "clamp(32px, 4vw, 44px)" }}>
            Shaxsiy <em className="italic" style={{ background: "linear-gradient(135deg, #4D94F5 0%, #1E6DD8 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>kabinetga</em> kirish
          </h1>
          <p className="text-[14px] text-ink-soft mt-3">
            Hali hisob yo&apos;qmi? <Link href="/register" className="text-brand font-semibold hover:underline">Ro&apos;yxatdan o&apos;ting</Link>
          </p>
        </div>

        {/* Role selector */}
        <div className="grid grid-cols-2 gap-2 p-1.5 bg-surface border border-line-strong rounded-2xl mb-6 shadow-[0_2px_8px_rgba(10,31,58,0.04)]">
          {([
            { key: "patient" as const, icon: User, label: "Bemor" },
            { key: "doctor"  as const, icon: Stethoscope, label: "Shifokor" },
          ]).map((r) => {
            const on = role === r.key;
            return (
              <button
                key={r.key}
                type="button"
                onClick={() => setRole(r.key)}
                style={on ? { color: "#fff", background: "linear-gradient(135deg, #4D94F5 0%, #1E6DD8 100%)" } : undefined}
                className={`inline-flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold transition-all ${on ? "!text-white shadow-[0_6px_16px_rgba(30,109,216,0.3)]" : "text-ink-soft hover:text-brand"}`}
              >
                <r.icon className="w-4 h-4" />
                {r.label}
              </button>
            );
          })}
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
          <div>
            <label className="block text-[11px] font-bold text-ink-soft mb-2 tracking-[0.15em] uppercase">Telefon raqami</label>
            <div className="relative">
              <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brand" />
              <input {...register("phone")} type="tel" placeholder="+998 90 123 45 67" className="w-full pl-11 pr-4 py-4 bg-surface border border-line-strong rounded-2xl text-[15px] text-ink outline-none focus:border-brand focus:shadow-[0_0_0_4px_rgba(30,109,216,.1)] transition-all" />
            </div>
            {errors.phone && <p className="text-xs text-danger mt-1.5">{errors.phone.message}</p>}
          </div>

          <div>
            <label className="block text-[11px] font-bold text-ink-soft mb-2 tracking-[0.15em] uppercase">Parol</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brand" />
              <input {...register("password")} type={showPwd ? "text" : "password"} placeholder="••••••••" className="w-full pl-11 pr-11 py-4 bg-surface border border-line-strong rounded-2xl text-[15px] text-ink outline-none focus:border-brand focus:shadow-[0_0_0_4px_rgba(30,109,216,.1)] transition-all" />
              <button type="button" onClick={() => setShowPwd(v => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 grid place-items-center text-muted hover:text-brand">
                {showPwd ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {errors.password && <p className="text-xs text-danger mt-1.5">{errors.password.message}</p>}
          </div>

          <div className="flex items-center justify-between">
            <label className="inline-flex items-center gap-2 text-[13px] text-ink-soft cursor-pointer">
              <input {...register("remember")} type="checkbox" className="w-4 h-4 accent-brand" />
              Meni eslab qol
            </label>
            <a href="#" className="text-[13px] text-brand font-semibold hover:underline">Parolni unutdingizmi?</a>
          </div>

          <button type="submit" disabled={isSubmitting} style={{ color: "#fff", background: "linear-gradient(135deg, #4D94F5 0%, #1E6DD8 100%)" }} className="inline-flex items-center justify-center gap-2 !text-white rounded-2xl py-4 text-[15px] font-bold shadow-[0_10px_24px_rgba(30,109,216,0.3)] hover:shadow-[0_14px_32px_rgba(30,109,216,0.4)] hover:-translate-y-0.5 transition-all disabled:opacity-60 disabled:cursor-not-allowed mt-2">
            {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
            {isSubmitting ? "Kirilmoqda..." : "Kirish"}
            {!isSubmitting && <ArrowRight className="w-4 h-4" />}
          </button>
        </form>

        {/* Alternative method divider */}
        <div className="flex items-center gap-4 my-7 text-[12px] text-muted">
          <span className="flex-1 h-px bg-line" />
          <span>Yoki boshqa usulda kirish</span>
          <span className="flex-1 h-px bg-line" />
        </div>

        <button type="button" onClick={() => toast.show("SMS orqali kirish — tez orada", "info")} className="w-full inline-flex items-center justify-center gap-2 bg-surface border border-line-strong rounded-2xl py-4 text-[14px] font-semibold text-ink-soft hover:border-brand hover:text-brand transition-colors">
          <Phone className="w-4 h-4" />
          SMS orqali kirish
        </button>

        {/* Demo credentials — collapsible */}
        <div className="mt-6">
          <button type="button" onClick={() => setShowDemo((v) => !v)} className="w-full inline-flex items-center justify-center gap-1.5 text-[12.5px] text-brand hover:underline">
            <Info className="w-3.5 h-3.5" />
            {showDemo ? "Demo hisoblarni yashirish" : "Demo hisoblarni ko'rish"}
          </button>
          {showDemo && (
            <div className="mt-3 bg-surface border border-brand-soft rounded-xl p-3.5 grid grid-cols-2 gap-2 text-[12px]">
              <div className="bg-brand-soft/50 rounded-lg p-2.5">
                <div className="font-bold text-brand text-[10.5px] uppercase tracking-wider mb-1">Bemor</div>
                <div className="tabular-nums text-ink">{DEMO_PATIENT.phone}</div>
                <div className="tabular-nums text-ink-soft">parol: <b>{DEMO_PATIENT.password}</b></div>
              </div>
              <div className="bg-brand-soft/50 rounded-lg p-2.5">
                <div className="font-bold text-brand text-[10.5px] uppercase tracking-wider mb-1">Shifokor</div>
                <div className="tabular-nums text-ink">{DEMO_DOCTOR.phone}</div>
                <div className="tabular-nums text-ink-soft">parol: <b>{DEMO_DOCTOR.password}</b></div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
