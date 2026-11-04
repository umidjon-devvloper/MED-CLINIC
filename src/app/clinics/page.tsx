import Link from "next/link";
import { ChevronRight, ArrowRight, Building2, Clock3, Star } from "lucide-react";
import { clinics } from "@/lib/data/clinics";
import { ClinicsMap } from "@/components/clinics/ClinicsMap";
import { ClinicsList } from "@/components/clinics/ClinicsList";
import { CountUp } from "@/components/ui/CountUp";

export const metadata = {
  title: "Klinikalar — MED CLINIC",
  description: "6 ta zamonaviy klinika Toshkent bo'ylab. Markaziy, Shimoliy, Janubiy, G'arbiy, Sharqiy va Bolalar klinikalari.",
};

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

        </div>
      </section>

      <section className="pt-4 lg:pt-6 pb-16 lg:pb-20">
        <div className="container-wide grid lg:grid-cols-[1.1fr_1fr] gap-6 lg:gap-8 items-start">
          <div className="lg:sticky lg:top-24">
            <ClinicsMap />
          </div>
          <ClinicsList clinics={clinics} />
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
