import { Pokemon } from '@/models/pokemon';
import axios from 'axios';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import React, { useState } from 'react';
import { FaStar, FaRegStar } from 'react-icons/fa';

const PokemonPage: React.FC<{ pokemon: Pokemon }> = ({ pokemon }) => {
  const [shiny, setShiny] = useState(false);
  return (
    <>
      <Head>
        <title>PokéDex - {pokemon.name}</title>
      </Head>
      <div className="padding-x w-full">
        <div className="flex w-full flex-col gap-4 md:flex-row">
          <div className="relative aspect-square w-full rounded-3xl bg-sky-800 md:w-1/3 lg:w-1/4">
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
          <div className="w-full">
            <div className="mb-2 flex justify-between border-b-4 pb-2 text-2xl font-bold">
              <h1>{pokemon.name}</h1>
              <i className="text-slate-500">#{pokemon.id}</i>
            </div>
            <div>
              <table className="w-full border-none">
                <tbody>
                  <tr>
                    <td>name:</td>
                    <td>{pokemon.name}</td>
                  </tr>
                  <tr>
                    <td>id:</td>
                    <td>{pokemon.id}</td>
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
      </div>
    </>
  );
};

export default PokemonPage;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  try {
    const name = params?.pokemonName || undefined;
    const response = await axios<Pokemon>(
      `https://pokeapi.co/api/v2/pokemon/${name}`
    );
    const pokemon = response.data;
    return {
      props: {
        pokemon: {
          id: pokemon.id,
          name: pokemon.name,
          base_experience: pokemon.base_experience,
          height: pokemon.height,
        },
      },
    };
  } catch (err) {
    return {
      notFound: true,
    };
  }
};
