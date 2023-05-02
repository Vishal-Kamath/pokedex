import ListCard from '@/components/cards/listCard';
import Pagination from '@/components/pagination';
import { getItemListData } from '@/utils/api';

const ItemsListPage = async ({
  searchParams,
}: {
  searchParams: { page: string | string[] | undefined };
}) => {
  const items = await getItemListData(Number(searchParams.page));
  return (
    <main className="flex w-full flex-col gap-4 px-[5vw] pb-10 pt-20 sm:pl-5">
      <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {items.results.map((item) => {
          const id = item.url.split('/')[6];
          return (
            <ListCard
              key={id + item.name}
              id={id}
              name={item.name}
              redirect={`/items/${item.name}`}
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/${item.name}.png`}
            />
          );
        })}
      </div>
      <Pagination />
    </main>
  );
};

export default ItemsListPage;
