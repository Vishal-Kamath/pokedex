import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '@/store';

type SidebarType = {
  open: boolean;
};

// Define the initial state using that type
const initialState: SidebarType = {
  open: false,
};

export const sidebar = createSlice({
  name: 'sidebar',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    openSidebar: (state) => {
      state.open = true;
    },
    closeSidebar: (state) => {
      state.open = false;
    },
  },
});

export const { openSidebar, closeSidebar } = sidebar.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectSidebarOpen = (state: RootState) => state.sidebar.open;

export default sidebar.reducer;
