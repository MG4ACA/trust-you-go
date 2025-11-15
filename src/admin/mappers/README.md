# Data Mappers Layer

## Overview

The mappers layer provides a transformation layer between API responses (snake_case) and Redux store format (camelCase). This ensures that:

1. **API Communication**: Uses PostgreSQL convention (snake_case) per DATABASE_SCHEMA.md
2. **Frontend State**: Maintains JavaScript convention (camelCase) in Redux store
3. **Form Handling**: Bidirectional conversion between formats
4. **Code Consistency**: Single source of truth for field mappings

---

## Architecture

```
Mock Server API (snake_case)
        ↓
API Response with snake_case fields
        ↓
Service Layer (receives raw API data)
        ↓
Mapper Layer (converts to camelCase)
        ↓
Redux Store (camelCase format)
        ↓
React Components (consume camelCase state)
```

---

## Available Mappers

### 1. **adminMapper**
**Location**: `src/admin/mappers/adminMapper.js`

**API Fields** → **Redux Fields**:
```javascript
admin_id           → adminId
email              → email
password_hash      → (not stored in Redux)
name               → name
contact            → contact
is_active          → isActive
created_at         → createdAt
last_login         → lastLogin
```

**Usage**:
```javascript
import { adminMapper } from '@/admin/mappers';

// Convert API response to Redux format
const reduxAdmin = adminMapper.toRedux(apiResponse);

// Convert Redux state to API format
const apiPayload = adminMapper.toAPI(reduxAdmin);

// Convert array
const reduxAdmins = adminMapper.toReduxArray(apiArray);

// Convert form data to API
const payload = adminMapper.formToAPI(formData);
```

---

### 2. **agentMapper**
**Location**: `src/admin/mappers/agentMapper.js`

**API Fields** → **Redux Fields**:
```javascript
agent_id           → agentId
name               → name
contact            → contact
email              → email
commission_rate    → commissionRate
is_active          → isActive
notes              → notes
created_at         → createdAt
updated_at         → updatedAt
```

**Usage**:
```javascript
import { agentMapper } from '@/admin/mappers';

const reduxAgent = agentMapper.toRedux(apiResponse);
const agentArray = agentMapper.toReduxArray(apiArray);
```

---

### 3. **locationMapper**
**Location**: `src/admin/mappers/locationMapper.js`

**API Fields** → **Redux Fields**:
```javascript
location_id        → locationId
name               → name
description        → description
location_type      → locationType
location_url       → locationUrl
is_active          → isActive
created_at         → createdAt
updated_at         → updatedAt
```

**Usage**:
```javascript
import { locationMapper } from '@/admin/mappers';

const reduxLocation = locationMapper.toRedux(apiResponse);
```

---

### 4. **locationImageMapper**
**Location**: `src/admin/mappers/locationImageMapper.js`

**API Fields** → **Redux Fields**:
```javascript
image_id           → imageId
location_id        → locationId
image_url          → imageUrl
thumbnail_url      → thumbnailUrl
display_order      → displayOrder
uploaded_at        → uploadedAt
```

---

### 5. **packageLocationMapper**
**Location**: `src/admin/mappers/packageLocationMapper.js`

**API Fields** → **Redux Fields**:
```javascript
id                 → id
package_id         → packageId
location_id        → locationId
day_number         → dayNumber
visit_order        → visitOrder
notes              → notes
created_at         → createdAt
```

---

### 6. **packageMapper**
**Location**: `src/admin/mappers/packageMapper.js`

**API Fields** → **Redux Fields**:
```javascript
package_id         → packageId
title              → title
description        → description
no_of_days         → noOfDays
is_template        → isTemplate
is_active          → isActive
base_price         → basePrice
created_by         → createdBy
created_at         → createdAt
updated_at         → updatedAt
```

---

### 7. **bookingMapper**
**Location**: `src/admin/mappers/bookingMapper.js`

**API Fields** → **Redux Fields**:
```javascript
booking_id         → bookingId
package_id         → packageId
traveler_id        → travelerId
agent_id           → agentId
status             → status
no_of_travelers    → noOfTravelers
start_date         → startDate
end_date           → endDate
total_amount       → totalAmount
payment_status     → paymentStatus
booking_date       → bookingDate
confirmation_date  → confirmationDate
confirmed_by       → confirmedBy
admin_notes        → adminNotes
traveler_notes     → travelerNotes
created_at         → createdAt
updated_at         → updatedAt
```

---

## Integration Pattern

### Step 1: Service Layer (Already has API calls)
```javascript
// src/admin/services/agentService.js
async getAll() {
  const response = await apiClient.get(API_ENDPOINTS.AGENTS);
  return response.data.success ? response.data.data : [];
}
```

### Step 2: Redux Thunk (Map before storing)
```javascript
// src/admin/store/slices/agentSlice.js
import { agentMapper } from '../../mappers';

export const fetchAgents = createAsyncThunk(
  'agents/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const apiData = await agentService.getAll();
      // Map API response to Redux format
      return agentMapper.toReduxArray(apiData);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
```

### Step 3: Store Action Handler
```javascript
// Redux reducer handles mapped data
.addCase(fetchAgents.fulfilled, (state, action) => {
  state.agents = action.payload; // Already in camelCase
  state.loading = false;
})
```

### Step 4: Component Usage
```javascript
// src/admin/pages/Agents.jsx
const agents = useSelector((state) => state.agents.agents); // camelCase format

// Form submission
const handleSubmit = async (formData) => {
  // Convert form data to API format
  const payload = agentMapper.formToAPI(formData);
  await dispatch(createAgent(payload)).unwrap();
};
```

---

## Mapper Methods

Each mapper has 4 standard methods:

### 1. `toRedux(apiObject)`
Converts single object from API format to Redux format

```javascript
const reduxAdmin = adminMapper.toRedux(apiAdmin);
// Returns: { adminId: '1', name: 'John', ... }
```

### 2. `toReduxArray(apiArray)`
Converts array from API format to Redux format

```javascript
const reduxAdmins = adminMapper.toReduxArray(apiAdmins);
// Returns: [{ adminId: '1', ... }, { adminId: '2', ... }]
```

### 3. `toAPI(reduxObject)`
Converts single object from Redux format to API format

```javascript
const payload = adminMapper.toAPI(reduxAdmin);
// Returns: { admin_id: '1', name: 'John', ... }
```

### 4. `formToAPI(formData)`
Converts form data directly to API format (for create/update)

```javascript
const payload = adminMapper.formToAPI({
  name: 'John Doe',
  email: 'john@example.com'
});
// Returns: { name: 'John Doe', email: 'john@example.com' }
```

---

## Integration Checklist

- [ ] Import mapper in each Redux slice
- [ ] Apply `toReduxArray()` when fetching data
- [ ] Apply `toRedux()` when fetching single item
- [ ] Apply `formToAPI()` when creating/updating via form
- [ ] Apply `toAPI()` when converting Redux state back to API format
- [ ] Test API responses in Redux DevTools (should show camelCase)
- [ ] Verify components receive camelCase properties

---

## Example: Complete Flow

### 1. Fetch Data Flow
```javascript
// Service layer
const response = await apiClient.get('/agents');
// Returns: { data: { success: true, data: [{ agent_id: '1', ... }] } }

// Redux thunk
export const fetchAgents = createAsyncThunk('agents/fetchAll', async () => {
  const apiData = await agentService.getAll();
  // Map snake_case to camelCase
  return agentMapper.toReduxArray(apiData);
});

// Redux store receives
state.agents = [{ agentId: '1', name: 'John', ... }]

// Component receives
const agents = useSelector(state => state.agents.agents);
// agents = [{ agentId: '1', name: 'John', ... }]
```

### 2. Create/Update Flow
```javascript
// Form submission
const handleSubmit = (formData) => {
  // formData = { name: 'Jane', email: 'jane@example.com' }
  
  // Convert to API format
  const payload = agentMapper.formToAPI(formData);
  // payload = { name: 'Jane', email: 'jane@example.com' }
  
  dispatch(createAgent(payload));
};

// Redux thunk sends to API
await agentService.create(payload);
// Sends: { name: 'Jane', email: 'jane@example.com' }

// API response
// Returns: { agent_id: '5', name: 'Jane', ... }

// Redux stores mapped response
const responseData = agentMapper.toRedux(apiResponse);
// responseData = { agentId: '5', name: 'Jane', ... }
```

---

## Testing Mappers

```javascript
// adminMapper.test.js
import { adminMapper } from '@/admin/mappers';

describe('adminMapper', () => {
  it('should convert API format to Redux format', () => {
    const apiAdmin = {
      admin_id: '1',
      email: 'admin@test.com',
      name: 'Test Admin',
      is_active: true,
    };

    const result = adminMapper.toRedux(apiAdmin);

    expect(result).toEqual({
      adminId: '1',
      email: 'admin@test.com',
      name: 'Test Admin',
      isActive: true,
      contact: '',
      createdAt: null,
      lastLogin: null,
    });
  });

  it('should convert Redux format to API format', () => {
    const reduxAdmin = {
      adminId: '1',
      name: 'Test Admin',
      email: 'admin@test.com',
    };

    const result = adminMapper.toAPI(reduxAdmin);

    expect(result.admin_id).toBe('1');
    expect(result.name).toBe('Test Admin');
  });
});
```

---

## Important Notes

1. **Null/Undefined Handling**: Mappers handle null/undefined inputs gracefully
2. **Default Values**: Each mapper applies sensible defaults (empty strings, false for booleans, 0 for numbers)
3. **Password Fields**: Never stored in Redux store (security)
4. **Timestamps**: Automatically set to `now()` on create
5. **Foreign Keys**: Preserved as-is during mapping (e.g., `package_id` → `packageId`)
6. **Bidirectional**: All mappers support both directions (API ↔ Redux)

---

## Best Practices

✅ **DO:**
- Always use mapper methods in Redux thunks
- Use `toReduxArray()` for multiple items, `toRedux()` for single
- Use `formToAPI()` when converting form submissions
- Test mapper output in Redux DevTools

❌ **DON'T:**
- Manually convert field names in components
- Mix API format and camelCase in Redux store
- Store password_hash in Redux
- Bypass mappers for quick updates

---

## Reference: DATABASE_SCHEMA.md

For complete field specifications, see `MOCK_SERVER_SCHEMA_VERIFICATION.md` and `DATABASE_SCHEMA.md`.

All field names must match the mock server snake_case format exactly.
