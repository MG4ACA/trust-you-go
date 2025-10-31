import { API_ENDPOINTS } from '../config/apiConfig';
import apiClient from './api';

const locationService = {
  // Get all locations
  getAll: async () => {
    try {
      const response = await apiClient.get(API_ENDPOINTS.LOCATIONS);
      return response.data.success ? response.data.data : [];
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch locations');
    }
  },

  // Get single location by ID
  getById: async (id) => {
    try {
      const response = await apiClient.get(API_ENDPOINTS.LOCATION_BY_ID(id));
      return response.data.success ? response.data.data : response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch location');
    }
  },

  // Create new location
  create: async (locationData) => {
    try {
      const dataWithTimestamps = {
        ...locationData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      const response = await apiClient.post(API_ENDPOINTS.LOCATIONS, dataWithTimestamps);
      return response.data.success ? response.data.data : response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to create location');
    }
  },

  // Update location
  update: async (id, locationData) => {
    try {
      const dataWithTimestamp = {
        ...locationData,
        updatedAt: new Date().toISOString(),
      };
      const response = await apiClient.put(API_ENDPOINTS.LOCATION_BY_ID(id), dataWithTimestamp);
      return response.data.success ? response.data.data : response.data;
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
      return response.data.success ? response.data.data : [];
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch locations by type');
    }
  },

  // Get active locations only
  getActive: async () => {
    try {
      const response = await apiClient.get(API_ENDPOINTS.LOCATIONS, {
        params: { isActive: true },
      });
      return response.data.success ? response.data.data : [];
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch active locations');
    }
  },
};

export default locationService;
