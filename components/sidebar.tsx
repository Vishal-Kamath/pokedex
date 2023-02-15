import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState, useEffect, useRef } from 'react';
import SearchBar from './search';
import searchList from '@/db.json';

const SideBar: React.FC<{
  menuOpen: boolean;
  setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ menuOpen, setMenuOpen }) => {
  const router = useRouter();
  const searchBarRef = useRef<HTMLInputElement>();
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const [searchIndex, setSearchIndex] = useState(-1);
  const [mouseOver, setMouseOver] = useState(false);

  const [focus, setFocus] = useState(false);

  const searchDisplay =
    searchResults[searchIndex] !== undefined
      ? searchResults[searchIndex]
      : search;
  const searchfor: 'Pokémon' | 'Berries' =
    router.pathname === '/' || router.pathname === '/pokemon/[pokemonName]'
      ? 'Pokémon'
      : router.pathname === '/berries' ||
        router.pathname === '/berries/[berryName]'
      ? 'Berries'
      : 'Pokémon';

  useEffect(() => {
    setSearchResults(
      searchList[searchfor]
        .filter((pokemon) => pokemon.startsWith(search.toLowerCase()))
        .splice(0, 10)
    );
  }, [search, searchfor]);

  const handleOnChange = (value: string) => {
    setSearch(value);
    setSearchIndex(-1);
  };

  const handleArrowDown = () => {
    if (searchIndex + 1 > 9) return setSearchIndex(0);
    setSearchIndex(searchIndex + 1);
  };
  const handleArrowUp = () => {
    if (searchIndex - 1 < -1) return setSearchIndex(9);
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
    router.pathname === '/'
      ? router.push(`/pokemon/${value}`)
      : router.push(`/${router.pathname.split('/')[1]}/${value}`);
    searchBarRef.current?.focus();
  };
  return (
    <div
      className={`${
        !menuOpen && 'max-md:hidden'
      } fixed z-40 flex h-full w-full flex-col gap-5 overflow-y-auto max-md:top-0 max-md:left-0 max-md:bg-sky-200 max-md:px-[4vw] max-md:pt-20 dark:max-md:bg-slate-900 md:w-2/5 lg:w-[18.5%] xl:max-w-[17.5rem]`}
    >
      <SearchBar
        searchBarRef={searchBarRef}
        _search={_search}
        handleKeyDown={handleKeyDown}
        handleOnChange={handleOnChange}
        searchDisplay={searchDisplay}
        mouseOver={mouseOver}
        setFocus={setFocus}
      />
      {focus ? (
        <div
          onMouseEnter={() => setMouseOver(true)}
          onMouseLeave={() => setMouseOver(false)}
        >
          <div className="flex h-9 items-center rounded-md border-2 border-sky-200 bg-sky-100 px-3 font-bold dark:border-sky-700 dark:bg-sky-900">
            {searchfor}
          </div>
          <div className="mt-3 ml-3">
            {searchResults.length !== 0 &&
              focus &&
              searchResults.map((result, index) => {
                return index === searchIndex ? (
                  <div
                    key={result}
                    className="flex h-9 cursor-pointer items-center gap-5 border-l-2 border-sky-300 bg-slate-100 px-5 leading-none dark:border-sky-700 dark:bg-slate-800"
                    onClick={() => _search(result)}
                  >
                    <span>•</span>
                    <span>{result}</span>
                  </div>
                ) : (
                  <div
                    key={result}
                    className="flex h-9 cursor-pointer items-center gap-5 border-l-2 px-5 leading-none hover:bg-slate-100 dark:hover:bg-slate-800"
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
            onClick={() => setMenuOpen(false)}
            className={`${
              router.pathname === '/' ||
              router.pathname === '/pokemon/[pokemonName]'
                ? 'border-sky-200 bg-sky-100 font-bold dark:border-sky-700 dark:bg-sky-900'
                : 'bg-slate-50 dark:border-slate-700 dark:bg-slate-800'
            } flex h-9 items-center rounded-md border-2 px-3`}
          >
            Pokémon
          </Link>
          <Link
            href={'/berries'}
            onClick={() => setMenuOpen(false)}
            className={`${
              router.pathname === '/berries' ||
              router.pathname === '/berries/[berryName]'
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
