import ListCard from '@/components/cards/listCard';
import Pagination from '@/components/pagination';
import { getPokemonListData } from '@/utils/api';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: `pokédex - pokemons`,
};

const PokemonsListPage = async ({
  searchParams,
}: {
  searchParams: { page: string | string[] | undefined };
}) => {
  const pokemons = await getPokemonListData(Number(searchParams.page));
  return (
    <main className="flex w-full flex-col gap-4 px-[5vw] pb-10 pt-20 sm:pl-5">
      <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {pokemons.results.map((pokemon) => {
          const id = pokemon.url.split('/')[6];
          return (
            <ListCard
              key={id + pokemon.name}
              id={id}
              name={pokemon.name}
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`}
              imageVariant={'pokemon'}
            />
          );
        })}
      </div>
      <Pagination />
    </main>
  );
};

export default PokemonsListPage;
