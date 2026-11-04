"use client";

import { useState, type ReactNode } from "react";
import { Plus, X } from "lucide-react";

export function SettingsCard({ title, desc, children }: { title: string; desc?: string; children: ReactNode }) {
  return (
    <div className="bg-surface border border-line rounded-2xl p-6 flex flex-col gap-4">
      <div>
        <h2 className="font-display font-normal text-xl text-ink tracking-tight">{title}</h2>
        {desc && <p className="text-[12.5px] text-muted mt-0.5">{desc}</p>}
      </div>
      {children}
    </div>
  );
}

export function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <label className="block text-xs font-bold text-ink-soft mb-1.5 uppercase tracking-wide">{label}</label>
      {children}
    </div>
  );
}

export function TagsEditor({ tags, onChange }: { tags: string[]; onChange: (t: string[]) => void }) {
  const [input, setInput] = useState("");
  const add = () => {
    const v = input.trim();
    if (!v || tags.includes(v)) return;
    onChange([...tags, v]);
    setInput("");
  };
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap gap-1.5">
        {tags.map((t) => (
          <span key={t} className="inline-flex items-center gap-1.5 bg-brand-soft text-brand text-[13px] font-medium px-3 py-1.5 rounded-full">
            {t}
            <button type="button" onClick={() => onChange(tags.filter((x) => x !== t))} aria-label="O'chirish" className="hover:text-danger"><X className="w-3 h-3" strokeWidth={2.5} /></button>
          </span>
        ))}
        {tags.length === 0 && <span className="text-[12.5px] text-muted">Hali teg qo&apos;shilmagan</span>}
      </div>
      <div className="flex gap-2">
        <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); add(); } }} placeholder="Yangi teg · Enter bilan qo'shing" className="field flex-1" />
        <button type="button" onClick={add} className="btn btn-outline btn-sm"><Plus className="w-3.5 h-3.5" />Qo&apos;shish</button>
      </div>
    </div>
  );
}

export function SectionHeader({ title, accent, subtitle }: { title: string; accent: string; subtitle: string }) {
  return (
    <div className="mb-6">
      <h1 className="font-display font-normal text-3xl md:text-[36px] tracking-tight leading-tight">
        {title} <em className="italic text-brand">{accent}</em>
      </h1>
      <p className="text-sm text-ink-soft mt-1.5">{subtitle}</p>
    </div>
  );
}
