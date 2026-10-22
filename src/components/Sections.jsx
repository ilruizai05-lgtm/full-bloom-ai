import { Shield, Target, Users, Sparkles, CheckCircle, Plus } from 'lucide-react';
import LogoFlower from './LogoFlower';
import { stats, industries, services, steps, work, faqs } from '../data/site';

export function TrustStrip() {
  return (
    <div className="trust-strip">
      <div className="trust-grid">
        {stats.map(s => (
          <div className="trust-item" key={s.label}>
            <span className="num">{s.num}</span>
            <span className="label">{s.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function Industries() {
  return (
    <section className="industries-section">
      <div className="industries-label">Industries We Serve</div>
      <div className="industries-grid">
        {industries.map(name => (
          <span className="industry-name" key={name}>{name}</span>
        ))}
      </div>
    </section>
  );
}

export function Services() {
  return (
    <section className="services-section" id="services">
      <div className="container reveal">
        <div className="section-eyebrow">What We Do</div>
        <h2 className="section-title">AI that <em>actually</em> moves the needle.</h2>
        <p className="section-intro">
          New tools every day, buzzwords everywhere. We cut through the noise and build solutions that deliver from day one.
        </p>

        <div className="services-grid">
          {services.map(s => (
            <div className="service-card" key={s.title}>
              <div className="icon"><s.icon size={24} strokeWidth={1.5} /></div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const values = [
  { icon: Shield, label: 'Trusted & Transparent' },
  { icon: Target, label: 'Results-Driven' },
  { icon: Users, label: 'Built to Scale' },
  { icon: Sparkles, label: 'Innovation-First' },
];

export function Story() {
  return (
    <section className="story-section" id="about">
      <div className="container">
        <div className="story-grid reveal">
          <div className="story-visual">
            <LogoFlower size={260} />
            <div className="wordmark">Full Bloom AI</div>
          </div>
          <div className="story-text">
            <div className="section-eyebrow">Who We Are</div>
            <h2 className="section-title">Your AI partner, <em>not your IT department.</em></h2>
            <p>You know AI could change everything for your business — you just need the right partner. You’re running a business, not studying for a tech degree.</p>
            <p>We bring together expertise in AI engineering, healthcare, and business operations to deliver solutions that work in the real world. You’ll never feel lost, oversold, or left behind: we explain everything plainly, recommend only what you need, and don’t stop until it’s working.</p>
            <div className="mission-quote">
              “Every small business deserves AI that works as hard as they do — without the complexity, gatekeeping, or sticker shock.”
              <small>— The Full Bloom AI Mission</small>
            </div>
            <div className="values-row">
              {values.map(v => (
                <span className="value-chip" key={v.label}><v.icon size={14} />{v.label}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function OurWork() {
  return (
    <section className="work-section" id="work">
      <div className="container reveal">
        <div className="section-eyebrow">Recent Work</div>
        <h2 className="section-title">Real projects for <em>real businesses.</em></h2>
        <p className="section-intro">
          A look at what we’ve built for local owners — practical tools that save time and bring in customers.
        </p>
        <div className="work-grid">
          {work.map(w => (
            <article className="work-card" key={w.title}>
              <div className="work-image">
                <img src={w.img} alt={w.alt} loading="lazy" decoding="async" />
                <div className="caption">{w.caption}</div>
              </div>
              <div className="work-body">
                <div className="work-tag">{w.tag}</div>
                <h3>{w.title}</h3>
                <p>{w.desc}</p>
                <ul className="work-points">
                  {w.points.map(p => (
                    <li key={p}><CheckCircle size={15} />{p}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Process() {
  return (
    <section className="process-section" id="process">
      <div className="container reveal">
        <div className="centered">
          <div className="section-eyebrow">How It Works</div>
          <h2 className="section-title">From first call to <em>full bloom.</em></h2>
          <p className="section-intro">A clear process, so you always know what comes next.</p>
        </div>
        <div className="process-grid">
          {steps.map(s => (
            <div className="step-card" key={s.num}>
              <div className="step-num">{s.num}</div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Faq() {
  return (
    <section className="faq-section" id="faq">
      <div className="container reveal">
        <div className="centered">
          <div className="section-eyebrow">Common Questions</div>
          <h2 className="section-title">Everything you need to <em>know.</em></h2>
        </div>
        <div className="faq-list">
          {faqs.map(f => (
            <details className="faq-item" key={f.q}>
              <summary>{f.q}<span className="plus"><Plus size={16} /></span></summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
