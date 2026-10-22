import { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, CheckCircle } from 'lucide-react';
import LogoFlower from './LogoFlower';
import { contact } from '../data/site';

export function ContactCards() {
  return (
    <section className="contact-section">
      <div className="container reveal">
        <div className="section-eyebrow">Get in Touch</div>
        <h2 className="section-title">Prefer to reach out <em>directly?</em></h2>
        <p className="section-intro">Email or call any time — no pressure, no obligation.</p>

        <div className="contact-grid">
          <div className="contact-card">
            <h3><span className="icon"><Mail size={16} /></span>Email</h3>
            <p><a href={`mailto:${contact.email}`}><strong>{contact.email}</strong></a><br />We reply within 24 hours.</p>
          </div>
          <div className="contact-card">
            <h3><span className="icon"><Phone size={16} /></span>Phone</h3>
            <p><a href={contact.phoneHref}><strong>{contact.phone}</strong></a><br /><MapPin size={13} style={{ verticalAlign: '-2px' }} /> Based in {contact.area}</p>
          </div>
          <div className="contact-card">
            <h3><span className="icon"><CheckCircle size={16} /></span>What to Expect</h3>
            <ul className="expect-list">
              {['Free 30-min consultation', 'No obligation, no pressure', 'Clear next steps after every call'].map(i => (
                <li key={i}><CheckCircle size={14} />{i}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer>
      <div className="footer-brand">
        <LogoFlower size={36} />
        <span className="footer-logo">Full Bloom AI</span>
      </div>
      <div className="footer-tag">Applied AI for Small Businesses · {contact.area}</div>
      <div className="footer-divider"></div>
      <div className="footer-info">
        <a href={`mailto:${contact.email}`}>{contact.email}</a><br />
        <a href={contact.phoneHref}>{contact.phone}</a>
      </div>
      <div className="footer-bottom">
        © {new Date().getFullYear()} Full Bloom AI · All Rights Reserved
      </div>
    </footer>
  );
}

export function StickyMobileCTA() {
  return (
    <div className="sticky-cta">
      <a href="#contact">Book a Consult</a>
      <a href={contact.phoneHref}><Phone size={16} />Call Now</a>
    </div>
  );
}

export function BackToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <button
      className={`back-to-top${show ? ' show' : ''}`}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Back to top"
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <path d="M18 15l-6-6-6 6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
}
