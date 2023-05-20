import { selectSearchIndex, selectSearchResults } from '@/slice/search.slice';
import { useAppSelector } from '@/store/hooks';
import React from 'react';
import SearchListItem from './searchListItem';
import { SearchedFor } from './sidebar';
import { getSearchedForIcon } from './routeLink';

const SearchList: React.FC<{
  searchedFor: SearchedFor;
  setToggleSidebarToResults: React.Dispatch<React.SetStateAction<boolean>>;
  search: (value: string) => void;
}> = ({ searchedFor, setToggleSidebarToResults, search }) => {
  const index = useAppSelector(selectSearchIndex);
  const results = useAppSelector(selectSearchResults);

  const icon = getSearchedForIcon(searchedFor);

  return (
    <div className="flex flex-col">
      <div className="flex h-9 items-center gap-[2px]">
        <div className="flex h-full w-full items-center gap-[14px] rounded-l-md rounded-r-sm border-2 border-sky-200 bg-sky-100 px-2 capitalize dark:border-sky-700 dark:bg-sky-900">
          {icon}
          <span>{searchedFor}</span>
        </div>

        <button
          onClick={() => setToggleSidebarToResults(false)}
          className="h-full rounded-l-sm rounded-r-md border-2 border-sky-200 bg-sky-100 px-2 text-xs font-extralight dark:border-sky-700 dark:bg-sky-900"
        >
          ESC
        </button>
      </div>
      <div className="flex flex-col">
        {results.length !== 0 &&
          results.map((result, listIndex) => (
            <SearchListItem
              key={result.item}
              searchedFor={searchedFor}
              focused={listIndex === index}
              search={search}
              {...result}
            />
          ))}
      </div>
    </div>
  );
};

export default SearchList;
