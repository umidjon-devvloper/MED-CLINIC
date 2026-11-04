"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Search, X, SlidersHorizontal, ChevronDown } from "lucide-react";
import { services } from "@/lib/data/services";
import { ServiceCard } from "./ServiceCard";
import { MotionGrid, MotionItem } from "@/components/ui/motion";

const categories = Array.from(new Set(services.map((s) => s.category)));
const durations = ["15 daq", "20 daq", "30 daq", "40 daq+"];

export function ServicesCatalog() {
  const [query, setQuery] = useState("");
  const [selectedCats, setSelectedCats] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([45000, 500000]);
  const [selectedDur, setSelectedDur] = useState<string[]>([]);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const toggle = (list: string[], val: string, setter: (v: string[]) => void) =>
    setter(list.includes(val) ? list.filter((x) => x !== val) : [...list, val]);

  const filtered = useMemo(() => {
    return services.filter((s) => {
      if (query && !s.name.toLowerCase().includes(query.toLowerCase())) return false;
      if (selectedCats.length && !selectedCats.includes(s.category)) return false;
      if (s.priceFrom < priceRange[0] || s.priceFrom > priceRange[1]) return false;
      return true;
    });
  }, [query, selectedCats, priceRange, selectedDur]);

  const activePills: { label: string; onRemove: () => void }[] = [
    ...selectedCats.map((c) => ({ label: c, onRemove: () => setSelectedCats(selectedCats.filter((x) => x !== c)) })),
    ...selectedDur.map((d) => ({ label: d, onRemove: () => setSelectedDur(selectedDur.filter((x) => x !== d)) })),
  ];

  const Filters = (
    <aside className="bg-surface border border-line rounded-2xl p-5 lg:p-6 sticky top-4 flex flex-col gap-6 lg:w-[260px] lg:shrink-0">
      <h2 className="text-[15px] font-bold text-ink flex justify-between items-center">
        Filtrlar
        <button onClick={() => { setSelectedCats([]); setSelectedDur([]); setQuery(""); setPriceRange([45000, 500000]); }} className="text-xs font-medium text-brand hover:underline">Tozalash</button>
      </h2>

      <div className="relative">
        <Search className="absolute top-1/2 left-3 -translate-y-1/2 w-4 h-4 text-muted" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Xizmat nomi..."
          className="w-full border border-line-strong rounded-[10px] pl-9 pr-3 py-2.5 text-sm bg-bg outline-none focus:border-brand focus:bg-surface"
        />
      </div>

      <div className="flex flex-col gap-2.5">
        <div className="text-[11.5px] font-bold text-muted uppercase tracking-wider">Yo&apos;nalish</div>
        <div className="flex flex-col gap-2 max-h-[220px] overflow-y-auto">
          {categories.map((cat) => {
            const on = selectedCats.includes(cat);
            return (
              <label key={cat} className="flex items-center gap-2.5 cursor-pointer text-[13.5px]" onClick={() => toggle(selectedCats, cat, setSelectedCats)}>
                <span className={`w-[18px] h-[18px] rounded-[5px] border-[1.5px] shrink-0 grid place-items-center ${on ? "bg-brand border-brand" : "bg-surface border-line-strong"}`}>
                  {on && <span className="w-2 h-[5px] border-l-2 border-b-2 border-white -rotate-45 -translate-y-px translate-x-px" />}
                </span>
                <span className={on ? "text-ink font-medium" : "text-ink-soft"}>{cat}</span>
                <span className="ml-auto text-xs text-muted tabular-nums">{services.filter((s) => s.category === cat).length}</span>
              </label>
            );
          })}
        </div>
      </div>

      <div className="flex flex-col gap-2.5">
        <div className="text-[11.5px] font-bold text-muted uppercase tracking-wider">Narx</div>
        <div className="py-2">
          <div className="h-1 bg-line rounded-full relative">
            <div className="absolute top-0 bottom-0 bg-brand rounded-full" style={{ left: `${((priceRange[0] - 45000) / 455000) * 100}%`, right: `${100 - ((priceRange[1] - 45000) / 455000) * 100}%` }} />
          </div>
          <div className="flex justify-between mt-3 text-xs text-ink font-medium tabular-nums">
            <span className="bg-brand-soft text-brand px-2 py-0.5 rounded-md">{priceRange[0].toLocaleString("uz-UZ")}</span>
            <span className="bg-brand-soft text-brand px-2 py-0.5 rounded-md">{priceRange[1].toLocaleString("uz-UZ")}</span>
          </div>
          <input type="range" min={45000} max={500000} step={5000} value={priceRange[1]} onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])} className="w-full mt-2 accent-brand" />
        </div>
      </div>

      <div className="flex flex-col gap-2.5">
        <div className="text-[11.5px] font-bold text-muted uppercase tracking-wider">Davomiyligi</div>
        <div className="flex flex-wrap gap-1.5">
          {durations.map((d) => {
            const on = selectedDur.includes(d);
            return (
              <button key={d} onClick={() => toggle(selectedDur, d, setSelectedDur)} className={`px-3 py-1.5 rounded-full text-[12.5px] border transition-colors ${on ? "bg-brand text-white border-brand" : "bg-surface text-ink-soft border-line-strong hover:border-brand hover:text-brand"}`}>
                {d}
              </button>
            );
          })}
        </div>
      </div>

      <button className="btn btn-primary justify-center">Qo&apos;llash ({filtered.length})</button>
    </aside>
  );

  return (
    <div className="grid lg:grid-cols-[260px_1fr] gap-6 lg:gap-8 items-start">
      <div className="hidden lg:block">{Filters}</div>

      <div className="lg:hidden">
        <button onClick={() => setFiltersOpen((v) => !v)} className="w-full flex items-center justify-between px-4 py-3 bg-surface border border-line-strong rounded-xl font-semibold text-ink text-sm">
          <span className="inline-flex items-center gap-2"><SlidersHorizontal className="w-4 h-4 text-brand" />Filtrlar · {activePills.length} ta faol</span>
          <ChevronDown className={`w-4 h-4 text-brand transition-transform ${filtersOpen ? "rotate-180" : ""}`} />
        </button>
        {filtersOpen && <div className="mt-3">{Filters}</div>}
      </div>

      <div className="flex flex-col gap-4">
        {activePills.length > 0 && (
          <div className="bg-surface border border-line rounded-xl p-3 flex items-center gap-2 flex-wrap text-[13px] text-muted">
            <span>Faol filtrlar:</span>
            {activePills.map((p, i) => (
              <span key={i} className="bg-brand-soft text-brand font-medium px-2.5 py-1 rounded-full inline-flex items-center gap-1 text-xs">
                {p.label}
                <button onClick={p.onRemove} aria-label="O'chirish" className="inline-flex"><X className="w-3 h-3" strokeWidth={2.5} /></button>
              </span>
            ))}
            <button onClick={() => { setSelectedCats([]); setSelectedDur([]); }} className="ml-auto text-xs font-semibold text-brand">Barchasini o&apos;chirish</button>
          </div>
        )}

        {filtered.length === 0 ? (
          <div className="bg-surface border border-line rounded-xl p-10 text-center text-ink-soft">
            <p className="font-semibold text-ink mb-1">Hech narsa topilmadi</p>
            <p className="text-sm">Filtrlarni o&apos;zgartirib qayta urinib ko&apos;ring.</p>
          </div>
        ) : (
          <MotionGrid key={`${query}-${selectedCats.join()}-${priceRange.join()}`} className="grid grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-5">
            {filtered.map((svc) => (
              <MotionItem key={svc.id}><ServiceCard svc={svc} /></MotionItem>
            ))}
          </MotionGrid>
        )}

        <div className="mt-8 bg-gradient-to-br from-danger-soft to-warn-soft border border-danger/20 rounded-2xl p-5 md:p-7 flex flex-col md:flex-row items-start md:items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-surface grid place-items-center text-danger shrink-0" style={{ boxShadow: "0 2px 8px rgba(214,69,69,.2)" }}>
            <span className="text-2xl">🚨</span>
          </div>
          <div className="flex-1">
            <h3 className="font-display font-medium text-lg md:text-xl text-ink">Zudlik bilan yordam kerakmi?</h3>
            <p className="text-sm text-ink-soft mt-1">24/7 shoshilinch yordam xizmatimizga qo&apos;ng&apos;iroq qiling.</p>
          </div>
          <a href="tel:+998712000000" className="btn btn-primary">+998 71 200 00 00</a>
        </div>
      </div>
    </div>
  );
}
