import { API_ENDPOINTS } from '../config/apiConfig';
import apiClient from './api';

/**
 * Booking Service
 * Handles all booking-related API calls
 */
class BookingService {
  /**
   * Get all bookings
   * @param {Object} params Query parameters for filtering
   * @returns {Promise} List of bookings
   */
  async getAll(params = {}) {
    try {
      const response = await apiClient.get(API_ENDPOINTS.BOOKINGS, { params });
      return response.data.success ? response.data.data : [];
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch bookings');
    }
  }

  /**
   * Get a booking by ID with populated relationships
   * @param {string} id Booking ID
   * @returns {Promise} Booking details with package and agent data
   */
  async getById(id) {
    try {
      const response = await apiClient.get(API_ENDPOINTS.BOOKING_BY_ID(id));
      return response.data.success ? response.data.data : response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch booking');
    }
  }

  /**
   * Get bookings by package ID
   * @param {string} packageId Package ID
   * @returns {Promise} List of bookings for the package
   */
  async getByPackageId(packageId) {
    try {
      const response = await apiClient.get(API_ENDPOINTS.BOOKINGS_BY_PACKAGE(packageId));
      return response.data.success ? response.data.data : [];
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch bookings by package');
    }
  }

  /**
   * Get bookings by agent ID
   * @param {string} agentId Agent ID
   * @returns {Promise} List of bookings for the agent
   */
  async getByAgentId(agentId) {
    try {
      const response = await apiClient.get(API_ENDPOINTS.BOOKINGS_BY_AGENT(agentId));
      return response.data.success ? response.data.data : [];
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch bookings by agent');
    }
  }

  /**
   * Create a new booking
   * @param {Object} data Booking data
   * @returns {Promise} Created booking with populated relationships
   */
  async create(data) {
    try {
      const response = await apiClient.post(API_ENDPOINTS.BOOKINGS, data);
      return response.data.success ? response.data.data : response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to create booking');
    }
  }

  /**
   * Update a booking
   * @param {string} id Booking ID
   * @param {Object} data Updated booking data
   * @returns {Promise} Updated booking with populated relationships
   */
  async update(id, data) {
    try {
      const response = await apiClient.put(API_ENDPOINTS.BOOKING_BY_ID(id), data);
      return response.data.success ? response.data.data : response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to update booking');
    }
  }

  /**
   * Delete a booking
   * @param {string} id Booking ID
   * @returns {Promise} Success message
   */
  async delete(id) {
    try {
      const response = await apiClient.delete(API_ENDPOINTS.BOOKING_BY_ID(id));
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to delete booking');
    }
  }

  /**
   * Get bookings by status
   * @param {string} status Booking status (pending, confirmed, cancelled)
   * @returns {Promise} Filtered bookings
   */
  async getByStatus(status) {
    try {
      const response = await apiClient.get(API_ENDPOINTS.BOOKINGS, {
        params: { status },
      });
      return response.data.success ? response.data.data : [];
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch bookings by status');
    }
  }

  /**
   * Get recent bookings
   * @param {number} limit Number of recent bookings to fetch
   * @returns {Promise} Recent bookings
   */
  async getRecent(limit = 10) {
    try {
      const response = await apiClient.get(API_ENDPOINTS.BOOKINGS, {
        params: {
          _sort: 'createdAt',
          _order: 'desc',
          _limit: limit,
        },
      });
      return response.data.success ? response.data.data : [];
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch recent bookings');
    }
  }
}

export const bookingService = new BookingService();
