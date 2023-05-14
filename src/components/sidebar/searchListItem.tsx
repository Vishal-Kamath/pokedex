import { SearchItem } from '@/slice/search.slice';
import React from 'react';
import { FaSearch } from 'react-icons/fa';
import { AiOutlineClockCircle } from 'react-icons/ai';

const SearchListItem: React.FC<
  {
    search: (value: string) => void;
    focused: boolean;
  } & SearchItem
> = ({ focused, item, search, type }) => {
  return focused ? (
    <div
      key={item}
      className="flex h-9 cursor-pointer items-center gap-5 rounded-md border-sky-300 bg-slate-100 px-2 leading-none dark:border-sky-700 dark:bg-slate-800"
      onClick={() => search(item)}
    >
      {type === 'search' ? (
        <FaSearch className="text-sky-500" />
      ) : (
        <AiOutlineClockCircle className="text-sky-500" />
      )}
      <span>{item}</span>
    </div>
  ) : (
    <div
      key={item}
      className="flex h-9 cursor-pointer items-center gap-5 rounded-md px-2 leading-none hover:bg-slate-100 dark:hover:bg-slate-800"
      onClick={() => search(item)}
    >
      {type === 'search' ? (
        <FaSearch className="text-slate-500" />
      ) : (
        <AiOutlineClockCircle className="text-slate-500" />
      )}
      <span>{item}</span>
    </div>
  );
};

export default SearchListItem;
