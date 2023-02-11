import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import Toggle from './toogle';
import { FaSearch } from 'react-icons/fa';
import { useRouter } from 'next/router';

const SearchBar: React.FC<{
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  searchResults: string[];
}> = ({ search, searchResults, setSearch }) => {
  const router = useRouter();
  const [focus, setFocus] = useState(false);
  const [searchDisplay, setSearchDisplay] = useState('');
  const [searchIndex, setSearchIndex] = useState(-1);

  useEffect(() => {
    if (searchIndex === -1) return setSearchDisplay(search);
    setSearchDisplay(searchResults[searchIndex]);
  }, [searchIndex]);

  const handleOnChange = (value: string) => {
    setSearch(value);
    setSearchDisplay(value);
    setSearchIndex(-1);
  };

  const handleArrowDown = () => {
    if (searchIndex + 1 > 9) return;
    setSearchIndex(searchIndex + 1);
  };

  const handleArrowUp = () => {
    if (searchIndex - 1 < -1) return;
    setSearchIndex(searchIndex - 1);
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
      _search();
    }
  };

  const _search = () => {
    router.push(`/pokemon/${searchDisplay}`);
  };

  return (
    <div className="relative z-20 h-9 w-3/5 max-w-md text-black">
      <div className="absolute left-0 top-0 w-full rounded-[1.125rem] bg-slate-50">
        <div className="flex h-9 items-center gap-2 p-2">
          <FaSearch className="text-sky-600" onClick={_search} />
          <input
            type="text"
            className="outline-none"
            value={searchDisplay}
            onChange={(e) => handleOnChange(e.target.value)}
            onFocus={(e) => setFocus(true)}
            onBlur={(e) => setFocus(false)}
            onKeyDown={handleKeyDown}
          />
        </div>
        <div>
          {searchResults.length !== 0 &&
            focus &&
            searchResults
              .map((result, index) => {
                return index === searchIndex ? (
                  <div
                    onClick={() => setSearchDisplay(result)}
                    className="flex h-9 items-center bg-slate-200 px-8 last-of-type:rounded-b-[1.125rem]"
                  >
                    {result}
                  </div>
                ) : (
                  <div
                    onClick={() => setSearchDisplay(result)}
                    className="flex h-9 items-center px-8 last-of-type:rounded-b-[1.125rem] hover:bg-slate-100"
                  >
                    {result}
                  </div>
                );
              })
              .slice(0, 10)}
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
