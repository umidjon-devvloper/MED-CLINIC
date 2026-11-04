# MED CLINIC — Professional Tibbiy Platforma

Zamonaviy, premium va to'liq responsive tibbiy platforma. Bemorlar shifokorlarni tanlashi, onlayn qabulga yozilishi, tahlil natijalarini kuzatishi mumkin. Shifokorlar o'z kabinetida qabullar, bemorlar, retseptlar va daromadni boshqaradi.

**Demo credentials:**
- 👤 **Bemor** → `+998 90 123 45 67` / `bemor123`
- 👨‍⚕️ **Shifokor** → `+998 90 555 00 00` / `shifokor123`

---

## 🚀 Texnologiyalar

| Katta | Nima uchun |
|---|---|
| **Next.js 16** (App Router + Turbopack) | Server-side rendering, static prerender, 46+ marshrut |
| **TypeScript** | 100% tip xavfsizligi, `any` ishlatilmagan |
| **Tailwind CSS v4** | Design tokens + CSS variables |
| **Framer Motion** | Silliq page transitions, scroll reveal, stagger, CountUp |
| **React Hook Form + Zod** | Form validatsiya (login, register, booking, contact) |
| **Lucide React** | Toza SVG ikonkalar |
| **Google Fonts** | Fraunces (display italic) + Manrope (sans) |
| **Google Maps JS API** | Klinikalar xaritasi — haqiqiy, OLX-stil marker'lar |

---

## 🛠 Ishga tushirish (5 daqiqa)

### 1. Repo'ni klonlash

```bash
git clone https://github.com/<username>/med-clinic.git
cd med-clinic
```

### 2. Dependency'larni o'rnatish

```bash
npm install
```

> Node.js **18.18+** yoki **20+** kerak. `npm`, `pnpm`, `yarn` — istalgani.

### 3. Env faylini yaratish

```bash
cp .env.example .env.local
```

Yoki qo'lda yarating:

```env
# .env.local
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here
# NEXT_PUBLIC_API_BASE=https://api.example.com   # backend ulanganda
# NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=xxxxx
# NEXT_PUBLIC_YANDEX_VERIFICATION=xxxxx
```

### 4. Dev serverni ishga tushirish

```bash
npm run dev
```

Brauzerda [http://localhost:3000](http://localhost:3000) ochiladi.

### 5. Production build

```bash
npm run build    # 46+ sahifa prerender
npm start        # production server
```

---

## 📦 GitHub'ga joylash

### Repo yaratish

```bash
# GitHub CLI bilan (tavsiya etiladi)
gh repo create med-clinic --public --source=. --remote=origin --push

# Yoki qo'lda:
git init
git add .
git commit -m "feat: initial MED CLINIC platform"
git branch -M main
git remote add origin https://github.com/<username>/med-clinic.git
git push -u origin main
```

### Vercel'ga deploy (tavsiya etiladi)

```bash
npm i -g vercel
vercel          # birinchi marta, link qilish
vercel --prod   # production
```

Yoki [vercel.com/new](https://vercel.com/new) — GitHub repo'ni import qiling. Env variables Vercel dashboard'dan qo'shiladi (`NEXT_PUBLIC_*`).

### Boshqa hosting (Netlify, Hostinger VPS, DigitalOcean)

Oddiy Next.js standalone build ishlaydi:

```bash
npm run build
# .next/standalone va .next/static papkalari deploy qilinadi
```

Hostinger VPS uchun: `pm2 start npm --name "medclinic" -- start` + reverse proxy.

---

## 📁 Loyiha strukturasi

```
med-clinic/
├── src/
│   ├── app/                            # Next.js App Router — 16 sahifa
│   │   ├── layout.tsx                  # Root layout (fonts, Header, Footer, SEO metadata, JSON-LD)
│   │   ├── page.tsx                    # Bosh sahifa (Hero + sectionlar)
│   │   ├── globals.css                 # Design tokens, CSS variables, animatsiyalar
│   │   ├── sitemap.ts                  # SEO sitemap.xml generator
│   │   ├── robots.ts                   # SEO robots.txt generator
│   │   ├── doctors/                    # Shifokorlar katalogi + [id] profil
│   │   ├── services/                   # Xizmatlar katalogi + [slug] detail
│   │   ├── clinics/                    # Klinikalar (Google Maps bilan)
│   │   ├── blog/                       # Blog + [slug] maqola
│   │   ├── booking/                    # 6-qadamli qabul tizimi (auth bilan)
│   │   ├── dashboard/                  # Bemor kabineti — 8 section
│   │   ├── doctor-dashboard/           # Shifokor kabineti — 7 section
│   │   ├── login/ · register/          # Mock auth (role: bemor/shifokor)
│   │   ├── contact/ · about/           # Statik sahifalar
│   ├── components/
│   │   ├── home/                       # Hero, ServicesSection, DoctorsSection, ...
│   │   ├── doctors/                    # DoctorCard, DoctorsCatalog, DoctorTabs, MessageModal
│   │   ├── services/                   # ServiceCard, ServicesCatalog
│   │   ├── blog/                       # ArticleCard, BlogList
│   │   ├── clinics/ClinicsMap.tsx      # Google Maps integration
│   │   ├── layout/                     # Header, Footer, MobileDrawer
│   │   ├── doctor-dashboard/           # Modal'lar + widgets + mock data
│   │   └── ui/                         # Toast, AuthGate, CountUp, motion, ScrollReveal
│   └── lib/
│       ├── data/                       # Mock data (doctors, services, clinics, articles)
│       ├── api/                        # API layer stub (USE_MOCK bilan)
│       ├── auth.ts                     # Mock auth helpers
│       └── types.ts                    # TypeScript types
├── public/images/                      # Shifokor, blog, xizmat rasmlari
├── .env.local                          # Env variables (gitignore'da)
└── package.json
```

---

## 🎨 Dizayn tizimi

- **Palitra**: `--brand #1E6DD8` (ko'k), `--accent #22C58B` (yashil), `--ink #0A1F3A`, `--surface #FFF`
- **Shrift**: Fraunces (display italic) + Manrope (sans)
- **Container**: `.container-wide` (max-w-[1920px] + responsive paddings)
- **Editorial pattern**: eyebrow label + katta Fraunces sarlavha + lead paragraph + CountUp stats

---

## 🔐 Auth

Mock auth `localStorage` bilan ishlaydi (demo uchun). Haqiqiy backend ulash uchun:

1. `src/lib/auth.ts` — `tryLogin` va `registerAndLogin` funksiyalarini `api.post()` bilan almashtiring
2. `src/lib/api/client.ts` — `NEXT_PUBLIC_API_BASE` env variable qo'ying
3. `USE_MOCK` avtomatik `false` bo'ladi

---

## 🌐 SEO

- `metadataBase` + per-page `generateMetadata`
- OpenGraph + Twitter cards (`/og.png` kerak)
- JSON-LD: `MedicalBusiness` root + `Physician` har bir shifokor profilida
- `sitemap.xml` + `robots.txt` avto-generated (`/sitemap.xml`, `/robots.txt`)
- `canonical` URL'lar
- Multi-lang hreflang (uz-UZ, ru-RU, en-US)

Google Search Console / Yandex Webmaster verification: env variable'ga tag'ni qo'ying (`NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`, `NEXT_PUBLIC_YANDEX_VERIFICATION`).

---

## 📱 Responsive breakpointlar

- `sm`: 640px (telefon landscape)
- `md`: 768px (tablet)
- `lg`: 1024px (noutbuk)
- `xl`: 1280px (desktop)
- `2xl`: 1536px (ultra-wide)

Mobile-first — har bir komponent kichik ekrandan boshlab qurilgan.

---

## 📝 Litsenziya

MIT © 2026 MED CLINIC team

---

**Yordam yoki feedback?** → [info@medclinic.uz](mailto:info@medclinic.uz) · [@medclinic_uz](https://t.me/medclinic_uz)
