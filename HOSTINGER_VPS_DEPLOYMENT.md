# 🚀 Hostinger VPS Deployment Guide

## Trust You Go — Travel Booking System (React + Express + MySQL)

This guide deploys the **Trust You Go** application on your existing Hostinger VPS alongside other apps.
- **Frontend**: React (Vite) — `https://github.com/MG4ACA/trust-you-go.git`
- **Backend**: Express.js + MySQL — `https://github.com/MG4ACA/trust-you-go-backend.git`
- **Domain**: `trustyou-go.com`
- **Deploy path**: `/var/www/trust-you-go/`

> ✅ Node.js, Nginx, PM2, Certbot, and MySQL are already installed on this VPS.

---

## 🎯 Architecture Overview

```
┌─────────────────────────────────────────────┐
│           Hostinger VPS Server              │
│                                             │
│  ┌──────────────────────────────────────┐   │
│  │   Nginx — trustyou-go.com (80/443)   │   │
│  └──────────────┬───────────────────────┘   │
│                 │                           │
│  ┌──────────────▼──────────┐  ┌──────────┐  │
│  │  React Frontend         │  │ Express  │  │
│  │  /var/www/trust-you-go/ │  │ Backend  │  │
│  │  frontend/ (static)     │  │ Port 3001│  │
│  └─────────────────────────┘  └────┬─────┘  │
│                                    │        │
│                           ┌────────▼──────┐ │
│                           │ MySQL         │ │
│                           │ trust_you_go  │ │
│                           └───────────────┘ │
└─────────────────────────────────────────────┘
```

> **Port 3001** is used for this app to avoid conflicting with other apps on this VPS already using port 3000.

---

## 📦 Step 1: Connect to Your VPS

```bash
ssh root@your_vps_ip
```

---

## 🗄️ Step 2: Set Up MySQL Database

```bash
sudo mysql -u root -p
```

```sql
-- Create database
CREATE DATABASE trust_you_go CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Create dedicated user
CREATE USER 'tyg_user'@'localhost' IDENTIFIED BY 'YourStrongPassword123!';

-- Grant privileges
GRANT ALL PRIVILEGES ON trust_you_go.* TO 'tyg_user'@'localhost';

FLUSH PRIVILEGES;
EXIT;
```

---

## 📥 Step 3: Clone Repositories

```bash
# Create the project root
sudo mkdir -p /var/www/trust-you-go
sudo chown -R $USER:$USER /var/www/trust-you-go
cd /var/www/trust-you-go

# Clone backend
git clone https://github.com/MG4ACA/trust-you-go-backend.git backend

# Clone frontend
git clone https://github.com/MG4ACA/trust-you-go.git frontend
```

Your directory structure will be:
```
/var/www/trust-you-go/
├── backend/      ← Express.js API
└── frontend/     ← React (Vite) source
```

---

## 🔨 Step 4: Set Up Backend

### 4.1 Install Dependencies

```bash
cd /var/www/trust-you-go/backend
npm install --production
```

### 4.2 Configure Environment Variables

```bash
nano .env
```

Paste and fill in your values:

```env
# ============================================
# Trust You Go — Backend Environment Variables
# ============================================

# Server
NODE_ENV=production
PORT=3001
API_PREFIX=/api

# Database
DB_HOST=localhost
DB_PORT=3306
DB_NAME=trust_you_go
DB_USER=tyg_user
DB_PASSWORD=YourStrongPassword123!

# JWT
JWT_SECRET=replace_with_64_char_random_string
JWT_EXPIRES_IN=1h

# Email (Hostinger SMTP — booking inquiries)
EMAIL_HOST=smtp.hostinger.com
EMAIL_PORT=465
EMAIL_SECURE=true
EMAIL_USER=info@trustyou-go.com
EMAIL_PASSWORD=your_hostinger_email_password
EMAIL_FROM=Trust You Go <info@trustyou-go.com>

# Recipient for booking inquiries from the booking form
CONTACT_RECIPIENT_EMAIL=hello@trustyou-go.com

# File Uploads
UPLOAD_DIR=./uploads
MAX_FILE_SIZE=5242880
ALLOWED_FILE_TYPES=image/jpeg,image/png,image/webp

# CORS — add both www and non-www
ALLOWED_ORIGINS=https://trustyou-go.com,https://www.trustyou-go.com

# Frontend URL (used in email links)
FRONTEND_URL=https://trustyou-go.com

# Swagger (disable in production if preferred)
SWAGGER_ENABLED=false

# Default Admin (change after first login!)
DEFAULT_ADMIN_EMAIL=admin@trustyou-go.com
DEFAULT_ADMIN_PASSWORD=Admin@2026
DEFAULT_ADMIN_NAME=System Administrator
DEFAULT_ADMIN_CONTACT=+94XXXXXXXXX
```

**Generate a secure JWT secret:**

```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

### 4.3 Initialize the Database

```bash
# Create tables
npm run db:create

# Run migrations
npm run db:migrate

# Seed initial data (admin user, etc.)
npm run db:seed
```

### 4.4 Set Up Persistent Uploads Directory

Uploaded files must survive `git pull` deployments. We symlink `backend/uploads` to a stable path outside the repo:

```bash
# Create the persistent uploads directory
sudo mkdir -p /var/uploads/trust-you-go
sudo chown -R $USER:$USER /var/uploads/trust-you-go

# Remove the default uploads folder from the cloned repo (if it exists)
rm -rf /var/www/trust-you-go/backend/uploads

# Create a symlink
ln -s /var/uploads/trust-you-go /var/www/trust-you-go/backend/uploads

# Verify
ls -la /var/www/trust-you-go/backend/uploads
```

### 4.5 Test Backend Locally

```bash
npm start

# In another terminal
curl http://localhost:3001/api/health
```

Press `Ctrl+C` to stop after verifying.

### 4.6 Start with PM2

```bash
cd /var/www/trust-you-go/backend

# Start the backend
pm2 start src/server.js --name trust-you-go-backend

# Save PM2 process list
pm2 save

# Ensure PM2 restarts on server reboot (run the output command it gives you)
pm2 startup
```

**Useful PM2 commands:**

```bash
pm2 status
pm2 logs trust-you-go-backend
pm2 restart trust-you-go-backend
pm2 stop trust-you-go-backend
pm2 monit
```

---

## 🎨 Step 5: Set Up Frontend

### 5.1 Install Dependencies and Configure

```bash
cd /var/www/trust-you-go/frontend

# Install all deps (including devDeps needed for build)
npm install

# Create production environment file
nano .env.production
```

```env
VITE_API_BASE_URL=https://trustyou-go.com/api
```

### 5.2 Build for Production

```bash
npm run build
```

This creates a `dist/` folder with optimised static files.

### 5.3 Copy Build to Nginx Serving Directory

```bash
# Create the directory Nginx will serve from
sudo mkdir -p /var/www/trust-you-go/public

# Copy the built files
sudo cp -r dist/* /var/www/trust-you-go/public/

# Set correct ownership
sudo chown -R www-data:www-data /var/www/trust-you-go/public
sudo chmod -R 755 /var/www/trust-you-go/public
```

---

## 🌐 Step 6: Configure Nginx

### 6.1 Create Site Configuration

```bash
sudo nano /etc/nginx/sites-available/trust-you-go
```

Paste this configuration:

```nginx
upstream tyg_backend {
    server localhost:3001;
    keepalive 64;
}

server {
    listen 80;
    server_name trustyou-go.com www.trustyou-go.com;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;

    # Frontend — serve React SPA
    location / {
        root /var/www/trust-you-go/public;
        index index.html;
        try_files $uri $uri/ /index.html;

        # Cache static assets aggressively
        location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot|webp)$ {
            expires 1y;
            add_header Cache-Control "public, immutable";
        }
    }

    # Backend API — proxy to Express.js
    location /api/ {
        proxy_pass http://tyg_backend/api/;
        proxy_http_version 1.1;

        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;

        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
        proxy_cache_bypass $http_upgrade;
    }

    # Serve uploaded files
    location /uploads/ {
        alias /var/uploads/trust-you-go/;
        expires 30d;
        add_header Cache-Control "public";
    }

    # Health check (no logs)
    location /api/health {
        proxy_pass http://tyg_backend/api/health;
        access_log off;
    }

    # Logs
    access_log /var/log/nginx/trust-you-go-access.log;
    error_log  /var/log/nginx/trust-you-go-error.log;
}
```

### 6.2 Enable the Site

```bash
# Create symbolic link (this does NOT remove other sites)
sudo ln -s /etc/nginx/sites-available/trust-you-go /etc/nginx/sites-enabled/

# Test the config — must say "test is successful"
sudo nginx -t

# Reload Nginx (zero downtime)
sudo systemctl reload nginx
```

---

## 🔒 Step 7: Set Up SSL with Certbot

> Ensure `trustyou-go.com` and `www.trustyou-go.com` DNS A records point to this VPS IP before running this.

```bash
sudo certbot --nginx -d trustyou-go.com -d www.trustyou-go.com
```

Certbot will automatically update the Nginx config with SSL and set up auto-renewal.

**Test auto-renewal:**

```bash
sudo certbot renew --dry-run
```

---

## ✅ Step 8: Verify Deployment

### 8.1 Check Backend

```bash
# PM2 status
pm2 status

# Backend logs
pm2 logs trust-you-go-backend --lines 50

# Direct API health check
curl http://localhost:3001/api/health
```

### 8.2 Check Nginx

```bash
sudo systemctl status nginx
sudo tail -f /var/log/nginx/trust-you-go-error.log
```

### 8.3 Test Contact/Booking Email

```bash
curl -X POST https://trustyou-go.com/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "message": "Test booking inquiry",
    "selected_package": "Cultural Heritage Tour",
    "checkin_date": "2026-04-10",
    "checkout_date": "2026-04-17",
    "number_of_guests": "2"
  }'
```

Expected: `{"success":true,"message":"..."}` and an email arrives at `hello@trustyou-go.com`.

### 8.4 Browser Test

Open `https://trustyou-go.com` — you should see the Travel Booking homepage.
Navigate to Booking and submit a test inquiry.

---

## 🔄 Step 9: Deployment Script (For Updates)

```bash
nano /var/www/trust-you-go/deploy.sh
```

```bash
#!/bin/bash
set -e

echo "🚀 Deploying Trust You Go..."

# ── Backend ──────────────────────────────────────
echo "🔨 Updating backend..."
cd /var/www/trust-you-go/backend

git fetch --all
git reset --hard origin/main   # change 'main' to your production branch

npm install --production
npm run db:migrate             # safe to re-run; skips already-applied migrations

pm2 restart trust-you-go-backend
echo "✅ Backend updated."

# ── Frontend ─────────────────────────────────────
echo "🎨 Building frontend..."
cd /var/www/trust-you-go/frontend

git fetch --all
git reset --hard origin/main

npm install
npm run build

sudo cp -r dist/* /var/www/trust-you-go/public/
sudo chown -R www-data:www-data /var/www/trust-you-go/public

echo "✅ Frontend updated."

# ── Nginx ─────────────────────────────────────────
sudo systemctl reload nginx
echo "🌐 Nginx reloaded."

echo ""
echo "🎉 Deployment complete! https://trustyou-go.com"
```

```bash
chmod +x /var/www/trust-you-go/deploy.sh
```

**Run future deployments with:**

```bash
/var/www/trust-you-go/deploy.sh
```

---

## 🛠️ Maintenance Commands

### Application Status

```bash
pm2 status
sudo systemctl status nginx
sudo systemctl status mysql
df -h
free -m
```

### Logs

```bash
pm2 logs trust-you-go-backend          # Backend app logs
sudo tail -f /var/log/nginx/trust-you-go-access.log
sudo tail -f /var/log/nginx/trust-you-go-error.log
sudo tail -f /var/log/mysql/error.log
```

### Database Backup

```bash
# Manual backup
mkdir -p ~/backups
mysqldump -u tyg_user -p trust_you_go > ~/backups/tyg_$(date +%Y%m%d_%H%M%S).sql

# Automated daily backup (add to crontab)
crontab -e
# Add: 0 2 * * * mysqldump -u tyg_user -p'YourStrongPassword123!' trust_you_go > ~/backups/tyg_$(date +\%Y\%m\%d).sql && find ~/backups -name 'tyg_*.sql' -mtime +7 -delete
```

---

## 🐛 Troubleshooting

### Backend Not Starting

```bash
pm2 logs trust-you-go-backend

# Port conflict?
sudo lsof -i :3001
sudo kill -9 <PID>

# Test DB connection manually
mysql -u tyg_user -p trust_you_go
```

### 502 Bad Gateway

```bash
# Backend must be running
pm2 status
pm2 restart trust-you-go-backend

# Is backend listening on 3001?
sudo netstat -tlnp | grep 3001
```

### Frontend Not Loading

```bash
# Check files exist
ls -la /var/www/trust-you-go/public

# Check Nginx config
sudo nginx -t
sudo systemctl reload nginx
```

### Booking Form Emails Not Arriving

```bash
# 1. Check backend .env has correct EMAIL_USER and EMAIL_PASSWORD
cat /var/www/trust-you-go/backend/.env | grep EMAIL

# 2. Test SMTP connection from Node
cd /var/www/trust-you-go/backend
node -e "
const s = require('./src/services/emailService');
s.testConnection().then(ok => console.log(ok ? '✓ SMTP OK' : '✗ SMTP failed'));
"

# 3. Check backend logs for email errors
pm2 logs trust-you-go-backend --lines 50
```

### Uploads Not Persisting After Git Pull

```bash
# Verify symlink is in place
ls -la /var/www/trust-you-go/backend/uploads
# Should show: uploads -> /var/uploads/trust-you-go

# If symlink is missing (git pull overwrote it):
rm -rf /var/www/trust-you-go/backend/uploads
ln -s /var/uploads/trust-you-go /var/www/trust-you-go/backend/uploads
```

---

## 📝 Post-Deployment Checklist

- [ ] Backend running via PM2 (`pm2 status`)
- [ ] Database created, migrated, and seeded
- [ ] Frontend built and served at `/var/www/trust-you-go/public`
- [ ] Nginx site enabled and config tested
- [ ] SSL certificate installed (`https://trustyou-go.com` loads with padlock)
- [ ] API endpoints accessible (`https://trustyou-go.com/api/health`)
- [ ] Booking form sends email to `hello@trustyou-go.com`
- [ ] Auto-reply email sent to customer
- [ ] Uploads symlink to `/var/uploads/trust-you-go` verified
- [ ] Firewall allows 22, 80, 443
- [ ] Admin login works at `https://trustyou-go.com/admin`
- [ ] Default admin password changed after first login
- [ ] Database backup cron job set up
- [ ] `deploy.sh` tested with a fresh pull

---

**Last Updated:** March 2026
**Version:** 2.0.0 — Trust You Go
