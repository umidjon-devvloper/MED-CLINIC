const steps = [
  { num: "01", title: "Mutaxassislikni tanlang", desc: "Shikoyatingiz yoki tashxisga ko'ra kerakli yo'nalishni toping." },
  { num: "02", title: "Shifokorni tanlang", desc: "Reyting, tajriba va narx bo'yicha mos shifokorni tanlang." },
  { num: "03", title: "Sana va vaqt", desc: "Jadvaldan bo'sh vaqtni ko'ring va qulay vaqtni bron qiling." },
  { num: "04", title: "Tasdiqlang", desc: "SMS orqali tasdiqlanish va eslatma — klinikaga vaqtida yetib boring." },
];

export function HowItWorks() {
  return (
    <section className="scroll-reveal py-16 md:py-20 bg-surface border-y border-line">
      <div className="container-x">
        <div className="mb-10 md:mb-12">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-brand-soft text-brand text-xs font-semibold uppercase tracking-wider rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-brand" />
            Jarayon
          </span>
          <h2 className="font-display font-normal text-2xl md:text-[46px] mt-4 tracking-tight text-ink">
            Qanday <em className="italic text-brand">ishlaydi</em>
          </h2>
          <p className="text-sm md:text-base text-ink-soft mt-3 max-w-[44ch]">
            To&apos;rt oddiy qadam — va siz shifokor qabulidasiz.
          </p>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-5">
          {steps.map((step) => (
            <div key={step.num} className="bg-bg border border-line rounded-2xl p-5 md:p-7 flex flex-col gap-2">
              <div className="font-display italic font-normal text-brand text-4xl md:text-5xl leading-none tracking-tight tabular-nums">
                {step.num}
              </div>
              <h3 className="text-sm md:text-[17px] font-semibold text-ink mt-2">{step.title}</h3>
              <p className="text-xs md:text-[13.5px] text-ink-soft leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
