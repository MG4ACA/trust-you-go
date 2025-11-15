/**
 * Agent Mapper
 * Converts API response (snake_case) to Redux store format (camelCase)
 *
 * API Response Format (snake_case):
 * {
 *   agent_id: '1',
 *   name: 'Nimal Perera',
 *   contact: '+94777654321',
 *   email: 'nimal@example.com',
 *   commission_rate: 12.00,
 *   is_active: true,
 *   notes: 'Specializes in cultural tours',
 *   created_at: '2024-08-20T10:00:00.000Z',
 *   updated_at: '2025-10-18T11:15:00.000Z'
 * }
 *
 * Redux Store Format (camelCase):
 * {
 *   agentId: '1',
 *   name: 'Nimal Perera',
 *   contact: '+94777654321',
 *   email: 'nimal@example.com',
 *   commissionRate: 12.00,
 *   isActive: true,
 *   notes: 'Specializes in cultural tours',
 *   createdAt: '2024-08-20T10:00:00.000Z',
 *   updatedAt: '2025-10-18T11:15:00.000Z'
 * }
 */

export const agentMapper = {
  /**
   * Convert single agent from API format to Redux format
   * @param {Object} apiAgent - Agent object from API (snake_case)
   * @returns {Object} Agent object for Redux store (camelCase)
   */
  toRedux: (apiAgent) => {
    if (!apiAgent) return null;

    return {
      agentId: apiAgent.agent_id || null,
      name: apiAgent.name || '',
      contact: apiAgent.contact || '',
      email: apiAgent.email || '',
      commissionRate: apiAgent.commission_rate ?? 0,
      isActive: apiAgent.is_active ?? true,
      notes: apiAgent.notes || '',
      createdAt: apiAgent.created_at || null,
      updatedAt: apiAgent.updated_at || null,
    };
  },

  /**
   * Convert array of agents from API format to Redux format
   * @param {Array} apiAgents - Array of agent objects from API (snake_case)
   * @returns {Array} Array of agent objects for Redux store (camelCase)
   */
  toReduxArray: (apiAgents) => {
    if (!Array.isArray(apiAgents)) return [];
    return apiAgents.map((agent) => agentMapper.toRedux(agent));
  },

  /**
   * Convert agent from Redux format to API format (for create/update)
   * @param {Object} reduxAgent - Agent object from Redux store (camelCase)
   * @returns {Object} Agent object for API request (snake_case)
   */
  toAPI: (reduxAgent) => {
    if (!reduxAgent) return null;

    return {
      agent_id: reduxAgent.agentId || null,
      name: reduxAgent.name || '',
      contact: reduxAgent.contact || '',
      email: reduxAgent.email || '',
      commission_rate: reduxAgent.commissionRate ?? 0,
      is_active: reduxAgent.isActive ?? true,
      notes: reduxAgent.notes || '',
      created_at: reduxAgent.createdAt || new Date().toISOString(),
      updated_at: reduxAgent.updatedAt || new Date().toISOString(),
    };
  },

  /**
   * Convert form data to API format
   * Used when creating or updating agent from form
   * @param {Object} formData - Form data (camelCase)
   * @returns {Object} API format (snake_case)
   */
  formToAPI: (formData) => {
    return {
      name: formData.name || '',
      contact: formData.contact || '',
      email: formData.email || '',
      commission_rate: formData.commissionRate ?? 0,
      is_active: formData.isActive ?? true,
      notes: formData.notes || '',
    };
  },
};

export default agentMapper;
