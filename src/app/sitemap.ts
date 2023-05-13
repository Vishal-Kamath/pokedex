import DBList from '@/db.json';
import { getEndpoint } from '@/utils/lib';

export default async function sitemap() {
  const endpoint = getEndpoint();
  const { pokemon, berries, items } = DBList;

  const mainRoutes = ['pokemon', 'berries', 'items', 'about'].map(
    (routeName) => ({
      url: `${endpoint}/${routeName}`,
      lastModified: new Date().toISOString(),
    })
  );

  const pokemonRoutes = pokemon.map((pokemonName) => ({
    url: `${endpoint}/pokemon/${pokemonName}`,
    lastModified: new Date().toISOString(),
  }));

  const berryRoutes = berries.map((berryName) => ({
    url: `${endpoint}/berries/${berryName}`,
    lastModified: new Date().toISOString(),
  }));

  const itemRoutes = items.map((itemName) => ({
    url: `${endpoint}/items/${itemName}`,
    lastModified: new Date().toISOString(),
  }));

  return [...mainRoutes, ...pokemonRoutes, ...berryRoutes, ...itemRoutes];
}
