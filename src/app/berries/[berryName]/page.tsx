import BerryDetails from '@/components/berry/berryDetails';
import BerryImage from '@/components/berry/berryImage';
import { getBerryData } from '@/utils/api';

interface Prop {
  params: { berryName: string };
}

const endpoint = process.env.VERCEL_URL
  ? 'https://' + process.env.VERCEL_URL
  : 'http://localhost:3000';

export async function generateMetadata({ params }: Prop) {
  return {
    title: `pokédex - ${params.berryName}`,
    applicationName: 'pokédex',
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
        <BerryImage
          name={params.berryName}
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/dream-world/${params.berryName}-berry.png`}
        />
        <BerryDetails berryDetails={berryDetails} berryItem={berryItem} />
      </div>
    </main>
  );
};

export default BerryPage;
