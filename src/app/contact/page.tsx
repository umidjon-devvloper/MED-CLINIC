"use client";

import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Phone, Mail, MapPin, Clock, Send, ChevronRight, Loader2, ArrowUpRight, CheckCircle2 } from "lucide-react";
import { useToast } from "@/components/ui/Toast";

const contactSchema = z.object({
  name: z.string().min(2, "Ismni kiriting"),
  email: z.string().email("Email noto'g'ri"),
  phone: z.string().min(9, "Telefon raqamini kiriting"),
  subject: z.string().min(3, "Mavzuni kiriting"),
  message: z.string().min(10, "Xabar kamida 10 belgi"),
});
type ContactForm = z.infer<typeof contactSchema>;

const contactInfo = [
  { icon: Phone,  label: "Telefon",   v1: "+998 71 200 00 00",      v2: "+998 90 123 45 67" },
  { icon: Mail,   label: "Email",     v1: "info@medclinic.uz",      v2: "support@medclinic.uz" },
  { icon: MapPin, label: "Manzil",    v1: "Toshkent, Shayxontohur", v2: "Navoiy ko'chasi 14-uy" },
  { icon: Clock,  label: "Ish vaqti", v1: "Dush–Shan: 08:00–20:00", v2: "Yakshanba: 09:00–18:00" },
];

const socials = [
  {
    name: "Telegram", handle: "@medclinic_uz", bg: "#0088CC", url: "https://t.me/medclinic_uz",
    svg: <path d="M9.78 18.65l.28-4.23 7.68-6.92c.34-.31-.07-.46-.52-.19L7.74 13.3 3.64 12c-.88-.25-.89-.86.2-1.3l15.97-6.16c.73-.33 1.43.18 1.15 1.3l-2.72 12.81c-.19.91-.74 1.13-1.5.71L12.6 16.3l-1.99 1.93c-.23.23-.42.42-.83.42z" />,
  },
  {
    name: "WhatsApp", handle: "+998 71 200 00 00", bg: "#25D366", url: "https://wa.me/998712000000",
    svg: <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />,
  },
  {
    name: "Instagram", handle: "@medclinic.uz", bg: "linear-gradient(135deg,#833AB4,#FD1D1D,#FCB045)", url: "https://instagram.com/medclinic.uz",
    svg: <><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></>,
  },
  {
    name: "Facebook", handle: "MedClinic Uzbekistan", bg: "#1877F2", url: "https://facebook.com/medclinic",
    svg: <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />,
  },
];

export default function ContactPage() {
  const toast = useToast();
  const [sent, setSent] = useState(false);
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
  });

  async function onSubmit(_data: ContactForm) {
    await new Promise(r => setTimeout(r, 900));
    reset();
    setSent(true);
    toast.show("Xabaringiz yuborildi! Tez orada javob beramiz.", "success");
    setTimeout(() => setSent(false), 6000);
  }

  const onInvalid = () => {
    toast.show("Iltimos, barcha majburiy maydonlarni to'ldiring", "error");
  };

  return (
    <>
      <section className="relative overflow-hidden pt-16 md:pt-20 pb-16 md:pb-20" style={{ background: "linear-gradient(180deg, #F5F8FD 0%, #EEF3FB 60%, var(--bg) 100%)" }}>
        <div className="absolute top-[15%] right-[8%] w-[480px] h-[480px] rounded-full blur-[80px] opacity-30 pointer-events-none" style={{ background: "radial-gradient(closest-side, rgba(77,148,245,0.35), transparent 70%)" }} />

        <div className="container-wide relative">
          <div className="flex items-center gap-2 text-[12.5px] text-muted mb-8">
            <Link href="/" className="hover:text-brand">Bosh sahifa</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-ink font-medium">Aloqa</span>
          </div>

          <div className="grid lg:grid-cols-[1fr_auto] gap-10 lg:gap-16 items-end">
            <div className="max-w-[820px]">
              <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand mb-5 inline-flex items-center gap-2.5">
                <span className="w-8 h-px bg-brand" />
                Aloqa · 2026
              </div>
              <h1 className="font-display font-normal text-ink leading-[0.98] tracking-[-0.025em]" style={{ fontSize: "clamp(42px, 7vw, 92px)" }}>
                Biz bilan <em className="italic text-brand">bog&apos;laning</em>.
              </h1>
              <p className="text-[15px] md:text-[17px] text-ink-soft mt-6 max-w-[56ch] leading-relaxed">
                Telefon, email yoki ijtimoiy tarmoqlar orqali murojaat qiling.
                Call-center 24/7 ishlaydi, xabarlarga 24 soat ichida javob beramiz.
              </p>
            </div>

            <div className="lg:min-w-[220px] lg:border-l lg:border-line lg:pl-10">
              <div className="text-[11px] uppercase tracking-wider text-muted font-bold mb-2 inline-flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-brand" /> Javob vaqti
              </div>
              <div className="font-display font-medium text-ink tabular-nums leading-none tracking-tight" style={{ fontSize: "clamp(32px, 4vw, 48px)" }}>&lt;24<em className="italic text-brand text-[0.5em] font-normal">h</em></div>
              <div className="text-[13px] text-ink-soft mt-2">Formadagi xabar uchun</div>
            </div>
          </div>
        </div>
      </section>

      <section className="pt-4 pb-16 md:pb-24">
        <div className="container-wide grid lg:grid-cols-[1fr_1.2fr] gap-6 lg:gap-14 items-start">
          <div className="flex flex-col gap-px bg-line border border-line rounded-2xl overflow-hidden">
            {contactInfo.map((info, i) => (
              <div key={i} className="bg-surface p-6 md:p-7 flex items-start gap-5 hover:bg-bg transition-colors">
                <div className="w-11 h-11 rounded-xl bg-brand-soft text-brand grid place-items-center shrink-0">
                  <info.icon className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[11px] font-bold text-muted uppercase tracking-[0.15em] mb-1.5">{info.label}</div>
                  <div className="font-bold text-[15px] text-ink">{info.v1}</div>
                  <div className="text-[13.5px] text-ink-soft mt-0.5">{info.v2}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-surface border border-line rounded-2xl p-8 md:p-10">
            <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand mb-3 inline-flex items-center gap-2.5">
              <span className="w-8 h-px bg-brand" />
              Xabar yuborish
            </div>
            <h2 className="font-display font-normal text-ink tracking-tight leading-[1.05]" style={{ fontSize: "clamp(28px, 3vw, 40px)" }}>
              Nima <em className="italic text-brand">yordam</em> bera olamiz?
            </h2>
            <p className="text-[14px] md:text-[15px] text-ink-soft mt-3 mb-7">Formani to&apos;ldiring — jamoamiz sutka ichida javob beradi.</p>

            {sent ? (
              <div className="py-14 text-center">
                <div className="w-20 h-20 rounded-full bg-accent-soft text-accent grid place-items-center mx-auto mb-5">
                  <CheckCircle2 className="w-10 h-10" strokeWidth={2} />
                </div>
                <h3 className="font-display font-normal text-2xl md:text-[28px] text-ink tracking-tight mb-2">
                  Xabaringiz <em className="italic text-brand">yuborildi</em>!
                </h3>
                <p className="text-[14px] md:text-[15px] text-ink-soft max-w-[40ch] mx-auto mb-7 leading-relaxed">
                  Rahmat! Jamoamiz 24 soat ichida sizga email yoki telefon orqali bog&apos;lanadi.
                </p>
                <button type="button" onClick={() => setSent(false)} className="btn btn-outline">
                  Yana xabar yuborish
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit, onInvalid)} className="flex flex-col gap-4" noValidate>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-ink-soft mb-1.5 uppercase tracking-wide">Ismingiz <span className="text-danger">*</span></label>
                    <input {...register("name")} className={`w-full px-4 py-3 bg-bg border rounded-xl text-[14.5px] text-ink outline-none focus:border-brand focus:bg-surface transition-all ${errors.name ? "border-danger" : "border-line-strong"}`} placeholder="Umidjon Afforov" />
                    {errors.name && <p className="text-xs text-danger mt-1">{errors.name.message}</p>}
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-ink-soft mb-1.5 uppercase tracking-wide">Telefon <span className="text-danger">*</span></label>
                    <input {...register("phone")} type="tel" className={`w-full px-4 py-3 bg-bg border rounded-xl text-[14.5px] text-ink outline-none focus:border-brand focus:bg-surface transition-all ${errors.phone ? "border-danger" : "border-line-strong"}`} placeholder="+998 90 123 45 67" />
                    {errors.phone && <p className="text-xs text-danger mt-1">{errors.phone.message}</p>}
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-ink-soft mb-1.5 uppercase tracking-wide">Email <span className="text-danger">*</span></label>
                  <input {...register("email")} type="email" className={`w-full px-4 py-3 bg-bg border rounded-xl text-[14.5px] text-ink outline-none focus:border-brand focus:bg-surface transition-all ${errors.email ? "border-danger" : "border-line-strong"}`} placeholder="siz@example.com" />
                  {errors.email && <p className="text-xs text-danger mt-1">{errors.email.message}</p>}
                </div>
                <div>
                  <label className="block text-xs font-bold text-ink-soft mb-1.5 uppercase tracking-wide">Mavzu <span className="text-danger">*</span></label>
                  <input {...register("subject")} className={`w-full px-4 py-3 bg-bg border rounded-xl text-[14.5px] text-ink outline-none focus:border-brand focus:bg-surface transition-all ${errors.subject ? "border-danger" : "border-line-strong"}`} placeholder="Qabulga yozilish bo'yicha" />
                  {errors.subject && <p className="text-xs text-danger mt-1">{errors.subject.message}</p>}
                </div>
                <div>
                  <label className="block text-xs font-bold text-ink-soft mb-1.5 uppercase tracking-wide">Xabar <span className="text-danger">*</span></label>
                  <textarea {...register("message")} rows={5} className={`w-full px-4 py-3 bg-bg border rounded-xl text-[14.5px] text-ink outline-none focus:border-brand focus:bg-surface transition-all resize-y ${errors.message ? "border-danger" : "border-line-strong"}`} placeholder="Savolingiz yoki talabingizni yozing..." />
                  {errors.message && <p className="text-xs text-danger mt-1">{errors.message.message}</p>}
                </div>
                <button type="submit" disabled={isSubmitting} style={{ color: "#fff" }} className="btn btn-primary btn-lg justify-center w-full mt-3 disabled:opacity-60">
                  {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                  {isSubmitting ? "Yuborilmoqda..." : "Yuborish"}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-surface border-y border-line">
        <div className="container-wide">
          <div className="mb-10 md:mb-14 max-w-[640px]">
            <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand mb-5 inline-flex items-center gap-2.5">
              <span className="w-8 h-px bg-brand" />
              Ijtimoiy tarmoqlar
            </div>
            <h2 className="font-display font-normal text-ink leading-[0.98] tracking-[-0.025em]" style={{ fontSize: "clamp(36px, 5.5vw, 68px)" }}>
              Kuzatib <em className="italic text-brand">boring</em>.
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
            {socials.map((s, i) => (
              <a
                key={i}
                href={s.url}
                target="_blank"
                rel="noopener"
                className="group rounded-2xl p-6 md:p-7 !text-white relative overflow-hidden hover:-translate-y-1 transition-transform min-h-[200px] flex flex-col justify-between"
                style={{ background: s.bg, color: "#fff" }}
              >
                {/* Big watermark icon behind */}
                <svg viewBox="0 0 24 24" fill="currentColor" className="absolute -bottom-6 -right-6 w-[160px] h-[160px] text-white/15 pointer-events-none">
                  {s.svg}
                </svg>
                {/* Foreground icon chip */}
                <div className="relative w-12 h-12 rounded-xl bg-white/20 grid place-items-center">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-white">
                    {s.svg}
                  </svg>
                </div>
                <div className="relative">
                  <div className="font-bold text-xl md:text-[22px]">{s.name}</div>
                  <div className="text-[13.5px] opacity-90 mt-1 truncate">{s.handle}</div>
                  <div className="flex items-center justify-between mt-5">
                    <span className="text-[11.5px] font-bold uppercase tracking-wider opacity-90">O&apos;tish</span>
                    <span className="w-9 h-9 rounded-full bg-white/15 grid place-items-center group-hover:bg-white/30 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all">
                      <ArrowUpRight className="w-4 h-4" strokeWidth={2.5} />
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container-wide">
          <div className="mb-10 md:mb-12 flex items-end justify-between gap-6 flex-wrap">
            <div className="max-w-[640px]">
              <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand mb-5 inline-flex items-center gap-2.5">
                <span className="w-8 h-px bg-brand" />
                Manzil
              </div>
              <h2 className="font-display font-normal text-ink leading-[0.98] tracking-[-0.025em]" style={{ fontSize: "clamp(36px, 5.5vw, 68px)" }}>
                Bosh <em className="italic text-brand">ofis</em>.
              </h2>
              <p className="text-[14px] md:text-[16px] text-ink-soft mt-4 inline-flex items-start gap-2">
                <MapPin className="w-4 h-4 text-brand shrink-0 mt-1" />
                Toshkent, Shayxontohur tumani, Navoiy ko&apos;chasi 14-uy
              </p>
            </div>
            <a href="https://www.google.com/maps/dir/?api=1&destination=41.3264,69.2370" target="_blank" rel="noopener" className="group inline-flex items-center gap-2 text-brand hover:text-brand-ink font-semibold text-[14px] border-b-2 border-brand pb-1 transition-colors self-end">
              Yo&apos;nalish olish
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={2.5} />
            </a>
          </div>
          <div className="rounded-[24px] overflow-hidden border border-line aspect-[16/8] md:aspect-[16/6] relative">
            <iframe
              title="MED CLINIC Markaziy"
              src="https://maps.google.com/maps?q=41.3264,69.2370&z=15&output=embed"
              className="absolute inset-0 w-full h-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </>
  );
}
