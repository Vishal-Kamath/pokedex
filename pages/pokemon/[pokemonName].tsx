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
        front_default: string;
        front_shiny: string;
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
    front_default: string;
    front_shiny: string;
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
    <div className="pt-24 pb-8 min-h-full padding-x flex flex-col md:flex-row gap-5">
      <div className="aspect-square rounded-3xl bg-gray-100 relative md:w-1/3">
        {pokemonDetail.front_shiny !== null ? (
          <button
            className="p-2 text-lg absolute top-2 left-2 rounded-full bg-white text-yellow-300"
            onClick={() => setShiny(!shiny)}
          >
            {shiny ? <FaStar /> : <FaRegStar />}
          </button>
        ) : null}
        {!shiny && (
          <img
            src={pokemonDetail.front_default}
            alt={pokemonDetail.name}
            className="w-full h-full"
          />
        )}
        {shiny && (
          <img
            src={pokemonDetail.front_shiny}
            alt={pokemonDetail.name}
            className="w-full h-full"
          />
        )}
      </div>
      <div className="w-full">
        <div className="dark:border-white flex justify-between items-center pb-2 border-b-4 border-black">
          <div>
            <h1 className="font-bold text-4xl">{pokemonDetail.name}</h1>
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
        <div className="flex flex-col w-full mt-2 text-lg">
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
        params: { pokemonName: 'ivysaur' },
      },
      {
        params: { pokemonName: 'venusaur' },
      },
      {
        params: { pokemonName: 'charmander' },
      },
      {
        params: { pokemonName: 'charmeleon' },
      },
      {
        params: { pokemonName: 'charizard' },
      },
      {
        params: { pokemonName: 'squirtle' },
      },
      {
        params: { pokemonName: 'wartortle' },
      },
      {
        params: { pokemonName: 'blastoise' },
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
          front_default: data.sprites.other['official-artwork'].front_default,
          front_shiny: data.sprites.other['official-artwork'].front_shiny,
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
