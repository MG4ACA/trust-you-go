/**
 * Package Location Mapper
 * Converts API response (snake_case) to Redux store format (camelCase)
 *
 * API Response Format (snake_case):
 * {
 *   id: '1',
 *   package_id: '1',
 *   location_id: '5',
 *   day_number: 2,
 *   visit_order: 0,
 *   notes: 'Visit in morning',
 *   created_at: '2025-01-10T10:00:00.000Z'
 * }
 *
 * Redux Store Format (camelCase):
 * {
 *   id: '1',
 *   packageId: '1',
 *   locationId: '5',
 *   dayNumber: 2,
 *   visitOrder: 0,
 *   notes: 'Visit in morning',
 *   createdAt: '2025-01-10T10:00:00.000Z'
 * }
 */

export const packageLocationMapper = {
  /**
   * Convert single package location from API format to Redux format
   * @param {Object} apiPackageLocation - Package location object from API (snake_case)
   * @returns {Object} Package location object for Redux store (camelCase)
   */
  toRedux: (apiPackageLocation) => {
    if (!apiPackageLocation) return null;

    return {
      id: apiPackageLocation.id || null,
      packageId: apiPackageLocation.package_id || null,
      locationId: apiPackageLocation.location_id || null,
      dayNumber: apiPackageLocation.day_number || 1,
      visitOrder: apiPackageLocation.visit_order ?? 0,
      notes: apiPackageLocation.notes || '',
      createdAt: apiPackageLocation.created_at || null,
    };
  },

  /**
   * Convert array of package locations from API format to Redux format
   * @param {Array} apiPackageLocations - Array of package location objects from API (snake_case)
   * @returns {Array} Array of package location objects for Redux store (camelCase)
   */
  toReduxArray: (apiPackageLocations) => {
    if (!Array.isArray(apiPackageLocations)) return [];
    return apiPackageLocations.map((pl) => packageLocationMapper.toRedux(pl));
  },

  /**
   * Convert package location from Redux format to API format (for create/update)
   * @param {Object} reduxPackageLocation - Package location object from Redux store (camelCase)
   * @returns {Object} Package location object for API request (snake_case)
   */
  toAPI: (reduxPackageLocation) => {
    if (!reduxPackageLocation) return null;

    return {
      id: reduxPackageLocation.id || null,
      package_id: reduxPackageLocation.packageId || null,
      location_id: reduxPackageLocation.locationId || null,
      day_number: reduxPackageLocation.dayNumber || 1,
      visit_order: reduxPackageLocation.visitOrder ?? 0,
      notes: reduxPackageLocation.notes || '',
      created_at: reduxPackageLocation.createdAt || new Date().toISOString(),
    };
  },

  /**
   * Convert form data to API format
   * Used when creating or updating package location from form
   * @param {Object} formData - Form data (camelCase)
   * @returns {Object} API format (snake_case)
   */
  formToAPI: (formData) => {
    return {
      package_id: formData.packageId || null,
      location_id: formData.locationId || null,
      day_number: formData.dayNumber || 1,
      visit_order: formData.visitOrder ?? 0,
      notes: formData.notes || '',
    };
  },
};

export default packageLocationMapper;
