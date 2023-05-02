import SkeletonComponent from '@/components/skeletonComponent';
import { NextPage } from 'next';

const PokemonLoadingPage: NextPage = () => {
  return (
    <main className="flex w-full flex-col gap-4 px-[5vw] pb-10 pt-20 sm:pl-5">
      <div className="flex gap-7 max-lg:flex-col">
        <div className="rounded-lg border-2 border-slate-300 bg-slate-500 bg-opacity-25 p-0 leading-none dark:border-slate-700">
          <SkeletonComponent className="lg:h-[20rem] aspect-square w-full rounded-lg lg:w-[20rem]" />
        </div>

        <div className="flex w-full flex-col gap-5">
          <SkeletonComponent className="h-9 w-full" />

          <div>
            <SkeletonComponent className="h-5" />
            <SkeletonComponent className="h-5" />
            <SkeletonComponent className="h-5" />
            <SkeletonComponent className="h-5" />
          </div>

          <div>
            <SkeletonComponent className="w-28" />
            <SkeletonComponent className="h-5" />
            <SkeletonComponent className="h-5" />
            <SkeletonComponent className="h-5" />
            <SkeletonComponent className="h-5" />
          </div>
        </div>
      </div>
    </main>
  );
};

export default PokemonLoadingPage;
