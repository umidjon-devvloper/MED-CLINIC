import { api, USE_MOCK } from "./client";
import { endpoints } from "./endpoints";

export type BookingRequest = {
  doctorId: string;
  serviceSlug?: string;
  date: string;      // YYYY-MM-DD
  time: string;      // HH:MM
  firstName: string;
  lastName: string;
  phone: string;
  dob?: string;
  complaint?: string;
};

export type BookingConfirmation = {
  id: string;
  code: string;      // short confirmation code
  status: "confirmed" | "pending";
  createdAt: string;
};

export const bookingsApi = {
  async create(data: BookingRequest): Promise<BookingConfirmation> {
    if (USE_MOCK) {
      // Simulate network + return a plausible confirmation
      await new Promise((r) => setTimeout(r, 700));
      return {
        id: `bk_${Date.now().toString(36)}`,
        code: `MC-${String(Math.floor(Math.random() * 90000) + 10000)}`,
        status: "confirmed",
        createdAt: new Date().toISOString(),
      };
    }
    return api.post<BookingConfirmation>(endpoints.bookings.create, data);
  },

  async cancel(id: string): Promise<void> {
    if (USE_MOCK) { await new Promise((r) => setTimeout(r, 400)); return; }
    await api.post<void>(endpoints.bookings.cancel(id));
  },
};
