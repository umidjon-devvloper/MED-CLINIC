"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Search, MapPin, ArrowUpRight, ChevronDown, Check, Shield, Zap, Clock3 } from "lucide-react";
import { CountUp } from "@/components/ui/CountUp";

const cities = [
  "Toshkent", "Samarqand", "Buxoro", "Andijon", "Namangan", "Farg'ona",
  "Qarshi", "Nukus", "Urganch", "Jizzax", "Guliston", "Navoiy", "Termiz",
];

export function Hero() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [city, setCity] = useState("Toshkent");
  const [cityOpen, setCityOpen] = useState(false);
  const cityRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (cityRef.current && !cityRef.current.contains(e.target as Node)) setCityOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  const onSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (query.trim()) params.set("q", query.trim());
    if (city) params.set("city", city);
    router.push(`/doctors?${params.toString()}`);
  };

  return (
    <section className="relative isolate overflow-hidden" style={{ background: "linear-gradient(180deg, #F5F8FD 0%, #EEF3FB 100%)" }}>
      {/* Photo on the right — full-height, fully visible, seamless fade */}
      <div className="absolute inset-0 -z-10">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/hero/doctor.webp" alt="" className="absolute right-0 top-0 h-full w-[65%] object-cover object-top" style={{ objectPosition: "55% 10%" }} />
        {/* Very long, gentle left-to-right fade — eliminates any visible seam */}
        <div className="absolute inset-0" style={{ background: "linear-gradient(90deg, #F5F8FD 0%, #F5F8FD 25%, rgba(245,248,253,0.98) 35%, rgba(245,248,253,0.9) 45%, rgba(245,248,253,0.7) 55%, rgba(245,248,253,0.4) 65%, rgba(245,248,253,0.15) 75%, transparent 90%)" }} />
        {/* Top-to-bottom gentle dim so the image never feels like a sticker */}
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(245,248,253,0.2) 0%, transparent 25%, transparent 75%, rgba(245,248,253,0.35) 100%)" }} />
        {/* Soft accent glow */}
        <div className="absolute top-[8%] right-[4%] w-[640px] h-[640px] rounded-full blur-[80px] opacity-35" style={{ background: "radial-gradient(closest-side, rgba(77,148,245,0.4), transparent 70%)" }} />
      </div>

      <div className="container-wide pt-16 md:pt-24 pb-20 md:pb-28 relative">
        {/* Mega headline — editorial, no eyebrow marker */}
        <div className="max-w-[760px]">
          <h1 className="font-display font-normal text-ink leading-[0.95] tracking-[-0.03em]" style={{ fontSize: "clamp(42px, 7vw, 92px)" }}>
            <span className="anim-fade-up">Sog&apos;lig&apos;ingiz —</span>{" "}
            <em className="italic anim-fade-up delay-100 text-brand">bizning ustuvor vazifamiz.</em>
          </h1>
          <p className="anim-fade-up delay-200 text-ink-soft text-base md:text-[18px] leading-relaxed mt-7 max-w-[52ch]">
            140 sertifikatlangan shifokor, 6 ta klinika, 60+ xizmat. Qidirish, tanlash, qabulga yozilish — yagona oyna.
          </p>
        </div>

        {/* Search + CTA — unified bar */}
        <form onSubmit={onSearch} className="anim-fade-up delay-400 mt-10 bg-surface border border-line rounded-2xl p-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-2 max-w-[640px] shadow-[0_8px_24px_rgba(10,31,58,0.06)]">
          <div className="flex items-center gap-2.5 pl-3 flex-1 min-w-0">
            <Search className="w-[17px] h-[17px] text-muted shrink-0" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Shifokor, kasallik yoki xizmat..."
              className="bg-transparent border-0 outline-none text-sm text-ink flex-1 min-w-0 placeholder:text-muted py-3"
            />
          </div>
          <div className="hidden sm:block w-px h-6 bg-line" />
          <div ref={cityRef} className="relative">
            <button
              type="button"
              onClick={() => setCityOpen((v) => !v)}
              className="inline-flex items-center gap-1.5 text-[13px] font-medium px-3 py-3 text-ink-soft hover:text-brand transition-colors w-full sm:w-auto"
            >
              <MapPin className="w-4 h-4 text-brand" />
              <span className="font-semibold text-ink">{city}</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${cityOpen ? "rotate-180" : ""}`} />
            </button>
            {cityOpen && (
              <div className="absolute right-0 bottom-full mb-3 w-[220px] bg-surface border border-line rounded-xl shadow-[0_12px_32px_rgba(10,31,58,0.15)] py-2 z-50 max-h-[260px] overflow-y-auto">
                <div className="px-4 pb-2 pt-1 text-[10.5px] font-bold text-muted uppercase tracking-wider border-b border-line mb-1">Shaharni tanlang</div>
                {cities.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => { setCity(c); setCityOpen(false); }}
                    className={`w-full text-left px-4 py-2 text-sm flex items-center justify-between transition-colors ${c === city ? "text-brand font-semibold bg-brand-soft/50" : "text-ink hover:bg-brand-soft"}`}
                  >
                    {c}
                    {c === city && <Check className="w-4 h-4" />}
                  </button>
                ))}
              </div>
            )}
          </div>
          <button type="submit" style={{ color: "#fff" }} className="bg-brand hover:bg-brand-ink !text-white rounded-xl px-5 py-3 text-sm font-bold inline-flex items-center justify-center gap-1.5 transition-colors whitespace-nowrap">
            Topish
            <ArrowUpRight className="w-4 h-4" strokeWidth={2.5} />
          </button>
        </form>

        <div className="anim-fade-up delay-500 mt-6 flex gap-4 flex-wrap items-center">
          <Link href="/booking" style={{ color: "#fff" }} className="inline-flex items-center gap-2 bg-brand hover:bg-brand-ink !text-white px-6 py-3.5 rounded-full font-bold text-[14px] transition-colors shadow-[0_8px_20px_rgba(30,109,216,0.25)]">
            Qabulga yozilish
            <ArrowUpRight className="w-4 h-4" strokeWidth={2.5} />
          </Link>
          <Link href="/doctors" className="inline-flex items-center gap-1.5 text-ink-soft hover:text-brand px-4 py-3 text-[14px] font-semibold border-b border-transparent hover:border-brand transition-colors">
            Yoki shifokor kataloginy ko&apos;ring
          </Link>
        </div>

        {/* Guarantee strip — editorial stats */}
        <div className="anim-fade-up delay-600 mt-14 md:mt-20 pt-10 border-t border-line grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-8">
          {[
            { num: 140, em: "+",   duration: 1.8, label: "Sertifikatlangan shifokor", icon: Shield,  hint: "Sog'liqni saqlash vazirligi" },
            { num: 6,   em: "",    duration: 1.2, label: "Zamonaviy klinika",         icon: MapPin,  hint: "Toshkent bo'ylab" },
            { num: 2,   em: "min", duration: 1.0, label: "Qabulga yozilish",          icon: Zap,     hint: "O'rtacha vaqt" },
            { num: 24,  em: "/7",  duration: 1.4, label: "Shoshilinch yordam",        icon: Clock3,  hint: "Har kun, kechayu kunduz" },
          ].map((cell, i) => (
            <div key={i}>
              <div className="flex items-baseline gap-1 font-display font-medium text-ink leading-none tracking-tight tabular-nums" style={{ fontSize: "clamp(42px, 5vw, 60px)" }}>
                <CountUp to={cell.num} duration={cell.duration} />
                <em className="italic text-brand text-[0.6em] font-normal">{cell.em}</em>
              </div>
              <div className="mt-3 flex items-center gap-2 text-[12.5px] uppercase tracking-wider text-ink-soft font-semibold">
                <cell.icon className="w-3.5 h-3.5 text-brand" />
                {cell.label}
              </div>
              <div className="text-[11.5px] text-muted mt-1">{cell.hint}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
