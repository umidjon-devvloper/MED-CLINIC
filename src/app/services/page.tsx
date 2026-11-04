import Link from "next/link";
import { ChevronRight, Layers, Microscope, Clock3 } from "lucide-react";
import { ServicesCatalog } from "@/components/services/ServicesCatalog";
import { CountUp } from "@/components/ui/CountUp";

export const metadata = {
  title: "Tibbiy xizmatlar — MED CLINIC",
  description: "60+ tibbiy xizmat, 12 ta yo'nalish. Kardiologiyadan laboratoriya tahlillarigacha — professional shifokorlar.",
};

export default function ServicesPage() {
  return (
    <>
      {/* PAGE HEAD — editorial, matches /doctors style */}
      <section className="relative overflow-hidden pt-16 md:pt-20 pb-16 md:pb-20" style={{ background: "linear-gradient(180deg, #F5F8FD 0%, #EEF3FB 60%, var(--bg) 100%)" }}>
        <div className="absolute top-[15%] right-[8%] w-[480px] h-[480px] rounded-full blur-[80px] opacity-30 pointer-events-none" style={{ background: "radial-gradient(closest-side, rgba(77,148,245,0.35), transparent 70%)" }} />

        <div className="container-wide relative">
          <div className="flex items-center gap-2 text-[12.5px] text-muted mb-8">
            <Link href="/" className="hover:text-brand">Bosh sahifa</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-ink font-medium">Xizmatlar</span>
          </div>

          <div className="grid lg:grid-cols-[1fr_auto] gap-10 lg:gap-16 items-end">
            <div className="max-w-[820px]">
              <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand mb-5 inline-flex items-center gap-2.5">
                <span className="w-8 h-px bg-brand" />
                Tibbiy katalog · 2026
              </div>
              <h1 className="font-display font-normal text-ink leading-[0.98] tracking-[-0.025em]" style={{ fontSize: "clamp(42px, 7vw, 84px)" }}>
                Kerakli <em className="italic text-brand">xizmatni</em> toping.
              </h1>
              <p className="text-[15px] md:text-[17px] text-ink-soft mt-6 max-w-[56ch] leading-relaxed">
                60+ tibbiy xizmat, 12 yo&apos;nalish. Kardiologiyadan laboratoriya tahlillari va MRT'gacha —
                har bir xizmat professional shifokorlar nazoratida.
              </p>
            </div>

            <div className="grid grid-cols-3 lg:flex lg:flex-col gap-6 lg:gap-5 lg:min-w-[220px] lg:border-l lg:border-line lg:pl-10">
              {[
                { icon: Layers,     num: 60, suffix: "+", l: "Xizmat" },
                { icon: Microscope, num: 12, suffix: "",  l: "Yo'nalish" },
                { icon: Clock3,     num: 24, suffix: "h", l: "Natija" },
              ].map((c, i) => (
                <div key={i} className="flex flex-col gap-1">
                  <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-wider text-muted font-bold">
                    <c.icon className="w-3.5 h-3.5 text-brand" />
                    {c.l}
                  </div>
                  <div className="font-display font-medium text-ink tabular-nums leading-none tracking-tight inline-flex items-baseline" style={{ fontSize: "clamp(28px, 3vw, 38px)" }}>
                    <CountUp to={c.num} />
                    <em className="italic text-brand text-[0.65em] font-normal not-italic">{c.suffix}</em>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Catalog */}
      <section className="pt-4 lg:pt-6 pb-20 lg:pb-28">
        <div className="container-wide">
          <ServicesCatalog />
        </div>
      </section>
    </>
  );
}
