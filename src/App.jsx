import { useState, useEffect, useRef } from "react";
import {
  Zap, Cog, Compass, Rocket, ArrowRight, Quote, ChevronDown, Mail, MapPin, Phone,
  Sparkles, Star, Shield, Users, Target, Heart, Plus, Minus, Search, Wrench, Send,
  CheckCircle, Loader, Menu, X,
} from "lucide-react";

/* ─── scroll reveal ─── */
function useInView(threshold = 0.14) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.unobserve(el); } }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

function Reveal({ children, delay = 0, style: s = {} }) {
  const [ref, visible] = useInView(0.1);
  return (<div ref={ref} style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(40px)", transition: `opacity 0.75s cubic-bezier(.22,1,.36,1) ${delay}s, transform 0.75s cubic-bezier(.22,1,.36,1) ${delay}s`, ...s }}>{children}</div>);
}

/* ─── logo flower ─── */
function LogoFlower({ size = 48, style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" style={style}>
      <defs>
        <linearGradient id="pA" x1="0%" y1="100%" x2="100%" y2="0%"><stop offset="0%" stopColor="#6B21D6" /><stop offset="50%" stopColor="#3B82F6" /><stop offset="100%" stopColor="#06B6D4" /></linearGradient>
        <linearGradient id="pB" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#3B82F6" /><stop offset="60%" stopColor="#7C3AED" /><stop offset="100%" stopColor="#EC4899" /></linearGradient>
        <linearGradient id="pC" x1="50%" y1="0%" x2="50%" y2="100%"><stop offset="0%" stopColor="#06B6D4" /><stop offset="50%" stopColor="#6B21D6" /><stop offset="100%" stopColor="#EC4899" /></linearGradient>
      </defs>
      {[0,120,240].map(a => <ellipse key={a} cx="50" cy="28" rx="14" ry="22" fill="url(#pA)" stroke="#fff" strokeWidth="2" transform={`rotate(${a} 50 50)`} opacity="0.9" />)}
      {[60,180,300].map(a => <ellipse key={a} cx="50" cy="28" rx="14" ry="22" fill="url(#pB)" stroke="#fff" strokeWidth="2" transform={`rotate(${a} 50 50)`} opacity="0.9" />)}
      <circle cx="50" cy="50" r="8" fill="url(#pC)" /><circle cx="50" cy="50" r="5" fill="#fff" opacity="0.7" />
    </svg>
  );
}

function PetalDecor({ size = 120, rotation = 0, className = "", style = {} }) {
  return (<svg width={size} height={size} viewBox="0 0 100 160" className={className} style={{ transform: `rotate(${rotation}deg)`, ...style }}><defs><linearGradient id={`pd${rotation}`} x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#3B82F6" /><stop offset="100%" stopColor="#7C3AED" /></linearGradient></defs><ellipse cx="50" cy="70" rx="32" ry="58" fill={`url(#pd${rotation})`} /></svg>);
}

/* ─── FAQ ─── */
function FaqItem({ question, answer }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: "1px solid rgba(59,130,246,0.08)", cursor: "pointer", userSelect: "none" }} onClick={() => setOpen(!open)}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 0", gap: 12 }}>
        <h3 className="font-display" style={{ fontSize: 16, fontWeight: 600, color: open ? "#3B82F6" : "#0F172A", transition: "color 0.3s", lineHeight: 1.4 }}>{question}</h3>
        <div style={{ flexShrink: 0, width: 32, height: 32, borderRadius: 8, background: open ? "rgba(59,130,246,0.08)" : "rgba(59,130,246,0.04)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          {open ? <Minus size={16} style={{ color: "#3B82F6" }} /> : <Plus size={16} style={{ color: "#64748B" }} />}
        </div>
      </div>
      <div style={{ maxHeight: open ? 400 : 0, overflow: "hidden", transition: "max-height 0.4s cubic-bezier(.22,1,.36,1)" }}>
        <p style={{ color: "#475569", lineHeight: 1.75, fontSize: 15, paddingBottom: 20 }}>{answer}</p>
      </div>
    </div>
  );
}

/* ─── Contact Form ─── */
function ContactForm() {
  const [status, setStatus] = useState("idle");
  const [formData, setFormData] = useState({ name: "", email: "", company: "", message: "" });
  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("https://formspree.io/f/mojkgway", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(formData) });
      if (res.ok) { setStatus("success"); setFormData({ name: "", email: "", company: "", message: "" }); } else { setStatus("error"); }
    } catch { setStatus("error"); }
  };

  if (status === "success") {
    return (
      <div style={{ textAlign: "center", padding: "40px 16px" }}>
        <CheckCircle size={48} style={{ color: "#22C55E", marginBottom: 16 }} />
        <h3 className="font-display" style={{ fontSize: 22, fontWeight: 700, color: "#0F172A", marginBottom: 12 }}>Message sent!</h3>
        <p style={{ color: "#475569", fontSize: 15, lineHeight: 1.7, marginBottom: 24 }}>Thanks for reaching out. We'll get back to you within 24 hours.</p>
        <button onClick={() => setStatus("idle")} className="font-display" style={{ background: "none", border: "1px solid rgba(59,130,246,0.2)", color: "#3B82F6", padding: "10px 24px", borderRadius: 10, fontSize: 14, fontWeight: 600, cursor: "pointer" }}>Send another message</button>
      </div>
    );
  }

  const inputStyle = { width: "100%", padding: "14px 16px", borderRadius: 12, border: "1px solid rgba(59,130,246,0.12)", background: "#FAFBFE", fontSize: 15, fontFamily: "'Outfit', sans-serif", color: "#0F172A", outline: "none", transition: "border-color 0.3s, box-shadow 0.3s" };
  const focusH = (e) => { e.target.style.borderColor = "rgba(59,130,246,0.4)"; e.target.style.boxShadow = "0 0 0 3px rgba(59,130,246,0.08)"; };
  const blurH = (e) => { e.target.style.borderColor = "rgba(59,130,246,0.12)"; e.target.style.boxShadow = "none"; };

  return (
    <div onSubmit={handleSubmit} style={{ width: "100%" }}>
      <form style={{ display: "flex", flexDirection: "column", gap: 18 }}>
        <div className="form-row">
          <div style={{ flex: 1 }}>
            <label className="font-display" style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#475569", marginBottom: 8 }}>Your Name *</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} onFocus={focusH} onBlur={blurH} required placeholder="Jane Smith" style={inputStyle} />
          </div>
          <div style={{ flex: 1 }}>
            <label className="font-display" style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#475569", marginBottom: 8 }}>Email Address *</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} onFocus={focusH} onBlur={blurH} required placeholder="jane@company.com" style={inputStyle} />
          </div>
        </div>
        <div>
          <label className="font-display" style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#475569", marginBottom: 8 }}>Company / Business Name</label>
          <input type="text" name="company" value={formData.company} onChange={handleChange} onFocus={focusH} onBlur={blurH} placeholder="Your Business LLC" style={inputStyle} />
        </div>
        <div>
          <label className="font-display" style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#475569", marginBottom: 8 }}>How can we help? *</label>
          <textarea name="message" value={formData.message} onChange={handleChange} onFocus={focusH} onBlur={blurH} required placeholder="Tell us about your business and what you're looking to achieve with AI..." rows={5} style={{ ...inputStyle, resize: "vertical", minHeight: 120 }} />
        </div>
        <button type="submit" disabled={status === "sending"} className="cta-btn font-display" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, background: "var(--gradient)", color: "#fff", padding: "16px 36px", borderRadius: 14, fontSize: 16, fontWeight: 700, border: "none", cursor: status === "sending" ? "wait" : "pointer", opacity: status === "sending" ? 0.7 : 1, width: "100%" }}>
          {status === "sending" ? (<><Loader size={18} style={{ animation: "spin-very-slow 1s linear infinite" }} />Sending...</>) : (<>Send Message<Send size={18} /></>)}
        </button>
        {status === "error" && <p style={{ color: "#EF4444", fontSize: 14, textAlign: "center" }}>Something went wrong. Please email us at hello@fullbloomai.com</p>}
      </form>
    </div>
  );
}

/* ─────────────── MAIN ─────────────── */
export default function FullBloomAI() {
  const [scrollY, setScrollY] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const f = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", f, { passive: true });
    return () => window.removeEventListener("scroll", f);
  }, []);

  const services = [
    { icon: Zap, title: "AI Workflow Automation", desc: "We eliminate repetitive tasks and free your team to focus on growth — with intelligent automations tailored to your day-to-day operations." },
    { icon: Cog, title: "Custom AI Tool Integration", desc: "From CRM to customer support, we weave the right AI tools into your existing stack — seamlessly and without disruption." },
    { icon: Compass, title: "AI Strategy Consulting", desc: "Not sure where to begin? We build a clear, prioritized AI roadmap around your goals, budget, and timeline." },
    { icon: Rocket, title: "Done-for-You Implementation", desc: "We handle everything — setup, testing, training, and launch. You get a working AI solution without lifting a finger." },
  ];

  const steps = [
    { icon: Search, num: "01", title: "Discovery", desc: "We learn your business inside out — your workflows, pain points, goals, and budget. No tech jargon, just a real conversation." },
    { icon: Wrench, num: "02", title: "Build", desc: "Our team designs, builds, and tests your custom AI solution. You stay in the loop with clear updates and zero surprises." },
    { icon: Send, num: "03", title: "Launch", desc: "We deploy, train your team, and make sure everything runs smoothly. Then we stick around to optimize as you grow." },
  ];

  const faqs = [
    { question: "Do I need any technical knowledge?", answer: "Not at all. We handle all the technical heavy lifting. Our process is designed for business owners who want results without having to learn the tech." },
    { question: "How long does implementation take?", answer: "Most projects take 2–6 weeks from discovery to launch. Simple automations can be live in under a week." },
    { question: "What size businesses do you work with?", answer: "We specialize in small to mid-size businesses — typically teams of 2 to 50 people." },
    { question: "What if AI doesn't work for my industry?", answer: "AI is more versatile than most people think. We've worked across healthcare, legal, education, wellness, retail, and professional services." },
    { question: "How much does it cost?", answer: "Every engagement is scoped to your specific needs. We offer project-based pricing and monthly retainers at accessible price points. Our free consultation includes a no-obligation quote." },
    { question: "Will we be locked into a long-term contract?", answer: "Never. We believe in earning your trust every month. Our retainer clients can adjust or pause at any time." },
  ];

  const navLinks = ["Services", "About", "FAQ", "Contact"];

  return (
    <div style={{ fontFamily: "'Outfit', sans-serif", background: "#FAFBFE", color: "#0F172A", minHeight: "100vh", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=Playfair+Display:ital,wght@0,400;0,700;0,800;1,400;1,700;1,800&display=swap');
        :root { --blue: #3B82F6; --violet: #7C3AED; --purple: #6B21D6; --pink: #EC4899; --cyan: #06B6D4; --navy: #0F172A; --slate: #475569; --bg: #FAFBFE; --gradient: linear-gradient(135deg, #3B82F6 0%, #7C3AED 60%, #6B21D6 100%); --gradient-accent: linear-gradient(135deg, #3B82F6 0%, #7C3AED 50%, #EC4899 100%); }
        * { margin: 0; padding: 0; box-sizing: border-box; }
        html, body, #root { width: 100%; overflow-x: hidden; }
        html { scroll-behavior: smooth; }
        .font-display { font-family: 'Outfit', sans-serif; }
        .font-serif { font-family: 'Libre Baskerville', Georgia, serif; }
        .font-brand { font-family: 'Playfair Display', Georgia, serif; }
        .text-grad { background: var(--gradient-accent); background-size: 200% 200%; -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; animation: grad-shift 5s ease-in-out infinite; }
        @keyframes grad-shift { 0%,100% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } }
        @keyframes float-up { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-16px); } }
        @keyframes float-down { 0%,100% { transform: translateY(0); } 50% { transform: translateY(10px); } }
        @keyframes pulse-soft { 0%,100% { opacity: 0.4; } 50% { opacity: 0.7; } }
        @keyframes spin-very-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .float-up { animation: float-up 6s ease-in-out infinite; }
        .float-down { animation: float-down 5s ease-in-out infinite; }
        .pulse-soft { animation: pulse-soft 4s ease-in-out infinite; }
        .spin-vslow { animation: spin-very-slow 40s linear infinite; }

        .service-card { position: relative; background: #FFF; border: 1px solid rgba(59,130,246,0.08); border-radius: 20px; transition: all 0.5s cubic-bezier(.22,1,.36,1); overflow: hidden; }
        .service-card::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px; background: var(--gradient); opacity: 0; transition: opacity 0.4s; }
        .service-card:hover::before { opacity: 1; }
        .service-card:hover { transform: translateY(-8px); box-shadow: 0 20px 60px rgba(59,130,246,0.12); }
        .service-card:hover .svc-icon-wrap { background: var(--gradient) !important; }
        .service-card:hover .svc-icon { color: #fff !important; }

        .cta-btn { position: relative; overflow: hidden; transition: all 0.4s cubic-bezier(.22,1,.36,1); }
        .cta-btn:hover { transform: translateY(-2px); box-shadow: 0 12px 40px rgba(59,130,246,0.3); }
        .cta-btn-outline { transition: all 0.3s; }
        .cta-btn-outline:hover { background: rgba(59,130,246,0.06) !important; border-color: rgba(59,130,246,0.3) !important; }

        .testimonial-card { background: #FFF; border: 1px solid rgba(59,130,246,0.06); border-radius: 20px; transition: all 0.5s cubic-bezier(.22,1,.36,1); }
        .testimonial-card:hover { transform: translateY(-4px); box-shadow: 0 16px 48px rgba(59,130,246,0.08); }

        .section-divider { height: 1px; background: linear-gradient(90deg, transparent, rgba(59,130,246,0.15), rgba(124,58,237,0.1), transparent); margin: 0 auto; max-width: 500px; }
        .trust-badge { display: flex; align-items: center; gap: 8px; padding: 10px 16px; border-radius: 12px; background: rgba(59,130,246,0.03); border: 1px solid rgba(59,130,246,0.06); font-size: 13px; color: #475569; font-weight: 500; }
        .step-card { position: relative; background: #FFF; border: 1px solid rgba(59,130,246,0.08); border-radius: 20px; padding: 32px 24px; transition: all 0.5s cubic-bezier(.22,1,.36,1); }
        .step-card:hover { transform: translateY(-6px); box-shadow: 0 16px 48px rgba(59,130,246,0.1); }
        input::placeholder, textarea::placeholder { color: #94A3B8; }

        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #FAFBFE; }
        ::-webkit-scrollbar-thumb { background: linear-gradient(180deg, #3B82F6, #7C3AED); border-radius: 3px; }

        /* ═══ RESPONSIVE ═══ */
        .nav-desktop { display: flex; }
        .nav-hamburger { display: none; }
        .nav-mobile-menu { display: none; }
        .form-row { display: flex; gap: 16px; }
        .contact-grid { display: grid; grid-template-columns: 1fr 320px; gap: 48; align-items: start; }
        .hero-buttons { display: flex; gap: 16px; justify-content: center; flex-wrap: wrap; }
        .trust-row { display: flex; justify-content: center; gap: 12px; flex-wrap: wrap; }
        .services-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 22px; }
        .steps-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0; }
        .about-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 48px; align-items: start; }
        .values-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
        .step-arrow { position: absolute; top: 38%; right: -12px; z-index: 10; width: 24px; height: 24px; border-radius: 50%; background: #EFF3FF; border: 1px solid rgba(59,130,246,0.12); display: flex; align-items: center; justify-content: center; }
        .hide-mobile { display: block; }
        .blue-banner-logo { width: 140px; height: 140px; }
        .blue-banner-text { font-size: clamp(42px, 5vw, 72px); }
        .hero-headline { font-size: clamp(34px, 6vw, 68px); }

        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
          .nav-hamburger { display: flex !important; }
          .nav-mobile-menu { display: flex !important; }
          .form-row { flex-direction: column !important; gap: 18px !important; }
          .contact-grid { grid-template-columns: 1fr !important; gap: 24px !important; }
          .hero-buttons { flex-direction: column; align-items: center; }
          .hero-buttons a { width: 100%; max-width: 320px; justify-content: center; }
          .trust-row { flex-direction: column; align-items: center; }
          .services-grid { grid-template-columns: 1fr !important; }
          .steps-grid { grid-template-columns: 1fr !important; gap: 16px !important; }
          .about-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
          .values-grid { grid-template-columns: 1fr !important; }
          .step-arrow { display: none !important; }
          .hide-mobile { display: none !important; }
          .blue-banner-logo { width: 100px !important; height: 100px !important; }
          .blue-banner-text { font-size: 36px !important; }
          .hero-headline { font-size: 32px !important; }
        }
      `}</style>

      {/* ═══ Background tree (hidden on mobile) ═══ */}
      <div className="hide-mobile" style={{ position: "fixed", top: 0, right: "-5%", width: "60vw", height: "100vh", pointerEvents: "none", zIndex: 0, opacity: 0.10 }}>
        <svg width="100%" height="100%" viewBox="0 0 800 1000" preserveAspectRatio="xMidYMax meet">
          <defs>
            <linearGradient id="trG" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#8B7355" /><stop offset="100%" stopColor="#6B5840" /></linearGradient>
            <linearGradient id="brG" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#9B8465" /><stop offset="100%" stopColor="#7B6850" /></linearGradient>
            <linearGradient id="tfA" x1="0%" y1="100%" x2="100%" y2="0%"><stop offset="0%" stopColor="#C4B5FD" /><stop offset="50%" stopColor="#A5B4FC" /><stop offset="100%" stopColor="#DDD6FE" /></linearGradient>
            <linearGradient id="tfB" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#A5B4FC" /><stop offset="50%" stopColor="#C4B5FD" /><stop offset="100%" stopColor="#E9D5FF" /></linearGradient>
            <linearGradient id="lfG" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#86EFAC" /><stop offset="100%" stopColor="#4ADE80" /></linearGradient>
          </defs>
          <path d="M400 1000 Q400 850 395 780 Q388 700 380 650 Q375 600 390 550 Q400 520 400 480" stroke="url(#trG)" strokeWidth="28" fill="none" strokeLinecap="round" />
          <path d="M400 1000 Q360 950 340 1000" stroke="url(#trG)" strokeWidth="12" fill="none" strokeLinecap="round" />
          <path d="M400 1000 Q440 940 470 1000" stroke="url(#trG)" strokeWidth="10" fill="none" strokeLinecap="round" />
          <path d="M390 600 Q340 540 280 500 Q240 475 200 460" stroke="url(#brG)" strokeWidth="14" fill="none" strokeLinecap="round" />
          <path d="M395 550 Q440 490 500 450 Q540 425 580 410" stroke="url(#brG)" strokeWidth="14" fill="none" strokeLinecap="round" />
          <path d="M400 500 Q380 440 350 390 Q330 360 310 340" stroke="url(#brG)" strokeWidth="12" fill="none" strokeLinecap="round" />
          <path d="M400 480 Q420 420 450 370 Q475 335 500 310" stroke="url(#brG)" strokeWidth="12" fill="none" strokeLinecap="round" />
          <path d="M400 490 Q400 430 400 370 Q400 330 400 290" stroke="url(#brG)" strokeWidth="10" fill="none" strokeLinecap="round" />
          {[[200,440,28],[310,330,26],[260,290,24],[170,380,22],[400,270,30],[500,300,28],[550,380,26],[620,390,24],[460,350,25]].map(([cx,cy,s],i) => (
            <g key={`lg${i}`} transform={`translate(${cx-s},${cy-s})`}>
              {[0,60,120,180,240,300].map(a => <ellipse key={a} cx={s} cy={s*0.56} rx={s*0.28} ry={s*0.44} fill={a%120===0?"url(#tfA)":"url(#tfB)"} stroke="#fff" strokeWidth="1" transform={`rotate(${a} ${s} ${s})`} opacity="0.85" />)}
              <circle cx={s} cy={s} r={s*0.16} fill="#fff" opacity="0.4" />
            </g>
          ))}
          {[[150,460,18],[240,380,16],[340,280,18],[290,360,15],[450,290,17],[530,350,16],[590,420,15],[480,400,16],[360,360,14],[420,320,15]].map(([cx,cy,s],i) => (
            <g key={`md${i}`} transform={`translate(${cx-s},${cy-s})`}>
              {[0,60,120,180,240,300].map(a => <ellipse key={a} cx={s} cy={s*0.56} rx={s*0.28} ry={s*0.44} fill={a%120===0?"url(#tfB)":"url(#tfA)"} stroke="#fff" strokeWidth="0.8" transform={`rotate(${a} ${s} ${s})`} opacity="0.75" />)}
              <circle cx={s} cy={s} r={s*0.14} fill="#fff" opacity="0.3" />
            </g>
          ))}
        </svg>
      </div>

      {/* ═══ NAV ═══ */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, padding: "12px 0", background: scrollY > 60 ? "rgba(250,251,254,0.95)" : "transparent", backdropFilter: scrollY > 60 ? "blur(20px)" : "none", borderBottom: scrollY > 60 ? "1px solid rgba(59,130,246,0.08)" : "1px solid transparent", transition: "all 0.4s" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <a href="#hero" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 8 }}>
            <LogoFlower size={32} />
            <span className="font-brand" style={{ fontSize: 18, color: "#0F172A", fontStyle: "italic" }}>Full Bloom AI</span>
          </a>
          {/* Desktop nav */}
          <div className="nav-desktop" style={{ gap: 24, alignItems: "center" }}>
            {navLinks.map(l => <a key={l} href={`#${l.toLowerCase()}`} className="font-display" style={{ textDecoration: "none", color: "#475569", fontSize: 13, fontWeight: 500, letterSpacing: "0.06em", textTransform: "uppercase" }}>{l}</a>)}
            <a href="#contact" className="cta-btn font-display" style={{ textDecoration: "none", background: "var(--gradient)", color: "#fff", padding: "10px 20px", borderRadius: 10, fontSize: 13, fontWeight: 700 }}>Book a Call</a>
          </div>
          {/* Hamburger */}
          <button className="nav-hamburger" onClick={() => setMenuOpen(!menuOpen)} style={{ display: "none", background: "none", border: "none", cursor: "pointer", padding: 8 }}>
            {menuOpen ? <X size={24} color="#0F172A" /> : <Menu size={24} color="#0F172A" />}
          </button>
        </div>
        {/* Mobile menu */}
        {menuOpen && (
          <div className="nav-mobile-menu" style={{ flexDirection: "column", padding: "16px 20px", background: "rgba(250,251,254,0.98)", borderTop: "1px solid rgba(59,130,246,0.08)" }}>
            {navLinks.map(l => <a key={l} href={`#${l.toLowerCase()}`} onClick={() => setMenuOpen(false)} className="font-display" style={{ textDecoration: "none", color: "#0F172A", fontSize: 16, fontWeight: 600, padding: "12px 0", borderBottom: "1px solid rgba(59,130,246,0.06)" }}>{l}</a>)}
            <a href="#contact" onClick={() => setMenuOpen(false)} className="cta-btn font-display" style={{ textDecoration: "none", background: "var(--gradient)", color: "#fff", padding: "14px 20px", borderRadius: 12, fontSize: 15, fontWeight: 700, textAlign: "center", marginTop: 12 }}>Book a Call</a>
          </div>
        )}
      </nav>

      {/* ═══ HERO ═══ */}
      <section id="hero" style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", padding: "80px 20px 60px", background: "linear-gradient(180deg, #FAFBFE 0%, #EFF3FF 60%, #FAFBFE 100%)" }}>
        <div className="pulse-soft" style={{ position: "absolute", top: "15%", left: "50%", transform: "translate(-50%,-50%)", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ position: "relative", textAlign: "center", maxWidth: 960, zIndex: 2, width: "100%" }}>
          {/* Blue banner */}
          <div style={{ background: "#2563EB", padding: "36px 20px", marginBottom: 32, width: "100vw", position: "relative", left: "50%", transform: "translateX(-50%)" }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
              <LogoFlower size={140} style={{ width: "clamp(90px, 15vw, 140px)", height: "clamp(90px, 15vw, 140px)" }} />
              <div className="font-brand blue-banner-text" style={{ color: "#FFF", fontStyle: "italic" }}>Full Bloom AI</div>
            </div>
          </div>

          <Reveal delay={0.1}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "8px 18px", borderRadius: 40, border: "1px solid rgba(59,130,246,0.15)", background: "rgba(59,130,246,0.04)", marginBottom: 28, fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#3B82F6" }}>
              <Sparkles size={12} />Applied AI for Small Businesses
            </div>
          </Reveal>

          <Reveal delay={0.18}>
            <h1 className="font-display hero-headline" style={{ fontWeight: 900, lineHeight: 1.05, letterSpacing: "-0.035em", marginBottom: 24, color: "#0F172A" }}>
              Grow Smarter. <span className="text-grad font-serif" style={{ fontWeight: 700, fontStyle: "italic" }}>Bloom</span> Bolder.
            </h1>
          </Reveal>

          <Reveal delay={0.24}>
            <p style={{ fontSize: "clamp(15px, 2vw, 19px)", lineHeight: 1.75, color: "#475569", maxWidth: 560, margin: "0 auto 32px", fontWeight: 300 }}>
              We help small businesses harness the power of AI — no jargon, no overwhelm, no six-figure budget. Just real transformation.
            </p>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="trust-row" style={{ marginBottom: 36 }}>
              <div className="trust-badge"><Shield size={14} style={{ color: "#3B82F6" }} />Trusted by 20+ businesses</div>
              <div className="trust-badge"><Star size={14} style={{ color: "#3B82F6" }} />4.9 satisfaction</div>
              <div className="trust-badge"><Zap size={14} style={{ color: "#3B82F6" }} />50+ workflows</div>
            </div>
          </Reveal>

          <Reveal delay={0.36}>
            <div className="hero-buttons">
              <a href="#contact" className="cta-btn font-display" style={{ textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 10, background: "var(--gradient)", color: "#fff", padding: "16px 36px", borderRadius: 14, fontSize: 16, fontWeight: 700 }}>Book a Free Consultation <ArrowRight size={18} /></a>
              <a href="#services" className="cta-btn-outline" style={{ textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 10, border: "1px solid rgba(59,130,246,0.2)", color: "#0F172A", padding: "16px 36px", borderRadius: 14, fontSize: 16, fontWeight: 500 }}>Explore Services</a>
            </div>
          </Reveal>

          <Reveal delay={0.44}><div style={{ marginTop: 40, opacity: 0.3 }}><ChevronDown size={22} className="float-down" style={{ color: "#3B82F6" }} /></div></Reveal>
        </div>
      </section>

      {/* ═══ QUICK CONTACT ═══ */}
      <div className="section-divider" />
      <section style={{ padding: "64px 20px", background: "#FFF" }}>
        <div style={{ maxWidth: 640, margin: "0 auto" }}>
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: 32 }}>
              <p className="font-display" style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#3B82F6", marginBottom: 10 }}>Get Started Today</p>
              <h2 className="font-display" style={{ fontSize: "clamp(22px, 3.5vw, 34px)", fontWeight: 800, lineHeight: 1.15, color: "#0F172A" }}>Ready to explore AI for your business?</h2>
              <p style={{ fontSize: 15, color: "#475569", marginTop: 10, lineHeight: 1.7 }}>Send us a message and we'll get back to you within 24 hours.</p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div style={{ background: "#FFF", border: "1px solid rgba(59,130,246,0.08)", borderRadius: 20, padding: "32px 24px" }}>
              <ContactForm />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══ PROBLEM / SOLUTION ═══ */}
      <div className="section-divider" />
      <section style={{ padding: "100px 20px", background: "#FAFBFE" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <Reveal><p className="font-display" style={{ textAlign: "center", fontSize: 12, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#3B82F6", marginBottom: 16 }}>The Challenge</p></Reveal>
          <Reveal delay={0.08}>
            <h2 className="font-display" style={{ textAlign: "center", fontSize: "clamp(24px, 4.5vw, 48px)", fontWeight: 800, lineHeight: 1.12, maxWidth: 700, margin: "0 auto 48px", color: "#0F172A" }}>
              You know AI could change everything. <span style={{ color: "#94A3B8" }}>You just need the right partner.</span>
            </h2>
          </Reveal>
          <div className="about-grid">
            <Reveal delay={0.12}>
              <div style={{ padding: "36px 28px", borderRadius: 20, background: "#FFF", border: "1px solid rgba(59,130,246,0.06)", height: "100%" }}>
                <div style={{ width: 48, height: 48, borderRadius: 12, background: "rgba(59,130,246,0.06)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20 }}><span style={{ fontSize: 24 }}>😰</span></div>
                <h3 className="font-display" style={{ fontSize: 20, fontWeight: 700, marginBottom: 12, color: "#0F172A" }}>The Overwhelm Is Real</h3>
                <p style={{ color: "#475569", lineHeight: 1.75, fontSize: 15 }}>New tools every day. Buzzwords everywhere. You're running a business — not studying for a tech degree.</p>
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <div style={{ padding: "36px 28px", borderRadius: 20, background: "linear-gradient(135deg, rgba(59,130,246,0.04), rgba(124,58,237,0.03))", border: "1px solid rgba(59,130,246,0.1)", height: "100%" }}>
                <div style={{ width: 48, height: 48, borderRadius: 12, background: "rgba(59,130,246,0.08)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20 }}><span style={{ fontSize: 24 }}>😊</span></div>
                <h3 className="font-display" style={{ fontSize: 20, fontWeight: 700, marginBottom: 12, color: "#0F172A" }}>That's Where We Come In</h3>
                <p style={{ color: "#475569", lineHeight: 1.75, fontSize: 15 }}>Full Bloom AI is your dedicated AI partner. We cut through the noise and build solutions that deliver from day one.</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══ SERVICES ═══ */}
      <div className="section-divider" />
      <section id="services" style={{ position: "relative", padding: "100px 20px", background: "#FFF" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 2 }}>
          <Reveal><p className="font-display" style={{ textAlign: "center", fontSize: 12, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#3B82F6", marginBottom: 16 }}>Our Services</p></Reveal>
          <Reveal delay={0.08}>
            <h2 className="font-display" style={{ textAlign: "center", fontSize: "clamp(24px, 4.5vw, 48px)", fontWeight: 800, lineHeight: 1.12, marginBottom: 48, color: "#0F172A" }}>
              AI that <span className="text-grad font-serif" style={{ fontWeight: 700, fontStyle: "italic" }}>actually</span> moves the needle
            </h2>
          </Reveal>
          <div className="services-grid">
            {services.map((s, i) => (
              <Reveal key={s.title} delay={0.08 + i * 0.07}>
                <div className="service-card" style={{ padding: "32px 24px", cursor: "default", height: "100%" }}>
                  <div className="svc-icon-wrap" style={{ width: 52, height: 52, borderRadius: 14, background: "rgba(59,130,246,0.07)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20, transition: "all 0.5s" }}>
                    <s.icon size={24} className="svc-icon" style={{ color: "#3B82F6", transition: "color 0.4s" }} />
                  </div>
                  <h3 className="font-display" style={{ fontSize: 18, fontWeight: 700, marginBottom: 10, color: "#0F172A" }}>{s.title}</h3>
                  <p style={{ color: "#64748B", lineHeight: 1.72, fontSize: 14 }}>{s.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ HOW IT WORKS ═══ */}
      <div className="section-divider" />
      <section style={{ padding: "100px 20px", background: "#FAFBFE" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <Reveal><p className="font-display" style={{ textAlign: "center", fontSize: 12, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#3B82F6", marginBottom: 16 }}>How It Works</p></Reveal>
          <Reveal delay={0.08}>
            <h2 className="font-display" style={{ textAlign: "center", fontSize: "clamp(24px, 4.5vw, 48px)", fontWeight: 800, lineHeight: 1.12, marginBottom: 16, color: "#0F172A" }}>
              From first call to <span className="text-grad font-serif" style={{ fontWeight: 700, fontStyle: "italic" }}>full bloom</span>
            </h2>
          </Reveal>
          <Reveal delay={0.12}><p style={{ textAlign: "center", fontSize: 16, color: "#475569", maxWidth: 500, margin: "0 auto 48px", lineHeight: 1.7, fontWeight: 300 }}>A clear process so you always know what comes next.</p></Reveal>
          <div className="steps-grid">
            {steps.map((step, i) => (
              <Reveal key={step.title} delay={0.1 + i * 0.1}>
                <div style={{ position: "relative", padding: "0 12px" }}>
                  <div className="step-card" style={{ textAlign: "center", height: "100%" }}>
                    <div className="font-display text-grad" style={{ fontSize: 36, fontWeight: 900, marginBottom: 12, lineHeight: 1 }}>{step.num}</div>
                    <div style={{ width: 52, height: 52, borderRadius: 14, background: "rgba(59,130,246,0.07)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
                      <step.icon size={24} style={{ color: "#3B82F6" }} />
                    </div>
                    <h3 className="font-display" style={{ fontSize: 20, fontWeight: 700, marginBottom: 10, color: "#0F172A" }}>{step.title}</h3>
                    <p style={{ color: "#64748B", lineHeight: 1.72, fontSize: 14 }}>{step.desc}</p>
                  </div>
                  {i < steps.length - 1 && <div className="step-arrow"><ArrowRight size={12} style={{ color: "#3B82F6" }} /></div>}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ ABOUT ═══ */}
      <div className="section-divider" />
      <section id="about" style={{ padding: "100px 20px", background: "#FFF" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <Reveal><p className="font-display" style={{ textAlign: "center", fontSize: 12, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#3B82F6", marginBottom: 16 }}>Who We Are</p></Reveal>
          <Reveal delay={0.08}>
            <h2 className="font-display" style={{ textAlign: "center", fontSize: "clamp(24px, 4vw, 42px)", fontWeight: 800, lineHeight: 1.15, marginBottom: 48, color: "#0F172A" }}>
              Your AI partner, <span className="text-grad font-serif" style={{ fontWeight: 700, fontStyle: "italic" }}>not your IT department</span>
            </h2>
          </Reveal>
          <div className="about-grid">
            <Reveal delay={0.12}>
              <div style={{ padding: "44px 36px", borderRadius: 24, background: "linear-gradient(135deg, #2563EB, #4F46E5)", position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", top: -30, right: -30, opacity: 0.1 }}><LogoFlower size={140} /></div>
                <div style={{ position: "relative", zIndex: 2 }}>
                  <div className="font-serif" style={{ fontSize: 44, color: "rgba(255,255,255,0.2)", lineHeight: 1, marginBottom: 14 }}>"</div>
                  <p className="font-brand" style={{ fontSize: "clamp(18px, 2.5vw, 24px)", color: "#FFF", lineHeight: 1.6, fontStyle: "italic", marginBottom: 20 }}>We believe every small business deserves AI that works as hard as they do — without the complexity, gatekeeping, or sticker shock.</p>
                  <div style={{ width: 40, height: 3, borderRadius: 2, background: "rgba(255,255,255,0.3)", marginBottom: 14 }} />
                  <p className="font-display" style={{ fontSize: 13, color: "rgba(255,255,255,0.7)", fontWeight: 500 }}>The Full Bloom AI Mission</p>
                </div>
              </div>
            </Reveal>
            <div>
              <Reveal delay={0.16}><p style={{ color: "#475569", lineHeight: 1.8, fontSize: 16, marginBottom: 20 }}>We bring together expertise in AI engineering, healthcare, and business operations to deliver solutions that work in the real world.</p></Reveal>
              <Reveal delay={0.2}>
                <div style={{ padding: "24px 24px", borderRadius: 16, background: "rgba(59,130,246,0.03)", border: "1px solid rgba(59,130,246,0.08)", marginBottom: 24 }}>
                  <h4 className="font-display" style={{ fontSize: 15, fontWeight: 700, color: "#0F172A", marginBottom: 10, display: "flex", alignItems: "center", gap: 8 }}><Heart size={16} style={{ color: "#3B82F6" }} />Our Promise</h4>
                  <p style={{ color: "#475569", lineHeight: 1.75, fontSize: 14 }}>You'll never feel lost, oversold, or left behind. We explain everything plainly, recommend only what you need, and don't stop until it's working.</p>
                </div>
              </Reveal>
              <Reveal delay={0.24}>
                <div className="values-grid">
                  {[{ icon: Shield, label: "Trusted & Transparent" }, { icon: Target, label: "Results-Driven" }, { icon: Users, label: "Built to Scale" }, { icon: Sparkles, label: "Innovation-First" }].map(v => (
                    <div key={v.label} style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 14px", borderRadius: 12, background: "rgba(59,130,246,0.03)", border: "1px solid rgba(59,130,246,0.06)" }}>
                      <v.icon size={16} style={{ color: "#3B82F6", flexShrink: 0 }} />
                      <span className="font-display" style={{ fontSize: 13, fontWeight: 600, color: "#0F172A" }}>{v.label}</span>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ FAQ ═══ */}
      <div className="section-divider" />
      <section id="faq" style={{ padding: "100px 20px", background: "#FAFBFE" }}>
        <div style={{ maxWidth: 680, margin: "0 auto" }}>
          <Reveal><p className="font-display" style={{ textAlign: "center", fontSize: 12, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#3B82F6", marginBottom: 16 }}>Common Questions</p></Reveal>
          <Reveal delay={0.08}>
            <h2 className="font-display" style={{ textAlign: "center", fontSize: "clamp(24px, 4.5vw, 48px)", fontWeight: 800, lineHeight: 1.12, marginBottom: 48, color: "#0F172A" }}>
              Everything you need to <span className="text-grad font-serif" style={{ fontWeight: 700, fontStyle: "italic" }}>know</span>
            </h2>
          </Reveal>
          <Reveal delay={0.14}>
            <div style={{ borderTop: "1px solid rgba(59,130,246,0.08)" }}>
              {faqs.map((f, i) => <FaqItem key={i} question={f.question} answer={f.answer} />)}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══ CONTACT ═══ */}
      <div className="section-divider" />
      <section id="contact" style={{ position: "relative", padding: "100px 20px", overflow: "hidden", background: "linear-gradient(180deg, #FFF 0%, #EFF3FF 50%, #FAFBFE 100%)" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", position: "relative", zIndex: 2 }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <Reveal><LogoFlower size={48} style={{ margin: "0 auto 20px" }} /></Reveal>
            <Reveal delay={0.06}><p className="font-display" style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#3B82F6", marginBottom: 14 }}>Get Started</p></Reveal>
            <Reveal delay={0.12}>
              <h2 className="font-display" style={{ fontSize: "clamp(26px, 5vw, 48px)", fontWeight: 900, lineHeight: 1.08, marginBottom: 14, color: "#0F172A" }}>
                Let's build something <span className="text-grad font-serif" style={{ fontWeight: 700, fontStyle: "italic" }}>extraordinary</span>
              </h2>
            </Reveal>
            <Reveal delay={0.16}><p style={{ fontSize: 16, color: "#475569", lineHeight: 1.7, maxWidth: 500, margin: "0 auto", fontWeight: 300 }}>Fill out the form and we'll get back to you within 24 hours.</p></Reveal>
          </div>
          <Reveal delay={0.2}>
            <div className="contact-grid" style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: 36, alignItems: "start" }}>
              <div style={{ background: "#FFF", border: "1px solid rgba(59,130,246,0.08)", borderRadius: 20, padding: "32px 28px" }}>
                <ContactForm />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                <div style={{ background: "#FFF", border: "1px solid rgba(59,130,246,0.06)", borderRadius: 16, padding: "24px 20px" }}>
                  <h4 className="font-display" style={{ fontSize: 14, fontWeight: 700, color: "#0F172A", marginBottom: 16 }}>Get in touch directly</h4>
                  <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                    {[{ icon: Mail, text: "hello@fullbloomai.com", href: "mailto:hello@fullbloomai.com" }, { icon: Phone, text: "(571) 667-2227", href: "tel:+15716672227" }, { icon: MapPin, text: "Northern Virginia" }].map(item => (
                      <div key={item.text} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <div style={{ width: 32, height: 32, borderRadius: 8, background: "rgba(59,130,246,0.06)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                          <item.icon size={14} style={{ color: "#3B82F6" }} />
                        </div>
                        {item.href ? <a href={item.href} style={{ color: "#475569", fontSize: 13, textDecoration: "none" }}>{item.text}</a> : <span style={{ color: "#475569", fontSize: 13 }}>{item.text}</span>}
                      </div>
                    ))}
                  </div>
                </div>
                <div style={{ background: "rgba(59,130,246,0.03)", border: "1px solid rgba(59,130,246,0.08)", borderRadius: 16, padding: "24px 20px" }}>
                  <h4 className="font-display" style={{ fontSize: 14, fontWeight: 700, color: "#0F172A", marginBottom: 10 }}>What to expect</h4>
                  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    {["We respond within 24 hours", "Free 30-min consultation", "No obligation, no pressure", "Clear next steps after every call"].map(item => (
                      <div key={item} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <CheckCircle size={13} style={{ color: "#22C55E", flexShrink: 0 }} />
                        <span style={{ color: "#475569", fontSize: 12, lineHeight: 1.5 }}>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer style={{ padding: "32px 20px", borderTop: "1px solid rgba(59,130,246,0.06)", background: "#FAFBFE" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <LogoFlower size={24} />
            <span className="font-brand" style={{ fontSize: 15, color: "#0F172A", fontStyle: "italic" }}>Full Bloom AI</span>
          </div>
          <p style={{ fontSize: 12, color: "#CBD5E1" }}>© 2026 Full Bloom AI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
