import React, { useEffect, useState } from 'react';
import { FiSun } from 'react-icons/fi';
import { FaMoon } from 'react-icons/fa';

const Toggle: React.FC = () => {
  const [checked, setChecked] = useState<boolean>(false);

  const handleClick = () => {
    setChecked(!checked);
  };

  useEffect(() => {
    let storageChecked = JSON.parse(
      localStorage.getItem('dayNnight') || 'false'
    ) as boolean;
    setChecked(storageChecked);
  }, []);

  useEffect(() => {
    localStorage.setItem('dayNnight', JSON.stringify(checked));
    if (checked) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [checked]);

  return (
    <div className="ml-auto relative w-8 h-4 flex items-center">
      <input
        type="checkbox"
        id="dayNnight"
        checked={checked}
        onChange={handleClick}
        className="absolute top-0 left-0 w-full h-full z-10 opacity-0"
      />
      <FaMoon className="text-yellow-200 h-4 w-4 hidden dark:block ml-1" />
      <FiSun className="text-yellow-200 h-5 w-5 fill-yellow-200 dark:hidden" />
    </div>
  );
};

export default Toggle;
