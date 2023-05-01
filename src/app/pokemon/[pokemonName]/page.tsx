import PokemonImage, { imageVariants } from '@/components/pokemon/pokemonImage';
import { VariantProps } from 'class-variance-authority';
import { PokemonClient } from 'pokenode-ts';

async function getPokemonData(name: string) {
  const api = new PokemonClient();

  const pokemonDetails = await api.getPokemonByName(name);
  const pokemonSpecies = await api.getPokemonSpeciesByName(name);
  return { pokemonDetails, pokemonSpecies };
}

const PokemonPage = async ({ params }: { params: { pokemonName: string } }) => {
  const { pokemonDetails, pokemonSpecies } = await getPokemonData(
    params.pokemonName
  );
  const color = pokemonSpecies.color.name as VariantProps<
    typeof imageVariants
  >['color'];
  return (
    <main className="flex w-full flex-col gap-4 px-[5vw] pb-10 pt-20 sm:pl-5">
      <PokemonImage
        name={pokemonDetails.name}
        id={pokemonDetails.id}
        color={color}
      />
    </main>
  );
};

export default PokemonPage;
