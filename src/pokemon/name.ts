// Local modules.
import { getResources } from 'src/gameMaster';

const pokemonNameDict = await getResources('pokemonName');

const translateName = (noIndex: string) => {
  const translatedName = pokemonNameDict[noIndex];
  return translatedName;
};

export {
  translateName,
};
