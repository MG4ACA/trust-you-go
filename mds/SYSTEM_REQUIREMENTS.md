# System Requirements - Trust You Go Travel Booking Management System

## 📋 Document Information

- **Project**: Trust You Go Travel Booking Management System
- **Version**: 1.0
- **Last Updated**: October 21, 2025
- **Status**: Planning Phase

---

## 1. FUNCTIONAL REQUIREMENTS

### 1.1 User Management

#### 1.1.1 Admin Management

- **FR-1.1.1**: System shall allow super admins to create new admin accounts with email, name, and password
- **FR-1.1.2**: System shall hash admin passwords using bcrypt with cost factor 10+
- **FR-1.1.3**: System shall allow admins to login with email and password
- **FR-1.1.4**: System shall generate JWT tokens for authenticated admin sessions
- **FR-1.1.5**: System shall allow admins to update their profile information
- **FR-1.1.6**: System shall allow admins to change their password
- **FR-1.1.7**: System shall allow super admins to deactivate admin accounts (soft delete via is_active flag)
- **FR-1.1.8**: System shall maintain audit logs for all admin actions

#### 1.1.2 Traveler Management

- **FR-1.2.1**: System shall automatically create traveler accounts when bookings are submitted (is_active = false)
- **FR-1.2.2**: System shall generate random passwords for new traveler accounts
- **FR-1.2.3**: System shall activate traveler accounts (is_active = true) when bookings are confirmed
- **FR-1.2.4**: System shall send email with login credentials when traveler account is activated
- **FR-1.2.5**: System shall allow travelers to login with email and password
- **FR-1.2.6**: System shall prevent inactive travelers from logging in
- **FR-1.2.7**: System shall allow travelers to update their profile information
- **FR-1.2.8**: System shall allow travelers to change their password
- **FR-1.2.9**: System shall allow travelers to reset their password via email link

#### 1.1.3 Agent Management (Passive)

- **FR-1.3.1**: System shall allow admins to create agent records with name and contact information
- **FR-1.3.2**: System shall allow admins to update agent information
- **FR-1.3.3**: System shall allow admins to deactivate agents (soft delete)
- **FR-1.3.4**: System shall associate bookings with agents for commission tracking
- **FR-1.3.5**: Agents shall not have login access (admin-managed only)

### 1.2 Location Management

#### 1.2.1 Location CRUD Operations

- **FR-2.1.1**: System shall allow admins to create new locations with name, description, and location details
- **FR-2.1.2**: System shall allow admins to update location information
- **FR-2.1.3**: System shall allow admins to deactivate locations (soft delete)
- **FR-2.1.4**: System shall display active locations to all users
- **FR-2.1.5**: System shall support multiple images per location

#### 1.2.2 Location Images

- **FR-2.2.1**: System shall allow admins to upload images for locations
- **FR-2.2.2**: System shall store images in Supabase Storage with organized folder structure (locations/{location_id}/)
- **FR-2.2.3**: System shall generate and store public URLs for uploaded images
- **FR-2.2.4**: System shall allow admins to set image display order via sequence number
- **FR-2.2.5**: System shall allow admins to delete location images
- **FR-2.2.6**: System shall automatically delete storage files when image records are deleted

### 1.3 Package Management

#### 1.3.1 Package CRUD Operations

- **FR-3.1.1**: System shall allow admins to create travel packages with name, description, duration, and price
- **FR-3.1.2**: System shall allow admins to update package information
- **FR-3.1.3**: System shall allow admins to deactivate packages (soft delete)
- **FR-3.1.4**: System shall display active packages to travelers
- **FR-3.1.5**: System shall support package types: "template" (pre-created) and "custom" (per traveler)

#### 1.3.2 Package-Location Association

- **FR-3.2.1**: System shall allow admins to associate multiple locations with a package
- **FR-3.2.2**: System shall allow admins to set location sequence/day within a package
- **FR-3.2.3**: System shall allow admins to specify accommodation details for each location in package
- **FR-3.2.4**: System shall display package itinerary with locations in order

### 1.4 Booking Management

#### 1.4.1 Booking Creation & Workflow

- **FR-4.1.1**: System shall allow public users to submit booking requests with traveler details
- **FR-4.1.2**: System shall create temporary bookings with status "temporary"
- **FR-4.1.3**: System shall automatically create inactive traveler account on booking submission
- **FR-4.1.4**: System shall allow admins to view all bookings (temporary, confirmed, cancelled, completed)
- **FR-4.1.5**: System shall allow admins to confirm bookings (change status to "confirmed")
- **FR-4.1.6**: System shall activate traveler account when booking is confirmed
- **FR-4.1.7**: System shall send confirmation email with booking details and login credentials
- **FR-4.1.8**: System shall allow admins to cancel bookings
- **FR-4.1.9**: System shall allow admins to mark bookings as completed
- **FR-4.1.10**: System shall automatically cascade delete traveler if their only booking is deleted

#### 1.4.2 Booking Details

- **FR-4.2.1**: System shall store booking date, travel dates, number of travelers, and special requests
- **FR-4.2.2**: System shall associate bookings with packages
- **FR-4.2.3**: System shall associate bookings with agents (optional)
- **FR-4.2.4**: System shall store confirmation date when booking is confirmed
- **FR-4.2.5**: System shall allow admins to add notes to bookings

#### 1.4.3 Booking Views

- **FR-4.3.1**: System shall allow travelers to view their own bookings only
- **FR-4.3.2**: System shall allow travelers to view booking status and details
- **FR-4.3.3**: System shall allow travelers to view package itinerary
- **FR-4.3.4**: System shall allow admins to filter bookings by status, date range, traveler, or agent

### 1.5 Audit & Reporting

#### 1.5.1 Audit Logging

- **FR-5.1.1**: System shall log all admin actions (create, update, delete) with timestamp
- **FR-5.1.2**: System shall store old and new values for update operations in JSONB format
- **FR-5.1.3**: System shall associate audit logs with admin user who performed action
- **FR-5.1.4**: System shall allow admins to view audit logs
- **FR-5.1.5**: System shall allow filtering audit logs by entity type, action, admin, or date range

#### 1.5.2 Reporting (Future Enhancement)

- **FR-5.2.1**: System should generate booking reports by date range
- **FR-5.2.2**: System should generate revenue reports
- **FR-5.2.3**: System should generate agent commission reports
- **FR-5.2.4**: System should generate popular destinations report

---

## 2. NON-FUNCTIONAL REQUIREMENTS

### 2.1 Performance

- **NFR-2.1.1**: API endpoints shall respond within 2 seconds under normal load (95th percentile)
- **NFR-2.1.2**: Database queries shall be optimized with appropriate indexes
- **NFR-2.1.3**: Image loading shall be optimized with lazy loading and CDN delivery
- **NFR-2.1.4**: System shall support at least 100 concurrent users
- **NFR-2.1.5**: Supabase serverless functions shall execute within reasonable time limits
- **NFR-2.1.6**: Database connection pooling shall be managed by Supabase (PgBouncer)

### 2.2 Security

- **NFR-2.2.1**: All passwords shall be hashed using bcrypt with minimum cost factor of 10 (Supabase Auth handles this)
- **NFR-2.2.2**: JWT tokens shall expire after 24 hours
- **NFR-2.2.3**: All API endpoints shall use HTTPS encryption
- **NFR-2.2.4**: Sensitive data (passwords, tokens) shall never be logged
- **NFR-2.2.5**: Database credentials shall be managed securely by Supabase
- **NFR-2.2.6**: SQL injection prevention shall be implemented via parameterized queries and Row Level Security (RLS)
- **NFR-2.2.7**: CORS shall be configured to allow only trusted domains
- **NFR-2.2.8**: Rate limiting shall be implemented on authentication endpoints (5 attempts per 15 minutes)
- **NFR-2.2.9**: Inactive traveler accounts shall not be able to authenticate (enforced by RLS policies)
- **NFR-2.2.10**: Admin and traveler authentication shall use separate RLS policies for authorization

### 2.3 Reliability & Availability

- **NFR-2.3.1**: System shall have 99.5% uptime (excluding planned maintenance)
- **NFR-2.3.2**: Database shall have automated daily backups with 30-day retention (Supabase Pro plan)
- **NFR-2.3.3**: System shall implement error handling and graceful degradation
- **NFR-2.3.4**: Critical errors shall be logged with monitoring and alerts
- **NFR-2.3.5**: Custom API functions shall have retry logic for transient failures
- **NFR-2.3.6**: Database shall support Point-in-Time Recovery (PITR) for disaster recovery (Supabase Pro plan)

### 2.4 Scalability

- **NFR-2.4.1**: System architecture shall support horizontal scaling via serverless architecture
- **NFR-2.4.2**: Database shall support vertical scaling for increased load (Supabase compute add-ons)
- **NFR-2.4.3**: Supabase Storage shall handle unlimited image storage with CDN delivery
- **NFR-2.4.4**: API Gateway shall handle traffic spikes with built-in rate limiting
- **NFR-2.4.5**: System shall support adding new locations and packages without code changes

### 2.5 Maintainability

- **NFR-2.5.1**: Code shall follow consistent naming conventions and style guidelines
- **NFR-2.5.2**: All API endpoints shall be documented with request/response examples
- **NFR-2.5.3**: Database schema shall be version controlled with migration scripts
- **NFR-2.5.4**: All custom API functions shall have descriptive names and comments
- **NFR-2.5.5**: Environment variables shall be used for configuration (no hard-coded values)
- **NFR-2.5.6**: Git repository shall follow branching strategy (main, dev, feature branches)
- **NFR-2.5.7**: Code reviews shall be required before merging to main branch

### 2.6 Usability

- **NFR-2.6.1**: Admin dashboard shall be intuitive with minimal training required
- **NFR-2.6.2**: Error messages shall be user-friendly and actionable
- **NFR-2.6.3**: Forms shall have client-side validation with clear error indicators
- **NFR-2.6.4**: Traveler portal shall be responsive and mobile-friendly
- **NFR-2.6.5**: Confirmation emails shall be clear with all necessary booking details
- **NFR-2.6.6**: System shall support multi-language interface (English, Japanese, Tamil) - existing website feature

### 2.7 Data Integrity

- **NFR-2.7.1**: Database shall enforce foreign key constraints
- **NFR-2.7.2**: Database shall enforce NOT NULL constraints on required fields
- **NFR-2.7.3**: Email addresses shall be validated and unique within user types
- **NFR-2.7.4**: UUIDs shall be used for all primary keys
- **NFR-2.7.5**: Soft deletes shall be implemented for user and content tables
- **NFR-2.7.6**: Cascade deletes shall be configured for parent-child relationships (bookings-travelers)
- **NFR-2.7.7**: Database transactions shall be used for multi-table operations

### 2.8 Compliance & Standards

- **NFR-2.8.1**: System shall comply with GDPR data protection requirements (traveler data handling)
- **NFR-2.8.2**: System shall provide ability to export traveler data on request
- **NFR-2.8.3**: System shall provide ability to delete traveler data on request
- **NFR-2.8.4**: Audit logs shall be retained for minimum 1 year for compliance
- **NFR-2.8.5**: API shall follow REST architectural principles
- **NFR-2.8.6**: Date/time shall be stored in UTC format
- **NFR-2.8.7**: Currency amounts shall use appropriate decimal precision (2 decimal places)

### 2.9 Monitoring & Logging

- **NFR-2.9.1**: All custom API functions shall implement comprehensive logging
- **NFR-2.9.2**: System shall track API response times and error rates via Supabase Analytics
- **NFR-2.9.3**: Monitoring alerts shall be configured for critical errors
- **NFR-2.9.4**: Database performance metrics shall be monitored via Supabase Dashboard
- **NFR-2.9.5**: Failed email delivery attempts shall be logged and retried
- **NFR-2.9.6**: Storage upload/delete operations shall be logged

### 2.10 Disaster Recovery

- **NFR-2.10.1**: Database backups shall be tested quarterly
- **NFR-2.10.2**: Recovery Time Objective (RTO) shall be < 4 hours
- **NFR-2.10.3**: Recovery Point Objective (RPO) shall be < 24 hours
- **NFR-2.10.4**: Backup data shall be stored in separate AWS region
- **NFR-2.10.5**: Disaster recovery procedures shall be documented

---

## 3. SYSTEM CONSTRAINTS

### 3.1 Technical Constraints

- **TC-3.1.1**: Backend must use Supabase (PostgreSQL database, Auth, Storage, REST APIs)
- **TC-3.1.2**: Database must be PostgreSQL 15+ (provided by Supabase)
- **TC-3.1.3**: Frontend must integrate with existing React + Vite application
- **TC-3.1.4**: Image storage must use Supabase Storage (S3-compatible)
- **TC-3.1.5**: API must use Supabase auto-generated REST API + custom endpoints
- **TC-3.1.6**: Custom API server: Node.js 18.x/TypeScript OR Python 3.11/FastAPI
- **TC-3.1.7**: Row Level Security (RLS) policies must be implemented for all tables

### 3.2 Business Constraints

- **BC-3.2.1**: System must be completed within 2-3 weeks (faster with Supabase)
- **BC-3.2.2**: Project must minimize costs (use Supabase Free tier initially, Pro tier $25/month)
- **BC-3.2.3**: Agents are passive (no login) - admin managed only
- **BC-3.2.4**: Travelers cannot self-register - accounts created via bookings only
- **BC-3.2.5**: Initial deployment for single company (Trust You Go)
- **BC-3.2.6**: Consider migration to AWS when reaching 500-1000+ active users for cost optimization

### 3.3 Operational Constraints

- **OC-3.3.1**: System must work with existing Trust You Go website (trustyou-go.com)
- **OC-3.3.2**: Initial admin user must be created via database seed script
- **OC-3.3.3**: Email service integration (Resend, SendGrid, or Supabase Edge Functions) to be added in Phase 2
- **OC-3.3.4**: Payment gateway integration deferred to future phase
- **OC-3.3.5**: Multi-tenancy not required (single organization)

---

## 4. USER STORIES

### 4.1 Admin User Stories

**As an Admin, I want to:**

1. Login securely to access the admin dashboard
2. Create and manage travel packages with itineraries
3. Add and manage locations with multiple images
4. View all booking requests in one place
5. Confirm booking requests and activate traveler accounts
6. Send automatic confirmation emails to travelers
7. Track agent commissions for bookings
8. View audit logs to see who made what changes
9. Deactivate inappropriate content or users
10. Generate reports on bookings and revenue

### 4.2 Traveler User Stories

**As a Traveler, I want to:**

1. Submit a booking request with my travel details
2. Receive email confirmation when my booking is confirmed
3. Login to view my booking status and details
4. View my package itinerary with locations and accommodations
5. Update my profile information (name, phone, address)
6. Change my password for security
7. Reset my password if I forget it
8. View images of locations in my package
9. See special offers or discounts (future)
10. Provide feedback after trip completion (future)

### 4.3 Public User Stories

**As a Website Visitor, I want to:**

1. Browse available travel packages without logging in
2. View location images and descriptions
3. Submit a booking request with my details
4. Receive immediate confirmation that my request was received
5. Contact the company with questions

---

## 5. ACCEPTANCE CRITERIA

### 5.1 Booking Workflow Acceptance Criteria

**Given** a public user submits a booking request  
**When** the form is submitted successfully  
**Then:**

- A traveler account is created with `is_active = false`
- A booking record is created with `status = 'temporary'`
- Traveler cannot login yet
- Admin receives notification of new booking

**Given** an admin confirms a temporary booking  
**When** the confirmation action is completed  
**Then:**

- Booking status changes to "confirmed"
- Traveler `is_active` is set to `true`
- Confirmation email is sent to traveler with credentials
- Traveler can now login and view booking

### 5.2 Authentication Acceptance Criteria

**Given** a traveler with inactive account tries to login  
**When** they submit correct credentials  
**Then:**

- Authentication fails with message "Account not activated"
- No JWT token is issued

**Given** an admin with valid credentials logs in  
**When** authentication is successful  
**Then:**

- JWT token is issued with 24-hour expiry
- Token includes admin_id and role information
- Token can be used to access protected endpoints

### 5.3 Data Integrity Acceptance Criteria

**Given** a traveler account is deleted  
**When** the delete operation is executed  
**Then:**

- All associated bookings are also deleted (CASCADE)
- All audit logs referencing the traveler remain intact
- S3 images are not affected (location images are shared)

---

## 6. ASSUMPTIONS

1. Travelers will have valid email addresses for account activation
2. Admins will manually confirm bookings (no automatic confirmation)
3. Initial phase will use email notifications via third-party service (Resend/SendGrid)
4. Payment processing will be handled offline (not in system initially)
5. All prices are in single currency (USD or LKR - to be configured)
6. System will primarily be used during business hours (9 AM - 6 PM Sri Lanka time)
7. Image uploads will be limited to 5MB per file
8. Package images will be sourced from associated location images
9. Mobile app development is not included in initial scope
10. Third-party integrations (payment, maps) deferred to future phases
11. Supabase Free tier sufficient for development and initial testing
12. Supabase Pro tier ($25/month) sufficient for production launch (up to 500 users)

---

## 7. DEPENDENCIES

### 7.1 External Dependencies

- Supabase account and project (Free or Pro tier)
- Domain name and SSL certificate for custom domain (optional)
- Email service provider (Resend, SendGrid, or Mailgun)
- PostgreSQL 15+ compatible hosting (provided by Supabase)
- Image storage with CDN (provided by Supabase Storage)
- Hosting platform for custom APIs (Vercel, Railway, Render, or DigitalOcean)

### 7.2 Internal Dependencies

- Existing React + Vite frontend application
- Trust You Go website hosting infrastructure
- Admin access to domain DNS settings (if using custom domain)
- Initial seed data (locations, packages, admin user)

---

## 8. FUTURE ENHANCEMENTS

### 8.1 Short-term (3-6 months)

- Payment gateway integration (Stripe/PayPal)
- Automated email notifications via Supabase Edge Functions
- Advanced reporting and analytics dashboard
- Traveler reviews and ratings system
- Real-time booking status updates (Supabase Realtime)
- Push notifications for booking updates

### 8.2 Long-term (6-12 months)

- Mobile applications (iOS/Android with Supabase SDKs)
- Multi-language support for traveler portal
- Integration with booking.com, Airbnb APIs
- Real-time chat support
- Agent self-service portal with login
- Dynamic pricing based on season/demand
- Integration with Google Maps for location visualization
- Social media integration for reviews
- **Migration to AWS infrastructure** (when user base reaches 500-1000+ for cost optimization)

---

## 9. RISKS & MITIGATION

| Risk                       | Impact   | Probability | Mitigation Strategy                                                             |
| -------------------------- | -------- | ----------- | ------------------------------------------------------------------------------- |
| AWS cost overruns          | High     | Medium      | Implement cost monitoring alerts, use Lambda provisioned concurrency sparingly  |
| Data loss                  | Critical | Low         | Daily automated backups, test recovery procedures                               |
| Security breach            | Critical | Low         | Regular security audits, follow AWS best practices, penetration testing         |
| Poor performance at scale  | Medium   | Medium      | Load testing before launch, optimize queries, implement caching                 |
| Email delivery failures    | Medium   | Medium      | Implement retry logic, use reputable email service (SES), monitor bounce rates  |
| Lambda cold starts         | Low      | High        | Accept initial latency, consider provisioned concurrency for critical functions |
| Database connection limits | Medium   | Medium      | Implement connection pooling, monitor concurrent connections                    |
| S3 storage costs           | Low      | Low         | Implement image compression, set lifecycle policies for old images              |

---

## 10. SUCCESS METRICS

### 10.1 Technical Metrics

- API uptime: > 99.5% (Supabase SLA)
- Average API response time: < 2 seconds
- Error rate: < 1%
- Database query performance: < 500ms for 95% of queries
- Row Level Security policy evaluation: < 100ms

### 10.2 Business Metrics

- Booking confirmation time: < 24 hours (admin SLA)
- User satisfaction: > 4/5 rating
- System adoption: 80% of bookings processed through system within 3 months
- Reduction in manual work: 50% decrease in admin time per booking
- Time to market: Launch in 2-3 weeks instead of 6-8 weeks

### 10.3 User Metrics

- Traveler login success rate: > 95%
- Booking form completion rate: > 80%
- Email delivery rate: > 99%
- Mobile responsive satisfaction: > 90%

---

**Document Owner**: Development Team  
**Review Cycle**: Quarterly or as needed  
**Next Review Date**: January 2026
