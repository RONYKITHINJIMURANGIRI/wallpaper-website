# 📸 Wallpaper CMS - Admin Dashboard

A complete Content Management System for managing wallpapers on your website. Upload, organize, and manage wallpapers entirely through the dashboard without editing code.

## ✨ Features (Phase 1)

### ✅ Admin Authentication
- Secure login system with JWT tokens
- Rate limiting on login attempts
- Password hashing with bcryptjs
- Session management

### ✅ Wallpaper Management
- **Upload wallpapers** with drag-and-drop interface
- **Automatic image optimization:**
  - Automatic compression to WebP format
  - Thumbnail generation (300x300)
  - Metadata extraction (width, height, file size)
- **Add tags** for search and filtering
- **Assign categories** to wallpapers
- **Track metrics:** views and downloads
- **Edit wallpaper details** after upload
- **Delete wallpapers** with confirmation
- **Gallery view** of all wallpapers
- **Search and filter** by category

### ✅ Category Management
- Create new categories
- Edit category names and descriptions
- Delete categories (with wallpaper count validation)
- Display wallpaper count per category
- Real-time category availability in upload form

## 🚀 Quick Setup

### Prerequisites
- Node.js 18+ and npm
- PostgreSQL database (local or cloud)

### Step 1: Configure Database

Update `.env.local` with your PostgreSQL connection:

```bash
DATABASE_URL="postgresql://username:password@localhost:5432/wallpaper_cms"
```

### Step 2: Initialize Database

```bash
# Generate Prisma client
npm run prisma:generate

# Push schema to database
npm run db:push

# Seed default admin user and categories
npm run db:seed
```

### Step 3: Start Development Server

```bash
npm run dev
```

Visit `http://localhost:3000/login` and log in with:
- **Email:** admin@example.com
- **Password:** admin123

⚠️ **Change these credentials immediately in production!**

## 📁 Project Structure

```
app/
├── api/
│   ├── auth/
│   │   ├── login/route.js          # User authentication
│   │   └── register/route.js       # User registration
│   ├── wallpapers/
│   │   ├── route.js                # Upload & list wallpapers
│   │   └── [id]/route.js           # Get, update, delete wallpaper
│   ├── categories/
│   │   ├── route.js                # Create & list categories
│   │   └── [id]/route.js           # Update & delete category
│   └── users/route.js              # User management (Phase 2)
│
├── admin/
│   ├── layout.jsx                  # Admin dashboard layout
│   ├── page.jsx                    # Dashboard home
│   ├── upload/page.jsx             # Upload wallpaper form
│   ├── wallpapers/page.jsx         # Wallpaper gallery
│   └── categories/page.jsx         # Category management
│
├── login/page.jsx                  # Admin login page
└── register/page.jsx               # User registration (Phase 2)

lib/
├── db.js                           # Prisma client
├── auth.js                         # JWT & password utilities
├── image.js                        # Image processing (Sharp)
├── middleware.js                   # Auth & rate limiting
└── utils.js                        # Helper functions

prisma/
├── schema.prisma                   # Database schema
└── seed.js                         # Database seeding

public/uploads/                     # Image storage
├── originals/                      # Original images
├── compressed/                     # Compressed WebP versions
└── thumbnails/                     # Thumbnail previews
```

## 🔐 Security Features

- ✅ Password hashing with bcryptjs (salt rounds: 10)
- ✅ JWT token-based authentication (24-hour expiration)
- ✅ Admin-only access to upload and management endpoints
- ✅ Rate limiting on login (5 attempts per 15 minutes)
- ✅ File type and size validation
- ✅ CSRF protection ready (Next.js built-in)
- ✅ Audit logging for admin actions
- ✅ SQL injection prevention (Prisma parameterized queries)

## 📊 Database Schema

### Users Table
- Stores user accounts with secure password hashing
- Tracks user roles (ADMIN, USER, MODERATOR)
- Account status (ACTIVE, SUSPENDED, REQUIRES_PASSWORD_CHANGE)

### Wallpapers Table
- Wallpaper metadata (title, description, paths)
- Image dimensions and file size
- Tracks views and downloads
- Featured and published flags

### Categories Table
- Wallpaper categories
- Slug-based URLs for categories
- One-to-many relationship with wallpapers

### Tags Table
- Search tags for wallpapers
- Many-to-many relationship with wallpapers

### Audit Logs Table
- Tracks all admin actions
- IP address logging
- Change history for compliance

## 🎨 Upload Workflow

1. **Select Image**
   - Drag & drop or click to select
   - Supports JPEG, PNG, WebP
   - Max 10MB file size

2. **Image Processing**
   - Original image saved to `/uploads/originals/`
   - Compressed WebP version (2560x1440, 80% quality)
   - Thumbnail generated (300x300, 75% quality)

3. **Metadata Extraction**
   - Image dimensions (width, height)
   - File size stored for reference
   - Creation timestamp

4. **Database Entry**
   - Wallpaper record created
   - Tags created or linked
   - Category assignment
   - Audit log entry

## 🔄 Image Storage Architecture

Designed for easy migration to cloud storage:

```
/public/uploads/
├── originals/      # Original uploaded files
│   └── {timestamp}-{random}.jpg
├── compressed/     # Optimized versions for display
│   └── {timestamp}-{random}.webp
└── thumbnails/     # Thumbnails for galleries
    └── {timestamp}-{random}-thumb.webp
```

**Database stores:** Only file paths (relative URLs)
**Future migration:** Update `processImage()` in `lib/image.js` to use Cloudinary/AWS S3

## 🛠️ API Endpoints

### Authentication
- `POST /api/auth/login` - Admin login
- `POST /api/auth/register` - Register new user

### Wallpapers
- `GET /api/wallpapers` - List all wallpapers (with pagination)
- `POST /api/wallpapers` - Upload new wallpaper (admin only)
- `GET /api/wallpapers/[id]` - Get wallpaper details
- `PUT /api/wallpapers/[id]` - Update wallpaper (admin only)
- `DELETE /api/wallpapers/[id]` - Delete wallpaper (admin only)

### Categories
- `GET /api/categories` - List all categories
- `POST /api/categories` - Create category (admin only)
- `PUT /api/categories/[id]` - Update category (admin only)
- `DELETE /api/categories/[id]` - Delete category (admin only)

## 🚀 Phase 2 Features (Coming)

- [ ] Email password reset functionality
- [ ] Admin users management panel
- [ ] Bulk upload support
- [ ] Advanced search and filtering
- [ ] Wallpaper approval workflow
- [ ] Audit log viewer
- [ ] Backup and restore functionality
- [ ] User role management
- [ ] Analytics dashboard
- [ ] Two-factor authentication

## 🐛 Troubleshooting

### "Database connection failed"
- Check `.env.local` DATABASE_URL
- Ensure PostgreSQL is running
- Verify database exists

### "Images not uploading"
- Check `/public/uploads/` directory exists and is writable
- Verify file permissions: `chmod 755 public/uploads/`
- Check file size doesn't exceed 10MB

### "Login not working"
- Run `npm run db:seed` to create admin user
- Verify token in browser localStorage
- Check browser console for JWT errors

### "Sharp/Image processing errors"
- Reinstall dependencies: `npm install`
- Check Node.js version (18+ required)
- Ensure all optional dependencies installed

## 📝 Environment Variables

```env
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/wallpaper_cms

# JWT
JWT_SECRET=your-super-secret-jwt-key-change-in-production
JWT_EXPIRATION=86400

# Email (Phase 2)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-specific-password

# Upload
MAX_FILE_SIZE=10485760
ALLOWED_IMAGE_TYPES=image/jpeg,image/png,image/webp

# Admin Credentials (Change in production!)
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=admin123
```

## 💾 Database Migrations

To create migrations after schema changes:

```bash
# Create migration file
npx prisma migrate dev --name add_new_feature

# Push to database
npm run db:push

# Reset database (WARNING: Loses all data)
npm run db:reset
```

## 📦 Dependencies

- **next**: 16.2.6 - React framework
- **react**: 19.2.6 - UI library
- **@prisma/client**: 5.0.0 - Database ORM
- **sharp**: 0.33.0 - Image processing
- **bcryptjs**: 2.4.3 - Password hashing
- **jsonwebtoken**: 9.0.0 - JWT authentication
- **tailwindcss**: 4.3.0 - CSS framework
- **nodemailer**: 6.9.0 - Email sending

## 🔒 Best Practices

1. **Change default credentials immediately**
   - Update ADMIN_PASSWORD in production
   - Use strong, unique passwords

2. **Secure environment variables**
   - Never commit `.env.local` to git
   - Use production secrets management

3. **Regular backups**
   - Backup PostgreSQL database regularly
   - Archive uploaded images

4. **Monitor uploads**
   - Set disk space quotas
   - Regular cleanup of unused images

5. **Update dependencies**
   - Keep npm packages updated
   - Security patches monthly

## 📞 Support

For issues or questions:
1. Check troubleshooting section above
2. Review API endpoint documentation
3. Check browser console for errors
4. Verify database connectivity

## 📄 License

This project is part of the Wallpaper Website CMS system.

---

**Happy uploading! 🎉**
