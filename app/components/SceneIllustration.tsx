type SceneIllustrationProps = {
  className?: string;
};

export default function SceneIllustration({
  className,
}: SceneIllustrationProps) {
  return (
    <svg
      viewBox="0 0 800 520"
      className={className}
      role="img"
      aria-label="Paisaje montanoso estilizado"
    >
      <defs>
        <linearGradient id="sky" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#0f172a" />
          <stop offset="55%" stopColor="#1d4e5f" />
          <stop offset="100%" stopColor="#0b1320" />
        </linearGradient>
        <linearGradient id="haze" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor="#0ea5a4" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="glow" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#22d3ee" stopOpacity="0.1" />
        </linearGradient>
      </defs>
      <rect width="800" height="520" fill="url(#sky)" rx="32" />
      <rect width="800" height="520" fill="url(#haze)" rx="32" />
      <circle cx="580" cy="140" r="90" fill="url(#glow)" />
      <circle cx="170" cy="120" r="60" fill="#0ea5a4" opacity="0.12" />
      <path
        d="M0 360 L120 250 L240 350 L360 210 L520 360 L700 260 L800 340 L800 520 L0 520 Z"
        fill="#0b1320"
      />
      <path
        d="M0 400 L140 320 L260 420 L420 280 L560 420 L720 330 L800 380 L800 520 L0 520 Z"
        fill="#0e1a2b"
      />
      <rect x="360" y="330" width="220" height="80" rx="20" fill="#0f172a" />
      <rect x="380" y="345" width="120" height="45" rx="12" fill="#1f2937" />
      <rect x="510" y="345" width="60" height="45" rx="10" fill="#0ea5a4" />
      <circle cx="410" cy="420" r="18" fill="#0b1320" />
      <circle cx="530" cy="420" r="18" fill="#0b1320" />
    </svg>
  );
}
