import { PokemonList } from '@/models/pokemon';
import { GetServerSideProps, GetStaticProps } from 'next';
import Image from 'next/image';
import React from 'react';

const Home: React.FC<{ pokemonList: PokemonList }> = ({ pokemonList }) => {
  return (
    <div className="padding-x grid grid-cols-1 gap-2 sm:grid-cols-2 xl:grid-cols-3">
      {pokemonList.results.map((pokemon) => {
        const id = pokemon.url.split('/')[6];
        return (
          <div key={pokemon.name}>
            <div className="text-center">{pokemon.name}</div>
            <Image
              alt={pokemon.name}
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`}
              className="aspect-square w-full"
              loading="lazy"
              width="500"
              height="500"
            />
          </div>
        );
      })}
    </div>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const pageNo = Number(query.pageNo) || 0;

  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=18&offset=${18 * pageNo}`
  );
  const data = await response.json();

  return {
    props: {
      pokemonList: data,
    },
  };
};
