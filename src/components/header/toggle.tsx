// redux
import { ThemeType, selectTheme, setTheme } from '@/slice/theme.slice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';

// icons
import { HiOutlineMoon, HiOutlineSun } from 'react-icons/hi';
import { RiComputerLine } from 'react-icons/ri';

import { IconType } from 'react-icons/lib';
import { FC, useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { useIsomorphicLayoutEffect } from '../hooks/useIsomorphicLayoutEffect';

type SettingType = {
  theme: ThemeType;
  label: string;
  icon: IconType;
};
const settings: SettingType[] = [
  {
    theme: 'light',
    label: 'Light',
    icon: HiOutlineSun,
  },
  {
    theme: 'dark',
    label: 'Dark',
    icon: HiOutlineMoon,
  },
  {
    theme: 'system',
    label: 'System',
    icon: RiComputerLine,
  },
];

function update() {
  document.documentElement.classList.add('changing-theme');
  if (
    localStorage.theme === 'dark' ||
    (!('theme' in localStorage) &&
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches)
  ) {
    document.documentElement.classList.add('dark');
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute('content', '#020617');
  } else {
    document.documentElement.classList.remove('dark');
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute('content', '#ffffff');
  }
  window.setTimeout(() => {
    document.documentElement.classList.remove('changing-theme');
  });
}

const Toggle: FC = () => {
  const theme = useAppSelector(selectTheme);
  const dispatch = useAppDispatch();

  // dropdown open and close
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const openDropdown = () => setDropdownOpen(true);
  const closeDropdown = () => setDropdownOpen(false);

  // close dropdown
  useEffect(() => {
    const closeWithDelay = () => {
      if (dropdownOpen) setTimeout(closeDropdown, 50);
    };
    document.addEventListener('click', closeWithDelay);

    return () => {
      document.removeEventListener('click', closeWithDelay);
    };
  }, [dropdownOpen]);

  useIsomorphicLayoutEffect(() => {
    let theme = localStorage.theme;
    if (theme === 'light' || theme === 'dark') {
      dispatch(setTheme(theme));
    } else {
      dispatch(setTheme('system'));
    }
  }, []);

  useIsomorphicLayoutEffect(() => {
    if (theme === 'system') {
      localStorage.removeItem('theme');
    } else if (theme === 'light' || theme === 'dark') {
      localStorage.theme = theme;
    }
    update();
  }, [theme]);

  useEffect(() => {
    let mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    mediaQuery.addEventListener('change', update);

    function onStorage() {
      update();
      let theme = localStorage.theme;
      if (theme === 'light' || theme === 'dark') {
        dispatch(setTheme(theme));
      } else {
        dispatch(setTheme('system'));
      }
    }
    window.addEventListener('storage', onStorage);

    return () => {
      if (mediaQuery?.removeEventListener) {
        mediaQuery.removeEventListener('change', update);
      } else {
        mediaQuery.removeListener(update);
      }

      window.removeEventListener('storage', onStorage);
    };
  }, []);

  return (
    <div className="relative h-9 w-9">
      <button
        title="toggle theme"
        aria-label="toggle theme"
        className="grid h-9 w-9 place-content-center rounded-full outline-none hover:bg-sky-300 hover:bg-opacity-30 dark:hover:bg-sky-700 dark:hover:bg-opacity-30"
        onClick={openDropdown}
      >
        {theme !== 'system' ? (
          <>
            <HiOutlineMoon className="hidden h-6 w-6 fill-sky-400 text-sky-600 dark:block" />
            <HiOutlineSun className="h-6 w-6 fill-sky-300 text-sky-600 dark:hidden" />
          </>
        ) : (
          <>
            <HiOutlineMoon className="hidden h-6 w-6 fill-slate-400 text-slate-600 dark:block" />
            <HiOutlineSun className="h-6 w-6 fill-slate-300 text-slate-600 dark:hidden" />
          </>
        )}
      </button>
      <div
        aria-label="select theme options"
        className={clsx(
          !dropdownOpen && 'hidden',
          'absolute right-0 top-0 flex w-[9rem] translate-y-14 flex-col justify-start overflow-hidden rounded-lg border-2 border-slate-300 bg-white shadow-lg dark:border-slate-700 dark:bg-slate-900'
        )}
        // check if cursor inside bound
      >
        {settings.map((setting) => (
          <button
            key={setting.theme}
            className={clsx(
              'text-md flex w-full items-center gap-3 px-3 py-1 font-medium hover:bg-sky-500 hover:bg-opacity-25',
              setting.theme === theme && 'text-sky-500'
            )}
            onClick={() => dispatch(setTheme(setting.theme))}
          >
            <setting.icon className="text-lg" />
            <span>{setting.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Toggle;
