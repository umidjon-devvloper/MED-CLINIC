import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function CtaBand() {
  return (
    <section className="scroll-reveal pt-8 pb-16 md:pb-24">
      <div className="container-x">
        <div className="rounded-3xl p-8 md:p-14 text-white relative overflow-hidden grid md:grid-cols-[1.3fr_auto] gap-6 items-center" style={{ background: "linear-gradient(135deg, var(--brand-ink) 0%, var(--brand) 100%)" }}>
          <div className="absolute bottom-[-100px] right-[-100px] w-[400px] h-[400px] rounded-full" style={{ background: "radial-gradient(closest-side, rgba(255,255,255,.1), transparent 70%)" }} />
          <div className="absolute top-[-40px] left-[-40px] w-[180px] h-[180px] rounded-full" style={{ background: "radial-gradient(closest-side, rgba(255,255,255,.08), transparent 70%)" }} />
          <div className="relative z-10">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/15 text-[#BBD1EC] text-xs font-semibold uppercase tracking-wider rounded-full mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#35D59B]" />
              Hoziroq
            </span>
            <h2 className="font-display font-normal text-2xl md:text-[46px] mb-3 tracking-tight leading-tight text-balance">
              Qabulni <em className="italic text-[#BBD1EC]">bir daqiqada</em> bron qiling
            </h2>
            <p className="text-sm md:text-base opacity-90 max-w-[55ch]">
              Shifokor tanlang, bo&apos;sh vaqtni belgilang va SMS tasdiqni kuting. Hamma narsa onlayn, navbatsiz.
            </p>
          </div>
          <div className="flex gap-3 items-center relative z-10 flex-col md:flex-row">
            <Link href="/booking" style={{ color: "var(--brand-ink)" }} className="btn btn-lg bg-white hover:bg-[#F0F6FF] border-white w-full md:w-auto justify-center font-semibold">
              Qabulga yozilish
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a href="tel:+998712000000" style={{ color: "#fff", borderColor: "rgba(255,255,255,0.35)" }} className="btn btn-lg !text-white bg-transparent border hover:bg-white/10 w-full md:w-auto justify-center">
              +998 71 200 00 00
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
