import Link from "next/link";
import { ChevronRight, MapPin, Clock, Phone, Star, Navigation, ArrowRight, Building2, Clock3 } from "lucide-react";
import { clinics } from "@/lib/data/clinics";
import { ClinicsMap } from "@/components/clinics/ClinicsMap";
import { MotionGrid, MotionItem } from "@/components/ui/motion";
import { CountUp } from "@/components/ui/CountUp";

export const metadata = {
  title: "Klinikalar — MED CLINIC",
  description: "6 ta zamonaviy klinika Toshkent bo'ylab. Markaziy, Shimoliy, Janubiy, G'arbiy, Sharqiy va Bolalar klinikalari.",
};

const quickFilters = ["24 soat", "Pediatriya", "Kardiologiya", "MRT", "Laboratoriya"];

export default function ClinicsPage() {
  return (
    <>
      <section className="relative overflow-hidden pt-16 md:pt-20 pb-16 md:pb-20" style={{ background: "linear-gradient(180deg, #F5F8FD 0%, #EEF3FB 60%, var(--bg) 100%)" }}>
        <div className="absolute top-[15%] right-[8%] w-[480px] h-[480px] rounded-full blur-[80px] opacity-30 pointer-events-none" style={{ background: "radial-gradient(closest-side, rgba(77,148,245,0.35), transparent 70%)" }} />

        <div className="container-wide relative">
          <div className="flex items-center gap-2 text-[12.5px] text-muted mb-8">
            <Link href="/" className="hover:text-brand">Bosh sahifa</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-ink font-medium">Klinikalar</span>
          </div>

          <div className="grid lg:grid-cols-[1fr_auto] gap-10 lg:gap-16 items-end">
            <div className="max-w-[820px]">
              <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand mb-5 inline-flex items-center gap-2.5">
                <span className="w-8 h-px bg-brand" />
                Toshkent · 2026
              </div>
              <h1 className="font-display font-normal text-ink leading-[0.98] tracking-[-0.025em]" style={{ fontSize: "clamp(42px, 7vw, 84px)" }}>
                6 ta klinika — <em className="italic text-brand">bir xil standart</em>.
              </h1>
              <p className="text-[15px] md:text-[17px] text-ink-soft mt-6 max-w-[56ch] leading-relaxed">
                Toshkent bo&apos;ylab zamonaviy filiallar. Xaritadan eng yaqinini toping, bo&apos;sh vaqtlarni ko&apos;ring va qabulga yoziling.
              </p>
            </div>

            <div className="grid grid-cols-3 lg:flex lg:flex-col gap-6 lg:gap-5 lg:min-w-[220px] lg:border-l lg:border-line lg:pl-10">
              {[
                { icon: Building2, num: 6,    suffix: "",    l: "Filial",  decimals: 0 },
                { icon: Clock3,    num: 24,   suffix: "/7",  l: "Yordam",  decimals: 0 },
                { icon: Star,      num: 4.9,  suffix: "",    l: "Reyting", decimals: 1 },
              ].map((c, i) => (
                <div key={i} className="flex flex-col gap-1">
                  <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-wider text-muted font-bold">
                    <c.icon className="w-3.5 h-3.5 text-brand" />
                    {c.l}
                  </div>
                  <div className="font-display font-medium text-ink tabular-nums leading-none tracking-tight inline-flex items-baseline" style={{ fontSize: "clamp(28px, 3vw, 38px)" }}>
                    <CountUp to={c.num} decimals={c.decimals} />
                    <em className="italic text-brand text-[0.65em] font-normal not-italic">{c.suffix}</em>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick filters */}
          <div className="flex gap-2 mt-10 flex-wrap">
            {quickFilters.map((f, i) => (
              <button key={f} style={i === 0 ? { color: "#fff" } : undefined} className={`px-3.5 py-2 rounded-full text-[12.5px] font-medium border transition-colors ${i === 0 ? "bg-brand text-white border-brand" : "bg-surface text-ink-soft border-line hover:border-brand hover:text-brand"}`}>
                {f}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="pt-4 lg:pt-6 pb-16 lg:pb-20">
        <div className="container-wide grid lg:grid-cols-[1.1fr_1fr] gap-6 lg:gap-10 items-start">
          <ClinicsMap />

          <MotionGrid className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3 md:gap-4">
            {clinics.map((c) => (
              <MotionItem key={c.id} as="article" className="bg-surface border border-line rounded-2xl p-4 md:p-5 flex flex-col gap-3 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all">
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
                    <span key={s} className="text-[10.5px] px-2 py-1 bg-brand-soft text-brand rounded-full font-medium">{s}</span>
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
              </MotionItem>
            ))}
          </MotionGrid>
        </div>
      </section>

      {/* Partner CTA — editorial */}
      <section className="pb-20 lg:pb-28">
        <div className="container-wide">
          <div className="rounded-[28px] p-10 md:p-16 lg:p-20 text-white relative overflow-hidden grid md:grid-cols-[1.4fr_auto] gap-8 items-center" style={{ background: "linear-gradient(135deg, var(--brand-ink) 0%, var(--brand) 100%)", color: "#fff" }}>
            <div className="absolute bottom-[-120px] right-[-120px] w-[500px] h-[500px] rounded-full" style={{ background: "radial-gradient(closest-side, rgba(255,255,255,.1), transparent 70%)" }} />
            <div className="absolute top-0 left-0 h-px w-32 bg-[#BBD1EC]/50" />
            <div className="relative z-10">
              <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#BBD1EC] mb-5 inline-flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-[#35D59B] shadow-[0_0_10px_#35D59B]" />
                Hamkorlik
              </div>
              <h2 className="font-display font-normal leading-[0.98] tracking-[-0.025em] text-balance" style={{ fontSize: "clamp(36px, 5.5vw, 68px)" }}>
                Hamkor <em className="italic text-[#BBD1EC]">klinikasiz</em>mi?
              </h2>
              <p className="text-[15px] md:text-[17px] text-[#BBD1EC] mt-5 max-w-[52ch] leading-relaxed">
                Platformamizga qo&apos;shiling — bemorlar oqimini oshiring, onlayn booking va to&apos;lov tizimidan foydalaning.
              </p>
            </div>
            <div className="flex gap-3 items-center relative z-10 flex-col md:flex-row self-end md:self-center">
              <Link href="/contact" style={{ color: "var(--brand-ink)" }} className="inline-flex items-center gap-2 bg-white hover:bg-[#F0F6FF] !text-brand-ink px-6 py-3.5 rounded-full font-bold text-[14px] transition-colors w-full md:w-auto justify-center">
                Bog&apos;lanish
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a href="tel:+998712000000" style={{ color: "#fff", borderColor: "rgba(255,255,255,0.3)" }} className="inline-flex items-center !text-white bg-transparent border px-6 py-3.5 rounded-full font-semibold text-[14px] hover:bg-white/10 w-full md:w-auto justify-center transition-colors">
                +998 71 200 00 00
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
