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
    <section className="scroll-reveal py-20 md:py-28">
      <div className="container-wide">
        <div className="flex items-end justify-between gap-8 flex-wrap mb-12 md:mb-16">
          <div className="max-w-[640px]">
            <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand mb-5 inline-flex items-center gap-2.5">
              <span className="w-8 h-px bg-brand" />
              Shifokorlar
            </div>
            <h2 className="font-display font-normal text-ink leading-[0.98] tracking-[-0.025em]" style={{ fontSize: "clamp(36px, 5.5vw, 68px)" }}>
              Haftaning <em className="italic text-brand">yetakchi</em> mutaxassislari.
            </h2>
            <p className="text-[15px] md:text-[17px] text-ink-soft mt-5 max-w-[48ch] leading-relaxed">
              Yuqori reytingli va eng tajribali shifokorlarimiz — bugun qabulga yoziling.
            </p>
          </div>
          <Link href="/doctors" className="group inline-flex items-center gap-2 text-brand hover:text-brand-ink font-semibold text-[14px] border-b-2 border-brand pb-1 transition-colors self-end">
            Barchasini ko&apos;rish
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
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
