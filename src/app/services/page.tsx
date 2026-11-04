import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { ServicesCatalog } from "@/components/services/ServicesCatalog";

export const metadata = {
  title: "Tibbiy xizmatlar — MED CLINIC",
  description: "60+ tibbiy xizmat, 12 ta yo'nalish. Kardiologiyadan laboratoriya tahlillarigacha — professional shifokorlar.",
};

export default function ServicesPage() {
  return (
    <>
      <section className="py-8 md:py-10 bg-surface border-b border-line">
        <div className="container-x">
          <div className="flex items-center gap-2 text-[13px] text-muted mb-3">
            <Link href="/" className="hover:text-brand">Bosh sahifa</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-ink font-medium">Xizmatlar</span>
          </div>
          <div className="flex items-end justify-between gap-6 flex-wrap">
            <div>
              <h1 className="font-display font-normal text-3xl md:text-[48px] tracking-tight leading-tight text-ink">
                Tibbiy <em className="italic text-brand">xizmatlar</em>
              </h1>
              <p className="text-sm text-muted mt-2">
                Topildi: <b className="text-ink font-semibold tabular-nums">60+ xizmat</b> · 12 ta toifada
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[13px] text-muted">Saralash:</span>
              <select className="font-medium text-[13.5px] text-ink bg-surface border border-line-strong rounded-[10px] px-4 py-2.5 cursor-pointer outline-none appearance-none pr-9" style={{ backgroundImage: "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%234A6684' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'><polyline points='6 9 12 15 18 9'/></svg>\")", backgroundRepeat: "no-repeat", backgroundPosition: "right 0.75rem center" }}>
                <option>Mashhurligi bo&apos;yicha</option>
                <option>Narx bo&apos;yicha (arzondan)</option>
                <option>Narx bo&apos;yicha (qimmatdan)</option>
                <option>Alifbo bo&apos;yicha</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      <section className="py-8 md:py-10">
        <div className="container-x">
          <ServicesCatalog />
        </div>
      </section>

      <section className="pb-16 md:pb-20">
        <div className="container-x">
          <div className="rounded-3xl p-8 md:p-14 text-white relative overflow-hidden grid md:grid-cols-[1.3fr_auto] gap-6 items-center" style={{ background: "linear-gradient(135deg, var(--brand-ink) 0%, var(--brand) 100%)" }}>
            <div className="absolute bottom-[-100px] right-[-100px] w-[400px] h-[400px] rounded-full" style={{ background: "radial-gradient(closest-side, rgba(255,255,255,.1), transparent 70%)" }} />
            <div className="relative z-10">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/15 text-[#BBD1EC] text-xs font-semibold uppercase tracking-wider rounded-full mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-[#35D59B]" />
                Online qabul
              </span>
              <h2 className="font-display font-normal text-2xl md:text-4xl mb-3 tracking-tight leading-tight">
                Qulay xizmatni <em className="italic text-[#BBD1EC]">tanlang</em> va darhol yoziling
              </h2>
              <p className="text-sm md:text-base opacity-90 max-w-[55ch]">
                Narx va vaqtni oldindan ko&apos;ring, kutish navbatini yo&apos;qoting.
              </p>
            </div>
            <Link href="/booking" className="btn btn-lg bg-white text-brand-ink hover:bg-[#F0F6FF] border-white relative z-10">Qabulga yozilish</Link>
          </div>
        </div>
      </section>
    </>
  );
}
