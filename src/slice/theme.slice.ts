import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import type { RootState } from '@/store';

export type ThemeType = 'dark' | 'light' | 'system';

type ThemeStateType = {
  theme: ThemeType;
};

// Define the initial state using that type
const initialState: ThemeStateType = {
  theme: 'system',
};

export const theme = createSlice({
  name: 'theme',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<ThemeType>) => {
      state.theme = action.payload;
    },
  },
});

export const { setTheme } = theme.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectTheme = (state: RootState) => state.theme.theme;

export default theme.reducer;
