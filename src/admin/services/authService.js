import { API_ENDPOINTS } from '../config/apiConfig';
import apiClient from './api';

/**
 * Authentication Service
 * Handles admin login, logout, and session management
 */

const authService = {
  /**
   * Login admin user
   * @param {string} email - Admin email
   * @param {string} password - Admin password
   * @returns {Promise} - Admin user data and token
   */
  async login(email, password) {
    try {
      // Make a POST request to the real backend login endpoint
      const response = await apiClient.post(API_ENDPOINTS.AUTH_LOGIN, {
        email,
        password,
      });

      // The backend returns { success: true, data: { token, user }, message: ... }
      const { token, user } = response.data.data;

      // Store token and user in localStorage
      localStorage.setItem('adminToken', token);
      localStorage.setItem('adminUser', JSON.stringify(user));

      return {
        user,
        token,
      };
    } catch (error) {
      throw new Error(error.response?.data?.message || error.message || 'Login failed');
    }
  },

  /**
   * Logout admin user
   * Clears token and user data from localStorage
   */
  logout() {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
  },

  /**
   * Check if user is authenticated
   * @returns {boolean} - Authentication status
   */
  isAuthenticated() {
    const token = localStorage.getItem('adminToken');
    return !!token;
  },

  /**
   * Get current user from localStorage
   * @returns {Object|null} - Current user data or null
   */
  getCurrentUser() {
    const userStr = localStorage.getItem('adminUser');
    if (!userStr) return null;

    try {
      return JSON.parse(userStr);
    } catch (error) {
      console.error('Error parsing user data:', error);
      return null;
    }
  },

  /**
   * Get current auth token
   * @returns {string|null} - Auth token or null
   */
  getToken() {
    return localStorage.getItem('adminToken');
  },

  /**
   * Verify token validity
   * In production, this would make an API call to verify the token
   * @returns {Promise<boolean>} - Token validity
   */
  async verifyToken() {
    const token = this.getToken();
    if (!token) return false;

    // For mock server, just check if token exists
    // In production, you'd verify with backend
    return true;
  },
};

export default authService;
