import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import locationService from '../../services/locationService';

// Async thunk to fetch all locations
export const fetchLocations = createAsyncThunk(
  'locations/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await locationService.getAll();
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch locations');
    }
  }
);

// Async thunk to fetch single location
export const fetchLocationById = createAsyncThunk(
  'locations/fetchById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await locationService.getById(id);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch location');
    }
  }
);

// Async thunk to create location
export const createLocation = createAsyncThunk(
  'locations/create',
  async (locationData, { rejectWithValue }) => {
    try {
      const response = await locationService.create(locationData);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create location');
    }
  }
);

// Async thunk to update location
export const updateLocation = createAsyncThunk(
  'locations/update',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await locationService.update(id, data);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update location');
    }
  }
);

// Async thunk to delete location
export const deleteLocation = createAsyncThunk(
  'locations/delete',
  async (id, { rejectWithValue }) => {
    try {
      await locationService.delete(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete location');
    }
  }
);

const locationSlice = createSlice({
  name: 'locations',
  initialState: {
    locations: [],
    currentLocation: null,
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
    clearCurrentLocation: (state) => {
      state.currentLocation = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all locations
      .addCase(fetchLocations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLocations.fulfilled, (state, action) => {
        state.loading = false;
        state.locations = action.payload;
        state.error = null;
      })
      .addCase(fetchLocations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch single location
      .addCase(fetchLocationById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLocationById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentLocation = action.payload;
        state.error = null;
      })
      .addCase(fetchLocationById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Create location
      .addCase(createLocation.pending, (state) => {
        state.actionLoading = true;
        state.actionError = null;
      })
      .addCase(createLocation.fulfilled, (state, action) => {
        state.actionLoading = false;
        state.locations.push(action.payload);
        state.actionError = null;
      })
      .addCase(createLocation.rejected, (state, action) => {
        state.actionLoading = false;
        state.actionError = action.payload;
      })
      // Update location
      .addCase(updateLocation.pending, (state) => {
        state.actionLoading = true;
        state.actionError = null;
      })
      .addCase(updateLocation.fulfilled, (state, action) => {
        state.actionLoading = false;
        const index = state.locations.findIndex((l) => l.id === action.payload.id);
        if (index !== -1) {
          state.locations[index] = action.payload;
        }
        state.currentLocation = action.payload;
        state.actionError = null;
      })
      .addCase(updateLocation.rejected, (state, action) => {
        state.actionLoading = false;
        state.actionError = action.payload;
      })
      // Delete location
      .addCase(deleteLocation.pending, (state) => {
        state.actionLoading = true;
        state.actionError = null;
      })
      .addCase(deleteLocation.fulfilled, (state, action) => {
        state.actionLoading = false;
        state.locations = state.locations.filter((l) => l.id !== action.payload);
        state.actionError = null;
      })
      .addCase(deleteLocation.rejected, (state, action) => {
        state.actionLoading = false;
        state.actionError = action.payload;
      });
  },
});

export const { clearError, clearCurrentLocation } = locationSlice.actions;
export default locationSlice.reducer;
