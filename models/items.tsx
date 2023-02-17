export type ItemsList = {
  results: {
    name: string;
    url: string;
  }[];
};

export type ItemFetch = {
  name: string;
  id: number;
  cost: number;
  effect_entries: {
    effect: string;
  }[];
  category: {
    name: string;
  };
  attributes: {
    name: string;
  }[];
  held_by_pokemon: {
    pokemon: {
      name: string;
      url: string;
    };
  }[];
  sprites: {
    default: string;
  };
};
