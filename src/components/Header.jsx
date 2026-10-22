import { useState } from 'react';
import LogoFlower from './LogoFlower';
import MobileMenu from './MobileMenu';
import { navLinks } from '../data/site';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <div className="topbar">
        <span className="spark">✦</span>&nbsp; Applied AI for Small Businesses &nbsp;
        <span className="spark">·</span>&nbsp; Northern Virginia &nbsp;
        <span className="spark">✦</span>
      </div>

      <header>
        <div className="nav-wrap">
          <a href="#top" className="brand" aria-label="Full Bloom AI home">
            <div className="brand-logo">
              <LogoFlower size={30} />
            </div>
            <div className="brand-text">
              Full <strong>Bloom</strong> AI
              <small>AI for Small Business</small>
            </div>
          </a>

          <nav className="nav-desktop">
            {navLinks.map(link => (
              <a key={link.href} href={link.href}>{link.label}</a>
            ))}
            <a href="#contact" className="nav-cta">Book a Call</a>
          </nav>

          <button className="hamburger" onClick={() => setMenuOpen(true)} aria-label="Open menu">
            <span></span><span></span><span></span>
          </button>
        </div>
      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
