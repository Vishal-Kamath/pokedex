import { SearchItem } from '@/slice/search.slice';
import { ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import DB from '@/db.json';
import { SearchedFor } from '@/components/sidebar/sidebar';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getEndpoint() {
  const endpoint = process.env.VERCEL_URL
    ? 'https://' + process.env.VERCEL_URL
    : 'http://localhost:3000';

  return endpoint;
}

export class LocalStorageHistory {
  static getHistoryFromLocalStorage(searchedFor: SearchedFor): string[] {
    const historyUnParsed =
      localStorage.getItem(`historyFor${searchedFor}`) || '{}';
    const history = JSON.parse(historyUnParsed);

    if (!Array.isArray(history)) {
      localStorage.setItem(`historyFor${searchedFor}`, JSON.stringify([]));
      return [];
    }
    const uniqueHistoryArray = Array.from(new Set(history)).slice(0, 5);
    localStorage.setItem(
      `historyFor${searchedFor}`,
      JSON.stringify(uniqueHistoryArray)
    );
    return uniqueHistoryArray;
  }

  static removeItemFromLocalStorage(
    name: string,
    searchedFor: SearchedFor
  ): void {
    const history = this.getHistoryFromLocalStorage(searchedFor);
    const filteredHistory = history.filter((item) => item !== name);
    localStorage.setItem(
      `historyFor${searchedFor}`,
      JSON.stringify(filteredHistory)
    );
  }
}

export const getSearchResults = ({
  searchedFor,
  searchValue,
}: {
  searchedFor: SearchedFor;
  searchValue?: string;
}) => {
  const history = LocalStorageHistory.getHistoryFromLocalStorage(searchedFor);
  const historyList = history.map((item) => ({
    item: item,
    type: 'history',
  })) as SearchItem[];

  const searchResults = DB[searchedFor]
    .filter((value) => {
      if (!!searchValue)
        return value.toLowerCase().startsWith(searchValue.toLowerCase());
      return true;
    })
    .slice(0, 10)
    .map((item) => ({
      item: item,
      type: 'search',
    })) as SearchItem[];

  const finalList = getUniqueItemsSearchList(
    historyList.concat(searchResults)
  ).slice(0, 10);
  return finalList;
};

export const getUniqueItemsSearchList = (list: SearchItem[]): SearchItem[] => {
  const hash: { [name: string]: boolean } = {};
  const finalList = list.filter((item) => {
    if (hash[item.item]) return false;

    hash[item.item] = true;
    return true;
  });
  return finalList;
};
