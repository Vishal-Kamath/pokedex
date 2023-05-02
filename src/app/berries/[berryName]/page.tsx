import BerryImage from '@/components/berry/berryImage';

interface Prop {
  params: { berryName: string };
}

const endpoint = process.env.VERCEL_URL
  ? 'https://' + process.env.VERCEL_URL
  : 'http://localhost:3000';

export async function generateMetadata({ params }: Prop) {
  return {
    title: `PokéDex - ${params.berryName}`,
    applicationName: 'PokéDex',
    openGraph: {
      title: `PokéDex - ${params.berryName}`,
      siteName: 'PokéDex',
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
  return (
    <main className="flex w-full flex-col gap-4 px-[5vw] pb-10 pt-20 sm:pl-5">
      <BerryImage
        name={params.berryName}
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/dream-world/${params.berryName}-berry.png`}
      />
    </main>
  );
};

export default BerryPage;
