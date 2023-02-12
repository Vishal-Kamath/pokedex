import { PokemonType } from '@/models/pokemon';
import React from 'react';

const PokemonTag: React.FC<{
  type: PokemonType;
}> = ({ type }) => {
  if (type === 'normal') {
    return (
      <div className="grid h-8 place-content-center rounded-full bg-stone-400 px-3 text-sm text-white">
        {type}
      </div>
    );
  }
  if (type === 'fighting') {
    return (
      <div className="grid h-8 place-content-center rounded-full bg-orange-700 px-3 text-sm text-orange-200">
        {type}
      </div>
    );
  }
  if (type === 'flying') {
    return (
      <div className="grid h-8 place-content-center rounded-full bg-sky-700 px-3 text-sm text-white">
        {type}
      </div>
    );
  }
  if (type === 'poison') {
    return (
      <div className="grid h-8 place-content-center rounded-full bg-violet-800 px-3 text-sm text-violet-200">
        {type}
      </div>
    );
  }
  if (type === 'ground') {
    return (
      <div className="grid h-8 place-content-center rounded-full bg-yellow-800 px-3 text-sm text-orange-200">
        {type}
      </div>
    );
  }
  if (type === 'rock') {
    return (
      <div className="grid h-8 place-content-center rounded-full bg-red-900 px-3 text-sm text-orange-200">
        {type}
      </div>
    );
  }
  if (type === 'bug') {
    return (
      <div className="grid h-8 place-content-center rounded-full bg-lime-900 px-3 text-sm text-green-400">
        {type}
      </div>
    );
  }

  if (type === 'ghost') {
    return (
      <div className="grid h-8 place-content-center rounded-full bg-indigo-900 px-3 text-sm text-violet-400">
        {type}
      </div>
    );
  }
  if (type === 'steel') {
    return (
      <div className="grid h-8 place-content-center rounded-full bg-zinc-500 px-3 text-sm text-zinc-200">
        {type}
      </div>
    );
  }
  if (type === 'fire') {
    return (
      <div className="grid h-8 place-content-center rounded-full bg-red-700 px-3 text-sm text-red-100">
        {type}
      </div>
    );
  }
  if (type === 'water') {
    return (
      <div className="grid h-8 place-content-center rounded-full bg-sky-400 px-3 text-sm text-white">
        {type}
      </div>
    );
  }
  if (type === 'grass') {
    return (
      <div className="grid h-8 place-content-center rounded-full bg-green-600 px-3 text-sm text-green-200">
        {type}
      </div>
    );
  }
  if (type === 'electric') {
    return (
      <div className="grid h-8 place-content-center rounded-full bg-yellow-400 px-3 text-sm text-black">
        {type}
      </div>
    );
  }

  if (type === 'psychic') {
    return (
      <div className="grid h-8 place-content-center rounded-full bg-pink-700 px-3 text-sm text-pink-200">
        {type}
      </div>
    );
  }

  if (type === 'ice') {
    return (
      <div className="grid h-8 place-content-center rounded-full bg-blue-300 px-3 text-sm text-white">
        {type}
      </div>
    );
  }
  if (type === 'dragon') {
    return (
      <div className="grid h-8 place-content-center rounded-full bg-blue-700 px-3 text-sm text-white">
        {type}
      </div>
    );
  }

  if (type === 'dark') {
    return (
      <div className="grid h-8 place-content-center rounded-full bg-black px-3 text-sm text-slate-400">
        {type}
      </div>
    );
  }

  if (type === 'fairy') {
    return (
      <div className="grid h-8 place-content-center rounded-full bg-pink-400 px-3 text-sm text-white">
        {type}
      </div>
    );
  }
  if (type === 'unknown') {
    return (
      <div className="grid h-8 place-content-center rounded-full bg-slate-400 px-3 text-sm text-white">
        {type}
      </div>
    );
  }

  if (type === 'shadow') {
    return (
      <div className="grid h-8 place-content-center rounded-full bg-purple-900 px-3 text-sm text-red-500">
        {type}
      </div>
    );
  }

  return (
    <div className="grid h-8 place-content-center rounded-full bg-slate-400 px-3 text-sm text-white">
      {type}
    </div>
  );
};

export default PokemonTag;
