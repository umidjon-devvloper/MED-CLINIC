"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  Search, Bell, MessageSquare, ChevronDown, Plus, Home as HomeIcon,
  Calendar, FileText, Heart, Shield, Settings, LogOut,
  MapPin, ArrowRight, Download, Sparkles, Star, Save, Trash2, Mail, Phone, Eye,
} from "lucide-react";
import { AuthGate } from "@/components/ui/AuthGate";
import { useToast } from "@/components/ui/Toast";
import { getUser, setUser as saveUser } from "@/lib/auth";
import { doctors } from "@/lib/data/doctors";
import { CountUp } from "@/components/ui/CountUp";

type Section = "overview" | "appointments" | "results" | "documents" | "prescriptions" | "saved" | "notifications" | "profile";

const sidebarLinks: { key: Section; icon: typeof HomeIcon; label: string; badge?: number }[] = [
  { key: "overview",      icon: HomeIcon,      label: "Umumiy" },
  { key: "appointments",  icon: Calendar,      label: "Mening qabullarim", badge: 2 },
  { key: "results",       icon: FileText,      label: "Tahlil natijalari" },
  { key: "documents",     icon: FileText,      label: "Tibbiy hujjatlar" },
  { key: "prescriptions", icon: Shield,        label: "Retseptlar" },
  { key: "saved",         icon: Heart,         label: "Saqlangan shifokorlar" },
  { key: "notifications", icon: Bell,          label: "Bildirishnomalar", badge: 3 },
  { key: "profile",       icon: Settings,      label: "Profil sozlamalari" },
];

const stats = [
  { label: "Keyingi qabul",   num: 3,   em: " kun",   trend: "+SMS keldi",  color: "brand",  icon: Calendar },
  { label: "Umumiy qabullar", num: 24,  em: "",       trend: "+3 oyda",     color: "accent", icon: FileText },
  { label: "Tahlillar",       num: 12,  em: " ta",    trend: "2 ta yangi",  color: "warn",   icon: FileText },
  { label: "O'rtacha reyting", num: 4.9, em: " / 5",  trend: "yuqori",      color: "danger", icon: Star, decimals: 1 },
];

const appts = [
  { d: "07", m: "NOY", doc: "Dr. Alisher Qodirov", meta: "Kardiolog · Markaziy klinika · 14:30", status: "pending", stLabel: "Kutilmoqda" },
  { d: "28", m: "OKT", doc: "Dr. Nozima Rahimova", meta: "Pediatr · Markaziy · 10:00", status: "done", stLabel: "Yakunlandi" },
  { d: "15", m: "OKT", doc: "Dr. Sardor Yusupov", meta: "Nevrolog · Shimoliy · 16:30", status: "done", stLabel: "Yakunlandi" },
  { d: "03", m: "OKT", doc: "Dr. Dilnoza Karimova", meta: "Dermatolog · Yunusobod · 11:00", status: "done", stLabel: "Yakunlandi" },
  { d: "20", m: "SEN", doc: "Dr. Botir Nazarov", meta: "Kardiolog · Markaziy · 09:30", status: "cancel", stLabel: "Bekor qilindi" },
];

const results = [
  { ttl: "Umumiy qon tahlili",   mt: "5 kun oldin · Markaziy klinika", val: "Norma",  c: "g" },
  { ttl: "Yurak EKG natijasi",   mt: "12 kun oldin · Dr. Qodirov",     val: "4.9",    c: ""  },
  { ttl: "Qalqonsimon bez UZI",  mt: "2 hafta oldin · Markaziy",       val: "Diqqat", c: "w" },
];

const documents = [
  { title: "Tibbiy xulosa #2026-114",  type: "PDF",  from: "Dr. A. Qodirov", date: "7-noyabr" },
  { title: "Vaksinatsiya pasporti",    type: "PDF",  from: "Markaziy klinika", date: "20-oktyabr" },
  { title: "Rentgen tasviri (ko'krak)", type: "JPG",  from: "Markaziy klinika", date: "15-oktyabr" },
];

const prescriptions = [
  { med: "Konkor 5mg", dose: "1 tabletka · ertalab", period: "30 kun", until: "6-dekabr", from: "Dr. A. Qodirov", active: true },
  { med: "Lozap 50mg", dose: "1 tabletka · kechqurun", period: "60 kun", until: "12-dekabr", from: "Dr. A. Qodirov", active: true },
  { med: "Omega-3 1000",  dose: "1 kapsula · ovqat bilan", period: "90 kun", until: "Tugagan", from: "Dr. N. Rahimova", active: false },
];

const notifications = [
  { ttl: "Qabul tasdiqlandi", msg: "Dr. Alisher Qodirov · 7-noyabr, 14:30", time: "2 soat oldin", unread: true, kind: "ok" as const },
  { ttl: "Yangi tahlil natijasi", msg: "Umumiy qon tahlili tayyor", time: "1 kun oldin", unread: true, kind: "info" as const },
  { ttl: "Retsept yangilandi", msg: "Dr. Qodirov Konkor 5mg uzaytirdi", time: "3 kun oldin", unread: true, kind: "info" as const },
  { ttl: "Qabul eslatma", msg: "Ertaga Dr. Rahimova bilan uchrashuv", time: "5 kun oldin", unread: false, kind: "warn" as const },
  { ttl: "Promo-aksiya", msg: "Noyabr oyi — EXO 20% chegirma", time: "1 hafta oldin", unread: false, kind: "info" as const },
];

const PATIENT_KEY = "med-patient-profile";

export default function DashboardPage() {
  return (
    <AuthGate title="Shaxsiy kabinetga kirish" message="Qabul tarixi, tahlillar va hujjatlaringizni ko'rish uchun avval tizimga kiring.">
      <DashboardShell />
    </AuthGate>
  );
}

function DashboardShell() {
  const toast = useToast();
  const [section, setSection] = useState<Section>("overview");
  const [savedIds, setSavedIds] = useState<string[]>([]);
  const [notifs, setNotifs] = useState(notifications);
  const [profile, setProfile] = useState({
    firstName: "Umidjon",
    lastName: "Afforov",
    phone: "+998 90 123 45 67",
    email: "umidjon@example.com",
    dob: "1999-05-12",
    gender: "Erkak",
    address: "Toshkent, Yakkasaroy",
    bloodType: "O (I) Rh+",
    allergies: "Yo'q",
  });

  useEffect(() => {
    const u = getUser();
    if (u) setProfile((p) => ({ ...p, firstName: u.firstName || p.firstName, lastName: u.lastName || p.lastName, phone: u.phone || p.phone }));
    try { const raw = localStorage.getItem(PATIENT_KEY); if (raw) setProfile((p) => ({ ...p, ...JSON.parse(raw) })); } catch { /* ignore */ }
    try { const raw = localStorage.getItem("fav-doctors"); if (raw) setSavedIds(JSON.parse(raw)); } catch { /* ignore */ }
  }, []);

  const savedDoctors = doctors.filter((d) => savedIds.includes(d.id));
  const unreadCount = notifs.filter((n) => n.unread).length;

  const onLogout = () => {
    try { localStorage.removeItem("med-user"); } catch { /* ignore */ }
    window.location.href = "/";
  };

  const saveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      localStorage.setItem(PATIENT_KEY, JSON.stringify(profile));
      const u = getUser();
      if (u) saveUser({ ...u, firstName: profile.firstName, lastName: profile.lastName, phone: profile.phone });
    } catch { /* ignore */ }
    toast.show("Profil saqlandi", "success");
  };

  const markAllRead = () => { setNotifs((n) => n.map((x) => ({ ...x, unread: false }))); toast.show("Barcha bildirishnomalar o'qildi", "success"); };

  return (
    <div className="min-h-screen bg-bg">
      <nav className="sticky top-0 z-30 bg-surface/80 backdrop-blur-md border-b border-line/60">
        <div className="container-wide flex items-center gap-2 md:gap-4 py-3 md:py-4">
          <Link href="/" className="flex items-center gap-1.5 md:gap-2 font-extrabold text-[1rem] md:text-[1.1rem] tracking-tight shrink-0">
            <span className="w-8 h-8 md:w-9 md:h-9 rounded-[10px] grid place-items-center text-white relative" style={{ background: "linear-gradient(135deg, var(--brand), var(--brand-ink))", color: "#fff" }}>
              <Plus className="w-[16px] md:w-[18px] h-[16px] md:h-[18px]" strokeWidth={2.75} />
              <span className="absolute -top-0.5 -right-0.5 w-2 md:w-2.5 h-2 md:h-2.5 rounded-full bg-accent border-2 border-surface" />
            </span>
            <span className="text-ink">MED</span>
            <em className="font-display italic font-medium text-brand text-[1.1rem] md:text-[1.2rem] tracking-tight -ml-0.5">CLINIC</em>
          </Link>

          <div className="ml-auto flex gap-1.5 md:gap-2 items-center">
            <button aria-label="Qidirish" onClick={() => toast.show("Qidirish — tez orada", "info")} className="hidden sm:grid w-9 h-9 rounded-[9px] border border-line bg-surface text-ink-soft hover:text-brand hover:border-brand place-items-center transition-colors">
              <Search className="w-[16px] h-[16px]" />
            </button>
            <button aria-label="Bildirishnomalar" onClick={() => setSection("notifications")} className="relative w-9 h-9 rounded-[9px] border border-line bg-surface text-ink-soft hover:text-brand hover:border-brand grid place-items-center transition-colors">
              <Bell className="w-[16px] h-[16px]" />
              {unreadCount > 0 && <span className="absolute -top-1 -right-1 min-w-[17px] h-[17px] px-1 rounded-full bg-danger text-white text-[10px] font-bold grid place-items-center border-2 border-surface" style={{ color: "#fff" }}>{unreadCount}</span>}
            </button>
            <button aria-label="Xabarlar" onClick={() => toast.show("Xabarlar — tez orada", "info")} className="hidden sm:grid relative w-9 h-9 rounded-[9px] border border-line bg-surface text-ink-soft hover:text-brand hover:border-brand place-items-center transition-colors">
              <MessageSquare className="w-[16px] h-[16px]" />
              <span className="absolute top-[6px] right-[6px] w-1.5 h-1.5 rounded-full bg-danger border border-surface" />
            </button>
            <button onClick={() => setSection("profile")} className="flex items-center gap-2 pl-2 sm:pl-2.5 sm:border-l sm:border-line sm:ml-1">
              <span className="w-8 h-8 rounded-full text-white grid place-items-center font-bold text-[11px]" style={{ background: "linear-gradient(135deg, var(--brand), var(--brand-ink))", color: "#fff" }}>{profile.firstName[0]}{profile.lastName[0]}</span>
              <span className="hidden sm:inline text-[13px] font-semibold text-ink">{profile.firstName} {profile.lastName[0]}.</span>
              <ChevronDown className="w-3 h-3 text-muted hidden sm:block" />
            </button>
          </div>
        </div>
      </nav>

      <section className="py-6 md:py-10 lg:py-14 overflow-x-clip">
        <div className="container-wide grid lg:grid-cols-[260px_1fr] gap-5 md:gap-8 lg:gap-12">

          <aside className="lg:sticky lg:top-24 self-start flex flex-col gap-3 lg:gap-5 -mx-4 lg:mx-0 sticky top-[57px] md:top-[65px] z-20 bg-bg/95 lg:bg-transparent backdrop-blur-md lg:backdrop-blur-none py-2 lg:py-0 border-b border-line/60 lg:border-0 min-w-0 max-w-[100vw]">
            {/* User card — desktop only (mobile shows avatar in top nav) */}
            <div className="hidden lg:block bg-surface border border-line rounded-[20px] p-5 lg:p-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 lg:w-14 lg:h-14 rounded-full grid place-items-center text-white font-bold text-base lg:text-lg shrink-0" style={{ background: "linear-gradient(135deg, #4D94F5, #0E3F8C)", color: "#fff" }}>{profile.firstName[0]}{profile.lastName[0]}</div>
                <div className="min-w-0">
                  <div className="font-bold text-[14px] lg:text-[15px] text-ink truncate">{profile.firstName} {profile.lastName}</div>
                  <div className="text-[11px] text-muted tabular-nums mt-0.5">ID MC-01-24892</div>
                </div>
              </div>
            </div>

            {/* Nav — pills on mobile, vertical list on desktop */}
            <nav className="flex lg:flex-col flex-row gap-1.5 lg:gap-0.5 overflow-x-auto lg:overflow-visible scrollbar-hide px-4 lg:px-0">
              {sidebarLinks.map((link) => {
                const active = section === link.key;
                const badge = link.key === "notifications" ? unreadCount : link.badge;
                return (
                  <button key={link.key} onClick={() => setSection(link.key)} className={`flex items-center gap-2 lg:gap-3 px-3 lg:px-3 py-2 lg:py-2.5 rounded-full lg:rounded-[10px] text-[12.5px] lg:text-[13.5px] whitespace-nowrap transition-colors lg:w-full text-left shrink-0 lg:shrink border lg:border-0 ${active ? "bg-brand-soft text-brand font-semibold border-brand/20" : "font-medium text-ink-soft bg-surface lg:bg-transparent border-line hover:bg-bg hover:text-ink"}`}>
                    <link.icon className="w-[15px] lg:w-[17px] h-[15px] lg:h-[17px] shrink-0" />
                    {link.label}
                    {badge ? <span style={{ color: "#fff" }} className="min-w-[18px] lg:min-w-[20px] h-[18px] lg:h-5 px-1 lg:px-1.5 rounded-full bg-brand text-[10px] lg:text-[11px] font-bold grid place-items-center tabular-nums lg:ml-auto">{badge}</span> : null}
                  </button>
                );
              })}
              <div className="h-px bg-line my-3 hidden lg:block" />
              <button onClick={onLogout} className="flex items-center gap-2 lg:gap-3 px-3 py-2 lg:py-2.5 rounded-full lg:rounded-[10px] text-[12.5px] lg:text-[13.5px] font-medium text-danger bg-surface lg:bg-transparent border border-danger/15 lg:border-0 hover:bg-danger-soft whitespace-nowrap transition-colors lg:w-full text-left shrink-0 lg:shrink">
                <LogOut className="w-[15px] lg:w-[17px] h-[15px] lg:h-[17px] shrink-0" />
                Chiqish
              </button>
            </nav>
          </aside>

          <div className="flex flex-col gap-5 min-w-0">

            {section === "overview" && (
              <>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-3 sm:gap-4">
                  <div className="min-w-0">
                    <div className="text-[10.5px] md:text-[11px] font-bold uppercase tracking-[0.2em] text-brand mb-2.5 md:mb-4 inline-flex items-center gap-2.5">
                      <span className="w-6 md:w-8 h-px bg-brand" />
                      Shaxsiy kabinet
                    </div>
                    <h1 className="font-display font-normal text-ink leading-[1.02] md:leading-[0.98] tracking-[-0.025em] break-words" style={{ fontSize: "clamp(24px, 7vw, 56px)" }}>
                      Xush kelibsiz, <em className="italic text-brand">{profile.firstName}</em>.
                    </h1>
                    <p className="text-[13px] md:text-[15.5px] text-ink-soft mt-2 md:mt-3 max-w-[54ch]">
                      Yaqinlashayotgan qabullar, tahlillar va tibbiy hujjatlaringiz bir joyda.
                    </p>
                  </div>
                  <div className="flex sm:flex-col items-baseline sm:items-end gap-1.5 sm:gap-0 text-left sm:text-right text-[11px] md:text-[13px] text-muted shrink-0">
                    <b className="text-ink font-display font-medium text-[15px] md:text-2xl tracking-tight">Juma, 7-noyabr</b>
                    <span>Bugun · 2026</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 md:gap-4">
                  {stats.map((s, i) => (
                    <button key={i} onClick={() => setSection(i === 0 || i === 1 ? "appointments" : i === 2 ? "results" : "overview")} className="text-left bg-surface border border-line rounded-2xl p-3 md:p-6 flex flex-col gap-1 relative overflow-hidden hover:-translate-y-1 hover:shadow-[0_12px_28px_rgba(10,31,58,0.08)] hover:border-brand/30 transition-all min-w-0">
                      <div className={`w-7 h-7 md:w-9 md:h-9 rounded-xl grid place-items-center mb-1.5 md:mb-2 ${s.color === "accent" ? "bg-accent-soft text-accent" : s.color === "warn" ? "bg-warn-soft text-warn" : s.color === "danger" ? "bg-danger-soft text-danger" : "bg-brand-soft text-brand"}`}>
                        <s.icon className="w-[14px] md:w-[18px] h-[14px] md:h-[18px]" />
                      </div>
                      <div className="text-[9.5px] md:text-[11.5px] text-muted uppercase tracking-wider font-bold truncate">{s.label}</div>
                      <div className="font-display font-medium text-ink tracking-tight tabular-nums leading-none inline-flex items-baseline" style={{ fontSize: "clamp(22px, 6vw, 40px)" }}>
                        <CountUp to={s.num} decimals={s.decimals ?? 0} />
                        {s.em && <em className="italic text-[0.5em] md:text-[0.55em] text-brand font-normal not-italic ml-0.5">{s.em}</em>}
                      </div>
                      <div className={`text-[9.5px] md:text-[11.5px] font-semibold mt-0.5 md:mt-1 truncate ${s.color === "accent" ? "text-accent" : s.color === "warn" ? "text-warn" : s.color === "danger" ? "text-danger" : "text-brand"}`}>↑ {s.trend}</div>
                    </button>
                  ))}
                </div>

                <div className="relative overflow-hidden rounded-2xl p-4 md:p-8 text-white grid lg:grid-cols-[1fr_auto] gap-4 md:gap-5 items-center" style={{ background: "linear-gradient(135deg, var(--brand-ink) 0%, var(--brand) 100%)", color: "#fff" }}>
                  <div className="absolute bottom-[-80px] right-[-80px] w-[320px] h-[320px] rounded-full pointer-events-none" style={{ background: "radial-gradient(closest-side, rgba(255,255,255,.14), transparent 70%)" }} />
                  <div className="relative z-10 min-w-0">
                    <span className="inline-flex items-center gap-1.5 px-2.5 md:px-3 py-1 bg-white/15 rounded-full text-[9.5px] md:text-[11.5px] font-semibold uppercase tracking-wider mb-2.5 md:mb-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#35D59B] shadow-[0_0_8px_#35D59B]" /> Keyingi qabul · 3 kundan keyin
                    </span>
                    <h3 className="font-display text-[20px] md:text-[32px] font-normal tracking-tight leading-tight mb-2">
                      Dr. Alisher <em className="italic text-[#BBD1EC]">Qodirov</em> bilan
                    </h3>
                    <div className="flex items-center gap-3 my-3 md:my-4">
                      <div className="w-9 h-9 md:w-11 md:h-11 rounded-xl bg-white/14 grid place-items-center shrink-0"><Plus className="w-[18px] md:w-5 h-[18px] md:h-5 opacity-90" /></div>
                      <div className="min-w-0">
                        <div className="font-semibold text-[12.5px] md:text-[15px] truncate">Kardiolog · Markaziy klinika</div>
                        <div className="text-[11px] md:text-[12.5px] opacity-85">Birlamchi konsultatsiya · 30 daqiqa</div>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 md:flex md:flex-row gap-2 md:gap-7 text-[13px]">
                      {[{ k: "Sana", v: "7-noy, Juma" }, { k: "Vaqt", v: "14:30" }, { k: "Xona", v: "№ 207" }].map((cell, i) => (
                        <div key={i} className="min-w-0">
                          <div className="text-[9.5px] md:text-[11px] opacity-75 uppercase tracking-wider font-semibold">{cell.k}</div>
                          <div className="font-display font-medium text-[13px] md:text-lg tracking-tight truncate">{cell.v}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 md:flex md:flex-col gap-2 relative z-10">
                    <a href="https://maps.google.com" target="_blank" rel="noopener" style={{ color: "var(--brand-ink)" }} className="btn btn-sm bg-white !text-brand-ink hover:bg-[#F0F6FF] border-white font-semibold justify-center md:flex-none"><MapPin className="w-3.5 h-3.5" />Yo&apos;nalish</a>
                    <button onClick={() => toast.show("Qabul vaqtini o'zgartirish ochildi", "info")} style={{ color: "#fff" }} className="btn btn-sm bg-transparent !text-white border border-white/30 hover:bg-white/10 font-semibold justify-center md:flex-none">O&apos;zgartirish</button>
                    <button onClick={() => { if (confirm("Qabulni bekor qilmoqchimisiz?")) toast.show("Qabul bekor qilindi", "success"); }} style={{ color: "#fff" }} className="btn btn-sm bg-transparent !text-white border border-white/30 hover:bg-white/10 font-semibold justify-center md:flex-none hidden md:inline-flex">Bekor qilish</button>
                  </div>
                </div>

                <div className="grid lg:grid-cols-[2fr_1fr] gap-4 md:gap-6">
                  <div className="bg-surface border border-line rounded-2xl p-4 md:p-7">
                    <div className="flex justify-between items-end gap-3 mb-4">
                      <div>
                        <h2 className="font-display text-lg md:text-[22px] font-normal tracking-tight leading-tight">So&apos;nggi <em className="italic text-brand">qabullar</em></h2>
                        <p className="text-[12px] md:text-[13px] text-muted mt-1">Oxirgi oydagi barcha qabullar</p>
                      </div>
                      <button onClick={() => setSection("appointments")} className="text-brand font-semibold text-[12px] md:text-[13px] inline-flex items-center gap-1">Barchasi <ArrowRight className="w-3 md:w-3.5 h-3 md:h-3.5" /></button>
                    </div>
                    <div className="flex flex-col">
                      {appts.slice(0, 4).map((a, i) => (
                        <div key={i} className={`grid grid-cols-[42px_1fr_auto] md:grid-cols-[60px_1fr_auto] gap-2 md:gap-4 py-3 items-center ${i > 0 ? "border-t border-line" : ""}`}>
                          <div className="text-center py-1">
                            <div className={`font-display text-base md:text-[22px] font-medium leading-none tabular-nums ${a.status === "done" || a.status === "cancel" ? "text-muted" : "text-ink"}`}>{a.d}</div>
                            <div className="text-[9px] md:text-[10.5px] text-muted uppercase tracking-wider font-semibold mt-0.5">{a.m}</div>
                          </div>
                          <div>
                            <div className="font-semibold text-[13px] md:text-sm text-ink">{a.doc}</div>
                            <div className="text-[11.5px] md:text-[12.5px] text-ink-soft mt-0.5">{a.meta}</div>
                          </div>
                          <span className={`text-[9.5px] md:text-[11.5px] font-semibold px-2 md:px-2.5 py-1 rounded-full uppercase tracking-wider ${a.status === "pending" ? "text-brand bg-brand-soft" : a.status === "done" ? "text-muted bg-bg" : "text-danger bg-danger-soft"}`}>{a.stLabel}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col gap-4 md:gap-6">
                    <div className="bg-surface border border-line rounded-2xl p-4 md:p-7">
                      <div className="flex justify-between items-end gap-3 mb-4">
                        <h2 className="font-display text-lg md:text-[22px] font-normal tracking-tight leading-tight">Tahlil <em className="italic text-brand">natijalari</em></h2>
                        <button onClick={() => setSection("results")} className="text-brand font-semibold text-[12px] md:text-[13px] inline-flex items-center gap-1">Hammasi <ArrowRight className="w-3 md:w-3.5 h-3 md:h-3.5" /></button>
                      </div>
                      <div className="flex flex-col">
                        {results.map((r, i) => (
                          <div key={i} className={`grid grid-cols-[36px_1fr_auto_auto] md:grid-cols-[44px_1fr_auto_auto] gap-2 md:gap-3 py-3 items-center ${i > 0 ? "border-t border-line" : ""}`}>
                            <div className={`w-9 h-9 md:w-10 md:h-10 rounded-[11px] grid place-items-center ${r.c === "g" ? "bg-accent-soft text-accent" : r.c === "w" ? "bg-warn-soft text-warn" : "bg-brand-soft text-brand"}`}>
                              <FileText className="w-4 md:w-[18px] h-4 md:h-[18px]" />
                            </div>
                            <div>
                              <div className="font-semibold text-[12.5px] md:text-sm text-ink">{r.ttl}</div>
                              <div className="text-[11px] md:text-[12.5px] text-muted mt-0.5">{r.mt}</div>
                            </div>
                            <div className={`font-display font-medium text-sm md:text-lg tracking-tight tabular-nums ${r.c === "g" ? "text-accent" : r.c === "w" ? "text-warn" : "text-ink"}`}>{r.val}</div>
                            <button onClick={() => toast.show(`${r.ttl} yuklandi`, "success")} className="hidden md:inline-grid place-items-center w-[30px] h-[30px] rounded-lg text-muted hover:bg-brand-soft hover:text-brand">
                              <Download className="w-[15px] h-[15px]" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="rounded-2xl p-4 md:p-7 border" style={{ background: "linear-gradient(165deg, var(--accent-soft) 0%, #F3FBF7 100%)", borderColor: "#CBEDDA" }}>
                      <div className="w-9 h-9 md:w-10 md:h-10 rounded-[11px] bg-surface text-accent grid place-items-center mb-3 shadow-sm"><Sparkles className="w-[16px] md:w-[18px] h-[16px] md:h-[18px]" /></div>
                      <h2 className="font-display text-base md:text-[22px] font-normal tracking-tight" style={{ color: "#0E6B4A" }}>Bugungi <em className="italic">tavsiya</em></h2>
                      <p className="text-[12px] md:text-[13.5px] leading-relaxed mt-2" style={{ color: "#0E6B4A" }}>
                        Yurak salomatligi uchun kuniga 30 daqiqa yurish yoki yengil mashqlar bajaring.
                      </p>
                    </div>
                  </div>
                </div>
              </>
            )}

            {section === "appointments" && (
              <div className="flex flex-col gap-5">
                <PageHead title="Mening" accent="qabullarim" subtitle={`Jami ${appts.length} ta qabul · 1 ta kutilayotgan, ${appts.filter((a) => a.status === "done").length} ta yakunlangan`} action={<Link href="/booking" className="btn btn-primary"><Plus className="w-4 h-4" />Yangi qabul</Link>} />
                <div className="bg-surface border border-line rounded-2xl p-4 md:p-6">
                  <div className="flex flex-col divide-y divide-line">
                    {appts.map((a, i) => (
                      <div key={i} className="grid grid-cols-[60px_1fr_auto] gap-4 py-4 items-center">
                        <div className="text-center"><div className={`font-display text-[22px] font-medium leading-none tabular-nums ${a.status === "done" || a.status === "cancel" ? "text-muted" : "text-ink"}`}>{a.d}</div><div className="text-[10.5px] text-muted uppercase tracking-wider font-semibold mt-0.5">{a.m}</div></div>
                        <div><div className="font-semibold text-sm text-ink">{a.doc}</div><div className="text-[12.5px] text-ink-soft mt-0.5">{a.meta}</div></div>
                        <div className="flex items-center gap-2">
                          <span className={`text-[11.5px] font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider ${a.status === "pending" ? "text-brand bg-brand-soft" : a.status === "done" ? "text-muted bg-bg" : "text-danger bg-danger-soft"}`}>{a.stLabel}</span>
                          {a.status === "pending" && (
                            <button onClick={() => { if (confirm("Qabulni bekor qilmoqchimisiz?")) toast.show("Qabul bekor qilindi", "success"); }} className="w-8 h-8 rounded-lg text-ink-soft hover:bg-danger-soft hover:text-danger grid place-items-center"><Trash2 className="w-4 h-4" /></button>
                          )}
                          {a.status === "done" && (
                            <button onClick={() => toast.show("Tibbiy xulosa yuklandi", "success")} className="w-8 h-8 rounded-lg text-ink-soft hover:bg-brand-soft hover:text-brand grid place-items-center"><Download className="w-4 h-4" /></button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {section === "results" && (
              <div className="flex flex-col gap-5">
                <PageHead title="Tahlil" accent="natijalari" subtitle="Barcha tahlil natijalari bir joyda — yuklab olish mumkin" />
                <div className="bg-surface border border-line rounded-2xl p-4 md:p-6 flex flex-col divide-y divide-line">
                  {[...results, ...results].map((r, i) => (
                    <div key={i} className="grid grid-cols-[44px_1fr_auto_auto] gap-3 py-4 items-center">
                      <div className={`w-10 h-10 rounded-[11px] grid place-items-center ${r.c === "g" ? "bg-accent-soft text-accent" : r.c === "w" ? "bg-warn-soft text-warn" : "bg-brand-soft text-brand"}`}><FileText className="w-[18px] h-[18px]" /></div>
                      <div><div className="font-semibold text-sm text-ink">{r.ttl}</div><div className="text-[12.5px] text-muted mt-0.5">{r.mt}</div></div>
                      <div className={`font-display font-medium text-lg tracking-tight tabular-nums ${r.c === "g" ? "text-accent" : r.c === "w" ? "text-warn" : "text-ink"}`}>{r.val}</div>
                      <div className="flex gap-1">
                        <button onClick={() => toast.show(`${r.ttl} ochildi`, "info")} className="w-8 h-8 rounded-lg text-muted hover:bg-brand-soft hover:text-brand grid place-items-center"><Eye className="w-[15px] h-[15px]" /></button>
                        <button onClick={() => toast.show(`${r.ttl} yuklandi`, "success")} className="w-8 h-8 rounded-lg text-muted hover:bg-brand-soft hover:text-brand grid place-items-center"><Download className="w-[15px] h-[15px]" /></button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {section === "documents" && (
              <div className="flex flex-col gap-5">
                <PageHead title="Tibbiy" accent="hujjatlar" subtitle="Tibbiy xulosalar, rasmlar, vaksinatsiya pasporti" />
                <div className="grid md:grid-cols-2 gap-3">
                  {documents.map((d, i) => (
                    <div key={i} className="bg-surface border border-line rounded-xl p-4 flex items-center gap-4 hover:border-brand/40 transition-colors">
                      <div className="w-11 h-11 rounded-xl bg-brand-soft text-brand grid place-items-center shrink-0"><FileText className="w-5 h-5" /></div>
                      <div className="flex-1 min-w-0">
                        <div className="font-bold text-sm text-ink truncate">{d.title}</div>
                        <div className="text-[12.5px] text-ink-soft">{d.from} · {d.date}</div>
                      </div>
                      <span className="text-[10.5px] font-bold uppercase tracking-wider bg-bg px-2 py-1 rounded text-muted">{d.type}</span>
                      <button onClick={() => toast.show(`${d.title} yuklandi`, "success")} className="w-9 h-9 rounded-lg border border-line text-ink-soft hover:border-brand hover:text-brand grid place-items-center"><Download className="w-4 h-4" /></button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {section === "prescriptions" && (
              <div className="flex flex-col gap-5">
                <PageHead title="Mening" accent="retseptlarim" subtitle={`${prescriptions.filter((p) => p.active).length} ta faol · ${prescriptions.filter((p) => !p.active).length} ta tugagan`} />
                <div className="grid md:grid-cols-2 gap-3">
                  {prescriptions.map((p, i) => (
                    <div key={i} className={`border rounded-xl p-5 ${p.active ? "bg-accent-soft/30 border-accent/20" : "bg-surface border-line opacity-70"}`}>
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-bold text-ink">{p.med}</h3>
                        <span className={`text-[10.5px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${p.active ? "bg-accent text-white" : "bg-bg text-muted"}`} style={p.active ? { color: "#fff" } : undefined}>{p.active ? "Faol" : "Tugagan"}</span>
                      </div>
                      <div className="text-[13px] text-ink-soft space-y-1">
                        <div><b className="text-ink">Doza:</b> {p.dose}</div>
                        <div><b className="text-ink">Davomiylik:</b> {p.period}</div>
                        <div><b className="text-ink">Tugash:</b> {p.until}</div>
                        <div><b className="text-ink">Shifokor:</b> {p.from}</div>
                      </div>
                      {p.active && <button onClick={() => toast.show("Retseptni uzaytirish so'rovi yuborildi", "success")} className="btn btn-outline btn-sm mt-3">Uzaytirish so&apos;rash</button>}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {section === "saved" && (
              <div className="flex flex-col gap-5">
                <PageHead title="Saqlangan" accent="shifokorlar" subtitle={`${savedDoctors.length} ta sevimli shifokor`} action={<Link href="/doctors" className="btn btn-outline"><Plus className="w-4 h-4" />Shifokor qo&apos;shish</Link>} />
                {savedDoctors.length > 0 ? (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {savedDoctors.map((d) => (
                      <div key={d.id} className="bg-surface border border-line rounded-xl p-4 flex items-center gap-3">
                        <div className="w-14 h-14 rounded-xl overflow-hidden shrink-0" style={{ background: "linear-gradient(165deg, #D7E8FA, #B5D4F2)" }}>
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={d.photo} alt={d.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-bold text-sm text-ink truncate">{d.name}</div>
                          <div className="text-[12.5px] text-brand">{d.specialty}</div>
                        </div>
                        <Link href={`/doctors/${d.id}`} className="btn btn-outline btn-sm">Profil</Link>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-surface border border-dashed border-line-strong rounded-2xl py-16 text-center">
                    <Heart className="w-10 h-10 text-muted mx-auto mb-3" />
                    <h3 className="text-lg font-semibold text-ink mb-1">Hali hech kim saqlanmagan</h3>
                    <p className="text-sm text-ink-soft mb-4">Shifokor kartasidagi yurak belgisini bosing</p>
                    <Link href="/doctors" className="btn btn-primary">Shifokorlarni ko&apos;rish</Link>
                  </div>
                )}
              </div>
            )}

            {section === "notifications" && (
              <div className="flex flex-col gap-5">
                <PageHead title="Bildirish" accent="nomalar" subtitle={`${unreadCount} ta o'qilmagan`} action={unreadCount > 0 ? <button onClick={markAllRead} className="btn btn-outline btn-sm">Hammasini o&apos;qilgan deb belgilash</button> : undefined} />
                <div className="bg-surface border border-line rounded-2xl overflow-hidden">
                  {notifs.map((n, i) => (
                    <div key={i} onClick={() => setNotifs((ns) => ns.map((x, k) => k === i ? { ...x, unread: false } : x))} className={`flex items-start gap-3 p-4 border-b border-line last:border-b-0 cursor-pointer transition-colors ${n.unread ? "bg-brand-soft/20" : "hover:bg-bg"}`}>
                      <div className={`w-9 h-9 rounded-lg grid place-items-center shrink-0 ${n.kind === "ok" ? "bg-accent-soft text-accent" : n.kind === "warn" ? "bg-warn-soft text-warn" : "bg-brand-soft text-brand"}`}>
                        {n.kind === "ok" ? <Shield className="w-4 h-4" /> : n.kind === "warn" ? <Bell className="w-4 h-4" /> : <Bell className="w-4 h-4" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-bold text-sm text-ink">{n.ttl}</div>
                        <div className="text-[12.5px] text-ink-soft mt-0.5">{n.msg}</div>
                        <div className="text-[11px] text-muted mt-1">{n.time}</div>
                      </div>
                      {n.unread && <span className="w-2 h-2 rounded-full bg-brand shrink-0 mt-2" />}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {section === "profile" && (
              <div className="flex flex-col gap-5">
                <PageHead title="Profil" accent="sozlamalari" subtitle="Shaxsiy va tibbiy ma'lumotlaringizni tahrirlang" />

                {/* Mobile-only user hero card */}
                <div className="lg:hidden bg-surface border border-line rounded-2xl p-4 flex items-center gap-3">
                  <div className="w-14 h-14 rounded-full grid place-items-center text-white font-bold text-lg shrink-0" style={{ background: "linear-gradient(135deg, #4D94F5, #0E3F8C)", color: "#fff" }}>{profile.firstName[0]}{profile.lastName[0]}</div>
                  <div className="min-w-0 flex-1">
                    <div className="font-bold text-[15px] text-ink truncate">{profile.firstName} {profile.lastName}</div>
                    <div className="text-[11px] text-muted tabular-nums mt-0.5">ID MC-01-24892 · Bemor</div>
                  </div>
                </div>

                <form onSubmit={saveProfile} className="bg-surface border border-line rounded-2xl p-4 md:p-6 flex flex-col gap-4 md:gap-5">
                  <div className="grid sm:grid-cols-2 gap-3 md:gap-4">
                    <PField label="Ism"><input value={profile.firstName} onChange={(e) => setProfile({ ...profile, firstName: e.target.value })} className="field" /></PField>
                    <PField label="Familiya"><input value={profile.lastName} onChange={(e) => setProfile({ ...profile, lastName: e.target.value })} className="field" /></PField>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-3 md:gap-4">
                    <PField label="Telefon"><div className="relative"><Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-brand z-10 pointer-events-none" /><input value={profile.phone} onChange={(e) => setProfile({ ...profile, phone: e.target.value })} className="field" style={{ paddingLeft: "2.5rem" }} /></div></PField>
                    <PField label="Email"><div className="relative"><Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-brand z-10 pointer-events-none" /><input type="email" value={profile.email} onChange={(e) => setProfile({ ...profile, email: e.target.value })} className="field" style={{ paddingLeft: "2.5rem" }} /></div></PField>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
                    <PField label="Tug'ilgan sana"><input type="date" value={profile.dob} onChange={(e) => setProfile({ ...profile, dob: e.target.value })} className="field" /></PField>
                    <PField label="Jinsi"><select value={profile.gender} onChange={(e) => setProfile({ ...profile, gender: e.target.value })} className="field"><option>Erkak</option><option>Ayol</option></select></PField>
                    <div className="col-span-2 md:col-span-1">
                      <PField label="Qon guruhi"><select value={profile.bloodType} onChange={(e) => setProfile({ ...profile, bloodType: e.target.value })} className="field">{["O (I) Rh+","O (I) Rh-","A (II) Rh+","A (II) Rh-","B (III) Rh+","B (III) Rh-","AB (IV) Rh+","AB (IV) Rh-"].map((b) => <option key={b}>{b}</option>)}</select></PField>
                    </div>
                  </div>
                  <PField label="Manzil"><input value={profile.address} onChange={(e) => setProfile({ ...profile, address: e.target.value })} className="field" /></PField>
                  <PField label="Allergiya va diqqat talab qiladigan holatlar"><textarea rows={3} value={profile.allergies} onChange={(e) => setProfile({ ...profile, allergies: e.target.value })} className="field resize-none" /></PField>
                  <div className="flex flex-col sm:flex-row gap-2 pt-2">
                    <button type="submit" className="btn btn-primary w-full sm:w-auto justify-center"><Save className="w-4 h-4" />Saqlash</button>
                    <button type="button" onClick={() => { try { const raw = localStorage.getItem(PATIENT_KEY); if (raw) setProfile((p) => ({ ...p, ...JSON.parse(raw) })); } catch { /* ignore */ } toast.show("O'zgarishlar bekor qilindi", "info"); }} className="btn btn-outline w-full sm:w-auto justify-center">Bekor qilish</button>
                  </div>
                </form>

                {/* Mobile logout — accessible without horizontal scroll */}
                <button onClick={onLogout} className="lg:hidden btn btn-outline w-full justify-center !text-danger !border-danger/30 hover:!bg-danger-soft">
                  <LogOut className="w-4 h-4" />Chiqish
                </button>
              </div>
            )}

          </div>
        </div>
      </section>
    </div>
  );
}

function PageHead({ title, accent, subtitle, action }: { title: string; accent: string; subtitle: string; action?: React.ReactNode }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 sm:gap-4 sm:flex-wrap">
      <div>
        <h1 className="font-display font-normal text-[26px] md:text-[36px] tracking-tight leading-tight">
          {title} <em className="italic text-brand">{accent}</em>
        </h1>
        <p className="text-[13px] md:text-sm text-ink-soft mt-1 md:mt-1.5">{subtitle}</p>
      </div>
      {action ? <div className="flex gap-2 [&>*]:flex-1 sm:[&>*]:flex-none">{action}</div> : null}
    </div>
  );
}

function PField({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-[10.5px] md:text-xs font-bold text-ink-soft mb-1.5 uppercase tracking-wide">{label}</label>
      {children}
    </div>
  );
}
