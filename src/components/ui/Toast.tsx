"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { CheckCircle2, XCircle, Info, X } from "lucide-react";

type ToastType = "success" | "error" | "info";
type Toast = { id: number; type: ToastType; message: string };

type ToastContextType = {
  show: (message: string, type?: ToastType) => void;
};

const ToastContext = createContext<ToastContextType | null>(null);

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    // Fallback: use window.alert if provider missing
    return { show: (m: string) => window.alert(m) };
  }
  return ctx;
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const show = useCallback((message: string, type: ToastType = "success") => {
    const id = Date.now() + Math.random();
    setToasts((t) => [...t, { id, type, message }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 4000);
  }, []);

  const close = (id: number) => setToasts((t) => t.filter((x) => x.id !== id));

  return (
    <ToastContext.Provider value={{ show }}>
      {children}
      {toasts.length > 0 && (
        <div className="fixed top-4 right-4 z-[200] flex flex-col gap-2 pointer-events-none">
          {toasts.map((t) => {
            const Icon = t.type === "success" ? CheckCircle2 : t.type === "error" ? XCircle : Info;
            const color = t.type === "success" ? "var(--accent)" : t.type === "error" ? "var(--danger)" : "var(--brand)";
            return (
              <div
                key={t.id}
                className="pointer-events-auto bg-white border border-line rounded-xl shadow-lg px-4 py-3 flex items-start gap-3 min-w-[280px] max-w-[380px] animate-in slide-in-from-right"
                style={{ animation: "slideIn 0.25s ease-out" }}
              >
                <Icon className="w-5 h-5 shrink-0 mt-0.5" style={{ color }} />
                <p className="text-sm text-ink flex-1">{t.message}</p>
                <button onClick={() => close(t.id)} aria-label="Yopish" className="text-muted hover:text-ink">
                  <X className="w-4 h-4" />
                </button>
              </div>
            );
          })}
          <style>{`@keyframes slideIn { from { transform: translateX(100%); opacity: 0 } to { transform: translateX(0); opacity: 1 } }`}</style>
        </div>
      )}
    </ToastContext.Provider>
  );
}

// Hook for favorite/bookmark state persisted in localStorage
export function useFavorite(key: string, id: string) {
  const [on, setOn] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const list: string[] = JSON.parse(localStorage.getItem(key) || "[]");
      setOn(list.includes(id));
    } catch {}
  }, [key, id]);
  const toggle = useCallback(() => {
    try {
      const list: string[] = JSON.parse(localStorage.getItem(key) || "[]");
      const next = list.includes(id) ? list.filter((x) => x !== id) : [...list, id];
      localStorage.setItem(key, JSON.stringify(next));
      setOn(next.includes(id));
    } catch {}
  }, [key, id]);
  return [on, toggle] as const;
}
