import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import SearchBar from './search';
import searchList from '@/db.json';

const SideBar: React.FC<{
  menuOpen: boolean;
  setMenuOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ menuOpen, setMenuOpen }) => {
  const router = useRouter();
  console.log(router.pathname);
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const [searchDisplay, setSearchDisplay] = useState('');
  const [searchIndex, setSearchIndex] = useState(-1);

  const [focus, setFocus] = useState(false);

  const searchfor: 'pokemon' | 'berry' =
    router.pathname === '/' || '/pokemon/[pokemonName]'
      ? 'pokemon'
      : router.pathname === '/berry'
      ? 'berry'
      : 'pokemon';

  useEffect(() => {
    setSearchResults(
      searchList[searchfor]
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
      _search(searchDisplay);
    }
  };

  const _search = (value: string) => {
    setMenuOpen && setMenuOpen(false);
    router.push(`/pokemon/${value}`);
  };
  return (
    <div
      className={`${
        !menuOpen && 'hidden'
      } fixed z-40 h-full w-full flex-col overflow-y-auto max-md:top-0 max-md:left-0 max-md:bg-sky-200 max-md:px-[4vw] max-md:pt-20 dark:max-md:bg-slate-900 md:fixed md:flex md:w-1/6`}
    >
      <SearchBar
        _search={_search}
        handleKeyDown={handleKeyDown}
        handleOnChange={handleOnChange}
        searchDisplay={searchDisplay}
        setFocus={setFocus}
      />
      {focus ? (
        <div>
          <div>{searchfor}</div>
          {searchResults.length !== 0 &&
            focus &&
            searchResults.map((result, index) => {
              return index === searchIndex ? (
                <div
                  key={result}
                  className="flex h-9 cursor-pointer items-center px-8"
                  onClick={() => _search(result)}
                >
                  {result}
                </div>
              ) : (
                <div
                  key={result}
                  className="flex h-9 cursor-pointer items-center px-8"
                  onClick={() => _search(result)}
                >
                  {result}
                </div>
              );
            })}
        </div>
      ) : (
        <div className="flex flex-col">
          <Link
            href={'/'}
            className={`${router.pathname === '/' ? 'font-bold' : ''}`}
          >
            Pokémon
          </Link>
          <Link
            href={'/berry'}
            className={`${router.pathname === '/berry' ? 'font-bold' : ''}`}
          >
            Berry
          </Link>
        </div>
      )}
    </div>
  );
};

export default SideBar;
