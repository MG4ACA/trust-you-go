import { apiClient } from '../api';
import { API_ENDPOINTS } from '../config/apiConfig';
import { packageMapper } from '../mappers';

/**
 * Package Service
 * Handles all package-related API calls
 *
 * IMPORTANT: All methods return camelCase data (converted by packageMapper)
 * This ensures Redux store receives consistent, predictable data format
 */
class PackageService {
  /**
   * Get all packages
   * @param {Object} params Query parameters for filtering
   * @returns {Promise} List of packages (camelCase)
   */
  async getAll(params = {}) {
    const response = await apiClient.get(API_ENDPOINTS.PACKAGES, { params });
    const data = response.data.success ? response.data.data : [];
    // Convert snake_case API response to camelCase for Redux
    return packageMapper.toReduxArray(data);
  }

  /**
   * Get a package by ID
   * @param {string} id Package ID
   * @returns {Promise} Package details (camelCase)
   */
  async getById(id) {
    const response = await apiClient.get(API_ENDPOINTS.PACKAGE_BY_ID(id));
    const data = response.data.success ? response.data.data : response.data;
    // Convert snake_case API response to camelCase for Redux
    return packageMapper.toRedux(data);
  }

  /**
   * Create a new package
   * @param {Object} data Package data (camelCase from form)
   * @returns {Promise} Created package (camelCase)
   */
  async create(data) {
    // Convert camelCase form data to snake_case API format
    const apiFormat = packageMapper.formToAPI(data);

    const response = await apiClient.post(API_ENDPOINTS.PACKAGES, apiFormat);
    const responseData = response.data.success ? response.data.data : response.data;

    // Convert snake_case API response back to camelCase for Redux
    return packageMapper.toRedux(responseData);
  }

  /**
   * Update a package
   * @param {string} id Package ID
   * @param {Object} data Updated package data (camelCase from form)
   * @returns {Promise} Updated package (camelCase)
   */
  async update(id, data) {
    // Convert camelCase form data to snake_case API format
    const apiFormat = packageMapper.formToAPI(data);

    const response = await apiClient.put(API_ENDPOINTS.PACKAGE_BY_ID(id), apiFormat);
    const responseData = response.data.success ? response.data.data : response.data;

    // Convert snake_case API response back to camelCase for Redux
    return packageMapper.toRedux(responseData);
  }

  /**
   * Delete a package
   * @param {string} id Package ID
   * @returns {Promise} Void
   */
  async delete(id) {
    await apiClient.delete(API_ENDPOINTS.PACKAGE_BY_ID(id));
  }
}

export const packageService = new PackageService();
