export type Section = "overview" | "schedule" | "patients" | "records" | "reviews" | "revenue" | "settings";

export type Appt = {
  id: string;
  time: string;
  patient: string;
  initials: string;
  bg: string;
  reason: string;
  type: "in-person" | "online" | "phone";
  status: "upcoming" | "in-progress" | "done" | "cancel";
};

export type Patient = {
  id: string;
  name: string;
  initials: string;
  bg: string;
  age: number;
  phone: string;
  last: string;
  visits: number;
  diag: string;
};

export type Review = {
  id: string;
  name: string;
  initials: string;
  bg: string;
  stars: number;
  date: string;
  text: string;
  reply: string;
};

export type RecordItem = {
  id: string;
  patient: string;
  type: string;
  title: string;
  date: string;
  status: "ready" | "sent" | "pending";
  fileName: string;
};

export type ScheduleEntry = { label: string; type: "patient" | "break" };

export type DoctorSettings = {
  firstName: string;
  lastName: string;
  specialty: string;
  experience: number;
  price: number;
  bio: string;
  credentials: string;
  bioFull: string;
  languages: string;
  online: boolean;
  tags: string[];
  education: { year: string; title: string; desc: string; where: string }[];
  extraServices: { name: string; price: number }[];
};
