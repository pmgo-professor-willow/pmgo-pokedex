// Node modules.
import _ from 'lodash';
import fetch from 'node-fetch';
import { parse } from 'node-html-parser';
import { mkdirp, writeFile } from 'fs-extra';

const getNameList = async () => {
  const nameListUrl = 'https://bulbapedia.bulbagarden.net/wiki/List_of_Chinese_Pok%C3%A9mon_names';
  const res = await fetch(nameListUrl);
  const xml = await res.text();

  const root = parse(xml);
  const pokemonItems = root.querySelectorAll('table.roundy tr');

  const nameList = pokemonItems
    .map((pokemonItem) => {
      const cells = pokemonItem.querySelectorAll('td');
      const { 0: no, 2: nameEn, 3: nameZhTw, 4: nameZhCn } = cells.map((cell) => cell.rawText.trim());

      const isLegalPokemon = /\d+/.test(no);

      return isLegalPokemon
        ? {
          no: parseInt(no),
          'en-US': nameEn,
          'zh-TW': nameZhTw,
          'zh-CN': nameZhCn,
        }
        : null;
    })
    .filter(Boolean);

  return nameList;
};

const main = async () => {
  const outputPath = './data';
  await mkdirp(outputPath);

  try {
    const pokemonList = await getNameList();
    await writeFile(`${outputPath}/pokemon-name-list.json`, JSON.stringify(pokemonList, null, 2));
  } catch (e) {
    console.error(e);
  }
};

main();
