import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, CheckCircle2, Shield, ArrowRight, Star, Clock, MapPin } from "lucide-react";
import { services } from "@/lib/data/services";
import { doctors } from "@/lib/data/doctors";

const gradientMap: Record<string, string> = {
  red: "linear-gradient(135deg, #FFE4E4 0%, #FFCFCF 100%)",
  purple: "linear-gradient(135deg, #ECE4F8 0%, #DACCF2 100%)",
  skyblue: "linear-gradient(135deg, #DCECFC 0%, #BFDAF6 100%)",
  orange: "linear-gradient(135deg, #FDE8CF 0%, #F7D4A8 100%)",
  cyan: "linear-gradient(135deg, #D6F3F0 0%, #B4E6E0 100%)",
  teal: "linear-gradient(135deg, #D7F0E3 0%, #B4E0C9 100%)",
  deepblue: "linear-gradient(135deg, #D7E8FA 0%, #B5D4F2 100%)",
  pink: "linear-gradient(135deg, #FBE1EB 0%, #F6C6D9 100%)",
};

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const svc = services.find((s) => s.slug === slug);
  if (!svc) return { title: "Xizmat topilmadi" };
  return {
    title: `${svc.name} — MED CLINIC`,
    description: svc.description,
  };
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const svc = services.find((s) => s.slug === slug);
  if (!svc) notFound();

  const relatedDocs = doctors.filter((d) => d.specialtySlug === svc.slug).slice(0, 3);

  const whatIncluded = [
    "Birlamchi konsultatsiya va anamnez",
    "Zarur asboblar bilan ko'rik",
    "Tashxis va davolash rejasi",
    "Keyingi qabulgacha tavsiyalar",
    "Elektron tibbiy xulosa",
  ];

  const preparation = [
    { num: "1", title: "Oldindan yozilish", desc: "Onlayn qabulga yoziling va SMS tasdiqni kuting." },
    { num: "2", title: "Tayyorlash", desc: "Agar kerak bo'lsa ovqatlanish rejimini ko'rib chiqing." },
    { num: "3", title: "Vaqtida kelish", desc: "Qabuldan 15 daqiqa oldin klinikaga tashrif buyuring." },
    { num: "4", title: "Hujjatlar", desc: "Oldingi tahlil va tasvirlar bo'lsa olib keling." },
  ];

  const priceList = [
    { name: `Birlamchi ${svc.name.toLowerCase()} qabuli`, price: svc.priceFrom },
    { name: "Takroriy qabul", price: Math.round(svc.priceFrom * 0.75) },
    { name: "Konsultatsiya + rejani ko'rib chiqish", price: Math.round(svc.priceFrom * 1.2) },
    { name: "Chuqur tashxis", price: Math.round(svc.priceFrom * 1.8) },
  ];

  return (
    <>
      <section className="py-6 md:py-8 bg-surface border-b border-line">
        <div className="container-x">
          <div className="flex items-center gap-2 text-[13px] text-muted">
            <Link href="/" className="hover:text-brand">Bosh sahifa</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/services" className="hover:text-brand">Xizmatlar</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-ink font-medium">{svc.name}</span>
          </div>
        </div>
      </section>

      <section className="py-8 md:py-12">
        <div className="container-x">
          <div className="rounded-3xl p-6 md:p-12 relative overflow-hidden grid md:grid-cols-[auto_1fr] gap-6 md:gap-10 items-center shadow-[0_20px_50px_rgba(10,31,58,0.08)]" style={{ background: gradientMap[svc.color] }}>
            <div className="w-28 h-28 md:w-40 md:h-40 grid place-items-center" style={{ filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.15))" }}>
              {svc.image ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img src={svc.image} alt={svc.name} className="w-full h-full object-contain" />
              ) : (
                <span className="text-7xl md:text-[120px]">{svc.icon}</span>
              )}
            </div>
            <div>
              <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-surface shadow-sm text-brand text-xs font-semibold uppercase tracking-wider rounded-full mb-3">
                {svc.category}
              </span>
              <h1 className="font-display font-normal text-3xl md:text-5xl tracking-tight leading-tight text-ink mb-3">
                {svc.name}
              </h1>
              <p className="text-sm md:text-base text-ink-soft max-w-[50ch] mb-5 leading-relaxed">{svc.description}</p>
              <div className="flex items-center gap-4 flex-wrap">
                <div className="text-sm text-ink-soft">
                  dan <b className="font-display text-2xl md:text-3xl font-medium text-ink tabular-nums">{svc.priceFrom.toLocaleString("uz-UZ")}</b> so&apos;m
                </div>
                <span className="hidden md:inline-block w-px h-6 bg-ink/15" />
                <div className="inline-flex items-center gap-1.5 text-sm text-ink-soft">
                  <Clock className="w-4 h-4" />
                  {svc.duration} daqiqa
                </div>
              </div>
              <div className="flex gap-3 mt-6 flex-wrap">
                <Link href={`/booking?service=${svc.slug}`} className="btn btn-primary btn-lg">
                  Qabulga yozilish
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <a href="tel:+998712000000" className="btn btn-outline btn-lg">Qo&apos;ng&apos;iroq qilish</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-12 md:pb-16">
        <div className="container-x grid lg:grid-cols-3 gap-6 md:gap-8">
          <div className="lg:col-span-2 flex flex-col gap-6 md:gap-8">
            <div className="bg-surface border border-line rounded-2xl p-6 md:p-8">
              <h2 className="font-display font-normal text-2xl md:text-3xl tracking-tight text-ink mb-5">
                Qabulga <em className="italic text-brand">nima kiradi</em>
              </h2>
              <ul className="grid md:grid-cols-2 gap-3">
                {whatIncluded.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm md:text-[14.5px] text-ink-soft">
                    <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-surface border border-line rounded-2xl p-6 md:p-8">
              <h2 className="font-display font-normal text-2xl md:text-3xl tracking-tight text-ink mb-5">
                Qanday <em className="italic text-brand">tayyorlanish</em> kerak
              </h2>
              <div className="grid md:grid-cols-2 gap-3">
                {preparation.map((p) => (
                  <div key={p.num} className="bg-bg border border-line rounded-xl p-4 flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-brand-soft text-brand grid place-items-center font-bold text-sm shrink-0">{p.num}</div>
                    <div>
                      <h3 className="font-semibold text-ink text-sm">{p.title}</h3>
                      <p className="text-xs md:text-[13px] text-ink-soft mt-1 leading-relaxed">{p.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {relatedDocs.length > 0 && (
              <div>
                <h2 className="font-display font-normal text-2xl md:text-3xl tracking-tight text-ink mb-5">
                  Shu yo&apos;nalish <em className="italic text-brand">shifokorlari</em>
                </h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
                  {relatedDocs.map((doc) => (
                    <Link href={`/doctors/${doc.id}`} key={doc.id} className="bg-surface border border-line rounded-2xl p-4 flex gap-3 items-center hover:border-brand transition-colors">
                      <div className="w-14 h-14 rounded-xl bg-brand-soft overflow-hidden shrink-0 grid place-items-end">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={doc.photo} alt={doc.name} className="w-full h-full object-cover object-top" />
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-bold text-ink text-sm truncate">{doc.name}</h3>
                        <div className="text-[12px] text-brand font-semibold truncate">{doc.specialty} · {doc.experience} yil</div>
                        <div className="inline-flex items-center gap-1 text-[11.5px] text-muted mt-1">
                          <Star className="w-3 h-3 text-warn fill-warn" />
                          <b className="text-ink">{doc.rating}</b> · {doc.reviews}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          <aside className="flex flex-col gap-5">
            <div className="bg-surface border border-line rounded-2xl p-6 shadow-md sticky top-4">
              <h3 className="font-display font-medium text-lg text-ink mb-4">Narx jadvali</h3>
              <div className="flex flex-col divide-y divide-line">
                {priceList.map((row) => (
                  <div key={row.name} className="flex justify-between items-center py-3 text-sm">
                    <span className="text-ink-soft pr-3">{row.name}</span>
                    <span className="font-display font-medium text-ink tabular-nums whitespace-nowrap">{row.price.toLocaleString("uz-UZ")} <span className="text-xs text-muted">so&apos;m</span></span>
                  </div>
                ))}
              </div>
              <Link href={`/booking?service=${svc.slug}`} className="btn btn-primary btn-lg justify-center w-full mt-5">
                Qabulga yozilish
                <ArrowRight className="w-4 h-4" />
              </Link>
              <div className="flex gap-2 mt-4 px-3.5 py-3 bg-accent-soft rounded-xl text-[12.5px]" style={{ color: "#0E6B4A" }}>
                <Shield className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                SMS tasdiqlash · Bepul bekor qilish · Qaytarish kafolati
              </div>
            </div>

            <div className="bg-ink text-white rounded-2xl p-5">
              <h3 className="font-display text-lg mb-2">Qaysi klinikada bor?</h3>
              <p className="text-sm opacity-80 mb-3">Ushbu xizmat 6 ta klinikaning har birida mavjud. Eng yaqin filialni tanlang.</p>
              <Link href="/clinics" className="inline-flex items-center gap-1 text-[#BBD1EC] text-sm font-semibold">
                <MapPin className="w-4 h-4" /> Xaritada ko&apos;rish
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </aside>
        </div>
      </section>

      <section className="pb-16 md:pb-24">
        <div className="container-x">
          <div className="rounded-3xl p-8 md:p-14 text-white relative overflow-hidden grid md:grid-cols-[1.3fr_auto] gap-6 items-center" style={{ background: "linear-gradient(135deg, var(--brand-ink) 0%, var(--brand) 100%)" }}>
            <div className="relative z-10">
              <h2 className="font-display font-normal text-2xl md:text-4xl mb-3 tracking-tight leading-tight">
                Savolingiz <em className="italic text-[#BBD1EC]">bormi?</em>
              </h2>
              <p className="text-sm md:text-base opacity-90">Call-center bilan bog&apos;laning yoki onlayn forma orqali so&apos;rang.</p>
            </div>
            <div className="flex gap-3 flex-wrap">
              <a href="tel:+998712000000" className="btn btn-lg bg-white text-brand-ink">+998 71 200 00 00</a>
              <Link href="/contact" className="btn btn-lg btn-ghost text-white border border-white/30">Yozish</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
