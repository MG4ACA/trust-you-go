# Trust You Go - Hybrid Architecture Project Plan

## AWS Amplify + AWS Lambda + Supabase

---

## Executive Summary

This project plan outlines the implementation of a travel booking management system for "Trust You Go" using a **hybrid architecture** that leverages:

- **AWS Amplify** for frontend hosting (existing infrastructure)
- **Supabase** for database, authentication, and storage (80% of operations)
- **AWS Lambda** for complex business logic and API key protection (20% of operations)

**Timeline**: 2-3 weeks  
**Estimated Cost**: $0-25/month (Supabase Free tier → Pro tier)  
**Architecture Benefits**: Fast development, minimal infrastructure, secure API key handling, leverages existing AWS deployment

---

## Architecture Overview

### Traffic Flow

```
┌─────────────────────────────────────────────────────────────┐
│                     AWS Amplify (Frontend)                   │
│                    React + Vite Application                  │
└───────────────┬─────────────────────────┬───────────────────┘
                │                         │
        80% of operations          20% of operations
         (Simple CRUD)           (Complex Business Logic)
                │                         │
                ▼                         ▼
    ┌───────────────────────┐   ┌─────────────────────┐
    │   Supabase Direct     │   │   AWS Lambda        │
    │   (anon key + RLS)    │   │   + API Gateway     │
    └───────────────────────┘   └──────────┬──────────┘
                │                          │
                │                   (service_role key)
                │                          │
                ▼                          ▼
    ┌────────────────────────────────────────────────┐
    │           Supabase PostgreSQL Database         │
    │         + Auth + Storage + Real-time           │
    └────────────────────────────────────────────────┘
                                 │
                                 ▼
                        ┌─────────────────┐
                        │   Resend API    │
                        │  (Email Service)│
                        └─────────────────┘
```

### Operation Distribution

**Direct Supabase Calls (80%)**:

- Package listing and search
- Location browsing
- Gallery image display
- Traveler authentication
- Booking history viewing
- Profile updates
- Real-time notifications

**Lambda Functions (20%)**:

- Booking confirmation workflow (multi-step transaction)
- Email sending (hides Resend API key)
- Report generation (complex queries + PDF)
- Payment processing integration (future)
- Admin operations requiring elevated privileges

---

## Technology Stack

### Frontend Layer

| Component        | Technology            | Purpose                        |
| ---------------- | --------------------- | ------------------------------ |
| Framework        | React 18+             | UI component library           |
| Build Tool       | Vite                  | Fast bundling and dev server   |
| Hosting          | AWS Amplify           | Static site hosting with CI/CD |
| State Management | React Context/Hooks   | Application state              |
| HTTP Client      | @supabase/supabase-js | Supabase SDK                   |
| Routing          | React Router          | Client-side navigation         |

### Backend Layer (Supabase)

| Component      | Technology         | Purpose                         |
| -------------- | ------------------ | ------------------------------- |
| Database       | PostgreSQL 15+     | Primary data store              |
| Authentication | Supabase Auth      | JWT-based auth system           |
| Storage        | Supabase Storage   | Location images (S3-compatible) |
| Real-time      | Supabase Realtime  | WebSocket subscriptions         |
| Auto APIs      | PostgREST          | Auto-generated REST APIs        |
| Security       | Row Level Security | Database-level authorization    |

### Middleware Layer (AWS Lambda)

| Component     | Technology      | Purpose                      |
| ------------- | --------------- | ---------------------------- |
| Runtime       | Node.js 20.x    | Lambda execution environment |
| API Gateway   | AWS API Gateway | HTTP endpoints for Lambda    |
| Email Service | Resend API      | Transactional emails         |
| Monitoring    | CloudWatch      | Lambda logs and metrics      |

### Development Tools

| Tool            | Purpose                       |
| --------------- | ----------------------------- |
| Git             | Version control               |
| VS Code         | Primary IDE                   |
| Postman         | API testing                   |
| Supabase Studio | Database management UI        |
| AWS Console     | Lambda and Amplify management |

---

## Database Schema

### Tables (9 Total)

1. **admins** - System administrators
2. **travelers** - Customers who book packages
3. **agents** - Travel agents (future feature)
4. **locations** - Tourist destinations in Sri Lanka
5. **location_images** - Multiple images per location
6. **packages** - Travel packages
7. **package_locations** - Many-to-many relationship
8. **bookings** - Travel bookings
9. **audit_logs** - System activity tracking

_Detailed schema available in `DATABASE_SCHEMA.md`_

---

## Implementation Phases

### **Phase 1: Supabase Foundation** (Days 1-3)

#### 1.1 Supabase Project Setup

- [ ] Create Supabase account
- [ ] Create new project (Singapore region for Sri Lanka proximity)
- [ ] Save project URL and API keys (anon, service_role)
- [ ] Configure project settings (JWT expiry: 24 hours)

#### 1.2 Database Migration

- [ ] Run SQL migration scripts from `SUPABASE_SETUP_GUIDE.md`
- [ ] Create all 9 tables with proper relationships
- [ ] Add indexes for performance optimization
- [ ] Create triggers (updated_at, audit logging)
- [ ] Verify schema in Supabase Studio

#### 1.3 Row Level Security (RLS)

- [ ] Enable RLS on all tables
- [ ] Implement public read policies (packages, locations)
- [ ] Implement admin full-access policies
- [ ] Implement traveler-specific policies (own bookings only)
- [ ] Test policies with different user roles

#### 1.4 Authentication Configuration

- [ ] Configure email/password authentication
- [ ] Set password requirements (min 8 chars)
- [ ] Enable email confirmations
- [ ] Configure password reset flow
- [ ] Test auth flow end-to-end

#### 1.5 Storage Setup

- [ ] Create "location-images" public bucket
- [ ] Configure MIME types (image/jpeg, image/png)
- [ ] Set file size limit (5MB)
- [ ] Set RLS policies for storage
- [ ] Test image upload/retrieval

#### 1.6 Seed Data

- [ ] Create admin user account
- [ ] Insert sample locations (10-15 destinations)
- [ ] Upload location images to storage
- [ ] Create sample packages (5-10 packages)
- [ ] Link packages to locations
- [ ] Verify data relationships

**Deliverables**: Fully configured Supabase project with database, auth, storage, and sample data

---

### **Phase 2: AWS Lambda Functions** (Days 4-6)

#### 2.1 Lambda Development Environment

- [ ] Set up local Node.js development environment
- [ ] Install dependencies (@supabase/supabase-js, resend)
- [ ] Create project structure for Lambda functions
- [ ] Set up environment variable templates
- [ ] Configure AWS CLI locally

#### 2.2 Confirm Booking Function

**Function**: `confirmBooking`

```javascript
// Input: { bookingId, adminId }
// Output: { success, bookingData, emailSent }
// Logic:
// 1. Verify admin privileges (Supabase query with service_role)
// 2. Update booking status from 'temporary' to 'confirmed'
// 3. Activate associated traveler (is_active = true)
// 4. Log action in audit_logs
// 5. Send confirmation email via Resend
// 6. Return updated booking data
```

**Implementation Tasks**:

- [ ] Create Lambda function code
- [ ] Implement Supabase client with service_role key
- [ ] Add booking status validation
- [ ] Integrate Resend email service
- [ ] Add error handling and logging
- [ ] Write unit tests

#### 2.3 Send Email Function

**Function**: `sendEmail`

```javascript
// Input: { to, subject, html, templateId }
// Output: { success, messageId }
// Logic:
// 1. Validate email parameters
// 2. Call Resend API with API key from env
// 3. Return success/failure status
```

**Implementation Tasks**:

- [ ] Create Lambda function code
- [ ] Integrate Resend SDK
- [ ] Create email templates (booking confirmation, password reset)
- [ ] Add rate limiting logic
- [ ] Add error handling
- [ ] Test with real email addresses

#### 2.4 Generate Report Function (Optional)

**Function**: `generateReport`

```javascript
// Input: { reportType, dateRange, filters }
// Output: { url, filename }
// Logic:
// 1. Query Supabase with complex joins
// 2. Aggregate booking data
// 3. Generate PDF report
// 4. Upload to Supabase Storage
// 5. Return download URL
```

**Implementation Tasks**:

- [ ] Create Lambda function code
- [ ] Implement complex SQL queries
- [ ] Integrate PDF generation library (PDFKit or similar)
- [ ] Add data aggregation logic
- [ ] Test with various date ranges

#### 2.5 Lambda Deployment

- [ ] Package Lambda functions with dependencies
- [ ] Deploy to AWS Lambda
- [ ] Configure environment variables:
  - `SUPABASE_URL`
  - `SUPABASE_SERVICE_ROLE_KEY`
  - `RESEND_API_KEY`
- [ ] Set appropriate timeout (30 seconds)
- [ ] Set memory allocation (256-512 MB)
- [ ] Configure execution role with necessary permissions

#### 2.6 API Gateway Configuration

- [ ] Create REST API in API Gateway
- [ ] Create endpoints:
  - `POST /confirm-booking`
  - `POST /send-email`
  - `POST /generate-report`
- [ ] Enable CORS for Amplify domain
- [ ] Add API key authentication (optional)
- [ ] Deploy API to stage/production
- [ ] Test all endpoints with Postman

**Deliverables**: Deployed Lambda functions with API Gateway endpoints

---

### **Phase 3: Frontend Integration** (Days 7-12)

#### 3.1 Supabase Client Setup

- [ ] Install `@supabase/supabase-js` in React project
- [ ] Create Supabase client singleton (`src/lib/supabaseClient.js`)
- [ ] Configure with anon key for client-side operations
- [ ] Set up environment variables in Amplify

```javascript
// src/lib/supabaseClient.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
```

#### 3.2 Authentication Integration

- [ ] Create Auth context provider
- [ ] Implement login/logout functions
- [ ] Implement registration function
- [ ] Add password reset functionality
- [ ] Create protected route wrapper
- [ ] Store auth state in React Context
- [ ] Handle token refresh automatically

#### 3.3 Service Layer (Direct Supabase Calls)

Create service files for direct database operations:

**`src/services/packageService.js`**:

- [ ] `getAllPackages()` - List all packages with locations
- [ ] `getPackageById(id)` - Get single package details
- [ ] `searchPackages(filters)` - Search with filters

**`src/services/locationService.js`**:

- [ ] `getAllLocations()` - List all locations
- [ ] `getLocationById(id)` - Get location with images
- [ ] `getLocationImages(locationId)` - Get images from storage

**`src/services/bookingService.js`**:

- [ ] `createBooking(data)` - Create temporary booking (calls Supabase)
- [ ] `getTravelerBookings(travelerId)` - Get user's bookings
- [ ] `confirmBooking(bookingId)` - **Calls Lambda function**

**`src/services/travelerService.js`**:

- [ ] `updateProfile(data)` - Update traveler profile
- [ ] `getTravelerById(id)` - Get traveler details

#### 3.4 Lambda Integration Layer

- [ ] Create API client for Lambda endpoints (`src/lib/lambdaClient.js`)
- [ ] Implement `confirmBooking` call to Lambda
- [ ] Implement `sendEmail` call to Lambda
- [ ] Implement `generateReport` call to Lambda
- [ ] Add error handling and retry logic

```javascript
// src/lib/lambdaClient.js
const LAMBDA_API_BASE = import.meta.env.VITE_LAMBDA_API_URL;

export const lambdaClient = {
  confirmBooking: async (bookingId, adminId) => {
    const response = await fetch(`${LAMBDA_API_BASE}/confirm-booking`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ bookingId, adminId }),
    });
    return response.json();
  },
};
```

#### 3.5 Admin Dashboard UI

- [ ] Create admin layout component
- [ ] Build dashboard overview page (stats, recent bookings)
- [ ] Create booking management table
  - [ ] List all bookings with filters
  - [ ] Confirm/cancel booking actions
  - [ ] View traveler details
- [ ] Create package management CRUD
  - [ ] List, create, edit, delete packages
  - [ ] Link packages to locations
- [ ] Create location management CRUD
  - [ ] List, create, edit, delete locations
  - [ ] Upload/manage location images
- [ ] Add audit log viewer
- [ ] Add report generation UI

#### 3.6 Traveler Portal UI

- [ ] Create traveler layout component
- [ ] Build booking form
  - [ ] Package selection
  - [ ] Date picker
  - [ ] Traveler information collection
  - [ ] Submit booking (creates temporary booking)
- [ ] Create booking history page
  - [ ] List user's bookings
  - [ ] View booking status
  - [ ] Download booking confirmation
- [ ] Create profile management page
  - [ ] Update personal information
  - [ ] Change password
  - [ ] View contact details

#### 3.7 Public Pages Enhancement

- [ ] Update Home page with Supabase data
- [ ] Create package listing page with real data
- [ ] Create package detail page with dynamic routing
- [ ] Create location gallery with Supabase Storage images
- [ ] Add search and filter functionality
- [ ] Optimize image loading (lazy loading, thumbnails)

**Deliverables**: Fully integrated frontend with Supabase and Lambda

---

### **Phase 4: Testing & Quality Assurance** (Days 13-15)

#### 4.1 Unit Testing

- [ ] Test Supabase service functions
- [ ] Test Lambda functions locally
- [ ] Test React components with React Testing Library
- [ ] Test authentication flows
- [ ] Achieve >80% code coverage

#### 4.2 Integration Testing

- [ ] Test complete booking workflow (create → confirm → email)
- [ ] Test admin CRUD operations
- [ ] Test traveler portal flows
- [ ] Test RLS policies with different user roles
- [ ] Test Lambda → Supabase → Email integration

#### 4.3 End-to-End Testing

- [ ] Set up Playwright or Cypress
- [ ] Test user registration and login
- [ ] Test booking creation as traveler
- [ ] Test booking confirmation as admin
- [ ] Test package and location management
- [ ] Test on multiple browsers (Chrome, Firefox, Safari)

#### 4.4 Performance Testing

- [ ] Test page load times (<3 seconds)
- [ ] Test Supabase query performance
- [ ] Test Lambda cold start times
- [ ] Optimize slow queries with indexes
- [ ] Implement caching where appropriate
- [ ] Test with realistic data volumes

#### 4.5 Security Testing

- [ ] Verify RLS policies block unauthorized access
- [ ] Test SQL injection prevention
- [ ] Test XSS prevention
- [ ] Verify API keys are not exposed in frontend
- [ ] Test authentication token expiry
- [ ] Verify HTTPS enforcement

#### 4.6 User Acceptance Testing (UAT)

- [ ] Deploy to staging environment
- [ ] Provide test accounts to stakeholders
- [ ] Collect feedback on UI/UX
- [ ] Test real-world scenarios
- [ ] Fix bugs and iterate

**Deliverables**: Tested and validated application ready for production

---

### **Phase 5: Deployment & Launch** (Days 16-18)

#### 5.1 Production Environment Setup

- [ ] Upgrade Supabase to Pro tier (if needed)
- [ ] Configure production database backups
- [ ] Set up custom domain for Amplify
- [ ] Configure SSL certificate
- [ ] Set up production environment variables in Amplify

#### 5.2 Amplify Deployment

- [ ] Connect GitHub repository to Amplify
- [ ] Configure build settings for Vite
- [ ] Set environment variables:
  - `VITE_SUPABASE_URL`
  - `VITE_SUPABASE_ANON_KEY`
  - `VITE_LAMBDA_API_URL`
- [ ] Test build process
- [ ] Deploy to production
- [ ] Verify deployment

#### 5.3 Lambda Production Deployment

- [ ] Create production Lambda functions
- [ ] Configure production environment variables
- [ ] Set up CloudWatch alerts for errors
- [ ] Deploy API Gateway to production stage
- [ ] Test all Lambda endpoints in production

#### 5.4 Monitoring Setup

- [ ] Configure Supabase monitoring dashboard
- [ ] Set up CloudWatch dashboards for Lambda
- [ ] Configure error alerting (email/Slack)
- [ ] Set up uptime monitoring (UptimeRobot or similar)
- [ ] Configure performance monitoring

#### 5.5 Final Testing

- [ ] Test complete workflows in production
- [ ] Verify email delivery
- [ ] Test with real payment (if integrated)
- [ ] Verify analytics tracking
- [ ] Test on mobile devices

#### 5.6 Launch

- [ ] Announce to stakeholders
- [ ] Monitor logs for first 24 hours
- [ ] Address any issues immediately
- [ ] Collect initial user feedback

**Deliverables**: Live production system

---

### **Phase 6: Documentation** (Days 19-21)

#### 6.1 Technical Documentation

- [ ] API documentation for Lambda endpoints
- [ ] Database schema documentation (already exists)
- [ ] Environment variable reference
- [ ] Deployment guide
- [ ] Troubleshooting guide

#### 6.2 User Documentation

- [ ] Admin user guide (booking management)
- [ ] Traveler user guide (how to book)
- [ ] FAQ document
- [ ] Video tutorials (optional)

#### 6.3 Developer Documentation

- [ ] Code architecture overview
- [ ] Component documentation
- [ ] Service layer documentation
- [ ] Contributing guide
- [ ] Local development setup guide

#### 6.4 Operations Documentation

- [ ] Backup and recovery procedures
- [ ] Scaling guidelines
- [ ] Security best practices
- [ ] Monitoring and alerting guide
- [ ] Incident response plan

**Deliverables**: Complete documentation set

---

### **Phase 7: Post-Launch** (Ongoing)

#### 7.1 Monitoring & Maintenance

- [ ] Daily monitoring of error logs
- [ ] Weekly performance reviews
- [ ] Monthly security audits
- [ ] Quarterly dependency updates
- [ ] Database backup verification

#### 7.2 Feature Enhancements

- [ ] Collect user feedback
- [ ] Prioritize feature requests
- [ ] Plan next sprint
- [ ] Implement high-priority features

**Potential Future Features**:

- Payment gateway integration (Stripe/PayPal)
- Multi-currency support
- Advanced search with filters
- Customer reviews and ratings
- Agent portal for travel agents
- Mobile app (React Native)
- Multi-language support
- Loyalty program

#### 7.3 Scaling Considerations

**When to scale** (500-1000+ concurrent users):

- Migrate from Supabase Free to Pro tier ($25/month)
- Enable connection pooling (PgBouncer)
- Add CDN for static assets (CloudFront)
- Optimize database indexes
- Consider read replicas for reporting

**When to migrate to full AWS** (5000+ users):

- Move database to AWS RDS
- Add API Gateway caching
- Implement Lambda reserved concurrency
- Set up multi-region deployment
- Add load balancing

---

## Cost Breakdown

### Development Phase (One-time)

| Item                       | Cost     |
| -------------------------- | -------- |
| Developer time (2-3 weeks) | Variable |
| Supabase Free tier         | $0       |
| AWS Lambda Free tier       | $0       |
| Domain name (optional)     | $12/year |
| **Total**                  | ~$0-12   |

### Production Phase (Monthly)

| Service     | Free Tier                            | Low Usage      | Medium Usage     |
| ----------- | ------------------------------------ | -------------- | ---------------- |
| Supabase    | 500MB DB, 1GB storage, 2GB bandwidth | $0             | $25 (Pro tier)   |
| AWS Lambda  | 1M requests, 400K GB-seconds         | $0             | $0-5             |
| AWS Amplify | 1000 build minutes, 15GB served      | $0             | $0-10            |
| Resend      | 3000 emails/month                    | $0             | $20 (if >3000)   |
| **Total**   | **$0/month**                         | **$0-5/month** | **$25-60/month** |

---

## Risk Management

### Technical Risks

| Risk                      | Impact | Probability | Mitigation                                                    |
| ------------------------- | ------ | ----------- | ------------------------------------------------------------- |
| Supabase outage           | High   | Low         | Implement error handling, use status page monitoring          |
| Lambda cold starts        | Medium | Medium      | Implement Lambda warming or use provisioned concurrency       |
| RLS policy bugs           | High   | Medium      | Thorough testing, code review, staging environment            |
| API key exposure          | High   | Low         | Store keys in Lambda environment variables, never in frontend |
| Database migration issues | High   | Low         | Test migrations in staging, have rollback plan                |

### Business Risks

| Risk            | Impact | Probability | Mitigation                                        |
| --------------- | ------ | ----------- | ------------------------------------------------- |
| Scope creep     | Medium | High        | Strict scope definition, phased approach          |
| Timeline delays | Medium | Medium      | Buffer time in estimates, prioritize MVP features |
| Cost overruns   | Low    | Low         | Monitoring dashboards, usage alerts               |
| User adoption   | High   | Medium      | User testing, feedback loops, marketing           |

---

## Success Metrics

### Technical KPIs

- Page load time: <3 seconds
- API response time: <500ms (p95)
- Uptime: >99.5%
- Error rate: <1%
- Test coverage: >80%

### Business KPIs

- Booking conversion rate: >5%
- User registration: 50+ in first month
- Booking volume: 20+ in first month
- Customer satisfaction: >4.0/5.0
- Admin time saved: 50% reduction vs manual process

---

## Migration Path to Full AWS

If the system grows beyond Supabase capacity (>5000 users), here's the migration path:

### Step 1: Database Migration

- Export PostgreSQL data from Supabase
- Create AWS RDS PostgreSQL instance
- Import data to RDS
- Update Lambda environment variables

### Step 2: Authentication Migration

- Migrate to AWS Cognito
- Update frontend auth code
- Migrate user credentials

### Step 3: Storage Migration

- Migrate images from Supabase Storage to AWS S3
- Update image URLs in database
- Configure CloudFront CDN

### Step 4: API Migration

- Keep Lambda functions (no changes needed)
- Update connection strings to RDS
- Remove Supabase client library

**Estimated Migration Time**: 1-2 weeks  
**Estimated Cost**: $50-100/month (RDS + S3 + Cognito)

---

## Team Structure

### Phase 1-3 (Development)

- **Full-stack Developer**: Database, backend, frontend integration
- **UI/UX Designer** (optional): Design improvements

### Phase 4-5 (Testing & Deployment)

- **Full-stack Developer**: Lead development and deployment
- **QA Tester** (optional): Testing and bug reporting

### Phase 6-7 (Documentation & Maintenance)

- **Technical Writer** (optional): Documentation
- **DevOps Engineer** (optional): Monitoring and scaling

---

## Development Best Practices

### Code Quality

- Use ESLint and Prettier for code formatting
- Write meaningful commit messages
- Follow React best practices (hooks, component composition)
- Use TypeScript for type safety (optional but recommended)
- Implement error boundaries in React

### Security

- Never commit API keys to Git
- Use environment variables for all secrets
- Implement CSRF protection
- Sanitize user inputs
- Use HTTPS everywhere
- Regular dependency updates

### Performance

- Implement code splitting in React
- Use lazy loading for images
- Minimize bundle size
- Cache Supabase queries where appropriate
- Optimize database queries with indexes

### Testing

- Write tests alongside code
- Test RLS policies thoroughly
- Test edge cases and error scenarios
- Automate testing in CI/CD pipeline

---

## Appendix

### Useful Resources

- [Supabase Documentation](https://supabase.com/docs)
- [AWS Lambda Documentation](https://docs.aws.amazon.com/lambda/)
- [AWS Amplify Documentation](https://docs.amplify.aws/)
- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)
- [Resend API Documentation](https://resend.com/docs)

### Related Documentation

- `DATABASE_SCHEMA.md` - Complete database schema
- `SYSTEM_REQUIREMENTS.md` - Functional and non-functional requirements
- `SUPABASE_SETUP_GUIDE.md` - Step-by-step Supabase setup

### Repository Structure

```
trust-you-go/
├── src/
│   ├── components/        # React components
│   ├── contexts/          # React contexts (Auth, Language)
│   ├── services/          # Supabase service layer
│   ├── lib/              # Supabase and Lambda clients
│   ├── pages/            # Page components
│   └── utils/            # Utility functions
├── public/               # Static assets
├── lambda/               # Lambda function code
│   ├── confirmBooking/
│   ├── sendEmail/
│   └── generateReport/
├── docs/                 # Documentation
└── tests/               # Test files
```

---

## Version History

| Version | Date       | Changes                          | Author       |
| ------- | ---------- | -------------------------------- | ------------ |
| 1.0     | 2025-10-21 | Initial hybrid architecture plan | AI Assistant |

---

**Next Steps**: Begin Phase 1 - Supabase Foundation Setup
