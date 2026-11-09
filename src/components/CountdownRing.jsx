import { formatHMS } from '../lib/time.js';

// Circular countdown. progress is 0..1 (how much of the ring stays filled).
// tone: 'red' | 'grey' | 'gold' | 'green'
export default function CountdownRing({ seconds, progress = 1, tone = 'red', label = 'TIME REMAINING' }) {
  const r = 52;
  const c = 2 * Math.PI * r;
  const p = Math.min(1, Math.max(0, progress));
  return (
    <div className={`ring ring--${tone}`}>
      <svg viewBox="0 0 120 120" className="ring__svg" aria-hidden="true">
        <circle className="ring__track" cx="60" cy="60" r={r} />
        <circle
          className="ring__bar"
          cx="60"
          cy="60"
          r={r}
          strokeDasharray={c}
          strokeDashoffset={c * (1 - p)}
          transform="rotate(-90 60 60)"
        />
      </svg>
      <div className="ring__text">
        <span className="ring__time">{formatHMS(seconds)}</span>
        <span className="ring__label">{label}</span>
      </div>
    </div>
  );
}
