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
        .filter((pokemon) => pokemon.name.startsWith(search))
        .map((pokemon) => pokemon.name);
      setSearchResults(results.splice(0, 20));
    }
    getPokemon();
  }, [search]);
  return (
    <div className="bg-white dark:bg-slate-900 text-black dark:text-white min-h-screen flex flex-col">
      <header className="fixed top-0 w-full z-50">
        <div className="w-full padding-x h-14 bg-red-700 dark:bg-red-800 border-b-4 border-red-500 dark:border-red-600">
          <nav className="max-w-6xl m-auto flex  justify-between items-center h-full">
            <Link href="/">
              <Image className="w-32 mt-2" src={PokéDex} alt="PokéDex Logo" />
            </Link>

            <SearchBar
              search={search}
              setSearch={setSearch}
              searchResults={searchResults}
            />
          </nav>
        </div>
        <div className="border-b-4 border-red-500 dark:border-red-600 padding-x py-2 h-5 w-1/3 lg:w-1/4 clip-path bg-red-700 dark:bg-red-800 -mt-2"></div>
      </header>
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
