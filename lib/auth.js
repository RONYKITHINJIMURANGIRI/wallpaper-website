import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { headers } from 'next/headers';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const JWT_EXPIRATION = parseInt(process.env.JWT_EXPIRATION || '86400');

// Hash password
export async function hashPassword(password) {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

// Compare password
export async function comparePassword(password, hashedPassword) {
  return bcrypt.compare(password, hashedPassword);
}

// Create JWT token
export function createToken(userId, role = 'USER') {
  return jwt.sign(
    { userId, role, iat: Math.floor(Date.now() / 1000) },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRATION }
  );
}

// Verify JWT token
export function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
}

// Get token from request
export function getTokenFromRequest() {
  const headersList = headers();
  const authorization = headersList.get('authorization');
  
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return null;
  }
  
  return authorization.substring(7);
}

// Validate admin access
export async function validateAdminAccess(token) {
  if (!token) return null;
  
  const decoded = verifyToken(token);
  if (!decoded || decoded.role !== 'ADMIN') {
    return null;
  }
  
  return decoded;
}

// Generate password reset token
export function generateResetToken() {
  return jwt.sign(
    { reset: true, iat: Math.floor(Date.now() / 1000) },
    JWT_SECRET,
    { expiresIn: '1h' }
  );
}

// Extract user IP
export function getUserIp() {
  const headersList = headers();
  return headersList.get('x-forwarded-for') || headersList.get('x-real-ip') || 'unknown';
}
