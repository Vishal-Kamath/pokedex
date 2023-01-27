import { Pokemon } from '@/pages';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

const PokemonList: React.FC<{
  pokemons: Pokemon['results'];
}> = ({ pokemons }) => {
  const router = useRouter();
  const pageNo = Number(router.query.pokemonPage) || 0;
  return (
    <div className="max-w-6xl m-auto">
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
        {pokemons.map((pokemon) => (
          <Link
            href={`pokemon/${pokemon.name}`}
            className="hover:bg-red-300 dark:hover:bg-red-900 rounded-2xl"
            key={pokemon.name}
          >
            <h1 className="text-2xl my-2 text-center">{pokemon.name}</h1>
            <div className="aspect-square">
              <img
                className="border-4 border-red-600 dark:border-red-700 border-solid rounded-2xl w-full h-full"
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${
                  pokemon.url.split('/')[6]
                }.png`}
                alt={pokemon.name}
              />
            </div>
          </Link>
        ))}
      </section>
      <section className="flex justify-between mt-4">
        {pageNo !== 0 ? (
          <Link
            className="text-xl py-2 px-4 bg-red-500 hover:bg-red-600 dark:bg-red-800 rounded-xl dark:hover:bg-red-700"
            href={pageNo - 1 !== 0 ? `/${pageNo - 1}` : '/'}
          >
            ← Prev
          </Link>
        ) : null}
        <Link
          className="text-xl py-2 px-4 bg-red-500 hover:bg-red-600 dark:bg-red-800 rounded-xl dark:hover:bg-red-700"
          href={`/${pageNo + 1}`}
        >
          Next →
        </Link>
      </section>
    </div>
  );
};

export default PokemonList;
