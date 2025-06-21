
import { useState } from 'react';
import { ArrowRight, CheckCircle, AlertTriangle } from 'lucide-react';
import { newsletterSchema } from '../lib/validationSchemas';
import { sanitizeInput } from '../lib/auth';
import { z } from 'zod';

export const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Sanitize and validate email
      const sanitizedEmail = sanitizeInput(email);
      const validationResult = newsletterSchema.safeParse({ email: sanitizedEmail });

      if (!validationResult.success) {
        setError(validationResult.error.errors[0].message);
        setIsLoading(false);
        return;
      }

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setIsSubmitted(true);
      setEmail('');
      console.log('Newsletter subscription:', sanitizedEmail);
      
      // Reset success message after 3 seconds
      setTimeout(() => setIsSubmitted(false), 3000);
    } catch (err) {
      setError('Failed to subscribe. Please try again.');
      console.error('Newsletter subscription error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="bg-gradient-to-r from-blue-50 to-indigo-100 py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Stay Connected
        </h2>
        <p className="text-lg text-gray-600 mb-8">
          Subscribe to our newsletter and enjoy 10% off your first order. Get exclusive updates on new arrivals and special offers.
        </p>
        
        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className={`flex-1 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                error ? 'border-red-300' : 'border-gray-300'
              }`}
              required
              disabled={isLoading}
              maxLength={255}
            />
            <button
              type="submit"
              disabled={isLoading || isSubmitted}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-6 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors duration-200"
            >
              {isLoading ? (
                'Subscribing...'
              ) : isSubmitted ? (
                <>
                  <CheckCircle className="w-4 h-4" />
                  Subscribed!
                </>
              ) : (
                <>
                  Subscribe
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
          
          {error && (
            <p className="text-red-600 text-sm mt-2 flex items-center justify-center gap-1">
              <AlertTriangle className="w-3 h-3" />
              {error}
            </p>
          )}
          
          {!error && !isSubmitted && (
            <p className="text-sm text-gray-500 mt-2">
              We respect your privacy. Unsubscribe at any time.
            </p>
          )}
        </form>
      </div>
    </section>
  );
};
