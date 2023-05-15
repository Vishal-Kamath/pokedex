import { SearchItem } from '@/slice/search.slice';
import React from 'react';
import { AiOutlineSearch, AiOutlineClockCircle } from 'react-icons/ai';
import { cva } from 'class-variance-authority';
import { cn } from '@/utils/lib';

export const itemVariantClass = cva(
  'flex h-9 cursor-pointer items-center gap-5 rounded-md px-2 leading-none',
  {
    variants: {
      focused: {
        true: 'border-sky-300 bg-slate-100 dark:border-sky-700 dark:bg-slate-800',
        false: 'hover:bg-slate-100 dark:hover:bg-slate-800',
      },
    },
  }
);

export const itemIconVariantClass = cva('w-5', {
  variants: {
    focused: {
      true: 'text-sky-500',
      false: 'text-slate-500',
    },
  },
});

const SearchListItem: React.FC<
  {
    search: (value: string) => void;
    focused: boolean;
  } & SearchItem
> = ({ focused, item, search, type }) => {
  return type === 'search' ? (
    <div
      key={item}
      className={cn(itemVariantClass({ focused }))}
      onClick={() => search(item)}
    >
      <AiOutlineSearch className={cn(itemIconVariantClass({ focused }))} />
      <span>{item}</span>
    </div>
  ) : (
    <div
      key={item}
      className={cn(itemVariantClass({ focused }))}
      onClick={() => search(item)}
    >
      <AiOutlineClockCircle className={cn(itemIconVariantClass({ focused }))} />
      <span>{item}</span>
    </div>
  );
};

export default SearchListItem;
