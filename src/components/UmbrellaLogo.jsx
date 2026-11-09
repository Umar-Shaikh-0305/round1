// CSS/SVG stand-in for the Umbrella logo: eight alternating red and white wedges.
// Swap for the real logo file later by replacing this component's contents.
function wedge(i) {
  const toRad = (d) => (d * Math.PI) / 180;
  const a0 = toRad(i * 45 - 90 - 22.5);
  const a1 = toRad(i * 45 - 90 + 22.5);
  const r = 46;
  const x0 = 50 + r * Math.cos(a0);
  const y0 = 50 + r * Math.sin(a0);
  const x1 = 50 + r * Math.cos(a1);
  const y1 = 50 + r * Math.sin(a1);
  return `M50 50 L${x0.toFixed(2)} ${y0.toFixed(2)} A${r} ${r} 0 0 1 ${x1.toFixed(2)} ${y1.toFixed(2)} Z`;
}

export default function UmbrellaLogo({ size = 64, className = '' }) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 100 100"
      role="img"
      aria-label="Umbrella Corporation logo"
    >
      {Array.from({ length: 8 }, (_, i) => (
        <path
          key={i}
          d={wedge(i)}
          fill={i % 2 === 0 ? '#c8323d' : '#dfe4ea'}
          stroke="#0a0c10"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
      ))}
    </svg>
  );
}
