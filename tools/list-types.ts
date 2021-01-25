// Node modules.
import _ from 'lodash';
import { mkdirp, writeFile } from 'fs-extra';

const getTypeList = async () => {
  return [
    {
      patterns: ['normal-type', 'normal type', 'normal'],
      'en-US': 'Normal',
      'zh-TW': '一般',
    },
    {
      patterns: ['fire-type', 'fire type', 'fire'],
      'en-US': 'Fire',
      'zh-TW': '火',
    },
    {
      patterns: ['water-type', 'water type', 'water'],
      'en-US': 'Water',
      'zh-TW': '水',
    },
    {
      patterns: ['electric-type', 'electric type', 'electric'],
      'en-US': 'Electric',
      'zh-TW': '電',
    },
    {
      patterns: ['grass-type', 'grass type', 'grass'],
      'en-US': 'Grass',
      'zh-TW': '草',
    },
    {
      patterns: ['ice-type', 'ice type', 'ice'],
      'en-US': 'Ice',
      'zh-TW': '冰',
    },
    {
      patterns: ['fighting-type', 'fighting type', 'fighting'],
      'en-US': 'Fighting',
      'zh-TW': '格鬥',
    },
    {
      patterns: ['poison-type', 'poison type', 'poison'],
      'en-US': 'Poison',
      'zh-TW': '毒',
    },
    {
      patterns: ['ground-type', 'ground type', 'ground'],
      'en-US': 'Ground',
      'zh-TW': '地面',
    },
    {
      patterns: ['flying-type', 'flying type', 'flying'],
      'en-US': 'Flying',
      'zh-TW': '飛行',
    },
    {
      patterns: ['psychic-type', 'psychic type', 'psychic'],
      'en-US': 'Psychic',
      'zh-TW': '超能力',
    },
    {
      patterns: ['bug-type', 'bug type', 'bug'],
      'en-US': 'Bug',
      'zh-TW': '蟲',
    },
    {
      patterns: ['rock-type', 'rock type', 'rock'],
      'en-US': 'Rock',
      'zh-TW': '岩石',
    },
    {
      patterns: ['ghost-type', 'ghost type', 'ghost'],
      'en-US': 'Ghost',
      'zh-TW': '幽靈',
    },
    {
      patterns: ['dragon-type', 'dragon type', 'dragon'],
      'en-US': 'Dragon',
      'zh-TW': '龍',
    },
    {
      patterns: ['dark-type', 'dark type', 'dark'],
      'en-US': 'Dark',
      'zh-TW': '惡',
    },
    {
      patterns: ['steel-type', 'steel type', 'steel'],
      'en-US': 'Steel',
      'zh-TW': '鋼',
    },
    {
      patterns: ['fiary-type', 'fiary type', 'fiary'],
      'en-US': 'Fiary',
      'zh-TW': '妖精',
    },
  ];
};

const main = async () => {
  const outputPath = './data';
  await mkdirp(outputPath);

  try {
    const typeList = await getTypeList();
    await writeFile(`${outputPath}/type-list.json`, JSON.stringify(typeList, null, 2));
  } catch (e) {
    console.error(e);
  }
};

main();
