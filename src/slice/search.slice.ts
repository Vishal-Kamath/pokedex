import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import type { RootState } from '@/store';
import { getSearchResults } from '@/utils/lib';
import { SearchedFor } from '@/components/sidebar/sidebar';

export type SearchItem = {
  item: string;
  type: 'search' | 'history';
};

type SearchType = {
  input: string;
  results: SearchItem[];
  index: number;
};

// Define the initial state using that type
const initialState: SearchType = {
  input: '',
  results: [],
  index: -1,
};

export const search = createSlice({
  name: 'search',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setInput: (state, action: PayloadAction<string>) => {
      state.input = action.payload;
    },
    setIndex: (state, action: PayloadAction<number>) => {
      state.index = action.payload;
    },
    triggerNewSearch: (
      state,
      action: PayloadAction<{
        searchedFor: SearchedFor;
        searchValue?: string;
      }>
    ) => {
      state.results = getSearchResults(action.payload);
    },
  },
});

export const { setIndex, setInput, triggerNewSearch } = search.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectSearchInput = (state: RootState) => state.search.input;
export const selectSearchIndex = (state: RootState) => state.search.index;
export const selectSearchResults = (state: RootState) => state.search.results;

export default search.reducer;
