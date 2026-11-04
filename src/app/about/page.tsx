import Link from "next/link";
import { Shield, Sparkles, Heart, Award, Users, ArrowRight, ArrowUpRight, ChevronRight, Building2, Stethoscope, Smile } from "lucide-react";
import { CountUp } from "@/components/ui/CountUp";

const stats = [
  { num: 140,  em: "+",  label: "Sertifikatlangan shifokor", icon: Stethoscope, dur: 1.8 },
  { num: 6,    em: "",   label: "Zamonaviy klinika",         icon: Building2,   dur: 1.2 },
  { num: 60,   em: "+",  label: "Tibbiy xizmat",             icon: Sparkles,    dur: 1.4 },
  { num: 25,   em: "k+", label: "Mamnun bemor",              icon: Smile,       dur: 1.6 },
];

const values = [
  { icon: Shield,    title: "Professionalism",  desc: "Barcha shifokorlarimiz sertifikatlangan, muntazam malaka oshirish kurslarida qatnashadi va xalqaro standartlarga javob beradi." },
  { icon: Sparkles,  title: "Innovatsiya",       desc: "Zamonaviy MRT, UZI, laboratoriya texnikasi va onlayn platforma. Davolashning so'nggi usullarini qo'llaymiz." },
  { icon: Heart,     title: "Bemor-markazli",    desc: "Har bir bemor uchun individual yondashuv. Diqqatli xizmat, qulay vaqt rejasi va natijalarni elektron shaklda yetkazamiz." },
];

const team = [
  { name: "Dr. Alisher Qodirov",  role: "Bosh vrach · Kardiologiya",      photo: "/images/doctors/alisher.webp" },
  { name: "Dr. Nozima Rahimova",  role: "Pediatriya bo'limi mudiri",       photo: "/images/doctors/nozima.webp" },
  { name: "Dr. Sardor Yusupov",   role: "Nevrologiya mutaxassisi",         photo: "/images/doctors/sardor.webp" },
  { name: "Dr. Dilnoza Karimova", role: "Dermatologiya bo'limi mudiri",    photo: "/images/doctors/dilnoza.webp" },
];

const timeline = [
  { year: "2015", title: "Boshlanish",     desc: "Toshkent markazida kichik klinika — 8 shifokor, 1 filial." },
  { year: "2019", title: "Kengayish",       desc: "Shahar bo'ylab 3 ta yangi filial, 60+ shifokor jamoasi." },
  { year: "2023", title: "Onlayn platforma", desc: "Veb va mobil ilova. Onlayn qabul, tahlil natijalari." },
  { year: "2026", title: "AI tibbiyot",      desc: "Shifokor tavsiyalari, telemeditsina va elektron karta." },
];

export default function AboutPage() {
  return (
    <>
      <section className="relative overflow-hidden pt-16 md:pt-20 pb-16 md:pb-20" style={{ background: "linear-gradient(180deg, #F5F8FD 0%, #EEF3FB 60%, var(--bg) 100%)" }}>
        <div className="absolute top-[15%] right-[8%] w-[480px] h-[480px] rounded-full blur-[80px] opacity-30 pointer-events-none" style={{ background: "radial-gradient(closest-side, rgba(77,148,245,0.35), transparent 70%)" }} />

        <div className="container-wide relative">
          <div className="flex items-center gap-2 text-[12.5px] text-muted mb-8">
            <Link href="/" className="hover:text-brand">Bosh sahifa</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-ink font-medium">Biz haqimizda</span>
          </div>

          <div className="grid lg:grid-cols-[1fr_auto] gap-10 lg:gap-16 items-end">
            <div className="max-w-[920px]">
              <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand mb-5 inline-flex items-center gap-2.5">
                <span className="w-8 h-px bg-brand" />
                Biz haqimizda · 2026
              </div>
              <h1 className="font-display font-normal text-ink leading-[0.98] tracking-[-0.025em]" style={{ fontSize: "clamp(42px, 7vw, 92px)" }}>
                Sog&apos;lom <em className="italic text-brand">O&apos;zbekiston</em> uchun.
              </h1>
              <p className="text-[15px] md:text-[17px] text-ink-soft mt-6 max-w-[60ch] leading-relaxed">
                MED CLINIC — 2015 yildan beri O&apos;zbekistonda zamonaviy tibbiy xizmatlar ko&apos;rsatib kelayotgan professional platforma.
                Har bir bemorga tez, qulay va yuqori sifatli tibbiy yordam.
              </p>
            </div>

            <div className="lg:min-w-[220px] lg:border-l lg:border-line lg:pl-10">
              <div className="text-[11px] uppercase tracking-wider text-muted font-bold mb-2">Asos solingan</div>
              <div className="font-display font-medium text-ink tabular-nums leading-none tracking-tight" style={{ fontSize: "clamp(32px, 4vw, 48px)" }}>2015</div>
              <div className="text-[13px] text-ink-soft mt-2">10+ yillik tibbiy tajriba</div>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-16 md:pb-24">
        <div className="container-wide">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10 pt-10 border-t border-line">
            {stats.map((s, i) => (
              <div key={i}>
                <div className="font-display font-medium text-ink leading-none tracking-tight tabular-nums inline-flex items-baseline gap-1" style={{ fontSize: "clamp(42px, 5vw, 64px)" }}>
                  <CountUp to={s.num} duration={s.dur} />
                  {s.em && <em className="italic text-brand text-[0.6em] font-normal">{s.em}</em>}
                </div>
                <div className="mt-3 flex items-center gap-2 text-[12.5px] uppercase tracking-wider text-ink-soft font-semibold">
                  <s.icon className="w-3.5 h-3.5 text-brand" />
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-surface border-y border-line">
        <div className="container-wide">
          <div className="grid lg:grid-cols-[1fr_1fr] gap-12 lg:gap-20 items-start">
            <div>
              <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand mb-5 inline-flex items-center gap-2.5">
                <span className="w-8 h-px bg-brand" />
                Tariximiz
              </div>
              <h2 className="font-display font-normal text-ink leading-[0.98] tracking-[-0.025em]" style={{ fontSize: "clamp(36px, 5.5vw, 68px)" }}>
                10 yillik <em className="italic text-brand">tajriba</em>.
              </h2>
              <div className="text-[15px] md:text-[16.5px] text-ink-soft leading-relaxed mt-7 flex flex-col gap-5">
                <p>
                  2015 yilda Toshkent markazida kichik klinika sifatida boshlangan MED CLINIC bugungi kunda O&apos;zbekistonning yetakchi tibbiy brendlaridan biriga aylandi.
                </p>
                <p>
                  Shahar bo&apos;ylab 6 ta zamonaviy filial, 140+ shifokor va 60+ xizmat turi — bizning birgalikdagi natijamiz. Har kuni 500+ bemor bizga ishonib qabulga keladi.
                </p>
              </div>
              <div className="inline-flex items-center gap-3 mt-7 bg-warn-soft/60 border border-warn/20 rounded-2xl px-5 py-4">
                <Award className="w-6 h-6 text-warn shrink-0" />
                <div>
                  <div className="font-bold text-sm text-ink">Eng yaxshi klinika</div>
                  <div className="text-[12px] text-ink-soft">O&apos;zbekiston 2024</div>
                </div>
              </div>
            </div>

            <div className="flex flex-col">
              {timeline.map((t, i) => (
                <div key={t.year} className={`grid grid-cols-[80px_1fr] gap-6 py-6 ${i > 0 ? "border-t border-line" : ""}`}>
                  <div className="font-display italic font-normal text-brand text-[32px] md:text-[40px] leading-none tracking-tight tabular-nums">
                    {t.year}
                  </div>
                  <div>
                    <h3 className="font-bold text-ink text-[16px] md:text-[18px] tracking-tight">{t.title}</h3>
                    <p className="text-[13.5px] md:text-[14.5px] text-ink-soft leading-relaxed mt-1.5">{t.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container-wide">
          <div className="mb-12 md:mb-16 max-w-[640px]">
            <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand mb-5 inline-flex items-center gap-2.5">
              <span className="w-8 h-px bg-brand" />
              Qadriyatlar
            </div>
            <h2 className="font-display font-normal text-ink leading-[0.98] tracking-[-0.025em]" style={{ fontSize: "clamp(36px, 5.5vw, 68px)" }}>
              Nima uchun <em className="italic text-brand">bizni</em>.
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-px bg-line border border-line rounded-2xl overflow-hidden">
            {values.map((v, i) => (
              <div key={i} className="bg-surface p-8 md:p-10 flex flex-col gap-4 hover:bg-bg transition-colors">
                <div className="w-12 h-12 rounded-xl bg-brand-soft text-brand grid place-items-center">
                  <v.icon className="w-6 h-6" />
                </div>
                <h3 className="font-display font-normal text-xl md:text-2xl tracking-tight text-ink mt-2">{v.title}</h3>
                <p className="text-[14px] text-ink-soft leading-relaxed">{v.desc}</p>
                <span className="font-display italic text-brand/50 text-[48px] leading-none tabular-nums mt-4">0{i + 1}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-surface border-y border-line">
        <div className="container-wide">
          <div className="flex items-end justify-between gap-8 flex-wrap mb-12 md:mb-16">
            <div className="max-w-[640px]">
              <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand mb-5 inline-flex items-center gap-2.5">
                <Users className="w-3 h-3" />
                Jamoa
              </div>
              <h2 className="font-display font-normal text-ink leading-[0.98] tracking-[-0.025em]" style={{ fontSize: "clamp(36px, 5.5vw, 68px)" }}>
                Bosh <em className="italic text-brand">mutaxassislarimiz</em>.
              </h2>
            </div>
            <Link href="/doctors" className="group inline-flex items-center gap-2 text-brand hover:text-brand-ink font-semibold text-[14px] border-b-2 border-brand pb-1 transition-colors self-end">
              Barcha shifokorlar
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-5">
            {team.map((t, i) => (
              <div key={i} className="bg-bg border border-line rounded-2xl overflow-hidden p-2 md:p-3 hover:-translate-y-1 transition-transform">
                <div className="aspect-[4/5] rounded-xl relative overflow-hidden" style={{ background: "linear-gradient(165deg, #D7E8FA, #B5D4F2)" }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={t.photo} alt={t.name} className="w-full h-full object-cover object-top" />
                </div>
                <div className="px-2 pt-3 pb-2">
                  <div className="font-bold text-[13px] md:text-sm text-ink">{t.name}</div>
                  <div className="text-[11.5px] md:text-[12.5px] text-brand font-medium mt-0.5">{t.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 md:py-16">
        <div className="container-wide">
          <div className="text-center text-[11px] text-muted uppercase tracking-[0.2em] font-bold mb-8">
            Sertifikatlar va litsenziyalar
          </div>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16 opacity-60">
            {["Sog'liq Vazirligi", "ISO 9001:2015", "ESC a'zosi", "WHO sheriklik", "AMA Partner"].map((p) => (
              <div key={p} className="text-ink-soft font-display font-medium text-base md:text-xl tracking-tight italic">
                {p}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-20 lg:pb-28">
        <div className="container-wide">
          <div className="rounded-[28px] p-10 md:p-16 lg:p-20 text-white relative overflow-hidden grid md:grid-cols-[1.4fr_auto] gap-8 items-center" style={{ background: "linear-gradient(135deg, var(--brand-ink) 0%, var(--brand) 100%)", color: "#fff" }}>
            <div className="absolute bottom-[-120px] right-[-120px] w-[500px] h-[500px] rounded-full" style={{ background: "radial-gradient(closest-side, rgba(255,255,255,.1), transparent 70%)" }} />
            <div className="absolute top-0 left-0 h-px w-32 bg-[#BBD1EC]/50" />
            <div className="relative z-10">
              <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#BBD1EC] mb-5 inline-flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-[#35D59B] shadow-[0_0_10px_#35D59B]" />
                Bugundan boshlang
              </div>
              <h2 className="font-display font-normal leading-[0.98] tracking-[-0.025em] text-balance" style={{ fontSize: "clamp(36px, 5.5vw, 68px)" }}>
                Sog&apos;lig&apos;ingizni <em className="italic text-[#BBD1EC]">bugundan</em>.
              </h2>
              <p className="text-[15px] md:text-[17px] text-[#BBD1EC] mt-5 max-w-[52ch] leading-relaxed">
                MED CLINIC bilan birinchi qabulga yoziling — jarayon 2 daqiqa.
              </p>
            </div>
            <div className="flex gap-3 items-center relative z-10 flex-col md:flex-row self-end md:self-center">
              <Link href="/booking" style={{ color: "var(--brand-ink)" }} className="inline-flex items-center gap-2 bg-white hover:bg-[#F0F6FF] !text-brand-ink px-6 py-3.5 rounded-full font-bold text-[14px] transition-colors w-full md:w-auto justify-center">
                Qabulga yozilish
                <ArrowUpRight className="w-4 h-4" strokeWidth={2.5} />
              </Link>
              <Link href="/contact" style={{ color: "#fff", borderColor: "rgba(255,255,255,0.3)" }} className="inline-flex items-center !text-white bg-transparent border px-6 py-3.5 rounded-full font-semibold text-[14px] hover:bg-white/10 w-full md:w-auto justify-center transition-colors">
                Biz bilan bog&apos;laning
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
