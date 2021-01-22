// Node modules.
import _ from 'lodash';
import { mkdirp, writeFile } from 'fs-extra';

const getRegionList = async () => {
  return [
    {
      patterns: ['Kantonian form', 'Kantonian', 'Kanto'],
      'zh-TW': '關都',
    },
    {
      patterns: ['Unovan form', 'Unovan', 'Unova'],
      'zh-TW': '合眾',
    },
    {
      patterns: ['Alolan form', 'Alolan', 'Alola'],
      'zh-TW': '阿羅拉',
    },
    {
      patterns: ['Galarian form', 'Galarian', 'Galar'],
      'zh-TW': '伽勒爾',
    },
  ];
};

const main = async () => {
  const outputPath = './data';
  await mkdirp(outputPath);

  try {
    const regionList = await getRegionList();
    await writeFile(`${outputPath}/region-list.json`, JSON.stringify(regionList, null, 2));
  } catch (e) {
    console.error(e);
  }
};

main();
