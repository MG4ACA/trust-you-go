import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { packageService } from '../../services/packageService';

// Async thunks
export const fetchPackages = createAsyncThunk(
  'packages/fetchAll',
  async (params, { rejectWithValue }) => {
    try {
      return await packageService.getAll(params);
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch packages');
    }
  }
);

export const fetchPackageById = createAsyncThunk(
  'packages/fetchById',
  async (id, { rejectWithValue }) => {
    try {
      return await packageService.getById(id);
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch package');
    }
  }
);

export const createPackage = createAsyncThunk(
  'packages/create',
  async (data, { rejectWithValue }) => {
    try {
      return await packageService.create(data);
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create package');
    }
  }
);

export const updatePackage = createAsyncThunk(
  'packages/update',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      return await packageService.update(id, data);
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update package');
    }
  }
);

export const deletePackage = createAsyncThunk(
  'packages/delete',
  async (id, { rejectWithValue }) => {
    try {
      await packageService.delete(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete package');
    }
  }
);

const packageSlice = createSlice({
  name: 'packages',
  initialState: {
    items: [],
    selectedPackage: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearSelectedPackage: (state) => {
      state.selectedPackage = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all packages
      .addCase(fetchPackages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPackages.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(fetchPackages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch single package
      .addCase(fetchPackageById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPackageById.fulfilled, (state, action) => {
        state.selectedPackage = action.payload;
        state.loading = false;
      })
      .addCase(fetchPackageById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Create package
      .addCase(createPackage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createPackage.fulfilled, (state, action) => {
        state.items.push(action.payload);
        state.loading = false;
      })
      .addCase(createPackage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update package
      .addCase(updatePackage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatePackage.fulfilled, (state, action) => {
        const index = state.items.findIndex((item) => item.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
        state.selectedPackage = action.payload;
        state.loading = false;
      })
      .addCase(updatePackage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Delete package
      .addCase(deletePackage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deletePackage.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item.id !== action.payload);
        state.loading = false;
      })
      .addCase(deletePackage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearSelectedPackage, clearError } = packageSlice.actions;
export const packageReducer = packageSlice.reducer;
