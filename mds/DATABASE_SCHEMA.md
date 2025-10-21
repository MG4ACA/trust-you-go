# Trust You Go - Database Schema

## Complete Database Entity Definitions

---

## 📊 Database: PostgreSQL 15+

---

## 🗂️ ENTITY DEFINITIONS

### **1. admins**

Stores admin user accounts

```sql
CREATE TABLE admins (
    admin_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    contact VARCHAR(50) NOT NULL,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP
);

CREATE INDEX idx_admins_email ON admins(email);
CREATE INDEX idx_admins_is_active ON admins(is_active);
```

**Fields:**

- `admin_id` - Primary key (UUID)
- `email` - Unique email address (used for login)
- `password_hash` - Hashed password using bcrypt
- `name` - Full name
- `contact` - Phone number
- `is_active` - Account status
- `created_at` - Account creation timestamp
- `last_login` - Last login timestamp

---

### **2. travelers**

Stores traveler accounts (created immediately when booking is submitted)

```sql
CREATE TABLE travelers (
    traveler_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    contact VARCHAR(50) NOT NULL,
    is_active BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP
);

CREATE INDEX idx_travelers_email ON travelers(email);
CREATE INDEX idx_travelers_is_active ON travelers(is_active);
```

**Fields:**

- `traveler_id` - Primary key (UUID)
- `email` - Unique email address (used for login)
- `password_hash` - Hashed password using bcrypt (auto-generated on account creation)
- `name` - Full name (from booking form)
- `contact` - Phone number (from booking form)
- `is_active` - Account status (false until booking confirmed, then set to true)
- `created_at` - Account creation timestamp
- `last_login` - Last login timestamp

---

### **3. agents**

Stores agent/referral information

```sql
CREATE TABLE agents (
    agent_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    contact VARCHAR(50) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    commission_rate DECIMAL(5,2),
    is_active BOOLEAN DEFAULT true,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_agents_email ON agents(email);
CREATE INDEX idx_agents_is_active ON agents(is_active);
```

**Fields:**

- `agent_id` - Primary key (UUID)
- `name` - Agent full name
- `contact` - Agent phone number
- `email` - Agent email address
- `commission_rate` - Commission percentage (e.g., 5.00 for 5%)
- `is_active` - Agent status
- `notes` - Admin notes about the agent
- `created_at` - Record creation timestamp
- `updated_at` - Last update timestamp

---

### **4. locations**

Stores all locations (tourist spots, accommodations, etc.)

```sql
CREATE TABLE locations (
    location_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    location_type VARCHAR(50) NOT NULL CHECK (location_type IN ('tourist_spot', 'accommodation', 'restaurant', 'activity')),
    location_url TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_locations_type ON locations(location_type);
CREATE INDEX idx_locations_is_active ON locations(is_active);
CREATE INDEX idx_locations_name ON locations(name);
```

**Fields:**

- `location_id` - Primary key (UUID)
- `name` - Location name
- `description` - Detailed description
- `location_type` - Type: 'tourist_spot', 'accommodation', 'restaurant', or 'activity'
- `location_url` - Google Maps URL
- `is_active` - Location status
- `created_at` - Record creation timestamp
- `updated_at` - Last update timestamp

---

### **5. location_images**

Stores images for locations

```sql
CREATE TABLE location_images (
    image_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    location_id UUID NOT NULL REFERENCES locations(location_id) ON DELETE CASCADE,
    image_url TEXT NOT NULL,
    thumbnail_url TEXT,
    display_order INTEGER DEFAULT 0,
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_location_images_location ON location_images(location_id);
CREATE INDEX idx_location_images_order ON location_images(location_id, display_order);
```

**Fields:**

- `image_id` - Primary key (UUID)
- `location_id` - Foreign key to locations table
- `image_url` - Supabase Storage URL for full image
- `thumbnail_url` - Supabase Storage URL for thumbnail (optional)
- `display_order` - Order of display (0, 1, 2, ...)
- `uploaded_at` - Upload timestamp

---

### **6. packages**

Stores all travel packages (templates and custom)

```sql
CREATE TABLE packages (
    package_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    no_of_days INTEGER NOT NULL,
    is_template BOOLEAN DEFAULT false,
    is_active BOOLEAN DEFAULT true,
    base_price DECIMAL(10,2),
    created_by UUID REFERENCES admins(admin_id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_packages_is_template ON packages(is_template);
CREATE INDEX idx_packages_is_active ON packages(is_active);
CREATE INDEX idx_packages_created_by ON packages(created_by);
```

**Fields:**

- `package_id` - Primary key (UUID)
- `title` - Package title/name
- `description` - Detailed package description
- `no_of_days` - Duration in days
- `is_template` - True if pre-created template package
- `is_active` - Package status
- `base_price` - Base price (optional, can be customized per booking)
- `created_by` - Foreign key to admin who created it
- `created_at` - Record creation timestamp
- `updated_at` - Last update timestamp

---

### **7. package_locations**

Links packages to locations (many-to-many relationship)

```sql
CREATE TABLE package_locations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    package_id UUID NOT NULL REFERENCES packages(package_id) ON DELETE CASCADE,
    location_id UUID NOT NULL REFERENCES locations(location_id) ON DELETE RESTRICT,
    day_number INTEGER NOT NULL,
    visit_order INTEGER DEFAULT 0,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_package_locations_package ON package_locations(package_id);
CREATE INDEX idx_package_locations_location ON package_locations(location_id);
CREATE INDEX idx_package_locations_day ON package_locations(package_id, day_number, visit_order);
```

**Fields:**

- `id` - Primary key (UUID)
- `package_id` - Foreign key to packages table
- `location_id` - Foreign key to locations table
- `day_number` - Which day of the trip (1, 2, 3, ...)
- `visit_order` - Order of visit within the day (0, 1, 2, ...)
- `notes` - Additional notes for this location in the itinerary
- `created_at` - Record creation timestamp

---

### **8. bookings**

Stores all booking information

```sql
CREATE TABLE bookings (
    booking_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    package_id UUID NOT NULL REFERENCES packages(package_id) ON DELETE RESTRICT,
    traveler_id UUID NOT NULL REFERENCES travelers(traveler_id) ON DELETE CASCADE,
    agent_id UUID REFERENCES agents(agent_id) ON DELETE SET NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'temporary' CHECK (status IN ('temporary', 'confirmed', 'in_progress', 'completed', 'cancelled')),
    no_of_travelers INTEGER NOT NULL DEFAULT 1,
    start_date DATE,
    end_date DATE,
    total_amount DECIMAL(10,2),
    payment_status VARCHAR(20) DEFAULT 'pending' CHECK (payment_status IN ('pending', 'partial', 'paid', 'refunded')),
    booking_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    confirmation_date TIMESTAMP,
    confirmed_by UUID REFERENCES admins(admin_id) ON DELETE SET NULL,
    admin_notes TEXT,
    traveler_notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_bookings_status ON bookings(status);
CREATE INDEX idx_bookings_traveler ON bookings(traveler_id);
CREATE INDEX idx_bookings_agent ON bookings(agent_id);
CREATE INDEX idx_bookings_package ON bookings(package_id);
CREATE INDEX idx_bookings_dates ON bookings(start_date, end_date);
```

**Fields:**

- `booking_id` - Primary key (UUID)
- `package_id` - Foreign key to packages table
- `traveler_id` - Foreign key to travelers table (traveler profile created on booking submission with is_active=false)
- `agent_id` - Foreign key to agents table (optional)
- `status` - Booking status: 'temporary', 'confirmed', 'in_progress', 'completed', 'cancelled'
- `no_of_travelers` - Number of people traveling
- `start_date` - Trip start date
- `end_date` - Trip end date
- `total_amount` - Total booking amount
- `payment_status` - Payment status: 'pending', 'partial', 'paid', 'refunded'
- `booking_date` - When booking was submitted
- `confirmation_date` - When booking was confirmed by admin
- `confirmed_by` - Foreign key to admin who confirmed
- `admin_notes` - Internal admin notes
- `traveler_notes` - Notes from traveler/booking form
- `created_at` - Record creation timestamp
- `updated_at` - Last update timestamp

---

### **9. audit_logs**

Tracks all important system changes for audit purposes

```sql
CREATE TABLE audit_logs (
    log_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    admin_id UUID REFERENCES admins(admin_id) ON DELETE SET NULL,
    action VARCHAR(50) NOT NULL CHECK (action IN ('create', 'update', 'delete', 'confirm_booking', 'cancel_booking', 'login', 'logout')),
    entity_type VARCHAR(50) NOT NULL,
    entity_id UUID NOT NULL,
    old_values JSONB,
    new_values JSONB,
    ip_address VARCHAR(45),
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_audit_logs_admin ON audit_logs(admin_id);
CREATE INDEX idx_audit_logs_entity ON audit_logs(entity_type, entity_id);
CREATE INDEX idx_audit_logs_timestamp ON audit_logs(timestamp);
CREATE INDEX idx_audit_logs_action ON audit_logs(action);
```

**Fields:**

- `log_id` - Primary key (UUID)
- `admin_id` - Foreign key to admin who performed the action
- `action` - Action type: 'create', 'update', 'delete', 'confirm_booking', 'cancel_booking', 'login', 'logout'
- `entity_type` - Type of entity affected (e.g., 'package', 'booking', 'agent', 'location')
- `entity_id` - ID of the affected entity
- `old_values` - Previous values (JSON format)
- `new_values` - New values (JSON format)
- `ip_address` - IP address of the admin
- `timestamp` - When the action occurred

---

## 🔗 RELATIONSHIPS

### **One-to-Many:**

- `admins` → `packages` (created_by)
- `admins` → `bookings` (confirmed_by)
- `admins` → `audit_logs` (admin_id)
- `travelers` → `bookings` (traveler_id)
- `agents` → `bookings` (agent_id)
- `packages` → `bookings` (package_id)
- `locations` → `location_images` (location_id)

### **Many-to-Many:**

- `packages` ↔ `locations` (through `package_locations`)

---

## 📈 DATABASE CONSTRAINTS

### **Primary Keys:**

- All tables use UUID as primary key

### **Foreign Keys:**

- Cascade delete: location_images (when location deleted)
- Cascade delete: package_locations (when package deleted)
- Cascade delete: bookings (when traveler deleted, booking also deleted)
- Restrict delete: bookings (cannot delete package if bookings exist)
- Set null: bookings agent_id, confirmed_by (when agent/admin deleted, preserve booking)
- Set null: audit_logs admin_id (preserve audit trail)

### **Check Constraints:**

- `locations.location_type` must be valid type
- `bookings.status` must be valid status
- `bookings.payment_status` must be valid status
- `audit_logs.action` must be valid action

### **Unique Constraints:**

- `admins.email`
- `travelers.email`
- `agents.email`

---

## 🔍 INDEXES

### **Performance Indexes:**

- Email lookups (admins, travelers, agents)
- Status filters (bookings, locations, packages, admins, travelers)
- Foreign key lookups (all relationships)
- Date range queries (bookings)
- Search by name (locations)
- Audit log queries (by admin, entity, timestamp)

---

## 🌱 SEED DATA REQUIREMENTS

### **1. Admin User:**

```sql
INSERT INTO admins (email, password_hash, name, contact)
VALUES ('admin@trustyou-go.com', '[BCRYPT_HASH]', 'Admin User', '+94XXXXXXXXX');
```

### **2. Sample Locations:**

Popular Sri Lankan destinations:

- Sigiriya Rock
- Temple of the Tooth (Kandy)
- Nine Arch Bridge (Ella)
- Galle Fort
- Yala National Park
- Pinnawala Elephant Orphanage
- Nuwara Eliya Tea Plantations
- Mirissa Beach
- Adam's Peak
- Polonnaruwa Ancient City

### **3. Sample Template Packages:**

- 3-Day Cultural Triangle Tour
- 5-Day Hill Country Explorer
- 7-Day Complete Sri Lanka
- 4-Day Beach Relaxation

---

## 🛠️ MIGRATION SCRIPTS

### **Order of Execution:**

1. Create `admins` table
2. Create `travelers` table
3. Create `agents` table
4. Create `locations` table
5. Create `location_images` table
6. Create `packages` table
7. Create `package_locations` table
8. Create `bookings` table
9. Create `audit_logs` table
10. Insert seed data
11. Verify foreign key constraints

---

## 📝 NOTES

### **PostgreSQL & Supabase Specifics:**

- All UUIDs are generated using `gen_random_uuid()` (PostgreSQL 13+, supported by Supabase)
- All timestamps use UTC timezone (`TIMESTAMP WITH TIME ZONE` or `TIMESTAMPTZ`)
- JSONB is used for flexible data storage in audit logs
- Soft deletes via `is_active` flag for: admins, travelers, agents, locations, packages
- Hard deletes for: bookings (with confirmation), images, audit logs (retention policy)
- Password hashing: bcrypt with cost factor 10+ (handled by Supabase Auth)
- Email validation should be done at application level
- Separate tables for admins and travelers for better security and role management
- **Row Level Security (RLS)** policies enforce authorization at database level in Supabase
- Image URLs point to Supabase Storage bucket: `location-images`
- Supabase provides built-in connection pooling (PgBouncer) for optimal performance

### **Booking & Traveler Account Workflow:**

1. When a traveler submits a booking:

   - Create traveler profile with `is_active = false` and auto-generated password
   - Create booking record with `status = 'temporary'` linked to the traveler
   - Traveler cannot login yet (account is inactive)

2. When admin confirms the booking:

   - Update booking `status = 'confirmed'` and set `confirmation_date`
   - Update traveler `is_active = true`
   - Send email to traveler with login credentials and booking details
   - Traveler can now login and access their booking

3. Benefits of this approach:
   - No duplicate traveler data in bookings table
   - Traveler profile already exists for future bookings
   - Single source of truth for traveler information
   - Prevents inactive travelers from accessing the system
   - If booking is cancelled, traveler account can be deleted (cascade delete)

### **Supabase Implementation Notes:**

1. **Authentication Integration:**

   - Admin and traveler accounts should also be created in `auth.users` table (Supabase Auth)
   - Use Supabase Auth for login and JWT token management
   - Link `auth.users.id` with `admins.admin_id` or `travelers.traveler_id`

2. **Row Level Security (RLS) Policies:**

   - Enable RLS on all tables for security
   - Public users: Can SELECT active packages/locations, INSERT temporary bookings
   - Admins: Full access (SELECT, INSERT, UPDATE, DELETE) on all tables
   - Travelers: Can SELECT/UPDATE own profile, SELECT own bookings only

3. **Storage Integration:**

   - Image URLs format: `https://[project-ref].supabase.co/storage/v1/object/public/location-images/locations/[location_id]/[filename]`
   - Store only the storage path in database: `locations/[location_id]/[filename]`
   - Use Supabase Storage API to generate full public URLs

4. **Triggers & Functions:**

   - Create database functions for complex operations (e.g., confirm booking + activate traveler)
   - Use triggers for automatic `updated_at` timestamp updates
   - Implement audit logging via triggers on admin actions

5. **Migration to AWS (Future):**
   - Database schema is PostgreSQL standard - fully portable
   - Image URLs will need updating (Supabase Storage → S3)
   - RLS policies will need conversion to application-level middleware
   - Auth system will need custom JWT implementation

---

**Last Updated:** October 21, 2025  
**Database Version:** PostgreSQL 15+ (Supabase)  
**Backend Architecture:** Supabase (with AWS migration path)  
**Schema Version:** 1.0.0
