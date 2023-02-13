import React, { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import pokemonList from '@/db.json';

const SearchBar: React.FC<{ classname: string }> = ({ classname }) => {
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const [searchDisplay, setSearchDisplay] = useState('');

  const [focus, setFocus] = useState(false);

  useEffect(() => {
    setSearchResults(
      pokemonList.pokemon
        .filter((pokemon) => pokemon.startsWith(search))
        .splice(0, 10)
    );
  }, [search]);

  const handleOnChange = (value: string) => {
    setSearch(value);
    setSearchDisplay(value);
  };

  return (
    <div className={`relative z-50 h-9 w-3/5 max-w-md text-black ${classname}`}>
      <div className="absolute top-0 left-0 w-full rounded-[1.125rem] bg-white">
        {/* search box */}
        <div className="flex h-9 items-center gap-2 p-2">
          <FaSearch className="text-sky-600" />
          <input
            type="text"
            className="w-full outline-none"
            value={searchDisplay}
            onChange={(e) => handleOnChange(e.target.value)}
            onFocus={() => setFocus(true)}
            onBlur={() => setFocus(false)}
          />
        </div>

        {/* results */}
        <div>
          {searchResults.length !== 0 &&
            focus &&
            searchResults.map((result) => (
              <div className="flex h-9 items-center px-8 last-of-type:rounded-b-[1.125rem] hover:bg-slate-100">
                {result}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
