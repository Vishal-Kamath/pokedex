import { ItemHolderPokemon } from 'pokenode-ts';
import { FC } from 'react';
import ListCard from '../cards/listCard';

interface Props {
  heldByPokemons: ItemHolderPokemon[];
}

const HeldByPokemon: FC<Props> = ({ heldByPokemons }) => {
  return heldByPokemons.length === 0 ? null : (
    <div className="flex flex-col gap-1">
      <h2 className="text-2xl">heldByPokemons held by pokemon</h2>
      <div className="grid grid-cols-1 gap-2 rounded-md border-2 border-slate-100 bg-slate-50 bg-opacity-40 p-3 dark:border-slate-900 dark:bg-slate-800 dark:bg-opacity-40 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {heldByPokemons.map((pokemon) => {
          const id = pokemon.pokemon.url.split('/')[6];
          return (
            <ListCard
              key={'held by pokemon' + ':' + id}
              id={id}
              name={pokemon.pokemon.name}
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`}
              imageVariant={'items'}
            />
          );
        })}
      </div>
    </div>
  );
};

export default HeldByPokemon;
