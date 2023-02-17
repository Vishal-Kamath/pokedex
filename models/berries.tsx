import { ItemFetch } from './items';

export type BerriesList = {
  results: {
    name: string;
    url: string;
  }[];
};

export type Berry = BerryFetch & ItemFetch;

export type BerryFetch = {
  firmness: {
    name: string;
  };
  flavors: {
    flavor: { name: string };
    potency: number;
  }[];
  growth_time: number;
  id: number;
  item: {
    name: string;
    url: string;
  };
  max_harvest: number;
  size: number;
};
