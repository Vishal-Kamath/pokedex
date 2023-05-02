import { getPokemonData } from '@/utils/api';
import { VariantProps } from 'class-variance-authority';
import React from 'react';
import PokemonTag, { tagVariants } from './pokemonTag';

type Props = Awaited<ReturnType<typeof getPokemonData>>['pokemonDetails'];

const PokemonDetails: React.FC<Props> = ({ ...pokemonDetails }) => {
  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-2 flex gap-2 border-b-4 border-black pb-2 text-2xl font-bold dark:border-white">
        <i className="text-slate-500">#{pokemonDetails.id}</i>
        <span className="capitalize">{pokemonDetails.name}</span>
        <div className="flex gap-1">
          {pokemonDetails.types.map((type) => {
            const background = type.type.name as VariantProps<
              typeof tagVariants
            >['background'];
            return (
              <PokemonTag
                key={type.type.name}
                type={type.type.name}
                background={background}
              />
            );
          })}
        </div>
      </div>

      {/* Details */}
      <div className="flex flex-col gap-5">
        <table className="w-full border-none">
          <tbody>
            <tr>
              <td>height:</td>
              <td>{pokemonDetails.height / 10}m</td>
            </tr>
            <tr>
              <td>weight:</td>
              <td>{pokemonDetails.weight / 10}kg</td>
            </tr>
            <tr>
              <td>base experience:</td>
              <td>{pokemonDetails.base_experience}</td>
            </tr>
          </tbody>
        </table>

        <div>
          <h2 className="text-xl">Stats</h2>
          <table className="w-full border-collapse text-center">
            <thead>
              <tr>
                <td className="border-2 border-sky-700 bg-sky-300 dark:border-sky-300 dark:bg-sky-800">
                  name
                </td>
                <td className="border-2 border-sky-700 bg-sky-300 dark:border-sky-300 dark:bg-sky-800">
                  base stat
                </td>
                <td className="border-2 border-sky-700 bg-sky-300 dark:border-sky-300 dark:bg-sky-800">
                  effort
                </td>
              </tr>
            </thead>
            <tbody>
              {pokemonDetails.stats.map((stat) => (
                <tr key={stat.stat.name}>
                  <td className="border-2 border-slate-400 dark:border-slate-700">
                    {stat.stat.name}
                  </td>
                  <td className="border-2 border-slate-400 dark:border-slate-700">
                    {stat.base_stat}
                  </td>
                  <td className="border-2 border-slate-400 dark:border-slate-700">
                    {stat.effort}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PokemonDetails;
