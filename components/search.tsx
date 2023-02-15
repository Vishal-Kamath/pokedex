import React from 'react';
import { FaSearch } from 'react-icons/fa';

const SearchBar: React.FC<{
  _search: (value: string) => void;
  searchBarRef: React.MutableRefObject<HTMLInputElement | undefined>;
  searchDisplay: string;
  mouseOver: boolean;
  handleOnChange: (value: string) => void;
  handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  setFocus: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({
  _search,
  searchDisplay,
  mouseOver,
  searchBarRef,
  handleOnChange,
  handleKeyDown,
  setFocus,
}) => {
  return (
    <div className="flex h-9 w-full items-center gap-2 rounded-md border-2 bg-white p-2 text-black">
      <FaSearch
        className="text-sky-600"
        onClick={() => _search(searchDisplay)}
      />
      <input
        type="text"
        className="w-full outline-none"
        value={searchDisplay}
        onChange={(e) => handleOnChange(e.target.value)}
        onKeyDown={(e) => handleKeyDown(e)}
        onFocus={() => setFocus(true)}
        onBlur={() => !mouseOver && setFocus(false)}
        ref={(ref) => (searchBarRef.current = ref !== null ? ref : undefined)}
      />
    </div>
  );
};

export default SearchBar;
