import sharp from 'sharp';
import { put, del } from '@vercel/blob';

// Process uploaded image and store in Vercel Blob
export async function processImage(buffer, filename) {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(7);
  const baseName = `${timestamp}-${random}`;

  try {
    // Get image metadata
    const metadata = await sharp(buffer).metadata();

    // Generate compressed version (max 2560x1440, quality 80)
    const compressedBuffer = await sharp(buffer)
      .resize(2560, 1440, { fit: 'inside', withoutEnlargement: true })
      .webp({ quality: 80 })
      .toBuffer();

    // Generate thumbnail (300x300, quality 75)
    const thumbnailBuffer = await sharp(buffer)
      .resize(300, 300, { fit: 'cover' })
      .webp({ quality: 75 })
      .toBuffer();

    // Upload to Vercel Blob
    const [originalBlob, compressedBlob, thumbnailBlob] = await Promise.all([
      put(`wallpapers/originals/${baseName}${filename.substring(filename.lastIndexOf('.'))}`, buffer, { access: 'public' }),
      put(`wallpapers/compressed/${baseName}.webp`, compressedBuffer, { access: 'public' }),
      put(`wallpapers/thumbnails/${baseName}-thumb.webp`, thumbnailBuffer, { access: 'public' }),
    ]);

    return {
      originalPath: originalBlob.url,
      compressedPath: compressedBlob.url,
      thumbnailPath: thumbnailBlob.url,
      width: metadata.width,
      height: metadata.height,
      fileSize: buffer.length,
      baseName,
    };
  } catch (error) {
    console.error('Error processing image:', error);
    throw new Error('Failed to process image');
  }
}

// Delete image files from Vercel Blob
export async function deleteImage(baseName) {
  try {
    // Delete all variants
    await Promise.all([
      del(`wallpapers/originals/${baseName}*`).catch(() => {}),
      del(`wallpapers/compressed/${baseName}.webp`).catch(() => {}),
      del(`wallpapers/thumbnails/${baseName}-thumb.webp`).catch(() => {}),
    ]);
  } catch (error) {
    console.error('Error deleting images:', error);
  }
}

// Legacy function for compatibility
export async function ensureUploadDirs() {
  // No longer needed for Vercel Blob storage
}

// Validate image file
export function validateImageFile(file, maxSize = 10485760) {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
  
  if (!allowedTypes.includes(file.type)) {
    throw new Error('Invalid file type. Only JPEG, PNG, and WebP are allowed.');
  }
  
  if (file.size > maxSize) {
    throw new Error(`File size exceeds ${Math.round(maxSize / 1024 / 1024)}MB limit.`);
  }
  
  return true;
}

// Get unique filename
export function generateUniqueFilename(originalFilename) {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(7);
  const ext = path.extname(originalFilename);
  return `${timestamp}-${random}${ext}`;
}
