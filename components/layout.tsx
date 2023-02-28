import Head from 'next/head';
import React, { useRef, useState } from 'react';
import Footer from './footer';
import Header from './header';
import SideBar from './sidebar';

const Layout: React.FC<{ children: JSX.Element | JSX.Element[] }> = ({
  children,
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const searchBarRef = useRef<HTMLInputElement>();

  const keyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    console.log(e.code);
    if (e.code === 'KeyS' && document.activeElement !== searchBarRef.current) {
      e.preventDefault();
      searchBarRef.current?.focus();
    }
  };
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="title" content="PokéDex" />
        <meta name="description" content="PokéDex using PokéApi and NextJs" />
        <meta
          name="keywords"
          content="Pokémon, PokéDex, PokéApi, TypeScript, NextJs, ReactJs, Tailwindcss, "
        />
        <meta name="robots" content="index, follow" />
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="language" content="English" />
        <meta name="author" content="blitzyTheDev" />
      </Head>
      <div
        className="relative flex min-h-screen flex-col bg-white text-black dark:bg-slate-900 dark:text-white"
        onKeyDown={keyDown}
        tabIndex={0}
      >
        <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
        <main className="padding-x pt-20">
          <SideBar
            menuOpen={menuOpen}
            setMenuOpen={setMenuOpen}
            searchBarRef={searchBarRef}
          />
          {children}
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Layout;
