import { API_ENDPOINTS } from '../config/apiConfig';
import { bookingMapper } from '../mappers';
import apiClient from './api';

/**
 * Booking Service
 * Handles all booking-related API calls
 *
 * IMPORTANT: All methods return camelCase data (converted by bookingMapper)
 * This ensures Redux store receives consistent, predictable data format
 */
class BookingService {
  /**
   * Get all bookings
   * @param {Object} params Query parameters for filtering
   * @returns {Promise} List of bookings (camelCase)
   */
  async getAll(params = {}) {
    try {
      const response = await apiClient.get(API_ENDPOINTS.BOOKINGS, { params });
      const data = response.data.success ? response.data.data : [];
      // Convert snake_case API response to camelCase for Redux
      return bookingMapper.toReduxArray(data);
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch bookings');
    }
  }

  /**
   * Get a booking by ID with populated relationships
   * @param {string} id Booking ID
   * @returns {Promise} Booking details (camelCase) with package and agent data
   */
  async getById(id) {
    try {
      const response = await apiClient.get(API_ENDPOINTS.BOOKING_BY_ID(id));
      const data = response.data.success ? response.data.data : response.data;
      // Convert snake_case API response to camelCase for Redux
      return bookingMapper.toRedux(data);
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch booking');
    }
  }

  /**
   * Get bookings by package ID
   * @param {string} packageId Package ID
   * @returns {Promise} List of bookings (camelCase) for the package
   */
  async getByPackageId(packageId) {
    try {
      const response = await apiClient.get(API_ENDPOINTS.BOOKINGS_BY_PACKAGE(packageId));
      const data = response.data.success ? response.data.data : [];
      // Convert snake_case API response to camelCase for Redux
      return bookingMapper.toReduxArray(data);
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch bookings by package');
    }
  }

  /**
   * Get bookings by agent ID
   * @param {string} agentId Agent ID
   * @returns {Promise} List of bookings (camelCase) for the agent
   */
  async getByAgentId(agentId) {
    try {
      const response = await apiClient.get(API_ENDPOINTS.BOOKINGS_BY_AGENT(agentId));
      const data = response.data.success ? response.data.data : [];
      // Convert snake_case API response to camelCase for Redux
      return bookingMapper.toReduxArray(data);
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch bookings by agent');
    }
  }

  /**
   * Create a new booking
   * @param {Object} data Booking data (camelCase from form)
   * @returns {Promise} Created booking (camelCase) with populated relationships
   */
  async create(data) {
    try {
      // Convert camelCase form data to snake_case API format
      const apiFormat = bookingMapper.formToAPI(data);

      const response = await apiClient.post(API_ENDPOINTS.BOOKINGS, apiFormat);
      const responseData = response.data.success ? response.data.data : response.data;

      // Convert snake_case API response back to camelCase for Redux
      return bookingMapper.toRedux(responseData);
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to create booking');
    }
  }

  /**
   * Update a booking
   * @param {string} id Booking ID
   * @param {Object} data Updated booking data (camelCase from form)
   * @returns {Promise} Updated booking (camelCase) with populated relationships
   */
  async update(id, data) {
    try {
      // Convert camelCase form data to snake_case API format
      const apiFormat = bookingMapper.formToAPI(data);

      const response = await apiClient.put(API_ENDPOINTS.BOOKING_BY_ID(id), apiFormat);
      const responseData = response.data.success ? response.data.data : response.data;

      // Convert snake_case API response back to camelCase for Redux
      return bookingMapper.toRedux(responseData);
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
   * @returns {Promise} Filtered bookings (camelCase)
   */
  async getByStatus(status) {
    try {
      const response = await apiClient.get(API_ENDPOINTS.BOOKINGS, {
        params: { status },
      });
      const data = response.data.success ? response.data.data : [];
      // Convert snake_case API response to camelCase for Redux
      return bookingMapper.toReduxArray(data);
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch bookings by status');
    }
  }

  /**
   * Get recent bookings
   * @param {number} limit Number of recent bookings to fetch
   * @returns {Promise} Recent bookings (camelCase)
   */
  async getRecent(limit = 10) {
    try {
      const response = await apiClient.get(API_ENDPOINTS.BOOKINGS, {
        params: {
          _sort: 'created_at',
          _order: 'desc',
          _limit: limit,
        },
      });
      const data = response.data.success ? response.data.data : [];
      // Convert snake_case API response to camelCase for Redux
      return bookingMapper.toReduxArray(data);
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch recent bookings');
    }
  }
}

export const bookingService = new BookingService();
