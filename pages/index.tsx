import PaginationButton from '@/components/pagination';
import { PokemonList } from '@/models/pokemon';
import { GetServerSideProps, NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import axios from 'axios';
import Head from 'next/head';

const Home: NextPage<{ pokemonList: PokemonList }> = ({ pokemonList }) => {
  return (
    <>
      <Head>
        <title>PokéDex</title>
      </Head>
      <div className="isolate z-10 ml-auto mb-10 w-full md:w-1/2  lg:w-3/4">
        <div className="grid grid-cols-1 gap-2 lg:grid-cols-2 xl:grid-cols-3">
          {pokemonList.results.map((pokemon) => {
            const id = pokemon.url.split('/')[6];
            return (
              <Link
                href={`/pokemon/${pokemon.name}`}
                key={pokemon.name}
                className="rounded-xl border-4 border-sky-200 hover:border-sky-300 hover:bg-sky-100 dark:border-slate-800 dark:hover:border-sky-700 dark:hover:bg-sky-900"
              >
                <div className="pt-2 text-center text-2xl font-semibold">
                  #{id} {pokemon.name}
                </div>
                <Image
                  alt={pokemon.name}
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`}
                  className="aspect-square w-full"
                  loading="lazy"
                  width="500"
                  height="500"
                />
              </Link>
            );
          })}
        </div>
        <PaginationButton />
      </div>
    </>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const pageNo = Number(query.pageNo) | 0;

  const response = await axios(
    `https://pokeapi.co/api/v2/pokemon?limit=18&offset=${18 * pageNo}`
  );
  const data = response.data;

  return {
    props: {
      pokemonList: data,
    },
  };
};
