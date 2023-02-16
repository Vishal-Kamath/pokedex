import PokemonImage from '@/components/pokemon/pokemonImage';
import PokemonTag from '@/components/pokemon/pokemonTypeTag';
import {
  Pokemon,
  PokemonFetch,
  PokemonSpeciesFetch,
  PokemonEvolutionChain,
  evolves_to,
} from '@/models/pokemon';
import axios from 'axios';
import { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const PokemonPage: NextPage<{
  pokemon: Pokemon;
}> = ({ pokemon }) => {
  return (
    <>
      <Head>
        <title>{`PokéDex - ${pokemon.name}`}</title>
      </Head>
      <div className="ml-auto flex w-full flex-col gap-5 md:w-1/2 lg:w-3/4">
        <div className="flex w-full flex-col gap-4 lg:flex-row">
          {/* pokemon image */}
          <PokemonImage
            name={pokemon.name}
            id={pokemon.id}
            color={pokemon.color.name}
          />

          {/* pokemon details */}
          <div className="w-full">
            <div className="mb-2 flex gap-2 border-b-4 border-black pb-2 text-2xl font-bold dark:border-white">
              <i className="text-slate-500">#{pokemon.id}</i>
              {pokemon.name}
              <div className="flex gap-1">
                {pokemon.types.map((type) => (
                  <PokemonTag key={type.type.name} type={type.type.name} />
                ))}
              </div>
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
              <h2 className="mb-3 text-2xl">Stats</h2>
              <table className="w-full border-separate text-center">
                <thead>
                  <tr>
                    <td className="rounded-md border-2 border-sky-800 bg-sky-300 dark:border-sky-300 dark:bg-sky-800">
                      name
                    </td>
                    <td className="rounded-md border-2 border-sky-800 bg-sky-300 dark:border-sky-300 dark:bg-sky-800">
                      base stat
                    </td>
                    <td className="rounded-md border-2 border-sky-800 bg-sky-300 dark:border-sky-300 dark:bg-sky-800">
                      effort
                    </td>
                  </tr>
                </thead>
                <tbody>
                  {pokemon.stats.map((stat) => (
                    <tr key={stat.stat.name}>
                      <td className="rounded-md border-2 border-sky-500 dark:border-slate-700">
                        {stat.stat.name}
                      </td>
                      <td className="rounded-md border-2 border-sky-500 dark:border-slate-700">
                        {stat.base_stat}
                      </td>
                      <td className="rounded-md border-2 border-sky-500 dark:border-slate-700">
                        {stat.effort}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* varities */}
        <div>
          <h2 className="mb-3 text-2xl">Varities</h2>
          <div className="flex flex-col items-center justify-evenly rounded-md bg-slate-100 py-3 dark:bg-slate-800 lg:flex-row">
            {pokemon.varieties.map((varity) => {
              const id = varity.pokemon.url.split('/')[6];
              return pokemon.name === varity.pokemon.name ? (
                <Image
                  title={varity.pokemon.name}
                  alt={varity.pokemon.name}
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`}
                  className="aspect-square w-full md:w-[10rem]"
                  loading="lazy"
                  width="500"
                  height="500"
                />
              ) : (
                <Link href={`/pokemon/${varity.pokemon.name}`}>
                  <Image
                    title={varity.pokemon.name}
                    alt={varity.pokemon.name}
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`}
                    className="aspect-square w-full md:w-[10rem]"
                    loading="lazy"
                    width="500"
                    height="500"
                  />
                </Link>
              );
            })}
          </div>
        </div>

        {/* Evoluton Chain */}
        {/* <PokemonDisplayEvolutionChain
          evolution_chain={pokemon.evolution_chain}
        /> */}
      </div>
    </>
  );
};

export default PokemonPage;

const chainFormator = async (
  chainArray: PokemonEvolutionChain,
  evolves_to: evolves_to,
  depth: number
) => {
  evolves_to.map((evolve, index) => {
    const pokemon: PokemonEvolutionChain[0] = {
      depth,
      id: evolve.species?.url.split('/')[6],
      index,
      name: evolve.species.name,
    };
    chainArray.push(pokemon);

    if (evolve.evolves_to !== undefined) {
      chainFormator(chainArray, evolve.evolves_to, depth + 1);
    }
  });
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  try {
    const name = params?.pokemonName || undefined;
    const pokemonResponse = await axios<PokemonFetch>(
      `https://pokeapi.co/api/v2/pokemon/${name}`
    );
    const pokemon = pokemonResponse.data;

    const speciesResponse = await axios<PokemonSpeciesFetch>(
      pokemon.species.url
    );
    const species = speciesResponse.data;
    // const evolutionurl = speciesResponse.data.evolution_chain.url;

    // const evolutionChainResponse = await axios<evolutionChain>(evolutionurl);
    // const evolutionData = evolutionChainResponse.data;

    // const evolution_chain: PokemonEvolutionChain = [
    //   {
    //     name: evolutionData.chain.species.name,
    //     id: pokemon.id.toString(),
    //     depth: 0,
    //     index: 0,
    //   },
    // ];
    // await chainFormator(evolution_chain, evolutionData.chain.evolves_to, 1);

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

          color: species.color,
          varieties: species.varieties,

          // evolution_chain,
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
