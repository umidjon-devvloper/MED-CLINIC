"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Phone, Mail, MapPin, Clock, Send, ChevronRight, Home as HomeIcon, Loader2 } from "lucide-react";
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
  { icon: Phone, label: "Telefon", v1: "+998 71 200 00 00", v2: "+998 90 123 45 67", color: "brand" },
  { icon: Mail, label: "Email", v1: "info@medclinic.uz", v2: "support@medclinic.uz", color: "accent" },
  { icon: MapPin, label: "Manzil", v1: "Toshkent, Shayxontohur", v2: "Navoiy ko'chasi 14-uy", color: "warn" },
  { icon: Clock, label: "Ish vaqti", v1: "Dush–Shan: 08:00–20:00", v2: "Yakshanba: 09:00–18:00", color: "danger" },
];

const socials = [
  { name: "Telegram", handle: "@medclinic_uz", bg: "#0088CC", url: "https://t.me/medclinic_uz" },
  { name: "WhatsApp", handle: "+998 71 200 00 00", bg: "#25D366", url: "https://wa.me/998712000000" },
  { name: "Instagram", handle: "@medclinic.uz", bg: "linear-gradient(135deg,#833AB4,#FD1D1D,#FCB045)", url: "https://instagram.com/medclinic.uz" },
  { name: "Facebook", handle: "MedClinic Uzbekistan", bg: "#1877F2", url: "https://facebook.com/medclinic" },
];

export default function ContactPage() {
  const toast = useToast();
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
  });

  async function onSubmit(_data: ContactForm) {
    await new Promise(r => setTimeout(r, 800));
    reset();
    toast.show("Xabaringiz yuborildi! Tez orada javob beramiz.", "success");
  }

  return (
    <>
      {/* Page Head */}
      <section className="pt-10 pb-8 relative overflow-hidden" style={{ background: "linear-gradient(180deg, #F7FAFF 0%, #EDF4FD 100%)", borderBottom: "1px solid var(--line)" }}>
        <div className="absolute top-[-30%] right-[5%] w-[520px] h-[520px] rounded-full blur-[55px] pointer-events-none" style={{ background: "radial-gradient(circle, rgba(77,148,245,0.3), transparent 65%)" }} />
        <div className="container-x relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-surface rounded-full shadow-[0_2px_8px_rgba(10,31,58,0.05)] text-xs text-muted mb-4">
            <Link href="/" className="inline-flex items-center gap-1 hover:text-brand"><HomeIcon className="w-3 h-3" /> Bosh sahifa</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-ink font-medium">Aloqa</span>
          </div>
          <h1 className="font-display font-medium text-[32px] md:text-[48px] tracking-tight leading-tight text-ink max-w-[18ch]">
            Biz bilan <em className="italic text-brand font-normal">bog&apos;laning</em>
          </h1>
          <p className="text-[14.5px] md:text-base text-ink-soft mt-3 max-w-[55ch]">
            Savollar bo&apos;yicha telefon, email yoki ijtimoiy tarmoqlar orqali murojaat qiling. Call-center 24/7 ishlaydi.
          </p>
        </div>
      </section>

      {/* Main */}
      <section className="py-10 md:py-14">
        <div className="container-x grid lg:grid-cols-[1fr_1.1fr] gap-6 md:gap-10">
          {/* Contact Info Cards */}
          <div className="grid sm:grid-cols-2 gap-3 md:gap-4 content-start">
            {contactInfo.map((info, i) => (
              <div key={i} className="bg-surface border border-line rounded-2xl p-5 md:p-6 hover:shadow-md transition-shadow">
                <div className={`w-11 h-11 rounded-xl grid place-items-center mb-4 ${info.color === "accent" ? "bg-accent-soft text-accent" : info.color === "warn" ? "bg-warn-soft text-warn" : info.color === "danger" ? "bg-danger-soft text-danger" : "bg-brand-soft text-brand"}`}>
                  <info.icon className="w-5 h-5" />
                </div>
                <div className="text-[11px] font-semibold text-muted uppercase tracking-wider mb-1">{info.label}</div>
                <div className="font-semibold text-[14.5px] text-ink">{info.v1}</div>
                <div className="text-[13px] text-ink-soft mt-0.5">{info.v2}</div>
              </div>
            ))}
          </div>

          {/* Form */}
          <div className="bg-surface border border-line rounded-2xl p-5 md:p-8 shadow-sm">
            <h2 className="font-display font-normal text-2xl md:text-[28px] tracking-tight text-ink mb-2">
              Xabar <em className="italic text-brand">yuborish</em>
            </h2>
            <p className="text-[13px] md:text-sm text-ink-soft mb-6">Formani to&apos;ldiring — biz 24 soat ichida javob beramiz.</p>

            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-ink-soft mb-1.5 tracking-wide">ISMINGIZ</label>
                  <input {...register("name")} className="w-full px-4 py-3 bg-bg border border-line-strong rounded-xl text-[14.5px] text-ink outline-none focus:border-brand focus:bg-surface transition-all" placeholder="Umidjon Afforov" />
                  {errors.name && <p className="text-xs text-danger mt-1">{errors.name.message}</p>}
                </div>
                <div>
                  <label className="block text-xs font-semibold text-ink-soft mb-1.5 tracking-wide">TELEFON</label>
                  <input {...register("phone")} type="tel" className="w-full px-4 py-3 bg-bg border border-line-strong rounded-xl text-[14.5px] text-ink outline-none focus:border-brand focus:bg-surface transition-all" placeholder="+998 90 123 45 67" />
                  {errors.phone && <p className="text-xs text-danger mt-1">{errors.phone.message}</p>}
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-ink-soft mb-1.5 tracking-wide">EMAIL</label>
                <input {...register("email")} type="email" className="w-full px-4 py-3 bg-bg border border-line-strong rounded-xl text-[14.5px] text-ink outline-none focus:border-brand focus:bg-surface transition-all" placeholder="siz@example.com" />
                {errors.email && <p className="text-xs text-danger mt-1">{errors.email.message}</p>}
              </div>
              <div>
                <label className="block text-xs font-semibold text-ink-soft mb-1.5 tracking-wide">MAVZU</label>
                <input {...register("subject")} className="w-full px-4 py-3 bg-bg border border-line-strong rounded-xl text-[14.5px] text-ink outline-none focus:border-brand focus:bg-surface transition-all" placeholder="Qabulga yozilish bo'yicha" />
                {errors.subject && <p className="text-xs text-danger mt-1">{errors.subject.message}</p>}
              </div>
              <div>
                <label className="block text-xs font-semibold text-ink-soft mb-1.5 tracking-wide">XABAR</label>
                <textarea {...register("message")} rows={5} className="w-full px-4 py-3 bg-bg border border-line-strong rounded-xl text-[14.5px] text-ink outline-none focus:border-brand focus:bg-surface transition-all resize-y" placeholder="Savolingiz yoki talabingizni yozing..." />
                {errors.message && <p className="text-xs text-danger mt-1">{errors.message.message}</p>}
              </div>
              <button type="submit" disabled={isSubmitting} style={{ color: "#fff" }} className="btn btn-primary btn-lg justify-center w-full mt-2 disabled:opacity-60">
                {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                {isSubmitting ? "Yuborilmoqda..." : "Yuborish"}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Socials */}
      <section className="py-8 md:py-12">
        <div className="container-x">
          <h2 className="font-display font-normal text-2xl md:text-[32px] tracking-tight text-ink mb-6 text-center">
            Ijtimoiy <em className="italic text-brand">tarmoqlarda</em>
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
            {socials.map((s, i) => (
              <a key={i} href={s.url} target="_blank" rel="noopener" className="group rounded-2xl p-5 text-white relative overflow-hidden hover:-translate-y-1 transition-transform" style={{ background: s.bg }}>
                <div className="font-bold text-lg">{s.name}</div>
                <div className="text-sm opacity-90 mt-1">{s.handle}</div>
                <div className="mt-4 text-xs font-semibold opacity-80 inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                  O&apos;tish <ChevronRight className="w-3 h-3" />
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="py-8 md:py-14">
        <div className="container-x">
          <div className="rounded-3xl overflow-hidden border border-line bg-surface">
            <div className="p-5 md:p-7 border-b border-line flex flex-col sm:flex-row justify-between gap-3">
              <div>
                <h2 className="font-display font-normal text-xl md:text-2xl tracking-tight text-ink">Bosh ofis manzili</h2>
                <p className="text-[13px] md:text-sm text-ink-soft mt-1 inline-flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-brand" />
                  Toshkent, Shayxontohur tumani, Navoiy ko&apos;chasi 14-uy
                </p>
              </div>
              <a href="https://maps.google.com" target="_blank" rel="noopener" className="btn btn-primary btn-sm self-start sm:self-center">
                Google Maps
                <ChevronRight className="w-3.5 h-3.5" />
              </a>
            </div>
            <div className="aspect-[16/8] md:aspect-[16/6] relative">
              <iframe
                title="MED CLINIC Markaziy"
                src="https://maps.google.com/maps?q=41.3264,69.2370&z=15&output=embed"
                className="absolute inset-0 w-full h-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
