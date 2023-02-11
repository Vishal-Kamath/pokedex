import axios from 'axios';
import { GetStaticPaths, GetStaticProps } from 'next';
import { useState } from 'react';
import { FaStar, FaRegStar } from 'react-icons/fa';

type PokemonDetailProps = {
  id: number;
  name: string;
  base_experience: number;
  sprites: {
    other: {
      'official-artwork': {
        front_shiny: string | undefined;
      };
    };
  };
  types: {
    type: {
      name: string;
    };
  }[];
  weight: number;
};

type Prop = {
  pokemonDetail: {
    id: number;
    name: string;
    base_experience: number;
    types: {
      type: {
        name: string;
      };
    }[];
    weight: number;
  };
};

const PokemonDetail = ({ pokemonDetail }: Prop) => {
  const [shiny, setShiny] = useState(false);
  return (
    <div className="padding-x flex min-h-full flex-col gap-5 pt-24 pb-8 md:flex-row">
      <div className="relative aspect-square rounded-3xl bg-gray-100 md:w-1/3">
        <button
          className="absolute top-2 left-2 rounded-full bg-white p-2 text-lg text-yellow-300"
          onClick={() => setShiny(!shiny)}
        >
          {shiny ? <FaStar /> : <FaRegStar />}
        </button>
        {!shiny && (
          <img
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonDetail.id}.png`}
            alt={pokemonDetail.name}
            className="h-full w-full"
          />
        )}
        {shiny && (
          <img
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/${pokemonDetail.id}.png`}
            alt={pokemonDetail.name}
            className="h-full w-full"
          />
        )}
      </div>
      <div className="w-full">
        <div className="flex items-center justify-between border-b-4 border-black pb-2 dark:border-white">
          <div>
            <h1 className="text-4xl font-bold">{pokemonDetail.name}</h1>
            <div className="opacity-50">
              {pokemonDetail.types.map((types, index) => {
                if (index === 0) {
                  return <span key={types.type.name}>{types.type.name}</span>;
                }
                return <span key={types.type.name}> • {types.type.name}</span>;
              })}
            </div>
          </div>
          <i className="text-3xl">#{pokemonDetail.id}</i>
        </div>
        <div className="mt-2 flex w-full flex-col text-lg">
          <span>name: {pokemonDetail.name}</span>
          <span>weight: {pokemonDetail.weight}</span>
          <span>base experience: {pokemonDetail.base_experience}</span>
        </div>
      </div>
    </div>
  );
};

export default PokemonDetail;

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      {
        params: { pokemonName: 'bulbasaur' },
      },
      {
        params: { pokemonName: 'charmander' },
      },
      {
        params: { pokemonName: 'squirtle' },
      },
    ],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    if (!params?.pokemonName) {
      return {
        notFound: true,
      };
    }
    const res = await axios.get<PokemonDetailProps>(
      `https://pokeapi.co/api/v2/pokemon/${params.pokemonName}/`
    );
    const data = res.data;

    if (!data.id) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        pokemonDetail: {
          id: data.id,
          name: data.name,
          base_experience: data.base_experience,
          types: data.types,
          weight: data.weight,
        },
      },
    };
  } catch (err) {
    return {
      notFound: true,
    };
  }
};
