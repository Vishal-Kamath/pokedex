import { ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const capitalize = (text: string) => {
  return text[0].toLocaleUpperCase() + text.slice(0).toLocaleLowerCase();
};