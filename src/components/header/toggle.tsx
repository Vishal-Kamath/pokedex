import { selectTheme, setDark, toggleDark } from '@/slice/theme.slice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import React, { useEffect } from 'react';
import { HiOutlineMoon, HiOutlineSun } from 'react-icons/hi';

const Toggle: React.FC = () => {
  const dark = useAppSelector(selectTheme);
  const dispatch = useAppDispatch();
  const handleClick = () => {
    dispatch(toggleDark());
    localStorage.setItem('dark', JSON.stringify(!dark));
    if (!dark) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  };

  const onLoad = () => {
    let storageChecked = JSON.parse(
      localStorage.getItem('dark') || 'false'
    ) as boolean;
    dispatch(setDark(storageChecked));
    if (storageChecked) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  };

  useEffect(onLoad, []);

  return (
    <div className="relative grid h-9 w-9 place-content-center rounded-full hover:bg-sky-300 hover:bg-opacity-30 dark:hover:bg-sky-700 dark:hover:bg-opacity-30">
      <input
        type="checkbox"
        id="dark"
        checked={dark}
        onChange={handleClick}
        className="absolute left-0 top-0 z-10 h-full w-full opacity-0"
      />
      <HiOutlineMoon className="hidden h-6 w-6 fill-sky-400 text-sky-600 dark:block" />
      <HiOutlineSun className="h-6 w-6 fill-sky-300 text-sky-600 dark:hidden" />
    </div>
  );
};

export default Toggle;
