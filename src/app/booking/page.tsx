"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  X, Plus, Calendar, Sun, Moon, CloudSun, ChevronLeft, ChevronRight,
  CheckCircle2, ArrowLeft, ArrowRight, Shield, Star, Clock, Phone, MapPin,
} from "lucide-react";
import { services } from "@/lib/data/services";
import { doctors } from "@/lib/data/doctors";
import { AuthGate } from "@/components/ui/AuthGate";
import { getUser } from "@/lib/auth";
import { useToast } from "@/components/ui/Toast";

const STEPS = [
  { num: 1, label: "Mutaxassislik" },
  { num: 2, label: "Shifokor" },
  { num: 3, label: "Sana va vaqt" },
  { num: 4, label: "Ma'lumotlar" },
  { num: 5, label: "Tasdiq" },
  { num: 6, label: "Yakuniy" },
];

const colorMap: Record<string, string> = {
  blue: "linear-gradient(165deg, #D7E8FA 0%, #B5D4F2 100%)",
  mint: "linear-gradient(165deg, #D7F0E3 0%, #B4E0C9 100%)",
  lavender: "linear-gradient(165deg, #E4DFF5 0%, #C9BFE8 100%)",
  pink: "linear-gradient(165deg, #F5DFE8 0%, #ECC2D4 100%)",
};

export default function BookingPage() {
  return (
    <AuthGate title="Qabulga yozilish uchun kirish" message="Shifokor qabuliga yozilish uchun avval tizimga kiring yoki ro'yxatdan o'ting — barcha ma'lumotlar xavfsiz saqlanadi.">
      <BookingFlow />
    </AuthGate>
  );
}

function BookingFlow() {
  const toast = useToast();
  const [step, setStep] = useState(3);
  const [selectedDay, setSelectedDay] = useState(7);
  const [selectedTime, setSelectedTime] = useState("14:30");
  const [selectedSpecialty, setSelectedSpecialty] = useState("kardio");
  const [selectedDoctor, setSelectedDoctor] = useState("alisher-qodirov");
  const [termsAccepted, setTermsAccepted] = useState(true);

  // Step 4 form state (prefilled from the signed-in user)
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("+998 ");
  const [dob, setDob] = useState("");
  const [complaint, setComplaint] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    const u = getUser();
    if (u) {
      setFirstName(u.firstName || "");
      setLastName(u.lastName || "");
      if (u.phone) setPhone(u.phone);
    }
  }, []);

  const doctor = doctors.find((d) => d.id === selectedDoctor) ?? doctors[0];

  const validateStep4 = (): boolean => {
    const e: Record<string, string> = {};
    if (firstName.trim().length < 2) e.firstName = "Ismni to'liq kiriting";
    if (lastName.trim().length < 2) e.lastName = "Familiyani to'liq kiriting";
    const digits = phone.replace(/\D/g, "");
    if (digits.length < 12 || !digits.startsWith("998")) e.phone = "To'g'ri telefon kiriting (+998 ...)";
    if (!termsAccepted) e.terms = "Shartlarga roziligingizni belgilang";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = () => {
    if (step === 4 && !validateStep4()) {
      toast.show("Ma'lumotlarni to'ldirishda xato bor", "error");
      return;
    }
    setStep((s) => Math.min(6, s + 1));
  };
  const prev = () => setStep((s) => Math.max(1, s - 1));

  return (
    <div className="min-h-screen bg-bg">
      {/* MINI NAV */}
      <nav className="bg-white border-b border-line shadow-[0_2px_12px_rgba(10,31,58,0.04)]">
        <div className="container-x flex items-center gap-5 py-6 md:py-7" style={{ maxWidth: 1120 }}>
          <Link href="/" className="flex items-center gap-2.5 font-extrabold text-[1.1rem]">
            <span className="w-[34px] h-[34px] rounded-[10px] grid place-items-center text-white" style={{ background: "linear-gradient(135deg, var(--brand), var(--brand-ink))" }}>
              <Plus className="w-[18px] h-[18px]" strokeWidth={2.5} />
            </span>
            MED <em className="font-display italic font-medium text-brand text-[1.25rem]">CLINIC</em>
          </Link>
          <span className="hidden md:inline-block text-[14px] text-muted ml-4 pl-6 border-l border-line">
            Onlayn qabulga yozilish
          </span>
          <Link
            href="/"
            aria-label="Yopish"
            className="ml-auto w-10 h-10 rounded-[10px] border border-line-strong bg-white text-ink-soft grid place-items-center hover:text-brand hover:border-brand transition-colors"
          >
            <X className="w-[18px] h-[18px]" />
          </Link>
        </div>
      </nav>

      {/* STEPPER */}
      <div className="bg-white border-b border-line py-8 md:py-10">
        <div className="container-x" style={{ maxWidth: 1120 }}>
          <div className="grid grid-cols-6 gap-2 md:gap-3 max-w-[920px] mx-auto">
            {STEPS.map((s) => {
              const done = s.num < step;
              const current = s.num === step;
              return (
                <div key={s.num} className="flex flex-col gap-2 relative pb-5 md:pb-0">
                  <div
                    className="h-[3px] rounded-full"
                    style={{ background: done ? "var(--accent)" : current ? "var(--brand)" : "var(--line)" }}
                  />
                  <div className="hidden md:flex items-center gap-2 text-[12.5px]" style={{ color: current ? "var(--ink)" : done ? "var(--ink-soft)" : "var(--muted)" }}>
                    <span
                      className="w-[22px] h-[22px] rounded-full grid place-items-center text-[11px] font-bold border-[1.5px] shrink-0 tabular-nums"
                      style={{
                        background: done ? "var(--accent)" : current ? "var(--brand)" : "var(--surface)",
                        color: done || current ? "#fff" : "var(--muted)",
                        borderColor: done ? "var(--accent)" : current ? "var(--brand)" : "var(--line-strong)",
                      }}
                    >
                      {done ? <CheckCircle2 className="w-3 h-3" /> : s.num}
                    </span>
                    <span className={current ? "font-semibold" : ""}>{s.label}</span>
                  </div>
                  {current && (
                    <span className="md:hidden absolute top-5 left-0 right-0 text-center text-[11px] font-semibold text-brand whitespace-nowrap">
                      {s.label}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* BOOKING BODY */}
      <section className="py-8 md:py-10">
        <div className="container-x grid lg:grid-cols-[1fr_360px] gap-8 lg:gap-10 items-start" style={{ maxWidth: 1120 }}>
          <div>
            {/* STEP HEAD */}
            <div className="mb-6">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-brand-soft text-brand text-[11.5px] font-semibold uppercase tracking-wider rounded-full mb-3">
                {step}-qadam · 6 dan
              </span>
              <h1 className="font-display font-normal text-ink leading-[1.0] mb-3" style={{ fontSize: "clamp(24px, 4vw, 44px)", letterSpacing: "-0.025em" }}>
                {stepTitle(step)}
              </h1>
              <p className="text-[14px] md:text-[15px] text-ink-soft max-w-[55ch]">
                {stepSubtitle(step)}
              </p>
            </div>

            {/* STEPS */}
            {step === 1 && (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {services.slice(0, 8).map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setSelectedSpecialty(s.id)}
                    className={`p-4 rounded-2xl border bg-white text-left transition-all hover:border-brand hover:shadow-md ${selectedSpecialty === s.id ? "border-brand shadow-md ring-2 ring-brand-soft" : "border-line"}`}
                  >
                    <div className="text-4xl mb-3">{s.icon}</div>
                    <div className="font-semibold text-ink text-[14px] mb-0.5">{s.name}</div>
                    <div className="text-[12px] text-muted">24 shifokor</div>
                  </button>
                ))}
              </div>
            )}

            {step === 2 && (
              <div className="flex flex-col gap-3">
                {doctors.slice(0, 3).map((d) => (
                  <button
                    key={d.id}
                    onClick={() => setSelectedDoctor(d.id)}
                    className={`p-4 rounded-2xl border bg-white flex items-center gap-4 text-left transition-all hover:border-brand ${selectedDoctor === d.id ? "border-brand shadow-md ring-2 ring-brand-soft" : "border-line"}`}
                  >
                    <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 grid place-items-end justify-center" style={{ background: colorMap[d.color] }}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={d.photo} alt={d.name} className="max-w-[92%] max-h-full object-contain object-bottom" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-ink text-[15px]">{d.name}</div>
                      <div className="text-[12.5px] text-brand font-medium">{d.specialty} · {d.experience} yil</div>
                      <div className="text-[12px] text-muted mt-1 inline-flex items-center gap-1">
                        <Star className="w-3 h-3 text-warn fill-warn" /> {d.rating} · {d.reviews} sharh
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="font-display font-medium text-ink text-[18px] tabular-nums">{(d.price / 1000).toFixed(0)}k</div>
                      <div className="text-[11px] text-muted uppercase tracking-wider font-semibold">so&apos;m</div>
                    </div>
                  </button>
                ))}
              </div>
            )}

            {step === 3 && (
              <>
                {/* CALENDAR */}
                <div className="bg-white border border-line rounded-2xl p-6 md:p-7">
                  <div className="flex items-center justify-between gap-4 mb-4">
                    <h3 className="font-display font-normal text-[22px] md:text-[24px]" style={{ letterSpacing: "-0.01em" }}>
                      Noyabr <em className="italic text-brand">2026</em>
                    </h3>
                    <div className="flex gap-1.5">
                      <button aria-label="Oldingi oy" className="w-9 h-9 rounded-[9px] border border-line-strong bg-white text-ink-soft grid place-items-center hover:text-brand hover:border-brand transition-colors">
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <button aria-label="Keyingi oy" className="w-9 h-9 rounded-[9px] border border-line-strong bg-white text-ink-soft grid place-items-center hover:text-brand hover:border-brand transition-colors">
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-7 gap-1.5">
                    {["Du","Se","Ch","Pa","Ju","Sh","Ya"].map((d) => (
                      <div key={d} className="text-[11px] text-muted text-center font-bold uppercase tracking-wider py-1.5">{d}</div>
                    ))}
                    {calendarDays().map((d) => {
                      const isSel = d.day === selectedDay && d.inMonth;
                      return (
                        <button
                          key={`${d.key}`}
                          disabled={!d.inMonth}
                          onClick={() => d.inMonth && setSelectedDay(d.day)}
                          className={`aspect-square grid place-items-center text-[14px] font-medium rounded-[10px] tabular-nums relative transition-colors ${
                            !d.inMonth ? "text-muted opacity-40 cursor-not-allowed" :
                            isSel ? "bg-brand text-white font-bold" :
                            "text-ink hover:bg-brand-soft hover:text-brand"
                          }`}
                        >
                          {d.day}
                          {d.has && d.inMonth && !isSel && (
                            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-accent" />
                          )}
                          {d.has && isSel && (
                            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-white" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  <div className="flex gap-5 mt-5 pt-5 border-t border-line text-[12.5px] text-muted flex-wrap">
                    <span className="inline-flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-brand" />Tanlangan</span>
                    <span className="inline-flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-accent" />Bo&apos;sh vaqti bor</span>
                    <span className="inline-flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-line-strong" />Band / dam olish</span>
                  </div>
                </div>

                {/* TIMES */}
                <div className="bg-white border border-line rounded-2xl p-6 md:p-7 mt-5">
                  <div className="flex items-baseline justify-between mb-5 flex-wrap gap-2">
                    <h3 className="font-display font-normal text-[20px] md:text-[22px]" style={{ letterSpacing: "-0.01em" }}>
                      Juma, <em className="italic text-brand">{selectedDay}-noyabr</em>
                    </h3>
                    <div className="text-[12.5px] text-muted">Bo&apos;sh: <b className="text-ink font-semibold">8 ta vaqt</b></div>
                  </div>

                  {[
                    { label: "Ertalab", icon: Sun, times: ["09:00","09:30","10:00","10:30","11:00","11:30"], off: ["09:00","10:00","11:30"] },
                    { label: "Tushdan keyin", icon: CloudSun, times: ["13:00","13:30","14:00","14:30","15:00","15:30"], off: [] },
                    { label: "Kech", icon: Moon, times: ["16:00","16:30","17:00","17:30","18:00","18:30"], off: ["16:00","16:30","17:00","17:30","18:00","18:30"] },
                  ].map((grp) => {
                    const Icon = grp.icon;
                    return (
                      <div key={grp.label} className="mb-5 last:mb-0">
                        <div className="text-[11.5px] font-bold text-muted uppercase mb-2.5 flex items-center gap-1.5" style={{ letterSpacing: "0.06em" }}>
                          <Icon className="w-3.5 h-3.5" /> {grp.label}
                        </div>
                        <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
                          {grp.times.map((t) => {
                            const isOff = grp.off.includes(t);
                            const isSel = selectedTime === t && !isOff;
                            return (
                              <button
                                key={t}
                                disabled={isOff}
                                onClick={() => !isOff && setSelectedTime(t)}
                                className={`py-2.5 text-center text-[12.5px] md:text-[13.5px] font-medium rounded-[10px] border tabular-nums transition-colors ${
                                  isOff ? "text-muted bg-bg border-line-strong line-through opacity-55 cursor-not-allowed" :
                                  isSel ? "bg-brand text-white border-brand font-bold shadow-md" :
                                  "text-ink bg-white border-line-strong hover:border-brand hover:text-brand hover:bg-brand-soft"
                                }`}
                              >
                                {t}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            )}

            {step === 4 && (
              <form onSubmit={(e) => e.preventDefault()} className="bg-white border border-line rounded-2xl p-6 md:p-7 space-y-5">
                <div className="grid md:grid-cols-2 gap-4">
                  <Field label="Ism" required>
                    <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="Masalan: Umidjon" className={`field-input ${errors.firstName ? "border-danger" : ""}`} />
                    {errors.firstName && <p className="text-xs text-danger mt-1">{errors.firstName}</p>}
                  </Field>
                  <Field label="Familiya" required>
                    <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Afforov" className={`field-input ${errors.lastName ? "border-danger" : ""}`} />
                    {errors.lastName && <p className="text-xs text-danger mt-1">{errors.lastName}</p>}
                  </Field>
                </div>
                <Field label="Telefon raqami" required>
                  <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+998 90 123 45 67" className={`field-input tabular-nums ${errors.phone ? "border-danger" : ""}`} />
                  {errors.phone && <p className="text-xs text-danger mt-1">{errors.phone}</p>}
                </Field>
                <Field label="Tug'ilgan sana"><input type="date" value={dob} onChange={(e) => setDob(e.target.value)} className="field-input" /></Field>
                <Field label="Shikoyat yoki qisqa izoh (ixtiyoriy)">
                  <textarea rows={4} value={complaint} onChange={(e) => setComplaint(e.target.value)} placeholder="Qisqa izoh..." className="field-input resize-y" />
                </Field>
                <label className="flex gap-3 items-start cursor-pointer p-4 rounded-xl border border-line bg-bg">
                  <input
                    type="checkbox"
                    checked={termsAccepted}
                    onChange={(e) => setTermsAccepted(e.target.checked)}
                    className="mt-0.5 w-4 h-4 accent-brand shrink-0"
                  />
                  <span className="text-[13px] text-ink-soft leading-[1.5]">
                    Men <Link href="#" className="text-brand underline">foydalanish shartlari</Link> va <Link href="#" className="text-brand underline">maxfiylik siyosati</Link> bilan tanishib chiqdim.
                  </span>
                </label>
                {errors.terms && <p className="text-xs text-danger -mt-2">{errors.terms}</p>}
              </form>
            )}

            {step === 5 && (
              <div className="bg-white border border-line rounded-2xl p-6 md:p-7">
                <div className="space-y-3">
                  <ConfirmRow label="Mutaxassislik" value={doctor.specialty} />
                  <ConfirmRow label="Shifokor" value={doctor.name} />
                  <ConfirmRow label="Klinika" value={doctor.clinic} />
                  <ConfirmRow label="Qabul turi" value="Birlamchi konsultatsiya" />
                  <ConfirmRow label="Sana va vaqt" value={`Juma, ${selectedDay}-noyabr · ${selectedTime}`} highlight />
                  <ConfirmRow label="Bemor" value="Umidjon Afforov" />
                  <div className="rounded-xl p-5 flex justify-between items-baseline mt-5" style={{ background: "linear-gradient(135deg, var(--brand-ink), var(--brand))" }}>
                    <span className="text-[13px] font-semibold uppercase tracking-wider text-white/80">Umumiy summa</span>
                    <div className="font-display font-medium text-white tabular-nums" style={{ fontSize: 28, letterSpacing: "-0.015em" }}>
                      {doctor.price.toLocaleString("uz-UZ")} <em className="not-italic text-[16px] text-[#BBD1EC] font-normal">so&apos;m</em>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {step === 6 && (
              <div className="bg-white border border-line rounded-2xl p-8 md:p-12 text-center">
                <div className="relative inline-grid place-items-center w-24 h-24 rounded-full mb-6 shadow-[0_12px_32px_rgba(34,197,139,.4)]" style={{ background: "linear-gradient(135deg, var(--accent), #0E8F5B)" }}>
                  <div className="absolute inset-[-10px] rounded-full border-2 border-accent-soft opacity-60" />
                  <CheckCircle2 className="w-11 h-11 text-white" />
                </div>
                <h2 className="font-display font-normal text-ink mb-3" style={{ fontSize: 32, letterSpacing: "-0.02em" }}>
                  Qabul <em className="italic text-brand">tasdiqlandi!</em>
                </h2>
                <p className="text-ink-soft max-w-[46ch] mx-auto mb-7 leading-[1.6]" style={{ fontSize: 15 }}>
                  SMS kod bilan tasdiq olinmoqda. Qabul ma&apos;lumotlarini Shaxsiy kabinetingizda ko&apos;rishingiz mumkin.
                </p>
                <div className="inline-block px-6 py-3 bg-brand-soft text-brand-ink font-display font-medium rounded-xl mb-7 tabular-nums" style={{ fontSize: 20, letterSpacing: "0.1em" }}>
                  #MC-2026-11-4287
                </div>
                <ul className="flex flex-col gap-3 max-w-[440px] mx-auto mb-8 text-left list-none p-0">
                  <ChecklistItem icon={<Phone className="w-4 h-4" />} label="SMS tasdiq yuborildi" meta="+998 90 ***45 67" />
                  <ChecklistItem icon={<CheckCircle2 className="w-4 h-4" />} label="Shifokorga xabar berildi" meta={doctor.name.replace("Dr. ", "")} />
                  <ChecklistItem icon={<Clock className="w-4 h-4" />} label="Eslatma 1 soat oldin keladi" meta={`${timeMinusHour(selectedTime)} ga`} />
                </ul>
                <div className="inline-flex gap-2 flex-wrap justify-center">
                  <Link href="/dashboard" className="btn btn-primary">Shaxsiy kabinet</Link>
                  <Link href="/" className="btn btn-ghost">Bosh sahifaga</Link>
                </div>
              </div>
            )}

            {/* ACTIONS */}
            {step < 6 && (
              <div className="flex justify-between items-center gap-4 mt-8 flex-col-reverse md:flex-row">
                <button
                  onClick={prev}
                  disabled={step === 1}
                  className="inline-flex items-center gap-1.5 text-ink-soft font-medium text-[14px] hover:text-brand transition-colors disabled:opacity-40 disabled:cursor-not-allowed w-full md:w-auto justify-center"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Oldingi qadam
                </button>
                <button
                  onClick={next}
                  className="btn btn-primary btn-lg w-full md:w-auto justify-center"
                >
                  {step === 5 ? "Qabulni tasdiqlash" : `Keyingi qadam · ${STEPS[step]?.label ?? ""}`}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          {/* SIDEBAR SUMMARY */}
          {step < 6 && (
            <aside className="hidden lg:block">
              <div className="bg-white border border-line rounded-[20px] p-7 sticky top-6 shadow-md">
                <h2 className="font-display font-normal text-[22px] mb-5" style={{ letterSpacing: "-0.015em" }}>
                  Qabul <em className="italic text-brand">umumiy</em>
                </h2>

                <div className="flex gap-3 items-center pb-5 mb-5 border-b border-line">
                  <div className="w-14 h-14 rounded-xl overflow-hidden shrink-0 grid place-items-end justify-center" style={{ background: colorMap[doctor.color] }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={doctor.photo} alt={doctor.name} className="max-w-[92%] max-h-full object-contain object-bottom" />
                  </div>
                  <div>
                    <div className="font-semibold text-[15px] text-ink">{doctor.name}</div>
                    <div className="text-[13px] text-brand font-medium">{doctor.specialty}</div>
                    <div className="text-[12px] text-muted inline-flex items-center gap-1 mt-0.5">
                      <Star className="w-2.5 h-2.5 text-warn fill-warn" /> <b className="text-ink font-semibold">{doctor.rating}</b> · {doctor.reviews} sharh
                    </div>
                  </div>
                </div>

                <SummaryRow label="Mutaxassislik" value={doctor.specialty} />
                <SummaryRow label="Qabul turi" value="Birlamchi konsultatsiya" />
                <SummaryRow label="Klinika" value={doctor.clinic} />
                <div className="h-px bg-line my-2 -mx-7" />
                <SummaryRow label="Sana" value={step >= 3 ? `Juma, ${selectedDay}-noyabr` : "Tanlanmagan"} highlight={step >= 3} />
                <SummaryRow label="Vaqt" value={step >= 3 ? selectedTime : "Tanlanmagan"} highlight={step >= 3} />
                <div className="h-px bg-line my-2 -mx-7" />

                <div className="flex justify-between items-baseline py-3 pb-5">
                  <span className="text-[13px] text-muted font-semibold uppercase tracking-wider">Umumiy</span>
                  <span className="font-display font-medium text-ink tabular-nums" style={{ fontSize: 28, letterSpacing: "-0.015em" }}>
                    {doctor.price.toLocaleString("uz-UZ")} <em className="not-italic text-[15px] text-brand font-normal">so&apos;m</em>
                  </span>
                </div>

                <div className="flex gap-2.5 p-3.5 rounded-[10px] text-[12.5px] leading-[1.5]" style={{ background: "var(--accent-soft)", color: "#0E6B4A" }}>
                  <Shield className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                  SMS tasdiqlash · Bepul bekor qilish · Qaytarish kafolati
                </div>
              </div>
            </aside>
          )}
        </div>
      </section>

      <style>{`
        .field-input {
          width: 100%;
          padding: 0.75rem 1rem;
          border: 1px solid var(--line-strong);
          border-radius: 10px;
          font: 14px var(--font-sans);
          color: var(--ink);
          background: var(--surface);
          outline: none;
          transition: border-color .15s, box-shadow .15s;
        }
        .field-input:focus {
          border-color: var(--brand);
          box-shadow: 0 0 0 3px rgba(30,109,216,0.12);
        }
      `}</style>
    </div>
  );
}

function stepTitle(step: number) {
  switch (step) {
    case 1: return <>Kerakli <em className="italic text-brand">mutaxassislik</em>ni tanlang</>;
    case 2: return <>Yetakchi <em className="italic text-brand">shifokorlardan</em> birini tanlang</>;
    case 3: return <>Qulay <em className="italic text-brand">sana va vaqtni</em> tanlang</>;
    case 4: return <>Shaxsiy <em className="italic text-brand">ma&apos;lumotlaringiz</em></>;
    case 5: return <>Qabulni <em className="italic text-brand">tasdiqlang</em></>;
    case 6: return <>Yakuniy <em className="italic text-brand">bosqich</em></>;
    default: return "";
  }
}

function stepSubtitle(step: number) {
  switch (step) {
    case 1: return "24 ta tibbiy yo'nalish. Shikoyat yoki tashxis bo'yicha mos keluvchi mutaxassisni toping.";
    case 2: return "Reyting, tajriba va narx bo'yicha mos kelgan mutaxassis. 24 ta kardiolog topildi.";
    case 3: return "Dr. Alisher Qodirov kalendari. Yashil nuqta — bo'sh kunlar. Vaqtni tanlagach, keyingi qadamga o'ting.";
    case 4: return "Qabul uchun kerakli minimal ma'lumotlar. SMS tasdiq telefonga yuboriladi.";
    case 5: return "Ma'lumotlarni yana bir bor tekshiring. Hammasi to'g'ri bo'lsa, SMS tasdiqlashga o'ting.";
    case 6: return "";
    default: return "";
  }
}

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-[12px] font-semibold text-ink-soft uppercase tracking-wide mb-1.5">
        {label} {required && <span className="text-brand">*</span>}
      </label>
      {children}
    </div>
  );
}

function ConfirmRow({ label, value, highlight = false }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className="flex justify-between items-center p-4 bg-bg border border-line rounded-xl">
      <span className="text-[12.5px] text-muted font-semibold tracking-wide">{label}</span>
      <span className={`font-semibold text-[14px] ${highlight ? "text-brand" : "text-ink"} tabular-nums`}>{value}</span>
    </div>
  );
}

function SummaryRow({ label, value, highlight = false }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className="flex justify-between items-center py-2 text-[13.5px]">
      <span className="text-muted">{label}</span>
      <span className={`font-medium tabular-nums ${highlight ? "text-brand font-bold" : "text-ink"}`}>{value}</span>
    </div>
  );
}

function ChecklistItem({ icon, label, meta }: { icon: React.ReactNode; label: string; meta: string }) {
  return (
    <li className="flex gap-3 items-center text-[13.5px] text-ink-soft py-3 px-4 bg-bg rounded-[10px]">
      <span className="text-accent shrink-0">{icon}</span>
      <span>{label}</span>
      <b className="text-ink font-semibold ml-auto">{meta}</b>
    </li>
  );
}

function timeMinusHour(time: string) {
  const [h, m] = time.split(":").map(Number);
  const d = new Date();
  d.setHours(h, m, 0, 0);
  d.setHours(d.getHours() - 1);
  return `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
}

type DayCell = { key: string; day: number; inMonth: boolean; has: boolean };

function calendarDays(): DayCell[] {
  // November 2026 starts on Sunday. We render Mon-Sun grid, so first week shows prev-month tail.
  // Prev-month days: 27, 28, 29, 30, 31 (Oct 2026, Mon=27 Oct)
  const prev = [27, 28, 29, 30, 31].map((n) => ({ key: `p-${n}`, day: n, inMonth: false, has: false }));
  const hasDays = new Set([3, 4, 5, 7, 10, 11, 13, 14, 17, 19, 20, 21, 24, 25, 26, 28]);
  const curr = Array.from({ length: 30 }, (_, i) => {
    const d = i + 1;
    return { key: `c-${d}`, day: d, inMonth: true, has: hasDays.has(d) };
  });
  // Rows: 7 cols × ~6 rows. Prev(5) + Curr(30) = 35, which fits in 5 rows.
  return [...prev, ...curr];
}
