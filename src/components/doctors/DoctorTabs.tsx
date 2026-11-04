"use client";

import { useEffect, useState } from "react";

const tabs = [
  { id: "about", label: "Haqida" },
  { id: "education", label: "Ta'lim va tajriba" },
  { id: "services", label: "Xizmatlar" },
  { id: "reviews", label: "Sharhlar" },
  { id: "schedule", label: "Jadval" },
];

export function DoctorTabs({ reviewCount }: { reviewCount: number }) {
  const [active, setActive] = useState("about");

  useEffect(() => {
    const sections = tabs.map((t) => document.getElementById(t.id)).filter(Boolean) as HTMLElement[];
    if (sections.length === 0) return;
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: [0, 0.25, 0.5, 1] }
    );
    sections.forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  const onClick = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 90;
      window.scrollTo({ top: y, behavior: "smooth" });
      setActive(id);
    }
  };

  return (
    <div className="bg-surface border-b border-line sticky top-0 z-10 shadow-sm">
      <div className="container-x">
        <div className="flex gap-6 md:gap-8 overflow-x-auto scrollbar-hide">
          {tabs.map((t) => {
            const isActive = active === t.id;
            const label = t.id === "reviews" ? `${t.label} (${reviewCount})` : t.label;
            return (
              <a
                key={t.id}
                href={`#${t.id}`}
                onClick={onClick(t.id)}
                className={`py-5 text-[14.5px] whitespace-nowrap relative transition-colors ${isActive ? "text-ink font-semibold" : "text-ink-soft font-medium hover:text-brand"}`}
              >
                {label}
                {isActive && <span className="absolute left-0 right-0 bottom-0 h-0.5 bg-brand" />}
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}
