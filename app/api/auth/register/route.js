import { NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { hashPassword, createToken } from '@/lib/auth';
import { isValidEmail, error, success } from '@/lib/utils';

export async function POST(request) {
  try {
    const { email, password, firstName, lastName } = await request.json();
    
    // Validate input
    if (!email || !password) {
      return error('Email and password are required', 400);
    }
    
    if (!isValidEmail(email)) {
      return error('Invalid email format', 400);
    }
    
    if (password.length < 6) {
      return error('Password must be at least 6 characters long', 400);
    }
    
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });
    
    if (existingUser) {
      return error('Email already registered', 409);
    }
    
    // Hash password
    const hashedPassword = await hashPassword(password);
    
    // Create user
    const user = await prisma.user.create({
      data: {
        email: email.toLowerCase(),
        password: hashedPassword,
        firstName: firstName || null,
        lastName: lastName || null,
        role: 'USER',
        status: 'ACTIVE',
      },
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
      'Registration successful',
      201
    );
  } catch (err) {
    console.error('Registration error:', err);
    return error('An error occurred during registration', 500);
  }
}


