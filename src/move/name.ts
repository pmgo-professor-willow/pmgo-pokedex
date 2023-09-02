// Local modules.
import { getResources } from 'src/gameMaster';

const moveNameDict = await getResources('moveName');

const translateName = (noIndex: string) => {
  const translatedName = moveNameDict[noIndex];
  return translatedName;
};

export {
  translateName,
};
