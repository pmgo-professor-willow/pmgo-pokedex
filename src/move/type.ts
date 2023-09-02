// Local modules.
import { CombatMove, Move } from 'src/models/move';
import { getResources } from 'src/gameMaster';

const pokemonTypeDict = await getResources('pokemonType');

const translateType = (move: Move | CombatMove) => {
  const formattedType = move.type.replace('POKEMON_TYPE_', '').toLowerCase();
  const translatedTypes = pokemonTypeDict[formattedType];
  return translatedTypes;
};

export {
  translateType,
};
