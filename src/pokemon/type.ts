// Node modules.
import _ from 'lodash';
// Local modules.
import { PokemonRaw } from 'src/models/pokemon';
import { getResources } from 'src/gameMaster';

const pokemonTypeDict = await getResources('pokemonType');

const translateType = (pokemon: PokemonRaw) => {
  const rawTypes = _.compact([pokemon.type, pokemon.type2]);
  const formattedTypes = rawTypes.map((rawType) => rawType.replace('POKEMON_TYPE_', '').toLowerCase());
  const translatedTypes = formattedTypes.map((type) => pokemonTypeDict[type]);

  return translatedTypes;
};

export {
  translateType,
};
