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
import { CountUp } from "@/components/ui/CountUp";

export function generateStaticParams() {
  return doctors.map((d) => ({ id: d.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const doc = doctors.find((d) => d.id === id);
  if (!doc) return { title: "Shifokor topilmadi" };
  const desc = doc.bio?.slice(0, 160) ?? `${doc.specialty}, ${doc.experience} yil tajriba. Qabulga yoziling.`;
  return {
    title: `${doc.name} — ${doc.specialty}`,
    description: desc,
    alternates: { canonical: `/doctors/${doc.id}` },
    openGraph: {
      title: `${doc.name} — ${doc.specialty}`,
      description: desc,
      type: "profile",
      url: `/doctors/${doc.id}`,
      images: [{ url: doc.photo, alt: doc.name }],
    },
    twitter: { card: "summary_large_image", title: doc.name, description: desc, images: [doc.photo] },
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
      {/* JSON-LD Physician for rich Google results */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Physician",
            name: doc.name,
            image: doc.photo,
            jobTitle: doc.specialty,
            medicalSpecialty: doc.specialty,
            telephone: "+998712000000",
            address: { "@type": "PostalAddress", addressLocality: doc.clinic || "Toshkent", addressCountry: "UZ" },
            aggregateRating: { "@type": "AggregateRating", ratingValue: doc.rating, reviewCount: doc.reviews, bestRating: 5 },
            priceRange: `${doc.price} UZS`,
            url: `/doctors/${doc.id}`,
          }),
        }}
      />

      {/* PAGE HEAD — editorial, matches /doctors style */}
      <section className="relative overflow-hidden pt-16 md:pt-20 pb-16 md:pb-20" style={{ background: "linear-gradient(180deg, #F5F8FD 0%, #EEF3FB 60%, var(--bg) 100%)" }}>
        <div className="absolute top-[15%] right-[8%] w-[480px] h-[480px] rounded-full blur-[80px] opacity-30 pointer-events-none" style={{ background: "radial-gradient(closest-side, rgba(77,148,245,0.35), transparent 70%)" }} />

        <div className="container-wide relative">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-[12.5px] text-muted mb-8">
            <Link href="/" className="hover:text-brand">Bosh sahifa</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/doctors" className="hover:text-brand">Shifokorlar</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-ink font-medium">{doc.name}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr_auto] gap-8 lg:gap-14 items-start">
            {/* Photo tile */}
            <div className="relative rounded-[20px] overflow-hidden aspect-square grid place-items-end justify-center max-w-[260px] mx-auto lg:mx-0 w-full" style={{ background: colorMap[doc.color] }}>
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
                  style={{ filter: "drop-shadow(0 12px 24px rgba(10,31,58,0.18))" }}
                />
              </div>
            </div>

            {/* Main */}
            <div className="flex flex-col gap-4">
              <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand inline-flex items-center gap-2.5">
                <span className="w-8 h-px bg-brand" />
                {doc.specialty} · PhD
              </div>
              <h1 className="font-display font-normal text-ink leading-[0.98] tracking-[-0.025em]" style={{ fontSize: "clamp(42px, 6vw, 80px)" }}>
                Dr. {firstName} <em className="italic text-brand">{lastName}</em>.
              </h1>
              <p className="text-[15px] md:text-[16.5px] text-ink-soft leading-relaxed max-w-[60ch]">
                {doc.credentials ?? "O'zbekiston Respublikasi Sog'liqni saqlash vazirligi tomonidan litsenziyalangan"}
              </p>
              <div className="inline-flex items-center gap-2 text-xs text-accent font-semibold mt-1">
                <CheckCircle2 className="w-4 h-4" />
                Sertifikatlangan mutaxassis
              </div>

              <div className="flex flex-wrap gap-1.5 mt-3">
                {(doc.tags ?? []).map((t) => (
                  <span key={t} className="px-3 py-1.5 bg-brand-soft text-brand text-[12px] font-semibold rounded-full">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-2.5 lg:self-start lg:min-w-[220px] w-full">
              <Link href={`/booking?doctor=${doc.id}`} style={{ color: "#fff" }} className="inline-flex items-center justify-center gap-2 bg-brand hover:bg-brand-ink !text-white px-6 py-4 rounded-2xl font-bold text-[14px] transition-colors shadow-[0_8px_20px_rgba(30,109,216,0.25)]">
                <Calendar className="w-4 h-4" />
                Qabulga yozilish
              </Link>
              <DoctorActions docId={doc.id} docName={doc.name} docPhoto={doc.photo} />
              <div className="mt-3 pt-4 border-t border-line text-center">
                <div className="text-[10.5px] uppercase tracking-wider text-muted font-bold">Qabul narxi</div>
                <div className="font-display font-medium text-ink tabular-nums text-[28px] leading-none mt-1">
                  {(doc.price / 1000).toFixed(0)}k<em className="italic text-brand text-base ml-1 not-italic">so&apos;m</em>
                </div>
              </div>
            </div>
          </div>

          {/* Stats strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-8 pt-10 mt-10 border-t border-line">
            {[
              { num: doc.experience, suffix: " yil",     label: "Umumiy tajriba",    dur: 1.2 },
              { num: doc.rating,     suffix: " ★",       label: `${doc.reviews} sharh`, decimals: 1, dur: 1.4 },
              { num: 3420,           suffix: "",         label: "Qabul qilgan bemor",  dur: 2.0 },
              { num: 98,             suffix: "%",        label: "Qayta murojaat",      dur: 1.6 },
            ].map((s, i) => (
              <div key={i}>
                <div className="font-display font-medium text-ink leading-none tracking-tight tabular-nums inline-flex items-baseline" style={{ fontSize: "clamp(36px, 4vw, 56px)" }}>
                  <CountUp to={s.num} decimals={s.decimals ?? 0} duration={s.dur} />
                  <em className="italic text-brand text-[0.55em] font-normal not-italic">{s.suffix}</em>
                </div>
                <div className="text-[11.5px] uppercase tracking-wider text-ink-soft font-semibold mt-3">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <DoctorTabs reviewCount={doc.reviews} />

      <section className="py-10 pb-16">
        <div className="container-wide grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-6 lg:gap-10 items-start">
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
