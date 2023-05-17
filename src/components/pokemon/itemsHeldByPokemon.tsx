import { PokemonHeldItem } from 'pokenode-ts';
import React from 'react';
import ListCard from '../cards/listCard';

const ItemsHeldByPokemon: React.FC<{ items: PokemonHeldItem[] }> = ({
  items,
}) => {
  return items.length === 0 ? null : (
    <div className="flex flex-col gap-1">
      <h2 className="text-2xl">Items held by pokemon</h2>
      <div className="grid grid-cols-1 gap-2 rounded-md border-2 border-slate-100 bg-slate-50 bg-opacity-40 p-3 dark:border-slate-900 dark:bg-slate-800 dark:bg-opacity-40 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {items.map((item) => {
          const id = item.item.url.split('/')[6];
          return (
            <ListCard
              key={id}
              id={id}
              name={item.item.name}
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/${item.item.name}.png`}
              imageVariant={'items'}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ItemsHeldByPokemon;
