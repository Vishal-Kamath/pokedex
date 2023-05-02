'use client';

import { cn } from '@/utils/lib';
import { cva, VariantProps } from 'class-variance-authority';
import Image from 'next/image';
import React, { useState } from 'react';
import { FaStar, FaRegStar } from 'react-icons/fa';

export const imageVariants = cva(
  'relative aspect-square w-full rounded-lg p-2 lg:w-[20rem] lg:h-[20rem] bg-opacity-75 border-2',
  {
    variants: {
      color: {
        default:
          'bg-sky-400 dark:bg-sky-800 border-sky-800 dark:border-sky-500',
        black: 'bg-black border-black',
        blue: 'bg-blue-600 dark:bg-blue-800 border-blue-800 dark:border-blue-500',
        brown:
          'bg-orange-800 dark:bg-orange-900 border-orange-800 dark:border-orange-500',
        gray: 'bg-gray-600 dark:bg-gray-800 border-gray-800 dark:border-gray-500',
        green:
          'bg-green-600 dark:bg-green-800 border-green-800 dark:border-green-500',
        pink: 'bg-pink-600 dark:bg-pink-800 border-pink-800 dark:border-pink-500',
        purple:
          'bg-purple-600 dark:bg-purple-800 border-purple-800 dark:border-purple-500',
        red: 'bg-red-600 dark:bg-red-800 border-red-800 dark:border-red-500',
        white: 'bg-white border-gray-300',
        yellow:
          'bg-yellow-600 dark:bg-yellow-800 border-yellow-800 dark:border-yellow-500',
      },
    },
    defaultVariants: {
      color: 'default',
    },
  }
);

interface ImageProps extends VariantProps<typeof imageVariants> {
  name: string;
  id: number;
}

const PokemonImage: React.FC<ImageProps> = ({ color, id, name }) => {
  const [shiny, setShiny] = useState(false);
  return (
    <div className={cn(imageVariants({ color }))}>
      <button
        className="absolute left-3 top-3 grid h-8 w-8 place-content-center rounded-md bg-white text-lg text-yellow-300"
        onClick={() => setShiny(!shiny)}
      >
        {!shiny ? (
          <FaRegStar title="click to see shiny pokemon" />
        ) : (
          <FaStar title="click to see normal pokemon" />
        )}
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
