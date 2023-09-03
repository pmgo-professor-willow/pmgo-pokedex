// Local modules.
import { CombatMoveRaw, BaseMoveRaw } from 'src/models/move';
import { getResources } from 'src/gameMaster';

const pokemonTypeDict = await getResources('pokemonType');

const translateType = (move: BaseMoveRaw | CombatMoveRaw) => {
  const typeRaw = ('pokemonType' in move) ? move.pokemonType : move.type;
  const formattedType = typeRaw.replace('POKEMON_TYPE_', '').toLowerCase();
  const translatedTypes = pokemonTypeDict[formattedType];

  return translatedTypes;
};

export {
  translateType,
};
