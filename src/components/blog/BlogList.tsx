"use client";

import { useMemo, useState } from "react";
import { ChevronRight, Search } from "lucide-react";
import { articles, articleCategories } from "@/lib/data/articles";
import { ArticleCard } from "./ArticleCard";
import { MotionGrid, MotionItem } from "@/components/ui/motion";

export function BlogList() {
  const [cat, setCat] = useState<string>("all");
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const perPage = 9;

  const filtered = useMemo(() => {
    return articles.filter((a) => {
      if (cat !== "all" && a.category !== cat) return false;
      if (query) {
        const q = query.toLowerCase();
        if (!(a.title.toLowerCase().includes(q) || a.excerpt.toLowerCase().includes(q))) return false;
      }
      return true;
    });
  }, [cat, query]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const pageItems = filtered.slice((page - 1) * perPage, page * perPage);

  return (
    <>
      <section className="pt-10 pb-6">
        <div className="container-wide flex flex-col gap-4">
          <div className="relative max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
            <input
              type="text"
              value={query}
              onChange={(e) => { setQuery(e.target.value); setPage(1); }}
              placeholder="Maqola qidiring..."
              className="w-full pl-11 pr-4 py-3 bg-white border border-line-strong rounded-xl text-sm text-ink outline-none focus:border-brand focus:shadow-[0_0_0_3px_rgba(30,109,216,.12)] transition-all"
            />
          </div>
          <div className="flex gap-2 items-center flex-nowrap overflow-x-auto scrollbar-hide md:flex-wrap" style={{ scrollbarWidth: "none" }}>
            {articleCategories.map((c) => {
              const slug = c.slug === "all" ? "all" : c.slug;
              const on = cat === slug;
              return (
                <button
                  key={c.slug}
                  onClick={() => { setCat(slug); setPage(1); }}
                  style={on ? { color: "#fff" } : undefined}
                  className={`inline-flex items-center gap-1.5 py-2.5 px-4 border rounded-full text-[13.5px] font-medium transition-colors whitespace-nowrap shrink-0 ${on ? "bg-brand text-white border-brand font-semibold" : "bg-white border-line text-ink-soft hover:border-brand hover:text-brand"}`}
                >
                  {c.emoji && <span className="text-[15px] leading-none">{c.emoji}</span>}
                  {c.name}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <section className="pb-20 lg:pb-28">
        <div className="container-wide">
          {pageItems.length > 0 ? (
            <MotionGrid key={`${cat}-${query}-${page}`} className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {pageItems.map((a) => (
                <MotionItem key={a.id}><ArticleCard article={a} /></MotionItem>
              ))}
            </MotionGrid>
          ) : (
            <div className="bg-white border border-dashed border-line-strong rounded-2xl py-16 text-center">
              <Search className="w-10 h-10 text-muted mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-ink mb-1">Maqola topilmadi</h3>
              <p className="text-sm text-ink-soft">Boshqa kalit so&apos;z yoki kategoriya tanlang.</p>
            </div>
          )}

          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-1.5 mt-10 flex-wrap">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="inline-flex items-center gap-1.5 px-4 h-[42px] rounded-[11px] border border-line-strong bg-white text-ink-soft text-[13.5px] font-medium hover:border-brand hover:text-brand disabled:opacity-50 transition-colors"
              >
                <ChevronRight className="w-3.5 h-3.5 rotate-180" /> Ortga
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                <button
                  key={n}
                  onClick={() => setPage(n)}
                  style={n === page ? { color: "#fff" } : undefined}
                  className={`w-10 h-10 rounded-[11px] grid place-items-center font-semibold text-[14px] ${n === page ? "bg-brand text-white border border-brand" : "border border-line-strong bg-white text-ink-soft hover:border-brand hover:text-brand"}`}
                >
                  {n}
                </button>
              ))}
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="inline-flex items-center gap-1.5 px-4 h-[42px] rounded-[11px] border border-line-strong bg-white text-ink-soft text-[13.5px] font-medium hover:border-brand hover:text-brand disabled:opacity-50 transition-colors"
              >
                Keyingi <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
