import React from 'react';
import { FaSearch } from 'react-icons/fa';

const SearchBar: React.FC = () => {
  return (
    <div className="flex h-9 w-full items-center gap-2 overflow-hidden rounded-full border-2 border-slate-700 px-2 dark:border-slate-300 sm:border-slate-300 sm:dark:border-slate-700">
      <FaSearch className="h-4 w-4 text-sky-600" />
      <input
        type="text"
        className="h-full w-full bg-transparent outline-none"
      />
    </div>
  );
};

export default SearchBar;
