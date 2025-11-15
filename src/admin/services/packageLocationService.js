import { API_ENDPOINTS } from '../config/apiConfig';
import { packageLocationMapper } from '../mappers';
import apiClient from './api';

/**
 * Package Location Service
 * Handles package-location relationship operations
 *
 * IMPORTANT: All methods return camelCase data (converted by packageLocationMapper)
 * This ensures Redux store receives consistent, predictable data format
 */
class PackageLocationService {
  /**
   * Get package locations by package ID
   * @param {string} packageId - Package ID
   * @returns {Promise<Array>} - List of package locations (camelCase)
   */
  async getByPackageId(packageId) {
    try {
      const response = await apiClient.get(API_ENDPOINTS.PACKAGE_LOCATIONS, {
        params: { package_id: packageId },
      });
      const data = response.data.success ? response.data.data : [];
      // Convert snake_case API response to camelCase for Redux
      return packageLocationMapper.toReduxArray(data);
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch package locations');
    }
  }

  /**
   * Create new package location
   * @param {Object} data - Package location data (camelCase from form)
   * @returns {Promise<Object>} - Created package location (camelCase)
   */
  async create(data) {
    try {
      // Convert camelCase form data to snake_case API format
      const apiFormat = packageLocationMapper.formToAPI(data);

      const response = await apiClient.post(API_ENDPOINTS.PACKAGE_LOCATIONS, apiFormat);
      const responseData = response.data.success ? response.data.data : response.data;

      // Convert snake_case API response back to camelCase for Redux
      return packageLocationMapper.toRedux(responseData);
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to create package location');
    }
  }

  /**
   * Update package location
   * @param {string} id - Package location ID
   * @param {Object} data - Updated package location data (camelCase from form)
   * @returns {Promise<Object>} - Updated package location (camelCase)
   */
  async update(id, data) {
    try {
      // Convert camelCase form data to snake_case API format
      const apiFormat = packageLocationMapper.formToAPI(data);

      const response = await apiClient.put(API_ENDPOINTS.PACKAGE_LOCATION_BY_ID(id), apiFormat);
      const responseData = response.data.success ? response.data.data : response.data;

      // Convert snake_case API response back to camelCase for Redux
      return packageLocationMapper.toRedux(responseData);
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to update package location');
    }
  }

  /**
   * Delete package location
   * @param {string} id - Package location ID
   * @returns {Promise<string>} - Deleted package location ID
   */
  async delete(id) {
    try {
      await apiClient.delete(API_ENDPOINTS.PACKAGE_LOCATION_BY_ID(id));
      return id;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to delete package location');
    }
  }
}

export const packageLocationService = new PackageLocationService();
