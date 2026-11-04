import type { Service } from "@/lib/types";

export const services: Service[] = [
  { id: "kardio", name: "Kardiologiya", slug: "kardiologiya", category: "Yurak-qon tomir", description: "Yurak-qon tomir tizimi tashxisi va davolash.", priceFrom: 250000, duration: 30, icon: "❤️", image: "/images/services/kardio.webp", color: "red" },
  { id: "nevro", name: "Nevrologiya", slug: "nevrologiya", category: "Bosh miya", description: "Nerv tizimi va bosh miya kasalliklari.", priceFrom: 230000, duration: 30, icon: "🧠", image: "/images/services/brain.webp", color: "purple" },
  { id: "stomato", name: "Stomatologiya", slug: "stomatologiya", category: "Og'iz", description: "Tishlarni davolash, protezlash, oqartirish.", priceFrom: 120000, duration: 45, icon: "🦷", image: "/images/services/tooth.webp", color: "skyblue" },
  { id: "pediatriya", name: "Pediatriya", slug: "pediatriya", category: "Bolalar", description: "Bolalar sog'lig'i — tug'ilgandan 18 yoshgacha.", priceFrom: 180000, duration: 30, icon: "🧸", image: "/images/services/pediatric.webp", color: "orange" },
  { id: "lab", name: "Laboratoriya", slug: "laboratoriya", category: "Tahlillar", description: "400+ tahlil turi. Natijalar 24 soat ichida.", priceFrom: 45000, duration: 15, icon: "🧪", image: "/images/services/lab.png", color: "cyan" },
  { id: "uzi", name: "UZI diagnostikasi", slug: "uzi", category: "Diagnostika", description: "Qorin bo'shlig'i, qalqonsimon bez, homilador uchun.", priceFrom: 150000, duration: 20, icon: "🖥️", image: "/images/services/uzi.webp", color: "teal" },
  { id: "mrt", name: "MRT va KT", slug: "mrt-kt", category: "Diagnostika", description: "Zamonaviy Siemens apparati. 1.5 Tesla.", priceFrom: 450000, duration: 40, icon: "🏥", image: "/images/services/mrt.webp", color: "deepblue" },
  { id: "derma", name: "Dermatologiya", slug: "dermatologiya", category: "Teri", description: "Teri kasalliklari, kosmetologiya, lazer terapiya.", priceFrom: 200000, duration: 30, icon: "🔬", image: "/images/services/skin.webp", color: "pink" },
  { id: "terapiya", name: "Terapiya", slug: "terapiya", category: "Umumiy", description: "Umumiy terapevt qabuli va dastlabki ko'rik.", priceFrom: 150000, duration: 30, icon: "🩺", color: "cyan" },
  { id: "urologiya", name: "Urologiya", slug: "urologiya", category: "Siydik yo'llari", description: "Siydik tizimi va erkaklar sog'lig'i.", priceFrom: 220000, duration: 30, icon: "💊", color: "skyblue" },
  { id: "gineko", name: "Ginekologiya", slug: "ginekologiya", category: "Ayollar", description: "Ayollar sog'lig'i, homiladorlikni kuzatish.", priceFrom: 240000, duration: 40, icon: "👩‍⚕️", color: "pink" },
  { id: "endokrin", name: "Endokrinologiya", slug: "endokrinologiya", category: "Gormonlar", description: "Qandli diabet, qalqonsimon bez, gormonlar.", priceFrom: 260000, duration: 30, icon: "💉", color: "purple" },
];

export const specialtyCounts = {
  kardiologiya: 24,
  nevrologiya: 18,
  stomatologiya: 31,
  pediatriya: 22,
  dermatologiya: 14,
  terapiya: 28,
};
