import { closeSidebar } from '@/slice/sidebar.slice';
import { useAppDispatch } from '@/store/hooks';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react';

const RouteLink: React.FC<{ title: string }> = ({ title }) => {
  const dispatch = useAppDispatch();
  const pathname = usePathname();
  const router = useRouter();

  const isCurrentRoute = pathname.startsWith(`/${title}`);

  const redirect = () => {
    router.push(`/${title}`);
    dispatch(closeSidebar());
  };
  return (
    <div
      onClick={redirect}
      className={`${
        isCurrentRoute
          ? 'border-sky-500 bg-sky-400 bg-opacity-25 dark:border-sky-300 sm:border-sky-300 sm:dark:border-sky-500'
          : 'border-slate-700 dark:border-slate-300 sm:border-slate-300 sm:dark:border-slate-700'
      } flex h-9 cursor-pointer items-center rounded-md border-2 px-2 capitalize`}
    >
      {title}
    </div>
  );
};

export default RouteLink;
