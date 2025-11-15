# Trust You Go - Travel Booking Management System

## Comprehensive Project Implementation Plan

---

## 🎯 Project Overview

A travel booking management system with Supabase backend for managing travel packages, bookings, travelers, and agents in Sri Lanka.

### Why Supabase?

- ⚡ **Faster Development**: Auto-generated REST APIs reduce development time by 50%
- 💰 **Cost-Effective**: Free tier supports up to 500MB database and 50K MAU, Pro tier only $25/month
- 🎁 **Built-in Features**: Authentication, real-time subscriptions, file storage, and API documentation included
- 🚀 **Quick Launch**: Launch in 2-3 weeks instead of 6-8 weeks
- 📈 **Revenue Focus**: Start earning revenue faster with minimal upfront investment
- 🔄 **Migration Path**: Can migrate to AWS later when scaling requires it (at ~500+ users)

---

## 📋 PHASE 1: DATABASE DESIGN & SETUP

### Task 1.1: Finalize Database Schema

- [ ] Review and finalize all entities
- [ ] Define relationships and foreign keys
- [ ] Define indexes for performance
- [ ] Add constraints and validation rules

### Task 1.2: Entity Definitions

**📄 See complete database schema in: [DATABASE_SCHEMA.md](./DATABASE_SCHEMA.md)**

The database includes 9 main entities:

1. **admins** - Admin user accounts
2. **travelers** - Traveler accounts (auto-created on booking confirmation)
3. **agents** - Agent/referral information
4. **locations** - All locations (tourist spots, accommodations, etc.)
5. **location_images** - Images for locations
6. **packages** - Travel packages (templates and custom)
7. **package_locations** - Package-to-location relationships
8. **bookings** - All booking information
9. **audit_logs** - System audit trail

For detailed field definitions, constraints, indexes, and relationships, refer to the DATABASE_SCHEMA.md file.

### Task 1.3: Create Database

- [ ] Create Supabase account at https://supabase.com
- [ ] Create new Supabase project (choose region closest to Sri Lanka - Singapore recommended)
- [ ] Save project URL, anon key, and service role key
- [ ] Configure project settings (timezone to UTC, pooling mode)

### Task 1.4: Create Database Migration Scripts

- [ ] Create SQL migration files for all 9 tables
- [ ] Run migrations in Supabase SQL Editor or via migration tool
- [ ] Add seed data for initial admin user (with hashed password)
- [ ] Add sample locations (famous Sri Lankan destinations)
- [ ] Add sample packages (templates)
- [ ] Verify all tables, indexes, and constraints are created

---

## 📋 PHASE 2: SUPABASE CONFIGURATION & SETUP

### Task 2.1: Enable Supabase Features

- [ ] Enable Row Level Security (RLS) on all tables
- [ ] Configure RLS policies for admin, traveler, and public access
- [ ] Enable Realtime features (optional, for live booking updates)
- [ ] Review and configure authentication settings

### Task 2.2: Supabase Storage for Images

- [ ] Create storage bucket: `location-images` (public)
- [ ] Set up folder structure (locations/{location_id}/)
- [ ] Configure storage policies (public read, authenticated write)
- [ ] Set file size limits (5MB max per image)
- [ ] Configure allowed MIME types (image/jpeg, image/png, image/webp)

### Task 2.3: Authentication Configuration

- [ ] Configure JWT settings (token expiry: 24 hours)
- [ ] Disable email confirmations for traveler accounts (admin-activated)
- [ ] Configure password requirements (min 8 chars, complexity rules)
- [ ] Set up email templates for password reset
- [ ] Configure redirect URLs for authentication flows

### Task 2.4: API Configuration

- [ ] Review auto-generated REST API endpoints
- [ ] Enable PostgREST API documentation
- [ ] Configure CORS settings for frontend domain
- [ ] Set up API rate limiting (optional)
- [ ] Test API endpoints using Supabase API docs

### Task 2.5: Row Level Security (RLS) Policies

**Admin Policies:**

- [ ] Admins can SELECT, INSERT, UPDATE, DELETE on all tables
- [ ] Admins can view all travelers and bookings

**Traveler Policies:**

- [ ] Travelers can SELECT own profile only
- [ ] Travelers can UPDATE own profile (except is_active, email)
- [ ] Travelers can SELECT own bookings only
- [ ] Travelers cannot INSERT or DELETE bookings

**Public Policies:**

- [ ] Public can SELECT active packages (is_active = true)
- [ ] Public can SELECT active locations (is_active = true)
- [ ] Public can SELECT location_images for active locations
- [ ] Public can INSERT bookings (temporary status only)
- [ ] Public can SELECT public package-location relationships

### Task 2.6: Database Functions & Triggers

- [ ] Create function: `create_traveler_on_booking()` - Auto-creates traveler when booking is submitted
- [ ] Create function: `confirm_booking_and_activate_traveler()` - Activates traveler when booking confirmed
- [ ] Create trigger: `audit_log_trigger` - Auto-logs all admin actions
- [ ] Create function: `get_package_with_locations()` - Returns package with full itinerary
- [ ] Test all functions and triggers

---

## 📋 PHASE 3: BACKEND API DEVELOPMENT

### Task 3.1: Project Structure Setup

- [ ] Initialize Node.js/TypeScript project (or Python with FastAPI)
- [ ] Install Supabase client library (`@supabase/supabase-js` or `supabase-py`)
- [ ] Set up environment variables (.env file with SUPABASE_URL and SUPABASE_KEY)
- [ ] Create Supabase client singleton/service
- [ ] Set up API route structure (REST endpoints)
- [ ] Add authentication middleware (verify JWT from Supabase)
- [ ] Add error handling middleware
- [ ] Add request validation middleware

**Note:** Supabase auto-generates basic CRUD APIs, so we'll focus on custom business logic endpoints.

### Task 3.2: Authentication APIs

#### **Auth Endpoints (Use Supabase Auth):**

- [ ] `POST /auth/v1/token?grant_type=password` - Admin/Traveler login (Supabase built-in)
- [ ] `POST /auth/v1/token?grant_type=refresh_token` - Refresh JWT (Supabase built-in)
- [ ] `POST /auth/v1/logout` - Logout user (Supabase built-in)
- [ ] `POST /auth/v1/recover` - Request password reset (Supabase built-in)
- [ ] `POST /auth/v1/verify` - Reset password with token (Supabase built-in)

**Custom Auth Endpoints:**

- [ ] `POST /api/auth/admin/login` - Admin login with role verification
- [ ] `POST /api/auth/traveler/login` - Traveler login with is_active check
- [ ] `GET /api/auth/me` - Get current user profile (admin or traveler)

### Task 3.3: Public APIs (No Auth Required)

#### **Public Package Endpoints (Use Supabase Auto-Generated + Custom):**

- [ ] `GET /rest/v1/packages?is_active=eq.true&package_type=eq.template` - List active packages (Supabase)
- [ ] Custom: `GET /api/public/packages/{id}/full` - Get package with full itinerary and location images
- [ ] `GET /rest/v1/locations?is_active=eq.true` - List active locations (Supabase)
- [ ] Custom: `GET /api/public/locations/{id}/full` - Get location with all images

#### **Public Booking Endpoint:**

- [ ] Custom: `POST /api/public/bookings` - Submit booking (creates booking + inactive traveler profile)
  - Validates package exists
  - Creates traveler with is_active=false
  - Creates booking with status='temporary'
  - Returns confirmation message

### Task 3.4: Traveler APIs (Auth Required - Traveler Role)

#### **Traveler Endpoints:**

- [ ] Custom: `GET /api/traveler/bookings` - Get my bookings (filtered by authenticated user)
- [ ] Custom: `GET /api/traveler/bookings/{id}` - Get booking details (verify ownership)
- [ ] Custom: `GET /api/traveler/packages/{id}/itinerary` - Get package with full itinerary
- [ ] `PATCH /rest/v1/travelers?id=eq.{user_id}` - Update profile (Supabase with RLS)
- [ ] `PUT /auth/v1/user` - Change password (Supabase built-in)
- [ ] Custom: `GET /api/traveler/profile` - Get full traveler profile with bookings count

### Task 3.5: Admin - Booking Management APIs (Auth Required - Admin Role)

#### **Booking Management Endpoints:**

- [ ] Custom: `GET /api/admin/bookings` - List all bookings with filters (status, date range, traveler)
- [ ] `GET /rest/v1/bookings?id=eq.{id}&select=*,travelers(*),packages(*),agents(*)` - Get booking (Supabase)
- [ ] Custom: `POST /api/admin/bookings/{id}/confirm` - Confirm booking + activate traveler + send email
  - Updates booking status to 'confirmed'
  - Sets traveler is_active = true
  - Sends email with credentials
  - Logs audit trail
- [ ] Custom: `PUT /api/admin/bookings/{id}/cancel` - Cancel booking (with reason)
- [ ] `PATCH /rest/v1/bookings?id=eq.{id}` - Update booking status (Supabase with RLS)
- [ ] Custom: `PUT /api/admin/bookings/{id}/assign-agent` - Assign agent to booking
- [ ] `PATCH /rest/v1/bookings?id=eq.{id}` - Update booking details (Supabase)
- [ ] `DELETE /rest/v1/bookings?id=eq.{id}` - Delete booking (Supabase with RLS)

### Task 3.6: Admin - Package Management APIs

#### **Package Template Endpoints:**

- [ ] `GET /rest/v1/packages?select=*,package_locations(locations(*))` - List all packages (Supabase)
- [ ] `GET /rest/v1/packages?id=eq.{id}&select=*,package_locations(locations(*))` - Get package (Supabase)
- [ ] `POST /rest/v1/packages` - Create new package (Supabase)
- [ ] Custom: `POST /api/admin/packages/{id}/duplicate` - Duplicate package with locations
- [ ] `PATCH /rest/v1/packages?id=eq.{id}` - Update package (Supabase)
- [ ] `PATCH /rest/v1/packages?id=eq.{id}` - Soft delete (set is_active=false) (Supabase)

#### **Package Location Management:**

- [ ] `POST /rest/v1/package_locations` - Add location to package (Supabase)
- [ ] `PATCH /rest/v1/package_locations?package_id=eq.{pid}&location_id=eq.{lid}` - Update (Supabase)
- [ ] `DELETE /rest/v1/package_locations?package_id=eq.{pid}&location_id=eq.{lid}` - Remove (Supabase)
- [ ] Custom: `PUT /api/admin/packages/{id}/locations/reorder` - Reorder locations (batch update)

### Task 3.7: Admin - Location Management APIs

#### **Location Endpoints:**

- [ ] `GET /rest/v1/locations?select=*,location_images(*)` - List all locations with images (Supabase)
- [ ] `GET /rest/v1/locations?id=eq.{id}&select=*,location_images(*)` - Get location details (Supabase)
- [ ] `POST /rest/v1/locations` - Create new location (Supabase)
- [ ] `PATCH /rest/v1/locations?id=eq.{id}` - Update location (Supabase)
- [ ] `PATCH /rest/v1/locations?id=eq.{id}` - Soft delete (set is_active=false) (Supabase)

#### **Location Image Management:**

- [ ] Custom: `POST /api/admin/locations/{id}/images/upload` - Upload image to Supabase Storage
  - Uploads file to storage bucket
  - Gets public URL
  - Creates location_images record with URL
- [ ] Custom: `DELETE /api/admin/locations/{locationId}/images/{imageId}` - Delete image
  - Deletes file from Supabase Storage
  - Deletes location_images record
- [ ] Custom: `PUT /api/admin/locations/{id}/images/reorder` - Reorder images (batch update sequence)

### Task 3.8: Admin - Agent Management APIs

#### **Agent Endpoints:**

- [ ] `GET /rest/v1/agents` - List all agents (Supabase)
- [ ] `GET /rest/v1/agents?id=eq.{id}` - Get agent details (Supabase)
- [ ] Custom: `GET /api/admin/agents/{id}/statistics` - Get agent bookings and commission stats
- [ ] `POST /rest/v1/agents` - Create new agent (Supabase)
- [ ] `PATCH /rest/v1/agents?id=eq.{id}` - Update agent (Supabase)
- [ ] `PATCH /rest/v1/agents?id=eq.{id}` - Soft delete (set is_active=false) (Supabase)

### Task 3.9: Admin - User Management APIs

#### **User Endpoints:**

- [ ] `GET /rest/v1/travelers?select=*,bookings(count)` - List all travelers with booking count (Supabase)
- [ ] `GET /rest/v1/travelers?id=eq.{id}&select=*,bookings(*)` - Get traveler details (Supabase)
- [ ] `PATCH /rest/v1/travelers?id=eq.{id}` - Update traveler (Supabase)
- [ ] `PATCH /rest/v1/travelers?id=eq.{id}` - Activate/deactivate (set is_active) (Supabase)
- [ ] Custom: `POST /api/admin/travelers/{id}/reset-password` - Admin reset password (uses Supabase Auth API)

### Task 3.10: Admin - Analytics/Reports APIs

#### **Analytics Endpoints (Custom APIs with Aggregations):**

- [ ] Custom: `GET /api/admin/analytics/dashboard` - Dashboard stats
  - Total bookings (by status)
  - Total revenue
  - Active travelers count
  - Recent bookings
- [ ] Custom: `GET /api/admin/analytics/bookings` - Booking reports with filters
  - By date range, status, agent
  - Revenue calculations
  - Export to CSV
- [ ] Custom: `GET /api/admin/analytics/agents` - Agent performance
  - Bookings per agent
  - Commission totals
- [ ] Custom: `GET /api/admin/analytics/popular-locations` - Location statistics
  - Most booked locations
  - Package popularity

### Task 3.11: Utility APIs

#### **Utility Endpoints:**

- [ ] `GET /rest/v1/audit_logs?select=*&order=created_at.desc` - Get audit logs (Supabase with filters)
- [ ] Custom: `GET /api/admin/audit-logs/filtered` - Advanced audit log filtering by entity, action, date
- [ ] Custom: `POST /api/storage/upload-url` - Generate signed upload URL for Supabase Storage

---

## 📋 PHASE 4: FRONTEND INTEGRATION

### Task 4.1: Update Existing Website

- [ ] Review current booking form on website
- [ ] Integrate booking form with public booking API
- [ ] Add success/error handling for booking submission
- [ ] Add email notification template for booking confirmation

### Task 4.2: Admin Dashboard (New Application)

- [ ] Decide on framework (React, Vue, or plain HTML/JS)
- [ ] Set up admin dashboard project structure
- [ ] Create login page
- [ ] Create dashboard layout (sidebar, header, main content)

### Task 4.3: Admin Dashboard - Booking Management UI

- [ ] Bookings list page (with filters, search, pagination)
- [ ] Booking details page
- [ ] Booking confirmation modal (with traveler account creation)
- [ ] Agent assignment modal
- [ ] Booking status update modal

### Task 4.4: Admin Dashboard - Package Management UI

- [ ] Package list page (templates and custom)
- [ ] Package create/edit form
- [ ] Package location selection/search interface
- [ ] Package duplication functionality
- [ ] Package preview page

### Task 4.5: Admin Dashboard - Location Management UI

- [ ] Location list page (with search)
- [ ] Location create/edit form
- [ ] Image upload interface (with preview)
- [ ] Image management (delete, reorder)

### Task 4.6: Admin Dashboard - Agent Management UI

- [ ] Agent list page
- [ ] Agent create/edit form
- [ ] Agent statistics/report page

### Task 4.7: Admin Dashboard - Analytics/Reports UI

- [ ] Dashboard with key metrics
- [ ] Booking reports with filters
- [ ] Agent performance reports
- [ ] Export functionality (CSV/PDF)

### Task 4.8: Traveler Portal (Optional)

- [ ] Traveler login page
- [ ] My bookings page
- [ ] Booking details page with itinerary
- [ ] Profile management page

---

## 📋 PHASE 5: TESTING & DEPLOYMENT

### Task 5.1: Backend Testing

- [ ] Write unit tests for each Lambda function
- [ ] Write integration tests for API endpoints
- [ ] Test database transactions and rollbacks
- [ ] Test authentication and authorization
- [ ] Load testing for Lambda functions

### Task 5.2: Frontend Testing

- [ ] Test all user flows (booking, login, etc.)
- [ ] Cross-browser testing
- [ ] Mobile responsiveness testing
- [ ] Test form validations
- [ ] Test error handling

### Task 5.3: Security Testing

- [ ] Test authentication mechanisms
- [ ] Test authorization (role-based access)
- [ ] Test SQL injection prevention
- [ ] Test XSS prevention
- [ ] Test CORS configuration
- [ ] Review AWS security best practices

### Task 5.4: Deployment Setup

- [ ] Set up CI/CD pipeline (GitHub Actions recommended)
- [ ] Configure environment variables for different environments (dev, staging, prod)
- [ ] Set up separate Supabase projects for dev and prod
- [ ] Enable Point-in-Time Recovery (PITR) for production database (Pro plan)
- [ ] Configure automated database backups (included in Supabase Pro)
- [ ] Set up monitoring and alerts in Supabase dashboard

### Task 5.5: Production Deployment

- [ ] Upgrade Supabase project to Pro plan ($25/month)
- [ ] Run all database migrations in production
- [ ] Seed production database with initial data
- [ ] Deploy backend API server (Node.js/Python) to hosting platform (Vercel, Railway, or DigitalOcean)
- [ ] Deploy admin dashboard to hosting platform (Vercel, Netlify, or Cloudflare Pages)
- [ ] Update frontend with production API URLs
- [ ] Configure custom domain for admin dashboard
- [ ] Test production environment thoroughly
- [ ] Monitor error rates and performance

---

## 📋 PHASE 6: DOCUMENTATION & TRAINING

### Task 6.1: Technical Documentation

- [ ] API documentation (Swagger/OpenAPI)
- [ ] Database schema documentation
- [ ] Deployment guide
- [ ] Environment setup guide
- [ ] Troubleshooting guide

### Task 6.2: User Documentation

- [ ] Admin user guide
- [ ] Traveler user guide
- [ ] FAQ document
- [ ] Video tutorials (optional)

### Task 6.3: Admin Training

- [ ] Train admin on booking management
- [ ] Train admin on package creation
- [ ] Train admin on agent management
- [ ] Train admin on reports and analytics

---

## 📋 PHASE 7: POST-LAUNCH & ENHANCEMENTS

### Task 7.1: Monitoring & Optimization

- [ ] Monitor Supabase dashboard for performance metrics
- [ ] Optimize database queries and add indexes where needed
- [ ] Monitor API response times via Supabase Analytics
- [ ] Set up alerts for errors and slow queries
- [ ] Review storage usage and implement image optimization
- [ ] Monitor authentication metrics and failed login attempts
- [ ] Review and optimize RLS policies for performance

### Task 7.2: Feature Enhancements (Future)

- [ ] Payment gateway integration (Stripe/PayPal)
- [ ] Email notifications (Supabase Edge Functions + Resend/SendGrid)
- [ ] SMS notifications (Twilio integration)
- [ ] Booking cancellation by travelers
- [ ] Package review/rating system
- [ ] Multi-language support for traveler portal
- [ ] Mobile app (iOS/Android with Supabase SDKs)
- [ ] Real-time booking notifications (Supabase Realtime)
- [ ] Advanced reporting and data export
- [ ] **Migration to AWS** when user base reaches 500-1000+ active users

---

## 🛠️ TECHNOLOGY STACK

### **Backend (Supabase):**

- **Database**: Supabase PostgreSQL 15+ (hosted)
- **Authentication**: Supabase Auth (JWT + bcrypt built-in)
- **Storage**: Supabase Storage (image uploads)
- **API**: Supabase Auto-generated REST API (PostgREST)
- **Custom APIs**: Node.js 18.x/TypeScript OR Python 3.11/FastAPI
- **Real-time** (optional): Supabase Realtime (WebSocket subscriptions)

### **Frontend:**

- Current website: React + Vite
- Admin dashboard: React + TypeScript (recommended) or Vue.js
- Styling: Tailwind CSS (already in use)
- Supabase Client: `@supabase/supabase-js` for API calls

### **Development Tools:**

- Git & GitHub
- Supabase CLI (for migrations and local development)
- Postman or Insomnia (API testing)
- Supabase Studio (built-in database GUI)
- VS Code with Supabase extensions

### **Hosting/Deployment:**

- **Backend API**: Vercel, Railway, Render, or DigitalOcean
- **Admin Dashboard**: Vercel, Netlify, or Cloudflare Pages
- **Database & Auth**: Supabase (managed)
- **CI/CD**: GitHub Actions

### **Authentication:**

- Supabase Auth (JWT tokens built-in)
- Password hashing: bcrypt (handled by Supabase)
- Row Level Security (RLS) for authorization

---

## 📅 ESTIMATED TIMELINE

### **With Supabase (Faster Development):**

- **Phase 1 (Database Setup):** 2-3 days
  - Create Supabase project
  - Run migrations
  - Configure RLS policies
- **Phase 2 (Supabase Configuration):** 2-3 days
  - Storage setup
  - Auth configuration
  - RLS policies
  - Database functions
- **Phase 3 (Backend APIs):** 8-12 days (50% reduction)
  - Most CRUD operations use Supabase auto-generated APIs
  - Focus on custom business logic only (booking confirmation, analytics, etc.)
- **Phase 4 (Frontend):** 10-15 days
  - Admin dashboard
  - Traveler portal
  - Integration with Supabase client
- **Phase 5 (Testing & Deployment):** 3-5 days
  - Testing
  - Deploy to Vercel/Netlify
- **Phase 6 (Documentation):** 2-3 days
- **Phase 7 (Optimization):** Ongoing

**Total Estimated Time:** 2-3 weeks (vs 6-8 weeks with AWS Lambda)

### **Cost Comparison:**

| Tier        | Users    | Supabase Cost     | AWS Cost (Estimated) |
| ----------- | -------- | ----------------- | -------------------- |
| Development | 0-50     | $0 (Free tier)    | $30-50/month         |
| Launch      | 50-500   | $25/month (Pro)   | $50-100/month        |
| Growth      | 500-1000 | $25-99/month      | $100-200/month       |
| Scale       | 1000+    | $599/month (Team) | $200-500/month       |

**Break-even point**: ~500-1000 active users (consider AWS migration at this point)

---

## 🎯 NEXT STEPS

1. Review and approve this plan
2. Start with Phase 1: Database Design
3. Set up development environment
4. Begin implementation phase by phase

---

## 📝 NOTES

### **Supabase-Specific Notes:**

- All UUIDs will be used for primary keys (Supabase default)
- All timestamps will use UTC (Supabase default: `timestamptz`)
- Soft deletes via `is_active` flags for: admins, travelers, agents, locations, packages
- Row Level Security (RLS) policies enforce authorization at database level
- Supabase auto-generates REST APIs for all tables (reduces custom API development)
- Supabase Auth handles JWT tokens, password hashing (bcrypt), and session management
- All sensitive data encrypted at rest and in transit (Supabase managed)
- Real-time features available via Supabase Realtime (WebSocket)
- Database backups included in Pro plan ($25/month)

### **Migration Path to AWS (When Needed):**

When your system reaches ~500-1000 active users or $5K-10K monthly revenue:

- Export PostgreSQL database (Supabase uses standard PostgreSQL)
- Migrate to AWS RDS
- Replace Supabase Storage with S3
- Replace Supabase Auth with custom JWT implementation
- Keep all database schema and business logic (minimal code changes)

### **Development Advantages:**

- ⚡ 50% faster development time (2-3 weeks vs 6-8 weeks)
- 💰 Lower initial costs ($0-25/month vs $30-50/month)
- 🚀 Start earning revenue 1-2 months earlier
- 🔄 Easy migration path to AWS when scaling requires it

---

**Last Updated:** October 21, 2025  
**Status:** Planning Phase - Supabase Backend  
**Estimated Launch:** 2-3 weeks from start
