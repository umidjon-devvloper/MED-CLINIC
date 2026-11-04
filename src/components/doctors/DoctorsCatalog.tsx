"use client";

import { useMemo, useState, useEffect, useRef, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Search, ChevronDown, ChevronLeft, ChevronRight, X, MapPin, Check, Filter } from "lucide-react";
import { doctors as allDoctors } from "@/lib/data/doctors";
import { DoctorCard } from "@/components/doctors/DoctorCard";
import type { Doctor } from "@/lib/types";
import { MotionGrid, MotionItem } from "@/components/ui/motion";

const specialties = [
  { slug: "kardiologiya", name: "Kardiologiya" },
  { slug: "nevrologiya", name: "Nevrologiya" },
  { slug: "pediatriya", name: "Pediatriya" },
  { slug: "dermatologiya", name: "Dermatologiya" },
  { slug: "stomatologiya", name: "Stomatologiya" },
  { slug: "terapiya", name: "Terapiya" },
];

const cities = [
  "Toshkent", "Samarqand", "Buxoro", "Andijon", "Namangan", "Farg'ona",
  "Qarshi", "Nukus", "Urganch", "Jizzax", "Guliston", "Navoiy", "Termiz",
];

const availability = [
  { key: "today", label: "Bugun" },
  { key: "tomorrow", label: "Ertaga" },
  { key: "later", label: "Keyinroq" },
] as const;

type Sort = "rating" | "price-asc" | "price-desc" | "experience";

function CatalogInner() {
  const router = useRouter();
  const params = useSearchParams();
  const [query, setQuery] = useState("");
  const [city, setCity] = useState("Toshkent");
  const [cityOpen, setCityOpen] = useState(false);
  const [specs, setSpecs] = useState<string[]>([]);
  const [avail, setAvail] = useState<string[]>([]);
  const [minPrice, setMinPrice] = useState(45000);
  const [maxPrice, setMaxPrice] = useState(500000);
  const [minRating, setMinRating] = useState(0);
  const [sort, setSort] = useState<Sort>("rating");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [page, setPage] = useState(1);
  const perPage = 9;
  const cityRef = useRef<HTMLDivElement>(null);

  // Read URL params on mount
  useEffect(() => {
    const q = params.get("q");
    const c = params.get("city");
    const s = params.get("specialty");
    if (q) setQuery(q);
    if (c && cities.includes(c)) setCity(c);
    if (s) setSpecs([s]);
  }, [params]);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (cityRef.current && !cityRef.current.contains(e.target as Node)) setCityOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  // Filter + sort
  const filtered = useMemo(() => {
    let list: Doctor[] = allDoctors.filter((d) => {
      if (query && !(`${d.name} ${d.specialty}`.toLowerCase().includes(query.toLowerCase()))) return false;
      if (specs.length && !specs.includes(d.specialtySlug)) return false;
      if (d.price < minPrice || d.price > maxPrice) return false;
      if (d.rating < minRating) return false;
      if (avail.length && !avail.includes(d.available)) return false;
      return true;
    });
    switch (sort) {
      case "rating": list.sort((a, b) => b.rating - a.rating); break;
      case "price-asc": list.sort((a, b) => a.price - b.price); break;
      case "price-desc": list.sort((a, b) => b.price - a.price); break;
      case "experience": list.sort((a, b) => b.experience - a.experience); break;
    }
    return list;
  }, [query, specs, minPrice, maxPrice, minRating, avail, sort]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const pageItems = filtered.slice((page - 1) * perPage, page * perPage);

  useEffect(() => { setPage(1); }, [query, specs, minPrice, maxPrice, minRating, avail, sort]);

  const activeFilterPills = [
    ...specs.map((s) => ({ key: `s:${s}`, label: specialties.find((x) => x.slug === s)?.name || s, remove: () => setSpecs(specs.filter((x) => x !== s)) })),
    ...avail.map((a) => ({ key: `a:${a}`, label: availability.find((x) => x.key === a)?.label || a, remove: () => setAvail(avail.filter((x) => x !== a)) })),
    ...(minRating > 0 ? [{ key: "r", label: `${minRating}★+`, remove: () => setMinRating(0) }] : []),
    ...(query ? [{ key: "q", label: `"${query}"`, remove: () => setQuery("") }] : []),
  ];

  const clearAll = () => {
    setQuery(""); setSpecs([]); setAvail([]); setMinPrice(45000); setMaxPrice(500000); setMinRating(0);
    router.replace("/doctors");
  };

  const toggleSpec = (slug: string) => setSpecs((prev) => prev.includes(slug) ? prev.filter((x) => x !== slug) : [...prev, slug]);
  const toggleAvail = (key: string) => setAvail((prev) => prev.includes(key) ? prev.filter((x) => x !== key) : [...prev, key]);

  const sidebar = (
    <aside className="bg-surface border border-line rounded-2xl p-5 sticky top-4 flex flex-col gap-5">
      <h2 className="text-[15px] font-bold text-ink flex justify-between items-center m-0">
        Filtrlar
        <button onClick={clearAll} className="text-[12px] font-medium text-brand hover:underline">Tozalash</button>
      </h2>

      {/* Search */}
      <div className="relative">
        <Search className="absolute top-1/2 left-3 -translate-y-1/2 w-4 h-4 text-muted" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ism yoki familiya..."
          className="w-full border border-line-strong rounded-[10px] py-2.5 pl-9 pr-3 text-sm text-ink bg-bg outline-none focus:border-brand focus:bg-surface transition-colors"
        />
      </div>

      {/* City dropdown */}
      <div ref={cityRef} className="flex flex-col gap-2 relative">
        <div className="text-[11.5px] font-bold text-muted uppercase tracking-wider">Shahar</div>
        <button
          type="button"
          onClick={() => setCityOpen((v) => !v)}
          className="w-full flex items-center justify-between gap-2 border border-line-strong rounded-[10px] px-3 py-2.5 text-sm text-ink bg-bg hover:border-brand transition-colors"
          aria-expanded={cityOpen}
        >
          <span className="inline-flex items-center gap-2">
            <MapPin className="w-4 h-4 text-brand" />
            {city}
          </span>
          <ChevronDown className={`w-4 h-4 text-muted transition-transform ${cityOpen ? "rotate-180" : ""}`} />
        </button>
        {cityOpen && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-surface border border-line rounded-xl shadow-lg py-2 z-30 max-h-[260px] overflow-y-auto">
            {cities.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => { setCity(c); setCityOpen(false); }}
                className={`w-full text-left px-4 py-2 text-sm hover:bg-brand-soft flex items-center justify-between ${c === city ? "text-brand font-semibold bg-brand-soft/50" : "text-ink"}`}
              >
                {c}
                {c === city && <Check className="w-4 h-4" />}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Specialty */}
      <div className="flex flex-col gap-2">
        <div className="text-[11.5px] font-bold text-muted uppercase tracking-wider">Mutaxassislik</div>
        <div className="flex flex-col gap-2">
          {specialties.map((s) => {
            const checked = specs.includes(s.slug);
            const count = allDoctors.filter((d) => d.specialtySlug === s.slug).length;
            return (
              <label key={s.slug} className={`flex items-center gap-2.5 cursor-pointer text-[13.5px] ${checked ? "text-ink font-medium" : "text-ink-soft"}`}>
                <span className={`w-[18px] h-[18px] rounded-[5px] border-[1.5px] shrink-0 grid place-items-center ${checked ? "bg-brand border-brand" : "bg-surface border-line-strong"}`}>
                  {checked && <Check className="w-3 h-3 text-white" strokeWidth={3} />}
                </span>
                <input type="checkbox" checked={checked} onChange={() => toggleSpec(s.slug)} className="sr-only" />
                {s.name}
                <span className="ml-auto text-[12px] text-muted tabular-nums">{count}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Price range */}
      <div className="flex flex-col gap-2">
        <div className="text-[11.5px] font-bold text-muted uppercase tracking-wider">Qabul narxi (so&apos;m)</div>
        <div className="flex gap-2">
          <input type="number" value={minPrice} onChange={(e) => setMinPrice(+e.target.value || 0)} step={10000} className="w-full border border-line-strong rounded-lg px-2.5 py-1.5 text-[13px] bg-bg outline-none focus:border-brand" />
          <span className="text-muted self-center">—</span>
          <input type="number" value={maxPrice} onChange={(e) => setMaxPrice(+e.target.value || 0)} step={10000} className="w-full border border-line-strong rounded-lg px-2.5 py-1.5 text-[13px] bg-bg outline-none focus:border-brand" />
        </div>
      </div>

      {/* Rating */}
      <div className="flex flex-col gap-2">
        <div className="text-[11.5px] font-bold text-muted uppercase tracking-wider">Reyting</div>
        <div className="flex flex-col gap-1">
          {[4.5, 4.0, 3.0, 0].map((r) => (
            <label key={r} className={`flex items-center gap-2 cursor-pointer text-[13px] ${minRating === r ? "text-ink font-medium" : "text-ink-soft"}`}>
              <input type="radio" name="rating" checked={minRating === r} onChange={() => setMinRating(r)} className="accent-brand" />
              {r === 0 ? "Barchasi" : `${r}★ va yuqori`}
            </label>
          ))}
        </div>
      </div>

      {/* Availability */}
      <div className="flex flex-col gap-2">
        <div className="text-[11.5px] font-bold text-muted uppercase tracking-wider">Bo&apos;sh vaqti</div>
        <div className="flex flex-wrap gap-1.5">
          {availability.map((a) => {
            const on = avail.includes(a.key);
            return (
              <button key={a.key} onClick={() => toggleAvail(a.key)} className={`px-3 py-1.5 text-[12.5px] rounded-full border transition-colors ${on ? "bg-brand text-white border-brand" : "bg-surface text-ink-soft border-line-strong hover:border-brand hover:text-brand"}`} style={on ? { color: "#fff" } : undefined}>
                {a.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="text-[12.5px] text-muted text-center bg-bg rounded-lg py-2">
        <b className="text-ink tabular-nums">{filtered.length}</b> ta shifokor topildi
      </div>
    </aside>
  );

  return (
    <section className="py-6 lg:py-10 pb-16">
      <div className="container-x grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-4 lg:gap-8 items-start">
        {/* Mobile filter toggle */}
        <button onClick={() => setFiltersOpen((v) => !v)} className="lg:hidden flex items-center justify-between w-full px-4 py-3 bg-surface border border-line-strong rounded-xl font-semibold text-ink">
          <span className="inline-flex items-center gap-2"><Filter className="w-4 h-4 text-brand" />Filtrlar {activeFilterPills.length > 0 && <span className="bg-brand text-white rounded-full px-2 py-0.5 text-[11px] font-bold" style={{ color: "#fff" }}>{activeFilterPills.length}</span>}</span>
          <ChevronDown className={`w-4 h-4 transition-transform ${filtersOpen ? "rotate-180" : ""}`} />
        </button>
        <div className={`${filtersOpen ? "block" : "hidden"} lg:block`}>{sidebar}</div>

        <div className="flex flex-col gap-5">
          {/* Top controls: results count + sort */}
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <div className="text-sm text-ink-soft">
              Topildi: <b className="text-ink tabular-nums">{filtered.length}</b> ta shifokor · <span className="text-brand font-medium">{city}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[13px] text-muted">Saralash:</span>
              <select value={sort} onChange={(e) => setSort(e.target.value as Sort)} className="text-[13.5px] font-medium text-ink bg-surface border border-line-strong rounded-[10px] px-3 py-2 cursor-pointer">
                <option value="rating">Reyting (yuqoridan)</option>
                <option value="price-asc">Narx (arzondan)</option>
                <option value="price-desc">Narx (qimmatdan)</option>
                <option value="experience">Tajriba</option>
              </select>
            </div>
          </div>

          {/* Active filter pills */}
          {activeFilterPills.length > 0 && (
            <div className="bg-surface border border-line rounded-xl px-4 py-3 flex items-center gap-2.5 flex-wrap text-[13px] text-muted">
              <span>Faol filtrlar:</span>
              {activeFilterPills.map((p) => (
                <span key={p.key} className="bg-brand-soft text-brand font-medium px-2.5 py-1 rounded-full inline-flex items-center gap-1.5 text-[12.5px]">
                  {p.label}
                  <button onClick={p.remove} aria-label="O'chirish" className="text-brand"><X className="w-3 h-3" strokeWidth={2.5} /></button>
                </span>
              ))}
              <button onClick={clearAll} className="text-brand font-semibold text-[12.5px] ml-auto hover:underline">Barchasini o&apos;chirish</button>
            </div>
          )}

          {/* Results grid */}
          {pageItems.length > 0 ? (
            <MotionGrid key={`${query}-${specs.join()}-${city}-${sort}-${page}`} className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-5">
              {pageItems.map((doc) => (
                <MotionItem key={doc.id} as="div">
                  <DoctorCard doc={doc} />
                </MotionItem>
              ))}
            </MotionGrid>
          ) : (
            <div className="bg-surface border border-dashed border-line-strong rounded-2xl py-16 text-center">
              <Search className="w-10 h-10 text-muted mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-ink mb-1">Hech narsa topilmadi</h3>
              <p className="text-sm text-ink-soft mb-4">Filtrni kengaytiring yoki boshqa so&apos;z bilan izlang.</p>
              <button onClick={clearAll} className="btn btn-outline btn-sm mx-auto">Filtrlarni tozalash</button>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-1.5 mt-4 flex-wrap">
              <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1} className="inline-flex items-center gap-1 h-9 px-3.5 rounded-[9px] border border-line-strong bg-surface text-ink-soft text-[13.5px] font-medium hover:border-brand hover:text-brand disabled:opacity-50">
                <ChevronLeft className="w-3.5 h-3.5" /> Oldingi
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button key={p} onClick={() => setPage(p)} style={p === page ? { color: "#fff" } : undefined} className={`w-9 h-9 rounded-[9px] grid place-items-center font-semibold ${p === page ? "bg-brand text-white border border-brand" : "border border-line-strong bg-surface text-ink-soft hover:border-brand hover:text-brand"}`}>{p}</button>
              ))}
              <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="inline-flex items-center gap-1 h-9 px-3.5 rounded-[9px] border border-line-strong bg-surface text-ink-soft text-[13.5px] font-medium hover:border-brand hover:text-brand disabled:opacity-50">
                Keyingi <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export function DoctorsCatalog() {
  return (
    <Suspense fallback={<div className="container-x py-12 text-center text-muted">Yuklanmoqda...</div>}>
      <CatalogInner />
    </Suspense>
  );
}
