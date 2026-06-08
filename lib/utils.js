import { NextResponse } from 'next/server';

export function formatDownloads(count) {
  if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`;
  if (count >= 1000) return `${(count / 1000).toFixed(1)}K`;
  return count.toString();
}

export function formatResolution(label) {
  switch (label) {
    case 'HD': return '1080p HD';
    case '4K': return '4K Ultra HD';
    case '8K': return '8K Super HD';
    default: return label;
  }
}

// Generate URL-friendly slug
export function slugify(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

// Format response
export function success(data, message = 'Success', statusCode = 200) {
  return NextResponse.json(
    { success: true, message, data },
    { status: statusCode }
  );
}

// Format error response
export function error(message, statusCode = 400, details = null) {
  return NextResponse.json(
    { success: false, message, ...(details && { details }) },
    { status: statusCode }
  );
}

// Validate email
export function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Truncate text
export function truncate(text, length = 100) {
  if (!text || text.length <= length) return text;
  return text.substring(0, length) + '...';
}

// Format file size
export function formatFileSize(bytes) {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}

// Format date
export function formatDate(date) {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

// Generate random string
export function generateRandomString(length = 32) {
  return Math.random().toString(36).substring(2, 2 + length);
}

// Extract filename from path
export function getFilenameFromPath(filePath) {
  return filePath.split('/').pop();
}

// Get file extension
export function getFileExtension(filename) {
  return filename.split('.').pop().toLowerCase();
}

// Paginate array
export function paginate(array, page = 1, pageSize = 10) {
  const totalPages = Math.ceil(array.length / pageSize);
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  
  return {
    data: array.slice(startIndex, endIndex),
    pagination: {
      page,
      pageSize,
      totalPages,
      total: array.length,
    },
  };
}

