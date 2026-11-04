import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { services } from "@/lib/data/services";

const tints: Record<string, { tint: string; from: string; to: string }> = {
  red: { tint: "rgba(214,69,69,0.14)", from: "#F56565", to: "#D64545" },
  purple: { tint: "rgba(159,122,234,0.14)", from: "#B794F4", to: "#805AD5" },
  skyblue: { tint: "rgba(99,179,237,0.14)", from: "#63B3ED", to: "#3182CE" },
  orange: { tint: "rgba(237,137,54,0.14)", from: "#F6AD55", to: "#DD8A2C" },
  cyan: { tint: "rgba(32,178,170,0.14)", from: "#4FD1C5", to: "#2C9F9F" },
  teal: { tint: "rgba(72,187,120,0.14)", from: "#68D391", to: "#38A169" },
  deepblue: { tint: "rgba(14,63,140,0.14)", from: "#2B6CB0", to: "#0E3F8C" },
  pink: { tint: "rgba(237,100,166,0.14)", from: "#F687B3", to: "#D53F8C" },
};

export function ServicesSection() {
  const topServices = services.slice(0, 8);
  return (
    <section className="scroll-reveal py-20 md:py-28 relative overflow-hidden" style={{ background: "linear-gradient(180deg, var(--surface) 0%, #F3F8FF 100%)", borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)" }}>
      <div className="container-wide">
        {/* Editorial section header — minimal eyebrow + oversize headline */}
        <div className="flex items-end justify-between gap-8 flex-wrap mb-12 md:mb-16">
          <div className="max-w-[640px]">
            <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand mb-5 inline-flex items-center gap-2.5">
              <span className="w-8 h-px bg-brand" />
              Tibbiy xizmatlar
            </div>
            <h2 className="font-display font-normal text-ink leading-[0.98] tracking-[-0.025em]" style={{ fontSize: "clamp(36px, 5.5vw, 68px)" }}>
              Barcha <em className="italic text-brand">yo&apos;nalishlar</em> — bir joyda.
            </h2>
            <p className="text-[15px] md:text-[17px] text-ink-soft mt-5 max-w-[48ch] leading-relaxed">
              Terapiyadan yuqori texnologiyali diagnostikagacha. 60+ tibbiy xizmat professional shifokorlar nazoratida.
            </p>
          </div>
          <Link href="/services" className="group inline-flex items-center gap-2 text-brand hover:text-brand-ink font-semibold text-[14px] border-b-2 border-brand pb-1 transition-colors self-end">
            Barcha xizmatlar
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5">
          {topServices.map((svc) => {
            const t = tints[svc.color];
            return (
              <Link
                key={svc.id}
                href={`/services/${svc.slug}`}
                className="group relative bg-white/95 border border-white/90 rounded-[18px] p-4 md:p-6 flex flex-col gap-2 shadow-[0_2px_4px_rgba(10,31,58,.04),0_10px_24px_rgba(10,31,58,.06)] hover:-translate-y-1 hover:shadow-[0_6px_12px_rgba(10,31,58,.06),0_24px_48px_rgba(10,31,58,.1)] hover:border-brand/30 transition-all overflow-hidden cursor-pointer"
              >
                <div className="absolute -top-[30%] -right-[30%] w-[80%] h-[80%] rounded-full pointer-events-none" style={{ background: `radial-gradient(circle at center, ${t.tint}, transparent 70%)` }} />
                <div className="relative z-10">
                  <div className="w-14 h-14 md:w-[72px] md:h-[72px] grid place-items-center mb-2" style={{ filter: "drop-shadow(0 6px 12px rgba(0,0,0,0.12))" }}>
                    {svc.image ? (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img src={svc.image} alt={svc.name} className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110" />
                    ) : (
                      <span className="text-3xl md:text-4xl">{svc.icon}</span>
                    )}
                  </div>
                  <h3 className="text-[15px] md:text-[17px] font-bold text-ink mt-2 group-hover:text-brand transition-colors">{svc.name}</h3>
                  <p className="text-xs md:text-[13.5px] text-ink-soft leading-relaxed">{svc.description}</p>
                  <div className="flex items-center justify-between pt-3 mt-auto">
                    <div className="text-xs text-muted tabular-nums flex items-baseline gap-1">
                      dan <b className="text-ink text-sm md:text-base font-medium font-display">{svc.priceFrom.toLocaleString("uz-UZ")}</b> so&apos;m
                    </div>
                    <span aria-hidden className="service-arrow w-8 h-8 md:w-9 md:h-9 rounded-full bg-surface border border-line text-brand grid place-items-center group-hover:bg-brand group-hover:border-brand group-hover:translate-x-1 transition-all">
                      <ArrowRight className="w-3.5 h-3.5" strokeWidth={2.5} />
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
