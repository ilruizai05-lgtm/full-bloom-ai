import { Zap, Cog, Compass, Rocket } from 'lucide-react';
import alabasterShot from '../assets/work/alabaster-watch-clock.jpg';
import michaelsShot from '../assets/work/michaels-dashboard.jpg';

export const contact = {
  email: 'hello@fullbloomai.com',
  phone: '(571) 667-2227',
  phoneHref: 'tel:+15716672227',
  area: 'Northern Virginia',
};

export const navLinks = [
  { label: 'Services', href: '#services' },
  { label: 'About', href: '#about' },
  { label: 'Our Work', href: '#work' },
  { label: 'Process', href: '#process' },
  { label: 'FAQ', href: '#faq' },
];

export const stats = [
  { num: '20+', label: 'Businesses Served' },
  { num: '4.9★', label: 'Client Satisfaction' },
  { num: '50+', label: 'Workflows Built' },
  { num: '2–6 wk', label: 'Typical Launch' },
];

export const industries = ['Healthcare', 'Legal', 'Education', 'Wellness', 'Retail', 'Professional Services'];

export const services = [
  { icon: Zap, title: 'AI Workflow Automation', desc: 'We eliminate repetitive tasks and free your team to focus on growth — with intelligent automations tailored to your day-to-day operations.' },
  { icon: Cog, title: 'Custom AI Tool Integration', desc: 'From CRM to customer support, we weave the right AI tools into your existing stack — seamlessly and without disruption.' },
  { icon: Compass, title: 'AI Strategy Consulting', desc: 'Not sure where to begin? We build a clear, prioritized AI roadmap around your goals, budget, and timeline.' },
  { icon: Rocket, title: 'Done-for-You Implementation', desc: 'We handle everything — setup, testing, training, and launch. You get a working AI solution without lifting a finger.' },
];

export const steps = [
  { num: '01', title: 'Discovery', desc: 'We learn your business inside out — your workflows, pain points, goals, and budget. No tech jargon, just a real conversation.' },
  { num: '02', title: 'Build', desc: 'Our team designs, builds, and tests your custom AI solution. You stay in the loop with clear updates and zero surprises.' },
  { num: '03', title: 'Launch', desc: 'We deploy, train your team, and make sure everything runs smoothly. Then we stick around to optimize as you grow.' },
];

export const work = [
  {
    img: alabasterShot,
    alt: 'Homepage of the John Alabaster Watch & Clock website',
    caption: 'John Alabaster Watch & Clock · Vienna, VA',
    tag: 'Website Rebuild',
    title: 'A modern home for a 1971 watchmaker',
    desc: 'A fast, mobile-first website for one of Northern Virginia’s most trusted watch and clock shops — built so local customers can find the shop and start a repair from their phone.',
    points: [
      'Online repair-request form that lands straight in the owner’s inbox',
      'Google reviews, hours, and map front and center',
      'Search-engine and social-sharing upgrades for local discovery',
    ],
  },
  {
    img: michaelsShot,
    alt: 'Owner dashboard showing watch repairs and rental properties side by side',
    caption: 'Owner Dashboard · Watch repair + rentals',
    tag: 'Business Dashboard · Prototype',
    title: 'Two businesses, one screen',
    desc: 'A clickable dashboard for an owner running a watch repair shop and rental properties — everything that needs attention, in one place instead of three apps.',
    points: [
      'Repair tickets, rent status, income, and expenses side by side',
      'Phone-friendly repair intake with automatic customer records',
      'One-tap repair status updates, from intake to “ready for pickup”',
    ],
  },
];

export const faqs = [
  { q: 'Do I need any technical knowledge?', a: 'Not at all. We handle all the technical heavy lifting. Our process is designed for business owners who want results without having to learn the tech.' },
  { q: 'How long does implementation take?', a: 'Most projects take 2–6 weeks from discovery to launch. Simple automations can be live in under a week.' },
  { q: 'What size businesses do you work with?', a: 'We specialize in small to mid-size businesses — typically teams of 2 to 50 people.' },
  { q: 'What if AI doesn’t work for my industry?', a: 'AI is more versatile than most people think. We’ve worked across healthcare, legal, education, wellness, retail, and professional services.' },
  { q: 'How much does it cost?', a: 'Every engagement is scoped to your specific needs. We offer project-based pricing and monthly retainers at accessible price points. Our free consultation includes a no-obligation quote.' },
  { q: 'Will we be locked into a long-term contract?', a: 'Never. We believe in earning your trust every month. Our retainer clients can adjust or pause at any time.' },
];
