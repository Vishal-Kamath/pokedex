'use client';

import { selectSidebarOpen } from '@/slice/sidebar.slice';
import { useAppSelector } from '@/store/hooks';
import React from 'react';

const SideBar: React.FC = () => {
  const open = useAppSelector(selectSidebarOpen);
  return (
    <nav
      className={`${
        !open && 'max-sm:hidden'
      } isolate min-h-screen w-full border-slate-300 bg-slate-100 bg-opacity-5 px-[5vw] pt-20 backdrop-blur-lg dark:border-slate-700 max-sm:fixed max-sm:left-0 max-sm:top-0 max-sm:z-30 sm:max-w-[50vw] sm:border-r-2 sm:pr-5 lg:max-w-[25vw]`}
    >
      Sidebar
    </nav>
  );
};

export default SideBar;
