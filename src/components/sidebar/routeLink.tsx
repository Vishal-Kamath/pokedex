import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

const RouteLink: React.FC<{ title: string }> = ({ title }) => {
  const pathname = usePathname();

  const isCurrentRoute = pathname === `/${title}`;
  return (
    <Link
      href={`/${title}`}
      className={`${
        isCurrentRoute
          ? 'border-sky-500 bg-sky-400 bg-opacity-25 dark:border-sky-300 sm:border-sky-300 sm:dark:border-sky-500'
          : 'border-slate-700 dark:border-slate-300 sm:border-slate-300 sm:dark:border-slate-700'
      } flex h-9 items-center rounded-lg border-2 px-2 capitalize`}
    >
      {title}
    </Link>
  );
};

export default RouteLink;
