# Vercel Deployment Guide

Complete step-by-step instructions to deploy the Wallpaper CMS to Vercel.

---

## Prerequisites

- Vercel account (free tier available at https://vercel.com)
- GitHub account with repository access
- PostgreSQL database (use Vercel Postgres or external service)
- Gmail account for email notifications (optional, for password reset)

---

## Step 1: Set Up PostgreSQL Database

### Option A: Vercel Postgres (Recommended)

1. Go to https://vercel.com/dashboard
2. Select your project → **Storage** tab → **Create → Postgres**
3. Follow the setup wizard and accept default settings
4. Copy the connection string from the setup confirmation
5. Save this `DATABASE_URL` for Step 3

### Option B: External PostgreSQL (Supabase, Railway, etc.)

1. Create a PostgreSQL database on your provider
2. Get the connection string (format: `postgresql://user:password@host:port/database`)
3. Save this `DATABASE_URL` for Step 3

---

## Step 2: Generate Secure Keys

Generate strong random values for production (run these commands locally):

```bash
# Generate JWT_SECRET (copy the output)
node -e "console.log('JWT_SECRET=' + require('crypto').randomBytes(32).toString('hex'))"

# Generate NEXTAUTH_SECRET (copy the output)
node -e "console.log('NEXTAUTH_SECRET=' + require('crypto').randomBytes(32).toString('hex'))"
```

Save these values for Step 3.

---

## Step 3: Push to GitHub

1. Commit all changes:
   ```bash
   git add .
   git commit -m "chore: prepare for Vercel deployment

   - Add Vercel Blob integration for image storage
   - Update environment variable documentation
   - Create deployment guide
   
   Deployment checklist:
   - [ ] PostgreSQL database configured
   - [ ] Environment variables set in Vercel
   - [ ] Test deployment in preview"
   ```

2. Push to your GitHub repository:
   ```bash
   git push origin main
   ```

---

## Step 4: Import Project to Vercel

1. Go to https://vercel.com/new
2. Click **Import Git Repository**
3. Select your repository (RONYKITHINJIMURANGIRI/wallpaper-website)
4. Click **Import**
5. Leave default settings for Next.js detection
6. Click **Deploy** (will fail - expected, we need env vars)

---

## Step 5: Configure Environment Variables in Vercel

1. After the failed deployment, go to **Settings → Environment Variables**
2. Add the following variables (values from Steps 1 & 2):

   | Variable | Value | Source |
   |----------|-------|--------|
   | `DATABASE_URL` | PostgreSQL connection string | Step 1 |
   | `JWT_SECRET` | 64-char hex string | Step 2 |
   | `NEXTAUTH_SECRET` | 64-char hex string | Step 2 |
   | `NEXTAUTH_URL` | `https://yourdomain.vercel.app` | Auto-generated |
   | `ADMIN_EMAIL` | Your admin email | Your choice |
   | `ADMIN_PASSWORD` | Strong password (change after login) | Your choice |
   | `SMTP_HOST` | `smtp.gmail.com` | Leave as-is |
   | `SMTP_PORT` | `587` | Leave as-is |
   | `SMTP_USER` | Your Gmail email | Your Gmail account |
   | `SMTP_PASS` | Gmail App Password | Generate at https://myaccount.google.com/apppasswords |
   | `SMTP_FROM` | Your Gmail email | Your Gmail account |
   | `MAX_FILE_SIZE` | `10485760` | Leave as-is (10MB) |
   | `ALLOWED_IMAGE_TYPES` | `image/jpeg,image/png,image/webp` | Leave as-is |

3. Click **Save** after each variable

---

## Step 6: Database Migration

1. In Vercel dashboard, go to **Settings → Integrations → Postgres**
2. Select your Postgres database and note the connection string
3. Locally, update `.env.local` with your Vercel Postgres connection string:
   ```
   DATABASE_URL="vercel_postgres_connection_string"
   ```

4. Run database migration:
   ```bash
   npm run db:push
   ```

5. Seed initial data:
   ```bash
   npm run db:seed
   ```

6. Verify tables were created in Vercel Postgres dashboard

---

## Step 7: Redeploy to Vercel

1. Go back to your Vercel deployment
2. Click **Deployments** tab
3. Find the failed deployment and click **Redeploy**
4. Vercel will rebuild with environment variables set
5. Wait for deployment to complete (should see ✓ success)

---

## Step 8: Test Your Deployment

1. Visit your deployed app: `https://yourdomain.vercel.app`
2. Test the following flows:

   **Admin Login:**
   - Navigate to `/login`
   - Enter credentials from ADMIN_EMAIL and ADMIN_PASSWORD
   - Should login successfully

   **Wallpaper Upload:**
   - Go to `/admin/upload`
   - Upload a test image
   - Should compress and store in Vercel Blob
   - Should appear in `/admin/wallpapers` gallery

   **Category Management:**
   - Go to `/admin/categories`
   - Create, edit, delete categories
   - Should reflect immediately in dropdowns

   **User Registration:**
   - Go to `/signup`
   - Create a test account
   - Should be stored in database

3. Check browser console for errors
4. Check Vercel deployment logs for warnings

---

## Image Storage (Vercel Blob)

All uploaded images are automatically stored in **Vercel Blob** CDN:

- ✅ Images persist across deployments (unlike local filesystem)
- ✅ Automatically optimized for speed
- ✅ Free tier includes generous storage
- ✅ Returns public URLs immediately
- ❌ Cannot browse files through filesystem

**Image locations:**
- Original: `wallpapers/originals/{timestamp-random}.*`
- Compressed: `wallpapers/compressed/{timestamp-random}.webp`
- Thumbnail: `wallpapers/thumbnails/{timestamp-random}-thumb.webp`

All files are publicly accessible via CDN URLs.

---

## Troubleshooting

### "Module not found" errors after deployment
- Check all environment variables are set in Vercel dashboard
- Verify `DATABASE_URL` is correct
- Check Prisma client was generated: `npm run prisma:generate`

### Images not showing up
- Check Vercel Blob is connected in Storage tab
- Verify `@vercel/blob` is in package.json dependencies
- Check browser console for broken image URLs

### Database connection errors
- Verify `DATABASE_URL` format is correct
- Check PostgreSQL is accessible from Vercel (not behind firewall)
- Test connection locally with `.env.local` using same DATABASE_URL

### "Database doesn't exist" error
- Run `npm run db:push` locally to create tables
- Or run migration through Vercel Postgres console

### Email not sending
- Verify Gmail App Password (not regular Gmail password)
- Check 2-Step Verification is enabled on Gmail account
- Verify SMTP_USER matches Gmail account email
- Check email configuration in `.env.local` before pushing

---

## Post-Deployment

### Change Admin Credentials
1. Login at `/login` with ADMIN_EMAIL and ADMIN_PASSWORD
2. Open browser DevTools → Storage → Cookies
3. Note your auth token
4. Go to `/admin` dashboard
5. Navigate to User Management (if available)
6. Change your password

### Set Custom Domain
1. Go to Vercel dashboard → **Domains**
2. Add your custom domain
3. Follow DNS configuration instructions
4. Update `NEXTAUTH_URL` in Environment Variables to your domain

### Monitor Performance
1. Go to Vercel dashboard → **Analytics**
2. Check function execution times
3. Monitor database query performance
4. Check Blob storage usage

### Backup Database
1. Enable automatic backups in Vercel Postgres settings
2. Or export data regularly to CSV

---

## Environment Variables Reference

All variables used in production:

```
# Database (REQUIRED)
DATABASE_URL=postgresql://...

# Authentication (REQUIRED - use production values)
JWT_SECRET=...
NEXTAUTH_SECRET=...
NEXTAUTH_URL=https://yourdomain.vercel.app

# Admin Account (REQUIRED - change after first login)
ADMIN_EMAIL=admin@yoursite.com
ADMIN_PASSWORD=strong-password-here

# Email Notifications (OPTIONAL but recommended)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-gmail-app-password
SMTP_FROM=your-email@gmail.com

# File Upload (OPTIONAL - defaults below)
MAX_FILE_SIZE=10485760
ALLOWED_IMAGE_TYPES=image/jpeg,image/png,image/webp

# Image Storage (NO SETUP NEEDED - Vercel Blob auto-configured)
# @vercel/blob is automatically available in Vercel environment
```

---

## API Endpoints

Once deployed, your APIs are available at:

- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `GET/POST /api/wallpapers` - Get/upload wallpapers
- `GET/PUT/DELETE /api/wallpapers/[id]` - Manage specific wallpaper
- `GET/POST /api/categories` - Get/create categories
- `GET/PUT/DELETE /api/categories/[id]` - Manage specific category

All endpoints require JWT authentication (except login/register).

---

## Support & Debugging

**Useful commands:**
```bash
# Check build locally
npm run build

# Check TypeScript errors
npx tsc --noEmit

# View Vercel logs
vercel logs

# Test database connection
npm run db:push --dry-run

# Generate Prisma client
npm run prisma:generate
```

**Helpful resources:**
- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Vercel Postgres](https://vercel.com/storage/postgres)
- [Vercel Blob Storage](https://vercel.com/storage/blob)
- [Prisma Deployment](https://www.prisma.io/docs/orm/prisma-client/deployment)

---

## Rollback & Emergency

If deployment fails:

1. Check Vercel dashboard logs
2. Revert last commit: `git revert HEAD`
3. Push revert: `git push origin main`
4. Vercel auto-redeploys previous working version

Database migrations are reversible:
```bash
# Rollback database changes
npm run db:reset  # WARNING: drops all data
```

---

Last updated: 2024
Deployment template for Next.js 16 + Prisma + Vercel Blob
