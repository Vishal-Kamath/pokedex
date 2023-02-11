import Image from 'next/image';
import React from 'react';
import PokéDex from '@/assets/PokéDex.png';

const Header: React.FC = () => {
  return (
    <header>
      <div className="padding-x flex min-w-full items-center border-b-4 border-red-500 bg-red-600 py-1 dark:border-red-600 dark:bg-red-800">
        <Image alt="PokéDex" src={PokéDex} className="w-28" />
      </div>
      <div className="clip-path mt-[-4px] h-6 w-1/3 border-b-4 border-red-500 bg-red-600 dark:border-red-600 dark:bg-red-800 lg:w-1/4"></div>
    </header>
  );
};

export default Header;
