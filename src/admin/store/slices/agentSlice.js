import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import agentService from '../../services/agentService';

// Async thunk to fetch all agents
export const fetchAgents = createAsyncThunk('agents/fetchAll', async (_, { rejectWithValue }) => {
  try {
    return await agentService.getAll();
  } catch (error) {
    return rejectWithValue(error.message || 'Failed to fetch agents');
  }
});

// Async thunk to fetch single agent
export const fetchAgentById = createAsyncThunk(
  'agents/fetchById',
  async (id, { rejectWithValue }) => {
    try {
      return await agentService.getById(id);
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch agent');
    }
  }
);

// Async thunk to create agent
export const createAgent = createAsyncThunk(
  'agents/create',
  async (agentData, { rejectWithValue }) => {
    try {
      return await agentService.create(agentData);
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to create agent');
    }
  }
);

// Async thunk to update agent
export const updateAgent = createAsyncThunk(
  'agents/update',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      return await agentService.update(id, data);
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to update agent');
    }
  }
);

// Async thunk to delete agent
export const deleteAgent = createAsyncThunk('agents/delete', async (id, { rejectWithValue }) => {
  try {
    await agentService.delete(id);
    return id;
  } catch (error) {
    return rejectWithValue(error.message || 'Failed to delete agent');
  }
});

const agentSlice = createSlice({
  name: 'agents',
  initialState: {
    agents: [],
    currentAgent: null,
    loading: false,
    error: null,
    actionLoading: false, // For create/update/delete operations
    actionError: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
      state.actionError = null;
    },
    clearCurrentAgent: (state) => {
      state.currentAgent = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all agents
      .addCase(fetchAgents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAgents.fulfilled, (state, action) => {
        state.loading = false;
        state.agents = action.payload;
        state.error = null;
      })
      .addCase(fetchAgents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch single agent
      .addCase(fetchAgentById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAgentById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentAgent = action.payload;
        state.error = null;
      })
      .addCase(fetchAgentById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Create agent
      .addCase(createAgent.pending, (state) => {
        state.actionLoading = true;
        state.actionError = null;
      })
      .addCase(createAgent.fulfilled, (state, action) => {
        state.actionLoading = false;
        state.agents.push(action.payload);
        state.actionError = null;
      })
      .addCase(createAgent.rejected, (state, action) => {
        state.actionLoading = false;
        state.actionError = action.payload;
      })
      // Update agent
      .addCase(updateAgent.pending, (state) => {
        state.actionLoading = true;
        state.actionError = null;
      })
      .addCase(updateAgent.fulfilled, (state, action) => {
        state.actionLoading = false;
        const index = state.agents.findIndex((a) => a.id === action.payload.id);
        if (index !== -1) {
          state.agents[index] = action.payload;
        }
        state.currentAgent = action.payload;
        state.actionError = null;
      })
      .addCase(updateAgent.rejected, (state, action) => {
        state.actionLoading = false;
        state.actionError = action.payload;
      })
      // Delete agent
      .addCase(deleteAgent.pending, (state) => {
        state.actionLoading = true;
        state.actionError = null;
      })
      .addCase(deleteAgent.fulfilled, (state, action) => {
        state.actionLoading = false;
        state.agents = state.agents.filter((a) => a.id !== action.payload);
        state.actionError = null;
      })
      .addCase(deleteAgent.rejected, (state, action) => {
        state.actionLoading = false;
        state.actionError = action.payload;
      });
  },
});

export const { clearError, clearCurrentAgent } = agentSlice.actions;
export default agentSlice.reducer;
