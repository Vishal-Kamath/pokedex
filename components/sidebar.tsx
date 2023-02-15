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

  const searchfor: 'pokemon' | 'Berries' =
    router.pathname === '/' || router.pathname === '/pokemon/[pokemonName]'
      ? 'pokemon'
      : router.pathname === '/berry'
      ? 'Berries'
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
      } fixed z-40 flex h-full w-full flex-col gap-5 overflow-y-auto max-md:top-0 max-md:left-0 max-md:bg-sky-200 max-md:px-[4vw] max-md:pt-20 dark:max-md:bg-slate-900 md:w-1/6`}
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
          <div className="flex h-9 items-center rounded-md border-2 border-sky-200 bg-sky-100 px-3 font-bold dark:border-sky-700 dark:bg-sky-900">
            {searchfor === 'pokemon' ? 'Pokémon' : searchfor}
          </div>
          <div className="mt-3 ml-3">
            {searchResults.length !== 0 &&
              focus &&
              searchResults.map((result, index) => {
                return index === searchIndex ? (
                  <div
                    key={result}
                    className="flex h-9  cursor-pointer items-center gap-5 border-l-2 border-sky-300 bg-slate-100 px-5 dark:border-sky-700 dark:bg-slate-800"
                    onClick={() => _search(result)}
                  >
                    <span>•</span>
                    <span>{result}</span>
                  </div>
                ) : (
                  <div
                    key={result}
                    className="flex h-9 cursor-pointer items-center gap-5 border-l-2 px-5 hover:bg-slate-100 dark:hover:bg-slate-800"
                    onClick={() => _search(result)}
                  >
                    <span>•</span>
                    <span>{result}</span>
                  </div>
                );
              })}
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-1">
          <Link
            href={'/'}
            className={`${
              router.pathname === '/' ||
              router.pathname === '/pokemon/[pokemonName]'
                ? 'border-sky-200 bg-sky-100 font-bold dark:border-sky-700 dark:bg-sky-900'
                : 'bg-slate-50 dark:bg-slate-800'
            } flex h-9 items-center rounded-md border-2  px-3`}
          >
            Pokémon
          </Link>
          <Link
            href={'/berry'}
            className={`${
              router.pathname === '/berry'
                ? 'border-sky-200 bg-sky-100 font-bold dark:border-sky-700 dark:bg-sky-900'
                : 'bg-slate-50 dark:border-slate-700 dark:bg-slate-800'
            } flex h-9 items-center rounded-md border-2 px-3`}
          >
            Berries
          </Link>
        </div>
      )}
    </div>
  );
};

export default SideBar;
