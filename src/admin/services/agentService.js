import { API_ENDPOINTS } from '../config/apiConfig';
import apiClient from './api';

/**
 * Agent Service
 * Handles all CRUD operations for travel agents
 */

const agentService = {
  /**
   * Get all agents
   * @param {Object} params - Query parameters (pagination, filters, etc.)
   * @returns {Promise<Array>} - List of agents
   */
  async getAll(params = {}) {
    try {
      const response = await apiClient.get(API_ENDPOINTS.AGENTS, { params });
      return response.data.success ? response.data.data : [];
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch agents');
    }
  },

  /**
   * Get agent by ID
   * @param {string|number} id - Agent ID
   * @returns {Promise<Object>} - Agent data
   */
  async getById(id) {
    try {
      const response = await apiClient.get(API_ENDPOINTS.AGENT_BY_ID(id));
      return response.data.success ? response.data.data : response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch agent');
    }
  },

  /**
   * Create new agent
   * @param {Object} agentData - Agent data
   * @returns {Promise<Object>} - Created agent
   */
  async create(agentData) {
    try {
      // Add timestamps
      const dataWithTimestamps = {
        ...agentData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      const response = await apiClient.post(API_ENDPOINTS.AGENTS, dataWithTimestamps);
      return response.data.success ? response.data.data : response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to create agent');
    }
  },

  /**
   * Update agent
   * @param {string|number} id - Agent ID
   * @param {Object} agentData - Updated agent data
   * @returns {Promise<Object>} - Updated agent
   */
  async update(id, agentData) {
    try {
      // Add updated timestamp
      const dataWithTimestamp = {
        ...agentData,
        updatedAt: new Date().toISOString(),
      };

      const response = await apiClient.put(API_ENDPOINTS.AGENT_BY_ID(id), dataWithTimestamp);
      return response.data.success ? response.data.data : response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to update agent');
    }
  },

  /**
   * Patch agent (partial update)
   * @param {string|number} id - Agent ID
   * @param {Object} updates - Partial updates
   * @returns {Promise<Object>} - Updated agent
   */
  async patch(id, updates) {
    try {
      const dataWithTimestamp = {
        ...updates,
        updatedAt: new Date().toISOString(),
      };

      const response = await apiClient.patch(API_ENDPOINTS.AGENT_BY_ID(id), dataWithTimestamp);
      return response.data.success ? response.data.data : response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to patch agent');
    }
  },

  /**
   * Delete agent
   * @param {string|number} id - Agent ID
   * @returns {Promise<void>}
   */
  async delete(id) {
    try {
      await apiClient.delete(API_ENDPOINTS.AGENT_BY_ID(id));
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to delete agent');
    }
  },

  /**
   * Search agents by name, email, or phone
   * @param {string} query - Search query
   * @returns {Promise<Array>} - Matching agents
   */
  async search(query) {
    try {
      // JSON Server supports full-text search with 'q' parameter
      const response = await apiClient.get(API_ENDPOINTS.AGENTS, {
        params: { q: query },
      });
      return response.data.success ? response.data.data : [];
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to search agents');
    }
  },

  /**
   * Get agents by status
   * @param {string} status - Agent status (active, inactive, pending)
   * @returns {Promise<Array>} - Filtered agents
   */
  async getByStatus(status) {
    try {
      const response = await apiClient.get(API_ENDPOINTS.AGENTS, {
        params: { status },
      });
      return response.data.success ? response.data.data : [];
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch agents by status');
    }
  },

  /**
   * Get paginated agents
   * @param {number} page - Page number (starting from 1)
   * @param {number} limit - Items per page
   * @returns {Promise<Object>} - Paginated response with data and metadata
   */
  async getPaginated(page = 1, limit = 10) {
    try {
      const response = await apiClient.get(API_ENDPOINTS.AGENTS, {
        params: {
          _page: page,
          _limit: limit,
          _sort: 'createdAt',
          _order: 'desc',
        },
      });

      // JSON Server returns total count in headers
      const total = parseInt(response.headers['x-total-count'] || '0', 10);

      return {
        data: response.data.success ? response.data.data : response.data,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
        },
      };
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch paginated agents');
    }
  },
};

export default agentService;
