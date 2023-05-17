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
      <div className="flex h-9 items-center justify-between rounded-md border-2 border-sky-200 bg-sky-100 pr-1 capitalize dark:border-sky-700 dark:bg-sky-900">
        <div className="flex items-center gap-[14px] px-2">
          {icon}
          <span>{searchedFor}</span>
        </div>

        <button
          onClick={() => setToggleSidebarToResults(false)}
          className="rounded-[4px] border-2 border-sky-300 bg-sky-200 p-1 px-2 text-xs font-extralight dark:border-sky-600 dark:bg-sky-700"
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
