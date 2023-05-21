import { cn } from '@/utils/lib';
import { FC } from 'react';

export const StatsBadge: FC<{
  className: string;
  name: string;
  value: string;
}> = ({ className, name, value }) => (
  <div
    className={cn(
      className,
      'flex gap-1 rounded-md px-3 py-1 text-xs text-black'
    )}
  >
    <span>{name}</span>
    <span>/</span>
    <span>{value}</span>
  </div>
);
