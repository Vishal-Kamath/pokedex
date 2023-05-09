'use client';

import { cn } from '@/utils/lib';
import { cva, VariantProps } from 'class-variance-authority';
import Image from 'next/image';
import { PokemonSprites } from 'pokenode-ts';
import React, { useState } from 'react';
import { FaStar, FaRegStar } from 'react-icons/fa';
import { AiOutlineGif } from 'react-icons/ai';

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
  sprites: PokemonSprites;
  id: number;
}

const PokemonImage: React.FC<ImageProps> = ({ color, sprites, name, id }) => {
  const [shiny, setShiny] = useState(false);
  const [animated, setAnimated] = useState(false);

  const src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
  const shinySrc = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/${id}.png`;

  const animatedSrc =
    sprites.versions['generation-v']['black-white'].animated.front_default ||
    src;
  const animatedShinySrc =
    sprites.versions['generation-v']['black-white'].animated.front_shiny ||
    shinySrc;

  return (
    <div className={cn(imageVariants({ color }))}>
      <button
        className="absolute left-3 top-3 grid h-8 w-8 place-content-center rounded-md bg-white text-lg text-yellow-300"
        onClick={() => setShiny(!shiny)}
      >
        {!shiny ? (
          <FaRegStar title="Click to see shiny pokemon" />
        ) : (
          <FaStar title="Click to see normal pokemon" />
        )}
      </button>
      {sprites.versions['generation-v']['black-white'].animated
        .front_default && (
        <button
          className="absolute left-[3.25rem] top-3 grid h-8 w-8 place-content-center rounded-md bg-white text-lg"
          onClick={() => setAnimated(!animated)}
        >
          <AiOutlineGif
            className={animated ? 'text-sky-400' : 'text-gray-400'}
            title={animated ? 'Show original image' : 'Show animated gif'}
          />
        </button>
      )}
      {!shiny ? (
        <Image
          alt={name}
          src={animated ? animatedSrc : src}
          className={`${animated && 'pixel-image'} aspect-square w-full`}
          loading="lazy"
          width="500"
          height="500"
        />
      ) : (
        <Image
          alt={name}
          src={animated ? animatedShinySrc : shinySrc}
          className={`${animated && 'pixel-image'} aspect-square w-full`}
          loading="lazy"
          width="500"
          height="500"
        />
      )}
    </div>
  );
};

export default PokemonImage;
