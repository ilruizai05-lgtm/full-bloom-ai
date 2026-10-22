import { useState } from 'react';
import { contact, services } from '../data/site';

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mojkgway';
const empty = { name: '', email: '', phone: '', company: '', interest: '', message: '' };

export default function ContactForm() {
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [form, setForm] = useState(empty);

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async e => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) { setForm(empty); setStatus('success'); } else { setStatus('error'); }
    } catch {
      setStatus('error');
    }
  };

  return (
    <section className="form-section" id="contact">
      <div className="container form-wrap reveal">
        <div className="section-eyebrow">Get Started</div>
        <h2 className="section-title">Let’s build something <em>extraordinary.</em></h2>
        <p className="section-intro">
          Tell us about your business and what you’d like AI to help with. We’ll get back to you within 24 hours to set up your free 30-minute consultation.
        </p>

        {status === 'success' ? (
          <div className="form-success">
            <div className="check">✓</div>
            <h3>Message Sent</h3>
            <p>Thank you! We’ll be in touch within 24 hours.</p>
            <button className="btn btn-outline" onClick={() => setStatus('idle')}>Send another message</button>
          </div>
        ) : (
          <form className="form-grid" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-field">
                <label htmlFor="name">Your Name</label>
                <input type="text" id="name" name="name" value={form.name} onChange={handleChange} placeholder="Jane Smith" required />
              </div>
              <div className="form-field">
                <label htmlFor="email">Email Address</label>
                <input type="email" id="email" name="email" value={form.email} onChange={handleChange} placeholder="jane@company.com" required />
              </div>
            </div>

            <div className="form-row">
              <div className="form-field">
                <label htmlFor="company">Business Name</label>
                <input type="text" id="company" name="company" value={form.company} onChange={handleChange} placeholder="Your Business LLC" />
              </div>
              <div className="form-field">
                <label htmlFor="phone">Phone (optional)</label>
                <input type="tel" id="phone" name="phone" value={form.phone} onChange={handleChange} />
              </div>
            </div>

            <div className="form-field">
              <label htmlFor="interest">What are you interested in?</label>
              <select id="interest" name="interest" value={form.interest} onChange={handleChange} required>
                <option value="">Select one...</option>
                {services.map(s => <option key={s.title}>{s.title}</option>)}
                <option>A website or dashboard</option>
                <option>Not sure yet — let’s talk</option>
              </select>
            </div>

            <div className="form-field">
              <label htmlFor="message">How can we help?</label>
              <textarea id="message" name="message" value={form.message} onChange={handleChange} placeholder="Tell us about your business and what you're looking to achieve with AI..." required></textarea>
            </div>

            {status === 'error' && (
              <p className="form-status error">
                Something went wrong. Please email us at <a href={`mailto:${contact.email}`}>{contact.email}</a>.
              </p>
            )}

            <button type="submit" className="btn btn-bloom" disabled={status === 'loading'}>
              {status === 'loading' ? 'Sending…' : 'Send Message'}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
