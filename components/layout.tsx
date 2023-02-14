import Head from 'next/head';
import React, { useState } from 'react';
import Header from './header';
import SearchBar from './search';

const Layout: React.FC<{ children: JSX.Element | JSX.Element[] }> = ({
  children,
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <>
      <Head>
        <title>PokéDex</title>
        <meta name="description" content="PokéDex" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex min-h-screen flex-col bg-sky-100 dark:bg-slate-900 dark:text-white">
        <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
        {menuOpen && (
          <div className="fixed top-0 flex min-h-screen w-full flex-col items-center bg-red-500 pt-20 dark:bg-red-700  md:hidden">
            <SearchBar classname="" />
          </div>
        )}
        <main className="pt-20">{children}</main>
      </div>
    </>
  );
};

export default Layout;
