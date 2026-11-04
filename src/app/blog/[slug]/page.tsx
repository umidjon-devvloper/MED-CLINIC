import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Home, ChevronRight, Calendar, Clock, Share2, Send, Link2, Bookmark, ArrowLeft } from "lucide-react";
import { articles } from "@/lib/data/articles";
import { ArticleCard } from "@/components/blog/ArticleCard";
import type { Article } from "@/lib/types";

const catColors: Record<Article["category"], string> = {
  kardio: "#D64545", ped: "#E8B840", derm: "#F687B3", nevro: "#4D94F5",
  sog: "#22C58B", uyqu: "#94A3B8", vit: "#F6AD55", fit: "#ED8936", psi: "#D879B5",
};

export async function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);
  if (!article) return {};
  return {
    title: `${article.title} — MED CLINIC Blog`,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: "article",
      publishedTime: article.date,
      authors: [article.author.name],
    },
  };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);
  if (!article) notFound();

  const related = articles.filter((a) => a.category === article.category && a.id !== article.id).slice(0, 3);
  const badgeBg = catColors[article.category];
  const badgeColor = article.category === "ped" ? "#4A3410" : "#fff";

  return (
    <>
      {/* Breadcrumb */}
      <div className="py-5 border-b border-line bg-white">
        <div className="container-x">
          <div className="flex items-center gap-2 text-[13px] text-muted">
            <Link href="/" className="inline-flex items-center gap-1.5 hover:text-brand transition-colors">
              <Home className="w-3.5 h-3.5" /> Bosh sahifa
            </Link>
            <ChevronRight className="w-2.5 h-2.5" />
            <Link href="/blog" className="hover:text-brand transition-colors">Blog</Link>
            <ChevronRight className="w-2.5 h-2.5" />
            <span className="text-ink font-medium truncate">{article.categoryName}</span>
          </div>
        </div>
      </div>

      <article className="py-10 md:py-14">
        <div className="container-x grid lg:grid-cols-[1fr_240px] gap-10">
          <div>
            {/* Hero header */}
            <header className="mb-8">
              <span
                className="inline-flex items-center px-3 py-1.5 rounded-full uppercase font-extrabold mb-4 shadow-sm"
                style={{ background: badgeBg, color: badgeColor, fontSize: 11, letterSpacing: "0.1em" }}
              >
                {article.categoryName}
              </span>
              <h1 className="font-display font-medium text-ink leading-[1.1] text-balance mb-5" style={{ fontSize: "clamp(28px, 4.5vw, 44px)", letterSpacing: "-0.025em" }}>
                {article.title}
              </h1>
              <p className="text-[16px] md:text-[18px] text-ink-soft leading-[1.55] max-w-[62ch] mb-6">
                {article.excerpt}
              </p>
              <div className="flex items-center gap-4 flex-wrap text-[13.5px] text-muted">
                <div className="flex items-center gap-2.5">
                  <span className="w-9 h-9 rounded-full overflow-hidden shrink-0" style={{ background: "linear-gradient(165deg, #D7E8FA, #B5D4F2)" }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={article.author.avatar} alt={article.author.name} className="w-full h-full object-cover" />
                  </span>
                  <span className="font-bold text-ink">{article.author.name}</span>
                </div>
                <span className="w-px h-4 bg-line" />
                <span className="inline-flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" /> {article.date}, 2026
                </span>
                <span className="w-px h-4 bg-line" />
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" /> {article.readTime} daqiqa o&apos;qish
                </span>
              </div>
            </header>

            {/* Hero image */}
            <div className="rounded-3xl overflow-hidden mb-10 shadow-[var(--shadow-lg)]" style={{ aspectRatio: "16 / 9" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={article.image} alt={article.title} className="w-full h-full object-cover" />
            </div>

            {/* Prose */}
            <div className="prose-article max-w-[72ch] mx-auto">
              <p className="text-[16px] text-ink-soft leading-[1.75] mb-6">
                Zamonaviy tibbiyot bugungi kunda insoniyat uchun ko&apos;plab imkoniyatlar yaratmoqda. {article.title.toLowerCase()} mavzusi bo&apos;yicha quyidagi maqolada
                biz asosiy jihatlarni ko&apos;rib chiqamiz va amaliy tavsiyalar beramiz.
              </p>

              <h2 className="font-display font-medium text-ink mt-10 mb-4" style={{ fontSize: 26, letterSpacing: "-0.02em" }}>
                Nega bu muhim?
              </h2>
              <p className="text-[16px] text-ink-soft leading-[1.75] mb-6">
                Ko&apos;plab tadqiqotlar shuni ko&apos;rsatmoqdaki, o&apos;z vaqtida qilingan oldini olish choralari kelajakdagi kasalliklar xavfini sezilarli darajada kamaytiradi.
                Mutaxassislarning fikriga ko&apos;ra, sog&apos;lom turmush tarzi va vaqti-vaqti bilan tibbiy ko&apos;rikdan o&apos;tish — eng samarali profilaktika usullaridir.
              </p>
              <p className="text-[16px] text-ink-soft leading-[1.75] mb-6">
                Shu bilan birga, har bir inson o&apos;zining individual xususiyatlariga, yoshiga, kasbiga va tarixiga qarab o&apos;z profilaktika rejasini tuzishi kerak.
                Shuning uchun doimo o&apos;z mutaxassisingiz bilan maslahatlashing.
              </p>

              <h2 className="font-display font-medium text-ink mt-10 mb-4" style={{ fontSize: 26, letterSpacing: "-0.02em" }}>
                Amaliy tavsiyalar
              </h2>
              <ul className="list-disc pl-6 space-y-3 text-[16px] text-ink-soft leading-[1.65] mb-6">
                <li>Har kuni kamida 30 daqiqa jismoniy mashqlar bilan shug&apos;ullaning.</li>
                <li>Sog&apos;lom va muvozanatli oziqlanishga e&apos;tibor bering — ko&apos;proq meva, sabzavot va to&apos;liq don mahsulotlari iste&apos;mol qiling.</li>
                <li>Kuniga 7–8 soat sifatli uyquga vaqt ajrating.</li>
                <li>Stressni boshqarishni o&apos;rganing — meditatsiya, nafas mashqlari foydali bo&apos;lishi mumkin.</li>
                <li>Zararli odatlardan voz keching va alkogolni cheklang.</li>
              </ul>

              <h2 className="font-display font-medium text-ink mt-10 mb-4" style={{ fontSize: 26, letterSpacing: "-0.02em" }}>
                Qachon shifokorga murojaat qilish kerak?
              </h2>
              <p className="text-[16px] text-ink-soft leading-[1.75] mb-6">
                Agar sizda uzoq davom etadigan nohush simptomlar bo&apos;lsa, kechiktirmasdan mutaxassisga murojaat qiling. Erta tashxis — muvaffaqiyatli davolashning
                kalitidir. MED CLINIC platformasi orqali kerakli shifokorni tanlab, bir necha daqiqada onlayn qabulga yozilishingiz mumkin.
              </p>

              <div className="mt-10 p-6 md:p-8 rounded-2xl border border-brand-soft" style={{ background: "linear-gradient(135deg, #F3F8FF, #E3EEFF)" }}>
                <p className="font-display italic text-ink text-[18px] leading-[1.5] mb-3">
                  &ldquo;Sog&apos;liq — bu kundalik kichik odatlarning yig&apos;indisi. Katta natijaga erishish uchun oddiy qadamlardan boshlang.&rdquo;
                </p>
                <div className="text-[13px] text-brand font-semibold">— {article.author.name}</div>
              </div>
            </div>

            {/* Author bio */}
            <div className="mt-14 p-6 rounded-2xl border border-line bg-white flex gap-5 items-start flex-wrap">
              <div className="w-16 h-16 rounded-full overflow-hidden shrink-0" style={{ background: "linear-gradient(165deg, #D7E8FA, #B5D4F2)" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={article.author.avatar} alt={article.author.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-[220px]">
                <div className="text-[12px] text-muted uppercase tracking-wider font-semibold mb-1">Muallif</div>
                <h3 className="font-display text-ink text-[20px] mb-1">{article.author.name}</h3>
                <div className="text-[13px] text-brand font-medium mb-3">{article.categoryName} mutaxassisi · 14 yil tajriba</div>
                <p className="text-[14px] text-ink-soft leading-[1.6]">
                  MED CLINIC jamoasining a&apos;zosi. Yozuvchi va mutaxassis sifatida sog&apos;liq saqlash va zamonaviy tibbiyot bo&apos;yicha maqolalar yozadi.
                </p>
              </div>
              <Link href="/doctors" className="btn btn-outline btn-sm">Profilni ochish</Link>
            </div>
          </div>

          {/* Share sidebar */}
          <aside className="lg:sticky lg:top-6 lg:self-start">
            <div className="rounded-2xl bg-white border border-line p-5">
              <div className="text-[12px] uppercase tracking-wider font-semibold text-muted mb-3">Ulashish</div>
              <div className="flex lg:flex-col gap-2">
                <button className="btn btn-outline justify-center flex-1 lg:w-full" aria-label="Telegram">
                  <Send className="w-4 h-4" /> <span className="hidden lg:inline">Telegram</span>
                </button>
                <button className="btn btn-outline justify-center flex-1 lg:w-full" aria-label="Link nusxalash">
                  <Link2 className="w-4 h-4" /> <span className="hidden lg:inline">Nusxalash</span>
                </button>
                <button className="btn btn-outline justify-center flex-1 lg:w-full" aria-label="Nusxalash">
                  <Share2 className="w-4 h-4" /> <span className="hidden lg:inline">Nusxalash</span>
                </button>
                <button className="btn btn-outline justify-center flex-1 lg:w-full" aria-label="Saqlash">
                  <Bookmark className="w-4 h-4" /> <span className="hidden lg:inline">Saqlash</span>
                </button>
              </div>
            </div>
            <Link href="/blog" className="mt-4 btn btn-ghost justify-center text-[13px] w-full">
              <ArrowLeft className="w-3.5 h-3.5" /> Barcha maqolalar
            </Link>
          </aside>
        </div>
      </article>

      {/* Related */}
      {related.length > 0 && (
        <section className="py-12 border-t border-line bg-white">
          <div className="container-x">
            <div className="flex justify-between items-end flex-wrap gap-4 mb-8">
              <h2 className="font-display font-medium text-ink" style={{ fontSize: "clamp(22px, 3vw, 32px)", letterSpacing: "-0.02em" }}>
                O&apos;xshash <em className="italic text-brand">maqolalar</em>
              </h2>
              <Link href="/blog" className="text-brand font-semibold text-[14px] inline-flex items-center gap-1 border-b border-brand pb-0.5">
                Barchasi <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((a) => (
                <ArticleCard key={a.id} article={a} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
