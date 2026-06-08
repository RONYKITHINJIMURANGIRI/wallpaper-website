import { NextResponse } from 'next/server';
import { verifyToken } from './auth';

// Extract token from request
function getToken(request) {
  const authHeader = request.headers.get('authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }
  return authHeader.substring(7);
}

// Middleware to verify authentication
export function withAuth(handler) {
  return async (request) => {
    const token = getToken(request);
    
    if (!token) {
      return NextResponse.json(
        { error: 'Unauthorized - No token provided' },
        { status: 401 }
      );
    }
    
    const decoded = verifyToken(token);
    if (!decoded) {
      return NextResponse.json(
        { error: 'Unauthorized - Invalid token' },
        { status: 401 }
      );
    }
    
    // Attach user info to request
    request.user = decoded;
    return handler(request);
  };
}

// Middleware to verify admin access
export function withAdminAuth(handler) {
  return async (request) => {
    const token = getToken(request);
    
    if (!token) {
      return NextResponse.json(
        { error: 'Unauthorized - No token provided' },
        { status: 401 }
      );
    }
    
    const decoded = verifyToken(token);
    if (!decoded) {
      return NextResponse.json(
        { error: 'Unauthorized - Invalid token' },
        { status: 401 }
      );
    }
    
    if (decoded.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Forbidden - Admin access required' },
        { status: 403 }
      );
    }
    
    request.user = decoded;
    return handler(request);
  };
}

// Rate limiting helper
const attemptCache = new Map();

export function checkRateLimit(key, maxAttempts = 5, windowMs = 15 * 60 * 1000) {
  const now = Date.now();
  const attempts = attemptCache.get(key) || [];
  
  // Remove old attempts
  const recentAttempts = attempts.filter(time => now - time < windowMs);
  
  if (recentAttempts.length >= maxAttempts) {
    return false;
  }
  
  recentAttempts.push(now);
  attemptCache.set(key, recentAttempts);
  return true;
}

// Clear rate limit cache periodically
setInterval(() => {
  const now = Date.now();
  for (const [key, attempts] of attemptCache.entries()) {
    const validAttempts = attempts.filter(time => now - time < 15 * 60 * 1000);
    if (validAttempts.length === 0) {
      attemptCache.delete(key);
    } else {
      attemptCache.set(key, validAttempts);
    }
  }
}, 60 * 1000); // Clean every minute

export default withAuth;
