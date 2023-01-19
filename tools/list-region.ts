// Node modules.
import _ from 'lodash';
import { mkdirp, writeFile } from 'fs-extra';

const getRegionList = async () => {
  return [
    {
      patterns: ['Kantonian form', 'Kantonian', 'Kanto'],
      'en-US': 'Kanto',
      'zh-TW': '關都地區',
    },
    {
      patterns: ['Unovian form', 'Unovian', 'Unovan form', 'Unovan', 'Unova'],
      'en-US': 'Unova',
      'zh-TW': '合眾地區',
    },
    {
      patterns: ['Alolan form', 'Alolan', 'Alola'],
      'en-US': 'Alola',
      'zh-TW': '阿羅拉地區',
    },
    {
      patterns: ['Galarian form', 'Galarian', 'Galar'],
      'en-US': 'Galar',
      'zh-TW': '伽勒爾地區',
    },
    {
      patterns: ['Hisuian form', 'Hisuian', 'Hisui'],
      'en-US': 'Hisui',
      'zh-TW': '洗翠地區'
    },
    {
      patterns: ['Paldean form', 'Paldean', 'Paldea'],
      'en-US': 'Paldea',
      'zh-TW': '帕底亞地區',
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
