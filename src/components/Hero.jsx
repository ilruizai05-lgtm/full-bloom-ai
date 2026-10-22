import { useId } from 'react';
import { contact } from '../data/site';

// The logo flower, drawn so each petal can open one after another on load.
function BloomingFlower() {
  const id = useId().replace(/:/g, '');
  const petals = [
    { r: 0, fill: 'a' }, { r: 60, fill: 'b' }, { r: 120, fill: 'a' },
    { r: 180, fill: 'b' }, { r: 240, fill: 'a' }, { r: 300, fill: 'b' },
  ];
  return (
    <svg className="bloom" viewBox="0 0 100 100" aria-hidden="true">
      <defs>
        <linearGradient id={`a${id}`} x1="0%" y1="100%" x2="100%" y2="0%"><stop offset="0%" stopColor="#6B21D6" /><stop offset="50%" stopColor="#3B82F6" /><stop offset="100%" stopColor="#06B6D4" /></linearGradient>
        <linearGradient id={`b${id}`} x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#3B82F6" /><stop offset="60%" stopColor="#7C3AED" /><stop offset="100%" stopColor="#EC4899" /></linearGradient>
        <linearGradient id={`c${id}`} x1="50%" y1="0%" x2="50%" y2="100%"><stop offset="0%" stopColor="#06B6D4" /><stop offset="50%" stopColor="#6B21D6" /><stop offset="100%" stopColor="#EC4899" /></linearGradient>
      </defs>
      <g className="petals">
        {petals.map((p, i) => (
          <g key={p.r} className="petal" style={{ '--r': `${p.r}deg`, animationDelay: `${0.1 + i * 0.12}s` }}>
            <ellipse cx="50" cy="28" rx="14" ry="22" fill={`url(#${p.fill}${id})`} stroke="#fff" strokeWidth="2" />
          </g>
        ))}
      </g>
      <g className="center">
        <circle cx="50" cy="50" r="8" fill={`url(#c${id})`} />
        <circle cx="50" cy="50" r="5" fill="#fff" opacity="0.7" />
      </g>
    </svg>
  );
}

export default function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero-glow g1" />
      <div className="hero-glow g2" />
      <div className="hero-glow g3" />
      <div className="hero-glow g4" />
      <div className="hero-inner">
        <BloomingFlower />
        <div className="hero-eyebrow">Your AI Partner</div>
        <h1 className="hero-name">Full <span>Bloom</span> <b>AI</b></h1>
        <p className="hero-tagline">Grow smarter. <em>Bloom bolder.</em></p>
        <p className="hero-sub">
          We help small businesses harness the power of AI — no jargon, no overwhelm, no six-figure budget. Just real transformation.
        </p>
        <div className="hero-cta">
          <a href="#contact" className="btn btn-bloom">Book a Free Consultation</a>
          <a href={contact.phoneHref} className="btn btn-outline">Call {contact.phone}</a>
        </div>
      </div>
    </section>
  );
}
