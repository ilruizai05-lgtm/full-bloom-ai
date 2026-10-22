import { useId } from 'react';

// The Full Bloom AI flower mark. Gradient ids are made unique per instance so
// several logos can sit on one page (and in the hidden mobile menu) safely.
export default function LogoFlower({ size = 48, className, style }) {
  const id = useId().replace(/:/g, '');
  const a = `pA${id}`, b = `pB${id}`, c = `pC${id}`;
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" className={className} style={style} aria-hidden="true">
      <defs>
        <linearGradient id={a} x1="0%" y1="100%" x2="100%" y2="0%"><stop offset="0%" stopColor="#6B21D6" /><stop offset="50%" stopColor="#3B82F6" /><stop offset="100%" stopColor="#06B6D4" /></linearGradient>
        <linearGradient id={b} x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#3B82F6" /><stop offset="60%" stopColor="#7C3AED" /><stop offset="100%" stopColor="#EC4899" /></linearGradient>
        <linearGradient id={c} x1="50%" y1="0%" x2="50%" y2="100%"><stop offset="0%" stopColor="#06B6D4" /><stop offset="50%" stopColor="#6B21D6" /><stop offset="100%" stopColor="#EC4899" /></linearGradient>
      </defs>
      {[0, 120, 240].map(r => <ellipse key={r} cx="50" cy="28" rx="14" ry="22" fill={`url(#${a})`} stroke="#fff" strokeWidth="2" transform={`rotate(${r} 50 50)`} opacity="0.9" />)}
      {[60, 180, 300].map(r => <ellipse key={r} cx="50" cy="28" rx="14" ry="22" fill={`url(#${b})`} stroke="#fff" strokeWidth="2" transform={`rotate(${r} 50 50)`} opacity="0.9" />)}
      <circle cx="50" cy="50" r="8" fill={`url(#${c})`} />
      <circle cx="50" cy="50" r="5" fill="#fff" opacity="0.7" />
    </svg>
  );
}
