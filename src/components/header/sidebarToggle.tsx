import React from 'react';
import { BiMenuAltLeft } from 'react-icons/bi';
import { RxCross1 } from 'react-icons/rx';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  closeSidebar,
  openSidebar,
  selectSidebarOpen,
} from '@/slice/sidebar.slice';

const SidebarToggle: React.FC = () => {
  const open = useAppSelector(selectSidebarOpen);
  const dispatch = useAppDispatch();
  return (
    <div className="grid h-9 w-9 place-content-center rounded-full hover:bg-sky-50 dark:hover:bg-sky-950 sm:hidden">
      {open ? (
        <RxCross1
          className="text-2xl"
          onClick={() => dispatch(closeSidebar())}
        />
      ) : (
        <BiMenuAltLeft
          className="text-2xl"
          onClick={() => dispatch(openSidebar())}
        />
      )}
    </div>
  );
};

export default SidebarToggle;
