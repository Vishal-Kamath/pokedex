import Head from 'next/head';
import React, { useState } from 'react';
import Header from './header';

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
      <div className="dark:bg-slate-900 dark:text-white flex min-h-screen flex-col bg-sky-200">
        <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
        <main className="pt-20">{children}</main>
      </div>
    </>
  );
};

export default Layout;
