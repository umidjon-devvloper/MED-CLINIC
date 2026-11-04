export type UserRole = "patient" | "doctor";

export type User = {
  phone: string;
  firstName?: string;
  lastName?: string;
  role: UserRole;
  specialty?: string;
  loggedIn: boolean;
};

const STORAGE_KEY = "med-user";

/** Demo credentials — any user can log in with these to try the platform */
export const DEMO_PATIENT = {
  phone: "+998 90 123 45 67",
  password: "bemor123",
  firstName: "Umidjon",
  lastName: "Afforov",
};

export const DEMO_DOCTOR = {
  phone: "+998 90 555 00 00",
  password: "shifokor123",
  firstName: "Alisher",
  lastName: "Qodirov",
  specialty: "Kardiologiya",
};

const normalizePhone = (p: string) => p.replace(/\s+/g, "").trim();

/** Returns the current user, or null if not logged in. SSR-safe. */
export function getUser(): User | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const u = JSON.parse(raw) as User;
    return u.loggedIn ? u : null;
  } catch {
    return null;
  }
}

export function setUser(u: User): void {
  if (typeof window === "undefined") return;
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(u)); } catch { /* ignore */ }
}

export function logout(): void {
  if (typeof window === "undefined") return;
  try { localStorage.removeItem(STORAGE_KEY); } catch { /* ignore */ }
}

/** Mock login — accepts the two demo accounts, OR any phone that looks valid + password ≥ 6 chars.
 *  Returns the signed-in user, or null if the credentials don't pass validation. */
export function tryLogin(phone: string, password: string, requestedRole: UserRole): User | null {
  const p = normalizePhone(phone);
  const demoP = normalizePhone(DEMO_PATIENT.phone);
  const demoD = normalizePhone(DEMO_DOCTOR.phone);

  if (p === demoP && password === DEMO_PATIENT.password) {
    const u: User = { phone: DEMO_PATIENT.phone, firstName: DEMO_PATIENT.firstName, lastName: DEMO_PATIENT.lastName, role: "patient", loggedIn: true };
    setUser(u);
    return u;
  }
  if (p === demoD && password === DEMO_DOCTOR.password) {
    const u: User = { phone: DEMO_DOCTOR.phone, firstName: DEMO_DOCTOR.firstName, lastName: DEMO_DOCTOR.lastName, role: "doctor", specialty: DEMO_DOCTOR.specialty, loggedIn: true };
    setUser(u);
    return u;
  }
  // Fallback: accept any plausible-looking creds so the mock never blocks real exploration
  if (p.replace(/\D/g, "").length >= 9 && password.length >= 6) {
    const u: User = { phone, role: requestedRole, loggedIn: true };
    setUser(u);
    return u;
  }
  return null;
}

export function registerAndLogin(data: Partial<User> & { phone: string; role: UserRole }): User {
  const u: User = { ...data, loggedIn: true };
  setUser(u);
  return u;
}
