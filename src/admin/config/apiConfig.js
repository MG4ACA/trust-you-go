/**
 * API Configuration
 * Centralized API endpoints and base URLs
 *
 * Usage:
 * import { API_BASE_URL, API_ENDPOINTS } from '@/admin/config/apiConfig';
 */

export const API_BASE_URL = 'http://localhost:3001';

export const API_ENDPOINTS = {
  // Admin endpoints
  ADMINS: '/admins',
  ADMIN_BY_ID: (id) => `/admins/${id}`,

  // Agent endpoints
  AGENTS: '/agents',
  AGENT_BY_ID: (id) => `/agents/${id}`,
  AGENTS_BY_STATUS: (status) => `/agents?status=${status}`,

  // Location endpoints
  LOCATIONS: '/locations',
  LOCATION_BY_ID: (id) => `/locations/${id}`,
  LOCATIONS_BY_TYPE: (type) => `/locations?location_type=${type}`,
  ACTIVE_LOCATIONS: '/locations?isActive=true',

  // Package endpoints
  PACKAGES: '/packages',
  PACKAGE_BY_ID: (id) => `/packages/${id}`,

  // Package Location endpoints
  PACKAGE_LOCATIONS: '/package-locations',
  PACKAGE_LOCATIONS_BY_PACKAGE: (packageId) => `/package-locations?packageId=${packageId}`,
  PACKAGE_LOCATION_BY_ID: (id) => `/package-locations/${id}`,

  // Booking endpoints
  BOOKINGS: '/bookings',
  BOOKING_BY_ID: (id) => `/bookings/${id}`,
  BOOKINGS_BY_PACKAGE: (packageId) => `/bookings/package/${packageId}`,
  BOOKINGS_BY_AGENT: (agentId) => `/bookings/agent/${agentId}`,
  BOOKINGS_BY_STATUS: (status) => `/bookings?status=${status}`,
};
