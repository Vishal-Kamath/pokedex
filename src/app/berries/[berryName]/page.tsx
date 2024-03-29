import { BerryDetails } from './components';
import HeldByPokemon from '@/components/common//heldByPokemon';
import ItemImage from '@/components/common//itemImage';
import { getBerryData } from '@/utils/api';
import { getEndpoint } from '@/utils/lib';

interface Prop {
  params: { berryName: string };
}

const endpoint = getEndpoint();

export async function generateMetadata({ params }: Prop) {
  return {
    title: `pokédex - ${params.berryName}`,
    applicationName: 'pokédex',

    description: `Welcome to the PokéDex Website! This is a web application built using Next 13, Tailwind CSS, PokéAPI, and pokenode-ts. This is a details page for ${params.berryName}`,
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
      params.berryName,
    ],

    openGraph: {
      title: `pokédex - ${params.berryName}`,
      siteName: 'pokédex',
      images: [
        {
          url: `${endpoint}/api/og/dynamic?name=${params.berryName}&img=https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/dream-world/${params.berryName}-berry.png`,
          width: 1200,
          height: 600,
        },
      ],
      locale: 'en-US',
      type: 'website',
    },
  };
}

const BerryPage = async ({ params }: Prop) => {
  const { berryDetails, berryItem } = await getBerryData(params.berryName);
  return (
    <main className="flex w-full flex-col gap-4 px-[5vw] pb-10 pt-20 sm:pl-5">
      <div className="flex gap-7 max-lg:flex-col">
        <ItemImage
          name={params.berryName}
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/dream-world/${params.berryName}-berry.png`}
          type={'berry'}
        />
        <BerryDetails berryDetails={berryDetails} berryItem={berryItem} />
      </div>
      <div className="flex flex-col gap-4">
        <HeldByPokemon heldByPokemons={berryItem.held_by_pokemon} />
      </div>
    </main>
  );
};

export default BerryPage;
