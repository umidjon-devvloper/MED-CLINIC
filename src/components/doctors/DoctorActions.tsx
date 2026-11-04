"use client";

import { Heart, Share2, MessageCircle } from "lucide-react";
import { useFavorite, useToast } from "@/components/ui/Toast";

export function DoctorActions({ docId, docName }: { docId: string; docName: string }) {
  const [fav, toggle] = useFavorite("fav-doctors", docId);
  const toast = useToast();

  const onFav = () => {
    toggle();
    toast.show(fav ? "Sevimlilardan olib tashlandi" : `${docName} sevimlilarga qo'shildi`, "success");
  };

  const onShare = async () => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    try {
      if (typeof navigator !== "undefined" && navigator.share) {
        await navigator.share({ title: docName, text: `${docName} — MED CLINIC`, url });
        toast.show("Ulashildi", "success");
      } else {
        await navigator.clipboard.writeText(url);
        toast.show("Havola nusxalandi", "success");
      }
    } catch {
      /* cancelled */
    }
  };

  const onMessage = () => {
    toast.show(`${docName}ga xabar yuborish — tez orada!`, "info");
  };

  return (
    <div className="flex gap-2">
      <button
        onClick={onFav}
        className={`flex-1 h-11 rounded-[11px] border bg-surface grid place-items-center transition-colors ${fav ? "border-danger text-danger" : "border-line-strong text-ink-soft hover:text-brand hover:border-brand"}`}
        aria-label="Saqlash"
      >
        <Heart className={`w-[18px] h-[18px] ${fav ? "fill-current" : ""}`} />
      </button>
      <button
        onClick={onShare}
        className="flex-1 h-11 rounded-[11px] border border-line-strong bg-surface text-ink-soft grid place-items-center hover:text-brand hover:border-brand"
        aria-label="Ulashish"
      >
        <Share2 className="w-[18px] h-[18px]" />
      </button>
      <button
        onClick={onMessage}
        className="flex-1 h-11 rounded-[11px] border border-line-strong bg-surface text-ink-soft grid place-items-center hover:text-brand hover:border-brand"
        aria-label="Xabar"
      >
        <MessageCircle className="w-[18px] h-[18px]" />
      </button>
    </div>
  );
}
