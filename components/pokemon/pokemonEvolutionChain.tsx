import { PokemonEvolutionChain } from '@/models/pokemon';
import Image from 'next/image';
import React from 'react';

const PokemonDisplayEvolutionChain: React.FC<{
  evolution_chain: PokemonEvolutionChain;
}> = ({ evolution_chain }) => {
  const levelsArray: JSX.Element[][] = [];
  let chainEnd = false;
  let depth = 0;
  while (!chainEnd) {
    const tempArray = evolution_chain
      .filter((pokemon) => pokemon.depth === depth)
      .map((pokemon) => (
        <div>
          <Image
            alt={pokemon.name}
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`}
            className="aspect-square w-full"
            loading="lazy"
            width="500"
            height="500"
          />
        </div>
      ));
    levelsArray.push(tempArray);
  }
  return (
    <div>
      {levelsArray.map((level) => (
        <div>{...level}</div>
      ))}
    </div>
  );
};

export default PokemonDisplayEvolutionChain;
