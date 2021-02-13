// Node modules.
import _ from 'lodash';
import fetch from 'node-fetch';
import { parse } from 'node-html-parser';
import { mkdirp, writeFile } from 'fs-extra';

const getPokemonList = async () => {
  const nameListUrl = 'https://pokemondb.net/pokedex/all';
  const res = await fetch(nameListUrl);
  const xml = await res.text();

  const root = parse(xml);
  const pokemonItems = root.querySelectorAll('table tbody tr');

  const pokemonList = pokemonItems
    .map((pokemonItem) => {
      const cells = pokemonItem.querySelectorAll('td');
      const no = cells[0].rawText.trim();
      const name = cells[1].querySelector('a').rawText.trim();
      const form = cells[1].querySelector('small')?.rawText.trim() || null;
      const types = cells[2].querySelectorAll('a')?.map((element) => element.rawText.trim()) || null;

      return {
        no: parseInt(no),
        name,
        form,
        types,
      };
    });

  return pokemonList;
};

const main = async () => {
  const outputPath = './data';
  await mkdirp(outputPath);

  try {
    const pokemonList = await getPokemonList();
    await writeFile(`${outputPath}/pokemon-list.json`, JSON.stringify(pokemonList, null, 2));
  } catch (e) {
    console.error(e);
  }
};

main();
