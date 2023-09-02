// Local modules.
import { getResources } from 'src/gameMaster';

const pokemonDescriptionDict = await getResources('pokemonDescription');

const translateDescription = (noIndex: string) => {
  const translatedDescription = pokemonDescriptionDict[noIndex];
  return translatedDescription;
};

export {
  translateDescription,
};
