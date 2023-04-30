'use client';

import Image from 'next/image';
import React from 'react';
import Link from 'next/link';
import Toggle from './toggle';
import { AiOutlineGithub } from 'react-icons/ai';
import SidebarToggle from './sidebarToggle';

const Header: React.FC = () => {
  return (
    <header className="fixed left-0 top-0 z-50 w-full">
      <div className="flex w-full items-center justify-between border-b-2 border-slate-300 bg-opacity-10 px-[5vw] py-2 backdrop-blur-sm dark:border-slate-700">
        <div className="flex gap-2">
          <SidebarToggle />
          <Link href="/" className="flex items-center gap-2">
            <Image
              alt="pokeball"
              src="/pokeball.png"
              width="200"
              height="200"
              className="h-6 w-6"
              loading="lazy"
            />
            <span className="font-montserrat text-xl font-semibold max-sm:hidden">
              pokédex
            </span>
          </Link>
        </div>

        <div className="flex gap-2">
          <Toggle />

          <a
            target="_blank"
            href="https://github.com/Vishal-Kamath/pokedex"
            className="grid h-9 w-9 place-content-center rounded-full hover:bg-sky-300 hover:bg-opacity-30 dark:hover:bg-sky-700 dark:hover:bg-opacity-30"
          >
            <AiOutlineGithub className="h-6 w-6 text-sky-600" />
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
