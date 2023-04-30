import BerryCard from '@/components/cards/berryCard';
import Pagination from '@/components/pagination';
import { BerryClient } from 'pokenode-ts';

const getBerryData = async (page: number = 1) => {
  const api = new BerryClient();

  const offset = (page - 1) * 24;
  const berries = await api.listBerries(offset, 24);
  return berries;
};

const BerriesPage = async ({
  searchParams,
}: {
  searchParams: { page: string | string[] | undefined };
}) => {
  const berries = await getBerryData(Number(searchParams.page));
  return (
    <main className="flex w-full flex-col gap-4 px-[5vw] pb-10 pt-20 sm:pl-5">
      <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {berries.results.map((berry) => {
          const id = berry.url.split('/')[6];
          return <BerryCard key={id + berry.name} id={id} name={berry.name} />;
        })}
      </div>
      <Pagination />
    </main>
  );
};

export default BerriesPage;
