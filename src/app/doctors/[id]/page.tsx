import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ChevronRight,
  CheckCircle2,
  Calendar,
  MapPin,
  Star,
} from "lucide-react";
import { doctors } from "@/lib/data/doctors";
import { DoctorTabs } from "@/components/doctors/DoctorTabs";
import { DoctorActions } from "@/components/doctors/DoctorActions";
import { DoctorBookingWidget } from "@/components/doctors/DoctorBookingWidget";
import { MotionReveal } from "@/components/ui/motion";

export function generateStaticParams() {
  return doctors.map((d) => ({ id: d.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const doc = doctors.find((d) => d.id === id);
  if (!doc) return { title: "Shifokor topilmadi" };
  return {
    title: `${doc.name} — ${doc.specialty} · MED CLINIC`,
    description: doc.bio?.slice(0, 160) ?? `${doc.specialty}, ${doc.experience} yil tajriba. Qabulga yoziling.`,
  };
}

const colorMap: Record<string, string> = {
  blue: "linear-gradient(165deg, #D7E8FA 0%, #B5D4F2 100%)",
  mint: "linear-gradient(165deg, #D7F0E3 0%, #B4E0C9 100%)",
  lavender: "linear-gradient(165deg, #E4DFF5 0%, #C9BFE8 100%)",
  pink: "linear-gradient(165deg, #F5DFE8 0%, #ECC2D4 100%)",
};

const education = [
  {
    year: "2010",
    title: "Toshkent Tibbiyot Akademiyasi",
    desc: "Davolash fakulteti · Imtiyozli diplom",
    where: "Toshkent, O'zbekiston",
  },
  {
    year: "2013",
    title: "Vena Universiteti · Residentura",
    desc: "Kardiologiya bo'yicha 3 yillik ixtisoslashuv",
    where: "Vena, Avstriya",
  },
  {
    year: "2018",
    title: "PhD · Kardiologiya",
    desc: "\"Yoshlar orasida koronar yurak kasalligi\" — doktorlik dissertatsiyasi",
    where: "",
  },
  {
    year: "2021",
    title: "ESC Fellowship",
    desc: "Yevropa Kardiologiya Jamiyati sertifikat dasturi",
    where: "",
  },
];

const extraServices = [
  { name: "Birlamchi konsultatsiya", price: 250000 },
  { name: "Takroriy qabul", price: 180000 },
  { name: "EKG + sharhlash", price: 120000 },
  { name: "EXO (Yurak UZI)", price: 350000 },
  { name: "Holter monitoring", price: 480000 },
  { name: "Stress-test", price: 520000 },
];

const reviews = [
  {
    name: "Madina K.",
    date: "3 kun oldin",
    initials: "MK",
    bg: "linear-gradient(135deg, var(--brand-soft), var(--brand))",
    stars: 5,
    text: "Juda professional va diqqatli shifokor. Barcha savollarimga sabrlilik bilan javob berdi, davolash rejasini batafsil tushuntirdi. EKG tahlili bir necha daqiqada tayyor bo'ldi. Rahmat!",
  },
  {
    name: "Bobur T.",
    date: "1 hafta oldin",
    initials: "BT",
    bg: "linear-gradient(135deg, var(--accent-soft), var(--accent))",
    stars: 5,
    text: "5 yildan beri Alisher aka'ga qatnayman. Oilamizning kardiologi. Doim o'z vaqtida qabul qiladi, hech qachon shoshilmaydi. Narx-sifat nisbati a'lo.",
  },
  {
    name: "Nozima R.",
    date: "2 hafta oldin",
    initials: "NR",
    bg: "linear-gradient(135deg, #E89C32, #B8731A)",
    stars: 4,
    text: "Yaxshi mutaxassis, tashxisni to'g'ri qo'ydi. Faqat navbat biroz uzoqroq edi — oldindan tayyorlanish kerak ekan.",
  },
];

export default async function DoctorProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const doc = doctors.find((d) => d.id === id);
  if (!doc) notFound();

  const [firstName, ...rest] = doc.name.replace("Dr. ", "").split(" ");
  const lastName = rest.join(" ");

  return (
    <>
      {/* breadcrumb */}
      <div className="bg-surface border-b border-line py-4">
        <div className="container-x flex items-center gap-2 text-[13px] text-muted">
          <Link href="/" className="hover:text-brand">Bosh sahifa</Link>
          <ChevronRight className="w-3 h-3" />
          <Link href="/doctors" className="hover:text-brand">Shifokorlar</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-ink font-medium">{doc.name}</span>
        </div>
      </div>

      {/* hero */}
      <section className="py-12 bg-surface border-b border-line relative overflow-hidden">
        <div className="absolute -top-[200px] -right-[200px] w-[500px] h-[500px] pointer-events-none" style={{ background: "radial-gradient(closest-side, var(--brand-soft), transparent 70%)" }} />
        <div className="container-x relative z-10 grid grid-cols-1 lg:grid-cols-[220px_1fr_auto] gap-6 lg:gap-10 items-start">
          <div className="relative rounded-2xl overflow-hidden aspect-square grid place-items-end justify-center max-w-[220px] mx-auto lg:mx-0" style={{ background: colorMap[doc.color] }}>
            <span className="absolute top-3.5 left-3.5 bg-surface text-accent text-[11.5px] font-semibold px-2.5 py-1 rounded-full inline-flex items-center gap-1.5 shadow-sm z-20">
              <span className="w-1.5 h-1.5 rounded-full bg-accent shadow-[0_0_8px_var(--accent)]" />
              Hozir onlayn
            </span>
            <div className="relative z-10 w-full h-full flex items-end justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={doc.photo}
                alt={doc.name}
                className="max-w-[95%] max-h-full object-contain object-bottom"
                style={{ filter: "drop-shadow(0 10px 20px rgba(10,31,58,0.15))" }}
              />
            </div>
          </div>

          <div className="flex flex-col gap-2.5">
            <div className="flex items-center gap-3 flex-wrap">
              <span className="text-[13px] text-brand font-semibold uppercase tracking-wider">{doc.specialty} · PhD</span>
              <span className="inline-flex items-center gap-1 text-xs text-accent font-medium">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Sertifikatlangan
              </span>
            </div>
            <h1 className="font-display font-normal text-[36px] md:text-[56px] tracking-tight leading-none my-1">
              Dr. {firstName} <em className="italic text-brand">{lastName}</em>
            </h1>
            <p className="text-[15px] text-ink-soft my-1 mb-4">
              {doc.credentials ?? "O'zbekiston Respublikasi Sog'liqni saqlash vazirligi tomonidan litsenziyalangan"}
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-3 mb-5 px-5 py-5 bg-bg border border-line rounded-2xl">
              <div className="flex flex-col gap-0.5">
                <div className="font-display font-medium text-[28px] text-ink tracking-tight leading-none tabular-nums">
                  {doc.experience}<em className="italic text-brand text-xl"> yil</em>
                </div>
                <div className="text-[11.5px] text-muted mt-1.5">Umumiy tajriba</div>
              </div>
              <div className="flex flex-col gap-0.5">
                <div className="font-display font-medium text-[28px] text-ink tracking-tight leading-none tabular-nums inline-flex items-baseline gap-1">
                  {doc.rating} <span className="text-warn text-xl">★</span>
                </div>
                <div className="text-[11.5px] text-muted mt-1.5">O&apos;rtacha reyting ({doc.reviews})</div>
              </div>
              <div className="flex flex-col gap-0.5">
                <div className="font-display font-medium text-[28px] text-ink tracking-tight leading-none tabular-nums">3 420</div>
                <div className="text-[11.5px] text-muted mt-1.5">Qabul qilgan bemor</div>
              </div>
              <div className="flex flex-col gap-0.5">
                <div className="font-display font-medium text-[28px] text-ink tracking-tight leading-none tabular-nums">
                  98<em className="italic text-brand text-xl">%</em>
                </div>
                <div className="text-[11.5px] text-muted mt-1.5">Qayta murojaat</div>
              </div>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {(doc.tags ?? []).map((t) => (
                <span key={t} className="px-3 py-1.5 bg-brand-soft text-brand text-xs font-medium rounded-full">
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-2 lg:self-start min-w-full lg:min-w-[180px]">
            <Link href={`/booking?doctor=${doc.id}`} className="btn btn-primary btn-lg justify-center">
              <Calendar className="w-4 h-4" />
              Qabulga yozilish
            </Link>
            <DoctorActions docId={doc.id} docName={doc.name} />
          </div>
        </div>
      </section>

      <DoctorTabs reviewCount={doc.reviews} />

      {/* detail */}
      <section className="py-10 pb-16">
        <div className="container-x grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-6 lg:gap-10 items-start">
          <div>
            <MotionReveal as="div" className="mb-6"><div id="about" className="bg-surface border border-line rounded-2xl p-5 md:p-8 scroll-mt-24">
              <h2 className="font-display font-normal text-[22px] md:text-[28px] tracking-tight leading-tight mb-4">
                Shifokor <em className="italic text-brand">haqida</em>
              </h2>
              <div className="text-sm md:text-[15px] leading-relaxed text-ink-soft max-w-[65ch] flex flex-col gap-4">
                <p>{doc.bio ?? "Tajribali mutaxassis, zamonaviy davolash usullarini qo'llaydi."}</p>
                <p>
                  Yurak-qon tomir kasalliklari — koronar yurak kasalligi, gipertoniya, aritmiya va yurak etishmovchiligi
                  tashxislashda yetakchi mutaxassislardan biri. Zamonaviy EXO va stress-test apparatlari bilan ishlaydi.
                </p>
                <p>Qabul: inglizcha, ruscha va o&apos;zbekcha. Bolalar va kattalar bilan ishlaydi.</p>
              </div>
            </div></MotionReveal>
            <MotionReveal as="div" className="mb-6"><div id="education" className="bg-surface border border-line rounded-2xl p-5 md:p-8 scroll-mt-24">
              <h2 className="font-display font-normal text-[22px] md:text-[28px] tracking-tight leading-tight mb-4">
                Ta&apos;lim va <em className="italic text-brand">tajriba</em>
              </h2>
              <div className="flex flex-col gap-5 mt-4">
                {education.map((e, i) => (
                  <div key={e.year} className={`grid grid-cols-1 md:grid-cols-[100px_1fr] gap-2 md:gap-5 py-4 ${i > 0 ? "border-t border-line" : ""}`}>
                    <div className="font-display text-xl text-brand font-medium tabular-nums tracking-tight">{e.year}</div>
                    <div>
                      <h3 className="text-[15px] font-semibold text-ink mb-1.5">{e.title}</h3>
                      <p className="text-[13.5px] text-ink-soft leading-relaxed">{e.desc}</p>
                      {e.where && (
                        <div className="text-[12.5px] text-muted mt-1.5 inline-flex items-center gap-1.5">
                          <MapPin className="w-3 h-3" />
                          {e.where}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div></MotionReveal>
            <MotionReveal as="div" className="mb-6"><div id="services" className="bg-surface border border-line rounded-2xl p-5 md:p-8 scroll-mt-24">
              <h2 className="font-display font-normal text-[22px] md:text-[28px] tracking-tight leading-tight mb-4">
                Taklif qilinadigan <em className="italic text-brand">xizmatlar</em>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
                {extraServices.map((s) => (
                  <div key={s.name} className="flex justify-between items-center px-4 py-3.5 bg-bg border border-line rounded-[10px] text-sm">
                    <span className="text-ink font-medium">{s.name}</span>
                    <span className="font-display font-medium text-brand tabular-nums">{s.price.toLocaleString("uz-UZ")}</span>
                  </div>
                ))}
              </div>
            </div></MotionReveal>
            <MotionReveal as="div"><div id="reviews" className="bg-surface border border-line rounded-2xl p-5 md:p-8 scroll-mt-24">
              <h2 className="font-display font-normal text-[22px] md:text-[28px] tracking-tight leading-tight mb-4">
                Bemor <em className="italic text-brand">sharhlari</em>
              </h2>
              <div className="flex flex-col gap-5 mt-2">
                {reviews.map((r, i) => (
                  <div key={r.name} className={`py-5 ${i > 0 ? "border-t border-line" : "pt-2"}`}>
                    <div className="flex justify-between items-center mb-2.5 flex-wrap gap-2">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full text-white grid place-items-center font-bold text-[13px]" style={{ background: r.bg }}>
                          {r.initials}
                        </div>
                        <div>
                          <div className="font-semibold text-sm text-ink">{r.name}</div>
                          <div className="text-xs text-muted">{r.date}</div>
                        </div>
                      </div>
                      <div className="inline-flex gap-0.5 text-warn">
                        {Array.from({ length: 5 }).map((_, k) => (
                          <Star key={k} className={`w-3.5 h-3.5 ${k < r.stars ? "fill-current" : "text-[#D4E0ED] fill-[#D4E0ED]"}`} />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm leading-relaxed text-ink-soft m-0 mt-2">{r.text}</p>
                  </div>
                ))}
              </div>
              <div className="mt-6 text-center">
                <Link href="#reviews" className="btn btn-outline">
                  Barcha {doc.reviews} sharhni ko&apos;rish
                </Link>
              </div>
            </div></MotionReveal>
          </div>

          <DoctorBookingWidget docId={doc.id} price={doc.price} />
        </div>
      </section>
    </>
  );
}
