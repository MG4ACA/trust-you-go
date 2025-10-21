import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:3001';

// Async thunk for login
export const loginAdmin = createAsyncThunk(
  'auth/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      // In mock server, we'll find admin by email and verify password
      const response = await axios.get(`${API_URL}/admins?email=${email}`);

      if (response.data.length === 0) {
        return rejectWithValue('Invalid email or password');
      }

      const admin = response.data[0];

      // Simple password check (in production, this would be handled by backend)
      if (admin.password !== password) {
        return rejectWithValue('Invalid email or password');
      }

      // Mock JWT token (in production, this comes from backend)
      const token = `mock_jwt_token_${admin.id}_${Date.now()}`;

      // Store token in localStorage
      localStorage.setItem('adminToken', token);
      localStorage.setItem(
        'adminUser',
        JSON.stringify({
          id: admin.id,
          username: admin.username,
          email: admin.email,
          role: admin.role,
        })
      );

      return {
        user: {
          id: admin.id,
          username: admin.username,
          email: admin.email,
          role: admin.role,
        },
        token,
      };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Login failed');
    }
  }
);

// Async thunk for logout
export const logoutAdmin = createAsyncThunk('auth/logout', async () => {
  localStorage.removeItem('adminToken');
  localStorage.removeItem('adminUser');
  return null;
});

// Check if user is already logged in (on app load)
export const checkAuthStatus = createAsyncThunk(
  'auth/checkStatus',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('adminToken');
      const userStr = localStorage.getItem('adminUser');

      if (!token || !userStr) {
        return rejectWithValue('Not authenticated');
      }

      const user = JSON.parse(userStr);

      // In production, you'd verify the token with backend here
      return { user, token };
    } catch (error) {
      localStorage.removeItem('adminToken');
      localStorage.removeItem('adminUser');
      return rejectWithValue('Authentication check failed');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: null,
    isAuthenticated: false,
    loading: false,
    error: null,
    checkingAuth: true, // True on initial load while checking localStorage
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(loginAdmin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.error = null;
      })
      .addCase(loginAdmin.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
        state.error = action.payload;
      })
      // Logout
      .addCase(logoutAdmin.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        state.error = null;
      })
      // Check Auth Status
      .addCase(checkAuthStatus.pending, (state) => {
        state.checkingAuth = true;
      })
      .addCase(checkAuthStatus.fulfilled, (state, action) => {
        state.checkingAuth = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(checkAuthStatus.rejected, (state) => {
        state.checkingAuth = false;
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
      });
  },
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer;
