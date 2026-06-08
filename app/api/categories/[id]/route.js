import { NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { verifyToken } from '@/lib/auth';
import { slugify, error, success } from '@/lib/utils';

function getToken(request) {
  const authHeader = request.headers.get('authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }
  return authHeader.substring(7);
}

export async function PUT(request, { params }) {
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
    const { id } = params;
    
    if (!name || name.trim().length === 0) {
      return error('Category name is required', 400);
    }
    
    // Find category
    const category = await prisma.category.findUnique({
      where: { id },
    });
    
    if (!category) {
      return error('Category not found', 404);
    }
    
    const slug = slugify(name);
    
    // Check if new slug conflicts with another category
    if (slug !== category.slug) {
      const existingCategory = await prisma.category.findUnique({
        where: { slug },
      });
      
      if (existingCategory) {
        return error('Category with this name already exists', 409);
      }
    }
    
    // Update category
    const updated = await prisma.category.update({
      where: { id },
      data: {
        name,
        description: description || null,
        slug,
      },
    });
    
    return success(updated, 'Category updated successfully');
  } catch (err) {
    console.error('Update category error:', err);
    return error('Failed to update category', 500);
  }
}

export async function DELETE(request, { params }) {
  try {
    const token = getToken(request);
    
    if (!token) {
      return error('Unauthorized - No token provided', 401);
    }
    
    const decoded = verifyToken(token);
    if (!decoded || decoded.role !== 'ADMIN') {
      return error('Unauthorized - Admin access required', 403);
    }
    
    const { id } = params;
    
    // Find category
    const category = await prisma.category.findUnique({
      where: { id },
      include: { _count: { select: { wallpapers: true } } },
    });
    
    if (!category) {
      return error('Category not found', 404);
    }
    
    if (category._count.wallpapers > 0) {
      return error('Cannot delete category with wallpapers. Move or delete wallpapers first.', 400);
    }
    
    // Delete category
    await prisma.category.delete({
      where: { id },
    });
    
    return success(null, 'Category deleted successfully');
  } catch (err) {
    console.error('Delete category error:', err);
    return error('Failed to delete category', 500);
  }
}
