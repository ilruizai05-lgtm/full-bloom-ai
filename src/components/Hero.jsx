import LogoFlower from './LogoFlower';
import { contact } from '../data/site';

export default function Hero() {
  return (
    <section className="hero" id="top">
      <LogoFlower size={560} className="hero-flower" />
      <div className="hero-inner">
        <div className="hero-eyebrow">Applied AI for Small Businesses</div>
        <h1>Grow smarter.<br /><em>Bloom</em> bolder.</h1>
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
