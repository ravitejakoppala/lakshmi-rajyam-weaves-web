
import { useState } from 'react';
import { X, User, Lock, Eye, EyeOff, AlertTriangle } from 'lucide-react';
import { AdminDashboard } from './AdminDashboard';
import { 
  adminLoginSchema, 
  sanitizeInput, 
  loginRateLimiter, 
  createSession, 
  validateSession,
  verifyAdminCredentials 
} from '../lib/auth';
import { z } from 'zod';

interface AdminLoginProps {
  onClose: () => void;
}

export const AdminLogin = ({ onClose }: AdminLoginProps) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(validateSession());
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Rate limiting check
      if (!loginRateLimiter.isAllowed('admin-login')) {
        const remainingTime = Math.ceil(loginRateLimiter.getRemainingTime('admin-login') / 60000);
        setError(`Too many failed attempts. Please try again in ${remainingTime} minutes.`);
        setIsLoading(false);
        return;
      }

      // Input validation
      const sanitizedUsername = sanitizeInput(username);
      const sanitizedPassword = sanitizeInput(password);

      const validationResult = adminLoginSchema.safeParse({
        username: sanitizedUsername,
        password: sanitizedPassword
      });

      if (!validationResult.success) {
        setError(validationResult.error.errors[0].message);
        setIsLoading(false);
        return;
      }

      // Verify credentials
      const isValid = await verifyAdminCredentials(sanitizedUsername, sanitizedPassword);
      
      if (isValid) {
        createSession(sanitizedUsername);
        setIsLoggedIn(true);
        setError('');
        console.log('Admin login successful');
      } else {
        setError('Invalid credentials. Please check your username and password.');
      }
    } catch (err) {
      setError('Login failed. Please try again.');
      console.error('Login error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoggedIn) {
    return <AdminDashboard onClose={onClose} />;
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800">Admin Login</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="p-6 space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" />
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Username
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter username"
                required
                disabled={isLoading}
                maxLength={50}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter password"
                required
                disabled={isLoading}
                maxLength={100}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                disabled={isLoading}
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-3 rounded-lg font-semibold transition-colors duration-200"
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>

          <div className="text-center text-sm text-gray-500">
            Secure admin access with session management
          </div>
        </form>
      </div>
    </div>
  );
};
