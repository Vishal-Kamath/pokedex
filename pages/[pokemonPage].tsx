import React, { useState } from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import axios from 'axios';
import { Pokemon, Props } from './index';
import PokemonPage from '@/components/pokemonPage';

export default function Home({ pokemonsData = [] }: Props) {
  return <PokemonPage pokemons={pokemonsData} />;
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      {
        params: { pokemonPage: '1' },
      },
      {
        params: { pokemonPage: '2' },
      },
      {
        params: { pokemonPage: '3' },
      },
    ],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    if (!params?.pokemonPage) {
      return {
        notFound: true,
      };
    }
    const res = await axios.get<Pokemon>(
      `https://pokeapi.co/api/v2/pokemon?offset=${
        Number(params.pokemonPage) * 20
      }&limit=20`
    );
    const data = res.data;
    if (!data.next) {
      return {
        notFound: true,
      };
    }
    return {
      props: {
        pokemonsData: data.results,
      },
    };
  } catch (err) {
    return {
      notFound: true,
    };
  }
};
