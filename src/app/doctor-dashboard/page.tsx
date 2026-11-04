"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  Search, Bell, MessageSquare, ChevronDown, Plus,
  Calendar, FileText, Users, LogOut, Stethoscope,
  CheckCircle2, DollarSign, Star, TrendingUp,
  Phone, Video, MoreVertical, Settings,
  Save, Edit3, Trash2, Download, Upload, Send, UserCircle, Wallet,
  Paperclip,
} from "lucide-react";
import { useToast } from "@/components/ui/Toast";
import { MotionReveal } from "@/components/ui/motion";
import { AuthGate } from "@/components/ui/AuthGate";
import type { Section, Appt, Patient } from "@/components/doctor-dashboard/types";
import {
  SETTINGS_KEY, sidebar, palette, initialAppts, initialPatients, initialReviews,
  chartData, transactions, weekDays, dayNums, timeSlots, initialSchedule, initialRecords,
  recordTypes, defaultSettings,
} from "@/components/doctor-dashboard/mock-data";
import { SettingsCard, Field, TagsEditor, SectionHeader } from "@/components/doctor-dashboard/widgets";
import {
  NewApptModal, ConsultationModal, ScheduleEditModal, NewPatientModal, NewRecordModal,
} from "@/components/doctor-dashboard/Modals";

export default function DoctorDashboardPage() {
  return (
    <AuthGate title="Shifokor paneliga kirish" message="Shifokor sifatida tizimga kiring.">
      <DoctorDashboardShell />
    </AuthGate>
  );
}

function DoctorDashboardShell() {
  const toast = useToast();
  const [section, setSection] = useState<Section>("overview");
  const [filter, setFilter] = useState<"all" | "upcoming" | "done">("all");
  const [patientQuery, setPatientQuery] = useState("");
  const [recordFilter, setRecordFilter] = useState<"all" | "Tahlil" | "Retsept" | "EKG" | "UZI">("all");
  const [globalSearch, setGlobalSearch] = useState("");
  const [appts, setAppts] = useState<Appt[]>(initialAppts);
  const [reviews, setReviews] = useState(initialReviews);
  const [records, setRecords] = useState(initialRecords);
  const [schedule, setSchedule] = useState(initialSchedule);
  const [patients, setPatients] = useState<Patient[]>(initialPatients);
  const [notifOpen, setNotifOpen] = useState(false);
  const [msgOpen, setMsgOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  const [newApptOpen, setNewApptOpen] = useState(false);
  const [activeAppt, setActiveAppt] = useState<Appt | null>(null);
  const [patientMenuFor, setPatientMenuFor] = useState<string | null>(null);
  const [replyFor, setReplyFor] = useState<string | null>(null);
  const [scheduleEdit, setScheduleEdit] = useState<{ key: string; day: string; time: string } | null>(null);
  const [newRecordOpen, setNewRecordOpen] = useState(false);
  const [newPatientOpen, setNewPatientOpen] = useState(false);
  const [settings, setSettings] = useState(defaultSettings);
  const topbarRef = useRef<HTMLDivElement>(null);

  // Load saved settings
  useEffect(() => {
    try {
      const raw = localStorage.getItem(SETTINGS_KEY);
      if (raw) setSettings((prev) => ({ ...prev, ...JSON.parse(raw) }));
    } catch { /* ignore */ }
  }, []);

  // Close popovers on outside click
  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (topbarRef.current && !topbarRef.current.contains(e.target as Node)) {
        setNotifOpen(false); setMsgOpen(false); setUserOpen(false);
      }
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  const maxVal = Math.max(...chartData.map((c) => c.value));
  const filtered = appts.filter((a) => {
    if (filter === "upcoming") return a.status === "upcoming" || a.status === "in-progress";
    if (filter === "done") return a.status === "done";
    return true;
  });
  const filteredPatients = patients.filter((p) => !patientQuery || p.name.toLowerCase().includes(patientQuery.toLowerCase()));
  const filteredRecords = records.filter((r) => recordFilter === "all" || r.type === recordFilter);

  const onLogout = () => {
    try { localStorage.removeItem("med-user"); } catch { /* ignore */ }
    toast.show("Chiqildi", "success");
    setTimeout(() => { window.location.href = "/"; }, 500);
  };

  const stats = [
    { key: "schedule" as Section, label: "Bugungi qabullar", num: String(appts.length), em: " ta", trend: `${appts.filter((a) => a.status === "upcoming" || a.status === "in-progress").length} ta hali qoldi`, color: "brand", icon: Calendar },
    { key: "revenue" as Section, label: "Oyining daromadi", num: "14.2M", em: " so'm", trend: "+18% o'tgan oyga", color: "accent", icon: DollarSign },
    { key: "patients" as Section, label: "Jami bemorlar", num: "348", em: "", trend: "+12 shu hafta", color: "warn", icon: Users },
    { key: "reviews" as Section, label: "O'rtacha reyting", num: "4.9", em: " / 5", trend: `${reviews.length * 100 + 12} sharh`, color: "danger", icon: Star },
  ];

  const startAppt = (a: Appt) => {
    setActiveAppt(a);
    setAppts((prev) => prev.map((x) => x.id === a.id ? { ...x, status: "in-progress" } : x));
  };
  const endActiveAppt = () => {
    if (!activeAppt) return;
    setAppts((prev) => prev.map((x) => x.id === activeAppt.id ? { ...x, status: "done" } : x));
    toast.show(`${activeAppt.patient} qabuli yakunlandi`, "success");
    setActiveAppt(null);
  };

  const saveSettings = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try { localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings)); } catch { /* ignore */ }
    toast.show("Sozlamalar saqlandi", "success");
  };

  return (
    <div className="min-h-screen bg-bg grid lg:grid-cols-[260px_1fr]">
      {/* SIDEBAR */}
      <aside className="hidden lg:flex bg-surface border-r border-line flex-col sticky top-0 h-screen overflow-y-auto">
        <div className="p-6 border-b border-line">
          <Link href="/" className="flex items-center gap-2.5 font-extrabold text-lg">
            <span className="w-10 h-10 rounded-xl grid place-items-center text-white" style={{ background: "linear-gradient(135deg, var(--brand), var(--brand-ink))", color: "#fff" }}>
              <Plus className="w-5 h-5" strokeWidth={2.5} />
            </span>
            MED <em className="font-display italic font-medium text-brand text-[1.3rem]">CLINIC</em>
          </Link>
          <div className="mt-2 inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider bg-brand-soft text-brand px-2 py-0.5 rounded-full">
            <Stethoscope className="w-3 h-3" /> Shifokor paneli
          </div>
        </div>

        <nav className="flex-1 p-4 flex flex-col gap-1">
          {sidebar.map((link) => {
            const active = section === link.key;
            return (
              <button key={link.key} onClick={() => setSection(link.key)} className={`w-full inline-flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-[14px] font-medium transition-colors text-left ${active ? "bg-brand-soft text-brand font-semibold" : "text-ink-soft hover:bg-bg hover:text-ink"}`}>
                <link.icon className="w-[18px] h-[18px]" />
                <span className="flex-1">{link.label}</span>
                {link.badge && <span className="text-[10.5px] bg-brand text-white px-1.5 py-0.5 rounded font-bold tabular-nums" style={{ color: "#fff" }}>{link.badge}</span>}
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-line">
          <button onClick={onLogout} className="inline-flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-[14px] font-medium text-ink-soft hover:bg-danger-soft hover:text-danger w-full transition-colors">
            <LogOut className="w-[18px] h-[18px]" /> Chiqish
          </button>
        </div>
      </aside>

      {/* MAIN */}
      <div className="flex flex-col min-h-screen">
        {/* TOPBAR */}
        <header ref={topbarRef} className="bg-surface border-b border-line px-6 lg:px-8 py-4 flex items-center justify-between gap-4 sticky top-0 z-20">
          <form onSubmit={(e) => { e.preventDefault(); toast.show(`Natijalar: "${globalSearch}"`, "info"); }} className="relative flex-1 max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
            <input value={globalSearch} onChange={(e) => setGlobalSearch(e.target.value)} type="text" placeholder="Bemor, qabul yoki tahlil qidiring..." className="w-full pl-11 pr-4 py-2.5 bg-bg border border-line rounded-xl text-sm text-ink outline-none focus:border-brand" />
          </form>
          <div className="flex items-center gap-3 relative">
            <select value={section} onChange={(e) => setSection(e.target.value as Section)} className="lg:hidden text-sm bg-bg border border-line rounded-lg px-3 py-2">
              {sidebar.map((s) => <option key={s.key} value={s.key}>{s.label}</option>)}
            </select>

            {/* Notifications */}
            <div className="relative">
              <button onClick={() => { setNotifOpen((v) => !v); setMsgOpen(false); setUserOpen(false); }} className="relative w-10 h-10 rounded-xl bg-bg border border-line grid place-items-center text-ink-soft hover:text-brand hover:border-brand">
                <Bell className="w-[18px] h-[18px]" />
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-danger text-white text-[10px] font-bold grid place-items-center" style={{ color: "#fff" }}>3</span>
              </button>
              {notifOpen && (
                <div className="absolute right-0 top-full mt-2 w-80 bg-surface border border-line rounded-xl shadow-xl z-30 overflow-hidden">
                  <div className="px-4 py-3 border-b border-line font-bold text-sm text-ink">Bildirishnomalar</div>
                  {[
                    { t: "Yangi qabul", m: "Kamola S. 16:00 ga yozildi", d: "15 daq oldin" },
                    { t: "Yangi sharh", m: "Madina K. · ★★★★★", d: "2 soat oldin" },
                    { t: "Daromad hisobi", m: "Oktyabr yakuni tayyor", d: "1 kun oldin" },
                  ].map((n, i) => (
                    <div key={i} className="px-4 py-3 border-b border-line last:border-b-0 hover:bg-bg cursor-pointer">
                      <div className="font-semibold text-sm text-ink">{n.t}</div>
                      <div className="text-[12.5px] text-ink-soft">{n.m}</div>
                      <div className="text-[11px] text-muted mt-0.5">{n.d}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Messages */}
            <div className="relative">
              <button onClick={() => { setMsgOpen((v) => !v); setNotifOpen(false); setUserOpen(false); }} className="relative w-10 h-10 rounded-xl bg-bg border border-line grid place-items-center text-ink-soft hover:text-brand hover:border-brand">
                <MessageSquare className="w-[18px] h-[18px]" />
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-brand text-white text-[10px] font-bold grid place-items-center" style={{ color: "#fff" }}>5</span>
              </button>
              {msgOpen && (
                <div className="absolute right-0 top-full mt-2 w-80 bg-surface border border-line rounded-xl shadow-xl z-30 overflow-hidden">
                  <div className="px-4 py-3 border-b border-line font-bold text-sm text-ink">Xabarlar</div>
                  {[
                    { n: "Madina K.", m: "Rahmat, doktor! Ertaga keyingi tahlil qachon?", d: "Hozirgina" },
                    { n: "Bobur T.", m: "Qabul vaqtini siljita olasizmi?", d: "15 daq" },
                    { n: "Nilufar R.", m: "Retsept yangilash kerak", d: "1 soat" },
                  ].map((m, i) => (
                    <div key={i} onClick={() => { toast.show(`${m.n} bilan suhbat ochildi`, "info"); setMsgOpen(false); }} className="px-4 py-3 border-b border-line last:border-b-0 hover:bg-bg cursor-pointer">
                      <div className="font-semibold text-sm text-ink">{m.n}</div>
                      <div className="text-[12.5px] text-ink-soft truncate">{m.m}</div>
                      <div className="text-[11px] text-muted mt-0.5">{m.d}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* User menu */}
            <div className="relative">
              <button onClick={() => { setUserOpen((v) => !v); setNotifOpen(false); setMsgOpen(false); }} className="flex items-center gap-2.5 pl-3 border-l border-line">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#4D94F5] to-[#1E6DD8] text-white font-bold grid place-items-center text-sm" style={{ color: "#fff" }}>{settings.firstName[0]}{settings.lastName[0]}</div>
                <div className="hidden md:block text-left">
                  <div className="text-[13.5px] font-bold text-ink">Dr. {settings.firstName} {settings.lastName}</div>
                  <div className="text-[11.5px] text-muted">{settings.specialty}</div>
                </div>
                <ChevronDown className={`w-3.5 h-3.5 text-muted hidden md:block transition-transform ${userOpen ? "rotate-180" : ""}`} />
              </button>
              {userOpen && (
                <div className="absolute right-0 top-full mt-2 w-56 bg-surface border border-line rounded-xl shadow-xl z-30 overflow-hidden">
                  <button onClick={() => { setSection("settings"); setUserOpen(false); }} className="w-full px-4 py-3 text-left hover:bg-bg flex items-center gap-3 text-sm text-ink">
                    <UserCircle className="w-4 h-4 text-ink-soft" /> Profilim
                  </button>
                  <button onClick={() => { setSection("settings"); setUserOpen(false); }} className="w-full px-4 py-3 text-left hover:bg-bg flex items-center gap-3 text-sm text-ink border-t border-line">
                    <Settings className="w-4 h-4 text-ink-soft" /> Sozlamalar
                  </button>
                  <button onClick={() => { setSection("revenue"); setUserOpen(false); }} className="w-full px-4 py-3 text-left hover:bg-bg flex items-center gap-3 text-sm text-ink border-t border-line">
                    <Wallet className="w-4 h-4 text-ink-soft" /> Daromad
                  </button>
                  <button onClick={onLogout} className="w-full px-4 py-3 text-left hover:bg-danger-soft hover:text-danger flex items-center gap-3 text-sm text-ink border-t border-line transition-colors">
                    <LogOut className="w-4 h-4" /> Chiqish
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        <main className="p-6 lg:p-8 flex flex-col gap-6">
          {/* ============ OVERVIEW ============ */}
          {section === "overview" && (
            <MotionReveal>
              <div className="flex items-end justify-between gap-4 flex-wrap mb-6">
                <div>
                  <h1 className="font-display font-normal text-3xl md:text-[36px] tracking-tight leading-tight">
                    Xush kelibsiz, <em className="italic text-brand">Dr. {settings.firstName}</em>
                  </h1>
                  <p className="text-sm text-ink-soft mt-1.5">
                    Bugun — <b className="text-ink">{appts.length} ta qabul</b>, {appts.filter((a) => a.status === "in-progress").length} ta jarayonda · Juma, 7-noyabr 2026
                  </p>
                </div>
                <button onClick={() => setNewApptOpen(true)} className="btn btn-primary">
                  <Plus className="w-4 h-4" /> Yangi qabul
                </button>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {stats.map((s) => (
                  <button key={s.label} onClick={() => setSection(s.key)} className="text-left bg-surface border border-line rounded-2xl p-5 flex flex-col gap-2 relative overflow-hidden hover:-translate-y-0.5 hover:shadow-md transition-all">
                    <div className="absolute -top-5 -right-5 w-20 h-20 rounded-full opacity-20" style={{ background: `var(--${s.color})` }} />
                    <div className="flex items-center justify-between relative z-10">
                      <span className="text-[11.5px] text-muted uppercase tracking-wider font-semibold">{s.label}</span>
                      <div className="w-8 h-8 rounded-lg grid place-items-center text-white" style={{ background: `var(--${s.color})`, color: "#fff" }}>
                        <s.icon className="w-4 h-4" />
                      </div>
                    </div>
                    <div className="font-display font-medium text-[32px] text-ink tabular-nums leading-none relative z-10">
                      {s.num}<em className="italic text-brand text-lg">{s.em}</em>
                    </div>
                    <div className="text-[11.5px] text-ink-soft inline-flex items-center gap-1 relative z-10">
                      <TrendingUp className="w-3 h-3 text-accent" />{s.trend}
                    </div>
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-[1.6fr_1fr] gap-6 mb-6">
                <section className="bg-surface border border-line rounded-2xl p-5 md:p-6">
                  <div className="flex items-center justify-between mb-5 gap-3 flex-wrap">
                    <h2 className="font-display font-normal text-xl md:text-[22px] tracking-tight">Bugungi <em className="italic text-brand">qabullar</em></h2>
                    <div className="flex gap-1 p-1 bg-bg rounded-lg">
                      {([{ k: "all", l: "Hammasi" }, { k: "upcoming", l: "Kutilayotgan" }, { k: "done", l: "Yakunlangan" }] as const).map((f) => (
                        <button key={f.k} onClick={() => setFilter(f.k)} style={filter === f.k ? { color: "#fff" } : undefined} className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${filter === f.k ? "bg-brand text-white" : "text-ink-soft hover:text-brand"}`}>
                          {f.l}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    {filtered.map((a) => (
                      <div key={a.id} className="flex items-center gap-3 p-3 border border-line rounded-xl hover:border-brand/40 hover:bg-brand-soft/20 transition-colors">
                        <div className="w-14 text-center shrink-0">
                          <div className="font-display font-bold text-ink text-[17px] tabular-nums">{a.time}</div>
                          <div className="text-[10.5px] text-muted uppercase tracking-wider">{a.type === "in-person" ? "Qabul" : a.type === "online" ? "Video" : "Qo'ng'iroq"}</div>
                        </div>
                        <div className="w-10 h-10 rounded-full text-white font-bold grid place-items-center text-xs shrink-0" style={{ background: a.bg, color: "#fff" }}>{a.initials}</div>
                        <div className="flex-1 min-w-0">
                          <div className="font-bold text-sm text-ink truncate">{a.patient}</div>
                          <div className="text-[12.5px] text-ink-soft truncate">{a.reason}</div>
                        </div>
                        <div className="shrink-0 flex items-center gap-2">
                          {a.status === "done" && <span className="inline-flex items-center gap-1 text-[11.5px] text-accent bg-accent-soft font-semibold px-2 py-1 rounded-full"><CheckCircle2 className="w-3 h-3" />Yakunlandi</span>}
                          {a.status === "in-progress" && <button onClick={() => setActiveAppt(a)} className="inline-flex items-center gap-1 text-[11.5px] text-brand bg-brand-soft font-semibold px-2 py-1 rounded-full hover:bg-brand hover:text-white transition-colors"><span className="w-1.5 h-1.5 rounded-full bg-brand animate-pulse" />Jarayonda · Ochish</button>}
                          {a.status === "upcoming" && (
                            <button onClick={() => startAppt(a)} className="text-[12px] text-brand font-semibold hover:underline">Boshlash</button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                <section className="bg-surface border border-line rounded-2xl p-5 md:p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="font-display font-normal text-xl tracking-tight">Daromad <em className="italic text-brand">o&apos;sishi</em></h2>
                    <button onClick={() => setSection("revenue")} className="text-xs text-brand font-semibold hover:underline">Batafsil →</button>
                  </div>
                  <div className="text-[11px] text-muted uppercase tracking-wider font-semibold mb-1">Noyabr daromadi</div>
                  <div className="font-display font-medium text-[36px] text-ink tracking-tight leading-none tabular-nums">14.2M<em className="italic text-brand text-lg ml-1">so&apos;m</em></div>
                  <div className="text-xs text-accent font-semibold inline-flex items-center gap-1 mt-1 mb-5"><TrendingUp className="w-3 h-3" /> +18% o&apos;tgan oyga nisbatan</div>
                  <div className="h-[160px] flex items-end justify-between gap-2">
                    {chartData.map((c) => {
                      const h = (c.value / maxVal) * 100;
                      const isLast = c.month === "Noy";
                      return (
                        <button key={c.month} onClick={() => toast.show(`${c.month}: ${c.value}M so'm`, "info")} className="flex-1 flex flex-col items-center gap-1.5 group">
                          <div className="text-[10.5px] font-bold text-ink tabular-nums">{c.value}M</div>
                          <div className="w-full relative rounded-t-md transition-all group-hover:opacity-80" style={{ height: `${h}%`, background: isLast ? "linear-gradient(180deg, var(--brand), var(--brand-ink))" : "var(--brand-soft)" }} />
                          <div className={`text-[10.5px] ${isLast ? "text-brand font-bold" : "text-muted font-medium"}`}>{c.month}</div>
                        </button>
                      );
                    })}
                  </div>
                </section>
              </div>

              <section className="bg-gradient-to-br from-brand to-brand-ink text-white rounded-2xl p-6 md:p-8 flex items-center justify-between gap-4 flex-wrap" style={{ color: "#fff" }}>
                <div>
                  <div className="font-display font-normal text-2xl md:text-[28px] tracking-tight leading-tight">
                    Bo&apos;sh vaqtlaringizni <em className="italic text-[#BBD1EC]">boshqaring</em>
                  </div>
                  <p className="text-[14px] text-[#BBD1EC] mt-1.5">Keyingi hafta uchun jadvalingizni oldindan belgilang.</p>
                </div>
                <button onClick={() => setSection("schedule")} style={{ color: "var(--brand-ink)" }} className="btn bg-white !text-brand-ink">
                  <Calendar className="w-4 h-4" /> Jadvalni ochish
                </button>
              </section>
            </MotionReveal>
          )}

          {/* ============ SCHEDULE ============ */}
          {section === "schedule" && (
            <MotionReveal>
              <SectionHeader title="Mening" accent="jadvalim" subtitle="Hafta davomida belgilangan qabullar — bo'sh katakka bosib vaqt qo'shing" />
              <div className="bg-surface border border-line rounded-2xl p-4 md:p-6 overflow-auto">
                <div className="grid gap-1 min-w-[760px]" style={{ gridTemplateColumns: "70px repeat(7, 1fr)" }}>
                  <div />
                  {weekDays.map((d, i) => (
                    <div key={d} className={`text-center py-2 text-[11px] font-bold uppercase tracking-wider ${i === 4 ? "text-brand" : "text-muted"}`}>
                      {d} <span className="block text-sm text-ink mt-0.5 tabular-nums">{dayNums[i]}</span>
                    </div>
                  ))}
                  {timeSlots.map((t) => (
                    <div key={t} className="contents">
                      <div className="text-[11px] text-muted font-semibold text-right pr-2 py-3 tabular-nums">{t}</div>
                      {weekDays.map((d) => {
                        const key = `${d}-${t}`;
                        const entry = schedule[key];
                        if (entry?.type === "patient") {
                          return <button key={key} onClick={() => setScheduleEdit({ key, day: d, time: t })} className="sched-cell bg-brand-soft text-brand text-[12px] font-semibold px-2 py-2 rounded-lg hover:bg-brand transition-colors truncate">{entry.label}</button>;
                        }
                        if (entry?.type === "break") {
                          return <button key={key} onClick={() => setScheduleEdit({ key, day: d, time: t })} className="sched-cell-break bg-warn-soft text-warn text-[11px] font-semibold px-2 py-2 rounded-lg text-center hover:bg-warn transition-colors">{entry.label}</button>;
                        }
                        return <button key={key} onClick={() => setScheduleEdit({ key, day: d, time: t })} className="border border-dashed border-line hover:border-brand hover:bg-brand-soft/50 rounded-lg h-9" />;
                      })}
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex gap-3 mt-4 flex-wrap">
                <div className="inline-flex items-center gap-1.5 text-[12.5px] text-ink-soft"><span className="w-3 h-3 rounded bg-brand-soft border border-brand" />Qabul band</div>
                <div className="inline-flex items-center gap-1.5 text-[12.5px] text-ink-soft"><span className="w-3 h-3 rounded bg-warn-soft border border-warn" />Tanaffus</div>
                <div className="inline-flex items-center gap-1.5 text-[12.5px] text-ink-soft"><span className="w-3 h-3 rounded border border-dashed border-line" />Bo&apos;sh</div>
                <button onClick={() => { setSchedule((s) => ({ ...s, "Sh-10:00": { label: "Dam olish", type: "break" } })); toast.show("Shanba 10:00 — dam olish qo'shildi", "success"); }} className="btn btn-outline btn-sm ml-auto"><Plus className="w-3.5 h-3.5" />Dam olish qo&apos;shish</button>
              </div>
            </MotionReveal>
          )}

          {/* ============ PATIENTS ============ */}
          {section === "patients" && (
            <MotionReveal>
              <SectionHeader title="Mening" accent="bemorlarim" subtitle={`Jami ${patients.length} ta faol bemor · So'nggi tashriflar bo'yicha tartiblandi`} />
              <div className="flex gap-3 mb-4 flex-wrap">
                <div className="relative flex-1 max-w-sm">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
                  <input value={patientQuery} onChange={(e) => setPatientQuery(e.target.value)} placeholder="Bemor ismini kiriting..." className="w-full pl-10 pr-3 py-2.5 border border-line-strong rounded-xl text-sm bg-surface outline-none focus:border-brand" />
                </div>
                <button onClick={() => setNewPatientOpen(true)} className="btn btn-primary"><Plus className="w-4 h-4" />Bemor qo&apos;shish</button>
                <button onClick={() => setNewApptOpen(true)} className="btn btn-outline"><Calendar className="w-4 h-4" />Qabul qo&apos;shish</button>
              </div>
              <div className="bg-surface border border-line rounded-2xl overflow-visible">
                <div className="grid grid-cols-[1fr_80px_1fr_80px_140px] gap-4 px-5 py-3 border-b border-line bg-bg text-[11.5px] text-muted uppercase font-bold tracking-wider">
                  <div>Bemor</div><div>Yosh</div><div>Tashxis</div><div>Tashrif</div><div>So&apos;nggi</div>
                </div>
                {filteredPatients.map((p) => (
                  <div key={p.id} className="grid grid-cols-[1fr_80px_1fr_80px_140px] gap-4 px-5 py-4 border-b border-line last:border-b-0 hover:bg-bg transition-colors items-center relative">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-10 h-10 rounded-full text-white font-bold grid place-items-center text-xs shrink-0" style={{ background: p.bg, color: "#fff" }}>{p.initials}</div>
                      <div className="min-w-0"><div className="font-bold text-sm text-ink truncate">{p.name}</div><div className="text-[12px] text-muted truncate">{p.phone}</div></div>
                    </div>
                    <div className="text-sm text-ink tabular-nums">{p.age}</div>
                    <div className="text-[13px] text-ink-soft truncate">{p.diag}</div>
                    <div className="text-sm text-ink tabular-nums">{p.visits}</div>
                    <div className="flex items-center justify-between gap-1 text-[12px] text-muted relative">
                      {p.last}
                      <button onClick={() => setPatientMenuFor(patientMenuFor === p.id ? null : p.id)} className="w-7 h-7 rounded-md text-ink-soft hover:bg-brand-soft hover:text-brand grid place-items-center">
                        <MoreVertical className="w-3.5 h-3.5" />
                      </button>
                      {patientMenuFor === p.id && (
                        <div className="absolute right-0 top-full mt-1 w-52 bg-surface border border-line rounded-xl shadow-xl z-10 overflow-hidden">
                          <button onClick={() => { toast.show(`${p.name} kartasi ochildi`, "info"); setPatientMenuFor(null); }} className="w-full px-4 py-2.5 text-left text-sm hover:bg-bg flex items-center gap-2 text-ink"><FileText className="w-4 h-4 text-ink-soft" />Tibbiy karta</button>
                          <button onClick={() => { window.location.href = `tel:${p.phone.replace(/\s+/g, "")}`; }} className="w-full px-4 py-2.5 text-left text-sm hover:bg-bg flex items-center gap-2 text-ink border-t border-line"><Phone className="w-4 h-4 text-ink-soft" />Qo&apos;ng&apos;iroq</button>
                          <button onClick={() => { toast.show(`${p.name}ga xabar oynasi ochildi`, "info"); setPatientMenuFor(null); }} className="w-full px-4 py-2.5 text-left text-sm hover:bg-bg flex items-center gap-2 text-ink border-t border-line"><MessageSquare className="w-4 h-4 text-ink-soft" />Xabar yozish</button>
                          <button onClick={() => { setNewApptOpen(true); setPatientMenuFor(null); }} className="w-full px-4 py-2.5 text-left text-sm hover:bg-bg flex items-center gap-2 text-ink border-t border-line"><Calendar className="w-4 h-4 text-ink-soft" />Qabulga yozish</button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                {filteredPatients.length === 0 && <div className="py-14 text-center text-sm text-muted">Hech narsa topilmadi</div>}
              </div>
            </MotionReveal>
          )}

          {/* ============ RECORDS ============ */}
          {section === "records" && (
            <MotionReveal>
              <SectionHeader title="Tahlillar va" accent="retseptlar" subtitle="Yuborilgan va kutilayotgan tibbiy hujjatlar" />
              <div className="flex gap-2 mb-4 flex-wrap">
                {(["all", "Tahlil", "Retsept", "EKG", "UZI"] as const).map((f) => (
                  <button key={f} onClick={() => setRecordFilter(f)} style={recordFilter === f ? { color: "#fff" } : undefined} className={`px-3.5 py-2 text-[13px] font-semibold rounded-full transition-colors ${recordFilter === f ? "bg-brand text-white" : "bg-surface border border-line text-ink-soft hover:border-brand hover:text-brand"}`}>
                    {f === "all" ? "Hammasi" : f}
                  </button>
                ))}
                <button onClick={() => setNewRecordOpen(true)} className="btn btn-primary btn-sm ml-auto"><Upload className="w-3.5 h-3.5" />Yuklash</button>
              </div>
              <div className="grid gap-3">
                {filteredRecords.map((r) => {
                  const t = recordTypes[r.type] ?? recordTypes.default;
                  const Icon = t.icon;
                  return (
                    <div key={r.id} className="bg-surface border border-line rounded-xl p-4 flex items-center gap-4 flex-wrap hover:border-brand/40 transition-colors">
                      <div className="w-11 h-11 rounded-xl grid place-items-center shrink-0" style={{ background: t.bg, color: t.color }}>
                        <Icon className="w-[22px] h-[22px]" strokeWidth={2} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-bold text-sm text-ink">{r.title}</div>
                        <div className="text-[12.5px] text-ink-soft inline-flex items-center gap-1.5 flex-wrap">
                          {r.patient} · {r.date}
                          {r.fileName && <span className="inline-flex items-center gap-1 text-brand"><Paperclip className="w-3 h-3" />{r.fileName}</span>}
                        </div>
                      </div>
                      <span className="text-[11px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded" style={{ background: t.bg, color: t.color }}>{r.type}</span>
                      <span className={`inline-flex items-center gap-1 text-[11.5px] font-semibold px-2.5 py-1 rounded-full ${r.status === "ready" ? "bg-accent-soft text-accent" : r.status === "sent" ? "bg-brand-soft text-brand" : "bg-warn-soft text-warn"}`}>
                        {r.status === "ready" ? "Tayyor" : r.status === "sent" ? "Yuborilgan" : "Kutilmoqda"}
                      </span>
                      <button onClick={() => toast.show(`${r.title} yuklandi (demo)`, "success")} className="w-9 h-9 rounded-lg border border-line text-ink-soft hover:border-brand hover:text-brand grid place-items-center"><Download className="w-4 h-4" /></button>
                      <button onClick={() => { setRecords((rs) => rs.filter((x) => x.id !== r.id)); toast.show("Hujjat o'chirildi", "info"); }} className="w-9 h-9 rounded-lg border border-line text-ink-soft hover:border-danger hover:text-danger grid place-items-center"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  );
                })}
              </div>
            </MotionReveal>
          )}

          {/* ============ REVIEWS ============ */}
          {section === "reviews" && (
            <MotionReveal>
              <SectionHeader title="Bemor" accent="sharhlari" subtitle={`O'rtacha: 4.9 ★ · ${reviews.length * 100 + 12} ta sharh`} />
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
                {[
                  { l: "5 yulduz", v: 356, p: 86 }, { l: "4 yulduz", v: 42, p: 10 }, { l: "3 va past", v: 14, p: 4 },
                ].map((b) => (
                  <div key={b.l} className="bg-surface border border-line rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2 text-sm">
                      <span className="font-semibold text-ink">{b.l}</span>
                      <span className="text-muted tabular-nums">{b.v} ta ({b.p}%)</span>
                    </div>
                    <div className="h-2 bg-bg rounded-full overflow-hidden"><div className="h-full rounded-full" style={{ width: `${b.p}%`, background: "linear-gradient(90deg, var(--brand), var(--brand-ink))" }} /></div>
                  </div>
                ))}
              </div>
              <div className="grid gap-4">
                {reviews.map((r) => (
                  <div key={r.id} className="bg-surface border border-line rounded-2xl p-5 flex gap-4">
                    <div className="w-11 h-11 rounded-full text-white font-bold grid place-items-center text-xs shrink-0" style={{ background: r.bg, color: "#fff" }}>{r.initials}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 mb-1 flex-wrap">
                        <div className="font-bold text-sm text-ink">{r.name}</div>
                        <div className="text-[11.5px] text-muted">{r.date}</div>
                      </div>
                      <div className="inline-flex gap-0.5 text-warn mb-2">
                        {Array.from({ length: 5 }).map((_, k) => <Star key={k} className={`w-3.5 h-3.5 ${k < r.stars ? "fill-current" : "text-[#D4E0ED] fill-[#D4E0ED]"}`} />)}
                      </div>
                      <p className="text-[13.5px] text-ink-soft leading-relaxed mb-2">{r.text}</p>
                      {r.reply ? (
                        <div className="mt-3 pl-4 border-l-2 border-brand bg-brand-soft/30 rounded-r-lg p-3">
                          <div className="text-[11px] font-bold text-brand uppercase tracking-wider mb-1">Sizning javobingiz</div>
                          <p className="text-[13px] text-ink">{r.reply}</p>
                        </div>
                      ) : replyFor === r.id ? (
                        <form onSubmit={(e) => {
                          e.preventDefault();
                          const form = e.currentTarget;
                          const txt = (form.elements.namedItem("reply") as HTMLTextAreaElement).value.trim();
                          if (!txt) return;
                          setReviews((rvs) => rvs.map((x) => x.id === r.id ? { ...x, reply: txt } : x));
                          setReplyFor(null);
                          toast.show("Javob yuborildi", "success");
                        }} className="mt-2 flex gap-2 items-start">
                          <textarea name="reply" rows={2} autoFocus placeholder="Javobingizni yozing..." className="flex-1 px-3 py-2 border border-line-strong rounded-lg text-[13px] bg-bg outline-none focus:border-brand resize-none" />
                          <button type="submit" className="btn btn-primary btn-sm shrink-0"><Send className="w-3.5 h-3.5" />Yuborish</button>
                          <button type="button" onClick={() => setReplyFor(null)} className="btn btn-ghost btn-sm shrink-0">Bekor</button>
                        </form>
                      ) : (
                        <button onClick={() => setReplyFor(r.id)} className="text-[12.5px] text-brand font-semibold hover:underline">Javob yozish →</button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </MotionReveal>
          )}

          {/* ============ REVENUE ============ */}
          {section === "revenue" && (
            <MotionReveal>
              <SectionHeader title="Mening" accent="daromadim" subtitle="Noyabr oyi · 14.2 million so'm · +18% o'tgan oyga nisbatan" />
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {[
                  { l: "Bu oy", v: "14.2M", s: "+18%" }, { l: "O'rtacha / qabul", v: "280k", s: "stabil" },
                  { l: "Jami qabullar", v: "51", s: "+8" }, { l: "Komissiya", v: "1.4M", s: "10%" },
                ].map((s) => (
                  <div key={s.l} className="bg-surface border border-line rounded-2xl p-5">
                    <div className="text-[11.5px] text-muted uppercase tracking-wider font-semibold">{s.l}</div>
                    <div className="font-display font-medium text-[28px] text-ink tabular-nums leading-none my-2">{s.v}</div>
                    <div className="text-[11.5px] font-semibold inline-flex items-center gap-1 text-brand"><TrendingUp className="w-3 h-3" />{s.s}</div>
                  </div>
                ))}
              </div>
              <div className="bg-surface border border-line rounded-2xl p-6 mb-6">
                <h2 className="font-display font-normal text-xl mb-4">6 oylik <em className="italic text-brand">daromad</em></h2>
                <div className="h-[200px] flex items-end justify-between gap-3">
                  {chartData.map((c) => {
                    const h = (c.value / maxVal) * 100;
                    const isLast = c.month === "Noy";
                    return (
                      <button key={c.month} onClick={() => toast.show(`${c.month} oyi: ${c.value} million so'm`, "info")} className="flex-1 flex flex-col items-center gap-2 group">
                        <div className="text-xs font-bold text-ink tabular-nums">{c.value}M</div>
                        <div className="w-full relative rounded-t-md transition-all group-hover:opacity-80" style={{ height: `${h}%`, background: isLast ? "linear-gradient(180deg, var(--brand), var(--brand-ink))" : "var(--brand-soft)" }} />
                        <div className={`text-xs ${isLast ? "text-brand font-bold" : "text-muted font-medium"}`}>{c.month}</div>
                      </button>
                    );
                  })}
                </div>
              </div>
              <div className="bg-surface border border-line rounded-2xl overflow-hidden">
                <div className="px-5 py-4 border-b border-line flex items-center justify-between">
                  <h3 className="font-bold text-ink">So&apos;nggi tranzaksiyalar</h3>
                  <button onClick={() => {
                    const csv = "Sana,Bemor,Xizmat,Summa\n" + transactions.map((t) => `${t.date},${t.patient},${t.service},${t.amount}`).join("\n");
                    const blob = new Blob([csv], { type: "text/csv" });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement("a");
                    a.href = url; a.download = "daromad-noyabr.csv"; a.click();
                    URL.revokeObjectURL(url);
                    toast.show("Hisobot yuklandi", "success");
                  }} className="btn btn-outline btn-sm"><Download className="w-3.5 h-3.5" />CSV yuklash</button>
                </div>
                <div className="divide-y divide-line">
                  {transactions.map((t, i) => (
                    <div key={i} className="px-5 py-3.5 flex items-center justify-between gap-4 hover:bg-bg transition-colors">
                      <div className="min-w-0 flex-1">
                        <div className="font-semibold text-sm text-ink">{t.patient}</div>
                        <div className="text-[12.5px] text-ink-soft">{t.service} · {t.date}</div>
                      </div>
                      <div className="font-display font-medium text-brand tabular-nums text-[15px]">+{t.amount.toLocaleString("uz-UZ")} so&apos;m</div>
                    </div>
                  ))}
                </div>
              </div>
            </MotionReveal>
          )}

          {/* ============ SETTINGS ============ */}
          {section === "settings" && (
            <MotionReveal>
              <SectionHeader title="Shifokor" accent="sozlamalari" subtitle="Bu yerda kiritgan ma'lumotlaringiz ommaviy profilingizda ko'rinadi" />
              <form onSubmit={saveSettings} className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">
                <div className="flex flex-col gap-6">
                  {/* --- Asosiy --- */}
                  <SettingsCard title="Asosiy ma'lumotlar" desc="Katalogda va profilda ko'rinadi">
                    <div className="grid grid-cols-2 gap-4">
                      <Field label="Ism"><input value={settings.firstName} onChange={(e) => setSettings({ ...settings, firstName: e.target.value })} className="field" /></Field>
                      <Field label="Familiya"><input value={settings.lastName} onChange={(e) => setSettings({ ...settings, lastName: e.target.value })} className="field" /></Field>
                    </div>
                    <Field label="Mutaxassislik">
                      <select value={settings.specialty} onChange={(e) => setSettings({ ...settings, specialty: e.target.value })} className="field">
                        {["Kardiologiya", "Nevrologiya", "Pediatriya", "Dermatologiya", "Terapiya", "Stomatologiya", "Oftalmologiya", "LOR", "Ginekologiya", "Endokrinologiya"].map((s) => <option key={s}>{s}</option>)}
                      </select>
                    </Field>
                    <div className="grid grid-cols-3 gap-4">
                      <Field label="Tajriba (yil)"><input type="number" value={settings.experience} onChange={(e) => setSettings({ ...settings, experience: +e.target.value })} className="field" /></Field>
                      <Field label="Qabul narxi (so'm)"><input type="number" value={settings.price} onChange={(e) => setSettings({ ...settings, price: +e.target.value })} step={10000} className="field" /></Field>
                      <Field label="Tillar"><input value={settings.languages} onChange={(e) => setSettings({ ...settings, languages: e.target.value })} placeholder="O'zbek, Rus, Ingliz" className="field" /></Field>
                    </div>
                    <label className="inline-flex items-center gap-2.5 cursor-pointer mt-2">
                      <span className="relative inline-block w-10 h-6">
                        <input type="checkbox" checked={settings.online} onChange={(e) => setSettings({ ...settings, online: e.target.checked })} className="sr-only peer" />
                        <span className="absolute inset-0 bg-line-strong peer-checked:bg-accent rounded-full transition-colors" />
                        <span className="absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform peer-checked:translate-x-4" />
                      </span>
                      <span className="text-sm text-ink font-medium">Hozir onlayn (bemorlar ko&apos;radi)</span>
                    </label>
                  </SettingsCard>

                  {/* --- About --- */}
                  <SettingsCard title="Haqida" desc="Bemorlar profil sahifasida ko'radigan matn">
                    <Field label="Litsenziya / sertifikat matni">
                      <input value={settings.credentials} onChange={(e) => setSettings({ ...settings, credentials: e.target.value })} placeholder="Masalan: Sog'liqni saqlash vazirligi tomonidan litsenziyalangan" className="field" />
                    </Field>
                    <Field label="Qisqa bio (katalog kartasida)"><textarea rows={2} value={settings.bio} onChange={(e) => setSettings({ ...settings, bio: e.target.value })} className="field resize-none" /></Field>
                    <Field label="To'liq ma'lumot (profil sahifasida)"><textarea rows={5} value={settings.bioFull} onChange={(e) => setSettings({ ...settings, bioFull: e.target.value })} className="field resize-none" /></Field>
                  </SettingsCard>

                  {/* --- Tags --- */}
                  <SettingsCard title="Teglar" desc="Profil tepasida ko'rinadigan chiplar (masalan: Immunoprofilaktika, Allergiya)">
                    <TagsEditor tags={settings.tags} onChange={(tags) => setSettings({ ...settings, tags })} />
                  </SettingsCard>

                  {/* --- Education --- */}
                  <SettingsCard title="Ta'lim va tajriba" desc="Yil bo'yicha tartibda ko'rsatiladi">
                    <div className="flex flex-col gap-3">
                      {settings.education.map((e, i) => (
                        <div key={i} className="border border-line rounded-xl p-3.5 grid grid-cols-[70px_1fr_auto] gap-3 items-start">
                          <input value={e.year} onChange={(ev) => { const n = [...settings.education]; n[i] = { ...n[i], year: ev.target.value }; setSettings({ ...settings, education: n }); }} placeholder="2010" className="field text-center" />
                          <div className="flex flex-col gap-2">
                            <input value={e.title} onChange={(ev) => { const n = [...settings.education]; n[i] = { ...n[i], title: ev.target.value }; setSettings({ ...settings, education: n }); }} placeholder="Universitet / Diplom nomi" className="field font-semibold" />
                            <input value={e.desc} onChange={(ev) => { const n = [...settings.education]; n[i] = { ...n[i], desc: ev.target.value }; setSettings({ ...settings, education: n }); }} placeholder="Tavsif" className="field" />
                            <input value={e.where} onChange={(ev) => { const n = [...settings.education]; n[i] = { ...n[i], where: ev.target.value }; setSettings({ ...settings, education: n }); }} placeholder="Shahar, Davlat" className="field text-[12.5px]" />
                          </div>
                          <button type="button" onClick={() => { const n = settings.education.filter((_, k) => k !== i); setSettings({ ...settings, education: n }); }} className="w-8 h-8 rounded-lg text-ink-soft hover:bg-danger-soft hover:text-danger grid place-items-center shrink-0"><Trash2 className="w-4 h-4" /></button>
                        </div>
                      ))}
                      <button type="button" onClick={() => setSettings({ ...settings, education: [...settings.education, { year: "", title: "", desc: "", where: "" }] })} className="btn btn-outline btn-sm self-start"><Plus className="w-3.5 h-3.5" />Yangi yozuv qo&apos;shish</button>
                    </div>
                  </SettingsCard>

                  {/* --- Extra services --- */}
                  <SettingsCard title="Taklif qilinadigan xizmatlar" desc="Profil sahifasida narx ro'yxati sifatida chiqadi">
                    <div className="flex flex-col gap-2">
                      {settings.extraServices.map((s, i) => (
                        <div key={i} className="grid grid-cols-[1fr_160px_auto] gap-2 items-center">
                          <input value={s.name} onChange={(ev) => { const n = [...settings.extraServices]; n[i] = { ...n[i], name: ev.target.value }; setSettings({ ...settings, extraServices: n }); }} placeholder="Xizmat nomi" className="field" />
                          <input type="number" value={s.price} onChange={(ev) => { const n = [...settings.extraServices]; n[i] = { ...n[i], price: +ev.target.value }; setSettings({ ...settings, extraServices: n }); }} step={10000} placeholder="Narx (so'm)" className="field tabular-nums" />
                          <button type="button" onClick={() => { const n = settings.extraServices.filter((_, k) => k !== i); setSettings({ ...settings, extraServices: n }); }} className="w-9 h-9 rounded-lg text-ink-soft hover:bg-danger-soft hover:text-danger grid place-items-center"><Trash2 className="w-4 h-4" /></button>
                        </div>
                      ))}
                      <button type="button" onClick={() => setSettings({ ...settings, extraServices: [...settings.extraServices, { name: "", price: 0 }] })} className="btn btn-outline btn-sm self-start mt-2"><Plus className="w-3.5 h-3.5" />Xizmat qo&apos;shish</button>
                    </div>
                  </SettingsCard>

                  <div className="flex gap-2 sticky bottom-4">
                    <button type="submit" className="btn btn-primary"><Save className="w-4 h-4" />Barcha o&apos;zgarishlarni saqlash</button>
                    <button type="button" onClick={() => { try { const raw = localStorage.getItem(SETTINGS_KEY); if (raw) setSettings(JSON.parse(raw)); } catch { /* ignore */ } toast.show("Oxirgi saqlangan versiyaga qaytarildi", "info"); }} className="btn btn-outline">Bekor qilish</button>
                  </div>
                </div>

                {/* --- Sidebar preview --- */}
                <aside className="flex flex-col gap-4 lg:sticky lg:top-24 lg:self-start">
                  <div className="bg-surface border border-line rounded-2xl p-6 text-center">
                    <div className="relative w-28 h-28 mx-auto mb-3">
                      <div className="w-full h-full rounded-full bg-gradient-to-br from-[#4D94F5] to-[#1E6DD8] text-white font-bold grid place-items-center text-3xl" style={{ color: "#fff" }}>{settings.firstName[0]}{settings.lastName[0]}</div>
                      {settings.online && <span className="absolute bottom-1 right-1 w-5 h-5 bg-accent border-[3px] border-white rounded-full" />}
                    </div>
                    <div className="font-bold text-ink text-[15px]">Dr. {settings.firstName} {settings.lastName}</div>
                    <div className="text-xs text-brand font-semibold uppercase tracking-wider mt-0.5">{settings.specialty}</div>
                    <div className="text-[11px] text-muted mt-1">ID: DR-00142</div>
                    <div className="mt-3 pt-3 border-t border-line grid grid-cols-2 gap-2 text-left">
                      <div><div className="text-[10.5px] text-muted uppercase font-bold">Tajriba</div><div className="font-bold text-ink text-sm tabular-nums">{settings.experience} yil</div></div>
                      <div><div className="text-[10.5px] text-muted uppercase font-bold">Narx</div><div className="font-bold text-ink text-sm tabular-nums">{(settings.price / 1000).toFixed(0)}k</div></div>
                    </div>
                    {settings.tags.length > 0 && (
                      <div className="mt-3 pt-3 border-t border-line flex gap-1 flex-wrap justify-center">
                        {settings.tags.slice(0, 4).map((t) => <span key={t} className="text-[10.5px] px-2 py-0.5 bg-brand-soft text-brand rounded-full font-medium">{t}</span>)}
                      </div>
                    )}
                    <button type="button" onClick={() => toast.show("Rasm yuklash (demo)", "info")} className="btn btn-outline btn-sm mx-auto mt-4"><Edit3 className="w-3.5 h-3.5" />Rasm o&apos;zgartirish</button>
                  </div>
                  <Link href={`/doctors/alisher-qodirov`} target="_blank" className="btn btn-outline justify-center text-sm"><UserCircle className="w-4 h-4" />Omma profilimni ko&apos;rish</Link>
                  <div className="bg-danger-soft border border-danger/20 rounded-2xl p-5">
                    <h3 className="font-bold text-danger text-sm mb-1">Xavfli joy</h3>
                    <p className="text-[12.5px] text-ink-soft mb-3">Hisobni o&apos;chirsangiz, barcha ma&apos;lumot yo&apos;qoladi.</p>
                    <button type="button" onClick={() => { if (confirm("Hisobni o'chirmoqchimisiz? Bu amal qaytarilmaydi.")) toast.show("Admin tasdiqlashini kutamiz", "error"); }} className="inline-flex items-center gap-1.5 text-[12.5px] font-bold text-danger hover:underline"><Trash2 className="w-3.5 h-3.5" />Hisobni o&apos;chirish</button>
                  </div>
                </aside>
              </form>
            </MotionReveal>
          )}
        </main>
      </div>

      {/* ===== MODALS ===== */}
      {newApptOpen && <NewApptModal onClose={() => setNewApptOpen(false)} onCreate={(a) => { setAppts((prev) => [...prev, { ...a, id: `n${Date.now()}`, bg: palette[prev.length % palette.length] }]); setNewApptOpen(false); toast.show(`${a.patient} · ${a.time} ga qabul qo'shildi`, "success"); }} />}
      {activeAppt && <ConsultationModal appt={activeAppt} onClose={() => setActiveAppt(null)} onEnd={endActiveAppt} />}
      {scheduleEdit && <ScheduleEditModal entry={schedule[scheduleEdit.key]} day={scheduleEdit.day} time={scheduleEdit.time} onClose={() => setScheduleEdit(null)} onSave={(v) => { setSchedule((s) => ({ ...s, [scheduleEdit.key]: v })); setScheduleEdit(null); toast.show("Jadval yangilandi", "success"); }} onRemove={() => { setSchedule((s) => { const n = { ...s }; delete n[scheduleEdit.key]; return n; }); setScheduleEdit(null); toast.show("Vaqt bo'shatildi", "success"); }} />}
      {newRecordOpen && <NewRecordModal onClose={() => setNewRecordOpen(false)} onCreate={(r) => { setRecords((prev) => [{ ...r, id: `rec${Date.now()}` }, ...prev]); setNewRecordOpen(false); toast.show("Hujjat qo'shildi", "success"); }} />}
      {newPatientOpen && <NewPatientModal onClose={() => setNewPatientOpen(false)} onCreate={(p) => { setPatients((prev) => [{ ...p, id: `p${Date.now()}`, bg: palette[prev.length % palette.length], last: "Bugun", visits: 0 }, ...prev]); setNewPatientOpen(false); toast.show(`${p.name} bemorlar ro'yxatiga qo'shildi`, "success"); }} />}
    </div>
  );
}

