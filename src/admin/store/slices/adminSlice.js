import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:3001';

// Async thunk to fetch all admins
export const fetchAdmins = createAsyncThunk('admins/fetchAll', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${API_URL}/admins`);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to fetch admins');
  }
});

// Async thunk to fetch single admin
export const fetchAdminById = createAsyncThunk(
  'admins/fetchById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/admins/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch admin');
    }
  }
);

// Async thunk to create admin
export const createAdmin = createAsyncThunk(
  'admins/create',
  async (adminData, { rejectWithValue }) => {
    try {
      const dataWithTimestamps = {
        ...adminData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      const response = await axios.post(`${API_URL}/admins`, dataWithTimestamps);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create admin');
    }
  }
);

// Async thunk to update admin
export const updateAdmin = createAsyncThunk(
  'admins/update',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const dataWithTimestamp = {
        ...data,
        updatedAt: new Date().toISOString(),
      };
      const response = await axios.put(`${API_URL}/admins/${id}`, dataWithTimestamp);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update admin');
    }
  }
);

// Async thunk to delete admin
export const deleteAdmin = createAsyncThunk('admins/delete', async (id, { rejectWithValue }) => {
  try {
    await axios.delete(`${API_URL}/admins/${id}`);
    return id;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to delete admin');
  }
});

const adminSlice = createSlice({
  name: 'admins',
  initialState: {
    admins: [],
    currentAdmin: null,
    loading: false,
    error: null,
    actionLoading: false,
    actionError: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
      state.actionError = null;
    },
    clearCurrentAdmin: (state) => {
      state.currentAdmin = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all admins
      .addCase(fetchAdmins.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAdmins.fulfilled, (state, action) => {
        state.loading = false;
        state.admins = action.payload;
        state.error = null;
      })
      .addCase(fetchAdmins.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch single admin
      .addCase(fetchAdminById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAdminById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentAdmin = action.payload;
        state.error = null;
      })
      .addCase(fetchAdminById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Create admin
      .addCase(createAdmin.pending, (state) => {
        state.actionLoading = true;
        state.actionError = null;
      })
      .addCase(createAdmin.fulfilled, (state, action) => {
        state.actionLoading = false;
        state.admins.push(action.payload);
        state.actionError = null;
      })
      .addCase(createAdmin.rejected, (state, action) => {
        state.actionLoading = false;
        state.actionError = action.payload;
      })
      // Update admin
      .addCase(updateAdmin.pending, (state) => {
        state.actionLoading = true;
        state.actionError = null;
      })
      .addCase(updateAdmin.fulfilled, (state, action) => {
        state.actionLoading = false;
        const index = state.admins.findIndex((a) => a.id === action.payload.id);
        if (index !== -1) {
          state.admins[index] = action.payload;
        }
        state.currentAdmin = action.payload;
        state.actionError = null;
      })
      .addCase(updateAdmin.rejected, (state, action) => {
        state.actionLoading = false;
        state.actionError = action.payload;
      })
      // Delete admin
      .addCase(deleteAdmin.pending, (state) => {
        state.actionLoading = true;
        state.actionError = null;
      })
      .addCase(deleteAdmin.fulfilled, (state, action) => {
        state.actionLoading = false;
        state.admins = state.admins.filter((a) => a.id !== action.payload);
        state.actionError = null;
      })
      .addCase(deleteAdmin.rejected, (state, action) => {
        state.actionLoading = false;
        state.actionError = action.payload;
      });
  },
});

export const { clearError, clearCurrentAdmin } = adminSlice.actions;
export default adminSlice.reducer;
