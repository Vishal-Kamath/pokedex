export type PokemonList = {
  results: {
    name: string;
    url: string;
  }[];
};

export type Pokemon = {
  id: number;
  name: string;
  base_experience: number;
  height: number;
  weight: number;
  stats: {
    base_stat: 78;
    effort: 0;
    stat: { name: string };
  }[];
  types: {
    type: { name: PokemonType };
  }[];
};

export type evolutionChain = {
  chain: {
    species: {
      name: string;
      url: string;
    };
    evolves_to?: {
      species?: {
        name: string;
        url: string;
      };
      evolves_to?: {
        species?: {
          name: string;
          url: string;
        };
      };
    };
  };
};

export type PokemonType =
  | 'normal'
  | 'fighting'
  | 'flying'
  | 'poison'
  | 'ground'
  | 'rock'
  | 'bug'
  | 'ghost'
  | 'steel'
  | 'fire'
  | 'water'
  | 'grass'
  | 'electric'
  | 'psychic'
  | 'ice'
  | 'dragon'
  | 'dark'
  | 'fairy'
  | 'unknown'
  | 'shadow';
