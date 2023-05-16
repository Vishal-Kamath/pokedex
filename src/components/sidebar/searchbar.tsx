import {
  selectSearchIndex,
  selectSearchInput,
  selectSearchResults,
  setBlured,
  setFocused,
  setIndex,
  setInput,
  triggerNewSearch,
} from '@/slice/search.slice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import React, { useEffect } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';

const SearchBar: React.FC<{
  searchedFor: 'pokemon' | 'berries' | 'items';
  search: (value: string) => void;
}> = ({ searchedFor, search }) => {
  const dispatch = useAppDispatch();

  const input = useAppSelector(selectSearchInput);
  const index = useAppSelector(selectSearchIndex);
  const results = useAppSelector(selectSearchResults);

  const display =
    index === -1 ? input : !!results[index].item ? results[index].item : input;

  const handleOnChange = (value: string) => {
    dispatch(triggerNewSearch({ searchedFor, searchValue: value }));
    dispatch(setInput(value));
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
    if (e.code === 'Escape') {
      e.currentTarget.blur();
    }
  };

  useEffect(() => {
    const searchBar = document.getElementById('search_bar') as HTMLInputElement;
    const focusOnSKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'KeyS') {
        setTimeout(() => searchBar.focus(), 100);
        // i used set timeout because i don't want the input field to
        // register the first 'S'. Without the timeout when you press 'S'
        // the input box is focused and 'S' in inputed in the the input box
      }
    };

    document.addEventListener('keydown', focusOnSKeyDown);
    return () => {
      document.removeEventListener('keydown', focusOnSKeyDown);
    };
  }, []);

  return (
    <div className="flex h-9 w-full items-center gap-5 overflow-hidden rounded-full border-2 border-slate-700 px-2 dark:border-slate-300 sm:border-slate-300 sm:dark:border-slate-700">
      <AiOutlineSearch className="h-5 w-5 text-sky-600" />
      <input
        type="text"
        id="search_bar"
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
