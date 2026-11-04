import Link from "next/link";
import { ArrowRight, MapPin, Clock, Phone } from "lucide-react";
import { clinics } from "@/lib/data/clinics";

export function ClinicsSection() {
  const topClinics = clinics.slice(0, 3);
  return (
    <section className="scroll-reveal py-16 md:py-20">
      <div className="container-x">
        <div className="flex justify-between items-end gap-6 mb-10 md:mb-12 flex-wrap">
          <div>
            <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-brand-soft text-brand text-xs font-semibold uppercase tracking-wider rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-brand" />
              Klinikalar
            </span>
            <h2 className="font-display font-normal text-2xl md:text-[46px] mt-4 tracking-tight text-ink">
              Shahar bo&apos;ylab <em className="italic text-brand">6 ta filial</em>
            </h2>
            <p className="text-sm md:text-base text-ink-soft mt-3 max-w-[44ch]">
              O&apos;zingizga qulay joydagi klinikani tanlang. Barcha filiallar bir xil standartda.
            </p>
          </div>
          <Link href="/clinics" className="text-brand font-semibold text-sm inline-flex items-center gap-1 border-b border-brand pb-1">
            Xaritada ko&apos;rish
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-5">
          {topClinics.map((c) => (
            <article key={c.id} className="bg-surface border border-line rounded-2xl p-4 md:p-7 flex flex-col gap-3 md:gap-4">
              <div className="flex justify-between items-start gap-3 flex-col sm:flex-row">
                <span className="font-display text-[11.5px] md:text-sm text-muted font-medium tracking-wider">Filial {c.number}</span>
                <span className="text-[9.5px] md:text-[11px] font-semibold uppercase tracking-wider px-2.5 py-1 bg-accent-soft text-accent rounded-full inline-flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                  Ochiq
                </span>
              </div>
              <h3 className="font-display font-normal text-base md:text-[22px] text-ink leading-tight tracking-tight">
                {c.name}
              </h3>
              <div className="flex items-start gap-2 text-xs md:text-[13.5px] text-ink-soft">
                <MapPin className="w-3 md:w-[15px] h-3 md:h-[15px] text-muted shrink-0 mt-0.5" />
                {c.address}
              </div>
              <div className="flex items-start gap-2 text-xs md:text-[13.5px] text-ink-soft">
                <Clock className="w-3 md:w-[15px] h-3 md:h-[15px] text-muted shrink-0 mt-0.5" />
                {c.hours}
              </div>
              <div className="flex gap-1.5 md:gap-2 mt-auto pt-2 md:pt-3 border-t border-line flex-col sm:flex-row">
                <a href={`tel:${c.phone}`} className="btn btn-outline btn-sm justify-center flex-1">
                  <Phone className="w-3 md:w-3.5 h-3 md:h-3.5" />
                  <span className="hidden sm:inline">Qo&apos;ng&apos;iroq</span>
                </a>
                <Link href={`/booking?clinic=${c.id}`} className="btn btn-primary btn-sm justify-center flex-1">
                  Qabulga yozilish
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
