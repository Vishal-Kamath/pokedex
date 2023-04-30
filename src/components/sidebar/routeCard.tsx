import { usePathname } from 'next/navigation';
import React from 'react';

const RouteCard: React.FC<{ title: string }> = ({ title }) => {
  const pathname = usePathname();

  const isCurrentRoute = pathname === `/${title}`;
  return (
    <div
      className={`${
        isCurrentRoute
          ? 'border-sky-300 bg-sky-400 bg-opacity-25 dark:border-sky-500'
          : 'border-slate-300 dark:border-slate-700'
      } flex h-9 items-center rounded-lg border-2 px-2 capitalize`}
    >
      {title}
    </div>
  );
};

export default RouteCard;
