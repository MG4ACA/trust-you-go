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
      // Query mock server for admin by email
      const response = await apiClient.get(API_ENDPOINTS.ADMINS, {
        params: { email },
      });

      // Handle new response structure
      const admins = response.data.success ? response.data.data : response.data;

      if (!admins || admins.length === 0) {
        throw new Error('Invalid email or password');
      }

      const admin = admins[0];

      // Simple password check (in production, backend handles this)
      if (admin.password_hash !== password.toString()) {
        throw new Error('Invalid email or password');
      }

      // Generate mock JWT token
      const token = `mock_jwt_token_${admin.id}_${Date.now()}`;

      // Store token and user in localStorage
      localStorage.setItem('adminToken', token);
      localStorage.setItem(
        'adminUser',
        JSON.stringify({
          id: admin.id,
          username: admin.username,
          email: admin.email,
          role: admin.role,
        })
      );

      return {
        user: {
          id: admin.id,
          username: admin.username,
          email: admin.email,
          role: admin.role,
        },
        token,
      };
    } catch (error) {
      throw new Error(error.message || 'Login failed');
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
