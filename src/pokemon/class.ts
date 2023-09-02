// Local modules.
import { PokemonRaw } from 'src/models/pokemon';
import { getResources } from 'src/gameMaster';

const pokemonClassDict = await getResources('pokemonClass');

const translateClass = (pokemon: PokemonRaw) => {
  const formattedClass = pokemon.pokemonClass?.replace('POKEMON_CLASS_', '').toLowerCase();
  const translatedClass = formattedClass ? pokemonClassDict[formattedClass] : null;
  return translatedClass;
};

export {
  translateClass,
};
