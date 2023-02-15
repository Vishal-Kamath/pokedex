import React, { useEffect, useState } from 'react';
import { FiSun } from 'react-icons/fi';
import { FaMoon } from 'react-icons/fa';

const Toggle: React.FC = () => {
  const [checked, setChecked] = useState<boolean>(false);

  const handleClick = () => {
    setChecked(!checked);
    localStorage.setItem('dayNnight', JSON.stringify(checked));
    if (checked) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  };

  const onLoad = () => {
    let storageChecked = JSON.parse(
      localStorage.getItem('dayNnight') || 'false'
    ) as boolean;
    setChecked(storageChecked);
    if (storageChecked) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  };

  useEffect(onLoad, []);

  return (
    <div className="relative ml-auto flex h-4 w-8 items-center">
      <input
        type="checkbox"
        id="dayNnight"
        checked={checked}
        onChange={handleClick}
        className="absolute top-0 left-0 z-10 h-full w-full opacity-0"
      />
      <FaMoon className="ml-1 hidden h-4 w-4 text-yellow-200 dark:block" />
      <FiSun className="h-5 w-5 fill-yellow-200 text-yellow-200 dark:hidden" />
    </div>
  );
};

export default Toggle;
