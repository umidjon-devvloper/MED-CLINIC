"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { X, Video, Phone, UserCircle, Clock, Trash2, Upload } from "lucide-react";
import { recordTypes, initialRecords } from "./mock-data";
import type { Appt, Patient, ScheduleEntry } from "./types";

/* Shared modal shell */
export function Modal({ title, onClose, children, size = "md" }: { title: string; onClose: () => void; children: ReactNode; size?: "sm" | "md" | "lg" }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [onClose]);
  const w = size === "sm" ? "max-w-sm" : size === "lg" ? "max-w-2xl" : "max-w-md";
  return (
    <div className="fixed inset-0 z-50 grid place-items-center p-4 bg-ink/40 backdrop-blur-sm" onClick={onClose}>
      <div className={`w-full ${w} bg-surface rounded-2xl shadow-2xl overflow-hidden`} onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between px-6 py-4 border-b border-line">
          <h3 className="font-display font-normal text-xl text-ink tracking-tight">{title}</h3>
          <button onClick={onClose} aria-label="Yopish" className="w-8 h-8 rounded-lg text-ink-soft hover:bg-bg grid place-items-center"><X className="w-4 h-4" /></button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}

export function NewApptModal({ onClose, onCreate }: { onClose: () => void; onCreate: (a: Omit<Appt, "id" | "bg">) => void }) {
  const [patient, setPatient] = useState("");
  const [time, setTime] = useState("09:00");
  const [reason, setReason] = useState("Birlamchi konsultatsiya");
  const [type, setType] = useState<Appt["type"]>("in-person");
  return (
    <Modal title="Yangi qabul qo'shish" onClose={onClose}>
      <form onSubmit={(e) => { e.preventDefault(); if (!patient.trim()) return; const initials = patient.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase(); onCreate({ patient, initials, time, reason, type, status: "upcoming" }); }} className="flex flex-col gap-4">
        <div>
          <label className="block text-xs font-bold text-ink-soft mb-1.5 uppercase tracking-wide">Bemor ismi</label>
          <input autoFocus value={patient} onChange={(e) => setPatient(e.target.value)} placeholder="Umidjon Afforov" required className="field" />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-bold text-ink-soft mb-1.5 uppercase tracking-wide">Vaqti</label>
            <input type="time" value={time} onChange={(e) => setTime(e.target.value)} className="field" />
          </div>
          <div>
            <label className="block text-xs font-bold text-ink-soft mb-1.5 uppercase tracking-wide">Turi</label>
            <select value={type} onChange={(e) => setType(e.target.value as Appt["type"])} className="field">
              <option value="in-person">Shaxsan</option>
              <option value="online">Video</option>
              <option value="phone">Qo&apos;ng&apos;iroq</option>
            </select>
          </div>
        </div>
        <div>
          <label className="block text-xs font-bold text-ink-soft mb-1.5 uppercase tracking-wide">Sabab</label>
          <input value={reason} onChange={(e) => setReason(e.target.value)} className="field" />
        </div>
        <div className="flex gap-2 pt-2">
          <button type="submit" className="btn btn-primary flex-1 justify-center">Qo&apos;shish</button>
          <button type="button" onClick={onClose} className="btn btn-outline">Bekor</button>
        </div>
      </form>
    </Modal>
  );
}

export function ConsultationModal({ appt, onClose, onEnd }: { appt: Appt; onClose: () => void; onEnd: () => void }) {
  const [sec, setSec] = useState(0);
  useEffect(() => { const t = setInterval(() => setSec((s) => s + 1), 1000); return () => clearInterval(t); }, []);
  const mm = String(Math.floor(sec / 60)).padStart(2, "0");
  const ss = String(sec % 60).padStart(2, "0");
  return (
    <Modal title={`${appt.patient} · ${appt.time}`} onClose={onClose} size="lg">
      <div className="flex flex-col gap-5">
        <div className="bg-gradient-to-br from-brand to-brand-ink text-white rounded-2xl p-8 text-center" style={{ color: "#fff" }}>
          <div className="w-20 h-20 rounded-full mx-auto bg-white/15 grid place-items-center mb-4">
            {appt.type === "online" ? <Video className="w-9 h-9" /> : appt.type === "phone" ? <Phone className="w-9 h-9" /> : <UserCircle className="w-9 h-9" />}
          </div>
          <div className="font-display font-medium text-2xl mb-1">{appt.patient}</div>
          <div className="text-sm text-[#BBD1EC] mb-4">{appt.reason}</div>
          <div className="inline-flex items-center gap-2 bg-white/15 px-4 py-2 rounded-full font-mono text-lg tabular-nums">
            <Clock className="w-4 h-4" /> {mm}:{ss}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold text-ink-soft uppercase tracking-wide">Qabul izohi (karta uchun)</label>
          <textarea rows={3} placeholder="Tashxis, muolaja, tavsiyalar..." className="field resize-none" />
        </div>
        <div className="flex gap-2 justify-end">
          <button onClick={onClose} className="btn btn-outline">Minimize</button>
          <button onClick={onEnd} className="btn" style={{ background: "var(--danger)", color: "#fff" }}>Qabulni yakunlash</button>
        </div>
      </div>
    </Modal>
  );
}

export function ScheduleEditModal({ entry, day, time, onClose, onSave, onRemove }: {
  entry?: ScheduleEntry;
  day: string;
  time: string;
  onClose: () => void;
  onSave: (v: ScheduleEntry) => void;
  onRemove: () => void;
}) {
  const [label, setLabel] = useState(entry?.label ?? "");
  const [type, setType] = useState<"patient" | "break">(entry?.type ?? "patient");
  return (
    <Modal title={`${day} · ${time}`} onClose={onClose} size="sm">
      <form onSubmit={(e) => { e.preventDefault(); if (!label.trim()) return; onSave({ label, type }); }} className="flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-2 p-1 bg-bg rounded-lg">
          <button type="button" onClick={() => setType("patient")} style={type === "patient" ? { color: "#fff" } : undefined} className={`py-2 text-sm font-semibold rounded-md ${type === "patient" ? "bg-brand text-white" : "text-ink-soft"}`}>Qabul</button>
          <button type="button" onClick={() => setType("break")} style={type === "break" ? { color: "#fff" } : undefined} className={`py-2 text-sm font-semibold rounded-md ${type === "break" ? "bg-warn text-white" : "text-ink-soft"}`}>Tanaffus/Dam</button>
        </div>
        <div>
          <label className="block text-xs font-bold text-ink-soft mb-1.5 uppercase tracking-wide">{type === "patient" ? "Bemor ismi" : "Tavsif"}</label>
          <input autoFocus value={label} onChange={(e) => setLabel(e.target.value)} placeholder={type === "patient" ? "Umid K." : "Tanaffus"} className="field" required />
        </div>
        <div className="flex gap-2">
          <button type="submit" className="btn btn-primary flex-1 justify-center">Saqlash</button>
          {entry && <button type="button" onClick={onRemove} className="btn" style={{ background: "var(--danger-soft)", color: "var(--danger)" }}><Trash2 className="w-4 h-4" />O&apos;chirish</button>}
        </div>
      </form>
    </Modal>
  );
}

export function NewPatientModal({ onClose, onCreate }: { onClose: () => void; onCreate: (p: Omit<Patient, "id" | "bg" | "last" | "visits">) => void }) {
  const [name, setName] = useState("");
  const [age, setAge] = useState<number | "">("");
  const [phone, setPhone] = useState("+998 ");
  const [diag, setDiag] = useState("");
  return (
    <Modal title="Yangi bemor qo'shish" onClose={onClose}>
      <form onSubmit={(e) => { e.preventDefault(); if (!name.trim() || !age) return; const initials = name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase(); onCreate({ name, age: +age, phone, diag: diag || "Dastlabki tashxis yo'q", initials }); }} className="flex flex-col gap-4">
        <div>
          <label className="block text-xs font-bold text-ink-soft mb-1.5 uppercase tracking-wide">Ism Familiya</label>
          <input autoFocus value={name} onChange={(e) => setName(e.target.value)} placeholder="Umidjon Afforov" required className="field" />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-bold text-ink-soft mb-1.5 uppercase tracking-wide">Yoshi</label>
            <input type="number" value={age} onChange={(e) => setAge(e.target.value ? +e.target.value : "")} placeholder="35" min={0} max={120} required className="field" />
          </div>
          <div>
            <label className="block text-xs font-bold text-ink-soft mb-1.5 uppercase tracking-wide">Telefon</label>
            <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+998 90 123 45 67" className="field" />
          </div>
        </div>
        <div>
          <label className="block text-xs font-bold text-ink-soft mb-1.5 uppercase tracking-wide">Tashxis (ixtiyoriy)</label>
          <input value={diag} onChange={(e) => setDiag(e.target.value)} placeholder="Gipertoniya II dar." className="field" />
        </div>
        <div className="flex gap-2 pt-2">
          <button type="submit" className="btn btn-primary flex-1 justify-center">Qo&apos;shish</button>
          <button type="button" onClick={onClose} className="btn btn-outline">Bekor</button>
        </div>
      </form>
    </Modal>
  );
}

export function NewRecordModal({ onClose, onCreate }: { onClose: () => void; onCreate: (r: Omit<typeof initialRecords[number], "id">) => void }) {
  const [patient, setPatient] = useState("");
  const [title, setTitle] = useState("");
  const [type, setType] = useState("Tahlil");
  const [file, setFile] = useState<File | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const t = recordTypes[type] ?? recordTypes.default;
  const Icon = t.icon;

  const onPick = (f?: File | null) => {
    if (!f) return;
    if (f.size > 10 * 1024 * 1024) { alert("Fayl 10MB dan katta"); return; }
    setFile(f);
    if (!title.trim()) {
      const base = f.name.replace(/\.[^.]+$/, "");
      setTitle(base.charAt(0).toUpperCase() + base.slice(1));
    }
  };

  const fmtSize = (b: number) => b < 1024 ? `${b} B` : b < 1024 * 1024 ? `${(b / 1024).toFixed(1)} KB` : `${(b / 1024 / 1024).toFixed(1)} MB`;

  return (
    <Modal title="Yangi hujjat yuklash" onClose={onClose}>
      <form onSubmit={(e) => { e.preventDefault(); if (!patient.trim() || !title.trim()) return; onCreate({ patient, title, type, date: "Bugun", status: "ready", fileName: file?.name ?? "" }); }} className="flex flex-col gap-4">
        <div>
          <label className="block text-xs font-bold text-ink-soft mb-1.5 uppercase tracking-wide">Bemor</label>
          <input autoFocus value={patient} onChange={(e) => setPatient(e.target.value)} placeholder="Madina Karimova" required className="field" />
        </div>
        <div className="grid grid-cols-[1fr_120px] gap-3">
          <div>
            <label className="block text-xs font-bold text-ink-soft mb-1.5 uppercase tracking-wide">Nomi</label>
            <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Umumiy qon tahlili" required className="field" />
          </div>
          <div>
            <label className="block text-xs font-bold text-ink-soft mb-1.5 uppercase tracking-wide">Turi</label>
            <select value={type} onChange={(e) => setType(e.target.value)} className="field">
              {["Tahlil", "Retsept", "EKG", "UZI"].map((x) => <option key={x}>{x}</option>)}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-ink-soft mb-1.5 uppercase tracking-wide">Fayl</label>
          <input ref={fileInputRef} type="file" accept=".pdf,.jpg,.jpeg,.png,.webp,.doc,.docx" onChange={(e) => onPick(e.target.files?.[0])} className="hidden" />
          {file ? (
            <div className="flex items-center gap-3 border-2 border-brand/40 bg-brand-soft/30 rounded-xl p-4">
              <div className="w-11 h-11 rounded-xl grid place-items-center shrink-0" style={{ background: t.bg, color: t.color }}>
                <Icon className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-bold text-sm text-ink truncate">{file.name}</div>
                <div className="text-[12px] text-ink-soft">{fmtSize(file.size)} · {file.type || "noma'lum tur"}</div>
              </div>
              <button type="button" onClick={() => setFile(null)} className="w-8 h-8 rounded-lg text-ink-soft hover:bg-danger-soft hover:text-danger grid place-items-center"><X className="w-4 h-4" /></button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={(e) => { e.preventDefault(); setDragOver(false); onPick(e.dataTransfer.files?.[0]); }}
              className={`w-full border-2 border-dashed rounded-xl p-6 text-center transition-colors ${dragOver ? "border-brand bg-brand-soft/30" : "border-line-strong hover:border-brand hover:bg-brand-soft/15"}`}
            >
              <div className="w-12 h-12 rounded-xl bg-brand-soft text-brand grid place-items-center mx-auto mb-2">
                <Upload className="w-5 h-5" />
              </div>
              <div className="font-semibold text-sm text-ink">Fayl tanlang yoki sudrab tashlang</div>
              <div className="text-[12px] text-muted mt-1">PDF, JPG, PNG, DOC · 10MB gacha</div>
            </button>
          )}
        </div>

        <div className="flex gap-2 pt-1">
          <button type="submit" className="btn btn-primary flex-1 justify-center">Qo&apos;shish</button>
          <button type="button" onClick={onClose} className="btn btn-outline">Bekor</button>
        </div>
      </form>
    </Modal>
  );
}
