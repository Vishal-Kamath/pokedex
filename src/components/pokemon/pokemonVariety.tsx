import Image from 'next/image';
import Link from 'next/link';
import { PokemonSpeciesVariety } from 'pokenode-ts';
import React from 'react';

const PokemonVariety: React.FC<{
  name: string;
  varieties: PokemonSpeciesVariety[];
}> = ({ name, varieties }) => {
  return varieties.length === 1 ? null : (
    <div>
      <h2 className="mb-1 text-2xl">Varities</h2>
      <div className="flex flex-col items-center justify-evenly rounded-md bg-slate-100 py-3 dark:bg-slate-800 lg:flex-row">
        {varieties.map((varity) => {
          const id = varity.pokemon.url.split('/')[6];
          return name === varity.pokemon.name ? (
            <Image
              key={varity.pokemon.name}
              title={varity.pokemon.name}
              alt={varity.pokemon.name}
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`}
              className="aspect-square w-full md:w-[10rem]"
              loading="lazy"
              width="500"
              height="500"
            />
          ) : (
            <Link
              key={varity.pokemon.name}
              href={`/pokemon/${varity.pokemon.name}`}
              className="aspect-square w-full md:w-[10rem]"
            >
              <Image
                title={varity.pokemon.name}
                alt={varity.pokemon.name}
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
  );
};

export default PokemonVariety;
