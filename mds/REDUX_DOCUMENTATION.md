# Redux State Management Documentation

## Overview

The admin portal uses **Redux Toolkit** for centralized state management. Redux manages authentication, agent data, and UI state across the application.

## Installation

```bash
npm install @reduxjs/toolkit react-redux
```

## Architecture

### Store Structure

```
src/admin/store/
├── store.js           # Main Redux store configuration
└── slices/
    ├── authSlice.js   # Authentication state and thunks
    ├── agentSlice.js  # Agent CRUD operations and state
    └── uiSlice.js     # UI state (sidebar, toast, dialogs)
```

## State Shape

### Complete State Tree

```javascript
{
  auth: {
    user: null | { id, username, email, role },
    token: null | string,
    isAuthenticated: boolean,
    loading: boolean,
    error: null | string,
    checkingAuth: boolean
  },
  agents: {
    agents: [],
    currentAgent: null | object,
    loading: boolean,
    error: null | string,
    actionLoading: boolean,
    actionError: null | string
  },
  ui: {
    sidebarVisible: boolean,
    toastMessage: null | object,
    confirmDialog: { visible, message, onConfirm },
    globalLoading: boolean
  }
}
```

## Auth Slice

### Actions and Thunks

#### `loginAdmin(credentials)`

Async thunk to authenticate admin user.

**Usage:**

```javascript
import { useDispatch } from 'react-redux';
import { loginAdmin } from '../store/slices/authSlice';

const dispatch = useDispatch();

const handleLogin = async () => {
  try {
    await dispatch(loginAdmin({ email, password })).unwrap();
    navigate('/admin/dashboard');
  } catch (error) {
    // Handle error
  }
};
```

**What it does:**

1. Queries mock server for admin by email
2. Verifies password (client-side for mock)
3. Generates mock JWT token
4. Stores token and user in localStorage
5. Updates Redux state with user and token

#### `logoutAdmin()`

Async thunk to logout admin user.

**Usage:**

```javascript
import { logoutAdmin } from '../store/slices/authSlice';

dispatch(logoutAdmin());
navigate('/admin/login');
```

**What it does:**

1. Removes token and user from localStorage
2. Clears Redux auth state

#### `checkAuthStatus()`

Async thunk to check if user is already authenticated (on app load).

**Usage:**

```javascript
useEffect(() => {
  dispatch(checkAuthStatus());
}, [dispatch]);
```

**What it does:**

1. Checks localStorage for token and user
2. Restores auth state if valid
3. Sets `checkingAuth` to false when complete

#### `clearError()`

Action to clear authentication errors.

**Usage:**

```javascript
import { clearError } from '../store/slices/authSlice';

dispatch(clearError());
```

### Selectors

**Get auth state:**

```javascript
const { user, token, isAuthenticated, loading, error, checkingAuth } = useSelector(
  (state) => state.auth
);
```

**Get current user:**

```javascript
const user = useSelector((state) => state.auth.user);
```

**Check if authenticated:**

```javascript
const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
```

## Agent Slice

### Actions and Thunks

#### `fetchAgents()`

Fetch all agents from mock server.

**Usage:**

```javascript
import { fetchAgents } from '../store/slices/agentSlice';

useEffect(() => {
  dispatch(fetchAgents());
}, [dispatch]);
```

#### `fetchAgentById(id)`

Fetch single agent by ID.

**Usage:**

```javascript
dispatch(fetchAgentById(agentId));
```

#### `createAgent(agentData)`

Create new agent.

**Usage:**

```javascript
const handleCreate = async () => {
  try {
    await dispatch(createAgent(formData)).unwrap();
    // Show success toast
  } catch (error) {
    // Handle error
  }
};
```

#### `updateAgent({ id, data })`

Update existing agent.

**Usage:**

```javascript
await dispatch(updateAgent({ id: agentId, data: formData })).unwrap();
```

#### `deleteAgent(id)`

Delete agent by ID.

**Usage:**

```javascript
await dispatch(deleteAgent(agentId)).unwrap();
```

#### `clearError()`

Clear agent-related errors.

**Usage:**

```javascript
dispatch(clearError());
```

#### `clearCurrentAgent()`

Clear currently selected agent.

**Usage:**

```javascript
dispatch(clearCurrentAgent());
```

### Selectors

**Get all agents:**

```javascript
const agents = useSelector((state) => state.agents.agents);
```

**Get current agent:**

```javascript
const currentAgent = useSelector((state) => state.agents.currentAgent);
```

**Get loading states:**

```javascript
const { loading, actionLoading } = useSelector((state) => state.agents);
```

**Get errors:**

```javascript
const { error, actionError } = useSelector((state) => state.agents);
```

## UI Slice

### Actions

#### `toggleSidebar()`

Toggle sidebar visibility.

**Usage:**

```javascript
import { toggleSidebar } from '../store/slices/uiSlice';

dispatch(toggleSidebar());
```

#### `setSidebarVisible(boolean)`

Set sidebar visibility explicitly.

**Usage:**

```javascript
import { setSidebarVisible } from '../store/slices/uiSlice';

dispatch(setSidebarVisible(true)); // Show sidebar
dispatch(setSidebarVisible(false)); // Hide sidebar
```

#### `showToast(message)`

Show toast notification.

**Usage:**

```javascript
import { showToast } from '../store/slices/uiSlice';

dispatch(
  showToast({
    severity: 'success', // success, info, warn, error
    summary: 'Success',
    detail: 'Agent created successfully',
    life: 3000,
  })
);
```

#### `hideToast()`

Hide toast notification.

**Usage:**

```javascript
dispatch(hideToast());
```

#### `showConfirmDialog(config)`

Show confirmation dialog.

**Usage:**

```javascript
import { showConfirmDialog } from '../store/slices/uiSlice';

dispatch(
  showConfirmDialog({
    message: 'Are you sure you want to delete this agent?',
    onConfirm: () => dispatch(deleteAgent(agentId)),
  })
);
```

#### `hideConfirmDialog()`

Hide confirmation dialog.

**Usage:**

```javascript
dispatch(hideConfirmDialog());
```

#### `setGlobalLoading(boolean)`

Set global loading state.

**Usage:**

```javascript
dispatch(setGlobalLoading(true)); // Show loading
dispatch(setGlobalLoading(false)); // Hide loading
```

### Selectors

**Get sidebar state:**

```javascript
const sidebarVisible = useSelector((state) => state.ui.sidebarVisible);
```

**Get toast message:**

```javascript
const toastMessage = useSelector((state) => state.ui.toastMessage);
```

**Get confirm dialog:**

```javascript
const confirmDialog = useSelector((state) => state.ui.confirmDialog);
```

**Get global loading:**

```javascript
const globalLoading = useSelector((state) => state.ui.globalLoading);
```

## Protected Routes

### ProtectedRoute Component

Wraps admin routes to check authentication.

**Features:**

- Checks auth status on mount
- Shows loading spinner while checking
- Redirects to login if not authenticated
- Saves original location for redirect after login

**Usage in App.jsx:**

```javascript
import ProtectedRoute from './admin/components/ProtectedRoute';

<Route
  path="/admin"
  element={
    <ProtectedRoute>
      <AdminLayout />
    </ProtectedRoute>
  }
>
  {/* Protected child routes */}
</Route>;
```

## Complete Usage Examples

### Login Page

```javascript
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginAdmin, clearError } from '../store/slices/authSlice';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(clearError());

    try {
      await dispatch(loginAdmin({ email, password })).unwrap();
      navigate('/admin/dashboard');
    } catch (err) {
      // Error is already in Redux state
      console.error('Login failed:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <InputText value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
      <Password
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      {error && <p className="error">{error}</p>}
      <Button type="submit" label="Login" loading={loading} />
    </form>
  );
}
```

### Agent List Page

```javascript
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAgents, deleteAgent } from '../store/slices/agentSlice';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';

function Agents() {
  const dispatch = useDispatch();
  const { agents, loading } = useSelector((state) => state.agents);

  useEffect(() => {
    dispatch(fetchAgents());
  }, [dispatch]);

  const handleDelete = async (agentId) => {
    try {
      await dispatch(deleteAgent(agentId)).unwrap();
      // Show success toast
    } catch (error) {
      // Handle error
    }
  };

  const actionTemplate = (rowData) => (
    <Button
      icon="pi pi-trash"
      onClick={() => handleDelete(rowData.id)}
      className="p-button-danger"
    />
  );

  return (
    <DataTable value={agents} loading={loading}>
      <Column field="name" header="Name" />
      <Column field="email" header="Email" />
      <Column body={actionTemplate} header="Actions" />
    </DataTable>
  );
}
```

## Redux DevTools

Redux DevTools is enabled in development mode. Install the browser extension:

**Chrome:** [Redux DevTools Extension](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd)

**Features:**

- View state tree in real-time
- Time-travel debugging (undo/redo actions)
- Inspect action payloads
- Monitor performance

## Best Practices

1. **Use `unwrap()` for error handling:**

```javascript
try {
  await dispatch(loginAdmin(credentials)).unwrap();
} catch (error) {
  // Handle error
}
```

2. **Clear errors before new operations:**

```javascript
dispatch(clearError());
await dispatch(loginAdmin(credentials));
```

3. **Use selectors to extract state:**

```javascript
// ✅ Good - specific selector
const user = useSelector((state) => state.auth.user);

// ❌ Bad - entire state
const state = useSelector((state) => state);
```

4. **Dispatch in useEffect for data fetching:**

```javascript
useEffect(() => {
  dispatch(fetchAgents());
}, [dispatch]);
```

5. **Show loading states:**

```javascript
const { loading } = useSelector((state) => state.agents);
return loading ? <Spinner /> : <DataTable data={agents} />;
```

## Testing Mock Authentication

**Test credentials (from mock-db.json):**

- Email: `admin@trustyougo.com`
- Password: `admin123`

**What happens on login:**

1. Mock server returns admin object
2. Mock JWT token generated: `mock_jwt_token_{id}_{timestamp}`
3. Token stored in localStorage as `adminToken`
4. User stored in localStorage as `adminUser`
5. Redux state updated
6. Redirect to dashboard

**What happens on logout:**

1. localStorage cleared
2. Redux state cleared
3. Redirect to login

## Next Steps

- **Task 6:** Build login page UI with Redux integration ✅ (Redux setup complete)
- **Task 7:** Protected routes already implemented with ProtectedRoute component ✅
- **Task 8:** Use Redux selectors in Dashboard
- **Task 9:** Use Redux thunks in Agent list page
- **Tasks 10-12:** Use Redux for agent CRUD operations
- **Task 13:** Use Redux for admin creation

## Notes

- All Redux files are in `src/admin/store/`
- Redux Provider is configured in `main.jsx`
- ProtectedRoute checks auth on mount and redirects
- AdminLayout uses Redux for sidebar and user info
- Auth state persists in localStorage
- Mock authentication works with JSON Server
