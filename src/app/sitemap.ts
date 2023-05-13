import DBList from '@/db.json';

const endpoint = process.env.VERCEL_URL
  ? 'https://' + process.env.VERCEL_URL
  : 'http://localhost:3000';

export default async function sitemap() {
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
