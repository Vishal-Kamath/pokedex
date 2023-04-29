import Image from 'next/image';
import React from 'react';
import Link from 'next/link';
import Toggle from './toggle';
import { AiOutlineGithub } from 'react-icons/ai';

const Header: React.FC = () => {
  return (
    <header className="fixed left-0 top-0 z-50 w-full">
      <div className="flex w-full items-center justify-between border-b-2 bg-opacity-10 px-[5vw] py-2 backdrop-blur-sm dark:border-slate-700">
        <Link href="/" className="flex items-center gap-2">
          <Image
            alt="pokeball"
            src="/pokeball.png"
            width="200"
            height="200"
            className="h-6 w-6"
            loading="lazy"
          />
          <span className="font-montserrat text-xl">pokédex</span>
        </Link>

        <div className="flex gap-2">
          <Toggle />

          <a
            target="_blank"
            href="https://github.com/Vishal-Kamath/pokedex"
            className="grid h-9 w-9 place-content-center rounded-full hover:bg-sky-50 dark:hover:bg-sky-950"
          >
            <AiOutlineGithub className="h-6 w-6 text-sky-600" />
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
