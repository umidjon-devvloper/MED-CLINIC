"use client";

import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Plus, Eye, EyeOff, Phone, Lock, Mail, User, ArrowRight, Loader2, Stethoscope, Briefcase, GraduationCap } from "lucide-react";
import { useToast } from "@/components/ui/Toast";
import { registerAndLogin } from "@/lib/auth";
import { AuthBackground } from "@/components/ui/AuthBackground";

const registerSchema = z.object({
  firstName: z.string().min(2, "Ismni to'liq kiriting"),
  lastName: z.string().min(2, "Familiyani to'liq kiriting"),
  phone: z.string().min(9, "Telefon raqamini to'liq kiriting"),
  email: z.string().email("Email noto'g'ri").optional().or(z.literal("")),
  password: z.string().min(6, "Parol kamida 6 belgi"),
  passwordConfirm: z.string(),
  specialty: z.string().optional(),
  experience: z.string().optional(),
  licenseNo: z.string().optional(),
  terms: z.boolean().refine((v) => v === true, { message: "Shartlarga rozilik bering" }),
}).refine(d => d.password === d.passwordConfirm, { message: "Parollar mos emas", path: ["passwordConfirm"] });

type RegisterForm = z.infer<typeof registerSchema>;

const doctorSpecialties = [
  "Kardiologiya", "Nevrologiya", "Pediatriya", "Dermatologiya",
  "Stomatologiya", "Terapiya", "Oftalmologiya", "LOR", "Ginekologiya",
  "Urologiya", "Endokrinologiya", "Psixoterapiya", "Boshqa",
];

export default function RegisterPage() {
  const [showPwd, setShowPwd] = useState(false);
  const [showPwd2, setShowPwd2] = useState(false);
  const [role, setRole] = useState<"patient" | "doctor">("patient");
  const toast = useToast();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
    defaultValues: { phone: "+998 ", terms: false },
  });

  async function onSubmit(data: RegisterForm) {
    if (role === "doctor") {
      if (!data.specialty) { toast.show("Mutaxassislikni tanlang", "error"); return; }
      if (!data.licenseNo || data.licenseNo.length < 4) { toast.show("Litsenziya raqamini kiriting", "error"); return; }
    }
    await new Promise(r => setTimeout(r, 800));
    registerAndLogin({
      phone: data.phone, firstName: data.firstName, lastName: data.lastName,
      role, specialty: data.specialty,
    });
    const next = typeof window !== "undefined" ? new URLSearchParams(window.location.search).get("next") : null;
    const dest = next || (role === "doctor" ? "/doctor-dashboard" : "/dashboard");
    toast.show(role === "doctor" ? "Shifokor hisobi yaratildi!" : "Hisob yaratildi! Kabinetga o'tilyapti...", "success");
    setTimeout(() => { window.location.href = dest; }, 900);
  }

  return (
    <div className="relative min-h-screen flex flex-col md:grid md:place-items-center p-4 md:p-6 md:py-10">
      <AuthBackground />

      {/* Logo — flows at top on mobile, absolute corner on desktop */}
      <Link href="/" className="relative md:absolute md:top-8 md:left-10 flex items-center gap-2.5 font-extrabold text-lg z-10 self-start mb-8 md:mb-0 md:self-auto">
        <span className="w-10 h-10 rounded-xl grid place-items-center text-white relative shrink-0" style={{ background: "linear-gradient(135deg, var(--brand), var(--brand-ink))", color: "#fff" }}>
          <Plus className="w-5 h-5" strokeWidth={2.75} />
          <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-accent border-2 border-surface" />
        </span>
        <span className="text-ink">MED</span>
        <em className="font-display italic font-medium text-brand text-[1.2rem] -ml-0.5">CLINIC</em>
      </Link>

      <div className="w-full max-w-lg relative mx-auto my-auto md:m-0">
        <div className="text-center mb-7">
          <h1 className="font-display font-normal text-ink leading-[1.05] tracking-[-0.02em]" style={{ fontSize: "clamp(30px, 3.5vw, 42px)" }}>
            Yangi <em className="italic" style={{ background: "linear-gradient(135deg, #4D94F5 0%, #1E6DD8 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>hisob</em> yarating
          </h1>
          <p className="text-[14px] text-ink-soft mt-3">
            Hisobingiz bormi? <Link href="/login" className="text-brand font-semibold hover:underline">Kiring</Link>
          </p>
        </div>

          {/* Role selector */}
          <div className="mb-5">
            <div className="text-xs font-semibold text-ink-soft mb-2 tracking-wide">KIM SIFATIDA RO&apos;YXATDAN O&apos;TASIZ?</div>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setRole("patient")}
                className={`flex flex-col items-center gap-1.5 py-4 px-3 border-2 rounded-xl transition-all ${role === "patient" ? "border-brand bg-brand-soft/40" : "border-line-strong bg-surface hover:border-brand/50"}`}
              >
                <div className={`w-10 h-10 rounded-full grid place-items-center ${role === "patient" ? "bg-brand text-white" : "bg-brand-soft text-brand"}`} style={role === "patient" ? { color: "#fff" } : undefined}>
                  <User className="w-5 h-5" />
                </div>
                <div className="font-bold text-sm text-ink">Bemor</div>
                <div className="text-[11px] text-muted text-center leading-tight">Qabulga yoziling, hujjatlaringizni saqlang</div>
              </button>
              <button
                type="button"
                onClick={() => setRole("doctor")}
                className={`flex flex-col items-center gap-1.5 py-4 px-3 border-2 rounded-xl transition-all ${role === "doctor" ? "border-brand bg-brand-soft/40" : "border-line-strong bg-surface hover:border-brand/50"}`}
              >
                <div className={`w-10 h-10 rounded-full grid place-items-center ${role === "doctor" ? "bg-brand text-white" : "bg-brand-soft text-brand"}`} style={role === "doctor" ? { color: "#fff" } : undefined}>
                  <Stethoscope className="w-5 h-5" />
                </div>
                <div className="font-bold text-sm text-ink">Shifokor</div>
                <div className="text-[11px] text-muted text-center leading-tight">Jadval, bemorlar va daromadni boshqaring</div>
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-ink-soft mb-1.5 tracking-wide">ISM</label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
                  <input {...register("firstName")} className="w-full pl-10 pr-3 py-3 bg-surface border border-line-strong rounded-xl text-[14.5px] text-ink outline-none focus:border-brand focus:shadow-[0_0_0_3px_rgba(30,109,216,.12)] transition-all" placeholder="Umidjon" />
                </div>
                {errors.firstName && <p className="text-xs text-danger mt-1">{errors.firstName.message}</p>}
              </div>
              <div>
                <label className="block text-xs font-semibold text-ink-soft mb-1.5 tracking-wide">FAMILIYA</label>
                <input {...register("lastName")} className="w-full px-3 py-3 bg-surface border border-line-strong rounded-xl text-[14.5px] text-ink outline-none focus:border-brand focus:shadow-[0_0_0_3px_rgba(30,109,216,.12)] transition-all" placeholder="Afforov" />
                {errors.lastName && <p className="text-xs text-danger mt-1">{errors.lastName.message}</p>}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-ink-soft mb-1.5 tracking-wide">TELEFON</label>
              <div className="relative">
                <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
                <input {...register("phone")} type="tel" className="w-full pl-10 pr-3 py-3 bg-surface border border-line-strong rounded-xl text-[14.5px] text-ink outline-none focus:border-brand focus:shadow-[0_0_0_3px_rgba(30,109,216,.12)] transition-all" placeholder="+998 90 123 45 67" />
              </div>
              {errors.phone && <p className="text-xs text-danger mt-1">{errors.phone.message}</p>}
            </div>

            <div>
              <label className="block text-xs font-semibold text-ink-soft mb-1.5 tracking-wide">EMAIL (ixtiyoriy)</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
                <input {...register("email")} type="email" className="w-full pl-10 pr-3 py-3 bg-surface border border-line-strong rounded-xl text-[14.5px] text-ink outline-none focus:border-brand focus:shadow-[0_0_0_3px_rgba(30,109,216,.12)] transition-all" placeholder="siz@example.com" />
              </div>
              {errors.email && <p className="text-xs text-danger mt-1">{errors.email.message}</p>}
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-ink-soft mb-1.5 tracking-wide">PAROL</label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
                  <input {...register("password")} type={showPwd ? "text" : "password"} className="w-full pl-10 pr-9 py-3 bg-surface border border-line-strong rounded-xl text-[14.5px] text-ink outline-none focus:border-brand focus:shadow-[0_0_0_3px_rgba(30,109,216,.12)] transition-all" placeholder="••••••" />
                  <button type="button" onClick={() => setShowPwd(v => !v)} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted hover:text-brand">
                    {showPwd ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {errors.password && <p className="text-xs text-danger mt-1">{errors.password.message}</p>}
              </div>
              <div>
                <label className="block text-xs font-semibold text-ink-soft mb-1.5 tracking-wide">TASDIQLASH</label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
                  <input {...register("passwordConfirm")} type={showPwd2 ? "text" : "password"} className="w-full pl-10 pr-9 py-3 bg-surface border border-line-strong rounded-xl text-[14.5px] text-ink outline-none focus:border-brand focus:shadow-[0_0_0_3px_rgba(30,109,216,.12)] transition-all" placeholder="••••••" />
                  <button type="button" onClick={() => setShowPwd2(v => !v)} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted hover:text-brand">
                    {showPwd2 ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {errors.passwordConfirm && <p className="text-xs text-danger mt-1">{errors.passwordConfirm.message}</p>}
              </div>
            </div>

            {role === "doctor" && (
              <div className="bg-brand-soft/40 border border-brand-soft rounded-xl p-4 flex flex-col gap-3 mt-1">
                <div className="text-xs font-bold text-brand uppercase tracking-wider inline-flex items-center gap-1.5">
                  <Stethoscope className="w-3.5 h-3.5" />
                  Shifokor ma&apos;lumotlari
                </div>
                <div>
                  <label className="block text-xs font-semibold text-ink-soft mb-1.5 tracking-wide">MUTAXASSISLIK</label>
                  <div className="relative">
                    <Briefcase className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted pointer-events-none z-10" />
                    <select {...register("specialty")} className="w-full pl-10 pr-3 py-3 bg-surface border border-line-strong rounded-xl text-[14.5px] text-ink outline-none focus:border-brand transition-all appearance-none">
                      <option value="">— Tanlang —</option>
                      {doctorSpecialties.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-ink-soft mb-1.5 tracking-wide">TAJRIBA (yil)</label>
                    <div className="relative">
                      <GraduationCap className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
                      <input {...register("experience")} type="number" min={0} max={60} placeholder="5" className="w-full pl-10 pr-3 py-3 bg-surface border border-line-strong rounded-xl text-[14.5px] text-ink outline-none focus:border-brand transition-all" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-ink-soft mb-1.5 tracking-wide">LITSENZIYA №</label>
                    <input {...register("licenseNo")} placeholder="UZ-DR-12345" className="w-full px-3 py-3 bg-surface border border-line-strong rounded-xl text-[14.5px] text-ink outline-none focus:border-brand transition-all" />
                  </div>
                </div>
                <div className="text-[11.5px] text-ink-soft leading-relaxed">
                  Ma&apos;lumotlar admin tomonidan 24 soat ichida tekshiriladi. Tasdiqlangandan so&apos;ng profilingiz katalogda ko&apos;rinadi.
                </div>
              </div>
            )}

            <label className="inline-flex items-start gap-2.5 text-[13px] text-ink-soft cursor-pointer mt-2">
              <input {...register("terms")} type="checkbox" className="w-4 h-4 accent-brand mt-0.5" />
              <span>Men <a href="#" className="text-brand font-semibold">Foydalanish shartlari</a> va <a href="#" className="text-brand font-semibold">Maxfiylik siyosati</a>ga roziman</span>
            </label>
            {errors.terms && <p className="text-xs text-danger -mt-1">{errors.terms.message}</p>}

            <button type="submit" disabled={isSubmitting} style={{ color: "#fff", background: "linear-gradient(135deg, #4D94F5 0%, #1E6DD8 100%)" }} className="inline-flex items-center justify-center gap-2 !text-white rounded-2xl py-4 text-[15px] font-bold shadow-[0_10px_24px_rgba(30,109,216,0.3)] hover:shadow-[0_14px_32px_rgba(30,109,216,0.4)] hover:-translate-y-0.5 transition-all disabled:opacity-60 disabled:cursor-not-allowed mt-3">
              {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
              {isSubmitting ? "Yaratilmoqda..." : role === "doctor" ? "Shifokor sifatida ro'yxatdan o'tish" : "Ro'yxatdan o'tish"}
              {!isSubmitting && <ArrowRight className="w-4 h-4" />}
            </button>
          </form>
      </div>
    </div>
  );
}
