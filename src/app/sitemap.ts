import type { MetadataRoute } from "next";
import { doctors } from "@/lib/data/doctors";
import { services } from "@/lib/data/services";
import { articles } from "@/lib/data/articles";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://medclinic.uz";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`,         changeFrequency: "daily",  priority: 1.0, lastModified: now },
    { url: `${SITE_URL}/doctors`,  changeFrequency: "daily",  priority: 0.9, lastModified: now },
    { url: `${SITE_URL}/services`, changeFrequency: "weekly", priority: 0.9, lastModified: now },
    { url: `${SITE_URL}/clinics`,  changeFrequency: "weekly", priority: 0.8, lastModified: now },
    { url: `${SITE_URL}/blog`,     changeFrequency: "daily",  priority: 0.8, lastModified: now },
    { url: `${SITE_URL}/about`,    changeFrequency: "monthly", priority: 0.6, lastModified: now },
    { url: `${SITE_URL}/contact`,  changeFrequency: "monthly", priority: 0.6, lastModified: now },
    { url: `${SITE_URL}/booking`,  changeFrequency: "weekly", priority: 0.9, lastModified: now },
    { url: `${SITE_URL}/login`,    changeFrequency: "yearly", priority: 0.3, lastModified: now },
    { url: `${SITE_URL}/register`, changeFrequency: "yearly", priority: 0.3, lastModified: now },
  ];

  const doctorRoutes: MetadataRoute.Sitemap = doctors.map((d) => ({
    url: `${SITE_URL}/doctors/${d.id}`,
    changeFrequency: "weekly",
    priority: 0.7,
    lastModified: now,
  }));

  const serviceRoutes: MetadataRoute.Sitemap = services.map((s) => ({
    url: `${SITE_URL}/services/${s.slug}`,
    changeFrequency: "monthly",
    priority: 0.7,
    lastModified: now,
  }));

  const articleRoutes: MetadataRoute.Sitemap = articles.map((a) => ({
    url: `${SITE_URL}/blog/${a.slug}`,
    changeFrequency: "monthly",
    priority: 0.6,
    lastModified: now,
  }));

  return [...staticRoutes, ...doctorRoutes, ...serviceRoutes, ...articleRoutes];
}
