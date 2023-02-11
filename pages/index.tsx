import React from 'react';
import { GetStaticProps } from 'next';
import axios from 'axios';
import PokemonPage from '@/components/pokemonPage';

export type Pokemon = {
  count: number;
  next: string;
  previous: string;
  results: {
    name: string;
    url: string;
  }[];
};

export type Props = {
  pokemonsData: Pokemon['results'];
};

export default function Home({ pokemonsData = [] }: Props) {
  return <PokemonPage pokemons={pokemonsData} />;
}

export const getStaticProps: GetStaticProps = async () => {
  try {
    const res = await axios.get<Pokemon>('https://pokeapi.co/api/v2/pokemon');
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
