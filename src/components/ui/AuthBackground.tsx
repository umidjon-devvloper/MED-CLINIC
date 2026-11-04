export function AuthBackground() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none" style={{ background: "linear-gradient(180deg, #F7FAFF 0%, #EDF4FD 100%)" }}>
      <svg className="absolute -top-20 -left-20 w-[720px] h-[720px] opacity-60" viewBox="0 0 600 600" fill="none">
        <path d="M0,0 Q180,120 320,80 T600,180 L600,0 Z" fill="#DBE8F8" />
        <path d="M0,0 Q220,180 400,120 T600,260 L600,0 Z" fill="#CDDCEF" opacity="0.5" />
      </svg>
      <svg className="absolute -bottom-32 -right-24 w-[760px] h-[760px] opacity-70" viewBox="0 0 600 600" fill="none">
        <path d="M600,600 Q420,500 260,540 T0,460 L0,600 Z" fill="#DBE8F8" />
        <path d="M600,600 Q380,440 180,500 T0,380 L0,600 Z" fill="#CDDCEF" opacity="0.5" />
      </svg>
      <svg className="absolute bottom-0 -left-32 w-[480px] h-[480px] opacity-40" viewBox="0 0 400 400" fill="none">
        <path d="M0,400 Q120,320 240,340 T400,280 L400,400 Z" fill="#E3EDFA" />
      </svg>
    </div>
  );
}
