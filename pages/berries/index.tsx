import PaginationButton from '@/components/pagination';
import { BerriesList } from '@/models/berries';
import axios from 'axios';
import { GetServerSideProps, NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';

const BerriesHome: NextPage<{ berries: BerriesList['results'] }> = ({
  berries,
}) => {
  return (
    <div className="ml-auto w-full md:w-1/2 lg:w-3/4">
      <div className="grid grid-cols-2 gap-2 lg:grid-cols-3 xl:grid-cols-4">
        {berries.map((berry) => {
          const id = berry.url.split('/')[6];
          return (
            <Link
              href={`/berries/${berry.name}`}
              key={berry.name}
              className="flex flex-col items-center gap-5 rounded-xl border-4 border-sky-200 py-5 hover:border-sky-300 hover:bg-sky-100 dark:border-slate-800 dark:hover:border-sky-700 dark:hover:bg-sky-900"
            >
              <div className="text-center text-2xl font-semibold">
                #{id} {berry.name}
              </div>
              <Image
                alt={berry.name}
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/dream-world/${berry.name}-berry.png`}
                className="aspect-square"
                loading="lazy"
                width="100"
                height="100"
              />
            </Link>
          );
        })}
      </div>
      <PaginationButton />
    </div>
  );
};

export default BerriesHome;

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  try {
    const pageNo = Number(query.pageNo) | 0;

    const berriesResponse = await axios<BerriesList>(
      `https://pokeapi.co/api/v2/berry/?offset=${16 * pageNo}&limit=16`
    );
    const berries = berriesResponse.data.results;

    return {
      props: {
        berries,
      },
    };
  } catch (err) {
    return {
      notFound: true,
    };
  }
};
