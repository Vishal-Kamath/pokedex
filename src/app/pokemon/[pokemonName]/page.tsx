import PokemonDetails from '@/components/pokemon/pokemonDetails';
import PokemonImage, { imageVariants } from '@/components/pokemon/pokemonImage';
import { getPokemonData, getPokemonId } from '@/utils/api';
import { VariantProps } from 'class-variance-authority';

interface Prop {
  params: { pokemonName: string };
}

const endpoint = process.env.VERCEL_URL
  ? 'https://' + process.env.VERCEL_URL
  : 'http://localhost:3000';

export async function generateMetadata({ params }: Prop) {
  const id = await getPokemonId(params.pokemonName);

  return {
    title: `PokéDex - ${params.pokemonName}`,
    applicationName: 'PokéDex',
    openGraph: {
      title: `PokéDex - ${params.pokemonName}`,
      siteName: 'PokéDex',
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
  const { pokemonDetails, pokemonSpecies, pokemonEvolutionChain } =
    await getPokemonData(params.pokemonName);
  const color = pokemonSpecies.color.name as VariantProps<
    typeof imageVariants
  >['color'];
  return (
    <main className="flex w-full flex-col gap-4 px-[5vw] pb-10 pt-20 sm:pl-5">
      <div className="flex gap-7 max-lg:flex-col">
        <PokemonImage
          name={pokemonDetails.name}
          id={pokemonDetails.id}
          color={color}
        />
        <PokemonDetails {...pokemonDetails} />
      </div>
      <div>{}</div>
    </main>
  );
};

export default PokemonPage;
