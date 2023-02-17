import { Berry, BerryFetch, BerryItem } from '@/models/berries';
import axios from 'axios';
import { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

const BerryPage: NextPage<{ berry: Berry }> = ({ berry }) => {
  return (
    <>
      <Head>
        <title>{`PokéDex - ${berry.item.name}`}</title>
      </Head>
      <div className="isolate z-10 ml-auto flex w-full flex-col gap-5 md:w-1/2 lg:w-3/4">
        <div className="flex w-full flex-col gap-4 lg:flex-row">
          <div className="grid aspect-square h-full w-full max-w-xs place-content-center rounded-xl border-2 bg-sky-50 p-5 dark:border-slate-700 dark:bg-slate-800">
            <Image
              alt={berry.item.name}
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/dream-world/${berry.item.name}.png`}
              className="pixel-image aspect-square"
              loading="lazy"
              width="500"
              height="500"
            />
          </div>
          <div className="w-full">
            <div className="mb-2 flex gap-2 border-b-4 border-black pb-2 text-2xl font-bold dark:border-white">
              <i className="text-slate-500">#{berry.id}</i>
              <span>{berry.item.name}</span>
              <div className="rounded-full bg-slate-300 px-3 py-2 text-xs text-black">
                {berry.category.name}
              </div>
            </div>
            <div className="text-gray-500">
              {berry.effect_entries.map((entry) => (
                <div key={entry.effect}>{entry.effect}</div>
              ))}
            </div>
            <table className="w-full border-none">
              <tbody>
                <tr>
                  <td>size:</td>
                  <td>{berry.size / 10}cm</td>
                </tr>
                <tr>
                  <td>cost:</td>
                  <td>{berry.cost}</td>
                </tr>
                <tr>
                  <td>firmness:</td>
                  <td>{berry.firmness.name}</td>
                </tr>
                <tr>
                  <td>growth time:</td>
                  <td>{berry.growth_time}</td>
                </tr>
                <tr>
                  <td>max harvest:</td>
                  <td>{berry.max_harvest}</td>
                </tr>
              </tbody>
            </table>
            <h2 className="my-3 text-2xl">Flavors</h2>
            <table className="w-full border-separate text-center">
              <thead>
                <tr>
                  <td className="rounded-md border-2 border-sky-800 bg-sky-300 dark:border-sky-300 dark:bg-sky-800">
                    flavor
                  </td>
                  <td className="rounded-md border-2 border-sky-800 bg-sky-300 dark:border-sky-300 dark:bg-sky-800">
                    potency
                  </td>
                </tr>
              </thead>
              <tbody>
                {berry.flavors.map((flavor) => (
                  <tr key={flavor.flavor.name}>
                    <td className="rounded-md border-2 border-sky-500 dark:border-slate-700">
                      {flavor.flavor.name}
                    </td>
                    <td className="rounded-md border-2 border-sky-500 dark:border-slate-700">
                      {flavor.potency}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* held by pokemons */}
        {berry.held_by_pokemon.length !== 0 && (
          <div>
            <h2 className="mb-3 text-2xl">Held by pokemon</h2>
            <div className="flex flex-wrap items-center justify-evenly rounded-md bg-slate-100 py-3 dark:bg-slate-800">
              {berry.held_by_pokemon.map((pokemon) => {
                const id = pokemon.pokemon.url.split('/')[6];
                return (
                  <Link
                    key={pokemon.pokemon.name}
                    href={`/pokemon/${pokemon.pokemon.name}`}
                  >
                    <Image
                      title={pokemon.pokemon.name}
                      alt={pokemon.pokemon.name}
                      src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`}
                      className="aspect-square w-full md:w-[10rem]"
                      loading="lazy"
                      width="500"
                      height="500"
                    />
                  </Link>
                );
              })}
            </div>
          </div>
        )}
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

          category: berryItem.category,
          cost: berryItem.cost,
          effect_entries: berryItem.effect_entries,
          held_by_pokemon: berryItem.held_by_pokemon,
        },
      },
    };
  } catch (err) {
    return {
      notFound: true,
    };
  }
};
