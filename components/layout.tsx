import Head from 'next/head';
import React, { useState } from 'react';
import Header from './header';
import SearchBar from './search';
import SideBar from './sidebar';

const Layout: React.FC<{ children: JSX.Element | JSX.Element[] }> = ({
  children,
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <>
      <Head>
        <meta name="description" content="PokéDex" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="relative flex min-h-screen flex-col bg-white text-black dark:bg-slate-900 dark:text-white">
        <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
        <main className="padding-x flex pt-20">
          <SideBar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
          {children}
        </main>
      </div>
    </>
  );
};

export default Layout;
