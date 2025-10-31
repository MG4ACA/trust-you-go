import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { adminService } from '../../services/adminService';

// Async thunk to fetch all admins
export const fetchAdmins = createAsyncThunk('admins/fetchAll', async (_, { rejectWithValue }) => {
  try {
    return await adminService.getAll();
  } catch (error) {
    return rejectWithValue(error.message || 'Failed to fetch admins');
  }
});

// Async thunk to fetch single admin
export const fetchAdminById = createAsyncThunk(
  'admins/fetchById',
  async (id, { rejectWithValue }) => {
    try {
      return await adminService.getById(id);
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch admin');
    }
  }
);

// Async thunk to create admin
export const createAdmin = createAsyncThunk(
  'admins/create',
  async (adminData, { rejectWithValue }) => {
    try {
      return await adminService.create(adminData);
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to create admin');
    }
  }
);

// Async thunk to update admin
export const updateAdmin = createAsyncThunk(
  'admins/update',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      return await adminService.update(id, data);
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to update admin');
    }
  }
);

// Async thunk to delete admin
export const deleteAdmin = createAsyncThunk('admins/delete', async (id, { rejectWithValue }) => {
  try {
    await adminService.delete(id);
    return id;
  } catch (error) {
    return rejectWithValue(error.message || 'Failed to delete admin');
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
