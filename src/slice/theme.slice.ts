import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import type { RootState } from '@/store';

type ThemeType = {
  dark: boolean;
};

// Define the initial state using that type
const initialState: ThemeType = {
  dark: false,
};

export const theme = createSlice({
  name: 'theme',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    toggleDark: (state) => {
      state.dark = !state.dark;
    },
    setDark: (state, action: PayloadAction<boolean>) => {
      state.dark = action.payload;
    },
  },
});

export const { toggleDark, setDark } = theme.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectTheme = (state: RootState) => state.theme.dark;

export default theme.reducer;
