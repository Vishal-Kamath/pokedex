import {
  selectSearchIndex,
  selectSearchInput,
  selectSearchResults,
  setBlured,
  setFocused,
  setIndex,
  setInput,
  setResults,
} from '@/slice/search.slice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import React from 'react';
import { FaSearch } from 'react-icons/fa';
import DB from '@/db.json';

const SearchBar: React.FC<{
  searchedFor: 'pokemon' | 'berries' | 'items';
  search: (value: string) => void;
}> = ({ searchedFor, search }) => {
  const dispatch = useAppDispatch();

  const input = useAppSelector(selectSearchInput);
  const index = useAppSelector(selectSearchIndex);
  const results = useAppSelector(selectSearchResults);

  const display =
    index === -1 ? input : !!results[index] ? results[index] : input;

  const handleOnChange = (value: string) => {
    const searchResults = DB[searchedFor]
      .filter((data) => data.toLowerCase().startsWith(value.toLowerCase()))
      .slice(0, 10);

    dispatch(setInput(value));
    dispatch(setResults(searchResults));
    dispatch(setIndex(-1));
    dispatch(setFocused());
  };

  const handleArrowDown = () => {
    if (index + 1 === results.length) return dispatch(setIndex(-1));
    dispatch(setIndex(index + 1));
  };

  const handleArrowUp = () => {
    if (index - 1 < -1) return dispatch(setIndex(results.length - 1));
    dispatch(setIndex(index - 1));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.code === 'ArrowDown') {
      e.preventDefault();
      handleArrowDown();
    }
    if (e.code === 'ArrowUp') {
      e.preventDefault();
      handleArrowUp();
    }
    if (e.code === 'Enter') {
      e.currentTarget.blur();
      e.preventDefault();
      search(display);
    }
  };

  return (
    <div className="flex h-9 w-full items-center gap-2 overflow-hidden rounded-full border-2 border-slate-700 px-2 dark:border-slate-300 sm:border-slate-300 sm:dark:border-slate-700">
      <FaSearch className="h-4 w-4 text-sky-600" />
      <input
        type="text"
        className="h-full w-full bg-transparent outline-none"
        value={display}
        onChange={(e) => handleOnChange(e.target.value)}
        onKeyDown={handleKeyDown}
        onFocus={() => dispatch(setFocused())}
        onBlur={() => setTimeout(() => dispatch(setBlured()), 150)}
      />
    </div>
  );
};

export default SearchBar;
