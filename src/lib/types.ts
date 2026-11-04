export type Doctor = {
  id: string;
  name: string;
  specialty: string;
  specialtySlug: string;
  experience: number;
  rating: number;
  reviews: number;
  price: number;
  photo: string;
  available: "today" | "tomorrow" | "later";
  clinic: string;
  bio?: string;
  credentials?: string;
  color: "blue" | "mint" | "lavender" | "pink";
  tags?: string[];
};

export type Service = {
  id: string;
  name: string;
  slug: string;
  category: string;
  description: string;
  priceFrom: number;
  duration: number; // minutes
  icon: string; // emoji fallback
  image?: string; // optional 3D icon image path
  color: "red" | "purple" | "skyblue" | "orange" | "cyan" | "teal" | "deepblue" | "pink";
};

export type Clinic = {
  id: string;
  number: string;
  name: string;
  district: string;
  address: string;
  hours: string;
  phone: string;
  services: string[];
  rating: number;
  reviews: number;
  distance: string;
  status: "open" | "closed";
  statusDetail: string;
  pin: { x: number; y: number };
  coords: { lat: number; lng: number };
};

export type Article = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: "kardio" | "ped" | "derm" | "nevro" | "sog" | "uyqu" | "vit" | "fit" | "psi";
  categoryName: string;
  image: string;
  author: {
    name: string;
    avatar: string;
  };
  date: string;
  readTime: number;
  content?: string;
};

export type Appointment = {
  id: string;
  doctor: Doctor;
  date: string;
  time: string;
  room: string;
  status: "pending" | "confirmed" | "done" | "canceled";
  type: string;
};
