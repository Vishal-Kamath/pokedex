import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { ItemFetch } from '@/models/items';

const HeldByPokemon: React.FC<{
  held_by_pokemon: ItemFetch['held_by_pokemon'];
}> = ({ held_by_pokemon }) => {
  return (
    <>
      {held_by_pokemon.length !== 0 && (
        <div>
          <h2 className="mb-3 text-2xl">Held by pokemon</h2>
          <div className="flex flex-wrap items-center justify-evenly rounded-md bg-slate-100 py-3 dark:bg-slate-800">
            {held_by_pokemon.map((pokemon) => {
              const id = pokemon.pokemon.url.split('/')[6];
              return (
                <Link
                  key={pokemon.pokemon.name}
                  href={`/pokemon/${pokemon.pokemon.name}`}
                >
                  <Image
                    title={pokemon.pokemon.name}
                    alt={pokemon.pokemon.name}
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`}
                    className="aspect-square w-full md:w-[10rem]"
                    loading="lazy"
                    width="500"
                    height="500"
                  />
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default HeldByPokemon;
