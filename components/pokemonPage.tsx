import React from 'react';
import Head from 'next/head';
import { Pokemon } from '@/pages';
import PokemonList from './pokemonList';

type PokePageProps = {
  pokemons: Pokemon['results'];
};

const PokemonPage: React.FC<PokePageProps> = ({ pokemons }) => {
  return (
    <>
      <Head>
        <title>PokéDex</title>
        <meta name="description" content="PokéDex" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="pt-16 pb-8">
        <main className="mt-4 min-h-full padding-x">
          <PokemonList pokemons={pokemons} />
        </main>
      </main>
    </>
  );
};

export default PokemonPage;
