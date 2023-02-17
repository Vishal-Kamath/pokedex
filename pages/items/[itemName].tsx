import HeldByPokemon from '@/components/heldByPokemon';
import { ItemFetch } from '@/models/items';
import axios from 'axios';
import { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';

const ItemPage: NextPage<{ item: ItemFetch }> = ({ item }) => {
  return (
    <>
      <Head>
        <title>{`PokéDex - ${item.name}`}</title>
      </Head>
      <div className="isolate z-10 mb-10 ml-auto flex w-full flex-col gap-5 md:w-1/2 lg:w-3/4">
        <div className="flex w-full flex-col items-center gap-4 lg:flex-row">
          <div className="grid aspect-square h-full w-full max-w-xs place-content-center rounded-xl border-2 bg-sky-50 p-5 dark:border-slate-700 dark:bg-slate-800">
            <Image
              alt={item.name}
              src={item.sprites.default}
              className="pixel-image aspect-square"
              loading="lazy"
              width="500"
              height="500"
            />
          </div>
          <div className="w-full">
            <div className="mb-2 flex gap-2 border-b-4 border-black pb-2 text-2xl font-bold dark:border-white">
              <i className="text-slate-500">#{item.id}</i>
              <span>{item.name}</span>
              <div className="rounded-full bg-slate-300 px-3 py-2 text-xs text-black">
                {item.category.name}
              </div>
            </div>
            <div className="text-gray-500">
              {item.effect_entries.map((entry) => (
                <div key={entry.effect}>{entry.effect}</div>
              ))}
            </div>
            <table className="w-full border-none">
              <tbody>
                <tr>
                  <td>cost:</td>
                  <td>{item.cost}</td>
                </tr>
                <tr>
                  <td>attributes:</td>
                  <td className="flex flex-wrap gap-1">
                    {item.attributes.map((attr, index) => {
                      return index === 0 ? (
                        <div>{attr.name}</div>
                      ) : (
                        <div className="flex gap-1">
                          <span>•</span> {attr.name}
                        </div>
                      );
                    })}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* held by pokemons */}
        <HeldByPokemon held_by_pokemon={item.held_by_pokemon} />
      </div>
    </>
  );
};

export default ItemPage;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  try {
    const itemName = params?.itemName || undefined;
    const itemResponcse = await axios.get(
      `https://pokeapi.co/api/v2/item/${itemName}/`
    );
    const item = itemResponcse.data;
    return {
      props: {
        item,
      },
    };
  } catch {
    return { notFound: true };
  }
};
