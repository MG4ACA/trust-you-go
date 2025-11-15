import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { packageLocationService } from '../../services/packageLocationService';

// Async thunks
export const fetchPackageLocations = createAsyncThunk(
  'packageLocations/fetchByPackageId',
  async (packageId, { rejectWithValue }) => {
    try {
      const response = await packageLocationService.getByPackageId(packageId);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch package locations');
    }
  }
);

export const addPackageLocation = createAsyncThunk(
  'packageLocations/add',
  async ({ packageId, locationId, dayNumber, visitOrder, notes }, { rejectWithValue }) => {
    try {
      const response = await packageLocationService.create({
        package_id: packageId,
        location_id: locationId,
        day_number: dayNumber,
        visit_order: visitOrder,
        notes,
      });
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to add package location');
    }
  }
);

export const updatePackageLocation = createAsyncThunk(
  'packageLocations/update',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await packageLocationService.update(id, data);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update package location');
    }
  }
);

export const removePackageLocation = createAsyncThunk(
  'packageLocations/remove',
  async (id, { rejectWithValue }) => {
    try {
      await packageLocationService.delete(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to remove package location');
    }
  }
);

const packageLocationsSlice = createSlice({
  name: 'packageLocations',
  initialState: {
    items: [],
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
  },
  extraReducers: (builder) => {
    builder
      // Fetch package locations
      .addCase(fetchPackageLocations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPackageLocations.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(fetchPackageLocations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Add package location
      .addCase(addPackageLocation.pending, (state) => {
        state.actionLoading = true;
        state.actionError = null;
      })
      .addCase(addPackageLocation.fulfilled, (state, action) => {
        state.items.push(action.payload);
        state.actionLoading = false;
      })
      .addCase(addPackageLocation.rejected, (state, action) => {
        state.actionLoading = false;
        state.actionError = action.payload;
      })
      // Update package location
      .addCase(updatePackageLocation.pending, (state) => {
        state.actionLoading = true;
        state.actionError = null;
      })
      .addCase(updatePackageLocation.fulfilled, (state, action) => {
        const index = state.items.findIndex((item) => item.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
        state.actionLoading = false;
      })
      .addCase(updatePackageLocation.rejected, (state, action) => {
        state.actionLoading = false;
        state.actionError = action.payload;
      })
      // Remove package location
      .addCase(removePackageLocation.pending, (state) => {
        state.actionLoading = true;
        state.actionError = null;
      })
      .addCase(removePackageLocation.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item.id !== action.payload);
        state.actionLoading = false;
      })
      .addCase(removePackageLocation.rejected, (state, action) => {
        state.actionLoading = false;
        state.actionError = action.payload;
      });
  },
});

export const { clearError } = packageLocationsSlice.actions;
export default packageLocationsSlice.reducer;
