/**
 * Route Configuration
 * Centralized navigation routes for the admin portal
 *
 * Usage:
 * import { ADMIN_ROUTES } from '@/admin/config/routeConfig';
 * navigate(ADMIN_ROUTES.DASHBOARD);
 */

export const ADMIN_ROUTES = {
  // Auth routes
  LOGIN: '/admin/login',
  LOGOUT: '/admin/logout',

  // Dashboard
  DASHBOARD: '/admin/dashboard',

  // Admin management
  ADMINS: '/admin/admins',
  CREATE_ADMIN: '/admin/create-admin',

  // Agent management
  AGENTS: '/admin/agents',
  AGENTS_LIST: '/admin/agents',
  CREATE_AGENT: '/admin/agents/create',
  EDIT_AGENT: (id) => `/admin/agents/edit/${id}`,
  VIEW_AGENT: (id) => `/admin/agents/${id}`,

  // Package management
  PACKAGES: '/admin/packages',
  PACKAGES_LIST: '/admin/packages',
  CREATE_PACKAGE: '/admin/packages/create',
  EDIT_PACKAGE: (id) => `/admin/packages/edit/${id}`,
  VIEW_PACKAGE: (id) => `/admin/packages/${id}`,

  // Location management
  LOCATIONS: '/admin/locations',
  LOCATIONS_LIST: '/admin/locations',
  CREATE_LOCATION: '/admin/locations/create',
  EDIT_LOCATION: (id) => `/admin/locations/edit/${id}`,
  VIEW_LOCATION: (id) => `/admin/locations/${id}`,
};

export const PUBLIC_ROUTES = {
  HOME: '/',
  LEARN_ABOUT_SRI_LANKA: '/learn-about-sri-lanka',
  ABOUT: '/about',
  CONTACT: '/contact',
  GALLERY: '/gallery',
  OFFERS: '/offers',
  GUIDES: '/guides',
  REVIEWS: '/reviews',
  BOOKING: '/booking',
};
