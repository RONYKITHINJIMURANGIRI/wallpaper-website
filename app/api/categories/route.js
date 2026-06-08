import { NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { withAdminAuth } from '@/lib/middleware';
import { verifyToken } from '@/lib/auth';
import { slugify, error, success } from '@/lib/utils';

function getToken(request) {
  const authHeader = request.headers.get('authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }
  return authHeader.substring(7);
}

export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      include: {
        _count: {
          select: { wallpapers: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
    
    const categoriesWithCount = categories.map(cat => ({
      ...cat,
      wallpaperCount: cat._count.wallpapers,
    }));
    
    return success(categoriesWithCount, 'Categories retrieved successfully');
  } catch (err) {
    console.error('Get categories error:', err);
    return error('Failed to retrieve categories', 500);
  }
}

export async function POST(request) {
  try {
    const token = getToken(request);
    
    if (!token) {
      return error('Unauthorized - No token provided', 401);
    }
    
    const decoded = verifyToken(token);
    if (!decoded || decoded.role !== 'ADMIN') {
      return error('Unauthorized - Admin access required', 403);
    }
    
    const { name, description } = await request.json();
    
    if (!name || name.trim().length === 0) {
      return error('Category name is required', 400);
    }
    
    const slug = slugify(name);
    
    // Check if category already exists
    const existingCategory = await prisma.category.findUnique({
      where: { slug },
    });
    
    if (existingCategory) {
      return error('Category with this name already exists', 409);
    }
    
    // Create category
    const category = await prisma.category.create({
      data: {
        name,
        description: description || null,
        slug,
      },
    });
    
    return success(category, 'Category created successfully', 201);
  } catch (err) {
    console.error('Create category error:', err);
    return error('Failed to create category', 500);
  }
}


