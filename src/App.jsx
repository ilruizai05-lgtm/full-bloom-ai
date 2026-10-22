import Header from './components/Header';
import Hero from './components/Hero';
import { TrustStrip, Industries, Services, Story, OurWork, Process, Faq } from './components/Sections';
import ContactForm from './components/ContactForm';
import { ContactCards, Footer, StickyMobileCTA, BackToTop } from './components/Footer';
import useReveal from './hooks/useReveal';

export default function App() {
  useReveal();

  return (
    <>
      <Header />
      <Hero />
      <TrustStrip />
      <Industries />
      <Services />
      <Story />
      <OurWork />
      <Process />
      <Faq />
      <ContactForm />
      <ContactCards />
      <Footer />
      <StickyMobileCTA />
      <BackToTop />
    </>
  );
}
