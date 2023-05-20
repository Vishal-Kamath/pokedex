import { SearchItem, triggerNewSearch } from '@/slice/search.slice';
import React from 'react';
import { AiOutlineSearch, AiOutlineClockCircle } from 'react-icons/ai';
import { RxCross1 } from 'react-icons/rx';
import { cva } from 'class-variance-authority';
import { LocalStorageHistory, cn } from '@/utils/lib';
import { useAppDispatch } from '@/store/hooks';
import { SearchedFor } from './sidebar';
import Link from 'next/link';

export const itemVariantClass = cva(
  'flex w-full h-9 cursor-pointer items-center gap-3 rounded-md px-2 leading-none',
  {
    variants: {
      focused: {
        true: 'bg-slate-100/[0.5] dark:bg-slate-800/[0.5]',
        false:
          'group-hover:bg-slate-100/[0.5] dark:group-hover:bg-slate-800/[0.7]',
      },
    },
  }
);

export const itemIconVariantClass = cva('w-5', {
  variants: {
    focused: {
      true: 'text-sky-500',
      false: 'text-slate-700 dark:text-slate-300',
    },
  },
});

const SearchListItem: React.FC<
  {
    searchedFor: SearchedFor;
    search: (value: string) => void;
    focused: boolean;
  } & SearchItem
> = ({ focused, item, search, searchedFor, type }) => {
  const dispatch = useAppDispatch();

  return type === 'search' ? (
    <div className="group">
      <Link
        key={item}
        className={cn(itemVariantClass({ focused }))}
        href={`/${searchedFor}/${item}`}
        onClick={() => search(item)}
      >
        <AiOutlineSearch className={cn(itemIconVariantClass({ focused }))} />
        <span>{item}</span>
      </Link>
    </div>
  ) : (
    <div className="group relative flex gap-1">
      <Link
        key={item}
        className={cn(itemVariantClass({ focused }))}
        href={`/${searchedFor}/${item}`}
        onClick={() => search(item)}
      >
        <AiOutlineClockCircle
          className={cn(itemIconVariantClass({ focused }))}
        />
        <span>{item}</span>
      </Link>
      <RxCross1
        className="absolute right-1 top-1/2 aspect-square h-6 w-6 -translate-y-1/2 rounded-[4px] bg-opacity-25 p-1 hover:bg-slate-200 hover:text-red-600 dark:hover:bg-slate-700"
        onClick={() => {
          LocalStorageHistory.removeItemFromLocalStorage(item, searchedFor);
          dispatch(triggerNewSearch({ searchedFor }));
        }}
      />
    </div>
  );
};

export default SearchListItem;
