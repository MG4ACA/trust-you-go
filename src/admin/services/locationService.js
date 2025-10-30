import apiClient from './api';

const locationService = {
  // Get all locations
  getAll: async () => {
    const response = await apiClient.get('/locations');
    return response.data;
  },

  // Get single location by ID
  getById: async (id) => {
    const response = await apiClient.get(`/locations/${id}`);
    return response.data;
  },

  // Create new location
  create: async (locationData) => {
    const dataWithTimestamps = {
      ...locationData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    const response = await apiClient.post('/locations', dataWithTimestamps);
    return response.data;
  },

  // Update location
  update: async (id, locationData) => {
    const dataWithTimestamp = {
      ...locationData,
      updatedAt: new Date().toISOString(),
    };
    const response = await apiClient.put(`/locations/${id}`, dataWithTimestamp);
    return response.data;
  },

  // Delete location
  delete: async (id) => {
    const response = await apiClient.delete(`/locations/${id}`);
    return response.data;
  },

  // Get locations by type
  getByType: async (locationType) => {
    const response = await apiClient.get(`/locations?location_type=${locationType}`);
    return response.data;
  },

  // Get active locations only
  getActive: async () => {
    const response = await apiClient.get('/locations?isActive=true');
    return response.data;
  },
};

export default locationService;
