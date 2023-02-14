import React, { useState } from 'react';
import Image from 'next/image';
import { FaStar, FaRegStar } from 'react-icons/fa';
import { PokemonColor } from '@/models/pokemon';

const PokemonImage: React.FC<{
  name: string;
  id: number;
  color: PokemonColor;
}> = ({ name, id, color }) => {
  const [shiny, setShiny] = useState(false);
  return (
    <div
      className={`relative z-0 aspect-square w-full rounded-3xl md:w-full lg:w-5/12 ${
        color === 'black'
          ? 'bg-black'
          : color === 'blue'
          ? 'bg-blue-600 dark:bg-blue-800'
          : color === 'brown'
          ? 'bg-orange-800 dark:bg-orange-900'
          : color === 'gray'
          ? 'bg-gray-600 dark:bg-gray-800'
          : color === 'green'
          ? 'bg-green-600 dark:bg-green-800'
          : color === 'pink'
          ? 'bg-pink-600 dark:bg-pink-800'
          : color === 'purple'
          ? 'bg-purple-600 dark:bg-purple-800'
          : color === 'red'
          ? 'bg-red-600 dark:bg-red-800'
          : color === 'white'
          ? 'bg-white'
          : color === 'yellow'
          ? 'bg-yellow-600 dark:bg-yellow-800'
          : 'bg-sky-400 dark:bg-sky-800'
      }`}
    >
      <button
        className="absolute top-3 left-3 grid h-8 w-8 place-content-center rounded-full bg-white text-lg text-yellow-300"
        onClick={() => setShiny(!shiny)}
      >
        {!shiny ? <FaRegStar /> : <FaStar />}
      </button>
      {!shiny ? (
        <Image
          alt={name}
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`}
          className="aspect-square w-full"
          loading="lazy"
          width="500"
          height="500"
        />
      ) : (
        <Image
          alt={name}
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/${id}.png`}
          className="aspect-square w-full"
          loading="lazy"
          width="500"
          height="500"
        />
      )}
    </div>
  );
};

export default PokemonImage;
