# Admin Dashboard Setup Guide

This guide will help you set up the complete Admin Dashboard CMS system.

## Step 1: Install Dependencies ✅ (Already Done)

```bash
npm install
```

## Step 2: Set Up PostgreSQL Database

### Option A: Using Docker (Recommended)

```bash
# Install Docker if not already installed

# Run PostgreSQL container
docker run --name wallpaper-db \
  -e POSTGRES_USER=wallpaperuser \
  -e POSTGRES_PASSWORD=securepassword \
  -e POSTGRES_DB=wallpaper_cms \
  -p 5432:5432 \
  -v pgdata:/var/lib/postgresql/data \
  -d postgres:15
```

### Option B: Local PostgreSQL Installation

**Windows:**
- Download from: https://www.postgresql.org/download/windows/
- Run installer
- Note username, password, and port during installation
- Create new database: `wallpaper_cms`

**Mac:**
```bash
brew install postgresql@15
brew services start postgresql@15
createdb wallpaper_cms
```

**Linux:**
```bash
sudo apt-get install postgresql postgresql-contrib
sudo -u postgres createdb wallpaper_cms
```

## Step 3: Configure Environment Variables

1. Update `.env.local` with your database connection:

```bash
# For PostgreSQL on localhost with user 'wallpaperuser'
DATABASE_URL="postgresql://wallpaperuser:securepassword@localhost:5432/wallpaper_cms"

# Keep other settings as defaults or change JWT_SECRET
JWT_SECRET="your-super-secret-key-change-in-production"
```

2. **Important:** Never commit `.env.local` to git!

## Step 4: Initialize Database Schema

```bash
# Generate Prisma client
npm run prisma:generate

# Create tables and schema in database
npm run db:push
```

If you see errors:
- Check DATABASE_URL in .env.local
- Verify PostgreSQL is running
- Ensure database exists and is empty

## Step 5: Seed Default Data

```bash
npm run db:seed
```

This creates:
- ✅ Admin user (admin@example.com / admin123)
- ✅ Default categories (Nature, 4K, Abstract, Technology, Landscape)

## Step 6: Start Development Server

```bash
npm run dev
```

Visit: `http://localhost:3000/login`

### Demo Login Credentials:
- **Email:** admin@example.com
- **Password:** admin123

⚠️ **IMPORTANT: Change these credentials immediately in production!**

---

## Usage: How to Upload Wallpapers

### Step 1: Create Categories (Optional)
1. Go to Admin Dashboard → Categories
2. Click "Create Category"
3. Add name and description
4. Click "Create"

### Step 2: Upload Wallpaper
1. Go to Admin Dashboard → Upload Wallpaper
2. Drag & drop image or click to select
3. Enter wallpaper title
4. Select category
5. Add tags (optional)
6. Click "Upload Wallpaper"

### Step 3: Manage Wallpapers
1. Go to Admin Dashboard → All Wallpapers
2. View uploaded wallpapers
3. Filter by category
4. Edit or delete as needed

---

## File Structure Overview

```
/
├── app/
│   ├── api/                    # API endpoints
│   │   ├── auth/               # Login, register
│   │   ├── wallpapers/         # Upload, list, manage
│   │   └── categories/         # Category CRUD
│   └── admin/                  # Admin dashboard pages
│
├── lib/
│   ├── db.js                   # Database connection
│   ├── auth.js                 # JWT and passwords
│   ├── image.js                # Image processing
│   └── middleware.js           # Auth protection
│
├── prisma/
│   ├── schema.prisma           # Database structure
│   └── seed.js                 # Initial data
│
└── public/uploads/             # Uploaded images
    ├── originals/              # Original files
    ├── compressed/             # Optimized versions
    └── thumbnails/             # Previews
```

---

## Troubleshooting

### Database Connection Error
```
Error: connect ECONNREFUSED 127.0.0.1:5432
```
- PostgreSQL is not running
- Check SERVICE in Windows or `brew services list` on Mac
- Verify DATABASE_URL is correct

### Prisma Client Not Found
```
Cannot find module '.prisma/client'
```
Solution:
```bash
npm run prisma:generate
npm install
```

### Upload Directory Permissions
```
Error: EACCES: permission denied, open 'public/uploads'
```
Solution:
```bash
mkdir -p public/uploads/{originals,compressed,thumbnails}
chmod 755 public/uploads
```

### Port Already in Use
```
Error: listen EADDRINUSE :::3000
```
Solution:
```bash
# Find process using port 3000
lsof -i :3000

# Or start on different port
npm run dev -- -p 3001
```

---

## Next Steps: Phase 2 Features

Coming soon:
- 📧 Email password reset
- 👥 User management panel
- 📦 Bulk upload
- 🔍 Advanced search
- 📊 Analytics
- 🔐 Two-factor authentication

---

## Important Security Notes

### Before Going to Production:

1. **Change default admin password**
   - Login immediately with admin@example.com
   - Update password

2. **Secure JWT_SECRET**
   - Generate a strong random key
   - Update JWT_SECRET in .env.local
   - Never share with anyone

3. **Database security**
   - Use strong PostgreSQL password
   - Restrict database access to app server only
   - Enable SSL connections for remote databases
   - Regular backups

4. **File uploads**
   - Set disk space quotas
   - Implement virus scanning
   - Regular cleanup of old files

5. **Rate limiting**
   - Already implemented for login
   - Consider adding to upload endpoint

6. **HTTPS**
   - Always use HTTPS in production
   - Redirect HTTP to HTTPS

---

## Database Backup

### Backup PostgreSQL
```bash
# Create backup
pg_dump wallpaper_cms > backup.sql

# Restore from backup
psql wallpaper_cms < backup.sql
```

### Backup Uploaded Images
```bash
# Backup uploads directory
tar -czf wallpaper-uploads-backup.tar.gz public/uploads/
```

---

## Need Help?

1. Check `.env.local` configuration
2. Verify PostgreSQL is running
3. Check browser console for errors (F12)
4. Review server logs for API errors
5. Ensure all npm dependencies are installed

---

**Happy setup! 🚀**

For more details, see `ADMIN_DASHBOARD_README.md`
