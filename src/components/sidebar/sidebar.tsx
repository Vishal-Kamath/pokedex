'use client';

import { closeSidebar, selectSidebarOpen } from '@/slice/sidebar.slice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import React, { useEffect } from 'react';
import SearchBar from './searchbar';
import RouteLink from './routeLink';
import { selectSearchFocused, setResults } from '@/slice/search.slice';
import { usePathname, useRouter } from 'next/navigation';
import SearchList from './searchList';
import DB from '@/db.json';

const SideBar: React.FC = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const open = useAppSelector(selectSidebarOpen);
  const focused = useAppSelector(selectSearchFocused);

  const pathname = usePathname();
  const searchPath = pathname.split('/')[1];

  const searchedFor = (
    !!['pokemon', 'berries', 'items'].find((value) => value === searchPath)
      ? searchPath
      : 'pokemon'
  ) as 'pokemon' | 'berries' | 'items';

  function search(value: string) {
    router.push(`/${searchedFor}/${value}`);
    dispatch(closeSidebar());
  }

  useEffect(() => {
    const searchResults = DB[searchedFor].splice(0, 10);
    dispatch(setResults(searchResults));
  }, [searchedFor]);

  return (
    <nav
      className={`${
        !open && 'max-sm:hidden'
      } isolate min-h-screen w-full border-slate-300 bg-slate-100 bg-opacity-5 px-[5vw] pt-20 backdrop-blur-2xl dark:border-slate-700 max-sm:fixed max-sm:left-0 max-sm:top-0 max-sm:z-30 sm:max-w-[50vw] sm:border-r-2 sm:pr-5 lg:max-w-[25vw]`}
    >
      <div className="flex flex-col gap-5">
        <SearchBar search={search} searchedFor={searchedFor} />

        {focused ? (
          <>
            {/* Search list */}
            <SearchList searchedFor={searchedFor} search={search} />
          </>
        ) : (
          <>
            {/* Routes */}
            <div className="flex flex-col gap-1">
              <RouteLink title="pokemon" />
              <RouteLink title="berries" />
              <RouteLink title="items" />
              <RouteLink title="about" />
            </div>
          </>
        )}
      </div>
    </nav>
  );
};

export default SideBar;
