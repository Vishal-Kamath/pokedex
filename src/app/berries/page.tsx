import ListCard from '@/components/cards/listCard';
import Pagination from '@/components/pagination';
import { getBerryListData } from '@/utils/api';

const BerriesListPage = async ({
  searchParams,
}: {
  searchParams: { page: string | string[] | undefined };
}) => {
  const berries = await getBerryListData(Number(searchParams.page));
  return (
    <main className="flex w-full flex-col gap-4 px-[5vw] pb-10 pt-20 sm:pl-5">
      <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {berries.results.map((berry) => {
          const id = berry.url.split('/')[6];
          return (
            <ListCard
              key={id + berry.name}
              id={id}
              name={berry.name}
              redirect={`/berries/${berry.name}`}
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/dream-world/${berry.name}-berry.png`}
              berry
            />
          );
        })}
      </div>
      <Pagination />
    </main>
  );
};

export default BerriesListPage;
