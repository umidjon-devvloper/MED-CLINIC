import Link from "next/link";
import { ChevronRight, MapPin, Clock, Phone, Star, Navigation, ArrowRight } from "lucide-react";
import { clinics } from "@/lib/data/clinics";
import { ClinicsMap } from "@/components/clinics/ClinicsMap";
import { MotionGrid, MotionItem } from "@/components/ui/motion";

export const metadata = {
  title: "Klinikalar — MED CLINIC",
  description: "6 ta zamonaviy klinika Toshkent bo'ylab. Markaziy, Shimoliy, Janubiy, G'arbiy, Sharqiy va Bolalar klinikalari.",
};

const quickFilters = ["24 soat", "Pediatriya", "Kardiologiya", "MRT", "Laboratoriya"];

export default function ClinicsPage() {
  return (
    <>
      <section className="py-6 md:py-10 bg-surface border-b border-line">
        <div className="container-x">
          <div className="flex items-center gap-2 text-[13px] text-muted mb-3">
            <Link href="/" className="hover:text-brand">Bosh sahifa</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-ink font-medium">Klinikalar</span>
          </div>
          <div className="flex items-end justify-between gap-6 flex-wrap">
            <div>
              <h1 className="font-display font-normal text-3xl md:text-5xl tracking-tight leading-tight text-ink text-balance">
                6 ta klinika — <em className="italic text-brand">bir xil standart</em>
              </h1>
              <p className="text-sm md:text-base text-ink-soft mt-3 max-w-[52ch]">
                Toshkent bo&apos;ylab zamonaviy filiallar. Eng yaqinini xaritadan topib qabulga yoziling.
              </p>
            </div>
          </div>
          <div className="flex gap-2 mt-5 flex-wrap">
            {quickFilters.map((f, i) => (
              <button key={f} className={`px-3.5 py-2 rounded-full text-[12.5px] font-medium border transition-colors ${i === 0 ? "bg-brand text-white border-brand" : "bg-surface text-ink-soft border-line hover:border-brand hover:text-brand"}`}>
                {f}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-8 md:py-10">
        <div className="container-x grid lg:grid-cols-[1.1fr_1fr] gap-6 lg:gap-8 items-start">
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

      <section className="py-8 md:py-12">
        <div className="container-x">
          <div className="bg-surface border border-line rounded-2xl p-5 md:p-8 grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-6">
            {[
              { num: "6", unit: " ta", label: "Filial Toshkent bo'ylab" },
              { num: "24/7", unit: "", label: "Shoshilinch yordam" },
              { num: "140", unit: "+", label: "Shifokorlar" },
              { num: "4.9", unit: "", label: "O'rtacha reyting" },
            ].map((s, i) => (
              <div key={i} className="flex flex-col gap-1">
                <div className="font-display font-medium text-2xl md:text-[32px] text-ink tracking-tight leading-none">
                  {s.num}{s.unit && <em className="italic text-brand text-base md:text-xl">{s.unit}</em>}
                </div>
                <div className="text-[10.5px] md:text-[12px] text-muted uppercase tracking-wider font-semibold">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-16 md:pb-24">
        <div className="container-x">
          <div className="rounded-3xl p-6 md:p-14 text-white relative overflow-hidden grid md:grid-cols-[1.3fr_auto] gap-6 items-center" style={{ background: "linear-gradient(135deg, var(--brand-ink) 0%, var(--brand) 100%)" }}>
            <div className="absolute bottom-[-100px] right-[-100px] w-[400px] h-[400px] rounded-full" style={{ background: "radial-gradient(closest-side, rgba(255,255,255,.1), transparent 70%)" }} />
            <div className="relative z-10">
              <h2 className="font-display font-normal text-2xl md:text-4xl mb-3 tracking-tight leading-tight">
                Hamkor <em className="italic text-[#BBD1EC]">klinikasiz</em>mi?
              </h2>
              <p className="text-sm md:text-base opacity-90 max-w-[55ch]">Platformamizga qo&apos;shiling va mijozlar oqimini oshiring.</p>
            </div>
            <div className="flex gap-3 relative z-10 flex-wrap">
              <Link href="/contact" className="btn btn-lg bg-white text-brand-ink">Bog&apos;lanish</Link>
              <a href="tel:+998712000000" className="btn btn-lg btn-ghost text-white border border-white/30">+998 71 200 00 00</a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
