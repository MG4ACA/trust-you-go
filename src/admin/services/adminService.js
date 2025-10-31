import { API_ENDPOINTS } from '../config/apiConfig';
import apiClient from './api';

/**
 * Admin Service
 * Handles admin user management operations
 */

const adminService = {
  /**
   * Get all admins
   * @returns {Promise<Array>} - List of admins
   */
  async getAll() {
    try {
      const response = await apiClient.get(API_ENDPOINTS.ADMINS);
      return response.data.success ? response.data.data : [];
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch admins');
    }
  },

  /**
   * Get admin by ID
   * @param {string|number} id - Admin ID
   * @returns {Promise<Object>} - Admin data
   */
  async getById(id) {
    try {
      const response = await apiClient.get(API_ENDPOINTS.ADMIN_BY_ID(id));
      return response.data.success ? response.data.data : response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch admin');
    }
  },

  /**
   * Create new admin
   * @param {Object} adminData - Admin data
   * @returns {Promise<Object>} - Created admin
   */
  async create(adminData) {
    try {
      const dataWithTimestamps = {
        ...adminData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      const response = await apiClient.post(API_ENDPOINTS.ADMINS, dataWithTimestamps);
      return response.data.success ? response.data.data : response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to create admin');
    }
  },

  /**
   * Update admin
   * @param {string|number} id - Admin ID
   * @param {Object} adminData - Updated admin data
   * @returns {Promise<Object>} - Updated admin
   */
  async update(id, adminData) {
    try {
      const dataWithTimestamp = {
        ...adminData,
        updatedAt: new Date().toISOString(),
      };

      const response = await apiClient.put(API_ENDPOINTS.ADMIN_BY_ID(id), dataWithTimestamp);
      return response.data.success ? response.data.data : response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to update admin');
    }
  },

  /**
   * Delete admin
   * @param {string|number} id - Admin ID
   * @returns {Promise<void>}
   */
  async delete(id) {
    try {
      await apiClient.delete(API_ENDPOINTS.ADMIN_BY_ID(id));
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to delete admin');
    }
  },

  /**
   * Change admin password
   * @param {string|number} id - Admin ID
   * @param {string} newPassword - New password
   * @returns {Promise<Object>} - Updated admin
   */
  async changePassword(id, newPassword) {
    try {
      const response = await apiClient.patch(API_ENDPOINTS.ADMIN_BY_ID(id), {
        password: newPassword,
        updatedAt: new Date().toISOString(),
      });
      return response.data.success ? response.data.data : response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to change password');
    }
  },
};

export default adminService;
