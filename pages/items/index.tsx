import PaginationButton from '@/components/pagination';
import { ItemsList } from '@/models/items';
import axios from 'axios';
import { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

const ItemsHome: NextPage<{ itemsList: ItemsList }> = ({ itemsList }) => {
  return (
    <>
      <Head>
        <title>PokéDex - items</title>
      </Head>
      <div className="isolate z-10 ml-auto mb-10 w-full md:w-1/2 lg:w-3/4">
        <div className="grid grid-cols-2 gap-2 lg:grid-cols-3 xl:grid-cols-4">
          {itemsList.results.map((item) => {
            const id = item.url.split('/')[6];
            return (
              <Link
                href={`/items/${item.name}`}
                key={item.name}
                className="flex flex-col items-center gap-5 rounded-xl border-4 border-sky-200 py-5 hover:border-sky-300 hover:bg-sky-100 dark:border-slate-800 dark:hover:border-sky-700 dark:hover:bg-sky-900"
              >
                <div className="text-center text-2xl font-semibold">
                  #{id} {item.name}
                </div>
                <Image
                  alt={item.name}
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/${item.name}.png`}
                  className="pixel-image aspect-square"
                  loading="lazy"
                  width="500"
                  height="500"
                />
              </Link>
            );
          })}
        </div>
        <PaginationButton />
      </div>
    </>
  );
};

export default ItemsHome;

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  try {
    const pageNo = Number(query?.pageNo) | 0;
    const itemResponcse = await axios.get<ItemsList>(
      `https://pokeapi.co/api/v2/item/?offset=${pageNo * 16}&limit=16`
    );
    const itemsList = itemResponcse.data;
    return {
      props: {
        itemsList,
      },
    };
  } catch (err) {
    return { notFound: true };
  }
};
