import apiClient from './api';

/**
 * Package Location Service
 * Handles package-location relationship operations
 */
class PackageLocationService {
  /**
   * Get package locations by package ID
   * @param {string} packageId - Package ID
   * @returns {Promise<Array>} - List of package locations
   */
  async getByPackageId(packageId) {
    try {
      const response = await apiClient.get(`/package-locations?packageId=${packageId}`);
      return response.data.success ? response.data.data : [];
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch package locations');
    }
  }

  /**
   * Create new package location
   * @param {Object} data - Package location data
   * @returns {Promise<Object>} - Created package location
   */
  async create(data) {
    try {
      const dataWithTimestamps = {
        ...data,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      const response = await apiClient.post('/package-locations', dataWithTimestamps);
      return response.data.success ? response.data.data : response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to create package location');
    }
  }

  /**
   * Update package location
   * @param {string} id - Package location ID
   * @param {Object} data - Updated package location data
   * @returns {Promise<Object>} - Updated package location
   */
  async update(id, data) {
    try {
      const dataWithTimestamp = {
        ...data,
        updatedAt: new Date().toISOString(),
      };

      const response = await apiClient.put(`/package-locations/${id}`, dataWithTimestamp);
      return response.data.success ? response.data.data : response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to update package location');
    }
  }

  /**
   * Delete package location
   * @param {string} id - Package location ID
   * @returns {Promise<string>} - Deleted package location ID
   */
  async delete(id) {
    try {
      await apiClient.delete(`/package-locations/${id}`);
      return id;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to delete package location');
    }
  }
}

export const packageLocationService = new PackageLocationService();
