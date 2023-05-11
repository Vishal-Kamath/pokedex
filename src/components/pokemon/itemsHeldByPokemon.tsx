import Image from 'next/image';
import Link from 'next/link';
import { PokemonHeldItem } from 'pokenode-ts';
import React from 'react';

const ItemsHeldByPokemon: React.FC<{ items: PokemonHeldItem[] }> = ({
  items,
}) => {
  return items.length === 0 ? null : (
    <div className="flex flex-col gap-1">
      <h2 className="text-2xl">Items held by pokemon</h2>
      <div className="flex flex-col items-center justify-evenly rounded-md bg-slate-100 py-3 dark:bg-slate-800 lg:flex-row">
        {items.map((item) => (
          <Link key={item.item.name} href={`/items/${item.item.name}`}>
            <Image
              title={item.item.name}
              alt={item.item.name}
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/${item.item.name}.png`}
              className="pixel-image  aspect-square w-full md:w-[10rem]"
              loading="lazy"
              width="500"
              height="500"
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ItemsHeldByPokemon;
