import React, { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import pokemonList from '@/db.json';
import { useRouter } from 'next/router';

const SearchBar: React.FC<{ classname: string }> = ({ classname }) => {
  const router = useRouter();

  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const [searchDisplay, setSearchDisplay] = useState('');
  const [searchIndex, setSearchIndex] = useState(-1);

  const [focus, setFocus] = useState(false);

  useEffect(() => {
    setSearchResults(
      pokemonList.pokemon
        .filter((pokemon) => pokemon.startsWith(search))
        .splice(0, 10)
    );
  }, [search]);

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
    <div className={`relative z-50 h-9 w-3/5 max-w-md text-black ${classname}`}>
      <div className="absolute top-0 left-0 w-full rounded-[1.125rem] bg-white">
        {/* search box */}
        <div className="flex h-9 items-center gap-2 p-2">
          <FaSearch className="text-sky-600" onClick={_search} />
          <input
            type="text"
            className="w-full outline-none"
            value={searchDisplay}
            onChange={(e) => handleOnChange(e.target.value)}
            onKeyDown={(e) => handleKeyDown(e)}
            onFocus={() => setFocus(true)}
            onBlur={() => setFocus(false)}
          />
        </div>

        {/* results */}
        <div>
          {searchResults.length !== 0 &&
            focus &&
            searchResults.map((result, index) => {
              return index === searchIndex ? (
                <div className="flex h-9 items-center bg-sky-100 px-8 last-of-type:rounded-b-[1.125rem]">
                  {result}
                </div>
              ) : (
                <div className="flex h-9 items-center px-8 last-of-type:rounded-b-[1.125rem] hover:bg-slate-100">
                  {result}
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
