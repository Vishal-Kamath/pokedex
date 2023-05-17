import { closeSidebar } from '@/slice/sidebar.slice';
import { useAppDispatch } from '@/store/hooks';
import { usePathname, useRouter } from 'next/navigation';
import { FC } from 'react';

const RouteLink: FC<{ title: string }> = ({ title }) => {
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
          : 'border-slate-700 hover:bg-sky-300/[0.10] dark:border-slate-300 dark:hover:bg-sky-700/[0.2] sm:border-slate-300 sm:dark:border-slate-700'
      } flex h-9 cursor-pointer items-center rounded-md border-2 px-3 capitalize`}
    >
      {title}
    </div>
  );
};

export default RouteLink;
