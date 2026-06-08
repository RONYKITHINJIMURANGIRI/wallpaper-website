import { NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { verifyToken } from '@/lib/auth';
import { processImage, ensureUploadDirs } from '@/lib/image';
import { slugify, error, success } from '@/lib/utils';

function getToken(request) {
  const authHeader = request.headers.get('authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }
  return authHeader.substring(7);
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
    
    const formData = await request.formData();
    const file = formData.get('image');
    const title = formData.get('title');
    const description = formData.get('description');
    const categoryId = formData.get('categoryId');
    const tagsString = formData.get('tags');
    
    // Validate input
    if (!file) {
      return error('Image file is required', 400);
    }
    
    if (!title || title.trim().length === 0) {
      return error('Title is required', 400);
    }
    
    if (!categoryId) {
      return error('Category is required', 400);
    }
    
    // Check file type and size
    if (!file.type.startsWith('image/')) {
      return error('File must be an image', 400);
    }
    
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      return error('File size exceeds 10MB limit', 400);
    }
    
    // Verify category exists
    const category = await prisma.category.findUnique({
      where: { id: categoryId },
    });
    
    if (!category) {
      return error('Category not found', 404);
    }
    
    // Ensure upload directories exist
    await ensureUploadDirs();
    
    // Convert file to buffer
    const buffer = Buffer.from(await file.arrayBuffer());
    
    // Process image
    const imageData = await processImage(buffer, file.name);
    
    // Parse tags
    let tags = [];
    if (tagsString) {
      tags = tagsString.split(',').map(t => t.trim()).filter(t => t.length > 0);
    }
    
    // Create wallpaper
    const wallpaper = await prisma.wallpaper.create({
      data: {
        title: title.trim(),
        description: description?.trim() || null,
        originalImage: imageData.originalPath,
        compressedImage: imageData.compressedPath,
        thumbnail: imageData.thumbnailPath,
        width: imageData.width,
        height: imageData.height,
        fileSize: imageData.fileSize,
        categoryId,
        tags: {
          connectOrCreate: tags.map(tag => ({
            where: { slug: slugify(tag) },
            create: {
              name: tag,
              slug: slugify(tag),
            },
          })),
        },
      },
      include: {
        category: true,
        tags: true,
      },
    });
    
    // Log action
    await prisma.auditLog.create({
      data: {
        action: 'WALLPAPER_CREATED',
        entity: 'wallpaper',
        entityId: wallpaper.id,
        userId: decoded.userId,
        changes: JSON.stringify({ title, categoryId }),
      },
    });
    
    return success(wallpaper, 'Wallpaper uploaded successfully', 201);
  } catch (err) {
    console.error('Upload error:', err);
    return error('Failed to upload wallpaper: ' + err.message, 500);
  }
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const categoryId = searchParams.get('categoryId');
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = parseInt(searchParams.get('limit')) || 12;
    const skip = (page - 1) * limit;
    
    const where = { published: true };
    if (categoryId) {
      where.categoryId = categoryId;
    }
    
    const [wallpapers, total] = await Promise.all([
      prisma.wallpaper.findMany({
        where,
        include: {
          category: true,
          tags: true,
        },
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.wallpaper.count({ where }),
    ]);
    
    return success(
      {
        data: wallpapers,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit),
        },
      },
      'Wallpapers retrieved successfully'
    );
  } catch (err) {
    console.error('Get wallpapers error:', err);
    return error('Failed to retrieve wallpapers', 500);
  }
}


