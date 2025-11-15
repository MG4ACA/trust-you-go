# Supabase Setup Guide - Trust You Go Travel Booking System

## 📋 Document Information

- **Project**: Trust You Go Travel Booking Management System
- **Version**: 1.0
- **Last Updated**: October 21, 2025
- **Estimated Setup Time**: 2-3 hours

---

## 🎯 Overview

This guide will walk you through setting up Supabase for the Trust You Go travel booking management system. By the end of this guide, you'll have:

- ✅ Supabase project created and configured
- ✅ Database tables created with proper relationships
- ✅ Row Level Security (RLS) policies implemented
- ✅ Supabase Storage configured for images
- ✅ Authentication settings configured
- ✅ Sample data seeded for testing

---

## 📦 Prerequisites

Before starting, ensure you have:

- [ ] Email account (for Supabase registration)
- [ ] Basic understanding of PostgreSQL
- [ ] Text editor or IDE (VS Code recommended)
- [ ] Git installed (optional, for version control)

---

## 🚀 STEP 1: Create Supabase Account & Project

### 1.1 Sign Up for Supabase

1. Go to [https://supabase.com](https://supabase.com)
2. Click **"Start your project"** or **"Sign in"**
3. Sign up using:
   - GitHub account (recommended for developers)
   - Or email/password

### 1.2 Create New Project

1. Once logged in, click **"New Project"**
2. Select or create an **Organization** (personal or team)
3. Fill in project details:

   - **Name**: `trust-you-go` or `trust-you-go-prod`
   - **Database Password**: Generate a strong password (SAVE THIS!)
   - **Region**: Choose **Singapore** (closest to Sri Lanka)
   - **Pricing Plan**:
     - Start with **Free** for development
     - Upgrade to **Pro ($25/month)** for production

4. Click **"Create new project"**
5. Wait 2-3 minutes for project provisioning

### 1.3 Save Your Credentials

Once project is ready, navigate to **Settings** → **API**:

```bash
# Save these values in a secure location:
Project URL: https://xxxxxxxxxxxxx.supabase.co
anon/public key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
service_role key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9... (KEEP SECRET!)
```

**⚠️ IMPORTANT**: Never commit `service_role` key to GitHub or expose it in frontend code!

---

## 🗄️ STEP 2: Create Database Schema

### 2.1 Open SQL Editor

1. In Supabase Dashboard, go to **SQL Editor**
2. Click **"+ New query"**

### 2.2 Run Database Migration

Copy and paste the following SQL script (you can find the complete version in `DATABASE_SCHEMA.md`):

```sql
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. ADMINS TABLE
CREATE TABLE admins (
    admin_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. TRAVELERS TABLE
CREATE TABLE travelers (
    traveler_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    address TEXT,
    country VARCHAR(100),
    is_active BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. AGENTS TABLE
CREATE TABLE agents (
    agent_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255),
    phone VARCHAR(20),
    company VARCHAR(100),
    commission_rate DECIMAL(5,2) DEFAULT 0.00,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. LOCATIONS TABLE
CREATE TABLE locations (
    location_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(200) NOT NULL,
    description TEXT,
    location_type VARCHAR(50),
    city VARCHAR(100),
    district VARCHAR(100),
    country VARCHAR(100) DEFAULT 'Sri Lanka',
    latitude DECIMAL(10,8),
    longitude DECIMAL(11,8),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. LOCATION IMAGES TABLE
CREATE TABLE location_images (
    image_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    location_id UUID NOT NULL REFERENCES locations(location_id) ON DELETE CASCADE,
    image_url TEXT NOT NULL,
    caption VARCHAR(255),
    sequence INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. PACKAGES TABLE
CREATE TABLE packages (
    package_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(200) NOT NULL,
    description TEXT,
    duration_days INT NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    package_type VARCHAR(20) DEFAULT 'template',
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. PACKAGE LOCATIONS TABLE
CREATE TABLE package_locations (
    package_location_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    package_id UUID NOT NULL REFERENCES packages(package_id) ON DELETE CASCADE,
    location_id UUID NOT NULL REFERENCES locations(location_id) ON DELETE CASCADE,
    day_number INT NOT NULL,
    accommodation TEXT,
    activities TEXT,
    sequence INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. BOOKINGS TABLE
CREATE TABLE bookings (
    booking_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    traveler_id UUID NOT NULL REFERENCES travelers(traveler_id) ON DELETE CASCADE,
    package_id UUID NOT NULL REFERENCES packages(package_id) ON DELETE CASCADE,
    agent_id UUID REFERENCES agents(agent_id) ON DELETE SET NULL,
    booking_date TIMESTAMPTZ DEFAULT NOW(),
    travel_start_date DATE NOT NULL,
    travel_end_date DATE NOT NULL,
    number_of_travelers INT DEFAULT 1,
    total_price DECIMAL(10,2),
    status VARCHAR(20) DEFAULT 'temporary',
    special_requests TEXT,
    confirmation_date TIMESTAMPTZ,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. AUDIT LOGS TABLE
CREATE TABLE audit_logs (
    log_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    admin_id UUID REFERENCES admins(admin_id) ON DELETE SET NULL,
    entity_type VARCHAR(50) NOT NULL,
    entity_id UUID NOT NULL,
    action VARCHAR(20) NOT NULL,
    old_values JSONB,
    new_values JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create Indexes
CREATE INDEX idx_travelers_email ON travelers(email);
CREATE INDEX idx_travelers_is_active ON travelers(is_active);
CREATE INDEX idx_admins_email ON admins(email);
CREATE INDEX idx_locations_is_active ON locations(is_active);
CREATE INDEX idx_packages_is_active ON packages(is_active);
CREATE INDEX idx_bookings_status ON bookings(status);
CREATE INDEX idx_bookings_traveler ON bookings(traveler_id);
CREATE INDEX idx_bookings_dates ON bookings(travel_start_date, travel_end_date);
CREATE INDEX idx_location_images_location ON location_images(location_id);
CREATE INDEX idx_package_locations_package ON package_locations(package_id);
CREATE INDEX idx_audit_logs_entity ON audit_logs(entity_type, entity_id);
CREATE INDEX idx_audit_logs_created ON audit_logs(created_at DESC);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply triggers to tables with updated_at
CREATE TRIGGER update_admins_updated_at BEFORE UPDATE ON admins
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_travelers_updated_at BEFORE UPDATE ON travelers
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_agents_updated_at BEFORE UPDATE ON agents
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_locations_updated_at BEFORE UPDATE ON locations
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_packages_updated_at BEFORE UPDATE ON packages
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_bookings_updated_at BEFORE UPDATE ON bookings
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
```

3. Click **"Run"** button
4. Verify all tables are created in **Database** → **Tables**

---

## 🔒 STEP 3: Configure Row Level Security (RLS)

### 3.1 Enable RLS on All Tables

```sql
-- Enable RLS on all tables
ALTER TABLE admins ENABLE ROW LEVEL SECURITY;
ALTER TABLE travelers ENABLE ROW LEVEL SECURITY;
ALTER TABLE agents ENABLE ROW LEVEL SECURITY;
ALTER TABLE locations ENABLE ROW LEVEL SECURITY;
ALTER TABLE location_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE packages ENABLE ROW LEVEL SECURITY;
ALTER TABLE package_locations ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;
```

### 3.2 Create RLS Policies

#### Public Access Policies

```sql
-- Public can view active packages
CREATE POLICY "Public can view active packages"
    ON packages FOR SELECT
    USING (is_active = true);

-- Public can view active locations
CREATE POLICY "Public can view active locations"
    ON locations FOR SELECT
    USING (is_active = true);

-- Public can view images of active locations
CREATE POLICY "Public can view location images"
    ON location_images FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM locations
            WHERE locations.location_id = location_images.location_id
            AND locations.is_active = true
        )
    );

-- Public can view package locations for active packages
CREATE POLICY "Public can view package locations"
    ON package_locations FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM packages
            WHERE packages.package_id = package_locations.package_id
            AND packages.is_active = true
        )
    );

-- Public can insert bookings (temporary only)
CREATE POLICY "Public can create bookings"
    ON bookings FOR INSERT
    WITH CHECK (status = 'temporary');
```

#### Admin Access Policies

```sql
-- Create helper function to check if user is admin
CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM admins
        WHERE admin_id = auth.uid()
        AND is_active = true
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Admins have full access to all tables
CREATE POLICY "Admins can do everything on admins"
    ON admins FOR ALL
    USING (is_admin())
    WITH CHECK (is_admin());

CREATE POLICY "Admins can do everything on travelers"
    ON travelers FOR ALL
    USING (is_admin())
    WITH CHECK (is_admin());

CREATE POLICY "Admins can do everything on agents"
    ON agents FOR ALL
    USING (is_admin())
    WITH CHECK (is_admin());

CREATE POLICY "Admins can do everything on locations"
    ON locations FOR ALL
    USING (is_admin())
    WITH CHECK (is_admin());

CREATE POLICY "Admins can do everything on location_images"
    ON location_images FOR ALL
    USING (is_admin())
    WITH CHECK (is_admin());

CREATE POLICY "Admins can do everything on packages"
    ON packages FOR ALL
    USING (is_admin())
    WITH CHECK (is_admin());

CREATE POLICY "Admins can do everything on package_locations"
    ON package_locations FOR ALL
    USING (is_admin())
    WITH CHECK (is_admin());

CREATE POLICY "Admins can do everything on bookings"
    ON bookings FOR ALL
    USING (is_admin())
    WITH CHECK (is_admin());

CREATE POLICY "Admins can view audit logs"
    ON audit_logs FOR SELECT
    USING (is_admin());
```

#### Traveler Access Policies

```sql
-- Create helper function to check if user is active traveler
CREATE OR REPLACE FUNCTION is_active_traveler()
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM travelers
        WHERE traveler_id = auth.uid()
        AND is_active = true
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Travelers can view their own profile
CREATE POLICY "Travelers can view own profile"
    ON travelers FOR SELECT
    USING (traveler_id = auth.uid() AND is_active = true);

-- Travelers can update their own profile (limited fields)
CREATE POLICY "Travelers can update own profile"
    ON travelers FOR UPDATE
    USING (traveler_id = auth.uid() AND is_active = true)
    WITH CHECK (
        traveler_id = auth.uid()
        AND is_active = true
        -- Prevent changing email or is_active
        AND email = (SELECT email FROM travelers WHERE traveler_id = auth.uid())
    );

-- Travelers can view their own bookings
CREATE POLICY "Travelers can view own bookings"
    ON bookings FOR SELECT
    USING (traveler_id = auth.uid() AND is_active_traveler());
```

---

## 📁 STEP 4: Configure Supabase Storage

### 4.1 Create Storage Bucket

1. Go to **Storage** in Supabase Dashboard
2. Click **"Create a new bucket"**
3. Configuration:

   - **Name**: `location-images`
   - **Public bucket**: ✅ **Yes** (images need to be publicly accessible)
   - **File size limit**: 5MB
   - **Allowed MIME types**: `image/jpeg, image/png, image/webp, image/gif`

4. Click **"Create bucket"**

### 4.2 Configure Storage Policies

Go to **Storage** → **Policies** → **location-images bucket**

**Policy 1: Public Read Access**

```sql
CREATE POLICY "Public can view images"
ON storage.objects FOR SELECT
USING (bucket_id = 'location-images');
```

**Policy 2: Authenticated Users Can Upload**

```sql
CREATE POLICY "Authenticated users can upload images"
ON storage.objects FOR INSERT
WITH CHECK (
    bucket_id = 'location-images'
    AND auth.role() = 'authenticated'
);
```

**Policy 3: Authenticated Users Can Delete**

```sql
CREATE POLICY "Authenticated users can delete images"
ON storage.objects FOR DELETE
USING (
    bucket_id = 'location-images'
    AND auth.role() = 'authenticated'
);
```

### 4.3 Create Folder Structure

Folders will be created automatically when you upload files with paths like:

- `locations/{location_id}/image1.jpg`
- `locations/{location_id}/image2.jpg`

---

## 🔐 STEP 5: Configure Authentication

### 5.1 Auth Settings

Go to **Authentication** → **Settings**

**Email Auth:**

- ✅ Enable Email provider
- ❌ Disable "Confirm email" (travelers are admin-activated)
- Token expiry: **24 hours**
- Password requirements: Minimum 8 characters

**Password Requirements:**

- Minimum length: **8 characters**
- Require uppercase: ✅
- Require lowercase: ✅
- Require numbers: ✅
- Require special characters: ❌ (optional)

### 5.2 Email Templates

Go to **Authentication** → **Email Templates**

Customize these templates:

1. **Confirmation** (disabled for our use case)
2. **Invitation** (for admin-created accounts)
3. **Magic Link** (optional)
4. **Change Email Address**
5. **Reset Password** ← **Important for travelers**

**Reset Password Template Example:**

```html
<h2>Reset Your Password</h2>
<p>Hello {{ .Email }},</p>
<p>Click the link below to reset your Trust You Go password:</p>
<p><a href="{{ .ConfirmationURL }}">Reset Password</a></p>
<p>If you didn't request this, please ignore this email.</p>
<p>
  Thank you,
  <br />
  Trust You Go Team
</p>
```

### 5.3 URL Configuration

Go to **Authentication** → **URL Configuration**

Set these URLs (update with your actual domains):

- **Site URL**: `https://trustyou-go.com`
- **Redirect URLs**:
  - `https://trustyou-go.com/auth/callback`
  - `https://admin.trustyou-go.com/auth/callback`
  - `http://localhost:3000/auth/callback` (development)

---

## 🌱 STEP 6: Seed Sample Data

### 6.1 Create Admin User

```sql
-- Create admin user (password: Admin123!)
INSERT INTO admins (name, email, password_hash, is_active)
VALUES (
    'Super Admin',
    'admin@trustyou-go.com',
    crypt('Admin123!', gen_salt('bf')),  -- bcrypt hash
    true
);

-- Also create in auth.users (for Supabase Auth)
INSERT INTO auth.users (
    instance_id,
    id,
    aud,
    role,
    email,
    encrypted_password,
    email_confirmed_at,
    raw_user_meta_data,
    created_at,
    updated_at
) VALUES (
    '00000000-0000-0000-0000-000000000000',
    (SELECT admin_id FROM admins WHERE email = 'admin@trustyou-go.com'),
    'authenticated',
    'authenticated',
    'admin@trustyou-go.com',
    crypt('Admin123!', gen_salt('bf')),
    NOW(),
    '{"role": "admin"}'::jsonb,
    NOW(),
    NOW()
);
```

### 6.2 Create Sample Locations

```sql
-- Sample Sri Lankan locations
INSERT INTO locations (name, description, location_type, city, district, country, is_active)
VALUES
    ('Sigiriya Rock Fortress', 'Ancient rock fortress and UNESCO World Heritage site', 'Tourist Attraction', 'Sigiriya', 'Matale', 'Sri Lanka', true),
    ('Temple of the Tooth', 'Sacred Buddhist temple housing a tooth relic of Buddha', 'Religious Site', 'Kandy', 'Kandy', 'Sri Lanka', true),
    ('Galle Fort', 'Historic fort and UNESCO World Heritage site', 'Historic Site', 'Galle', 'Galle', 'Sri Lanka', true),
    ('Yala National Park', 'Wildlife sanctuary famous for leopards', 'National Park', 'Yala', 'Hambantota', 'Sri Lanka', true),
    ('Ella', 'Scenic hill country town with tea plantations', 'Town', 'Ella', 'Badulla', 'Sri Lanka', true),
    ('Mirissa Beach', 'Beautiful beach for swimming and whale watching', 'Beach', 'Mirissa', 'Matara', 'Sri Lanka', true);
```

### 6.3 Create Sample Packages

```sql
-- Sample travel packages
INSERT INTO packages (name, description, duration_days, price, package_type, is_active)
VALUES
    ('Cultural Triangle Tour', 'Explore ancient Sri Lankan heritage sites', 5, 750.00, 'template', true),
    ('Beach & Wildlife Adventure', 'Combine beach relaxation with wildlife safaris', 7, 1200.00, 'template', true),
    ('Hill Country Escape', 'Tea plantations and scenic mountain views', 4, 600.00, 'template', true);
```

### 6.4 Link Locations to Packages

```sql
-- Link locations to Cultural Triangle package
INSERT INTO package_locations (package_id, location_id, day_number, accommodation, sequence)
SELECT
    (SELECT package_id FROM packages WHERE name = 'Cultural Triangle Tour'),
    location_id,
    1,
    'Sigiriya Village Hotel',
    1
FROM locations WHERE name = 'Sigiriya Rock Fortress';

INSERT INTO package_locations (package_id, location_id, day_number, accommodation, sequence)
SELECT
    (SELECT package_id FROM packages WHERE name = 'Cultural Triangle Tour'),
    location_id,
    3,
    'Kandy City Hotel',
    2
FROM locations WHERE name = 'Temple of the Tooth';
```

---

## 🧪 STEP 7: Test Your Setup

### 7.1 Test Database Access

1. Go to **SQL Editor**
2. Run test query:

```sql
SELECT
    'Admins' as table_name, COUNT(*) as count FROM admins
UNION ALL
SELECT 'Locations', COUNT(*) FROM locations
UNION ALL
SELECT 'Packages', COUNT(*) FROM packages;
```

Expected output:

```
table_name | count
-----------+------
Admins     | 1
Locations  | 6
Packages   | 3
```

### 7.2 Test Storage

1. Go to **Storage** → **location-images**
2. Try uploading a test image
3. Verify it appears in the bucket
4. Copy the public URL and test in browser

### 7.3 Test Authentication

1. Go to **Authentication** → **Users**
2. Verify admin user exists
3. Try password reset flow (will need to implement in frontend)

---

## 🔧 STEP 8: Install Supabase Client

### 8.1 For Frontend (React)

```bash
npm install @supabase/supabase-js
```

### 8.2 Create Supabase Client

Create `src/lib/supabaseClient.js`:

```javascript
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
```

### 8.3 Create Environment File

Create `.env.local`:

```env
VITE_SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

⚠️ Add `.env.local` to `.gitignore`!

---

## 📊 STEP 9: Verify Everything Works

### Checklist:

- [ ] Supabase project created
- [ ] All 9 tables created
- [ ] Indexes created
- [ ] RLS enabled on all tables
- [ ] RLS policies created (public, admin, traveler)
- [ ] Storage bucket created (location-images)
- [ ] Storage policies configured
- [ ] Auth settings configured
- [ ] Admin user seeded
- [ ] Sample locations seeded (6)
- [ ] Sample packages seeded (3)
- [ ] Supabase client installed in project
- [ ] Environment variables configured

---

## 🎓 Next Steps

1. **Review PROJECT_PLAN.md** - Proceed to Phase 3 (Backend API Development)
2. **Test API calls** - Use Postman or browser to test Supabase REST API
3. **Build admin dashboard** - Start with login page
4. **Integrate booking form** - Update website booking form to use Supabase

---

## 🆘 Troubleshooting

### Issue: Can't connect to database

- **Solution**: Check if project is fully provisioned (wait 2-3 minutes after creation)
- Verify database password is correct

### Issue: RLS policies blocking access

- **Solution**: Temporarily disable RLS on specific table for testing:
  ```sql
  ALTER TABLE table_name DISABLE ROW LEVEL SECURITY;
  ```
- Remember to re-enable after debugging!

### Issue: Storage upload fails

- **Solution**:
  - Check file size (max 5MB)
  - Verify MIME type is allowed
  - Check storage policies

### Issue: Auth not working

- **Solution**:
  - Verify email confirmation is disabled
  - Check redirect URLs are correct
  - Ensure JWT secret is not exposed

---

## 📚 Resources

- **Supabase Documentation**: https://supabase.com/docs
- **Row Level Security Guide**: https://supabase.com/docs/guides/auth/row-level-security
- **Storage Guide**: https://supabase.com/docs/guides/storage
- **Supabase CLI**: https://supabase.com/docs/guides/cli
- **Community Discord**: https://discord.supabase.com

---

## 💰 Cost Management

### Free Tier Limits:

- Database: 500MB
- Storage: 1GB
- Bandwidth: 2GB
- API requests: Unlimited
- Active users: 50,000 MAU

### When to Upgrade to Pro ($25/month):

- Need more than 500MB database
- Need more than 1GB storage
- Need daily backups
- Need Point-in-Time Recovery
- Going to production

### Monitoring Usage:

1. Go to **Settings** → **Usage**
2. Monitor database size, storage, bandwidth
3. Set up billing alerts

---

**Setup Complete! 🎉**

You're now ready to start building the backend APIs and integrating the frontend. Refer to **PROJECT_PLAN.md** for the next steps.

**Estimated total setup time**: 2-3 hours  
**Next Phase**: Backend API Development (Phase 3)

---

**Document Owner**: Development Team  
**Last Updated**: October 21, 2025  
**Version**: 1.0
