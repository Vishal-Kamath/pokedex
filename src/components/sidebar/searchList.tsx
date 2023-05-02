import {
  selectSearchFocused,
  selectSearchIndex,
  selectSearchResults,
} from '@/slice/search.slice';
import { useAppSelector } from '@/store/hooks';
import React from 'react';

const SearchList: React.FC<{
  searchedFor: string;
  search: (value: string) => void;
}> = ({ searchedFor, search }) => {
  const index = useAppSelector(selectSearchIndex);
  const results = useAppSelector(selectSearchResults);
  const focused = useAppSelector(selectSearchFocused);

  return (
    <div>
      <div className="flex h-9 items-center rounded-md border-2 border-sky-200 bg-sky-100 px-3 font-bold dark:border-sky-700 dark:bg-sky-900">
        {searchedFor}
      </div>
      <div className="ml-3 mt-3">
        {results.length !== 0 &&
          focused &&
          results.map((result, listIndex) => {
            return listIndex === index ? (
              <div
                key={result}
                className="flex h-9 cursor-pointer items-center gap-5 border-l-2 border-sky-300 bg-slate-100 px-5 leading-none dark:border-sky-700 dark:bg-slate-800"
                onClick={() => search(result)}
              >
                <span>•</span>
                <span>{result}</span>
              </div>
            ) : (
              <div
                key={result}
                className="flex h-9 cursor-pointer items-center gap-5 border-l-2 px-5 leading-none hover:bg-slate-100 dark:hover:bg-slate-800"
                onClick={() => search(result)}
              >
                <span>•</span>
                <span>{result}</span>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default SearchList;
