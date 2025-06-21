
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

const Index = () => {
  const [showAdminLogin, setShowAdminLogin] = useState(false);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200">
      {/* Admin Login Button */}
      <button
        onClick={() => setShowAdminLogin(true)}
        className="fixed top-4 right-4 z-50 bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg transition-colors duration-200 text-sm"
      >
        Admin Login
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
