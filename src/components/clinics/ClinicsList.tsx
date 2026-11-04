"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { MapPin, Clock, Phone, Star, Navigation } from "lucide-react";
import type { Clinic } from "@/lib/types";

const quickFilters = [
  { key: "all",         label: "Hammasi" },
  { key: "24 soat",     label: "24 soat" },
  { key: "Pediatriya",  label: "Pediatriya" },
  { key: "Kardiologiya", label: "Kardiologiya" },
  { key: "MRT",         label: "MRT" },
  { key: "Laboratoriya", label: "Laboratoriya" },
];

function matches(c: Clinic, key: string): boolean {
  if (key === "all") return true;
  if (key === "24 soat") return c.hours.toLowerCase().includes("24 soat");
  return c.services.some((s) => s.toLowerCase() === key.toLowerCase());
}

export function ClinicsFilterChips({ value, onChange, counts }: { value: string; onChange: (v: string) => void; counts: Record<string, number> }) {
  return (
    <div className="flex gap-2 flex-wrap">
      {quickFilters.map((f) => {
        const active = value === f.key;
        const count = counts[f.key] ?? 0;
        const disabled = count === 0 && f.key !== "all";
        return (
          <button
            key={f.key}
            type="button"
            onClick={() => !disabled && onChange(f.key)}
            disabled={disabled}
            style={active ? { color: "#fff" } : undefined}
            className={`px-3.5 py-2 rounded-full text-[12.5px] font-medium border transition-all inline-flex items-center gap-1.5 ${active ? "bg-brand text-white border-brand shadow-[0_4px_12px_rgba(30,109,216,0.25)]" : disabled ? "bg-bg text-muted border-line/50 cursor-not-allowed opacity-50" : "bg-surface text-ink-soft border-line hover:border-brand hover:text-brand"}`}
          >
            {f.label}
            <span className={`text-[10.5px] font-bold tabular-nums px-1.5 py-0.5 rounded-full ${active ? "bg-white/20" : "bg-bg text-muted"}`} style={active ? { color: "#fff" } : undefined}>
              {count}
            </span>
          </button>
        );
      })}
    </div>
  );
}

export function ClinicsList({ clinics }: { clinics: Clinic[] }) {
  const [filter, setFilter] = useState<string>("all");

  const counts = useMemo(() => {
    const map: Record<string, number> = {};
    for (const f of quickFilters) {
      map[f.key] = clinics.filter((c) => matches(c, f.key)).length;
    }
    return map;
  }, [clinics]);

  const visible = useMemo(() => clinics.filter((c) => matches(c, filter)), [clinics, filter]);

  return (
    <div className="flex flex-col gap-5 md:gap-6">
      <div className="flex items-end justify-between gap-4 flex-wrap">
        <ClinicsFilterChips value={filter} onChange={setFilter} counts={counts} />
        <div className="text-[12.5px] text-muted font-medium tabular-nums">
          <b className="text-ink">{visible.length}</b> ta filial {filter !== "all" && <>· <em className="text-brand not-italic font-semibold">{filter}</em></>}
        </div>
      </div>

      {visible.length === 0 ? (
        <div className="bg-surface border border-dashed border-line-strong rounded-2xl py-16 text-center">
          <MapPin className="w-10 h-10 text-muted mx-auto mb-3" />
          <h3 className="text-lg font-semibold text-ink mb-1">Bu toifa bo&apos;yicha klinika topilmadi</h3>
          <p className="text-sm text-ink-soft mb-4">Boshqa filter tanlab ko&apos;ring</p>
          <button onClick={() => setFilter("all")} className="btn btn-outline">Hammasini ko&apos;rish</button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3 md:gap-4">
          {visible.map((c) => (
            <article key={c.id} className="bg-surface border border-line rounded-2xl p-4 md:p-5 flex flex-col gap-3 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all animate-fadeIn">
              <div className="flex items-start justify-between gap-3 flex-wrap">
                <div>
                  <span className="font-display text-[11.5px] md:text-xs text-muted font-medium tracking-wider uppercase">Filial {c.number}</span>
                  <h3 className="font-display font-normal text-[18px] md:text-[22px] text-ink leading-tight tracking-tight mt-0.5">
                    {c.name} <em className="italic text-brand font-medium font-display not-italic md:italic">· {c.district}</em>
                  </h3>
                </div>
                <span className="text-[10px] md:text-[11px] font-semibold uppercase tracking-wider px-2.5 py-1 bg-accent-soft text-accent rounded-full inline-flex items-center gap-1 shrink-0">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                  {c.status === "open" ? "Ochiq" : "Yopiq"}
                </span>
              </div>

              <div className="flex flex-col gap-1.5 text-[12.5px] md:text-[13.5px] text-ink-soft">
                <div className="flex gap-2 items-start">
                  <MapPin className="w-[14px] md:w-[15px] h-[14px] md:h-[15px] text-muted shrink-0 mt-0.5" />
                  <span>{c.address}</span>
                </div>
                <div className="flex gap-2 items-start">
                  <Clock className="w-[14px] md:w-[15px] h-[14px] md:h-[15px] text-muted shrink-0 mt-0.5" />
                  <span>{c.hours}</span>
                </div>
                <div className="flex gap-2 items-start">
                  <Phone className="w-[14px] md:w-[15px] h-[14px] md:h-[15px] text-muted shrink-0 mt-0.5" />
                  <a href={`tel:${c.phone}`} className="hover:text-brand transition-colors">{c.phone}</a>
                </div>
              </div>

              <div className="hidden md:flex gap-1.5 flex-wrap">
                {c.services.slice(0, 4).map((s) => (
                  <span key={s} className={`text-[10.5px] px-2 py-1 rounded-full font-medium ${filter !== "all" && s.toLowerCase() === filter.toLowerCase() ? "bg-accent text-white" : "bg-brand-soft text-brand"}`} style={filter !== "all" && s.toLowerCase() === filter.toLowerCase() ? { color: "#fff" } : undefined}>{s}</span>
                ))}
                {c.services.length > 4 && (
                  <span className="text-[10.5px] px-2 py-1 bg-bg text-muted rounded-full font-medium">+{c.services.length - 4} ta</span>
                )}
              </div>

              <div className="flex items-center justify-between gap-3 pt-3 border-t border-dashed border-line flex-wrap">
                <div className="flex gap-3 text-[11.5px] md:text-[12.5px] text-muted">
                  <span className="inline-flex items-center gap-1">
                    <Star className="w-3 md:w-[13px] h-3 md:h-[13px] text-warn fill-warn" />
                    <b className="text-ink">{c.rating}</b> · {c.reviews}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <MapPin className="w-3 md:w-[13px] h-3 md:h-[13px]" /> <b className="text-ink">{c.distance}</b>
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-3 md:grid-cols-3 gap-1.5 md:gap-2">
                <a href={`tel:${c.phone}`} className="hidden md:inline-flex btn btn-outline btn-sm justify-center text-[11.5px]" aria-label="Qo'ng'iroq">
                  <Phone className="w-3.5 h-3.5" />
                  <span>Qo&apos;ng&apos;iroq</span>
                </a>
                <a href={`https://maps.google.com/?q=${encodeURIComponent(c.address)}`} target="_blank" rel="noopener" className="hidden md:inline-flex btn btn-outline btn-sm justify-center text-[11.5px]">
                  <Navigation className="w-3.5 h-3.5" />
                  Yo&apos;nalish
                </a>
                <Link href={`/booking?clinic=${c.id}`} className="col-span-3 md:col-span-1 btn btn-primary btn-sm justify-center text-[11.5px] md:text-[12.5px]">
                  Qabulga yozilish
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
