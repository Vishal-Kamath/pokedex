import { cn } from '@/utils/lib';
import { VariantProps, cva } from 'class-variance-authority';
import React from 'react';

export const tagVariants = cva(
  'h-8 grid place-content-center rounded-md px-3 text-sm',
  {
    variants: {
      background: {
        default: 'bg-slate-400 text-white',
        normal: 'bg-stone-400 text-white',
        fighting: 'bg-orange-700 text-orange-200',
        flying: 'bg-sky-700 text-white',
        poison: 'bg-violet-800 text-violet-200',
        ground: 'bg-yellow-800 text-orange-200',
        rock: 'bg-red-900 text-orange-200',
        bug: 'bg-lime-900 text-green-400',
        ghost: 'bg-indigo-900 text-violet-400',
        steel: 'bg-zinc-500 text-zinc-200',
        fire: 'bg-red-700 text-red-100',
        water: 'bg-sky-400 text-white',
        grass: 'bg-green-600 text-green-200',
        electric: 'bg-yellow-400 text-black',
        psychic: 'bg-pink-700 text-pink-200',
        ice: 'bg-blue-300 text-white',
        dragon: 'bg-blue-700 text-white',
        dark: 'bg-black text-slate-400',
        fairy: 'bg-pink-400 text-white',
        unknown: 'bg-slate-400 text-white',
        shadow: 'bg-purple-900 text-red-500',
      },
    },
    defaultVariants: {
      background: 'default',
    },
  }
);

interface PokemonTagProps extends VariantProps<typeof tagVariants> {
  type: string;
}

const PokemonTag: React.FC<PokemonTagProps> = ({ type, background }) => {
  return <div className={cn(tagVariants({ background }))}>{type}</div>;
};

export default PokemonTag;
