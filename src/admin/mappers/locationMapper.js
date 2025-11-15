/**
 * Location Mapper
 * Converts API response (snake_case) to Redux store format (camelCase)
 *
 * API Response Format (snake_case):
 * {
 *   location_id: '1',
 *   name: 'Sigiriya Rock Fortress',
 *   description: 'Ancient rock fortress...',
 *   location_type: 'tourist_spot',
 *   location_url: 'https://maps.google.com/...',
 *   is_active: true,
 *   created_at: '2025-01-10T10:00:00.000Z',
 *   updated_at: '2025-10-15T14:00:00.000Z'
 * }
 *
 * Redux Store Format (camelCase):
 * {
 *   locationId: '1',
 *   name: 'Sigiriya Rock Fortress',
 *   description: 'Ancient rock fortress...',
 *   locationType: 'tourist_spot',
 *   locationUrl: 'https://maps.google.com/...',
 *   isActive: true,
 *   createdAt: '2025-01-10T10:00:00.000Z',
 *   updatedAt: '2025-10-15T14:00:00.000Z'
 * }
 */

export const locationMapper = {
  /**
   * Convert single location from API format to Redux format
   * @param {Object} apiLocation - Location object from API (snake_case)
   * @returns {Object} Location object for Redux store (camelCase)
   */
  toRedux: (apiLocation) => {
    if (!apiLocation) return null;

    return {
      locationId: apiLocation.location_id || null,
      name: apiLocation.name || '',
      description: apiLocation.description || '',
      locationType: apiLocation.location_type || 'tourist_spot',
      locationUrl: apiLocation.location_url || '',
      isActive: apiLocation.is_active ?? true,
      createdAt: apiLocation.created_at || null,
      updatedAt: apiLocation.updated_at || null,
    };
  },

  /**
   * Convert array of locations from API format to Redux format
   * @param {Array} apiLocations - Array of location objects from API (snake_case)
   * @returns {Array} Array of location objects for Redux store (camelCase)
   */
  toReduxArray: (apiLocations) => {
    if (!Array.isArray(apiLocations)) return [];
    return apiLocations.map((location) => locationMapper.toRedux(location));
  },

  /**
   * Convert location from Redux format to API format (for create/update)
   * @param {Object} reduxLocation - Location object from Redux store (camelCase)
   * @returns {Object} Location object for API request (snake_case)
   */
  toAPI: (reduxLocation) => {
    if (!reduxLocation) return null;

    return {
      location_id: reduxLocation.locationId || null,
      name: reduxLocation.name || '',
      description: reduxLocation.description || '',
      location_type: reduxLocation.locationType || 'tourist_spot',
      location_url: reduxLocation.locationUrl || '',
      is_active: reduxLocation.isActive ?? true,
      created_at: reduxLocation.createdAt || new Date().toISOString(),
      updated_at: reduxLocation.updatedAt || new Date().toISOString(),
    };
  },

  /**
   * Convert form data to API format
   * Used when creating or updating location from form
   * @param {Object} formData - Form data (camelCase)
   * @returns {Object} API format (snake_case)
   */
  formToAPI: (formData) => {
    return {
      name: formData.name || '',
      description: formData.description || '',
      location_type: formData.locationType || 'tourist_spot',
      location_url: formData.locationUrl || '',
      is_active: formData.isActive ?? true,
    };
  },
};

export default locationMapper;
