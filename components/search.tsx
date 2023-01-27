import Link from 'next/link';
import React from 'react';
import Toggle from './toogle';

const SearchBar: React.FC<{
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  searchResults: string[];
}> = ({ search, searchResults, setSearch }) => {
  return (
    <div className="h-9 max-w-md w-3/5 relative z-20">
      <input
        type="text"
        className="bg-transparent border-2 rounded-lg border-solid border-red-500 outline-none focus:border-red-400 px-2 w-full h-full"
        placeholder="Search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="absolute right-0 top-[0.6rem]">
        <Toggle />
      </div>

      {search !== '' ? (
        <div className="bg-red-700 absolute top-0 translate-y-12 w-full break-words flex flex-col rounded-lg p-2">
          {searchResults.map((pokename) => (
            <Link
              onClick={() => setSearch('')}
              href={`/pokemon/${pokename}`}
              className="text-md border-b-2"
            >
              {pokename}
            </Link>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default SearchBar;
