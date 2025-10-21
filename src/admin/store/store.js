import { configureStore } from '@reduxjs/toolkit';
import agentReducer from './slices/agentSlice';
import authReducer from './slices/authSlice';
import uiReducer from './slices/uiSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    agents: agentReducer,
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
