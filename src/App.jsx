import { useState, useEffect, useRef } from "react";
import {
  Zap,
  Cog,
  Compass,
  Rocket,
  ArrowRight,
  Quote,
  ChevronDown,
  Mail,
  MapPin,
  Phone,
  Sparkles,
  Star,
  Shield,
  Users,
  Target,
  Heart,
  Plus,
  Minus,
  Search,
  Wrench,
  Send,
  CheckCircle,
  Loader,
} from "lucide-react";

/* ─── scroll reveal hook ─── */
function useInView(threshold = 0.14) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          obs.unobserve(el);
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

function Reveal({ children, delay = 0, className = "", style: extraStyle = {} }) {
  const [ref, visible] = useInView(0.1);
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(40px)",
        transition: `opacity 0.75s cubic-bezier(.22,1,.36,1) ${delay}s, transform 0.75s cubic-bezier(.22,1,.36,1) ${delay}s`,
        ...extraStyle,
      }}
    >
      {children}
    </div>
  );
}

/* ─── 6-petal flower SVG ─── */
function LogoFlower({ size = 48, className = "", style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" className={className} style={style}>
      <defs>
        <linearGradient id="petalGradA" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#6B21D6" />
          <stop offset="50%" stopColor="#3B82F6" />
          <stop offset="100%" stopColor="#06B6D4" />
        </linearGradient>
        <linearGradient id="petalGradB" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3B82F6" />
          <stop offset="60%" stopColor="#7C3AED" />
          <stop offset="100%" stopColor="#EC4899" />
        </linearGradient>
        <linearGradient id="petalGradC" x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" stopColor="#06B6D4" />
          <stop offset="50%" stopColor="#6B21D6" />
          <stop offset="100%" stopColor="#EC4899" />
        </linearGradient>
      </defs>
      {[0, 120, 240].map((angle) => (
        <ellipse key={angle} cx="50" cy="28" rx="14" ry="22" fill="url(#petalGradA)" stroke="#fff" strokeWidth="2" transform={`rotate(${angle} 50 50)`} opacity="0.9" />
      ))}
      {[60, 180, 300].map((angle) => (
        <ellipse key={angle} cx="50" cy="28" rx="14" ry="22" fill="url(#petalGradB)" stroke="#fff" strokeWidth="2" transform={`rotate(${angle} 50 50)`} opacity="0.9" />
      ))}
      <circle cx="50" cy="50" r="8" fill="url(#petalGradC)" />
      <circle cx="50" cy="50" r="5" fill="#fff" opacity="0.7" />
    </svg>
  );
}

/* ─── decorative petal ─── */
function PetalDecor({ size = 120, rotation = 0, className = "", style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 160" className={className} style={{ transform: `rotate(${rotation}deg)`, ...style }}>
      <defs>
        <linearGradient id={`pdl${rotation}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3B82F6" />
          <stop offset="100%" stopColor="#7C3AED" />
        </linearGradient>
      </defs>
      <ellipse cx="50" cy="70" rx="32" ry="58" fill={`url(#pdl${rotation})`} />
    </svg>
  );
}

/* ─── FAQ Accordion Item ─── */
function FaqItem({ question, answer }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: "1px solid rgba(59,130,246,0.08)", cursor: "pointer", userSelect: "none" }} onClick={() => setOpen(!open)}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "24px 0", gap: 16 }}>
        <h3 className="font-display" style={{ fontSize: 17, fontWeight: 600, color: open ? "#3B82F6" : "#0F172A", transition: "color 0.3s ease", lineHeight: 1.4 }}>{question}</h3>
        <div style={{ flexShrink: 0, width: 32, height: 32, borderRadius: 8, background: open ? "rgba(59,130,246,0.08)" : "rgba(59,130,246,0.04)", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.3s ease" }}>
          {open ? <Minus size={16} style={{ color: "#3B82F6" }} /> : <Plus size={16} style={{ color: "#64748B" }} />}
        </div>
      </div>
      <div style={{ maxHeight: open ? 300 : 0, overflow: "hidden", transition: "max-height 0.4s cubic-bezier(.22,1,.36,1)" }}>
        <p style={{ color: "#475569", lineHeight: 1.75, fontSize: 15, paddingBottom: 24 }}>{answer}</p>
      </div>
    </div>
  );
}

/* ─── Contact Form ─── */
function ContactForm() {
  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const [formData, setFormData] = useState({ name: "", email: "", company: "", message: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");

    try {
      /* ═══════════════════════════════════════════════════════════
         IMPORTANT: Replace mojkgway below with your real
         Formspree form ID after signing up at formspree.io
         Example: https://formspree.io/f/xpznqkdl
         ═══════════════════════════════════════════════════════════ */
      const res = await fetch("https://formspree.io/f/mojkgway", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", company: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div style={{ textAlign: "center", padding: "48px 24px" }}>
        <CheckCircle size={48} style={{ color: "#22C55E", marginBottom: 16 }} />
        <h3 className="font-display" style={{ fontSize: 24, fontWeight: 700, color: "#0F172A", marginBottom: 12 }}>
          Message sent!
        </h3>
        <p style={{ color: "#475569", fontSize: 16, lineHeight: 1.7, marginBottom: 24 }}>
          Thanks for reaching out. We'll get back to you within 24 hours.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="font-display"
          style={{
            background: "none",
            border: "1px solid rgba(59,130,246,0.2)",
            color: "#3B82F6",
            padding: "10px 24px",
            borderRadius: 10,
            fontSize: 14,
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          Send another message
        </button>
      </div>
    );
  }

  const inputStyle = {
    width: "100%",
    padding: "14px 18px",
    borderRadius: 12,
    border: "1px solid rgba(59,130,246,0.12)",
    background: "#FAFBFE",
    fontSize: 15,
    fontFamily: "'Outfit', sans-serif",
    color: "#0F172A",
    outline: "none",
    transition: "border-color 0.3s ease, box-shadow 0.3s ease",
  };

  const inputFocusHandler = (e) => {
    e.target.style.borderColor = "rgba(59,130,246,0.4)";
    e.target.style.boxShadow = "0 0 0 3px rgba(59,130,246,0.08)";
  };

  const inputBlurHandler = (e) => {
    e.target.style.borderColor = "rgba(59,130,246,0.12)";
    e.target.style.boxShadow = "none";
  };

  return (
    <div onSubmit={handleSubmit} style={{ width: "100%" }}>
      <form style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <div>
            <label className="font-display" style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#475569", marginBottom: 8 }}>
              Your Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              onFocus={inputFocusHandler}
              onBlur={inputBlurHandler}
              required
              placeholder="Jane Smith"
              style={inputStyle}
            />
          </div>
          <div>
            <label className="font-display" style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#475569", marginBottom: 8 }}>
              Email Address *
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onFocus={inputFocusHandler}
              onBlur={inputBlurHandler}
              required
              placeholder="jane@company.com"
              style={inputStyle}
            />
          </div>
        </div>

        <div>
          <label className="font-display" style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#475569", marginBottom: 8 }}>
            Company / Business Name
          </label>
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleChange}
            onFocus={inputFocusHandler}
            onBlur={inputBlurHandler}
            placeholder="Your Business LLC"
            style={inputStyle}
          />
        </div>

        <div>
          <label className="font-display" style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#475569", marginBottom: 8 }}>
            How can we help? *
          </label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            onFocus={inputFocusHandler}
            onBlur={inputBlurHandler}
            required
            placeholder="Tell us about your business and what you're looking to achieve with AI..."
            rows={5}
            style={{ ...inputStyle, resize: "vertical", minHeight: 120 }}
          />
        </div>

        <button
          type="submit"
          disabled={status === "sending"}
          className="cta-btn font-display"
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 10,
            background: "var(--gradient)",
            color: "#fff",
            padding: "16px 36px",
            borderRadius: 14,
            fontSize: 16,
            fontWeight: 700,
            border: "none",
            cursor: status === "sending" ? "wait" : "pointer",
            opacity: status === "sending" ? 0.7 : 1,
            width: "100%",
          }}
        >
          {status === "sending" ? (
            <>
              <Loader size={18} style={{ animation: "spin-very-slow 1s linear infinite" }} />
              Sending...
            </>
          ) : (
            <>
              Send Message
              <Send size={18} />
            </>
          )}
        </button>

        {status === "error" && (
          <p style={{ color: "#EF4444", fontSize: 14, textAlign: "center" }}>
            Something went wrong. Please try again or email us directly at hello@fullbloomai.com
          </p>
        )}
      </form>
    </div>
  );
}

/* ─────────────────────────── MAIN ─────────────────────────── */
export default function FullBloomAI() {
  const [scrollY, setScrollY] = useState(0);
  const [hoveredService, setHoveredService] = useState(null);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const services = [
    { icon: Zap, title: "AI Workflow Automation", desc: "We eliminate repetitive tasks and free your team to focus on growth — with intelligent automations tailored to your day-to-day operations." },
    { icon: Cog, title: "Custom AI Tool Integration", desc: "From CRM to customer support, we weave the right AI tools into your existing stack — seamlessly and without disruption." },
    { icon: Compass, title: "AI Strategy Consulting", desc: "Not sure where to begin? We build a clear, prioritized AI roadmap around your goals, budget, and timeline." },
    { icon: Rocket, title: "Done-for-You Implementation", desc: "We handle everything — setup, testing, training, and launch. You get a working AI solution without lifting a finger." },
  ];

  const steps = [
    { icon: Search, num: "01", title: "Discovery", desc: "We learn your business inside out — your workflows, pain points, goals, and budget. No tech jargon, just a real conversation about what matters." },
    { icon: Wrench, num: "02", title: "Build", desc: "Our team designs, builds, and tests your custom AI solution. You stay in the loop at every stage with clear updates and zero surprises." },
    { icon: Send, num: "03", title: "Launch", desc: "We deploy, train your team, and make sure everything runs smoothly. Then we stick around to optimize and support you as you grow." },
  ];

  const faqs = [
    { question: "Do I need any technical knowledge to work with Full Bloom AI?", answer: "Not at all. We handle all the technical heavy lifting. Our process is designed for business owners who want results without having to learn the tech. We explain everything in plain language and make sure you're comfortable every step of the way." },
    { question: "How long does a typical AI implementation take?", answer: "Most projects take 2–6 weeks from discovery to launch, depending on complexity. Simple automations can be live in under a week. We always start with a clear timeline so there are no surprises." },
    { question: "What size businesses do you work with?", answer: "We specialize in small to mid-size businesses — typically teams of 2 to 50 people. Whether you're a solo founder or have a growing team, our solutions scale to fit your needs and budget." },
    { question: "What if AI doesn't work for my industry?", answer: "AI is more versatile than most people think. We've worked across healthcare, legal, education, wellness, retail, and professional services. During our free consultation, we'll honestly assess whether AI is the right fit — and if it's not, we'll tell you." },
    { question: "How much does it cost?", answer: "Every engagement is scoped to your specific needs and budget. We offer project-based pricing and monthly retainers starting at accessible price points for small businesses. Our free consultation includes a no-obligation quote." },
    { question: "Will we be locked into a long-term contract?", answer: "Never. We believe in earning your trust every month. Our retainer clients can adjust or pause at any time. Project work is scoped with clear deliverables and a defined end date." },
  ];

  return (
    <div style={{ fontFamily: "'Outfit', sans-serif", background: "#FAFBFE", color: "#0F172A", minHeight: "100vh", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=Playfair+Display:ital,wght@0,400;0,700;0,800;1,400;1,700;1,800&display=swap');

        :root {
          --blue: #3B82F6;
          --violet: #7C3AED;
          --purple: #6B21D6;
          --pink: #EC4899;
          --cyan: #06B6D4;
          --navy: #0F172A;
          --slate: #475569;
          --bg: #FAFBFE;
          --gradient: linear-gradient(135deg, #3B82F6 0%, #7C3AED 60%, #6B21D6 100%);
          --gradient-accent: linear-gradient(135deg, #3B82F6 0%, #7C3AED 50%, #EC4899 100%);
        }

        * { margin: 0; padding: 0; box-sizing: border-box; }
        html, body, #root { width: 100%; overflow-x: hidden; }
        html { scroll-behavior: smooth; }

        .font-display { font-family: 'Outfit', sans-serif; }
        .font-serif { font-family: 'Libre Baskerville', Georgia, serif; }
        .font-brand { font-family: 'Playfair Display', Georgia, serif; }

        .text-grad {
          background: var(--gradient-accent);
          background-size: 200% 200%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: grad-shift 5s ease-in-out infinite;
        }

        @keyframes grad-shift { 0%, 100% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } }
        @keyframes float-up { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-16px); } }
        @keyframes float-down { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(10px); } }
        @keyframes pulse-soft { 0%, 100% { opacity: 0.4; transform: scale(1); } 50% { opacity: 0.7; transform: scale(1.04); } }
        @keyframes spin-very-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }

        .float-up { animation: float-up 6s ease-in-out infinite; }
        .float-down { animation: float-down 5s ease-in-out infinite; }
        .pulse-soft { animation: pulse-soft 4s ease-in-out infinite; }
        .spin-vslow { animation: spin-very-slow 40s linear infinite; }

        .service-card {
          position: relative; background: #FFFFFF; border: 1px solid rgba(59,130,246,0.08);
          border-radius: 20px; transition: all 0.5s cubic-bezier(.22,1,.36,1); overflow: hidden;
        }
        .service-card::before {
          content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px;
          background: var(--gradient); opacity: 0; transition: opacity 0.4s ease;
        }
        .service-card:hover::before { opacity: 1; }
        .service-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 60px rgba(59,130,246,0.12), 0 8px 24px rgba(124,58,237,0.08);
          border-color: rgba(59,130,246,0.15);
        }
        .service-card:hover .svc-icon-wrap { background: var(--gradient) !important; }
        .service-card:hover .svc-icon { color: #fff !important; }

        .cta-btn {
          position: relative; overflow: hidden; transition: all 0.4s cubic-bezier(.22,1,.36,1);
        }
        .cta-btn::after {
          content: ''; position: absolute; inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.25) 0%, transparent 60%);
          opacity: 0; transition: opacity 0.4s ease;
        }
        .cta-btn:hover::after { opacity: 1; }
        .cta-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 40px rgba(59,130,246,0.3), 0 4px 16px rgba(124,58,237,0.2);
        }

        .cta-btn-outline { transition: all 0.3s ease; }
        .cta-btn-outline:hover { background: rgba(59,130,246,0.06) !important; border-color: rgba(59,130,246,0.3) !important; }

        .nav-link { position: relative; }
        .nav-link::after {
          content: ''; position: absolute; bottom: -4px; left: 0; width: 0; height: 2px;
          background: var(--gradient); transition: width 0.35s cubic-bezier(.22,1,.36,1);
        }
        .nav-link:hover::after { width: 100%; }
        .nav-link:hover { color: #3B82F6 !important; }

        .testimonial-card {
          background: #FFFFFF; border: 1px solid rgba(59,130,246,0.06); border-radius: 20px;
          transition: all 0.5s cubic-bezier(.22,1,.36,1);
        }
        .testimonial-card:hover { transform: translateY(-4px); box-shadow: 0 16px 48px rgba(59,130,246,0.08); border-color: rgba(59,130,246,0.12); }

        .section-divider {
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(59,130,246,0.15), rgba(124,58,237,0.1), transparent);
          margin: 0 auto; max-width: 500px;
        }

        .trust-badge {
          display: flex; align-items: center; gap: 8px; padding: 12px 20px; border-radius: 12px;
          background: rgba(59,130,246,0.03); border: 1px solid rgba(59,130,246,0.06);
          font-size: 14px; color: #475569; font-weight: 500;
        }

        .step-card {
          position: relative; background: #FFFFFF; border: 1px solid rgba(59,130,246,0.08);
          border-radius: 20px; padding: 36px; transition: all 0.5s cubic-bezier(.22,1,.36,1); overflow: hidden;
        }
        .step-card:hover { transform: translateY(-6px); box-shadow: 0 16px 48px rgba(59,130,246,0.1); border-color: rgba(59,130,246,0.15); }

        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #FAFBFE; }
        ::-webkit-scrollbar-thumb { background: linear-gradient(180deg, #3B82F6, #7C3AED); border-radius: 3px; }

        input::placeholder, textarea::placeholder { color: #94A3B8; }
      `}</style>{/* Large background blooming tree */}
      <div style={{ position: "fixed", top: 0, right: "-5%", width: "60vw", height: "100vh", pointerEvents: "none", zIndex: 0, opacity: 0.10, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-end" }}>
        <svg width="100%" height="100%" viewBox="0 0 800 1000" preserveAspectRatio="xMidYMax meet">
          <defs>
            <linearGradient id="trunkGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8B7355" />
              <stop offset="100%" stopColor="#6B5840" />
            </linearGradient>
            <linearGradient id="branchGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#9B8465" />
              <stop offset="100%" stopColor="#7B6850" />
            </linearGradient>
            <linearGradient id="treeFlowerA" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#C4B5FD" />
              <stop offset="50%" stopColor="#A5B4FC" />
              <stop offset="100%" stopColor="#DDD6FE" />
            </linearGradient>
            <linearGradient id="treeFlowerB" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#A5B4FC" />
              <stop offset="50%" stopColor="#C4B5FD" />
              <stop offset="100%" stopColor="#E9D5FF" />
            </linearGradient>
            <linearGradient id="leafGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#86EFAC" />
              <stop offset="100%" stopColor="#4ADE80" />
            </linearGradient>
          </defs>

          {/* Main trunk */}
          <path d="M400 1000 Q400 850 395 780 Q388 700 380 650 Q375 600 390 550 Q400 520 400 480" stroke="url(#trunkGrad)" strokeWidth="28" fill="none" strokeLinecap="round" />

          {/* Root flare */}
          <path d="M400 1000 Q360 950 340 1000" stroke="url(#trunkGrad)" strokeWidth="12" fill="none" strokeLinecap="round" />
          <path d="M400 1000 Q440 940 470 1000" stroke="url(#trunkGrad)" strokeWidth="10" fill="none" strokeLinecap="round" />

          {/* Major branches */}
          <path d="M390 600 Q340 540 280 500 Q240 475 200 460" stroke="url(#branchGrad)" strokeWidth="14" fill="none" strokeLinecap="round" />
          <path d="M395 550 Q440 490 500 450 Q540 425 580 410" stroke="url(#branchGrad)" strokeWidth="14" fill="none" strokeLinecap="round" />
          <path d="M400 500 Q380 440 350 390 Q330 360 310 340" stroke="url(#branchGrad)" strokeWidth="12" fill="none" strokeLinecap="round" />
          <path d="M400 480 Q420 420 450 370 Q475 335 500 310" stroke="url(#branchGrad)" strokeWidth="12" fill="none" strokeLinecap="round" />
          <path d="M400 490 Q400 430 400 370 Q400 330 400 290" stroke="url(#branchGrad)" strokeWidth="10" fill="none" strokeLinecap="round" />

          {/* Secondary branches */}
          <path d="M280 500 Q250 480 220 490" stroke="url(#branchGrad)" strokeWidth="6" fill="none" strokeLinecap="round" />
          <path d="M200 460 Q180 440 160 450" stroke="url(#branchGrad)" strokeWidth="5" fill="none" strokeLinecap="round" />
          <path d="M350 390 Q320 370 290 380" stroke="url(#branchGrad)" strokeWidth="6" fill="none" strokeLinecap="round" />
          <path d="M310 340 Q280 310 260 300" stroke="url(#branchGrad)" strokeWidth="5" fill="none" strokeLinecap="round" />
          <path d="M500 450 Q530 430 560 440" stroke="url(#branchGrad)" strokeWidth="6" fill="none" strokeLinecap="round" />
          <path d="M580 410 Q610 395 630 405" stroke="url(#branchGrad)" strokeWidth="5" fill="none" strokeLinecap="round" />
          <path d="M450 370 Q480 350 510 355" stroke="url(#branchGrad)" strokeWidth="6" fill="none" strokeLinecap="round" />
          <path d="M500 310 Q530 290 550 295" stroke="url(#branchGrad)" strokeWidth="5" fill="none" strokeLinecap="round" />
          <path d="M400 370 Q380 340 360 330" stroke="url(#branchGrad)" strokeWidth="5" fill="none" strokeLinecap="round" />
          <path d="M400 330 Q420 300 440 290" stroke="url(#branchGrad)" strokeWidth="5" fill="none" strokeLinecap="round" />

          {/* Scattered leaves */}
          <ellipse cx="180" cy="445" rx="12" ry="6" fill="url(#leafGrad)" opacity="0.5" transform="rotate(-20 180 445)" />
          <ellipse cx="230" cy="480" rx="10" ry="5" fill="url(#leafGrad)" opacity="0.4" transform="rotate(15 230 480)" />
          <ellipse cx="560" cy="425" rx="11" ry="5" fill="url(#leafGrad)" opacity="0.5" transform="rotate(25 560 425)" />
          <ellipse cx="620" cy="400" rx="10" ry="5" fill="url(#leafGrad)" opacity="0.4" transform="rotate(-10 620 400)" />
          <ellipse cx="300" cy="365" rx="10" ry="5" fill="url(#leafGrad)" opacity="0.45" transform="rotate(30 300 365)" />
          <ellipse cx="510" cy="340" rx="11" ry="5" fill="url(#leafGrad)" opacity="0.45" transform="rotate(-25 510 340)" />
          <ellipse cx="380" cy="310" rx="9" ry="4" fill="url(#leafGrad)" opacity="0.4" transform="rotate(10 380 310)" />
          <ellipse cx="440" cy="275" rx="10" ry="5" fill="url(#leafGrad)" opacity="0.4" transform="rotate(-15 440 275)" />

          {/* Logo flowers - large ones */}
          {[[200, 440, 28], [310, 330, 26], [260, 290, 24], [170, 380, 22], [400, 270, 30], [500, 300, 28], [550, 380, 26], [620, 390, 24], [460, 350, 25]].map(([cx, cy, s], i) => (
            <g key={`lg${i}`} transform={`translate(${cx - s}, ${cy - s})`}>
              {[0, 60, 120, 180, 240, 300].map((angle) => (
                <ellipse key={angle} cx={s} cy={s * 0.56} rx={s * 0.28} ry={s * 0.44} fill={angle % 120 === 0 ? "url(#treeFlowerA)" : "url(#treeFlowerB)"} stroke="#fff" strokeWidth="1" transform={`rotate(${angle} ${s} ${s})`} opacity="0.85" />
              ))}
              <circle cx={s} cy={s} r={s * 0.16} fill="#fff" opacity="0.4" />
            </g>
          ))}

          {/* Logo flowers - medium ones */}
          {[[150, 460, 18], [240, 380, 16], [340, 280, 18], [290, 360, 15], [450, 290, 17], [530, 350, 16], [590, 420, 15], [480, 400, 16], [360, 360, 14], [420, 320, 15]].map(([cx, cy, s], i) => (
            <g key={`md${i}`} transform={`translate(${cx - s}, ${cy - s})`}>
              {[0, 60, 120, 180, 240, 300].map((angle) => (
                <ellipse key={angle} cx={s} cy={s * 0.56} rx={s * 0.28} ry={s * 0.44} fill={angle % 120 === 0 ? "url(#treeFlowerB)" : "url(#treeFlowerA)"} stroke="#fff" strokeWidth="0.8" transform={`rotate(${angle} ${s} ${s})`} opacity="0.75" />
              ))}
              <circle cx={s} cy={s} r={s * 0.14} fill="#fff" opacity="0.3" />
            </g>
          ))}

          {/* Logo flowers - small buds */}
          {[[180, 420, 10], [270, 310, 9], [330, 300, 10], [370, 340, 8], [430, 260, 10], [490, 330, 9], [550, 400, 10], [610, 410, 8], [220, 350, 9], [470, 380, 8], [400, 240, 9], [350, 250, 8]].map(([cx, cy, s], i) => (
            <g key={`sm${i}`} transform={`translate(${cx - s}, ${cy - s})`}>
              {[0, 60, 120, 180, 240, 300].map((angle) => (
                <ellipse key={angle} cx={s} cy={s * 0.56} rx={s * 0.28} ry={s * 0.44} fill="url(#treeFlowerA)" stroke="#fff" strokeWidth="0.5" transform={`rotate(${angle} ${s} ${s})`} opacity="0.65" />
              ))}
              <circle cx={s} cy={s} r={s * 0.12} fill="#fff" opacity="0.25" />
            </g>
          ))}
        </svg>
      </div>

      {/* ════════════════════ NAV ════════════════════ */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, padding: "14px 0", background: scrollY > 60 ? "rgba(250,251,254,0.92)" : "transparent", backdropFilter: scrollY > 60 ? "blur(20px)" : "none", borderBottom: scrollY > 60 ? "1px solid rgba(59,130,246,0.08)" : "1px solid transparent", transition: "all 0.4s ease" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <a href="#hero" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 10 }}>
            <LogoFlower size={36} />
            <span className="font-brand" style={{ fontSize: 20, color: "#0F172A", fontStyle: "italic" }}>Full Bloom AI</span>
          </a>
          <div style={{ display: "flex", gap: 28, alignItems: "center" }}>
            {["Services", "About", "FAQ", "Contact"].map((l) => (
              <a key={l} href={`#${l.toLowerCase()}`} className="nav-link font-display" style={{ textDecoration: "none", color: "#475569", fontSize: 13, fontWeight: 500, letterSpacing: "0.06em", textTransform: "uppercase" }}>{l}</a>
            ))}
            <a href="#contact" className="cta-btn font-display" style={{ textDecoration: "none", background: "var(--gradient)", color: "#fff", padding: "10px 22px", borderRadius: 10, fontSize: 13, fontWeight: 700 }}>Book a Call</a>
          </div>
        </div>
      </nav>

      {/* ════════════════════ HERO ════════════════════ */}
      <section id="hero" style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", padding: "140px 24px 100px", background: "linear-gradient(180deg, #FAFBFE 0%, #EFF3FF 60%, #FAFBFE 100%)" }}>
        <div className="pulse-soft" style={{ position: "absolute", top: "15%", left: "50%", transform: "translate(-50%, -50%)", width: 700, height: 700, borderRadius: "50%", background: "radial-gradient(circle, rgba(59,130,246,0.08) 0%, rgba(124,58,237,0.04) 40%, transparent 70%)", pointerEvents: "none" }} />
        <PetalDecor size={140} rotation={-25} style={{ position: "absolute", top: "8%", right: "8%", opacity: 0.05, animation: "float-up 7s ease-in-out infinite" }} />
        <PetalDecor size={90} rotation={40} style={{ position: "absolute", bottom: "18%", left: "5%", opacity: 0.04, animation: "float-up 8s ease-in-out infinite" }} />
        <PetalDecor size={70} rotation={120} style={{ position: "absolute", top: "42%", left: "14%", opacity: 0.03, animation: "float-down 6s ease-in-out infinite" }} />
        <div className="spin-vslow" style={{ position: "absolute", top: "50%", left: "50%", width: 600, height: 600, marginTop: -300, marginLeft: -300, borderRadius: "50%", border: "1px solid rgba(59,130,246,0.05)", pointerEvents: "none" }} />

        <div style={{ position: "relative", textAlign: "center", maxWidth: 960, zIndex: 2 }}>
          <Reveal><LogoFlower size={140} style={{ margin: "0 auto 20px" }} /></Reveal>
          <Reveal delay={0.08}><div className="font-brand" style={{ fontSize: "clamp(48px, 5vw, 72px)", color: "#0F172A", marginBottom: 32 }}>Full Bloom AI</div></Reveal>
          <Reveal delay={0.14}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "8px 22px", borderRadius: 40, border: "1px solid rgba(59,130,246,0.15)", background: "rgba(59,130,246,0.04)", marginBottom: 36, fontSize: 12, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#3B82F6" }}>
              <Sparkles size={13} />Applied AI for Small Businesses
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <h1 className="font-display" style={{ fontSize: "clamp(34px, 7.5vw, 68px)", fontWeight: 900, lineHeight: 1.02, letterSpacing: "-0.035em", marginBottom: 28, color: "#0F172A" }}>
              Grow Smarter. <span className="text-grad font-serif" style={{ fontWeight: 700, fontStyle: "italic" }}>Bloom</span> Bolder.
            </h1>
          </Reveal>
          <Reveal delay={0.28}>
            <p style={{ fontSize: "clamp(16px, 2vw, 20px)", lineHeight: 1.75, color: "#475569", maxWidth: 600, margin: "0 auto 40px", fontWeight: 300 }}>
              We help small businesses harness the power of AI — no jargon, no overwhelm, no six-figure budget. Just real transformation, built around how you actually work.
            </p>
          </Reveal>
          <Reveal delay={0.34}>
            <div style={{ display: "flex", justifyContent: "center", gap: 16, flexWrap: "wrap", marginBottom: 44 }}>
              <div className="trust-badge"><Shield size={16} style={{ color: "#3B82F6" }} />Trusted by 20+ businesses</div>
              <div className="trust-badge"><Star size={16} style={{ color: "#3B82F6" }} />4.9 client satisfaction</div>
              <div className="trust-badge"><Zap size={16} style={{ color: "#3B82F6" }} />50+ workflows automated</div>
            </div>
          </Reveal>
          <Reveal delay={0.4}>
            <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
              <a href="#contact" className="cta-btn font-display" style={{ textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 10, background: "var(--gradient)", color: "#fff", padding: "17px 40px", borderRadius: 14, fontSize: 16, fontWeight: 700 }}>
                Book a Free Consultation <ArrowRight size={18} />
              </a>
              <a href="#services" className="cta-btn-outline" style={{ textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 10, border: "1px solid rgba(59,130,246,0.2)", color: "#0F172A", padding: "17px 40px", borderRadius: 14, fontSize: 16, fontWeight: 500 }}>Explore Services</a>
            </div>
          </Reveal>
          <Reveal delay={0.5}><div style={{ marginTop: 64, opacity: 0.3 }}><ChevronDown size={22} className="float-down" style={{ color: "#3B82F6" }} /></div></Reveal>
        </div>
      </section>

{/* ════════════════════ QUICK CONTACT ════════════════════ */}
      <div className="section-divider" />
      <section style={{ padding: "80px 24px", background: "#FFFFFF" }}>
        <div style={{ maxWidth: 680, margin: "0 auto" }}>
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: 36 }}>
              <p className="font-display" style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#3B82F6", marginBottom: 12 }}>Get Started Today</p>
              <h2 className="font-display" style={{ fontSize: "clamp(24px, 3.5vw, 36px)", fontWeight: 800, lineHeight: 1.15, letterSpacing: "-0.025em", color: "#0F172A" }}>
                Ready to explore AI for your business?
              </h2>
              <p style={{ fontSize: 15, color: "#475569", marginTop: 12, lineHeight: 1.7 }}>Send us a message and we'll get back to you within 24 hours.</p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div style={{ background: "#FFFFFF", border: "1px solid rgba(59,130,246,0.08)", borderRadius: 24, padding: "36px 32px" }}>
              <ContactForm />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ════════════════════ PROBLEM / SOLUTION ════════════════════ */}
      <div className="section-divider" />
      <section style={{ padding: "120px 24px", background: "#FFFFFF" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <Reveal><p className="font-display" style={{ textAlign: "center", fontSize: 12, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#3B82F6", marginBottom: 18 }}>The Challenge</p></Reveal>
          <Reveal delay={0.08}>
            <h2 className="font-display" style={{ textAlign: "center", fontSize: "clamp(28px, 4.5vw, 50px)", fontWeight: 800, lineHeight: 1.12, letterSpacing: "-0.025em", maxWidth: 700, margin: "0 auto 60px", color: "#0F172A" }}>
              You know AI could change everything. <span style={{ color: "#94A3B8" }}>You just need the right partner.</span>
            </h2>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 28 }}>
            <Reveal delay={0.12}>
              <div style={{ padding: 44, borderRadius: 20, background: "#F8FAFC", border: "1px solid rgba(59,130,246,0.06)", height: "100%" }}>
                <div style={{ width: 52, height: 52, borderRadius: 14, background: "rgba(59,130,246,0.06)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 24 }}><span style={{ fontSize: 26 }}>😰</span></div>
                <h3 className="font-display" style={{ fontSize: 22, fontWeight: 700, marginBottom: 14, color: "#0F172A" }}>The Overwhelm Is Real</h3>
                <p style={{ color: "#475569", lineHeight: 1.75, fontSize: 15 }}>New tools every day. Buzzwords everywhere. You're running a business — not studying for a tech degree. Meanwhile, competitors are pulling ahead and you're stuck wondering where to even begin.</p>
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <div style={{ padding: 44, borderRadius: 20, background: "linear-gradient(135deg, rgba(59,130,246,0.04) 0%, rgba(124,58,237,0.03) 100%)", border: "1px solid rgba(59,130,246,0.1)", height: "100%" }}>
                <div style={{ width: 52, height: 52, borderRadius: 14, background: "rgba(59,130,246,0.08)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 24 }}><span style={{ fontSize: 26 }}>😊</span></div>
                <h3 className="font-display" style={{ fontSize: 22, fontWeight: 700, marginBottom: 14, color: "#0F172A" }}>That's Where We Come In</h3>
                <p style={{ color: "#475569", lineHeight: 1.75, fontSize: 15 }}>Full Bloom AI is your dedicated AI partner. We cut through the noise, identify what actually moves the needle for <em>your</em> business, and build solutions that deliver from day one. No jargon. No fluff. No in-house team required.</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ════════════════════ SERVICES ════════════════════ */}
      <div className="section-divider" />
      <section id="services" style={{ position: "relative", padding: "120px 24px", background: "#FAFBFE" }}>
        <LogoFlower size={350} className="spin-vslow" style={{ position: "absolute", top: "50%", left: "50%", marginTop: -175, marginLeft: -175, opacity: 0.02, pointerEvents: "none" }} />
        <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 2 }}>
          <Reveal><p className="font-display" style={{ textAlign: "center", fontSize: 12, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#3B82F6", marginBottom: 18 }}>Our Services</p></Reveal>
          <Reveal delay={0.08}>
            <h2 className="font-display" style={{ textAlign: "center", fontSize: "clamp(28px, 4.5vw, 50px)", fontWeight: 800, lineHeight: 1.12, letterSpacing: "-0.025em", marginBottom: 64, color: "#0F172A" }}>
              AI that <span className="text-grad font-serif" style={{ fontWeight: 700, fontStyle: "italic" }}>actually</span> moves the needle
            </h2>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: 22 }}>
            {services.map((s, i) => (
              <Reveal key={s.title} delay={0.08 + i * 0.07}>
                <div className="service-card" onMouseEnter={() => setHoveredService(i)} onMouseLeave={() => setHoveredService(null)} style={{ padding: 36, cursor: "default", height: "100%" }}>
                  <div className="svc-icon-wrap" style={{ width: 56, height: 56, borderRadius: 16, background: "rgba(59,130,246,0.07)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 24, transition: "all 0.5s cubic-bezier(.22,1,.36,1)" }}>
                    <s.icon size={26} className="svc-icon" style={{ color: "#3B82F6", transition: "color 0.4s ease" }} />
                  </div>
                  <h3 className="font-display" style={{ fontSize: 19, fontWeight: 700, marginBottom: 10, color: "#0F172A" }}>{s.title}</h3>
                  <p style={{ color: "#64748B", lineHeight: 1.72, fontSize: 14 }}>{s.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════ HOW IT WORKS ════════════════════ */}
      <div className="section-divider" />
      <section style={{ padding: "120px 24px", background: "#FFFFFF" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <Reveal><p className="font-display" style={{ textAlign: "center", fontSize: 12, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#3B82F6", marginBottom: 18 }}>How It Works</p></Reveal>
          <Reveal delay={0.08}>
            <h2 className="font-display" style={{ textAlign: "center", fontSize: "clamp(28px, 4.5vw, 50px)", fontWeight: 800, lineHeight: 1.12, letterSpacing: "-0.025em", marginBottom: 20, color: "#0F172A" }}>
              From first call to <span className="text-grad font-serif" style={{ fontWeight: 700, fontStyle: "italic" }}>full bloom</span>
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p style={{ textAlign: "center", fontSize: 17, color: "#475569", maxWidth: 550, margin: "0 auto 64px", lineHeight: 1.7, fontWeight: 300 }}>A clear, simple process so you always know what's happening and what comes next.</p>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 0 }}>
            {steps.map((step, i) => (
              <Reveal key={step.title} delay={0.1 + i * 0.1}>
                <div style={{ position: "relative", padding: "0 16px" }}>
                  <div className="step-card" style={{ textAlign: "center", height: "100%" }}>
                    <div className="font-display text-grad" style={{ fontSize: 42, fontWeight: 900, marginBottom: 16, lineHeight: 1 }}>{step.num}</div>
                    <div style={{ width: 60, height: 60, borderRadius: 16, background: "rgba(59,130,246,0.07)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
                      <step.icon size={28} style={{ color: "#3B82F6" }} />
                    </div>
                    <h3 className="font-display" style={{ fontSize: 22, fontWeight: 700, marginBottom: 12, color: "#0F172A" }}>{step.title}</h3>
                    <p style={{ color: "#64748B", lineHeight: 1.72, fontSize: 14 }}>{step.desc}</p>
                  </div>
                  {i < steps.length - 1 && (
                    <div style={{ position: "absolute", top: "38%", right: -12, zIndex: 10, width: 24, height: 24, borderRadius: "50%", background: "#EFF3FF", border: "1px solid rgba(59,130,246,0.12)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <ArrowRight size={12} style={{ color: "#3B82F6" }} />
                    </div>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════ ABOUT ════════════════════ */}
      <div className="section-divider" />
      <section id="about" style={{ padding: "120px 24px", background: "#FFFFFF" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <Reveal><p className="font-display" style={{ textAlign: "center", fontSize: 12, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#3B82F6", marginBottom: 18 }}>Who We Are</p></Reveal>
          <Reveal delay={0.08}>
            <h2 className="font-display" style={{ textAlign: "center", fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 800, lineHeight: 1.15, letterSpacing: "-0.025em", marginBottom: 64, color: "#0F172A" }}>
              Your AI partner, <span className="text-grad font-serif" style={{ fontWeight: 700, fontStyle: "italic" }}>not your IT department</span>
            </h2>
          </Reveal>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 48, alignItems: "start" }}>
            {/* Mission statement */}
            <Reveal delay={0.12}>
              <div style={{ padding: "48px 40px", borderRadius: 24, background: "linear-gradient(135deg, #2563EB 0%, #4F46E5 100%)", position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", top: -30, right: -30, opacity: 0.1 }}>
                  <LogoFlower size={160} />
                </div>
                <div style={{ position: "relative", zIndex: 2 }}>
                  <div className="font-serif" style={{ fontSize: 48, color: "rgba(255,255,255,0.2)", lineHeight: 1, marginBottom: 16 }}>"</div>
                  <p className="font-brand" style={{ fontSize: 24, color: "#FFFFFF", lineHeight: 1.6, fontStyle: "italic", marginBottom: 24 }}>
                    We believe every small business deserves AI that works as hard as they do — without the complexity, gatekeeping, or sticker shock.
                  </p>
                  <div style={{ width: 40, height: 3, borderRadius: 2, background: "rgba(255,255,255,0.3)", marginBottom: 16 }} />
                  <p className="font-display" style={{ fontSize: 14, color: "rgba(255,255,255,0.7)", fontWeight: 500 }}>The Full Bloom AI Mission</p>
                </div>
              </div>
            </Reveal>

            {/* Right side: description + promise + values */}
            <div>
              <Reveal delay={0.16}>
                <p style={{ color: "#475569", lineHeight: 1.8, fontSize: 16, marginBottom: 18 }}>
                  We bring together expertise in AI engineering, healthcare, and business operations to deliver solutions that actually work in the real world. Our approach is hands-on, transparent, and always focused on measurable results.
                </p>
              </Reveal>

              {/* Our Promise */}
              <Reveal delay={0.2}>
                <div style={{ padding: "28px 28px", borderRadius: 16, background: "rgba(59,130,246,0.03)", border: "1px solid rgba(59,130,246,0.08)", marginBottom: 28 }}>
                  <h4 className="font-display" style={{ fontSize: 16, fontWeight: 700, color: "#0F172A", marginBottom: 12, display: "flex", alignItems: "center", gap: 8 }}>
                    <Heart size={18} style={{ color: "#3B82F6" }} />
                    Our Promise
                  </h4>
                  <p style={{ color: "#475569", lineHeight: 1.75, fontSize: 15 }}>
                    When you work with Full Bloom AI, you'll never feel lost, oversold, or left behind. We explain everything in plain language, we only recommend what you actually need, and we don't stop until it's working. Your success is our success.
                  </p>
                </div>
              </Reveal>

              {/* Values */}
              <Reveal delay={0.24}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  {[
                    { icon: Shield, label: "Trusted & Transparent" },
                    { icon: Target, label: "Results-Driven" },
                    { icon: Users, label: "Built to Scale" },
                    { icon: Sparkles, label: "Innovation-First" },
                  ].map((v) => (
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


      {/* ════════════════════ FAQ ════════════════════ */}
      <div className="section-divider" />
      <section id="faq" style={{ padding: "120px 24px", background: "#FAFBFE" }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <Reveal><p className="font-display" style={{ textAlign: "center", fontSize: 12, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#3B82F6", marginBottom: 18 }}>Common Questions</p></Reveal>
          <Reveal delay={0.08}>
            <h2 className="font-display" style={{ textAlign: "center", fontSize: "clamp(28px, 4.5vw, 50px)", fontWeight: 800, lineHeight: 1.12, letterSpacing: "-0.025em", marginBottom: 56, color: "#0F172A" }}>
              Everything you need to <span className="text-grad font-serif" style={{ fontWeight: 700, fontStyle: "italic" }}>know</span>
            </h2>
          </Reveal>
          <Reveal delay={0.14}>
            <div style={{ borderTop: "1px solid rgba(59,130,246,0.08)" }}>
              {faqs.map((faq, i) => <FaqItem key={i} question={faq.question} answer={faq.answer} />)}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ════════════════════ CONTACT FORM ════════════════════ */}
      <div className="section-divider" />
      <section id="contact" style={{ position: "relative", padding: "120px 24px", overflow: "hidden", background: "linear-gradient(180deg, #FFFFFF 0%, #EFF3FF 50%, #FAFBFE 100%)" }}>
        <PetalDecor size={280} rotation={15} style={{ position: "absolute", bottom: "-10%", right: "-4%", opacity: 0.03 }} className="float-up" />
        <PetalDecor size={180} rotation={-40} style={{ position: "absolute", top: "10%", left: "-3%", opacity: 0.02 }} className="float-down" />

        <div style={{ maxWidth: 900, margin: "0 auto", position: "relative", zIndex: 2 }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <Reveal><LogoFlower size={52} style={{ margin: "0 auto 24px" }} /></Reveal>
            <Reveal delay={0.06}><p className="font-display" style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#3B82F6", marginBottom: 18 }}>Get Started</p></Reveal>
            <Reveal delay={0.12}>
              <h2 className="font-display" style={{ fontSize: "clamp(30px, 5vw, 52px)", fontWeight: 900, lineHeight: 1.08, letterSpacing: "-0.03em", marginBottom: 16, color: "#0F172A" }}>
                Let's build something <span className="text-grad font-serif" style={{ fontWeight: 700, fontStyle: "italic" }}>extraordinary</span>
              </h2>
            </Reveal>
            <Reveal delay={0.16}>
              <p style={{ fontSize: 17, color: "#475569", lineHeight: 1.7, maxWidth: 520, margin: "0 auto", fontWeight: 300 }}>
                Fill out the form below and we'll get back to you within 24 hours to schedule your free consultation.
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.2}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 48, alignItems: "start" }}>
              {/* Form */}
              <div style={{ background: "#FFFFFF", border: "1px solid rgba(59,130,246,0.08)", borderRadius: 24, padding: "40px 36px" }}>
                <ContactForm />
              </div>

              {/* Contact info sidebar */}
              <div style={{ display: "flex", flexDirection: "column", gap: 24, paddingTop: 8 }}>
                <div style={{ background: "#FFFFFF", border: "1px solid rgba(59,130,246,0.06)", borderRadius: 20, padding: "28px 24px" }}>
                  <h4 className="font-display" style={{ fontSize: 15, fontWeight: 700, color: "#0F172A", marginBottom: 20 }}>Get in touch directly</h4>
                  <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                    {[
                      { icon: Mail, text: "hello@fullbloomai.com", href: "mailto:hello@fullbloomai.com" },
                      { icon: Phone, text: "(571) 667-2227", href: "tel:+15716672227" },
                      { icon: MapPin, text: "Northern Virginia" },
                    ].map((item) => (
                      <div key={item.text} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                        <div style={{ width: 36, height: 36, borderRadius: 10, background: "rgba(59,130,246,0.06)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                          <item.icon size={16} style={{ color: "#3B82F6" }} />
                        </div>
                        {item.href ? (
                          <a href={item.href} style={{ color: "#475569", fontSize: 14, textDecoration: "none", transition: "color 0.2s" }}
                            onMouseEnter={(e) => e.target.style.color = "#3B82F6"}
                            onMouseLeave={(e) => e.target.style.color = "#475569"}
                          >{item.text}</a>
                        ) : (
                          <span style={{ color: "#475569", fontSize: 14 }}>{item.text}</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{ background: "linear-gradient(135deg, rgba(59,130,246,0.04) 0%, rgba(124,58,237,0.03) 100%)", border: "1px solid rgba(59,130,246,0.08)", borderRadius: 20, padding: "28px 24px" }}>
                  <h4 className="font-display" style={{ fontSize: 15, fontWeight: 700, color: "#0F172A", marginBottom: 12 }}>What to expect</h4>
                  <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                    {[
                      "We respond within 24 hours",
                      "Free 30-min consultation",
                      "No obligation, no pressure",
                      "Clear next steps after every call",
                    ].map((item) => (
                      <div key={item} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <CheckCircle size={14} style={{ color: "#22C55E", flexShrink: 0 }} />
                        <span style={{ color: "#475569", fontSize: 13, lineHeight: 1.5 }}>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ════════════════════ FOOTER ════════════════════ */}
      <footer style={{ padding: "36px 24px", borderTop: "1px solid rgba(59,130,246,0.06)", background: "#FAFBFE" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 14 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <LogoFlower size={28} />
            <span className="font-brand" style={{ fontSize: 16, color: "#0F172A" }}>Full Bloom AI</span>
          </div>
          <p style={{ fontSize: 12, color: "#CBD5E1" }}>© 2026 Full Bloom AI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
