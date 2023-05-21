import { PokemonSpeciesVariety } from 'pokenode-ts';
import { FC } from 'react';
import ListCard from '@/components/cards/listCard';

const PokemonVariety: FC<{
  varieties: PokemonSpeciesVariety[];
}> = ({ varieties }) => {
  return varieties.length === 1 ? null : (
    <div>
      <h2 className="mb-1 text-2xl">Varities</h2>
      <div className="grid grid-cols-1 gap-2 rounded-md border-2 border-slate-100 bg-slate-50 bg-opacity-40 p-3 dark:border-slate-900 dark:bg-slate-800 dark:bg-opacity-40 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {varieties.map((varity) => {
          const id = varity.pokemon.url.split('/')[6];
          return (
            <ListCard
              key={`varity:${id}`}
              id={id}
              name={varity.pokemon.name}
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`}
              imageVariant={'pokemon'}
            />
          );
        })}
      </div>
    </div>
  );
};

export default PokemonVariety;
