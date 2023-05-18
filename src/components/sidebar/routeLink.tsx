import { closeSidebar } from '@/slice/sidebar.slice';
import { useAppDispatch } from '@/store/hooks';
import { usePathname } from 'next/navigation';
import { FC } from 'react';
import { SearchedFor } from './sidebar';

// Icons
import { TbCherry } from 'react-icons/tb';
import { BsBox, BsExclamationCircle } from 'react-icons/bs';
import PokeballOutline from '@/components/svg/pokeball_outline';
import Link from 'next/link';

export function getSearchedForIcon(name: SearchedFor | 'about') {
  if (name === 'pokemon')
    return (
      <PokeballOutline className="aspect-square h-4 w-4 fill-black dark:fill-white" />
    );
  if (name === 'berries') return <TbCherry />;
  if (name === 'items') return <BsBox />;
  if (name === 'about') return <BsExclamationCircle />;
}

const RouteLink: FC<{ title: SearchedFor | 'about' }> = ({ title }) => {
  const dispatch = useAppDispatch();
  const pathname = usePathname();

  const isCurrentRoute = pathname.startsWith(`/${title}`);

  const redirect = () => {
    dispatch(closeSidebar());
  };

  // fetch icon
  const icon = getSearchedForIcon(title);

  return (
    <Link
      href={`/${title}`}
      onClick={redirect}
      className={`${
        isCurrentRoute
          ? 'border-sky-500 bg-sky-400 bg-opacity-25 dark:border-sky-300 sm:border-sky-300 sm:dark:border-sky-500'
          : 'border-slate-700 hover:bg-sky-300/[0.10] dark:border-slate-300 dark:hover:bg-sky-700/[0.2] sm:border-slate-300 sm:dark:border-slate-700'
      } flex h-9 cursor-pointer items-center gap-3 rounded-md border-2 px-2 capitalize `}
    >
      {icon}
      <span>{title}</span>
    </Link>
  );
};

export default RouteLink;
