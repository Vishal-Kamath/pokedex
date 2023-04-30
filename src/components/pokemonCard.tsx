import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const PokemonCard: React.FC<{ id: string; name: string }> = ({ id, name }) => {
  return (
    <Link
      href={`/pokemon/${name}`}
      key={name}
      className="group w-full rounded-md border-2 border-slate-200 bg-slate-100 bg-opacity-40 p-2 hover:border-slate-300 hover:bg-opacity-75 dark:border-slate-800 dark:bg-slate-900 dark:bg-opacity-40 dark:hover:border-slate-600 dark:hover:bg-opacity-75"
    >
      <Image
        alt={name}
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`}
        className="aspect-square w-full rounded-md bg-opacity-20 group-hover:bg-sky-200 dark:group-hover:bg-sky-900"
        loading="lazy"
        width="600"
        height="600"
      />
      <div className="flex justify-center gap-1 py-2 font-semibold">
        <span className="text-gray-500">#{id}</span>
        <span className="capitalize">{name}</span>
      </div>
    </Link>
  );
};

export default PokemonCard;
