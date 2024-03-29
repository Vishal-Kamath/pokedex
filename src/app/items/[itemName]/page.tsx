import ItemImage from '@/components/common/itemImage';
import HeldByPokemon from '@/components/common/heldByPokemon';
import { ItemDetails } from './components';
import { getItemData } from '@/utils/api';
import { getEndpoint } from '@/utils/lib';

interface Prop {
  params: { itemName: string };
}

const endpoint = getEndpoint();

export async function generateMetadata({ params }: Prop) {
  return {
    title: `pokédex - ${params.itemName}`,
    applicationName: 'pokédex',

    description: `Welcome to the PokéDex Website! This is a web application built using Next 13, Tailwind CSS, PokéAPI, and pokenode-ts. This is a details page for ${params.itemName}`,
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
      params.itemName,
    ],

    openGraph: {
      title: `pokédex - ${params.itemName}`,
      siteName: 'pokédex',
      images: [
        {
          url: `${endpoint}/api/og/dynamic?name=${params.itemName}&img=https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/${params.itemName}.png`,
          width: 1200,
          height: 600,
        },
      ],
      locale: 'en-US',
      type: 'website',
    },
  };
}

const ItemPage = async ({ params }: Prop) => {
  const { itemDetails } = await getItemData(params.itemName);
  return (
    <main className="flex w-full flex-col gap-4 px-[5vw] pb-10 pt-20 sm:pl-5">
      <div className="flex gap-7 max-lg:flex-col">
        <ItemImage
          name={params.itemName}
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/${params.itemName}.png`}
          type={'item'}
        />
        <ItemDetails itemDetails={itemDetails} />
      </div>
      <div className="flex flex-col gap-4">
        <HeldByPokemon heldByPokemons={itemDetails.held_by_pokemon} />
      </div>
    </main>
  );
};

export default ItemPage;
