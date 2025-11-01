import { API_ENDPOINTS } from '../config/apiConfig';
import { locationMapper } from '../mappers';
import apiClient from './api';

/**
 * Location Service
 * Handles all location-related API calls
 *
 * IMPORTANT: All methods return camelCase data (converted by locationMapper)
 * This ensures Redux store receives consistent, predictable data format
 */

const locationService = {
  // Get all locations
  getAll: async () => {
    try {
      const response = await apiClient.get(API_ENDPOINTS.LOCATIONS);
      const data = response.data.success ? response.data.data : [];
      // Convert snake_case API response to camelCase for Redux
      return locationMapper.toReduxArray(data);
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch locations');
    }
  },

  // Get single location by ID
  getById: async (id) => {
    try {
      const response = await apiClient.get(API_ENDPOINTS.LOCATION_BY_ID(id));
      const data = response.data.success ? response.data.data : response.data;
      // Convert snake_case API response to camelCase for Redux
      return locationMapper.toRedux(data);
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch location');
    }
  },

  // Create new location
  create: async (locationData) => {
    try {
      // Convert camelCase form data to snake_case API format
      const apiFormat = locationMapper.formToAPI(locationData);

      const response = await apiClient.post(API_ENDPOINTS.LOCATIONS, apiFormat);
      const data = response.data.success ? response.data.data : response.data;

      // Convert snake_case API response back to camelCase for Redux
      return locationMapper.toRedux(data);
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to create location');
    }
  },

  // Update location
  update: async (id, locationData) => {
    try {
      // Convert camelCase form data to snake_case API format
      const apiFormat = locationMapper.formToAPI(locationData);

      const response = await apiClient.put(API_ENDPOINTS.LOCATION_BY_ID(id), apiFormat);
      const data = response.data.success ? response.data.data : response.data;

      // Convert snake_case API response back to camelCase for Redux
      return locationMapper.toRedux(data);
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to update location');
    }
  },

  // Delete location
  delete: async (id) => {
    try {
      const response = await apiClient.delete(API_ENDPOINTS.LOCATION_BY_ID(id));
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to delete location');
    }
  },

  // Get locations by type
  getByType: async (locationType) => {
    try {
      const response = await apiClient.get(API_ENDPOINTS.LOCATIONS, {
        params: { location_type: locationType },
      });
      const data = response.data.success ? response.data.data : [];
      // Convert snake_case API response to camelCase for Redux
      return locationMapper.toReduxArray(data);
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch locations by type');
    }
  },

  // Get active locations only
  getActive: async () => {
    try {
      const response = await apiClient.get(API_ENDPOINTS.LOCATIONS, {
        params: { is_active: true },
      });
      const data = response.data.success ? response.data.data : [];
      // Convert snake_case API response to camelCase for Redux
      return locationMapper.toReduxArray(data);
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch active locations');
    }
  },
};

export default locationService;
