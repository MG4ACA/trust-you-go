# Admin Portal Routing Documentation

## Overview

The admin portal uses React Router DOM for client-side routing. Routes are completely separated from the main SPA to avoid conflicts.

## Route Structure

### Public Routes

- `/admin/login` - Admin login page (not protected)

### Protected Routes (Under AdminLayout)

All routes under `/admin/*` use the AdminLayout component which provides:

- Sidebar navigation with menu items
- Top header with toggle button and notifications
- User profile display in sidebar
- Footer
- Mobile-responsive sidebar

**Protected Admin Routes:**

- `/admin` - Redirects to `/admin/dashboard`
- `/admin/dashboard` - Admin dashboard with stats and quick actions
- `/admin/agents` - Agent management (list, create, edit, delete)
- `/admin/create-admin` - Create new admin account

## File Structure

```
src/
├── App.jsx                          # Main router configuration
└── admin/
    ├── layouts/
    │   ├── AdminLayout.jsx          # Main layout with sidebar
    │   └── AdminLayout.css          # Layout styles
    └── pages/
        ├── Login.jsx                # Login page
        ├── Dashboard.jsx            # Dashboard page
        ├── Agents.jsx               # Agent management
        └── CreateAdmin.jsx          # Admin creation form
```

## AdminLayout Features

### Sidebar Menu

The sidebar includes:

- **Navigation Section:**

  - Dashboard (Home icon)
  - Agents (Users icon)
  - Create Admin (User Plus icon)

- **Account Section:**
  - Logout (Sign Out icon)

### Header

- Sidebar toggle button (show/hide)
- Current date display
- Notification bell with badge (placeholder)

### Footer

- Copyright notice

### User Profile Display

Shows in sidebar bottom:

- Avatar icon
- User name (placeholder: "Admin User")
- Role (placeholder: "Super Admin")

## Navigation Usage

### Programmatic Navigation

```jsx
import { useNavigate } from 'react-router-dom';

const navigate = useNavigate();
navigate('/admin/dashboard');
navigate('/admin/agents');
```

### Link Components

```jsx
import { Link } from 'react-router-dom';

<Link to="/admin/dashboard">Dashboard</Link>;
```

## Authentication Flow (To Be Implemented in Task 7)

1. User visits `/admin/login`
2. User enters credentials
3. On success, JWT token stored in localStorage
4. User redirected to `/admin/dashboard`
5. Protected routes check for token
6. If no token, redirect to `/admin/login`

## Testing Routes

### Start Development Server

```bash
npm run dev
```

### Test Each Route

1. Visit `http://localhost:5173/admin/login` - Should show login placeholder
2. Visit `http://localhost:5173/admin` - Should redirect to dashboard
3. Visit `http://localhost:5173/admin/dashboard` - Should show dashboard with sidebar
4. Click "Agents" in sidebar - Should navigate to agents page
5. Click "Create Admin" in sidebar - Should navigate to create admin page
6. Click logout - Should show alert and redirect to login (temporary)

### Mobile Testing

1. Resize browser to mobile width (< 768px)
2. Sidebar should remain visible (can be toggled with button)
3. Toggle button should hide/show sidebar
4. Navigation should work on mobile

## Next Steps

- **Task 5:** Create API service layer with axios
- **Task 6:** Implement actual login form with validation
- **Task 7:** Add authentication context and route protection
- **Task 8:** Build dashboard with real data
- **Tasks 9-12:** Implement agent CRUD functionality
- **Task 13:** Implement admin creation form

## Notes

- Routes are completely separate from main SPA routes
- AdminLayout provides consistent UI across all admin pages
- Sidebar state persists when navigating between pages
- All admin routes will be protected with auth middleware (Task 7)
- Current user info is placeholder (will be dynamic after Task 7)
