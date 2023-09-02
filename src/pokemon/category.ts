// Local modules.
import { getResources } from 'src/gameMaster';

const pokemonCategoryDict = await getResources('pokemonCategory');

const translateCategory = (noIndex: string) => {
  const translatedCategory = pokemonCategoryDict[noIndex];
  return translatedCategory;
};

export {
  translateCategory,
};
