import SkeletonCard from '@/components/cards/skeletonCard';
import Pagination from '@/components/pagination';
import { NextPage } from 'next';

const PokemonsListLoadingPage: NextPage = () => {
  return (
    <main className="flex w-full flex-col gap-4 px-[5vw] pb-10 pt-20 sm:pl-5">
      <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array(24)
          .fill(null)
          .map((value, index) => (
            <SkeletonCard key={index} />
          ))}
      </div>
      <Pagination />
    </main>
  );
};

export default PokemonsListLoadingPage;
