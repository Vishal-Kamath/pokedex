import {
  selectSearchIndex,
  selectSearchInput,
  selectSearchResults,
  setIndex,
  setInput,
  triggerNewSearch,
} from '@/slice/search.slice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import React, { useEffect } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';

const SearchBar: React.FC<{
  searchedFor: 'pokemon' | 'berries' | 'items';
  setToggleSidebarToResults: React.Dispatch<React.SetStateAction<boolean>>;
  search(value: string, redirect?: boolean): void;
}> = ({ searchedFor, setToggleSidebarToResults, search }) => {
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
    setToggleSidebarToResults(true);
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
      e.preventDefault();
      search(display, true);
    }
    if (e.code === 'Escape') {
      setToggleSidebarToResults(false);
      e.currentTarget.blur();
    }
  };

  useEffect(() => {
    const searchBar = document.getElementById('search_bar') as HTMLInputElement;
    const focusOnSKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'KeyS') {
        setTimeout(() => {
          setToggleSidebarToResults(true);
          searchBar.focus();
        }, 100);
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
    <div
      title="you can press the S key to focus on the searchbar and the ESC key to unfocus"
      className="flex h-9 w-full items-center gap-3 overflow-hidden rounded-full border-2 border-slate-500 px-2 focus-within:border-gray-600 hover:border-sky-600 dark:border-slate-300 dark:focus-within:border-gray-400 dark:hover:border-sky-400 sm:border-slate-300 sm:dark:border-slate-700"
    >
      {/* Search Icon */}
      <AiOutlineSearch className="h-5 w-5 text-sky-600" />

      {/* Search Input */}
      <label htmlFor="search_bar" aria-hidden="true" className="hidden">
        Search Bar
      </label>
      <input
        aria-keyshortcuts="S"
        aria-label="Search Bar"
        tabIndex={0}
        type="text"
        id="search_bar"
        className="h-full w-full bg-transparent outline-none"
        value={display}
        onChange={(e) => handleOnChange(e.target.value)}
        onKeyDown={handleKeyDown}
        onFocus={() => setToggleSidebarToResults(true)}
      />
    </div>
  );
};

export default SearchBar;
