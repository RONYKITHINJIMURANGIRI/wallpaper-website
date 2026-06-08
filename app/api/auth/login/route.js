import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { comparePassword, createToken, getUserIp } from '@/lib/auth';
import { checkRateLimit } from '@/lib/middleware';
import { isValidEmail, error, success } from '@/lib/utils';

export async function POST(request) {
  try {
    const { email, password } = await request.json();
    
    // Validate input
    if (!email || !password) {
      return error('Email and password are required', 400);
    }
    
    if (!isValidEmail(email)) {
      return error('Invalid email format', 400);
    }
    
    // Rate limiting
    const ip = getUserIp();
    if (!checkRateLimit(`login:${email}`, 5, 15 * 60 * 1000)) {
      return error('Too many login attempts. Please try again later.', 429);
    }
    
    // Find user
    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });
    
    if (!user) {
      // Log failed attempt
      await prisma.loginAttempt.create({
        data: {
          email: email.toLowerCase(),
          success: false,
          ipAddress: ip,
        },
      });
      
      return error('Invalid email or password', 401);
    }
    
    // Check if account is suspended
    if (user.status === 'SUSPENDED') {
      return error('Your account has been suspended. Contact support.', 403);
    }
    
    // Verify password
    const isPasswordValid = await comparePassword(password, user.password);
    
    if (!isPasswordValid) {
      // Log failed attempt
      await prisma.loginAttempt.create({
        data: {
          email: email.toLowerCase(),
          success: false,
          ipAddress: ip,
          userId: user.id,
        },
      });
      
      return error('Invalid email or password', 401);
    }
    
    // Log successful login
    await prisma.loginAttempt.create({
      data: {
        email: email.toLowerCase(),
        success: true,
        ipAddress: ip,
        userId: user.id,
      },
    });
    
    // Update last login
    await prisma.user.update({
      where: { id: user.id },
      data: { lastLogin: new Date() },
    });
    
    // Create token
    const token = createToken(user.id, user.role);
    
    return success(
      {
        token,
        user: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role,
        },
      },
      'Login successful',
      200
    );
  } catch (err) {
    console.error('Login error:', err);
    return error('An error occurred during login', 500);
  }
}


