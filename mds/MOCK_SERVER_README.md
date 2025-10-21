# Mock Server Setup

## Overview

JSON Server is running on `http://localhost:3001` providing mock API endpoints for development.

## Starting the Mock Server

```bash
npm run mock-server
```

The server will run in the background and watch for changes to `mock-db.json`.

## Available Endpoints

### Admins

- `GET http://localhost:3001/admins` - Get all admins
- `GET http://localhost:3001/admins/:id` - Get admin by ID
- `POST http://localhost:3001/admins` - Create new admin
- `PUT http://localhost:3001/admins/:id` - Update admin
- `DELETE http://localhost:3001/admins/:id` - Delete admin

### Agents

- `GET http://localhost:3001/agents` - Get all agents
- `GET http://localhost:3001/agents/:id` - Get agent by ID
- `POST http://localhost:3001/agents` - Create new agent
- `PUT http://localhost:3001/agents/:id` - Update agent
- `DELETE http://localhost:3001/agents/:id` - Delete agent

### Locations

- `GET http://localhost:3001/locations` - Get all locations
- `GET http://localhost:3001/locations/:id` - Get location by ID

### Packages

- `GET http://localhost:3001/packages` - Get all packages
- `GET http://localhost:3001/packages/:id` - Get package by ID

### Bookings

- `GET http://localhost:3001/bookings` - Get all bookings
- `GET http://localhost:3001/bookings/:id` - Get booking by ID

## Test Credentials

### Admin Login

- **Super Admin**

  - Email: `admin@trustyougo.com`
  - Password: `admin123`
  - Role: `super_admin`

- **Admin**

  - Email: `manager@trustyougo.com`
  - Password: `manager123`
  - Role: `admin`

- **Manager**
  - Email: `staff@trustyougo.com`
  - Password: `staff123`
  - Role: `manager`

## Sample Data

### Admins: 3 users

- Super Admin, Admin, Manager roles

### Agents: 5 travel agents

- Mix of active and inactive agents
- Various commission rates (10-20%)
- Located across Sri Lanka

### Locations: 6 destinations

- Sigiriya Rock Fortress
- Temple of the Tooth (Kandy)
- Yala National Park
- Galle Fort
- Nuwara Eliya Tea Plantations
- Mirissa Beach

### Packages: 5 travel packages

- Duration: 3-14 days
- Price: $380-$1850
- Various categories (cultural, adventure, nature, etc.)

### Bookings: 5 sample bookings

- Status: confirmed, temporary, cancelled
- Payment status: paid, deposit_paid, pending, refunded

## Query Examples

### Filter by status

```
GET http://localhost:3001/agents?status=active
```

### Search by field

```
GET http://localhost:3001/agents?email=kamal.fernando@travelagent.lk
```

### Pagination

```
GET http://localhost:3001/agents?_page=1&_per_page=10
```

### Sort

```
GET http://localhost:3001/agents?_sort=totalRevenue&_order=desc
```

### Full-text search

```
GET http://localhost:3001/agents?q=Colombo
```

## Running with Development Server

To run both Vite dev server and mock server:

**Terminal 1:**

```bash
npm run mock-server
```

**Terminal 2:**

```bash
npm run dev
```

## Notes

- Data persists to `mock-db.json` file
- Changes are automatically watched and reloaded
- CORS is enabled by default
- RESTful routes follow JSON Server conventions
