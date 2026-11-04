import Link from "next/link";
import { ChevronRight, Shield, Award, Stethoscope } from "lucide-react";
import { DoctorsCatalog } from "@/components/doctors/DoctorsCatalog";
import { CountUp } from "@/components/ui/CountUp";

export const metadata = {
  title: "Shifokorlar katalogi — MED CLINIC",
  description: "140+ sertifikatlangan shifokor. Mutaxassislik, reyting va narx bo'yicha filtrlang.",
};

export default function DoctorsPage() {
  return (
    <>
      {/* PAGE HEAD — editorial, blends smoothly into catalog */}
      <section className="relative overflow-hidden pt-16 md:pt-20 pb-16 md:pb-20" style={{ background: "linear-gradient(180deg, #F5F8FD 0%, #EEF3FB 60%, var(--bg) 100%)" }}>
        {/* Soft accent glow */}
        <div className="absolute top-[15%] right-[8%] w-[480px] h-[480px] rounded-full blur-[80px] opacity-30 pointer-events-none" style={{ background: "radial-gradient(closest-side, rgba(77,148,245,0.35), transparent 70%)" }} />

        <div className="container-wide relative">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-[12.5px] text-muted mb-8">
            <Link href="/" className="hover:text-brand">Bosh sahifa</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-ink font-medium">Shifokorlar</span>
          </div>

          <div className="grid lg:grid-cols-[1fr_auto] gap-10 lg:gap-16 items-end">
            <div className="max-w-[820px]">
              {/* Eyebrow */}
              <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand mb-5 inline-flex items-center gap-2.5">
                <span className="w-8 h-px bg-brand" />
                Katalog · 2026
              </div>

              {/* Mega headline */}
              <h1 className="font-display font-normal text-ink leading-[0.98] tracking-[-0.025em]" style={{ fontSize: "clamp(42px, 7vw, 84px)" }}>
                Shifokoringizni <em className="italic text-brand">toping</em>.
              </h1>

              <p className="text-[15px] md:text-[17px] text-ink-soft mt-6 max-w-[56ch] leading-relaxed">
                140 sertifikatlangan mutaxassis, 24 yo&apos;nalish, haqiqiy bemor sharhlari.
                Mutaxassislik, narx yoki bo&apos;sh vaqt bo&apos;yicha filtrlang.
              </p>
            </div>

            {/* Right-side credentials — editorial stats */}
            <div className="grid grid-cols-3 lg:flex lg:flex-col gap-6 lg:gap-5 lg:min-w-[220px] lg:border-l lg:border-line lg:pl-10">
              {[
                { icon: Stethoscope, num: 140, suffix: "+", l: "Shifokor" },
                { icon: Award,       num: 24,  suffix: "",  l: "Mutaxassislik" },
                { icon: Shield,      num: 100, suffix: "%", l: "Litsenziyali" },
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

      <DoctorsCatalog />
    </>
  );
}
