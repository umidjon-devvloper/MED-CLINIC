"use client";

import { useEffect, useRef, useState } from "react";
import { X, Send, Paperclip, Shield, CheckCheck } from "lucide-react";

type Message = { id: string; text: string; from: "me" | "doc"; time: string };

const CANNED_REPLIES = [
  "Salom! Qaysi muammo bo'yicha murojaat qilayapsiz?",
  "Albatta, tushundim. Qabulga yozilsangiz batafsil ko'rib chiqamiz.",
  "Hozircha tahlil natijalarini yuklab, keyin jarayonni muhokama qilsak.",
  "Yaxshi. Agar og'riq kuchaysa, zudlik bilan qabulga keling.",
];

const fmtTime = () => {
  const d = new Date();
  return `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
};

export function MessageModal({ docId, docName, docPhoto, onClose }: { docId: string; docName: string; docPhoto?: string; onClose: () => void }) {
  const storeKey = `med-chat-${docId}`;
  const [messages, setMessages] = useState<Message[]>([]);
  const [draft, setDraft] = useState("");
  const [typing, setTyping] = useState(false);
  const feedRef = useRef<HTMLDivElement>(null);

  // Load + Esc key
  useEffect(() => {
    try {
      const raw = localStorage.getItem(storeKey);
      if (raw) {
        setMessages(JSON.parse(raw));
      } else {
        setMessages([{ id: "sys", text: `Assalomu alaykum, men ${docName}. Nima bilan yordam bera olaman?`, from: "doc", time: fmtTime() }]);
      }
    } catch { /* ignore */ }
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [storeKey, docName, onClose]);

  // Persist
  useEffect(() => {
    try { localStorage.setItem(storeKey, JSON.stringify(messages)); } catch { /* ignore */ }
    // Scroll to bottom
    if (feedRef.current) feedRef.current.scrollTop = feedRef.current.scrollHeight;
  }, [messages, storeKey]);

  const send = (e: React.FormEvent) => {
    e.preventDefault();
    const v = draft.trim();
    if (!v) return;
    const mine: Message = { id: `m${Date.now()}`, text: v, from: "me", time: fmtTime() };
    setMessages((m) => [...m, mine]);
    setDraft("");
    // Simulated reply after short delay
    setTyping(true);
    setTimeout(() => {
      const reply = CANNED_REPLIES[Math.floor(Math.random() * CANNED_REPLIES.length)];
      const r: Message = { id: `r${Date.now()}`, text: reply, from: "doc", time: fmtTime() };
      setMessages((m) => [...m, r]);
      setTyping(false);
    }, 1200 + Math.random() * 800);
  };

  const clearChat = () => {
    if (!confirm("Suhbatni butunlay o'chirmoqchimisiz?")) return;
    try { localStorage.removeItem(storeKey); } catch { /* ignore */ }
    setMessages([{ id: "sys", text: `Assalomu alaykum, men ${docName}. Nima bilan yordam bera olaman?`, from: "doc", time: fmtTime() }]);
  };

  return (
    <div className="fixed inset-0 z-50 grid place-items-center p-4 bg-ink/40 backdrop-blur-sm" onClick={onClose}>
      <div className="w-full max-w-md h-[640px] max-h-[90vh] bg-surface rounded-2xl shadow-2xl overflow-hidden flex flex-col" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <header className="px-5 py-4 border-b border-line flex items-center gap-3 shrink-0">
          <div className="relative">
            <div className="w-11 h-11 rounded-full overflow-hidden shrink-0" style={{ background: "linear-gradient(165deg, #D7E8FA, #B5D4F2)" }}>
              {docPhoto ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img src={docPhoto} alt={docName} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full grid place-items-center text-brand font-bold text-sm">{docName.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase()}</div>
              )}
            </div>
            <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-accent border-2 border-white" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-bold text-ink text-sm truncate">{docName}</div>
            <div className="text-[11.5px] text-accent inline-flex items-center gap-1 font-semibold"><span className="w-1.5 h-1.5 rounded-full bg-accent" />Onlayn</div>
          </div>
          <button onClick={clearChat} className="text-[11px] font-semibold text-muted hover:text-danger px-2 py-1">Tozalash</button>
          <button onClick={onClose} aria-label="Yopish" className="w-8 h-8 rounded-lg text-ink-soft hover:bg-bg grid place-items-center"><X className="w-4 h-4" /></button>
        </header>

        <div ref={feedRef} className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3 bg-bg">
          <div className="text-center">
            <span className="inline-flex items-center gap-1.5 text-[11px] text-ink-soft bg-surface px-3 py-1.5 rounded-full border border-line">
              <Shield className="w-3 h-3 text-accent" />
              Suhbat xavfsiz. Faqat siz va shifokor ko&apos;ra oladi.
            </span>
          </div>
          {messages.map((m) => (
            <div key={m.id} className={`flex ${m.from === "me" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[75%] ${m.from === "me" ? "bg-brand text-white rounded-2xl rounded-br-md" : "bg-surface text-ink rounded-2xl rounded-bl-md border border-line"} px-3.5 py-2.5 shadow-sm`} style={m.from === "me" ? { color: "#fff" } : undefined}>
                <div className="text-[13.5px] leading-relaxed">{m.text}</div>
                <div className={`text-[10.5px] mt-1 flex items-center gap-1 ${m.from === "me" ? "text-white/70 justify-end" : "text-muted"}`} style={m.from === "me" ? { color: "rgba(255,255,255,0.7)" } : undefined}>
                  {m.time}
                  {m.from === "me" && <CheckCheck className="w-3 h-3" />}
                </div>
              </div>
            </div>
          ))}
          {typing && (
            <div className="flex justify-start">
              <div className="bg-surface border border-line rounded-2xl rounded-bl-md px-4 py-3 inline-flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-muted animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="w-1.5 h-1.5 rounded-full bg-muted animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="w-1.5 h-1.5 rounded-full bg-muted animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          )}
        </div>

        {/* Composer */}
        <form onSubmit={send} className="px-4 py-3 border-t border-line flex items-center gap-2 shrink-0 bg-surface">
          <button type="button" onClick={() => alert("Fayl biriktirish — tez orada")} className="w-9 h-9 rounded-lg text-ink-soft hover:bg-bg hover:text-brand grid place-items-center shrink-0"><Paperclip className="w-[18px] h-[18px]" /></button>
          <input
            type="text"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="Xabar yozing..."
            className="flex-1 px-3 py-2.5 bg-bg border border-line rounded-xl text-sm text-ink outline-none focus:border-brand"
            autoFocus
          />
          <button type="submit" disabled={!draft.trim()} style={{ color: "#fff" }} className="w-10 h-10 rounded-xl bg-brand hover:bg-brand-ink grid place-items-center text-white disabled:opacity-40 disabled:cursor-not-allowed shrink-0 transition-colors">
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
