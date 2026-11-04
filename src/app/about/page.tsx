import Link from "next/link";
import { Shield, Sparkles, Heart, Award, Users, ArrowRight, Home as HomeIcon, ChevronRight } from "lucide-react";

const stats = [
  { num: "140+", label: "Sertifikatlangan shifokor" },
  { num: "6", label: "Zamonaviy klinika" },
  { num: "60+", label: "Tibbiy xizmat" },
  { num: "25 000+", label: "Mamnun bemor" },
];

const values = [
  { icon: Shield, title: "Professionalism", desc: "Barcha shifokorlarimiz sertifikatlangan, muntazam malaka oshirish kurslarida qatnashadi va xalqaro standartlarga javob beradi.", color: "brand" },
  { icon: Sparkles, title: "Innovatsiya", desc: "Zamonaviy MRT, UZI, laboratoriya texnikasi va onlayn platforma. Davolashning so'nggi usullarini qo'llaymiz.", color: "accent" },
  { icon: Heart, title: "Bemor-markazli", desc: "Har bir bemor uchun individual yondashuv. Diqqatli xizmat, qulay vaqt rejasi va natijalarni elektron shaklda yetkazamiz.", color: "danger" },
];

const team = [
  { name: "Dr. Alisher Qodirov", role: "Bosh vrach · Kardiologiya", photo: "/images/doctors/alisher.webp" },
  { name: "Dr. Nozima Rahimova", role: "Pediatriya bo'limi mudiri", photo: "/images/doctors/nozima.webp" },
  { name: "Dr. Sardor Yusupov", role: "Nevrologiya mutaxassisi", photo: "/images/doctors/sardor.webp" },
  { name: "Dr. Dilnoza Karimova", role: "Dermatologiya bo'limi mudiri", photo: "/images/doctors/dilnoza.webp" },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-10 pb-14 md:pt-14 md:pb-20 relative overflow-hidden" style={{ background: "linear-gradient(180deg, #F7FAFF 0%, #EDF4FD 100%)" }}>
        <div className="absolute top-[-30%] right-[-10%] w-[600px] h-[600px] rounded-full blur-[70px] pointer-events-none" style={{ background: "radial-gradient(circle, rgba(77,148,245,0.3), transparent 65%)" }} />
        <div className="container-x relative z-10 max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-surface rounded-full shadow-sm text-xs text-muted mb-5">
            <Link href="/" className="inline-flex items-center gap-1 hover:text-brand"><HomeIcon className="w-3 h-3" /> Bosh sahifa</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-ink font-medium">Biz haqimizda</span>
          </div>
          <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-brand-soft text-brand text-xs font-semibold uppercase tracking-wider rounded-full mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-brand" />
            MED CLINIC
          </span>
          <h1 className="font-display font-normal text-3xl md:text-[56px] tracking-tight leading-[1.05] text-ink text-balance">
            Sog&apos;lom <em className="italic text-brand">O&apos;zbekiston</em> uchun professional tibbiyot
          </h1>
          <p className="text-base md:text-[18px] text-ink-soft mt-5 max-w-[65ch] leading-relaxed">
            MED CLINIC — 2015 yildan beri O&apos;zbekistonda zamonaviy tibbiy xizmatlar ko&apos;rsatib kelayotgan professional platforma. Bizning missiyamiz — har bir bemorga tez, qulay va yuqori sifatli tibbiy yordam ko&apos;rsatish.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-10 md:py-14 bg-surface border-y border-line">
        <div className="container-x grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {stats.map((s, i) => (
            <div key={i} className="text-center md:text-left">
              <div className="font-display font-medium text-3xl md:text-[52px] text-ink tracking-tight leading-none tabular-nums">
                {s.num.includes("+") ? <>{s.num.replace("+", "")}<em className="italic text-brand">+</em></> : s.num}
              </div>
              <div className="text-[11px] md:text-[12.5px] text-muted mt-2 tracking-wide">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Our Story */}
      <section className="py-14 md:py-20">
        <div className="container-x grid lg:grid-cols-2 gap-10 md:gap-14 items-center">
          <div>
            <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-brand-soft text-brand text-xs font-semibold uppercase tracking-wider rounded-full mb-4">
              Bizning tariximiz
            </span>
            <h2 className="font-display font-normal text-2xl md:text-[42px] tracking-tight leading-tight text-ink">
              10 yillik <em className="italic text-brand">tajriba</em> va ishonch
            </h2>
            <div className="text-[14.5px] md:text-[16px] text-ink-soft leading-relaxed mt-5 flex flex-col gap-4">
              <p>
                2015 yilda Toshkent markazida kichik klinika sifatida boshlangan MED CLINIC bugungi kunda O&apos;zbekistonning yetakchi tibbiy brendlaridan biriga aylandi. Shahar bo&apos;ylab 6 ta zamonaviy filial, 140+ shifokor va 60+ xizmat turi — bizning birgalikdagi natijamiz.
              </p>
              <p>
                Biz zamonaviy tibbiy uskunalar, xalqaro standartlar va eng muhimi — insoniy munosabat orqali bemorlarimiz ishonchini qozonib keldik. Har kuni 500+ bemor bizga ishonib qabulga keladi.
              </p>
              <p>
                Kelajakda biz AI-yordamida tashxislash, telemeditsina va elektron tibbiy karta kabi texnologiyalarni joriy etishni rejalashtirmoqdamiz — chunki sog&apos;liq hamma vaqt zamonaviy bo&apos;lishi kerak.
              </p>
            </div>
          </div>
          <div className="aspect-[4/3] rounded-3xl overflow-hidden relative" style={{ background: "linear-gradient(135deg, #DCECFC 0%, #BFDAF6 100%)" }}>
            <div className="absolute inset-0 flex items-center justify-center">
              <svg viewBox="0 0 200 200" className="w-2/3 h-2/3 opacity-60">
                <circle cx="100" cy="100" r="80" fill="#1E6DD8" opacity="0.1" />
                <circle cx="100" cy="100" r="60" fill="#1E6DD8" opacity="0.15" />
                <path d="M100 60 L100 140 M60 100 L140 100" stroke="#1E6DD8" strokeWidth="12" strokeLinecap="round" />
              </svg>
            </div>
            <div className="absolute bottom-6 left-6 bg-surface rounded-xl px-4 py-3 shadow-lg flex items-center gap-3">
              <Award className="w-6 h-6 text-warn" />
              <div>
                <div className="font-semibold text-sm text-ink">Eng yaxshi klinika</div>
                <div className="text-xs text-muted">O&apos;zbekiston 2024</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-14 md:py-20 bg-surface border-y border-line">
        <div className="container-x">
          <div className="text-center max-w-3xl mx-auto mb-10 md:mb-14">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-brand-soft text-brand text-xs font-semibold uppercase tracking-wider rounded-full mb-4">
              Bizning qadriyatlarimiz
            </span>
            <h2 className="font-display font-normal text-2xl md:text-[42px] tracking-tight leading-tight text-ink">
              Nimaga <em className="italic text-brand">bizni</em> tanlaysiz
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-4 md:gap-6">
            {values.map((v, i) => (
              <div key={i} className="bg-bg border border-line rounded-3xl p-6 md:p-8">
                <div className={`w-14 h-14 rounded-2xl grid place-items-center mb-5 ${v.color === "accent" ? "bg-accent-soft text-accent" : v.color === "danger" ? "bg-danger-soft text-danger" : "bg-brand-soft text-brand"}`}>
                  <v.icon className="w-6 h-6" />
                </div>
                <h3 className="font-display font-normal text-xl md:text-2xl tracking-tight text-ink mb-3">{v.title}</h3>
                <p className="text-[14px] text-ink-soft leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-14 md:py-20">
        <div className="container-x">
          <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-4 mb-10">
            <div>
              <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-brand-soft text-brand text-xs font-semibold uppercase tracking-wider rounded-full mb-3">
                <Users className="w-3 h-3" />
                Jamoamiz
              </span>
              <h2 className="font-display font-normal text-2xl md:text-[42px] tracking-tight leading-tight text-ink">
                Bosh <em className="italic text-brand">mutaxassislarimiz</em>
              </h2>
            </div>
            <Link href="/doctors" className="btn btn-outline">
              Barcha shifokorlar
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-5">
            {team.map((t, i) => (
              <div key={i} className="bg-surface border border-line rounded-2xl overflow-hidden p-2 md:p-3">
                <div className="aspect-[4/5] rounded-xl relative overflow-hidden" style={{ background: "linear-gradient(165deg, #D7E8FA, #B5D4F2)" }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={t.photo} alt={t.name} className="w-full h-full object-cover object-top" />
                </div>
                <div className="px-2 pt-3 pb-2">
                  <div className="font-semibold text-[13px] md:text-sm text-ink">{t.name}</div>
                  <div className="text-[11px] md:text-[12.5px] text-brand font-medium mt-0.5">{t.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="py-10 md:py-14 bg-surface border-y border-line">
        <div className="container-x">
          <div className="text-center text-xs text-muted uppercase tracking-wider font-semibold mb-6">
            Sertifikatlar va litsenziyalar
          </div>
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-12 opacity-70">
            {["Sog'liq Vazirligi", "ISO 9001:2015", "ESC a'zosi", "WHO sheriklik", "AMA Partner"].map((p) => (
              <div key={p} className="text-ink-soft font-display font-medium text-base md:text-lg tracking-tight">
                {p}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Band */}
      <section className="pt-10 pb-16 md:pb-24">
        <div className="container-x">
          <div className="rounded-3xl p-8 md:p-14 text-white relative overflow-hidden grid md:grid-cols-[1.3fr_auto] gap-6 items-center" style={{ background: "linear-gradient(135deg, var(--brand-ink) 0%, var(--brand) 100%)" }}>
            <div className="absolute bottom-[-100px] right-[-100px] w-[400px] h-[400px] rounded-full" style={{ background: "radial-gradient(closest-side, rgba(255,255,255,.1), transparent 70%)" }} />
            <div className="relative z-10">
              <h2 className="font-display font-normal text-2xl md:text-[42px] mb-3 tracking-tight leading-tight">
                Bugundan <em className="italic text-[#BBD1EC]">sog&apos;lig&apos;ingizni</em> boshlang
              </h2>
              <p className="text-sm md:text-base opacity-90 max-w-[55ch]">
                MED CLINIC bilan birinchi qabulga yoziling — jarayon 2 daqiqa.
              </p>
            </div>
            <div className="flex gap-3 items-center relative z-10 flex-col md:flex-row">
              <Link href="/booking" className="btn btn-lg bg-white text-brand-ink hover:bg-[#F0F6FF] border-white w-full md:w-auto justify-center font-semibold">
                Qabulga yozilish
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/contact" className="btn btn-lg btn-ghost text-white border border-white/30 hover:bg-white/10 w-full md:w-auto justify-center">
                Biz bilan bog&apos;laning
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
