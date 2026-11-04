const steps = [
  { num: "01", title: "Mutaxassislikni tanlang", desc: "Shikoyatingiz yoki tashxisga ko'ra kerakli yo'nalishni toping." },
  { num: "02", title: "Shifokorni tanlang", desc: "Reyting, tajriba va narx bo'yicha mos shifokorni tanlang." },
  { num: "03", title: "Sana va vaqt", desc: "Jadvaldan bo'sh vaqtni ko'ring va qulay vaqtni bron qiling." },
  { num: "04", title: "Tasdiqlang", desc: "SMS orqali tasdiqlanish va eslatma — klinikaga vaqtida yetib boring." },
];

export function HowItWorks() {
  return (
    <section className="scroll-reveal py-20 md:py-28 bg-surface border-y border-line">
      <div className="container-wide">
        <div className="mb-12 md:mb-16 max-w-[640px]">
          <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand mb-5 inline-flex items-center gap-2.5">
            <span className="w-8 h-px bg-brand" />
            Jarayon
          </div>
          <h2 className="font-display font-normal text-ink leading-[0.98] tracking-[-0.025em]" style={{ fontSize: "clamp(36px, 5.5vw, 68px)" }}>
            Qanday <em className="italic text-brand">ishlaydi</em>.
          </h2>
          <p className="text-[15px] md:text-[17px] text-ink-soft mt-5 max-w-[48ch] leading-relaxed">
            To&apos;rt oddiy qadam — va siz shifokor qabulidasiz.
          </p>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-line rounded-2xl overflow-hidden border border-line">
          {steps.map((step) => (
            <div key={step.num} className="bg-surface p-7 md:p-10 flex flex-col gap-3 hover:bg-bg transition-colors">
              <div className="font-display italic font-normal text-brand text-[56px] md:text-[80px] leading-none tracking-[-0.03em] tabular-nums">
                {step.num}
              </div>
              <h3 className="text-base md:text-[19px] font-bold text-ink mt-4 tracking-tight">{step.title}</h3>
              <p className="text-[13px] md:text-[14.5px] text-ink-soft leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
