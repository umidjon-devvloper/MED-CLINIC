import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import type { Service } from "@/lib/types";

const tints: Record<string, string> = {
  red: "rgba(214,69,69,0.14)",
  purple: "rgba(159,122,234,0.14)",
  skyblue: "rgba(99,179,237,0.14)",
  orange: "rgba(237,137,54,0.14)",
  cyan: "rgba(32,178,170,0.14)",
  teal: "rgba(72,187,120,0.14)",
  deepblue: "rgba(14,63,140,0.14)",
  pink: "rgba(237,100,166,0.14)",
};

export function ServiceCard({ svc }: { svc: Service }) {
  return (
    <article className="relative bg-surface border border-line rounded-[18px] p-4 md:p-5 flex flex-col gap-2 shadow-[0_2px_4px_rgba(10,31,58,.04),0_10px_24px_rgba(10,31,58,.06)] hover:-translate-y-1 hover:shadow-[0_6px_12px_rgba(10,31,58,.06),0_24px_48px_rgba(10,31,58,.1)] transition-all overflow-hidden">
      <div
        className="absolute -top-[30%] -right-[30%] w-[80%] h-[80%] rounded-full pointer-events-none"
        style={{ background: `radial-gradient(circle at center, ${tints[svc.color]}, transparent 70%)` }}
      />
      <div className="relative z-10 flex flex-col h-full gap-2">
        <div className="w-14 h-14 md:w-[72px] md:h-[72px] grid place-items-center mb-1" style={{ filter: "drop-shadow(0 6px 12px rgba(0,0,0,0.12))" }}>
          {svc.image ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img src={svc.image} alt={svc.name} className="w-full h-full object-contain" />
          ) : (
            <span className="text-4xl md:text-[48px]">{svc.icon}</span>
          )}
        </div>
        <span className="text-[10px] md:text-[11px] text-brand font-bold uppercase tracking-wider">{svc.category}</span>
        <h3 className="text-[15px] md:text-[17px] font-bold text-ink tracking-tight leading-tight">{svc.name}</h3>
        <p className="text-xs md:text-[13px] text-ink-soft leading-relaxed line-clamp-2">{svc.description}</p>
        <div className="flex items-center justify-between pt-3 mt-auto border-t border-line/60 flex-wrap gap-2">
          <div className="flex items-center gap-3 text-[11px] md:text-[12px] text-muted">
            <span className="inline-flex items-center gap-1">
              <Clock className="w-3 h-3 md:w-3.5 md:h-3.5" />
              {svc.duration} daq
            </span>
          </div>
          <div className="text-[11px] text-muted tabular-nums flex items-baseline gap-1">
            dan <b className="text-ink text-sm md:text-[16px] font-medium font-display">{svc.priceFrom.toLocaleString("uz-UZ")}</b> so&apos;m
          </div>
        </div>
        <Link
          href={`/booking?service=${svc.slug}`}
          style={{ color: "#fff" }}
          className="mt-2 inline-flex items-center justify-center gap-1.5 w-full py-2 md:py-2.5 bg-brand hover:bg-brand-ink !text-white rounded-lg text-xs md:text-[13px] font-semibold transition-colors"
        >
          Qabul olish
          <ArrowRight className="w-3 h-3 md:w-3.5 md:h-3.5" />
        </Link>
      </div>
    </article>
  );
}
