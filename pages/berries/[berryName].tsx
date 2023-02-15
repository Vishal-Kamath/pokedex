import { Berry, BerryFetch, BerryItem } from '@/models/berries';
import axios from 'axios';
import { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';

const BerryPage: NextPage<{ berry: Berry }> = ({ berry }) => {
  return (
    <>
      <Head>
        <title>{`PokéDex - ${berry.item.name}`}</title>
      </Head>
      <div className="ml-auto flex w-full flex-col gap-5 md:w-3/4">
        <div className="flex w-full flex-col gap-4 md:flex-row">
          <div className="grid place-content-center rounded-xl border-2 bg-sky-50 p-5 dark:border-slate-700 dark:bg-slate-800">
            <Image
              alt={berry.item.name}
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/dream-world/${berry.item.name}.png`}
              className="aspect-square"
              loading="lazy"
              width="200"
              height="200"
            />
          </div>
          <div className="w-full">
            <div className="mb-2 flex gap-2 border-b-4 border-black pb-2 text-2xl font-bold dark:border-white">
              <i className="text-slate-500">#{berry.id}</i>
              <span>{berry.item.name}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BerryPage;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  try {
    const name = params?.berryName || undefined;
    const berryResponse = await axios<BerryFetch>(
      `https://pokeapi.co/api/v2/berry/${name}`
    );
    const berry = berryResponse.data;

    const berryItemResponse = await axios<BerryItem>(berry.item.url);
    const berryItem = berryItemResponse.data;

    return {
      props: {
        berry: {
          firmness: berry.firmness,
          flavors: berry.flavors,
          growth_time: berry.growth_time,
          id: berry.id,
          item: berry.item,
          max_harvest: berry.max_harvest,
          size: berry.size,
        },
      },
    };
  } catch (err) {
    return {
      notFound: true,
    };
  }
};
