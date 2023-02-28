import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState, useEffect, useRef } from 'react';
import SearchBar from './search';
import searchList from '@/db.json';

const SideBar: React.FC<{
  menuOpen: boolean;
  setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  searchBarRef: React.MutableRefObject<HTMLInputElement | undefined>;
}> = ({ menuOpen, setMenuOpen, searchBarRef }) => {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const [searchIndex, setSearchIndex] = useState(-1);

  const [focus, setFocus] = useState(false);

  const searchDisplay =
    searchResults[searchIndex] !== undefined
      ? searchResults[searchIndex]
      : search;

  const getSearchFor = (): 'Pokémon' | 'Berries' | 'Items' => {
    switch (router.pathname) {
      case '/':
      case '/pokemon/[pokemonName]':
        return 'Pokémon';

      case '/berries':
      case '/berries/[berryName]':
        return 'Berries';

      case '/items':
      case '/items/[itemName]':
        return 'Items';

      default:
        return 'Pokémon';
    }
  };

  const searchfor: 'Pokémon' | 'Berries' | 'Items' = getSearchFor();

  useEffect(() => {
    setSearchResults(
      searchList[searchfor]
        .filter((data) => data.startsWith(search.toLowerCase()))
        .splice(0, 10)
    );
  }, [search, searchfor]);

  const handleOnChange = (value: string) => {
    setSearch(value);
    setSearchIndex(-1);
    setFocus(true);
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
      } padding-x fixed top-0 left-0 z-40 min-h-screen w-full pt-20 max-md:bg-white max-md:dark:bg-slate-900 md:-z-0`}
    >
      <div className="flex w-full flex-col gap-5 md:w-1/2 md:pr-5 lg:w-1/4">
        <SearchBar
          searchBarRef={searchBarRef}
          _search={_search}
          handleKeyDown={handleKeyDown}
          handleOnChange={handleOnChange}
          searchDisplay={searchDisplay}
          setFocus={setFocus}
        />
        {focus ? (
          <div>
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
            <Link
              href={'/items'}
              onClick={() => setMenuOpen(false)}
              className={`${
                router.pathname === '/items' ||
                router.pathname === '/items/[itemName]'
                  ? 'border-sky-200 bg-sky-100 font-bold dark:border-sky-700 dark:bg-sky-900'
                  : 'bg-slate-50 dark:border-slate-700 dark:bg-slate-800'
              } flex h-9 items-center rounded-md border-2 px-3`}
            >
              Items
            </Link>
            <Link
              href={'/about'}
              onClick={() => setMenuOpen(false)}
              className={`${
                router.pathname === '/about'
                  ? 'border-sky-200 bg-sky-100 font-bold dark:border-sky-700 dark:bg-sky-900'
                  : 'bg-slate-50 dark:border-slate-700 dark:bg-slate-800'
              } flex h-9 items-center rounded-md border-2 px-3`}
            >
              About
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default SideBar;
