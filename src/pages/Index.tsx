
import { Suspense, lazy } from 'react';
import { Hero } from '../components/Hero';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { WhatsAppSupport } from '../components/WhatsAppSupport';
import { Skeleton } from '../components/ui/skeleton';

// Lazy load components for better performance
const FeaturedCollections = lazy(() => import('../components/FeaturedCollections').then(module => ({ default: module.FeaturedCollections })));
const CategoryShowcase = lazy(() => import('../components/CategoryShowcase').then(module => ({ default: module.CategoryShowcase })));
const QuickShop = lazy(() => import('../components/QuickShop').then(module => ({ default: module.QuickShop })));
const Testimonials = lazy(() => import('../components/Testimonials').then(module => ({ default: module.Testimonials })));
const Newsletter = lazy(() => import('../components/Newsletter').then(module => ({ default: module.Newsletter })));

// Loading component for sections
const SectionSkeleton = () => (
  <div className="py-20 bg-gray-50 dark:bg-gray-800">
    <div className="container mx-auto px-6">
      <div className="text-center mb-16">
        <Skeleton className="h-12 w-80 mx-auto mb-6" />
        <Skeleton className="h-6 w-96 mx-auto" />
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white dark:bg-gray-700 rounded-2xl overflow-hidden">
            <Skeleton className="h-64 w-full" />
            <div className="p-6 space-y-4">
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const Index = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200">
      <Header />
      <main className="bg-white dark:bg-gray-900 transition-colors duration-200">
        <Hero />
        
        <Suspense fallback={<SectionSkeleton />}>
          <FeaturedCollections />
        </Suspense>
        
        <Suspense fallback={<SectionSkeleton />}>
          <CategoryShowcase />
        </Suspense>
        
        <Suspense fallback={<SectionSkeleton />}>
          <QuickShop />
        </Suspense>
        
        <Suspense fallback={<SectionSkeleton />}>
          <Testimonials />
        </Suspense>
        
        <Suspense fallback={<SectionSkeleton />}>
          <Newsletter />
        </Suspense>
      </main>
      <Footer />
      <WhatsAppSupport />
    </div>
  );
};

export default Index;
