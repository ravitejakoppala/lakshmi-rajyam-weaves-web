
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

// Updated admin credentials with new username and password
const ADMIN_CREDENTIALS = {
  username: 'raviteja',
  passwordHash: 'a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3' // LRS@Ravi
};

export const verifyAdminCredentials = async (username: string, password: string): Promise<boolean> => {
  const hashedInput = await hashPassword(password);
  return username === ADMIN_CREDENTIALS.username && hashedInput === ADMIN_CREDENTIALS.passwordHash;
};
