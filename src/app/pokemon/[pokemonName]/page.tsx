import {
  ItemsHeldByPokemon,
  PokemonDetails,
  PokemonVariety,
  PokemonImage,
} from './components';
import { imageVariants } from './components/pokemonImage';
import { getPokemonData, getPokemonId } from '@/utils/api';
import { VariantProps } from 'class-variance-authority';
import ErrorPage from './error';
import { getEndpoint } from '@/utils/lib';
import { Metadata } from 'next';

interface Prop {
  params: { pokemonName: string };
}

const endpoint = getEndpoint();

export async function generateMetadata({ params }: Prop): Promise<Metadata> {
  const id = await getPokemonId(params.pokemonName);

  return {
    title: `pokédex - ${params.pokemonName}`,
    applicationName: 'pokédex',

    description: `Welcome to the PokéDex Website! This is a web application built using Next 13, Tailwind CSS, PokéAPI, and pokenode-ts. This is a details page for ${params.pokemonName}`,
    keywords: [
      'Next.js',
      'React',
      'TypeScript',
      'Tailwind CSS',
      'PokéDex',
      'Pokémon',
      'PokéAPI',
      'PokeDex',
      'Pokemon',
      params.pokemonName,
    ],

    openGraph: {
      title: `pokédex - ${params.pokemonName}`,
      siteName: 'pokédex',
      images: [
        {
          url: `${endpoint}/api/og/dynamic?name=${params.pokemonName}&img=https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`,
          width: 1200,
          height: 600,
        },
      ],
      locale: 'en-US',
      type: 'website',
    },
  };
}

const PokemonPage = async ({ params }: Prop) => {
  try {
    const data = await getPokemonData(params.pokemonName);

    if (!data?.pokemonDetails || !data?.pokemonDetails) {
      return <ErrorPage error={Error('missing pokemon data')} />;
    }
    const { pokemonDetails, pokemonSpecies } = data;
    const color = pokemonSpecies.color.name as VariantProps<
      typeof imageVariants
    >['color'];
    return (
      <main className="flex w-full flex-col gap-4 px-[5vw] pb-10 pt-20 sm:pl-5">
        <div className="flex gap-7 max-lg:flex-col">
          <PokemonImage
            name={pokemonDetails.name}
            sprites={pokemonDetails.sprites}
            id={pokemonDetails.id}
            color={color}
          />
          <PokemonDetails
            pokemonDetails={pokemonDetails}
            description={pokemonSpecies.flavor_text_entries}
          />
        </div>
        <div className="flex flex-col gap-4">
          <PokemonVariety varieties={pokemonSpecies.varieties} />
          <ItemsHeldByPokemon items={pokemonDetails.held_items} />
        </div>
      </main>
    );
  } catch (err: any) {
    return <ErrorPage error={Error(err.message)} />;
  }
};

export default PokemonPage;
