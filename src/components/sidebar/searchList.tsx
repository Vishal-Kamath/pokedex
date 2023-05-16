import {
  selectSearchFocused,
  selectSearchIndex,
  selectSearchResults,
} from '@/slice/search.slice';
import { useAppSelector } from '@/store/hooks';
import React from 'react';
import SearchListItem from './searchListItem';
import { SearchedFor } from './sidebar';

const SearchList: React.FC<{
  searchedFor: SearchedFor;
  search: (value: string) => void;
}> = ({ searchedFor, search }) => {
  const index = useAppSelector(selectSearchIndex);
  const results = useAppSelector(selectSearchResults);
  const focused = useAppSelector(selectSearchFocused);

  return (
    <div className="flex flex-col">
      <div className="flex h-9 items-center rounded-md border-2 border-sky-200 bg-sky-100 px-3 font-semibold capitalize dark:border-sky-700 dark:bg-sky-900">
        {searchedFor}
      </div>
      <div className="flex flex-col">
        {results.length !== 0 &&
          focused &&
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
