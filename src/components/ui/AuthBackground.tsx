export function AuthBackground() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none" style={{ background: "linear-gradient(135deg, #F7FAFF 0%, #EDF4FD 55%, #E3EEFF 100%)" }}>
      {/* Large soft blurred brand orbs — ambient depth */}
      <div className="absolute -top-40 -left-40 w-[640px] h-[640px] rounded-full opacity-40" style={{ background: "radial-gradient(closest-side, rgba(77,148,245,0.35), transparent 70%)", filter: "blur(60px)" }} />
      <div className="absolute -bottom-32 -right-32 w-[720px] h-[720px] rounded-full opacity-45" style={{ background: "radial-gradient(closest-side, rgba(187,209,236,0.6), transparent 70%)", filter: "blur(70px)" }} />
      <div className="absolute top-[30%] right-[18%] w-[320px] h-[320px] rounded-full opacity-25" style={{ background: "radial-gradient(closest-side, rgba(34,197,139,0.25), transparent 70%)", filter: "blur(50px)" }} />

      {/* Flowing wave — top-left (layered, smooth) */}
      <svg className="absolute -top-16 -left-10 w-[620px] h-auto opacity-70" viewBox="0 0 600 500" fill="none" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="wave-tl-1" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#C7DBEF" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#DBE8F8" stopOpacity="0.3" />
          </linearGradient>
          <linearGradient id="wave-tl-2" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#B4CFE9" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#D4E5F4" stopOpacity="0.1" />
          </linearGradient>
        </defs>
        <path d="M-50,0 Q140,180 320,120 Q480,70 650,220 L650,-50 L-50,-50 Z" fill="url(#wave-tl-1)" />
        <path d="M-50,60 Q180,260 380,180 Q520,130 650,300 L650,-50 L-50,-50 Z" fill="url(#wave-tl-2)" />
      </svg>

      {/* Flowing wave — bottom-right (layered) */}
      <svg className="absolute -bottom-20 -right-10 w-[720px] h-auto opacity-75" viewBox="0 0 600 500" fill="none" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="wave-br-1" x1="1" y1="1" x2="0" y2="0">
            <stop offset="0%" stopColor="#B4CFE9" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#DBE8F8" stopOpacity="0.2" />
          </linearGradient>
          <linearGradient id="wave-br-2" x1="1" y1="1" x2="0" y2="0">
            <stop offset="0%" stopColor="#C7DBEF" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#E3EDFA" stopOpacity="0.1" />
          </linearGradient>
        </defs>
        <path d="M650,500 Q440,320 260,380 Q110,420 -50,280 L-50,550 L650,550 Z" fill="url(#wave-br-1)" />
        <path d="M650,440 Q400,240 200,320 Q60,370 -50,200 L-50,550 L650,550 Z" fill="url(#wave-br-2)" />
      </svg>

      {/* Subtle medical plus pattern — top-right accent */}
      <svg className="absolute top-[12%] right-[8%] w-20 h-20 opacity-15 text-brand" viewBox="0 0 48 48" fill="currentColor" aria-hidden>
        <path d="M20 4h8v16h16v8H28v16h-8V28H4v-8h16V4z" />
      </svg>
      <svg className="absolute bottom-[18%] left-[12%] w-14 h-14 opacity-12 text-brand" viewBox="0 0 48 48" fill="currentColor" aria-hidden>
        <path d="M20 4h8v16h16v8H28v16h-8V28H4v-8h16V4z" />
      </svg>

      {/* Fine grid texture overlay — barely visible */}
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "linear-gradient(#1E6DD8 1px, transparent 1px), linear-gradient(90deg, #1E6DD8 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
    </div>
  );
}
