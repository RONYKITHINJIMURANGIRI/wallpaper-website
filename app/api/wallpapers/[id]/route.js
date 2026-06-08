import { NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { verifyToken } from '@/lib/auth';
import { deleteImage, ensureUploadDirs } from '@/lib/image';
import { slugify, error, success } from '@/lib/utils';
import { promises as fs } from 'fs';
import path from 'path';

function getToken(request) {
  const authHeader = request.headers.get('authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }
  return authHeader.substring(7);
}

export async function GET(request, { params }) {
  try {
    const { id } = params;
    
    const wallpaper = await prisma.wallpaper.findUnique({
      where: { id },
      include: {
        category: true,
        tags: true,
      },
    });
    
    if (!wallpaper) {
      return error('Wallpaper not found', 404);
    }
    
    // Increment views
    await prisma.wallpaper.update({
      where: { id },
      data: { views: { increment: 1 } },
    });
    
    return success(wallpaper, 'Wallpaper retrieved successfully');
  } catch (err) {
    console.error('Get wallpaper error:', err);
    return error('Failed to retrieve wallpaper', 500);
  }
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
    
    const { id } = params;
    const { title, description, categoryId, tags, featured, published } = await request.json();
    
    // Find wallpaper
    const wallpaper = await prisma.wallpaper.findUnique({
      where: { id },
    });
    
    if (!wallpaper) {
      return error('Wallpaper not found', 404);
    }
    
    const updateData = {};
    
    if (title) updateData.title = title;
    if (description !== undefined) updateData.description = description;
    if (categoryId) updateData.categoryId = categoryId;
    if (featured !== undefined) updateData.featured = featured;
    if (published !== undefined) updateData.published = published;
    
    // Handle tags
    if (tags && Array.isArray(tags)) {
      const formattedTags = tags.map(tag => ({
        where: { slug: slugify(tag) },
        create: {
          name: tag,
          slug: slugify(tag),
        },
      }));
      
      // Remove existing tags and add new ones
      await prisma.wallpaper.update({
        where: { id },
        data: {
          tags: {
            set: [], // Remove all current tags
          },
        },
      });
      
      updateData.tags = {
        connectOrCreate: formattedTags,
      };
    }
    
    // Update wallpaper
    const updated = await prisma.wallpaper.update({
      where: { id },
      data: updateData,
      include: {
        category: true,
        tags: true,
      },
    });
    
    // Log action
    await prisma.auditLog.create({
      data: {
        action: 'WALLPAPER_UPDATED',
        entity: 'wallpaper',
        entityId: id,
        userId: decoded.userId,
        changes: JSON.stringify(updateData),
      },
    });
    
    return success(updated, 'Wallpaper updated successfully');
  } catch (err) {
    console.error('Update wallpaper error:', err);
    return error('Failed to update wallpaper: ' + err.message, 500);
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
    
    // Find wallpaper
    const wallpaper = await prisma.wallpaper.findUnique({
      where: { id },
    });
    
    if (!wallpaper) {
      return error('Wallpaper not found', 404);
    }
    
    // Delete image files from disk
    try {
      const uploadDir = path.join(process.cwd(), 'public/uploads');
      
      // Extract filenames from paths
      const deleteFile = async (filePath) => {
        try {
          const fullPath = path.join(process.cwd(), 'public', filePath);
          await fs.unlink(fullPath);
        } catch (e) {
          // File might not exist
        }
      };
      
      await Promise.all([
        deleteFile(wallpaper.originalImage),
        deleteFile(wallpaper.compressedImage),
        deleteFile(wallpaper.thumbnail),
      ]);
    } catch (fileErr) {
      console.error('Error deleting image files:', fileErr);
      // Continue with database deletion even if file deletion fails
    }
    
    // Delete from database
    await prisma.wallpaper.delete({
      where: { id },
    });
    
    // Log action
    await prisma.auditLog.create({
      data: {
        action: 'WALLPAPER_DELETED',
        entity: 'wallpaper',
        entityId: id,
        userId: decoded.userId,
        changes: JSON.stringify({ title: wallpaper.title }),
      },
    });
    
    return success(null, 'Wallpaper deleted successfully');
  } catch (err) {
    console.error('Delete wallpaper error:', err);
    return error('Failed to delete wallpaper', 500);
  }
}
