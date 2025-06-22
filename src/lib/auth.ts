
import { z } from 'zod';

// Input validation schemas
export const adminLoginSchema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters').max(50),
  password: z.string().min(8, 'Password must be at least 8 characters').max(100)
});

export const sanitizeInput = (input: string): string => {
  return input
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .trim();
};

export const sanitizeUrl = (url: string): string => {
  try {
    const parsed = new URL(url);
    // Only allow http/https protocols
    if (!['http:', 'https:'].includes(parsed.protocol)) {
      return '';
    }
    return url;
  } catch {
    return '';
  }
};

// Gmail verification function
export const verifyGmailAccount = async (email: string): Promise<boolean> => {
  // Check if it's a Gmail address
  if (!email.toLowerCase().endsWith('@gmail.com')) {
    return false;
  }
  
  // Basic email format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return false;
  }
  
  // For now, we'll accept all properly formatted Gmail addresses
  // In a real application, you would integrate with an email verification service
  return true;
};

// Simple rate limiting for login attempts
class RateLimiter {
  private attempts: Map<string, { count: number; lastAttempt: number }> = new Map();
  private readonly maxAttempts = 5;
  private readonly windowMs = 15 * 60 * 1000; // 15 minutes

  isAllowed(identifier: string): boolean {
    const now = Date.now();
    const record = this.attempts.get(identifier);

    if (!record) {
      this.attempts.set(identifier, { count: 1, lastAttempt: now });
      return true;
    }

    // Reset if window has passed
    if (now - record.lastAttempt > this.windowMs) {
      this.attempts.set(identifier, { count: 1, lastAttempt: now });
      return true;
    }

    if (record.count >= this.maxAttempts) {
      return false;
    }

    record.count++;
    record.lastAttempt = now;
    return true;
  }

  getRemainingTime(identifier: string): number {
    const record = this.attempts.get(identifier);
    if (!record) return 0;
    
    const remaining = this.windowMs - (Date.now() - record.lastAttempt);
    return Math.max(0, remaining);
  }
}

export const loginRateLimiter = new RateLimiter();

// Secure session management
export const createSession = (username: string) => {
  const sessionData = {
    username,
    loginTime: Date.now(),
    expires: Date.now() + (2 * 60 * 60 * 1000) // 2 hours
  };
  
  localStorage.setItem('admin_session', JSON.stringify(sessionData));
  return sessionData;
};

export const validateSession = (): boolean => {
  try {
    const session = localStorage.getItem('admin_session');
    if (!session) return false;
    
    const sessionData = JSON.parse(session);
    return Date.now() < sessionData.expires;
  } catch {
    return false;
  }
};

export const clearSession = () => {
  localStorage.removeItem('admin_session');
};

// Hash function for password verification (simple implementation)
export const hashPassword = async (password: string): Promise<string> => {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hash = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(hash))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
};

// Correct admin credentials - manually calculated hash for "LRS@Ravi"
const ADMIN_CREDENTIALS = {
  username: 'raviteja',
  passwordHash: 'bbb26831ef0e6db6e5980e64f551fc93cfe3539febdacad8f068956bcaf1ff9c' // LRS@Ravi
};

export const verifyAdminCredentials = async (username: string, password: string): Promise<boolean> => {
  console.log('Verifying credentials for username:', username);
  const hashedInput = await hashPassword(password);
  console.log('Input password hash:', hashedInput);
  console.log('Expected hash:', ADMIN_CREDENTIALS.passwordHash);
  const isValid = username === ADMIN_CREDENTIALS.username && hashedInput === ADMIN_CREDENTIALS.passwordHash;
  console.log('Credentials valid:', isValid);
  return isValid;
};
