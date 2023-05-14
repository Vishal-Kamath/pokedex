import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import type { RootState } from '@/store';

export type SearchItem = {
  item: string;
  type: 'search' | 'history';
};

type SearchType = {
  input: string;
  results: SearchItem[];
  index: number;
  focused: boolean;
};

// Define the initial state using that type
const initialState: SearchType = {
  input: '',
  results: [],
  index: -1,
  focused: false,
};

export const search = createSlice({
  name: 'search',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setFocused: (state) => {
      state.focused = true;
    },
    setBlured: (state) => {
      state.focused = false;
    },
    setInput: (state, action: PayloadAction<string>) => {
      state.input = action.payload;
    },
    setIndex: (state, action: PayloadAction<number>) => {
      state.index = action.payload;
    },
    setResults: (state, action: PayloadAction<SearchItem[]>) => {
      state.results = action.payload;
    },
  },
});

export const { setBlured, setFocused, setIndex, setInput, setResults } =
  search.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectSearchInput = (state: RootState) => state.search.input;
export const selectSearchIndex = (state: RootState) => state.search.index;
export const selectSearchResults = (state: RootState) => state.search.results;
export const selectSearchFocused = (state: RootState) => state.search.focused;

export default search.reducer;
