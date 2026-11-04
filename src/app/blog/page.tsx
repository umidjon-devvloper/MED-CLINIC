import Link from "next/link";
import type { Metadata } from "next";
import { ChevronRight, Heart, ArrowUpRight, Newspaper, Users, BookOpen } from "lucide-react";
import { articles } from "@/lib/data/articles";
import { BlogList } from "@/components/blog/BlogList";
import { CountUp } from "@/components/ui/CountUp";

export const metadata: Metadata = {
  title: "Blog va yangiliklar — MED CLINIC",
  description: "Tibbiy maqolalar, sog'liq bo'yicha maslahatlar, zamonaviy davolash usullari va foydali tavsiyalar.",
};

export default function BlogPage() {
  const featured = articles[0];

  return (
    <>
      <section className="relative overflow-hidden pt-16 md:pt-20 pb-16 md:pb-20" style={{ background: "linear-gradient(180deg, #F5F8FD 0%, #EEF3FB 60%, var(--bg) 100%)" }}>
        <div className="absolute top-[15%] right-[8%] w-[480px] h-[480px] rounded-full blur-[80px] opacity-30 pointer-events-none" style={{ background: "radial-gradient(closest-side, rgba(77,148,245,0.35), transparent 70%)" }} />

        <div className="container-wide relative">
          <div className="flex items-center gap-2 text-[12.5px] text-muted mb-8">
            <Link href="/" className="hover:text-brand">Bosh sahifa</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-ink font-medium">Blog</span>
          </div>

          <div className="grid lg:grid-cols-[1fr_auto] gap-10 lg:gap-16 items-end">
            <div className="max-w-[820px]">
              <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand mb-5 inline-flex items-center gap-2.5">
                <span className="w-8 h-px bg-brand" />
                Jurnal · 2026
              </div>
              <h1 className="font-display font-normal text-ink leading-[0.98] tracking-[-0.025em]" style={{ fontSize: "clamp(42px, 7vw, 84px)" }}>
                Tibbiy <em className="italic text-brand">jurnal</em>.
              </h1>
              <p className="text-[15px] md:text-[17px] text-ink-soft mt-6 max-w-[56ch] leading-relaxed">
                Salomatlik, profilaktika, zamonaviy davolash usullari va foydali maslahatlar.
                Shifokorlarimiz haftada 3-4 marta yangi maqola nashr etadi.
              </p>
            </div>

            <div className="grid grid-cols-3 lg:flex lg:flex-col gap-6 lg:gap-5 lg:min-w-[220px] lg:border-l lg:border-line lg:pl-10">
              {[
                { icon: Newspaper, num: 180, suffix: "+", l: "Maqola" },
                { icon: Users,     num: 24,  suffix: "",  l: "Muallif" },
                { icon: BookOpen,  num: 9,   suffix: "",  l: "Rubrika" },
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

      <section className="pt-6 pb-10 md:pb-14">
        <div className="container-wide">
          <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand mb-5 inline-flex items-center gap-2.5">
            <Heart className="w-3 h-3 fill-current" />
            Tavsiya etilgan
          </div>

          <Link href={`/blog/${featured.slug}`} className="group block">
            <div className="grid lg:grid-cols-[1.1fr_1fr] gap-8 lg:gap-14 items-center">
              <div className="relative aspect-[5/4] md:aspect-[5/3.6] rounded-[24px] overflow-hidden" style={{ background: "linear-gradient(135deg, #DCECFC 0%, #BFDAF6 100%)" }}>
                <div className="absolute inset-0" style={{ background: "radial-gradient(circle at 30% 50%, rgba(255,255,255,0.5), transparent 70%)" }} />
                <div className="absolute inset-0 flex items-center justify-center p-8">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/images/hero/heart-3d.webp"
                    alt=""
                    className="relative w-full h-auto max-w-[420px] transition-transform duration-700 group-hover:scale-105"
                    style={{
                      filter: "drop-shadow(0 25px 50px rgba(190,30,30,0.3))",
                      mixBlendMode: "multiply",
                      WebkitMaskImage: "radial-gradient(ellipse 75% 72% at center, #000 20%, rgba(0,0,0,0.85) 45%, rgba(0,0,0,0.5) 65%, transparent 90%)",
                      maskImage: "radial-gradient(ellipse 75% 72% at center, #000 20%, rgba(0,0,0,0.85) 45%, rgba(0,0,0,0.5) 65%, transparent 90%)",
                    }}
                  />
                </div>
                <div className="absolute top-5 left-5">
                  <span className="inline-flex items-center gap-1.5 bg-white/95 backdrop-blur text-[#D64545] text-[10.5px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full shadow-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D64545]" />
                    Kardiologiya
                  </span>
                </div>
              </div>

              <div>
                <h2 className="font-display font-normal text-ink leading-[1.02] tracking-[-0.02em]" style={{ fontSize: "clamp(28px, 3.5vw, 48px)" }}>
                  Yurak kasalliklarini <em className="italic text-brand">oldini olish</em>: 7 ta oddiy odat.
                </h2>
                <p className="text-[15px] md:text-[17px] text-ink-soft mt-5 leading-relaxed max-w-[56ch]">
                  Kardiologlar yurak salomatligini saqlash va kasalliklar xavfini kamaytirish uchun har kuni bajarishingiz mumkin bo&apos;lgan oddiy, ammo samarali odatlarni tavsiya qiladi.
                </p>
                <div className="flex items-center gap-4 mt-7 pt-7 border-t border-line">
                  <div className="w-11 h-11 rounded-full overflow-hidden shrink-0" style={{ background: "linear-gradient(165deg, #D7E8FA, #B5D4F2)" }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={featured.author.avatar} alt={featured.author.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-[13.5px] text-ink">Dr. Alisher Qodirov</div>
                    <div className="text-[12px] text-muted">Kardiolog · 14 noyabr, 2026 · 6 daq o&apos;qish</div>
                  </div>
                  <span className="inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-brand group-hover:gap-2.5 transition-all">
                    O&apos;qish
                    <ArrowUpRight className="w-4 h-4" strokeWidth={2.5} />
                  </span>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </section>

      <BlogList />
    </>
  );
}
