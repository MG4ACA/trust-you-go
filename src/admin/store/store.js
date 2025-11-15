import { configureStore } from '@reduxjs/toolkit';
import adminReducer from './slices/adminSlice';
import agentReducer from './slices/agentSlice';
import authReducer from './slices/authSlice';
import locationReducer from './slices/locationSlice';
import packageLocationsReducer from './slices/packageLocationsSlice';
import { packageReducer } from './slices/packageSlice';
import uiReducer from './slices/uiSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    agents: agentReducer,
    admins: adminReducer,
    locations: locationReducer,
    packages: packageReducer,
    packageLocations: packageLocationsReducer,
    ui: uiReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types for serialization checks
        ignoredActions: ['auth/login/fulfilled'],
      },
    }),
  devTools: import.meta.env.MODE !== 'production',
});

export default store;
