import { api, USE_MOCK } from "./client";
import { endpoints } from "./endpoints";
import { doctors as mockDoctors } from "@/lib/data/doctors";
import type { Doctor } from "@/lib/types";

/** Thin service layer — demo returns mock, prod will hit the real endpoint. */
export const doctorsApi = {
  async list(filters?: { specialty?: string; city?: string; q?: string }): Promise<Doctor[]> {
    if (USE_MOCK) {
      return mockDoctors.filter((d) => {
        if (filters?.specialty && d.specialtySlug !== filters.specialty) return false;
        if (filters?.q && !`${d.name} ${d.specialty}`.toLowerCase().includes(filters.q.toLowerCase())) return false;
        return true;
      });
    }
    return api.get<Doctor[]>(endpoints.doctors.list, filters);
  },

  async byId(id: string): Promise<Doctor | null> {
    if (USE_MOCK) return mockDoctors.find((d) => d.id === id) ?? null;
    return api.get<Doctor>(endpoints.doctors.byId(id));
  },
};
