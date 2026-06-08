# 🚀 Admin Dashboard - Getting Started in 5 Minutes

## Installation Complete! ✅

Your complete Admin Dashboard CMS has been built and is ready to use. Here's exactly what you need to do next.

---

## Step 1: Configure Database (2 minutes)

Edit `.env.local` and add your PostgreSQL connection:

```env
DATABASE_URL="postgresql://username:password@localhost:5432/wallpaper_cms"
```

**Don't have PostgreSQL?**
- Windows: Download from https://www.postgresql.org/download/windows/
- Mac: `brew install postgresql@15`
- Linux: `sudo apt-get install postgresql`
- Docker: `docker run -d -p 5432:5432 -e POSTGRES_PASSWORD=password postgres:15`

---

## Step 2: Initialize Database (2 minutes)

Run these commands in order:

```bash
# Generate Prisma client
npm run prisma:generate

# Create database schema
npm run db:push

# Seed default data (admin user + categories)
npm run db:seed
```

---

## Step 3: Start Development Server (1 minute)

```bash
npm run dev
```

Your server is now running at: **http://localhost:3000**

---

## Step 4: Login to Admin Dashboard

1. Open http://localhost:3000/login
2. Enter credentials:
   - **Email:** admin@example.com
   - **Password:** admin123
3. Welcome to your dashboard! 🎉

---

## What You Now Have

### ✅ Complete Admin Dashboard with:

- **Dashboard Home** - Overview and statistics
- **Upload Wallpaper** - Drag & drop with auto compression
- **Wallpaper Gallery** - View, edit, delete wallpapers
- **Category Manager** - Create and organize categories
- **Secure Login** - JWT authentication with rate limiting

### ✅ Automatic Features:

- 📸 Image compression to WebP
- 🎨 Thumbnail generation
- 🔍 Tag-based search
- 📊 View/download tracking
- 📝 Audit logging
- 🔐 Password hashing
- ⚡ Rate limiting

### ✅ Production Ready:

- PostgreSQL database with Prisma ORM
- API endpoints for all operations
- Responsive dark-themed UI
- Error handling and validation
- Security features (JWT, bcryptjs, CSRF ready)

---

## Quick Navigation

| What | URL |
|------|-----|
| Login | http://localhost:3000/login |
| Dashboard | http://localhost:3000/admin |
| Upload | http://localhost:3000/admin/upload |
| Wallpapers | http://localhost:3000/admin/wallpapers |
| Categories | http://localhost:3000/admin/categories |

---

## First Steps After Login

1. **Create Categories** (Optional)
   - Go to Categories page
   - Create: Nature, Technology, Abstract, Landscape, 4K
   - These appear in upload dropdown instantly

2. **Upload Your First Wallpaper**
   - Go to Upload page
   - Drag & drop an image
   - Fill in: Title, Category, Tags
   - Click "Upload Wallpaper"
   - See it appear in gallery instantly!

3. **Manage Your Wallpapers**
   - Go to Wallpapers page
   - View all uploads
   - Filter by category
   - Edit or delete as needed

---

## Documentation Files

Read these for more details:

1. **SETUP_GUIDE.md** - Detailed setup instructions with troubleshooting
2. **ADMIN_DASHBOARD_README.md** - Complete feature documentation
3. **QUICK_REFERENCE.md** - API endpoints and quick lookup
4. **IMPLEMENTATION_SUMMARY.md** - What was built and how it works

---

## Default Login

Until you change it:
- **Email:** admin@example.com  
- **Password:** admin123

⚠️ **Change this immediately in production!**

---

## Key Files Overview

```
Backend/Database:
├── prisma/schema.prisma      ← Database structure
├── app/api/auth/*            ← Login endpoints
├── app/api/wallpapers/*      ← Upload & manage
├── app/api/categories/*      ← Category CRUD
└── lib/                       ← Utilities (auth, images, db)

Frontend:
└── app/admin/                 ← Dashboard pages
    ├── page.jsx              ← Dashboard home
    ├── upload/page.jsx       ← Upload form
    ├── wallpapers/page.jsx   ← Gallery
    └── categories/page.jsx   ← Category manager

Configuration:
├── .env.local                ← Database connection
├── package.json              ← Dependencies
└── public/uploads/           ← Image storage
```

---

## Common Commands

```bash
# Development
npm run dev                    # Start dev server

# Database
npm run db:push              # Apply schema changes
npm run db:seed              # Create default data
npm run db:reset             # ⚠️ Wipe database (for testing)

# Production
npm run build                # Build for production
npm start                    # Run production server
```

---

## Troubleshooting

**"Database connection failed"**
- Check .env.local DATABASE_URL
- Is PostgreSQL running?

**"Cannot find module '.prisma/client'"**
```bash
npm run prisma:generate
npm install
```

**"Admin dashboard won't load"**
- Open browser console (F12)
- Check for errors
- Verify token in localStorage

**"Images not uploading"**
- Check `public/uploads/` directory exists
- Verify file size < 10MB
- Check browser console for errors

See **SETUP_GUIDE.md** for more troubleshooting.

---

## API Endpoints (For Reference)

### Public
```
GET /api/wallpapers              # List all wallpapers
GET /api/wallpapers/[id]         # Get wallpaper details
GET /api/categories              # List all categories
```

### Admin (Requires JWT token)
```
POST /api/wallpapers             # Upload wallpaper
PUT /api/wallpapers/[id]         # Edit wallpaper
DELETE /api/wallpapers/[id]      # Delete wallpaper

POST /api/categories             # Create category
PUT /api/categories/[id]         # Edit category
DELETE /api/categories/[id]      # Delete category

POST /api/auth/login             # Login
POST /api/auth/register          # Register user
```

---

## Next: Phase 2 Features

Coming soon (easy to add):
- 📧 Email password reset
- 👥 User management panel
- 📦 Bulk upload support
- 🎯 Advanced search/filtering
- 📊 Analytics dashboard
- 🔐 Two-factor authentication

---

## Important Security Notes

### Before Going Live:

1. **Change admin password**
   - Login and update your password

2. **Update JWT_SECRET**
   - Generate random string
   - Update .env.local
   - Never share!

3. **Use strong database password**
   - Not the default

4. **Enable HTTPS**
   - Always in production

5. **Regular backups**
   - PostgreSQL: `pg_dump wallpaper_cms > backup.sql`
   - Images: Archive `public/uploads/`

---

## File Storage Structure

Your uploaded images are organized as:

```
public/uploads/
├── originals/          # Original files (for archiving)
├── compressed/         # Optimized WebP (for web display)
└── thumbnails/         # Small previews (for gallery)
```

**Designed to migrate to cloud storage** (AWS S3, Cloudinary) without code changes.

---

## Tech Stack

- ⚙️ **Framework:** Next.js 16 + React 19
- 🗄️ **Database:** PostgreSQL + Prisma ORM
- 🔐 **Auth:** JWT + bcryptjs
- 🖼️ **Images:** Sharp.js
- 🎨 **UI:** Tailwind CSS
- 📧 **Email Ready:** Nodemailer (Phase 2)

---

## Still Need Help?

1. **Setup Issues?** → Read `SETUP_GUIDE.md`
2. **How to use?** → Read `ADMIN_DASHBOARD_README.md`
3. **Quick lookup?** → Check `QUICK_REFERENCE.md`
4. **What was built?** → See `IMPLEMENTATION_SUMMARY.md`
5. **Browser issues?** → Open DevTools (F12) and check console

---

## Let's Build Something Amazing! 🚀

Your complete CMS is ready to:
✅ Upload wallpapers  
✅ Organize by category  
✅ Add tags for search  
✅ Track views/downloads  
✅ Manage everything through the dashboard  

**No code editing required!** 

All management is done through the beautiful admin interface.

---

### Ready? Let's go!

```bash
npm run dev
```

Then visit: **http://localhost:3000/login**

Happy uploading! 📸✨

---

*Questions? Check the documentation files in the root directory.*
