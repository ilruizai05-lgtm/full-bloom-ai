import { navLinks, contact } from '../data/site';

export default function MobileMenu({ open, onClose }) {
  return (
    <div className={`mobile-menu${open ? ' open' : ''}`} aria-hidden={!open}>
      <button className="close" onClick={onClose} aria-label="Close menu">×</button>
      <nav onClick={onClose}>
        {navLinks.map(link => (
          <a key={link.href} href={link.href}>{link.label}</a>
        ))}
      </nav>
      <div className="mobile-menu-cta">
        <a href="#contact" onClick={onClose} className="btn btn-bloom">Book a Free Consultation</a>
        <a href={contact.phoneHref} className="btn btn-outline">Call {contact.phone}</a>
      </div>
    </div>
  );
}
