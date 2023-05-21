import { VariantProps } from 'class-variance-authority';
import { FC } from 'react';
import PokemonTag, { tagVariants } from './pokemonTag';
import { FlavorText, Pokemon } from 'pokenode-ts';
import { StatsBadge } from '@/components/common/statsBadge';

type Props = {
  pokemonDetails: Pokemon;
  description: FlavorText[];
};

const PokemonDetails: FC<Props> = ({ pokemonDetails, description }) => {
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
      <div className="flex flex-col gap-3">
        <div className="font-semibold text-gray-500">
          {description
            .filter((desc) => desc.language.name === 'en')
            .slice(0, 1)
            .map((entry) => {
              const formatedText = entry.flavor_text.replace(
                /[^a-zA-Zé ]/g, // remove invisible characters
                ' '
              );
              return <div key={formatedText}>{formatedText}</div>;
            })}
        </div>

        <div className="flex flex-col gap-1">
          <h2 className="text-xl">Details</h2>
          <div className="flex flex-wrap gap-2">
            <StatsBadge
              className="bg-emerald-200"
              name="species"
              value={pokemonDetails.species.name}
            />
            <StatsBadge
              className="bg-blue-200"
              name="height"
              value={`${pokemonDetails.height / 10}m`}
            />
            <StatsBadge
              className="bg-amber-200"
              name="weight"
              value={`${pokemonDetails.weight / 10}kg`}
            />
            <StatsBadge
              className="bg-violet-200"
              name="base experience"
              value={`${pokemonDetails.base_experience}`}
            />
          </div>
        </div>

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
