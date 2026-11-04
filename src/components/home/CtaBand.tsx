import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function CtaBand() {
  return (
    <section className="scroll-reveal pt-12 pb-20 md:pb-28">
      <div className="container-wide">
        <div className="rounded-[28px] p-10 md:p-16 lg:p-20 text-white relative overflow-hidden grid md:grid-cols-[1.4fr_auto] gap-8 items-center" style={{ background: "linear-gradient(135deg, var(--brand-ink) 0%, var(--brand) 100%)", color: "#fff" }}>
          <div className="absolute bottom-[-120px] right-[-120px] w-[500px] h-[500px] rounded-full" style={{ background: "radial-gradient(closest-side, rgba(255,255,255,.1), transparent 70%)" }} />
          <div className="absolute top-[-60px] left-[-60px] w-[220px] h-[220px] rounded-full" style={{ background: "radial-gradient(closest-side, rgba(255,255,255,.08), transparent 70%)" }} />
          {/* Signature line */}
          <div className="absolute top-0 left-0 h-px w-32 bg-[#BBD1EC]/50" />
          <div className="relative z-10">
            <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#BBD1EC] mb-5 inline-flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-[#35D59B] shadow-[0_0_10px_#35D59B]" />
              Hoziroq
            </div>
            <h2 className="font-display font-normal leading-[0.98] tracking-[-0.025em] text-balance" style={{ fontSize: "clamp(36px, 5.5vw, 68px)" }}>
              Qabulni <em className="italic text-[#BBD1EC]">bir daqiqada</em> bron qiling.
            </h2>
            <p className="text-[15px] md:text-[17px] text-[#BBD1EC] mt-5 max-w-[52ch] leading-relaxed">
              Shifokor tanlang, bo&apos;sh vaqtni belgilang va SMS tasdiqni kuting. Hamma narsa onlayn, navbatsiz.
            </p>
          </div>
          <div className="flex gap-3 items-center relative z-10 flex-col md:flex-row self-end md:self-center">
            <Link href="/booking" style={{ color: "var(--brand-ink)" }} className="inline-flex items-center gap-2 bg-white hover:bg-[#F0F6FF] !text-brand-ink px-6 py-3.5 rounded-full font-bold text-[14px] transition-colors w-full md:w-auto justify-center">
              Qabulga yozilish
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a href="tel:+998712000000" style={{ color: "#fff", borderColor: "rgba(255,255,255,0.3)" }} className="inline-flex items-center !text-white bg-transparent border px-6 py-3.5 rounded-full font-semibold text-[14px] hover:bg-white/10 w-full md:w-auto justify-center transition-colors">
              +998 71 200 00 00
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
