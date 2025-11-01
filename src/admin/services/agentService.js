import { API_ENDPOINTS } from '../config/apiConfig';
import { agentMapper } from '../mappers';
import apiClient from './api';

/**
 * Agent Service
 * Handles all CRUD operations for travel agents
 *
 * IMPORTANT: All methods return camelCase data (converted by agentMapper)
 * This ensures Redux store receives consistent, predictable data format
 */

const agentService = {
  /**
   * Get all agents
   * @param {Object} params - Query parameters (pagination, filters, etc.)
   * @returns {Promise<Array>} - List of agents (camelCase)
   */
  async getAll(params = {}) {
    try {
      const response = await apiClient.get(API_ENDPOINTS.AGENTS, { params });
      const data = response.data.success ? response.data.data : [];
      // Convert snake_case API response to camelCase for Redux
      return agentMapper.toReduxArray(data);
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch agents');
    }
  },

  /**
   * Get agent by ID
   * @param {string|number} id - Agent ID
   * @returns {Promise<Object>} - Agent data (camelCase)
   */
  async getById(id) {
    try {
      const response = await apiClient.get(API_ENDPOINTS.AGENT_BY_ID(id));
      const data = response.data.success ? response.data.data : response.data;
      // Convert snake_case API response to camelCase for Redux
      return agentMapper.toRedux(data);
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch agent');
    }
  },

  /**
   * Create new agent
   * @param {Object} agentData - Agent data (camelCase from form)
   * @returns {Promise<Object>} - Created agent (camelCase)
   */
  async create(agentData) {
    try {
      // Convert camelCase form data to snake_case API format
      const apiFormat = agentMapper.formToAPI(agentData);

      const response = await apiClient.post(API_ENDPOINTS.AGENTS, apiFormat);
      const data = response.data.success ? response.data.data : response.data;

      // Convert snake_case API response back to camelCase for Redux
      return agentMapper.toRedux(data);
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to create agent');
    }
  },

  /**
   * Update agent
   * @param {string|number} id - Agent ID
   * @param {Object} agentData - Updated agent data (camelCase from form)
   * @returns {Promise<Object>} - Updated agent (camelCase)
   */
  async update(id, agentData) {
    try {
      // Convert camelCase form data to snake_case API format
      const apiFormat = agentMapper.formToAPI(agentData);

      const response = await apiClient.put(API_ENDPOINTS.AGENT_BY_ID(id), apiFormat);
      const data = response.data.success ? response.data.data : response.data;

      // Convert snake_case API response back to camelCase for Redux
      return agentMapper.toRedux(data);
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to update agent');
    }
  },

  /**
   * Patch agent (partial update)
   * @param {string|number} id - Agent ID
   * @param {Object} updates - Partial updates (camelCase)
   * @returns {Promise<Object>} - Updated agent (camelCase)
   */
  async patch(id, updates) {
    try {
      // Convert camelCase updates to snake_case API format
      const apiFormat = agentMapper.formToAPI(updates);

      const response = await apiClient.patch(API_ENDPOINTS.AGENT_BY_ID(id), apiFormat);
      const data = response.data.success ? response.data.data : response.data;

      // Convert snake_case API response back to camelCase for Redux
      return agentMapper.toRedux(data);
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
   * @returns {Promise<Array>} - Matching agents (camelCase)
   */
  async search(query) {
    try {
      // JSON Server supports full-text search with 'q' parameter
      const response = await apiClient.get(API_ENDPOINTS.AGENTS, {
        params: { q: query },
      });
      const data = response.data.success ? response.data.data : [];
      // Convert snake_case API response to camelCase for Redux
      return agentMapper.toReduxArray(data);
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to search agents');
    }
  },

  /**
   * Get agents by status
   * @param {string} status - Agent status (active, inactive, pending)
   * @returns {Promise<Array>} - Filtered agents (camelCase)
   */
  async getByStatus(status) {
    try {
      const response = await apiClient.get(API_ENDPOINTS.AGENTS, {
        params: { status },
      });
      const data = response.data.success ? response.data.data : [];
      // Convert snake_case API response to camelCase for Redux
      return agentMapper.toReduxArray(data);
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch agents by status');
    }
  },

  /**
   * Get paginated agents
   * @param {number} page - Page number (starting from 1)
   * @param {number} limit - Items per page
   * @returns {Promise<Object>} - Paginated response with data (camelCase) and metadata
   */
  async getPaginated(page = 1, limit = 10) {
    try {
      const response = await apiClient.get(API_ENDPOINTS.AGENTS, {
        params: {
          _page: page,
          _limit: limit,
          _sort: 'created_at',
          _order: 'desc',
        },
      });

      // JSON Server returns total count in headers
      const total = parseInt(response.headers['x-total-count'] || '0', 10);
      const data = response.data.success ? response.data.data : response.data;

      return {
        // Convert snake_case API response to camelCase for Redux
        data: agentMapper.toReduxArray(data),
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
