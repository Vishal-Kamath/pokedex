import PokemonDetails from '@/components/pokemon/pokemonDetails';
import PokemonImage, { imageVariants } from '@/components/pokemon/pokemonImage';
import { getPokemonData, getPokemonId } from '@/utils/api';
import { VariantProps } from 'class-variance-authority';
import ErrorPage from './error';
import PokemonVariety from '@/components/pokemon/pokemonVariety';
import ItemsHeldByPokemon from '@/components/pokemon/itemsHeldByPokemon';
import { getEndpoint } from '@/utils/lib';

interface Prop {
  params: { pokemonName: string };
}

const endpoint = getEndpoint();

export async function generateMetadata({ params }: Prop) {
  const id = await getPokemonId(params.pokemonName);

  return {
    title: `pokédex - ${params.pokemonName}`,
    applicationName: 'pokédex',
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

    if (
      !data?.pokemonDetails ||
      !data?.pokemonDetails ||
      !data.pokemonEvolutionChain
    ) {
      return <ErrorPage error={Error('missing pokemon data')} />;
    }
    const { pokemonDetails, pokemonEvolutionChain, pokemonSpecies } = data;
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
          <PokemonDetails {...pokemonDetails} />
        </div>
        <div className="flex flex-col gap-4">
          <PokemonVariety
            name={pokemonDetails.name}
            varieties={pokemonSpecies.varieties}
          />
          <ItemsHeldByPokemon items={pokemonDetails.held_items} />
        </div>
      </main>
    );
  } catch (err: any) {
    return <ErrorPage error={Error(err.message)} />;
  }
};

export default PokemonPage;
