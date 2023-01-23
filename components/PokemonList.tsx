import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

type Pokemon = {
  name: string;
  url: string;
}[];

const PokemonList: React.FC<{
  pokemons: Pokemon;
  prev: boolean;
  goToNextPage: VoidFunction;
  goToPrevPage: VoidFunction;
}> = ({ pokemons, prev, goToNextPage, goToPrevPage }) => {
  return (
    <div className="max-w-6xl m-auto">
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
        {pokemons.map((pokemon) => (
          <Link
            href={`pokemon/${pokemon.name}`}
            className="hover:bg-slate-800 rounded-2xl"
            key={pokemon.name}
          >
            <h1 className="text-2xl my-2 text-center">{pokemon.name}</h1>
            <div className="aspect-square">
              <img
                className="border-4 border-slate-600 border-solid rounded-2xl w-full h-full"
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
        {prev ? (
          <button
            className="text-xl py-2 px-4 bg-slate-700 rounded-xl hover:bg-blue-900"
            onClick={goToPrevPage}
          >
            ← Prev
          </button>
        ) : null}
        <button
          className="text-xl py-2 px-4 bg-slate-700 rounded-xl hover:bg-blue-900"
          onClick={goToNextPage}
        >
          Next →
        </button>
      </section>
    </div>
  );
};

export default PokemonList;
