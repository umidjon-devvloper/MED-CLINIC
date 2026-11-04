import Link from "next/link";
import type { Metadata } from "next";
import { Home, ChevronRight, Heart, ArrowRight } from "lucide-react";
import { articles } from "@/lib/data/articles";
import { BlogList } from "@/components/blog/BlogList";

export const metadata: Metadata = {
  title: "Blog va yangiliklar — MED CLINIC",
  description: "Tibbiy maqolalar, sog'liq bo'yicha maslahatlar, zamonaviy davolash usullari va foydali tavsiyalar.",
};

export default function BlogPage() {
  const featured = articles[0];

  return (
    <>
      {/* PAGE HEAD */}
      <section className="relative overflow-hidden" style={{ padding: "2.5rem 0 2rem", background: "linear-gradient(180deg, #F7FAFF 0%, #EDF4FD 100%)", borderBottom: "1px solid var(--line)" }}>
        <div
          aria-hidden
          className="absolute pointer-events-none"
          style={{
            top: "-30%", right: "5%", width: 520, height: 520,
            background: "radial-gradient(circle, rgba(77,148,245,0.3), transparent 65%)",
            filter: "blur(55px)", zIndex: 0,
          }}
        />
        <div
          aria-hidden
          className="absolute pointer-events-none"
          style={{
            bottom: "-50%", left: "-5%", width: 400, height: 400,
            background: "radial-gradient(circle, rgba(34,197,139,0.12), transparent 65%)",
            filter: "blur(50px)", zIndex: 0,
          }}
        />
        <div className="container-x relative z-10 grid lg:grid-cols-[1.1fr_1fr] gap-8 items-center" style={{ minHeight: 240 }}>
          <div className="max-w-[580px]">
            <span className="inline-flex items-center gap-2 bg-white shadow-sm text-muted text-[13px] mb-4 self-start px-3 py-1.5 rounded-full">
              <Link href="/" className="inline-flex items-center gap-1.5 hover:text-brand transition-colors">
                <Home className="w-3.5 h-3.5" /> Bosh sahifa
              </Link>
              <ChevronRight className="w-2.5 h-2.5" />
              <span className="text-ink font-medium">Blog</span>
            </span>
            <h1 className="font-display font-medium text-ink leading-[1.05]" style={{ fontSize: "clamp(32px, 5vw, 48px)", letterSpacing: "-0.025em" }}>
              Tibbiy blog va <em className="italic text-brand font-normal">yangiliklar</em>
            </h1>
            <p className="text-ink-soft leading-[1.55] max-w-[48ch] mt-4" style={{ fontSize: 15 }}>
              Sizning salomatligingiz, profilaktika, zamonaviy davolash usullari va foydali maslahatlar — bir haftada eng muhim tibbiy mavzular.
            </p>
          </div>
          {/* 3D Stethoscope illustration */}
          <div className="relative hidden lg:block justify-self-end w-full anim-float-slow" style={{ maxWidth: 420 }} aria-hidden>
            <div className="relative">
              {/* soft radial glow behind */}
              <div
                className="absolute inset-[-20%] pointer-events-none"
                style={{
                  background: "radial-gradient(circle at center, rgba(77,148,245,0.25), transparent 65%)",
                  filter: "blur(40px)", borderRadius: "50%",
                }}
              />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/hero/stethoscope.webp"
                alt=""
                className="relative w-full h-auto"
                style={{
                  filter: "drop-shadow(0 30px 50px rgba(14,63,140,0.3))",
                  mixBlendMode: "multiply",
                  WebkitMaskImage: "radial-gradient(ellipse 70% 70% at center, #000 30%, rgba(0,0,0,0.9) 50%, rgba(0,0,0,0.5) 70%, transparent 95%)",
                  maskImage: "radial-gradient(ellipse 70% 70% at center, #000 30%, rgba(0,0,0,0.9) 50%, rgba(0,0,0,0.5) 70%, transparent 95%)",
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED HERO */}
      <section className="pt-8 pb-2">
        <div className="container-x">
          <div
            className="relative rounded-[28px] overflow-hidden shadow-[var(--shadow-lg)] grid lg:grid-cols-[1.05fr_1.1fr] items-center"
            style={{ background: "linear-gradient(135deg, #DCECFC 0%, #BFDAF6 100%)", minHeight: 340 }}
          >
            <div
              aria-hidden
              className="absolute pointer-events-none"
              style={{
                top: 0, right: 0, width: "60%", height: "100%",
                background: "radial-gradient(circle at 30% 50%, rgba(255,255,255,0.4), transparent 70%)",
              }}
            />
            {/* 3D Heart illustration */}
            <div className="relative p-6 md:p-8 flex items-center justify-center z-10" aria-hidden>
              <div className="relative w-full max-w-[380px]">
                <div
                  className="absolute inset-[5%] pointer-events-none"
                  style={{
                    background: "radial-gradient(circle, rgba(255,255,255,0.6), transparent 70%)",
                    filter: "blur(35px)", borderRadius: "50%",
                  }}
                />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/hero/heart-3d.webp"
                  alt=""
                  className="relative w-full h-auto"
                  style={{
                    filter: "drop-shadow(0 25px 50px rgba(190,30,30,0.25))",
                    mixBlendMode: "multiply",
                    WebkitMaskImage: "radial-gradient(ellipse 75% 72% at center, #000 20%, rgba(0,0,0,0.85) 45%, rgba(0,0,0,0.5) 65%, transparent 90%)",
                    maskImage: "radial-gradient(ellipse 75% 72% at center, #000 20%, rgba(0,0,0,0.85) 45%, rgba(0,0,0,0.5) 65%, transparent 90%)",
                  }}
                />
              </div>
            </div>
            <div className="relative p-8 lg:py-10 lg:pr-12 lg:pl-4 z-10">
              <span
                className="inline-flex items-center gap-2 bg-white text-brand font-bold uppercase mb-4 shadow-[0_2px_8px_rgba(10,31,58,0.06)] rounded-full"
                style={{ fontSize: 12, letterSpacing: "0.08em", padding: "6px 14px" }}
              >
                <Heart className="w-[13px] h-[13px] fill-[#D64545] text-[#D64545]" />
                Tavsiya etilgan
              </span>
              <h2 className="font-display font-medium text-ink mb-4 leading-[1.15]" style={{ fontSize: "clamp(22px, 3vw, 34px)", letterSpacing: "-0.02em" }}>
                Yurak kasalliklarini <em className="italic text-brand">oldini olish</em>: har kuni bajarsa bo&apos;ladigan 7 ta oddiy odat
              </h2>
              <p className="text-[14.5px] leading-[1.55] text-ink-soft max-w-[48ch] mb-6">
                Kardiologlar yurak salomatligini saqlash va kasalliklar xavfini kamaytirish uchun har kuni bajarishingiz mumkin bo&apos;lgan 7 ta oddiy, ammo samarali odatni tavsiya qiladi.
              </p>
              <div className="flex items-center justify-between gap-4 flex-wrap">
                <div className="flex items-center gap-3">
                  <div className="w-[42px] h-[42px] rounded-full overflow-hidden shrink-0" style={{ background: "linear-gradient(165deg, #D7E8FA, #B5D4F2)" }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={featured.author.avatar} alt={featured.author.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <div className="font-bold text-[13.5px] text-ink">Dr. Alisher Qodirov · Kardiolog</div>
                    <div className="text-[11.5px] text-muted mt-0.5">14 noyabr, 2026 · 6 daqiqa o&apos;qish</div>
                  </div>
                </div>
                <Link
                  href={`/blog/${featured.slug}`}
                  aria-label="Davomini o'qish"
                  className="w-12 h-12 rounded-full grid place-items-center !text-white shrink-0 shadow-[0_8px_20px_rgba(30,109,216,.35)] hover:translate-x-1 transition-transform"
                  style={{ background: "linear-gradient(135deg, var(--brand), var(--brand-ink))", color: "#fff" }}
                >
                  <ArrowRight className="w-[18px] h-[18px]" strokeWidth={2.5} />
                </Link>
              </div>
            </div>
          </div>
          {/* dots */}
          <div className="flex justify-center gap-1.5 mt-4">
            <span className="rounded-sm" style={{ width: 32, height: 4, background: "var(--brand)" }} />
            <span className="rounded-sm" style={{ width: 24, height: 4, background: "var(--line-strong)" }} />
            <span className="rounded-sm" style={{ width: 24, height: 4, background: "var(--line-strong)" }} />
          </div>
        </div>
      </section>

      <BlogList />
    </>
  );
}
