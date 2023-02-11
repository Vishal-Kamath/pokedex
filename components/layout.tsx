import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import Footer from './footer';
import PokéDex from '@/assets/PokéDex.png';
import SearchBar from './search';
import axios from 'axios';
import { Pokemon } from '@/pages';
import Link from 'next/link';

const Layout: React.FC<{
  children: JSX.Element | JSX.Element[];
}> = ({ children }) => {
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState<string[]>([]);

  useEffect(() => {
    async function getPokemon() {
      const res = await axios.get<Pokemon>(
        'https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0'
      );
      const results = res.data.results
        .filter((pokemon) => pokemon.name.startsWith(search.toLowerCase()))
        .map((pokemon) => pokemon.name);
      setSearchResults(results.splice(0, 20));
    }
    getPokemon();
  }, [search]);
  return (
    <div className="flex min-h-screen flex-col bg-sky-200 text-black dark:bg-slate-900 dark:text-white">
      <header className="fixed top-0 z-50 w-full">
        <div className="padding-x h-14 w-full border-b-4 border-red-500 bg-red-700 dark:border-red-600 dark:bg-red-800">
          <nav className="m-auto flex h-full  max-w-6xl items-center justify-between">
            <Link href="/">
              <Image className="mt-2 w-32" src={PokéDex} alt="PokéDex Logo" />
            </Link>

            <SearchBar
              search={search}
              setSearch={setSearch}
              searchResults={searchResults}
            />
          </nav>
        </div>
        <div className="padding-x clip-path -mt-2 h-5 w-1/3 border-b-4 border-red-500 bg-red-700 py-2 dark:border-red-600 dark:bg-red-800 lg:w-1/4"></div>
      </header>
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
