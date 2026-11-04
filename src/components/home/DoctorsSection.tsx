"use client";

import Link from "next/link";
import { ArrowRight, Heart, Calendar, Star, CreditCard } from "lucide-react";
import { doctors } from "@/lib/data/doctors";
import { useFavorite, useToast } from "@/components/ui/Toast";
import type { Doctor } from "@/lib/types";

const colorMap: Record<string, string> = {
  blue: "linear-gradient(165deg, #D7E8FA 0%, #B5D4F2 100%)",
  mint: "linear-gradient(165deg, #D7F0E3 0%, #B4E0C9 100%)",
  lavender: "linear-gradient(165deg, #E4DFF5 0%, #C9BFE8 100%)",
  pink: "linear-gradient(165deg, #F5DFE8 0%, #ECC2D4 100%)",
};

export function DoctorsSection() {
  const topDoctors = doctors.slice(0, 4);
  return (
    <section className="scroll-reveal py-16 md:py-20">
      <div className="container-x">
        <div className="rounded-3xl overflow-hidden mb-10 shadow-[0_20px_50px_rgba(10,31,58,0.06)] relative" style={{ background: "linear-gradient(135deg, #E8F1FD 0%, #DBE8F7 60%, #C7DAEE 100%)" }}>
          {/* Background stethoscope illustration on the right */}
          <div className="absolute inset-y-0 right-0 w-[55%] z-0 pointer-events-none overflow-hidden hidden md:block">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/hero/stethoscope.webp"
              alt=""
              className="absolute top-1/2 right-[-4%] w-[480px] max-w-none h-auto"
              style={{
                transform: "translateY(-50%)",
                mixBlendMode: "multiply",
                WebkitMaskImage: "linear-gradient(90deg, transparent 0%, #000 35%, #000 75%, transparent 100%)",
                maskImage: "linear-gradient(90deg, transparent 0%, #000 35%, #000 75%, transparent 100%)",
              }}
            />
          </div>
          <div className="absolute -top-[30%] right-[20%] w-[420px] h-[420px] rounded-full blur-[55px] z-0 pointer-events-none" style={{ background: "radial-gradient(circle, rgba(77,148,245,0.35), transparent 65%)" }} />
          <div className="relative z-10 p-5 md:p-10 grid md:grid-cols-[1fr_auto] gap-6 items-center">
            <div className="max-w-[460px]">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-surface shadow-sm text-ink text-[13px] font-semibold rounded-full mb-3">
                <span className="w-6 h-6 rounded-full grid place-items-center" style={{ background: "linear-gradient(135deg, var(--brand), var(--brand-ink))", color: "#fff" }}>
                  <Heart className="w-3 h-3 fill-current" />
                </span>
                Shifokorlar
              </span>
              <h2 className="font-display font-semibold text-2xl md:text-[32px] leading-tight text-ink mb-3">
                Haftaning <em className="italic text-brand font-medium">yetakchi</em>
                <br />
                mutaxassislari
              </h2>
              <p className="text-sm md:text-[14.5px] text-ink-soft max-w-[38ch]">
                Yuqori reytingli va eng tajribali shifokorlarimiz — bugun qabulga yoziling.
              </p>
            </div>
            <Link href="/doctors" style={{ color: "#fff", background: "linear-gradient(135deg, var(--brand) 0%, var(--brand-ink) 100%)" }} className="inline-flex items-center gap-2 px-6 py-3 rounded-full !text-white font-semibold text-sm whitespace-nowrap shadow-[0_8px_20px_rgba(30,109,216,.35)] hover:-translate-y-0.5 transition-transform">
              Barchasini ko&apos;rish
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-5">
          {topDoctors.map((doc) => (<DoctorMiniCard key={doc.id} doc={doc} />))}
        </div>
      </div>
    </section>
  );
}

function DoctorMiniCard({ doc }: { doc: Doctor }) {
  const [fav, toggleFav] = useFavorite("fav-doctors", doc.id);
  const toast = useToast();
  const onFav = (e: React.MouseEvent) => {
    e.preventDefault();
    toggleFav();
    toast.show(fav ? "Shifokor sevimlilardan olib tashlandi" : `${doc.name} sevimlilarga qo'shildi`, "success");
  };
  return (
    <article className="bg-surface border border-line rounded-[20px] overflow-hidden p-1.5 md:p-2.5 pb-3 md:pb-4 flex flex-col transition-all hover:-translate-y-1 shadow-[0_2px_4px_rgba(10,31,58,.04),0_10px_24px_rgba(10,31,58,.05)] hover:shadow-[0_6px_12px_rgba(10,31,58,.06),0_24px_48px_rgba(10,31,58,.1)]">
      <div className="relative rounded-xl aspect-[4/3.2] overflow-hidden grid place-items-end justify-center" style={{ background: colorMap[doc.color] }}>
        <span className={`absolute top-2 left-2 md:top-3 md:left-3 text-[9.5px] md:text-[11px] font-semibold px-2 py-1 rounded-full inline-flex items-center gap-1 shadow-sm z-20 ${doc.available === "today" ? "bg-surface text-ink" : "bg-surface text-warn"}`}>
          <span className={`w-1.5 h-1.5 rounded-full ${doc.available === "today" ? "bg-accent" : "bg-warn"}`} />
          {doc.available === "today" ? "Bugun bo'sh" : "Erta bo'sh"}
        </span>
        <button onClick={onFav} className={`absolute top-2 right-2 md:top-3 md:right-3 w-6 h-6 md:w-8 md:h-8 rounded-full bg-surface grid place-items-center shadow-sm z-20 transition-colors ${fav ? "text-danger" : "text-muted hover:text-danger"}`} aria-label="Sevimlilarga">
          <Heart className={`w-3 h-3 md:w-[15px] md:h-[15px] ${fav ? "fill-current" : ""}`} />
        </button>
                <div className="w-full h-full absolute inset-0 bg-gradient-to-t from-white/40 to-transparent" />
                <div className="relative z-10 w-[92%] h-full flex items-end justify-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={doc.photo} alt={doc.name} className="max-w-[92%] max-h-full object-contain object-bottom" style={{ filter: "drop-shadow(0 10px 20px rgba(10,31,58,0.15))" }} />
                </div>
              </div>
              <div className="px-2 md:px-3 pt-3 flex flex-col gap-1 md:gap-1.5">
                <h3 className="text-[13px] md:text-base font-bold text-ink tracking-tight">{doc.name}</h3>
                <div className="flex items-center gap-1.5 text-[11px] md:text-[13px] text-brand font-semibold">
                  <span className="w-4 h-4 md:w-5 md:h-5 rounded-md bg-brand-soft grid place-items-center shrink-0">
                    <Heart className="w-2.5 h-2.5 md:w-3 md:h-3 fill-current" />
                  </span>
                  {doc.specialty} · {doc.experience} yil
                </div>
                <div className="flex items-center justify-between mt-1 text-[11px] md:text-[13px] text-muted gap-2 flex-wrap">
                  <span className="inline-flex items-center gap-1 font-bold text-ink">
                    <Star className="w-3 md:w-[15px] h-3 md:h-[15px] text-warn fill-warn" />
                    {doc.rating}
                    <span className="hidden md:inline text-muted font-medium">({doc.reviews})</span>
                  </span>
                  <span className="inline-flex items-center gap-1 font-bold text-ink tabular-nums">
                    <CreditCard className="w-3 md:w-3.5 h-3 md:h-3.5 text-brand" />
                    {(doc.price / 1000).toFixed(0)}k
                  </span>
                </div>
                <div className="flex gap-1.5 mt-2 md:mt-2.5">
                  <Link href={`/doctors/${doc.id}`} className="flex-1 text-center py-1.5 md:py-2 bg-surface border border-line-strong rounded-full text-[11px] md:text-[13px] font-semibold text-ink hover:border-brand hover:text-brand transition-colors">
                    Profil
                  </Link>
          <Link href={`/booking?doctor=${doc.id}`} className="flex-1 inline-flex items-center justify-center gap-1 py-1.5 md:py-2 !text-white rounded-full text-[11px] md:text-[13px] font-semibold shadow-[0_4px_12px_rgba(30,109,216,.3)]" style={{ background: "linear-gradient(135deg, var(--brand) 0%, var(--brand-ink) 100%)", color: "#fff" }}>
            <Calendar className="w-3 md:w-3.5 h-3 md:h-3.5" />
            Qabul
          </Link>
        </div>
      </div>
    </article>
  );
}
