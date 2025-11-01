import { API_ENDPOINTS } from '../config/apiConfig';
import { adminMapper } from '../mappers';
import apiClient from './api';

/**
 * Admin Service
 * Handles admin user management operations
 *
 * IMPORTANT: All methods return camelCase data (converted by adminMapper)
 * This ensures Redux store receives consistent, predictable data format
 */

const adminService = {
  /**
   * Get all admins
   * @returns {Promise<Array>} - List of admins (camelCase)
   */
  async getAll() {
    try {
      const response = await apiClient.get(API_ENDPOINTS.ADMINS);
      const data = response.data.success ? response.data.data : [];
      // Convert snake_case API response to camelCase for Redux
      return adminMapper.toReduxArray(data);
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch admins');
    }
  },

  /**
   * Get admin by ID
   * @param {string|number} id - Admin ID
   * @returns {Promise<Object>} - Admin data (camelCase)
   */
  async getById(id) {
    try {
      const response = await apiClient.get(API_ENDPOINTS.ADMIN_BY_ID(id));
      const data = response.data.success ? response.data.data : response.data;
      // Convert snake_case API response to camelCase for Redux
      return adminMapper.toRedux(data);
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch admin');
    }
  },

  /**
   * Create new admin
   * @param {Object} adminData - Admin data (camelCase from form)
   * @returns {Promise<Object>} - Created admin (camelCase)
   */
  async create(adminData) {
    try {
      // Convert camelCase form data to snake_case API format
      const apiFormat = adminMapper.formToAPI(adminData);

      const response = await apiClient.post(API_ENDPOINTS.ADMINS, apiFormat);
      const data = response.data.success ? response.data.data : response.data;

      // Convert snake_case API response back to camelCase for Redux
      return adminMapper.toRedux(data);
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to create admin');
    }
  },

  /**
   * Update admin
   * @param {string|number} id - Admin ID
   * @param {Object} adminData - Updated admin data (camelCase from form)
   * @returns {Promise<Object>} - Updated admin (camelCase)
   */
  async update(id, adminData) {
    try {
      // Convert camelCase form data to snake_case API format
      const apiFormat = adminMapper.formToAPI(adminData);

      const response = await apiClient.put(API_ENDPOINTS.ADMIN_BY_ID(id), apiFormat);
      const data = response.data.success ? response.data.data : response.data;

      // Convert snake_case API response back to camelCase for Redux
      return adminMapper.toRedux(data);
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
   * @param {string} newPassword - New password (camelCase)
   * @returns {Promise<Object>} - Updated admin (camelCase)
   */
  async changePassword(id, newPassword) {
    try {
      // Prepare update object with snake_case field name
      const updateData = {
        password_hash: newPassword,
        updated_at: new Date().toISOString(),
      };

      const response = await apiClient.patch(API_ENDPOINTS.ADMIN_BY_ID(id), updateData);
      const data = response.data.success ? response.data.data : response.data;

      // Convert snake_case API response back to camelCase for Redux
      return adminMapper.toRedux(data);
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to change password');
    }
  },
};

export default adminService;
