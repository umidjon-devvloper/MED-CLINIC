import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { DoctorsCatalog } from "@/components/doctors/DoctorsCatalog";

export const metadata = {
  title: "Shifokorlar katalogi — MED CLINIC",
  description: "140+ sertifikatlangan shifokor. Mutaxassislik, reyting va narx bo'yicha filtrlang.",
};

export default function DoctorsPage() {
  return (
    <>
      {/* page header */}
      <section className="pt-10 pb-7 border-b border-line bg-surface">
        <div className="container-x">
          <div className="flex items-center gap-2 text-[13px] text-muted mb-3">
            <Link href="/" className="hover:text-brand">Bosh sahifa</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-ink font-medium">Shifokorlar</span>
          </div>
          <div className="flex justify-between items-end gap-6 flex-col lg:flex-row">
            <div>
              <h1 className="font-display font-normal text-[32px] md:text-[48px] tracking-tight leading-tight">
                Shifokor <em className="italic text-brand">tanlang</em>
              </h1>
              <div className="text-sm text-muted mt-2">
                140+ sertifikatlangan shifokor · 24 ta mutaxassislik bo&apos;yicha
              </div>
            </div>
            <div className="flex items-center gap-3 w-full lg:w-auto">
              <span className="text-[13px] text-muted whitespace-nowrap">&nbsp;</span>
              <select className="hidden">
                <option>_</option>
                <option>Bo&apos;sh vaqti bor</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      <DoctorsCatalog />
    </>
  );
}
