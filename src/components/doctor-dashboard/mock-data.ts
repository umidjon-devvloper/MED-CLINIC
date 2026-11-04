import { Home as HomeIcon, Calendar, FileText, Users, Star, DollarSign, Settings, FlaskConical, Pill, Activity, ScanLine } from "lucide-react";
import type { Section, Appt, Patient, Review, RecordItem, ScheduleEntry, DoctorSettings } from "./types";

export const SETTINGS_KEY = "med-doctor-settings";

export const sidebar: { key: Section; icon: typeof HomeIcon; label: string; badge?: string | number }[] = [
  { key: "overview", icon: HomeIcon, label: "Umumiy" },
  { key: "schedule", icon: Calendar, label: "Jadvalim", badge: 6 },
  { key: "patients", icon: Users, label: "Mening bemorlarim" },
  { key: "records", icon: FileText, label: "Tahlillar va retseptlar" },
  { key: "reviews", icon: Star, label: "Sharhlar", badge: "412" },
  { key: "revenue", icon: DollarSign, label: "Daromad" },
  { key: "settings", icon: Settings, label: "Sozlamalar" },
];

export const palette = [
  "linear-gradient(135deg, #4D94F5, #1E6DD8)",
  "linear-gradient(135deg, #22C58B, #0E8F5B)",
  "linear-gradient(135deg, #E89C32, #B8731A)",
  "linear-gradient(135deg, #D879B5, #B5478F)",
  "linear-gradient(135deg, #D64545, #B81E1E)",
  "linear-gradient(135deg, #9F7AEA, #6E4FC9)",
];

export const initialAppts: Appt[] = [
  { id: "a1", time: "09:00", patient: "Madina Karimova", initials: "MK", bg: palette[0], reason: "Birlamchi konsultatsiya", type: "in-person", status: "done" },
  { id: "a2", time: "10:30", patient: "Bobur Toshmatov", initials: "BT", bg: palette[1], reason: "Yurak EKG", type: "in-person", status: "done" },
  { id: "a3", time: "11:30", patient: "Aziz Rahimov", initials: "AR", bg: palette[2], reason: "Takroriy qabul", type: "online", status: "in-progress" },
  { id: "a4", time: "13:00", patient: "Nilufar Yusupova", initials: "NY", bg: palette[3], reason: "Konsultatsiya", type: "phone", status: "upcoming" },
  { id: "a5", time: "14:30", patient: "Jahongir A.", initials: "JA", bg: palette[4], reason: "EXO (Yurak UZI)", type: "in-person", status: "upcoming" },
  { id: "a6", time: "16:00", patient: "Kamola S.", initials: "KS", bg: palette[5], reason: "Birlamchi konsultatsiya", type: "in-person", status: "upcoming" },
];

export const initialPatients: Patient[] = [
  { id: "p1", name: "Madina Karimova", initials: "MK", bg: palette[0], age: 42, phone: "+998 90 123 45 67", last: "Bugun", visits: 8, diag: "Gipertoniya II dar." },
  { id: "p2", name: "Bobur Toshmatov", initials: "BT", bg: palette[1], age: 58, phone: "+998 91 234 56 78", last: "Bugun", visits: 12, diag: "Koronar yurak kas." },
  { id: "p3", name: "Nilufar Yusupova", initials: "NY", bg: palette[3], age: 35, phone: "+998 93 345 67 89", last: "Kecha", visits: 4, diag: "Aritmiya" },
  { id: "p4", name: "Sardor Umarov", initials: "SU", bg: palette[2], age: 51, phone: "+998 94 456 78 90", last: "2 kun oldin", visits: 6, diag: "Gipertoniya I dar." },
  { id: "p5", name: "Jahongir Aliyev", initials: "JA", bg: palette[4], age: 47, phone: "+998 95 567 89 01", last: "5 kun oldin", visits: 3, diag: "Yurak etishmovchiligi" },
  { id: "p6", name: "Kamola Saidova", initials: "KS", bg: palette[5], age: 38, phone: "+998 97 678 90 12", last: "1 hafta oldin", visits: 2, diag: "Dastlabki tashxis" },
];

export const initialReviews: Review[] = [
  { id: "r1", name: "Madina K.", initials: "MK", bg: palette[0], stars: 5, date: "Bugun", text: "Juda professional va diqqatli shifokor. Barcha savollarimga javob berdi.", reply: "" },
  { id: "r2", name: "Bobur T.", initials: "BT", bg: palette[1], stars: 5, date: "3 kun oldin", text: "5 yildan beri Alisher aka'ga qatnayman. Oilamizning kardiologi.", reply: "" },
  { id: "r3", name: "Nilufar R.", initials: "NR", bg: palette[2], stars: 4, date: "1 hafta oldin", text: "Yaxshi mutaxassis, tashxisni to'g'ri qo'ydi. Faqat navbat biroz uzoqroq edi.", reply: "" },
  { id: "r4", name: "Sardor U.", initials: "SU", bg: palette[3], stars: 5, date: "2 hafta oldin", text: "Hamma narsani batafsil tushuntirdi, davolash samarali bo'ldi.", reply: "" },
];

export const chartData = [
  { month: "Iyun", value: 8.4 },
  { month: "Iyul", value: 9.2 },
  { month: "Avg", value: 10.1 },
  { month: "Sen", value: 11.5 },
  { month: "Okt", value: 12.0 },
  { month: "Noy", value: 14.2 },
];

export const transactions = [
  { date: "7-noyabr", patient: "Madina Karimova", service: "Birlamchi konsultatsiya", amount: 250000 },
  { date: "7-noyabr", patient: "Bobur Toshmatov", service: "Yurak EKG", amount: 320000 },
  { date: "6-noyabr", patient: "Aziz Rahimov", service: "Takroriy qabul", amount: 180000 },
  { date: "6-noyabr", patient: "Sardor Umarov", service: "EXO (Yurak UZI)", amount: 350000 },
  { date: "5-noyabr", patient: "Nilufar Yusupova", service: "Konsultatsiya", amount: 250000 },
  { date: "5-noyabr", patient: "Jahongir A.", service: "Holter monitoring", amount: 480000 },
];

export const weekDays = ["Du", "Se", "Ch", "Pa", "Ju", "Sh", "Ya"];
export const dayNums = [3, 4, 5, 6, 7, 8, 9];
export const timeSlots = ["08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"];

export const initialSchedule: Record<string, ScheduleEntry> = {
  "Ju-09:00": { label: "Madina K.", type: "patient" },
  "Ju-10:00": { label: "Bobur T.", type: "patient" },
  "Ju-11:00": { label: "Aziz R.", type: "patient" },
  "Ju-13:00": { label: "Nilufar Y.", type: "patient" },
  "Ju-14:00": { label: "Jahongir A.", type: "patient" },
  "Ju-16:00": { label: "Kamola S.", type: "patient" },
  "Ju-12:00": { label: "Tanaffus", type: "break" },
  "Pa-10:00": { label: "Umid K.", type: "patient" },
  "Pa-15:00": { label: "Dilnoza M.", type: "patient" },
  "Ch-11:00": { label: "Sarvar N.", type: "patient" },
  "Ch-14:00": { label: "Shahnoza R.", type: "patient" },
  "Se-09:00": { label: "Rustam O.", type: "patient" },
  "Se-13:00": { label: "Zebo U.", type: "patient" },
  "Du-10:00": { label: "Botir X.", type: "patient" },
};

export const initialRecords: RecordItem[] = [
  { id: "rec1", patient: "Madina Karimova", type: "Tahlil", title: "Umumiy qon tahlili", date: "7-noyabr", status: "ready", fileName: "" },
  { id: "rec2", patient: "Bobur Toshmatov", type: "EKG", title: "Yurak EKG natijasi", date: "7-noyabr", status: "ready", fileName: "" },
  { id: "rec3", patient: "Aziz Rahimov", type: "Retsept", title: "Konkor 5mg · 30 kun", date: "6-noyabr", status: "sent", fileName: "" },
  { id: "rec4", patient: "Sardor Umarov", type: "UZI", title: "EXO natijasi", date: "6-noyabr", status: "ready", fileName: "" },
  { id: "rec5", patient: "Nilufar Yusupova", type: "Tahlil", title: "Biokimyoviy qon tahlili", date: "5-noyabr", status: "pending", fileName: "" },
  { id: "rec6", patient: "Jahongir A.", type: "Retsept", title: "Lozap 50mg · 60 kun", date: "5-noyabr", status: "sent", fileName: "" },
];

export const recordTypes: Record<string, { icon: typeof FileText; color: string; bg: string }> = {
  "Tahlil":  { icon: FlaskConical, color: "#9F7AEA", bg: "rgba(159,122,234,0.14)" },
  "Retsept": { icon: Pill,         color: "#22C58B", bg: "rgba(34,197,139,0.14)" },
  "EKG":     { icon: Activity,     color: "#D64545", bg: "rgba(214,69,69,0.14)" },
  "UZI":     { icon: ScanLine,     color: "#1E6DD8", bg: "rgba(30,109,216,0.14)" },
  "default": { icon: FileText,     color: "#4A6684", bg: "rgba(74,102,132,0.14)" },
};

export const defaultSettings: DoctorSettings = {
  firstName: "Alisher",
  lastName: "Qodirov",
  specialty: "Kardiologiya",
  experience: 14,
  price: 250000,
  bio: "Yurak-qon tomir kasalliklari bo'yicha 14 yillik tajribaga ega mutaxassis.",
  credentials: "O'zbekiston Respublikasi Sog'liqni saqlash vazirligi tomonidan litsenziyalangan",
  bioFull: "Yurak-qon tomir kasalliklari — koronar yurak kasalligi, gipertoniya, aritmiya va yurak etishmovchiligi tashxislashda yetakchi mutaxassislardan biri. Zamonaviy EXO va stress-test apparatlari bilan ishlaydi.",
  languages: "O'zbek, Rus, Ingliz",
  online: true,
  tags: ["Kardiologiya", "EKG", "Gipertoniya"],
  education: [
    { year: "2010", title: "Toshkent Tibbiyot Akademiyasi", desc: "Davolash fakulteti · Imtiyozli diplom", where: "Toshkent" },
    { year: "2013", title: "Vena Universiteti · Residentura", desc: "Kardiologiya bo'yicha 3 yillik ixtisoslashuv", where: "Vena, Avstriya" },
    { year: "2018", title: "PhD · Kardiologiya", desc: "\"Yoshlar orasida koronar yurak kasalligi\" dissertatsiyasi", where: "" },
  ],
  extraServices: [
    { name: "Birlamchi konsultatsiya", price: 250000 },
    { name: "Takroriy qabul", price: 180000 },
    { name: "EKG + sharhlash", price: 120000 },
    { name: "EXO (Yurak UZI)", price: 350000 },
  ],
};
