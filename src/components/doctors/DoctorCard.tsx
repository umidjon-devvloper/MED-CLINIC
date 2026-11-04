"use client";

import Link from "next/link";
import { Heart, Calendar, Star, CreditCard, Clock } from "lucide-react";
import type { Doctor } from "@/lib/types";
import { useFavorite, useToast } from "@/components/ui/Toast";

const colorMap: Record<string, string> = {
  blue: "linear-gradient(165deg, #D7E8FA 0%, #B5D4F2 100%)",
  mint: "linear-gradient(165deg, #D7F0E3 0%, #B4E0C9 100%)",
  lavender: "linear-gradient(165deg, #E4DFF5 0%, #C9BFE8 100%)",
  pink: "linear-gradient(165deg, #F5DFE8 0%, #ECC2D4 100%)",
};

const ALL_SLOTS = ["09:00", "10:30", "11:30", "13:00", "14:30", "15:30", "16:00", "17:30"];
function nextSlots(docId: string, count = 2): string[] {
  let h = 0;
  for (let i = 0; i < docId.length; i++) h = ((h << 5) - h + docId.charCodeAt(i)) | 0;
  const start = Math.abs(h) % (ALL_SLOTS.length - count);
  return ALL_SLOTS.slice(start, start + count);
}
const dayLabel = (a: Doctor["available"]) => a === "today" ? "Bugun" : a === "tomorrow" ? "Ertaga" : "Dush";

export function DoctorCard({ doc }: { doc: Doctor }) {
  return (
    <article className="bg-surface border border-line rounded-[20px] overflow-hidden p-1.5 md:p-2.5 pb-3 md:pb-4 flex flex-col transition-all hover:-translate-y-1 shadow-[0_2px_4px_rgba(10,31,58,.04),0_10px_24px_rgba(10,31,58,.05)] hover:shadow-[0_6px_12px_rgba(10,31,58,.06),0_24px_48px_rgba(10,31,58,.1)]">
      <div
        className="relative rounded-xl aspect-[4/3.2] overflow-hidden grid place-items-end justify-center"
        style={{ background: colorMap[doc.color] }}
      >
        <span
          className={`absolute top-2 left-2 md:top-3 md:left-3 text-[9.5px] md:text-[11px] font-semibold px-2 py-1 rounded-full inline-flex items-center gap-1 shadow-sm z-20 ${
            doc.available === "today"
              ? "bg-surface text-ink"
              : doc.available === "tomorrow"
              ? "bg-surface text-warn"
              : "bg-surface text-muted"
          }`}
        >
          <span
            className={`w-1.5 h-1.5 rounded-full ${
              doc.available === "today" ? "bg-accent" : doc.available === "tomorrow" ? "bg-warn" : "bg-muted"
            }`}
          />
          {doc.available === "today" ? "Bugun bo'sh" : doc.available === "tomorrow" ? "Erta bo'sh" : "Keyinroq"}
        </span>
        <FavButton docId={doc.id} docName={doc.name} />
        <div className="w-full h-full absolute inset-0 bg-gradient-to-t from-white/40 to-transparent" />
        <div className="relative z-10 w-[92%] h-full flex items-end justify-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={doc.photo}
            alt={doc.name}
            className="max-w-[92%] max-h-full object-contain object-bottom"
            style={{ filter: "drop-shadow(0 10px 20px rgba(10,31,58,0.15))" }}
          />
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
        {/* Next available slots */}
        <div className="flex items-center gap-1.5 mt-1 text-[10.5px] md:text-[11.5px]">
          <Clock className="w-3 h-3 md:w-3.5 md:h-3.5 text-muted shrink-0" />
          <span className="text-muted">{dayLabel(doc.available)}:</span>
          <div className="flex gap-1 flex-wrap">
            {nextSlots(doc.id).map((t) => (
              <Link
                key={t}
                href={`/booking?doctor=${doc.id}&time=${t}`}
                onClick={(e) => e.stopPropagation()}
                className="slot-chip font-semibold text-brand bg-brand-soft hover:bg-brand px-1.5 py-0.5 rounded tabular-nums transition-colors"
              >
                {t}
              </Link>
            ))}
          </div>
        </div>
        <div className="flex gap-1.5 mt-2 md:mt-2.5">
          <Link
            href={`/doctors/${doc.id}`}
            className="flex-1 text-center py-1.5 md:py-2 bg-surface border border-line-strong rounded-full text-[11px] md:text-[13px] font-semibold text-ink hover:border-brand hover:text-brand transition-colors"
          >
            Profil
          </Link>
          <Link
            href={`/booking?doctor=${doc.id}`}
            className="flex-1 inline-flex items-center justify-center gap-1 py-1.5 md:py-2 !text-white rounded-full text-[11px] md:text-[13px] font-semibold shadow-[0_4px_12px_rgba(30,109,216,.3)]"
            style={{ background: "linear-gradient(135deg, var(--brand) 0%, var(--brand-ink) 100%)", color: "#fff" }}
          >
            <Calendar className="w-3 md:w-3.5 h-3 md:h-3.5" />
            Qabul
          </Link>
        </div>
      </div>
    </article>
  );
}

function FavButton({ docId, docName }: { docId: string; docName: string }) {
  const [fav, toggle] = useFavorite("fav-doctors", docId);
  const toast = useToast();
  const onClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggle();
    toast.show(fav ? "Sevimlilardan olib tashlandi" : `${docName} sevimlilarga qo'shildi`, "success");
  };
  return (
    <button
      onClick={onClick}
      className={`absolute top-2 right-2 md:top-3 md:right-3 w-6 h-6 md:w-8 md:h-8 rounded-full bg-surface grid place-items-center shadow-sm z-20 transition-colors ${fav ? "text-danger" : "text-muted hover:text-danger"}`}
      aria-label="Sevimlilarga"
    >
      <Heart className={`w-3 h-3 md:w-[15px] md:h-[15px] ${fav ? "fill-current" : ""}`} />
    </button>
  );
}
