import ItemImage from '@/components/item/itemImage';

interface Prop {
  params: { itemName: string };
}

const endpoint = process.env.VERCEL_URL
  ? 'https://' + process.env.VERCEL_URL
  : 'http://localhost:3000';

export async function generateMetadata({ params }: Prop) {
  return {
    title: `PokéDex - ${params.itemName}`,
    applicationName: 'PokéDex',
    openGraph: {
      title: `PokéDex - ${params.itemName}`,
      siteName: 'PokéDex',
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
  return (
    <main className="flex w-full flex-col gap-4 px-[5vw] pb-10 pt-20 sm:pl-5">
      <ItemImage
        name={params.itemName}
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/${params.itemName}.png`}
      />
    </main>
  );
};

export default ItemPage;
