import ItemCard from '@/components/cards/itemCard';
import { ItemClient } from 'pokenode-ts';

const getBerryData = async (page: number = 1) => {
  const api = new ItemClient();

  const offset = (page - 1) * 24;
  const items = await api.listItems(offset, 24);
  return items;
};

const ItemsPage = async ({
  searchParams,
}: {
  searchParams: { page: string | string[] | undefined };
}) => {
  const items = await getBerryData(Number(searchParams.page));
  return (
    <main className="w-full px-[5vw] pb-10 pt-20 sm:pl-5">
      <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {items.results.map((item) => {
          const id = item.url.split('/')[6];
          return <ItemCard key={id + item.name} id={id} name={item.name} />;
        })}
      </div>
    </main>
  );
};

export default ItemsPage;
