import { ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

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
  static getHistoryFromLocalStorage(): string[] {
    const historyUnParsed = localStorage.getItem('history') || '{}';
    const history = JSON.parse(historyUnParsed);

    if (!Array.isArray(history)) {
      localStorage.setItem('history', JSON.stringify([]));
      return [];
    }
    const uniqueHistoryArray = Array.from(new Set(history)).slice(0, 5);
    localStorage.setItem('history', JSON.stringify(uniqueHistoryArray));
    return uniqueHistoryArray;
  }
}