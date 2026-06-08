# Admin Dashboard - Quick Reference Card

## 🚀 Quick Start (After Setup)

```bash
# 1. Install dependencies
npm install

# 2. Configure database in .env.local
DATABASE_URL="postgresql://user:pass@localhost:5432/wallpaper_cms"

# 3. Initialize database
npm run prisma:generate
npm run db:push
npm run db:seed

# 4. Start development server
npm run dev

# 5. Open browser
open http://localhost:3000/login
```

## 👤 Default Login
- **Email:** admin@example.com
- **Password:** admin123

## 🗂️ Admin Dashboard Routes

| Page | URL | Function |
|------|-----|----------|
| Dashboard | `/admin` | Overview & stats |
| Upload | `/admin/upload` | Upload wallpapers |
| Wallpapers | `/admin/wallpapers` | View & manage gallery |
| Categories | `/admin/categories` | Manage categories |
| Login | `/login` | Admin login |

## 📝 Database Tables

### Users
- id, email, password, firstName, lastName
- role (ADMIN, USER, MODERATOR), status (ACTIVE, SUSPENDED, REQUIRES_PASSWORD_CHANGE)
- lastLogin, createdAt, updatedAt

### Wallpapers
- id, title, description
- originalImage, compressedImage, thumbnail
- width, height, fileSize
- downloads, views, featured, published
- categoryId, tags
- createdAt, updatedAt

### Categories
- id, name, description
- slug (URL-friendly name)
- createdAt, updatedAt

### Tags
- id, name, slug
- createdAt

### AuditLogs
- id, action, entity, entityId
- changes (JSON), userId, ipAddress
- createdAt

### PasswordResetToken
- id, token, email, expiresAt
- userId, createdAt

### LoginAttempt
- id, email, success, ipAddress, userId
- createdAt

## 🔗 API Endpoints

### Authentication
```
POST   /api/auth/login              # Login
POST   /api/auth/register           # Register
```

### Wallpapers
```
GET    /api/wallpapers              # List (with pagination)
POST   /api/wallpapers              # Upload (admin)
GET    /api/wallpapers/[id]         # Get details
PUT    /api/wallpapers/[id]         # Update (admin)
DELETE /api/wallpapers/[id]         # Delete (admin)
```

### Categories
```
GET    /api/categories              # List
POST   /api/categories              # Create (admin)
PUT    /api/categories/[id]         # Update (admin)
DELETE /api/categories/[id]         # Delete (admin)
```

## 📸 Image Upload Flow

```
1. User selects image (JPG, PNG, WebP)
2. File size validated (max 10MB)
3. Image processed:
   ✓ Original saved → /uploads/originals/
   ✓ Compressed WebP → /uploads/compressed/
   ✓ Thumbnail created → /uploads/thumbnails/
4. Metadata extracted (width, height, fileSize)
5. Database record created
6. Tags and category assigned
7. Audit log entry created
```

## 🔐 Security Features

| Feature | Implementation |
|---------|-----------------|
| Passwords | bcryptjs (10 salt rounds) |
| Authentication | JWT (24hr expiration) |
| Rate Limiting | 5 attempts per 15 mins |
| Admin Only | Role-based access control |
| File Validation | Type & size checking |
| SQL Injection | Prisma parameterized queries |
| Audit Logging | All admin actions tracked |

## 📁 File Locations

| Item | Path |
|------|------|
| Uploaded Images | `public/uploads/{originals,compressed,thumbnails}/` |
| Database Schema | `prisma/schema.prisma` |
| Seed Data | `prisma/seed.js` |
| Utilities | `lib/{db,auth,image,middleware,utils}.js` |
| API Routes | `app/api/{auth,wallpapers,categories}/` |
| Admin Pages | `app/admin/{page}.jsx` |

## 🔧 Common Commands

```bash
# Development
npm run dev              # Start dev server (port 3000)

# Database
npm run db:push         # Apply schema changes
npm run db:seed         # Create default data
npm run db:reset        # Reset database (WARNING: destructive)
npm run prisma:generate # Generate Prisma client

# Production
npm run build           # Build for production
npm start              # Start production server
npm run lint           # Run linter
```

## 🎨 UI/UX Features

- **Dark theme** - Easy on the eyes, modern design
- **Responsive** - Works on desktop, tablet, mobile
- **Drag & drop** - Upload by dragging images
- **Real-time feedback** - Success/error messages
- **Smooth animations** - Professional transitions
- **Loading states** - Clear progress indicators
- **Form validation** - Client & server side

## 📊 Image Processing

| Format | Purpose | Dimensions | Quality |
|--------|---------|-----------|---------|
| Original | Archive | As-is | 100% |
| Compressed | Display | 2560x1440 max | 80% |
| Thumbnail | Gallery | 300x300 | 75% |

## ⚙️ Environment Variables

```env
# Required
DATABASE_URL=postgresql://...

# Optional (has defaults)
JWT_SECRET=your-secret-key
JWT_EXPIRATION=86400
MAX_FILE_SIZE=10485760
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=admin123
```

## 🚨 Troubleshooting Checklist

- [ ] PostgreSQL running? Check with `psql -l`
- [ ] DATABASE_URL correct in .env.local?
- [ ] `npm run db:push` completed successfully?
- [ ] `npm run db:seed` created admin user?
- [ ] Dev server running? Visit `http://localhost:3000`
- [ ] Upload directory exists? `public/uploads/`
- [ ] Browser console clear of errors? (F12)

## 📈 Performance Notes

- Images compressed to WebP (smaller file sizes)
- Thumbnails cached for gallery views
- Pagination on wallpaper listing
- Database indexed for common queries
- JWT tokens stateless (no DB lookup on every request)

## 🔄 Upgrade Path

### To Add Cloud Storage (S3, Cloudinary):
1. Update `lib/image.js` - `processImage()` function
2. Upload to cloud instead of `/public/uploads/`
3. Store cloud URLs in database
4. No frontend changes needed

### To Add Email (Gmail SMTP):
1. Update `lib/email.js` with SMTP config
2. Create password reset routes
3. Send emails from API
4. Update frontend with reset form

---

**For detailed info, see ADMIN_DASHBOARD_README.md and SETUP_GUIDE.md**
