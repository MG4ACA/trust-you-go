# Admin Portal MVP - Development Plan

**Project**: Trust You Go - Admin Portal  
**Start Date**: October 21, 2025  
**Target Completion**: 3-4 days (19 hours total)  
**Technology Stack**: React + Vite + PrimeReact + JSON Server

---

## 📋 Overview

Building a complete admin portal with authentication and agent management functionality. This is completely separate from the existing SPA and will be merged later.

### Features

- ✅ Admin Login & Authentication
- ✅ Admin Account Creation
- ✅ Agent CRUD Operations
- ✅ Dashboard with Statistics
- ✅ Protected Routes

### Tech Stack

| Component        | Technology      | Purpose                |
| ---------------- | --------------- | ---------------------- |
| Frontend         | React 18 + Vite | UI Framework           |
| UI Library       | PrimeReact      | Component Library      |
| Mock Backend     | JSON Server     | Simulates Supabase API |
| HTTP Client      | Axios           | API Requests           |
| Routing          | React Router    | Navigation             |
| State Management | React Context   | Auth State             |

---

## 📊 Progress Tracker

**Overall Progress**: 0/16 tasks completed (0%)

**Time Spent**: 0 hours / 19 hours estimated

---

## ✅ Task Checklist

### Phase 1: Foundation Setup (2.5 hours)

#### ⬜ Task 1: Setup Mock Server with JSON Server

**Status**: Not Started  
**Estimated Time**: 1 hour  
**Actual Time**: **_ hours  
**Date Completed**: _**

**Description**: Install and configure json-server for mock backend. Create db.json with mock data for admins, agents, packages, locations, bookings.

**Steps**:

- [ ] Install json-server: `npm install -D json-server`
- [ ] Create `mock-db.json` in project root
- [ ] Add sample data (3 admins, 5 agents, test data)
- [ ] Add npm script: `"mock-server": "json-server --watch mock-db.json --port 3001"`
- [ ] Test server: `npm run mock-server`
- [ ] Verify endpoints: http://localhost:3001/admins, /agents

**Deliverable**: Running JSON Server on port 3001 with mock data

**Notes**:

```
Mock endpoints available:
GET    /admins
POST   /admins
GET    /admins/:id
PUT    /admins/:id
DELETE /admins/:id
(Same for /agents, /packages, /locations, /bookings)
```

---

#### ⬜ Task 2: Install PrimeReact and Dependencies

**Status**: Not Started  
**Estimated Time**: 30 minutes  
**Actual Time**: **_ hours  
**Date Completed**: _**

**Description**: Install primereact, primeicons, primeflex. Configure PrimeReact theme in main.jsx.

**Steps**:

- [ ] Install PrimeReact: `npm install primereact primeicons primeflex`
- [ ] Import theme CSS in main.jsx (lara-light-blue)
- [ ] Import primeicons CSS
- [ ] Import primeflex CSS for utilities
- [ ] Test by adding a Button component to verify setup

**Deliverable**: PrimeReact installed and themed

**Notes**:

```javascript
// main.jsx imports
import 'primereact/resources/themes/lara-light-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
```

---

#### ⬜ Task 3: Create Admin Folder Structure

**Status**: Not Started  
**Estimated Time**: 15 minutes  
**Actual Time**: **_ hours  
**Date Completed**: _**

**Description**: Create new folder structure to keep admin portal completely separate from existing SPA.

**Steps**:

- [ ] Create `src/admin/` directory
- [ ] Create `src/admin/pages/` (Login, Dashboard, Agents, CreateAdmin)
- [ ] Create `src/admin/components/` (reusable components)
- [ ] Create `src/admin/services/` (API service layer)
- [ ] Create `src/admin/context/` (Auth context)
- [ ] Create `src/admin/layouts/` (AdminLayout with sidebar)
- [ ] Create README.md in admin folder documenting structure

**Deliverable**: Complete folder structure

**Folder Structure**:

```
src/admin/
├── pages/
│   ├── Login.jsx
│   ├── Dashboard.jsx
│   ├── Agents.jsx
│   └── CreateAdmin.jsx
├── components/
│   ├── Sidebar.jsx
│   ├── Header.jsx
│   └── PrivateRoute.jsx
├── services/
│   ├── api.js
│   ├── authService.js
│   └── agentService.js
├── context/
│   └── AdminAuthContext.jsx
└── layouts/
    └── AdminLayout.jsx
```

---

### Phase 2: Routing & API Setup (1.75 hours)

#### ⬜ Task 4: Setup Admin Routing

**Status**: Not Started  
**Estimated Time**: 1 hour  
**Actual Time**: **_ hours  
**Date Completed**: _**

**Description**: Configure React Router with admin routes. Create AdminLayout with sidebar navigation.

**Steps**:

- [ ] Install react-router-dom (if not installed): `npm install react-router-dom`
- [ ] Update App.jsx with admin routes
- [ ] Create AdminLayout with PrimeReact Sidebar/Menu
- [ ] Add navigation items (Dashboard, Agents, Create Admin, Logout)
- [ ] Add header with user info
- [ ] Test navigation between routes

**Deliverable**: Working admin routes with layout

**Routes**:

```
/admin/login          - Login page (public)
/admin/dashboard      - Dashboard (protected)
/admin/agents         - Agent list (protected)
/admin/create-admin   - Create admin (protected)
```

---

#### ⬜ Task 5: Create Mock API Service Layer

**Status**: Not Started  
**Estimated Time**: 45 minutes  
**Actual Time**: **_ hours  
**Date Completed**: _**

**Description**: Create API service layer with axios for communicating with JSON Server.

**Steps**:

- [ ] Install axios: `npm install axios`
- [ ] Create `api.js` with axios instance (baseURL: http://localhost:3001)
- [ ] Create `authService.js` (login, logout, getCurrentUser)
- [ ] Create `agentService.js` (getAll, getById, create, update, delete)
- [ ] Add error interceptors
- [ ] Test API calls in browser console

**Deliverable**: Complete API service layer

**Services**:

```javascript
// authService.js
-login(username, password) -
  logout() -
  getCurrentUser() -
  isAuthenticated() -
  // agentService.js
  getAllAgents() -
  getAgentById(id) -
  createAgent(data) -
  updateAgent(id, data) -
  deleteAgent(id);
```

---

### Phase 3: Authentication (2.5 hours)

#### ⬜ Task 6: Build Admin Login Page

**Status**: Not Started  
**Estimated Time**: 1.5 hours  
**Actual Time**: **_ hours  
**Date Completed**: _**

**Description**: Create login page with PrimeReact components and mock authentication.

**Steps**:

- [ ] Create Login.jsx with PrimeReact Card
- [ ] Add InputText for username
- [ ] Add Password component for password
- [ ] Add Button for login
- [ ] Add Toast for notifications
- [ ] Implement login logic (call authService)
- [ ] Store token in localStorage
- [ ] Redirect to dashboard on success
- [ ] Show error message on failure
- [ ] Add form validation

**Deliverable**: Working login page

**Test Credentials**:

```
Username: admin@trustyougo.com
Password: admin123
```

---

#### ⬜ Task 7: Implement Auth Context and Protected Routes

**Status**: Not Started  
**Estimated Time**: 1 hour  
**Actual Time**: **_ hours  
**Date Completed**: _**

**Description**: Create authentication context and protect routes.

**Steps**:

- [ ] Create AdminAuthContext.jsx
- [ ] Implement useAuth hook
- [ ] Create PrivateRoute component
- [ ] Wrap admin routes with PrivateRoute
- [ ] Implement logout functionality
- [ ] Handle token expiration
- [ ] Test protected route access

**Deliverable**: Protected routes with auth context

**Features**:

- Auto-redirect to login if not authenticated
- Persist auth state on page refresh
- Logout clears auth state and redirects

---

### Phase 4: Dashboard (1 hour)

#### ⬜ Task 8: Build Admin Dashboard Page

**Status**: Not Started  
**Estimated Time**: 1 hour  
**Actual Time**: **_ hours  
**Date Completed**: _**

**Description**: Create dashboard with stats and quick actions.

**Steps**:

- [ ] Create Dashboard.jsx
- [ ] Add PrimeReact Card components for stats
- [ ] Display: Total Agents, Total Bookings, Total Packages
- [ ] Add welcome message with admin name
- [ ] Add quick action buttons (View Agents, Create Agent, etc.)
- [ ] Fetch stats from mock API
- [ ] Add loading state with ProgressSpinner
- [ ] Style dashboard with PrimeFlex grid

**Deliverable**: Functional dashboard page

**Stats to Display**:

- Total Agents
- Total Bookings
- Total Packages
- Recent Activity (last 5 actions)

---

### Phase 5: Agent CRUD (5.75 hours)

#### ⬜ Task 9: Build Agent List Page with DataTable

**Status**: Not Started  
**Estimated Time**: 2 hours  
**Actual Time**: **_ hours  
**Date Completed**: _**

**Description**: Create agent list with PrimeReact DataTable, pagination, and search.

**Steps**:

- [ ] Create Agents.jsx page
- [ ] Add PrimeReact DataTable component
- [ ] Configure columns (Name, Email, Phone, Commission, Status, Actions)
- [ ] Add pagination (10 rows per page)
- [ ] Add global search filter
- [ ] Add action buttons (Edit, Delete, View)
- [ ] Fetch agents from API
- [ ] Add loading state
- [ ] Add "Create New Agent" button
- [ ] Style with PrimeReact theme

**Deliverable**: Agent list with search and pagination

**Table Columns**:

- Agent Name
- Email
- Phone
- Commission Rate
- Status (Active/Inactive)
- Actions (Edit, Delete)

---

#### ⬜ Task 10: Build Create Agent Form

**Status**: Not Started  
**Estimated Time**: 2 hours  
**Actual Time**: **_ hours  
**Date Completed**: _**

**Description**: Create agent form in Dialog with validation.

**Steps**:

- [ ] Create AgentForm component
- [ ] Add PrimeReact Dialog wrapper
- [ ] Add form fields: Name, Email, Phone, Commission, Status
- [ ] Add InputText, Dropdown, InputNumber components
- [ ] Implement form validation (required fields, email format)
- [ ] Add submit button
- [ ] Call agentService.createAgent()
- [ ] Show success toast on creation
- [ ] Close dialog and refresh table
- [ ] Handle errors with toast

**Deliverable**: Working create agent form

**Form Fields**:

```
- Full Name (required)
- Email (required, email format)
- Phone (required)
- Commission Rate (number, 0-100%)
- Status (dropdown: Active/Inactive)
```

---

#### ⬜ Task 11: Build Edit Agent Form

**Status**: Not Started  
**Estimated Time**: 1 hour  
**Actual Time**: **_ hours  
**Date Completed**: _**

**Description**: Reuse create form for editing with pre-populated data.

**Steps**:

- [ ] Modify AgentForm to accept edit mode
- [ ] Pre-populate form with agent data
- [ ] Change dialog title to "Edit Agent"
- [ ] Call agentService.updateAgent()
- [ ] Show success toast on update
- [ ] Refresh table after update
- [ ] Handle errors

**Deliverable**: Working edit agent form

---

#### ⬜ Task 12: Implement Delete Agent with Confirmation

**Status**: Not Started  
**Estimated Time**: 45 minutes  
**Actual Time**: **_ hours  
**Date Completed**: _**

**Description**: Add delete functionality with confirmation dialog.

**Steps**:

- [ ] Add PrimeReact ConfirmDialog component
- [ ] Create handleDelete function
- [ ] Show confirmation: "Are you sure you want to delete this agent?"
- [ ] Call agentService.deleteAgent()
- [ ] Show success toast on deletion
- [ ] Remove from table (refresh)
- [ ] Handle errors gracefully

**Deliverable**: Working delete with confirmation

---

### Phase 6: Admin Management (1.5 hours)

#### ⬜ Task 13: Build Admin Account Creation Page

**Status**: Not Started  
**Estimated Time**: 1.5 hours  
**Actual Time**: **_ hours  
**Date Completed**: _**

**Description**: Create admin registration form for superadmin.

**Steps**:

- [ ] Create CreateAdmin.jsx page
- [ ] Add form fields: Username, Email, Password, Confirm Password, Role
- [ ] Add Password component with toggle visibility
- [ ] Add password strength indicator
- [ ] Validate: passwords match, email format, strong password
- [ ] Add role dropdown (Super Admin, Admin, Manager)
- [ ] Call API to create admin
- [ ] Show success message
- [ ] Clear form after success

**Deliverable**: Admin account creation page

**Form Fields**:

```
- Username (required, unique)
- Email (required, email format)
- Password (required, min 8 chars, must include number & special char)
- Confirm Password (must match)
- Role (dropdown: Super Admin, Admin, Manager)
```

---

### Phase 7: Polish & Testing (4.5 hours)

#### ⬜ Task 14: Add Responsive Design and Polish

**Status**: Not Started  
**Estimated Time**: 1.5 hours  
**Actual Time**: **_ hours  
**Date Completed**: _**

**Description**: Ensure responsive design and add polish.

**Steps**:

- [ ] Test on mobile viewport (375px width)
- [ ] Test on tablet viewport (768px width)
- [ ] Fix sidebar to collapse on mobile
- [ ] Make DataTable responsive
- [ ] Add loading spinners to all async operations
- [ ] Add empty states ("No agents found")
- [ ] Improve spacing and alignment
- [ ] Add proper focus states for accessibility
- [ ] Test keyboard navigation

**Deliverable**: Responsive, polished UI

---

#### ⬜ Task 15: Add Error Handling and Validation

**Status**: Not Started  
**Estimated Time**: 1 hour  
**Actual Time**: **_ hours  
**Date Completed**: _**

**Description**: Implement global error handling and validation.

**Steps**:

- [ ] Add axios interceptors for error handling
- [ ] Handle 401 (redirect to login)
- [ ] Handle 404, 500 errors
- [ ] Add network error handling
- [ ] Add timeout handling
- [ ] Show user-friendly error messages
- [ ] Add form validation error messages
- [ ] Add retry logic for failed requests

**Deliverable**: Robust error handling

---

#### ⬜ Task 16: Testing and Bug Fixes

**Status**: Not Started  
**Estimated Time**: 2 hours  
**Actual Time**: **_ hours  
**Date Completed**: _**

**Description**: Complete end-to-end testing and fix bugs.

**Steps**:

- [ ] Test login flow (success & failure)
- [ ] Test protected routes (try accessing without login)
- [ ] Test create agent (all fields, validation)
- [ ] Test edit agent (update values)
- [ ] Test delete agent (confirm & cancel)
- [ ] Test logout
- [ ] Test form validation (empty fields, invalid email)
- [ ] Test error scenarios (network failure, server error)
- [ ] Test on different browsers (Chrome, Firefox, Safari)
- [ ] Fix all identified bugs
- [ ] Document any known issues

**Deliverable**: Bug-free admin portal

**Test Scenarios**:

```
✅ Login with valid credentials
✅ Login with invalid credentials
✅ Access protected route without login
✅ Create new agent (all fields valid)
✅ Create agent with missing fields
✅ Edit existing agent
✅ Delete agent (confirm)
✅ Delete agent (cancel)
✅ Logout and verify cleared state
✅ Pagination in agent table
✅ Search in agent table
✅ Form validation messages
```

---

## 🎯 Completion Criteria

### MVP is complete when:

- [x] Admin can login/logout
- [x] Protected routes work correctly
- [x] Dashboard displays stats
- [x] Admin can create new agents
- [x] Admin can view agent list
- [x] Admin can edit agents
- [x] Admin can delete agents
- [x] Superadmin can create new admin accounts
- [x] All forms have validation
- [x] Error handling works properly
- [x] UI is responsive on mobile/tablet
- [x] All tests pass

---

## 📝 Notes & Learnings

### Issues Encountered:

_Document any issues you face and how you resolved them_

---

### Performance Optimizations:

_Note any optimizations made_

---

### Future Enhancements:

_Ideas for future improvements_

- [ ] Add agent performance metrics
- [ ] Add bulk operations (bulk delete, bulk status update)
- [ ] Add export to CSV functionality
- [ ] Add advanced filters (by status, commission range)
- [ ] Add agent activity history
- [ ] Add profile picture upload for agents
- [ ] Add email notifications

---

## 🔄 Next Steps After MVP

1. **Package Management**: Add CRUD for packages
2. **Location Management**: Add CRUD for locations with image upload
3. **Booking Management**: View and manage bookings
4. **Integration**: Replace JSON Server with real Supabase backend
5. **Testing**: Add unit tests with Vitest
6. **Deployment**: Deploy admin portal

---

## 📚 Resources

- [PrimeReact Documentation](https://primereact.org/)
- [JSON Server Documentation](https://github.com/typicode/json-server)
- [React Router Documentation](https://reactrouter.com/)
- [Axios Documentation](https://axios-http.com/)

---

**Last Updated**: October 21, 2025  
**Status**: In Progress  
**Current Phase**: Foundation Setup
