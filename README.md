# MED CLINIC — Professional Tibbiy Platforma

Zamonaviy, premium va to'liq responsive tibbiy platforma. Bemorlar shifokorlarni tanlashi, onlayn qabulga yozilishi, tahlil natijalarini kuzatishi mumkin.

## 🚀 Texnologiyalar

- **Next.js 16** (App Router + Turbopack)
- **TypeScript** — to'liq tiplar
- **Tailwind CSS v4** — design tokens + custom utilities
- **Framer Motion** — silliq animatsiyalar
- **React Hook Form + Zod** — form validatsiya
- **Lucide React** — toza ikonkalar
- **Google Fonts**: Fraunces (display) + Manrope (sans)

## 📁 Loyiha strukturasi

```
med-clinic/
├── src/
│   ├── app/
│   │   ├── layout.tsx                # Root layout (fontlar, Header, Footer)
│   │   ├── page.tsx                  # Bosh sahifa
│   │   ├── globals.css               # Design tokens, CSS variables
│   │   ├── doctors/
│   │   │   ├── page.tsx              # Shifokorlar katalogi
│   │   │   └── [id]/page.tsx         # Shifokor profili
│   │   ├── services/
│   │   │   ├── page.tsx              # Xizmatlar katalogi
│   │   │   └── [slug]/page.tsx       # Xizmat tafsiloti
│   │   ├── clinics/page.tsx          # Klinikalar (xarita + ro'yxat)
│   │   ├── blog/
│   │   │   ├── page.tsx              # Blog ro'yxati
│   │   │   └── [slug]/page.tsx       # Maqola
│   │   ├── booking/page.tsx          # 6-qadamli qabul tizimi
│   │   ├── dashboard/page.tsx        # Bemor shaxsiy kabineti
│   │   ├── login/page.tsx
│   │   ├── register/page.tsx
│   │   ├── contact/page.tsx
│   │   └── about/page.tsx
│   ├── components/
│   │   ├── layout/                   # Header, Footer, MobileDrawer
│   │   ├── home/                     # Hero + Section komponentlari
│   │   ├── doctors/                  # DoctorCard, DoctorFilters
│   │   ├── services/                 # ServiceCard, ServicesCatalog
│   │   ├── clinics/                  # ClinicsMap
│   │   └── blog/                     # ArticleCard
│   └── lib/
│       ├── types.ts                  # Doctor, Service, Clinic, Article types
│       └── data/                     # Mock data (doctors, services, clinics, articles)
└── public/
    └── images/                       # Doctor photos, blog thumbnails
```

## 🛠 Ishga tushirish

```bash
# Dependencies
npm install

# Dev server (http://localhost:3000)
npm run dev

# Production build
npm run build
npm start

# Lint
npm run lint
```

## 🎨 Design System

CSS variables `globals.css` da (Tailwind theme bilan integratsiyalashgan):

- **Ranglar**: `--bg #FBFCFD`, `--surface #FFFFFF`, `--ink #0A1F3A`, `--brand #1E6DD8`, `--brand-ink #0E3F8C`, `--accent #22C58B`, `--warn #E89C32`, `--danger #D64545`
- **Fontlar**: `--font-display` (Fraunces, italic uchun), `--font-sans` (Manrope)
- **Shadows**: `--shadow-sm`, `--shadow-md`, `--shadow-lg`
- **Buttons**: `.btn`, `.btn-primary`, `.btn-outline`, `.btn-ghost`, `.btn-lg`, `.btn-sm`

## 📱 Responsive

- Desktop (1024+)
- Tablet (640-1024)
- Mobile (<640) — hamburger drawer menu, 2-ustun grid, sticky bottom CTA

## 🔌 Backend integratsiyasi

Barcha ma'lumotlar `src/lib/data/` dagi mock fayllardan keladi. Backend API ga ulash uchun:

1. `src/lib/api/` papka yarating
2. Har bir resurs uchun `fetcher` yozing (axios/fetch)
3. Server Components-da `await fetch(...)` ishlating yoki `useSWR` client-componentlar uchun
4. `src/lib/data/*.ts` ni dynamic import bilan almashtiring

Namuna:
```ts
// src/lib/api/doctors.ts
export async function getDoctors() {
  const res = await fetch(`${process.env.API_URL}/doctors`, { next: { revalidate: 60 } });
  return res.json();
}
```

## 🔮 Kelajakdagi funksiyalar (TZ 13-bo'lim)

- [ ] Online to'lov (Click, Payme, Uzum)
- [ ] SMS tasdiqlash (ESKIZ, Playmobile)
- [ ] Telegram bildirishnomalar
- [ ] AI shifokor tavsiyasi
- [ ] Online video konsultatsiya
- [ ] Elektron tibbiy karta
- [ ] Ko'p tilli (UZ/RU/EN) — `next-intl` yoki `next-i18next`

## 📋 Sahifalar ro'yxati

| URL | Tavsif |
|-----|--------|
| `/` | Bosh sahifa — Hero + Xizmatlar + Shifokorlar + Qanday ishlaydi + Klinikalar + CTA |
| `/doctors` | Shifokorlar katalogi (filtrlash, saralash, pagination) |
| `/doctors/[id]` | Shifokor profili (bio, ta'lim, xizmatlar, sharhlar, booking sidebar) |
| `/services` | Xizmatlar katalogi (filter + card grid) |
| `/services/[slug]` | Xizmat tafsiloti (nimasi kiradi, tayyorlanish, bog'liq doktorlar) |
| `/clinics` | Klinikalar (xarita + 6 filial kartasi) |
| `/blog` | Blog (featured + category filter + 9 maqola) |
| `/blog/[slug]` | Maqola |
| `/booking` | 6-qadamli qabul tizimi |
| `/dashboard` | Bemor kabineti (statistika, qabullar, tahlillar) |
| `/login` + `/register` | Autentifikatsiya |
| `/contact` | Aloqa (info + form + ijtimoiy tarmoqlar) |
| `/about` | Biz haqimizda |

## 🧪 Build

```bash
npm run build
```

Natija: 46 ta statik sahifa (shifokor, xizmat, blog slug variantlari bilan).

## 📄 Litsenziya

Private © MED CLINIC 2026
