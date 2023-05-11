import ItemDetails from '@/components/item/itemDetails';
import ItemImage from '@/components/item/itemImage';
import { getItemData } from '@/utils/api';
import { capitalize } from '@/utils/lib';

interface Prop {
  params: { itemName: string };
}

const endpoint = process.env.VERCEL_URL
  ? 'https://' + process.env.VERCEL_URL
  : 'http://localhost:3000';

export async function generateMetadata({ params }: Prop) {
  return {
    title: `pokédex - ${capitalize(params.itemName)}`,
    applicationName: 'pokédex',
    openGraph: {
      title: `pokédex - ${capitalize(params.itemName)}`,
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
        />
        <ItemDetails itemDetails={itemDetails} />
      </div>
    </main>
  );
};

export default ItemPage;
