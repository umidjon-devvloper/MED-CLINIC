"use client";

import Link from "next/link";
import { Bookmark } from "lucide-react";
import type { Article } from "@/lib/types";
import { useFavorite, useToast } from "@/components/ui/Toast";

const catColors: Record<Article["category"], string> = {
  kardio: "#D64545",
  ped: "#E8B840",
  derm: "#F687B3",
  nevro: "#4D94F5",
  sog: "#22C58B",
  uyqu: "#94A3B8",
  vit: "#F6AD55",
  fit: "#ED8936",
  psi: "#D879B5",
};

export function ArticleCard({ article }: { article: Article }) {
  const bg = catColors[article.category];
  const textColor = article.category === "ped" ? "#4A3410" : "#fff";
  const [saved, toggleSave] = useFavorite("saved-articles", article.id);
  const toast = useToast();
  const onSave = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleSave();
    toast.show(saved ? "Maqola saqlanganlardan olib tashlandi" : "Maqola saqlandi", "success");
  };

  return (
    <Link
      href={`/blog/${article.slug}`}
      className="group flex flex-col transition-transform hover:-translate-y-1"
    >
      <div
        className="relative overflow-hidden"
        style={{ borderRadius: "18px", aspectRatio: "16 / 10", background: "linear-gradient(135deg, #F0F6FF, #DCEBFF)" }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={article.image} alt={article.title} className="w-full h-full object-cover" />
        <button
          aria-label="Saqlash"
          onClick={onSave}
          className={`absolute top-3 right-3 w-8 h-8 rounded-full bg-white grid place-items-center shadow-md transition-colors z-10 ${saved ? "text-brand" : "text-ink hover:text-brand"}`}
        >
          <Bookmark className="w-3.5 h-3.5" strokeWidth={2} fill={saved ? "currentColor" : "none"} />
        </button>
      </div>

      <div
        className="relative z-10 bg-white rounded-[18px] p-5 pt-6 pb-5 flex flex-col gap-2 flex-1 shadow-[0_2px_4px_rgba(10,31,58,.04),0_12px_28px_rgba(10,31,58,.06)] group-hover:shadow-[0_10px_24px_rgba(10,31,58,.09),0_24px_48px_rgba(10,31,58,.1)] transition-shadow"
        style={{ margin: "-2rem 0.75rem 0" }}
      >
        <span
          className="inline-flex items-center self-start px-3 py-1.5 rounded-full uppercase font-extrabold mb-1 shadow-[0_3px_10px_rgba(10,31,58,0.12)]"
          style={{ background: bg, color: textColor, fontSize: "10.5px", letterSpacing: "0.1em" }}
        >
          {article.categoryName}
        </span>

        <h3 className="font-display font-semibold text-[18px] leading-[1.3] tracking-tight m-0 text-ink text-balance">
          {article.title}
        </h3>

        <p
          className="text-[13.5px] text-ink-soft leading-[1.55] mt-1 mb-0 overflow-hidden"
          style={{ display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" }}
        >
          {article.excerpt}
        </p>

        <div className="flex items-center gap-2 mt-auto pt-4 text-[12px] text-muted border-t border-dashed border-line">
          <span className="w-7 h-7 rounded-full overflow-hidden shrink-0 shadow-[0_2px_6px_rgba(10,31,58,0.08)]" style={{ background: "linear-gradient(165deg, #D7E8FA, #B5D4F2)" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={article.author.avatar} alt={article.author.name} className="w-full h-full object-cover" />
          </span>
          <span className="text-ink font-bold tracking-tight">{article.author.name}</span>
          <span className="text-line-strong mx-px">·</span>
          <span>{article.date}</span>
          <span className="text-line-strong mx-px">·</span>
          <span>{article.readTime} daq</span>
        </div>
      </div>
    </Link>
  );
}
