/**
 * Package Mapper
 * Converts API response (snake_case) to Redux store format (camelCase)
 *
 * API Response Format (snake_case):
 * {
 *   package_id: '1',
 *   title: 'Cultural Triangle Explorer',
 *   description: 'Ancient cities tour...',
 *   no_of_days: 7,
 *   is_template: false,
 *   is_active: true,
 *   base_price: 850,
 *   created_by: 'admin_1',
 *   created_at: '2025-01-15T10:00:00.000Z',
 *   updated_at: '2025-10-30T08:53:29.398Z'
 * }
 *
 * Redux Store Format (camelCase):
 * {
 *   packageId: '1',
 *   title: 'Cultural Triangle Explorer',
 *   description: 'Ancient cities tour...',
 *   noOfDays: 7,
 *   isTemplate: false,
 *   isActive: true,
 *   basePrice: 850,
 *   createdBy: 'admin_1',
 *   createdAt: '2025-01-15T10:00:00.000Z',
 *   updatedAt: '2025-10-30T08:53:29.398Z',
 *   packageLocations: [] (from separate endpoint)
 * }
 */

export const packageMapper = {
  /**
   * Convert single package from API format to Redux format
   * @param {Object} apiPackage - Package object from API (snake_case)
   * @returns {Object} Package object for Redux store (camelCase)
   */
  toRedux: (apiPackage) => {
    if (!apiPackage) return null;

    return {
      packageId: apiPackage.package_id || null,
      title: apiPackage.title || '',
      description: apiPackage.description || '',
      noOfDays: apiPackage.no_of_days || 1,
      isTemplate: apiPackage.is_template ?? false,
      isActive: apiPackage.is_active ?? true,
      basePrice: apiPackage.base_price ?? 0,
      createdBy: apiPackage.created_by || null,
      createdAt: apiPackage.created_at || null,
      updatedAt: apiPackage.updated_at || null,
      packageLocations: apiPackage.packageLocations || [],
    };
  },

  /**
   * Convert array of packages from API format to Redux format
   * @param {Array} apiPackages - Array of package objects from API (snake_case)
   * @returns {Array} Array of package objects for Redux store (camelCase)
   */
  toReduxArray: (apiPackages) => {
    if (!Array.isArray(apiPackages)) return [];
    return apiPackages.map((pkg) => packageMapper.toRedux(pkg));
  },

  /**
   * Convert package from Redux format to API format (for create/update)
   * @param {Object} reduxPackage - Package object from Redux store (camelCase)
   * @returns {Object} Package object for API request (snake_case)
   */
  toAPI: (reduxPackage) => {
    if (!reduxPackage) return null;

    return {
      package_id: reduxPackage.packageId || null,
      title: reduxPackage.title || '',
      description: reduxPackage.description || '',
      no_of_days: reduxPackage.noOfDays || 1,
      is_template: reduxPackage.isTemplate ?? false,
      is_active: reduxPackage.isActive ?? true,
      base_price: reduxPackage.basePrice ?? 0,
      created_by: reduxPackage.createdBy || null,
      created_at: reduxPackage.createdAt || new Date().toISOString(),
      updated_at: reduxPackage.updatedAt || new Date().toISOString(),
    };
  },

  /**
   * Convert form data to API format
   * Used when creating or updating package from form
   * @param {Object} formData - Form data (camelCase)
   * @returns {Object} API format (snake_case)
   */
  formToAPI: (formData) => {
    return {
      title: formData.title || '',
      description: formData.description || '',
      no_of_days: formData.noOfDays || 1,
      is_template: formData.isTemplate ?? false,
      is_active: formData.isActive ?? true,
      base_price: formData.basePrice ?? 0,
    };
  },
};

export default packageMapper;
