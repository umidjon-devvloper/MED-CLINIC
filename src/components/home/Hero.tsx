"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Search, MapPin, ArrowRight, ChevronDown, Check } from "lucide-react";

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
    const onDocClick = (e: MouseEvent) => {
      if (cityRef.current && !cityRef.current.contains(e.target as Node)) setCityOpen(false);
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  const onSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const q = query.trim();
    const params = new URLSearchParams();
    if (q) params.set("q", q);
    if (city) params.set("city", city);
    router.push(`/doctors?${params.toString()}`);
  };
  return (
    <section className="relative overflow-hidden pt-24 pb-20 md:pt-32 md:pb-28 min-h-[680px] md:min-h-[760px] flex items-center">
      <div className="absolute inset-0 -z-10">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/hero/doctor.webp" alt="" className="w-full h-full object-cover" style={{ objectPosition: "60% 5%" }} />
        {/* Left-side fade for text readability */}
        <div className="absolute inset-0" style={{ background: "linear-gradient(100deg, rgba(251,252,253,0.98) 0%, rgba(251,252,253,0.92) 25%, rgba(251,252,253,0.55) 42%, rgba(251,252,253,0.1) 58%, transparent 72%)" }} />
        {/* Right-side soft fade to avoid harsh edge */}
        <div className="absolute inset-y-0 right-0 w-[25%]" style={{ background: "linear-gradient(270deg, rgba(227,238,255,0.85) 0%, rgba(227,238,255,0.3) 50%, transparent 100%)" }} />
      </div>
      <div className="absolute top-1/4 right-[8%] w-[520px] h-[520px] rounded-full blur-[40px] -z-10 pointer-events-none anim-glow-pulse" style={{ background: "radial-gradient(closest-side, rgba(77,148,245,0.3), transparent 70%)" }} />
      <div className="container-x grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <span className="anim-fade-up inline-flex items-center gap-2 px-3 py-1.5 bg-brand-soft text-brand text-xs font-semibold uppercase tracking-wider rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-brand anim-pulse-ring" />
            24 soat ichida tasdiqlash
          </span>
          <h1 className="anim-fade-up delay-100 font-display font-normal text-[42px] md:text-[64px] leading-[1.0] tracking-tight my-5 text-balance text-ink">
            Sog&apos;lig&apos;ingiz — <em className="italic text-brand">bizning ustuvor vazifamiz</em>
          </h1>
          <p className="anim-fade-up delay-200 text-base md:text-[17.5px] text-ink-soft max-w-[46ch] mb-7 leading-relaxed">
            140+ sertifikatlangan shifokor, 6 ta zamonaviy klinika va 60+ tibbiy xizmat
            bir platformada. Shifokoringizni tanlang va onlayn qabulga yozilib qo&apos;ying —
            jarayon atigi 2 daqiqa.
          </p>
          <div className="anim-fade-up delay-300 flex gap-3 mb-8 flex-wrap">
            <Link href="/doctors" className="btn btn-primary btn-lg hover:-translate-y-0.5 hover:shadow-[0_12px_24px_rgba(30,109,216,0.3)] transition-all">
              Shifokor tanlash
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/booking" className="btn btn-outline btn-lg hover:-translate-y-0.5 transition-transform">Qabulga yozilish</Link>
          </div>

          <form onSubmit={onSearch} className="anim-fade-up delay-400 bg-surface border border-line rounded-2xl p-2.5 flex items-center gap-2 shadow-md max-w-[500px] relative">
            <div className="flex-1 flex items-center gap-2 px-3 py-1.5 min-w-0">
              <Search className="w-[17px] h-[17px] text-muted shrink-0" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Shifokor yoki xizmat qidirish..."
                className="border-0 outline-none bg-transparent text-sm text-ink flex-1 min-w-0 placeholder:text-muted"
              />
            </div>
            <div className="hidden sm:block w-px h-[22px] bg-line" />
            <div ref={cityRef} className="hidden sm:block relative">
              <button
                type="button"
                onClick={() => setCityOpen((v) => !v)}
                className="inline-flex items-center gap-1.5 text-[13.5px] text-ink-soft hover:text-brand px-2 py-1.5 rounded-md transition-colors"
                aria-label="Shahar tanlash"
                aria-expanded={cityOpen}
              >
                <MapPin className="w-4 h-4 text-muted" />
                <span className="font-medium text-ink">{city}</span>
                <ChevronDown className={`w-3.5 h-3.5 text-muted transition-transform ${cityOpen ? "rotate-180" : ""}`} />
              </button>
              {cityOpen && (
                <div className="absolute bottom-full right-0 mb-3 w-[220px] bg-surface border border-line rounded-xl shadow-[0_12px_32px_rgba(10,31,58,0.15)] py-2 z-50 max-h-[280px] overflow-y-auto">
                  <div className="px-4 pb-2 pt-1 text-[10.5px] font-bold text-muted uppercase tracking-wider border-b border-line mb-1">
                    Shaharni tanlang
                  </div>
                  {cities.map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => { setCity(c); setCityOpen(false); }}
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-brand-soft transition-colors flex items-center justify-between ${c === city ? "text-brand font-semibold bg-brand-soft/50" : "text-ink"}`}
                    >
                      {c}
                      {c === city && <Check className="w-4 h-4" />}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <button type="submit" style={{ color: "#fff" }} className="bg-brand hover:bg-brand-ink !text-white rounded-lg p-2.5 transition-colors" aria-label="Qidirish">
              <Search className="w-4 h-4" strokeWidth={2.5} />
            </button>
          </form>

          <div className="anim-fade-up delay-500 mt-11 grid grid-cols-2 md:grid-cols-4 gap-6 pt-7 border-t border-line">
            {[
              { num: "140+", label: "Sertifikatlangan shifokor" },
              { num: "60+", label: "Tibbiy xizmat" },
              { num: "24/7", label: "Shoshilinch yordam" },
              { num: "4.9", label: "O'rtacha reyting" },
            ].map((cell, i) => (
              <div key={i} className="anim-fade-up" style={{ animationDelay: `${0.5 + i * 0.1}s` }}>
                <div className="font-display font-medium text-[32px] md:text-[36px] text-ink tracking-tight leading-none">
                  {cell.num.includes("+") ? (
                    <>
                      {cell.num.replace("+", "")}
                      <em className="italic text-brand">+</em>
                    </>
                  ) : cell.num}
                </div>
                <div className="text-xs md:text-[12.5px] text-muted mt-1">{cell.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right side: floating cards on top of doctor background */}
        <div className="relative h-[500px] hidden lg:block">
          <div className="anim-scale-in delay-500 anim-float absolute top-9 right-[-28px] bg-surface border border-line rounded-2xl shadow-lg flex items-center gap-3 px-5 py-4 min-w-[240px] z-10">
            <div className="w-11 h-11 rounded-xl bg-accent-soft text-accent grid place-items-center shrink-0">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /><path d="m9 16 2 2 4-4" /></svg>
            </div>
            <div>
              <div className="text-[10.5px] text-muted uppercase tracking-wider mb-0.5 font-semibold">Qabul tasdiqlandi</div>
              <div className="font-semibold text-[13.5px] text-ink">Juma, 7-noyabr · 14:30</div>
            </div>
          </div>

          <div className="anim-scale-in delay-600 anim-float-slow absolute top-1/2 left-[-14px] w-[60px] h-[60px] rounded-full grid place-items-center z-10 shadow-lg bg-gradient-to-br from-surface to-brand-soft border border-brand-soft">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7 text-brand"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></svg>
          </div>

          <div className="anim-scale-in delay-700 anim-float absolute bottom-8 right-[-24px] bg-surface border border-line rounded-2xl shadow-lg flex items-center gap-3 px-4 py-3 z-10" style={{ animationDelay: "0.7s, 2s" }}>
            <div className="flex">
              <span className="w-8 h-8 rounded-full border-[2.5px] border-surface" style={{ background: "linear-gradient(135deg, #4D94F5, #1E6DD8)" }} />
              <span className="w-8 h-8 rounded-full border-[2.5px] border-surface -ml-2" style={{ background: "linear-gradient(135deg, #35D59B, #0E8F5B)" }} />
              <span className="w-8 h-8 rounded-full border-[2.5px] border-surface -ml-2" style={{ background: "linear-gradient(135deg, #E89C32, #B8731A)" }} />
            </div>
            <div className="ml-2">
              <div className="font-bold text-[15px] text-ink">4.9 / 5.0</div>
              <div className="text-[11.5px] text-muted mt-0.5">12 840+ bemor sharhi</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
