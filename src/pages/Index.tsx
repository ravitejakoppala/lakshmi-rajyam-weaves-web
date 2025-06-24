
import { Hero } from '../components/Hero';
import { FeaturedCollections } from '../components/FeaturedCollections';
import { CategoryShowcase } from '../components/CategoryShowcase';
import { Testimonials } from '../components/Testimonials';
import { Newsletter } from '../components/Newsletter';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { WhatsAppSupport } from '../components/WhatsAppSupport';

const Index = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200">
      <Header />
      <main className="bg-white dark:bg-gray-900 transition-colors duration-200">
        <Hero />
        <FeaturedCollections />
        <CategoryShowcase />
        <Testimonials />
        <Newsletter />
      </main>
      <Footer />
      <WhatsAppSupport />
    </div>
  );
};

export default Index;
