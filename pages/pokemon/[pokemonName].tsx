import { Pokemon } from '@/models/pokemon';
import axios from 'axios';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import React, { useState } from 'react';
import { FaStar, FaRegStar } from 'react-icons/fa';

const PokemonPage: React.FC<{
  pokemon: Pokemon;
}> = ({ pokemon }) => {
  const [shiny, setShiny] = useState(false);
  return (
    <>
      <Head>
        <title>PokéDex - {pokemon.name}</title>
      </Head>
      <div className="padding-x w-full">
        {/* pokemon image */}
        <div className="flex w-full flex-col gap-4 md:flex-row">
          <div className="dark:bg-sky-800 relative aspect-square w-full rounded-3xl bg-sky-400 md:w-full lg:w-5/12">
            <button
              className="absolute top-3 left-3 grid h-8 w-8 place-content-center rounded-full bg-white text-lg text-yellow-300"
              onClick={() => setShiny(!shiny)}
            >
              {!shiny ? <FaRegStar /> : <FaStar />}
            </button>
            {!shiny ? (
              <Image
                alt={pokemon.name}
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`}
                className="aspect-square w-full"
                loading="lazy"
                width="500"
                height="500"
              />
            ) : (
              <Image
                alt={pokemon.name}
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/${pokemon.id}.png
                `}
                className="aspect-square w-full"
                loading="lazy"
                width="500"
                height="500"
              />
            )}
          </div>

          {/* pokemon details */}
          <div className="w-full">
            <div className="dark:border-white mb-2 flex justify-between border-b-4 border-black pb-2 text-2xl font-bold">
              <h1 className="flex items-center gap-2">
                {pokemon.name}
                <div className="flex gap-1 text-xs">
                  {pokemon.types.map((type) => (
                    <div className="dark:bg-sky-800 h-5 rounded-full bg-sky-400 px-2">
                      {type.type.name}
                    </div>
                  ))}
                </div>
              </h1>
              <i className="text-slate-500">#{pokemon.id}</i>
            </div>
            <div>
              <table className="w-full border-none">
                <tbody>
                  <tr>
                    <td>height:</td>
                    <td>{pokemon.height / 10}m</td>
                  </tr>
                  <tr>
                    <td>weight:</td>
                    <td>{pokemon.weight / 10}kg</td>
                  </tr>
                  <tr>
                    <td>base experience:</td>
                    <td>{pokemon.base_experience}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="mt-10">
          <h2 className="mb-3 text-2xl">Stats</h2>
          <table className="w-full border-separate text-center">
            <thead>
              <tr>
                <td className="dark:border-sky-300 dark:bg-sky-800 rounded-md border-2 border-sky-800 bg-sky-300">
                  name
                </td>
                <td className="dark:border-sky-300 dark:bg-sky-800 rounded-md border-2 border-sky-800 bg-sky-300">
                  base stat
                </td>
                <td className="dark:border-sky-300 dark:bg-sky-800 rounded-md border-2 border-sky-800 bg-sky-300">
                  effort
                </td>
              </tr>
            </thead>
            <tbody>
              {pokemon.stats.map((stat) => (
                <tr key={stat.stat.name}>
                  <td className="dark:border-slate-700 rounded-md border-2 border-sky-500">
                    {stat.stat.name}
                  </td>
                  <td className="dark:border-slate-700 rounded-md border-2 border-sky-500">
                    {stat.base_stat}
                  </td>
                  <td className="dark:border-slate-700 rounded-md border-2 border-sky-500">
                    {stat.effort}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default PokemonPage;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  try {
    const name = params?.pokemonName || undefined;
    const pokemonResponse = await axios<Pokemon>(
      `https://pokeapi.co/api/v2/pokemon/${name}`
    );
    const pokemon = pokemonResponse.data;

    // const speciesResponse = await axios(
    //   `https://pokeapi.co/api/v2/pokemon-species/${pokemon.id}/`
    // );
    // const evolutionurl = speciesResponse.data.evolution_chain.url;

    return {
      props: {
        pokemon: {
          id: pokemon.id,
          name: pokemon.name,
          base_experience: pokemon.base_experience,
          height: pokemon.height,
          weight: pokemon.weight,
          stats: pokemon.stats,
          types: pokemon.types,
        },
      },
    };
  } catch (err) {
    console.log(err);
    return {
      notFound: true,
    };
  }
};
