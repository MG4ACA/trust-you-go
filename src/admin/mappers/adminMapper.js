/**
 * Admin Mapper
 * Converts API response (snake_case) to Redux store format (camelCase)
 *
 * API Response Format (snake_case):
 * {
 *   admin_id: '1',
 *   email: 'admin@example.com',
 *   password_hash: '$2b$10$...',
 *   name: 'Super Admin',
 *   contact: '+94XXXXXXXXX',
 *   is_active: true,
 *   created_at: '2025-01-15T10:00:00.000Z',
 *   last_login: '2025-10-21T08:00:00.000Z'
 * }
 *
 * Redux Store Format (camelCase):
 * {
 *   adminId: '1',
 *   email: 'admin@example.com',
 *   name: 'Super Admin',
 *   contact: '+94XXXXXXXXX',
 *   isActive: true,
 *   createdAt: '2025-01-15T10:00:00.000Z',
 *   lastLogin: '2025-10-21T08:00:00.000Z'
 * }
 */

export const adminMapper = {
  /**
   * Convert single admin from API format to Redux format
   * @param {Object} apiAdmin - Admin object from API (snake_case)
   * @returns {Object} Admin object for Redux store (camelCase)
   */
  toRedux: (apiAdmin) => {
    if (!apiAdmin) return null;

    return {
      adminId: apiAdmin.admin_id || null,
      email: apiAdmin.email || '',
      name: apiAdmin.name || '',
      contact: apiAdmin.contact || '',
      isActive: apiAdmin.is_active ?? true,
      createdAt: apiAdmin.created_at || null,
      lastLogin: apiAdmin.last_login || null,
    };
  },

  /**
   * Convert array of admins from API format to Redux format
   * @param {Array} apiAdmins - Array of admin objects from API (snake_case)
   * @returns {Array} Array of admin objects for Redux store (camelCase)
   */
  toReduxArray: (apiAdmins) => {
    if (!Array.isArray(apiAdmins)) return [];
    return apiAdmins.map((admin) => adminMapper.toRedux(admin));
  },

  /**
   * Convert admin from Redux format to API format (for create/update)
   * @param {Object} reduxAdmin - Admin object from Redux store (camelCase)
   * @returns {Object} Admin object for API request (snake_case)
   */
  toAPI: (reduxAdmin) => {
    if (!reduxAdmin) return null;

    return {
      admin_id: reduxAdmin.adminId || null,
      email: reduxAdmin.email || '',
      name: reduxAdmin.name || '',
      contact: reduxAdmin.contact || '',
      is_active: reduxAdmin.isActive ?? true,
      created_at: reduxAdmin.createdAt || new Date().toISOString(),
      last_login: reduxAdmin.lastLogin || null,
    };
  },

  /**
   * Convert form data to API format
   * Used when creating or updating admin from form
   * @param {Object} formData - Form data (camelCase)
   * @returns {Object} API format (snake_case)
   */
  formToAPI: (formData) => {
    return {
      email: formData.email || '',
      name: formData.name || '',
      contact: formData.contact || '',
      is_active: formData.isActive ?? true,
    };
  },
};

export default adminMapper;
