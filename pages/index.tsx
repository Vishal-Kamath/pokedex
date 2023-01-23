import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import PokéDex from '@/assets/PokéDex.png';
import Image from 'next/image';
import PokemonList from '@/components/PokemonList';
import { GetStaticProps } from 'next';
import axios, { Canceler } from 'axios';
import SearchBar from '@/components/search';
import Footer from '@/components/footer';

type Pokemon = {
  count: number;
  next: string;
  previous: string;
  results: {
    name: string;
    url: string;
  }[];
};

type HomeProps = {
  pokemonsData: Pokemon[];
};

export default function Home() {
  const [pokemons, setPokemons] = useState<Pokemon['results']>([]);
  const [currentPageUrl, setCurrentPageUrl] = useState(
    'https://pokeapi.co/api/v2/pokemon'
  );
  const [nextPageUrl, setNextPageUrl] = useState('');
  const [previousPageUrl, setPreviousPageUrl] = useState('');

  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState<string[]>([]);

  useEffect(() => {
    async function getPokemon() {
      const res = await axios.get<Pokemon>(currentPageUrl);
      setNextPageUrl(res.data.next);
      setPreviousPageUrl(res.data.previous);
      setPokemons(res.data.results);
    }
    getPokemon();
  }, [currentPageUrl]);

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

  function goToNextPage() {
    setCurrentPageUrl(nextPageUrl);
  }

  function goToPrevPage() {
    setCurrentPageUrl(previousPageUrl);
  }

  return (
    <div className="bg-blue-300 dark:bg-slate-900 text-black dark:text-white min-h-screen">
      <Head>
        <title>PokéDex</title>
        <meta name="description" content="PokéDex" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="pt-16 pb-8">
        <header className="fixed top-0 w-full">
          <div className="w-full padding-x h-14 bg-slate-800 border-b-4 border-slate-500 ">
            <nav className="max-w-6xl m-auto flex  justify-between items-center h-full">
              <h1>
                <Image className="w-32" src={PokéDex} alt="PokéDex Logo" />
              </h1>

              <SearchBar
                search={search}
                setSearch={setSearch}
                searchResults={searchResults}
              />
            </nav>
          </div>
          <div className="border-b-4 border-slate-500 padding-x py-2 h-5 w-1/3 lg:w-1/4 clip-path bg-slate-800 -mt-2"></div>
        </header>

        <main className="mt-4 min-h-full padding-x">
          <PokemonList
            pokemons={pokemons}
            prev={previousPageUrl === null ? false : true}
            goToNextPage={goToNextPage}
            goToPrevPage={goToPrevPage}
          />
        </main>
      </main>
      <Footer />
    </div>
  );
}

// export const getStaticProps: GetStaticProps = async () => {
//   try {
//     const res = await axios.get('https://pokeapi.co/api/v2/pokemon');
//     const data = await res.data;
//     if (!data) {
//       return {
//         notFound: true,
//       };
//     }
//     return {
//       props: {
//         pokemonsData: data,
//       },
//     };
//   } catch (err) {
//     return {
//       notFound: true,
//     };
//   }
// };
