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
    <div className="m-auto max-w-6xl">
      <section className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {pokemons.map((pokemon) => (
          <Link
            href={`pokemon/${pokemon.name}`}
            className="rounded-2xl hover:bg-sky-300 dark:hover:bg-sky-900"
            key={pokemon.name}
          >
            <h1 className="my-2 text-center text-2xl">{pokemon.name}</h1>
            <div className="aspect-square">
              <img
                className="h-full w-full rounded-2xl border-4 border-solid border-sky-600 dark:border-sky-700"
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${
                  pokemon.url.split('/')[6]
                }.png`}
                alt={pokemon.name}
              />
            </div>
          </Link>
        ))}
      </section>
      <section className="mt-4 flex justify-between">
        {pageNo !== 0 ? (
          <Link
            className="rounded-xl bg-red-500 py-2 px-4 text-xl hover:bg-red-600 dark:bg-red-800 dark:hover:bg-red-700"
            href={pageNo - 1 !== 0 ? `/${pageNo - 1}` : '/'}
          >
            ← Prev
          </Link>
        ) : null}
        <Link
          className="rounded-xl bg-red-500 py-2 px-4 text-xl hover:bg-red-600 dark:bg-red-800 dark:hover:bg-red-700"
          href={`/${pageNo + 1}`}
        >
          Next →
        </Link>
      </section>
    </div>
  );
};

export default PokemonList;
