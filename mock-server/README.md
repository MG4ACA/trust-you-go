# Trust You Go Mock Server

A mock API server for the Trust You Go travel application using json-server with custom controllers for handling relationships.

## Features

- **Packages API**: CRUD operations for travel packages
- **Locations API**: CRUD operations for locations with images
- **Relationship Handling**: Proper handling of package-location relationships
- **Image Management**: Location images with thumbnails and display order
- **Itinerary Management**: Day-by-day package itineraries

## API Endpoints

### Packages

- `GET /packages` - Get all packages (basic info only)
- `GET /packages/:id` - Get package by ID with full details (locations, images, itinerary)
- `POST /packages` - Create new package
- `PUT /packages/:id` - Update package
- `DELETE /packages/:id` - Delete package

### Locations

- `GET /locations` - Get all locations with images
- `GET /locations/:id` - Get location by ID with images
- `POST /locations` - Create new location
- `PUT /locations/:id` - Update location
- `DELETE /locations/:id` - Delete location

## Data Relationships

### Package Details Response

When fetching a package by ID, the response includes:

- Basic package information
- `package_locations` array with junction table data
- `itinerary` array organized by day with populated location data
- Each location includes associated images

### Location Details Response

When fetching locations, each location includes:

- Basic location information
- `images` array with image URLs, thumbnails, and display order

## Installation

```bash
cd mock-server
npm install
```

## Running the Server

```bash
# Development mode (with auto-restart)
npm run dev

# Production mode
npm start
```

The server will run on `http://localhost:3001`

## Database Structure

The mock server uses the following data structure:

- `packages`: Travel packages
- `locations`: Tourist spots, accommodations, restaurants, activities
- `locationImages`: Images for locations
- `packageLocations`: Junction table linking packages to locations

## Usage Examples

### Get All Packages

```bash
curl http://localhost:3001/packages
```

### Get Package with Details

```bash
curl http://localhost:3001/packages/1
```

### Get All Locations

```bash
curl http://localhost:3001/locations
```

### Create New Package

```bash
curl -X POST http://localhost:3001/packages \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Package",
    "description": "A test travel package",
    "duration": 3,
    "price": 500,
    "itinerary": [
      {
        "dayNumber": 1,
        "locations": [
          {
            "id": "1",
            "visit_order": 0,
            "notes": "Morning visit"
          }
        ]
      }
    ]
  }'
```

## Relationship Handling

The mock server properly handles:

- Many-to-many relationships between packages and locations
- One-to-many relationships between locations and images
- Automatic population of related data in API responses
- Proper cleanup when deleting entities with relationships
