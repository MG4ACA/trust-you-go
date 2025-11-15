# Project Folder Structure - Visual Overview

## 🏗️ Complete Project Structure

```
trust-you-go/
│
├── public/                          # Static assets served directly
│   ├── bus-icon.png
│   ├── car-icon.png
│   ├── favicon.png
│   ├── logo.svg
│   ├── locations/
│   └── videos/
│
├── src/                             # Source code
│   │
│   ├── 📱 spa/                      # PUBLIC WEBSITE (SPA)
│   │   │
│   │   ├── pages/                   # Full page components
│   │   │   ├── Home.jsx             # Main landing page
│   │   │   └── LearnAboutSriLanka.jsx
│   │   │
│   │   ├── sections/                # Homepage sections
│   │   │   ├── About.jsx
│   │   │   ├── Booking.jsx
│   │   │   ├── Contact.jsx
│   │   │   ├── DiscoverTips.jsx
│   │   │   ├── Gallery.jsx
│   │   │   ├── LearnMore.jsx
│   │   │   ├── Offers.jsx
│   │   │   ├── Reviews.jsx
│   │   │   └── TravelGuides.jsx
│   │   │
│   │   ├── components/              # Reusable UI components
│   │   │   ├── Header.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── LanguageSelector.jsx
│   │   │   ├── SocialMediaLinks.jsx
│   │   │   ├── VideoBackground.jsx
│   │   │   ├── ImageCarousel.jsx
│   │   │   └── Section.jsx
│   │   │
│   │   ├── contexts/                # React contexts (SPA only)
│   │   │   ├── LanguageContext.jsx
│   │   │   └── LanguageContext_new.jsx
│   │   │
│   │   ├── hooks/                   # Custom hooks
│   │   │   └── useLanguage.js
│   │   │
│   │   ├── utils/                   # Helper functions
│   │   │   └── useSEO.js
│   │   │
│   │   ├── translations/            # i18n translations
│   │   │   ├── index.js
│   │   │   ├── en.js
│   │   │   ├── ja.js
│   │   │   └── ta.js
│   │   │
│   │   ├── assets/                  # SPA assets
│   │   │   └── react.svg
│   │   │
│   │   ├── styles/                  # CSS files
│   │   │   ├── App.css
│   │   │   └── index.css
│   │   │
│   │   └── README.md                # SPA documentation
│   │
│   ├── 🔒 admin/                    # ADMIN PORTAL
│   │   │
│   │   ├── pages/                   # Admin pages
│   │   │   ├── Login.jsx            # Login page
│   │   │   ├── Dashboard.jsx        # Dashboard (placeholder)
│   │   │   ├── Agents.jsx           # Agents list (placeholder)
│   │   │   └── CreateAdmin.jsx      # Create admin (placeholder)
│   │   │
│   │   ├── components/              # Admin components
│   │   │   └── ProtectedRoute.jsx   # Route protection with Redux
│   │   │
│   │   ├── layouts/                 # Admin layouts
│   │   │   ├── AdminLayout.jsx      # Main layout with sidebar
│   │   │   └── AdminLayout.css      # Layout styles
│   │   │
│   │   ├── store/                   # Redux state management
│   │   │   ├── store.js             # Redux store config
│   │   │   └── slices/
│   │   │       ├── authSlice.js     # Auth state & thunks
│   │   │       ├── agentSlice.js    # Agent CRUD operations
│   │   │       └── uiSlice.js       # UI state
│   │   │
│   │   └── README.md                # Admin documentation
│   │
│   ├── App.jsx                      # Main router (SPA + Admin routes)
│   └── main.jsx                     # Entry point with Redux Provider
│
├── mock-db.json                     # JSON Server mock database
│
├── 📚 Documentation/
│   ├── PROJECT_PLAN_HYBRID.md       # 21-day implementation plan
│   ├── ADMIN_PORTAL_MVP_PLAN.md     # Admin portal task list
│   ├── MOCK_SERVER_README.md        # Mock server documentation
│   ├── PRIMEREACT_SETUP.md          # PrimeReact setup guide
│   ├── ADMIN_ROUTING.md             # Admin routing documentation
│   ├── REDUX_DOCUMENTATION.md       # Redux API reference
│   ├── REDUX_SETUP_SUMMARY.md       # Redux setup summary
│   └── SPA_RESTRUCTURING_SUMMARY.md # SPA restructuring summary
│
├── package.json                     # Dependencies & scripts
├── vite.config.js                   # Vite configuration
├── eslint.config.js                 # ESLint configuration
└── README.md                        # Project documentation
```

---

## 🎯 Key Principles

### 1. Clear Separation

```
📱 SPA (src/spa/)          →  Public-facing website
🔒 Admin (src/admin/)      →  Admin portal
🔀 Shared (src/)           →  App.jsx, main.jsx
```

### 2. Organized by Feature

```
SPA:     pages → sections → components
Admin:   pages → components → store
```

### 3. Technology Separation

```
SPA:     React Context (LanguageContext)
Admin:   Redux (authSlice, agentSlice, uiSlice)
```

### 4. Route Separation

```
SPA Routes:      /  /learn-about-sri-lanka  /about  /contact
Admin Routes:    /admin/login  /admin/dashboard  /admin/agents
```

---

## 🔄 Data Flow

### SPA (Public Website)

```
main.jsx
  └── LanguageProvider (React Context)
       └── App.jsx
            └── Router
                 ├── / → Home (with sections)
                 └── /learn-about-sri-lanka → LearnAboutSriLanka
```

### Admin Portal

```
main.jsx
  └── Redux Provider
       └── App.jsx
            └── Router
                 ├── /admin/login → Login
                 └── /admin → ProtectedRoute
                      └── AdminLayout (with sidebar)
                           ├── /dashboard → Dashboard
                           ├── /agents → Agents
                           └── /create-admin → CreateAdmin
```

---

## 📦 Import Patterns

### From SPA Pages

```javascript
// Pages
import Home from './spa/pages/Home';

// Sections
import About from '../sections/About';

// Components
import Header from '../components/Header';

// Context
import { useLanguage } from '../hooks/useLanguage';

// Styles
import './spa/styles/index.css';
```

### From Admin Pages

```javascript
// Pages
import Dashboard from './admin/pages/Dashboard';

// Components
import ProtectedRoute from './admin/components/ProtectedRoute';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { loginAdmin } from '../store/slices/authSlice';

// Layout
import AdminLayout from './admin/layouts/AdminLayout';
```

---

## 🚀 Development Commands

```bash
# Start development server (both SPA & Admin)
npm run dev

# Start mock backend (JSON Server)
npm run mock-server

# Run both in parallel (recommended)
# Terminal 1: npm run dev
# Terminal 2: npm run mock-server
```

---

## 📊 Statistics

### SPA

- **Pages:** 2
- **Sections:** 9
- **Components:** 7
- **Contexts:** 2
- **Hooks:** 1
- **Translations:** 3 languages
- **Routes:** 9

### Admin Portal

- **Pages:** 4
- **Components:** 1
- **Layouts:** 1
- **Redux Slices:** 3
- **Routes:** 4 (1 public, 3 protected)

### Total Project

- **Lines of Code:** ~3000+ (estimated)
- **Components:** 20+
- **Dependencies:** 30+
- **Documentation Files:** 10+

---

## ✅ Structure Checklist

- [x] SPA files organized under `src/spa/`
- [x] Admin files organized under `src/admin/`
- [x] Clear separation between SPA and admin
- [x] All imports updated correctly
- [x] Documentation created for both sections
- [x] No files left in root `src/` directory
- [x] Redux integrated with admin portal
- [x] Protected routes implemented
- [x] Mock server configured
- [x] PrimeReact setup for admin
- [x] Language context setup for SPA

---

## 🎨 Technology Stack

### SPA (Public Website)

- React 19.1.1
- React Router DOM 7.8.1
- React Context (Language)
- Custom CSS
- Video backgrounds
- Image carousels
- Multi-language support (EN, JA, TA)

### Admin Portal

- React 19.1.1
- React Router DOM 7.8.1
- Redux Toolkit 2.5.0
- PrimeReact 10.9.7
- PrimeIcons 7.0.0
- Axios (HTTP client)
- JSON Server (mock backend)

### Build Tools

- Vite 7.1.2
- ESLint

---

## 🎯 Next Steps

Now that the structure is clean and organized:

1. ✅ **Completed:** SPA restructuring
2. 🎯 **Next:** Build Admin Login Page (Task 7)
3. **Future:** Build Dashboard, Agent CRUD, etc.

The clean structure ensures smooth development moving forward!
