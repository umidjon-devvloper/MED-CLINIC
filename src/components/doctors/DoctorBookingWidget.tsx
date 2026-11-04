"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronDown, ChevronRight, Shield } from "lucide-react";
import { useToast } from "@/components/ui/Toast";

const dow = ["Du", "Se", "Ch", "Pa", "Ju", "Sh", "Ya"];
const monthDays = [
  { d: 27, dis: true }, { d: 28, dis: true }, { d: 29, dis: true }, { d: 30, dis: true }, { d: 31, dis: true }, { d: 1 }, { d: 2 },
  { d: 3, has: true }, { d: 4, has: true, today: true }, { d: 5, has: true }, { d: 6 }, { d: 7, has: true }, { d: 8 }, { d: 9 },
  { d: 10, has: true }, { d: 11, has: true }, { d: 12 }, { d: 13, has: true }, { d: 14, has: true }, { d: 15 }, { d: 16 },
  { d: 17, has: true }, { d: 18 }, { d: 19, has: true }, { d: 20, has: true }, { d: 21, has: true }, { d: 22 }, { d: 23 },
  { d: 24, has: true }, { d: 25, has: true }, { d: 26, has: true }, { d: 27 }, { d: 28, has: true }, { d: 29 }, { d: 30 },
];

const times = [
  { t: "09:00", off: true }, { t: "09:30" }, { t: "10:00", off: true }, { t: "10:30" },
  { t: "11:00" }, { t: "11:30", off: true },
  { t: "13:00" }, { t: "13:30" }, { t: "14:30" }, { t: "15:00" },
  { t: "15:30" }, { t: "16:00", off: true },
];

export function DoctorBookingWidget({ docId, price }: { docId: string; price: number }) {
  const [selectedDay, setSelectedDay] = useState(7);
  const [selectedTime, setSelectedTime] = useState("14:30");
  const toast = useToast();

  const onConfirm = (e: React.MouseEvent) => {
    if (!selectedDay || !selectedTime) {
      e.preventDefault();
      toast.show("Sana va vaqtni tanlang", "error");
    }
  };

  return (
    <aside id="schedule" className="bg-surface border border-line rounded-[20px] p-5 lg:p-7 lg:sticky lg:top-20 shadow-md flex flex-col gap-5 scroll-mt-24">
      <div className="flex justify-between items-baseline pb-5 border-b border-line">
        <span className="text-[12.5px] text-muted uppercase tracking-wider font-semibold">Qabul narxi</span>
        <span className="font-display text-[30px] font-medium tabular-nums text-ink tracking-tight">
          {price.toLocaleString("uz-UZ")}<em className="italic text-brand text-lg ml-1">so&apos;m</em>
        </span>
      </div>

      <div>
        <h3 className="text-sm font-bold text-ink flex justify-between items-center mb-3">
          Sanani tanlang
          <span className="text-[13px] text-muted font-medium inline-flex items-center gap-1">
            Noyabr 2026 <ChevronDown className="w-2.5 h-2.5" strokeWidth={2.5} />
          </span>
        </h3>
        <div className="grid grid-cols-7 gap-1">
          {dow.map((d) => (
            <div key={d} className="text-[10.5px] text-muted text-center font-semibold uppercase tracking-wider py-1">
              {d}
            </div>
          ))}
          {monthDays.map((cell, i) => {
            const selected = !cell.dis && cell.d === selectedDay && cell.has;
            const clickable = !cell.dis && cell.has;
            return (
              <button
                key={i}
                type="button"
                onClick={() => clickable && setSelectedDay(cell.d)}
                disabled={!clickable}
                style={selected ? { color: "#fff" } : undefined}
                className={`aspect-square grid place-items-center text-[13px] font-medium rounded-lg tabular-nums relative transition-colors ${
                  cell.dis
                    ? "text-muted opacity-40 cursor-not-allowed"
                    : selected
                    ? "bg-brand text-white font-bold"
                    : cell.has
                    ? "text-ink hover:bg-brand-soft hover:text-brand cursor-pointer"
                    : "text-muted/50 cursor-not-allowed"
                }`}
              >
                {cell.d}
                {cell.today && !selected && <span className="absolute bottom-[3px] left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-brand" />}
                {cell.has && !selected && <span className="absolute top-[3px] right-[3px] w-[5px] h-[5px] rounded-full bg-accent" />}
                {cell.has && selected && <span className="absolute top-[3px] right-[3px] w-[5px] h-[5px] rounded-full bg-white" />}
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <div className="text-[12.5px] text-muted mb-2 uppercase tracking-wider font-semibold">
          Bo&apos;sh vaqtlar — {selectedDay}-noyabr
        </div>
        <div className="grid grid-cols-4 gap-1.5">
          {times.map((t) => {
            const selected = t.t === selectedTime && !t.off;
            return (
              <button
                key={t.t}
                type="button"
                onClick={() => !t.off && setSelectedTime(t.t)}
                disabled={t.off}
                style={selected ? { color: "#fff" } : undefined}
                className={`py-2 text-center text-[12.5px] font-medium border rounded-lg tabular-nums transition-colors ${
                  t.off
                    ? "text-muted bg-bg border-line line-through opacity-60 cursor-not-allowed"
                    : selected
                    ? "bg-brand text-white border-brand font-bold"
                    : "text-ink border-line-strong bg-surface hover:border-brand hover:text-brand cursor-pointer"
                }`}
              >
                {t.t}
              </button>
            );
          })}
        </div>
      </div>

      <Link
        href={`/booking?doctor=${docId}&date=2026-11-${String(selectedDay).padStart(2, "0")}&time=${selectedTime}`}
        onClick={onConfirm}
        className="btn btn-primary btn-lg justify-center"
      >
        Qabulni tasdiqlash
        <ChevronRight className="w-4 h-4" />
      </Link>

      <div className="flex gap-2 text-[12.5px] p-3.5 rounded-[10px]" style={{ background: "var(--accent-soft)", color: "#0E6B4A" }}>
        <Shield className="w-4 h-4 text-accent shrink-0 mt-0.5" />
        SMS tasdiqlash · Bepul bekor qilish · Qaytarish kafolati
      </div>
    </aside>
  );
}
