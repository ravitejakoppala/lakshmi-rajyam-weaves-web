
import { Header } from '../components/Header';
import { Hero } from '../components/Hero';
import { QuickShop } from '../components/QuickShop';
import { CategoryShowcase } from '../components/CategoryShowcase';
import { About } from '../components/About';
import { FeaturedCollections } from '../components/FeaturedCollections';
import { Testimonials } from '../components/Testimonials';
import { Community } from '../components/Community';
import { WhatsAppSupport } from '../components/WhatsAppSupport';
import { Newsletter } from '../components/Newsletter';
import { Footer } from '../components/Footer';
import { AdminLogin } from '../components/AdminLogin';
import { useState } from 'react';
import { Settings } from 'lucide-react';

const Index = () => {
  const [showAdminLogin, setShowAdminLogin] = useState(false);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200">
      {/* Admin Login Button - Floating */}
      <button
        onClick={() => setShowAdminLogin(true)}
        className="fixed bottom-6 right-6 z-40 bg-gray-800 hover:bg-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600 text-white p-3 rounded-full shadow-lg transition-colors duration-200 group"
        title="Admin Access"
      >
        <Settings className="w-5 h-5 group-hover:rotate-45 transition-transform duration-200" />
      </button>

      {/* Admin Login Modal */}
      {showAdminLogin && (
        <AdminLogin onClose={() => setShowAdminLogin(false)} />
      )}

      {/* Navigation Header */}
      <Header />

      {/* Main Content */}
      <Hero />
      <QuickShop />
      <CategoryShowcase />
      <About />
      <FeaturedCollections />
      <Testimonials />
      <Community />
      <WhatsAppSupport />
      <Newsletter />
      <Footer />
    </div>
  );
};

export default Index;
