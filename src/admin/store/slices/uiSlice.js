import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    sidebarVisible: true,
    toastMessage: null,
    confirmDialog: {
      visible: false,
      message: '',
      onConfirm: null,
    },
    globalLoading: false,
  },
  reducers: {
    toggleSidebar: (state) => {
      state.sidebarVisible = !state.sidebarVisible;
    },
    setSidebarVisible: (state, action) => {
      state.sidebarVisible = action.payload;
    },
    showToast: (state, action) => {
      state.toastMessage = action.payload;
    },
    hideToast: (state) => {
      state.toastMessage = null;
    },
    showConfirmDialog: (state, action) => {
      state.confirmDialog = {
        visible: true,
        message: action.payload.message,
        onConfirm: action.payload.onConfirm,
      };
    },
    hideConfirmDialog: (state) => {
      state.confirmDialog = {
        visible: false,
        message: '',
        onConfirm: null,
      };
    },
    setGlobalLoading: (state, action) => {
      state.globalLoading = action.payload;
    },
  },
});

export const {
  toggleSidebar,
  setSidebarVisible,
  showToast,
  hideToast,
  showConfirmDialog,
  hideConfirmDialog,
  setGlobalLoading,
} = uiSlice.actions;

export default uiSlice.reducer;
