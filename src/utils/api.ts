import { notFound } from 'next/navigation';
import { MainClient } from 'pokenode-ts';
const api = new MainClient();

// ---------------------------------------------------------
// Pokemon Functions
// ---------------------------------------------------------

// get Pokemon List
/**
 * ## Get Pokemon List Data
 * fetchs a list of pokemons
 * @param {number} [page=1] - The page number to retrieve. Default value is 1.
 * @param {number} [pageOffset=24] - The number of Pokemon to retrieve per page. Default value is 24.
 * @returns
 */
export const getPokemonListData = async (
  page: number = 1,
  pageOffset: number = 24
) => {
  try {
    const offset = (page - 1) * pageOffset;
    const pokemons = await api.pokemon.listPokemons(offset, 24);
    return pokemons;
  } catch (err) {
    return notFound();
  }
};

// get Pokemon details
/**
 * ## Get Pokemon Data
 * fetchs pokemons data
 * @param {string} [name] - name of pokemon
 * @returns
 */
export async function getPokemonData(name: string) {
  try {
    const pokemonDetails = await api.pokemon.getPokemonByName(name);
    const pokemonSpecies = await api.pokemon.getPokemonSpeciesByName(
      pokemonDetails.species.name
    );
    return { pokemonDetails, pokemonSpecies };
  } catch (err) {
    return notFound();
  }
}

// get Pokemon Id
/**
 * ## Get Pokemon Id
 * return pokemon id for name
 * @param {string} [name] - name of pokemon
 * @returns {Promise<number>} id
 */
export async function getPokemonId(name: string) {
  try {
    const pokemon = await api.pokemon.getPokemonByName(name);
    return pokemon.id;
  } catch (err) {
    return notFound();
  }
}

// ---------------------------------------------------------
// Berry Functions
// ---------------------------------------------------------

// get Berry List
/**
 * ## Get Berry List Data
 * fetchs a list of berries
 * @param {number} [page=1] - The page number to retrieve. Default value is 1.
 * @param {number} [pageOffset=24] - The number of Pokemon to retrieve per page. Default value is 24.
 * @returns
 */
export const getBerryListData = async (
  page: number = 1,
  pageOffset: number = 24
) => {
  try {
    const offset = (page - 1) * pageOffset;
    const berries = await api.berry.listBerries(offset, 24);
    return berries;
  } catch (err) {
    return notFound();
  }
};

// get Berry details
/**
 * ## Get Berry Data
 * fetchs Berry data
 * @param {string} [name] - name of Berry
 * @returns
 */
export async function getBerryData(name: string) {
  try {
    const berryDetails = await api.berry.getBerryByName(name);
    const berryItem = await api.item.getItemByName(berryDetails.item.name);
    return { berryDetails, berryItem };
  } catch (err) {
    return notFound();
  }
}

// ---------------------------------------------------------
// Item Functions
// ---------------------------------------------------------

// get Item List
/**
 * ## Get Item List Data
 * fetchs a list of items
 * @param {number} [page=1] - The page number to retrieve. Default value is 1.
 * @param {number} [pageOffset=24] - The number of Pokemon to retrieve per page. Default value is 24.
 * @returns
 */
export const getItemListData = async (
  page: number = 1,
  pageOffset: number = 24
) => {
  try {
    const offset = (page - 1) * pageOffset;
    const items = await api.item.listItems(offset, 24);
    return items;
  } catch (err) {
    return notFound();
  }
};

// get Item details
/**
 * ## Get Item Data
 * fetchs item data
 * @param {string} [name] - name of Item
 * @returns
 */
export async function getItemData(name: string) {
  try {
    const itemDetails = await api.item.getItemByName(name);
    return { itemDetails };
  } catch (err) {
    return notFound();
  }
}
