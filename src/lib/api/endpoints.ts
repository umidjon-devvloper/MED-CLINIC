/** Backend endpoint paths — one place to rename when the API evolves. */
export const endpoints = {
  doctors: {
    list:   "/doctors",
    byId:   (id: string) => `/doctors/${id}`,
    reviews: (id: string) => `/doctors/${id}/reviews`,
    slots:   (id: string) => `/doctors/${id}/slots`,
  },
  services: {
    list:   "/services",
    bySlug: (slug: string) => `/services/${slug}`,
  },
  clinics: {
    list:   "/clinics",
    byId:   (id: string) => `/clinics/${id}`,
  },
  articles: {
    list:   "/articles",
    bySlug: (slug: string) => `/articles/${slug}`,
  },
  bookings: {
    create: "/bookings",
    list:   "/bookings",
    cancel: (id: string) => `/bookings/${id}/cancel`,
  },
  auth: {
    login:    "/auth/login",
    register: "/auth/register",
    me:       "/auth/me",
    logout:   "/auth/logout",
  },
  contact: {
    send: "/contact",
  },
} as const;
