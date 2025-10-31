import { apiClient } from '../api';
import { API_ENDPOINTS } from '../config/apiConfig';

/**
 * Package Service
 * Handles all package-related API calls
 */
class PackageService {
  /**
   * Get all packages
   * @param {Object} params Query parameters for filtering
   * @returns {Promise} List of packages
   */
  async getAll(params = {}) {
    const response = await apiClient.get(API_ENDPOINTS.PACKAGES, { params });
    return response.data.success ? response.data.data : [];
  }

  /**
   * Get a package by ID
   * @param {string} id Package ID
   * @returns {Promise} Package details
   */
  async getById(id) {
    const response = await apiClient.get(API_ENDPOINTS.PACKAGE_BY_ID(id));
    return response.data.success ? response.data.data : response.data;
  }

  /**
   * Create a new package
   * @param {Object} data Package data
   * @returns {Promise} Created package
   */
  async create(data) {
    const response = await apiClient.post(API_ENDPOINTS.PACKAGES, {
      ...data,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
    return response.data.success ? response.data.data : response.data;
  }

  /**
   * Update a package
   * @param {string} id Package ID
   * @param {Object} data Updated package data
   * @returns {Promise} Updated package
   */
  async update(id, data) {
    const response = await apiClient.put(API_ENDPOINTS.PACKAGE_BY_ID(id), {
      ...data,
      updatedAt: new Date().toISOString(),
    });
    return response.data.success ? response.data.data : response.data;
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
